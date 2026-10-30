// Every variant of LineChart, for checking against Chart.js's reference and the
// Amicro original. The docs site does not show this file.
// Not part of the package build.
import { LineChart } from './LineChart';
import { months } from '../lib/docs-shared.docs';

export function LineChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <LineChart aria-label="Renewal rate, one line" data={months} categoryKey="month" series={[{ key: 'rate', name: 'Renewal rate' }]} />
      <LineChart aria-label="Renewal rate against target" data={months} categoryKey="month" series={[{ key: 'rate', name: 'Renewal rate' }, { key: 'target', name: 'Target', dashed: true }]} />
      <LineChart aria-label="Linear, tall" data={months} categoryKey="month" series={[{ key: 'rate', name: 'Renewal rate' }]} curve="linear" height="tall" />
      <LineChart aria-label="No legend, zero start" data={months} categoryKey="month" series={[{ key: 'rate', name: 'Renewal rate' }]} legend={false} yAxisStart="zero" />
    </div>
  );
}
