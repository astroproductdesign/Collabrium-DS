// Documentation for Ad Placement Card, rendered by the docs site (playground).
// Keep it consistent with AdPlacementCard.usage.md. Not part of the package build.
import { Article, Browser, Columns, Rows } from '@phosphor-icons/react';
import { AdPlacementCard } from './AdPlacementCard';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Ad Placement Card';

export const group = 'Cards';

export const description =
  'A floating card that describes one ad slot on a placement map while it is pointed at or focused: what it is, where it sits, its sizes and devices, and how many catalogue units fit. A Card by surface, a Tooltip by behaviour.';

export const usage = `import { AdPlacementCard } from '@collabrium/ui';
import { Article } from '@phosphor-icons/react';

export function ArticleSlot() {
  return (
    <AdPlacementCard
      icon={Article}
      title="In the article"
      where="Between paragraphs"
      description="Sits inline with the story, so it is seen in the reader’s own scroll."
      sizes={['300×250', '640×360', '336×280', '320×480']}
      devices={['Desktop', 'Tablet', 'Mobile']}
      fit={{ count: 14, total: 38, built: 5 }}
      cta="Select to filter the catalogue"
    >
      <button type="button" className="slot" onClick={filterBySlot} />
    </AdPlacementCard>
  );
}`;

// The DLS gallery's card (preview.html 2808–2823).
const article = {
  icon: Article,
  title: 'In the article',
  where: 'Between paragraphs',
  description: 'Sits inline with the story, so it is seen in the reader’s own scroll.',
  sizes: ['640×360', '320×480', '336×280', '300×250'],
  devices: ['Desktop', 'Tablet', 'Mobile'],
  fit: { count: 14, total: 38, built: 5 },
  cta: 'Select to filter the catalogue',
};

export const thumbnail = () => <AdPlacementCard inline {...article} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Ad Placement Card',
    element: '<div role="tooltip">.cui-card[data-card="ad-placement"]',
    description: 'The base Card surface raised to shadow-3, 268px wide, at <body> level, above modals. Never takes the pointer.',
    children: [
      {
        name: 'Head',
        element: '.cui-ad-placement-card__head',
        description: 'A two-column grid, 12px between icon and text, 8px below.',
        children: [
          { name: 'Icon', element: '<svg>.cui-ad-placement-card__icon', description: 'The slot\'s glyph, Fill, 20px, Navy, centred on the first two lines of the head.' },
          { name: 'Title', element: '.cui-ad-placement-card__title', description: 'h5, Neutral-9, wraps.' },
          { name: 'Where', element: '.cui-ad-placement-card__where', description: 'Caption, Neutral-5.' },
        ],
      },
      { name: 'Description', element: '<p>.cui-ad-placement-card__desc', description: 'One sentence, body2, Neutral-6.' },
      { name: 'Facts', element: '<dl>.cui-ad-placement-card__facts', description: 'Sizes, then Runs on: an 11px uppercase label and a body2 bold value, on one shared grid. Values wrap.' },
      { name: 'Fit', element: '<p>.cui-ad-placement-card__fit', description: 'A Neutral-2 rule, then the count at h4 and "of 38 units fit here · 5 built for it" in caption.' },
      { name: 'CTA hint', element: '<p>.cui-ad-placement-card__cta', description: 'Optional. A 14px arrow toward the catalogue and a caption-bold line. Not a button.' },
    ],
  },
];

// In reading order, so Tab moves through the map as it looks: top, article, rail, feed.
const slots = [
  {
    key: 'top',
    icon: Browser,
    title: 'Top of page',
    where: 'Above the masthead',
    description: 'The first thing on the page, seen before anyone scrolls.',
    sizes: ['728×90', '970×250', '320×50', '970×90', '320×100', '16:9 pre-roll'],
    devices: ['Desktop', 'Tablet', 'Mobile', 'Connected TV'],
    fit: { count: 9, total: 38, built: 2 },
    cta: 'Select to filter the catalogue',
    label: 'Top',
  },
  { ...article, key: 'article', label: 'Article' },
  {
    key: 'side',
    icon: Columns,
    title: 'Beside the article',
    where: 'Right rail, desktop only',
    description: 'Stays in view beside the story as the reader scrolls.',
    sizes: ['300×600', '160×600'],
    devices: ['Desktop'],
    fit: { count: 0, total: 38 },
    cta: 'Select to filter the catalogue',
    label: 'Rail',
  },
  {
    key: 'feed',
    icon: Rows,
    title: 'In the feed',
    where: 'Between stories',
    description: 'Takes the shape of the stories around it.',
    sizes: [],
    devices: [],
    fit: { count: 6, total: 38 },
    label: 'Feed',
  },
];

