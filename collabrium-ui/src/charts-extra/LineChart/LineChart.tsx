'use client';

import { forwardRef } from 'react';
import { Line, LineChart as RechartsLine } from 'recharts';
import { CartesianFrame, resolveSeries, type CartesianChartProps, type ChartSeries } from '../lib/CartesianFrame';
import { dashPattern, defaultFormat, lineWidth, pointHoverRadius, pointRadius, pointRing } from '../lib/chart-theme';

export interface LineChartProps extends CartesianChartProps {
  /** One entry per line. Up to seven, each in the next DLS series colour; past that, tell them apart with `dashed`. */
  series: ChartSeries[];
  /** `smooth` draws a gentle curve through the points; `linear` joins them with straight segments. Default `smooth`. */
  curve?: 'smooth' | 'linear';
}

/**
 * Change over time as one or more lines. Built on Recharts for when the
 * Chart.js Line does not fit; same chrome, marks and colours.
 */
export const LineChart = forwardRef<HTMLElement, LineChartProps>(function LineChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', series, valueFormat = defaultFormat, yAxisStart = 'fit', height, legend = true, curve = 'smooth' },
  ref,
) {
  const resolved = resolveSeries(series);
  return (
    <CartesianFrame
      ref={ref}
      label={label}
      legend={legend}
      series={resolved}
      categoryKey={categoryKey}
      height={height}
      valueFormat={valueFormat}
      yAxisStart={yAxisStart}
      table={{
        columns: [categoryLabel, ...resolved.map(s => s.name)],
        rows: data.map(d => [d[categoryKey], ...resolved.map(s => valueFormat(Number(d[s.key])))]),
      }}
    >
      {({ axes, tooltip, motion, hidden, chartProps }) => (
        <RechartsLine data={data} {...chartProps}>
          {axes}
          {tooltip}
          {resolved.map(s => (
            <Line
              key={s.key}
              type={curve === 'smooth' ? 'monotone' : 'linear'}
              dataKey={s.key}
              name={s.name}
              hide={hidden.has(s.key)}
              stroke={s.hex}
              strokeWidth={lineWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={s.dashed ? dashPattern : undefined}
              dot={{ r: pointRadius, fill: s.hex, ...pointRing }}
              activeDot={{ r: pointHoverRadius, fill: s.hex, ...pointRing }}
              {...motion}
            />
          ))}
        </RechartsLine>
      )}
    </CartesianFrame>
  );
});
