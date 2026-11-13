'use client';

import { forwardRef, useMemo } from 'react';
import type { ChartConfiguration, ScriptableContext } from 'chart.js';
import { ChartFrame } from '../lib/ChartFrame';
import { tokens } from '../../tokens/tokens';
import { barHover, barRadius, colorOf, defaultFormat, maxBarThickness, rampRungs, resolveColorName, type CartesianChartProps, type ChartSeries, type RampColorName } from '../lib/theme';
import { categoryTable, labelsOf, tooltipLines, valueAxis, valuesOf } from '../lib/options';

export interface StackedBarChartProps extends CartesianChartProps {
  /** The segments, bottom (or left) first. Different categories walk the series colours; parts of one measure set `ramp`. */
  series: Omit<ChartSeries, 'dashed'>[];
  /** `vertical` (the default) or `horizontal`. */
  orientation?: 'vertical' | 'horizontal';
  /** The key of each row's labelled total: what the segments don't account for is drawn in Neutral-3, so the stack sums to it. */
  totalKey?: string;
  /** The remainder's name. Default "Remaining". */
  remainderName?: string;
  /** Parts of one measure (three at most): one hue's ramp, lightest first, instead of the series colours. */
  ramp?: RampColorName;
}

/**
 * Parts within a total, compared across categories, drawn by Chart.js. Only the outer end of each stack is rounded
 * (whichever segment ends it); the joins stay square. With `totalKey` the stack always sums to its total.
 */
export const StackedBarChart = forwardRef<HTMLElement, StackedBarChartProps>(function StackedBarChart(props, ref) {
  const { 'aria-label': label, data, categoryKey, categoryLabel = 'Category', series, valueFormat = defaultFormat, height, legend = true, orientation = 'vertical', totalKey, remainderName = 'Remaining', ramp } = props;
  const horizontal = orientation === 'horizontal';
  const config = useMemo<ChartConfiguration>(() => {
    // A ramp is the element's -bg-strong tint, its pastel and its full colour, lightest first: three parts at most
    // (the faintest tint vanishes on white), as Charts (extra) decided (Q-XCH-10, 2026-10-30).
    const rungs = ramp ? rampRungs(ramp).slice(1) : [];
    const colours = series.map((s, i) => (ramp ? rungs[Math.min(i, rungs.length - 1)] : colorOf(resolveColorName(s.color, i))));
    const sets = series.map((s) => valuesOf(data, s.key));
    if (totalKey) sets.push(data.map((d, i) => Math.max(0, Number(d[totalKey]) - sets.reduce((a, v) => a + (v[i] || 0), 0))));
    // Which dataset ends each stack: the last with a value there.
    const last = data.map((_, i) => {
      for (let k = sets.length - 1; k >= 0; k--) if (sets[k][i]) return k;
      return -1;
    });
    const outer = horizontal
      ? { topLeft: 0, bottomLeft: 0, topRight: barRadius, bottomRight: barRadius }
      : { topLeft: barRadius, topRight: barRadius, bottomLeft: 0, bottomRight: 0 };
    const names = [...series.map((s) => s.name), ...(totalKey ? [remainderName] : [])];
    const fills = [...colours, ...(totalKey ? [tokens.color.neutral3] : [])];
    return {
      type: 'bar',
      data: {
        labels: labelsOf(data, categoryKey),
        datasets: sets.map((values, k) => ({
          label: names[k],
          data: values,
          backgroundColor: fills[k],
          hoverBackgroundColor: barHover(fills[k]),
          borderSkipped: false,
          borderRadius: (ctx: ScriptableContext<'bar'>) => (last[ctx.dataIndex] === k ? outer : 0),
          maxBarThickness: horizontal ? maxBarThickness.horizontal : maxBarThickness.vertical,
        })),
      },
      options: {
        indexAxis: horizontal ? 'y' : 'x',
        scales: {
          [horizontal ? 'x' : 'y']: { ...valueAxis('zero', props.valueFormat), stacked: true },
          [horizontal ? 'y' : 'x']: { stacked: true },
        },
        plugins: { legend: { display: legend }, tooltip: tooltipLines(valueFormat, horizontal ? 'x' : 'y') },
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, categoryKey, series, valueFormat, legend, horizontal, totalKey, remainderName, ramp]);
  const tableSeries = totalKey ? [...series, { key: totalKey, name: 'Total' }] : series;
  return <ChartFrame ref={ref} label={label} config={config} height={height} table={categoryTable(data, categoryKey, categoryLabel, tableSeries, valueFormat)} />;
});
