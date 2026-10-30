'use client';

import { forwardRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { transition, type DurationToken, type EaseToken } from '../motion';

export interface CollapseProps {
  /** Whether the content is expanded. When false the content is removed after it collapses. */
  open: boolean;
  /**
   * Duration token. Default `base` with `settle`, the DLS expand/collapse
   * pairing (DESIGN-SYSTEM.md 2750, Rule 6). SidebarNav uses its own slower
   * `slow` + `standard` variant (line 8160).
   */
  duration?: DurationToken;
  /** Easing token. Default `settle`. */
  ease?: EaseToken;
  /** Animate on first render too. Default false. */
  appear?: boolean;
  children: ReactNode;
}

/**
 * Expands and collapses its children by height. Under reduced motion the
 * height change is instant (height is travel); the content still shows and
 * hides. The wrapper clips overflow only while collapsed or animating.
 */
export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(function Collapse(
  { open, duration = 'base', ease = 'settle', appear = false, children },
  ref,
) {
  const reduce = useReducedMotion();
  const t = reduce ? { duration: 0 } : transition(duration, ease);
  return (
    <AnimatePresence initial={appear}>
      {open && (
        <motion.div
          ref={ref}
          initial={{ height: 0 }}
          animate={{ height: 'auto', transitionEnd: { overflow: 'visible' } }}
          exit={{ height: 0, overflow: 'hidden' }}
          transition={t}
          // starts hidden so content doesn't spill while growing
          style={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
