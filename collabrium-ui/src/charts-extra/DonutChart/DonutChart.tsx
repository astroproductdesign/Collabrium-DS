'use client';

import { forwardRef, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { PolarFrame } from '../lib/PolarFrame';
import type { ChartDatum } from '../lib/CartesianFrame';
import { Readout } from '../lib/Readout';
import { defaultFormat, pointRing } from '../lib/chart-theme';
import { rampRungs, type RampColorName } from '../lib/series-colors';

export interface DonutChartProps {
  /** Names the chart for assistive technology, e.g. "Pipeline by stage". */
  'aria-label': string;
  /** One object per slice, in order. Up to four slices: the ramp has four rungs. */
  data: ChartDatum[];
  /** The key of each slice's name in a row. */
  nameKey: string;
  /** The key of each slice's value in a row. */
  valueKey: string;
  /** One of five hues; the slices walk its ramp, lightest first. Default Orange, the first in the mapping order. */
  color?: RampColorName;
  /** Caption under the total in the centre. Default "Total". Hovering a slice shows that slice's value and name instead. */
  centerLabel?: string;
  /** Formats a value for the centre, the tooltip and the table. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor, so the chart grows to fill a taller container. */
  height?: 'default' | 'tall';
  /** Shows the legend, which shows or hides each slice. Default true. */
  legend?: boolean;
}

/**
 * Part of a whole, as a ring: one hue, one rung of its ramp per slice, with a
 * 2px Neutral-1 border between slices. Up to four slices; past that, use a
 * bar chart. Built on Recharts for when the Chart.js Doughnut does not fit.
 */
export const DonutChart = forwardRef<HTMLElement, DonutChartProps>(function DonutChart(
  { 'aria-label': label, data, nameKey, valueKey, color = 'orange', centerLabel = 'Total', valueFormat = defaultFormat, height, legend = true },
  ref,
) {
  const rungs = rampRungs(color);
  const fills = data.map((_, i) => rungs[Math.min(i, rungs.length - 1)]);
  const [hover, setHover] = useState<string | null>(null);
  const total = data.reduce((t, d) => t + Number(d[valueKey]), 0);
  const share = (v: number, of: number) => (of > 0 ? `${((v / of) * 100).toFixed(1).replace(/\.0$/, '')}%` : '—');

  return (
    <PolarFrame
      ref={ref}
      label={label}
      height={height}
      valueFormat={valueFormat}
      legend={legend ? data.map((d, i) => ({ key: String(d[nameKey]), name: String(d[nameKey]), color: fills[i] })) : undefined}
      title={row => String(row[nameKey])}
      describe={row => [`${valueFormat(Number(row[valueKey]))} · ${share(Number(row[valueKey]), total)}`]}
      table={{
        columns: ['Slice', 'Value', 'Share'],
        rows: data.map(d => [d[nameKey], valueFormat(Number(d[valueKey])), share(Number(d[valueKey]), total)]),
      }}
    >
      {({ tooltip, motion, hidden, chartProps }) => {
        // Hiding a slice in the legend takes it out of the ring and out of the centre total.
        const shown: (ChartDatum & { __fill: string })[] = data.map((d, i) => ({ ...d, __fill: fills[i] }) as ChartDatum & { __fill: string }).filter(d => !hidden.has(String(d[nameKey])));
        const shownTotal = shown.reduce((t, d) => t + Number(d[valueKey]), 0);
        const active = hover ? shown.find(d => String(d[nameKey]) === hover) : undefined;
        return (
          <PieChart {...chartProps}>
            {tooltip}
            <Pie
              data={shown}
              dataKey={valueKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="90%"
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              stroke={pointRing.stroke}
              strokeWidth={pointRing.strokeWidth}
              onMouseEnter={(_: unknown, i: number) => setHover(String(shown[i]?.[nameKey]))}
              onMouseLeave={() => setHover(null)}
              {...motion}
            >
              {shown.map(d => (
                <Cell key={String(d[nameKey])} fill={d.__fill} />
              ))}
            </Pie>
            <Readout value={valueFormat(active ? Number(active[valueKey]) : shownTotal)} caption={active ? String(active[nameKey]) : centerLabel} />
          </PieChart>
        );
      }}
    </PolarFrame>
  );
});
