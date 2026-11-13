// Documentation for Stat / KPI card, rendered by the docs site (playground).
// Keep it consistent with StatCard.usage.md. Not part of the package build.
import { useState } from 'react';
import { Fire } from '@phosphor-icons/react';
import { StatCard, StatGrid } from './StatCard';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Stat / KPI card';

export const group = 'Cards';

export const description =
  'A dashboard tile for one metric: an uppercase label, the value, and optionally a trend against a period, an icon chip, a description and a footer. Secondary steps the value down for a supporting figure, with an optional goal rail.';

export const usage = `import { StatCard, StatGrid } from '@collabrium/ui';

export function Summary() {
  return (
    <StatGrid>
      <StatCard label="Total spend" value="RM 48,200.00" trend={{ direction: 'up', value: '12.4%', period: 'vs last month' }} />
      <StatCard label="Open tickets" value="86" trend={{ direction: 'down', value: '3.1%', period: 'vs last week' }} />
    </StatGrid>
  );
}`;

export const thumbnail = () => <StatCard label="Total spend" value="$48.2k" trend={{ direction: 'up', value: '12.4%', period: 'vs last month' }} />;

function InteractiveExample() {
  const [opened, setOpened] = useState(0);
  return (
    <StatGrid>
      <StatCard label="Open tickets" value="86" trend={{ direction: 'down', value: '3.1%', period: 'vs last week' }} onClick={() => setOpened((n) => n + 1)} description={opened ? `Opened ${opened}×` : 'Opens the ticket queue'} />
    </StatGrid>
  );
}

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Stat grid',
    element: '<div>.cui-stat-grid',
    description: 'As many columns as fit at 180px or wider, 16px apart. Every tile in a row is as tall as the tallest: the label and value stay at the top, and whatever follows the value sits at the bottom, so the last lines line up.',
    children: [
      {
        name: 'Stat card',
        element: '<div>.cui-card.cui-stat',
        description: 'Card\'s surface: Neutral-1, 1px Neutral-3, radius-lg, shadow-1, 16px padding, 8px between parts.',
        children: [
          { name: 'Label', element: '.cui-stat__label', description: 'Caption, bold, eyebrow tracking, uppercase, Neutral-5. The metric\'s name.' },
          { name: 'Icon chip', element: 'Card\'s IconChip', when: 'icon', description: 'Top right, 40px, the owning element\'s colour on its 12% tint. Fill.' },
          { name: 'Value', element: '.cui-stat__value', description: 'h1 (32px / 800), Neutral-9. Display (40px) for the one hero tile; h4 (20px) in Secondary, with a footnote unit.' },
          { name: 'Trend', element: '.cui-stat__trend', when: 'trend', description: 'A Fill caret (14px), the change and the period: caption bold. Green up, Red down, Neutral-5 flat; the period Neutral-5.' },
          { name: 'Goal rail', element: 'Progress-to-Goal Bar, in-table', when: 'secondary + goal', description: 'The 8px rail with its target line, and "N% of target achieved" 6px under it.' },
          { name: 'Sparkline', element: '.cui-stat__sparkline', when: 'sparkline', description: 'A small chart under the trend.' },
          { name: 'Description', element: '.cui-stat__desc', when: 'description', description: 'Caption, Neutral-5, no divider.' },
          { name: 'Footer', element: '.cui-stat__footer', when: 'footer', description: 'Caption, Neutral-5, under a 1px Neutral-3 line (8px above it, 12px padding).' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'A row of tiles',
    description: 'One value per tile. A trend only for a genuine comparison against a stated period; flat says "No change".',
    render: () => (
      <StatGrid>
        <StatCard label="Total spend" value="$48.2k" icon={Fire} trend={{ direction: 'up', value: '12.4%', period: 'vs last month' }} />
        <StatCard label="Open tickets" value="86" trend={{ direction: 'down', value: '3.1%', period: 'vs last week' }} footer="As of 9:41am" />
        <StatCard label="Active campaigns" value="14" trend={{ direction: 'flat' }} />
        <StatCard label="Net margin" value="-RM14.2k" negative trend={{ direction: 'down', value: '8.6%', period: 'vs last month' }} />
      </StatGrid>
    ),
    code: `<StatGrid>
  <StatCard label="Total spend" value="$48.2k" icon={Fire} trend={{ direction: 'up', value: '12.4%', period: 'vs last month' }} />
  <StatCard label="Open tickets" value="86" trend={{ direction: 'down', value: '3.1%', period: 'vs last week' }} footer="As of 9:41am" />
  <StatCard label="Active campaigns" value="14" trend={{ direction: 'flat' }} />
  <StatCard label="Net margin" value="-RM14.2k" negative trend={{ direction: 'down', value: '8.6%', period: 'vs last month' }} />
</StatGrid>`,
  },
  {
    id: 'descriptions',
    title: 'With a description on every tile',
    description: 'A row of peers with a line of context each. Give every tile a description, or none, so the row reads evenly.',
    render: () => (
      <StatGrid>
        <StatCard label="Requests received" value="206" description="Across every channel" />
        <StatCard label="Days to complete" value="4.2" description="Median, request to done" />
        <StatCard label="Projects completed" value="38" description="12 more than last year" />
        <StatCard label="Tasks completed" value="1,142" description="About 22 a week" />
      </StatGrid>
    ),
    code: `<StatGrid>
  <StatCard label="Requests received" value="206" description="Across every channel" />
  <StatCard label="Days to complete" value="4.2" description="Median, request to done" />
  <StatCard label="Projects completed" value="38" description="12 more than last year" />
  <StatCard label="Tasks completed" value="1,142" description="About 22 a week" />
</StatGrid>`,
  },
  {
    id: 'secondary',
    title: 'Secondary, beside a primary tile',
    description: 'A supporting figure steps down to h4: a denominator or rate unit, a goal rail with its achieved line, or a description. No trend.',
    render: () => (
      <StatGrid>
        <StatCard label="Revenue this month" value="RM 2.1M" trend={{ direction: 'up', value: '6.2%', period: 'vs last month' }} />
        <StatCard variant="secondary" label="Where the month is" value="Day 6" unit="of 31" goal={{ value: 39.75, target: 75 }} />
        <StatCard variant="secondary" label="Daily run rate needed" value="RM144k" unit="a day" description="To reach target by day 31" />
      </StatGrid>
    ),
    code: `<StatGrid>
  <StatCard label="Revenue this month" value="RM 2.1M" trend={{ direction: 'up', value: '6.2%', period: 'vs last month' }} />
  <StatCard variant="secondary" label="Where the month is" value="Day 6" unit="of 31" goal={{ value: 39.75, target: 75 }} />
  <StatCard variant="secondary" label="Daily run rate needed" value="RM144k" unit="a day" description="To reach target by day 31" />
</StatGrid>`,
  },
  {
    id: 'hero',
    title: 'One hero tile',
    description: 'The single featured metric in a row, at display size. Never more than one per row.',
    render: () => (
      <StatGrid>
        <StatCard label="Total reach" value="16.2M" hero trend={{ direction: 'up', value: '4.0%', period: 'vs last quarter' }} />
        <StatCard label="Campaigns" value="14" trend={{ direction: 'flat' }} />
        <StatCard label="Spend" value="$48.2k" trend={{ direction: 'up', value: '12.4%', period: 'vs last quarter' }} />
      </StatGrid>
    ),
    code: `<StatGrid>
  <StatCard label="Total reach" value="16.2M" hero trend={{ direction: 'up', value: '4.0%', period: 'vs last quarter' }} />
  <StatCard label="Campaigns" value="14" trend={{ direction: 'flat' }} />
  <StatCard label="Spend" value="$48.2k" trend={{ direction: 'up', value: '12.4%', period: 'vs last quarter' }} />
</StatGrid>`,
  },
  {
    id: 'interactive',
    title: 'Interactive',
    description: 'With `href` or `onClick` the whole tile opens what is behind the metric: shadow-2 on hover and the focus halo, as Card.',
    render: () => <InteractiveExample />,
    code: `<StatCard label="Open tickets" value="86" trend={{ direction: 'down', value: '3.1%', period: 'vs last week' }} href="/tickets" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: 'The metric\'s name.' },
  { name: 'value', options: 'ReactNode', default: '—', required: true, description: 'The one value, formatted.' },
  { name: 'variant', options: "'primary' | 'secondary'", default: "'primary'", description: 'Secondary: a supporting figure, the value at h4.' },
  { name: 'trend', options: '{ direction, value?, period? }', default: '—', description: 'Primary only. `up`, `down` or `flat` ("No change").' },
  { name: 'hero', options: 'boolean', default: 'false', description: 'Primary only: the one featured tile, display size.' },
  { name: 'unit', options: 'ReactNode', default: '—', description: 'Secondary only: "of 31", "a day".' },
  { name: 'goal', options: '{ value, target }', default: '—', description: 'Secondary only: the goal rail and "N% of target achieved".' },
  { name: 'icon / element', options: 'Icon / CardElement', default: "— / 'water'", description: 'The icon chip, top right.' },
  { name: 'sparkline', options: 'ReactNode', default: '—', description: 'Primary only: a small chart under the trend, e.g. `<SparklineChart>` from `@collabrium/ui/charts-extra`.' },
  { name: 'description', options: 'ReactNode', default: '—', description: 'A caption line. On every tile in a row, or none.' },
  { name: 'footer', options: 'ReactNode', default: '—', description: 'A line under a divider ("As of 9:41am").' },
  { name: 'negative', options: 'boolean', default: 'false', description: 'The value is below zero: Red border and value.' },
  { name: 'href / onClick', options: 'string / () => void', default: '—', description: 'Makes the whole tile a link or a button.' },
  { name: 'StatGrid children', options: 'StatCard[]', default: '—', description: 'Columns of 180px or wider, 16px apart, equal height.' },
];

export const rules: DocsRules = {
  do: [
    'Show exactly one value per tile.',
    'Give every tile in a row a description, or none.',
    'Pair a Secondary tile with a primary one in the same row.',
    'Caption a goal rail with its achieved percentage (built in).',
  ],
  dont: [
    'Don\'t stack two KPIs in one tile: that is a table row.',
    'Don\'t colour a trend for decoration: only for a real comparison against a stated period.',
    'Don\'t use `negative` because a number is falling: it marks values below zero.',
    'Don\'t centre a tile\'s content to fill a taller row: it stays at the top.',
    'Don\'t mix a hero tile with another hero, or Secondary with primary among peers.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'Only the Interactive variant takes focus: Tab reaches the tile\'s link or button, Enter opens it.',
  notes: [
    'Read in order: the label, the value, then the trend.',
    'The trend\'s arrow and colour are not spoken, so its direction is read as a word: "Up 12.4% vs last month".',
    'The goal rail is one image, read as "53.0% of target achieved."',
    'Interactive: the label is a real link or button stretched over the tile, described by the value and the trend.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover (Interactive)', motion: 'Card\'s shadow lift.', token: '--duration-base · --ease-settle' },
];
