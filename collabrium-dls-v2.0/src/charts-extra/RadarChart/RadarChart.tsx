'use client';

import { forwardRef } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadar } from 'recharts';
import { PolarFrame } from '../lib/PolarFrame';
import { useBare } from '../lib/bare';
import { resolveSeries, type CartesianChartProps, type ChartSeries } from '../lib/CartesianFrame';
import { axisTick, defaultFormat, grid, lineWidth, pointRadius, pointRing, washOpacity } from '../lib/chart-theme';
import { tokens } from '../../tokens/tokens';

export interface RadarChartProps extends Omit<CartesianChartProps, 'yAxisStart' | 'categoryLabel'> {
  /** One entry per polygon. Each takes the next DLS series colour. */
  series: Omit<ChartSeries, 'dashed'>[];
  /** The top of every axis: the DLS fixes radar axes to a rating scale (0 to 10) rather than fitting the data. Default 10. */
  max?: number;
  /** The heading of the axis-name column in the table view. Default "Axis". */
  axisLabel?: string;
}

/** The rating ticks on the radius axis sit on an opaque Neutral-1 backdrop with 4px of padding, so the fill never swallows a number (Marks table). */
function RadiusTick({ x: px, y: py, payload, format }: { x?: number | string; y?: number | string; payload?: { value: number }; format: (v: number) => string }) {
  const x = Number(px);
  const y = Number(py);
  if (!payload || Number.isNaN(x) || Number.isNaN(y)) return null;
  const text = format(payload.value);
  const pad = tokens.spacing[4];
  const w = text.length * axisTick.fontSize * 0.6 + pad * 2;
  const h = axisTick.fontSize + pad;
  return (
    <g pointerEvents="none">
      <rect x={x - w - pad} y={y - h / 2} width={w} height={h} rx={tokens.spacing[2]} fill={tokens.color.neutral1} />
      <text x={x - pad * 2} y={y} textAnchor="end" dominantBaseline="central" {...axisTick}>
        {text}
      </text>
    </g>
  );
}

/**
 * Performance across several dimensions, as one polygon per series on a web of
 * rings and spokes: for comparing profiles (up to six axes), not for reading
 * exact values. Axes run 0 to `max`. Built on Recharts for when the Chart.js
 * Radar does not fit; same chrome, marks and colours.
 */
export const RadarChart = forwardRef<HTMLElement, RadarChartProps>(function RadarChart(
  { 'aria-label': label, data, categoryKey, axisLabel = 'Axis', series, max = 10, valueFormat = defaultFormat, height, legend = true },
  ref,
) {
  const resolved = resolveSeries(series);
  const bare = useBare();
  return (
    <PolarFrame
      ref={ref}
      label={label}
      height={height}
      valueFormat={valueFormat}
      legend={legend ? resolved.map(s => ({ key: s.key, name: s.name, color: s.hex })) : undefined}
      title={row => String(row[categoryKey])}
      describe={row => resolved.map(s => `${s.name}: ${valueFormat(Number(row[s.key]))}`)}
      table={{
        columns: [axisLabel, ...resolved.map(s => s.name)],
        rows: data.map(d => [d[categoryKey], ...resolved.map(s => valueFormat(Number(d[s.key])))]),
      }}
    >
      {({ tooltip, motion, hidden, chartProps }) => (
        <RechartsRadar {...chartProps} data={data} cx="50%" cy="50%" outerRadius={bare ? '88%' : '72%'}>
          <PolarGrid stroke={grid.stroke} strokeWidth={grid.strokeWidth} />
          <PolarAngleAxis dataKey={categoryKey} tick={bare ? false : axisTick} />
          {!bare && <PolarRadiusAxis domain={[0, max]} angle={90 + 180 / data.length} ticks={[0, 0.25, 0.5, 0.75, 1].map(f => f * max)} axisLine={false} tick={p => <RadiusTick {...p} format={valueFormat} />} />}
          {tooltip}
          {resolved.map(s => (
            <Radar
              key={s.key}
              name={s.name}
              dataKey={s.key}
              hide={hidden.has(s.key)}
              stroke={s.hex}
              strokeWidth={lineWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={s.hex}
              fillOpacity={washOpacity}
              dot={{ r: pointRadius, fill: s.hex, ...pointRing }}
              {...motion}
            />
          ))}
        </RechartsRadar>
      )}
    </PolarFrame>
  );
});
