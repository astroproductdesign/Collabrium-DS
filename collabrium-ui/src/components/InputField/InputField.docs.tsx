// Documentation for InputField, rendered by the docs site (playground).
// Keep it consistent with InputField.usage.md. Not part of the package build.
import { useState } from 'react';
import { Envelope, MagnifyingGlass } from '@phosphor-icons/react';
import { InputField } from './InputField';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Input field';

export const description =
  'A single-line text box with a label, an optional helper or error line, icons, text adornments and a character count. For a whole-number quantity use Quantity selector; for passwords, search and several lines use their own components.';

export const usage = `import { InputField } from '@collabrium/ui';

export function WorkspaceName() {
  return <InputField label="Workspace name" placeholder="e.g. Astro Growth" helper="Visible to your whole team" />;
}`;

export const thumbnail = () => <InputField label="Workspace name" placeholder="e.g. Astro Growth" helper="Visible to your whole team" />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Input field',
    element: '<div>.cui-input-field',
    description: 'A column: label, box, then helper or error, then the count. Size, error, success and disabled are data attributes: data-size, data-error, data-success, data-disabled.',
    children: [
      {
        name: 'Label',
        element: 'label.cui-input-field__label',
        description: 'Label1 type, weight 700, Neutral-9. Always rendered; `hideLabel` keeps it for assistive tech only.',
        children: [{ name: 'Required marker', element: 'span.cui-input-field__required', when: 'with required', description: 'A Red `*`, 4px after the label text. Hidden from assistive tech.' }],
      },
      {
        name: 'Box',
        element: 'div.cui-input-field__wrap > input.cui-input-field__input',
        description: '40px (sm 32px, lg 48px), 12px radius, 1px Neutral-3 border, Neutral-1 fill, body2 type. Focus swaps in a 2px Obsidian border.',
        children: [
          { name: 'Leading or trailing icon', element: 'svg.cui-input-field__icon', when: 'with leadingIcon or trailingIcon', description: '16px, Regular, Neutral-5, decorative, 12px from the edge.' },
          { name: 'Prefix or suffix', element: 'span.cui-input-field__adornment', when: 'with prefix or suffix', description: 'Caption type, Neutral-5, fixed text. The box reserves 28px for it.' },
          { name: 'Success icon', element: 'svg.cui-input-field__icon--trailing', when: 'with success', description: 'A Green check-circle, Fill (Tier 2).' },
        ],
      },
      { name: 'Helper or error', element: 'span.cui-input-field__helper', when: 'with helper or error', description: 'Caption, Neutral-5. The error is bold Red and replaces the helper.' },
      { name: 'Counter', element: 'span.cui-input-field__counter', when: 'with showCount', description: 'Caption, Neutral-5, right-aligned, `12/60`. Red when the limit is reached.' },
    ],
  },
];

function ErrorExample() {
  const [value, setValue] = useState('Astro');
  return (
    <InputField
      label="Workspace name"
      value={value}
      onChange={e => setValue(e.target.value)}
      error={value.trim().toLowerCase() === 'astro' ? 'This workspace name is already taken' : undefined}
      helper="Visible to your whole team"
    />
  );
}

