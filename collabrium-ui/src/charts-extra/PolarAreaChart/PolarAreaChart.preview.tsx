// Every variant of PolarAreaChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { PolarAreaChart } from './PolarAreaChart';
import { regions } from '../lib/docs-shared.docs';

export function PolarAreaChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <PolarAreaChart aria-label="Regions" data={regions} nameKey="region" valueKey="requests" />
      <PolarAreaChart aria-label="Fixed max, Green, tall" data={regions} nameKey="region" valueKey="requests" color="green" max={2000} height="tall" />
    </div>
  );
}
