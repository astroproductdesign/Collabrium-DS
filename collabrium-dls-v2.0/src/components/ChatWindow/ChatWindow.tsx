'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, Plus, SidebarSimple } from '@phosphor-icons/react';
import { Button } from '../Button';
import { FilterChipGroup } from '../Chip';
import { PromptInputBar, type PromptInputBarProps } from '../PromptInputBar';
import type { WithoutStyling } from '../../utils/types';
import { PortalContainerContext } from '../../utils/portalContext';

/** One conversation in the rail. */
export interface ChatConversation {
  /** Unique id; passed back to `onConversationSelect`. */
  id: string;
  /** The conversation's title. One line; it truncates with an ellipsis. */
  title: string;
  /** The `value` of the pillar it belongs to. */
  pillar: string;
}

/** A run of conversations under a recency heading ("Today", "Earlier this week"). */
export interface ChatConversationGroup {
  /** The heading. A group with nothing left under it (after filtering) is hidden with it. */
  label: string;
  conversations: ChatConversation[];
}

/** One product pillar the rail can filter by. */
export interface ChatPillar {
  /** Unique value, matched by `ChatConversation.pillar`. */
  value: string;
  /** The chip's label, shown as written ("CollabSales"). */
  label: string;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title'>>;

export interface ChatWindowProps extends NativeDivProps {
  /** Whether the window is open. It folds open from `origin` and folds closed back to it. */
  open: boolean;
  /**
   * Called when the person asks to close: the veil (outside the window) or Escape. There is no close button.
   * Set `open` to `false` in response; the window then folds shut.
   */
  onClose: () => void;
  /**
   * The floating Prompt input bar that opens the window, so the window folds out of it and back into it. Leave it
   * out and the window just appears and disappears. Set the bar's `launched` to `open` yourself.
   */
  origin?: RefObject<HTMLElement | null>;
  /** The conversation's title, in the header. It names the dialog. */
  title: string;
  /** The line under the title ("Collabrium assistant · reading this workspace"). */
  description?: string;
  /** The pillars to filter by. An "All" chip is always first, and a pillar with no conversations is shown disabled. */
  pillars: ChatPillar[];
  /** The conversations, newest group first, each under a recency heading. */
  groups: ChatConversationGroup[];
  /** The `id` of the open conversation. */
  activeConversationId?: string;
  /** Called with the `id` when a conversation is chosen. On a narrow window this also closes the rail drawer. */
  onConversationSelect?: (id: string) => void;
  /** Called when New chat is pressed. */
  onNewChat?: () => void;
  /**
   * The composer: the Prompt input bar's props, except those that only a floating bar uses. Press Send to send
   * (the thread then scrolls to the newest turn); set `working` while the AI answers, so Send becomes Stop.
   */
  composer: Omit<
    PromptInputBarProps,
    'variant' | 'scrollContainer' | 'collapsed' | 'parkShift' | 'pushShift' | 'typingLines' | 'staticHint' | 'launched' | 'onLaunch'
  >;
  /**
   * The thread: `ChatMessage` turns in order, oldest first. Add one at the end and the thread follows it while the
   * person is at the bottom; add older ones at the top and the thread keeps the person where they were.
   */
  children: ReactNode;
}

const FOLD_OPEN_MS = 800;
const FOLD_CLOSE_MS = 550;
const DETACH_AT = 150;
const REPIN_AT = 30;
const NARROW_AT = 820;

type Phase = 'closed' | 'opening' | 'shown' | 'closing';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const TABBABLE = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * Collabrium Chat window. A modal chat surface: a rail of conversations on the left (filtered by pillar), the
 * active thread on the right, and an inline Prompt input bar as the composer. It is the expanded form of the
 * floating Prompt input bar: opening it folds the window out of the bar. Ported from components.css `.c-chat*`.
 *
 * The component owns the modal behaviour (fold, veil, Escape, focus), the narrow rail drawer, the pillar filter
 * and the scroll pin with Jump to present. The host owns the conversations, the turns, sending and everything the
 * message actions do.
 */
export const ChatWindow = forwardRef<HTMLDivElement, ChatWindowProps>(function ChatWindow(
  {
    open,
    onClose,
    origin,
    title,
    description,
    pillars,
    groups,
    activeConversationId,
    onConversationSelect,
    onNewChat,
    composer,
    children,
    ...rest
  },
  ref,
) {
  const [phase, setPhase] = useState<Phase>('closed');
  const [veil, setVeil] = useState(false);
  const [pillar, setPillar] = useState('all');
  const [narrow, setNarrow] = useState(false);
  const [railOpen, setRailOpen] = useState(false);
  const [layer, setLayer] = useState<HTMLElement | null>(null);
  const [detached, setDetached] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const [announce, setAnnounce] = useState('');

  const rootRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const railToggleRef = useRef<HTMLButtonElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const foldDone = useRef<(() => void) | null>(null);

  const pinned = useRef(true);
  const lastScrollTop = useRef(0);
  const announced = useRef(false);
  const lastHeight = useRef(0);
  const firstNode = useRef<Element | null>(null);
  const anchorTop = useRef(0);

  const titleId = useId();
  const railId = useId();
  const pillarLabelId = useId();

  const setRoot = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
  };

  // ---- open and close: the fold -------------------------------------------------------------------------------

  // The shell is measured untransformed (any running fold cleared, a reflow forced), top-left to top-left,
  // because its transform-origin is 0 0 and a pose baked in mid-flight would compound into the next fold.
  const measureFold = useCallback(() => {
    const shell = shellRef.current;
    const from = origin?.current;
    if (!shell || !from) return false;
    shell.removeAttribute('data-fold');
    void shell.offsetWidth;
    const to = shell.getBoundingClientRect();
    const rect = from.getBoundingClientRect();
    shell.style.setProperty('--fold-dx', `${rect.left - to.left}px`);
    shell.style.setProperty('--fold-dy', `${rect.top - to.top}px`);
    shell.style.setProperty('--fold-sx', String(rect.width / to.width));
    shell.style.setProperty('--fold-sy', String(rect.height / to.height));
    // The panel always turns toward the viewer: +1 when the bar sits left of centre, -1 when right.
    shell.style.setProperty('--fold-dir', rect.left + rect.width / 2 < window.innerWidth / 2 ? '1' : '-1');
    return true;
  }, [origin]);

  const runFold = useCallback(
    (kind: 'open' | 'close', done: () => void) => {
      const shell = shellRef.current;
      if (!shell || prefersReducedMotion() || !measureFold()) {
        done();
        return;
      }
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        shell.removeEventListener('animationend', onEnd);
        window.clearTimeout(guard);
        foldDone.current = null;
        // Removed once it ends: a lingering forwards-filled transform, even an identity one, would make the
        // shell the containing block of every fixed descendant.
        shell.removeAttribute('data-fold');
        done();
      };
      const onEnd = (event: AnimationEvent) => {
        if (event.target === shell) finish();
      };
      shell.addEventListener('animationend', onEnd);
      // A backgrounded tab can miss animationend outright and strand the window on screen.
      const guard = window.setTimeout(finish, (kind === 'open' ? FOLD_OPEN_MS : FOLD_CLOSE_MS) + 150);
      foldDone.current = finish;
      shell.setAttribute('data-fold', kind);
    },
    [measureFold],
  );

