// Documentation for Radio, rendered by the docs site (playground).
// Keep it consistent with Radio.usage.md. Not part of the package build.
import { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Radio';

export const description =
  'One choice from a short set. A real native radio with a label and an optional description, drawn as an outline circle with a dot, and a group that shares one name.';

export const usage = `import { Radio, RadioGroup } from '@collabrium/ui';

export function Digest() {
  return (
    <RadioGroup legend="How often should we email you?" defaultValue="weekly">
      <Radio value="weekly" label="Weekly digest" />
      <Radio value="daily" label="Daily digest" />
    </RadioGroup>
  );
}`;

export const thumbnail = () => (
  <RadioGroup legend="Digest" defaultValue="weekly">
    <Radio value="weekly" label="Weekly" />
    <Radio value="daily" label="Daily" />
  </RadioGroup>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Radio',
    element: '<label>.cui-radio',
    description: 'The row. The whole row is the click target. Disabled and error are data attributes: data-disabled, data-error.',
    children: [
      { name: 'Input', element: '<input type="radio">.cui-radio__input', description: 'The real control. Visually hidden but focusable; it holds the value, the checked state and the focus.' },
      {
        name: 'Circle',
        element: 'span.cui-radio__circle',
        description: '18×18px, round. Neutral-3 border and Neutral-1 fill when empty, an Obsidian border when chosen. It never fills solid. aria-hidden.',
        children: [{ name: 'Dot', element: 'span.cui-radio__dot', when: 'when chosen', description: '9×9px, round, Obsidian.' }],
      },
      {
        name: 'Text',
        element: 'span.cui-radio__text',
        when: 'with a label',
        description: 'Label and optional description stacked.',
        children: [
          { name: 'Label', element: 'span.cui-radio__label', description: 'Body1, weight 500, Neutral-9. Names the input.' },
          { name: 'Description', element: 'span.cui-radio__desc', when: 'with description', description: 'Caption, Neutral-5. Attached to the input with aria-describedby.' },
        ],
      },
    ],
  },
  {
    name: 'Radio group',
    element: '<fieldset>.cui-radio-group',
    description: 'Names a set of radios and gives them one shared name.',
    children: [
      { name: 'Legend', element: 'legend.cui-radio-group__legend', description: 'The group\'s question, in label1 type. An optional Red `*` follows it.' },
      { name: 'Helper or error', element: 'p.cui-radio-group__message', when: 'with description or error', description: 'Caption under the legend. The error is bold Red and replaces the helper.' },
      { name: 'List', element: 'div.cui-radio-group__list', description: 'The radios in a column, 12px apart.' },
    ],
  },
];

function ControlledExample() {
  const [value, setValue] = useState('weekly');
  return (
    <div className="docs-stack">
      <RadioGroup legend="How often should we email you?" value={value} onValueChange={setValue}>
        <Radio value="weekly" label="Weekly digest" description="Every Monday morning" />
        <Radio value="daily" label="Daily digest" description="Every weekday morning" />
        <Radio value="never" label="No emails" />
      </RadioGroup>
      <p className="docs-status">Chosen: {value}</p>
    </div>
  );
}

