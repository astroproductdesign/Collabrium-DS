// Documentation for Progress-to-Goal Bar, rendered by the docs site (playground).
// Keep it consistent with GoalBar.usage.md. Not part of the package build.
import { GoalBar } from './GoalBar';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../docs.types';

export const title = 'Progress-to-Goal Bar';

export const description =
  'A stacked bar of contributions toward a named target: segments from the left, a target line at 75% of the track, headroom past it, and a dashed Red outline for the gap when the total falls short. Card, Chart and In-table variants.';

export const usage = `import { GoalBar } from '@collabrium/ui';

export function Fundraising() {
  return (
    <GoalBar
      title="Progress to Goal"
      target={10000}
      categories={[
        { label: 'Category A', value: 2000 },
        { label: 'Category B', value: 4000 },
      ]}
      footer="Bar extends past target to show headroom."
    />
  );
}`;

const ab = [
  { label: 'Category A', value: 2000 },
  { label: 'Category B', value: 4000 },
];

export const thumbnail = () => <GoalBar variant="chart" target={10000} categories={ab} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Progress-to-Goal Bar',
    element: '<div>.cui-goal-bar',
    description: 'Card variant: Card\'s container (Neutral-1, 1px Neutral-3, radius-lg, shadow-1, 16px padding), up to 560px.',
    children: [
      {
        name: 'Head',
        element: '.cui-goal-bar__head',
        description: 'The heading (h5) with the target figures top-right: the total at h4 over "/ 10,000.00", and "60% of target".',
      },
      {
        name: 'Chart area',
        element: '.cui-goal-bar__chart[role="img"]',
        description: 'Named by its summary ("RM 6,000.00 of RM 10,000.00 target, 60%.").',
        children: [
          { name: 'Track', element: '.cui-goal-bar__track', description: 'Neutral-2, 16/32/40px tall by size, radius 6/8/10px. In-table: an 8px pill.' },
          { name: 'Segments', element: '.cui-goal-bar__segment', description: 'Stacked from the left, no gaps. The department walk; Obsidian for one value.' },
          { name: 'Headroom', element: '.cui-goal-bar__headroom', description: 'Neutral-3 from the target to the end, when the total is short.' },
          { name: 'Gap', element: '.cui-goal-bar__gap', description: '2px dashed Red on the top, bottom and right, from the total to the target. Not at small or in a table.' },
          { name: 'Target line', element: '.cui-goal-bar__target-line', description: '2px Neutral-9, overhanging the track 5/7/9px.' },
          { name: 'Target tag', element: '.cui-goal-bar__target-tag', description: '"Target RM 10,000.00" in label3, centred on the line, sliding inward at an edge.' },
        ],
      },
      { name: 'Legend', element: '.cui-goal-bar__legend', description: 'A 10px swatch, the bold label and the value per category, plus Gap. No Target entry.' },
      { name: 'Label row', element: '.cui-goal-bar__labels', description: 'Instead of the legend: Total · Gap · Target in caption. Gap gives way to keep one line.' },
      { name: 'Footer', element: '<hr> + <p>.cui-goal-bar__footer', description: 'Optional, Card variant: a Neutral-3 rule and one footnote line.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'card',
    title: 'Card',
    description: 'Two categories short of the target: the gap is outlined in dashed Red and named in the legend, and the headroom past the target is drawn.',
    render: () => <GoalBar title="Progress to Goal" target={10000} categories={ab} footer="Bar extends past target to show headroom." />,
    code: `<GoalBar
  title="Progress to Goal"
  target={10000}
  categories={[
    { label: 'Category A', value: 2000 },
    { label: 'Category B', value: 4000 },
  ]}
  footer="Bar extends past target to show headroom."
/>`,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Size changes the bar, never the text. Small has no room for the legend: a label row takes its place, numbers shorten from 1M up, and there is no gap outline or tag.',
    render: () => (
      <div className="docs-stack">
        <GoalBar variant="chart" size="small" target={10_200_000} value={6_600_000} />
        <GoalBar variant="chart" size="medium" target={10000} categories={ab} />
        <GoalBar variant="chart" size="large" target={10000} categories={ab} />
      </div>
    ),
    code: `<GoalBar variant="chart" size="small" target={10_200_000} value={6_600_000} />
<GoalBar variant="chart" size="medium" target={10000} categories={[…]} />
<GoalBar variant="chart" size="large" target={10000} categories={[…]} />`,
  },
  {
    id: 'over',
    title: 'At and over target',
    description: 'No gap and no headroom: the segments run on past the line. When the total passes the end of the track, the scale re-bases on the total and the line moves off 75%.',
    render: () => (
      <div className="docs-stack">
        <GoalBar variant="chart" target={10000} value={10000} />
        <GoalBar variant="chart" target={10000} value={12000} />
        <GoalBar variant="chart" target={10000} value={16000} />
      </div>
    ),
    code: `<GoalBar variant="chart" target={10000} value={10000} />
<GoalBar variant="chart" target={10000} value={12000} />
<GoalBar variant="chart" target={10000} value={16000} />`,
  },
  {
    id: 'colours',
    title: 'Category colours',
    description: 'The department walk (Fire, Wood, Earth, Water, Gold), then Purple and Turquoise, then Neutral-4. One value is Obsidian.',
    render: () => (
      <GoalBar
        variant="chart"
        target={10000}
        categories={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(l => ({ label: `Category ${l}`, value: 1000 }))}
      />
    ),
    code: `<GoalBar variant="chart" target={10000} categories={[…eight categories…]} />`,
  },
  {
    id: 'row',
    title: 'Label row instead of the legend',
    description: '`labels="row"`: Total, Gap and Target on one line. Narrow it and Gap gives way, but only if that keeps the row on one line.',
    render: () => <GoalBar variant="chart" labels="row" target={10000} categories={ab} />,
    code: `<GoalBar variant="chart" labels="row" target={10000} categories={[…]} />`,
  },
  {
    id: 'table',
    title: 'In a table',
    description: 'An 8px rail for a table cell, with the target\'s short value above the line. Space is reserved above and below so the rail sits on the row\'s centreline.',
    render: () => (
      <div className="docs-stack">
        <GoalBar variant="table" target={10_200_000} value={6_600_000} />
        <GoalBar variant="table" target={4_600_000} value={4_600_000} />
        <GoalBar variant="table" target={2_100_000} value={2_800_000} />
      </div>
    ),
    code: `<td><GoalBar variant="table" target={10_200_000} value={6_600_000} /></td>`,
  },
  {
    id: 'empty',
    title: 'No data yet',
    description: 'No categories: an empty track to the target with headroom past it, no gap, no legend, and a footer saying there is no data yet.',
    render: () => <GoalBar title="Progress to Goal" target={10000} categories={[]} />,
    code: `<GoalBar title="Progress to Goal" target={10000} categories={[]} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'target', options: 'number', default: '—', required: true, description: 'The named target, drawn at 75% of the track.' },
  { name: 'value', options: 'number', default: '—', description: 'One value toward the target, drawn in Obsidian. Use this or `categories`.' },
  { name: 'categories', options: '{ label: string; value: number; color?: GoalBarColor }[]', default: '—', description: 'A breakdown, stacked in order and coloured by the department walk.' },
  { name: 'variant', options: "'card' | 'chart' | 'table'", default: "'card'", description: 'Its own container, the chart area only, or an 8px rail for a table cell.' },
  { name: 'size', options: "'small' | 'medium' | 'large'", default: "'medium'", description: 'The bar\'s height, radius and overhang (Card and Chart). Text never changes.' },
  { name: 'title / headingLevel', options: 'string / 2–6', default: '— / 3', description: 'The Card variant\'s heading. The look is always h5.' },
  { name: 'showTarget', options: 'boolean', default: 'true', description: 'The Card variant\'s figures, top-right.' },
  { name: 'labels', options: "'legend' | 'row' | 'none'", default: "'legend'; 'row' at small; 'none' in a table", description: 'What names the values: the legend and target tag, one compact row, or nothing.' },
  { name: 'rowShowsGap', options: 'boolean', default: 'true', description: 'Whether the label row names the Gap while short. False where the row names only Total and Target (Pacing card).' },
  { name: 'compact', options: 'boolean', default: 'true at small and in a table', description: 'Short numbers from 1M up ("RM10.2M"). Otherwise money always shows 2 decimals ("RM 6,000.00").' },
  { name: 'currency', options: 'string', default: "'RM'", description: 'The unit before every value; "" for a plain count.' },
  { name: 'footer', options: 'string', default: '—', description: 'One footnote line under a rule (Card variant).' },
  { name: 'summary', options: 'string', default: '"{total} of {target} target, {n}%."', description: 'The spoken summary of the chart.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Use it when there is a named target the reader should see against the total.',
    'Let the headroom past the target draw: that space is the point.',
    'Use Medium or Large when the category breakdown matters.',
    'In a narrow table, let the table scroll or drop the bar column (`priority="low"`).',
  ],
  dont: [
    'Don\'t use it as a plain percentage bar with no target: use Progress Bar.',
    'Don\'t put several categories in a Small bar and expect them to be told apart.',
    'Don\'t add a Target row to the legend: the tag already labels it.',
    'Don\'t put the reason for the target inside the bar; it belongs to the surface around it.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None. The bar is read-only and takes no focus.',
  notes: [
    'The chart area is `role="img"`, named by its summary ("RM 6,000.00 of RM 10,000.00 target, 60%."), so it is never read as empty boxes. Override it with `summary`.',
    'The legend pairs each colour with its label and value; the gap is a dashed outline as well as Red, so colour is never the only signal.',
    'In forced colours the segments, swatches and target line keep their colours and the track takes an outline.',
  ],
};

export const motion = 'None. The bar is static: it draws at its values and doesn\'t animate, so there is nothing to reduce.';