  useEffect(() => {
    if (open && (phase === 'closed' || phase === 'closing')) {
      if (phase === 'closed') openerRef.current = document.activeElement as HTMLElement | null;
      foldDone.current?.();
      setPhase('opening');
    } else if (!open && (phase === 'opening' || phase === 'shown')) {
      setPhase('closing');
    }
  }, [open, phase]);

  useLayoutEffect(() => {
    if (phase === 'opening') {
      // Opening starts pinned at the bottom, set before the fold plays (a transformed ancestor does not move
      // the scroll position, so this is safe now).
      const thread = threadRef.current;
      if (thread) {
        thread.scrollTop = thread.scrollHeight;
        lastScrollTop.current = thread.scrollTop;
      }
      pinned.current = true;
      announced.current = false;
      lastHeight.current = thread?.scrollHeight ?? 0;
      firstNode.current = innerRef.current?.firstElementChild ?? null;
      anchorTop.current = firstNode.current?.getBoundingClientRect().top ?? 0;
      setDetached(false);
      setHasNew(false);
      setAnnounce('');
      composerRef.current?.querySelector<HTMLElement>('input')?.focus({ preventScroll: true });
      requestAnimationFrame(() => setVeil(true));
      runFold('open', () => setPhase(current => (current === 'opening' ? 'shown' : current)));
    } else if (phase === 'closing') {
      setVeil(false);
      setRailOpen(false);
      runFold('close', () => setPhase(current => (current === 'closing' ? 'closed' : current)));
    }
  }, [phase, runFold]);

