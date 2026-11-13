// Documentation for Line chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with LineChart.usage.md. Not part of the package build.
import { LineChart } from './LineChart';
import { months, sharedAccessibility, sharedAnatomy, sharedMotion, sharedProps, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Line chart';

export const description =
  'Change over time as one or more lines, drawn with Recharts. Same chrome, marks and colours as the Chart.js Line, with a table view and a legend that shows or hides each series.';

export const usage = `import { LineChart } from '@collabrium/ui/charts-extra';

export function Renewals({ data }) {
  return (
    <LineChart
      aria-label="Renewal rate by month"
      data={data}
      categoryKey="month"
      series={[{ key: 'rate', name: 'Renewal rate' }]}
      valueFormat={v => v + '%'}
    />
  );
}`;

export const thumbnail = () => (
  <LineChart aria-label="Renewal rate by month" data={months} categoryKey="month" series={[{ key: 'rate', name: 'Renewal rate' }]} legend={false} />
);

export const anatomy = sharedAnatomy('One line per series: a 2px stroke with rounded ends, 3px points with a 2px Neutral-1 ring (5px on hover).');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'One line',
    description: 'A single series takes the first colour in the mapping, Orange. Pass `series` with the key of the value in each row and a name for the legend.',
    render: () => (
      <LineChart aria-label="Renewal rate by month" data={months} categoryKey="month" categoryLabel="Month" series={[{ key: 'rate', name: 'Renewal rate' }]} valueFormat={v => v + '%'} />
    ),
    code: `<LineChart
  aria-label="Renewal rate by month"
  data={months}
  categoryKey="month"
  categoryLabel="Month"
  series={[{ key: 'rate', name: 'Renewal rate' }]}
  valueFormat={v => v + '%'}
/>`,
  },
  {
    id: 'two-series',
    title: 'Against a target',
    description: 'Each series takes the next colour. Mark the reference line `dashed`, so it is told apart by pattern as well as colour. Click a legend item to hide its line.',
    render: () => (
      <LineChart
        aria-label="Renewal rate against target by month"
        data={months}
        categoryKey="month"
        categoryLabel="Month"
        series={[
          { key: 'rate', name: 'Renewal rate', color: 'salmonPink' },
          { key: 'target', name: 'Target', color: 'navy', dashed: true },
        ]}
        valueFormat={v => v + '%'}
      />
    ),
    code: `<LineChart
  aria-label="Renewal rate against target by month"
  data={months}
  categoryKey="month"
  categoryLabel="Month"
  series={[
    { key: 'rate', name: 'Renewal rate', color: 'salmonPink' },
    { key: 'target', name: 'Target', color: 'navy', dashed: true },
  ]}
  valueFormat={v => v + '%'}
/>`,
  },
  {
    id: 'linear',
    title: 'Straight segments, tall',
    description: '`curve="linear"` joins the points with straight segments, for data where the path between two readings means nothing. `height="tall"` raises the floor to 300px.',
    render: () => (
      <LineChart aria-label="Renewal rate by month, straight segments" data={months} categoryKey="month" series={[{ key: 'rate', name: 'Renewal rate', color: 'green' }]} curve="linear" height="tall" valueFormat={v => v + '%'} />
    ),
    code: `<LineChart
  aria-label="Renewal rate by month, straight segments"
  data={months}
  categoryKey="month"
  series={[{ key: 'rate', name: 'Renewal rate', color: 'green' }]}
  curve="linear"
  height="tall"
  valueFormat={v => v + '%'}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'series', options: 'ChartSeries[]', default: '—', required: true, description: 'One entry per line: `key` (the value in each row), `name`, optional `color` (one of the seven series colours) and `dashed`. Left out, `color` follows the mapping order.' },
  { name: 'curve', options: "'smooth' | 'linear'", default: "'smooth'", description: 'A gentle curve through the points, or straight segments.' },
  { name: 'yAxisStart', options: "'zero' | 'fit'", default: "'fit'", description: '`fit` zooms the value axis to the data, as Chart.js does for a line; `zero` always includes 0.' },
  ...sharedProps,
];

export const rules = sharedRules();
export const accessibility = sharedAccessibility;
export const motion = sharedMotion;
