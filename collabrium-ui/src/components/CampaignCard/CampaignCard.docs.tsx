// Documentation for Campaign card, rendered by the docs site (playground).
// Keep it consistent with CampaignCard.usage.md. Not part of the package build.
import { CampaignCard } from './CampaignCard';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Campaign card';

export const group = 'Cards';

export const description =
  'One campaign as a tile on a kanban board: brand mark, name, brand, owner faces, then the dates and its Pax and Quote. The column it sits in is the stage, so it carries no stage tag.';

export const usage = `import { CampaignCard } from '@collabrium/ui';

export function RayaTile() {
  return (
    <CampaignCard
      name="Raya Beauty Edit 2026"
      brand="Nadora Beauty"
      owner="Sarah K."
      overseer="Lina M."
      dates={{ start: new Date(2026, 2, 12), end: new Date(2026, 3, 30) }}
      pax={8}
      quote={72500}
      href="/campaigns/raya-beauty-edit"
    />
  );
}`;

// The DLS gallery's three samples (preview.html 2561–2656).
const raya = {
  name: 'Raya Beauty Edit 2026',
  brand: 'Nadora Beauty',
  owner: 'Sarah K.',
  overseer: 'Lina M.',
  dates: { start: new Date(2026, 2, 12), end: new Date(2026, 3, 30) },
  pax: 8,
  quote: 72500,
  href: '#',
};

