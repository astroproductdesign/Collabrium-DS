// Documentation for LoadingState, rendered by the docs site (playground).
// Keep it consistent with LoadingState.usage.md. Not part of the package build.
import { useEffect, useState } from 'react';
import { ArrowClockwise, Stop } from '@phosphor-icons/react';
import { Button } from '../Button';
import { LoadingState } from './LoadingState';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Loading State';

/** Listed under the AI Native overview, not on its own in the sidebar. */
export const group = 'AI Native';

export const description =
  'A pixel-grid loader with a live status label and a real elapsed timer, for AI work only: model generation, tool execution, agent runs.';

export const usage = `import { LoadingState } from '@collabrium/ui';

export function Waiting({ phase, startedAt }: { phase: string; startedAt: number }) {
  return <LoadingState variant="orbit" label={phase} startedAt={startedAt} />;
}`;

export const thumbnail = () => <LoadingState variant="orbit" label="Thinking" />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Loading State',
    element: '<div>.cui-loading-state',
    description: 'The live region: role="status" with aria-live="polite". Always in the page; its content appears 400ms after the start.',
    children: [
      {
        name: 'Grid',
        element: 'span.cui-loading-state__grid',
        description: '3×3 cells, 4px each, 1.5px gap. The variant is a data attribute: data-variant. aria-hidden.',
        children: [
          { name: 'Cell', element: 'span.cui-loading-state__cell', description: 'Nine of them. Each pulses opacity on its own delay and steps through the pastel colours. In Orbit the centre cell stays dim (data-off).' },
        ],
      },
      { name: 'Label', element: 'span.cui-loading-state__label', description: 'Caption, weight 500, Neutral-9. Live text that changes with the phase. Announced once per change.' },
      { name: 'Elapsed timer', element: 'span.cui-loading-state__elapsed', description: 'Caption, Neutral-5, tabular numerals. Counts from the real start. aria-hidden.' },
    ],
  },
];

const PHASES = ['Thinking', 'Reading the export', 'Comparing books', 'Drafting'];

function LiveExample() {
  const [running, setRunning] = useState(true);
  const [phase, setPhase] = useState(0);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setPhase(p => (p + 1) % PHASES.length), 2600);
    return () => window.clearInterval(id);
  }, [running]);
  const toggle = () => {
    if (running) {
      setRunning(false);
    } else {
      setPhase(0);
      setStartedAt(Date.now());
      setRunning(true);
    }
  };
  return (
    <div className="docs-row">
      {running ? <LoadingState variant="orbit" label={PHASES[phase]} startedAt={startedAt} /> : <span className="docs-status">Stopped</span>}
      <Button variant="ghost" size="sm" leadingIcon={running ? Stop : ArrowClockwise} onClick={toggle}>
        {running ? 'Stop' : 'Run again'}
      </Button>
    </div>
  );
}

function HoldBackExample() {
  const [run, setRun] = useState<{ startedAt: number; ms: number } | null>(null);
  useEffect(() => {
    if (!run) return;
    const id = window.setTimeout(() => setRun(null), run.ms);
    return () => window.clearTimeout(id);
  }, [run]);
  const start = (ms: number) => setRun({ startedAt: Date.now(), ms });
  return (
    <div className="docs-stack">
      <div className="docs-row" style={{ minHeight: 'var(--spacing-24)' }}>
        {run ? <LoadingState variant="orbit" label="Thinking" startedAt={run.startedAt} /> : <span className="docs-status">Nothing running</span>}
      </div>
      <div className="docs-row">
        <Button variant="secondary" size="sm" disabled={!!run} onClick={() => start(200)}>Finish in 0.2s</Button>
        <Button variant="secondary" size="sm" disabled={!!run} onClick={() => start(2500)}>Finish in 2.5s</Button>
      </div>
    </div>
  );
}