export const examples: DocsExample[] = [
  {
    id: 'map',
    title: 'On a placement map',
    description: 'Point at a slot and the card follows the pointer; Tab to a slot and it sits beside it. Escape hides it until you leave the slot. The card never takes the pointer, and only one shows at a time.',
    render: () => (
      <div className="docs-placement-map" aria-label="Placement map">
        {slots.map(({ key, label, ...slot }) => (
          <AdPlacementCard key={key} {...slot}>
            <button type="button" className="docs-placement-slot" data-slot={key}>
              {label}
            </button>
          </AdPlacementCard>
        ))}
      </div>
    ),
    code: `<AdPlacementCard
  icon={Browser}
  title="Top of page"
  where="Above the masthead"
  description="The first thing on the page, seen before anyone scrolls."
  sizes={['728×90', '970×250', '320×50', '970×90', '320×100', '16:9 pre-roll']}
  devices={['Desktop', 'Tablet', 'Mobile', 'Connected TV']}
  fit={{ count: 9, total: 38, built: 2 }}
  cta="Select to filter the catalogue"
>
  <button type="button" className="slot">Top</button>
</AdPlacementCard>`,
  },
  {
    id: 'default',
    title: 'The card',
    description: 'Drawn in the page flow here (`inline`) so it can be read. Sizes run largest first; devices are in sentence case.',
    render: () => <AdPlacementCard inline {...article} />,
    code: `<AdPlacementCard
  inline
  icon={Article}
  title="In the article"
  where="Between paragraphs"
  description="Sits inline with the story, so it is seen in the reader’s own scroll."
  sizes={['640×360', '320×480', '336×280', '300×250']}
  devices={['Desktop', 'Tablet', 'Mobile']}
  fit={{ count: 14, total: 38, built: 5 }}
  cta="Select to filter the catalogue"
/>`,
  },
  {
    id: 'more-sizes',
    title: 'More than four sizes',
    description: 'The first four by area, then "+N". A size that isn\'t W×H ("16:9 pre-roll") goes last. A long title wraps and the icon moves to the title\'s first two lines.',
    render: () => (
      <AdPlacementCard
        inline
        icon={Browser}
        title="Top of page, above the masthead banner"
        where="Above the masthead"
        description="The first thing on the page, seen before anyone scrolls."
        sizes={['728×90', '970×250', '320×50', '970×90', '320×100', '16:9 pre-roll']}
        devices={['Desktop', 'Tablet', 'Mobile', 'Connected TV']}
        fit={{ count: 9, total: 38, built: 2 }}
        cta="Select to filter the catalogue"
      />
    ),
    code: `<AdPlacementCard
  inline
  icon={Browser}
  title="Top of page, above the masthead banner"
  where="Above the masthead"
  description="The first thing on the page, seen before anyone scrolls."
  sizes={['728×90', '970×250', '320×50', '970×90', '320×100', '16:9 pre-roll']}
  devices={['Desktop', 'Tablet', 'Mobile', 'Connected TV']}
  fit={{ count: 9, total: 38, built: 2 }}
  cta="Select to filter the catalogue"
/>`,
  },
  {
    id: 'empty',
    title: 'Missing data, and none fit',
    description: 'No sizes reads "No fixed size", no devices "Not on file", both in Neutral-5. When nothing fits the count is a grey 0, "— none yet", and the CTA is left out.',
    render: () => (
      <div className="docs-row">
        <AdPlacementCard inline icon={Rows} title="In the feed" where="Between stories" description="Takes the shape of the stories around it." sizes={[]} devices={[]} fit={{ count: 6, total: 38 }} />
        <AdPlacementCard inline icon={Columns} title="Beside the article" where="Right rail, desktop only" description="Stays in view beside the story as the reader scrolls." sizes={['300×600', '160×600']} devices={['Desktop']} fit={{ count: 0, total: 38 }} cta="Select to filter the catalogue" />
      </div>
    ),
    code: `<AdPlacementCard inline icon={Rows} title="In the feed" where="Between stories" description="…" sizes={[]} devices={[]} fit={{ count: 6, total: 38 }} />
<AdPlacementCard inline icon={Columns} title="Beside the article" where="Right rail, desktop only" description="…" sizes={['300×600', '160×600']} devices={['Desktop']} fit={{ count: 0, total: 38 }} cta="Select to filter the catalogue" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'icon', options: 'Icon (Phosphor)', default: '—', required: true, description: 'The slot\'s glyph, drawn Fill in Navy.' },
  { name: 'title / where', options: 'string / string', default: '—', required: true, description: 'The slot\'s label and where it sits. The slot is named "{title}, {where}" unless it has its own `aria-label`.' },
  { name: 'description', options: 'string', default: '—', required: true, description: 'One sentence.' },
  { name: 'sizes', options: 'string[]', default: '—', required: true, description: 'Sorted largest first; the first four, then "+N". Empty reads "No fixed size".' },
  { name: 'devices', options: 'string[]', default: '—', required: true, description: 'Shown in sentence case. Empty reads "Not on file".' },
  { name: 'fit', options: '{ count: number; total: number; built?: number }', default: '—', required: true, description: 'Units that fit, of the catalogue\'s total, and how many were built for it.' },
  { name: 'cta', options: 'string', default: '—', description: 'The hint line, e.g. "Select to filter the catalogue". Left out when nothing fits.' },
  { name: 'ctaDirection', options: "'down' | 'up' | 'left' | 'right'", default: "'down'", description: 'Which way the hint\'s arrow points: toward the catalogue.' },
  { name: 'children', options: 'ReactElement', default: '—', description: 'The slot: one real `<button>` on the map. It gets `aria-describedby` and the pointer and focus handlers.' },
  { name: 'inline', options: 'boolean', default: 'false', description: 'Draws the card in the page flow, visible, with no slot. For documentation only.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the card\'s `<div>`. `style` and `className` are not accepted. The ref is forwarded to the `<div>`.' },
];

export const rules: DocsRules = {
  do: [
    'Make every slot a real button, and the thing people act on.',
    'Keep both fact rows and the fit line on every card, even when a value is missing.',
    'Show 0 when nothing fits; hiding the line reads as missing data.',
    'Give touch screens a list of the slots: the card never shows there.',
  ],
  dont: [
    'Don\'t put links or buttons in the card: it never takes the pointer.',
    'Don\'t use it for an ad format (Media Ad Card) or a one-line hint (Tooltip).',
    'Don\'t colour a slot by format family: slots are always Navy.',
    'Don\'t make the card the only place the information lives.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Focusing a slot shows its card beside it; leaving hides it.' },
    { keys: 'Escape', action: 'Hides the card; focus stays on the slot. It stays hidden until you leave the slot and come back, or focus another.' },
    { keys: 'Enter / Space', action: 'Activates the slot (the host\'s action, e.g. filtering the catalogue).' },
  ],
  notes: [
    'The card is `role="tooltip"` and always in the DOM, so the slot\'s `aria-describedby` (description, facts, fit and hint) reaches it whether or not it shows, and on touch, where it never shows.',
    'The slot is named "{title}, {where}" unless it has its own `aria-label`.',
    'Escape is caught only while a card shows, so it doesn\'t also close a modal underneath.',
    'A mouse click that moves focus to a slot doesn\'t show the card; keyboard focus does.',
    'Scrolling and resizing hide it; while a slot holds keyboard focus, a scroll moves the card with it instead. In forced colours the edge and the fit rule are drawn in the text colour.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Show and hide', motion: 'Fades in and rises 4px into place; hides the same way. No delay either way. Under reduced motion, the fade only.', token: '--duration-fast · --ease-standard (fade) · --ease-settle (rise)' },
];
