// Documentation for Textarea, rendered by the docs site (playground).
// Keep it consistent with Textarea.usage.md. Not part of the package build.
import { useState } from 'react';
import { Textarea } from './Textarea';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Textarea';

export const description =
  'A multi-line text box for longer writing. It extends Input field: the same label, border, fill and states, with room to grow and a handle to resize it vertically.';

export const usage = `import { Textarea } from '@collabrium/ui';

export function Description() {
  return (
    <Textarea
      label="Project description"
      placeholder="Describe what this project is for…"
      helper="Visible to everyone with access to this workspace"
    />
  );
}`;

export const thumbnail = () => <Textarea label="Project description" placeholder="Describe what this project is for…" />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Textarea',
    element: '<div>.cui-textarea',
    description: 'A column: label, box, then helper or error. Error and disabled are data attributes: data-error, data-disabled.',
    children: [
      {
        name: 'Label',
        element: 'label.cui-textarea__label',
        description: 'Label1 type, weight 700, Neutral-9. Always rendered; `hideLabel` keeps it for assistive tech only.',
        children: [{ name: 'Required marker', element: 'span.cui-textarea__required', when: 'with required', description: 'A Red `*`, 4px after the label text. Hidden from assistive tech.' }],
      },
      {
        name: 'Box',
        element: 'textarea.cui-textarea__input',
        description: 'At least 96px tall (about four lines), 12px radius, 1px Neutral-3 border, Neutral-1 fill, 12px padding, body2 type. Resizes vertically only. Focus swaps in a 2px Obsidian border.',
      },
      { name: 'Helper or error', element: 'span.cui-textarea__helper', when: 'with helper or error', description: 'Caption, Neutral-5. The error is bold Red and replaces the helper.' },
      { name: 'Counter', element: 'span.cui-textarea__counter', when: 'with showCount', description: 'Caption, Neutral-5, in its own right-aligned row, `12/280`. Red when the limit is reached.' },
    ],
  },
];

