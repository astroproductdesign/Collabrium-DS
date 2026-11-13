'use client';

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export interface ScrambleHoverProps {
  /** The text. When the pointer enters it, the letters scramble and settle back. */
  text: string;
  /** How the letters settle: `together` scrambles them all and settles them at once; `start`, `end` and `center` settle them one by one from that side. Default `together`. */
  settle?: 'together' | 'start' | 'end' | 'center';
  /** What the letters scramble through: `text` reuses the text's own letters, `symbols` uses punctuation and symbols. Default `text`. */
  alphabet?: 'text' | 'symbols';
}

const SYMBOLS = '!<>-_\\/[]{}=+*^?#';
/** Time between frames, and frames when settling together. TODO(open-question Q-MOT-16): Amicro's 40ms and 10 frames, no token. */
const FRAME_MS = 40;
const TOGETHER_FRAMES = 10;

/**
 * Text that scrambles when the pointer enters it and then settles back to
 * itself. The text is in the page, visually hidden, so a screen reader reads
 * the real words; the scrambling is hidden from it. Under reduced motion it
 * does not scramble.
 */
export const ScrambleHover = forwardRef<HTMLSpanElement, ScrambleHoverProps>(function ScrambleHover({ text, settle = 'together', alphabet = 'text' }, ref) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);
  const timer = useRef<number | null>(null);
  const stop = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => {
    setShown(text);
    return stop;
  }, [text]);
  const scramble = useCallback(() => {
    if (reduce) return;
    stop();
    const letters = alphabet === 'text' ? text.replace(/\s/g, '') || text : SYMBOLS;
    const total = settle === 'together' ? TOGETHER_FRAMES : settle === 'center' ? Math.ceil(text.length / 2) : text.length;
    const mid = Math.floor(text.length / 2);
    let frame = 0;
    timer.current = window.setInterval(() => {
      setShown(
        Array.from(text, (ch, i) => {
          if (ch === ' ') return ' ';
          const settled =
            settle === 'together' ? frame >= TOGETHER_FRAMES : settle === 'start' ? i < frame : settle === 'end' ? i >= text.length - frame : Math.abs(i - mid) <= frame;
          return settled ? ch : letters[Math.floor(Math.random() * letters.length)];
        }).join(''),
      );
      frame += 1;
      if (frame > total) {
        stop();
        setShown(text);
      }
    }, FRAME_MS);
  }, [text, settle, alphabet, reduce]);
  return (
    <span ref={ref} className="cui-scramble" onPointerEnter={scramble}>
      <span className="cui-motion-sr">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
});
