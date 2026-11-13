import { forwardRef } from 'react';
import { XYChart, type XYChartProps } from '../lib/XYChart';

export type ScatterChartProps = XYChartProps;

/**
 * Two measures plotted against each other, one point per case, with no line
 * between them: for correlation and distribution. Points are 6px (8px on
 * hover) with a 1px Neutral-1 border. Built on Recharts for when the Chart.js
 * Scatter does not fit; same chrome and colours.
 */
export const ScatterChart = forwardRef<HTMLElement, ScatterChartProps>(function ScatterChart(props, ref) {
  return <XYChart ref={ref} {...props} />;
});
