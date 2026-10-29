'use client';

import { forwardRef } from 'react';
import { Bar, ComposedChart as RechartsComposed, Line, YAxis } from 'recharts';
import { CartesianFrame, resolveSeries, type CartesianChartProps, type ChartSeries } from '../lib/CartesianFrame';
import { axisTick, barHover, barRadius, dashPattern, defaultFormat, lineWidth, maxBarThickness, pointHoverRadius, pointRadius, pointRing } from '../lib/chart-theme';
import { useBare } from '../lib/bare';

export interface ComposedChartProps extends Omit<CartesianChartProps, 'yAxisStart'> {
  /** One entry per bar in each group. Each takes the next DLS series colour. The value axis on the left always starts at zero. */
  bars: Omit<ChartSeries, 'dashed'>[];
  /** The line drawn over the bars. It takes the colour after the last bar's. */
  line: ChartSeries;
  /** `own` gives the line its own scale on a second axis on the right, for a measure in other units (a rate over a count). `shared` plots it on the bars' axis. Default `own`. */
  lineAxis?: 'own' | 'shared';
  /** Formats the line's values for the right axis, the tooltip and the table, e.g. `v => v + '%'`. Default: `valueFormat`. */
  lineFormat?: (value: number) => string;
}

/**
 * Bars and a line on one canvas, for two measures of the same categories: a
 * count and a rate over it, or a total and its target. Each follows its own
 * DLS row verbatim: Bar's marks and Line's marks. Built on Recharts; Chart.js
 * draws this too (Mixed), so use it first when you need nothing else here.
 */
export const ComposedChart = forwardRef<HTMLElement, ComposedChartProps>(function ComposedChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', bars, line, lineAxis = 'own', lineFormat, valueFormat = defaultFormat, height, legend = true },
  ref,
) {
  const bare = useBare();
  const [lineSeries, ...barSeries] = (() => {
    const all = resolveSeries([...bars, line]);
    return [all[all.length - 1], ...all.slice(0, -1)];
  })();
  const lf = lineFormat ?? valueFormat;
  const own = lineAxis === 'own';
  return (
    <CartesianFrame
      ref={ref}
      label={label}
      legend={legend}
      series={[...barSeries, lineSeries]}
      categoryKey={categoryKey}
      height={height}
      valueFormat={valueFormat}
      marks="bars"
      describe={row => [...barSeries.map(s => `${s.name}: ${valueFormat(Number(row[s.key]))}`), `${lineSeries.name}: ${lf(Number(row[lineSeries.key]))}`]}
      table={{
        columns: [categoryLabel, ...barSeries.map(s => s.name), lineSeries.name],
        rows: data.map(d => [d[categoryKey], ...barSeries.map(s => valueFormat(Number(d[s.key]))), lf(Number(d[lineSeries.key]))]),
      }}
    >
      {({ axes, tooltip, motion, hidden, chartProps }) => (
        <RechartsComposed data={data} {...chartProps}>
          {axes}
          {/* The second axis: same hidden border and footnote ticks as the first, and no gridline of its own (Neutral-3 is drawn once, on the left axis). */}
          {own && <YAxis yAxisId="line" orientation="right" hide={bare} width="auto" tickLine={false} axisLine={false} tick={axisTick} tickFormatter={lf} domain={['auto', 'auto']} />}
          {tooltip}
          {barSeries.map(s => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              hide={hidden.has(s.key)}
              fill={s.hex}
              radius={[barRadius, barRadius, 0, 0]}
              maxBarSize={maxBarThickness.vertical}
              activeBar={{ fill: barHover(s.hex) }}
              {...motion}
            />
          ))}
          <Line
            type="monotone"
            yAxisId={own ? 'line' : undefined}
            dataKey={lineSeries.key}
            name={lineSeries.name}
            hide={hidden.has(lineSeries.key)}
            stroke={lineSeries.hex}
            strokeWidth={lineWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={lineSeries.dashed ? dashPattern : undefined}
            dot={{ r: pointRadius, fill: lineSeries.hex, ...pointRing }}
            activeDot={{ r: pointHoverRadius, fill: lineSeries.hex, ...pointRing }}
            {...motion}
          />
        </RechartsComposed>
      )}
    </CartesianFrame>
  );
});
