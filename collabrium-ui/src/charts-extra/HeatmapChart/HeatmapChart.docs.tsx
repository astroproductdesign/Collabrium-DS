// Documentation for Heatmap (Charts (extra)), rendered by the docs site.
// Keep it consistent with HeatmapChart.usage.md. Not part of the package build.
import { HeatmapChart } from './HeatmapChart';
import { gridAccessibility, load, loadColumns } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Heatmap';

export const description =
  'How a measure varies across two categories (weekday by hour): a grid of rounded cells, each shaded on a single-hue ramp from the lightest tint to the full colour. Drawn in HTML and CSS.';

export const usage = `import { HeatmapChart } from '@collabrium/ui/charts-extra';

export function Load({ data, columns }) {
  return (
    <HeatmapChart
      aria-label="Server load by weekday and hour"
      data={data}
      rowKey="day"
      rowLabel="Day"
      columns={columns}
      valueFormat={v => v + '%'}
    />
  );
}`;

export const thumbnail = () => <HeatmapChart aria-label="Server load by weekday and hour" data={load} rowKey="day" columns={loadColumns} color="navy" />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Chart',
    element: '<figure>.cui-chartx',
    description: 'The frame. A group named by `aria-label`. It has no card of its own: put it in a Card.',
    children: [
      { name: 'Grid', element: '.cui-heat__grid', description: 'Column labels across the top, row labels down the left (footnote, Neutral-5), and one cell per value. aria-hidden: the table carries the values.' },
      { name: 'Cell', element: '.cui-heat__cell', description: 'A 4px-radius rectangle shaded on the ramp. Hovering outlines it in Obsidian and opens the tooltip.' },
      { name: 'Scale', element: '.cui-heat__scale', description: 'The lowest value, a ramp bar, the highest value: the legend.' },
      { name: 'Tooltip', element: '.cui-chartx__tooltip', description: 'Neutral-1 with a 1px Neutral-3 border: the row and column as the title, the value below.' },
      { name: 'Table', element: '.cui-chartx__table', description: 'Every value as a real table. Always readable by screen readers; View as table shows it to everyone.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Weekday by hour',
    description: 'Each cell is shaded from the lightest tint of the hue (the lowest value) to its full colour (the highest). Hover a cell for its value; the scale under the grid gives the range.',
    render: () => (
      <HeatmapChart aria-label="Server load by weekday and hour" data={load} rowKey="day" rowLabel="Day" columns={loadColumns} color="navy" valueFormat={v => v + '%'} />
    ),
    code: `<HeatmapChart
  aria-label="Server load by weekday and hour"
  data={load}
  rowKey="day"
  rowLabel="Day"
  columns={loadColumns}
  color="navy"
  valueFormat={v => v + '%'}
/>`,
  },
  {
    id: 'range',
    title: 'A fixed range',
    description: 'Give `min` and `max` to shade against a fixed scale (here 0 to 100) rather than the data\'s own lowest and highest, so two heatmaps can be compared.',
    render: () => <HeatmapChart aria-label="Server load, scaled 0 to 100" data={load} rowKey="day" columns={loadColumns} min={0} max={100} color="orange" valueFormat={v => v + '%'} height="tall" />,
    code: `<HeatmapChart
  aria-label="Server load, scaled 0 to 100"
  data={load}
  rowKey="day"
  columns={loadColumns}
  min={0}
  max={100}
  color="orange"
  valueFormat={v => v + '%'}
  height="tall"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'data', options: 'Record<string, string | number>[]', default: '—', required: true, description: 'One object per row.' },
  { name: 'rowKey', options: 'string', default: '—', required: true, description: 'The key of each row\'s name.' },
  { name: 'rowLabel', options: 'string', default: "'Row'", description: 'The heading of the row-name column in the table view.' },
  { name: 'columns', options: 'HeatmapColumn[]', default: '—', required: true, description: 'The columns, left to right: `key` (the value in each row) and `label`.' },
  { name: 'color', options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: "'orange'", description: 'The hue of the ramp.' },
  { name: 'min', options: 'number', default: 'lowest value', description: 'The value shown as the lightest tint.' },
  { name: 'max', options: 'number', default: 'highest value', description: 'The value shown as the full colour.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats values for the tooltip, the scale and the table.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
];

export const rules: DocsRules = {
  do: [
    'Use one hue: a single-hue ramp from the lightest tint to the full colour, never a rainbow.',
    'Use `min` and `max` when two heatmaps are meant to be compared.',
    'Put the chart in a Card, and give the card the title.',
  ],
  dont: [
    "Don't use it where the exact values matter more than the pattern: use the table, or Bar chart.",
    "Don't rely on the shade alone: the scale, the hover tooltip and the table give the figures.",
    "Don't use more than about ten columns on a phone: the cells get too small.",
  ],
};

export const accessibility = gridAccessibility;
export const motion = 'The grid does not animate. A cell outlines on hover over `--duration-fast`.';
