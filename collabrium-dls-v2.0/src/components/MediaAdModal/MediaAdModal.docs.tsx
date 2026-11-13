// Documentation for Media Ad Modal, rendered by the docs site (playground).
// Keep it consistent with MediaAdModal.usage.md. Not part of the package build.
import { useState } from 'react';
import { MediaAdModal, MediaAdModalPanel, type MediaAdFormat } from './MediaAdModal';
import { CardGrid } from '../Card';
import { MediaAdCard } from '../MediaAdCard';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Media Ad Modal';

export const group = 'Modals';

export const description =
  'The detail view a Media Ad Card opens into: one ad format at a time, with its media, name and family, six spec cells, supported sizes, benchmark, industries and related formats. Previous and next step through the list without closing. A variant of Modal that swings out of the card and holds the page still.';

export const usage = `import { CardGrid, MediaAdCard, MediaAdModal } from '@collabrium/ui';

const [openId, setOpenId] = useState<string | null>(null);
const [shownId, setShownId] = useState(formats[0].id);
const index = formats.findIndex(f => f.id === shownId);
const step = (by: number) => setShownId(formats[(index + by + formats.length) % formats.length].id);

<CardGrid columns="functional">
  {formats.map(f => (
    <MediaAdCard key={f.id} {...cardProps(f)}
      onOpen={() => { setShownId(f.id); setOpenId(f.id); }} />
  ))}
</CardGrid>

<MediaAdModal
  open={openId !== null}
  onClose={() => setOpenId(null)}
  format={byId(shownId)}
  onPrevious={() => step(-1)}
  onNext={() => step(1)}
  onRelatedSelect={setShownId}
  compared={compare.has(shownId)}
  onComparedChange={on => setCompared(shownId, on)}
  liveDemo={{ onClick: () => openDemo(shownId) }}
  onPlan={() => router.push('/plans/new')}
/>`;

const swipe: MediaAdFormat = {
  id: 'swipe-gallery',
  name: 'Swipe Gallery',
  family: 'interactive',
  tagline: 'A horizontal carousel of product frames that viewers swipe through at their own pace.',
  description:
    'Each frame carries its own image, headline and click-through, so one unit can walk a viewer from a hero shot across a range without leaving the page.',
  objective: 'Engagement',
  runsOn: ['Mobile web', 'In-app'],
  bestFor: 'Product ranges and launches',
  funnel: ['Consideration', 'Conversion'],
  cpm: 'RM 38.00',
  inventory: '12M impressions',
  sizes: ['300×250', '320×480'],
  benchmark: { metric: 'CTR', value: 0.62, ceiling: 1 },
  industries: ['Telco', 'FMCG', 'Retail', 'Automotive'],
  related: [
    { id: 'scratch-win', name: 'Scratch & Win', family: 'gamification' },
    { id: 'outstream-video', name: 'Outstream Video', family: 'video' },
    { id: 'billboard', name: 'Billboard', family: 'high-impact' },
  ],
};

const scratch: MediaAdFormat = {
  id: 'scratch-win',
  name: 'Scratch & Win',
  family: 'gamification',
  tagline: 'A scratch card that reveals an offer when the viewer rubs away the top layer.',
  objective: 'Engagement',
  runsOn: ['Mobile web'],
  bestFor: 'Promotions and contests',
  funnel: ['Consideration'],
  inventory: '4M impressions',
  sizes: ['320×480', '300×600'],
  benchmark: { metric: 'CTR', value: 1.4, ceiling: 2 },
  industries: ['Retail', 'F&B'],
  related: [
    { id: 'swipe-gallery', name: 'Swipe Gallery', family: 'interactive' },
    { id: 'billboard', name: 'Billboard', family: 'high-impact' },
    { id: 'outstream-video', name: 'Outstream Video', family: 'video' },
  ],
};

