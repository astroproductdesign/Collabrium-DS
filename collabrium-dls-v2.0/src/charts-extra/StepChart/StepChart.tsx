'use client';

import { forwardRef } from 'react';
import { Line, LineChart as RechartsLine } from 'recharts';
import { CartesianFrame, resolveSeries, type CartesianChartProps, type ChartSeries } from '../lib/CartesianFrame';
import { dashPattern, defaultFormat, lineWidth, pointHoverRadius, pointRadius, pointRing } from '../lib/chart-theme';

export interface StepChartProps extends CartesianChartProps {
  /** One entry per step line. Each takes the next DLS series colour. */
  series: ChartSeries[];
}

/**
 * A value that holds until it changes: a staircase line, for tiers, rates and
 * settings rather than a continuous measure. Built on Recharts; same chrome,
 * marks and colours.
 */
export const StepChart = forwardRef<HTMLElement, StepChartProps>(function StepChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', series, valueFormat = defaultFormat, yAxisStart = 'zero', height, legend = true },
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
              type="stepAfter"
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
