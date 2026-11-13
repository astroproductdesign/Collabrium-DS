'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from '@phosphor-icons/react';
import { tokens } from '../../tokens/tokens';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';

/** What a step points at: a CSS selector, a ref, or a function returning the element. Leave out for a step about the whole page. */
export type TutorialTarget = string | RefObject<HTMLElement | null> | (() => HTMLElement | null);

export interface TutorialStep {
  /** The step's title: two lines at most (an authoring cap; it is never clamped). */
  title: string;
  /** A sentence or two: four lines at most (never clamped; past the viewport it scrolls). */
  body: string;
  /**
   * The element this step is about. Only something rendered and visible. Leave it out on the first step (the intro)
   * and the last (the sign-off), which dim the whole page.
   */
  target?: TutorialTarget;
}

/** How the tour ended: Done on the last step, Skip on the first, or the ×, Escape or a click on the scrim. */
export type TutorialEndReason = 'done' | 'skip' | 'close';

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title' | 'role' | 'onChange'>>;

export interface TutorialModalProps extends NativeDivProps {
  /** Whether the tour is running. */
  open: boolean;
  /** The stops, in order: an intro, at least one stop, and a sign-off. A single step is not a tour. */
  steps: TutorialStep[];
  /** Called when the tour ends, with why. Set `open` to false in it. */
  onEnd: (reason: TutorialEndReason) => void;
  /** Called with the new step's index when the reader moves. */
  onStepChange?: (index: number) => void;
}

// Geometry (DESIGN-SYSTEM.md Tutorial Modal): 6px pad round the target, 12px gap to the card, 16px gutter to the
// viewport, the card docked at 767px and below.
const PAD = tokens.spacing[6];
const GAP = tokens.spacing[12];
const GUTTER = tokens.spacing[16];
const DOCKED = '(max-width: 767px)';
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const SCROLL_KEYS = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}
interface Layout {
  spot: (Box & { radius: string }) | null;
  card: { top: number; left: number } | null;
  dockedTop: boolean;
  flip: { dx: number; dy: number; sx: number; sy: number } | null;
}

function resolve(target: TutorialTarget | undefined): HTMLElement | null {
  if (!target) return null;
  if (typeof target === 'string') return document.querySelector<HTMLElement>(target);
  if (typeof target === 'function') return target();
  return target.current;
}

/** Rendered and visible: not display:none, not visibility:hidden, with a box. */
function visible(el: HTMLElement | null): el is HTMLElement {
  if (!el || !el.isConnected || el.getClientRects().length === 0) return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden';
}

/**
 * The lock (three guards, DESIGN-SYSTEM.md Tutorial Modal): <html> overflow hidden with the scrollbar's width padded
 * back; wheel, touchmove and scroll keys blocked outside the card; and a capture-phase click guard that swallows every
 * click outside the card (a click on the scrim ends the tour). `aria-modal` stays false and nothing is made `inert`,
 * so a screen reader can still read the element a step describes.
 */
function lockPage(layer: HTMLElement, card: () => HTMLElement | null, onScrim: () => void) {
  const html = document.documentElement;
  const gap = window.innerWidth - html.clientWidth;
  const before = html.style.paddingRight;
  html.setAttribute('data-cui-tutorial-locked', '');
  if (gap > 0) html.style.paddingRight = `${gap}px`;
  const inCard = (t: EventTarget | null) => t instanceof Node && !!card()?.contains(t);
  const block = (event: Event) => {
    if (!inCard(event.target)) event.preventDefault();
  };
  const keys = (event: KeyboardEvent) => {
    if (SCROLL_KEYS.has(event.key) && !inCard(event.target)) event.preventDefault();
  };
  const click = (event: MouseEvent) => {
    if (inCard(event.target)) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.target instanceof Node && layer.contains(event.target)) onScrim();
  };
  document.addEventListener('wheel', block, { passive: false });
  document.addEventListener('touchmove', block, { passive: false });
  document.addEventListener('keydown', keys, true);
  document.addEventListener('click', click, true);
  return () => {
    html.removeAttribute('data-cui-tutorial-locked');
    html.style.paddingRight = before;
    document.removeEventListener('wheel', block);
    document.removeEventListener('touchmove', block);
    document.removeEventListener('keydown', keys, true);
    document.removeEventListener('click', click, true);
  };
}

/**
 * Collabrium Tutorial Modal: a numbered walkthrough. One part of the page is spotlighted at a time and explained in a
 * 340px card that grows out of it; the reader moves through the stops with Back and Next. The page is locked while it
 * runs; the ×, Escape and the scrim end it. At 767px and below the card docks to the bottom edge. A variant of Modal.
 * Ported from components.css `.c-modal-tutorial*` (1790–2031).
 */
