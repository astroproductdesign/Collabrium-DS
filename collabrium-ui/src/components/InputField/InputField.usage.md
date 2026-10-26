# Input field

## Purpose
A single-line text box with a label, an optional helper or error line,
optional icons and text adornments, and a character count. It is the base
the other text fields extend: Textarea, Password field and Search input
share its label, border, fill and type.

## Use when
- The person types one line of text, an email address, a URL, a telephone number or a number.
- The value is saved later, with a form or a button.

## Don't use when
- **It is a whole-number quantity with − and + buttons.** Use Quantity selector (not converted yet), which is built on this box.
- **It is a password.** Use Password field (not converted yet).
- **It is a search.** Use Search input (not converted yet).
- **The text runs to several lines.** Use Textarea (not converted yet).
- **The person picks from a list.** Use Radio, a select, or Chip, never a text box with a list of valid answers.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | text | **required** | The visible label. Always required: a placeholder is never a substitute. |
| `hideLabel` | boolean | `false` | Hides the label visually and keeps it for assistive tech. Only where the layout already names the field. |
| `type` | `'text'` \| `'email'` \| `'url'` \| `'tel'` \| `'number'` | `'text'` | The kind of input. |
| `helper` | text | — | A helper line under the box (caption, Neutral-5). |
| `error` | text | — | Bold Red error text that replaces `helper`, a 1px Red border and `aria-invalid`. Clear it when the value passes. |
| `success` | boolean | `false` | A 1px Green border and a trailing Green check-circle. Set it after validation passes. Ignored while `error` is set. |
| `required` | boolean | `false` | A Red `*` after the label and `aria-required`. |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | 32, 40 or 48px. |
| `leadingIcon`, `trailingIcon` | Phosphor icon | — | A decorative icon inside the box, Regular weight. |
| `prefix`, `suffix` | text | — | Fixed, non-editable text inside the box (`$`, `kg`). |
| `showCount` | boolean | `false` | A character count under the box, Red at the limit. Needs `maxLength`. |
| `value`, `defaultValue`, `onChange`, `placeholder`, `disabled`, `maxLength`, `name`, `id`, `aria-*`, `data-*`, … | native | — | Passed to the `<input>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the `<input>` element.

## Rules
1. **Always render a label.** Use `hideLabel` only where the surrounding layout already names the field. Never use the placeholder as the label: it disappears as soon as someone types.
2. **The placeholder is an example, in Neutral-5** ("e.g. Astro Growth"), the same size and weight as typed text so it reads as a hint, not as disabled content.
3. **Required is a marker plus `aria-required`.** A single Red `*` directly after the label text, 4px away, with no "(required)" and no "(optional)". Optional fields carry no marker. When every field is required, drop the `*` and say "All fields are required" once above the first field; otherwise keep the `*` on required fields and say "* Required field" once.
4. **An error says what to do, in words, and replaces the helper.** Bold Red text (every error in the library is bold), a 1px Red border, `aria-invalid`, and the message becomes the input's description in place of the helper. Clear it as soon as the value passes. Never show helper and error together. A focused field in error shows the Obsidian focus border over the Red one.
5. **Success follows validation, not typing.** The Green border and check-circle show after the field passes (on blur or submit).
6. **Focus is a border swap, on every focus.** A mouse click shows the same 2px Obsidian border a Tab does. The horizontal padding drops by 1px so the text stays put. It is the one exception to "focus rings are Water, not Obsidian" (DESIGN-SYSTEM.md).
7. **Size is a density choice made per context**, never swapped at a screen width. sm (32px) for a dense table's inline edit, md (40px) for forms, lg (48px) for a large form.
8. **An icon is decorative; an adornment is fixed text of one or two characters**, with 28px reserved for it at either end. The icon is 16px, Regular, Neutral-5, 12px from the edge, and the text moves in to clear it. If something inside the box must be pressed it is an icon button (Password field, Search input), never an adornment.
9. **The box fills the container.** Set the width with the layout around it. (The DLS's 220px is a demo default.)
10. **The count is its own row** (decided 2026-10-26): right-aligned under the box and the helper, `12/60`, Red once the limit is reached.
11. **Autofill keeps the Neutral-1 fill**, not the browser's yellow or blue tint.
12. **A label's trailing info icon** (a tooltip trigger beside the `*`) is not part of this component until Tooltip is converted.

## Accessibility
- A native `<input>` with a real `<label for>`: the whole label focuses it. The label is always in the page, even with `hideLabel`.
- `required` sets `aria-required="true"` and the visual `*`, which is `aria-hidden`. The input does not get the native `required`, so the browser's own validation bubble never covers the error.
- The helper is attached with `aria-describedby`. In error, the error replaces it (never both) and `aria-invalid="true"` is set. It is not a live region: move focus to the field when you set it.
- Icons, adornments and the success check are `aria-hidden`; say what a unit means in the label or helper. The count is attached with `aria-describedby` and is not announced as you type.
- Error and success are stated in words, not only by colour.
- Focus is a border swap, not a ring.
- No live region.

## Motion
- None. The border and padding change at once, so there is nothing to remove under `prefers-reduced-motion`.

## Example

```tsx
import { InputField } from '@collabrium/ui';

<InputField label="Workspace name" placeholder="e.g. Astro Growth" helper="Visible to your whole team" />
<InputField label="Workspace name" defaultValue="Astro" error="This workspace name is already taken" />
<InputField label="Monthly budget" prefix="$" placeholder="0.00" helper="In USD" />
```

## Replaces
- `.c-field` with `label`, `input`, `.required-mark`, `.c-helper`, `.c-field-error`, `.c-field-success`
- `.input-wrap` with `.icon-leading`, `.icon-trailing`, `.adornment`, `.has-leading-icon`, `.has-trailing-icon`, `.has-prefix`, `.has-suffix`
- `.counter-row` and `.char-counter`
(`.icon-btn`, `.password-field` and `.c-field textarea` belong to Password field, Textarea and Search input.)
