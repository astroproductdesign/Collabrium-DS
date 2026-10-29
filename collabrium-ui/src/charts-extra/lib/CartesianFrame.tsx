'use client';

import { forwardRef, type ReactElement } from 'react';
import { CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartShell, type ChartTable } from './ChartShell';
import type { LegendItem } from './ChartLegend';
import { ChartTooltip, type TooltipDescribe } from './ChartTooltip';
import { axisTick, cursor, cursorBand, defaultFormat, grid } from './chart-theme';
import { resolveSeriesColorName, seriesColorValue, type SeriesColorName } from './series-colors';
import { useBare } from './bare';
import { useChartMotion } from './useChartMotion';

/** One row of chart data: the category plus a number per series. */
export type ChartDatum = Record<string, string | number>;

export interface ChartSeries {
  /** The key of this series' value in each data row. */
  key: string;
  /** The series' name, shown in the legend, the tooltip and the table. */
  name: string;
  /** One of the seven DLS series colours. Leave out to take the next colour in the mapping order. */
  color?: SeriesColorName;
  /** Draws the line dashed, to tell series apart by pattern when colour is not enough. */
  dashed?: boolean;
}

/** The props every cartesian chart shares. */
export interface CartesianChartProps {
  /** Names the chart for assistive technology, e.g. "Renewal rate by month". Say what the chart shows, not that it is a chart. */
  'aria-label': string;
  /** One object per category, e.g. `{ month: 'Mar', rate: 72 }`. */
  data: ChartDatum[];
  /** The key of the category in each row, drawn along the horizontal axis. */
  categoryKey: string;
  /** The heading of the category column in the table view. Default "Category". */
  categoryLabel?: string;
  /** Formats a value for the axis, the tooltip and the table, e.g. `v => v + '%'`. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Where the value axis starts. `zero` always includes 0; `fit` zooms to the data. Each chart has its own default. */
  yAxisStart?: 'zero' | 'fit';
  /** Plot height. `default` is 260px, `tall` is 300px: a floor, so the chart grows to fill a taller container. */
  height?: 'default' | 'tall';
  /** Shows the legend under the chart. Default true. */
  legend?: boolean;
}

export interface ResolvedSeries extends ChartSeries {
  colorName: SeriesColorName;
  /** The colour as a hex value, for the marks. */
  hex: string;
}

export function resolveSeries(series: ChartSeries[]): ResolvedSeries[] {
  return series.map((s, i) => {
    const colorName = resolveSeriesColorName(s.color, i);
    return { ...s, colorName, hex: seriesColorValue(colorName) };
  });
}

/** Room for the focus ring (inset 2px), the last point's ring and the topmost gridline label. */
const plotMargin = { top: 8, right: 8, left: 4, bottom: 0 };

/** A bare thumbnail has no axes, so it only needs room for the marks' own edges. */
const bareMargin = { top: 6, right: 6, left: 6, bottom: 6 };

/** What a chart gets from the frame to draw itself with. */
export interface FrameContext {
  /** Gridline, category axis and value axis, per the DLS chrome. Place first inside the Recharts chart. */
  axes: ReactElement[];
  /** The DLS tooltip. */
  tooltip: ReactElement;
  /** Animation props for each mark. */
  motion: ReturnType<typeof useChartMotion>;
  /** Keys of the series the person has hidden from the legend. */
  hidden: ReadonlySet<string>;
  /** Spread onto the Recharts chart: its accessible name, the arrow-key reading layer, the plot margin and (for horizontal bars) the layout. */
  chartProps: { title: string; accessibilityLayer: true; margin: { top: number; right: number; left: number; bottom: number }; layout?: 'vertical' };
}

interface FrameProps {
  label: string;
  legend: boolean;
  /** False when the legend is only `extraLegend` (a fixed key), not the series. Default true. */
  legendSeries?: boolean;
  series: ResolvedSeries[];
  categoryKey: string;
  height?: 'default' | 'tall';
  valueFormat?: (value: number) => string;
  yAxisStart?: 'zero' | 'fit';
  /** `vertical` draws the category along the bottom; `horizontal` draws bars lengthwise with the category on the left. */
  orientation?: 'vertical' | 'horizontal';
  /** `bars` highlights the hovered category with a Neutral-2 band; `lines` draws a Neutral-3 cursor line. */
  marks?: 'lines' | 'bars';
  /** Replaces the default tooltip lines (one "name: value" per series). */
  describe?: TooltipDescribe;
  table: ChartTable;
  /** Extra legend items after the series, e.g. the remainder of a stack, or a fixed key to the marks. */
  extraLegend?: LegendItem[];
  children: (ctx: FrameContext) => ReactElement;
}

/** The Recharts frame: DLS axes, gridline, tooltip and motion around the chart a component draws. */
export const CartesianFrame = forwardRef<HTMLElement, FrameProps>(function CartesianFrame(
  { label, legend, legendSeries = true, series, categoryKey, height, valueFormat = defaultFormat, yAxisStart = 'zero', orientation = 'vertical', marks = 'lines', describe, table, extraLegend = [], children },
  ref,
) {
  const motion = useChartMotion();
  const bare = useBare();
  const horizontal = orientation === 'horizontal';
  const domain: [number | 'auto', number | 'auto'] = yAxisStart === 'fit' ? ['auto', 'auto'] : [0, 'auto'];

  // A bare thumbnail keeps the axes' scales (so a fitted line still fills its box) but draws none of them.
  const axes: ReactElement[] = bare
    ? horizontal
      ? [<XAxis key="x" type="number" hide domain={domain} />, <YAxis key="y" type="category" dataKey={categoryKey} hide />]
      : [<XAxis key="x" dataKey={categoryKey} hide />, <YAxis key="y" hide domain={domain} />]
    : horizontal
    ? [
        <CartesianGrid key="grid" horizontal={false} {...grid} />,
        <XAxis key="x" type="number" tickLine={false} axisLine={false} tick={axisTick} tickFormatter={valueFormat} domain={domain} />,
        <YAxis key="y" type="category" dataKey={categoryKey} width="auto" tickLine={false} axisLine={false} tick={axisTick} />,
      ]
    : [
        <CartesianGrid key="grid" vertical={false} {...grid} />,
        <XAxis key="x" dataKey={categoryKey} tickLine={false} axisLine={false} tick={axisTick} />,
        <YAxis key="y" width="auto" tickLine={false} axisLine={false} tick={axisTick} tickFormatter={valueFormat} domain={domain} />,
      ];
  const tooltip = bare ? <></> : <Tooltip key="tip" cursor={marks === 'bars' ? cursorBand : cursor} content={<ChartTooltip format={valueFormat} describe={describe} />} />;

  const legendItems = legend ? [...(legendSeries ? series.map(s => ({ key: s.key, name: s.name, color: s.hex })) : []), ...extraLegend] : undefined;

  return (
    <ChartShell ref={ref} label={label} height={height} legend={legendItems} table={table} fill>
      {({ hidden }) => (
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 260 }}>
          {children({
            axes,
            tooltip,
            motion,
            hidden,
            chartProps: { title: label, accessibilityLayer: true, margin: bare ? bareMargin : plotMargin, ...(horizontal ? { layout: 'vertical' as const } : {}) },
          })}
        </ResponsiveContainer>
      )}
    </ChartShell>
  );
});

