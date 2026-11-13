// Documentation for Checkbox, rendered by the docs site (playground).
// Keep it consistent with Checkbox.usage.md. Not part of the package build.
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Checkbox';

export const description =
  'One choice that can be on or off, or one of several that can be on together. Real native checkbox with a label, an optional description and a partial state for select-all.';

export const usage = `import { Checkbox } from '@collabrium/ui';

export function Notifications() {
  return <Checkbox label="Email notifications" defaultChecked />;
}`;

export const thumbnail = () => (
  <>
    <Checkbox label="Email" defaultChecked />
    <Checkbox label="SMS" />
  </>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Checkbox',
    element: '<label>.cui-checkbox',
    description: 'The row. The whole row is the click target. Disabled is a data attribute: data-disabled.',
    children: [
      { name: 'Input', element: '<input type="checkbox">.cui-checkbox__input', description: 'The real control. Visually hidden but focusable; it holds the value, the checked state and the focus.' },
      {
        name: 'Box',
        element: 'span.cui-checkbox__box',
        description: '18×18px, 6px radius. Neutral-3 border when empty, Obsidian fill when checked or partly selected. aria-hidden.',
        children: [
          { name: 'Check', element: 'svg.cui-checkbox__check', when: 'when checked', description: 'Phosphor Check, Regular (Tier 1), in Neutral-1.' },
          { name: 'Minus', element: 'svg.cui-checkbox__minus', when: 'when indeterminate', description: 'Phosphor Minus, Regular (Tier 1), in Neutral-1. Replaces the check.' },
        ],
      },
      {
        name: 'Text',
        element: 'span.cui-checkbox__text',
        when: 'with a label',
        description: 'Label and optional description stacked.',
        children: [
          { name: 'Label', element: 'span.cui-checkbox__label', description: 'Body1, weight 500, Neutral-9. Names the input.', children: [{ name: 'Required marker', element: 'span.cui-checkbox__required', when: 'with required', description: 'A Red `*`, 4px after the label text. Hidden from assistive tech.' }] },
          { name: 'Description', element: 'span.cui-checkbox__desc', when: 'with description', description: 'Caption, Neutral-5. Attached to the input with aria-describedby.' },
          { name: 'Error', element: 'span.cui-checkbox__error', when: 'with error', description: 'Caption, bold, Red. Replaces the description and becomes the input\'s description.' },
        ],
      },
    ],
  },
];

function SelectAllExample() {
  const options = ['Marketing', 'Product', 'Sales'];
  const [selected, setSelected] = useState<string[]>(['Product']);
  const all = selected.length === options.length;
  const some = selected.length > 0 && !all;
  return (
    <div className="docs-stack">
      <Checkbox
        label="Select all"
        checked={all}
        indeterminate={some}
        onChange={e => setSelected(e.target.checked ? options : [])}
      />
      {options.map(o => (
        <Checkbox
          key={o}
          label={o}
          checked={selected.includes(o)}
          onChange={e => setSelected(s => (e.target.checked ? [...s, o] : s.filter(x => x !== o)))}
        />
      ))}
    </div>
  );
}

function RequiredErrorExample() {
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(true);
  return (
    <div className="docs-stack">
      <Checkbox
        required
        label="I accept the terms"
        description="You need to accept to continue"
        checked={accepted}
        onChange={e => {
          setAccepted(e.target.checked);
          if (e.target.checked) setSubmitted(false);
        }}
        error={submitted && !accepted ? 'Accept the terms to continue' : undefined}
      />
    </div>
  );
}

