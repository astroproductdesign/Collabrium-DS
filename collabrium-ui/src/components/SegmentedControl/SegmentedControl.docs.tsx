// Documentation for Segmented Control, rendered by the docs site (playground).
// Keep it consistent with SegmentedControl.usage.md. Not part of the package build.
import { Kanban, List, SquaresFour } from '@phosphor-icons/react';
import { SegmentedControl } from './SegmentedControl';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Segmented Control';

export const description =
  'Switches between 2 to 5 views of the same content (List / Grid / Board, MTD / QTD / YTD). The selected segment sits on a white pill that slides to it; the choice takes effect at once.';

export const usage = `import { SegmentedControl } from '@collabrium/ui';

export function DateRange() {
  return (
    <SegmentedControl
      aria-label="Date range"
      defaultValue="qtd"
      options={[{ value: 'mtd', label: 'MTD' }, { value: 'qtd', label: 'QTD' }, { value: 'ytd', label: 'YTD' }]}
    />
  );
}`;

const views = [
  { value: 'list', label: 'List view', icon: List },
  { value: 'grid', label: 'Grid view', icon: SquaresFour },
  { value: 'board', label: 'Board view', icon: Kanban },
];
const ranges = [{ value: 'mtd', label: 'MTD' }, { value: 'qtd', label: 'QTD' }, { value: 'ytd', label: 'YTD' }];

const Toolbar = ({ title: heading, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-16)', flexWrap: 'wrap' }}>
    <span style={{ fontSize: 'var(--text-h5-size)', fontWeight: 'var(--text-h5-weight)' as unknown as number }}>{heading}</span>
    {children}
  </div>
);

export const thumbnail = () => <SegmentedControl aria-label="Date range" defaultValue="qtd" options={ranges} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Track',
    element: '<div role="radiogroup">.cui-segmented[data-size]',
    description: 'Neutral-2, a 1px Neutral-3 border, radius-md, 4px padding and 4px between segments. Hugs its content.',
    children: [
      { name: 'Pill', element: 'span.cui-segmented__pill', description: 'Neutral-1 with shadow-1, radius-sm: one shared element behind the selected segment, sliding to the next. aria-hidden.' },
      { name: 'Segment', element: 'button[role="radio"].cui-segmented__segment', description: 'Equal width, 8px / 12px padding (5px / 12px compact), radius-sm. Neutral-5; Neutral-9 and bold when selected.' },
      { name: 'Icon', element: 'svg.cui-segmented__icon', when: 'icon options', description: 'Phosphor, Regular, 20px (14px compact). aria-hidden: the segment is named by its label.' },
      { name: 'Tooltip', element: 'Tooltip (role="label")', when: 'icon options', description: 'The library\'s Tooltip: the option\'s name above the segment on hover and focus, rendered above the page so nothing clips it. Its text is the segment\'s name.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'icon',
    title: 'Icon only',
    description: 'Every option has a clear icon. Hover or focus a segment for its name. Compact, right-aligned in a header.',
    render: () => (
      <Toolbar title="Campaign performance">
        <SegmentedControl aria-label="View mode" size="compact" options={views} />
      </Toolbar>
    ),
    code: `import { Kanban, List, SquaresFour } from '@phosphor-icons/react';

<SegmentedControl
  aria-label="View mode"
  size="compact"
  options={[
    { value: 'list', label: 'List view', icon: List },
    { value: 'grid', label: 'Grid view', icon: SquaresFour },
    { value: 'board', label: 'Board view', icon: Kanban },
  ]}
/>`,
  },
  {
    id: 'text',
    title: 'Text only',
    description: 'When an option has no clear icon, every option is text: uppercase, 6 characters at most.',
    render: () => (
      <Toolbar title="Revenue trend">
        <SegmentedControl aria-label="Date range" size="compact" defaultValue="qtd" options={ranges} />
      </Toolbar>
    ),
    code: `<SegmentedControl
  aria-label="Date range"
  size="compact"
  defaultValue="qtd"
  options={[{ value: 'mtd', label: 'MTD' }, { value: 'qtd', label: 'QTD' }, { value: 'ytd', label: 'YTD' }]}
/>`,
  },
  {
    id: 'sizes',
    title: 'Sizes and disabled',
    description: 'Default and compact; a single disabled option; the whole control disabled.',
    render: () => (
      <div className="docs-stack" style={{ justifyItems: 'start' }}>
        <SegmentedControl aria-label="View mode, default" options={views} />
        <SegmentedControl aria-label="Date range, one disabled" options={[ranges[0], ranges[1], { ...ranges[2], disabled: true }]} />
        <SegmentedControl aria-label="Date range, disabled" disabled options={ranges} />
      </div>
    ),
    code: `<SegmentedControl aria-label="View mode" options={views} />
<SegmentedControl
  aria-label="Date range"
  options={[{ value: 'mtd', label: 'MTD' }, { value: 'qtd', label: 'QTD' }, { value: 'ytd', label: 'YTD', disabled: true }]}
/>
<SegmentedControl aria-label="Date range" disabled options={ranges} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'options', options: '{ value; label; disabled? }[] | { value; label; icon: Icon; disabled? }[]', default: '—', required: true, description: '2 to 5 options, all text or all icons. An icon option\'s `label` names it and fills its tooltip.' },
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the control ("View mode").' },
  { name: 'value', options: 'string', default: '—', description: 'The selected value, when you control it.' },
  { name: 'defaultValue', options: 'string', default: 'the first enabled option', description: 'The selected value on first render when you don\'t.' },
  { name: 'onValueChange', options: '(value: string) => void', default: '—', description: 'Called with the new selection. It takes effect at once.' },
  { name: 'size', options: "'default' | 'compact'", default: "'default'", description: 'Compact for toolbars and tight rows.' },
  { name: 'disabled', options: 'boolean', default: 'false', description: 'Disables the whole control: everything at 40%.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the track. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Use it to switch how the same content is shown.',
    'Use icons only when every option has a clear one; otherwise text for all.',
    'Keep text labels to 6 characters, uppercase.',
    'Place it inline, usually right-aligned in a section or card header.',
  ],
  dont: [
    'Don\'t use more than 5 options: use Tabs or a Select.',
    'Don\'t mix icon and text options.',
    'Don\'t use it in a form for a choice saved later: use Radio.',
    'Don\'t colour the selected segment with an element colour.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the selected segment.' },
    { keys: '← / →', action: 'Moves focus to the previous or next enabled segment, wrapping.' },
    { keys: 'Home / End', action: 'Moves focus to the first or last enabled segment.' },
    { keys: 'Space / Enter', action: 'Selects the focused segment.' },
  ],
  notes: [
    'A `radiogroup` named by `aria-label`; each segment a `radio` with `aria-checked`.',
    'Icon segments are named by their label, through a label Tooltip; the bubble itself is hidden from screen readers.',
    'The selection shows in fill, shadow and text weight together, never colour alone.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Select', motion: 'The pill slides and resizes to the new segment; the text swaps at once.', token: '--duration-fast · --ease-standard' },
  { interaction: 'First render', motion: 'The pill is placed without sliding.', token: '—' },
  { interaction: 'Tooltip', motion: 'Fades in on hover or focus.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'The pill jumps.', token: '—' },
];
