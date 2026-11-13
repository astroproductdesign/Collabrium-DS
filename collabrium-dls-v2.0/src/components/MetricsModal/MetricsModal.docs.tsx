// Documentation for Metrics modal, rendered by the docs site (playground).
// Keep it consistent with MetricsModal.usage.md. Not part of the package build.
import { useRef, useState } from 'react';
import { MetricsModal, MetricsModalPanel, type MetricsModalItem, type MetricsModalLabels } from './MetricsModal';
import { CardGrid } from '../Card';
import { MetricsCard, audienceCategoryTags } from '../MetricsCard';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Metrics modal';

export const group = 'Modals';

export const description =
  'The detail view a Metrics card opens into: one item at a time, with its media and headline size on the side, then its title and category, every bar of the breakdown, where the audience lives, what it reads about and related items. Previous and next step through the list. A modifier on Media Ad Modal.';

export const usage = `import { CardGrid, MetricsCard, MetricsModal } from '@collabrium/ui';

const labels = {
  crumbRoot: 'Audiences', previous: 'Previous audience', next: 'Next audience',
  size: 'Audience size', unit: 'audience',
  breakdown: 'Media consumption', places: 'Where they live',
  reads: 'What they read about', related: 'Also see',
  add: 'Add to reach tray',
};

<MetricsModal
  open={openId !== null}
  onClose={() => setOpenId(null)}
  item={byId(shownId)}
  labels={labels}
  onPrevious={() => step(-1)}
  onNext={() => step(1)}
  onRelatedSelect={setShownId}
  added={tray.has(shownId)}
  onAddedChange={on => setInTray(shownId, on)}
  onPlan={() => router.push('/plans/new')}
  cardFor={id => document.querySelector(\`[data-audience="\${id}"]\`)}
/>`;

const labels: MetricsModalLabels = {
  crumbRoot: 'Audiences',
  previous: 'Previous audience',
  next: 'Next audience',
  size: 'Audience size',
  unit: 'audience',
  breakdown: 'Media consumption',
  places: 'Where they live',
  reads: 'What they read about',
  related: 'Also see',
  add: 'Add to reach tray',
};

const romcom: MetricsModalItem = {
  id: 'rom-com-fans',
  name: 'Rom-Com Fans',
  category: 'Entertainment',
  categoryTag: audienceCategoryTags.Entertainment,
  tagline: 'Fans who enjoy humorous, heartwarming love stories filled with charm, wit, and relatable moments.',
  size: '17M',
  sizeNote: 'published by KULT',
  bars: [
    { label: 'Video streaming', value: 58 },
    { label: 'Audio streaming', value: 26 },
    { label: 'Television', value: 45 },
    { label: 'Podcast', value: 26 },
    { label: 'Social media', value: 65 },
  ],
  places: [
    { name: 'XUAN', categories: ['News', 'Lifestyle', 'Entertainment News'] },
    { name: 'SYOK', categories: ['Music & Radio Streaming', 'Podcast'] },
    { name: 'Media Hiburan', categories: ['Celebrities News'] },
    { name: 'Gempak', categories: ['Lifestyle', 'Entertainment News', 'Trends'] },
    { name: 'sooka', categories: ['Movie Streaming', 'Entertainment'] },
  ],
  reads: ['Entertainment', 'Food & Beverages', 'Computer & Technology', 'Home & Family', 'Sports & Recreation', 'Fashion & Beauty'],
  related: [
    { id: 'music-concert-goers', name: 'Music & Concert Goers', category: 'Entertainment', size: '14M' },
    { id: 'comedy-fans', name: 'Comedy Fans', category: 'Entertainment', size: '13M' },
    { id: 'foodies', name: 'Foodies', category: 'Trendsetter', size: '16M' },
  ],
};

