# Textarea

## Purpose
A multi-line text box for longer writing, such as a description, a note or a
comment. It extends Input field: the same label, border, fill, type and
states, so a form that mixes one-line and multi-line fields stays
consistent.

## Use when
- The answer is a sentence or more and could run to several lines.
- The text is saved later, with a form or a button.

## Don't use when
- **It is one line.** Use Input field.
- **It is a password.** Use Password field (not converted yet).
- **It is a search.** Use Search input (not converted yet).
- **It is a quick reply in a conversation.** Use the Prompt input bar (not converted yet).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | text | **required** | The visible label. Always required: a placeholder is never a substitute. |
| `hideLabel` | boolean | `false` | Hides the label visually and keeps it for assistive tech. Only where the layout already names the field. |
| `helper` | text | — | A helper line under the box (caption, Neutral-5). |
| `error` | text | — | Bold Red error text that replaces `helper`, a 1px Red border and `aria-invalid`. Clear it when the text passes. |
| `required` | boolean | `false` | A Red `*` after the label and `aria-required`. |
| `showCount` | boolean | `false` | A character count under the box, `12/280`, Red at the limit. Needs `maxLength`. Off unless you set it. |
| `value`, `defaultValue`, `onChange`, `placeholder`, `rows`, `disabled`, `maxLength`, `name`, `id`, `aria-*`, `data-*`, … | native | — | Passed to the `<textarea>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the `<textarea>` element.

## Rules
1. **Always render a label.** Use `hideLabel` only where the surrounding layout already names the field. Never use the placeholder as the label.
2. **The box is at least 96px tall** (about four lines) **and resizes vertically only.** Never `both` or `horizontal`, and no maximum height. Don't let it shrink below 96px, including while dragging the handle.
3. **It is Input field's box**: 12px radius, 1px Neutral-3 border, Neutral-1 fill, 12px padding on every side, body2 type at regular weight, and a Neutral-5 placeholder.
4. **Focus is a border swap, on every focus.** A 2px Obsidian border, with the padding 1px less so the text stays put.
5. **Required is a marker plus `aria-required`**, as in Input field: a single Red `*` after the label, no "(required)" or "(optional)".
6. **An error says what to do, in words, and replaces the helper.** Bold Red text (every error in the library is bold), a 1px Red border, `aria-invalid`. Clear it as soon as the text passes. A focused field in error shows the Obsidian focus border over the Red one.
7. **Disabled** is Input field's look: Neutral-2 fill and Neutral-5 text.
8. **The box fills the container.** Set the width with the layout around it.
9. **The resize grip is pulled in from the corner.** The browser draws it right in the corner, where the box's 12px curve cuts across it. In Chrome, Edge and Safari it is redrawn as two thin Neutral-4 strokes clear of the curve (the handle works the same); Firefox keeps its own.
10. **The character count is the user's choice.** It is off by default; set `showCount` with `maxLength` to show it. It is Input field's counter: caption, Neutral-5, its own right-aligned row under the box, Red once the limit is reached. A field can have a `maxLength` and no visible count.

## Accessibility
- A native `<textarea>` with a real `<label for>`: the whole label focuses it. The label is always in the page, even with `hideLabel`.
- `required` sets `aria-required="true"` and the visual `*`, which is `aria-hidden`. The textarea does not get the native `required`, so the browser's own validation bubble never covers the error.
- The helper is attached with `aria-describedby`. In error, the error replaces it (never both) and `aria-invalid="true"` is set. It is not a live region: move focus to the field when you set it.
- The count is attached with `aria-describedby` and is not announced as you type.
- The error is stated in words, not only by colour.
- Focus is a border swap, not a ring.
- No live region.

## Motion
- None. The border and padding change at once, so there is nothing to remove under `prefers-reduced-motion`.

## Example

```tsx
import { Textarea } from '@collabrium/ui';

<Textarea
  label="Project description"
  placeholder="Describe what this project is for…"
  helper="Visible to everyone with access to this workspace"
/>
<Textarea label="Project description" defaultValue="Too short" error="Write at least 20 characters" />
<Textarea label="Project summary" maxLength={280} showCount />
```

## Replaces
- `.c-field` with `label`, `textarea`, `.required-mark`, `.c-helper` and `.c-field-error`, when it holds a `textarea`
