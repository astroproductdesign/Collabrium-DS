'use client';

import { forwardRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { slideDistance, transition, type DurationToken, type EaseToken } from './motion';

export interface SlideUpProps {
  /** Whether the content is shown. Toggling it slides the content up into place, or down and out; when false the content is removed. */
  show?: boolean;
  /** Duration token. Default `base`, the DLS pairing for entrance/exit (DESIGN-SYSTEM.md lines 1089, 2222). */
  duration?: DurationToken;
  /** Easing token. Default `settle`, the DLS pairing for entrance/exit ("anchored arrivals"). */
  ease?: EaseToken;
  /** Animate on first render too. Default false. */
  appear?: boolean;
  children: ReactNode;
}

/**
 * Fades in while rising spacing-8 into place. Under reduced motion the rise
 * is dropped and only the fade remains (DESIGN-SYSTEM.md 2233: "drop the 8px
 * travel ... keep the fade").
 */
export const SlideUp = forwardRef<HTMLDivElement, SlideUpProps>(function SlideUp(
  { show = true, duration = 'base', ease = 'settle', appear = false, children },
  ref,
) {
  const reduce = useReducedMotion();
  const y = reduce ? 0 : slideDistance;
  const t = transition(duration, ease);
  return (
    <AnimatePresence initial={appear}>
      {show && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y }}
          transition={t}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