function GroupErrorExample() {
  const options = ['Email', 'SMS', 'Push notification'];
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <CheckboxGroup
      legend="Notify me by"
      required
      error={selected.length === 0 ? 'Choose at least one way to be notified' : undefined}
    >
      {options.map(o => (
        <Checkbox
          key={o}
          label={o}
          checked={selected.includes(o)}
          onChange={e => setSelected(s => (e.target.checked ? [...s, o] : s.filter(x => x !== o)))}
        />
      ))}
    </CheckboxGroup>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Label and description',
    description: 'A label, with an optional description under it. Uncontrolled: it keeps its own state, like a native checkbox.',
    render: () => (
      <div className="docs-row">
        <Checkbox label="Email notifications" description="Weekly digest every Monday" defaultChecked />
        <Checkbox label="SMS alerts" />
      </div>
    ),
    code: `<Checkbox label="Email notifications" description="Weekly digest every Monday" defaultChecked />
<Checkbox label="SMS alerts" />`,
  },
  {
    id: 'states',
    title: 'States',
    description: 'Unchecked, checked, partly selected (indeterminate) and disabled. Checked and partly selected share the Obsidian fill; the glyph (check or minus) tells them apart.',
    render: () => (
      <div className="docs-row">
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled, checked" disabled defaultChecked />
      </div>
    ),
    code: `<Checkbox label="Unchecked" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled, checked" disabled defaultChecked />`,
  },
  {
    id: 'select-all',
    title: 'Select all',
    description: 'The one place for `indeterminate`: a box above a list that shows when only some options are selected. Set it from your own state; clicking it selects all or none.',
    render: () => <SelectAllExample />,
    code: `import { useState } from 'react';

function SelectAll() {
  const options = ['Marketing', 'Product', 'Sales'];
  const [selected, setSelected] = useState<string[]>(['Product']);
  const all = selected.length === options.length;
  const some = selected.length > 0 && !all;
  return (
    <div>
      <Checkbox
        label="Select all"
        checked={all}
        indeterminate={some}
        onChange={e => setSelected(e.target.checked ? options : [])}
      />
      {options.map(o => (
        <Checkbox
          key={o}
          label={o}
          checked={selected.includes(o)}
          onChange={e => setSelected(s => (e.target.checked ? [...s, o] : s.filter(x => x !== o)))}
        />
      ))}
    </div>
  );
}`,
  },
  {
    id: 'no-visible-label',
    title: 'No visible label',
    description: 'For the few places where a label cannot fit, such as a table row\'s select box. Give it an `aria-label` that names what it selects.',
    render: () => (
      <div className="docs-row">
        <Checkbox aria-label="Select Amirah Yusof" />
        <Checkbox aria-label="Select Siti Khadijah" defaultChecked />
      </div>
    ),
    code: `<Checkbox aria-label="Select Amirah Yusof" />
<Checkbox aria-label="Select Siti Khadijah" defaultChecked />`,
  },
  {
    id: 'required-and-error',
    title: 'Required and error',
    description:
      'A box that must be ticked (a terms box) takes `required`: a Red `*` follows the label. If it is submitted empty, set `error`: the message replaces the helper line in bold Red, and the empty box takes a 1px Red border. Clear `error` when the box is ticked, and move focus to the box yourself.',
    render: () => <RequiredErrorExample />,
    code: `<Checkbox
  required
  label="I accept the terms"
  description="You need to accept to continue"
  checked={accepted}
  onChange={e => setAccepted(e.target.checked)}
  error={submitted && !accepted ? 'Accept the terms to continue' : undefined}
/>`,
  },
  {
    id: 'group',
    title: 'Checkbox group',
    description:
      'A fieldset with a legend names a set of checkboxes. An optional helper sits under the legend, `required` adds a Red `*` after it, and the boxes stack 12px apart.',
    render: () => (
      <CheckboxGroup legend="Notify me by" description="Choose at least one" required>
        <Checkbox label="Email" defaultChecked />
        <Checkbox label="SMS" />
        <Checkbox label="Push notification" />
      </CheckboxGroup>
    ),
    code: `<CheckboxGroup legend="Notify me by" description="Choose at least one" required>
  <Checkbox label="Email" defaultChecked />
  <Checkbox label="SMS" />
  <Checkbox label="Push notification" />
</CheckboxGroup>`,
  },
  {
    id: 'group-error',
    title: 'Group error',
    description:
      'When a required group is submitted empty, set `error` on the group: the message replaces the helper in bold Red and every empty box takes the red border and `aria-invalid`. Move focus to the first box, and clear the error on the first selection.',
    render: () => <GroupErrorExample />,
    code: `<CheckboxGroup
  legend="Notify me by"
  required
  error={selected.length === 0 ? 'Choose at least one way to be notified' : undefined}
>
  {options.map(o => (
    <Checkbox key={o} label={o} checked={selected.includes(o)} onChange={…} />
  ))}
</CheckboxGroup>`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: 'The visible label, written as the thing being switched on ("Email notifications"). Required unless you set `aria-label`.' },
  { name: 'description', options: 'ReactNode', default: '—', description: 'Optional helper line under the label. Only with `label`.' },
  { name: 'aria-label', options: 'string', default: '—', description: 'Names the box when there is no visible label. Required in that case.' },
  { name: 'checked / defaultChecked', options: 'boolean', default: 'unchecked', description: 'Controlled or uncontrolled, exactly like a native checkbox.' },
  { name: 'onChange', options: '(event) => void', default: '—', description: 'Called when the user toggles it. Read `event.target.checked`.' },
  { name: 'indeterminate', options: 'boolean', default: 'false', description: 'Partial selection: filled box with a minus. For a select-all box only. Set it from your own state and clear it in `onChange`.' },
  { name: 'required', options: 'boolean', default: 'false', description: 'Native `required`, plus a Red `*` after the label. Use it for a single box that must be ticked (a terms box). Not for a box inside a group: put `required` on the group.' },
  { name: 'error', options: 'ReactNode', default: '—', description: 'Error text in bold Red that replaces `description`, puts a 1px Red border on the empty box and sets `aria-invalid`. Clear it when the box is ticked. Labelled checkboxes only.' },
  { name: 'disabled', options: 'boolean', default: 'false', description: '50% opacity, not-allowed cursor, not focusable.' },
  { name: 'CheckboxGroup: legend', options: 'ReactNode', default: '—', required: true, description: 'The group\'s question ("Notify me by"). Names the `<fieldset>`.' },
  { name: 'CheckboxGroup: description', options: 'ReactNode', default: '—', description: 'Helper line under the legend (caption, Neutral-5).' },
  { name: 'CheckboxGroup: error', options: 'ReactNode', default: '—', description: 'Group error in bold Red, replacing the description. Every empty box takes the red border and `aria-invalid`.' },
  { name: 'CheckboxGroup: required', options: 'boolean', default: 'false', description: 'A Red `*` after the legend. Visual only: a group has no native "required", so enforce it and report it with `error`.' },
  { name: 'CheckboxGroup: disabled', options: 'boolean', default: 'false', description: 'Disables every checkbox in the group.' },
  { name: 'CheckboxGroup: children', options: 'ReactNode', default: '—', required: true, description: 'The `Checkbox` components, stacked 12px apart.' },
  { name: 'name, value, required, form, id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the `<input>`. `style` and `className` are not accepted. The ref is forwarded to the `<input>`.' },
];

