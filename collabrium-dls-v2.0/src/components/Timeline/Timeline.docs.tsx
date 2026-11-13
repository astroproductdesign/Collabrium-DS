// Documentation for Timeline, rendered by the docs site (playground).
// Keep it consistent with Timeline.usage.md. Not part of the package build.
import { useId, useState } from 'react';
import {
  FileText,
  FilePdf,
  Lightbulb,
  MagnifyingGlass,
  Package,
  PresentationChart,
  Rocket,
  Flag,
  Handshake,
  ArrowRight,
  ListChecks,
} from '@phosphor-icons/react';
import { Timeline, TimelineFile, type TimelineItem } from './Timeline';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardHeader } from '../Card';
import { ListEmpty } from '../List';
import { SegmentedControl } from '../SegmentedControl';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

// Its own page, with a pointer on Stepper's (decided 2026-11-12, Q-TL-5). The Card widget pattern is shown as an
// example (decided 2026-11-12, Q-TL-6).
export const title = 'Timeline';

export const description =
  "Stepper's read-only plan variant: an ordered list of items, each with its own status, joined by a line whose colour and dash follow the item above. For campaign phases, milestones, approval flows, deliverables and roadmaps.";

export const usage = `import { Timeline } from '@collabrium/ui';

<h4 id="milo">MILO Raya 2027</h4>
<Timeline
  aria-labelledby="milo"
  dot="icon"
  items={[
    { id: 'brief', heading: 'Brief', status: 'completed', date: '9 Oct', statusLabel: 'Done', icon: FileText },
    { id: 'idea', heading: 'Big idea', status: 'current', date: 'Due 23 Oct', statusLabel: 'In progress', icon: Lightbulb, progress: 60 },
    { id: 'deck', heading: 'Deck', status: 'upcoming', date: 'Due 4 Nov', icon: PresentationChart },
  ]}
/>`;

const milo: TimelineItem[] = [
  { id: 'brief', heading: 'Brief', status: 'completed', date: '9 Oct', statusLabel: 'Done', icon: FileText },
  { id: 'research', heading: 'Research', status: 'completed', date: '16 Oct', statusLabel: 'Done', icon: MagnifyingGlass },
  { id: 'idea', heading: 'Big idea', status: 'current', date: 'Due 23 Oct', statusLabel: 'In progress', icon: Lightbulb, progress: 60 },
  { id: 'package', heading: 'Package', status: 'upcoming', date: 'Due 30 Oct', icon: Package },
  { id: 'deck', heading: 'Deck', status: 'upcoming', date: 'Due 4 Nov', icon: PresentationChart },
];

const phases: TimelineItem[] = [
  { id: 'brief', heading: 'Brief', status: 'completed', opposite: '1–9 Oct', statusLabel: 'Done', icon: FileText, description: 'Objectives, audience and budget agreed with the client.' },
  { id: 'research', heading: 'Research', status: 'completed', opposite: '10–16 Oct', statusLabel: 'Done', icon: MagnifyingGlass },
  { id: 'idea', heading: 'Big idea', status: 'current', opposite: '19–23 Oct', statusLabel: 'In progress', note: '3 routes', icon: Lightbulb, progress: 60, description: 'Three creative routes in review. The client picks one on Thursday, and the team develops it into the package the week after, with a first look at the key visual and the launch film script before anything goes to production.' },
  { id: 'package', heading: 'Package', status: 'upcoming', opposite: '26–30 Oct', icon: Package },
  { id: 'deck', heading: 'Deck', status: 'upcoming', opposite: '2–4 Nov', icon: PresentationChart },
];

const statuses: TimelineItem[] = [
  { id: 'a', heading: 'Kick-off', status: 'completed', date: '9 Oct', statusLabel: 'Done' },
  { id: 'b', heading: 'Media plan', status: 'overdue', date: 'Due 15 Oct', statusLabel: 'Overdue' },
  { id: 'c', heading: 'Creative review', status: 'current', date: 'Due 23 Oct', statusLabel: 'In progress' },
  { id: 'd', heading: 'Legal sign-off', status: 'at-risk', date: 'Due 27 Oct', statusLabel: 'At risk:', note: 'waiting on music rights' },
  { id: 'e', heading: 'Localisation', status: 'blocked', date: 'Due 29 Oct', statusLabel: 'Blocked:', note: 'final cut not locked' },
  { id: 'f', heading: 'Print run', status: 'skipped', date: '30 Oct', statusLabel: 'Skipped' },
  { id: 'g', heading: 'Launch', status: 'upcoming', date: 'Due 4 Nov' },
];