function FirstTokenExample() {
  const [state, setState] = useState<'idle' | 'waiting' | 'streaming'>('idle');
  useEffect(() => {
    if (state !== 'waiting') return;
    const id = window.setTimeout(() => setState('streaming'), 3000);
    return () => window.clearTimeout(id);
  }, [state]);
  return (
    <div className="docs-stack">
      <div className="docs-row" style={{ minHeight: 'var(--spacing-24)' }}>
        {state === 'idle' && <span className="docs-status">Nothing asked yet</span>}
        {state === 'waiting' && <LoadingState variant="orbit" label="Drafting" />}
        {state === 'streaming' && <span className="docs-status">Here is your summary of the export…</span>}
      </div>
      <div className="docs-row">
        <Button variant="secondary" size="sm" disabled={state === 'waiting'} onClick={() => setState('waiting')}>
          Ask the assistant
        </Button>
      </div>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'variants',
    title: 'Variants',
    description: 'Drive and Dots share one wavefront and differ only in cell shape; Orbit is a single comet. They are shown together here to compare. A real view shows one loader.',
    render: () => (
      <div className="docs-row">
        <LoadingState variant="drive" label="Drive" />
        <LoadingState variant="dots" label="Dots" />
        <LoadingState variant="orbit" label="Orbit" />
      </div>
    ),
    code: `<LoadingState variant="drive" label="Drive" />
<LoadingState variant="dots" label="Dots" />
<LoadingState variant="orbit" label="Orbit" />`,
  },
  {
    id: 'live-status',
    title: 'Live label, timer and Stop',
    description: 'The label changes as the phase changes, the timer counts from the real start, and the surface that hosts the loader always offers a Stop. This demo cycles the phases on a timer; in your app they come from real events.',
    render: () => <LiveExample />,
    code: `import { useEffect, useState } from 'react';
import { ArrowClockwise, Stop } from '@phosphor-icons/react';

const PHASES = ['Thinking', 'Reading the export', 'Comparing books', 'Drafting'];

function Live() {
  const [running, setRunning] = useState(true);
  const [phase, setPhase] = useState(0);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setPhase(p => (p + 1) % PHASES.length), 2600);
    return () => window.clearInterval(id);
  }, [running]);
  const toggle = () => {
    if (running) {
      setRunning(false);
    } else {
      setPhase(0);
      setStartedAt(Date.now());
      setRunning(true);
    }
  };
  return (
    <div>
      {running ? <LoadingState variant="orbit" label={PHASES[phase]} startedAt={startedAt} /> : <span>Stopped</span>}
      <Button variant="ghost" size="sm" leadingIcon={running ? Stop : ArrowClockwise} onClick={toggle}>
        {running ? 'Stop' : 'Run again'}
      </Button>
    </div>
  );
}`,
  },
  {
    id: 'hold-back',
    title: 'Appears at 400ms, never before',
    description: 'The loader holds itself back for 400ms after the start. Work that finishes sooner never shows it, because a loader flashed for 120ms reads worse than no feedback. Try both.',
    render: () => <HoldBackExample />,
    code: `import { useEffect, useState } from 'react';

function HoldBack() {
  const [run, setRun] = useState<{ startedAt: number; ms: number } | null>(null);
  useEffect(() => {
    if (!run) return;
    const id = window.setTimeout(() => setRun(null), run.ms);
    return () => window.clearTimeout(id);
  }, [run]);
  const start = (ms: number) => setRun({ startedAt: Date.now(), ms });
  return (
    <div>
      <div style={{ minHeight: 'var(--spacing-24)' }}>
        {run ? <LoadingState variant="orbit" label="Thinking" startedAt={run.startedAt} /> : <span>Nothing running</span>}
      </div>
      <Button variant="secondary" size="sm" disabled={!!run} onClick={() => start(200)}>Finish in 0.2s</Button>
      <Button variant="secondary" size="sm" disabled={!!run} onClick={() => start(2500)}>Finish in 2.5s</Button>
    </div>
  );
}`,
  },
  {
    id: 'first-token',
    title: 'Gone at the first token',
    description: 'Remove the loader the moment the first text arrives, not when the answer is complete, and let the text take its place. Nothing of the loader is left behind.',
    render: () => <FirstTokenExample />,
    code: `import { useEffect, useState } from 'react';

function FirstToken() {
  const [state, setState] = useState<'idle' | 'waiting' | 'streaming'>('idle');
  useEffect(() => {
    if (state !== 'waiting') return;
    const id = window.setTimeout(() => setState('streaming'), 3000);
    return () => window.clearTimeout(id);
  }, [state]);
  return (
    <div>
      <div style={{ minHeight: 'var(--spacing-24)' }}>
        {state === 'idle' && <span>Nothing asked yet</span>}
        {state === 'waiting' && <LoadingState variant="orbit" label="Drafting" />}
        {state === 'streaming' && <span>Here is your summary of the export…</span>}
      </div>
      <Button variant="secondary" size="sm" disabled={state === 'waiting'} onClick={() => setState('waiting')}>
        Ask the assistant
      </Button>
    </div>
  );
}`,
  },
];