export const rules: DocsRules = {
  do: [
    'Give every checkbox a name: a visible `label`, or an `aria-label` when that is impossible.',
    'Write the label as the thing that turns on: "Email notifications".',
    'Use `indeterminate` only on a select-all box whose options are partly selected.',
    'Use Checkbox when several options can be on at once, or for one setting that is saved with a button.',
  ],
  dont: [
    'Don\'t use a Checkbox when only one option can be chosen. That is a Radio.',
    'Don\'t use it for a setting that applies the moment it flips. That is a Switch.',
    'Don\'t reuse the 6px box radius anywhere else; it belongs to this compact control only.',
    'Don\'t show a bare box with no name, or an icon alone.',
    'Don\'t put `required` on every box in a group: put it on the group, and report an empty required group with `error`.',
    'Don\'t keep an error showing once the box is ticked, or the group has a selection.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves focus to the checkbox. A 2px Obsidian ring shows on the box.' },
    { keys: 'Space', action: 'Toggles the checkbox.' },
  ],
  notes: [
    'A native `<input type="checkbox">` inside a `<label>`, so the whole row is clickable, it is in the tab order and it takes part in forms.',
    'The input is visually hidden but stays focusable. The box and its glyph are `aria-hidden`; the state is read from the input.',
    'Indeterminate is set on the native input, so assistive tech announces it as mixed.',
    'The label names the input and the description is attached with `aria-describedby`.',
    'The check and the minus mean the state is not carried by colour alone, and it still reads in forced-colours mode.',
    'A required box has the native `required` attribute; the Red `*` is visual only and hidden from assistive tech.',
    'An error sets `aria-invalid` on the input and replaces the helper as the input\'s description (it is not described by both). The error is not a live region: move focus to the box when you set it.',
    'A group is a `<fieldset>` with a `<legend>`, described by its helper or error. A group error also sets `aria-invalid` on each empty box.',
    'The error is stated in words, not only by the red border and text colour.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover, press, check, uncheck, partly select', motion: 'The box fill and border fade between states. Nothing moves, so there is nothing to remove under reduced motion.', token: '--duration-fast · --ease-standard' },
];
