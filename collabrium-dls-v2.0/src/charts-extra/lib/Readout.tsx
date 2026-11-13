'use client';

import { usePlotArea } from 'recharts';
import { readout } from './chart-theme';
import { useBare } from './bare';

/**
 * A centre readout for a round chart, drawn in the SVG so it moves with the
 * chart: the value in the h5 type, the caption under it in caption type.
 * `cx` and `cy` are where the chart's centre is, as fractions of the plot
 * (the same percentages given to the Pie). `base` puts the pair's last line
 * on that point (for a half gauge, whose centre is its baseline); `middle`
 * centres the pair on it.
 */
export function Readout({ cx = 0.5, cy = 0.5, value, caption, anchor = 'middle' }: { cx?: number; cy?: number; value: string; caption: string; anchor?: 'middle' | 'base' }) {
  const area = usePlotArea();
  const bare = useBare();
  if (!area || bare) return null;
  const x = area.x + area.width * cx;
  const y = area.y + area.height * cy + (anchor === 'base' ? -readout.caption.fontSize * 1.4 : 0);
  return (
    <text x={x} y={y} textAnchor="middle" pointerEvents="none">
      <tspan x={x} dy="-0.2em" {...readout.value} style={{ fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </tspan>
      <tspan x={x} dy="1.7em" {...readout.caption}>
        {caption}
      </tspan>
    </text>
  );
}