  // Focus goes back to whatever opened the window (the bar's box), or to the bar when nothing held focus.
  useEffect(() => {
    if (phase !== 'closed') return;
    const back = openerRef.current;
    openerRef.current = null;
    if (back && back.isConnected && back !== document.body) back.focus({ preventScroll: true });
    else origin?.current?.querySelector<HTMLElement>('input')?.focus({ preventScroll: true });
  }, [phase, origin]);

  const mounted = phase !== 'closed';

  // ---- escape, and the focus trap ----------------------------------------------------------------------------

  const closeRail = useCallback((returnFocus: boolean) => {
    setRailOpen(false);
    if (returnFocus) railToggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      // A menu or popover that took the Escape has already prevented it.
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      event.preventDefault();
      if (railOpen) closeRail(true);
      else onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mounted, railOpen, closeRail, onClose]);

  // Tab wraps inside the window: a full takeover that let Tab reach the page behind would land on controls that
  // cannot be seen.
  const trap = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const root = rootRef.current;
    if (!root) return;
    const stops = Array.from(root.querySelectorAll<HTMLElement>(TABBABLE)).filter(
      node => !node.hasAttribute('disabled') && !node.closest('[inert]') && node.getClientRects().length > 0,
    );
    if (stops.length === 0) return;
    const first = stops[0];
    const last = stops[stops.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (!active || !root.contains(active)) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // ---- narrow: the rail becomes a drawer ---------------------------------------------------------------------

  useEffect(() => {
    const shell = shellRef.current;
    if (!mounted || !shell) return;
    const measure = () => setNarrow(shell.clientWidth <= NARROW_AT);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(shell);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!narrow) setRailOpen(false);
  }, [narrow]);

  const toggleRail = () => {
    if (railOpen) {
      closeRail(true);
    } else {
      setRailOpen(true);
      requestAnimationFrame(() => railRef.current?.querySelector<HTMLElement>(TABBABLE)?.focus());
    }
  };

  // ---- the pillar filter -------------------------------------------------------------------------------------

  const pillarOptions = useMemo(
    () => [
      { value: 'all', label: 'All' },
      ...pillars.map(({ value, label }) => ({
        value,
        label,
        // A pillar with nothing in it stays visible and unusable: the point of chips is that the full set shows.
        disabled: !groups.some(group => group.conversations.some(c => c.pillar === value)),
      })),
    ],
    [pillars, groups],
  );
  const pillarName = useMemo(() => new Map(pillars.map(p => [p.value, p.label])), [pillars]);
  const shownGroups = groups
    .map(group => ({
      ...group,
      conversations: group.conversations.filter(c => pillar === 'all' || c.pillar === pillar),
    }))
    .filter(group => group.conversations.length > 0);