export const thumbnail = () => (
  <div className="docs-board">
    <CampaignCard {...raya} />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Campaign card',
    element: '<div>.cui-card[data-card="campaign"]',
    description: 'The base Card with no border, a 14px radius, shadow-1 and `height: auto`.',
    children: [
      {
        name: 'Identity row',
        element: '.cui-campaign-card__id',
        description: 'Mark, name stack and faces, 12px apart.',
        children: [
          { name: 'Brand mark', element: '<img> or <span>.cui-campaign-card__mark', description: '32px, 9px radius. A logo on Neutral-1 with a 1px Neutral-3 border, or the placeholder: a Fill buildings glyph in Navy on Water 8%.' },
          { name: 'Name', element: '<h3>.cui-campaign-card__title', description: 'label2, Neutral-9, truncating. Holds the link or button stretched over the card.' },
          { name: 'Lead tag', element: '.cui-campaign-card__lead', description: 'Optional. 20px, 1px dashed Neutral-4, transparent, label3 at 700, uppercase, Neutral-5.' },
          { name: 'Brand line', element: '<p>.cui-campaign-card__brand', description: 'Caption, Neutral-5, truncating. `—` when unknown.' },
          { name: 'Owner faces', element: 'Tooltip > .cui-campaign-card__faces', description: 'One or two 22px circles with a 2px Neutral-1 ring and 10px initials; the overseer overlaps by 7px on a lilac fill. A Tab stop with a tooltip naming both.' },
        ],
      },
      { name: 'Date row', element: '.cui-campaign-card__when', description: 'A full-width 1px divider, then a 12px Regular calendar and the dates at 11px, 500, Neutral-5. `—` in Neutral-4 when unset.' },
      { name: 'Metrics', element: '<dl>.cui-campaign-card__metrics', description: 'Two equal columns, 8px apart: a 10px uppercase label over a 12px bold value. `—` in Neutral-4 when unset.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'settled',
    title: 'A settled campaign',
    description: 'Everything known: dates, Pax and Quote. Hover for shadow-3 and the 1px lift; the cursor is `grab` because the tile can be moved. Hover or tab to the faces for who owns it.',
    render: () => (
      <div className="docs-board">
        <CampaignCard {...raya} />
      </div>
    ),
    code: `<CampaignCard
  name="Raya Beauty Edit 2026"
  brand="Nadora Beauty"
  owner="Sarah K."
  overseer="Lina M."
  dates={{ start: new Date(2026, 2, 12), end: new Date(2026, 3, 30) }}
  pax={8}
  quote={72500}
  href="/campaigns/raya-beauty-edit"
/>`,
  },
  {
    id: 'lead',
    title: 'A lead, nothing filled in',
    description: 'The Lead tag, and the three empty values: the date, Pax and Quote show an em dash in Neutral-4, never a zero, and screen readers hear "Not set". With no owner the face is "?".',
    render: () => (
      <div className="docs-board">
        <CampaignCard name="Merdeka Countdown Bash" brand="Burger King Malaysia" lead href="#" />
      </div>
    ),
    code: `<CampaignCard name="Merdeka Countdown Bash" brand="Burger King Malaysia" lead href="/campaigns/merdeka-bash" />`,
  },
  {
    id: 'dragging',
    title: 'Dragging',
    description: 'The board sets `dragging` on the tile it is moving: it fades to 35% and stays in place. Also a long name truncating against one face.',
    render: () => (
      <div className="docs-board">
        <CampaignCard
          name="Hari Raya Open House Series 2026"
          brand="Chagee Malaysia"
          owner="Aisyah Z."
          dates={{ start: new Date(2026, 8, 1), end: new Date(2026, 8, 30) }}
          pax={30}
          quote={20000}
          href="#"
          dragging
        />
      </div>
    ),
    code: `<CampaignCard
  name="Hari Raya Open House Series 2026"
  brand="Chagee Malaysia"
  owner="Aisyah Z."
  dates={{ start: new Date(2026, 8, 1), end: new Date(2026, 8, 30) }}
  pax={30}
  quote={20000}
  href="/campaigns/hari-raya-open-house"
  dragging
/>`,
  },
  {
    id: 'static',
    title: 'Open only',
    description: 'For a viewer who can open campaigns but not move them, set `movable={false}`: the cursor is a pointer. Nothing else changes.',
    render: () => (
      <div className="docs-board">
        <CampaignCard {...raya} movable={false} />
      </div>
    ),
    code: `<CampaignCard name="Raya Beauty Edit 2026" brand="Nadora Beauty" … movable={false} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'name', options: 'string', default: '—', required: true, description: 'The campaign name, one line, truncating.' },
  { name: 'brand', options: 'string', default: '—', description: 'The brand line. Missing shows an em dash.' },
  { name: 'logo', options: 'string', default: '—', description: 'A square logo URL. Without it the placeholder mark shows.' },
  { name: 'lead', options: 'boolean', default: 'false', description: 'Shows the Lead tag: not in the pipeline yet.' },
  { name: 'owner / overseer', options: 'string / string', default: '—', description: 'Short names ("Sarah K."). The faces show their initials and the tooltip names them. No owner shows "?".' },
  { name: 'dates', options: '{ start: Date; end: Date }', default: '—', description: 'When it runs, "12 Mar 2026 – 30 Apr 2026". Missing shows an em dash in Neutral-4.' },
  { name: 'pax / quote', options: 'number / number', default: '—', description: 'People, and the quote in ringgit, always to 2 decimals ("RM 72,500.00"). Missing shows an em dash in Neutral-4, never 0.' },
  { name: 'headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '3', description: 'The name\'s heading level; the look is always label2.' },
  { name: 'href', options: 'string', default: '—', description: 'Makes the name a link stretched over the card.' },
  { name: 'onOpen', options: '() => void', default: '—', description: 'Makes the name a button stretched over the card.' },
  { name: 'movable', options: 'boolean', default: 'true', description: '`grab` cursor when the viewer can move tiles; `false` for a pointer when they can only open them.' },
  { name: 'dragging', options: 'boolean', default: 'false', description: 'Set by the board while this tile is dragged: 35% opacity, in place.' },
  { name: 'id, aria-*, data-*, drag events, …', options: 'native', default: '—', description: 'Passed to the card\'s `<div>`. `style` and `className` are not accepted. The ref is forwarded to the `<div>`.' },
];

export const rules: DocsRules = {
  do: [
    'Keep it to six facts: mark, name, brand, owners, dates, worth.',
    'Leave unset values out, so they show an em dash, never 0.',
    'Stack tiles in a column that lets each hug its content.',
    'Give the board a "Move to…" control, so a tile can be moved without dragging.',
  ],
  dont: [
    'Don\'t add a stage tag: the column is the stage. Lead is the only tag.',
    'Don\'t give it the base Card\'s border or radius, or stretch it to equal height.',
    'Don\'t remove the tile from its column while it is dragged.',
    'Don\'t use it in a table view: a table needs its own stage cell.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the name (with `href` or `onOpen`), then the owner faces, whose tooltip shows on focus.' },
    { keys: 'Enter', action: 'Opens the campaign from the name (Space too, when it is a button).' },
    { keys: 'Escape', action: 'Hides the faces\' tooltip.' },
  ],
  notes: [
    'The name is a real heading, and a real link or button stretched over the card.',
    'The faces are named by their tooltip text ("Sarah K. · overseen by Lina M."), so the pairing is reachable without a mouse.',
    'Pax and Quote are a description list, so each value is read with its label. An unset value is read as "Not set", not as a dash.',
    'The mark and the calendar are decorative.',
    'Dragging is the board\'s, and the board also offers a "Move to…" control, so a tile can be moved by keyboard, voice or switch (WCAG 2.5.7).',
    'In forced colours the card takes a 1px border, since its shadow isn\'t drawn.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover on a card that opens something', motion: 'Shadow-3 and a 1px lift. Under reduced motion only the shadow changes.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Dragging', motion: 'Fades to 35% opacity, in place.', token: '--duration-fast · --ease-standard' },
];