export const TutorialModal = forwardRef<HTMLDivElement, TutorialModalProps>(function TutorialModal(
  { open, steps, onEnd, onStepChange, ...rest },
  ref,
) {
  const [index, setIndex] = useState(0);
  const [layout, setLayout] = useState<Layout>({ spot: null, card: null, dockedTop: false, flip: null });
  const [opening, setOpening] = useState(true);
  const layerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const endRef = useRef(onEnd);
  endRef.current = onEnd;
  // Read through a ref, so a host re-rendering with a new `steps` array doesn't replay the step's entrance.
  const stepsRef = useRef(steps);
  stepsRef.current = steps;
  // The step whose missing target has been warned about, so following it doesn't warn again.
  const warned = useRef(-1);
  const baseId = useId();
  const step = steps[Math.min(index, steps.length - 1)];
  const last = steps.length - 1;
  const ids = { title: `${baseId}-title`, count: `${baseId}-count`, body: `${baseId}-body` };

  // A fresh tour starts at the first step; focus returns to whatever opened it when it ends.
  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement | null;
    warned.current = -1;
    setIndex(0);
    return () => {
      returnTo.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open || !layerRef.current) return;
    return lockPage(layerRef.current, () => cardRef.current, () => endRef.current('close'));
  }, [open]);

  // Measures the target and places the spotlight and the card. `scroll` brings the target into view first (on a step
  // change, never when merely following it).
  const place = useCallback(
    (scroll: boolean, entering: boolean) => {
      const card = cardRef.current;
      const step = stepsRef.current[index];
      if (!card || !step) return;
      const docked = window.matchMedia(DOCKED).matches;
      const cw = card.offsetWidth;
      const ch = card.offsetHeight;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const el = resolve(step.target);
      if (step.target && !visible(el) && warned.current !== index) {
        warned.current = index;
        console.warn(`TutorialModal: step ${index + 1}'s target is missing or hidden; the step shows unanchored.`);
      }
      if (!visible(el)) {
        setLayout({
          spot: null,
          card: docked ? null : { top: Math.max(GUTTER, (vh - ch) / 2), left: Math.max(GUTTER, (vw - cw) / 2) },
          dockedTop: false,
          flip: null,
        });
        return;
      }

      if (scroll) {
        // Desktop: centre the target in the viewport. Docked: centre it in the band above the card. Taller than the
        // room: align its top with the gutter, so the reader sees where it starts.
        const r = el.getBoundingClientRect();
        const bandTop = GUTTER;
        const bandBottom = docked ? vh - GUTTER - ch - GAP : vh - GUTTER;
        const band = bandBottom - bandTop;
        const outside = r.top - PAD < bandTop || r.bottom + PAD > bandBottom;
        if (outside || docked) {
          const want = r.height + 2 * PAD > band ? bandTop + PAD : bandTop + (band - r.height) / 2;
          window.scrollBy({ top: r.top - want, behavior: 'instant' as ScrollBehavior });
        }
      }

      const r = el.getBoundingClientRect();
      const targetRadius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      const spot = {
        top: r.top - PAD,
        left: r.left - PAD,
        width: r.width + 2 * PAD,
        height: r.height + 2 * PAD,
        // The target's own corner radius plus the pad, so a pill gets a pill ring; radius-sm for a square target.
        radius: targetRadius > 0 ? `${targetRadius + PAD}px` : 'var(--radius-sm)',
      };

      if (docked) {
        // The card gives way to the target: when the bottom-docked card would cover it, the card docks to the top.
        const cardTop = vh - GUTTER - ch;
        setLayout({ spot, card: null, dockedTop: spot.top + spot.height > cardTop - GAP, flip: null });
        return;
      }

      // Placement by fit, in a fixed order: below, above, right, left, else centred. 16px gutter, 12px gap.
      const clampX = (x: number) => Math.min(Math.max(x, GUTTER), vw - GUTTER - cw);
      const clampY = (y: number) => Math.min(Math.max(y, GUTTER), vh - GUTTER - ch);
      const below = spot.top + spot.height + GAP;
      const above = spot.top - GAP - ch;
      const right = spot.left + spot.width + GAP;
      const left = spot.left - GAP - cw;
      let pos: { top: number; left: number };
      if (below + ch <= vh - GUTTER) pos = { top: below, left: clampX(spot.left) };
      else if (above >= GUTTER) pos = { top: above, left: clampX(spot.left) };
      else if (right + cw <= vw - GUTTER) pos = { top: clampY(spot.top), left: right };
      else if (left >= GUTTER) pos = { top: clampY(spot.top), left };
      else pos = { top: Math.max(GUTTER, (vh - ch) / 2), left: Math.max(GUTTER, (vw - cw) / 2) };

      // FLIP: the first frame sits on the target, scaled to it, clamped at 1 so the entrance is always a growth.
      const flip = entering
        ? { dx: r.left - pos.left, dy: r.top - pos.top, sx: Math.min(1, r.width / cw), sy: Math.min(1, r.height / ch) }
        : null;
      setLayout((prev) => ({ spot, card: pos, dockedTop: false, flip: flip ?? prev.flip }));
    },
    [index],
  );

  // Every step: a fresh card, placed before paint, its entrance from the target, focus on the card.
  useLayoutEffect(() => {
    if (!open) return;
    setOpening(true);
    place(true, true);
  }, [open, index, place]);

  // Focus moves to the card (the DS's Rule 12): an approved exception to focusing only a heading (decided 2026-11-12, Q-TUT-2).
  useEffect(() => {
    if (!open) return;
    cardRef.current?.focus({ preventScroll: true });
  }, [open, index]);

  // The spotlight follows its target: a resize of the target or the window re-measures (rule 8).
  useEffect(() => {
    if (!open) return;
    const el = resolve(stepsRef.current[index]?.target);
    const follow = () => place(false, false);
    const ro = new ResizeObserver(follow);
    if (el) ro.observe(el);
    if (cardRef.current) ro.observe(cardRef.current);
    window.addEventListener('resize', follow);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', follow);
    };
  }, [open, index, place]);

  const go = (to: number) => {
    setIndex(to);
    onStepChange?.(to);
  };

  // Escape ends the tour and goes no further (a host modal must not close with it); Tab stays inside the card.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        endRef.current('close');
        return;
      }
      const card = cardRef.current;
      if (event.key !== 'Tab' || !card) return;
      const items = [...card.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (items.length === 0) return;
      const first = items[0];
      const lastItem = items[items.length - 1];
      const active = document.activeElement;
      if (!card.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && (active === first || active === card)) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && active === lastItem) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open]);

  if (!open || !step || typeof document === 'undefined') return null;

  const shape = index === 0 ? 'intro' : index === last ? 'signoff' : 'stop';
  const cardStyle = {
    ...(layout.card ? { top: `${layout.card.top}px`, left: `${layout.card.left}px` } : {}),
    ...(layout.flip
      ? {
          '--tut-dx': `${layout.flip.dx}px`,
          '--tut-dy': `${layout.flip.dy}px`,
          '--tut-sx': layout.flip.sx,
          '--tut-sy': layout.flip.sy,
        }
      : {}),
  } as CSSProperties;

  return createPortal(
    <div ref={layerRef} className="cui-tutorial" data-open="">
      <div
        className="cui-tutorial__spot"
        data-none={layout.spot ? undefined : ''}
        style={
          layout.spot
            ? {
                top: `${layout.spot.top}px`,
                left: `${layout.spot.left}px`,
                width: `${layout.spot.width}px`,
                height: `${layout.spot.height}px`,
                borderRadius: layout.spot.radius,
              }
            : undefined
        }
      />
      <div
        {...rest}
        key={index}
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className="cui-tutorial__card"
        role="dialog"
        aria-modal="false"
        tabIndex={-1}
        aria-labelledby={ids.title}
        aria-describedby={`${ids.count} ${ids.body}`}
        data-shape={shape}
        data-opening={opening ? '' : undefined}
        data-docked-top={layout.dockedTop ? '' : undefined}
        style={cardStyle}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) setOpening(false);
        }}
      >
        <span className="cui-tutorial__close">
          <Button variant="ghost" size="sm" iconOnly icon={X} aria-label="Close the tour" onClick={() => onEnd('close')} />
        </span>
        <span className="cui-tutorial__kicker" id={ids.count}>
          {index + 1} of {steps.length}
        </span>
        {/* Always an h4 element, as the DS says, unlike Modal's headingLevel (decided 2026-11-12, Q-TUT-5). */}
        <h4 className="cui-tutorial__title" id={ids.title}>
          {step.title}
        </h4>
        <p className="cui-tutorial__body" id={ids.body}>
          {step.body}
        </p>
        <div className="cui-tutorial__actions">
          {shape === 'intro' ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => onEnd('skip')}>
                Skip the tour
              </Button>
              <Button variant="primary" size="sm" onClick={() => go(1)}>
                Show me
              </Button>
            </>
          ) : (
            <>
              {/* Back is Ghost, as Skip the tour: the DS names no variant (decided 2026-11-12, Q-TUT-3). */}
              <Button variant="ghost" size="sm" onClick={() => go(index - 1)}>
                Back
              </Button>
              {shape === 'signoff' ? (
                <Button variant="primary" size="sm" onClick={() => onEnd('done')}>
                  Done
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={() => go(index + 1)}>
                  Next
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
});
