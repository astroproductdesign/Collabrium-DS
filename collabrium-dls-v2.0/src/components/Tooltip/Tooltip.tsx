'use client';

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import type { WithoutStyling } from '../../utils/types';

/** Which side of the trigger the bubble prefers. It flips to the opposite side when there isn't room. */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * How the tooltip text relates to the trigger.
 * - `description`: extra information; the trigger has its own name. Wired with `aria-describedby`.
 * - `label`: the tooltip text is the trigger's only name (an icon button with no visible label). Set as the
 *   trigger's `aria-label`, so it is always announced; the bubble only shows it visually.
 */
export type TooltipRole = 'description' | 'label';

type NativeSpanProps = WithoutStyling<Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'content' | 'color'>>;

export interface TooltipProps extends NativeSpanProps {
  /** The tooltip text: supplementary, never interactive. 60 characters at most; longer belongs in an Info Banner. */
  content: string;
  /**
   * The trigger: one focusable element (a Button, a link, an element with `tabIndex={0}`). It gets
   * `aria-describedby` (or `aria-label`, see `role`) added to it.
   */
  children: ReactElement<Record<string, unknown>>;
  /** The side the bubble prefers. Default `top`. It flips to the opposite side, and shifts along it, to stay in view. */
  placement?: TooltipPlacement;
  /** `label` when the tooltip text is the trigger's only name (an icon button); `description` otherwise. Default `description`. */
  role?: TooltipRole;
}

const GAP = 8; // spacing-8: the gap from the trigger and the margin kept from the viewport edge.
const OPPOSITE: Record<TooltipPlacement, TooltipPlacement> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
const LONG_PRESS_MS = 500;

// Only one tooltip shows at a time across the page: showing one hides the last.
let hideOpenTooltip: (() => void) | null = null;

interface Position {
  top: number;
  left: number;
  placement: TooltipPlacement;
}

function place(trigger: DOMRect, bw: number, bh: number, preferred: TooltipPlacement): Position {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const at = (p: TooltipPlacement) => {
    if (p === 'top') return { top: trigger.top - bh - GAP, left: trigger.left + trigger.width / 2 - bw / 2 };
    if (p === 'bottom') return { top: trigger.bottom + GAP, left: trigger.left + trigger.width / 2 - bw / 2 };
    if (p === 'left') return { top: trigger.top + trigger.height / 2 - bh / 2, left: trigger.left - bw - GAP };
    return { top: trigger.top + trigger.height / 2 - bh / 2, left: trigger.right + GAP };
  };
  // Does the placement fit on its own axis (the side it sits on)?
  const fits = (p: TooltipPlacement) => {
    const { top, left } = at(p);
    if (p === 'top') return top >= GAP;
    if (p === 'bottom') return top + bh <= vh - GAP;
    if (p === 'left') return left >= GAP;
    return left + bw <= vw - GAP;
  };
  // Flip before shift; bottom is the final fallback.
  const placement = fits(preferred) ? preferred : fits(OPPOSITE[preferred]) ? OPPOSITE[preferred] : 'bottom';
  let { top, left } = at(placement);
  // Shift along the cross axis until it clears the viewport edge by spacing-8.
  if (placement === 'top' || placement === 'bottom') left = Math.min(Math.max(left, GAP), vw - GAP - bw);
  else top = Math.min(Math.max(top, GAP), vh - GAP - bh);
  return { top, left, placement };
}

/**
 * Collabrium Tooltip: a short line of supplementary, non-interactive information that shows on hover or keyboard
 * focus, instantly, in a dark bubble beside its trigger. Rendered in a portal at the document body so
 * nothing clips it. Ported from components.css `.c-tooltip-wrap` and `.c-tooltip-bubble` (3577–3593).
 */
export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  { content, children, placement = 'top', role = 'description', onMouseEnter, onMouseLeave, onFocus, onBlur, onPointerDown, onPointerUp, onPointerCancel, ...rest },
  ref,
) {
  const id = useId();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const pressTimer = useRef<number | undefined>(undefined);

  useEffect(() => setMounted(true), []);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  // Position the bubble before it paints, from the trigger's own rectangle.
  useLayoutEffect(() => {
    if (!visible || !wrapRef.current || !bubbleRef.current) return;
    const bubble = bubbleRef.current;
    setPosition(place(wrapRef.current.getBoundingClientRect(), bubble.offsetWidth, bubble.offsetHeight, placement));
  }, [visible, placement, content]);

  // While shown: one at a time, and Escape, page scroll or a tap elsewhere hides it.
  useEffect(() => {
    if (!visible) return;
    if (hideOpenTooltip && hideOpenTooltip !== hide) hideOpenTooltip();
    hideOpenTooltip = hide;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hide();
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) hide();
    };
    // Page scroll hides a hover or touch tooltip. While the trigger holds keyboard focus the bubble follows it instead,
    // so the scroll that brings a tabbed-to trigger into view doesn't hide its tooltip (TOOLTIP-7).
    const onScroll = () => {
      const wrap = wrapRef.current;
      if (wrap && bubbleRef.current && wrap.contains(document.activeElement))
        setPosition(place(wrap.getBoundingClientRect(), bubbleRef.current.offsetWidth, bubbleRef.current.offsetHeight, placement));
      else hide();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('scroll', onScroll, { capture: true });
      if (hideOpenTooltip === hide) hideOpenTooltip = null;
    };
  }, [visible, hide, placement]);

  useEffect(() => () => window.clearTimeout(pressTimer.current), []);

  const trigger = isValidElement(children)
    ? cloneElement(children, role === 'label' ? { 'aria-label': content } : { 'aria-describedby': id })
    : children;

  const bubble: ReactNode = (
    <span
      ref={bubbleRef}
      id={id}
      role="tooltip"
      aria-hidden={role === 'label' ? true : undefined}
      className="cui-tooltip__bubble"
      data-placement={position?.placement ?? placement}
      data-visible={visible && position ? '' : undefined}
      data-portaled={mounted ? '' : undefined}
      style={mounted && position ? { top: position.top, left: position.left } : undefined}
    >
      {content}
    </span>
  );

  return (
    <span
      {...rest}
      ref={node => {
        wrapRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className="cui-tooltip"
      onMouseEnter={event => {
        show();
        onMouseEnter?.(event);
      }}
      onMouseLeave={event => {
        hide();
        onMouseLeave?.(event);
      }}
      onFocus={event => {
        show();
        onFocus?.(event);
      }}
      onBlur={event => {
        hide();
        onBlur?.(event);
      }}
      onPointerDown={event => {
        // Touch: a long press (500ms) shows it.
        if (event.pointerType === 'touch') pressTimer.current = window.setTimeout(show, LONG_PRESS_MS);
        onPointerDown?.(event);
      }}
      onPointerUp={event => {
        window.clearTimeout(pressTimer.current);
        onPointerUp?.(event);
      }}
      onPointerCancel={event => {
        window.clearTimeout(pressTimer.current);
        onPointerCancel?.(event);
      }}
    >
      {trigger}
      {/* Always in the DOM (opacity 0 when hidden), so aria-describedby finds it; in a body portal once mounted. */}
      {mounted ? createPortal(bubble, document.body) : bubble}
    </span>
  );
});
