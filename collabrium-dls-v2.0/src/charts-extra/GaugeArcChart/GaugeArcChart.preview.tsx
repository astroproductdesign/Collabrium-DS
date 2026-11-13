// Every variant of GaugeArcChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { GaugeArcChart } from './GaugeArcChart';

export function GaugeArcChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <GaugeArcChart aria-label="Uptime" value={99.98} name="Uptime" caption="SLA met" valueFormat={v => v + '%'} />
      <GaugeArcChart aria-label="Half full" value={50} name="Quota" color="navy" valueFormat={v => v + '%'} height="tall" />
      <GaugeArcChart aria-label="Low" value={8} name="Quota" color="amber" valueFormat={v => v + '%'} />
    </div>
  );
}