const outstream: MediaAdFormat = {
  id: 'outstream-video',
  name: 'Outstream Video',
  family: 'video',
  tagline: 'A video that opens between paragraphs of an article and plays as it scrolls into view.',
  objective: 'Awareness',
  runsOn: ['Desktop', 'Mobile web'],
  bestFor: 'Brand stories',
  funnel: ['Awareness'],
  cpm: 'RM 45.00',
  inventory: '20M impressions',
  sizes: ['16:9 in-content'],
  industries: ['Automotive', 'Banking'],
  related: [
    { id: 'billboard', name: 'Billboard', family: 'high-impact' },
    { id: 'swipe-gallery', name: 'Swipe Gallery', family: 'interactive' },
    { id: 'scratch-win', name: 'Scratch & Win', family: 'gamification' },
  ],
};

const billboard: MediaAdFormat = {
  id: 'billboard',
  name: 'Billboard',
  family: 'high-impact',
  tagline: 'A wide banner across the top of the page, above the content.',
  objective: 'Awareness',
  runsOn: ['Desktop'],
  bestFor: 'Launch days and takeovers',
  funnel: ['Awareness'],
  cpm: 'RM 52.00',
  inventory: '6M impressions',
  sizes: ['970×250', '728×90'],
  benchmark: { metric: 'CTR', value: 0.35, ceiling: 1 },
  related: [
    { id: 'outstream-video', name: 'Outstream Video', family: 'video' },
    { id: 'swipe-gallery', name: 'Swipe Gallery', family: 'interactive' },
    { id: 'scratch-win', name: 'Scratch & Win', family: 'gamification' },
  ],
};

const formats = [swipe, scratch, outstream, billboard];
/** The sample formats, shared with Compare modal's docs. */
export const sampleFormats = formats;
const byId = (id: string) => formats.find(f => f.id === id) ?? swipe;

// A unit with most of its data missing: what "never blank" looks like.
const sparse: MediaAdFormat = {
  id: 'leaderboard',
  name: 'Leaderboard',
  family: 'display',
  tagline: 'A standard banner across the top of the page.',
  objective: 'Awareness',
  catalogueNote: true,
};

const noop = () => {};
const off = { offReason: 'Live demos are switched off on this page' };

function Catalogue() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [shownId, setShownId] = useState(swipe.id);
  const [compare, setCompare] = useState<Set<string>>(new Set());
  const index = formats.findIndex(f => f.id === shownId);
  const step = (by: number) => setShownId(formats[(index + by + formats.length) % formats.length].id);
  const setCompared = (id: string, on: boolean) =>
    setCompare(prev => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  return (
    <>
      <CardGrid columns="functional">
        {formats.map(f => (
          <MediaAdCard
            key={f.id}
            name={f.name}
            family={f.family}
            tagline={f.tagline}
            funnel={f.funnel ?? []}
            objective={f.objective ?? ''}
            sizes={f.sizes}
            benchmark={f.benchmark ? `${f.benchmark.metric} ${f.benchmark.value}%` : undefined}
            compared={compare.has(f.id)}
            onComparedChange={on => setCompared(f.id, on)}
            onOpen={() => {
              setShownId(f.id);
              setOpenId(f.id);
            }}
          />
        ))}
      </CardGrid>
      <MediaAdModal
        open={openId !== null}
        onClose={() => setOpenId(null)}
        format={byId(shownId)}
        onPrevious={() => step(-1)}
        onNext={() => step(1)}
        onRelatedSelect={setShownId}
        compared={compare.has(shownId)}
        onComparedChange={on => setCompared(shownId, on)}
        liveDemo={off}
        onPlan={() => setOpenId(null)}
      />
    </>
  );
}

function Stage({ format, nav = true }: { format: MediaAdFormat; nav?: boolean }) {
  return (
    <div className="docs-mad-stage">
      <MediaAdModalPanel
        aria-modal="false"
        format={format}
        onClose={noop}
        onPrevious={nav ? noop : undefined}
        onNext={nav ? noop : undefined}
        onRelatedSelect={noop}
        compared={false}
        onComparedChange={noop}
        liveDemo={off}
        onPlan={noop}
      />
    </div>
  );
}

