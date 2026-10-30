// Documentation for Funnel chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with FunnelChart.usage.md. Not part of the package build.
import { FunnelChart } from './FunnelChart';
import { barAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules, stages } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Funnel chart';

export const description =
  'Stages a population passes through, each narrower than the last: a row of bars, longest first. The tooltip and the table also give each stage as a share of the first.';

export const usage = `import { FunnelChart } from '@collabrium/ui/charts-extra';

export function Activation({ data }) {
  return (
    <FunnelChart
      aria-label="Users at each activation stage"
      data={data}
      categoryKey="stage"
      valueKey="users"
      name="Users"
    />
  );
}`;

export const thumbnail = () => (
  <FunnelChart aria-label="Users at each activation stage" data={stages} categoryKey="stage" valueKey="users" name="Users" color="green" />
);

export const anatomy = sharedAnatomy('Horizontal bars, longest first: a 4px radius on the outer end, at most 20px thick, in one series colour.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Four stages',
    description: 'Stages run top to bottom in the order of `data`. Hover a stage for its count and its share of the first stage; the table has the same shares.',
    render: () => (
      <FunnelChart aria-label="Users at each activation stage" data={stages} categoryKey="stage" categoryLabel="Stage" valueKey="users" name="Users" color="green" />
    ),
    code: `<FunnelChart
  aria-label="Users at each activation stage"
  data={stages}
  categoryKey="stage"
  categoryLabel="Stage"
  valueKey="users"
  name="Users"
  color="green"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'valueKey', options: 'string', default: '—', required: true, description: 'The key of each stage\'s count in a row.' },
  { name: 'name', options: 'string', default: '—', required: true, description: 'Names what is counted, e.g. "Users".' },
  { name: 'color', options: 'SeriesColorName', default: "'orange'", description: 'One of the seven DLS series colours.' },
  ...sharedProps.filter(p => p.name !== 'legend'),
];

export const rules = sharedRules();
export const accessibility = barAccessibility;
export const motion = sharedMotion;
