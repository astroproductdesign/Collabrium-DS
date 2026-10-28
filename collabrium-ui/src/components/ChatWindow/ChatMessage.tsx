'use client';

import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowClockwise,
  Check,
  Copy,
  DotsThree,
  Flag,
  ShareNetwork,
  SpeakerHigh,
  SpinnerGap,
  Stop,
  ThumbsDown,
  ThumbsUp,
  type Icon,
} from '@phosphor-icons/react';
import { Badge } from '../Badge';
import type { WithoutStyling } from '../../utils/types';
import { usePortalContainer } from '../../utils/portalContext';

/** A source the answer drew on, shown under it as a neutral badge. */
export interface ChatCitation {
  /** The source's name ("Pipeline report, Aug 21"). */
  label: string;
  /** An optional Phosphor icon for the kind of source. It is drawn in Fill weight (a context mark, not an action). */
  icon?: Icon;
}

/** Where a spoken reading of the answer is: nothing, being prepared, or playing. */
export type ChatReadAloudState = 'idle' | 'loading' | 'playing';
/** The person's verdict on an answer, or `null` for none. */
export type ChatFeedback = 'up' | 'down' | null;

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'>>;

export interface UserChatMessageProps extends NativeDivProps {
  /** `user`: the person's own turn, a tinted bubble aligned right. It has no action row. */
  role: 'user';
  /** The text the person sent. */
  children: ReactNode;
}

export interface AssistantChatMessageProps extends NativeDivProps {
  /** `assistant`: the AI's turn, plain text on the page with an action row beneath it. */
  role: 'assistant';
  /**
   * The answer: `<p>`, `<ul>`/`<li>` and `<b>` styled as the chat's page copy. Use a StreamingText while it
   * arrives.
   */
  children: ReactNode;
  /** Sources shown under the answer as neutral badges. */
  citations?: ChatCitation[];
  /**
   * The answer is still arriving. The action row is removed (so Copy cannot copy half a response and its buttons
   * leave the tab order) until this is `false`.
   */
  streaming?: boolean;
  /** When the turn finished, as an ISO date-time ("2026-08-24T10:14"). It sets the `<time>` and its full title. */
  timestamp?: string;
  /** The short text for the timestamp ("3 hours ago"). You own it, since it goes stale. Needs `timestamp`. */
  timeLabel?: string;
  /** The verdict shown, for a controlled row. Use it with `onFeedbackChange`. */
  feedback?: ChatFeedback;
  /** The verdict to start with, for an uncontrolled row. */
  defaultFeedback?: ChatFeedback;
  /**
   * Called when a thumb is pressed, with `up`, `down` or `null` (pressing the thumb that is already on clears
   * it). Leave it out and the two thumbs are not shown.
   */
  onFeedbackChange?: (feedback: ChatFeedback) => void;
  /** Where the reading aloud is. You own it, since only one message may read at a time. */
  readAloud?: ChatReadAloudState;
  /**
   * Called when Read aloud is pressed. Pressing it while `loading` or `playing` should stop. Leave it out and the
   * button is not shown.
   */
  onReadAloud?: () => void;
  /** Called when Copy has copied the answer's text. Copy itself is always shown. */
  onCopied?: (text: string) => void;
  /** Adds Retry to the More options menu. Leave out the three menu actions and More options is not shown. */
  onRetry?: () => void;
  /** Adds Share to the More options menu. */
  onShare?: () => void;
  /** Adds Report to the More options menu. */
  onReport?: () => void;
}

export type ChatMessageProps = UserChatMessageProps | AssistantChatMessageProps;

const COPIED_MS = 1600;

const absoluteTime = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
  return `${day}, ${time}`;
};

