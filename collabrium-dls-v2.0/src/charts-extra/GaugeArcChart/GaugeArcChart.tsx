import { forwardRef } from 'react';
import { ArcGauge, type GaugeProps } from '../lib/ArcGauge';

export type GaugeArcChartProps = GaugeProps;

/** One value on a 240° dial, with its reading in the centre. Built on Recharts; same chrome and colours. */
export const GaugeArcChart = forwardRef<HTMLElement, GaugeArcChartProps>(function GaugeArcChart(props, ref) {
  return <ArcGauge ref={ref} sweep="wide" {...props} />;
});
