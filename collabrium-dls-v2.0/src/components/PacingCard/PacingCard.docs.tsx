// Documentation for Pacing card, rendered by the docs site (playground).
// Keep it consistent with PacingCard.usage.md. Not part of the package build.
import { CardGrid } from '../Card';
import { PacingCard } from './PacingCard';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../docs.types';

export const title = 'Pacing card';

export const group = 'Cards';

export const description =
  'One metric racing a deadline to a target: the label, a headline figure, a Total-and-Target rail, a status badge and a footer with the day and the rate needed.';

export const usage = `import { CardGrid, PacingCard } from '@collabrium/ui';

export function ChannelPacing() {
  return (
    <CardGrid>
      <PacingCard
        label="TV"
        kpi={11_400_000}
        kpiQualifier="forecast"
        value={6_600_000}
        target={10_200_000}
        day={18}
        days={31}
      />
    </CardGrid>
  );
}`;

const tv = { label: 'TV', kpi: 11_400_000, kpiQualifier: 'forecast', value: 6_600_000, target: 10_200_000, day: 18, days: 31 };
const ooh = { label: 'Out of home', kpi: 5_600_000, kpiQualifier: 'forecast', value: 4_900_000, target: 4_200_000, day: 18, days: 31, metOnDay: 15 };

export const thumbnail = () => (
  <CardGrid>
    <PacingCard {...tv} />
  </CardGrid>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Pacing card',
    element: '<div>.cui-card[data-card="pacing"]',
    description: 'The base Card, unmodified, with a 12px gap between its five bands.',
    children: [
      { name: 'Label', element: '<h3>.cui-pacing-card__label', description: 'h4 (20px/800), Neutral-9: larger than Card\'s h5 title, so a channel is found fast in a grid.' },
      { name: 'Headline figure', element: '.cui-pacing-card__kpi', description: 'h3, tabular figures, with an optional caption qualifier ("forecast") on its baseline, 8px apart.' },
      { name: 'Minibar', element: 'GoalBar variant="table"', description: 'An 8px rail, the target line at 75%, no legend or gap outline; Total flush left and Target flush right below it.' },
      { name: 'Status', element: '.cui-pacing-card__status > Badge', description: '"64.7% to target", to 1 decimal: Red below 100%, Green at or above. In a row, so it doesn\'t stretch.' },
      { name: 'Footer', element: 'CardFooter', description: 'Required: "Day 18 of 31 · RM277k a day to reach target", or "· target met on day 15".' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'short-and-met',
    title: 'Short of target, and target met',
    description: 'Below 100% the badge is Red and the footer gives the daily rate needed; once the target is met the badge is Green and the footer says when.',
    render: () => (
      <CardGrid>
        <PacingCard {...tv} />
        <PacingCard {...ooh} />
      </CardGrid>
    ),
    code: `<PacingCard label="TV" kpi={11_400_000} kpiQualifier="forecast" value={6_600_000} target={10_200_000} day={18} days={31} />
<PacingCard label="Out of home" kpi={5_600_000} kpiQualifier="forecast" value={4_900_000} target={4_200_000} day={18} days={31} metOnDay={15} />`,
  },
  {
    id: 'early',
    title: 'Early in the period',
    description: 'On day 2 of 31 almost everything is below target, so every badge would be Red. `badge="neutral"` quiets it until "behind" means something. Never a third colour.',
    render: () => (
      <CardGrid>
        <PacingCard label="Radio" kpi={3_100_000} kpiQualifier="forecast" value={240_000} target={3_400_000} day={2} days={31} badge="neutral" />
      </CardGrid>
    ),
    code: `<PacingCard label="Radio" kpi={3_100_000} kpiQualifier="forecast" value={240_000} target={3_400_000} day={2} days={31} badge="neutral" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'string', default: '—', required: true, description: 'The thing being paced, a short proper noun ("TV").' },
  { name: 'headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '3', description: 'The label\'s heading level; the look is always h4.' },
  { name: 'kpi / kpiQualifier', options: 'number / string', default: '— / —', required: true, description: 'The headline figure (short form from 1M) and what it is ("forecast").' },
  { name: 'value', options: 'number', default: '—', required: true, description: 'The accumulating actual: the rail\'s Total.' },
  { name: 'target', options: 'number', default: '—', required: true, description: 'The target known in advance: the rail\'s Target.' },
  { name: 'day / days', options: 'number / number', default: '—', required: true, description: 'Where the period is, and how long it is: "Day 18 of 31".' },
  { name: 'metOnDay', options: 'number', default: '—', description: 'The day the target was met, for the footer once it is.' },
  { name: 'currency', options: 'string', default: "'RM'", description: 'The unit before every value.' },
  { name: 'badge', options: "'status' | 'neutral'", default: "'status'", description: 'Red below 100%, Green at or above; or Neutral early in a period.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the card\'s `<div>`. `style` and `className` are not accepted. The ref is forwarded to the `<div>`.' },
];

export const rules: DocsRules = {
  do: [
    'Use it only when there is a target, an accumulating actual and a time boundary.',
    'Keep the footer on every card: it is the time boundary.',
    'Put Pacing cards in a `CardGrid`.',
    'Quiet the badge to Neutral early in a period if Red is too loud.',
  ],
  dont: [
    'Don\'t use it without all three: use a Stat / KPI card.',
    'Don\'t add a trend row: a real trend belongs in a line chart.',
    'Don\'t add a third badge colour.',
    'Don\'t rely on rail colours for a breakdown: use the Progress-to-Goal Bar\'s Card variant.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None. The card is read-only and takes no focus.',
  notes: [
    'The label is a real heading.',
    'The rail is an image named by its summary ("RM6.6M of a RM10.2M target, 64.7% to target.").',
    'The badge prints the percentage, so its colour is never the only signal.',
  ],
};

export const motion = 'None. The card is static, so there is nothing to reduce.';
