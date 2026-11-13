// Every variant of HeatmapChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { HeatmapChart } from './HeatmapChart';
import { load, loadColumns } from '../lib/docs-shared.docs';

export function HeatmapChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <HeatmapChart aria-label="Load" data={load} rowKey="day" columns={loadColumns} />
      <HeatmapChart aria-label="Load, Green, fixed range, tall" data={load} rowKey="day" columns={loadColumns} color="green" min={0} max={100} height="tall" />
    </div>
  );
}
