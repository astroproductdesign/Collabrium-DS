// Documentation for ElementBadge, rendered by the docs site (playground).
// Keep it consistent with ElementBadge.usage.md. Not part of the package build.
import { ElementBadge } from './ElementBadge';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../docs.types';

export const title = 'ElementBadge';

export const description =
  'A 32px chip that marks which element (department) owns an item, by the element\'s glyph on a 12% tint of its colour, optionally with the element\'s name and function beside it. A fixed identity marker: not a status and not interactive.';

export const usage = `import { ElementBadge } from '@collabrium/ui';

export function TeamOwner() {
  return <ElementBadge element="fire" showLabel />;
}`;

export const thumbnail = () => (
  <>
    <ElementBadge element="fire" />
    <ElementBadge element="water" />
    <ElementBadge element="gold" />
  </>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'ElementBadge',
    element: '<span>.cui-element-badge',
    description: 'Inline; the chip, then the label 12px to its right.',
    children: [
      { name: 'Chip', element: 'span.cui-element-badge__chip[data-element]', description: '32×32, radius-sm, the element\'s colour at a 12% tint. Alone, it is `role="img"` named by the element, with the name as `title` too.' },
      { name: 'Glyph', element: 'svg', description: 'Phosphor Fill (Tier 2), 16px (icon-sm), the element\'s full colour. Fixed per element. aria-hidden.' },
      { name: 'Name', element: 'span.cui-element-badge__name', when: 'showLabel', description: 'The element\'s name: caption 700, eyebrow tracking, uppercase, Neutral-9.' },
      { name: 'Sublabel', element: 'span.cui-element-badge__sublabel', when: 'showLabel', description: 'Caption, Neutral-5. The element\'s function unless you pass `sublabel`.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'elements',
    title: 'Elements',
    description: 'The chip alone, one per element. Hover one for its name.',
    render: () => (
      <div className="docs-row">
        <ElementBadge element="fire" />
        <ElementBadge element="earth" />
        <ElementBadge element="water" />
        <ElementBadge element="gold" />
        <ElementBadge element="wood" />
      </div>
    ),
    code: `<ElementBadge element="fire" />
<ElementBadge element="earth" />
<ElementBadge element="water" />
<ElementBadge element="gold" />
<ElementBadge element="wood" />`,
  },
  {
    id: 'label',
    title: 'With label',
    description: 'The element\'s name over its function. Pass `sublabel` to say something more specific, such as the department.',
    render: () => (
      <div className="docs-stack">
        <ElementBadge element="fire" showLabel />
        <ElementBadge element="gold" showLabel sublabel="Finance" />
      </div>
    ),
    code: `<ElementBadge element="fire" showLabel />
<ElementBadge element="gold" showLabel sublabel="Finance" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'element', options: "'fire' | 'earth' | 'water' | 'gold' | 'wood'", default: '—', required: true, description: 'The owner. The tint, the glyph and the name follow it.' },
  { name: 'showLabel', options: 'boolean', default: 'false', description: 'The name and the sublabel beside the chip.' },
  { name: 'sublabel', options: 'string', default: 'the element\'s function', description: 'The line under the name, with `showLabel`.' },
  { name: 'title', options: 'string', default: 'the element\'s name', description: 'The chip\'s hover name when it stands alone.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the root `<span>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Use ElementBadge when the owner needs the element\'s icon; Tag when a dot and a label are enough.',
    'Use the element that owns the item.',
    'Show the label where the elements are being introduced or the chip stands far from other context.',
  ],
  dont: [
    'Don\'t recolour the chip: it is a fixed identity marker, not an accent.',
    'Don\'t use it for a status. Use Badge.',
    'Don\'t make it clickable.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None. ElementBadge is not focusable and has no interaction.',
  notes: [
    'With the label, the glyph is `aria-hidden` and the name and sublabel are read as text. The capitals are CSS only.',
    'Without the label, the chip is `role="img"` named by the element ("Fire"), with the same name as a `title` for the mouse.',
    'In forced colours the chip takes a 1px border in the system text colour, so its shape still shows.',
    'The glyphs on their tints are below 3:1 for Fire, Earth, Gold and Wood, kept as Tag\'s colours are; the name always goes with them.',
  ],
};

export const motion = 'None. ElementBadge doesn\'t animate.';
