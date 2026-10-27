'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { ArrowUp, CaretDown, Check, DotsThree, Image, Microphone, Paperclip, Sparkle, Stop } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';

/**
 * - `floating`: pinned to the bottom of a content region, free over the canvas. It collapses to a pill on scroll
 *   and opens the chat when pressed.
 * - `inline`: in flow, as a chat window's composer. It never collapses and has no mark or typing line.
 */
export type PromptInputBarVariant = 'floating' | 'inline';

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'onChange'>>;

export interface PromptInputBarProps extends NativeDivProps {
  /** Floating bar or inline composer. Required, so every bar is a deliberate choice. */
  variant: PromptInputBarVariant;
  /** Names the text box for assistive tech (the visible hint is decorative). "Ask anything". */
  label?: string;
  /** What the person has typed, for a controlled bar. Use it with `onValueChange`. */
  value?: string;
  /** What to start with, for an uncontrolled bar. */
  defaultValue?: string;
  /** Called with the new text on every edit. */
  onValueChange?: (value: string) => void;
  /**
   * The hint shown in the `inline` variant's empty box ("Reply to Collabrium…"). The floating bar shows its typing
   * line instead and ignores this.
   */
  placeholder?: string;
  /** Called with the text when the person presses Send (or Enter in the inline variant, with text in the box). */
  onSend?: (value: string) => void;
  /**
   * `floating` only. Called when the person presses the bar (card or pill) or presses Enter in its box: it opens the
   * chat. Not wired to focus, because the chat hands focus back to this bar when it closes.
   */
  onLaunch?: () => void;
  /**
   * `floating` only. The chat is open: the bar fades out and stops taking presses, so it is not sitting under the
   * window it became.
   */
  launched?: boolean;
  /**
   * `floating` only. The scrolling region the bar floats over. The bar collapses to a pill once it has scrolled
   * past 240px and expands again only when it is back within 8px of the top. Leave it out to control `collapsed` yourself.
   */
  scrollContainer?: RefObject<HTMLElement | null>;
  /** `floating` only. Force the pose, when you have no `scrollContainer`. Ignored while one is set. */
  collapsed?: boolean;
  /** `floating` only. Pixels the collapsed pill parks sideways (negative is left), for a dock beside it. Measure it; never hard-code it. */
  parkShift?: number;
  /** `floating` only. Pixels a side panel pushes the bar sideways, so it never sits under the panel. Measure it. */
  pushShift?: number;
  /**
   * `floating` only. The two lines the box types into, one time: the first, a pause, its deletion, then the second,
   * which stays. Both leave the box when anyone types.
   */
  typingLines?: [string, string];
  /** `floating` only. The short fixed line shown instead of the typing, when the person asks for reduced motion. */
  staticHint?: string;
  /** The models in the switcher, in order. At least one. */
  models: string[];
  /** The chosen model, for a controlled switcher. Use it with `onModelChange`. Defaults to the first. */
  model?: string;
  /** Called with the model's name when the person picks one. */
  onModelChange?: (model: string) => void;
  /**
   * The AI is working. Send becomes Stop, as the system asks of every composer while an operation runs or a
   * decision is pending. Press it: `onStop` runs. Put it back to `false` the moment the work ends.
   */
  working?: boolean;
  /** Called when Stop is pressed while `working`. Stop interrupts the AI's task, not just the bar. */
  onStop?: () => void;
  /** Called when Add image is pressed. */
  onAddImage?: () => void;
  /** Called when Attach file is pressed. */
  onAttachFile?: () => void;
  /** Called when More options is pressed. */
  onMoreOptions?: () => void;
  /** Called when Voice input is pressed. */
  onVoiceInput?: () => void;
}

const COLLAPSE_AT = 240;
const EXPAND_AT = 8;
const TYPE_MS = 35;
const DELETE_MS = 18;
const PULSE_MS = 5000;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Collabrium Prompt input bar. Where the person asks the AI: a card with one
 * text box and a toolbar (add image, attach file, more options, a model
 * switcher, voice input, Send). Two variants: a floating bar that collapses
 * to a pill on scroll and opens the chat, and an inline composer for the chat
 * window. Ported from components.css `.c-prompt-bar*`.
 *
 * The component owns what is local to it: the entrance and the pose change
 * (Rules in DESIGN-SYSTEM.md "States"), the scroll collapse at 240 and 8
 * (floating), the one-shot typing line that jumps to its end when the bar
 * collapses or the person types, the model switcher and its upward menu, and
 * Send becoming Stop. The host owns the rest: measuring where the pill parks
 * and how far a side panel pushes it, opening and closing the chat, and
 * everything the buttons do.
 */
