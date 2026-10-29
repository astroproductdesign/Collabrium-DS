'use client';

import { forwardRef, type ReactElement } from 'react';
import { DefaultZIndexes, Pie, PieChart, Sector, usePlotArea, ZIndexLayer } from 'recharts';
import { PolarFrame } from '../lib/PolarFrame';
import { useBare } from '../lib/bare';
import type { ChartDatum } from '../lib/CartesianFrame';
import { axisTick, defaultFormat, grid, mixToward, pointRing } from '../lib/chart-theme';
import { rampRungs, type RampColorName } from '../lib/series-colors';
import { tokens } from '../../tokens/tokens';

export interface PolarAreaChartProps {
  /** Names the chart for assistive technology, e.g. "Requests by region". */
  'aria-label': string;
  /** One object per wedge, in order. Up to four: the ramp has four rungs. */
  data: ChartDatum[];
  /** The key of each wedge's name in a row. */
  nameKey: string;
  /** The key of each wedge's value in a row; it sets how far the wedge reaches. */
  valueKey: string;
  /** One of five hues; the wedges walk its ramp, lightest first. Default Orange. */
  color?: RampColorName;
  /** The value at the outer ring. Default: the largest value, rounded up to a round number. */
  max?: number;
  /** Formats a value for the rings, the tooltip and the table. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor. */
  height?: 'default' | 'tall';
  /** Shows the legend, which shows or hides each wedge. Default true. */
  legend?: boolean;
}

const RINGS = 4;
const OUTER = 0.9;
/**
 * TODO(open-question Q-XCH-25): the Marks table says translucent, 30% for the saturated rungs and 15% for the
 * two pale tints; taken literally the pale wedges vanish, so every wedge is 75% and the faintest tint is skipped.
 */
const WEDGE_OPACITY = 0.75;

/** A round number at or above `n` (1, 2, 2.5, 5 times a power of ten), for the outer ring. */
function niceMax(n: number): number {
  if (n <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(n));
  return ([1, 2, 2.5, 5, 10].map(m => m * p).find(v => v >= n) ?? n) as number;
}

/** The grid: four Neutral-3 rings behind the wedges, with their values on the vertical spoke. */
function Rings({ max, format }: { max: number; format: (v: number) => string }) {
  const area = usePlotArea();
  const bare = useBare();
  if (!area) return null;
  const cx = area.x + area.width / 2;
  const cy = area.y + area.height / 2;
  const radius = (Math.min(area.width, area.height) / 2) * OUTER;
  const pad = tokens.spacing[4];
  const rings = Array.from({ length: RINGS }, (_, i) => ({ r: (radius * (i + 1)) / RINGS, text: format((max * (i + 1)) / RINGS) }));
  return (
    <>
      {/* The rings sit behind the wedges, so the translucent wedges show them through. */}
      <ZIndexLayer zIndex={DefaultZIndexes.grid}>
        <g pointerEvents="none">
          {rings.map(ring => (
            <circle key={ring.text} cx={cx} cy={cy} r={ring.r} fill="none" stroke={grid.stroke} strokeWidth={grid.strokeWidth} />
          ))}
        </g>
      </ZIndexLayer>
      {/* Their values sit above, on an opaque Neutral-1 backdrop, so no wedge or border crosses a number. */}
      {!bare && (
      <ZIndexLayer zIndex={DefaultZIndexes.axis}>
        <g pointerEvents="none">
          {rings.map(ring => {
            const w = ring.text.length * axisTick.fontSize * 0.6 + pad * 2;
            return (
              <g key={ring.text}>
                <rect x={cx - w / 2} y={cy - ring.r - (axisTick.fontSize + pad) / 2} width={w} height={axisTick.fontSize + pad} rx={tokens.spacing[2]} fill={tokens.color.neutral1} />
                <text x={cx} y={cy - ring.r} textAnchor="middle" dominantBaseline="central" {...axisTick}>
                  {ring.text}
                </text>
              </g>
            );
          })}
        </g>
      </ZIndexLayer>
      )}
    </>
  );
}

/**
 * Volume by category when the categories are not ordered: equal wedges, each
 * reaching as far as its value, on a grid of four rings. Wedges walk one hue's
 * ramp, translucent so the rings show through. Built on Recharts. For parts
 * of a whole, use Donut chart; for ranking, use Bar chart.
 */
export const PolarAreaChart = forwardRef<HTMLElement, PolarAreaChartProps>(function PolarAreaChart(
  { 'aria-label': label, data, nameKey, valueKey, color = 'orange', max, valueFormat = defaultFormat, height, legend = true },
  ref,
) {
  const [, bgStrong, pastel, full] = rampRungs(color);
  const rungs = [bgStrong, pastel, mixToward(pastel, full, 0.5), full];
  const top = max ?? niceMax(Math.max(...data.map(d => Number(d[valueKey]))));
  const all = data.map((d, i) => ({ ...d, __rung: Math.min(i, rungs.length - 1) }) as ChartDatum & { __rung: number });
  return (
    <PolarFrame
      ref={ref}
      label={label}
      height={height}
      valueFormat={valueFormat}
      legend={legend ? all.map(d => ({ key: String(d[nameKey]), name: String(d[nameKey]), color: rungs[d.__rung] })) : undefined}
      title={row => String(row[nameKey])}
      describe={row => [valueFormat(Number(row[valueKey]))]}
      table={{ columns: ['Wedge', 'Value'], rows: data.map(d => [d[nameKey], valueFormat(Number(d[valueKey]))]) }}
    >
      {({ tooltip, motion, hidden, chartProps }) => {
        const shown = all.filter(d => !hidden.has(String(d[nameKey]))).map(d => ({ ...d, __w: 1 }));
        const wedge = (p: any): ReactElement => {
          const v = Number(p.payload[valueKey]);
          const rung = p.payload.__rung as number;
          return (
            <Sector
              {...p}
              innerRadius={0}
              outerRadius={p.outerRadius * Math.min(1, v / top)}
              fill={rungs[rung]}
              fillOpacity={WEDGE_OPACITY}
              stroke={pointRing.stroke}
              strokeWidth={pointRing.strokeWidth}
            />
          );
        };
        return (
          <PieChart {...chartProps}>
            {tooltip}
            <Pie data={shown} dataKey="__w" nameKey={nameKey} cx="50%" cy="50%" innerRadius={0} outerRadius={`${OUTER * 100}%`} startAngle={90} endAngle={-270} paddingAngle={0} shape={wedge} {...motion} />
            <Rings max={top} format={valueFormat} />
          </PieChart>
        );
      }}
    </PolarFrame>
  );
});
