// Every variant of ScatterChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { ScatterChart } from './ScatterChart';
import { deals } from '../lib/docs-shared.docs';

export function ScatterChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <ScatterChart aria-label="Deals" series={[{ name: 'Deals', points: deals }]} xLabel="Days to close" yLabel="Deal size ($k)" />
      <ScatterChart aria-label="Two groups, tall, no legend" series={[{ name: 'A', points: deals.slice(0, 6) }, { name: 'B', points: deals.slice(6) }]} xLabel="Days" yLabel="Size" height="tall" legend={false} />
    </div>
  );
}
