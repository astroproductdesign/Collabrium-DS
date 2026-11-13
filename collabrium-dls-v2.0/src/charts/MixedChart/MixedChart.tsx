'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { barHover, barRadius, colorOf, dashPattern, defaultFormat, maxBarThickness, resolveColorName, type CartesianChartProps, type ChartSeries } from '../lib/theme';
import { categoryTable, labelsOf, tooltipLines, valueAxis, valuesOf } from '../lib/options';

export interface MixedChartProps extends CartesianChartProps {
  /** The bars. */
  bars: Omit<ChartSeries, 'dashed'>[];
  /** The line drawn over them. */
  line: ChartSeries;
  /** `own` (the default): the line has its own axis on the right (no second gridline); `shared` when they share a scale. */
  lineAxis?: 'own' | 'shared';
  /** Formats the line's values. Default: `valueFormat`. */
  lineFormat?: (value: number) => string;
}

/** Two related measures over time, drawn by Chart.js: bars with Bar's marks, a line with Line's, and a second axis when their scales differ. */
export const MixedChart = forwardRef<HTMLElement, MixedChartProps>(function MixedChart(props, ref) {
  const { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', bars, line, lineAxis = 'own', lineFormat, valueFormat = defaultFormat, height, legend = true } = props;
  const lf = lineFormat ?? valueFormat;
  const config = useMemo<ChartConfiguration>(() => {
    const lineHex = colorOf(resolveColorName(line.color, bars.length));
    return {
      type: 'bar',
      data: {
        labels: labelsOf(data, categoryKey),
        datasets: [
          ...bars.map((s, i) => {
            const hex = colorOf(resolveColorName(s.color, i));
            return {
              type: 'bar' as const,
              label: s.name,
              data: valuesOf(data, s.key),
              backgroundColor: hex,
              hoverBackgroundColor: barHover(hex),
              borderRadius: { topLeft: barRadius, topRight: barRadius, bottomLeft: 0, bottomRight: 0 },
              borderSkipped: false,
              maxBarThickness: maxBarThickness.vertical,
              yAxisID: 'y',
            };
          }),
          {
            type: 'line' as const,
            label: line.name,
            data: valuesOf(data, line.key),
            fill: false,
            borderColor: lineHex,
            backgroundColor: lineHex,
            pointBackgroundColor: lineHex,
            borderDash: line.dashed ? dashPattern : undefined,
            yAxisID: lineAxis === 'own' ? 'y1' : 'y',
          },
        ],
      } as ChartConfiguration['data'],
      options: {
        scales: {
          y: valueAxis('zero', props.valueFormat),
          ...(lineAxis === 'own' ? { y1: { ...valueAxis('zero', lineFormat), position: 'right' as const, grid: { display: false } } } : {}),
        },
        plugins: {
          legend: { display: legend },
          tooltip: {
            callbacks: {
              label: (ctx: { dataset: { label?: string; yAxisID?: string }; parsed: { y: number } }) =>
                `${ctx.dataset.label}: ${(ctx.dataset.yAxisID === 'y1' ? lf : valueFormat)(ctx.parsed.y)}`,
            },
          },
        },
      },
    } as ChartConfiguration;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, categoryKey, bars, line, lineAxis, lineFormat, valueFormat, legend]);
  return (
    <ChartFrame
      ref={ref}
      label={label}
      config={config}
      height={height}
      table={categoryTable(data, categoryKey, categoryLabel, [...bars, { ...line, format: lf }], valueFormat)}
    />
  );
});
