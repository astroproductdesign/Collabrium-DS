// Every variant of BarChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { BarChart } from './BarChart';
import { orders } from '../lib/docs-shared.docs';

export function BarChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <BarChart aria-label="One series" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web' }]} />
      <BarChart aria-label="Grouped" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web' }, { key: 'mobile', name: 'Mobile' }]} />
      <BarChart aria-label="Horizontal" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web' }, { key: 'mobile', name: 'Mobile' }]} orientation="horizontal" />
      <BarChart aria-label="Tall, no legend" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web' }]} height="tall" legend={false} />
    </div>
  );
}