function ErrorExample() {
  const [value, setValue] = useState('');
  return (
    <RadioGroup
      legend="Preferred contact"
      required
      value={value}
      onValueChange={setValue}
      error={value === '' ? 'Choose how we should contact you' : undefined}
    >
      <Radio value="email" label="Email" />
      <Radio value="phone" label="Phone" />
      <Radio value="post" label="Post" />
    </RadioGroup>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'group',
    title: 'A group with a description',
    description: 'A fieldset with a legend names the set. Each radio has a label and an optional description. Uncontrolled: the group keeps its own choice, like native radios.',
    render: () => (
      <RadioGroup legend="How often should we email you?" description="You can change this later" defaultValue="weekly">
        <Radio value="weekly" label="Weekly digest" description="Every Monday morning" />
        <Radio value="daily" label="Daily digest" description="Every weekday morning" />
        <Radio value="never" label="No emails" />
      </RadioGroup>
    ),
    code: `<RadioGroup legend="How often should we email you?" description="You can change this later" defaultValue="weekly">
  <Radio value="weekly" label="Weekly digest" description="Every Monday morning" />
  <Radio value="daily" label="Daily digest" description="Every weekday morning" />
  <Radio value="never" label="No emails" />
</RadioGroup>`,
  },
  {
    id: 'controlled',
    title: 'Controlled',
    description: 'Pass `value` and `onValueChange` to keep the choice in your own state. `onValueChange` receives the new value, not the event.',
    render: () => <ControlledExample />,
    code: `import { useState } from 'react';

function Digest() {
  const [value, setValue] = useState('weekly');
  return (
    <RadioGroup legend="How often should we email you?" value={value} onValueChange={setValue}>
      <Radio value="weekly" label="Weekly digest" description="Every Monday morning" />
      <Radio value="daily" label="Daily digest" description="Every weekday morning" />
      <Radio value="never" label="No emails" />
    </RadioGroup>
  );
}`,
  },
  {
    id: 'states',
    title: 'States',
    description: 'Empty, chosen and disabled (a disabled radio can also be the chosen one). Chosen is an Obsidian border and a dot; the circle never fills solid, which is what tells a Radio from a Checkbox.',
    render: () => (
      <div className="docs-stack">
        <RadioGroup legend="States" defaultValue="chosen">
          <Radio value="empty" label="Empty" />
          <Radio value="chosen" label="Chosen" />
          <Radio value="disabled" label="Disabled" disabled />
        </RadioGroup>
        <Radio name="states-disabled-chosen" value="disabled-chosen" label="Disabled, chosen" disabled defaultChecked />
      </div>
    ),
    code: `<RadioGroup legend="States" defaultValue="chosen">
  <Radio value="empty" label="Empty" />
  <Radio value="chosen" label="Chosen" />
  <Radio value="disabled" label="Disabled" disabled />
</RadioGroup>
<Radio name="states-disabled-chosen" value="disabled-chosen" label="Disabled, chosen" disabled defaultChecked />`,
  },
  {
    id: 'standalone',
    title: 'Without a group',
    description: 'A radio works on its own with a native `name`, exactly like `<input type="radio">`. Prefer a RadioGroup: it names the question and shares the name for you.',
    render: () => (
      <div className="docs-row">
        <Radio name="digest-standalone" value="weekly" label="Weekly digest" defaultChecked />
        <Radio name="digest-standalone" value="daily" label="Daily digest" />
      </div>
    ),
    code: `<Radio name="digest-standalone" value="weekly" label="Weekly digest" defaultChecked />
<Radio name="digest-standalone" value="daily" label="Daily digest" />`,
  },
  {
    id: 'required-and-error',
    title: 'Required and error',
    description:
      'A group that needs a choice takes `required`: a Red `*` follows the legend and every radio gets the native `required`. If it is submitted empty, set `error`: the message replaces the helper in bold Red and every empty circle takes a 1px Red border. Clear `error` on the first selection, and move focus to the first radio yourself.',
    render: () => <ErrorExample />,
    code: `<RadioGroup
  legend="Preferred contact"
  required
  value={value}
  onValueChange={setValue}
  error={value === '' ? 'Choose how we should contact you' : undefined}
>
  <Radio value="email" label="Email" />
  <Radio value="phone" label="Phone" />
  <Radio value="post" label="Post" />
</RadioGroup>`,
  },
];

