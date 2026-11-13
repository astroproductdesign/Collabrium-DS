'use client';

import { forwardRef } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { PolarFrame } from './PolarFrame';
import { Readout } from './Readout';
import { barRadius, defaultFormat, pointRing, trackColor } from './chart-theme';
import { resolveSeriesColorName, seriesColorValue, type SeriesColorName } from './series-colors';

export interface GaugeProps {
  /** Names the chart for assistive technology, e.g. "Uptime this quarter". */
  'aria-label': string;
  /** The measured value. */
  value: number;
  /** The value that fills the arc. Default 100, so `value` reads as a percentage. */
  max?: number;
  /** What is measured, e.g. "Uptime". Used in the table and the screen-reader text. */
  name: string;
  /** Written under the value in the centre, e.g. "SLA met". Default: the name. */
  caption?: string;
  /** One of the seven DLS series colours. Default Orange, the first in the mapping order. */
  color?: SeriesColorName;
  /** Formats the value, e.g. `v => v + '%'`. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor, so the chart grows to fill a taller container. */
  height?: 'default' | 'tall';
}

interface ArcGaugeProps extends GaugeProps {
  /** `half` is a 180° arch; `wide` a 240° dial with a gap at the bottom. */
  sweep: 'half' | 'wide';
}

const angles = {
  half: { start: 180, end: 0, cy: '75%', inner: '85%', outer: '125%' },
  wide: { start: 210, end: -30, cy: '70%', inner: '68%', outer: '100%' },
} as const;

/** The shared drawing of the two arc gauges: one value over a Neutral-3 track, with its reading at the centre. */
export const ArcGauge = forwardRef<HTMLElement, ArcGaugeProps>(function ArcGauge(
  { 'aria-label': label, value, max = 100, name, caption, color, valueFormat = defaultFormat, height, sweep },
  ref,
) {
  const a = angles[sweep];
  const fill = seriesColorValue(resolveSeriesColorName(color, 0));
  const clamped = Math.min(max, Math.max(0, value));
  const parts = [
    { name, value: clamped },
    { name: 'Remaining', value: max - clamped },
  ];
  const percent = max > 0 ? `${((clamped / max) * 100).toFixed(1).replace(/\.0$/, '')}%` : '—';
  return (
    <PolarFrame
      ref={ref}
      label={label}
      height={height}
      valueFormat={valueFormat}
      noTooltip
      title={row => String(row.name)}
      describe={row => [valueFormat(Number(row.value))]}
      table={{
        columns: ['Measure', 'Value', 'Of', 'Filled'],
        rows: [[name, valueFormat(value), valueFormat(max), percent]],
      }}
    >
      {({ motion, chartProps }) => (
        <PieChart {...chartProps}>
          <Pie
            data={parts}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy={a.cy}
            innerRadius={a.inner}
            outerRadius={a.outer}
            startAngle={a.start}
            endAngle={a.end}
            cornerRadius={barRadius}
            stroke={pointRing.stroke}
            strokeWidth={pointRing.strokeWidth}
            {...motion}
          >
            <Cell fill={fill} />
            <Cell fill={trackColor} />
          </Pie>
          <Readout cy={Number.parseFloat(a.cy) / 100} value={valueFormat(value)} caption={caption ?? name} anchor="base" />
        </PieChart>
      )}
    </PolarFrame>
  );
});
