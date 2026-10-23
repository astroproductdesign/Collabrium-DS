'use client';

import { forwardRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { transition, type DurationToken, type EaseToken } from './motion';

export interface FadeInProps {
  /** Whether the content is shown. Toggling it fades the content in or out; when false the content is removed from the page. */
  show?: boolean;
  /** Fade duration token. Use `fast` for small popovers and hints, `base` (default) for ordinary UI. */
  duration?: DurationToken;
  /** Easing token. Keep `standard` unless the motion belongs to an element (e.g. `settle` for Earth). */
  ease?: EaseToken;
  /** Fade in on first render too. Default false: content that is present on load just appears. */
  appear?: boolean;
  children: ReactNode;
}

/**
 * Fades its children in and out. Opacity only, so it is the same with or
 * without reduced motion: fading is not travel, and the DLS keeps fades
 * under reduced motion ("drop the travel, keep the fade").
 */
export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(function FadeIn(
  { show = true, duration = 'base', ease = 'standard', appear = false, children },
  ref,
) {
  const t = transition(duration, ease);
  return (
    <AnimatePresence initial={appear}>
      {show && (
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
