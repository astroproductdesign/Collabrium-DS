// Every variant of TreemapChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { TreemapChart } from './TreemapChart';
import { partitions } from '../lib/docs-shared.docs';

export function TreemapChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <TreemapChart aria-label="Partitions" data={partitions} nameKey="name" valueKey="size" />
      <TreemapChart aria-label="Partitions, Navy, tall" data={partitions} nameKey="name" valueKey="size" color="navy" height="tall" />
    </div>
  );
}
