// Documentation for Metrics card, rendered by the docs site (playground).
// Keep it consistent with MetricsCard.usage.md. Not part of the package build.
import { MetricsCard, MetricsCardSkeleton, audienceCategoryTags } from './MetricsCard';
import { CardGrid } from '../Card';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Metrics card';

export const group = 'Cards';

export const description =
  'A Media Ad Card for an item whose figures matter more than its spec: at rest the tagline and a size line; Live, a headline total and a breakdown of up to five bars that grow in. An Add toggle picks it into a tray.';

export const usage = `import { CardGrid, MetricsCard, audienceCategoryTags } from '@collabrium/ui';

export function Segments() {
  return (
    <CardGrid columns="functional">
      <MetricsCard
        name="Foodies"
        category="Trendsetter"
        categoryTag={audienceCategoryTags.Trendsetter}
        tagline="Culinary explorers who seek authentic flavors, quality ingredients, and memorable dining experiences."
        size="16M"
        unit="audience"
        totalLabel="total audience"
        bars={[
          { label: 'Video', value: 57 },
          { label: 'Audio', value: 27 },
          { label: 'TV', value: 43 },
          { label: 'Social', value: 66 },
          { label: 'Forums', value: 48 },
        ]}
        addLabel="Add Foodies to reach tray"
        onOpen={() => openSegment('foodies')}
        onAddedChange={on => setInTray('foodies', on)}
      />
    </CardGrid>
  );
}`;

const noop = () => {};

const foodies = {
  name: 'Foodies',
  category: 'Trendsetter',
  categoryTag: audienceCategoryTags.Trendsetter,
  tagline: 'Culinary explorers who seek authentic flavors, quality ingredients, and memorable dining experiences.',
  size: '16M',
  unit: 'audience',
  totalLabel: 'total audience',
  bars: [
    { label: 'Video', value: 57 },
    { label: 'Audio', value: 27 },
    { label: 'TV', value: 43 },
    { label: 'Social', value: 66 },
    { label: 'Forums', value: 48 },
  ],
  addLabel: 'Add Foodies to reach tray',
  moreLabel: ' channels in details',
  onOpen: noop,
};

