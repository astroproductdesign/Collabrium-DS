# Radio

## Purpose
A real `<input type="radio">` inside its `<label>`: one choice from a short
set, shown as an outline circle with a dot that never fills solid. It has a
label and an optional description. `RadioGroup` is the fieldset that names
the question and shares one `name` between the radios.

## Use when
- The person picks exactly one option from a set of up to four or five visible options whose labels explain themselves.
- The choice is saved later, with a form or a button.

## Don't use when
- **Several options can be on at once.** Use Checkbox.
- **There are more than four or five options.** Use a select (Dropdown, not converted yet).
- **The choice applies instantly and switches a view.** Use Segmented Control (not converted yet).
- **Each option needs a sentence or a live figure to explain it.** That is Radio Card, a variant of this component built on Card (not converted yet).
- **One setting is simply on or off.** Use Switch (not converted yet) or Checkbox.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `value` | text | **required** | What the option submits. Inside a `RadioGroup` the group selects by it. |
| `label` | text | **required** unless `aria-label` is set | The visible label, written as the option itself ("Weekly digest"). |
| `description` | text | — | Optional helper line under the label. Only with `label`. |
| `aria-label` | text | **required** when there is no `label` | Names the radio when a visible label is impossible. |
| `disabled` | boolean | `false` | 50% opacity, not-allowed cursor, not focusable. |
| `checked`, `defaultChecked`, `name`, `onChange` | native | — | Only for a radio outside a group, exactly like a native radio. Inside a group the group owns them. |
| `id`, `form`, `aria-*`, `data-*`, … | native | — | Passed to the `<input>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the `<input>` element.

### RadioGroup

A `<fieldset>` with a `<legend>` for a set of radios.

| Name | Options | Default | Description |
|---|---|---|---|
| `legend` | text | **required** | The group's question ("How often should we email you?"). Names the fieldset. |
| `description` | text | — | Helper line under the legend (caption, Neutral-5). |
| `error` | text | — | Group error (bold Red), replacing the description. Every enabled, unselected radio takes the red border and `aria-invalid`. |
| `required` | boolean | `false` | A Red `*` after the legend, and the native `required` on every radio. |
| `value` / `defaultValue` | text | nothing chosen | The chosen radio's `value`: controlled, or the starting choice. |
| `onValueChange` | `(value: string) => void` | — | Called with the new value when the person picks a radio. |
| `name` | text | generated | The shared native name, also the form field name. |
| `disabled` | boolean | `false` | Disables every radio inside. |
| `children` | `Radio` elements | **required** | Stacked in a column, 12px apart. Each needs a `value`. |

The `ref` is forwarded to the `<fieldset>`.

## Rules
1. **Every radio has a name.** A visible `label`, or an `aria-label` when that is impossible. Never an unlabelled circle.
2. **Use a group.** Radios that answer one question go in a `RadioGroup`; its legend names the question for assistive tech and it gives them one `name`, so only one can be chosen.
3. **The circle is an outline that never fills solid.** Chosen is an Obsidian border and a 9px Obsidian dot on the Neutral-1 fill. Never mix Radio and Checkbox in one group: outline against filled box is how people tell single from multiple choice.
4. **The label is the option itself**, in body1, weight 500: "Weekly digest".
5. **Spacing between radios** comes from the group (12px), or from the layout around a standalone radio, never from the radio.
6. **Start with nothing chosen, or a real default.** Don't pre-select to speed the person along.
7. **The circle reacts to hover and press.** An empty circle fills Neutral-2 then Neutral-3; a chosen circle's border and dot go from Obsidian to Neutral-8 then Neutral-7: the same ladder as Checkbox and Button. The whole row is the target. A disabled row does not react.
8. **A required group is a marker plus the native attribute.** `required` on the group puts a Red `*` after the legend (visual only) and the native `required` on every radio.
9. **An error says what to do, in words, and replaces the helper.** Bold text in `--color-red` (3.2:1; red text stays the full red), a 1px Red border on every enabled, unselected circle, `aria-invalid` on each enabled radio. Set it when a required group is submitted empty, move focus to the first radio, and clear it on the first selection. Never show helper and error together.
10. **Radio Card is not part of this component yet.** It needs Card.

## Accessibility
- Renders a native radio inside a `<label>`, so the whole row is clickable, the arrow keys move and choose, and it takes part in forms.
- The native input is visually hidden but stays focusable. A 2px Obsidian focus ring (2px offset) is drawn on the circle for keyboard focus only.
- The circle and dot are `aria-hidden`; the state is read from the native input.
- The label names the input (`aria-labelledby`) and the description is attached with `aria-describedby`.
- The dot marks the chosen radio, so the state is not carried by colour alone. In forced-colours mode the dot is painted in `CanvasText`, because the browser removes its background.
- A group is a `<fieldset>` with a `<legend>`, described by its helper or error.
- An error sets `aria-invalid` on each enabled radio and becomes the group's description in place of the helper. It is not a live region: move focus to the first radio yourself.
- No live region.

## Motion
- **Circle fill and border colour, and the dot colour:** hover, pressed and choose fade on `duration-fast` (140ms), `ease-standard`.
- No movement, so nothing to remove under `prefers-reduced-motion`.

## Example

```tsx
import { Radio, RadioGroup } from '@collabrium/ui';

<RadioGroup legend="How often should we email you?" defaultValue="weekly">
  <Radio value="weekly" label="Weekly digest" description="Every Monday morning" />
  <Radio value="daily" label="Daily digest" />
  <Radio value="never" label="No emails" />
</RadioGroup>
```

## Replaces
- `label.c-choice` with `.c-radio-circle`, `.c-radio-circle.on` and `.dot`
- `.c-choice .text`, `.label`, `.desc`
- the `span.c-radio-circle` pattern used inside other components (a real input replaces it)
