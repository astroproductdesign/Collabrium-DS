// Every variant of DitherDonutChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { DitherDonutChart } from './DitherDonutChart';
import { plans } from '../lib/docs-shared.docs';

export function DitherDonutChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <DitherDonutChart aria-label="Orange" data={plans} nameKey="plan" valueKey="members" centerLabel="Members" />
      <DitherDonutChart aria-label="Navy" data={plans} nameKey="plan" valueKey="members" color="navy" centerLabel="Members" />
    </div>
  );
}
