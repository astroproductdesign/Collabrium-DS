// Every variant of RangeChart, for checking against Chart.js's reference and the
// Amicro original. The docs site does not show this file.
// Not part of the package build.
import { RangeChart } from './RangeChart';
import { spread } from '../lib/docs-shared.docs';

export function RangeChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <RangeChart aria-label="Daily range" data={spread} categoryKey="day" minKey="low" maxKey="high" name="Range" />
      <RangeChart aria-label="Daily range, tall, Navy" data={spread} categoryKey="day" minKey="low" maxKey="high" name="Range" color="navy" height="tall" legend={false} />
    </div>
  );
}
