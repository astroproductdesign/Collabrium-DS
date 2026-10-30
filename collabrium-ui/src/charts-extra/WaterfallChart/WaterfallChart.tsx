'use client';

import { forwardRef, type ReactElement } from 'react';
import { Bar, BarChart as RechartsBar, Cell, Rectangle } from 'recharts';
import { CartesianFrame, type CartesianChartProps, type ChartDatum, type ResolvedSeries } from '../lib/CartesianFrame';
import { barHover, barRadius, defaultFormat, maxBarThickness, barCategoryGap } from '../lib/chart-theme';
import { tokens } from '../../tokens/tokens';

const { color } = tokens;
const BASE = '__base';

export interface WaterfallChartProps extends Omit<CartesianChartProps, 'yAxisStart' | 'legend'> {
  /** The key of each step's value in a row: the change for a step, the whole amount for a total. */
  valueKey: string;
  /** What the value is, for the table heading and the tooltip, e.g. "Balance". Default "Value". */
  valueLabel?: string;
  /** The categories that are totals (drawn from zero), e.g. `['Opening', 'Closing']`. Default: the first and the last. Pass `[]` for none. */
  totals?: string[];
  /** `vertical` stands the steps up. `horizontal` lays them lengthwise. Default `vertical`. */
  orientation?: 'vertical' | 'horizontal';
}

interface Step extends Record<string, unknown> {
  [BASE]: number;
  __delta: number;
  __kind: 'total' | 'up' | 'down';
  __change: number;
  __running: number;
}

const kindColor = { total: color.navy, up: color.green, down: color.red } as const;

/**
 * How a total moves between two figures: an opening total, steps that add to
 * it or take from it, a closing total. Each step floats from where the last
 * one ended. Increases are Green, decreases Red, totals Navy. Keep the
 * running total above zero.
 */
export const WaterfallChart = forwardRef<HTMLElement, WaterfallChartProps>(function WaterfallChart(
  { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', valueKey, valueLabel = 'Value', totals, valueFormat = defaultFormat, height, orientation = 'vertical' },
  ref,
) {
  const horizontal = orientation === 'horizontal';
  const totalSet = new Set(totals ?? [String(data[0]?.[categoryKey]), String(data[data.length - 1]?.[categoryKey])]);
  let running = 0;
  const steps: (ChartDatum & Step)[] = data.map(d => {
    const v = Number(d[valueKey]);
    const isTotal = totalSet.has(String(d[categoryKey]));
    const start = isTotal ? 0 : running;
    const end = isTotal ? v : running + v;
    running = end;
    return {
      ...d,
      [BASE]: Math.min(start, end),
      __delta: Math.abs(end - start),
      __kind: isTotal ? 'total' : v >= 0 ? 'up' : 'down',
      __change: v,
      __running: end,
    } as ChartDatum & Step;
  });

  const signed = (v: number) => (v > 0 ? '+' : v < 0 ? '−' : '') + valueFormat(Math.abs(v));
  const outer = horizontal ? [0, barRadius, barRadius, 0] : [barRadius, barRadius, 0, 0];
  const all = barRadius;
  const series: ResolvedSeries[] = [{ key: '__delta', name: valueLabel, colorName: 'navy', hex: color.navy }];

  return (
    <CartesianFrame
      ref={ref}
      label={label}
      legend
      legendSeries={false}
      series={series}
      categoryKey={categoryKey}
      height={height}
      valueFormat={valueFormat}
      orientation={orientation}
      marks="bars"
      categories={data.length}
      describe={row => {
        const r = row as unknown as Step;
        return r.__kind === 'total' ? [`${valueLabel}: ${valueFormat(r.__change)}`] : [`Change: ${signed(r.__change)}`, `Running total: ${valueFormat(r.__running)}`];
      }}
      extraLegend={[
        { key: 'up', name: 'Increase', color: kindColor.up, fixed: true },
        { key: 'down', name: 'Decrease', color: kindColor.down, fixed: true },
        { key: 'total', name: 'Total', color: kindColor.total, fixed: true },
      ]}
      table={{
        columns: [categoryLabel, 'Change', 'Running total'],
        rows: steps.map(s => [s[categoryKey], s.__kind === 'total' ? '—' : signed(s.__change), valueFormat(s.__running)]),
      }}
    >
      {({ axes, tooltip, motion, chartProps }) => (
        <RechartsBar barCategoryGap={barCategoryGap} data={steps} {...chartProps}>
          {axes}
          {tooltip}
          <Bar dataKey={BASE} stackId="w" fill="transparent" isAnimationActive={false} tooltipType="none" legendType="none" activeBar={false} />
          <Bar
            dataKey="__delta"
            name={valueLabel}
            stackId="w"
            maxBarSize={horizontal ? maxBarThickness.horizontal : maxBarThickness.vertical}
            shape={(p: any): ReactElement => <Rectangle {...p} radius={p.payload.__kind === 'total' ? outer : all} />}
            activeBar={(p: any) => <Rectangle {...p} radius={p.payload.__kind === 'total' ? outer : all} fill={barHover(p.fill)} />}
            {...motion}
          >
            {steps.map((s, i) => (
              <Cell key={i} fill={kindColor[s.__kind]} />
            ))}
          </Bar>
        </RechartsBar>
      )}
    </CartesianFrame>
  );
});
