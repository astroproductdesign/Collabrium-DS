'use client';

import { forwardRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { slideDistance, transition, type DurationToken, type EaseToken } from '../motion';
import { SplitFrame, charStagger } from '../lib/textFx';

export interface BlurTextProps {
  /** The text. It is split into letters, each of which comes into focus. */
  text: string;
  /** Duration token for each letter. Default `slow`. */
  duration?: DurationToken;
  /** Easing token. Default `standard`. */
  ease?: EaseToken;
}

/**
 * Each letter fades in from a blur as the text scrolls into view, one after
 * another, once. Under reduced motion the blur is dropped and only the fade
 * remains. The text is read as one sentence by assistive technology.
 */
export const BlurText = forwardRef<HTMLSpanElement, BlurTextProps>(function BlurText({ text, duration = 'slow', ease = 'standard' }, ref) {
  const reduce = useReducedMotion();
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, filter: `blur(${slideDistance}px)` };
  const letter: Variants = { hidden, visible: { opacity: 1, filter: 'blur(0px)', transition: transition(duration, ease) } };
  const group: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: reduce ? 0 : charStagger } } };
  return (
    <SplitFrame text={text} className="cui-motion-text">
      <motion.span ref={ref} className="cui-motion-text__row" variants={group} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }}>
        {Array.from(text).map((ch, i) => (
          <motion.span key={i} className="cui-motion-text__piece" variants={letter}>
            {ch}
          </motion.span>
        ))}
      </motion.span>
    </SplitFrame>
  );
});