const foodies: MetricsModalItem = {
  id: 'foodies',
  name: 'Foodies',
  category: 'Trendsetter',
  categoryTag: audienceCategoryTags.Trendsetter,
  tagline: 'Culinary explorers who seek authentic flavors, quality ingredients, and memorable dining experiences.',
  size: '16M',
  sizeNote: 'published by KULT',
  bars: [
    { label: 'Video streaming', value: 57 },
    { label: 'Audio streaming', value: 27 },
    { label: 'Television', value: 43 },
    { label: 'Social media', value: 66 },
    { label: 'Forums', value: 48 },
    { label: 'Podcast' },
  ],
  places: [
    { name: 'Rasa', categories: ['Food', 'Recipes'] },
    { name: 'XUAN', categories: ['Lifestyle'] },
  ],
  reads: ['Food & Beverages', 'Travel'],
  related: [
    { id: 'rom-com-fans', name: 'Rom-Com Fans', category: 'Entertainment', size: '17M' },
    { id: 'comedy-fans', name: 'Comedy Fans', category: 'Entertainment', size: '13M' },
  ],
};

const comedy: MetricsModalItem = {
  id: 'comedy-fans',
  name: 'Comedy Fans',
  category: 'Entertainment',
  categoryTag: audienceCategoryTags.Entertainment,
  tagline: 'Viewers who seek out stand-up, sitcoms and sketch shows, and share the clips they love.',
  size: '13M',
  sizeNote: 'published by KULT',
  bars: [
    { label: 'Video streaming', value: 62 },
    { label: 'Social media', value: 71 },
    { label: 'Television', value: 39 },
  ],
  places: [{ name: 'Gempak', categories: ['Trends', 'Entertainment News'] }],
  related: [
    { id: 'rom-com-fans', name: 'Rom-Com Fans', category: 'Entertainment', size: '17M' },
    { id: 'foodies', name: 'Foodies', category: 'Trendsetter', size: '16M' },
  ],
};

const music: MetricsModalItem = {
  id: 'music-concert-goers',
  name: 'Music & Concert Goers',
  category: 'Entertainment',
  categoryTag: audienceCategoryTags.Entertainment,
  tagline: 'Live-music lovers who follow tours, buy tickets early and stream the setlist after.',
  size: '14M',
  bars: [
    { label: 'Audio streaming', value: 74 },
    { label: 'Social media', value: 59 },
  ],
  places: [{ name: 'SYOK', categories: ['Music & Radio Streaming'] }],
};

const list = [romcom, foodies, comedy];
const all = [...list, music];
const byId = (id: string) => all.find(i => i.id === id) ?? romcom;

// An item with most of its data missing: what "never blank" looks like.
const sparse: MetricsModalItem = {
  id: 'football-fans',
  name: 'Football Fans',
  category: 'Sports',
  categoryTag: audienceCategoryTags.Sports,
  tagline: 'Supporters who follow the league week by week.',
  bars: [],
  places: [],
};

const noop = () => {};