const milestones: TimelineItem[] = [
  { id: 'a', heading: 'Contract signed', status: 'completed', date: '2 Sep', icon: Handshake, slot: <Badge variant="success">Done</Badge> },
  { id: 'b', heading: 'Campaign live', status: 'current', date: 'Due 1 Oct', icon: Rocket, slot: <Badge variant="info">In progress</Badge> },
  { id: 'c', heading: 'Mid-flight report', status: 'upcoming', date: 'Due 15 Nov', icon: PresentationChart, slot: <Badge variant="neutral">Upcoming</Badge> },
  { id: 'd', heading: 'Wrap-up', status: 'upcoming', date: 'Due 20 Dec', icon: Flag, slot: <Badge variant="neutral">Upcoming</Badge> },
];

const approvals: TimelineItem[] = [
  { id: 'a', heading: 'Nadia Rahim, Brand', status: 'completed', avatar: { initials: 'NR' }, date: '14 Oct', statusLabel: 'Approved', details: <p>Happy with route B. Keep the tagline short.</p> },
  { id: 'b', heading: 'Arif Hakim, Legal', status: 'current', avatar: { initials: 'AH' }, statusLabel: 'Waiting' },
  { id: 'c', heading: 'Wei Lin Tan, Finance', status: 'upcoming', avatar: { initials: 'WT' } },
];

const deliverables: TimelineItem[] = [
  {
    id: 'a', heading: 'Key visual', status: 'completed', opposite: '20 Oct', statusLabel: 'Done',
    slot: <TimelineFile icon={FilePdf}>KV_final_v3.pdf</TimelineFile>,
    details: <p>v3 · 20 Oct · colour pass. v2 · 17 Oct · copy change. v1 · 14 Oct.</p>,
  },
  { id: 'b', heading: 'Launch film, 30s', status: 'current', opposite: 'Due 28 Oct', statusLabel: 'In progress', slot: <TimelineFile icon={FileText}>Script_30s.docx</TimelineFile> },
  { id: 'c', heading: 'Social cut-downs', status: 'upcoming', opposite: 'Due 3 Nov' },
];

const roadmap: TimelineItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `r${i}`,
  heading: ['Pitch', 'Pitch', 'Launch', 'Campaign', 'Campaign', 'Renewal', 'Launch', 'Campaign'][i] + ` ${i + 1}`,
  status: (i < 5 ? 'completed' : i === 5 ? 'current' : 'upcoming') as TimelineItem['status'],
  date: i < 5 ? `${i + 2} Sep` : `Due ${i + 2} Oct`,
  statusLabel: i < 5 ? 'Done' : i === 5 ? 'In progress' : undefined,
}));

function Clickable() {
  const [selected, setSelected] = useState('idea');
  return (
    <Timeline
      aria-label="MILO Raya 2027, open a phase"
      dot="icon"
      items={milo.map(item => ({ ...item, onClick: () => setSelected(item.id), selected: item.id === selected }))}
    />
  );
}

const OPEN: TimelineItem['status'][] = ['current', 'upcoming', 'overdue', 'at-risk', 'blocked'];
const FILTERS = [
  { value: 'all', label: 'All', keep: () => true, empty: 'No phases' },
  { value: 'open', label: 'Open', keep: (i: TimelineItem) => OPEN.includes(i.status), empty: 'No open phases' },
  { value: 'late', label: 'Late', keep: (i: TimelineItem) => i.status === 'overdue', empty: 'No late phases' },
  { value: 'done', label: 'Done', keep: (i: TimelineItem) => i.status === 'completed', empty: 'No finished phases' },
];

