'use client';

import { forwardRef, useId } from 'react';
import { Bar, BarChart as RechartsBar } from 'recharts';
import { CartesianFrame, resolveSeries, type CartesianChartProps, type ChartSeries } from '../lib/CartesianFrame';
import { barHover, barRadius, defaultFormat, maxBarThickness } from '../lib/chart-theme';
import { DitherDefs, ditherFill, ditherKindAt } from '../lib/dither';
import { tokens } from '../../tokens/tokens';

export interface DitherBarChartProps extends Omit<CartesianChartProps, 'yAxisStart'> {
  /** One entry per bar in each group. Each takes the next DLS series colour and the next pattern. Up to five: the patterns repeat after that. */
  series: Omit<ChartSeries, 'dashed'>[];
  /** `vertical` stands the bars up with the categories along the bottom. `horizontal` lays them lengthwise. Default `vertical`. */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Bar chart with a printed texture: each series is filled with its own
 * pattern in its own colour, so it can be told apart without the colour.
 * Same chrome, marks and colours as Bar chart; use that when the texture
 * adds nothing.
 */
export const DitherBarChart = forwardRef<HTMLElement, DitherBarChartProps>(function DitherBarChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', series, valueFormat = defaultFormat, height, legend = true, orientation = 'vertical' },
  ref,
) {
  const id = 'dither' + useId().replace(/:/g, '');
  const resolved = resolveSeries(series);
  const horizontal = orientation === 'horizontal';
  return (
    <CartesianFrame
      ref={ref}
      label={label}
      legend={legend}
      dither
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
          <DitherDefs id={id} entries={resolved.map((s, i) => ({ key: s.key, color: s.hex, kind: ditherKindAt(i), hoverColor: barHover(s.hex) }))} />
          {axes}
          {tooltip}
          {resolved.map(s => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              hide={hidden.has(s.key)}
              fill={ditherFill(id, s.key)}
              stroke={s.hex}
              strokeWidth={tokens.borderWidth.sm}
              radius={horizontal ? [0, barRadius, barRadius, 0] : [barRadius, barRadius, 0, 0]}
              maxBarSize={horizontal ? maxBarThickness.horizontal : maxBarThickness.vertical}
              activeBar={{ fill: ditherFill(id, s.key, true), stroke: barHover(s.hex) }}
              {...motion}
            />
          ))}
        </RechartsBar>
      )}
    </CartesianFrame>
  );
});
