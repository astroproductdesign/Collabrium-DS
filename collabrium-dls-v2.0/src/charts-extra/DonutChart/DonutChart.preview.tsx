// Every variant of DonutChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { DonutChart } from './DonutChart';
import { pipeline } from '../lib/docs-shared.docs';

export function DonutChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <DonutChart aria-label="Pipeline" data={pipeline} nameKey="stage" valueKey="value" color="navy" />
      <DonutChart aria-label="Pipeline, Green, no legend" data={pipeline} nameKey="stage" valueKey="value" color="green" legend={false} />
      <DonutChart aria-label="Three slices, tall" data={pipeline.slice(0, 3)} nameKey="stage" valueKey="value" color="amber" height="tall" />
    </div>
  );
}
