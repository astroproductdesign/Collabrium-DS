'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { alpha, colorOf, dashPattern, defaultFormat, resolveColorName, WASH, type CartesianChartProps, type ChartSeries } from '../lib/theme';
import { categoryTable, labelsOf, tooltipLines, valueAxis, valuesOf } from '../lib/options';

export interface AreaChartProps extends CartesianChartProps {
  /** One area per series. */
  series: ChartSeries[];
  /** Where the value axis starts: `zero` (the default) or `fit`. */
  yAxisStart?: 'zero' | 'fit';
}

/** Cumulative volume over time, drawn by Chart.js: Line's marks, plus a wash of each line's own colour (about 12%) under it. */
export const AreaChart = forwardRef<HTMLElement, AreaChartProps>(function AreaChart(props, ref) {
  const { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', series, valueFormat = defaultFormat, yAxisStart = 'zero', height, legend = true } = props;
  const config = useMemo<ChartConfiguration>(
    () => ({
      type: 'line',
      data: {
        labels: labelsOf(data, categoryKey),
        datasets: series.map((s, i) => {
          const hex = colorOf(resolveColorName(s.color, i));
          return { label: s.name, data: valuesOf(data, s.key), fill: 'origin', borderColor: hex, backgroundColor: alpha(hex, WASH), pointBackgroundColor: hex, borderDash: s.dashed ? dashPattern : undefined };
        }),
      },
      options: { scales: { y: valueAxis(yAxisStart, props.valueFormat) }, plugins: { legend: { display: legend }, tooltip: tooltipLines(valueFormat) } },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, categoryKey, series, valueFormat, yAxisStart, legend],
  );
  return <ChartFrame ref={ref} label={label} config={config} height={height} table={categoryTable(data, categoryKey, categoryLabel, series, valueFormat)} />;
});