export const props: DocsProp[] = [
  { name: 'variant', options: "'drive' | 'dots' | 'orbit'", default: '—', required: true, description: '`drive`: square cells, a wavefront driving right. `dots`: round cells, the same wavefront. `orbit`: one comet lapping the outer ring, centre cell dim.' },
  { name: 'label', options: 'string', default: '—', required: true, description: 'What the AI is doing right now. Change it as the phase changes ("Thinking", "Reading the export", "Drafting"). Announced once per change.' },
  { name: 'startedAt', options: 'number', default: 'the moment it mounted', description: 'When the operation really started, as `Date.now()`. The timer counts from here and the 400ms hold-back is measured from here. Pass it when the work began before this component mounted.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style`, `className` and `role` are not accepted. The ref is forwarded to the `<div>`.' },
];

export const rules: DocsRules = {
  do: [
    'Use it for AI work only: model generation, tool execution, agent runs.',
    'Drive the label from real phase changes, not a fixed string.',
    'Pass `startedAt` when the work began before the component mounted, so the timer is true.',
    'Give the surface that hosts it a Stop, and let the loader occupy the space the result will fill.',
    'Remove it at the first streamed token, and swap to Thinking once named steps appear.',
  ],
  dont: [
    'Don\'t use it for data fetches, uploads, filters, page transitions or table loads. Use a spinner or a skeleton.',
    'Don\'t show more than one in the same view. Collapse to the single slowest operation.',
    'Don\'t let it survive past the first streamed token, even for a frame.',
    'Don\'t nest a disclosure or trace inside it, or make it clickable.',
    'Don\'t block the surface with it or wrap it in a modal.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None. Loading State is not interactive and never takes focus.',
  notes: [
    'The root is `role="status"` with `aria-live="polite"`. It is always in the page, so a screen reader is already watching it when the content appears and when the label changes.',
    'Only a real label change is announced. The grid and the timer are `aria-hidden`: a figure that changes every 100ms is unusable in a live region.',
    'The label says what is happening, so colour never carries meaning.',
    'It never takes focus. Moving focus to a loader would interrupt the person for decoration.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Drive and Dots', motion: 'Each cell pulses opacity (.15 → 1 → .15) on a 650ms loop, staggered 90ms per step, so two fronts are always in flight.', token: '--ease-standard' },
  { interaction: 'Orbit', motion: 'The same pulse on a 950ms loop, staggered 110ms around the outer ring, clockwise from top-left. The centre cell never animates.', token: '--ease-standard' },
  { interaction: 'Colour', motion: 'Every active cell steps through Gold, Water, Wood, Fire and Earth pastel together, one flat colour at a time, on a 5s linear loop.', token: '--color-gold-pastel · --color-water-pastel · --color-wood-pastel · --color-fire-pastel · --color-earth-pastel' },
  { interaction: 'Reduced motion', motion: 'The grid settles on a flat Gold-pastel frame. The label was never animated and the timer keeps running: it is the one thing left proving the work is happening.', token: '—' },
];
