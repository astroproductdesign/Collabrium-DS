// Documentation for Media Ad Card, rendered by the docs site (playground).
// Keep it consistent with MediaAdCard.usage.md. Not part of the package build.
import { MediaAdCard, MediaAdCardSkeleton } from './MediaAdCard';
import { CardGrid } from '../Card';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Media Ad Card';

export const group = 'Cards';

export const description =
  'One ad format as a gallery tile: a full-bleed 16:10 media slot, a round Compare toggle, the name and family Tag, and a body that trades its tagline for three spec rows when the card goes Live on hover, focus or a first tap.';

export const usage = `import { CardGrid, MediaAdCard } from '@collabrium/ui';

export function AdFormats() {
  return (
    <CardGrid columns="functional">
      <MediaAdCard
        name="Swipe Gallery"
        family="interactive"
        tagline="A horizontal carousel of product frames that viewers swipe through at their own pace."
        funnel={['Consideration', 'Conversion']}
        objective="Engagement"
        sizes={['300×250', '320×480']}
        benchmark="CTR 2.1%"
        onOpen={() => openFormat('swipe-gallery')}
        onComparedChange={on => setCompare('swipe-gallery', on)}
      />
    </CardGrid>
  );
}`;

const noop = () => {};

const swipe = {
  name: 'Swipe Gallery',
  family: 'interactive' as const,
  tagline: 'A horizontal carousel of product frames that viewers swipe through at their own pace.',
  funnel: ['Consideration', 'Conversion'],
  objective: 'Engagement',
  sizes: ['300×250', '320×480'],
  benchmark: 'CTR 2.1%',
  onOpen: noop,
};

