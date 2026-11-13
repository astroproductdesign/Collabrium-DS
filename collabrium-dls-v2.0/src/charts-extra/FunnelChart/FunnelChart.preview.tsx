// Every variant of FunnelChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { FunnelChart } from './FunnelChart';
import { stages } from '../lib/docs-shared.docs';

export function FunnelChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <FunnelChart aria-label="Funnel" data={stages} categoryKey="stage" valueKey="users" name="Users" />
      <FunnelChart aria-label="Funnel, Green, tall" data={stages} categoryKey="stage" valueKey="users" name="Users" color="green" height="tall" />
    </div>
  );
}
