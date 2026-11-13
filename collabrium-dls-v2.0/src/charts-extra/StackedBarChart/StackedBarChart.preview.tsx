// Every variant of StackedBarChart, for checking against the Amicro original.
// The docs site does not show this file. Not part of the package build.
import { StackedBarChart } from './StackedBarChart';
import { quarters } from '../lib/docs-shared.docs';

export function StackedBarChartPreview() {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
      <StackedBarChart aria-label="Categories" data={quarters} categoryKey="quarter" series={[{ key: 'newBiz', name: 'New' }, { key: 'renewals', name: 'Renewals' }, { key: 'expansion', name: 'Expansion' }]} />
      <StackedBarChart aria-label="With remainder" data={quarters} categoryKey="quarter" series={[{ key: 'newBiz', name: 'New' }, { key: 'renewals', name: 'Renewals' }, { key: 'expansion', name: 'Expansion' }]} totalKey="goal" />
      <StackedBarChart aria-label="Ramp, horizontal" data={quarters} categoryKey="quarter" series={[{ key: 'newBiz', name: 'New' }, { key: 'renewals', name: 'Renewals' }, { key: 'expansion', name: 'Expansion' }]} ramp="navy" orientation="horizontal" />
      <StackedBarChart aria-label="Ramp in Green, tall" data={quarters} categoryKey="quarter" series={[{ key: 'newBiz', name: 'New' }, { key: 'renewals', name: 'Renewals' }, { key: 'expansion', name: 'Expansion' }]} ramp="green" height="tall" />
    </div>
  );
}