export const props: DocsProp[] = [
  { name: 'value', options: 'string', default: '—', required: true, description: 'What the option submits. Required inside a RadioGroup, which selects by it.' },
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: 'The visible label, written as the option itself ("Weekly digest"). Required unless you set `aria-label`.' },
  { name: 'description', options: 'ReactNode', default: '—', description: 'Optional helper line under the label. Only with `label`.' },
  { name: 'aria-label', options: 'string', default: '—', description: 'Names the radio when there is no visible label. Required in that case.' },
  { name: 'disabled', options: 'boolean', default: 'false', description: '50% opacity, not-allowed cursor, not focusable.' },
  { name: 'checked / defaultChecked, name, onChange', options: 'native', default: '—', description: 'Only for a radio outside a group, exactly like a native radio. Inside a group, the group owns them.' },
  { name: 'RadioGroup: legend', options: 'ReactNode', default: '—', required: true, description: 'The group\'s question ("How often should we email you?"). Names the `<fieldset>`.' },
  { name: 'RadioGroup: description', options: 'ReactNode', default: '—', description: 'Helper line under the legend (caption, Neutral-5).' },
  { name: 'RadioGroup: error', options: 'ReactNode', default: '—', description: 'Group error in bold Red, replacing the description. Every enabled, unselected radio takes the red border and `aria-invalid`.' },
  { name: 'RadioGroup: required', options: 'boolean', default: 'false', description: 'A Red `*` after the legend, and the native `required` on every radio.' },
  { name: 'RadioGroup: value / defaultValue', options: 'string', default: 'nothing chosen', description: 'The chosen radio\'s `value`: controlled, or the starting choice.' },
  { name: 'RadioGroup: onValueChange', options: '(value: string) => void', default: '—', description: 'Called with the new value when the person picks a radio.' },
  { name: 'RadioGroup: name', options: 'string', default: 'generated', description: 'The shared native name, which is also the form field name.' },
  { name: 'RadioGroup: disabled', options: 'boolean', default: 'false', description: 'Disables every radio in the group.' },
  { name: 'RadioGroup: children', options: 'ReactNode', default: '—', required: true, description: 'The `Radio` components, stacked 12px apart. Each needs a `value`.' },
  { name: 'id, form, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the `<input>` (Radio) or the `<fieldset>` (RadioGroup). `style` and `className` are not accepted. The ref is forwarded to the `<input>`, or to the `<fieldset>`.' },
];

export const rules: DocsRules = {
  do: [
    'Use a RadioGroup, with a legend that asks the question the options answer.',
    'Give every radio a name: a visible `label`, or an `aria-label` when that is impossible.',
    'Use Radio for one choice from up to four or five visible options.',
    'Write each label as the option itself: "Weekly digest".',
    'Start with nothing chosen, or a real default.',
  ],
  dont: [
    'Don\'t use Radio when several options can be on at once. That is a Checkbox.',
    'Don\'t use it for more than four or five options. Use a select.',
    'Don\'t mix Radio and Checkbox in one group: the outline circle against the filled box is how people tell single from multiple choice.',
    'Don\'t use it to switch a view straight away. That is a Segmented Control.',
    'Don\'t keep an error showing once a radio is chosen.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves focus into the group once, to the chosen radio (or the first). A 2px Obsidian ring shows on the circle.' },
    { keys: 'Arrow keys', action: 'Move to the next or previous radio and choose it.' },
    { keys: 'Space', action: 'Chooses the focused radio when none is chosen.' },
  ],
  notes: [
    'A native `<input type="radio">` inside a `<label>`, so the whole row is clickable, the arrow keys work, and it takes part in forms.',
    'The input is visually hidden but stays focusable. The circle and the dot are `aria-hidden`; the state is read from the input.',
    'The label names the input and the description is attached with `aria-describedby`.',
    'A group is a `<fieldset>` with a `<legend>`, described by its helper or error.',
    'The dot, not only a colour change, marks the chosen radio. In forced-colours mode the dot is painted in the system text colour so it still shows.',
    'A required group puts the native `required` on every radio; the Red `*` is visual only and hidden from assistive tech.',
    'An error sets `aria-invalid` on each enabled radio and is the group\'s description in place of the helper. It is not a live region: move focus to the first radio when you set it.',
    'The error is stated in words, not only by the red border and text colour.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover, press, choose', motion: 'The circle\'s fill and border colour fade between states. Nothing moves, so there is nothing to remove under reduced motion.', token: '--duration-fast · --ease-standard' },
];
