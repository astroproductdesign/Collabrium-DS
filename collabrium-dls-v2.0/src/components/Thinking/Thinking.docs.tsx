// Documentation for Thinking, rendered by the docs site (playground).
// Keep it consistent with Thinking.usage.md. Not part of the package build.
import { useEffect, useRef, useState } from 'react';
import { ArrowClockwise, FileText, PencilSimple, Stop, Terminal } from '@phosphor-icons/react';
import { Button } from '../Button';
import { LoadingState } from '../LoadingState';
import { Thinking } from './Thinking';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Thinking';

/** Listed under the AI Native overview, not on its own in the sidebar. */
export const group = 'AI Native';

export const description =
  'An expandable agent trace for AI work that has started producing named steps: a header with a live status, opening onto a timeline of rows. Four variants: Steps, Reasoning, Search and Coding.';

export const usage = `import { Thinking } from '@collabrium/ui';

export function Trace({ steps, done }: { steps: { label: string }[]; done: boolean }) {
  return (
    <Thinking
      variant="steps"
      steps={steps}
      status={done ? 'done' : 'working'}
      workingLabel="Thinking"
      doneLabel="Thought for 4 seconds"
    />
  );
}`;

export const thumbnail = () => (
  <Thinking
    variant="steps"
    steps={[{ label: 'Reading account notes' }]}
    status="done"
    workingLabel="Thinking"
    doneLabel="Thought for 4 seconds"
  />
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Thinking',
    element: '<div>.cui-thinking',
    description: 'The shell, max 360px wide. Its state is data attributes: data-expanded, data-done, data-active. Its minimum height eases between 0 and 176px so the response below never jumps.',
    children: [
      {
        name: 'Header',
        element: '<button>.cui-thinking__header',
        description: 'The one clickable surface. A negative margin cancels its padding, so the box stays small while the click target grows. aria-expanded and aria-controls.',
        children: [
          { name: 'Mark', element: 'svg.cui-thinking__mark', description: 'Phosphor Sparkle, Fill (Tier 2), icon-sm. Neutral-7 while working, Neutral-5 once done.' },
          {
            name: 'Status',
            element: 'span.cui-thinking__status',
            description: 'The live label and the past-tense label. Only one shows at a time.',
            children: [
              { name: 'Working label', element: 'span.cui-thinking__working', description: 'Shimmers while the run is going.' },
              { name: 'Done label', element: 'span.cui-thinking__done', description: 'Static, fades in when the run settles. Holds the settled duration, e.g. "Thought for 4 seconds".' },
            ],
          },
          { name: 'Timer', element: 'span.cui-thinking__timer', when: 'while working', description: 'The running time, caption, Neutral-5, figures line up. Stops when the run settles; its value becomes the past-tense label.' },
          { name: 'Chevron', element: 'svg.cui-thinking__chevron', description: 'Phosphor CaretDown, icon-micro. Rotates 180° when open. Never hidden.' },
        ],
      },
      {
        name: 'Trace',
        element: 'div.cui-thinking__trace',
        description: 'Opens and closes by animating grid rows from 0fr to 1fr. Inert while closed, so its links and buttons are not reachable.',
        children: [
          { name: 'Line', element: 'span.cui-thinking__line', description: '1px Neutral-3 vertical rule, centred under the header mark. Grows to the rows\' height as they arrive.' },
          {
            name: 'Rows',
            element: 'div.cui-thinking__rows',
            description: 'The content, 2px apart. What a row is depends on the variant.',
            children: [
              { name: 'Step row', element: 'div.cui-thinking__row', when: 'steps', description: 'Check or spinner, the step name, optional detail.' },
              { name: 'Prose row', element: 'div.cui-thinking__row[data-prose]', when: 'reasoning', description: 'No mark. Wrapping text, Neutral-7.' },
              { name: 'Query', element: 'div.cui-thinking__query', when: 'search', description: 'A magnifying glass and the search text.' },
              { name: 'Source row', element: 'a.cui-thinking__row', when: 'search', description: 'A real link: globe, title, domain.' },
              { name: 'Tool row', element: 'button.cui-thinking__row', when: 'coding', description: 'A toggle button: tool icon, tool, target, optional diff counts.' },
              { name: 'More', element: 'div.cui-thinking__more', when: 'with moreCount', description: '"+N more": the trace summarises, it never logs.' },
            ],
          },
        ],
      },
    ],
  },
];

