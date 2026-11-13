'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { colorOf, dashPattern, defaultFormat, resolveColorName, type CartesianChartProps, type ChartSeries } from '../lib/theme';
import { categoryTable, labelsOf, tooltipLines, valueAxis, valuesOf } from '../lib/options';

export interface LineChartProps extends CartesianChartProps {
  /** One line per series; `dashed` tells one apart by pattern. */
  series: ChartSeries[];
  /** Where the value axis starts: `fit` (the default) zooms to the data; `zero` includes 0. */
  yAxisStart?: 'zero' | 'fit';
}

const lineSet = (hex: string, dashed?: boolean) => ({
  borderColor: hex,
  backgroundColor: hex,
  pointBackgroundColor: hex,
  borderDash: dashed ? dashPattern : undefined,
});

/** Change over time, drawn by Chart.js: 2px lines curving gently (0.3), 3px points ringed in white, 5px on hover; no fill. */
export const LineChart = forwardRef<HTMLElement, LineChartProps>(function LineChart(props, ref) {
  const { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', series, valueFormat = defaultFormat, yAxisStart = 'fit', height, legend = true } = props;
  const config = useMemo<ChartConfiguration>(
    () => ({
      type: 'line',
      data: {
        labels: labelsOf(data, categoryKey),
        datasets: series.map((s, i) => ({ label: s.name, data: valuesOf(data, s.key), fill: false, ...lineSet(colorOf(resolveColorName(s.color, i)), s.dashed) })),
      },
      options: { scales: { y: valueAxis(yAxisStart, props.valueFormat) }, plugins: { legend: { display: legend }, tooltip: tooltipLines(valueFormat) } },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, categoryKey, series, valueFormat, yAxisStart, legend],
  );
  return <ChartFrame ref={ref} label={label} config={config} height={height} table={categoryTable(data, categoryKey, categoryLabel, series, valueFormat)} />;
});
