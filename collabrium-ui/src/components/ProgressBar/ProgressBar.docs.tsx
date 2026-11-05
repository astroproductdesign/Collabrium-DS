// Documentation for Progress Bar, rendered by the docs site (playground).
// Keep it consistent with ProgressBar.usage.md. Not part of the package build.
import { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { Button } from '../Button';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Progress Bar';

export const description =
  'A horizontal, read-only bar showing progress toward a known goal (determinate, single or stacked) or an active process of unknown length (indeterminate). Not a Slider: no thumb, no drag, no focus of its own.';

export const usage = `import { ProgressBar } from '@collabrium/ui';

export function Upload({ percent }: { percent: number }) {
  return <ProgressBar title="Upload progress" value={percent} />;
}`;

const budget = [
  { label: 'Water', value: 16, element: 'water' as const },
  { label: 'Gold', value: 12, element: 'gold' as const },
  { label: 'Wood', value: 22, element: 'wood' as const },
  { label: 'Earth', value: 18, element: 'earth' as const },
  { label: 'Fire', value: 32, element: 'fire' as const },
];

// Mounts the bars again, so the entrance (0 up to the value) can be watched.
function Replay() {
  const [key, setKey] = useState(0);
  return (
    <div className="docs-stack">
      <div key={key} className="docs-stack">
        <ProgressBar title="Upload progress" value={72} />
        <ProgressBar title="Onboarding checklist" value={100} valueText="Complete" tone="success" />
        <ProgressBar title="Sync failed" value={38} valueText="Retry needed" tone="error" />
        <ProgressBar title="Q3 budget by department" valueText="RM 400,000 total" segments={budget} />
      </div>
      <div className="docs-row">
        <Button variant="secondary" size="sm" onClick={() => setKey(k => k + 1)}>
          Play again
        </Button>
      </div>
    </div>
  );
}

export const thumbnail = () => (
  <div className="docs-stack">
    <ProgressBar title="Upload progress" value={72} />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Progress Bar',
    element: '<div>.cui-progress',
    description: 'Full width of its parent.',
    children: [
      { name: 'Header row', element: '.cui-progress__header', description: 'Optional: the title (caption bold, Neutral-9) on the left, the value (caption, Neutral-5) on the right, 4px above the track.' },
      { name: 'Track', element: '.cui-progress__track[data-size]', description: 'Neutral-3, radius-pill: 4px compact, 8px default, 16px large. Carries `role="progressbar"`.' },
      { name: 'Fill', element: '.cui-progress__fill[data-tone]', description: 'Obsidian by default; Green for an explicit Complete, Red for Error, or a department\'s colour.' },
      { name: 'Segments', element: '.cui-progress__segment', description: 'Stacked: contiguous, rounded on the outer edges only; the Neutral-3 remainder at the right.' },
      { name: 'Trailing / inside label', element: '.cui-progress__trailing / __fill-label', description: 'The value after the track, or inside a large fill wider than 40px.' },
      { name: 'Legend', element: '.cui-progress__legend', description: 'Stacked only: an 8px swatch, the label and the value per segment, under the bar.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'determinate',
    title: 'Determinate: Default, Complete, Error, Stacked',
    description: 'Each fill grows in from 0 when the bar mounts. Complete is green only because the caller says so: the bar never changes colour by itself at 100%.',
    render: () => <Replay />,
    code: `<ProgressBar title="Upload progress" value={72} />
<ProgressBar title="Onboarding checklist" value={100} valueText="Complete" tone="success" />
<ProgressBar title="Sync failed" value={38} valueText="Retry needed" tone="error" />
<ProgressBar
  title="Q3 budget by department"
  valueText="RM 400,000 total"
  segments={[
    { label: 'Water', value: 16, element: 'water' },
    { label: 'Gold', value: 12, element: 'gold' },
    { label: 'Wood', value: 22, element: 'wood' },
    { label: 'Earth', value: 18, element: 'earth' },
    { label: 'Fire', value: 32, element: 'fire' },
  ]}
/>`,
  },
  {
    id: 'general',
    title: 'Stacked, general data',
    description: 'Segments with no department take Purple, then Turquoise, then Neutral-4 for any more. What the segments don\'t fill is the Neutral-3 remainder.',
    render: () => (
      <div className="docs-stack">
        <ProgressBar
          title="Storage"
          valueText="74 GB of 100 GB"
          segments={[
            { label: 'Video', value: 41 },
            { label: 'Images', value: 23 },
            { label: 'Other', value: 10 },
          ]}
        />
      </div>
    ),
    code: `<ProgressBar
  title="Storage"
  valueText="74 GB of 100 GB"
  segments={[
    { label: 'Video', value: 41 },
    { label: 'Images', value: 23 },
    { label: 'Other', value: 10 },
  ]}
/>`,
  },
  {
    id: 'labels',
    title: 'Sizes and label placement',
    description: 'Compact with a trailing value for tight rows; default with a header row; large with the value inside the fill. With no visible title, name the bar with `aria-label`.',
    render: () => (
      <div className="docs-stack">
        <ProgressBar aria-label="Seats used" value={47} size="compact" labelPlacement="trailing" />
        <ProgressBar title="Profile completeness" value={60} />
        <ProgressBar aria-label="Quarterly target" value={82} size="large" labelPlacement="inside" />
      </div>
    ),
    code: `<ProgressBar aria-label="Seats used" value={47} size="compact" labelPlacement="trailing" />
<ProgressBar title="Profile completeness" value={60} />
<ProgressBar aria-label="Quarterly target" value={82} size="large" labelPlacement="inside" />`,
  },
  {
    id: 'indeterminate',
    title: 'Indeterminate',
    description: 'Activity with no measure of how far: a shimmer travels the track. No value and no label slot. Under reduced motion it stops at a still Neutral-4 bar, 60% across.',
    render: () => (
      <div className="docs-stack">
        <ProgressBar title="Syncing your workspace…" indeterminate />
      </div>
    ),
    code: `<ProgressBar title="Syncing your workspace…" indeterminate />`,
  },
];

export const props: DocsProp[] = [
  { name: 'value', options: 'number (0–100)', default: '—', description: 'A single determinate bar\'s value.' },
  { name: 'segments', options: '{ label: string; value: number; element?: CardElement }[]', default: '—', description: 'A stacked bar. With `element`, the department\'s colour; without, Purple, Turquoise, then Neutral-4.' },
  { name: 'indeterminate', options: 'true', default: '—', description: 'Activity of unknown length. No value, no label.' },
  { name: 'title', options: 'string', default: '—', description: 'The header row\'s name (40 characters at most). Also names the bar.' },
  { name: 'aria-label', options: 'string', default: '—', description: 'Names the bar when there is no `title`.' },
  { name: 'valueText', options: 'string', default: '"{value}%"', description: 'The value as words, shown and read ("RM 25,000 of RM 100,000"). Stacked: the header\'s value.' },
  { name: 'labelPlacement', options: "'header' | 'trailing' | 'inside' | 'none'", default: "'header' with a title, else 'none'", description: 'Single bars only. `inside` is for `large` only.' },
  { name: 'size', options: "'compact' | 'default' | 'large'", default: "'default'", description: 'The track: 4px, 8px or 16px.' },
  { name: 'tone', options: "'default' | 'success' | 'error' | 'fire' | 'wood' | 'earth' | 'water' | 'gold'", default: "'default'", description: 'A single bar\'s fill. Obsidian by default.' },
  { name: 'legend', options: 'boolean', default: 'true', description: 'Stacked: the legend under the bar.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Use Obsidian, the default: a committed value with no judgement attached.',
    'Pass `tone="success"` only when you are signalling completion.',
    'Give a unit whenever the number is ambiguous, and a `valueText` when it has one ("RM 25,000 of RM 100,000").',
    'Keep it the full width of its parent or column.',
  ],
  dont: [
    'Don\'t move a determinate bar backward: progress never decreases.',
    'Don\'t use more than 5 department segments or 2 general ones: the rest fall to Neutral-4.',
    'Don\'t put a label inside a compact track or a stacked fill.',
    'Don\'t use a department colour as a single bar\'s default: it means ownership, not progress.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None: the bar is read-only and takes no focus.',
  notes: [
    'Determinate: `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, named by its title or `aria-label`; `aria-valuetext` from `valueText`.',
    'Indeterminate: `role="progressbar"` with no `aria-valuenow`, which is what says "indeterminate".',
    'Stacked: a `role="group"` named by the title, each segment its own progressbar named "{label} — {value}%".',
    'An Error bar\'s status message should be in an `aria-live="polite"` region on the parent: that is yours to add.',
    'The visible value and the legend are hidden from screen readers: the progressbars already read them.',
    'In forced colours the track is outlined and every fill and segment, Complete, Error and department ones included, is drawn in CanvasText.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Mount', motion: 'The fill (or each segment) grows from 0 to its value.', token: '--duration-base · --ease-standard' },
  { interaction: 'Value change', motion: 'The fill moves to the new value.', token: '--duration-base · --ease-standard' },
  { interaction: 'Colour change', motion: 'The fill fades to the new colour (to Error, say).', token: '--duration-fast · --ease-standard' },
  { interaction: 'Indeterminate', motion: 'A shimmer travels the track, looping.', token: '--duration-ambient' },
  { interaction: 'Reduced motion', motion: 'Fills jump to their value; the shimmer stops at a still Neutral-4 bar, 60% across.', token: '—' },
];