function Segments() {
  const wrap = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [shownId, setShownId] = useState(romcom.id);
  const [tray, setTray] = useState<Set<string>>(new Set());
  const index = Math.max(0, list.findIndex(i => i.id === shownId));
  const step = (by: number) => setShownId(list[(index + by + list.length) % list.length].id);
  const setInTray = (id: string, on: boolean) =>
    setTray(prev => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  return (
    <div ref={wrap}>
      <CardGrid columns="functional">
        {list.map(i => (
          <MetricsCard
            key={i.id}
            data-audience={i.id}
            name={i.name}
            category={i.category}
            categoryTag={i.categoryTag}
            tagline={i.tagline}
            size={i.size}
            unit="audience"
            totalLabel="total audience"
            bars={i.bars}
            addLabel={`Add ${i.name} to reach tray`}
            added={tray.has(i.id)}
            onAddedChange={on => setInTray(i.id, on)}
            onOpen={() => {
              setShownId(i.id);
              setOpenId(i.id);
            }}
          />
        ))}
      </CardGrid>
      <MetricsModal
        open={openId !== null}
        onClose={() => setOpenId(null)}
        item={byId(shownId)}
        labels={labels}
        onPrevious={() => step(-1)}
        onNext={() => step(1)}
        onRelatedSelect={setShownId}
        added={tray.has(shownId)}
        onAddedChange={on => setInTray(shownId, on)}
        onPlan={() => setOpenId(null)}
        cardFor={id => wrap.current?.querySelector<HTMLElement>(`[data-audience="${id}"]`)}
      />
    </div>
  );
}

function Stage({ item, nav = true }: { item: MetricsModalItem; nav?: boolean }) {
  return (
    <div className="docs-mad-stage">
      <MetricsModalPanel
        aria-modal="false"
        item={item}
        labels={labels}
        onClose={noop}
        onPrevious={nav ? noop : undefined}
        onNext={nav ? noop : undefined}
        onRelatedSelect={noop}
        added={false}
        onAddedChange={noop}
        onPlan={noop}
      />
    </div>
  );
}

export const thumbnail = () => (
  <div className="docs-mad-stage docs-mad-stage--thumb" aria-hidden="true">
    <MetricsModalPanel
      aria-modal="false"
      item={romcom}
      labels={labels}
      onClose={noop}
      onPrevious={noop}
      onNext={noop}
      onRelatedSelect={noop}
      added={false}
      onAddedChange={noop}
      onPlan={noop}
    />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Panel',
    element: '<div role="dialog" aria-modal>.cui-modal.cui-media-ad-modal.cui-metrics-modal',
    description: "Media Ad Modal's panel and layer, capped at 760px for two columns. Named by the title, described by the tagline and the headline size.",
    children: [
      { name: 'Head', element: '.cui-modal__head', description: "Media Ad Modal's: the breadcrumb ({crumbRoot} › {name}), previous, next and Close." },
      { name: 'Columns', element: '.cui-metrics-modal__cols', description: 'One column by default; above a 640px panel, a 220px side and the main column, 24px apart, the side sticky while the main column scrolls.' },
      { name: 'Side', element: '.cui-metrics-modal__side', description: 'The 16:10 media (the still, the clip over it, Replay) and the headline size: the figure at the h3 token over its label.' },
      { name: 'Title row and tagline', element: 'h3.cui-media-ad-modal__title + Tag, __tagline', description: 'The name and the category Tag; the tagline, 20px above the first section.' },
      { name: 'Breakdown', element: '<dl>.cui-metrics-modal__bars', description: "Every bar, in the host's order: the label (wrapping inside 40%), Progress Bar's default 8px track, the value in a 4ch column." },
      { name: 'Where they live', element: '<dl>.cui-metrics-modal__places', description: 'One row per platform: the name, then its categories.' },
      { name: 'What they read about', element: 'Input Chip group', description: 'Static chips. Left out when empty.' },
      { name: 'Also see', element: '.cui-media-ad-modal__related', description: 'Up to three related tiles with a meta line ("14M · Entertainment"). Left out when empty.' },
      { name: 'Foot', element: '.cui-modal__foot', description: 'The Add toggle far left, the Primary far right. At a 480px panel or less, Add sits centred above a full-width Primary.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'segments',
    title: 'From the segments',
    description:
      'Open a card: the modal swings out of it with focus on the title, and the bars grow in. ← and → step through the three cards; "Also see" can jump to an item that isn\'t one of them. Add stays in step with the card. Closing returns focus to the card for the item now showing (or the last card shown) and folds back into it.',
    render: () => <Segments />,
    code: `<MetricsModal
  open={openId !== null}
  onClose={() => setOpenId(null)}
  item={byId(shownId)}
  labels={labels}
  onPrevious={() => step(-1)}
  onNext={() => step(1)}
  onRelatedSelect={setShownId}
  added={tray.has(shownId)}
  onAddedChange={on => setInTray(shownId, on)}
  onPlan={() => setOpenId(null)}
  cardFor={id => wrap.current?.querySelector(\`[data-audience="\${id}"]\`)}
/>`,
  },
  {
    id: 'panel',
    title: 'The panel',
    description: 'Every part, shown in place: two columns, the side holding the media and the size.',
    render: () => <Stage item={romcom} />,
    code: `<MetricsModal open onClose={close} item={romComFans} labels={labels}
  onPrevious={prev} onNext={next} onRelatedSelect={show}
  added={false} onAddedChange={setAdded} onPlan={plan} />`,
  },
  {
    id: 'missing',
    title: 'Missing data',
    description:
      'The size, the breakdown and "Where they live" stay, each with a sentence ("Not published", "No breakdown on file", "No platforms on file"); "What they read about" and "Also see" are left out. A bar with no value keeps its row with a dash (Foodies\' Podcast, above).',
    render: () => <Stage item={sparse} nav={false} />,
    code: `<MetricsModal open onClose={close} labels={labels}
  item={{
    id: 'football-fans', name: 'Football Fans', category: 'Sports',
    categoryTag: audienceCategoryTags.Sports,
    tagline: 'Supporters who follow the league week by week.',
    bars: [], places: [],
  }}
  onRelatedSelect={show} added={false} onAddedChange={setAdded} onPlan={plan} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'open', options: 'boolean', default: '—', required: true, description: 'Whether the modal is open.' },
  { name: 'onClose', options: '() => void', default: '—', required: true, description: 'Close, Escape or a scrim click. Set `open` to false.' },
  { name: 'item', options: 'MetricsModalItem', default: '—', required: true, description: '`id`, `name`, `category`, `categoryTag`, `tagline`, `bars`, `places` (required); `size`, `sizeNote`, `reads`, `related`, `media`, `clip`. A new `id` is a swap.' },
  { name: 'labels', options: 'MetricsModalLabels', default: '—', required: true, description: 'The host strings: crumb root, previous / next names, size label, unit, the four section headings, the Add label; `plan`, `notPublished`, `noBreakdown`, `noPlaces` have defaults.' },
  { name: 'onPrevious / onNext', options: '() => void', default: '—', description: 'Step through the list, wrapping; also ← and →. Leave both out for a one-item list.' },
  { name: 'onRelatedSelect', options: '(id) => void', default: '—', required: true, description: 'An "Also see" tile was chosen: show that item.' },
  { name: 'added / onAddedChange', options: 'boolean / (on) => void', default: '—', required: true, description: "Add's state, kept in step with the card's." },
  { name: 'onPlan', options: '() => void', default: '—', required: true, description: 'The Primary: navigate to the planner.' },
  { name: 'cardFor', options: '(id) => HTMLElement | null', default: '—', description: 'The list card for an item: where focus returns on close, and what it folds back into.' },
  { name: 'origin', options: 'RefObject<HTMLElement>', default: 'the card that had focus', description: 'The card it swings out of.' },
  { name: 'keepLive', options: 'RefObject<HTMLElement>[]', default: '—', description: 'Children of `<body>` kept usable while the page is held (a Toast host).' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the panel. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Open it from a Metrics card, and step through the list that card came from.',
    'Keep the size, the breakdown and "Where they live" on every item, even when they read "Not on file".',
    "List every bar, in the host's order.",
    'Pass every data-specific string in `labels`, so it reads right for audiences, influencers or channels.',
  ],
  dont: [
    "Don't add a form, a field or a confirm step: it is a read.",
    "Don't open it from inside another modal of the Media Ad Modal family.",
    "Don't read the category Tag colours as departments.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab / Shift+Tab', action: 'Moves through the panel, wrapping only at its ends.' },
    { keys: '← / →', action: 'Previous / next item, wrapping. Not with a modifier, never from a text field.' },
    { keys: 'Escape', action: 'Closes; focus returns to the card for the item showing.' },
  ],
  notes: [
    'The panel is `role="dialog"` with `aria-modal`, named by the title and described by the tagline and the headline size (", " between the figure and its label).',
    'It opens with focus on the title, and every swap moves focus to the new title; no live region.',
    "The bars' tracks are hidden; each row reads its label and value. A bar with no value reads \"Not on file\".",
    'Add carries `aria-pressed`; its label is fixed and the item\'s name follows for screen readers.',
    'Each "Also see" tile reads its name, category and size; the meta line under it is hidden.',
    'Forced colours: tracks are outlined and fills drawn in CanvasText (Progress Bar\'s).',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Opening / closing', motion: "Media Ad Modal's swing out of the card and back.", token: '0.8s / 0.55s (recorded one-offs)' },
  { interaction: 'Bars', motion: 'Grow in on open and on every swap, staggered row by row.', token: '--duration-base · --ease-standard, after --duration-fast + ½ --duration-instant a row' },
  { interaction: 'Clip', motion: 'Plays once on open and on every swap, fades in, holds its last frame; Replay plays it again.', token: '--duration-base · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'No swing, no bar growth, no clip, no Replay.', token: '—' },
];
