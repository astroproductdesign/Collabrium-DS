// Documentation for Activity heatmap (Charts (extra)), rendered by the docs site.
// Keep it consistent with ActivityHeatmapChart.usage.md. Not part of the package build.
import { ActivityHeatmapChart } from './ActivityHeatmapChart';
import { activity, gridAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Activity heatmap';

export const description =
  'One count per day as a calendar: a column per week, a row per weekday, each day shaded in five steps. Drawn in HTML and CSS.';

export const usage = `import { ActivityHeatmapChart } from '@collabrium/ui/charts-extra';

export function Commits({ days }) {
  return (
    <ActivityHeatmapChart
      aria-label="Commits over the last 20 weeks"
      data={days}
      unit="commits"
    />
  );
}`;

export const thumbnail = () => <ActivityHeatmapChart aria-label="Commits over the last 20 weeks" data={activity} unit="commits" />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Chart',
    element: '<figure>.cui-chartx',
    description: 'The frame. A group named by `aria-label`. It has no card of its own: put it in a Card.',
    children: [
      { name: 'Grid', element: '.cui-act__grid', description: 'Month names across the top, Mon, Wed and Fri down the left (footnote, Neutral-5), and one square per day. aria-hidden: the table carries the values. It scrolls sideways inside its box on a narrow screen.' },
      { name: 'Day', element: '.cui-act__cell', description: 'A 2px-radius square: Neutral-2 for a quiet day, then four steps of the hue. Hovering outlines it in Obsidian and opens the tooltip.' },
      { name: 'Scale', element: '.cui-act__scale', description: '"Less", the five steps, "More": the legend.' },
      { name: 'Tooltip', element: '.cui-chartx__tooltip', description: 'The date as the title and the count below.' },
      { name: 'Table', element: '.cui-chartx__table', description: 'One row per week with a column per weekday. Always readable by screen readers; View as table shows it to everyone.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Twenty weeks',
    description: 'The four busy steps are the quartiles of the days that had any activity, so the shading adapts to the data. Hover a day for its date and count.',
    render: () => <ActivityHeatmapChart aria-label="Commits over the last 20 weeks" data={activity} unit="commits" />,
    code: `<ActivityHeatmapChart
  aria-label="Commits over the last 20 weeks"
  data={days}
  unit="commits"
/>`,
  },
  {
    id: 'hue',
    title: 'Another hue, weeks from Sunday',
    description: '`color` picks the hue and `weekStartsOn={0}` starts each week on Sunday.',
    render: () => <ActivityHeatmapChart aria-label="Sessions over the last 20 weeks" data={activity} unit="sessions" color="navy" weekStartsOn={0} />,
    code: `<ActivityHeatmapChart
  aria-label="Sessions over the last 20 weeks"
  data={days}
  unit="sessions"
  color="navy"
  weekStartsOn={0}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the chart.' },
  { name: 'data', options: 'ActivityDay[]', default: '—', required: true, description: 'One entry per day: `date` (`YYYY-MM-DD`) and `count`.' },
  { name: 'unit', options: 'string', default: "'contributions'", description: 'What is counted, in the plural, for the tooltip and the table.' },
  { name: 'color', options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: "'green'", description: 'The hue; busier days are darker.' },
  { name: 'weekStartsOn', options: '0 | 1', default: '1', description: 'The first day of each week: 1 for Monday, 0 for Sunday.' },
  { name: 'height', options: "'default' | 'tall'", default: "'default'", description: 'A floor for the plot height: 260px, or 300px.' },
];

export const rules: DocsRules = {
  do: [
    'Give every day, including quiet days with a count of 0.',
    'Say what is counted in `unit` ("commits", "sessions").',
    'Put the chart in a Card, and give the card the title.',
  ],
  dont: [
    "Don't use it for fewer than about eight weeks: use Bar chart.",
    "Don't rely on the shade alone: the tooltip and the table give each day's count.",
    "Don't use several hues in one chart: a single hue is the DLS sequential rule.",
  ],
};

export const accessibility = gridAccessibility;
export const motion = 'The calendar does not animate. A day outlines on hover over `--duration-fast`.';
