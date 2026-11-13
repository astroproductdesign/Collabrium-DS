// Documentation for Donut chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with DonutChart.usage.md. Not part of the package build.
import { DonutChart } from './DonutChart';
import { pipeline, polarAccessibility, sharedAnatomy, sharedMotion, sharedRules } from '../lib/docs-shared.docs';
import type { DocsExample, DocsProp } from '../../components/docs.types';

export const title = 'Donut chart';

export const description =
  'Part of a whole, as a ring: one hue, one rung of its ramp per slice, with a 2px white border between slices. Drawn with Recharts, with the total (or the hovered slice) at the centre.';

export const usage = `import { DonutChart } from '@collabrium/ui/charts-extra';

export function Pipeline({ data }) {
  return (
    <DonutChart
      aria-label="Pipeline by stage"
      data={data}
      nameKey="stage"
      valueKey="value"
      color="navy"
    />
  );
}`;

export const thumbnail = () => <DonutChart aria-label="Pipeline by stage" data={pipeline} nameKey="stage" valueKey="value" color="navy" legend={false} />;

export const anatomy = sharedAnatomy('Ring slices, lightest to darkest, each separated by a 2px Neutral-1 border; the centre reads the total, or the hovered slice.');

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Four slices',
    description: 'The slices walk one hue from its lightest rung to its full colour, so an ordered set reads as a progression. Hover a slice and the centre shows its value and name; click a legend item to take a slice out.',
    render: () => (
      <DonutChart aria-label="Pipeline by stage" data={pipeline} nameKey="stage" valueKey="value" color="navy" centerLabel="Pipeline" valueFormat={v => '$' + v + 'k'} />
    ),
    code: `<DonutChart
  aria-label="Pipeline by stage"
  data={pipeline}
  nameKey="stage"
  valueKey="value"
  color="navy"
  centerLabel="Pipeline"
  valueFormat={v => '$' + v + 'k'}
/>`,
  },
  {
    id: 'orange',
    title: 'Another hue',
    description: '`color` picks the hue from five (orange, salmonPink, green, navy, amber). Use the colour of the element that owns the measure.',
    render: () => <DonutChart aria-label="Pipeline by stage, orange" data={pipeline} nameKey="stage" valueKey="value" color="orange" legend={false} height="tall" />,
    code: `<DonutChart
  aria-label="Pipeline by stage, orange"
  data={pipeline}
  nameKey="stage"
  valueKey="value"
  color="orange"
  legend={false}
  height="tall"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart, e.g. "Pipeline by stage".' },
  { name: 'data', options: 'Record<string, string | number>[]', default: '—', required: true, description: 'One object per slice, in order. Up to four slices.' },
  { name: 'nameKey', options: 'string', default: '—', required: true, description: 'The key of each slice\'s name.' },
  { name: 'valueKey', options: 'string', default: '—', required: true, description: 'The key of each slice\'s value.' },
  { name: 'color', options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: "'orange'", description: 'The hue the slices walk, lightest first.' },
  { name: 'centerLabel', options: 'string', default: "'Total'", description: 'The caption under the total in the centre.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats values for the centre, the tooltip and the table.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
  { name: 'legend', options: 'boolean', default: 'true', description: 'Shows the legend, which shows or hides each slice.' },
];

export const rules = sharedRules();
export const accessibility = polarAccessibility;
export const motion = sharedMotion;
