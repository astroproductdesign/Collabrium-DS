import { forwardRef } from 'react';
import { XYChart, type XYChartProps } from '../lib/XYChart';
import { defaultFormat } from '../lib/chart-theme';

export interface BubbleChartProps extends XYChartProps {
  /** Names the third measure, drawn as each bubble's size, e.g. "Liquidity". Give each point a `z`. */
  sizeLabel: string;
  /** Formats the third measure for the tooltip and the table. Default: locale-formatted number. */
  sizeFormat?: (value: number) => string;
}

/**
 * Three measures at once: two as position, one as size. Each bubble is a 30%
 * wash of its colour with a 2px border in the full colour. Keep to three
 * series. Built on Recharts for when the Chart.js Bubble does not fit.
 */
export const BubbleChart = forwardRef<HTMLElement, BubbleChartProps>(function BubbleChart({ sizeLabel, sizeFormat = defaultFormat, ...props }, ref) {
  return <XYChart ref={ref} size={{ label: sizeLabel, format: sizeFormat }} {...props} />;
});
