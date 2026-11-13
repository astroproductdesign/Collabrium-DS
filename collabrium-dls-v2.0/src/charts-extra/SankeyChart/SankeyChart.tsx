'use client';

import { forwardRef, type ReactElement, type SVGProps } from 'react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';
import { ChartShell } from '../lib/ChartShell';
import { ChartTooltip } from '../lib/ChartTooltip';
import { barRadius, defaultFormat } from '../lib/chart-theme';
import { useBare } from '../lib/bare';
import { seriesColors } from '../lib/series-colors';
import { useChartMotion } from '../lib/useChartMotion';
import { tokens } from '../../tokens/tokens';

export interface SankeyLink {
  /** The name of the node the flow leaves. */
  source: string;
  /** The name of the node the flow arrives at. */
  target: string;
  /** How much flows. It sets the link's width. */
  value: number;
}

export interface SankeyChartProps {
  /** Names the chart for assistive technology, e.g. "Requests from each source to the leader". */
  'aria-label': string;
  /** The flows. Nodes are the names that appear in `source` and `target`, in order of first appearance. Flows must not form a loop. */
  links: SankeyLink[];
  /** Formats a flow for the node, the tooltip and the table. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor. */
  height?: 'default' | 'tall';
}

const NODE_WIDTH = tokens.spacing[12];
const LABEL_ROOM = 96;

/**
 * How a quantity splits and merges as it moves between stages: nodes joined
 * by bands whose widths are the flows. Each source takes the next series
 * colour and its bands are a 30% wash of it; everything downstream is
 * Obsidian. Built on Recharts. Flows must not loop back.
 */
export const SankeyChart = forwardRef<HTMLElement, SankeyChartProps>(function SankeyChart(
  { 'aria-label': label, links, valueFormat = defaultFormat, height },
  ref,
) {
  const motion = useChartMotion();
  const bare = useBare();
  const names = [...new Set(links.flatMap(l => [l.source, l.target]))];
  const hasInflow = new Set(links.map(l => l.target));
  const sources = names.filter(n => !hasInflow.has(n));
  const colorOf = (name: string) => (sources.includes(name) ? seriesColors[sources.indexOf(name) % seriesColors.length] : tokens.color.obsidian);
  // Longest path from a source, to tell first, middle and last columns apart.
  const depth: Record<string, number> = {};
  const walk = (n: string, d: number) => {
    depth[n] = Math.max(depth[n] ?? 0, d);
    links.filter(l => l.source === n).forEach(l => walk(l.target, d + 1));
  };
  sources.forEach(n => walk(n, 0));
  const lastDepth = Math.max(...Object.values(depth));
  const nodes = names.map(name => ({ name }));
  const data = { nodes, links: links.map(l => ({ source: names.indexOf(l.source), target: names.indexOf(l.target), value: l.value })) };

  const node = (p: any): ReactElement => {
    const { x, y, width, height: h, payload } = p as { x: number; y: number; width: number; height: number; payload: { name: string; value: number; depth: number } };
    const column = depth[payload.name] ?? 0;
    // First column's labels sit to its left, last column's to its right; the middle's go right, over a halo.
    const left = column === 0;
    const right = column === lastDepth;
    const fill = colorOf(payload.name);
    return (
      <g>
        <rect x={x} y={y} width={width} height={h} rx={barRadius} fill={fill} />
        {!bare && (
          <text x={left ? x - tokens.spacing[8] : x + width + tokens.spacing[8]} y={y + h / 2} textAnchor={left ? 'end' : 'start'} dominantBaseline="central" pointerEvents="none" stroke={right || left ? 'none' : tokens.color.neutral1} strokeWidth={tokens.spacing[4]} paintOrder="stroke">
            <tspan fontFamily={tokens.font.primary} fontSize={tokens.text.label3.size} fontWeight={tokens.text.label3.weight} fill={tokens.color.neutral9}>
              {payload.name}
            </tspan>
            <tspan x={left ? x - tokens.spacing[8] : x + width + tokens.spacing[8]} dy="1.3em" fontFamily={tokens.font.primary} fontSize={tokens.text.caption.size} fill={tokens.color.neutral5}>
              {valueFormat(payload.value)}
            </tspan>
          </text>
        )}
      </g>
    );
  };
  const link = (p: any): ReactElement<SVGProps<SVGPathElement>> => {
    const { sourceX, targetX, sourceY, targetY, sourceControlX, targetControlX, linkWidth, payload } = p;
    return (
      <path
        className="cui-sankey__link"
        d={`M${sourceX},${sourceY} C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
        fill="none"
        stroke={colorOf(payload.source.name)}
        strokeWidth={linkWidth}
      />
    );
  };

  return (
    <ChartShell
      ref={ref}
      label={label}
      height={height}
      fill
      srTable
      table={{ columns: ['From', 'To', 'Flow'], rows: links.map(l => [l.source, l.target, valueFormat(l.value)]) }}
    >
      {() => (
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 260 }}>
          <Sankey
            data={data}
            node={node}
            link={link}
            nodeWidth={NODE_WIDTH}
            nodePadding={tokens.spacing[24]}
            margin={bare ? { top: 6, right: 6, bottom: 6, left: 6 } : { top: 8, right: LABEL_ROOM, bottom: 8, left: LABEL_ROOM }}
            title={label}
            {...motion}
          >
            {!bare && (
              <Tooltip
                content={
                  <ChartTooltip
                    format={defaultFormat}
                    title={row => String(row.name).replace(' - ', ' → ')}
                    describe={row => [valueFormat(Number(row.value))]}
                  />
                }
              />
            )}
          </Sankey>
        </ResponsiveContainer>
      )}
    </ChartShell>
  );
});