  // ---- the scroll pin ----------------------------------------------------------------------------------------

  const repin = useCallback(() => {
    pinned.current = true;
    announced.current = false;
    setDetached(false);
    setHasNew(false);
    setAnnounce('');
  }, []);

  const onScroll = () => {
    const thread = threadRef.current;
    if (!thread) return;
    const top = thread.scrollTop;
    const distance = thread.scrollHeight - top - thread.clientHeight;
    // Detach only on an upward scroll: a programmatic scroll to the bottom is always downward, so it can
    // never trip this and detach itself. The thresholds are asymmetric so it never flip-flops at one line.
    if (pinned.current && top < lastScrollTop.current && distance > DETACH_AT) {
      pinned.current = false;
      announced.current = false;
      setDetached(true);
    } else if (!pinned.current && distance <= REPIN_AT) {
      repin();
    }
    lastScrollTop.current = top;
    anchorTop.current = firstNode.current?.getBoundingClientRect().top ?? 0;
  };

  // Content arriving: follow it while pinned (instantly, since smooth cannot keep up with tokens); when the
  // reader has scrolled away, mark it once; when older turns were added at the top, hold the viewport still.
  useEffect(() => {
    const thread = threadRef.current;
    const inner = innerRef.current;
    if (!mounted || !thread || !inner) return;
    const grown = () => {
      const height = thread.scrollHeight;
      const delta = height - lastHeight.current;
      lastHeight.current = height;
      const first = inner.firstElementChild;
      const previous = firstNode.current;
      const prepended = first !== previous && previous !== null && inner.contains(previous);
      firstNode.current = first;
      if (prepended) {
        // Older turns were added above: move the viewport by how far the turn that was first has been pushed
        // down, so the reader stays on the turn they were reading. Measured, not assumed from the height, because
        // the browser's own scroll anchoring may already have moved some of it.
        const pushed = previous!.getBoundingClientRect().top - anchorTop.current;
        thread.scrollTop += pushed;
        lastScrollTop.current = thread.scrollTop;
      } else if (pinned.current) {
        thread.scrollTop = thread.scrollHeight;
        lastScrollTop.current = thread.scrollTop;
      } else if (delta > 0) {
        setHasNew(true);
        if (!announced.current) {
          announced.current = true;
          setAnnounce('New response below');
        }
      }
      anchorTop.current = firstNode.current?.getBoundingClientRect().top ?? 0;
    };
    const resize = new ResizeObserver(grown);
    resize.observe(inner);
    const mutate = new MutationObserver(grown);
    mutate.observe(inner, { childList: true });
    return () => {
      resize.disconnect();
      mutate.disconnect();
    };
  }, [mounted]);

