'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import { duration as seconds, ease as easings, type DurationToken, type EaseToken } from '../motion';

export interface CountUpProps {
  /** The number to show. When it changes, the figure counts from the one on show to the new one. */
  value: number;
  /** Text before the number, such as `$`. */
  prefix?: string;
  /** Text after the number, such as `k` or ` stars`. */
  suffix?: string;
  /** Formats the number, for example `n => n.toFixed(1)`. Default: whole numbers with thousands separators. */
  format?: (value: number) => string;
  /** Duration token. Default `base`. */
  duration?: DurationToken;
  /** Easing token. Default `reveal`, a fast start and a long settle. */
  ease?: EaseToken;
}

const whole = (n: number) => Math.round(n).toLocaleString('en-US');

/**
 * A figure that counts up to its value when it appears and counts between
 * values when it changes. Digits stay the same width so the number does not
 * shake. A screen reader is given the final figure, not the count. Under
 * reduced motion it shows the value at once.
 */
export const CountUp = forwardRef<HTMLSpanElement, CountUpProps>(function CountUp(
  { value, prefix = '', suffix = '', format = whole, duration = 'base', ease = 'reveal' },
  ref,
) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);
  const from = useRef(reduce ? value : 0);
  useEffect(() => {
    if (reduce) {
      setShown(value);
      from.current = value;
      return;
    }
    const controls = animate(from.current, value, {
      duration: seconds[duration],
      ease: [...easings[ease]] as [number, number, number, number],
      onUpdate: latest => {
        from.current = latest;
        setShown(latest);
      },
    });
    return () => controls.stop();
  }, [value, reduce, duration, ease]);
  return (
    <span ref={ref} className="cui-count-up">
      <span className="cui-motion-sr">
        {prefix}
        {format(value)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {format(shown)}
        {suffix}
      </span>
    </span>
  );
});