// The Card widget pattern: an M Timeline in a Card, a compact Segmented Control to filter it, a count that updates in
// place (no live region), and "View all". A composition of shipped parts, not a component.
function Widget() {
  const titleId = useId();
  const [filter, setFilter] = useState('all');
  const f = FILTERS.find(x => x.value === filter)!;
  const shown = milo.map((item, i) => ({ ...item, step: i + 1 })).filter(f.keep);
  return (
    <div className="docs-timeline-widget">
      <Card>
        <CardHeader
          title={<span id={titleId}>MILO Raya 2027</span>}
          subtitle={`${shown.length} of ${milo.length} phases · ${f.label}`}
          action={
            <Button variant="ghost" size="sm" trailingArrow="right" onClick={() => {}}>
              View all<span className="cui-timeline__sr"> phases</span>
            </Button>
          }
        />
        <SegmentedControl
          aria-label="Show phases"
          size="compact"
          options={FILTERS.map(({ value, label }) => ({ value, label }))}
          value={filter}
          onValueChange={setFilter}
        />
        {shown.length ? (
          <Timeline aria-labelledby={titleId} dot="icon" items={shown} steps={{ total: milo.length }} />
        ) : (
          <ListEmpty title={f.empty} icon={ListChecks} />
        )}
      </Card>
    </div>
  );
}

