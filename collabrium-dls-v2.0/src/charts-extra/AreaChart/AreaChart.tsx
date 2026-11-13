'use client';

import { forwardRef } from 'react';
import { Area, AreaChart as RechartsArea } from 'recharts';
import { CartesianFrame, resolveSeries, type CartesianChartProps, type ChartSeries } from '../lib/CartesianFrame';
import { dashPattern, defaultFormat, lineWidth, pointHoverRadius, pointRadius, pointRing, washOpacity } from '../lib/chart-theme';

export interface AreaChartProps extends CartesianChartProps {
  /** One entry per area. Up to seven, each in the next DLS series colour. Areas overlap, so keep to a few. */
  series: ChartSeries[];
  /** `smooth` draws a gentle curve through the points; `linear` joins them with straight segments. Default `smooth`. */
  curve?: 'smooth' | 'linear';
}

/**
 * Cumulative volume over time: a line with a 12% wash of its own colour
 * beneath it, never more. Built on Recharts for when the Chart.js Area does
 * not fit; same chrome, marks and colours.
 */
export const AreaChart = forwardRef<HTMLElement, AreaChartProps>(function AreaChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', series, valueFormat = defaultFormat, yAxisStart = 'zero', height, legend = true, curve = 'smooth' },
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
              type={curve === 'smooth' ? 'monotone' : 'linear'}
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