const STEPS = [
  { label: 'Reading account notes' },
  { label: 'Scanning pipeline data' },
  { label: 'Comparing renewal timelines', detail: '12 accounts' },
  { label: 'Writing the risk summary' },
];

function LiveRunExample() {
  const [run, setRun] = useState(0);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [shown, setShown] = useState(0);
  const [handedOff, setHandedOff] = useState(false);
  const [endedAfter, setEndedAfter] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const running = endedAfter === null;

  useEffect(() => {
    const start = Date.now();
    setStartedAt(start);
    setShown(0);
    setHandedOff(false);
    setEndedAfter(null);
    timers.current = [
      ...[900, 1900, 3400, 4800].map((ms, i) => window.setTimeout(() => setShown(i + 1), ms)),
      window.setTimeout(() => setHandedOff(true), 2000),
      window.setTimeout(() => setEndedAfter(6), 6200),
    ];
    return () => timers.current.forEach(window.clearTimeout);
  }, [run]);

  const stop = () => {
    timers.current.forEach(window.clearTimeout);
    setEndedAfter(Math.round((Date.now() - startedAt) / 1000));
  };

  return (
    <div className="docs-stack" style={{ minHeight: 'calc(var(--spacing-60) * 3)' }}>
      {running && !handedOff && <LoadingState variant="orbit" label="Thinking" startedAt={startedAt} />}
      {handedOff && shown >= 2 && (
        <Thinking
          key={run}
          variant="steps"
          steps={STEPS.slice(0, shown)}
          status={running ? 'working' : 'done'}
          workingLabel="Thinking"
          startedAt={startedAt}
          doneLabel="Thought for {duration}"
        />
      )}
      {!running && !handedOff && <span className="docs-status">Stopped</span>}
      <div className="docs-row">
        <Button variant="ghost" size="sm" leadingIcon={running ? Stop : ArrowClockwise} onClick={running ? stop : () => setRun(r => r + 1)}>
          {running ? 'Stop' : 'Replay'}
        </Button>
      </div>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'live-run',
    title: 'A run, from Loading State to Thinking',
    description: 'Loading State covers the wait until two named steps exist and two seconds have passed. Then Thinking takes its place: it opens itself while working, adds steps without moving any, and closes into a past-tense header when done. Click the header to take control: your choice then wins for good. Stop and Replay belong to the host.',
    render: () => <LiveRunExample />,
    code: `import { useEffect, useRef, useState } from 'react';
import { ArrowClockwise, Stop } from '@phosphor-icons/react';

const STEPS = [
  { label: 'Reading account notes' },
  { label: 'Scanning pipeline data' },
  { label: 'Comparing renewal timelines', detail: '12 accounts' },
  { label: 'Writing the risk summary' },
];

function LiveRun() {
  const [run, setRun] = useState(0);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [shown, setShown] = useState(0);
  const [handedOff, setHandedOff] = useState(false);
  const [endedAfter, setEndedAfter] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const running = endedAfter === null;

  useEffect(() => {
    const start = Date.now();
    setStartedAt(start);
    setShown(0);
    setHandedOff(false);
    setEndedAfter(null);
    timers.current = [
      ...[900, 1900, 3400, 4800].map((ms, i) => window.setTimeout(() => setShown(i + 1), ms)),
      window.setTimeout(() => setHandedOff(true), 2000),
      window.setTimeout(() => setEndedAfter(6), 6200),
    ];
    return () => timers.current.forEach(window.clearTimeout);
  }, [run]);

  const stop = () => {
    timers.current.forEach(window.clearTimeout);
    setEndedAfter(Math.round((Date.now() - startedAt) / 1000));
  };

  return (
    <div>
      {running && !handedOff && <LoadingState variant="orbit" label="Thinking" startedAt={startedAt} />}
      {handedOff && shown >= 2 && (
        <Thinking
          key={run}
          variant="steps"
          steps={STEPS.slice(0, shown)}
          status={running ? 'working' : 'done'}
          workingLabel="Thinking"
          startedAt={startedAt}
          doneLabel="Thought for {duration}"
        />
      )}
      {!running && !handedOff && <span>Stopped</span>}
      <Button variant="ghost" size="sm" leadingIcon={running ? Stop : ArrowClockwise} onClick={running ? stop : () => setRun(r => r + 1)}>
        {running ? 'Stop' : 'Replay'}
      </Button>
    </div>
  );
}`,
  },
  {
    id: 'steps',
    title: 'Steps',
    description: 'Discrete actions taken in order. While working, the last step carries the spinner and every step above it a check; once done, all show checks. One spinner at a time.',
    render: () => (
      <div className="docs-stack">
        <Thinking variant="steps" steps={STEPS.slice(0, 3)} status="working" workingLabel="Thinking" doneLabel="Thought for 4 seconds" />
        <Thinking variant="steps" steps={STEPS} status="done" defaultExpanded workingLabel="Thinking" doneLabel="Thought for 4 seconds" />
      </div>
    ),
    code: `const steps = [
  { label: 'Reading account notes' },
  { label: 'Scanning pipeline data' },
  { label: 'Comparing renewal timelines', detail: '12 accounts' },
  { label: 'Writing the risk summary' },
];

{/* Working: opens itself, spinner on the last step */}
<Thinking variant="steps" steps={steps.slice(0, 3)} status="working" workingLabel="Thinking" doneLabel="Thought for 4 seconds" />

{/* Done: past-tense header, all checks. defaultExpanded keeps it open here. */}
<Thinking variant="steps" steps={steps} status="done" defaultExpanded workingLabel="Thinking" doneLabel="Thought for 4 seconds" />`,
  },
  {
    id: 'reasoning',
    title: 'Reasoning',
    description: 'Prose sentences of reasoning: no mark, wrapping text, never truncated.',
    render: () => (
      <Thinking
        variant="reasoning"
        paragraphs={[
          'Q4 renewal risk concentrates in two accounts with contracts expiring before December.',
          "Northwind is the one to flag first — it's already stalled since the Q3 proposal went quiet.",
        ]}
        status="done"
        defaultExpanded
        workingLabel="Thinking"
        doneLabel="Thought for 4 seconds"
      />
    ),
    code: `<Thinking
  variant="reasoning"
  paragraphs={[
    'Q4 renewal risk concentrates in two accounts with contracts expiring before December.',
    "Northwind is the one to flag first — it's already stalled since the Q3 proposal went quiet.",
  ]}
  status="done"
  defaultExpanded
  workingLabel="Thinking"
  doneLabel="Thought for 4 seconds"
/>`,
  },
  {
    id: 'search',
    title: 'Search',
    description: 'The query, then the sources read, each a real link that opens in a new tab (links do nothing inside these previews). A "+N more" line summarises the rest.',
    render: () => (
      <Thinking
        variant="search"
        query="Northwind Retail renewal history"
        sources={[
          { title: 'Northwind Retail', domain: 'northwindretail.com', href: 'https://northwindretail.com' },
          { title: 'Crunchbase', domain: 'crunchbase.com', href: 'https://www.crunchbase.com/organization/northwind-retail' },
          { title: 'LinkedIn', domain: 'linkedin.com', href: 'https://www.linkedin.com/company/northwind-retail' },
        ]}
        moreCount={7}
        status="done"
        defaultExpanded
        workingLabel="Searching the web"
        doneLabel="Searched the web"
      />
    ),
    code: `<Thinking
  variant="search"
  query="Northwind Retail renewal history"
  sources={[
    { title: 'Northwind Retail', domain: 'northwindretail.com', href: 'https://northwindretail.com' },
    { title: 'Crunchbase', domain: 'crunchbase.com', href: 'https://www.crunchbase.com/organization/northwind-retail' },
    { title: 'LinkedIn', domain: 'linkedin.com', href: 'https://www.linkedin.com/company/northwind-retail' },
  ]}
  moreCount={7}
  status="done"
  defaultExpanded
  workingLabel="Searching the web"
  doneLabel="Searched the web"
/>`,
  },
  {
    id: 'coding',
    title: 'Coding',
    description: 'Tool calls: tool, target and optional diff counts. Each row is a toggle button, one selected at a time, with a Neutral-3 fill that reads as pressed rather than hovered.',
    render: () => (
      <Thinking
        variant="coding"
        toolCalls={[
          { icon: FileText, name: 'Read', target: 'pipeline-config.ts' },
          { icon: PencilSimple, name: 'Edit', target: 'RenewalAlert.tsx', additions: 74, deletions: 41 },
          { icon: Terminal, name: 'Run', target: 'npm run notify-am' },
        ]}
        status="done"
        defaultExpanded
        workingLabel="Running tools"
        doneLabel="Ran 3 tools"
      />
    ),
    code: `import { FileText, PencilSimple, Terminal } from '@phosphor-icons/react';

<Thinking
  variant="coding"
  toolCalls={[
    { icon: FileText, name: 'Read', target: 'pipeline-config.ts' },
    { icon: PencilSimple, name: 'Edit', target: 'RenewalAlert.tsx', additions: 74, deletions: 41 },
    { icon: Terminal, name: 'Run', target: 'npm run notify-am' },
  ]}
  status="done"
  defaultExpanded
  workingLabel="Running tools"
  doneLabel="Ran 3 tools"
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'variant', options: "'steps' | 'reasoning' | 'search' | 'coding'", default: '—', required: true, description: 'What a row is, chosen by the shape of your data. Selects which of the row props below applies.' },
  { name: 'status', options: "'working' | 'done'", default: '—', required: true, description: '`working`: live label with a shimmer, trace opens itself. `done`: past-tense label, trace closes itself.' },
  { name: 'workingLabel', options: 'string', default: '—', required: true, description: 'The live label: "Thinking", "Searching the web", "Running tools". A status, not a title. Update it as phases change.' },
  { name: 'startedAt', options: 'number', default: 'mount time', description: 'When the run really started (`Date.now()`). A timer counts from here beside the live label; when the run is done it stops and becomes `{duration}` in `doneLabel`. Pass the same value you gave Loading State so the clock carries on. A trace that first renders as `done` has no timer.' },
  { name: 'doneLabel', options: 'string', default: '—', required: true, description: 'The past-tense label. Write `{duration}` for a live run ("Thought for {duration}") and the component fills in the settled time. Without it the label is shown as written: "Thought for 4 seconds", "Searched the web", "Ran 3 tools". It stays on screen as a record.' },
  { name: 'steps', options: 'ThinkingStep[]', default: '—', description: '`steps` variant. `{ label, detail? }` in order. Append only. The last one spins while working.' },
  { name: 'paragraphs', options: 'string[]', default: '—', description: '`reasoning` variant. One sentence or short paragraph per row.' },
  { name: 'query', options: 'string', default: '—', description: '`search` variant. What was searched for. Shown first.' },
  { name: 'sources', options: 'ThinkingSource[]', default: '—', description: '`search` variant. `{ title, domain, href }` in order. Each is a link that opens in a new tab.' },
  { name: 'toolCalls', options: 'ThinkingToolCall[]', default: '—', description: '`coding` variant. `{ icon, name, target, additions?, deletions? }` in order. `icon` is a Phosphor icon component.' },
  { name: 'onToolCallSelect', options: '(index: number | null) => void', default: '—', description: '`coding` variant. Called with the selected row\'s index, or `null` when it is deselected.' },
  { name: 'moreCount', options: 'number', default: '—', description: 'How many rows are not shown, for a "+7 more" line at the end.' },
  { name: 'defaultExpanded', options: 'boolean', default: 'follows the run', description: 'Start open or closed. Counts as the reader\'s own choice, so the trace then stops opening and closing by itself.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style` and `className` are not accepted. The ref is forwarded to the `<div>`.' },
];

export const rules: DocsRules = {
  do: [
    'Show it only once two or more named steps exist and two seconds have passed. Until then, use Loading State.',
    'Keep exactly one step in progress: the spinner on the last step, checks above it, nothing below it yet.',
    'Only append rows. A completed row never reorders, disappears or loses its mark.',
    'Cap the visible rows and close with a "+N more" count.',
    'Keep the Stop reachable while the trace is open, and the chevron always visible.',
  ],
  dont: [
    'Don\'t render it before the first named step has landed.',
    'Don\'t hand it back to Loading State once it is showing, even if steps stop arriving. The last step stays in progress until the first token.',
    'Don\'t stack a second one in the same view.',
    'Don\'t auto-close it while the reader has it pinned open.',
    'Don\'t pick a variant by preference. If your data fits none of the four row shapes, the trace is not ready to be shown.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves focus to the header, then (when open) to each link or button row.' },
    { keys: 'Enter / Space', action: 'On the header: opens or closes the trace. On a coding row: selects or deselects it.' },
    { keys: 'Enter', action: 'On a search source row: opens the link in a new tab.' },
  ],
  notes: [
    'The header is a real `<button>` with `aria-expanded` and `aria-controls` pointing at the trace.',
    'A visually hidden `role="status"` with `aria-live="polite"` sits beside the header button (not inside it, where a button\'s contents are its name) and announces the live and past-tense labels. Rows do not announce one by one: that would flood a screen reader on a long run. The trace stays reachable on demand.',
    'While the trace is closed it is inert, so its links and buttons cannot be reached by keyboard or read out.',
    'Coding rows are toggle buttons with `aria-pressed`. Search rows are real links.',
    'The header and the link and button rows show a 2px Obsidian focus ring (inside the row, so it does not collide with its neighbours).',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Open and close the trace', motion: 'Grid rows ease from 0fr to 1fr with a fade.', token: '--duration-base · --ease-settle' },
  { interaction: 'Chevron', motion: 'Rotates 180° when open.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Shell height', motion: 'The minimum height eases between 0 and 176px while working or open, so the response below never jumps.', token: '--duration-morph · --ease-morph' },
  { interaction: 'Timeline line', motion: 'Grows to the rows\' height as they arrive. A one-time entrance.', token: '--duration-reveal · --ease-reveal' },
  { interaction: 'Row entrance', motion: 'Each row rises 4px and fades in, staggered 120ms by position.', token: '--duration-slow · --ease-settle' },
  { interaction: 'Working label', motion: 'A shimmer sweeps the text while the run goes. It is the only sign the work has not stalled when the trace is closed.', token: '—' },
  { interaction: 'Timer', motion: 'Counts up while the run goes, ticking even under reduced motion, and is replaced by the past-tense label when the run settles.', token: '—' },
  { interaction: 'Done label and "+N more"', motion: 'Fade in.', token: '--duration-slow · --duration-base · --ease-standard' },
  { interaction: 'Spinner on the current step', motion: 'Rotates continuously.', token: '--duration-ambient' },
  { interaction: 'Reduced motion', motion: 'The expand, row stagger, line growth, shimmer and fades go; rows still appear in order. The spinner on the current step keeps turning.', token: '—' },
];