function ErrorExample() {
  const [value, setValue] = useState('Too short');
  return (
    <Textarea
      label="Project description"
      value={value}
      onChange={e => setValue(e.target.value)}
      error={value.trim().length < 20 ? 'Write at least 20 characters so your team knows what this is for' : undefined}
      helper="Visible to everyone with access to this workspace"
    />
  );
}

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Label and helper',
    description: 'A label, the box, and a helper line under it. The box is 96px tall to start; drag its corner to make it taller. The width is the width of the container.',
    render: () => (
      <Textarea
        label="Project description"
        placeholder="Describe what this project is for…"
        helper="Visible to everyone with access to this workspace"
      />
    ),
    code: `<Textarea
  label="Project description"
  placeholder="Describe what this project is for…"
  helper="Visible to everyone with access to this workspace"
/>`,
  },
  {
    id: 'states',
    title: 'States',
    description: 'Default, error and disabled. Focus is shown by clicking into any box: a 2px Obsidian border, with the text held in place.',
    render: () => (
      <div className="docs-stack">
        <Textarea label="Default" placeholder="Describe what this project is for…" helper="Visible to everyone with access to this workspace" />
        <Textarea label="Error" defaultValue="Too short" error="Write at least 20 characters so your team knows what this is for" />
        <Textarea label="Disabled" defaultValue="Locked while the project is archived." disabled helper="Restore the project to edit this" />
      </div>
    ),
    code: `<Textarea label="Default" placeholder="Describe what this project is for…" helper="Visible to everyone with access to this workspace" />
<Textarea label="Error" defaultValue="Too short" error="Write at least 20 characters so your team knows what this is for" />
<Textarea label="Disabled" defaultValue="Locked while the project is archived." disabled helper="Restore the project to edit this" />`,
  },
  {
    id: 'error',
    title: 'Error that clears',
    description: 'Set `error` when the text fails validation. The message replaces the helper in bold Red, the box takes a 1px Red border and `aria-invalid` is set. Clear it as soon as the text passes. Write 20 characters here to clear it.',
    render: () => <ErrorExample />,
    code: `import { useState } from 'react';

function Description() {
  const [value, setValue] = useState('Too short');
  return (
    <Textarea
      label="Project description"
      value={value}
      onChange={e => setValue(e.target.value)}
      error={value.trim().length < 20 ? 'Write at least 20 characters so your team knows what this is for' : undefined}
      helper="Visible to everyone with access to this workspace"
    />
  );
}`,
  },
  {
    id: 'required',
    title: 'Required',
    description: 'A field that must be filled takes `required`: a Red `*` follows the label and `aria-required` is set. Optional fields get no marker and no "(optional)" text.',
    render: () => (
      <div className="docs-stack">
        <p className="docs-status">* Required field</p>
        <Textarea label="Project description" required placeholder="Describe what this project is for…" />
        <Textarea label="Notes" placeholder="Optional" />
      </div>
    ),
    code: `<p>* Required field</p>
<Textarea label="Project description" required placeholder="Describe what this project is for…" />
<Textarea label="Notes" placeholder="Optional" />`,
  },
  {
    id: 'counter',
    title: 'Character count',
    description: 'For a field with a limit. Set `maxLength` and `showCount`: the count sits under the box, right-aligned, and turns Red when the limit is reached. It is off unless you turn it on, so a field with a limit but no need to show it stays quiet.',
    render: () => <Textarea label="Project summary" maxLength={280} showCount placeholder="Summarise the project in a few sentences" />,
    code: `<Textarea label="Project summary" maxLength={280} showCount placeholder="Summarise the project in a few sentences" />`,
  },
  {
    id: 'hidden-label',
    title: 'Hidden label',
    description: 'The label is always rendered. Where the layout already names the field, `hideLabel` hides it visually and keeps it for screen readers. A placeholder is not a label: it vanishes as soon as someone types.',
    render: () => <Textarea label="Comment" hideLabel placeholder="Add a comment" />,
    code: `<Textarea label="Comment" hideLabel placeholder="Add a comment" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: 'The visible label. Always required: a placeholder is never a substitute.' },
  { name: 'hideLabel', options: 'boolean', default: 'false', description: 'Hides the label visually and keeps it for assistive tech. Only where the layout already names the field.' },
  { name: 'helper', options: 'ReactNode', default: '—', description: 'A helper line under the box (caption, Neutral-5).' },
  { name: 'error', options: 'ReactNode', default: '—', description: 'Bold Red error text that replaces `helper`, a 1px Red border and `aria-invalid`. Clear it when the text passes.' },
  { name: 'required', options: 'boolean', default: 'false', description: 'A Red `*` after the label and `aria-required`. Leave optional fields unmarked.' },
  { name: 'showCount', options: 'boolean', default: 'false', description: 'A character count under the box, `12/280`, Red at the limit. Needs `maxLength`. Off unless you set it.' },
  { name: 'value / defaultValue, onChange, placeholder, rows, disabled, maxLength, name, id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the `<textarea>`. `style` and `className` are not accepted. The ref is forwarded to the `<textarea>`.' },
];

export const rules: DocsRules = {
  do: [
    'Always give the field a label. Hide it with `hideLabel` only where the layout already names the field.',
    'Use the placeholder only for an example of what to write.',
    'Mark required fields with `required` and leave optional fields unmarked.',
    'Say what to do in the error, and clear it as soon as the text passes.',
    'Use it where the answer is a sentence or more, and use Input field for one line.',
  ],
  dont: [
    'Don\'t use a placeholder instead of a label.',
    'Don\'t write "(required)" or "(optional)" in the label.',
    'Don\'t allow horizontal resizing, or shrink the box below 96px.',
    'Don\'t show the helper and the error together: the error replaces the helper.',
    'Don\'t use it for one line of text, a password or a search.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves focus into the box. A 2px Obsidian border shows.' },
    { keys: 'Type', action: 'Enters text as in any native textarea. Enter starts a new line.' },
  ],
  notes: [
    'A native `<textarea>` with a real `<label for>`, so the whole label focuses it. The label is always in the page, even with `hideLabel`.',
    'Required sets `aria-required="true"`; the Red `*` is visual only and hidden from assistive tech. The textarea is not given the native `required`, so the browser does not show its own validation bubble over yours.',
    'The helper is attached with `aria-describedby`. In error the error replaces it as the description (never both), and `aria-invalid="true"` is set. The error is not a live region: move focus to the field when you set it.',
    'The count is attached with `aria-describedby`. It is not announced as you type.',
    'The error is stated in words under the box, not only by the border colour.',
    'Focus is shown by a border swap, on every focus (mouse or keyboard), not a ring.',
    'The resize handle is the browser\'s own, so it works with a pointer; the box can also be made taller by typing.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Focus, error, disabled', motion: 'The border and padding change at once. Nothing animates, so there is nothing to remove under reduced motion.', token: '—' },
];
