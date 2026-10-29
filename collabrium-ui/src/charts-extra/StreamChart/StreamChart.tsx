'use client';

import { forwardRef } from 'react';
import { Area, AreaChart as RechartsArea } from 'recharts';
import { CartesianFrame, resolveSeries, type CartesianChartProps, type ChartSeries } from '../lib/CartesianFrame';
import { dashPattern, defaultFormat, lineWidth, pointHoverRadius, pointRadius, pointRing, washOpacity } from '../lib/chart-theme';

export interface StreamChartProps extends CartesianChartProps {
  /** Two or three overlapping flows, e.g. inbound and outbound. Each takes the next DLS series colour. */
  series: ChartSeries[];
}

/**
 * Overlapping flows over time: layered areas drawn as soft, natural curves,
 * so the gap between two flows reads at a glance. Built on Recharts; same
 * chrome, marks and colours.
 */
export const StreamChart = forwardRef<HTMLElement, StreamChartProps>(function StreamChart(
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
        <RechartsArea data={data} {...chartProps}>
          {axes}
          {tooltip}
          {resolved.map(s => (
            <Area
              key={s.key}
              type="natural"
              dataKey={s.key}
              name={s.name}
              hide={hidden.has(s.key)}
              stroke={s.hex}
              strokeWidth={lineWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={s.dashed ? dashPattern : undefined}
              fill={s.hex}
              fillOpacity={washOpacity}
              dot={{ r: pointRadius, fill: s.hex, ...pointRing }}
              activeDot={{ r: pointHoverRadius, fill: s.hex, ...pointRing }}
              {...motion}
            />
          ))}
        </RechartsArea>
      )}
    </CartesianFrame>
  );
});
