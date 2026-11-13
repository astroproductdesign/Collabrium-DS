'use client';

import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { transition } from '../motion';

export interface PlayPauseMorphProps {
  /** True shows the pause bars; false shows the play triangle. */
  playing: boolean;
}

/** The two shapes, each as four points so one path can turn into the other. */
const PLAYING = { left: 'M 6 5 L 10 5 L 10 19 L 6 19 Z', right: 'M 14 5 L 18 5 L 18 19 L 14 19 Z' };
const PAUSED = { left: 'M 7 5 L 13 8.5 L 13 15.5 L 7 19 Z', right: 'M 13 8.5 L 19 12 L 19 12 L 13 15.5 Z' };

/**
 * An icon that morphs between play and pause: two shapes that turn into each
 * other over `--duration-morph` with `--ease-morph`. It is 1em square in the
 * colour of its text, so put it in a Button and set the Button's label. It is
 * hidden from assistive technology: the control around it names the state.
 * Under reduced motion it changes at once.
 */
export const PlayPauseMorph = forwardRef<SVGSVGElement, PlayPauseMorphProps>(function PlayPauseMorph({ playing }, ref) {
  const reduce = useReducedMotion();
  const shape = playing ? PLAYING : PAUSED;
  const t = reduce ? { duration: 0 } : transition('morph', 'morph');
  return (
    <svg ref={ref} className="cui-play-pause" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <motion.path initial={false} animate={{ d: shape.left }} transition={t} fill="currentColor" />
      <motion.path initial={false} animate={{ d: shape.right }} transition={t} fill="currentColor" />
    </svg>
  );
});
