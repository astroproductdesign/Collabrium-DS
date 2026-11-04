// Overview of the Cards group, rendered by the docs site (playground). The
// parts are the base Card and the card types the DLS builds on it (its Card
// section's variants). Grouped by the user's decision of 2026-11-04.
import { Card, CardHeader, CardTitle } from '../../../src';
import { Drop } from '@phosphor-icons/react';
import type { GroupOverviewDocs } from '../../lib/group-types';

export const title = 'Cards';

export const description =
  'The base Card and every card type built on it: selectable cards, feature tiles, price summaries and the rest. One surface, one grid, the same title and footer.';

export const thumbnail = () => (
  <div className="docs-row">
    <Card>
      <CardHeader icon={Drop} title="Weekly report" subtitle="Updated 2 hours ago" />
    </Card>
    <Card selectLabel="Select Q3 plan" defaultSelected>
      <CardTitle>Q3 plan</CardTitle>
    </Card>
  </div>
);

export const overview: GroupOverviewDocs['overview'] = [
  'Every card in Collabrium starts from the base Card: Neutral-1, a 1px Neutral-3 border, radius-lg, shadow-1 and 16px padding, with an optional icon-chip header and footer. The card types here add what one job needs and keep the rest.',
  'Some types are settings on Card itself (Selectable card is a Card with a `selectLabel`; USP card is a Card at the functional width with a `CardList`). Others are their own component built on Card (`PriceSummaryCard`). Each page says which.',
];

export const flow: GroupOverviewDocs['flow'] = [
  { title: 'Start from Card', description: 'A tile, a list item or a panel is the base Card in a `CardGrid`. Give its title an `href` or an `onClick` to make the whole card clickable.' },
  { title: 'Pick the type by job', description: 'Ticking cards for a bulk action is Selectable card; a feature with three points and a button is USP card; a running list of costs toward a total is Price summary card.' },
  { title: 'Lay them out in a grid', description: 'Put every card in a `CardGrid`. Cards that need room (USP, Price summary) use `columns="functional"`, so no column is narrower than 280px.' },
];

export const rulesIntro = 'These rules apply to every card in this group.';

export const rules: GroupOverviewDocs['rules'] = [
  'The grid decides how many columns there are, never the card. A card fills its cell and has no fixed width.',
  'A card is clickable through its title (a real link or button), never by wrapping the whole card in one.',
  'An element accent, tint or icon chip says which department owns the content; use only the element that owns it.',
  'The card title is drawn as h5 at every heading level.',
];

export const comingSoon: GroupOverviewDocs['comingSoon'] = [
  { title: 'Ad Placement Card', summary: 'A floating hover card for one ad slot on a placement map: what it is, its sizes and where it runs.' },
  { title: 'Campaign card', summary: 'One campaign as a kanban board tile: brand, name, owners, dates and its Pax and Quote figures.' },
  { title: 'Entry Card', summary: 'A compact "start here" tile in a small set, where the whole card is one button that opens one thing.' },
  { title: 'Hero Card', summary: 'A promotional or insight tile with an eyebrow, heading, media and a call to action, in four states.' },
  { title: 'Media Ad Card', summary: 'One ad format as a gallery tile, whose body turns into spec rows when the card goes live on hover or focus.' },
  { title: 'Metrics card', summary: 'A Media Ad Card for an item whose figures matter most: a headline total and up to five bars.' },
  { title: 'Pacing Card', summary: 'One metric racing a deadline toward its target: a headline KPI, a progress minibar and a status badge.' },
];
