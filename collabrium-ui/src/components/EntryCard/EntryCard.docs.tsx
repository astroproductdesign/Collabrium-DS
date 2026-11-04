// Documentation for Entry Card, rendered by the docs site (playground).
// Keep it consistent with EntryCard.usage.md. Not part of the package build.
import { useState } from 'react';
import { Button } from '../Button';
import { EntryCard, EntryCardSet, type EntryCardArtefact, type EntryCardVariant } from './EntryCard';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Entry Card';

export const group = 'Cards';

export const description =
  'A compact "start here" tile in a small set of starting points: a decorative media slot, a title, a one-line hint and a chevron. The whole card is one button. Character and Artefact variants.';

export const usage = `import { EntryCard, EntryCardSet } from '@collabrium/ui';

export function StartHere() {
  return (
    <EntryCardSet label="Start from any piece" variant="artefact">
      <EntryCard title="Brief" hint="Turn an email into a brief" artefact="brief" onClick={openBrief} />
      <EntryCard title="Research" hint="Find what the market says" artefact="research" onClick={openResearch} />
      <EntryCard title="Big idea" hint="Shape a campaign idea" artefact="idea" onClick={openIdea} />
      <EntryCard title="Package" hint="Build a media package" artefact="package" onClick={openPackage} />
      <EntryCard title="Deck" hint="Make a pitch deck" artefact="deck" onClick={openDeck} />
    </EntryCardSet>
  );
}`;

const entries: { title: string; hint: string; artefact: EntryCardArtefact }[] = [
  { title: 'Brief', hint: 'Turn an email into a brief', artefact: 'brief' },
  { title: 'Research', hint: 'Find what the market says', artefact: 'research' },
  { title: 'Big idea', hint: 'Shape a campaign idea', artefact: 'idea' },
  { title: 'Package', hint: 'Build a media package', artefact: 'package' },
  { title: 'Deck', hint: 'Make a pitch deck', artefact: 'deck' },
];

const noop = () => {};

function Set({ variant, label }: { variant: EntryCardVariant; label: string }) {
  return (
    <EntryCardSet label={label} variant={variant} idleTour={false}>
      {entries.map(e => (
        <EntryCard key={e.title} {...e} onClick={noop} />
      ))}
    </EntryCardSet>
  );
}

function Switching() {
  const [variant, setVariant] = useState<EntryCardVariant>('artefact');
  return (
    <div className="docs-stack">
      <div className="docs-row" role="group" aria-label="Look">
        {(['artefact', 'character'] as const).map(v => (
          <Button key={v} size="sm" variant={variant === v ? 'primary' : 'secondary'} aria-pressed={variant === v} onClick={() => setVariant(v)}>
            {v === 'artefact' ? 'Artefact' : 'Character'}
          </Button>
        ))}
      </div>
      <Set variant={variant} label="Start from any piece" />
    </div>
  );
}

