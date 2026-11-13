'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { barHover, barRadius, colorOf, defaultFormat, maxBarThickness, resolveColorName, type CartesianChartProps, type ChartSeries } from '../lib/theme';
import { categoryTable, labelsOf, tooltipLines, valueAxis, valuesOf } from '../lib/options';

export interface BarChartProps extends CartesianChartProps {
  /** One entry per bar in each group; each takes the next DLS series colour. Past about four, use a table. */
  series: Omit<ChartSeries, 'dashed'>[];
  /** `vertical` (the default) stands the bars up; `horizontal` lays them lengthwise, for long names and ranking. */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Values compared across categories as bars, drawn by Chart.js. The value axis starts at zero; bars round 4px at
 * their outer end and cap at 24px (20px lengthwise); hover darkens 15%.
 */
export const BarChart = forwardRef<HTMLElement, BarChartProps>(function BarChart(props, ref) {
  const { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', series, valueFormat = defaultFormat, height, legend = true, orientation = 'vertical' } = props;
  const horizontal = orientation === 'horizontal';
  const config = useMemo<ChartConfiguration>(
    () => ({
      type: 'bar',
      data: {
        labels: labelsOf(data, categoryKey),
        datasets: series.map((s, i) => {
          const hex = colorOf(resolveColorName(s.color, i));
          return {
            label: s.name,
            data: valuesOf(data, s.key),
            backgroundColor: hex,
            hoverBackgroundColor: barHover(hex),
            borderRadius: horizontal
              ? { topLeft: 0, bottomLeft: 0, topRight: barRadius, bottomRight: barRadius }
              : { topLeft: barRadius, topRight: barRadius, bottomLeft: 0, bottomRight: 0 },
            borderSkipped: false,
            maxBarThickness: horizontal ? maxBarThickness.horizontal : maxBarThickness.vertical,
          };
        }),
      },
      options: {
        indexAxis: horizontal ? 'y' : 'x',
        scales: { [horizontal ? 'x' : 'y']: valueAxis('zero', props.valueFormat) },
        plugins: { legend: { display: legend }, tooltip: tooltipLines(valueFormat, horizontal ? 'x' : 'y') },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, categoryKey, series, valueFormat, legend, horizontal],
  );
  return <ChartFrame ref={ref} label={label} config={config} height={height} table={categoryTable(data, categoryKey, categoryLabel, series, valueFormat)} />;
});
