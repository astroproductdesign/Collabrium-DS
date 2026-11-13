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
- **Only one option can be chosen.** Use Radio.
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
| `required` | boolean | `false` | Native `required`, plus a Red `*` after the label. For a single box that must be ticked (a terms box). In a group, put `required` on the group instead. |
| `error` | text | — | Bold Red error text that replaces `description`, a 1px Red border on the empty box, and `aria-invalid`. Clear it when the box is ticked. Labelled checkboxes only. |
| `disabled` | boolean | `false` | 50% opacity, not-allowed cursor, not focusable. |
| `name`, `value`, `required`, `form`, `id`, `aria-*`, `data-*`, … | native | — | Passed to the `<input>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the `<input>` element.

### CheckboxGroup

A `<fieldset>` with a `<legend>` for a set of checkboxes.

| Name | Options | Default | Description |
|---|---|---|---|
| `legend` | text | **required** | The group's question ("Notify me by"). Names the fieldset. |
| `description` | text | — | Helper line under the legend (caption, Neutral-5). |
| `error` | text | — | Group error (bold Red), replacing the description. Every empty box takes the red border and `aria-invalid`. |
| `required` | boolean | `false` | A Red `*` after the legend. Visual only: there is no native "required" for a group; enforce it and report it with `error`. |
| `disabled` | boolean | `false` | Disables every checkbox inside. |
| `children` | `Checkbox` elements | **required** | Stacked in a column, 12px apart. |

The `ref` is forwarded to the `<fieldset>`.

## Rules
1. **Every checkbox has a name.** A visible `label`, or an `aria-label` when that is impossible. Never an unlabelled box.
2. **Indeterminate is for select-all only.** A normal checkbox is checked or unchecked.
3. **The label says what turns on**, not "Enable": "Email notifications", not "Enable email notifications".
4. **The 6px box radius belongs to this control only** (DESIGN-SYSTEM.md): don't reuse it elsewhere.
5. **Spacing between checkboxes** comes from the layout around them, not from the checkbox.
6. **The box reacts to hover and press.** An empty box fills Neutral-2 then Neutral-3; a checked box goes from Obsidian to Neutral-8 then Neutral-7, the same ladder as Button. The whole row is the target. A disabled row does not react. The check and minus are 14px (`icon-micro`).
7. **Required is a marker plus the native attribute.** A single box that must be ticked takes `required`: a Red `*` follows the label (visual only). A group takes `required` on the `CheckboxGroup` and never on each box.
8. **An error says what to do, in words, and replaces the helper.** Bold text in `--color-red` (3.2:1; red text stays the full red, decided 2026-10-26), a 1px Red border on the empty box, `aria-invalid`. Set it when a required box or group is submitted empty, move focus to the first box, and clear it on the first selection. Never show helper and error together.
9. **A group is a fieldset.** Use `CheckboxGroup` whenever checkboxes answer one question; the legend names them for assistive tech. Required, error and group are defined by this library, from Input field's rules (the DLS has none).

## Accessibility
- Renders a native checkbox inside a `<label>`, so Space toggles it, the whole row is clickable, it is in the tab order and it takes part in forms.
- The native input is visually hidden but stays focusable. A 2px Obsidian focus ring (2px offset) is drawn on the box for keyboard focus only.
- The box and its glyph are `aria-hidden`; the state is read from the native input. Indeterminate is set on the native input, so assistive tech announces "mixed".
- The label names the input (`aria-labelledby`) and the description is attached with `aria-describedby`.
- The checked box shows a check and the indeterminate box a minus, so the state is not carried by colour alone (and survives forced-colours mode).
- A required box has the native `required`; the `*` is `aria-hidden`.
- An error sets `aria-invalid` and becomes the input's description in place of the helper. It is not a live region: move focus to the first box yourself.
- A group is a `<fieldset>` with a `<legend>`, described by its helper or error.
- No live region.

## Motion
- **Box fill and border colour:** hover, pressed and check/uncheck fade on `duration-fast` (140ms), `ease-standard`.
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
