// Documentation for Step chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with StepChart.usage.md. Not part of the package build.
import { StepChart } from './StepChart';
import { sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules, tiers } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Step chart';

export const description =
  'A value that holds until it changes: a staircase line for tiers, rates and settings, not a continuous measure. Drawn with Recharts.';

export const usage = `import { StepChart } from '@collabrium/ui/charts-extra';

export function Pricing({ data }) {
  return (
    <StepChart
      aria-label="Monthly price by plan"
      data={data}
      categoryKey="tier"
      series={[{ key: 'price', name: 'Price' }]}
      valueFormat={v => '$' + v}
    />
  );
}`;

export const thumbnail = () => (
  <StepChart aria-label="Monthly price by plan" data={tiers} categoryKey="tier" series={[{ key: 'price', name: 'Price', color: 'amber' }]} legend={false} />
);

export const anatomy = sharedAnatomy('A 2px stepped line (it holds each value until the next category) with a 3px ringed point at every reading.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'One step line',
    description: 'The line holds each value until the next category, so a point is where a value begins. The value axis starts at zero.',
    render: () => (
      <StepChart aria-label="Monthly price by plan" data={tiers} categoryKey="tier" categoryLabel="Plan" series={[{ key: 'price', name: 'Price', color: 'amber' }]} valueFormat={v => '$' + v} />
    ),
    code: `<StepChart
  aria-label="Monthly price by plan"
  data={tiers}
  categoryKey="tier"
  categoryLabel="Plan"
  series={[{ key: 'price', name: 'Price', color: 'amber' }]}
  valueFormat={v => '$' + v}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'series', options: 'ChartSeries[]', default: '—', required: true, description: 'One entry per step line: `key`, `name`, optional `color` and `dashed`.' },
  { name: 'yAxisStart', options: "'zero' | 'fit'", default: "'zero'", description: 'The value axis starts at 0. `fit` zooms to the data.' },
  ...sharedProps,
];

export const rules = sharedRules();
export const accessibility = sharedAccessibility;
export const motion = sharedMotion;
