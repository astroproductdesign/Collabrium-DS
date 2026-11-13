// Documentation for Tooltip, rendered by the docs site (playground).
// Keep it consistent with Tooltip.usage.md. Not part of the package build.
import { Info, PencilSimple, Trash } from '@phosphor-icons/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Tooltip';

export const description =
  'A short line of supplementary, non-interactive information, shown instantly on hover or keyboard focus in a dark bubble beside its trigger.';

export const usage = `import { Button, Tooltip } from '@collabrium/ui';
import { Info } from '@phosphor-icons/react';

export function TeamNote() {
  return (
    <Tooltip content="Visible to your whole team">
      <Button variant="ghost" iconOnly icon={Info} aria-label="Visibility" />
    </Tooltip>
  );
}`;

export const thumbnail = () => (
  <Tooltip content="Visible to your whole team">
    <Button variant="ghost" iconOnly icon={Info} aria-label="Visibility" />
  </Tooltip>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Tooltip',
    element: '<span>.cui-tooltip',
    description: 'An inline-flex wrapper around the trigger. Hover and focus inside it show the bubble.',
    children: [
      { name: 'Trigger', element: 'your element', description: 'One focusable element. It gets `aria-describedby` pointing at the bubble, or `aria-label` with `role="label"`.' },
      {
        name: 'Bubble',
        element: '<span>.cui-tooltip__bubble[role="tooltip"]',
        description: 'In a portal at the document body: Neutral-7, Neutral-1 caption text at 500, 6px / 12px padding, radius-sm. One line up to 240px, then wraps. Always in the DOM; opacity 0 when hidden. No caret.',
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'description',
    title: 'Extra information',
    description: 'Hover or tab to the button. The tooltip adds a fact; the button keeps its own name, and the tooltip is wired with `aria-describedby`.',
    render: () => (
      <div className="docs-row">
        <Tooltip content="Visible to your whole team">
          <Button variant="ghost" iconOnly icon={Info} aria-label="Visibility" />
        </Tooltip>
      </div>
    ),
    code: `<Tooltip content="Visible to your whole team">
  <Button variant="ghost" iconOnly icon={Info} aria-label="Visibility" />
</Tooltip>`,
  },
  {
    id: 'label',
    title: 'Naming an icon button',
    description: 'When the tooltip text is the button\'s only name, use `role="label"`: the text becomes the button\'s `aria-label`, so it is always announced.',
    render: () => (
      <div className="docs-row">
        <Tooltip content="Edit brief" role="label">
          <Button variant="secondary" iconOnly icon={PencilSimple} aria-label="Edit brief" />
        </Tooltip>
        <Tooltip content="Delete brief" role="label">
          <Button variant="secondary" iconOnly icon={Trash} aria-label="Delete brief" />
        </Tooltip>
      </div>
    ),
    code: `<Tooltip content="Edit brief" role="label">
  <Button variant="secondary" iconOnly icon={PencilSimple} aria-label="Edit brief" />
</Tooltip>`,
  },
  {
    id: 'placement',
    title: 'Placement',
    description: 'Top by default; bottom, left and right when the layout needs them. Each flips to the opposite side when there isn\'t room.',
    render: () => (
      <div className="docs-row">
        {(['top', 'bottom', 'left', 'right'] as const).map(p => (
          <Tooltip key={p} content={`Placed ${p}`} placement={p}>
            <Button variant="secondary" size="sm">
              {p[0].toUpperCase() + p.slice(1)}
            </Button>
          </Tooltip>
        ))}
      </div>
    ),
    code: `<Tooltip content="Placed top" placement="top"><Button variant="secondary" size="sm">Top</Button></Tooltip>
<Tooltip content="Placed bottom" placement="bottom"><Button variant="secondary" size="sm">Bottom</Button></Tooltip>
<Tooltip content="Placed left" placement="left"><Button variant="secondary" size="sm">Left</Button></Tooltip>
<Tooltip content="Placed right" placement="right"><Button variant="secondary" size="sm">Right</Button></Tooltip>`,
  },
  {
    id: 'wrapping',
    title: 'Longer text',
    description: 'One line up to 240px, then the bubble wraps and grows taller. 60 characters is the most a tooltip takes.',
    render: () => (
      <div className="docs-row">
        <Tooltip content="Shared with Marketing and Sales; edits sync every 15 minutes">
          <Button variant="secondary" size="sm">Sharing</Button>
        </Tooltip>
      </div>
    ),
    code: `<Tooltip content="Shared with Marketing and Sales; edits sync every 15 minutes">
  <Button variant="secondary" size="sm">Sharing</Button>
</Tooltip>`,
  },
];

export const props: DocsProp[] = [
  { name: 'content', options: 'string', default: '—', required: true, description: 'The tooltip text, 60 characters at most.' },
  { name: 'children', options: 'ReactElement', default: '—', required: true, description: 'The trigger: one focusable element. It gets `aria-describedby` (or `aria-label`) added.' },
  { name: 'placement', options: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'The side the bubble prefers. It flips, then shifts, to stay in view; bottom is the last resort.' },
  { name: 'role', options: "'description' | 'label'", default: "'description'", description: '`label` when the tooltip text is the trigger\'s only name: it becomes the trigger\'s `aria-label`.' },
  { name: 'id, aria-*, data-*, event handlers', options: 'native', default: '—', description: 'Passed to the wrapping `<span>`. `style` and `className` are not accepted. The ref is forwarded to the `<span>`.' },
];

export const rules: DocsRules = {
  do: [
    'Keep it to one short fact, 60 characters at most.',
    'Wrap one focusable element, so keyboard users get the tooltip on focus.',
    'Use `role="label"` when the tooltip is an icon button\'s only name.',
    'Put essential information on the page; a tooltip only supplements it.',
  ],
  dont: [
    'Don\'t put links or buttons in a tooltip: nothing inside it can be clicked.',
    'Don\'t wrap something that can\'t take focus, such as plain text.',
    'Don\'t add a delay before it shows.',
    'Don\'t rely on a tooltip on a touch-first screen; show the text inline.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Focusing the trigger shows the tooltip; leaving it hides it.' },
    { keys: 'Escape', action: 'Hides the tooltip; focus stays on the trigger.' },
  ],
  notes: [
    'The bubble is `role="tooltip"` and always in the DOM, so `aria-describedby` reaches it whether or not it is showing.',
    'With `role="label"` the text is the trigger\'s `aria-label` and the bubble is hidden from assistive technology, so the name is read once.',
    'It renders in a portal at the document body, above modals, so no ancestor clips it.',
    'Only one tooltip shows at a time; scrolling or tapping elsewhere hides it. On touch, a long press shows it.',
    'In forced colours the bubble takes a 1px border.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Show and hide', motion: 'Opacity fades in and out; nothing moves, so it stays under reduced motion. No delay before it starts.', token: '--duration-fast · --ease-standard' },
];
