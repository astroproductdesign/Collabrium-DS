'use client';

import { forwardRef, type ReactElement } from 'react';
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart as RechartsScatter, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import { ChartShell } from './ChartShell';
import { ChartTooltip } from './ChartTooltip';
import { axisTick, axisTitle, bubbleWash, cursor, defaultFormat, grid, scatterHoverRadius, scatterRadius } from './chart-theme';
import { tokens } from '../../tokens/tokens';
import { useBare } from './bare';
import { resolveSeriesColorName, seriesColorValue, type SeriesColorName } from './series-colors';
import { useChartMotion } from './useChartMotion';

export interface XYPoint {
  /** Position along the horizontal axis. */
  x: number;
  /** Position along the vertical axis. */
  y: number;
  /** The third measure, drawn as the point's size. Bubble chart only. */
  z?: number;
  /** Names this point in the tooltip and the table, e.g. "SOL / USDC". Default: the series' name. */
  name?: string;
}

export interface XYSeries {
  /** The series' name, shown in the legend, the tooltip and the table. */
  name: string;
  points: XYPoint[];
  /** One of the seven DLS series colours. Leave out to take the next colour in the mapping order. */
  color?: SeriesColorName;
}

export interface XYChartProps {
  /** Names the chart for assistive technology, e.g. "Deal size against days to close". */
  'aria-label': string;
  /** One entry per group of points. Each takes the next DLS series colour. */
  series: XYSeries[];
  /** Title of the horizontal axis, e.g. "Days to close". The DLS shows axis titles on scatter and bubble charts. */
  xLabel: string;
  /** Title of the vertical axis, e.g. "Deal size ($k)". */
  yLabel: string;
  /** Formats a horizontal value for the axis, the tooltip and the table. Default: locale-formatted number. */
  xFormat?: (value: number) => string;
  /** Formats a vertical value. Default: locale-formatted number. */
  yFormat?: (value: number) => string;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor, so the chart grows to fill a taller container. */
  height?: 'default' | 'tall';
  /** Shows the legend, which shows or hides each series. Default true. */
  legend?: boolean;
}

interface Props extends XYChartProps {
  /** Set for a bubble chart: the name and format of the third measure, drawn as size. */
  size?: { label: string; format: (value: number) => string };
}

/** A bubble's radius runs from the scatter point's 6px up to this, as its third measure rises. */
const MAX_BUBBLE_RADIUS = tokens.spacing[24];
const area = (r: number) => Math.PI * r * r;

/** The shared drawing of Scatter and Bubble: numeric axes with titles, one gridline set, points in series colours. */
export const XYChart = forwardRef<HTMLElement, Props>(function XYChart(
  { 'aria-label': label, series, xLabel, yLabel, xFormat = defaultFormat, yFormat = defaultFormat, height, legend = true, size },
  ref,
) {
  const motion = useChartMotion();
  const bare = useBare();
  const resolved = series.map((s, i) => {
    const colorName = resolveSeriesColorName(s.color, i);
    return { ...s, hex: seriesColorValue(colorName) };
  });
  const bubble = Boolean(size);
  // Keep the outermost points whole: room for the largest mark at each end of each axis.
  const edge = bubble ? MAX_BUBBLE_RADIUS : scatterHoverRadius + tokens.borderWidth.sm;
  // A scatter point is a fixed 6px; a bubble's radius follows its third measure.
  const radius = (p: any) => (bubble ? Math.sqrt(p.size / Math.PI) : scatterRadius);
  const mark = (hex: string, extra: number): ((p: any) => ReactElement) => p => (
    <circle
      cx={p.cx}
      cy={p.cy}
      r={radius(p) + extra}
      fill={hex}
      fillOpacity={bubble ? bubbleWash : 1}
      stroke={bubble ? hex : tokens.color.neutral1}
      strokeWidth={bubble ? tokens.borderWidth.md : tokens.borderWidth.sm}
    />
  );

  const rows = resolved.flatMap(s => s.points.map(p => ({ series: s.name, point: p.name ?? s.name, ...p })));
  const columns = ['Series', ...(resolved.some(s => s.points.some(p => p.name)) ? ['Point'] : []), xLabel, yLabel, ...(size ? [size.label] : [])];
  const withPoint = columns.includes('Point');

  return (
    <ChartShell
      ref={ref}
      label={label}
      height={height}
      legend={legend ? resolved.map(s => ({ key: s.name, name: s.name, color: s.hex })) : undefined}
      table={{
        columns,
        rows: rows.map(r => [r.series, ...(withPoint ? [r.name ?? '—'] : []), xFormat(r.x), yFormat(r.y), ...(size ? [size.format(r.z ?? 0)] : [])]),
      }}
      fill
    >
      {({ hidden }) => (
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 260 }}>
          <RechartsScatter title={label} accessibilityLayer margin={bare ? { top: 6, right: 6, left: 6, bottom: 6 } : { top: 8, right: 16, left: 4, bottom: 0 }}>
            {bare ? (
              <XAxis key="x" type="number" dataKey="x" hide domain={['auto', 'auto']} padding={{ left: edge, right: edge }} />
            ) : (
              <CartesianGrid key="grid" vertical={false} {...grid} />
            )}
            {!bare && (
              <XAxis
                key="x"
                type="number"
                dataKey="x"
                name={xLabel}
                tickLine={false}
                axisLine={false}
                tick={axisTick}
                tickFormatter={xFormat}
                domain={['auto', 'auto']}
                padding={{ left: edge, right: edge }}
                height={44}
                label={{ value: xLabel, position: 'insideBottom', offset: 0, ...axisTitle }}
              />
            )}
            {bare ? (
              <YAxis key="y" type="number" dataKey="y" hide domain={['auto', 'auto']} padding={{ top: edge, bottom: edge }} />
            ) : (
              <YAxis
                key="y"
                type="number"
                dataKey="y"
                name={yLabel}
                width="auto"
                tickLine={false}
                axisLine={false}
                tick={axisTick}
                tickFormatter={yFormat}
                domain={['auto', 'auto']}
                padding={{ top: edge, bottom: edge }}
                label={{ value: yLabel, angle: -90, position: 'insideLeft', ...axisTitle, style: { textAnchor: 'middle' } }}
              />
            )}
            {bubble && <ZAxis type="number" dataKey="z" range={[area(scatterRadius), area(MAX_BUBBLE_RADIUS)]} />}
            {!bare && (
              <Tooltip
                cursor={{ ...cursor, strokeDasharray: undefined }}
                content={
                  <ChartTooltip
                    format={defaultFormat}
                    title={row => String(row.__title)}
                    describe={row => [`${xLabel}: ${xFormat(Number(row.x))}`, `${yLabel}: ${yFormat(Number(row.y))}`, ...(size ? [`${size.label}: ${size.format(Number(row.z))}`] : [])]}
                  />
                }
              />
            )}
            {resolved.map(s => (
              <Scatter
                key={s.name}
                name={s.name}
                hide={hidden.has(s.name)}
                data={s.points.map(p => ({ ...p, __title: p.name ?? s.name }))}
                fill={s.hex}
                shape={mark(s.hex, 0)}
                activeShape={mark(s.hex, scatterHoverRadius - scatterRadius)}
                {...motion}
              />
            ))}
          </RechartsScatter>
        </ResponsiveContainer>
      )}
    </ChartShell>
  );
});
