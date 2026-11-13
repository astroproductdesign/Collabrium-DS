// Documentation for Tutorial Modal, rendered by the docs site (playground).
// Keep it consistent with TutorialModal.usage.md. Not part of the package build.
import { useRef, useState } from 'react';
import { X } from '@phosphor-icons/react';
import { TutorialModal, type TutorialStep } from './TutorialModal';
import { Button } from '../Button';
import { SegmentedControl } from '../SegmentedControl';
import { StatCard, StatGrid } from '../StatCard';
import { Table, type TableColumn } from '../Table';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Tutorial Modal';

// A part of the Modals group (user's request, 2026-11-12).
export const group = 'Modals';

export const description =
  'A numbered walkthrough of a page. One part is spotlighted at a time and explained in a short card that grows out of it; the reader moves with Back and Next. The page is locked while it runs, and the ×, Escape or the scrim end it. A variant of Modal.';

export const usage = `import { TutorialModal, type TutorialStep } from '@collabrium/ui';

const steps: TutorialStep[] = [
  { title: 'Welcome to the sales board', body: 'One page that answers where the quarter stands…' },
  { title: 'Where the quarter stands', body: 'Three numbers, each against last quarter.', target: statsRef },
  { title: "You're set", body: 'Reopen this tour any time from Help.' },
];

const [open, setOpen] = useState(false);

<Button variant="secondary" onClick={() => setOpen(true)}>Take the tour</Button>
<TutorialModal open={open} steps={steps} onEnd={() => setOpen(false)} />`;

