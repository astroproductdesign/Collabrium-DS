// Every variant of DitherBarChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { DitherBarChart } from './DitherBarChart';
import { orders } from '../lib/docs-shared.docs';

export function DitherBarChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <DitherBarChart aria-label="One series" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web' }]} />
      <DitherBarChart aria-label="Grouped" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web' }, { key: 'mobile', name: 'Mobile' }]} />
      <DitherBarChart aria-label="Horizontal" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web' }, { key: 'mobile', name: 'Mobile' }]} orientation="horizontal" />
    </div>
  );
}
