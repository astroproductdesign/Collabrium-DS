// Every variant of RadialBarGroupChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { RadialBarGroupChart } from './RadialBarGroupChart';
import { resources } from '../lib/docs-shared.docs';

export function RadialBarGroupChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <RadialBarGroupChart aria-label="Resources" items={resources} />
      <RadialBarGroupChart aria-label="Two rings, tall, no legend" items={resources.slice(0, 2)} legend={false} height="tall" />
    </div>
  );
}
