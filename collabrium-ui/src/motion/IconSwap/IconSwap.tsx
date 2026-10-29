'use client';

import { forwardRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { transition } from '../motion';

export interface IconSwapProps {
  /** Names what is showing. When it changes, the old content shrinks and blurs out as the new content grows in. Use a short stable string such as `'play'` or `'pause'`. */
  swap: string;
  /** The icon, or any small content, for the current `swap`. */
  children: ReactNode;
}

/**
 * Swaps one icon for another when `swap` changes: the old one shrinks to 25%
 * and blurs out while the new one grows from 25% and comes into focus, over
 * `--duration-fast`. Under reduced motion the shrink and blur are dropped and
 * the two cross-fade. It adds no label: the control around it names the state.
 */
export const IconSwap = forwardRef<HTMLSpanElement, IconSwapProps>(function IconSwap({ swap, children }, ref) {
  const reduce = useReducedMotion();
  const away = reduce ? { opacity: 0 } : { opacity: 0, scale: 0.25, filter: 'blur(4px)' };
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span ref={ref} key={swap} className="cui-icon-swap" initial={away} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={away} transition={transition('fast', 'standard')}>
        {children}
      </motion.span>
    </AnimatePresence>
  );
});