  // A window resize never re-pins a detached reader; it only keeps an already-pinned one glued to the bottom.
  useEffect(() => {
    if (!mounted) return;
    const onResize = () => {
      const thread = threadRef.current;
      if (thread && pinned.current) thread.scrollTop = thread.scrollHeight;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mounted]);

  const jump = () => {
    const thread = threadRef.current;
    thread?.scrollTo({ top: thread.scrollHeight, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    repin();
    composerRef.current?.querySelector<HTMLElement>('input')?.focus({ preventScroll: true });
  };

  const send = (value: string) => {
    // Sending always scrolls to the newest turn and re-pins, wherever the reader was: they just spoke.
    pinned.current = true;
    repin();
    requestAnimationFrame(() => {
      const thread = threadRef.current;
      if (thread) thread.scrollTop = thread.scrollHeight;
    });
    composer.onSend?.(value);
  };

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <PortalContainerContext.Provider value={layer}>
      <div
        {...rest}
        ref={setRoot}
        className="cui-chat"
        data-phase={phase}
        data-veil={veil ? '' : undefined}
        onKeyDown={trap}
      >
        <div className="cui-chat__veil" onClick={onClose} aria-hidden="true" />
        <div ref={shellRef} className="cui-chat__shell" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <aside
            ref={railRef}
            id={railId}
            className="cui-chat__rail"
            data-open={railOpen ? '' : undefined}
            aria-label="Conversations"
            inert={narrow && !railOpen}
          >
            <Button variant="secondary" size="md" leadingIcon={Plus} data-part="new-chat" onClick={onNewChat}>
              New chat
            </Button>

            <div className="cui-chat__pillars">
              <span className="cui-chat__flabel" id={pillarLabelId}>
                Filter by pillar
              </span>
              <FilterChipGroup
                mode="single"
                aria-labelledby={pillarLabelId}
                aria-label="Filter by pillar"
                options={pillarOptions}
                value={pillar}
                onValueChange={setPillar}
              />
            </div>

            <div className="cui-chat__conversations" role="group" aria-label="Conversations" data-pillar-selected={pillar !== 'all' ? '' : undefined}>
              {shownGroups.map(group => (
                <div key={group.label} className="cui-chat__group">
                  <div className="cui-chat__group-head">{group.label}</div>
                  {group.conversations.map(conversation => (
                    <button
                      key={conversation.id}
                      type="button"
                      className="cui-chat__conversation"
                      aria-current={conversation.id === activeConversationId ? 'true' : undefined}
                      onClick={() => {
                        onConversationSelect?.(conversation.id);
                        if (railOpen) closeRail(false);
                      }}
                    >
                      <span className="cui-chat__conversation-title">{conversation.title}</span>
                      <span className="cui-chat__conversation-pillar">{pillarName.get(conversation.pillar) ?? conversation.pillar}</span>
                    </button>
                  ))}
                </div>
              ))}
              {shownGroups.length === 0 && <div className="cui-chat__empty">No conversations in this pillar yet.</div>}
            </div>
          </aside>

          <div
            className="cui-chat__scrim"
            data-open={railOpen ? '' : undefined}
            aria-hidden="true"
            onClick={() => closeRail(true)}
          />

          <div className="cui-chat__main">
            <div className="cui-chat__hd">
              <div>
                <h2 id={titleId} className="cui-chat__title">
                  {title}
                </h2>
                {description && <p>{description}</p>}
              </div>
              <Button
                ref={railToggleRef}
                variant="ghost"
                size="sm"
                iconOnly
                icon={SidebarSimple}
                data-part="rail-toggle"
                aria-label={railOpen ? 'Close conversations' : 'Open conversations'}
                aria-expanded={railOpen}
                aria-controls={railId}
                onClick={toggleRail}
              />
            </div>

            <div className="cui-chat__thread-wrap">
              <div ref={threadRef} className="cui-chat__thread" onScroll={onScroll}>
                <div ref={innerRef} className="cui-chat__thread-inner">
                  {children}
                </div>
              </div>
              <button
                type="button"
                className="cui-chat__jump"
                data-visible={detached ? '' : undefined}
                data-new={hasNew ? '' : undefined}
                aria-label={hasNew ? 'Jump to present, new messages below' : 'Jump to present'}
                tabIndex={detached ? 0 : -1}
                onClick={jump}
              >
                <ArrowDown weight="regular" aria-hidden="true" focusable="false" />
              </button>
              <span className="cui-chat__sr" role="status" aria-live="polite">
                {announce}
              </span>
            </div>

            <div className="cui-chat__composer">
              <div ref={composerRef} className="cui-chat__composer-inner">
                <PromptInputBar aria-label="Message composer" role="group" {...composer} variant="inline" onSend={send} />
                <p className="cui-chat__foot">AI can make mistakes. Please double-check responses.</p>
              </div>
            </div>
          </div>
        </div>
        <div ref={setLayer} className="cui-chat__layer" />
      </div>
    </PortalContainerContext.Provider>,
    document.body,
  );
});