function CounterExample() {
  return <InputField label="Status update" maxLength={60} showCount placeholder="What's happening in your team?" />;
}

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Label and helper',
    description: 'A label, the box, and a helper line under it. Uncontrolled: it keeps its own value, like a native input. The width is the width of the container.',
    render: () => <InputField label="Workspace name" placeholder="e.g. Astro Growth" helper="Visible to your whole team" />,
    code: `<InputField label="Workspace name" placeholder="e.g. Astro Growth" helper="Visible to your whole team" />`,
  },
  {
    id: 'states',
    title: 'States',
    description: 'Default, error, disabled and success. Focus is shown by clicking into any field: a 2px Obsidian border, with the text held in place.',
    render: () => (
      <div className="docs-stack">
        <InputField label="Default" placeholder="e.g. Astro Growth" helper="Visible to your whole team" />
        <InputField label="Error" defaultValue="Astro" error="This workspace name is already taken" />
        <InputField label="Disabled" defaultValue="Astro Growth" disabled helper="Locked by admin" />
        <InputField label="Success" defaultValue="Astro Growth" success helper="Name is available" />
      </div>
    ),
    code: `<InputField label="Default" placeholder="e.g. Astro Growth" helper="Visible to your whole team" />
<InputField label="Error" defaultValue="Astro" error="This workspace name is already taken" />
<InputField label="Disabled" defaultValue="Astro Growth" disabled helper="Locked by admin" />
<InputField label="Success" defaultValue="Astro Growth" success helper="Name is available" />`,
  },
  {
    id: 'error',
    title: 'Error that clears',
    description: 'Set `error` when the value fails validation. The message replaces the helper in Red, the box takes a 1px Red border and `aria-invalid` is set. Clear it as soon as the value passes. Type anything other than "Astro" to clear it here.',
    render: () => <ErrorExample />,
    code: `import { useState } from 'react';

function WorkspaceName() {
  const [value, setValue] = useState('Astro');
  return (
    <InputField
      label="Workspace name"
      value={value}
      onChange={e => setValue(e.target.value)}
      error={value.trim().toLowerCase() === 'astro' ? 'This workspace name is already taken' : undefined}
      helper="Visible to your whole team"
    />
  );
}`,
  },
  {
    id: 'required',
    title: 'Required and optional',
    description: 'A field that must be filled takes `required`: a Red `*` follows the label and `aria-required` is set. Optional fields get no marker and no "(optional)" text: the missing `*` is the signal. Tell people what the `*` means once, above the form.',
    render: () => (
      <div className="docs-stack">
        <p className="docs-status">* Required field</p>
        <InputField label="Workspace name" required placeholder="e.g. Astro Growth" helper="Visible to your whole team" />
        <InputField label="Nickname" placeholder="Optional" />
      </div>
    ),
    code: `<p>* Required field</p>
<InputField label="Workspace name" required placeholder="e.g. Astro Growth" helper="Visible to your whole team" />
<InputField label="Nickname" placeholder="Optional" />`,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Small (32px) for a dense table\'s inline edit, medium (40px) for most forms, large (48px) for a large form. A density choice made per context: never change the size at a screen width. Narrow the layout instead.',
    render: () => (
      <div className="docs-stack">
        <InputField label="Small" size="sm" placeholder="32px" />
        <InputField label="Medium" size="md" placeholder="40px" />
        <InputField label="Large" size="lg" placeholder="48px" />
      </div>
    ),
    code: `<InputField label="Small" size="sm" placeholder="32px" />
<InputField label="Medium" size="md" placeholder="40px" />
<InputField label="Large" size="lg" placeholder="48px" />`,
  },
  {
    id: 'icons',
    title: 'Icons',
    description: 'An icon inside the box, at either end: 16px, Regular, Neutral-5 and decorative. The text moves in to clear it. An icon that must be pressed is an icon button, which belongs to Password field and Search input.',
    render: () => (
      <div className="docs-stack">
        <InputField label="Email" type="email" leadingIcon={Envelope} placeholder="name@example.com" />
        <InputField label="Search accounts" trailingIcon={MagnifyingGlass} placeholder="Account name" />
      </div>
    ),
    code: `<InputField label="Email" type="email" leadingIcon={Envelope} placeholder="name@example.com" />
<InputField label="Search accounts" trailingIcon={MagnifyingGlass} placeholder="Account name" />`,
  },
  {
    id: 'adornments',
    title: 'Prefix and suffix',
    description: 'Fixed, non-editable text inside the box: a currency sign, a unit, an @. Keep it to one or two characters: the box reserves 28px for it at either end. A screen reader does not read it, so name the unit in the label or helper too. If it has to be pressed, it is an icon instead.',
    render: () => (
      <div className="docs-stack">
        <InputField label="Monthly budget" prefix="$" placeholder="0.00" helper="In USD" />
        <InputField label="Package weight" suffix="kg" placeholder="0" helper="Rounded to the nearest 0.1kg" />
      </div>
    ),
    code: `<InputField label="Monthly budget" prefix="$" placeholder="0.00" helper="In USD" />
<InputField label="Package weight" suffix="kg" placeholder="0" helper="Rounded to the nearest 0.1kg" />`,
  },
  {
    id: 'counter',
    title: 'Character count',
    description: 'For a field with a limit. Set `maxLength` and `showCount`: the count sits under the box, right-aligned, and turns Red when the limit is reached.',
    render: () => <CounterExample />,
    code: `<InputField label="Status update" maxLength={60} showCount placeholder="What's happening in your team?" />`,
  },
  {
    id: 'hidden-label',
    title: 'Hidden label',
    description: 'The label is always rendered. Where the layout already names the field, `hideLabel` hides it visually and keeps it for screen readers. A placeholder is not a label: it vanishes as soon as someone types.',
    render: () => <InputField label="Account name" hideLabel placeholder="Account name" />,
    code: `<InputField label="Account name" hideLabel placeholder="Account name" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: 'The visible label. Always required: a placeholder is never a substitute.' },
  { name: 'hideLabel', options: 'boolean', default: 'false', description: 'Hides the label visually and keeps it for assistive tech. Only where the layout already names the field.' },
  { name: 'type', options: "'text' | 'email' | 'url' | 'tel' | 'number'", default: "'text'", description: 'The kind of input. Passwords and search have their own components.' },
  { name: 'helper', options: 'ReactNode', default: '—', description: 'A helper line under the box (caption, Neutral-5).' },
  { name: 'error', options: 'ReactNode', default: '—', description: 'Bold Red error text that replaces `helper`, a 1px Red border and `aria-invalid`. Clear it when the value passes.' },
  { name: 'success', options: 'boolean', default: 'false', description: 'A 1px Green border and a trailing Green check-circle. Set it after validation passes (on blur or submit). Ignored while `error` is set.' },
  { name: 'required', options: 'boolean', default: 'false', description: 'A Red `*` after the label and `aria-required`. Leave optional fields unmarked.' },
  { name: 'size', options: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The height: 32, 40 or 48px. A density choice, never tied to a screen width.' },
  { name: 'leadingIcon, trailingIcon', options: 'Icon (Phosphor)', default: '—', description: 'A decorative icon inside the box, Regular weight. The trailing icon is replaced by the success check while `success` shows.' },
  { name: 'prefix, suffix', options: 'string', default: '—', description: 'Fixed, non-editable text inside the box (`$`, `kg`). One or two characters, and never interactive.' },
  { name: 'showCount', options: 'boolean', default: 'false', description: 'A character count under the box, `12/60`, Red at the limit. Needs `maxLength`.' },
  { name: 'value / defaultValue, onChange, placeholder, disabled, maxLength, name, id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the `<input>`. `style` and `className` are not accepted. The ref is forwarded to the `<input>`.' },
];

export const rules: DocsRules = {
  do: [
    'Always give the field a label. Hide it with `hideLabel` only where the layout already names the field.',
    'Use the placeholder only for an example of the value ("e.g. Astro Growth").',
    'Mark required fields with `required` and leave optional fields unmarked.',
    'Say what to do in the error ("Enter a name with at least 3 letters"), and clear it as soon as the value passes.',
    'Pick the size for the context and keep it: sm for a dense table, md for forms, lg for a large form.',
    'Show success only after validation passes, not on every valid keystroke.',
  ],
  dont: [
    'Don\'t use a placeholder instead of a label.',
    'Don\'t write "(required)" or "(optional)" in the label.',
    'Don\'t put anything pressable in a prefix or suffix. Use an icon button.',
    'Don\'t change the size at a screen width. Change the layout.',
    'Don\'t show the helper and the error together: the error replaces the helper.',
    'Don\'t use it for a whole-number quantity (Quantity selector), a password, a search, or several lines.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves focus into the box. A 2px Obsidian border shows.' },
    { keys: 'Type', action: 'Enters text as in any native input.' },
  ],
  notes: [
    'A native `<input>` with a real `<label for>`, so the whole label focuses it. The label is always in the page, even with `hideLabel`.',
    'Required sets `aria-required="true"`; the Red `*` is visual only and hidden from assistive tech. The input is not given the native `required`, so the browser does not show its own validation bubble over yours.',
    'The helper is attached with `aria-describedby`. In error the error replaces it as the description (never both), and `aria-invalid="true"` is set. The error is not a live region: move focus to the field when you set it.',
    'Icons, prefix, suffix and the success check are `aria-hidden`. Say what a unit means in the label or helper.',
    'The character count is attached with `aria-describedby`. It is not announced as you type.',
    'The error and the success are stated in words under the box, not only by the border colour.',
    'Focus is shown by a border swap, on every focus (mouse or keyboard), not a ring.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Focus, error, success, disabled', motion: 'The border and padding change at once. Nothing animates, so there is nothing to remove under reduced motion.', token: '—' },
];