function copyFallback(text: string) {
  // Left in place, focused and selected, so the person can copy by hand: some embedded views refuse the
  // clipboard outright, and failing silently there would be worse.
  const box = document.createElement('textarea');
  box.value = text;
  box.setAttribute('aria-hidden', 'true');
  box.style.position = 'fixed';
  box.style.opacity = '0';
  document.body.appendChild(box);
  box.focus();
  box.select();
  window.setTimeout(() => box.remove(), 4000);
}

/**
 * One turn in a chat window's thread. The person's turn is a tinted bubble on the right; the AI's turn is plain
 * page copy with citations and, once it has finished, an action row (copy, read aloud, good and bad response,
 * more options). Ported from components.css `.c-chat-msg`, `.c-chat-bubble`, `.c-chat-cite` and
 * `.c-chat-actions`.
 */
export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(function ChatMessage(props, ref) {
  if (props.role === 'user') {
    const { role: _role, children, ...rest } = props;
    return (
      <div {...rest} ref={ref} className="cui-chat-msg" data-role="user">
        <div className="cui-chat-msg__bubble">{children}</div>
      </div>
    );
  }
  return <AssistantMessage {...props} forwardedRef={ref} />;
});

function AssistantMessage({
  forwardedRef,
  role: _role,
  children,
  citations,
  streaming = false,
  timestamp,
  timeLabel,
  feedback: feedbackProp,
  defaultFeedback = null,
  onFeedbackChange,
  readAloud = 'idle',
  onReadAloud,
  onCopied,
  onRetry,
  onShare,
  onReport,
  ...rest
}: AssistantChatMessageProps & { forwardedRef: React.ForwardedRef<HTMLDivElement> }) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const portalContainer = usePortalContainer();
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');
  const [internalFeedback, setInternalFeedback] = useState<ChatFeedback>(defaultFeedback);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPlace, setMenuPlace] = useState({ top: 0, left: 0 });
  const feedback = feedbackProp !== undefined ? feedbackProp : internalFeedback;

  const items: { id: string; label: string; icon: Icon; run: () => void }[] = [];
  if (onRetry) items.push({ id: 'retry', label: 'Retry', icon: ArrowClockwise, run: onRetry });
  if (onShare) items.push({ id: 'share', label: 'Share', icon: ShareNetwork, run: onShare });
  if (onReport) items.push({ id: 'report', label: 'Report', icon: Flag, run: onReport });

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), COPIED_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = () => {
    const text = bubbleRef.current?.innerText ?? '';
    const done = () => {
      setCopied(true);
      // Cleared first so the same words announce again on a second copy.
      setStatus('');
      requestAnimationFrame(() => setStatus('Copied to clipboard'));
      onCopied?.(text);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, () => copyFallback(text));
    else copyFallback(text);
  };

  const thumb = (which: 'up' | 'down') => {
    // Pressing the thumb that is on clears it back to neutral, rather than doing nothing.
    const next: ChatFeedback = feedback === which ? null : which;
    if (feedbackProp === undefined) setInternalFeedback(next);
    onFeedbackChange?.(next);
  };

  // The menu is fixed and placed from the trigger: the thread scrolls, and a clipped ancestor would clip an absolute one.
  useLayoutEffect(() => {
    if (!menuOpen) return;
    const rect = moreRef.current?.getBoundingClientRect();
    if (rect) setMenuPlace({ top: rect.bottom + 4, left: rect.left });
  }, [menuOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const away = (event: Event) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !moreRef.current?.contains(target)) setMenuOpen(false);
    };
    const close = () => setMenuOpen(false);
    document.addEventListener('pointerdown', away);
    window.addEventListener('resize', close);
    window.addEventListener('scroll', close, true);
    return () => {
      document.removeEventListener('pointerdown', away);
      window.removeEventListener('resize', close);
      window.removeEventListener('scroll', close, true);
    };
  }, [menuOpen]);
  useEffect(() => {
    if (menuOpen) menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }, [menuOpen]);

  const closeMenu = (returnFocus: boolean) => {
    setMenuOpen(false);
    if (returnFocus) moreRef.current?.focus();
  };
  const menuKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const rows = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    const at = rows.indexOf(document.activeElement as HTMLElement);
    if (event.key === 'Escape') {
      // Handled here, so the chat window's own Escape (which closes the window) does not also run.
      event.preventDefault();
      closeMenu(true);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      rows[(at + 1) % rows.length]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      rows[(at - 1 + rows.length) % rows.length]?.focus();
    } else if (event.key === 'Tab') {
      setMenuOpen(false);
    }
  };

  const title = timestamp ? absoluteTime(timestamp) : undefined;
  const speaking = readAloud === 'playing';
  const ReadIcon = readAloud === 'loading' ? SpinnerGap : speaking ? Stop : SpeakerHigh;

  const menu =
    menuOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={menuRef}
            id={menuId}
            className="cui-chat-msg__menu"
            role="menu"
            aria-label="More options"
            style={{ top: menuPlace.top, left: menuPlace.left }}
            onKeyDown={menuKeys}
          >
            {items.map(({ id, label, icon: ItemIcon, run }) => (
              <button
                key={id}
                type="button"
                role="menuitem"
                className="cui-chat-msg__menu-item"
                onClick={() => {
                  closeMenu(true);
                  run();
                }}
              >
                <ItemIcon weight="regular" aria-hidden="true" focusable="false" />
                {label}
              </button>
            ))}
          </div>,
          portalContainer ?? document.body,
        )
      : null;

  return (
    <div {...rest} ref={forwardedRef} className="cui-chat-msg" data-role="assistant" data-streaming={streaming ? '' : undefined}>
      <div ref={bubbleRef} className="cui-chat-msg__bubble">
        {children}
        {citations?.map(({ label, icon }) => (
          <Badge key={label} variant="neutral" icon={icon}>
            {label}
          </Badge>
        ))}
      </div>
      <div className="cui-chat-msg__actions" role="group" aria-label="Message actions" data-open={menuOpen ? '' : undefined}>
        <button type="button" className="cui-chat-msg__action" aria-label="Copy" data-copied={copied ? '' : undefined} onClick={copy}>
          {copied ? <Check weight="fill" aria-hidden="true" focusable="false" /> : <Copy weight="regular" aria-hidden="true" focusable="false" />}
        </button>
        {onReadAloud && (
          <button
            type="button"
            className="cui-chat-msg__action"
            aria-label={speaking ? 'Stop reading' : 'Read aloud'}
            aria-pressed={speaking ? true : undefined}
            data-state={readAloud}
            onClick={onReadAloud}
          >
            <ReadIcon weight="regular" aria-hidden="true" focusable="false" />
          </button>
        )}
        {onFeedbackChange && (
          <>
            <button type="button" className="cui-chat-msg__action" aria-label="Good response" aria-pressed={feedback === 'up'} onClick={() => thumb('up')}>
              <ThumbsUp weight={feedback === 'up' ? 'fill' : 'regular'} aria-hidden="true" focusable="false" />
            </button>
            <button type="button" className="cui-chat-msg__action" aria-label="Bad response" aria-pressed={feedback === 'down'} onClick={() => thumb('down')}>
              <ThumbsDown weight={feedback === 'down' ? 'fill' : 'regular'} aria-hidden="true" focusable="false" />
            </button>
          </>
        )}
        {items.length > 0 && (
          <button
            ref={moreRef}
            type="button"
            className="cui-chat-msg__action"
            aria-label="More options"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? menuId : undefined}
            onClick={() => setMenuOpen(open => !open)}
          >
            <DotsThree weight="regular" aria-hidden="true" focusable="false" />
          </button>
        )}
        {timestamp && (
          <time className="cui-chat-msg__time" dateTime={timestamp} title={title}>
            {timeLabel ?? title}
          </time>
        )}
        <span className="cui-chat-msg__status" role="status" aria-live="polite">
          {status}
        </span>
      </div>
      {menu}
    </div>
  );
}
