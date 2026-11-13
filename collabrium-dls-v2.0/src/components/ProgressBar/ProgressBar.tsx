'use client';

import { forwardRef, useEffect, useId, useRef, useState, type HTMLAttributes } from 'react';
import type { WithoutStyling } from '../../utils/types';
import type { CardElement } from '../Card';

/** The track height: `compact` 4px (tables, card metadata), `default` 8px, `large` 16px (one per section at most). */
export type ProgressBarSize = 'compact' | 'default' | 'large';

/**
 * A single bar's fill. `default` is Obsidian (a committed value, no judgement). `success` only when you are explicitly
 * signalling completion (the bar never turns green by itself at 100%); `error` for a failed task; an element when the
 * bar belongs to that department.
 */
export type ProgressBarTone = 'default' | 'success' | 'error' | CardElement;

/** One segment of a stacked bar. */
export interface ProgressSegment {
  /** What the segment is ("Marketing", "Water"). Read with its value by screen readers and shown in the legend. */
  label: string;
  /** Its share of the whole, 0–100. A 0 segment isn't drawn. */
  value: number;
  /**
   * The department, for a department breakdown: the segment takes its colour. Leave out for general data: those
   * segments take Purple, then Turquoise, then Neutral-4 for any more.
   */
  element?: CardElement;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title'>>;

interface Shared extends NativeDivProps {
  /** The metric's name, in the header row above the track (caption bold, 40 characters at most). Also names the bar for assistive technology. */
  title?: string;
  /** Names the bar for assistive technology when there is no `title`. */
  'aria-label'?: string;
  /** The track height. Default `default`. */
  size?: ProgressBarSize;
}

/** A determinate single bar. */
export interface ProgressBarSingleProps extends Shared {
  /** The value, 0–100. */
  value: number;
  /** The value as words, shown where the label goes and read by screen readers ("RM 25,000 of RM 100,000", "Complete"). Default "{value}%". */
  valueText?: string;
  /**
   * Where the value shows. `header`: right of the title, above the track (the default with a `title`). `trailing`: after
   * the track, for a compact space. `inside`: centred in the fill, `large` only, hidden while the fill is under 40px.
   * `none`: bar only, when the value is obvious from what's around it.
   */
  labelPlacement?: 'header' | 'trailing' | 'inside' | 'none';
  /** The fill. Default `default` (Obsidian). */
  tone?: ProgressBarTone;
  segments?: never;
  indeterminate?: never;
}

/** A determinate stacked bar: a breakdown. Its value labels live in the legend. */
export interface ProgressBarStackedProps extends Shared {
  /** The segments, in order. Whatever they don't fill shows as the Neutral-3 remainder at the right. */
  segments: ProgressSegment[];
  /** The header row's value ("RM 400,000 total"). */
  valueText?: string;
  /** Shows the legend under the bar (each segment's colour, label and value). Default true. */
  legend?: boolean;
  value?: never;
  labelPlacement?: never;
  tone?: never;
  indeterminate?: never;
}

/** An indeterminate bar: something is happening, with no measure of how far. No value, no label slot. */
export interface ProgressBarIndeterminateProps extends Shared {
  indeterminate: true;
  value?: never;
  valueText?: never;
  labelPlacement?: never;
  tone?: never;
  segments?: never;
}

export type ProgressBarProps = ProgressBarSingleProps | ProgressBarStackedProps | ProgressBarIndeterminateProps;

const GENERAL = ['purple', 'turquoise'] as const;
const clamp = (n: number) => Math.max(0, Math.min(100, n));

/** Starts false and turns true two frames after mount, so a fill drawn at 0 can transition up to its value (the entrance). */
function useEntered() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);
  return entered;
}

