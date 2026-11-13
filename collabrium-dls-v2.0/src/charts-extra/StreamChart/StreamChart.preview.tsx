// Every variant of StreamChart, for checking against Chart.js's reference and the
// Amicro original. The docs site does not show this file.
// Not part of the package build.
import { StreamChart } from './StreamChart';
import { flows } from '../lib/docs-shared.docs';

export function StreamChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <StreamChart aria-label="Two flows" data={flows} categoryKey="hour" series={[{ key: 'inflow', name: 'Inbound' }, { key: 'outflow', name: 'Outbound' }]} />
      <StreamChart aria-label="Two flows, dashed second" data={flows} categoryKey="hour" series={[{ key: 'inflow', name: 'Inbound' }, { key: 'outflow', name: 'Outbound', dashed: true }]} legend={false} />
    </div>
  );
}
