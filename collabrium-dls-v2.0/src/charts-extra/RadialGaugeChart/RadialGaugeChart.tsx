import { forwardRef } from 'react';
import { RadialBars, type RadialChartProps } from '../lib/RadialBars';

export type RadialGaugeChartProps = RadialChartProps;

/** Several measures against their limits, as concentric rings: the outermost ring is the first item. Built on Recharts; same chrome and colours. */
export const RadialGaugeChart = forwardRef<HTMLElement, RadialGaugeChartProps>(function RadialGaugeChart(props, ref) {
  return <RadialBars ref={ref} sweep="full" {...props} />;
});
