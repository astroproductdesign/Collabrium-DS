// Every variant of BubbleChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { BubbleChart } from './BubbleChart';
import { pools } from '../lib/docs-shared.docs';

export function BubbleChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <BubbleChart aria-label="Pools" series={[{ name: 'Pools', points: pools }]} xLabel="24h volume" yLabel="Yield" sizeLabel="Liquidity" />
      <BubbleChart aria-label="Two groups, tall" series={[{ name: 'A', points: pools.slice(0, 2) }, { name: 'B', points: pools.slice(2) }]} xLabel="Volume" yLabel="Yield" sizeLabel="Liquidity" height="tall" />
    </div>
  );
}
