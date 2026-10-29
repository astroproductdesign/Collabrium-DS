'use client';

import { forwardRef } from 'react';
import { Bar, BarChart as RechartsBar } from 'recharts';
import { CartesianFrame, resolveSeries, type CartesianChartProps, type ChartSeries } from '../lib/CartesianFrame';
import { barHover, barRadius, defaultFormat, maxBarThickness } from '../lib/chart-theme';

export interface BarChartProps extends Omit<CartesianChartProps, 'yAxisStart'> {
  /** One entry per bar in each group. Each takes the next DLS series colour. Past about four, use a table. */
  series: Omit<ChartSeries, 'dashed'>[];
  /** `vertical` stands the bars up with the categories along the bottom. `horizontal` lays them lengthwise, for long category names and for ranking. Default `vertical`. */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Values compared across categories as bars. The value axis always starts at
 * zero, because a bar's length is its value. Built on Recharts for when the
 * Chart.js Bar does not fit; same chrome, marks and colours.
 */
export const BarChart = forwardRef<HTMLElement, BarChartProps>(function BarChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', series, valueFormat = defaultFormat, height, legend = true, orientation = 'vertical' },
  ref,
) {
  const resolved = resolveSeries(series);
  const horizontal = orientation === 'horizontal';
  return (
    <CartesianFrame
      ref={ref}
      label={label}
      legend={legend}
      series={resolved}
      categoryKey={categoryKey}
      height={height}
      valueFormat={valueFormat}
      orientation={orientation}
      marks="bars"
      table={{
        columns: [categoryLabel, ...resolved.map(s => s.name)],
        rows: data.map(d => [d[categoryKey], ...resolved.map(s => valueFormat(Number(d[s.key])))]),
      }}
    >
      {({ axes, tooltip, motion, hidden, chartProps }) => (
        <RechartsBar data={data} {...chartProps}>
          {axes}
          {tooltip}
          {resolved.map(s => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              hide={hidden.has(s.key)}
              fill={s.hex}
              radius={horizontal ? [0, barRadius, barRadius, 0] : [barRadius, barRadius, 0, 0]}
              maxBarSize={horizontal ? maxBarThickness.horizontal : maxBarThickness.vertical}
              activeBar={{ fill: barHover(s.hex) }}
              {...motion}
            />
          ))}
        </RechartsBar>
      )}
    </CartesianFrame>
  );
});
