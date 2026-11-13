// Documentation for ActionBar, rendered by the docs site (playground).
// Keep it consistent with ActionBar.usage.md. Not part of the package build.
import { useRef, useState } from 'react';
import { BookmarkSimple, Columns, Plus } from '@phosphor-icons/react';
import { ActionBar, type ActionBarPick } from './ActionBar';
import { Checkbox } from '../Checkbox';
import { FilterChipGroup } from '../Chip';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Action bar';

export const description =
  'A bar that floats at the bottom of the page while the reader has a selection: it says how much is selected and offers the actions for it. User select (people, as an avatar stack) or Item select (2 to 4 things to compare, as removable chips).';

export const usage = `import { ActionBar } from '@collabrium/ui';

<ActionBar
  variant="users"
  aria-label="Selected influencers"
  open={selected.length > 0}
  people={selected}
  title={\`\${selected.length} influencers selected\`}
  description="Select and generate influencers into a shareable link for your clients"
  dismiss={{ label: 'Cancel', hiddenLabel: ' selection', onClick: clear }}
  secondary={{ label: 'Save to a list', icon: BookmarkSimple, onClick: save }}
  primary={{ label: 'Create new list', icon: Plus, onClick: create }}
  fallbackFocusRef={listHeadingRef}
/>`;

const noop = () => {};
const two = [
  { id: 'ay', name: 'Aisyah Yusof' },
  { id: 'tl', name: 'Tan Li Wei' },
];
const six = [...two, { id: 'rk', name: 'Ravi Kumar' }, { id: 'ns', name: 'Nur Syafiqah' }, { id: 'jl', name: 'Jason Lim' }, { id: 'mh', name: 'Mei Hua' }];

export const thumbnail = () => (
  <ActionBar
    variant="picks"
    placement="inline"
    aria-label="Formats to compare"
    open
    picks={[{ id: 'sg', name: 'Swipe Gallery' }, { id: 'sw', name: 'Scratch & Win' }]}
    onRemovePick={noop}
    title="2 formats selected"
    description="Maximum 4 formats."
    dismiss={{ label: 'Clear', onClick: noop }}
    primary={{ label: 'Compare', icon: Columns, onClick: noop }}
  />
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'ActionBar',
    element: '<section>.cui-action-bar',
    description: 'A named region at `<body>` level, fixed at the bottom from `--cui-action-bar-inset-start` (the page\'s sidebar width) to the right edge, 24px up (12px on phones), above the page (`--z-bar`). Only the panel takes clicks.',
    children: [
      {
        name: 'Panel',
        element: '.cui-action-bar__panel',
        description: 'Neutral-1, 1px Neutral-3, radius-lg, shadow-4, 16 / 24px padding; full width up to 880px, centred.',
        children: [
          { name: 'Avatar stack', element: '.cui-action-bar__stack', when: 'users', description: '32px circles overlapping by 10px: 4 then "+N" (2 on phones), "99+" past 99. Decorative.' },
          { name: 'Chips', element: 'ul.cui-action-bar__list', when: 'picks', description: 'Removable Input Chips, at most 4; a name past 15 characters shows its first 15 and "…".' },
          { name: 'Title', element: 'h2.cui-action-bar__title', description: '"{n} {noun} selected": label2, Neutral-9, one line. Focus lands here after a change made in the bar.' },
          { name: 'Description', element: 'p.cui-action-bar__desc', description: 'Caption, Neutral-5, one line. Below the minimum it is the reason a gated action points at. Hidden on phones in User select.' },
          { name: 'Actions', element: '.cui-action-bar__actions', description: 'Ghost sm dismiss first, the one Primary last (md, sm at 640px and under). User select adds a Secondary.' },
        ],
      },
    ],
  },
  { name: 'ActionBarSpacer', element: '<div>.cui-action-bar-spacer', description: 'Optional, at the end of the scrolling content: as tall as the open bar\'s clearance.' },
];

