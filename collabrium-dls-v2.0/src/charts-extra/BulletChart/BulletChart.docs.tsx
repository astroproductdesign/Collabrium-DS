// Documentation for Bullet chart (Charts (extra)), rendered by the docs site.
// Keep it consistent with BulletChart.usage.md. Not part of the package build.
import { BulletChart } from './BulletChart';
import { levels, sharedMotion } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Bullet chart';

export const description =
  'Measures against their targets: one bar per measure, with a marker where the target is. Drawn in HTML and CSS, so it needs no chart engine.';

export const usage = `import { BulletChart } from '@collabrium/ui/charts-extra';

export function ServiceLevels() {
  return (
    <BulletChart
      aria-label="Service levels against target"
      items={[
        { label: 'Page load', actual: 380, target: 400, unit: 'ms' },
        { label: 'Uptime', actual: 99.6, target: 99.9, unit: '%' },
      ]}
    />
  );
}`;

export const thumbnail = () => <BulletChart aria-label="Service levels against target" items={levels} color="navy" />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Chart',
    element: '<figure>.cui-chartx',
    description: 'The frame. A group named by `aria-label`. It has no card of its own: put it in a Card.',
    children: [
      {
        name: 'Row',
        element: 'li.cui-bullet__item',
        description: 'One measure. Rows share the chart\'s height.',
        children: [
          { name: 'Label', element: '.cui-bullet__label', description: 'What is measured: label2, Neutral-9.' },
          { name: 'Values', element: '.cui-bullet__values', description: 'Actual and target, written out: caption, Neutral-5. This is the accessible value; the bar is a picture of it.' },
          { name: 'Track', element: '.cui-bullet__track', description: 'A Neutral-3 pill, 12px tall. Its scale ends 15% past the target.' },
          { name: 'Bar', element: '.cui-bullet__fill', description: 'The actual value, in the series colour, drawn from the left.' },
          { name: 'Target marker', element: '.cui-bullet__target', description: 'A 4px Obsidian marker where the target is.' },
        ],
      },
      { name: 'Table', element: '.cui-chartx__table', description: 'Measure, actual, target and percentage of target as a real table, shown by View as table.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Three measures',
    description: 'Each row has its own scale, ending 15% past its target, so the marker is never at the edge. A bar that stops short of the marker has missed; one that passes it has beaten it.',
    render: () => <BulletChart aria-label="Service levels against target" items={levels} color="navy" />,
    code: `<BulletChart
  aria-label="Service levels against target"
  color="navy"
  items={[
    { label: 'Page load', actual: 380, target: 400, unit: 'ms' },
    { label: 'Uptime', actual: 99.6, target: 99.9, unit: '%' },
    { label: 'Support replies', actual: 4850, target: 4500, unit: 'per week' },
  ]}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart, e.g. "Service levels against target".' },
  { name: 'items', options: 'BulletItem[]', default: '—', required: true, description: 'One entry per measure: `label`, `actual`, `target` and optional `unit`.' },
  { name: 'color', options: 'SeriesColorName', default: "'orange'", description: 'One of the seven DLS series colours for the bars.' },
  { name: 'valueFormat', options: '(value: number) => string', default: 'locale number', description: 'Formats the numbers.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the height: 260px, or 300px. The rows share it.' },
];

export const rules: DocsRules = {
  do: [
    'Use it for a few measures (about two to six) that are each judged against a goal.',
    'Write the unit once, in `unit`, so every value reads "380 ms of 400 ms target".',
    'Put the chart in a Card, and give the card the title.',
  ],
  dont: [
    "Don't use it to compare many categories against each other: use Bar chart.",
    "Don't use it for progress through a task: use a Progress Bar.",
    "Don't give rows different units on one chart if they will be compared by length: each row has its own scale.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the View as table button. The bars themselves are not interactive.' },
    { keys: 'Enter / Space', action: 'On View as table, swaps the rows and the table.' },
  ],
  notes: [
    'The chart is a group named by `aria-label`. Each row reads as text ("Page load, 380 ms of 400 ms target"); the bar and marker are hidden from assistive technology because the text carries the values.',
    'Whether a target is met is never carried by colour alone: the values are written out, and the table gives the percentage of target.',
    'Forced-colours mode: the track is outlined, the bar is the system highlight and the marker is the system text colour.',
  ],
};

export const motion = sharedMotion.map(m => ({ ...m, motion: 'Each bar grows from the left once. Under reduced motion it appears at full length.' }));
