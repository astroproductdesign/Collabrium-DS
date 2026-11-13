'use client';

import { forwardRef } from 'react';
import { ChartShell } from '../lib/ChartShell';
import type { ChartDatum } from '../lib/CartesianFrame';
import { useBare } from '../lib/bare';
import { useCellTip } from '../lib/CellTip';
import { defaultFormat, mixToward } from '../lib/chart-theme';
import { rampRungs, type RampColorName } from '../lib/series-colors';

export interface HeatmapColumn {
  /** The key of this column's value in each row. */
  key: string;
  /** Written above the column and in the table, e.g. "08h". */
  label: string;
}

export interface HeatmapChartProps {
  /** Names the chart for assistive technology, e.g. "Server load by weekday and hour". */
  'aria-label': string;
  /** One object per row, e.g. `{ day: 'Mon', h00: 14, h04: 38 }`. */
  data: ChartDatum[];
  /** The key of each row's name in a row of `data`. */
  rowKey: string;
  /** The heading of the row-name column in the table view. Default "Row". */
  rowLabel?: string;
  /** The columns, left to right. */
  columns: HeatmapColumn[];
  /** One of five hues; cells run from the hue's lightest tint (the lowest value) to its full colour (the highest). Default Orange. */
  color?: RampColorName;
  /** The value shown as the lightest tint. Default: the lowest value in `data`. */
  min?: number;
  /** The value shown as the full colour. Default: the highest value in `data`. */
  max?: number;
  /** Formats a value for the tooltip, the scale and the table. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor, so the grid grows to fill a taller container. */
  height?: 'default' | 'tall';
}

/**
 * How a measure varies across two categories (weekday by hour): a grid of
 * rounded cells, each shaded on a single-hue ramp from the lightest tint to
 * the full colour. Drawn in HTML and CSS, not Recharts. The value is never
 * carried by colour alone: hover a cell, or use the table.
 */
export const HeatmapChart = forwardRef<HTMLElement, HeatmapChartProps>(function HeatmapChart(
  { 'aria-label': label, data, rowKey, rowLabel = 'Row', columns, color = 'orange', min, max, valueFormat = defaultFormat, height },
  ref,
) {
  const [lightest, , , full] = rampRungs(color);
  const all = data.flatMap(d => columns.map(c => Number(d[c.key])));
  const lo = min ?? Math.min(...all);
  const hi = max ?? Math.max(...all);
  const shade = (v: number) => mixToward(lightest, full, hi > lo ? Math.min(1, Math.max(0, (v - lo) / (hi - lo))) : 1);
  const tip = useCellTip();
  // As a thumbnail, two rows are enough to show the pattern.
  const rows = useBare() ? data.slice(0, 2) : data;

  return (
    <ChartShell
      ref={ref}
      label={label}
      height={height}
      fill={false}
      srTable
      table={{
        columns: [rowLabel, ...columns.map(c => c.label)],
        rows: data.map(d => [d[rowKey], ...columns.map(c => valueFormat(Number(d[c.key])))]),
      }}
    >
      {() => (
        <div className="cui-heat" {...tip.boxProps} style={{ ['--cui-heat-cols' as string]: columns.length, ['--cui-heat-rows' as string]: rows.length }}>
          <div className="cui-heat__grid" aria-hidden="true">
            <span />
            {columns.map(c => (
              <span key={c.key} className="cui-heat__col">
                {c.label}
              </span>
            ))}
            {rows.map(d => [
              <span key={`${d[rowKey]}-l`} className="cui-heat__row">
                {d[rowKey]}
              </span>,
              ...columns.map(c => {
                const v = Number(d[c.key]);
                return <span key={`${d[rowKey]}-${c.key}`} className="cui-heat__cell" style={{ background: shade(v) }} onPointerEnter={tip.show(`${d[rowKey]}, ${c.label}`, [valueFormat(v)])} onPointerDown={tip.show(`${d[rowKey]}, ${c.label}`, [valueFormat(v)])} />;
              }),
            ])}
          </div>
          <div className="cui-heat__scale" aria-hidden="true">
            <span>{valueFormat(lo)}</span>
            <span className="cui-heat__ramp" style={{ background: `linear-gradient(to right, ${lightest}, ${full})` }} />
            <span>{valueFormat(hi)}</span>
          </div>
          {tip.tipEl}
        </div>
      )}
    </ChartShell>
  );
});
