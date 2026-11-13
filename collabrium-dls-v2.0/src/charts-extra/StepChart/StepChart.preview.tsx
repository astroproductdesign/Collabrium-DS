// Every variant of StepChart, for checking against Chart.js's reference and the
// Amicro original. The docs site does not show this file.
// Not part of the package build.
import { StepChart } from './StepChart';
import { tiers } from '../lib/docs-shared.docs';

export function StepChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <StepChart aria-label="Price by plan" data={tiers} categoryKey="tier" series={[{ key: 'price', name: 'Price' }]} />
      <StepChart aria-label="Price by plan, fitted axis" data={tiers} categoryKey="tier" series={[{ key: 'price', name: 'Price' }]} yAxisStart="fit" height="tall" />
    </div>
  );
}
