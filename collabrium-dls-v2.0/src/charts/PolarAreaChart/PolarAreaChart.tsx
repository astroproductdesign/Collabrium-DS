'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { tokens } from '../../tokens/tokens';
import { alpha, defaultFormat, mixToward, rampRungs } from '../lib/theme';
import type { PartsChartProps } from '../DoughnutChart/DoughnutChart';

export type PolarAreaChartProps = PartsChartProps;

/**
 * The DS asks for 30% on the strong rungs and 15% on the pale ones; taken literally the pale wedges vanish on white,
 * so every wedge is 75% over the ramp without its faintest tint, as Charts (extra) decided (Q-XCH-25, 2026-10-30).
 */
const WEDGE_OPACITY = 0.75;

/**
 * Volume by category as wedges of one angle, drawn by Chart.js: one hue's ramp (its -bg-strong tint, pastel, a mix
 * of the two strongest and the full colour), translucent so the rings show through; 2px white between wedges.
 */
export const PolarAreaChart = forwardRef<HTMLElement, PolarAreaChartProps>(function PolarAreaChart(props, ref) {
  const { 'aria-label': label, data, nameKey, valueKey, color = 'orange', valueFormat = defaultFormat, height, legend = true } = props;
  const config = useMemo<ChartConfiguration>(() => {
    const [, bgStrong, pastel, full] = rampRungs(color);
    const base = [bgStrong, pastel, mixToward(pastel, full, 0.5), full];
    const rungs = data.map((_, i) => base[Math.min(i, base.length - 1)]);
    return {
      type: 'polarArea',
      data: {
        labels: data.map((d) => String(d[nameKey])),
        datasets: [
          {
            data: data.map((d) => Number(d[valueKey])),
            backgroundColor: rungs.map((hex) => alpha(hex, WEDGE_OPACITY)),
            borderColor: tokens.color.neutral1,
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: legend },
          tooltip: { callbacks: { label: (ctx: { label: string; parsed: { r: number } }) => `${ctx.label}: ${valueFormat(ctx.parsed.r)}` } },
        },
      },
    } as ChartConfiguration;
  }, [data, nameKey, valueKey, color, valueFormat, legend]);
  const table = { columns: ['Name', 'Value'], rows: data.map((d) => [String(d[nameKey]), valueFormat(Number(d[valueKey]))]) };
  return <ChartFrame ref={ref} label={label} config={config} height={height} table={table} />;
});
