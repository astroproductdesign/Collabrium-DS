'use client';

import { forwardRef, type CSSProperties } from 'react';
import { ChartShell } from '../lib/ChartShell';
import { defaultFormat } from '../lib/chart-theme';
import { resolveSeriesColorName, seriesColorValue, type SeriesColorName } from '../lib/series-colors';

export interface BulletItem {
  /** What is measured, e.g. "Block time". */
  label: string;
  /** The measured value. */
  actual: number;
  /** The value it is measured against. Drawn as a marker on the bar. */
  target: number;
  /** Written after both numbers, e.g. "ms" or "%". */
  unit?: string;
}

export interface BulletChartProps {
  /** Names the chart for assistive technology, e.g. "Service levels against target". */
  'aria-label': string;
  /** One row per measure. Each is its own scale, which ends 15% past its target. */
  items: BulletItem[];
  /** One of the seven DLS series colours for the bars. Default Orange, the first in the mapping order. */
  color?: SeriesColorName;
  /** Formats the numbers, e.g. `v => v.toFixed(1)`. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor; the rows share the height. */
  height?: 'default' | 'tall';
}

/** Each row's scale runs from 0 to this multiple of its target, so the target marker is never at the edge. */
const HEADROOM = 1.15;

/**
 * Measures against their targets: one bar per measure, with a marker where
 * the target is. Drawn in HTML and CSS, not Recharts, so it needs no chart
 * engine. For a few measures that are each judged against a goal.
 */
export const BulletChart = forwardRef<HTMLElement, BulletChartProps>(function BulletChart(
  { 'aria-label': label, items, color, valueFormat = defaultFormat, height },
  ref,
) {
  const hex = seriesColorValue(resolveSeriesColorName(color, 0));
  const text = (v: number, unit?: string) => `${valueFormat(v)}${unit ? (unit === '%' ? '' : ' ') + unit : ''}`;
  const pct = (v: number) => `${Math.min(100, (v / HEADROOM) * 100)}%`;
  return (
    <ChartShell
      ref={ref}
      label={label}
      height={height}
      fill={false}
      table={{
        columns: ['Measure', 'Actual', 'Target', 'Of target'],
        rows: items.map(i => [i.label, text(i.actual, i.unit), text(i.target, i.unit), `${((i.actual / i.target) * 100).toFixed(1).replace(/\.0$/, '')}%`]),
      }}
    >
      {() => (
        <ul className="cui-bullet" role="list">
          {items.map(item => {
            const vars = {
              '--cui-bullet-color': hex,
              '--cui-bullet-fill': pct(item.actual / item.target),
              '--cui-bullet-target': pct(1),
            } as CSSProperties;
            return (
              <li key={item.label} className="cui-bullet__item" style={vars}>
                <div className="cui-bullet__head">
                  <span className="cui-bullet__label">{item.label}</span>
                  <span className="cui-bullet__values">
                    {text(item.actual, item.unit)} of <span className="cui-bullet__target-text">{text(item.target, item.unit)}</span> target
                  </span>
                </div>
                <div className="cui-bullet__track" aria-hidden="true">
                  <div className="cui-bullet__fill" />
                  <div className="cui-bullet__target" />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </ChartShell>
  );
});
