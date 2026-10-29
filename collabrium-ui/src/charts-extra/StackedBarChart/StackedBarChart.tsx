'use client';

import { forwardRef, type ReactElement } from 'react';
import { Bar, BarChart as RechartsBar, Rectangle } from 'recharts';
import { CartesianFrame, resolveSeries, type CartesianChartProps, type ChartSeries } from '../lib/CartesianFrame';
import { barHover, barRadius, defaultFormat, maxBarThickness } from '../lib/chart-theme';
import { rampRungs, type RampColorName } from '../lib/series-colors';
import { tokens } from '../../tokens/tokens';

const REMAINDER = '__remainder';

export interface StackedBarChartProps extends Omit<CartesianChartProps, 'yAxisStart'> {
  /** The parts of each bar, bottom (or left) to top (or right). */
  series: Omit<ChartSeries, 'dashed'>[];
  /** `vertical` stands the bars up. `horizontal` lays them lengthwise. Default `vertical`. */
  orientation?: 'vertical' | 'horizontal';
  /** The key of the figure each bar is labelled with. When the parts do not add up to it, the rest is drawn in Neutral-3 as "Remaining", so the stack always equals its label. */
  totalKey?: string;
  /** What the rest is called when `totalKey` is set. Default "Remaining". */
  remainderName?: string;
  /** For parts of ONE measure (two time windows, say): colours the parts as a single-hue ramp, lightest first, instead of different colours. Up to three parts. */
  ramp?: RampColorName;
}

/**
 * Parts within a total, compared across categories. Only the outer end of
 * each stack is rounded (the last non-zero part, worked out per bar), so the
 * bar reads as one thing; the joins stay square.
 */
export const StackedBarChart = forwardRef<HTMLElement, StackedBarChartProps>(function StackedBarChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', series, valueFormat = defaultFormat, height, legend = true, orientation = 'vertical', totalKey, remainderName = 'Remaining', ramp },
  ref,
) {
  const horizontal = orientation === 'horizontal';
  const base = resolveSeries(series);
  // Stacked bars skip the faintest rung (the -bg tint): three parts at most.
  const rungs = ramp ? rampRungs(ramp).slice(1) : undefined;
  const resolved = base.map((s, i) => (rungs ? { ...s, hex: rungs[Math.min(i, rungs.length - 1)] } : s));
  const sum = (d: (typeof data)[number]) => resolved.reduce((t, s) => t + Number(d[s.key]), 0);
  const rows = totalKey ? data.map(d => ({ ...d, [REMAINDER]: Math.max(0, Number(d[totalKey]) - sum(d)) })) : data;
  const order = [...resolved.map(s => s.key), ...(totalKey ? [REMAINDER] : [])];

  // Round only the outer end of a bar's last visible, non-zero part. Computed per bar,
  // since which part is last changes with the data.
  const shapeFor = (key: string, hidden: ReadonlySet<string>) => (props: any): ReactElement => {
    const last = [...order].reverse().find(k => !hidden.has(k) && Number(props.payload?.[k]) > 0);
    const r = key === last ? (horizontal ? [0, barRadius, barRadius, 0] : [barRadius, barRadius, 0, 0]) : 0;
    return <Rectangle {...props} radius={r} />;
  };

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
      extraLegend={totalKey ? [{ key: REMAINDER, name: remainderName, color: tokens.color.neutral3 }] : []}
      table={{
        columns: [categoryLabel, ...resolved.map(s => s.name), ...(totalKey ? [remainderName, 'Total'] : [])],
        rows: data.map(d => [
          d[categoryKey],
          ...resolved.map(s => valueFormat(Number(d[s.key]))),
          ...(totalKey ? [valueFormat(Math.max(0, Number(d[totalKey]) - sum(d))), valueFormat(Number(d[totalKey]))] : []),
        ]),
      }}
    >
      {({ axes, tooltip, motion, hidden, chartProps }) => (
        <RechartsBar data={rows} {...chartProps}>
          {axes}
          {tooltip}
          {resolved.map(s => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              stackId="stack"
              hide={hidden.has(s.key)}
              fill={s.hex}
              maxBarSize={horizontal ? maxBarThickness.horizontal : maxBarThickness.vertical}
              shape={shapeFor(s.key, hidden)}
              activeBar={(p: any) => <Rectangle {...p} fill={barHover(s.hex)} />}
              {...motion}
            />
          ))}
          {totalKey && (
            <Bar
              dataKey={REMAINDER}
              name={remainderName}
              stackId="stack"
              hide={hidden.has(REMAINDER)}
              fill={tokens.color.neutral3}
              maxBarSize={horizontal ? maxBarThickness.horizontal : maxBarThickness.vertical}
              shape={shapeFor(REMAINDER, hidden)}
              {...motion}
            />
          )}
        </RechartsBar>
      )}
    </CartesianFrame>
  );
});

