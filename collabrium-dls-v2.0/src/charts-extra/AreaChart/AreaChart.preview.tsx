// Every variant of AreaChart, for checking against Chart.js's reference and the
// Amicro original. The docs site does not show this file.
// Not part of the package build.
import { AreaChart } from './AreaChart';
import { hours } from '../lib/docs-shared.docs';

export function AreaChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <AreaChart aria-label="Volume, smooth" data={hours} categoryKey="hour" series={[{ key: 'volume', name: 'Tickets' }]} />
      <AreaChart aria-label="Volume, linear" data={hours} categoryKey="hour" series={[{ key: 'volume', name: 'Tickets' }]} curve="linear" />
      <AreaChart aria-label="Volume, fitted axis" data={hours} categoryKey="hour" series={[{ key: 'volume', name: 'Tickets' }]} yAxisStart="fit" height="tall" />
    </div>
  );
}
