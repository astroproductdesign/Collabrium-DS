'use client';

import { forwardRef } from 'react';
import { Area, AreaChart as RechartsArea } from 'recharts';
import { CartesianFrame, resolveSeries, type CartesianChartProps } from '../lib/CartesianFrame';
import { defaultFormat, lineWidth, washOpacity } from '../lib/chart-theme';
import type { SeriesColorName } from '../lib/series-colors';

export interface RangeChartProps extends CartesianChartProps {
  /** The key of the low end of the range in each row. */
  minKey: string;
  /** The key of the high end of the range in each row. */
  maxKey: string;
  /** Names the band in the legend, the tooltip and the table, e.g. "Slippage range". */
  name: string;
  /** One of the seven DLS series colours. Default Orange, the first in the mapping order. */
  color?: SeriesColorName;
}

const BAND = '__band';

/**
 * A floating band between a low and a high value for each category, such as a
 * min-max variance or a confidence range. The band is a 12% wash of its colour,
 * with a 2px line on each edge. Built on Recharts; same chrome and colours.
 */
export const RangeChart = forwardRef<HTMLElement, RangeChartProps>(function RangeChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', minKey, maxKey, name, color, valueFormat = defaultFormat, yAxisStart = 'zero', height, legend = true },
  ref,
) {
  const [band] = resolveSeries([{ key: BAND, name, color }]);
  const rows = data.map(d => ({ ...d, [BAND]: [Number(d[minKey]), Number(d[maxKey])] as [number, number] }));
  return (
    <CartesianFrame
      ref={ref}
      label={label}
      legend={legend}
      series={[band]}
      categoryKey={categoryKey}
      height={height}
      valueFormat={valueFormat}
      yAxisStart={yAxisStart}
      table={{
        columns: [categoryLabel, `${name}, low`, `${name}, high`],
        rows: data.map(d => [d[categoryKey], valueFormat(Number(d[minKey])), valueFormat(Number(d[maxKey]))]),
      }}
    >
      {({ axes, tooltip, motion, hidden, chartProps }) => (
        <RechartsArea data={rows} {...chartProps}>
          {axes}
          {tooltip}
          <Area
            type="monotone"
            dataKey={BAND}
            name={name}
            hide={hidden.has(BAND)}
            stroke={band.hex}
            strokeWidth={lineWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={band.hex}
            fillOpacity={washOpacity}
            dot={false}
            {...motion}
          />
        </RechartsArea>
      )}
    </CartesianFrame>
  );
});
