# Checkbox

## Purpose
A real `<input type="checkbox">` inside its `<label>`: one on/off choice,
or one of several that can be on at the same time. It has a label, an
optional description and a partial ("indeterminate") state for a
select-all box.

## Use when
- The user picks any number of options from a set (notifications, filters, permissions).
- One setting is simply on or off and the change is saved with a button (a form field). For a setting that applies the moment it flips, use Switch (not converted yet).
- A list or table needs a "select all" box that shows when only some rows are selected (`indeterminate`).

## Don't use when
- **Only one option can be chosen.** Use Radio (not converted yet).
- **The setting takes effect instantly.** Use Switch (not converted yet).
- **It is a filter in a toolbar.** Use Chip (not converted yet).
- **It needs to look like a button.** Use Segmented Control (not converted yet).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | text | **required** unless `aria-label` is set | The visible label, written as the thing being switched on ("Email notifications"). |
| `description` | text | — | Optional helper line under the label. Only with `label`. |
| `aria-label` | text | **required** when there is no `label` | Names the box when a visible label is impossible, e.g. a table row's select box ("Select Amirah Yusof"). |
| `checked` / `defaultChecked` | boolean | unchecked | Controlled or uncontrolled, exactly like a native checkbox. |
| `onChange` | `(event) => void` | — | Called when the user toggles it. Read `event.target.checked`. |
| `indeterminate` | boolean | `false` | Partial selection: filled box with a minus. For a select-all box only. Set it from your own state and clear it in `onChange`. |
| `disabled` | boolean | `false` | 50% opacity, not-allowed cursor, not focusable. |
| `name`, `value`, `required`, `form`, `id`, `aria-*`, `data-*`, … | native | — | Passed to the `<input>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the `<input>` element.

## Rules
1. **Every checkbox has a name.** A visible `label`, or an `aria-label` when that is impossible. Never an unlabelled box.
2. **Indeterminate is for select-all only.** A normal checkbox is checked or unchecked.
3. **The label says what turns on**, not "Enable": "Email notifications", not "Enable email notifications".
4. **The 6px box radius belongs to this control only** (DESIGN-SYSTEM.md): don't reuse it elsewhere.
5. **Spacing between checkboxes** comes from the layout around them, not from the checkbox.

## Accessibility
- Renders a native checkbox inside a `<label>`, so Space toggles it, the whole row is clickable, it is in the tab order and it takes part in forms.
- The native input is visually hidden but stays focusable. A 2px Obsidian focus ring (2px offset) is drawn on the box for keyboard focus only.
- The box and its glyph are `aria-hidden`; the state is read from the native input. Indeterminate is set on the native input, so assistive tech announces "mixed".
- The label names the input (`aria-labelledby`) and the description is attached with `aria-describedby`.
- The checked box shows a check and the indeterminate box a minus, so the state is not carried by colour alone (and survives forced-colours mode).
- No live region.

## Motion
- **Box fill and border colour:** `duration-fast` (140ms), `ease-standard`.
- No movement, so nothing to remove under `prefers-reduced-motion`.

## Example

```tsx
import { Checkbox } from '@collabrium/ui';

<Checkbox label="Email notifications" description="Weekly digest every Monday" defaultChecked />
<Checkbox label="SMS alerts" />
<Checkbox aria-label="Select Amirah Yusof" />
```

## Replaces
- `label.c-choice` with `.c-checkbox-box`, `.c-checkbox-box.on` and the `ph-check` / `ph-minus` glyphs
- `.c-choice .text`, `.label`, `.desc`
- the `span.c-checkbox-box[role="checkbox"]` pattern used in cards (a real input replaces it)
