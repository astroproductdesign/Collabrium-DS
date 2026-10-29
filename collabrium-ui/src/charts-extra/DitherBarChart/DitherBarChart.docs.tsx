// Documentation for Dither bar chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with DitherBarChart.usage.md. Not part of the package build.
import { DitherBarChart } from './DitherBarChart';
import { barAccessibility, orders, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Dither bar chart';

export const description =
  'Bar chart with a printed texture: each series is filled with its own pattern in its own colour, so it can be told apart without the colour. Drawn with Recharts.';

export const usage = `import { DitherBarChart } from '@collabrium/ui/charts-extra';

export function Orders({ data }) {
  return (
    <DitherBarChart
      aria-label="Orders by weekday and channel"
      data={data}
      categoryKey="day"
      series={[
        { key: 'web', name: 'Web' },
        { key: 'mobile', name: 'Mobile' },
      ]}
    />
  );
}`;

export const thumbnail = () => (
  <DitherBarChart aria-label="Orders by weekday" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web', color: 'navy' }]} legend={false} />
);

export const anatomy = sharedAnatomy('Bars with the Bar chart\'s radius and thickness caps, each filled with a pattern (stipple, dots, hatch, checker, stripes): a 12% wash of the series colour with marks in its full colour, and a 1px outline. The legend swatch carries the same pattern.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'One series',
    description: 'A single series takes the first colour and the first pattern, a sparse stipple. The value axis always starts at zero.',
    render: () => (
      <DitherBarChart aria-label="Web orders by weekday" data={orders} categoryKey="day" categoryLabel="Day" series={[{ key: 'web', name: 'Web orders' }]} />
    ),
    code: `<DitherBarChart
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
    description: 'Each series gets the next colour and the next pattern, from sparse to dense, so the two stay apart in greyscale and for people who cannot tell the colours.',
    render: () => (
      <DitherBarChart
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
    code: `<DitherBarChart
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
    description: '`orientation="horizontal"` lays the bars lengthwise, for long names and ranking.',
    render: () => (
      <DitherBarChart aria-label="Web orders by weekday, horizontal" data={orders} categoryKey="day" series={[{ key: 'web', name: 'Web orders', color: 'amber' }]} orientation="horizontal" />
    ),
    code: `<DitherBarChart
  aria-label="Web orders by weekday, horizontal"
  data={orders}
  categoryKey="day"
  series={[{ key: 'web', name: 'Web orders', color: 'amber' }]}
  orientation="horizontal"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'series', options: 'ChartSeries[]', default: '—', required: true, description: 'One entry per bar in a group: `key`, `name` and optional `color`. Each takes the next pattern. Up to five; the patterns repeat after that.' },
  { name: 'orientation', options: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Bars standing up, or lying lengthwise with the categories on the left.' },
  ...sharedProps,
];

export const rules = sharedRules();
export const accessibility = barAccessibility;
export const motion = sharedMotion;