function UsersDemo() {
  const people = [
    { id: 'ay', name: 'Aisyah Yusof' },
    { id: 'tl', name: 'Tan Li Wei' },
    { id: 'rk', name: 'Ravi Kumar' },
    { id: 'ns', name: 'Nur Syafiqah' },
    { id: 'jl', name: 'Jason Lim' },
  ];
  const [sel, setSel] = useState<string[]>([]);
  const heading = useRef<HTMLHeadingElement | null>(null);
  const chosen = people.filter((p) => sel.includes(p.id));
  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  return (
    <div className="docs-stack">
      <h3 ref={heading} tabIndex={-1} className="docs-demo-heading">Influencers</h3>
      {people.map((p) => (
        <Checkbox key={p.id} label={p.name} checked={sel.includes(p.id)} onChange={() => toggle(p.id)} />
      ))}
      <ActionBar
        variant="users"
        aria-label="Selected influencers"
        open={chosen.length > 0}
        people={chosen}
        title={`${chosen.length} influencer${chosen.length === 1 ? '' : 's'} selected`}
        description="Select and generate influencers into a shareable link for your clients"
        dismiss={{ label: 'Cancel', hiddenLabel: ' selection', onClick: () => setSel([]) }}
        secondary={{ label: 'Save to a list', icon: BookmarkSimple, onClick: () => setSel([]) }}
        primary={{ label: 'Create new list', icon: Plus, onClick: () => setSel([]) }}
        fallbackFocusRef={heading}
      />
    </div>
  );
}

const FORMATS: ActionBarPick[] = [
  { id: 'sg', name: 'Swipe Gallery' },
  { id: 'sw', name: 'Scratch & Win' },
  { id: 'ie', name: 'Interactive Experience Banner' },
  { id: 'vc', name: 'Video Carousel' },
  { id: 'pc', name: 'Poll Card' },
];

