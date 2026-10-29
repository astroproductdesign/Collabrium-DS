// Every variant of RadialGaugeChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { RadialGaugeChart } from './RadialGaugeChart';
import { resources } from '../lib/docs-shared.docs';

export function RadialGaugeChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <RadialGaugeChart aria-label="Quotas" items={resources.slice(0, 3)} />
      <RadialGaugeChart aria-label="Two rings, tall, no legend" items={resources.slice(0, 2)} legend={false} height="tall" />
    </div>
  );
}
