// Every variant of ActivityHeatmapChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { ActivityHeatmapChart } from './ActivityHeatmapChart';
import { activity } from '../lib/docs-shared.docs';

export function ActivityHeatmapChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <ActivityHeatmapChart aria-label="Commits" data={activity} unit="commits" />
      <ActivityHeatmapChart aria-label="Sessions, from Sunday, tall" data={activity} unit="sessions" color="navy" weekStartsOn={0} height="tall" />
    </div>
  );
}
