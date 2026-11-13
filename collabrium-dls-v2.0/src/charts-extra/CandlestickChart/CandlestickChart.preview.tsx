// Every variant of CandlestickChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { CandlestickChart } from './CandlestickChart';
import { candles } from '../lib/docs-shared.docs';

export function CandlestickChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <CandlestickChart aria-label="Price" data={candles} categoryKey="time" openKey="open" highKey="high" lowKey="low" closeKey="close" />
      <CandlestickChart aria-label="Price, tall" data={candles} categoryKey="time" openKey="open" highKey="high" lowKey="low" closeKey="close" height="tall" />
    </div>
  );
}