export const PromptInputBar = forwardRef<HTMLDivElement, PromptInputBarProps>(function PromptInputBar(props, ref) {
  const {
    variant,
    label = 'Ask anything',
    value: valueProp,
    defaultValue = '',
    onValueChange,
    placeholder,
    onSend,
    onLaunch,
    launched = false,
    scrollContainer,
    collapsed: collapsedProp = false,
    parkShift = 0,
    pushShift = 0,
    typingLines = ['Everything else lives right here.', 'I am your Collabrium assistant, let me help you'],
    staticHint = 'Ask me anything',
    models,
    model: modelProp,
    onModelChange,
    working = false,
    onStop,
    onAddImage,
    onAttachFile,
    onMoreOptions,
    onVoiceInput,
    onClick,
    ...rest
  } = props;
  const floating = variant === 'floating';
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = valueProp ?? internalValue;
  const [internalModel, setInternalModel] = useState(models[0]);
  const model = modelProp ?? internalModel;
  const [revealed, setRevealed] = useState(!floating);
  const [morphable, setMorphable] = useState(!floating);
  const [scrollCollapsed, setScrollCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPlace, setMenuPlace] = useState<{ right: number; bottom: number }>({ right: 0, bottom: 0 });
  const [ghost, setGhost] = useState('');
  const [pulsing, setPulsing] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const focusedRef = useRef(false);
  const collapsedRef = useRef(false);
  const landRef = useRef<(() => void) | null>(null);
  const menuId = useId();

  const collapsed = floating && (scrollContainer ? scrollCollapsed : collapsedProp);
  collapsedRef.current = collapsed;
  const typing = value !== '';

  // The entrance: fade and rise in, once, then the pose changes run on the morph timing (is-morphable).
  useEffect(() => {
    if (!floating) return;
    const frame = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(frame);
  }, [floating]);
  useEffect(() => {
    const bar = barRef.current;
    if (!floating || !revealed || !bar) return;
    const done = (event: TransitionEvent) => {
      if (event.target === bar && event.propertyName === 'transform') setMorphable(true);
    };
    bar.addEventListener('transitionend', done);
    const guard = window.setTimeout(() => setMorphable(true), 3000);
    return () => {
      bar.removeEventListener('transitionend', done);
      window.clearTimeout(guard);
    };
  }, [floating, revealed]);

  // Scroll collapse: asymmetric on purpose (collapse past 240, expand only within 8), so it never flip-flops at one line.
  useEffect(() => {
    const el = scrollContainer?.current;
    if (!floating || !el) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrollCollapsed(was => (was ? el.scrollTop > EXPAND_AT : el.scrollTop > COLLAPSE_AT));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [floating, scrollContainer]);

  // The typing line: one time, never a loop. Every step waits while the box is focused. If the bar collapses
  // first, it jumps to the resting line. A guard lands the resting line whatever happens.
  useEffect(() => {
    if (!floating) return;
    const [first, second] = typingLines;
    if (prefersReducedMotion()) {
      setGhost(second);
      return;
    }
    let cancelled = false;
    let timer = 0;
    const land = () => {
      cancelled = true;
      window.clearTimeout(timer);
      setPulsing(false);
      setGhost(second);
    };
    const wait = (ms: number, next: () => void) => {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        if (collapsedRef.current) return land();
        if (focusedRef.current) return wait(200, next);
        next();
      }, ms);
    };
    const typeText = (text: string, index: number, done: () => void) => {
      setGhost(text.slice(0, index));
      setPulsing(true);
      if (index >= text.length) return done();
      wait(TYPE_MS, () => typeText(text, index + 1, done));
    };
    const deleteText = (text: string, index: number, done: () => void) => {
      setGhost(text.slice(0, index));
      if (index <= 0) return done();
      wait(DELETE_MS, () => deleteText(text, index - 1, done));
    };
    landRef.current = land;
    if (collapsedRef.current) {
      land();
      return;
    }
    const guard = window.setTimeout(land, 60000);
    const start = window.setTimeout(() => {
      typeText(first, 1, () =>
        wait(PULSE_MS, () => {
          setPulsing(false);
          deleteText(first, first.length - 1, () =>
            wait(TYPE_MS, () =>
              typeText(second, 1, () => {
                setPulsing(false);
                window.clearTimeout(guard);
              }),
            ),
          );
        }),
      );
    }, 300);
    return () => {
      cancelled = true;
      landRef.current = null;
      window.clearTimeout(timer);
      window.clearTimeout(start);
      window.clearTimeout(guard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floating, typingLines[0], typingLines[1]]);
  // Collapsing mid-sequence jumps straight to the resting line, so a half-typed fragment never shows in the pill.
  useEffect(() => {
    if (collapsed) landRef.current?.();
  }, [collapsed]);

  // The model menu is a portal to the body, placed from the trigger: the bar's own overflow and transform
  // would clip it or move it. It opens upward, right-aligned.
  const place = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) setMenuPlace({ right: window.innerWidth - rect.right, bottom: window.innerHeight - rect.top + 8 });
  }, []);
  useLayoutEffect(() => {
    if (menuOpen) place();
  }, [menuOpen, place]);
  useEffect(() => {
    if (!menuOpen) return;
    const away = (event: Event) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !triggerRef.current?.contains(target)) setMenuOpen(false);
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
    if (menuOpen) menuRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus();
  }, [menuOpen]);

  const choose = (next: string) => {
    if (modelProp === undefined) setInternalModel(next);
    onModelChange?.(next);
    setMenuOpen(false);
    triggerRef.current?.focus();
  };
  const menuKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);
    const at = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenuOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[(at + 1) % items.length]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[(at - 1 + items.length) % items.length]?.focus();
    } else if (event.key === 'Tab') {
      setMenuOpen(false);
    }
  };

  const change = (next: string) => {
    if (valueProp === undefined) setInternalValue(next);
    onValueChange?.(next);
  };
  const send = () => {
    if (working) onStop?.();
    else onSend?.(value);
  };
  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
    event.preventDefault();
    if (floating) onLaunch?.();
    else if (!working && value.trim() !== '') onSend?.(value);
  };
  const press = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (!floating || event.defaultPrevented) return;
    // A press on a control does that control's job; a press anywhere else on the card or pill opens the chat.
    if ((event.target as HTMLElement).closest('button, [role="listbox"]')) return;
    onLaunch?.();
  };

  const setRefs = (node: HTMLDivElement | null) => {
    barRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
  };
  // The sideways geometry is measured by the host and handed in as numbers; it lives in two custom properties so the
  // pose and the entrance can change each term on its own.
  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    bar.style.setProperty('--prompt-bar-shift', `${parkShift}px`);
    bar.style.setProperty('--prompt-bar-push', `${pushShift}px`);
  }, [parkShift, pushShift]);

  const toolbar = (
    <div className="cui-prompt-bar__toolbar">
      <div className="cui-prompt-bar__group">
        <Button variant="ghost" size="sm" iconOnly icon={Image} aria-label="Add image" onClick={onAddImage} />
        <Button variant="ghost" size="sm" iconOnly icon={Paperclip} aria-label="Attach file" onClick={onAttachFile} />
        <Button variant="ghost" size="sm" iconOnly icon={DotsThree} aria-label="More options" onClick={onMoreOptions} />
      </div>
      <div className="cui-prompt-bar__group">
        <div className="cui-prompt-bar__model">
          <Button
            variant="ghost"
            size="sm"
            ref={triggerRef}
            data-part="model-trigger"
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? menuId : undefined}
            onClick={() => setMenuOpen(open => !open)}
          >
            <span className="cui-prompt-bar__model-label">{model}</span>
            <CaretDown className="cui-prompt-bar__model-caret" aria-hidden="true" focusable="false" />
          </Button>
        </div>
        <Button variant="ghost" size="sm" iconOnly icon={Microphone} aria-label="Voice input" onClick={onVoiceInput} />
        <Button
          variant="primary"
          size="sm"
          iconOnly
          icon={working ? Stop : ArrowUp}
          aria-label={working ? 'Stop' : 'Send'}
          data-part="send"
          onClick={send}
        />
      </div>
    </div>
  );

  const menu: ReactNode =
    menuOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={menuRef}
            id={menuId}
            className="cui-prompt-bar__model-menu"
            role="listbox"
            aria-label="AI model"
            style={{ right: menuPlace.right, bottom: menuPlace.bottom }}
            onKeyDown={menuKeys}
          >
            {models.map(name => (
              <button
                key={name}
                type="button"
                role="option"
                aria-selected={name === model}
                className="cui-prompt-bar__model-item"
                data-active={name === model ? '' : undefined}
                onClick={() => choose(name)}
              >
                <span>{name}</span>
                <Check aria-hidden="true" focusable="false" />
              </button>
            ))}
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      {...rest}
      ref={setRefs}
      className="cui-prompt-bar"
      data-variant={variant}
      data-revealed={revealed || undefined}
      data-morphable={morphable || undefined}
      data-collapsed={collapsed || undefined}
      data-launched={launched || undefined}
      onClick={press}
    >
      <div className="cui-prompt-bar__glow cui-prompt-bar__glow--outer" aria-hidden="true" />
      <div className="cui-prompt-bar__glow cui-prompt-bar__glow--inner" aria-hidden="true" />
      <div className="cui-prompt-bar__surface">
        {floating && (
          <span className="cui-prompt-bar__mark" aria-hidden="true">
            <Sparkle weight="fill" focusable="false" />
          </span>
        )}
        <div className="cui-prompt-bar__field" data-typing={typing || undefined}>
          <input
            ref={inputRef}
            type="text"
            className="cui-prompt-bar__input"
            aria-label={label}
            value={value}
            placeholder={floating ? undefined : placeholder}
            onChange={event => change(event.target.value)}
            onFocus={() => (focusedRef.current = true)}
            onBlur={() => (focusedRef.current = false)}
            onKeyDown={keyDown}
          />
          {floating && (
            <>
              <div className="cui-prompt-bar__ghost" aria-hidden="true">
                <span className="cui-prompt-bar__ghost-text" data-pulsing={pulsing || undefined}>
                  {ghost}
                </span>
              </div>
              <span className="cui-prompt-bar__ghost-static" aria-hidden="true">
                {staticHint}
              </span>
            </>
          )}
        </div>
        <div className="cui-prompt-bar__more">{toolbar}</div>
      </div>
      {menu}
    </div>
  );
});
