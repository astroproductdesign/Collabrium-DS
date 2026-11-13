'use client';

import { forwardRef } from 'react';
import { Bar, BarChart as RechartsBar } from 'recharts';
import { CartesianFrame, resolveSeries, type CartesianChartProps } from '../lib/CartesianFrame';
import { barHover, barRadius, defaultFormat, maxBarThickness, barCategoryGap } from '../lib/chart-theme';
import type { SeriesColorName } from '../lib/series-colors';

export interface FunnelChartProps extends Omit<CartesianChartProps, 'yAxisStart' | 'legend'> {
  /** The key of each stage's count in a row. Stages run from widest to narrowest, top to bottom, in the order of `data`. */
  valueKey: string;
  /** Names what is counted, e.g. "Users", for the tooltip and the table. */
  name: string;
  /** One of the seven DLS series colours. Default Orange, the first in the mapping order. */
  color?: SeriesColorName;
}

/**
 * Stages a population passes through, each narrower than the last: a row of
 * bars, longest first. The tooltip and the table also give each stage as a
 * share of the first.
 */
export const FunnelChart = forwardRef<HTMLElement, FunnelChartProps>(function FunnelChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Stage', valueKey, name, color, valueFormat = defaultFormat, height },
  ref,
) {
  const [series] = resolveSeries([{ key: valueKey, name, color }]);
  const first = Number(data[0]?.[valueKey]) || 0;
  const share = (v: number) => (first > 0 ? `${((v / first) * 100).toFixed(1).replace(/\.0$/, '')}%` : '—');
  return (
    <CartesianFrame
      ref={ref}
      label={label}
      legend
      series={[series]}
      categoryKey={categoryKey}
      height={height}
      valueFormat={valueFormat}
      orientation="horizontal"
      marks="bars"
      describe={row => [`${name}: ${valueFormat(Number(row[valueKey]))}`, `${share(Number(row[valueKey]))} of ${String(data[0]?.[categoryKey])}`]}
      table={{
        columns: [categoryLabel, name, `Share of ${String(data[0]?.[categoryKey] ?? 'first')}`],
        rows: data.map(d => [d[categoryKey], valueFormat(Number(d[valueKey])), share(Number(d[valueKey]))]),
      }}
    >
      {({ axes, tooltip, motion, hidden, chartProps }) => (
        <RechartsBar barCategoryGap={barCategoryGap} data={data} {...chartProps}>
          {axes}
          {tooltip}
          <Bar
            dataKey={valueKey}
            name={name}
            hide={hidden.has(valueKey)}
            fill={series.hex}
            radius={[0, barRadius, barRadius, 0]}
            maxBarSize={maxBarThickness.horizontal}
            activeBar={{ fill: barHover(series.hex) }}
            {...motion}
          />
        </RechartsBar>
      )}
    </CartesianFrame>
  );
});
