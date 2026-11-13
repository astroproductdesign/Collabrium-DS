'use client';

import { forwardRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { slideDistance } from '../motion';
import { SplitFrame, charStagger } from '../lib/textFx';

export interface CharacterStaggerProps {
  /** The text. It is split into letters, each of which pops into place. */
  text: string;
}

/**
 * Each letter rises 8px into place and settles from 80% size with a spring,
 * one after another, once, as the text scrolls into view. The spring is
 * Amicro's own and overshoots slightly: the DLS has no such motion
 * (Q-MOT-6). Under reduced motion the rise and the pop are dropped and only
 * the fade remains.
 */
export const CharacterStagger = forwardRef<HTMLSpanElement, CharacterStaggerProps>(function CharacterStagger({ text }, ref) {
  const reduce = useReducedMotion();
  const letter: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: slideDistance, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 18, mass: 0.8 } },
  };
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
