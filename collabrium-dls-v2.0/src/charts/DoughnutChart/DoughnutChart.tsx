'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { tokens } from '../../tokens/tokens';
import { defaultFormat, ramp, type ChartDatum, type RampColorName } from '../lib/theme';

export interface PartsChartProps {
  /** Names the chart for assistive technology ("Pipeline by stage"). */
  'aria-label': string;
  /** One row per slice, in order (an ordered set reads lightest to darkest). */
  data: ChartDatum[];
  /** The key of each slice's name. */
  nameKey: string;
  /** The key of each slice's value. */
  valueKey: string;
  /** The hue whose ramp the slices walk: the colour of the element that owns the measure. Default `orange`. */
  color?: RampColorName;
  /** Formats a value for the tooltip and the table. */
  valueFormat?: (value: number) => string;
  /** Plot height: 260px, or 300px for `tall`. */
  height?: 'default' | 'tall';
  /** Shows the legend. Default true. */
  legend?: boolean;
}

export type DoughnutChartProps = PartsChartProps;

/** Part of a whole, as a ring, drawn by Chart.js: one hue, one rung of its ramp per slice, lightest first, 2px white between slices. Five slices at most. */
export const DoughnutChart = forwardRef<HTMLElement, DoughnutChartProps>(function DoughnutChart(props, ref) {
  const { 'aria-label': label, data, nameKey, valueKey, color = 'orange', valueFormat = defaultFormat, height, legend = true } = props;
  const config = useMemo<ChartConfiguration>(
    () => ({
      type: 'doughnut',
      data: {
        labels: data.map((d) => String(d[nameKey])),
        datasets: [{ data: data.map((d) => Number(d[valueKey])), backgroundColor: ramp(color, data.length), borderColor: tokens.color.neutral1, borderWidth: 2 }],
      },
      options: {
        plugins: {
          legend: { display: legend },
          tooltip: { callbacks: { label: (ctx: { label: string; parsed: number }) => `${ctx.label}: ${valueFormat(ctx.parsed)}` } },
        },
      },
    }) as ChartConfiguration,
    [data, nameKey, valueKey, color, valueFormat, legend],
  );
  const table = { columns: ['Name', 'Value'], rows: data.map((d) => [String(d[nameKey]), valueFormat(Number(d[valueKey]))]) };
  return <ChartFrame ref={ref} label={label} config={config} height={height} table={table} />;
});
