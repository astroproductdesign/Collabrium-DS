// Every variant of MeterChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { MeterChart } from './MeterChart';

export function MeterChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <MeterChart aria-label="Efficiency" value={88} name="Efficiency" caption="Energy efficiency" valueFormat={v => v + '%'} />
      <MeterChart aria-label="Half full" value={50} name="Quota" color="navy" valueFormat={v => v + '%'} height="tall" />
      <MeterChart aria-label="Low" value={8} name="Quota" color="amber" valueFormat={v => v + '%'} />
    </div>
  );
}
