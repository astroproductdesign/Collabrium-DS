'use client';

import { forwardRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { slideDistance, transition, type DurationToken, type EaseToken } from '../motion';

/** Where the content starts, and so which way it travels into place. */
export type SlideFrom = 'below' | 'above' | 'right' | 'left';

export interface SlideBaseProps {
  /** Whether the content is shown. Toggling it slides the content into place, or back out; when false the content is removed. */
  show?: boolean;
  /** Duration token. Default `base`, the DLS pairing for entrance/exit (DESIGN-SYSTEM.md lines 1089, 2222). */
  duration?: DurationToken;
  /** Easing token. Default `settle`, the DLS pairing for entrance/exit ("anchored arrivals"). */
  ease?: EaseToken;
  /** Animate on first render too. Default false. */
  appear?: boolean;
  children: ReactNode;
}

const offset = (from: SlideFrom, d: number) => {
  switch (from) {
    case 'below':
      return { y: d };
    case 'above':
      return { y: -d };
    case 'right':
      return { x: d };
    default:
      return { x: -d };
  }
};

/**
 * The one drawing behind Slide up, Slide down, Slide left and Slide right:
 * fades in while travelling spacing-8 into place. Under reduced motion the
 * travel is dropped and only the fade remains (DESIGN-SYSTEM.md 2233: "drop
 * the 8px travel ... keep the fade").
 */
export const Slide = forwardRef<HTMLDivElement, SlideBaseProps & { from: SlideFrom }>(function Slide(
  { from, show = true, duration = 'base', ease = 'settle', appear = false, children },
  ref,
) {
  const reduce = useReducedMotion();
  const start = { opacity: 0, ...offset(from, reduce ? 0 : slideDistance) };
  return (
    <AnimatePresence initial={appear}>
      {show && (
        <motion.div ref={ref} initial={start} animate={{ opacity: 1, x: 0, y: 0 }} exit={start} transition={transition(duration, ease)}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
