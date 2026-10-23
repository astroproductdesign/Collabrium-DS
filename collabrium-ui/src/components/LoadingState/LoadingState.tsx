'use client';

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from 'react';
import type { WithoutStyling } from '../../utils/types';

/** Cell shape and motion. Drive and Dots share one 650ms wavefront; Orbit is a single comet (950ms). */
export type LoadingStateVariant = 'drive' | 'dots' | 'orbit';

/** Rule 2: nothing renders until 400ms after the operation starts. */
const REVEAL_DELAY_MS = 400;

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role' | 'color'>>;

export interface LoadingStateProps extends NativeDivProps {
  /**
   * The cell shape and motion. Required, so every loader is a deliberate choice.
   * - `drive`: square cells, a chevron wavefront driving right.
   * - `dots`: round cells, the same wavefront as `drive`.
   * - `orbit`: a single comet lapping the grid's outer ring; the centre cell stays dim.
   */
  variant: LoadingStateVariant;
  /**
   * What the AI is doing right now: "Thinking", then "Reading the export",
   * "Comparing books", "Drafting". Change it as the phase changes; a label
   * set once is only a spinner with extra words. Screen readers announce
   * each change once.
   */
  label: string;
  /**
   * When the operation really started, in milliseconds since the epoch
   * (`Date.now()`). The timer counts from here, and the 400ms hold-back is
   * measured from here, so a loader that appears already reads 0.4s. Leave
   * it out and the component uses the moment it was mounted. Pass it when
   * the operation began before this component mounted.
   */
  startedAt?: number;
}

/** "3.4s", then "1m 5.2s" from a minute up. Built from whole tenths so it never shows "60.0s". */
function formatElapsed(totalSeconds: number) {
  const tenths = Math.max(0, Math.round(totalSeconds * 10));
  if (tenths < 600) return `${(tenths / 10).toFixed(1)}s`;
  return `${Math.floor(tenths / 600)}m ${((tenths % 600) / 10).toFixed(1)}s`;
}

/**
 * Collabrium Loading State. A pixel-grid loader with a live label and a real
 * elapsed timer, for AI work only: model generation, tool execution, agent
 * runs. Ported from components.css `.c-loading`.
 *
 * The component owns what is local to it: the 400ms hold-back (Rule 2), the
 * timer from a start timestamp (Rule 5) and the live region (Rule 11). The
 * host owns the rest: unmount it at the first streamed token (Rule 6), show
 * one per view (Rule 7), give the surface a Stop (Rule 9) and swap to
 * Thinking once named steps appear (Rule 13).
 */
export const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(function LoadingState(
  { variant, label, startedAt, ...rest },
  ref,
) {
  const [mountedAt] = useState(() => Date.now());
  const start = startedAt ?? mountedAt;
  const [revealed, setRevealed] = useState(false);
  const elapsedRef = useRef<HTMLSpanElement>(null);

  // Rule 2: hold the whole component back until REVEAL_DELAY_MS after the start.
  useEffect(() => {
    const wait = REVEAL_DELAY_MS - (Date.now() - start);
    if (wait <= 0) {
      setRevealed(true);
      return;
    }
    setRevealed(false);
    const id = window.setTimeout(() => setRevealed(true), wait);
    return () => window.clearTimeout(id);
  }, [start]);

  // Rule 5: the timer is computed from the start timestamp on every frame, never accumulated,
  // and written straight to the DOM so it does not re-render the component sixty times a second.
  useEffect(() => {
    if (!revealed) return;
    let frame = 0;
    let shown = '';
    const tick = () => {
      const text = formatElapsed((Date.now() - start) / 1000);
      if (text !== shown && elapsedRef.current) {
        elapsedRef.current.textContent = text;
        shown = text;
      }
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [revealed, start]);

  // The live region is always present so a screen reader is already watching it
  // when the content arrives (and when the label changes).
  return (
    <div {...rest} ref={ref} className="cui-loading-state" role="status" aria-live="polite">
      {revealed && (
        <>
          <span className="cui-loading-state__grid" data-variant={variant} aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} className="cui-loading-state__cell" data-off={variant === 'orbit' && i === 4 ? '' : undefined} />
            ))}
          </span>
          <span className="cui-loading-state__label">{label}</span>
          <span className="cui-loading-state__elapsed" aria-hidden="true" ref={elapsedRef}>
            0.0s
          </span>
        </>
      )}
    </div>
  );
});
