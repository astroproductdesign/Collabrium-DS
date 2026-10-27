'use client';

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from 'react';
import type { WithoutStyling } from '../../utils/types';
import { formatElapsed } from '../../utils/format-elapsed';

/** Cell shape and motion. Drive and Dots share one 650ms wavefront; Orbit is a single comet (950ms). */
export type LoadingStateVariant = 'drive' | 'dots' | 'orbit';

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
   * (`Date.now()`). The timer counts from here, so a loader the host mounts
   * after its 400ms hold-back reads 0.4s on its first frame. Leave it out
   * and the component uses the moment it was mounted. Pass it when the
   * operation began before this component mounted.
   */
  startedAt?: number;
}

/**
 * Collabrium Loading State. A pixel-grid loader with a live label and a real
 * elapsed timer, for AI work only: model generation, tool execution, agent
 * runs. Ported from components.css `.c-loading`.
 *
 * The component owns what is local to it: the timer from a start timestamp
 * (Rule 5) and the live region (Rule 11). The host owns the rest: mount it
 * only once the operation has run for 400ms (Rule 2, decided 2026-10-26),
 * unmount it at the first streamed token (Rule 6), show
 * one per view (Rule 7), give the surface a Stop (Rule 9) and swap to
 * Thinking once named steps appear (Rule 13).
 */
export const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(function LoadingState(
  { variant, label, startedAt, ...rest },
  ref,
) {
  const [mountedAt] = useState(() => Date.now());
  const start = startedAt ?? mountedAt;
  const [labelled, setLabelled] = useState(false);
  const elapsedRef = useRef<HTMLSpanElement>(null);

  // The root is in the page for one commit before the label goes in, so a
  // screen reader that watches live regions sees the label arrive and announces it.
  useEffect(() => setLabelled(true), []);

  // Rule 5: the timer is computed from the start timestamp on every frame, never accumulated,
  // and written straight to the DOM so it does not re-render the component sixty times a second.
  useEffect(() => {
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
  }, [start]);

  // The live region is present before its label, so the label's arrival (and every later change) is announced.
  return (
    <div {...rest} ref={ref} className="cui-loading-state" role="status" aria-live="polite">
      <span className="cui-loading-state__grid" data-variant={variant} aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="cui-loading-state__cell" data-off={variant === 'orbit' && i === 4 ? '' : undefined} />
        ))}
      </span>
      <span className="cui-loading-state__label" title={label}>
        {labelled ? label : ''}
      </span>
      <span className="cui-loading-state__elapsed" aria-hidden="true" ref={elapsedRef}>
        0.0s
      </span>
    </div>
  );
});