// A static card for the pictures: the same classes, laid out in place rather than over the page.
function StaticCard({ n, total, title: t, body, shape }: { n: number; total: number; title: string; body: string; shape: 'intro' | 'stop' | 'signoff' }) {
  return (
    <div className="cui-tutorial__card" role="group" aria-label={`${shape} step`} data-shape={shape}>
      <span className="cui-tutorial__close">
        <Button variant="ghost" size="sm" iconOnly icon={X} aria-label="Close the tour" />
      </span>
      <span className="cui-tutorial__kicker">
        {n} of {total}
      </span>
      <h4 className="cui-tutorial__title">{t}</h4>
      <p className="cui-tutorial__body">{body}</p>
      <div className="cui-tutorial__actions">
        <Button variant="ghost" size="sm">
          {shape === 'intro' ? 'Skip the tour' : 'Back'}
        </Button>
        <Button variant="primary" size="sm">
          {shape === 'intro' ? 'Show me' : shape === 'signoff' ? 'Done' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

export const thumbnail = () => (
  <div className="docs-tutorial-stage docs-tutorial-stage--thumb">
    <StaticCard n={1} total={5} shape="intro" title="Welcome to the sales board" body="One page that answers where the quarter stands and what deserves attention next." />
  </div>
);

type Deal = { id: string; account: string; stage: string; value: string };
const deals: Deal[] = [
  { id: '1', account: 'Celcom Axiata', stage: 'Negotiation', value: 'RM 420,000.00' },
  { id: '2', account: 'GRABCAR SDN BHD', stage: 'Proposal', value: 'RM 180,000.00' },
  { id: '3', account: 'Astro Malaysia', stage: 'Closed won', value: 'RM 96,500.00' },
];
const columns: TableColumn<Deal>[] = [
  { key: 'account', header: 'Account' },
  { key: 'stage', header: 'Stage' },
  { key: 'value', header: 'Value', type: 'number' },
];

function Board() {
  const [open, setOpen] = useState(false);
  const [ended, setEnded] = useState<string | null>(null);
  const stats = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLDivElement>(null);
  const table = useRef<HTMLDivElement>(null);
  const steps: TutorialStep[] = [
    {
      title: 'Welcome to the sales board',
      body: 'One page that answers where the quarter stands and what deserves attention next. The next three stops show you how to move around it, and it takes about a minute.',
    },
    { title: 'Where the quarter stands', body: 'Three numbers, each against the same point last quarter. Green is ahead, red is behind.', target: stats },
    { title: 'Change the window', body: 'Month, quarter or year to date. Every number on the board follows it.', target: range },
    { title: 'The deals behind it', body: 'Every open deal, largest first. Click a row to open the account.', target: table },
    { title: "You're set", body: 'Reopen this tour any time from Help, top right.' },
  ];
  return (
    <div className="docs-tutorial-board">
      <div className="docs-tutorial-head">
        <div ref={range}>
          <SegmentedControl
            aria-label="Date range"
            defaultValue="qtd"
            options={[
              { value: 'mtd', label: 'MTD' },
              { value: 'qtd', label: 'QTD' },
              { value: 'ytd', label: 'YTD' },
            ]}
          />
        </div>
        <div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setEnded(null);
              setOpen(true);
            }}
          >
            Take the tour
          </Button>
        </div>
      </div>
      <div ref={stats}>
        <StatGrid>
          <StatCard label="Bookings" value="RM 1.2M" trend={{ direction: 'up', value: '8.2%', period: 'vs last quarter' }} />
          <StatCard label="Win rate" value="34%" trend={{ direction: 'down', value: '2.1%', period: 'vs last quarter' }} />
          <StatCard label="Open deals" value="27" trend={{ direction: 'up', value: '3', period: 'vs last quarter' }} />
        </StatGrid>
      </div>
      <div ref={table}>
        <Table label="Open deals" columns={columns} rows={deals} getRowKey={(d) => d.id} />
      </div>
      {ended && <p className="docs-tutorial-note">The tour ended: {ended}.</p>}
      <TutorialModal
        open={open}
        steps={steps}
        onEnd={(reason) => {
          setOpen(false);
          setEnded(reason);
        }}
      />
    </div>
  );
}

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Layer',
    element: '<div>.cui-tutorial',
    description: 'Fixed over the whole window at `--z-tour` (1100), above everything, Toast included. Takes every click; a click on it ends the tour.',
    children: [
      { name: 'Spotlight', element: '.cui-tutorial__spot', description: 'The scrim with a hole: the target plus a 6px pad, a 2px Obsidian ring 2px out, the target\'s own corner radius plus 6px. Travels from step to step.' },
      { name: 'Spotlight, no target', element: '[data-none]', when: 'intro, sign-off, missing target', description: 'Dims the whole page: no hole, no ring.' },
      {
        name: 'Card',
        element: '[role=dialog].cui-tutorial__card',
        description: '340px, Neutral-1, radius-lg, shadow-modal, 20px padding, parts 8px apart. `aria-modal="false"`, named by the title, described by the counter and body.',
        children: [
          { name: 'Close', element: 'Button (ghost, sm, icon-only)', description: '"Close the tour", 8px from the top and right.' },
          { name: 'Counter', element: '.cui-tutorial__kicker', description: '"1 of 5": label3, eyebrow tracking, uppercase, Neutral-5, tabular figures.' },
          { name: 'Title', element: 'h4.cui-tutorial__title', description: 'h4 (20/28/800), Neutral-9. Two lines at most, never clamped.' },
          { name: 'Body', element: 'p.cui-tutorial__body', description: 'body2 at 1.6, Neutral-5. Four lines at most, never clamped; it scrolls if the card outgrows the window.' },
          { name: 'Actions', element: '.cui-tutorial__actions', description: 'Right-aligned, 8px apart, no divider: Skip the tour + Show me, Back + Next, or Back + Done.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'tour',
    title: 'A tour of a page',
    description: 'Take the tour: an intro, three stops (the numbers, the date range, the table) and a sign-off. The card grows out of each target, below it where it fits. While it runs the page is locked: Tab stays in the card, and the ×, Escape or a click on the scrim ends it. At 767px and below the card docks to the bottom.',
    render: () => <Board />,
    code: `const statsRef = useRef<HTMLDivElement>(null);
const rangeRef = useRef<HTMLDivElement>(null);
const tableRef = useRef<HTMLDivElement>(null);

const steps: TutorialStep[] = [
  { title: 'Welcome to the sales board', body: 'One page that answers where the quarter stands…' },
  { title: 'Where the quarter stands', body: 'Three numbers, each against…', target: statsRef },
  { title: 'Change the window', body: 'Month, quarter or year to date…', target: rangeRef },
  { title: 'The deals behind it', body: 'Every open deal, largest first…', target: tableRef },
  { title: "You're set", body: 'Reopen this tour any time from Help, top right.' },
];

<Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Take the tour</Button>
<TutorialModal open={open} steps={steps} onEnd={(reason) => setOpen(false)} />`,
  },
  {
    id: 'shapes',
    title: 'Three shapes',
    description: 'The first step spells out the way out ("Skip the tour"); from the second the × carries it alone and the footer is Back and Next; the last ends with Done, which commits nothing.',
    render: () => (
      <div className="docs-tutorial-stage">
        <StaticCard n={1} total={5} shape="intro" title="Welcome to the sales board" body="One page that answers where the quarter stands and what deserves attention next. It takes about a minute." />
        <StaticCard n={3} total={5} shape="stop" title="Change the window" body="Month, quarter or year to date. Every number on the board follows it." />
        <StaticCard n={5} total={5} shape="signoff" title="You're set" body="Reopen this tour any time from Help, top right." />
      </div>
    ),
    code: `// The shape follows the step's position: the first is the intro, the last the sign-off.
<TutorialModal open={open} steps={steps} onEnd={end} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'open', options: 'boolean', default: '—', required: true, description: 'Whether the tour is running. It starts at the first step each time.' },
  { name: 'steps', options: '{ title, body, target? }[]', default: '—', required: true, description: 'An intro, at least one stop, a sign-off. `target` is a selector, a ref or a function returning the element; leave it out on the first and last steps.' },
  { name: 'onEnd', options: "(reason: 'done' | 'skip' | 'close') => void", default: '—', required: true, description: 'The tour ended: Done, Skip the tour, or the ×, Escape or the scrim. Set `open` to false.' },
  { name: 'onStepChange', options: '(index: number) => void', default: '—', description: 'Called when the reader moves to another step.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the card. `style` and `className` are not accepted. The ref is forwarded to the card.' },
];

export const rules: DocsRules = {
  do: [
    'Keep a tour short enough to be worth a minute: an intro, a few stops, a sign-off.',
    'Point each stop at something rendered and visible; on a phone, at something no taller than the band above the card.',
    'Keep titles to two lines and bodies to four: a title needing three lines is two steps.',
  ],
  dont: [
    'Don\'t use it for one step: use a Tooltip or an Info Banner, which leave the page usable.',
    'Don\'t auto-advance, and don\'t ask the reader to click something to go on.',
    'Don\'t put screenshots, video, progress dots or "Learn more" in the card.',
    'Don\'t run two tours at once.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab / Shift+Tab', action: 'Round the card\'s buttons only.' },
    { keys: 'Enter / Space', action: 'Show me, Next, Back, Done, Skip the tour, or the ×.' },
    { keys: 'Escape', action: 'Ends the tour (and goes no further, so a modal underneath stays open).' },
  ],
  notes: [
    'The card is a dialog named by its title and described by the counter and body, so each step reads "Change the window, dialog, 3 of 5, Month, quarter…". Focus moves to the card on every step; there is no live region.',
    '`aria-modal` stays false and the page is not made inert: it can\'t be used during a tour, but a screen reader can still read the element a step describes. A click guard stops it being activated.',
    'When the tour ends, focus returns to whatever started it.',
    'On a touch screen the footer buttons are 44px tall and the × takes a 44px hit area.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'A step opens', motion: 'The card grows out of its target (never shrinks into it) and fades in.', token: '--duration-morph · --ease-morph' },
  { interaction: 'Next / Back', motion: 'The spotlight travels to the new target and takes its shape.', token: '--duration-morph · --ease-morph' },
  { interaction: 'Docked (767px and below)', motion: 'The card rises 12px from the bottom (or drops from the top).', token: '--duration-morph · --ease-morph' },
  { interaction: 'Reduced motion', motion: 'The card cross-fades in; the spotlight jumps. Steps, copy and targets unchanged.', token: '--duration-fast · --ease-standard' },
];
