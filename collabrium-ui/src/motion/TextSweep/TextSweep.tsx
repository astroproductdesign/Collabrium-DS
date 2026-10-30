'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { duration as seconds } from '../motion';
import { rampRungs, type RampHue } from '../lib/ramp';

export interface TextSweepProps {
  /** The text. A band of colour sweeps across it from left to right, leaving the text in its Neutral-9 behind. */
  text: string;
  /** One of five hues for the band: Orange, Salmon Pink, Green, Navy or Amber. Default `navy`. */
  hue?: RampHue;
}

/** The half-width of the band, as a percentage of the text. */
const BAND = 17;
const START = -BAND;
const END = 100 + BAND;
const sweepEase = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

function gradient(pos: number, colors: readonly string[]) {
  const from = pos - BAND;
  const to = pos + BAND;
  if (from >= 100) return 'linear-gradient(90deg, var(--cui-sweep-ink), var(--cui-sweep-ink))';
  const parts: string[] = [];
  if (from > 0) parts.push('var(--cui-sweep-ink) 0%', `var(--cui-sweep-ink) ${from.toFixed(2)}%`);
  colors.forEach((c, i) => parts.push(`${c} ${(from + (i / (colors.length - 1)) * BAND * 2).toFixed(2)}%`));
  if (to < 100) parts.push(`transparent ${to.toFixed(2)}%`, 'transparent 100%');
  return `linear-gradient(90deg, ${parts.join(', ')})`;
}

/**
 * Text that is revealed by a band of colour sweeping across it, once, when it
 * scrolls into view: it appears as the band passes and settles to Neutral-9. In forced-colours mode and under reduced motion it is plain text.
 */
export const TextSweep = forwardRef<HTMLSpanElement, TextSweepProps>(function TextSweep({ text, hue = 'navy' }, ref) {
  const own = useRef<HTMLSpanElement | null>(null);
  const reduce = useReducedMotion();
  const inView = useInView(own, { once: true, amount: 0.1 });
  const pos = useMotionValue(reduce ? END : START);
  const colors = rampRungs(hue).slice(1);
  const backgroundImage = useTransform(pos, p => gradient(p, colors));
  useEffect(() => {
    if (reduce) {
      pos.set(END);
      return;
    }
    if (!inView) return;
    const controls = animate(pos, END, { duration: seconds.reveal * 1.6, ease: sweepEase });
    return () => controls.stop();
  }, [inView, reduce, pos]);
  return (
    <motion.span
      ref={el => {
        own.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className="cui-text-sweep"
      style={{ backgroundImage }}
    >
      {text}
    </motion.span>
  );
});
