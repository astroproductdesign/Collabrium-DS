// Documentation for Tag, rendered by the docs site (playground).
// Keep it consistent with Tag.usage.md. Not part of the package build.
import { Drop, Flame } from '@phosphor-icons/react';
import { Tag } from './Tag';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../docs.types';

export const title = 'Tag';

export const description =
  'A small pill that says which element (department) owns something: Fire · Marketing, Water · Data. Five element tones, Purple for a category with no department, and Neutral. Not a status and not interactive.';

export const usage = `import { Tag } from '@collabrium/ui';

export function CampaignOwner() {
  return <Tag variant="fire">Fire · Marketing</Tag>;
}`;

export const thumbnail = () => (
  <>
    <Tag variant="fire">Fire · Marketing</Tag>
    <Tag variant="water">Water · Data</Tag>
  </>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Tag',
    element: '<span>.cui-tag',
    description: '24px tall, 10px side padding, caption at 700, a pill. The owner is a data attribute: data-variant.',
    children: [
      { name: 'Dot', element: 'span.cui-tag__dot', when: 'every variant but neutral, with no icon', description: '6px, the element\'s full colour. aria-hidden.' },
      { name: 'Icon', element: 'svg.cui-tag__icon', when: 'with icon', description: 'Phosphor, 14px, in the text colour, in place of the dot. aria-hidden.' },
      { name: 'Label', element: 'text', description: 'The owner, 24 characters at most.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'elements',
    title: 'Elements',
    description: 'Each element on its own tint, with its colour on the text and the dot. Use the element that owns the content.',
    render: () => (
      <div className="docs-row">
        <Tag variant="fire">Fire · Marketing</Tag>
        <Tag variant="wood">Wood · Strategy</Tag>
        <Tag variant="earth">Earth · HR</Tag>
        <Tag variant="water">Water · Data</Tag>
        <Tag variant="gold">Gold · Finance</Tag>
      </div>
    ),
    code: `<Tag variant="fire">Fire · Marketing</Tag>
<Tag variant="wood">Wood · Strategy</Tag>
<Tag variant="earth">Earth · HR</Tag>
<Tag variant="water">Water · Data</Tag>
<Tag variant="gold">Gold · Finance</Tag>`,
  },
  {
    id: 'purple-neutral',
    title: 'Purple and Neutral',
    description: 'Purple for a category with no department behind it (a Media Ad family). Neutral for a plain label, with no dot.',
    render: () => (
      <div className="docs-row">
        <Tag variant="purple">Display</Tag>
        <Tag variant="neutral">KOC</Tag>
        <Tag variant="neutral">Seeder</Tag>
      </div>
    ),
    code: `<Tag variant="purple">Display</Tag>
<Tag variant="neutral">KOC</Tag>
<Tag variant="neutral">Seeder</Tag>`,
  },
  {
    id: 'with-icon',
    title: 'With icon',
    description: 'An element\'s motif in place of the dot, Fill (Tier 2), 14px, in the text colour.',
    render: () => (
      <div className="docs-row">
        <Tag variant="fire" icon={Flame}>Fire · Marketing</Tag>
        <Tag variant="water" icon={Drop}>Water · Data</Tag>
      </div>
    ),
    code: `import { Drop, Flame } from '@phosphor-icons/react';

<Tag variant="fire" icon={Flame}>Fire · Marketing</Tag>
<Tag variant="water" icon={Drop}>Water · Data</Tag>`,
  },
  {
    id: 'grouping',
    title: 'Grouping',
    description: 'Adjacent tags sit `spacing-4` apart. The gap comes from the layout around them, not from the tag.',
    render: () => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
        <Tag variant="fire">Fire · Marketing</Tag>
        <Tag variant="gold">Gold · Finance</Tag>
      </div>
    ),
    code: `<div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
  <Tag variant="fire">Fire · Marketing</Tag>
  <Tag variant="gold">Gold · Finance</Tag>
</div>`,
  },
];

export const props: DocsProp[] = [
  { name: 'variant', options: "'neutral' | 'fire' | 'wood' | 'earth' | 'water' | 'gold' | 'purple'", default: '—', required: true, description: 'The owner. An element for a department; `purple` for a category with no department; `neutral` for a plain label with no dot.' },
  { name: 'children', options: 'ReactNode', default: '—', required: true, description: 'The label, 24 characters at most. May include visually hidden text for screen readers.' },
  { name: 'icon', options: 'Icon', default: '—', description: 'A Phosphor icon component, e.g. `Flame`. Shown at the start in the text colour, in place of the dot.' },
  { name: 'iconWeight', options: "'fill' | 'regular'", default: "'fill'", description: '`fill` for an element motif (Tier 2); `regular` only for a functional icon (Tier 1).' },
  { name: 'id, title, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the `<span>`. `style` and `className` are not accepted. The ref is forwarded to the `<span>`.' },
];

export const rules: DocsRules = {
  do: [
    'Use Tag for ownership (Fire · Marketing) and Badge for state (Live, Paused).',
    'Use the element that owns the content, and write the owner in the label.',
    'Keep labels to 24 characters. If a label is longer, rewrite it.',
    'Leave `spacing-4` between adjacent tags, set by the layout around them.',
  ],
  dont: [
    'Don\'t fill a tag solid with a brand colour and put white text on it.',
    'Don\'t make a tag clickable or removable. Use Chip or Button.',
    'Don\'t pick an element for its colour when it doesn\'t own the content.',
    'Don\'t truncate a label. The tag never clips its text.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None. Tag is not focusable and has no interaction.',
  notes: [
    'Renders a plain `<span>` with no role; screen readers read its text in place.',
    'The dot and the icon are `aria-hidden`: the label carries the meaning, so write the owner in words.',
    'No live region.',
    'Contrast: Neutral (6.1:1) and Purple (5.0:1) pass AA. The element colours on their tints are below AA at this size, kept by decision.',
    'In forced colours (Windows high contrast) the tag takes a 1px border and its dot is painted in the system text colour, so the pill and the dot still show. Normal mode is untouched.',
  ],
};

export const motion = 'None. Tag doesn\'t animate.';