export const thumbnail = () => (
  <Timeline aria-label="Plan" items={statuses.slice(0, 4)} steps={false} />
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Timeline',
    element: '<ol role="list">.cui-timeline',
    description: "Labelled by its visible heading. A size container named cui-timeline, so the narrow rules follow its own width.",
    children: [
      {
        name: 'Item',
        element: '<li>.cui-timeline__item[data-status]',
        description: 'A grid: opposite (96px) · separator · content. `aria-current="step"` on the one current item.',
        children: [
          { name: 'Separator', element: '.cui-timeline__separator (aria-hidden)', description: 'The dot and the connector.' },
          { name: 'Dot', element: '.cui-timeline__dot > __mark | Lists avatar', description: 'Carries the current ring and pulse. The mark is the painted circle; avatars are Lists\' lead, with a status badge on the corner.' },
          { name: 'Connector', element: '.cui-timeline__connector', description: '2px, 4px off each dot, coloured by the item above: solid done, dashed not yet, partial in progress. None after the last item.' },
          { name: 'Body', element: '.cui-timeline__body (div | a | button)', description: 'The date (above), the heading (two lines), the description (three, then Show more) and the caption (date below, status word, note).' },
          { name: 'Slot', element: '.cui-timeline__slot', description: 'A Badge, Tag, file chip, avatar, or a Button on static items.' },
          { name: 'Details', element: 'Button + .cui-timeline__details', description: 'A Ghost sm "Details" toggle and a Neutral-2 panel. M and L only.' },
          { name: 'Opposite', element: '.cui-timeline__opposite (aria-hidden)', description: 'Caption, 96px, repeated for screen readers in the body.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'horizontal',
    title: 'Horizontal',
    description: 'M, icon dots, the date above. Items share the row from 600px of the timeline\'s own width; below that it falls back to vertical. Big idea is 60% done: its connector is solid that far, then dashed.',
    render: () => <Timeline aria-label="MILO Raya 2027" dot="icon" orientation="horizontal" items={milo} />,
    code: `<Timeline aria-labelledby="milo" dot="icon" orientation="horizontal" items={phases} />`,
  },
  {
    id: 'statuses',
    title: 'Every status',
    description: 'Plain dots, so every item says its status in the caption: completed, overdue, current, at risk, blocked, skipped, upcoming. The line after each item takes its colour and dash.',
    render: () => <Timeline aria-label="Launch plan" items={statuses} />,
    code: `<Timeline aria-label="Launch plan" items={[
  { id: 'a', heading: 'Kick-off', status: 'completed', date: '9 Oct', statusLabel: 'Done' },
  { id: 'b', heading: 'Media plan', status: 'overdue', date: 'Due 15 Oct', statusLabel: 'Overdue' },
  { id: 'd', heading: 'Legal sign-off', status: 'at-risk', date: 'Due 27 Oct', statusLabel: 'At risk:', note: 'waiting on music rights' },
  …
]} />`,
  },
  {
    id: 'phases',
    title: 'Campaign phases',
    description: 'M, icon dots, the date range in the opposite column. A long description clamps at three lines with Show more. Under 400px of width the range stacks above the heading.',
    render: () => <Timeline aria-label="Campaign phases" dot="icon" datePosition="opposite" items={phases} />,
    code: `<Timeline aria-label="Campaign phases" dot="icon" datePosition="opposite" items={phases} />`,
  },
  {
    id: 'milestones',
    title: 'Milestones',
    description: 'L, icon dots, the date below, the status in a Badge (so the caption carries only the date).',
    render: () => <Timeline aria-label="Milestones" size="lg" dot="icon" datePosition="below" items={milestones} />,
    code: `<Timeline aria-label="Milestones" size="lg" dot="icon" datePosition="below"
  items={[{ id: 'a', heading: 'Contract signed', status: 'completed', date: '2 Sep', icon: Handshake,
    slot: <Badge variant="success">Done</Badge> }, …]} />`,
  },
  {
    id: 'approvals',
    title: 'Approval flow',
    description: "M, avatar dots, the date below with decision captions. The approver's comment is under Details.",
    render: () => <Timeline aria-label="Approvals" dot="avatar" datePosition="below" items={approvals} />,
    code: `<Timeline aria-label="Approvals" dot="avatar" datePosition="below" items={[
  { id: 'a', heading: 'Nadia Rahim, Brand', status: 'completed', avatar: { initials: 'NR' }, date: '14 Oct',
    statusLabel: 'Approved', details: <p>Happy with route B.</p> }, …]} />`,
  },
  {
    id: 'deliverables',
    title: 'Deliverables',
    description: 'M, plain dots, the due date opposite, file chips in the slot, version history under Details.',
    render: () => <Timeline aria-label="Deliverables" datePosition="opposite" items={deliverables} />,
    code: `<Timeline aria-label="Deliverables" datePosition="opposite" items={[
  { id: 'a', heading: 'Key visual', status: 'completed', opposite: '20 Oct', statusLabel: 'Done',
    slot: <TimelineFile icon={FilePdf}>KV_final_v3.pdf</TimelineFile>, details: <p>v3 · 20 Oct …</p> }, …]} />`,
  },
  {
    id: 'alternate',
    title: 'Alternate',
    description: 'Sides swap each item from 600px of width; the date range goes above the heading on the content\'s side. Narrower, it reads right.',
    render: () => <Timeline aria-label="Campaign phases, alternate" dot="icon" position="alternate" datePosition="opposite" items={phases} />,
    code: `<Timeline aria-label="Campaign phases" dot="icon" position="alternate" datePosition="opposite" items={phases} />`,
  },
  {
    id: 'clickable',
    title: 'Clickable',
    description: 'Each body is a button (or a link with `href`); the selected one is Neutral-2 with an Obsidian start bar. Only the body is clickable, never the dot or the line.',
    render: () => <Clickable />,
    code: `<Timeline aria-label="MILO Raya 2027" dot="icon"
  items={phases.map(p => ({ ...p, onClick: () => open(p.id), selected: p.id === openId }))} />`,
  },
  {
    id: 'partial',
    title: 'Partial list and sizes',
    description: 'Eight items with the first five folded behind "Show 5 earlier items"; the line stops at the last one shown. S size: 12px gap, caption descriptions, plain dots.',
    render: () => <Timeline aria-label="Roadmap" size="sm" items={roadmap} collapsed={{ earlier: 5 }} />,
    code: `<Timeline aria-label="Roadmap" size="sm" items={roadmap} collapsed={{ earlier: 5 }} />`,
  },
  {
    id: 'widget',
    title: 'Card widget',
    description: 'A recipe, not a component: an M Timeline in a Card, a compact Segmented Control (All, Open, Late, Done), a count that updates in place, and "View all". The line ends at the last item shown, and each item keeps its step number. An empty filter shows Lists\' empty state.',
    render: () => <Widget />,
    code: `<Card>
  <CardHeader title="MILO Raya 2027" subtitle={\`\${shown.length} of 5 phases · \${filter}\`}
    action={<Button variant="ghost" size="sm" trailingArrow="right">View all</Button>} />
  <SegmentedControl aria-label="Show phases" size="compact" options={filters} value={filter} onValueChange={setFilter} />
  {shown.length
    ? <Timeline aria-labelledby={titleId} dot="icon" items={shown} steps={{ total: 5 }} />
    : <ListEmpty title="No late phases" />}
</Card>`,
  },
  {
    id: 'loading',
    title: 'Loading',
    description: 'Three to five skeleton items, content style (a dot bone and two bars) or block style. The list is busy and reads "Loading…".',
    render: () => <Timeline aria-label="Plan, loading" dot="icon" items={[]} loading={{ count: 3 }} />,
    code: `<Timeline aria-label="Plan" dot="icon" items={[]} loading={{ count: 3 }} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'items', options: 'TimelineItem[]', default: '—', required: true, description: '`id`, `heading` (required); `status`, `date`, `opposite`, `statusLabel`, `note`, `description`, `icon`, `avatar`, `slot`, `details`, `href` / `onClick`, `selected`, `progress`, `outlined`, `step` (its number in the whole plan, for a filtered list).' },
  { name: 'aria-labelledby / aria-label', options: 'string', default: '—', description: 'Name it by its visible heading.' },
  { name: 'size', options: "'sm' | 'md' | 'lg'", default: "'md'", description: 'S takes plain dots only and no Details.' },
  { name: 'dot', options: "'plain' | 'icon' | 'avatar'", default: "'plain'", description: 'Never mixed in one timeline.' },
  { name: 'position', options: "'right' | 'left' | 'alternate' | 'alternate-reverse'", default: "'right'", description: 'Alternate from 600px of its own width.' },
  { name: 'orientation', options: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Horizontal from 600px; about six items at most. Ignores `position`.' },
  { name: 'datePosition', options: "'above' | 'below' | 'opposite'", default: "'above'", description: 'One date place per timeline.' },
  { name: 'steps', options: 'false | { start?, total? }', default: '{ start: 1, total: items }', description: '"Step n of total", read before each heading.' },
  { name: 'loading', options: "{ count?, style?: 'content' | 'block' }", default: '—', description: 'Skeleton items while it loads.' },
  { name: 'collapsed', options: '{ earlier?, later? }', default: '—', description: 'Items folded behind a toggle under the list.' },
  { name: 'moreLabels', options: '{ collapsed, expanded }', default: '"Show more" / "Show less"', description: 'The description toggle\'s words.' },
];

export const rules: DocsRules = {
  do: [
    'Use it for a plan: campaign phases, milestones, approvals, deliverables, roadmaps. Oldest first.',
    'Give every item a status and exactly one item `current`; say the status once, in the caption or a Badge.',
    'Write "Due 30 Oct" for an item that isn\'t done, a plain date once done or skipped; ranges stay plain.',
    'Keep one date place per timeline, and one dot type.',
  ],
  dont: [
    "Don't use it for activity history: that is Lists' Activity Log.",
    "Don't use it for a numbered step-by-step flow: that is Stepper. No number dots.",
    "Don't put interactive slots in a clickable item, or Details at S.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves through clickable bodies, Show more, Details and the list toggles. Nothing else in a static timeline is a stop.' },
    { keys: 'Enter / Space', action: 'Opens or acts on a clickable body; toggles Show more and Details.' },
  ],
  notes: [
    'An `<ol role="list">` named by its heading; `aria-current="step"` on the current item.',
    'Each heading reads "Step n of total" first; current and upcoming items add ", current" / ", upcoming"; the others say their status in the caption.',
    'The separator is hidden: status never rests on the dot or the line alone.',
    'The opposite column is hidden and repeated in the body.',
    'Show more and Details carry `aria-expanded` and `aria-controls`; focus stays on the toggle. No live regions.',
    'Forced colours: filled marks become CanvasText discs, outlined marks rings, current Highlight; solid vs dashed lines survive.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Current', motion: 'A short pulse grows off the dot three times (about 4s), then rests as the static ring.', token: '1.5 × --duration-ambient · --ease-standard (recorded one-off)' },
  { interaction: 'Details', motion: 'The caret turns.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Loading', motion: 'The bones shimmer.', token: '--duration-ambient' },
  { interaction: 'Reduced motion', motion: 'No pulse (the ring stays), no shimmer; the caret flips at once.', token: '—' },
];
