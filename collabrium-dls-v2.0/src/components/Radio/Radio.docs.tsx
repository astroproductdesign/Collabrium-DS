// Documentation for Radio, rendered by the docs site (playground).
// Keep it consistent with Radio.usage.md (which includes Radio card). Not part of the package build.
import { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';
import { RadioCard, RadioCardGroup } from './RadioCard';
import { Button } from '../Button';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Radio';

export const description =
  'One choice from a short set. A real native radio with a label and an optional description, drawn as an outline circle with a dot, and a group that shares one name. Radio card is its large variant: the whole card is one option, for 2 or 3 paths that each need a sentence or a live figure.';

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

function RadioCardErrorExample() {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | undefined>();
  return (
    <form
      className="docs-stack"
      // The page checks the group itself (the DS's error state), so the browser's own required bubble is off.
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!value) {
          setError('Choose an audience to continue');
          (e.currentTarget.querySelector('input[type="radio"]:not(:disabled)') as HTMLInputElement | null)?.focus();
        }
      }}
    >
      <RadioCardGroup
        legend="Audience"
        required
        value={value}
        onValueChange={(v) => {
          setValue(v);
          setError(undefined);
        }}
        error={error}
        description="You can change this until the plan is booked."
      >
        <RadioCard value="personas" title="Personas" description="Segments from the KULT playbook, built on real viewing behaviour." meta="12 personas available" />
        <RadioCard value="mass" title="Mass" description="The whole Malaysia footprint, no segmentation." meta="16,150,000" />
      </RadioCardGroup>
      <div>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}


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
        children: [{ name: 'Dot', element: 'span.cui-radio__dot', when: 'when chosen', description: '8×8px, round, Obsidian.' }],
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
  {
    name: 'Radio card group',
    element: '<fieldset>.cui-radio-card-group',
    description: 'A real fieldset. It is also the size container the grid\'s columns are measured against.',
    children: [
      { name: 'Legend', element: 'legend.cui-radio-group__legend', description: 'The group\'s question, label1. An optional Red `*` when required.' },
      { name: 'Helper / error', element: 'p.cui-radio-group__message', when: 'description or error', description: 'Caption, 4px under the legend. The error (caption, bold, Red) replaces the helper.' },
      {
        name: 'Grid',
        element: '.cui-radio-card-grid',
        description: '12px under the legend, 16px gap. One column, then straight to 2 at a 496px group (or straight to 3 at 752px with `columns={3}`). Equal-height rows.',
        children: [
          {
            name: 'Card',
            element: 'label.cui-card.cui-radio-card',
            description: 'Card\'s surface: Neutral-1, 1px Neutral-3, radius-lg, shadow-1, 16px padding, 8px gap, the 240px floor. The whole card is the label.',
            children: [
              { name: 'Radio', element: 'input[type=radio]', description: 'Visually hidden, still focusable. Named by the title; the description, badge, meta and any error describe it.' },
              { name: 'Circle', element: '.cui-radio__circle', description: 'Radio\'s 18px circle; the dot shows when the card is chosen.' },
              { name: 'Title', element: '.cui-radio-card__title', description: 'h5, Neutral-9.' },
              { name: 'Badge', element: 'Badge neutral', when: 'badge', description: 'Beside the title; drops under it when there\'s no room. At most one per group.' },
              { name: 'Description', element: '.cui-radio-card__desc', when: 'description', description: 'Caption, Neutral-5, indented to the title\'s left edge (18px + 8px).' },
              { name: 'Meta', element: '.cui-radio-card__meta', when: 'meta', description: 'Caption bold, Neutral-9, tabular figures, indented like the description and pinned to the bottom.' },
            ],
          },
        ],
      },
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
  {
    id: 'card',
    title: 'Radio card: two paths',
    description: 'Click anywhere on a card, or Tab into the group and use the arrow keys. Mass is pre-selected as a real default.',
    render: () => (
      <RadioCardGroup legend="Audience" defaultValue="mass">
        <RadioCard value="personas" title="Personas" description="Segments from the KULT playbook, built on real viewing behaviour." meta="12 personas available" />
        <RadioCard value="mass" title="Mass" description="The whole Malaysia footprint, no segmentation." meta="16,150,000" />
      </RadioCardGroup>
    ),
    code: `<RadioCardGroup legend="Audience" defaultValue="mass">
  <RadioCard value="personas" title="Personas" description="Segments from the KULT playbook, built on real viewing behaviour." meta="12 personas available" />
  <RadioCard value="mass" title="Mass" description="The whole Malaysia footprint, no segmentation." meta="16,150,000" />
</RadioCardGroup>`,
  },
  {
    id: 'card-three',
    title: 'Radio card: three paths, a badge and a disabled card',
    description: 'With `columns={3}` the grid goes straight from one column to three. A disabled card gives its reason in the meta, at full strength.',
    render: () => (
      <RadioCardGroup legend="Booking type" columns={3}>
        <RadioCard value="guaranteed" title="Guaranteed" badge="Recommended" description="Fixed spots at a fixed rate, confirmed at booking." meta="From RM 12,500.00" />
        <RadioCard value="preemptible" title="Pre-emptible" description="Lower rate; a higher bid can move your spot." meta="From RM 8,900.00" />
        <RadioCard value="bonus" title="Bonus" description="Unsold inventory added at no charge." meta="Not available for this plan" disabled />
      </RadioCardGroup>
    ),
    code: `<RadioCardGroup legend="Booking type" columns={3}>
  <RadioCard value="guaranteed" title="Guaranteed" badge="Recommended" description="Fixed spots at a fixed rate, confirmed at booking." meta="From RM 12,500.00" />
  <RadioCard value="preemptible" title="Pre-emptible" description="Lower rate; a higher bid can move your spot." meta="From RM 8,900.00" />
  <RadioCard value="bonus" title="Bonus" description="Unsold inventory added at no charge." meta="Not available for this plan" disabled />
</RadioCardGroup>`,
  },
  {
    id: 'card-error',
    title: 'Radio card: required, with an error',
    description: 'Press Continue with nothing chosen: the error replaces the helper, the cards turn Red and focus moves to the first card. Choosing one clears it.',
    render: () => <RadioCardErrorExample />,
    code: `<RadioCardGroup
  legend="Audience"
  required
  value={value}
  onValueChange={(v) => { setValue(v); setError(undefined); }}
  error={error}
  description="You can change this until the plan is booked."
>
  <RadioCard value="personas" title="Personas" description="Segments from the KULT playbook, built on real viewing behaviour." meta="12 personas available" />
  <RadioCard value="mass" title="Mass" description="The whole Malaysia footprint, no segmentation." meta="16,150,000" />
</RadioCardGroup>`,
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
  { name: 'RadioCardGroup: legend', options: 'ReactNode', default: '—', required: true, description: 'The group\'s question.' },
  { name: 'RadioCardGroup: hideLegend', options: 'boolean', default: 'false', description: 'Hides the legend visually; still read out.' },
  { name: 'RadioCardGroup: description', options: 'ReactNode', default: '—', description: 'A helper line under the legend.' },
  { name: 'RadioCardGroup: error', options: 'ReactNode', default: '—', description: 'Replaces the helper; enabled, unselected cards turn Red. Clear it on the first selection.' },
  { name: 'RadioCardGroup: required / disabled / name', options: '—', default: '—', description: 'As Radio group.' },
  { name: 'RadioCardGroup: value / defaultValue / onValueChange', options: 'string', default: '—', description: 'The chosen card.' },
  { name: 'RadioCardGroup: columns', options: '2 | 3', default: '2', description: 'Two (at 496px) or three (at 752px) side by side; one column below that.' },
  { name: 'RadioCard: value', options: 'string', default: '—', required: true, description: 'What the card submits.' },
  { name: 'RadioCard: title', options: 'ReactNode', default: '—', required: true, description: 'The option\'s name (h5).' },
  { name: 'RadioCard: description', options: 'ReactNode', default: '—', description: 'One or two sentences.' },
  { name: 'RadioCard: meta', options: 'ReactNode', default: '—', description: 'A live figure, pinned to the bottom; on a disabled card, the reason.' },
  { name: 'RadioCard: badge', options: 'ReactNode', default: '—', description: 'A neutral Badge beside the title. At most one per group.' },
  { name: 'RadioCard: disabled', options: 'boolean', default: 'false', description: 'Can\'t be chosen.' },
];

export const rules: DocsRules = {
  do: [
    'Use a RadioGroup, with a legend that asks the question the options answer.',
    'Give every radio a name: a visible `label`, or an `aria-label` when that is impossible.',
    'Use Radio for one choice from up to four or five visible options.',
    'Write each label as the option itself: "Weekly digest".',
    'Start with nothing chosen, or a real default.',
    'Use a Radio card group for 2 or 3 paths that each need a sentence or a live figure; give a disabled card its reason in the meta.',
  ],
  dont: [
    'Don\'t use Radio when several options can be on at once. That is a Checkbox.',
    'Don\'t use it for more than four or five options. Use a select.',
    'Don\'t mix Radio and Checkbox in one group: the outline circle against the filled box is how people tell single from multiple choice.',
    'Don\'t use it to switch a view straight away. That is a Segmented Control.',
    'Don\'t keep an error showing once a radio is chosen.',
    'Don\'t put buttons or links inside a Radio card: the card is a label.',
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
    'Radio card: each card is the label of a real radio, named by its title; the description, badge, meta and the group\'s error describe it. Focus shows as the Water ring on the whole card, never the circle. An updated meta is read on the next focus (no live region).',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Radio card: hover, choose', motion: 'The card\'s shadow and border colour ease, no movement; none under reduced motion.', token: '--duration-base · --ease-settle' },
  { interaction: 'Hover, press, choose', motion: 'The circle\'s fill and border colour fade between states. Nothing moves, so there is nothing to remove under reduced motion.', token: '--duration-fast · --ease-standard' },
];