/**
 * Collabrium Progress Bar: a read-only bar showing progress toward a known goal (determinate, single or stacked) or an
 * active process of unknown length (indeterminate). Not a Slider: it has no thumb and no focus of its own. Ported from
 * components.css `.c-progress*` (4561–4634).
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(props, ref) {
  const { title, size = 'default', 'aria-label': ariaLabel, ...rest } = props;
  const titleId = useId();
  const entered = useEntered();
  const fillRef = useRef<HTMLSpanElement>(null);
  const [roomForLabel, setRoomForLabel] = useState(false);

  // Pull the variant props off what is passed to the root.
  const { value, valueText, labelPlacement, tone, segments, legend, indeterminate, ...native } = rest as NativeDivProps & {
    value?: number;
    valueText?: string;
    labelPlacement?: ProgressBarSingleProps['labelPlacement'];
    tone?: ProgressBarTone;
    segments?: ProgressSegment[];
    legend?: boolean;
    indeterminate?: boolean;
  };
  const single = !indeterminate && !segments;
  const shownValue = single ? valueText ?? `${value}%` : valueText;
  const placement = single ? labelPlacement ?? (title ? 'header' : 'none') : indeterminate ? 'none' : 'header';
  const inside = single && placement === 'inside' && size === 'large';

  // The inside label renders only while the fill is wider than 40px.
  useEffect(() => {
    if (!inside || !fillRef.current || typeof ResizeObserver === 'undefined') return;
    const fill = fillRef.current;
    const limit = parseFloat(getComputedStyle(fill).getPropertyValue('--cui-progress-label-min')) || 40;
    const observer = new ResizeObserver(() => setRoomForLabel(fill.getBoundingClientRect().width > limit));
    observer.observe(fill);
    return () => observer.disconnect();
  }, [inside]);

  const name = title ? { 'aria-labelledby': titleId } : { 'aria-label': ariaLabel };
  const header = title || (placement === 'header' && shownValue) ? (
    <div className="cui-progress__header">
      {title && (
        <span className="cui-progress__title" id={titleId}>
          {title}
        </span>
      )}
      {placement === 'header' && shownValue && (
        <span className="cui-progress__value" aria-hidden={single ? 'true' : undefined}>
          {shownValue}
        </span>
      )}
    </div>
  ) : null;

  let bar;
  if (indeterminate) {
    bar = (
      <div className="cui-progress__track" data-size={size} data-indeterminate="" role="progressbar" aria-valuemin={0} aria-valuemax={100} {...name}>
        <span className="cui-progress__indeterminate" />
      </div>
    );
  } else if (segments) {
    let general = 0;
    const drawn = segments
      .filter(s => s.value > 0)
      .map(s => ({ ...s, color: s.element ?? (GENERAL[general++] ?? 'overflow') }));
    const total = drawn.reduce((sum, s) => sum + s.value, 0);
    bar = (
      <div className="cui-progress__track" data-size={size} data-stacked="" role="group" {...name}>
        {drawn.map((s, i) => (
          <span
            key={i}
            className="cui-progress__segment"
            data-tone={s.color}
            role="progressbar"
            aria-label={`${s.label} — ${s.value}%`}
            aria-valuenow={s.value}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: `${entered ? clamp(s.value) : 0}%` }}
          />
        ))}
        {total < 100 && <span className="cui-progress__remainder" />}
      </div>
    );
    if (legend !== false) {
      bar = (
        <>
          {bar}
          <div className="cui-progress__legend" aria-hidden="true">
            {drawn.map((s, i) => (
              <span key={i} className="cui-progress__legend-item">
                <span className="cui-progress__swatch" data-tone={s.color} />
                {s.label} — {s.value}%
              </span>
            ))}
          </div>
        </>
      );
    }
  } else {
    const track = (
      <div
        className="cui-progress__track"
        data-size={size}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={valueText}
        {...name}
      >
        <span ref={fillRef} className="cui-progress__fill" data-tone={tone && tone !== 'default' ? tone : undefined} style={{ width: `${entered ? clamp(value ?? 0) : 0}%` }}>
          {inside && roomForLabel && (
            <span className="cui-progress__fill-label" aria-hidden="true">
              {shownValue}
            </span>
          )}
        </span>
      </div>
    );
    bar =
      placement === 'trailing' ? (
        <div className="cui-progress__trailing-wrap">
          {track}
          <span className="cui-progress__trailing" aria-hidden="true">
            {shownValue}
          </span>
        </div>
      ) : (
        track
      );
  }

  return (
    <div {...native} ref={ref} className="cui-progress">
      {header}
      {bar}
    </div>
  );
});
