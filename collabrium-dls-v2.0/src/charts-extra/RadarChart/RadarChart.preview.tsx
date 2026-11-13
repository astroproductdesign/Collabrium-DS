// Every variant of RadarChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { RadarChart } from './RadarChart';
import { skills } from '../lib/docs-shared.docs';

export function RadarChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <RadarChart aria-label="One" data={skills} categoryKey="axis" series={[{ key: 'team', name: 'Team' }]} />
      <RadarChart aria-label="Two, tall, no legend" data={skills} categoryKey="axis" series={[{ key: 'team', name: 'Team' }, { key: 'peer', name: 'Peers' }]} height="tall" legend={false} />
    </div>
  );
}
