import { forwardRef } from 'react';
import { RadialBars, type RadialChartProps } from '../lib/RadialBars';

export type RadialBarGroupChartProps = RadialChartProps;

/** Several measures against their limits, as nested arches: the outermost ring is the first item. Built on Recharts; same chrome and colours. */
export const RadialBarGroupChart = forwardRef<HTMLElement, RadialBarGroupChartProps>(function RadialBarGroupChart(props, ref) {
  return <RadialBars ref={ref} sweep="half" {...props} />;
});
