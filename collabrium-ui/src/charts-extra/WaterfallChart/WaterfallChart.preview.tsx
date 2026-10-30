// Every variant of WaterfallChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { WaterfallChart } from './WaterfallChart';
import { bridge } from '../lib/docs-shared.docs';

export function WaterfallChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <WaterfallChart aria-label="Bridge" data={bridge} categoryKey="step" valueKey="change" valueLabel="Balance" />
      <WaterfallChart aria-label="Bridge, horizontal" data={bridge} categoryKey="step" valueKey="change" valueLabel="Balance" orientation="horizontal" />
      <WaterfallChart aria-label="No totals" data={bridge.slice(1, 4)} categoryKey="step" valueKey="change" valueLabel="Change" totals={[]} />
    </div>
  );
}
