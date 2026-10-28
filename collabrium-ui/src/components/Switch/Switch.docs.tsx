// Documentation for Switch, rendered by the docs site (playground).
// Keep it consistent with Switch.usage.md. Not part of the package build.
import { useState } from 'react';
import { Switch } from './Switch';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Switch';

export const description =
  'One setting that is on or off and applies the moment it is flipped. A real native switch with a label and an optional description, drawn as a track with a sliding thumb.';

export const usage = `import { Switch } from '@collabrium/ui';

export function Settings() {
  return <Switch label="Auto-publish reports" defaultChecked />;
}`;

export const thumbnail = () => (
  <div className="docs-stack">
    <Switch label="Auto-publish" defaultChecked />
    <Switch label="Beta features" />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Switch',
    element: '<label>.cui-switch',
    description: 'The row. The whole row is the click target. Disabled is a data attribute: data-disabled.',
    children: [
      { name: 'Input', element: '<input type="checkbox" role="switch">.cui-switch__input', description: 'The real control. Visually hidden but focusable; it holds the value, the on or off state and the focus.' },
      {
        name: 'Track',
        element: 'span.cui-switch__track',
        description: '40×24px, round. Neutral-4 when off, Green when on. aria-hidden.',
        children: [{ name: 'Thumb', element: 'span.cui-switch__thumb', description: '18×18px, round, Neutral-1 with shadow-1, 3px in from the edge. Slides from the left (off) to the right (on).' }],
      },
      {
        name: 'Text',
        element: 'span.cui-switch__text',
        when: 'with a label',
        description: 'Label and optional description stacked, 12px from the track, centred against it.',
        children: [
          { name: 'Label', element: 'span.cui-switch__label', description: 'Body1, weight 500, Neutral-9. Names the input.' },
          { name: 'Description', element: 'span.cui-switch__desc', when: 'with description', description: 'Caption, Neutral-5. Attached to the input with aria-describedby.' },
        ],
      },
    ],
  },
];

function ControlledExample() {
  const [on, setOn] = useState(true);
  return (
    <div className="docs-stack">
      <Switch label="Auto-publish reports" checked={on} onChange={event => setOn(event.target.checked)} />
      <p className="docs-status">{on ? 'Reports publish when approved.' : 'Reports wait for you to publish them.'}</p>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Off and on',
    description: 'Label what the switch controls, never its state. Uncontrolled: it keeps its own state, like a native checkbox.',
    render: () => (
      <div className="docs-stack">
        <Switch label="Auto-publish reports" defaultChecked />
        <Switch label="Beta features" />
      </div>
    ),
    code: `<Switch label="Auto-publish reports" defaultChecked />
<Switch label="Beta features" />`,
  },
  {
    id: 'description',
    title: 'With a description',
    description: 'A helper line under the label says what flipping it does. The label and the track stay centred together.',
    render: () => (
      <Switch label="Email notifications" description="A summary every Monday morning, and anything urgent as it happens" defaultChecked />
    ),
    code: `<Switch label="Email notifications" description="A summary every Monday morning, and anything urgent as it happens" defaultChecked />`,
  },
  {
    id: 'controlled',
    title: 'Controlled',
    description: 'Pass `checked` and `onChange` to keep the state yourself, and apply the setting in `onChange`: there is no Save step.',
    render: () => <ControlledExample />,
    code: `const [on, setOn] = useState(true);

<Switch label="Auto-publish reports" checked={on} onChange={event => setOn(event.target.checked)} />`,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'Half-opacity and a not-allowed cursor, and not focusable. A disabled switch can be on or off, and it does not react to the pointer.',
    render: () => (
      <div className="docs-stack">
        <Switch label="Managed by your admin" disabled />
        <Switch label="Managed by your admin, on" disabled defaultChecked />
      </div>
    ),
    code: `<Switch label="Managed by your admin" disabled />
<Switch label="Managed by your admin, on" disabled defaultChecked />`,
  },
  {
    id: 'unlabelled',
    title: 'Without a visible label',
    description: 'Where a visible label is impossible (a settings row whose heading sits beside the switch), name it with `aria-label`.',
    render: () => (
      <div className="docs-row">
        <span>Dark mode</span>
        <Switch aria-label="Dark mode" />
      </div>
    ),
    code: `<span>Dark mode</span>
<Switch aria-label="Dark mode" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: 'The visible label. Name what the switch controls ("Email notifications"), never its state. Required unless you set `aria-label`.' },
  { name: 'description', options: 'ReactNode', default: '—', description: 'Optional helper line under the label. Only with `label`.' },
  { name: 'aria-label', options: 'string', default: '—', description: 'Names the switch when there is no visible label. Required in that case.' },
  { name: 'disabled', options: 'boolean', default: 'false', description: '50% opacity, not-allowed cursor, not focusable.' },
  { name: 'checked / defaultChecked, onChange, name, required, …', options: 'native', default: '—', description: 'Exactly as on `<input type="checkbox">`.' },
  { name: 'id, form, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the `<input>`. `style` and `className` are not accepted. The ref is forwarded to the `<input>`.' },
];

export const rules: DocsRules = {
  do: [
    'Label a Switch with what it controls: "Email notifications".',
    'Use it for a setting that applies the moment it is flipped.',
    'Apply the setting in `onChange`, and show the result where the person can see it.',
    'Keep the label visible. The thumb on the track is low contrast on its own.',
  ],
  dont: [
    'Don\'t label it with its state ("On", "Off").',
    'Don\'t use it inside a form that needs an explicit Save: that implies a deferred change. Use a Checkbox.',
    'Don\'t use it to pick one option from several (Radio) or several from a list (Checkbox).',
    'Don\'t recolour the track for any other meaning: Green means on.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves focus to the switch. A 2px Obsidian ring shows on the track.' },
    { keys: 'Space', action: 'Flips the switch.' },
  ],
  notes: [
    'A native `<input type="checkbox" role="switch">` inside a `<label>`, so the whole row is clickable and the state is read from the input: "switch, on".',
    'The input is visually hidden but stays focusable. The track and the thumb are `aria-hidden`.',
    'The label names the input and the description is attached with `aria-describedby`. With no visible label, `aria-label` is required.',
    'The thumb on the Green track measures 2.35:1 and on the off track 1.88:1, under the 3:1 floor for UI components. The thumb\'s travel and the label carry the meaning, so never drop the label.',
    'In forced-colours mode the track is outlined (off) or Highlight (on), with a CanvasText or HighlightText thumb, so the two states still differ.',
    'Nothing is announced by a live region: the native switch semantics carry the change.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Flip', motion: 'The thumb slides from one side to the other and the track fades between Neutral-4 and Green. Under reduced motion the move is instant, because the travel is the state change.', token: '--duration-base · --ease-settle · --ease-standard' },
  { interaction: 'Hover, press', motion: 'The thumb\'s shadow deepens.', token: '--duration-fast · --ease-standard' },
];
