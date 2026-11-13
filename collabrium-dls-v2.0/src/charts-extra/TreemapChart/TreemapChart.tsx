'use client';

import { forwardRef, type ReactElement } from 'react';
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';
import { ChartShell } from '../lib/ChartShell';
import type { ChartDatum } from '../lib/CartesianFrame';
import { ChartTooltip } from '../lib/ChartTooltip';
import { barRadius, defaultFormat, inkOn, mixToward, pointRing, readout } from '../lib/chart-theme';
import { useBare } from '../lib/bare';
import { rampRungs, type RampColorName } from '../lib/series-colors';
import { useChartMotion } from '../lib/useChartMotion';
import { tokens } from '../../tokens/tokens';

export interface TreemapChartProps {
  /** Names the chart for assistive technology, e.g. "Disk use by partition". */
  'aria-label': string;
  /** One object per tile. Tiles are laid out by size, largest first. */
  data: ChartDatum[];
  /** The key of each tile's name in a row. */
  nameKey: string;
  /** The key of each tile's value in a row; it sets the tile's area. */
  valueKey: string;
  /** One of five hues; larger tiles are darker. Default Orange. */
  color?: RampColorName;
  /** Formats a value for the tile, the tooltip and the table. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor. */
  height?: 'default' | 'tall';
}

/** A tile smaller than this in either direction is drawn with no text. */
const MIN_LABEL = { width: 64, height: 40 };

/**
 * How a total divides into parts, as tiles whose areas are the parts: larger
 * tiles are darker on a single-hue ramp. Built on Recharts. Past about ten
 * tiles the smallest cannot be labelled; use the table, or a bar chart.
 */
export const TreemapChart = forwardRef<HTMLElement, TreemapChartProps>(function TreemapChart(
  { 'aria-label': label, data, nameKey, valueKey, color = 'orange', valueFormat = defaultFormat, height },
  ref,
) {
  const motion = useChartMotion();
  const bare = useBare();
  const [lightest, , , full] = rampRungs(color);
  const total = data.reduce((t, d) => t + Number(d[valueKey]), 0);
  const top = Math.max(...data.map(d => Number(d[valueKey])));
  const share = (v: number) => `${total > 0 ? ((v / total) * 100).toFixed(1).replace(/\.0$/, '') : 0}%`;
  const rows = data.map(d => ({ ...d, name: String(d[nameKey]), size: Number(d[valueKey]) }));

  const tile = (p: any): ReactElement => {
    const { x, y, width, height: h, name, size } = p as { x: number; y: number; width: number; height: number; name: string; size: number };
    if (!name) return <g />;
    const t = top > 0 ? size / top : 0;
    const fill = mixToward(lightest, full, t);
    const ink = inkOn(fill);
    const room = !bare && width >= MIN_LABEL.width && h >= MIN_LABEL.height;
    return (
      <g>
        <rect x={x} y={y} width={width} height={h} rx={barRadius} fill={fill} stroke={pointRing.stroke} strokeWidth={pointRing.strokeWidth} />
        {room && (
          <text x={x + tokens.spacing[8]} y={y + tokens.spacing[8]} dominantBaseline="hanging" fill={ink} fontFamily={readout.value.fontFamily} fontSize={tokens.text.label3.size} fontWeight={tokens.text.label3.weight} pointerEvents="none">
            {name}
          </text>
        )}
        {room && h >= MIN_LABEL.height + tokens.spacing[12] && (
          <text x={x + tokens.spacing[8]} y={y + h - tokens.spacing[8]} fill={ink} fontFamily={readout.value.fontFamily} fontSize={tokens.text.caption.size} fontWeight={tokens.text.caption.weight} pointerEvents="none">
            {valueFormat(size)} · {share(size)}
          </text>
        )}
      </g>
    );
  };

  return (
    <ChartShell
      ref={ref}
      label={label}
      height={height}
      fill
      srTable
      table={{
        columns: ['Tile', 'Value', 'Share'],
        rows: data.map(d => [d[nameKey], valueFormat(Number(d[valueKey])), share(Number(d[valueKey]))]),
      }}
    >
      {() => (
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 260 }}>
          <Treemap data={rows} dataKey="size" nameKey="name" content={tile} aspectRatio={1.4} {...motion}>
            {!bare && (
              <Tooltip
                content={
                  <ChartTooltip
                    format={defaultFormat}
                    title={row => String(row.name)}
                    describe={row => [`${valueFormat(Number(row.size))} · ${share(Number(row.size))}`]}
                  />
                }
              />
            )}
          </Treemap>
        </ResponsiveContainer>
      )}
    </ChartShell>
  );
});
