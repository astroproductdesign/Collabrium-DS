// Every variant of BulletChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { BulletChart } from './BulletChart';
import { levels } from '../lib/docs-shared.docs';

export function BulletChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <BulletChart aria-label="Service levels" items={levels} />
      <BulletChart aria-label="Service levels, Navy, tall" items={levels} color="navy" height="tall" />
    </div>
  );
}