function PicksDemo() {
  const [sel, setSel] = useState<string[]>([]);
  const heading = useRef<HTMLHeadingElement | null>(null);
  const picks = sel.map((id) => FORMATS.find((f) => f.id === id)!).filter(Boolean);
  return (
    <div className="docs-stack">
      <h3 ref={heading} tabIndex={-1} className="docs-demo-heading">Ad formats</h3>
      <FilterChipGroup
        mode="multi"
        aria-label="Formats to compare"
        options={FORMATS.map((f) => ({ value: f.id, label: f.name }))}
        value={sel}
        // A fifth pick is refused: the host would raise a Toast ("Compare holds four").
        onValueChange={(v) => setSel((s) => (v.length > 4 ? s : v))}
      />
      <ActionBar
        variant="picks"
        aria-label="Formats to compare"
        open={picks.length > 0}
        picks={picks}
        onRemovePick={(id) => setSel((s) => s.filter((x) => x !== id))}
        title={`${picks.length} format${picks.length === 1 ? '' : 's'} selected`}
        description={picks.length < 2 ? 'Minimum 2 formats.' : 'Maximum 4 formats.'}
        dismiss={{ label: 'Clear', hiddenLabel: ' all picks', onClick: () => setSel([]) }}
        primary={{ label: 'Compare', icon: Columns, onClick: noop, disabled: picks.length < 2 }}
        fallbackFocusRef={heading}
      />
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'users',
    title: 'User select',
    description: 'People chosen from Profile cards or a roster: the avatar stack, "{n} influencers selected", and Cancel, Save to a list and Create new list. Past 4 people the stack shows "+N". Shown in place here; in use it floats at the bottom of the page.',
    render: () => (
      <div className="docs-stack">
        <ActionBar
          variant="users"
          placement="inline"
          aria-label="Selected influencers"
          headingLevel={3}
          open
          people={two}
          title="2 influencers selected"
          description="Select and generate influencers into a shareable link for your clients"
          dismiss={{ label: 'Cancel', hiddenLabel: ' selection', onClick: noop }}
          secondary={{ label: 'Save to a list', icon: BookmarkSimple, onClick: noop }}
          primary={{ label: 'Create new list', icon: Plus, onClick: noop }}
        />
        <ActionBar
          variant="users"
          placement="inline"
          aria-label="Selected influencers, six"
          headingLevel={3}
          open
          people={six}
          title="6 influencers selected"
          description="Select and generate influencers into a shareable link for your clients"
          dismiss={{ label: 'Cancel', hiddenLabel: ' selection', onClick: noop }}
          secondary={{ label: 'Save to a list', icon: BookmarkSimple, onClick: noop }}
          primary={{ label: 'Create new list', icon: Plus, onClick: noop }}
        />
      </div>
    ),
    code: `<ActionBar
  variant="users"
  aria-label="Selected influencers"
  open={people.length > 0}
  people={people}
  title="2 influencers selected"
  description="Select and generate influencers into a shareable link for your clients"
  dismiss={{ label: 'Cancel', hiddenLabel: ' selection', onClick: clear }}
  secondary={{ label: 'Save to a list', icon: BookmarkSimple, onClick: save }}
  primary={{ label: 'Create new list', icon: Plus, onClick: create }}
  fallbackFocusRef={listHeadingRef}
/>`,
  },
  {
    id: 'picks',
    title: 'Item select',
    description: 'Things compared by name, 2 to 4: the chips, the count, Clear and Compare. With one pick the description gives the reason and Compare is gated (focusable, but it does nothing). A name past 15 characters is cut; the full name stays in its hover title and for screen readers.',
    render: () => (
      <div className="docs-stack">
        <ActionBar
          variant="picks"
          placement="inline"
          aria-label="Formats to compare, one"
          headingLevel={3}
          open
          picks={[{ id: 'ie', name: 'Interactive Experience Banner' }]}
          onRemovePick={noop}
          title="1 format selected"
          description="Minimum 2 formats."
          dismiss={{ label: 'Clear', hiddenLabel: ' all picks', onClick: noop }}
          primary={{ label: 'Compare', icon: Columns, onClick: noop, disabled: true }}
        />
        <ActionBar
          variant="picks"
          placement="inline"
          aria-label="Formats to compare"
          headingLevel={3}
          open
          picks={FORMATS.slice(0, 4)}
          onRemovePick={noop}
          title="4 formats selected"
          description="Maximum 4 formats."
          dismiss={{ label: 'Clear', hiddenLabel: ' all picks', onClick: noop }}
          primary={{ label: 'Compare', icon: Columns, onClick: noop }}
        />
      </div>
    ),
    code: `<ActionBar
  variant="picks"
  aria-label="Formats to compare"
  open={picks.length > 0}
  picks={picks}
  onRemovePick={remove}
  title={\`\${picks.length} formats selected\`}
  description={picks.length < 2 ? 'Minimum 2 formats.' : 'Maximum 4 formats.'}
  dismiss={{ label: 'Clear', hiddenLabel: ' all picks', onClick: clear }}
  primary={{ label: 'Compare', icon: Columns, onClick: compare, disabled: picks.length < 2 }}
  fallbackFocusRef={listHeadingRef}
/>`,
  },
  {
    id: 'ai',
    title: 'AI shimmer',
    description: 'User select for a selection the AI made or suggested: Prompt input bar\'s moving pastel edge and glow. Only the surface changes. Still under reduced motion; hidden in forced colours.',
    render: () => (
      <ActionBar
        variant="users"
        placement="inline"
        aria-label="Suggested influencers"
        headingLevel={3}
        open
        ai
        people={six.slice(0, 3)}
        title="3 influencers suggested"
        description="Picked by the assistant from your brief"
        dismiss={{ label: 'Cancel', hiddenLabel: ' selection', onClick: noop }}
        secondary={{ label: 'Save to a list', icon: BookmarkSimple, onClick: noop }}
        primary={{ label: 'Create new list', icon: Plus, onClick: noop }}
      />
    ),
    code: `<ActionBar variant="users" ai … />`,
  },
  {
    id: 'live-users',
    title: 'Live: pick people',
    description: 'Tick a name and the bar rises at the bottom of the window; untick them all, or press Cancel, and it leaves, with focus back on the list\'s heading.',
    render: () => <UsersDemo />,
    code: `const [selected, setSelected] = useState<string[]>([]);

<h2 ref={headingRef} tabIndex={-1}>Influencers</h2>
{people.map(p => <Checkbox key={p.id} label={p.name} checked={selected.includes(p.id)} onChange={() => toggle(p.id)} />)}

<ActionBar variant="users" open={selected.length > 0} people={chosen} … fallbackFocusRef={headingRef} />`,
  },
  {
    id: 'live-picks',
    title: 'Live: compare formats',
    description: 'Pick formats to compare. One pick gates Compare; a fifth is refused. Removing a chip in the bar moves focus to the bar\'s title, which reads the new count; removing the last sends it back to the heading.',
    render: () => <PicksDemo />,
    code: `<FilterChipGroup mode="multi" value={selected} onValueChange={v => v.length <= 4 && setSelected(v)} … />

<ActionBar
  variant="picks"
  open={picks.length > 0}
  picks={picks}
  onRemovePick={id => setSelected(s => s.filter(x => x !== id))}
  …
  primary={{ label: 'Compare', icon: Columns, onClick: compare, disabled: picks.length < 2 }}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'variant', options: "'users' | 'picks'", default: '—', required: true, description: 'User select (people) or Item select (2 to 4 things compared by name).' },
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the region ("Selected influencers").' },
  { name: 'open', options: 'boolean', default: '—', required: true, description: 'Shows the bar: true while there is a selection. The page owns the selection.' },
  { name: 'title', options: 'string', default: '—', required: true, description: '"{n} {noun} selected", the count first.' },
  { name: 'description', options: 'ReactNode', default: '—', required: true, description: 'One line under the title; below the minimum, the reason.' },
  { name: 'people', options: '{ id, name, initials?, src? }[]', default: '—', description: 'users: the selection, in order.' },
  { name: 'picks, onRemovePick', options: '{ id, name }[], (id) => void', default: '—', description: 'picks: at most 4, and the removal from the bar (× or Delete / Backspace).' },
  { name: 'dismiss', options: '{ label, hiddenLabel?, onClick }', default: '—', required: true, description: 'The Ghost dismiss: "Cancel" or "Clear". `hiddenLabel` adds words for screen readers (" selection").' },
  { name: 'secondary', options: '{ label, icon?, onClick, disabled? }', default: '—', description: 'users: "Save to a list".' },
  { name: 'primary', options: '{ label, icon?, onClick, disabled? }', default: '—', required: true, description: 'The one Primary, last. `disabled` gates it: focusable, clicks ignored, pointing at the description.' },
  { name: 'ai', options: 'boolean', default: 'false', description: 'users: the AI shimmer, for a selection the AI made or suggested.' },
  { name: 'fallbackFocusRef', options: 'RefObject<HTMLElement>', default: '—', description: 'Where focus goes when the bar hides, or its last pick is removed, with focus inside it: the list\'s heading.' },
  { name: 'headingLevel', options: '2 | 3 | 4', default: '2', description: 'The title\'s level.' },
  { name: 'placement', options: "'fixed' | 'inline'", default: "'fixed'", description: '`inline` shows it in the page\'s flow, always open, for a picture of the bar.' },
  { name: 'ActionBarSpacer', options: 'component', default: '—', description: 'At the end of the scrolling content, so the last row can scroll clear of the open bar.' },
  { name: '--cui-action-bar-inset-start', options: 'CSS length, on <html>', default: '0px', description: 'The page\'s sidebar width, so the bar centres over the content.' },
];

export const rules: DocsRules = {
  do: [
    'Use User select for people, Item select for things compared by name.',
    'Keep a gated action focusable, with its reason in the description.',
    'Let the page own the selection: cards, the bar and storage change together.',
    'Pass a fallback heading, so focus has somewhere to go when the bar leaves.',
  ],
  dont: [
    'Don\'t show two bars at once, or a plain and an AI bar on one page.',
    'Don\'t evict a pick to make room for a fifth: refuse it with a Toast.',
    'Don\'t restyle its Buttons or Chips.',
    'Don\'t use it on a page with a floating Prompt input bar: both claim the bottom centre.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves through the chips\' ×, the dismiss and the actions, in the order they appear.' },
    { keys: 'Delete / Backspace', action: 'On a chip\'s ×: removes the pick; focus moves to the title.' },
    { keys: 'Enter / Space', action: 'On a gated action: nothing happens; it reads its reason.' },
  ],
  notes: [
    'A `<section>` region named by `aria-label`; the title is a heading.',
    'No live region: a change made in the bar moves focus to the title, which reads the new count; a change made from a card doesn\'t move focus (the card\'s own state says it).',
    'When the bar hides with focus inside it, focus moves to the page\'s fallback heading first.',
    'A cut name keeps the full name for screen readers and in its hover title; the × reads "Remove {name}".',
    'A gated action uses `aria-disabled` and `aria-describedby` (the reason), never `disabled`.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Opening', motion: 'Rises from below and fades in.', token: '--duration-slow · --ease-standard' },
  { interaction: 'Closing', motion: 'Falls and fades out.', token: '--duration-base · --ease-standard' },
  { interaction: 'A toast overlaps it', motion: 'Rises clear of it, 12px above.', token: '--duration-base · --ease-standard' },
  { interaction: 'AI shimmer', motion: 'The pastel edge and glow move round.', token: '4s linear, looping' },
  { interaction: 'Reduced motion', motion: 'A short fade only; the AI glow is still.', token: '--duration-fast' },
];
