// Documentation for Stream chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with StreamChart.usage.md. Not part of the package build.
import { StreamChart } from './StreamChart';
import { flows, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Stream chart';

export const description =
  'Overlapping flows over time, such as inbound against outbound: layered areas drawn as soft, natural curves, so the gap between the flows reads at a glance.';

export const usage = `import { StreamChart } from '@collabrium/ui/charts-extra';

export function Traffic({ data }) {
  return (
    <StreamChart
      aria-label="Inbound and outbound transfers by hour"
      data={data}
      categoryKey="hour"
      series={[
        { key: 'inflow', name: 'Inbound' },
        { key: 'outflow', name: 'Outbound' },
      ]}
    />
  );
}`;

export const thumbnail = () => (
  <StreamChart
    aria-label="Inbound and outbound transfers by hour"
    data={flows}
    categoryKey="hour"
    series={[
      { key: 'inflow', name: 'Inbound', color: 'green' },
      { key: 'outflow', name: 'Outbound', color: 'navy' },
    ]}
    legend={false}
  />
);

export const anatomy = sharedAnatomy('Layered areas: each a 2px line on a natural curve with a 12% wash of its colour, drawn in series order.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Two flows',
    description: 'Each flow takes the next series colour. The washes overlap where the flows do, so the wash stays at 12% and the lines carry the shape.',
    render: () => (
      <StreamChart
        aria-label="Inbound and outbound transfers by hour"
        data={flows}
        categoryKey="hour"
        categoryLabel="Hour"
        series={[
          { key: 'inflow', name: 'Inbound', color: 'green' },
          { key: 'outflow', name: 'Outbound', color: 'navy' },
        ]}
        valueFormat={v => '$' + v + 'M'}
      />
    ),
    code: `<StreamChart
  aria-label="Inbound and outbound transfers by hour"
  data={flows}
  categoryKey="hour"
  categoryLabel="Hour"
  series={[
    { key: 'inflow', name: 'Inbound', color: 'green' },
    { key: 'outflow', name: 'Outbound', color: 'navy' },
  ]}
  valueFormat={v => '$' + v + 'M'}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'series', options: 'ChartSeries[]', default: '—', required: true, description: 'Two or three overlapping flows: `key`, `name`, optional `color` and `dashed`.' },
  { name: 'yAxisStart', options: "'zero' | 'fit'", default: "'zero'", description: 'The value axis starts at 0 so the areas keep their meaning.' },
  ...sharedProps,
];

export const rules = sharedRules();
export const accessibility = sharedAccessibility;
export const motion = sharedMotion;