export const thumbnail = () => (
  <EntryCardSet label="Start" variant="artefact" idleTour={false}>
    <EntryCard title="Brief" hint="Turn an email into a brief" artefact="brief" onClick={noop} />
    <EntryCard title="Deck" hint="Make a pitch deck" artefact="deck" onClick={noop} />
  </EntryCardSet>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Set',
    element: '<div>.cui-entry-set > <ul aria-label>',
    description: 'The query container: its width sets 1, 2, 3 or 5 columns (no 4-up). A character set reserves headroom above every row for the rising heads.',
    children: [
      {
        name: 'Entry Card',
        element: '<button>.cui-card.cui-entry-card[data-variant]',
        description: 'The base Card surface on a real button (or a link). 12px gap. Its own container, so the stage scales with the card.',
        children: [
          { name: 'Media slot', element: '.cui-entry-card__media[aria-hidden]', description: 'Character: a stage that bleeds 8px into the padding, its figure rising above the card. Artefact: an 84px Neutral-2 tile with a drawing.' },
          { name: 'Title', element: '.cui-entry-card__title', description: 'h5, Neutral-9, one line.' },
          { name: 'Hint', element: '.cui-entry-card__hint', description: 'Caption, Neutral-5, one line with a 24px reserve for the chevron. Read in full.' },
          { name: 'Chevron', element: '<svg>.cui-entry-card__go', description: 'Caret right, Regular, 16px, Neutral-4, in the padding corner.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'artefact',
    title: 'Artefact',
    description: 'Each drawing has one hover (and keyboard focus) motion: the brief types, the lens scans, the bulb lights, the mix rebalances, the deck fans. Resize the page: the set, not the window, picks the columns.',
    render: () => <Set variant="artefact" label="Start from any piece" />,
    code: `<EntryCardSet label="Start from any piece" variant="artefact">
  <EntryCard title="Brief" hint="Turn an email into a brief" artefact="brief" onClick={openBrief} />
  <EntryCard title="Research" hint="Find what the market says" artefact="research" onClick={openResearch} />
  …
</EntryCardSet>`,
  },
  {
    id: 'character',
    title: 'Character',
    description: 'A figure drawn bigger than the card, its head rising above the top edge. The placeholder is the only figure the system ships; give each card a `still` (and a `clip`) for the real art.',
    render: () => <Set variant="character" label="Start from any piece" />,
    code: `<EntryCardSet label="Start from any piece" variant="character">
  <EntryCard title="Brief" hint="Turn an email into a brief" still="/entry/brief.png" clip={{ webm: '/entry/brief.webm', hevc: '/entry/brief.mov' }} onClick={openBrief} />
  …
</EntryCardSet>`,
  },
  {
    id: 'switch',
    title: 'Switching the look',
    description: 'A page-level pattern: the set\'s `variant` changes, the cards fade out, change in place and rise back in, 50ms apart. They are the same buttons, so focus stays put.',
    render: () => <Switching />,
    code: `const [variant, setVariant] = useState<EntryCardVariant>('artefact');

{/* Segmented Control (not converted yet): Artefact | Character */}
<EntryCardSet label="Start from any piece" variant={variant}>…</EntryCardSet>`,
  },
  {
    id: 'disabled',
    title: 'Unavailable',
    description: 'A button entry can be `disabled`: 40% media, Neutral-4 text, no chevron, no hover. A link entry is never disabled.',
    render: () => (
      <EntryCardSet label="Start" variant="artefact" idleTour={false}>
        <EntryCard title="Package" hint="Build a media package" artefact="package" onClick={noop} />
        <EntryCard title="Deck" hint="Available next month" artefact="deck" disabled />
      </EntryCardSet>
    ),
    code: `<EntryCard title="Deck" hint="Available next month" artefact="deck" disabled />`,
  },
];

export const props: DocsProp[] = [
  { name: 'EntryCardSet label', options: 'string', default: '—', required: true, description: 'Names the list ("list, 5 items").' },
  { name: 'EntryCardSet variant', options: "'character' | 'artefact'", default: "'character'", description: 'Every card in the set; one per set. Changing it runs the swap.' },
  { name: 'EntryCardSet columns', options: '4 | 5 | 6', default: '5', description: 'Columns at full width (860px of set and up).' },
  { name: 'EntryCardSet idleTour', options: 'boolean', default: 'true', description: 'Character: after 8s idle, one 4s beat per card, once per page view.' },
  { name: 'title / hint', options: 'string / string', default: '—', required: true, description: 'One line each; the hint truncates on screen and is read in full.' },
  { name: 'onClick / href', options: '() => void / string', default: '—', description: 'A button that opens something in place, or a link to a URL.' },
  { name: 'disabled', options: 'boolean', default: 'false', description: 'Button form only.' },
  { name: 'artefact', options: "'brief' | 'research' | 'idea' | 'package' | 'deck'", default: "'brief'", description: 'Artefact: the drawing.' },
  { name: 'still / clip', options: 'string / { webm?, hevc? }', default: '— (placeholder)', description: 'Character: the 4:3 art; the clip loads on first play.' },
  { name: 'figureX', options: 'number (px)', default: '0', description: 'Character: a per-character horizontal nudge.' },
  { name: 'variant', options: "'character' | 'artefact'", default: "'character'", description: 'Only for a card outside a set.' },
];

export const rules: DocsRules = {
  do: [
    'Use two to six entries, each opening one flow straight away.',
    'Use one variant for the whole set.',
    'Keep titles to about two words and hints to one line.',
    'Send focus to the opened view\'s heading, and back to the card on close.',
  ],
  dont: [
    'Don\'t mix Character and Artefact cards in one set.',
    'Don\'t use it for a promo with body copy (Hero Card), a thing to buy (Media Ad Card) or a choice submitted later (Radio Card).',
    'Don\'t give the card an `aria-label`: its name comes from the title and hint.',
    'Don\'t disable a link entry; use the button form.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves between entries. Focus shows the same lift and preview as hover.' },
    { keys: 'Enter / Space', action: 'Opens the entry (Enter only, for a link).' },
  ],
  notes: [
    'One name per card, from its content: "Brief, Turn an email into a brief". The ", " is hidden text so the two lines don\'t run together.',
    'The media is decorative (`aria-hidden`, `alt=""`, the clip out of the tab order); the chevron too.',
    'The set is a list with a label, so "list, 5 items" is announced.',
    'Playback is user-started (hover or focus) or a single 4s beat after 8s of stillness, once per card per page view, so it meets WCAG 2.2.2 without a pause control.',
    'In forced colours focus is a 2px outline, and a disabled card takes GrayText.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover or keyboard focus', motion: 'The card lifts 2px with shadow-2, the chevron nudges 2px, the figure rises 6px and its clip loops; an Artefact drawing runs its one motion.', token: '--duration-base · --ease-settle (drawings --duration-slow)' },
  { interaction: 'Press', motion: 'The lift collapses and the shadow drops to rest.', token: '--duration-instant' },
  { interaction: 'Switching the look', motion: 'Cards fade down and out, then rise back in 50ms apart; the headroom eases.', token: '--duration-base, --duration-morph · --ease-standard, --ease-settle' },
  { interaction: 'Reduced motion', motion: 'No lift, nudge, rise, drawing motion or swap; no clips load or play. Shadow and colour changes stay (the bulb still lights).', token: '—' },
];
