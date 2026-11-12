'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { alpha, colorOf, defaultFormat, resolveColorName, WASH, type ChartDatum, type ChartSeries } from '../lib/theme';
import { categoryTable, labelsOf, valuesOf } from '../lib/options';

export interface RadarChartProps {
  /** Names the chart for assistive technology. */
  'aria-label': string;
  /** One row per axis (six at most), e.g. `{ skill: 'Reach', a: 7, b: 5 }`. */
  data: ChartDatum[];
  /** The key of each axis's name. */
  categoryKey: string;
  /** The axis column's heading in the table. Default "Axis". */
  axisLabel?: string;
  /** One shape per series, each with a wash of its colour. */
  series: Omit<ChartSeries, 'dashed'>[];
  /** The top of the scale; the bottom is 0. Default 10 (the DS's 0–10 rating). */
  max?: number;
  valueFormat?: (value: number) => string;
  height?: 'default' | 'tall';
  legend?: boolean;
}

/** Performance across up to six dimensions, drawn by Chart.js: 2px outlines with a 12% wash, 3px ringed points, on a fixed 0–max scale. */
export const RadarChart = forwardRef<HTMLElement, RadarChartProps>(function RadarChart(props, ref) {
  const { 'aria-label': label, data, categoryKey, axisLabel = 'Axis', series, max = 10, valueFormat = defaultFormat, height, legend = true } = props;
  const config = useMemo<ChartConfiguration>(
    () => ({
      type: 'radar',
      data: {
        labels: labelsOf(data, categoryKey),
        datasets: series.map((s, i) => {
          const hex = colorOf(resolveColorName(s.color, i));
          return { label: s.name, data: valuesOf(data, s.key), borderColor: hex, backgroundColor: alpha(hex, WASH), pointBackgroundColor: hex, fill: true };
        }),
      },
      options: {
        scales: { r: { suggestedMin: 0, suggestedMax: max, min: 0, max } },
        plugins: {
          legend: { display: legend },
          tooltip: { callbacks: { label: (ctx: { dataset: { label?: string }; parsed: { r: number } }) => `${ctx.dataset.label}: ${valueFormat(ctx.parsed.r)}` } },
        },
      },
    }) as ChartConfiguration,
    [data, categoryKey, series, max, valueFormat, legend],
  );
  return <ChartFrame ref={ref} label={label} config={config} height={height} table={categoryTable(data, categoryKey, axisLabel, series, valueFormat)} />;
});
