'use client';

import { forwardRef, useEffect, useRef, useState, type ReactElement } from 'react';
import { CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartShell, type ChartTable } from './ChartShell';
import type { LegendItem } from './ChartLegend';
import { ChartTooltip, type TooltipDescribe } from './ChartTooltip';
import { axisTick, compactFormat, cursor, cursorBand, defaultFormat, grid, scrollAxisWidth, scrollSlot } from './chart-theme';
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
  /** The width to give a value axis: `auto`, or a fixed number while the chart scrolls sideways (the axis then stays in place). */
  axisWidth: number | 'auto';
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
  /** The number of categories, for a vertical bar chart. Gives every category a 24px bar's slot and makes the chart scroll sideways when they do not fit, with the value axis fixed in place. */
  categories?: number;
  /** True when the chart has a second value axis on the right, which is also fixed in place while the chart scrolls. */
  rightAxis?: boolean;
  /** Extra legend items after the series, e.g. the remainder of a stack, or a fixed key to the marks. */
  extraLegend?: LegendItem[];
  children: (ctx: FrameContext) => ReactElement;
}

/** The Recharts frame: DLS axes, gridline, tooltip and motion around the chart a component draws. */
export const CartesianFrame = forwardRef<HTMLElement, FrameProps>(function CartesianFrame(
  { label, legend, legendSeries = true, series, categoryKey, height, valueFormat = defaultFormat, yAxisStart = 'zero', orientation = 'vertical', marks = 'lines', describe, table, categories, rightAxis, extraLegend = [], children },
  ref,
) {
  const motion = useChartMotion();
  const bare = useBare();
  const horizontal = orientation === 'horizontal';
  const scrolling = !bare && !horizontal && marks === 'bars' && !!categories;
  const axisWidth: number | 'auto' = scrolling ? scrollAxisWidth : 'auto';
  const inner = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(480);
  useEffect(() => {
    const el = inner.current;
    if (!scrolling || !el) return;
    const ro = new ResizeObserver(() => setWidth(el.getBoundingClientRect().width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [scrolling]);
  // The axis shortens numbers unless the host gave its own format (a currency, a unit); the tooltip always shows the full value.
  const axisFormat = valueFormat === defaultFormat ? compactFormat : valueFormat;
  const domain: [number | 'auto', number | 'auto'] = yAxisStart === 'fit' ? ['auto', 'auto'] : [0, 'auto'];

  // A bare thumbnail keeps the axes' scales (so a fitted line still fills its box) but draws none of them.
  const axes: ReactElement[] = bare
    ? horizontal
      ? [<XAxis key="x" type="number" hide domain={domain} />, <YAxis key="y" type="category" dataKey={categoryKey} hide />]
      : [<XAxis key="x" dataKey={categoryKey} hide />, <YAxis key="y" hide domain={domain} />]
    : horizontal
    ? [
        <CartesianGrid key="grid" horizontal={false} {...grid} />,
        <XAxis key="x" type="number" tickLine={false} axisLine={false} tick={axisTick} tickFormatter={axisFormat} domain={domain} />,
        <YAxis key="y" type="category" dataKey={categoryKey} width="auto" tickLine={false} axisLine={false} tick={axisTick} />,
      ]
    : [
        <CartesianGrid key="grid" vertical={false} {...grid} />,
        <XAxis key="x" dataKey={categoryKey} tickLine={false} axisLine={false} tick={axisTick} />,
        <YAxis key="y" width={axisWidth} tickLine={false} axisLine={false} tick={axisTick} tickFormatter={axisFormat} domain={domain} />,
      ];
  const tooltip = bare ? <></> : <Tooltip key="tip" cursor={marks === 'bars' ? cursorBand : cursor} content={<ChartTooltip format={valueFormat} describe={describe} />} />;

  const frameContext = (hidden: ReadonlySet<string>, copy = false): FrameContext => ({
    axes,
    tooltip: copy ? <></> : tooltip,
    motion: copy ? { ...motion, isAnimationActive: false } : motion,
    hidden,
    axisWidth,
    chartProps: {
      title: copy ? '' : label,
      accessibilityLayer: !copy as true,
      margin: bare ? bareMargin : plotMargin,
      ...(horizontal ? { layout: 'vertical' as const } : {}),
    },
  });
  const legendItems = legend ? [...(legendSeries ? series.map(s => ({ key: s.key, name: s.name, color: s.hex })) : []), ...extraLegend] : undefined;

  return (
    <ChartShell ref={ref} label={label} height={height} legend={legendItems} table={table} fill>
      {({ hidden }) =>
        scrolling ? (
          // Wider than the box when the categories do not fit: the box scrolls, and a copy of the chart, clipped to
          // just its value axis, stays at each side so the numbers can still be read.
          <div className="cui-chartx__scroll">
            <div
              ref={inner}
              className="cui-chartx__scroll-inner"
              style={{ minWidth: `${categories! * scrollSlot + scrollAxisWidth * (rightAxis ? 2 : 1) + plotMargin.left + plotMargin.right}px` }}
            >
              <div className="cui-chartx__scroll-main">
                <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 260 }}>
                  {children(frameContext(hidden))}
                </ResponsiveContainer>
              </div>
              <div className="cui-chartx__axis-copy" data-side="left" style={{ width: scrollAxisWidth }} aria-hidden="true">
                <div style={{ width, height: '100%' }}>
                  <ResponsiveContainer width={width} height="100%" initialDimension={{ width: 320, height: 260 }}>
                    {children(frameContext(hidden, true))}
                  </ResponsiveContainer>
                </div>
              </div>
              {rightAxis && (
                <div className="cui-chartx__axis-copy" data-side="right" style={{ width: scrollAxisWidth }} aria-hidden="true">
                  <div style={{ width, height: '100%', marginLeft: scrollAxisWidth - width }}>
                    <ResponsiveContainer width={width} height="100%" initialDimension={{ width: 320, height: 260 }}>
                      {children(frameContext(hidden, true))}
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 260 }}>
            {children(frameContext(hidden))}
          </ResponsiveContainer>
        )
      }
    </ChartShell>
  );
});
