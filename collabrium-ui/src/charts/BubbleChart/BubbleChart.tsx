'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { alpha, colorOf, defaultFormat, resolveColorName } from '../lib/theme';
import type { XYChartProps } from '../ScatterChart/ScatterChart';

export interface BubbleChartProps extends XYChartProps {
  /** The third measure's name, drawn as size (each point's `z`). */
  sizeLabel: string;
  sizeFormat?: (value: number) => string;
}

/** The smallest and largest bubble radius: area, not radius, follows the value. */
const R_MIN = 4;
const R_MAX = 24;

/**
 * Three measures at once, drawn by Chart.js: position (x, y) and size (z, by area). Each series' colour as the edge,
 * a 30% wash as the fill; three series at most. No table view (the DS's exemption).
 */
export const BubbleChart = forwardRef<HTMLElement, BubbleChartProps>(function BubbleChart(props, ref) {
  const { 'aria-label': label, series, xLabel, yLabel, sizeLabel, xFormat = defaultFormat, yFormat = defaultFormat, sizeFormat = defaultFormat, height, legend = true } = props;
  const config = useMemo<ChartConfiguration>(() => {
    const zs = series.flatMap((s) => s.points.map((p) => p.z ?? 0));
    const zMax = Math.max(1, ...zs);
    const radius = (z: number) => R_MIN + (R_MAX - R_MIN) * Math.sqrt(Math.max(0, z) / zMax);
    return {
      type: 'bubble',
      data: {
        datasets: series.map((s, i) => {
          const hex = colorOf(resolveColorName(s.color, i));
          return { label: s.name, data: s.points.map((p) => ({ x: p.x, y: p.y, r: radius(p.z ?? 0), z: p.z ?? 0 })), backgroundColor: alpha(hex, 0.3), borderColor: hex, borderWidth: 1 };
        }),
      },
      options: {
        scales: {
          x: { title: { display: true, text: xLabel }, ticks: { callback: (v: number | string) => (typeof v === 'number' ? xFormat(v) : v) } },
          y: { title: { display: true, text: yLabel }, ticks: { callback: (v: number | string) => (typeof v === 'number' ? yFormat(v) : v) } },
        },
        plugins: {
          legend: { display: legend },
          tooltip: {
            callbacks: {
              label: (ctx: { dataset: { label?: string }; raw: unknown }) => {
                const p = ctx.raw as { x: number; y: number; z: number };
                return `${ctx.dataset.label}: ${xLabel} ${xFormat(p.x)}, ${yLabel} ${yFormat(p.y)}, ${sizeLabel} ${sizeFormat(p.z)}`;
              },
            },
          },
        },
      },
    } as ChartConfiguration;
  }, [series, xLabel, yLabel, sizeLabel, xFormat, yFormat, sizeFormat, legend]);
  return <ChartFrame ref={ref} label={label} config={config} height={height} />;
});
