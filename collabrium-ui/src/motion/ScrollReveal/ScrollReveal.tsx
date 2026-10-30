'use client';

import { forwardRef, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { slideDistance, transition, type DurationToken, type EaseToken } from '../motion';

export interface ScrollRevealProps {
  /** The content to reveal. */
  children: ReactNode;
  /** Where the content arrives from: `below` (default), `above`, `right` or `left`. */
  from?: 'below' | 'above' | 'right' | 'left';
  /** Duration token. Default `reveal`, the DLS pairing for entrance reveals. */
  duration?: DurationToken;
  /** Easing token. Default `reveal`. */
  ease?: EaseToken;
}

const offsets = { below: { y: 1 }, above: { y: -1 }, right: { x: 1 }, left: { x: -1 } } as const;

/**
 * Fades its content in while it travels 8px into place, once, when it scrolls
 * into view (15% inside the window). Unlike the Slide pieces it is not shown
 * or hidden by a prop: scrolling is the trigger. Under reduced motion the
 * travel is dropped and only the fade remains.
 */
export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(function ScrollReveal(
  { children, from = 'below', duration = 'reveal', ease = 'reveal' },
  ref,
) {
  const reduce = useReducedMotion();
  const o = offsets[from];
  const start = { opacity: 0, x: reduce ? 0 : ('x' in o ? o.x * slideDistance : 0), y: reduce ? 0 : ('y' in o ? o.y * slideDistance : 0) };
  return (
    <motion.div ref={ref} initial={start} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '-15%' }} transition={transition(duration, ease)}>
      {children}
    </motion.div>
  );
});