export const thumbnail = () => (
  <div className="docs-mad-stage docs-mad-stage--thumb" aria-hidden="true">
    <MediaAdModalPanel
      aria-modal="false"
      format={swipe}
      onClose={noop}
      onPrevious={noop}
      onNext={noop}
      onRelatedSelect={noop}
      compared={false}
      onComparedChange={noop}
      liveDemo={off}
      onPlan={noop}
    />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Layer',
    element: '.cui-media-ad-modal-layer',
    description: 'One fixed root at <body> level on --z-modal (300): the scrim (shadow-overlay) and the panel.',
    children: [
      {
        name: 'Panel',
        element: '<div role="dialog" aria-modal>.cui-modal.cui-media-ad-modal',
        description: "Modal's panel recipe plus a 1px Neutral-3 border, up to 600px wide and 800px tall; only the body scrolls. Named by the title, described by the tagline.",
        children: [
          { name: 'Head', element: '.cui-modal__head', description: 'The breadcrumb ("Ad formats › {Name}", the name bold and truncating), then previous, next and close: Ghost icon-only sm Buttons. A bottom rule.' },
          { name: 'Frame / Slot', element: '.cui-media-ad-modal__frame > __slot', description: "16:10, radius-md, a 1px Neutral-3 edge. Takes any child; the card's placeholder by default. Replay sits in its corner when the media can play again." },
          { name: 'Title row', element: 'h3.cui-media-ad-modal__title + Tag', description: 'The name at the h3 token, wrapping, never clamped; the family Tag beside it.' },
          { name: 'Tagline / description', element: '__tagline, __desc', description: 'Tagline body1 Neutral-5 (required); description body2 Neutral-9 (optional).' },
          { name: 'Specs', element: '<dl>.cui-media-ad-modal__specs', description: 'Six cells, always in this order: Objective, Runs on, Best for, Funnel, CPM on file, Monthly inventory. Two columns on the warm-card fill.' },
          { name: 'Sections', element: '.cui-media-ad-modal__section > h4.__section-title', description: 'Supported sizes (to-scale swatches), Benchmark (value + a decorative Progress Bar), Industries (static chips, left out when empty), Also consider (three related formats).' },
          { name: 'Foot', element: '.cui-modal__foot', description: 'Compare (a Ghost toggle, far left), Live demo (Secondary), Use in a media plan (Primary), 8px apart.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'catalogue',
    title: 'From the catalogue',
    description:
      'Open a card: the modal swings out of it. ← and → (or the arrows) step through the four formats, wrapping; an "Also consider" tile jumps to that format. Compare stays in step with the card. Escape, Close or the scrim fold it back into the card.',
    render: () => <Catalogue />,
    code: `<MediaAdModal
  open={openId !== null}
  onClose={() => setOpenId(null)}
  format={byId(shownId)}
  onPrevious={() => step(-1)}
  onNext={() => step(1)}
  onRelatedSelect={setShownId}
  compared={compare.has(shownId)}
  onComparedChange={on => setCompared(shownId, on)}
  liveDemo={{ offReason: 'Live demos are switched off on this page' }}
  onPlan={() => setOpenId(null)}
/>`,
  },
  {
    id: 'panel',
    title: 'The panel',
    description: 'Every part, shown in place. Live demo is switched off here: it stays focusable and reads its reason.',
    render: () => <Stage format={swipe} />,
    code: `<MediaAdModal open onClose={close} format={swipeGallery}
  onPrevious={prev} onNext={next} onRelatedSelect={show}
  compared={false} onComparedChange={setCompared}
  liveDemo={{ offReason: 'Live demos are switched off on this page' }}
  onPlan={plan} />`,
  },
  {
    id: 'missing',
    title: 'Missing data',
    description:
      'Never blank: missing spec cells read "Not on file" (CPM "Not on file — ask Sales"), no sizes and no benchmark say so, and Industries and Also consider are left out. A one-item list has no arrows. The catalogue note marks a unit with no gallery page of its own.',
    render: () => <Stage format={sparse} nav={false} />,
    code: `<MediaAdModal open onClose={close}
  format={{
    id: 'leaderboard', name: 'Leaderboard', family: 'display',
    tagline: 'A standard banner across the top of the page.',
    objective: 'Awareness', catalogueNote: true,
  }}
  onRelatedSelect={show} compared={false} onComparedChange={setCompared}
  liveDemo={{ offReason: 'Live demos are switched off on this page' }}
  onPlan={plan} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'open', options: 'boolean', default: '—', required: true, description: 'Whether the modal is open.' },
  { name: 'onClose', options: '() => void', default: '—', required: true, description: 'Close, Escape or a scrim click. Set `open` to false.' },
  { name: 'format', options: 'MediaAdFormat', default: '—', required: true, description: 'The format shown: `id`, `name`, `family`, `tagline` (required); `description`, the six spec values, `sizes`, `benchmark`, `industries`, `related`, `catalogueNote`, `media`. A new `id` is a swap.' },
  { name: 'onPrevious / onNext', options: '() => void', default: '—', description: 'Step through the list, wrapping at the ends; also ← and →. Leave both out for a one-item list: the arrows are hidden.' },
  { name: 'onRelatedSelect', options: '(id) => void', default: '—', required: true, description: 'An "Also consider" tile was chosen: show that format.' },
  { name: 'compared / onComparedChange', options: 'boolean / (on) => void', default: '—', required: true, description: "Compare's state, kept in step with the card's." },
  { name: 'liveDemo', options: '{ onClick } | { offReason }', default: '—', required: true, description: 'Live demo as an action, or switched off with its reason.' },
  { name: 'onPlan', options: '() => void', default: '—', required: true, description: '"Use in a media plan": navigate to the planner.' },
  { name: 'onReplay', options: '() => void', default: '—', description: 'Shows Replay over media that can play again.' },
  { name: 'origin', options: 'RefObject<HTMLElement>', default: 'the card that had focus', description: 'The card it swings out of and folds back into.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the panel. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Open it from a Media Ad Card, and step through the list that card came from.',
    'Keep all six spec cells, in order, on every format, even when most are "Not on file".',
    'Let the consumer own the slot: pass your own media, or leave the placeholder.',
    "Keep Compare in step with the card's own Compare.",
  ],
  dont: [
    "Don't put an ad visual in the component, or a form, a field or a confirm step in the panel: it is a read.",
    "Don't open one Media Ad Modal from inside another.",
    "Don't use it for a decision: use Modal.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab / Shift+Tab', action: 'Moves through the panel, wrapping only at its ends.' },
    { keys: '← / →', action: 'Previous / next format, wrapping. Not with a modifier, never from a text field.' },
    { keys: 'Escape', action: 'Closes; focus returns to the card.' },
  ],
  notes: [
    'The panel is `role="dialog"` with `aria-modal`, named by the title and described by the tagline. Every other child of `<body>` is made `inert` while it is open.',
    'It opens with focus on Close, as the DS says (an approved exception: the title and tagline are read as focus enters the dialog). A swap moves focus to the new title (a heading), which reads the new format; no live region.',
    'Compare carries `aria-pressed` and its label stays "Compare"; the format name follows for screen readers.',
    'Live demo, when off, uses `aria-disabled` (still focusable) with its reason as a description and a tooltip.',
    'Size swatches are hidden; each size is read as "300 by 250 pixels". The benchmark bar is decorative: the value is the text.',
    'Touch: footer buttons are 44px tall; the head\'s 32px icon buttons sit 12px apart instead of overlapping hit areas.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Opening', motion: 'The panel swings out of the card (a FLIP with a 48deg turn at .7 scale) while the scrim fades in.', token: '0.8s cubic-bezier(.25,.9,.35,1) (recorded one-off) · scrim --duration-reveal' },
  { interaction: 'Closing', motion: 'Folds back into the card if it is on screen, else fades; Escape mid-opening plays the swing backwards.', token: '0.55s cubic-bezier(.3,.6,.35,1) · scrim --duration-slow' },
  { interaction: 'Benchmark', motion: 'The bar eases in from 0.', token: '--duration-reveal · --ease-flow, after --duration-fast' },
  { interaction: 'Reduced motion', motion: 'No swing: the panel fades. The bar is not animated.', token: '--duration-base' },
];
