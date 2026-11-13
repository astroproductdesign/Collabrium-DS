'use client';

import { forwardRef, type ReactElement } from 'react';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';
import { defaultFormat, lineWidth, pointRadius, pointRing, washOpacity } from '../lib/chart-theme';
import { resolveSeriesColorName, seriesColorValue, type SeriesColorName } from '../lib/series-colors';
import { useChartMotion } from '../lib/useChartMotion';

export interface SparklineChartProps {
  /** Names the measure the line shows, e.g. "Core temperature, last 5 readings". The chart adds a one-sentence summary of the trend after it. */
  'aria-label': string;
  /** The values in order, oldest first. At least two. */
  values: number[];
  /** One of the seven DLS series colours: the colour of the element that owns the metric. Default Orange, the first in the mapping order. */
  color?: SeriesColorName;
  /** Adds the line's own colour as a wash under it, at the DLS's 12%. Default false. */
  fill?: boolean;
  /** Marks the latest value with a 3px point. Default false. */
  endPoint?: boolean;
  /** Formats a value in the spoken summary, e.g. `v => v + '°C'`. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
}

/** One sentence that says what the picture shows, for assistive technology. */
function summarise(values: number[], format: (v: number) => string): string {
  const first = values[0];
  const last = values[values.length - 1];
  const trend = last > first ? 'Rising' : last < first ? 'Falling' : 'Flat';
  return `${trend} from ${format(first)} to ${format(last)} over ${values.length} points, low ${format(Math.min(...values))}, high ${format(Math.max(...values))}.`;
}

/**
 * A glance at a trend: a 2px line with no axes, gridlines, legend, tooltip or
 * "View as table", because it annotates a figure that is already on screen.
 * It fills the width it is given and is 32px tall. Place it in the Stat / KPI
 * card's sparkline slot, or beside a number.
 */
export const SparklineChart = forwardRef<HTMLElement, SparklineChartProps>(function SparklineChart(
  { 'aria-label': label, values, color, fill = false, endPoint = false, valueFormat = defaultFormat },
  ref,
) {
  const motion = useChartMotion();
  const hex = seriesColorValue(resolveSeriesColorName(color, 0));
  const data = values.map((v, i) => ({ i, v }));
  const last = data.length - 1;
  const dot = endPoint
    ? (p: { cx?: number; cy?: number; index?: number }): ReactElement =>
        p.index === last ? <circle key="end" cx={p.cx} cy={p.cy} r={pointRadius} fill={hex} {...pointRing} /> : <g key={p.index} />
    : false;
  const common = { data, margin: { top: pointRadius + 2, right: pointRadius + 2, bottom: pointRadius + 2, left: pointRadius + 2 } };
  const y = <YAxis hide domain={['dataMin', 'dataMax']} />;
  return (
    <figure ref={ref} className="cui-spark" role="img" aria-label={`${label}. ${summarise(values, valueFormat)}`}>
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 120, height: 32 }}>
        {fill ? (
          <AreaChart {...common}>
            {y}
            <Area type="monotone" dataKey="v" stroke={hex} strokeWidth={lineWidth} strokeLinecap="round" strokeLinejoin="round" fill={hex} fillOpacity={washOpacity} dot={dot} activeDot={false} {...motion} />
          </AreaChart>
        ) : (
          <LineChart {...common}>
            {y}
            <Line type="monotone" dataKey="v" stroke={hex} strokeWidth={lineWidth} strokeLinecap="round" strokeLinejoin="round" dot={dot} activeDot={false} {...motion} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </figure>
  );
});
