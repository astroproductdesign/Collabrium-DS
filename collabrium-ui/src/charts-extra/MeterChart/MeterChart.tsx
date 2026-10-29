import { forwardRef } from 'react';
import { ArcGauge, type GaugeProps } from '../lib/ArcGauge';

export type MeterChartProps = GaugeProps;

/** One value on a half-circle meter, with its reading at the centre. Built on Recharts; same chrome and colours. */
export const MeterChart = forwardRef<HTMLElement, MeterChartProps>(function MeterChart(props, ref) {
  return <ArcGauge ref={ref} sweep="half" {...props} />;
});