export const thumbnail = () => (
  <CardGrid columns="functional">
    <MetricsCard {...foodies} />
  </CardGrid>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Metrics card',
    element: '<article>.cui-card[data-card="media-ad"][data-variant="metrics"]',
    description: 'Media Ad Card\'s shell, unchanged: the full-bleed 16:10 slot, the round toggle, the stretched title button, Live, touch and the tilt.',
    children: [
      { name: 'Still + clip', element: '.cui-media-ad-card__slot > … + video.cui-metrics-card__clip', description: 'Your still (or the placeholder), and an optional muted clip that fades in only while Live and playing.' },
      { name: 'Add toggle', element: '<button aria-pressed>', description: 'Media Ad Card\'s round toggle, with a fixed label naming the item; the A key.' },
      { name: 'Title', element: '<h3> > button > .cui-metrics-card__name', description: 'Always exactly two lines tall, so every card in a grid is the same height; a longer name clamps.' },
      { name: 'Category Tag', element: 'Tag', description: 'Never wraps, capped at 120px; 13 characters at most.' },
      { name: 'Rest layer', element: '.cui-media-ad-card__rest', description: 'The tagline (3 lines) and the size line: "16M audience · 66% social".' },
      { name: 'Spec layer', element: '.cui-media-ad-card__spec', description: 'The total ("16M total audience", optional "+N more"), then up to five bars on one grid: label, compact track, value.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Hover, or Tab to it, to go Live: the size line becomes the headline total and the bars grow in, one after another. Press A, or the +, to add it to the tray.',
    render: () => (
      <CardGrid columns="functional">
        <MetricsCard {...foodies} />
      </CardGrid>
    ),
    code: `<MetricsCard
  name="Foodies"
  category="Trendsetter"
  categoryTag={audienceCategoryTags.Trendsetter}
  tagline="Culinary explorers who seek authentic flavors, quality ingredients, and memorable dining experiences."
  size="16M"
  unit="audience"
  totalLabel="total audience"
  bars={[{ label: 'Video', value: 57 }, { label: 'Audio', value: 27 }, { label: 'TV', value: 43 }, { label: 'Social', value: 66 }, { label: 'Forums', value: 48 }]}
  addLabel="Add Foodies to reach tray"
  onOpen={openSegment}
/>`,
  },
  {
    id: 'bar-count',
    title: 'Bar count and missing data',
    description: 'More than five bars: the first five in your order, and "+N more" on the total line. A bar with no value keeps its row with a dash. No bars: "No breakdown on file". No size: "Size not published". Every card stays the same height.',
    render: () => (
      <CardGrid columns="functional">
        <MetricsCard
          {...foodies}
          name="Weekend shoppers who plan big grocery runs"
          category="Shopping"
          categoryTag={audienceCategoryTags.Shopping}
          size="8.2M"
          bars={[...foodies.bars.slice(0, 3), { label: 'Social' }, { label: 'Forums', value: 31 }, { label: 'Radio', value: 22 }, { label: 'Print', value: 9 }]}
          addLabel="Add Weekend shoppers to reach tray"
        />
        <MetricsCard {...foodies} name="New parents" category="Life stage" categoryTag={audienceCategoryTags['Life stage']} bars={[]} size="2.4M" addLabel="Add New parents to reach tray" />
        <MetricsCard {...foodies} name="Football fans" category="Sports" categoryTag={audienceCategoryTags.Sports} size={undefined} addLabel="Add Football fans to reach tray" />
      </CardGrid>
    ),
    code: `<MetricsCard … bars={[…, { label: 'Social' }, …, { label: 'Print', value: 9 }]} moreLabel=" channels in details" />
<MetricsCard … category="Life stage" categoryTag={audienceCategoryTags['Life stage']} bars={[]} />
<MetricsCard … category="Sports" categoryTag={audienceCategoryTags.Sports} /* no size */ />`,
  },
  {
    id: 'added',
    title: 'Added',
    description: 'Compared\'s treatment: an Obsidian border with a 1px ring and shadow-3; the toggle fills Obsidian with a check.',
    render: () => (
      <CardGrid columns="functional">
        <MetricsCard {...foodies} defaultAdded />
      </CardGrid>
    ),
    code: `<MetricsCard … added={tray.has('foodies')} onAddedChange={on => setInTray('foodies', on)} />`,
  },
  {
    id: 'loading',
    title: 'Loading',
    description: 'Media Ad Card\'s skeleton with the reserved two-line title row and the taller swap, exactly as tall as a loaded card.',
    render: () => (
      <CardGrid columns="functional" aria-busy="true">
        <MetricsCardSkeleton />
        <MetricsCardSkeleton />
      </CardGrid>
    ),
    code: `<CardGrid columns="functional" aria-busy="true">
  <MetricsCardSkeleton />
  <MetricsCardSkeleton />
</CardGrid>`,
  },
];

export const props: DocsProp[] = [
  { name: 'name', options: 'string', default: '—', required: true, description: 'The item\'s name. The title block is always two lines tall.' },
  { name: 'category / categoryTag', options: 'string / TagVariant', default: '—', required: true, description: 'The category and its Tag colour (13 characters at most). For audiences, `audienceCategoryTags`.' },
  { name: 'tagline', options: 'string', default: '—', required: true, description: 'Shown at rest, clamped to three lines.' },
  { name: 'size', options: 'string', default: '—', description: 'The headline figure, formatted ("16M"). Left out: "Size not published" and "Not published".' },
  { name: 'unit / totalLabel', options: 'string', default: '—', required: true, description: 'Host strings: "audience" on the rest line, "total audience" on the Live total.' },
  { name: 'bars', options: '{ label: string; value?: number }[]', default: '—', required: true, description: 'The breakdown in your order, values 0–100. The first five show.' },
  { name: 'moreLabel', options: 'string', default: "' in details'", description: 'Read after "+N more" by screen readers only.' },
  { name: 'emptyLabel', options: 'string', default: "'No breakdown on file'", description: 'Shown when there are no bars.' },
  { name: 'media', options: 'ReactNode', default: 'the placeholder', description: 'The still, stretched to the 16:10 slot.' },
  { name: 'clip', options: 'string (video URL)', default: '—', description: 'A decorative muted clip, played only while Live; never under reduced motion.' },
  { name: 'onOpen', options: '() => void', default: '—', required: true, description: 'Opens the detail (Metrics modal). On touch, the first tap goes Live, the second opens.' },
  { name: 'addLabel', options: 'string', default: '—', required: true, description: 'The Add toggle\'s fixed label, naming the item.' },
  { name: 'added / defaultAdded / onAddedChange', options: 'boolean / boolean / (on) => void', default: '— / false / —', description: 'The Add toggle\'s state, controlled or not.' },
  { name: 'tilt', options: 'boolean', default: 'false', description: 'Tilts the card toward a mouse pointer.' },
  { name: 'headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '3', description: 'The name\'s heading level; the look is always h5.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the `<article>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Use it when an item\'s figures matter more than its spec: audience segments, influencers, channels.',
    'Keep category labels within 13 characters.',
    'Keep every bar you have, in the same order on every card, even when its value is missing.',
    'Put it in a `CardGrid columns="functional"`.',
  ],
  dont: [
    'Don\'t sort the bars: each channel sits in the same place on every card and in the Metrics modal.',
    'Don\'t read the category Tag colours as departments.',
    'Don\'t put text over the media beyond the Add toggle and the tap hint.',
    'Don\'t use it to show a split as the point: use the Progress-to-Goal Bar\'s card variant, which has a legend.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the name (the card goes Live and the bars grow), then to Add.' },
    { keys: 'Enter / Space', action: 'Opens the item from the name, or toggles Add.' },
    { keys: 'A', action: 'Toggles Add while focus is anywhere in the card (not with a modifier, not on key repeat, never from a text field).' },
  ],
  notes: [
    'The name\'s button is announced as "{Name}, {Category}, {size} {unit}. Open details".',
    'The bars are a `<dl>`, read as "Video, 57%"; the tracks are decorative (`aria-hidden`), since a share isn\'t progress toward a goal.',
    'A bar with no value reads "Not on file"; "+N more" reads with your `moreLabel`.',
    'The clip is decorative: muted, no controls, `aria-hidden`.',
    'In forced colours the tracks are outlined and the fills drawn in CanvasText; Added is a Highlight outline.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Live', motion: 'Media Ad Card\'s lift, zoom and swap; then the bars grow in, one row after another. Leaving Live, they reset only once the Spec layer has faded out, so a bar is never seen shrinking.', token: '--duration-base · --ease-standard, after --duration-fast, + --duration-instant / 2 per row' },
  { interaction: 'Clip', motion: 'Fades in over the still while Live and playing.', token: '--duration-base · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'No clip; the bars sit at their value; Media Ad Card\'s reduced-motion rules otherwise.', token: '—' },
];