export const thumbnail = () => (
  <CardGrid columns="functional">
    <MediaAdCard {...swipe} />
  </CardGrid>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Media Ad Card',
    element: '<article>.cui-card[data-card="media-ad"]',
    description: 'The base Card surface with its padding and gap zeroed, so the media runs edge to edge.',
    children: [
      { name: 'Frame / Slot', element: '.cui-media-ad-card__frame > __slot', description: '16:10, Neutral-2, clips its child, a 1px Neutral-3 bottom rule. The Live zoom target.' },
      { name: 'Placeholder', element: '.cui-media-ad-card__placeholder', description: 'The default slot child: a frame-corners glyph over a "Media" caption.' },
      { name: 'Compare', element: '<button aria-pressed>.cui-media-ad-card__compare', description: 'Round 32px toggle, top left, above everything; a 44px hit area. Plus at rest, check when pressed.' },
      { name: 'Built for this slot', element: 'Badge', description: 'Optional, bottom left: Neutral-1 fill, dark text, a Fill push-pin in Navy.' },
      { name: 'Tap hint', element: '.cui-media-ad-card__hint', description: '"Tap to play", centred on the media. Touch devices only, until Live.' },
      { name: 'Title row', element: '<h3> > button + Tag', description: 'The name (h5 look, clamped to two lines) as the button stretched over the card; the family Tag on the right, never shrinking.' },
      { name: 'Swap', element: '.cui-media-ad-card__swap', description: 'A fixed-height box holding the Rest layer (tagline, funnel) and the Spec layer (Objective, Sizes, Benchmark), stacked.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Hover, or Tab to it, to go Live: the media zooms, the card lifts and the tagline gives way to the three spec rows. Press C, or the +, to add it to compare.',
    render: () => (
      <CardGrid columns="functional">
        <MediaAdCard {...swipe} />
      </CardGrid>
    ),
    code: `<MediaAdCard
  name="Swipe Gallery"
  family="interactive"
  tagline="A horizontal carousel of product frames that viewers swipe through at their own pace."
  funnel={['Consideration', 'Conversion']}
  objective="Engagement"
  sizes={['300×250', '320×480']}
  benchmark="CTR 2.1%"
  onOpen={openFormat}
/>`,
  },
  {
    id: 'families',
    title: 'Families, missing data and Built for this slot',
    description: 'Each family has one fixed Tag colour. A format with no fixed size shows an em dash; no published benchmark shows "Not published": the three rows are always there, in the same order.',
    render: () => (
      <CardGrid columns="functional">
        <MediaAdCard
          name="Scratch to Reveal"
          family="gamification"
          tagline="Viewers scratch away a cover to uncover the offer underneath."
          funnel={['Awareness', 'Engagement']}
          objective="Engagement"
          benchmark="Engagement 14%"
          builtForSlot
          onOpen={noop}
        />
        <MediaAdCard
          name="Outstream Video"
          family="video"
          tagline="A muted, autoplaying video that opens up between paragraphs of an article."
          funnel={['Awareness']}
          objective="Reach"
          sizes={['16:9', '1:1']}
          onOpen={noop}
        />
        <MediaAdCard
          name="Page Takeover"
          family="high-impact"
          tagline="The whole page skin and the top banner, for one day."
          funnel={['Awareness']}
          objective="Reach"
          sizes={['970×250', '300×600']}
          benchmark="Viewability 82%"
          onOpen={noop}
        />
      </CardGrid>
    ),
    code: `<MediaAdCard name="Scratch to Reveal" family="gamification" … objective="Engagement" benchmark="Engagement 14%" builtForSlot onOpen={openFormat} />
<MediaAdCard name="Outstream Video" family="video" … sizes={['16:9', '1:1']} onOpen={openFormat} />
<MediaAdCard name="Page Takeover" family="high-impact" … onOpen={openFormat} />`,
  },
  {
    id: 'compared',
    title: 'Compared',
    description: 'An Obsidian border with a 1px ring and shadow-3; the toggle fills Obsidian with a check. Compared cards feed the Action bar\'s Item select.',
    render: () => (
      <CardGrid columns="functional">
        <MediaAdCard {...swipe} defaultCompared />
      </CardGrid>
    ),
    code: `<MediaAdCard … compared={picked.has('swipe-gallery')} onComparedChange={on => setCompare('swipe-gallery', on)} />`,
  },
  {
    id: 'tilt',
    title: 'Tilt',
    description: 'With `tilt`, the card leans up to 4deg toward a mouse pointer. Off for touch, the keyboard and reduced motion.',
    render: () => (
      <CardGrid columns="functional">
        <MediaAdCard {...swipe} tilt />
      </CardGrid>
    ),
    code: `<MediaAdCard … tilt />`,
  },
  {
    id: 'loading',
    title: 'Loading',
    description: 'The same shell with Neutral-2 bones, exactly as tall as a loaded card. Hidden from assistive technology: set `aria-busy` on the grid.',
    render: () => (
      <CardGrid columns="functional" aria-busy="true">
        <MediaAdCardSkeleton />
        <MediaAdCardSkeleton />
      </CardGrid>
    ),
    code: `<CardGrid columns="functional" aria-busy="true">
  <MediaAdCardSkeleton />
  <MediaAdCardSkeleton />
</CardGrid>`,
  },
];

export const props: DocsProp[] = [
  { name: 'name', options: 'string', default: '—', required: true, description: 'The format\'s name. Wraps to two lines, then clamps.' },
  { name: 'family', options: "'interactive' | 'gamification' | 'video' | 'social' | 'high-impact' | 'display'", default: '—', required: true, description: 'The family, shown as its fixed-colour Tag.' },
  { name: 'tagline', options: 'string', default: '—', required: true, description: 'One sentence, clamped to two lines. Shown at rest.' },
  { name: 'funnel', options: 'string[]', default: '—', required: true, description: 'The funnel stages, joined by " · " on one line.' },
  { name: 'objective', options: 'string', default: '—', required: true, description: 'The Objective spec row.' },
  { name: 'sizes', options: 'string[]', default: '—', description: 'The Sizes spec row. Leave out for no fixed size: an em dash.' },
  { name: 'benchmark', options: 'string', default: '—', description: 'The Benchmark spec row. Leave out for "Not published".' },
  { name: 'media', options: 'ReactNode', default: 'the placeholder', description: 'Your image, video or preview, stretched to the 16:10 slot.' },
  { name: 'builtForSlot', options: 'boolean', default: 'false', description: 'Shows the "Built for this slot" badge over the media.' },
  { name: 'onOpen', options: '() => void', default: '—', required: true, description: 'Opens the format\'s detail. On touch, the first tap makes the card Live and the second opens it.' },
  { name: 'compared / defaultCompared / onComparedChange', options: 'boolean / boolean / (on) => void', default: '— / false / —', description: 'The Compare toggle\'s state, controlled or not.' },
  { name: 'tilt', options: 'boolean', default: 'false', description: 'Tilts the card toward a mouse pointer.' },
  { name: 'headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '3', description: 'The name\'s heading level; the look is always h5.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the `<article>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Use it for a thing someone could buy or run whose look matters: ad formats, placements, creative templates.',
    'Put it in a `CardGrid columns="functional"` (280px columns).',
    'Keep all three spec rows on every card, in the same order, even when a value is missing.',
    'Pour your own media into the slot: the card owns only the ratio, the clip and the zoom.',
  ],
  dont: [
    'Don\'t use it for a person (Profile card), a campaign (Campaign card) or a metric against a target (Pacing card).',
    'Don\'t use it for a tile with no media: use an interactive Card.',
    'Don\'t put text over the media beyond Compare, the badge and the tap hint.',
    'Don\'t read the family Tag colours as departments, or reuse this mapping elsewhere.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the name (the card goes Live), then to Compare.' },
    { keys: 'Enter / Space', action: 'Opens the format from the name, or toggles Compare.' },
    { keys: 'C', action: 'Toggles Compare while focus is anywhere in the card (not with a modifier, not on key repeat, never from a text field).' },
  ],
  notes: [
    'The root is a plain `<article>`, never `role="button"`; the name is a real button stretched over the card, and Compare is a sibling, so no control is nested in another.',
    'The name\'s button is announced as "{Name}, {Family}. Open details".',
    'Compare\'s label is fixed ("Compare Swipe Gallery") and `aria-pressed` carries the state; `aria-keyshortcuts="c"`.',
    'A missing size reads "No fixed size" to a screen reader, not "em dash".',
    'In forced colours the focus ring and the Compared state are real outlines.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Live', motion: 'The card lifts 2px with shadow-2; the media zooms to 1.1; the tagline fades up and out as the specs fade up and in.', token: 'zoom --duration-slow · --ease-settle; swap --duration-base' },
  { interaction: 'Tilt', motion: 'Up to 4deg toward the mouse, on an 800px perspective with a 1.015 scale.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Loading', motion: 'The bones shimmer.', token: '--duration-ambient' },
  { interaction: 'Reduced motion', motion: 'No lift, zoom, tilt or slide; the specs cross-fade; the shimmer stops.', token: '--duration-fast' },
];
