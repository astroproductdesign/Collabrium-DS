'use client';

import { forwardRef, type ReactElement } from 'react';
import { ResponsiveContainer, Tooltip } from 'recharts';
import { ChartShell, type ChartTable } from './ChartShell';
import type { LegendItem } from './ChartLegend';
import { ChartTooltip, type TooltipDescribe } from './ChartTooltip';
import { useBare } from './bare';
import { useChartMotion } from './useChartMotion';

export interface PolarContext {
  /** The DLS tooltip. */
  tooltip: ReactElement;
  /** Animation props for each mark. */
  motion: ReturnType<typeof useChartMotion>;
  /** Keys of the legend items the person has hidden. */
  hidden: ReadonlySet<string>;
  /** Spread onto the Recharts chart: its accessible name and the arrow-key reading layer. */
  chartProps: { title: string; accessibilityLayer: true };
}

interface PolarFrameProps {
  label: string;
  height?: 'default' | 'tall';
  legend?: LegendItem[];
  table: ChartTable;
  valueFormat: (value: number) => string;
  /** Writes the tooltip's title and lines for the hovered slice, ring or arc. */
  title: (row: Record<string, unknown>) => string;
  describe: TooltipDescribe;
  /** Leave the tooltip out (single-value gauges read their value in the centre). */
  noTooltip?: boolean;
  children: (ctx: PolarContext) => ReactElement;
}

/** The Recharts frame for round charts: no axes; the DLS tooltip, legend, table and motion. */
export const PolarFrame = forwardRef<HTMLElement, PolarFrameProps>(function PolarFrame(
  { label, height, legend, table, valueFormat, title, describe, noTooltip, children },
  ref,
) {
  const motion = useChartMotion();
  const bare = useBare();
  const tooltip = <Tooltip key="tip" content={<ChartTooltip format={valueFormat} title={title} describe={describe} />} />;
  return (
    <ChartShell ref={ref} label={label} height={height} legend={legend} table={table} fill>
      {({ hidden }) => (
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 260 }}>
          {children({ tooltip: noTooltip || bare ? <></> : tooltip, motion, hidden, chartProps: { title: label, accessibilityLayer: true } })}
        </ResponsiveContainer>
      )}
    </ChartShell>
  );
});
