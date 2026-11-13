'use client';

import { forwardRef } from 'react';
import { Cell, PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import { PolarFrame } from './PolarFrame';
import { barRadius, defaultFormat, ringThickness, trackColor } from './chart-theme';
import { resolveSeriesColorName, seriesColorValue, type SeriesColorName } from './series-colors';

export interface RadialItem {
  /** What the ring measures, e.g. "Memory". */
  label: string;
  /** The measured value. */
  value: number;
  /** The value that fills the ring. Default 100, so `value` reads as a percentage. */
  max?: number;
  /** One more line for the tooltip and the table, e.g. "92 of 128 GB". */
  detail?: string;
  /** One of the seven DLS series colours. Leave out to take the next colour in the mapping order. */
  color?: SeriesColorName;
}

export interface RadialChartProps {
  /** Names the chart for assistive technology, e.g. "Cluster resources in use". */
  'aria-label': string;
  /** One ring per item, outermost first. Up to five. */
  items: RadialItem[];
  /** Formats a value for the tooltip and the table, e.g. `v => v + '%'`. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor, so the chart grows to fill a taller container. */
  height?: 'default' | 'tall';
  /** Shows the legend, which names each ring and shows or hides it. Default true. */
  legend?: boolean;
}

interface RadialBarsProps extends RadialChartProps {
  /** `half` draws the rings as arches (180°); `full` as complete circles. */
  sweep: 'half' | 'full';
}

interface Ring extends Record<string, unknown> {
  label: string;
  /** The measured value. Not called `value`: Recharts overwrites that key with the plotted percent. */
  amount: number;
  max: number;
  detail?: string;
  percent: number;
  fill: string;
}

/** The shared drawing of the two ring charts: concentric rings, each filled to value / max over a Neutral-3 track. */
export const RadialBars = forwardRef<HTMLElement, RadialBarsProps>(function RadialBars(
  { 'aria-label': label, items, valueFormat = defaultFormat, height, legend = true, sweep },
  ref,
) {
  const rings: Ring[] = items.map((item, i) => {
    const max = item.max ?? 100;
    const colorName = resolveSeriesColorName(item.color, i);
    return { label: item.label, amount: item.value, max, detail: item.detail, percent: Math.min(100, Math.max(0, (item.value / max) * 100)), fill: seriesColorValue(colorName) };
  });
  const pct = (p: number) => `${p.toFixed(1).replace(/\.0$/, '')}%`;
  return (
    <PolarFrame
      ref={ref}
      label={label}
      height={height}
      valueFormat={valueFormat}
      legend={legend ? rings.map(r => ({ key: r.label, name: r.label, color: r.fill })) : undefined}
      title={row => String((row as Ring).label)}
      describe={row => {
        const r = row as Ring;
        return [`${valueFormat(r.amount)} of ${valueFormat(r.max)} · ${pct(r.percent)}`, ...(r.detail ? [r.detail] : [])];
      }}
      table={{
        columns: ['Measure', 'Value', 'Of', 'Filled'],
        rows: rings.map(r => [r.label, valueFormat(r.amount), valueFormat(r.max), pct(r.percent)]),
      }}
    >
      {({ tooltip, motion, hidden, chartProps }) => {
        // Recharts draws the first datum innermost; the first item is the outermost ring, so draw in reverse.
        const shown = rings.filter(r => !hidden.has(r.label)).reverse();
        return (
          <RadialBarChart
            {...chartProps}
            data={shown}
            cx="50%"
            cy={sweep === 'half' ? '72%' : '50%'}
            innerRadius={sweep === 'half' ? '30%' : '22%'}
            outerRadius={sweep === 'half' ? '135%' : '95%'}
            startAngle={180}
            endAngle={sweep === 'half' ? 0 : -180}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
            {tooltip}
            <RadialBar dataKey="percent" background={{ fill: trackColor }} cornerRadius={barRadius} barSize={ringThickness} {...motion}>
              {shown.map(r => (
                <Cell key={r.label} fill={r.fill} />
              ))}
            </RadialBar>
          </RadialBarChart>
        );
      }}
    </PolarFrame>
  );
});
