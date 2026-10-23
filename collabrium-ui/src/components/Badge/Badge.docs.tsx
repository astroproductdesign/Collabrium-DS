// Documentation for Badge, rendered by the docs site (playground).
// Keep it consistent with Badge.usage.md. Not part of the package build.
import { ChartLine, CheckCircle, Warning, XCircle } from '@phosphor-icons/react';
import { Badge } from './Badge';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../docs.types';

export const title = 'Badge';

export const description =
  'A small pill that shows the status or tone of something: Active, Pending, Failed. Five tones and an optional leading icon. Not interactive.';

export const usage = `import { Badge } from '@collabrium/ui';

export function CampaignStatus() {
  return <Badge variant="success">Active</Badge>;
}`;

export const thumbnail = () => (
  <>
    <Badge variant="success">Active</Badge>
    <Badge variant="warning">Pending</Badge>
    <Badge variant="error">Failed</Badge>
  </>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Badge',
    element: '<span>.cui-badge',
    description: 'The pill. The tone is a data attribute: data-variant. Never wraps.',
    children: [
      { name: 'Icon', element: 'svg.cui-badge__icon', when: 'with icon', description: 'Phosphor icon at 1em, same colour as the text. aria-hidden.' },
      { name: 'Label', element: 'text', description: 'The status, 20 characters at most. May include visually hidden text.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'variants',
    title: 'Variants',
    description: 'Neutral for a plain state, Success for done or healthy, Error for failed or blocked, Warning for needs attention soon, Selected for the chosen item in a set.',
    render: () => (
      <div className="docs-row">
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="selected">Selected</Badge>
      </div>
    ),
    code: `<Badge variant="neutral">Neutral</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="selected">Selected</Badge>`,
  },
  {
    id: 'with-icon',
    title: 'With icon',
    description: 'A Phosphor icon before the label, in the text colour and sized to it. Status icons are Fill (Tier 2), which is the default.',
    render: () => (
      <div className="docs-row">
        <Badge variant="success" icon={CheckCircle}>Approved</Badge>
        <Badge variant="error" icon={XCircle}>Failed</Badge>
        <Badge variant="warning" icon={Warning}>Out of date</Badge>
        <Badge variant="neutral" icon={ChartLine}>Pipeline report</Badge>
      </div>
    ),
    code: `import { ChartLine, CheckCircle, Warning, XCircle } from '@phosphor-icons/react';

<Badge variant="success" icon={CheckCircle}>Approved</Badge>
<Badge variant="error" icon={XCircle}>Failed</Badge>
<Badge variant="warning" icon={Warning}>Out of date</Badge>
<Badge variant="neutral" icon={ChartLine}>Pipeline report</Badge>`,
  },
  {
    id: 'grouping',
    title: 'Grouping',
    description: 'Adjacent badges sit `spacing-4` apart. The gap comes from the layout around them, not from the badge.',
    render: () => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
        <Badge variant="success">Live</Badge>
        <Badge variant="neutral">Q3</Badge>
        <Badge variant="selected">Shortlisted</Badge>
      </div>
    ),
    code: `<div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
  <Badge variant="success">Live</Badge>
  <Badge variant="neutral">Q3</Badge>
  <Badge variant="selected">Shortlisted</Badge>
</div>`,
  },
  {
    id: 'hidden-context',
    title: 'Extra context for screen readers',
    description: 'When the short label needs context to make sense out of place, add visually hidden text inside the badge.',
    render: () => (
      <div className="docs-row">
        <Badge variant="success">
          Highest<span className="sr-only"> CTR in this comparison</span>
        </Badge>
      </div>
    ),
    code: `<Badge variant="success">
  Highest<span className="sr-only"> CTR in this comparison</span>
</Badge>`,
  },
];

export const props: DocsProp[] = [
  {
    name: 'variant',
    options: "'neutral' | 'success' | 'error' | 'warning' | 'selected'",
    default: '—',
    required: true,
    description: 'The status or tone. `neutral` = plain state; `success` = done or healthy; `error` = failed or blocked; `warning` = needs attention soon; `selected` = the chosen item in a set.',
  },
  {
    name: 'children',
    options: 'ReactNode',
    default: '—',
    required: true,
    description: 'The label, 20 characters at most. May include visually hidden text for screen readers.',
  },
  {
    name: 'icon',
    options: 'Icon',
    default: '—',
    description: 'A Phosphor icon component, e.g. `CheckCircle`. Shown before the label in the text colour, sized to it.',
  },
  {
    name: 'iconWeight',
    options: "'fill' | 'regular'",
    default: "'fill'",
    description: '`fill` for status icons (Tier 2), as every DLS badge icon is. `regular` only for a functional icon (Tier 1).',
  },
  {
    name: 'id, title, aria-*, data-*, …',
    options: 'native',
    default: '—',
    description: 'Passed to the `<span>`. `style` and `className` are not accepted. The ref is forwarded to the `<span>`.',
  },
];

export const rules: DocsRules = {
  do: [
    'Use Badge for state (Live, Paused, Blocked) and Tag for ownership (Fire · Marketing).',
    'Keep labels to 20 characters. If a label is longer, rewrite it.',
    'Let the word carry the meaning: "Failed" in red, so the badge still works without colour.',
    'Leave `spacing-4` between adjacent badges, set by the layout around them.',
  ],
  dont: [
    'Don\'t fill a badge solid with a brand colour and put white text on it; several accents fail contrast that way at this size.',
    'Don\'t make a badge clickable or removable. Use Chip or Button.',
    'Don\'t truncate or wrap a label. The badge is a fixed-height pill.',
    'Don\'t use a badge to say who owns something. That is a Tag.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None. Badge is not focusable and has no interaction.',
  notes: [
    'Renders a plain `<span>` with no role; screen readers read its text in place.',
    'The meaning is in the text, and colour only repeats it. The 1px border keeps the pill visible in forced colours.',
    'The icon is `aria-hidden`.',
    'No live region. If a badge changes while the user is on the page, announce the change where it happened, not through the badge.',
    'Contrast on a white page: Neutral, Warning and Selected pass AA (17:1 and up). Success (about 2.1:1) and Error (about 3.2:1) are below AA\'s 4.5:1 for 11px text.',
  ],
};

export const motion = 'None. Badge doesn\'t animate.';
