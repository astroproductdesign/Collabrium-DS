// Documentation for Area chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with AreaChart.usage.md. Not part of the package build.
import { AreaChart } from './AreaChart';
import { hours, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Area chart';

export const description =
  'Cumulative volume over time: a line with a 12% wash of its own colour beneath it. Drawn with Recharts, for when the Chart.js Area does not fit.';

export const usage = `import { AreaChart } from '@collabrium/ui/charts-extra';

export function Volume({ data }) {
  return (
    <AreaChart
      aria-label="Support volume by hour"
      data={data}
      categoryKey="hour"
      series={[{ key: 'volume', name: 'Tickets' }]}
    />
  );
}`;

export const thumbnail = () => (
  <AreaChart aria-label="Support volume by hour" data={hours} categoryKey="hour" series={[{ key: 'volume', name: 'Tickets', color: 'navy' }]} legend={false} />
);

export const anatomy = sharedAnatomy('A 2px line with 3px ringed points, and a fill of the line\'s own colour at a 12% wash. The fill is never stronger.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'One area',
    description: 'The fill is a 12% wash of the line\'s colour, built in. The value axis starts at zero, because an area\'s height is its volume.',
    render: () => (
      <AreaChart aria-label="Support volume by hour" data={hours} categoryKey="hour" categoryLabel="Hour" series={[{ key: 'volume', name: 'Tickets', color: 'navy' }]} />
    ),
    code: `<AreaChart
  aria-label="Support volume by hour"
  data={hours}
  categoryKey="hour"
  categoryLabel="Hour"
  series={[{ key: 'volume', name: 'Tickets', color: 'navy' }]}
/>`,
  },
  {
    id: 'linear',
    title: 'Straight segments',
    description: '`curve="linear"` joins the points with straight segments, for readings taken at fixed moments.',
    render: () => (
      <AreaChart aria-label="Support volume by hour, straight segments" data={hours} categoryKey="hour" series={[{ key: 'volume', name: 'Tickets', color: 'green' }]} curve="linear" valueFormat={v => v + ' tickets'} />
    ),
    code: `<AreaChart
  aria-label="Support volume by hour, straight segments"
  data={hours}
  categoryKey="hour"
  series={[{ key: 'volume', name: 'Tickets', color: 'green' }]}
  curve="linear"
  valueFormat={v => v + ' tickets'}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'series', options: 'ChartSeries[]', default: '—', required: true, description: 'One entry per area: `key`, `name`, optional `color` and `dashed`. Areas overlap, so keep to a few.' },
  { name: 'curve', options: "'smooth' | 'linear'", default: "'smooth'", description: 'A gentle curve through the points, or straight segments.' },
  { name: 'yAxisStart', options: "'zero' | 'fit'", default: "'zero'", description: 'An area\'s height is its volume, so the axis starts at 0. `fit` zooms to the data; use it rarely.' },
  ...sharedProps,
];

export const rules = sharedRules();
export const accessibility = sharedAccessibility;
export const motion = sharedMotion;
