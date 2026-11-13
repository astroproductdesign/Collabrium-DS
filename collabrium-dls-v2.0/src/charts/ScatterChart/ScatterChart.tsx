'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { tokens } from '../../tokens/tokens';
import { colorOf, defaultFormat, resolveColorName, type XYSeries } from '../lib/theme';

export interface XYChartProps {
  /** Names the chart for assistive technology. */
  'aria-label': string;
  /** One set of points per series, each in the next series colour. */
  series: XYSeries[];
  /** The horizontal axis's title (and the table's heading). */
  xLabel: string;
  /** The vertical axis's title. */
  yLabel: string;
  xFormat?: (value: number) => string;
  yFormat?: (value: number) => string;
  height?: 'default' | 'tall';
  legend?: boolean;
}

/** Correlation or distribution, drawn by Chart.js: 6px points (8px on hover) with a 1px white ring, titled axes, no connecting line. */
export const ScatterChart = forwardRef<HTMLElement, XYChartProps>(function ScatterChart(props, ref) {
  const { 'aria-label': label, series, xLabel, yLabel, xFormat = defaultFormat, yFormat = defaultFormat, height, legend = true } = props;
  const config = useMemo<ChartConfiguration>(
    () => ({
      type: 'scatter',
      data: {
        datasets: series.map((s, i) => ({
          label: s.name,
          data: s.points.map((p) => ({ x: p.x, y: p.y })),
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBorderWidth: 1,
          pointBorderColor: tokens.color.neutral1,
          pointBackgroundColor: colorOf(resolveColorName(s.color, i)),
          backgroundColor: colorOf(resolveColorName(s.color, i)),
        })),
      },
      options: {
        scales: {
          x: { title: { display: true, text: xLabel }, ticks: { callback: (v: number | string) => (typeof v === 'number' ? xFormat(v) : v) } },
          y: { title: { display: true, text: yLabel }, ticks: { callback: (v: number | string) => (typeof v === 'number' ? yFormat(v) : v) } },
        },
        plugins: {
          legend: { display: legend },
          tooltip: { callbacks: { label: (ctx: { dataset: { label?: string }; parsed: { x: number; y: number } }) => `${ctx.dataset.label}: ${xLabel} ${xFormat(ctx.parsed.x)}, ${yLabel} ${yFormat(ctx.parsed.y)}` } },
        },
      },
    }) as ChartConfiguration,
    [series, xLabel, yLabel, xFormat, yFormat, legend],
  );
  const table = {
    columns: ['Point', xLabel, yLabel],
    rows: series.flatMap((s) => s.points.map((p) => [p.name ?? s.name, xFormat(p.x), yFormat(p.y)])),
  };
  return <ChartFrame ref={ref} label={label} config={config} height={height} table={table} />;
});
