// Every variant of SankeyChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { SankeyChart } from './SankeyChart';
import { routes } from '../lib/docs-shared.docs';

export function SankeyChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <SankeyChart aria-label="Routes" links={routes} />
      <SankeyChart aria-label="Routes, tall" links={routes} height="tall" />
    </div>
  );
}
