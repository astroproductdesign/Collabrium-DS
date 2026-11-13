'use client';

import { forwardRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { duration as seconds, ease as easings } from '../motion';
import { tokens } from '../../tokens/tokens';
import { SplitFrame } from '../lib/textFx';

export interface TextRevealProps {
  /** The text. Each line, split on a new line (`\n`), rises out of a mask in turn. */
  text: string;
}

/**
 * Each line rises out from under a mask as the text scrolls into view, one
 * after another, once: `--duration-reveal` with `--ease-reveal` and the
 * larger row stagger, `--stagger-md`. Under reduced motion the rise is
 * dropped and only the fade remains.
 */
export const TextReveal = forwardRef<HTMLSpanElement, TextRevealProps>(function TextReveal({ text }, ref) {
  const reduce = useReducedMotion();
  const line: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: '100%' },
    visible: { opacity: 1, y: 0, transition: { duration: seconds.reveal, ease: [...easings.reveal] as [number, number, number, number] } },
  };
  const group: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: reduce ? 0 : tokens.stagger.md / 1000 } } };
  return (
    <SplitFrame text={text.replace(/\n/g, ' ')} className="cui-motion-text">
      <motion.span ref={ref} className="cui-motion-lines" variants={group} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20%' }}>
        {text.split('\n').map((l, i) => (
          <span key={i} className="cui-motion-lines__mask">
            <motion.span className="cui-motion-lines__line" variants={line}>
              {l}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </SplitFrame>
  );
});
