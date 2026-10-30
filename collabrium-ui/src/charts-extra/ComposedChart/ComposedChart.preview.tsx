// Every variant of ComposedChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { ComposedChart } from './ComposedChart';
import { episodes, quarters } from '../lib/docs-shared.docs';

export function ComposedChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <ComposedChart aria-label="Own axis" data={episodes} categoryKey="episode" bars={[{ key: 'rewards', name: 'Rewards (SOL)' }]} line={{ key: 'apy', name: 'Yield (%)' }} lineFormat={v => v + '%'} />
      <ComposedChart aria-label="Shared axis" data={quarters} categoryKey="quarter" bars={[{ key: 'newBiz', name: 'New business' }, { key: 'renewals', name: 'Renewals' }]} line={{ key: 'goal', name: 'Goal', dashed: true }} lineAxis="shared" />
    </div>
  );
}
