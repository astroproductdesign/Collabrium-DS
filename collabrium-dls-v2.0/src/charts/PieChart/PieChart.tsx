'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { tokens } from '../../tokens/tokens';
import { defaultFormat, ramp, type ChartDatum, type RampColorName } from '../lib/theme';
import type { PartsChartProps } from '../DoughnutChart/DoughnutChart';

export type PieChartProps = PartsChartProps;

/** Part of a whole, as a full pie, drawn by Chart.js: Doughnut's recipe with no hole (one hue's ramp, 2px white between slices). */
export const PieChart = forwardRef<HTMLElement, PieChartProps>(function PieChart(props, ref) {
  const { 'aria-label': label, data, nameKey, valueKey, color = 'orange', valueFormat = defaultFormat, height, legend = true } = props;
  const config = useMemo<ChartConfiguration>(
    () => ({
      type: 'pie',
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
