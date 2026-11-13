// Documentation for Bar chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with BarChart.usage.md. Not part of the package build.
import { BarChart } from './BarChart';
import { barAccessibility, orders, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Bar chart';

export const description =
  'Values compared across categories as bars, vertical or horizontal, drawn with Recharts. Same chrome, marks and colours as the Chart.js Bar, with a table view and a legend that shows or hides each series.';

export const usage = `import { BarChart } from '@collabrium/ui/charts-extra';

export function Orders({ data }) {
  return (
    <BarChart
      aria-label="Orders by weekday"
      data={data}
      categoryKey="day"
      series={[{ key: 'web', name: 'Web' }]}
    />
  );
}`;

export const thumbnail = () => (
  <BarChart aria-label="Orders by weekday" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web', color: 'green' }]} legend={false} />
);

export const anatomy = sharedAnatomy('Bars in the series colours: a 4px radius on the outer end only, at most 24px thick (20px horizontal). The hovered bar darkens 15% toward Neutral-9.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'One series',
    description: 'A single series takes the first colour in the mapping, Orange. The value axis always starts at zero, because a bar\'s length is its value.',
    render: () => (
      <BarChart aria-label="Web orders by weekday" data={orders} categoryKey="day" categoryLabel="Day" series={[{ key: 'web', name: 'Web orders' }]} />
    ),
    code: `<BarChart
  aria-label="Web orders by weekday"
  data={orders}
  categoryKey="day"
  categoryLabel="Day"
  series={[{ key: 'web', name: 'Web orders' }]}
/>`,
  },
  {
    id: 'grouped',
    title: 'Grouped',
    description: 'Several series sit side by side in each group, each in the next colour. Click a legend item to hide its bars.',
    render: () => (
      <BarChart
        aria-label="Orders by weekday and channel"
        data={orders}
        categoryKey="day"
        categoryLabel="Day"
        series={[
          { key: 'web', name: 'Web', color: 'navy' },
          { key: 'mobile', name: 'Mobile', color: 'salmonPink' },
        ]}
      />
    ),
    code: `<BarChart
  aria-label="Orders by weekday and channel"
  data={orders}
  categoryKey="day"
  categoryLabel="Day"
  series={[
    { key: 'web', name: 'Web', color: 'navy' },
    { key: 'mobile', name: 'Mobile', color: 'salmonPink' },
  ]}
/>`,
  },
  {
    id: 'horizontal',
    title: 'Horizontal',
    description: '`orientation="horizontal"` lays the bars lengthwise with the categories on the left: use it for long names and for ranking. The gridline moves to the value axis, which is now horizontal.',
    render: () => (
      <BarChart aria-label="Web orders by weekday, horizontal" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web orders', color: 'amber' }]} orientation="horizontal" />
    ),
    code: `<BarChart
  aria-label="Web orders by weekday, horizontal"
  data={orders}
  categoryKey="day"
  series={[{ key: 'web', name: 'Web orders', color: 'amber' }]}
  orientation="horizontal"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'series', options: 'ChartSeries[]', default: '—', required: true, description: 'One entry per bar in a group: `key`, `name` and optional `color`. Left out, `color` follows the mapping order.' },
  { name: 'orientation', options: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Bars standing up, or lying lengthwise with the categories on the left.' },
  ...sharedProps,
];

export const rules = sharedRules();
export const accessibility = barAccessibility;
export const motion = sharedMotion;
