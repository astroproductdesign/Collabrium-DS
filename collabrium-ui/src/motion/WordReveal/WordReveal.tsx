'use client';

import { forwardRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { slideDistance, transition, type DurationToken, type EaseToken } from '../motion';
import { SplitFrame, wordStagger } from '../lib/textFx';

export interface WordRevealProps {
  /** The text. It is split into words, each of which rises into place. */
  text: string;
  /** Duration token for each word. Default `slow`. */
  duration?: DurationToken;
  /** Easing token. Default `standard`. */
  ease?: EaseToken;
}

/**
 * Each word rises 8px into place and grows from 90% size while it fades in,
 * one after another, once, as the text scrolls into view. Under reduced
 * motion the rise and the growth are dropped and only the fade remains.
 */
export const WordReveal = forwardRef<HTMLSpanElement, WordRevealProps>(function WordReveal({ text, duration = 'slow', ease = 'standard' }, ref) {
  const reduce = useReducedMotion();
  const word: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: slideDistance, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: transition(duration, ease) },
  };
  const group: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: reduce ? 0 : wordStagger } } };
  return (
    <SplitFrame text={text} className="cui-motion-text">
      <motion.span ref={ref} className="cui-motion-words" variants={group} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }}>
        {text.split(/\s+/).filter(Boolean).map((w, i) => (
          <motion.span key={i} className="cui-motion-text__piece" variants={word}>
            {w}
          </motion.span>
        ))}
      </motion.span>
    </SplitFrame>
  );
});
