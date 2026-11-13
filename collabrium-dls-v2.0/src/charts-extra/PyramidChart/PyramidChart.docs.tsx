// Documentation for Pyramid chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with PyramidChart.usage.md. Not part of the package build.
import { PyramidChart } from './PyramidChart';
import { gridAccessibility, pipelineLevels } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Pyramid chart';

export const description =
  'Levels of a hierarchy or stages of a pipeline as centred bands whose widths are the values; larger levels are darker. Drawn in HTML and CSS.';

export const usage = `import { PyramidChart } from '@collabrium/ui/charts-extra';

export function Pipeline({ data }) {
  return (
    <PyramidChart
      aria-label="Requests at each stage"
      data={data}
      nameKey="level"
      valueKey="count"
    />
  );
}`;

export const thumbnail = () => <PyramidChart aria-label="Requests at each stage" data={pipelineLevels} nameKey="level" valueKey="count" color="amber" />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Chart',
    element: '<figure>.cui-chartx',
    description: 'The frame. A group named by `aria-label`. It has no card of its own: put it in a Card.',
    children: [
      { name: 'Band', element: '.cui-pyramid__band', description: 'A 32px-tall, 4px-radius band, centred, as wide as its value is to the largest. Shaded on the ramp; the name sits left (label3) and the value right (caption).' },
      { name: 'Tooltip', element: '.cui-chartx__tooltip', description: 'The level\'s name as the title, its value below. Pointer only.' },
      { name: 'Table', element: '.cui-chartx__table', description: 'Level, value and share of the widest, as a real table. Always readable by screen readers; View as table shows it to everyone.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Four stages',
    description: 'List the levels top to bottom; smallest first makes a pyramid. Widths are proportional to the values, so a level half the size is half as wide, and the largest is darkest.',
    render: () => <PyramidChart aria-label="Requests at each stage" data={pipelineLevels} nameKey="level" valueKey="count" color="amber" valueFormat={v => (v / 1000).toFixed(1) + 'k'} />,
    code: `<PyramidChart
  aria-label="Requests at each stage"
  data={pipelineLevels}
  nameKey="level"
  valueKey="count"
  color="amber"
  valueFormat={v => (v / 1000).toFixed(1) + 'k'}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'data', options: 'Record<string, string | number>[]', default: '—', required: true, description: 'One object per level, top to bottom.' },
  { name: 'nameKey', options: 'string', default: '—', required: true, description: 'The key of each level\'s name.' },
  { name: 'valueKey', options: 'string', default: '—', required: true, description: 'The key of each level\'s value; it sets the width.' },
  { name: 'color', options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: "'orange'", description: 'The hue of the ramp; larger levels are darker.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats values for the band, tooltip and table.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
];

export const rules: DocsRules = {
  do: [
    'Use four to six levels; the names must fit inside the bands.',
    'Keep widths honest: the chart makes them proportional to the values.',
    'Put the chart in a Card, and give the card the title.',
  ],
  dont: [
    "Don't use it to compare many unrelated categories: use Bar chart.",
    "Don't order the levels arbitrarily: a pyramid reads smallest to largest, or a funnel largest to smallest.",
    "Don't use it where a stage keeps only some of the previous one and the share matters: use Funnel chart, which shows the share.",
  ],
};

export const accessibility = gridAccessibility;
export const motion = 'The bands do not animate. A band outlines on hover over `--duration-fast`.';
