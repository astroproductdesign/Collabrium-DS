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
- **Each option needs a sentence or a live figure to explain it.** That is Radio card, this component's large variant (below).
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
3. **The circle is an outline that never fills solid.** Chosen is an Obsidian border and an 8px Obsidian dot (`--spacing-8`; decided 2026-11-06) on the Neutral-1 fill. Never mix Radio and Checkbox in one group: outline against filled box is how people tell single from multiple choice.
4. **The label is the option itself**, in body1, weight 500: "Weekly digest".
5. **Spacing between radios** comes from the group (12px), or from the layout around a standalone radio, never from the radio.
6. **Start with nothing chosen, or a real default.** Don't pre-select to speed the person along.
7. **The circle reacts to hover and press.** An empty circle fills Neutral-2 then Neutral-3; a chosen circle's border and dot go from Obsidian to Neutral-8 then Neutral-7: the same ladder as Checkbox and Button. The whole row is the target. A disabled row does not react.
8. **A required group is a marker plus the native attribute.** `required` on the group puts a Red `*` after the legend (visual only) and the native `required` on every radio.
9. **An error says what to do, in words, and replaces the helper.** Bold text in `--color-red` (3.2:1; red text stays the full red), a 1px Red border on every enabled, unselected circle, `aria-invalid` on each enabled radio. Set it when a required group is submitted empty, move focus to the first radio, and clear it on the first selection. Never show helper and error together.
10. **Radio card is this component's large variant**, documented below and on the same docs page (decided 2026-11-06).

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

## Radio card

### Purpose
A group of large cards where **the whole card is one radio option**, for
choosing one of two or three paths that each need a sentence, or a live
figure, to explain. Each card carries Radio's circle and a title, a
description, and a meta line pinned to the bottom ("3 selected · 3.3M").
A variant of Radio: real native radios in a `fieldset` with a `legend`,
submitted later with the form, on Card's surface.

### Use when
- One of 2–3 paths, each needing a description or a live figure, committed later.

### Don't use when
- **The labels explain themselves (up to 4–5 options).** Use Radio.
- **Switching a view immediately, never in a form.** Use Segmented Control.
- **Picking several cards for a bulk action.** Use Card's Selectable card.

### Props

`RadioCardGroup`

| Name | Options | Default | Description |
|---|---|---|---|
| `legend` | ReactNode | **required** | The group's question. |
| `hideLegend` | boolean | `false` | Hides the legend visually; still read out. A group always has a legend (decided 2026-11-06). |
| `description` | ReactNode | — | Helper line under the legend. |
| `error` | ReactNode | — | Replaces the helper; every enabled, unselected card turns Red and its radio `aria-invalid`. |
| `required` | boolean | `false` | Red `*` after the legend; native `required` on every radio. |
| `disabled` | boolean | `false` | Disables every card. |
| `name` | string | generated | The shared native `name`. |
| `value`, `defaultValue`, `onValueChange` | string | — | The chosen card. |
| `columns` | `2` \| `3` | `2` | Two side by side at a 496px group, or three at 752px; one column below. |

`RadioCard` (also takes native input props; the ref goes to the radio)

| Name | Options | Default | Description |
|---|---|---|---|
| `value` | string | **required** | What the card submits. |
| `title` | ReactNode | **required** | The option's name (h5); the radio's accessible name. |
| `description` | ReactNode | — | One or two sentences (caption, Neutral-5). |
| `meta` | ReactNode | — | A live figure, pinned to the bottom (caption bold, tabular); on a disabled card, the reason. |
| `badge` | ReactNode | — | A neutral Badge beside the title. At most one per group. |
| `disabled` | boolean | `false` | Can't be chosen. |

`style` and `className` are not accepted.

### Rules
1. **The card is Card's surface, unchanged**: Neutral-1, 1px Neutral-3, `radius-lg`, `shadow-1`, 16px padding, 8px gap, the 240px floor. The whole card is the `<label>` and the touch target.
2. **Head:** Radio's 18px circle beside the h5 title, 8px apart, **centred on the title's 20px line** (1px from the top, worked out from `--text-h5-lh` and `--choice-size`; the DLS's 2px left it 1px low, as it noted itself; decided 2026-11-06). The title and badge share a wrapping column, so a badge that doesn't fit drops under the title, not under the circle. The empty circle keeps Radio's Neutral-3 border: the whole card, its border and title are the target (decided 2026-11-06).
3. **Description and meta are indented to the title's left edge** (the circle's 18px plus 8px), so title, description and meta share one edge and the circle hangs alone. The meta is caption bold, Neutral-9, tabular figures, pinned to the bottom so meta lines align across a row.
4. **Grid:** 12px under the legend, 16px gap. One column, then **straight to 2** at a 496px group; `columns={3}` goes **straight to 3** at 752px, so there is never a 2 + 1 orphan. Rows are equal height. (496 and 752 are literals: a container query can't read a token.)
5. **Hover:** `shadow-2`, pointer devices only. One hover signal per card: Radio's own circle hover isn't used inside a card (decided 2026-11-06).
6. **Selected:** Card Selected's 2px Obsidian border with the padding 1px smaller (the card never changes size) and `shadow-3`; the circle's border turns Obsidian and its dot shows. The shadow and border colour ease on `duration-base` / `ease-settle`.
7. **Focus-visible:** the Water ring (`shadow-focus`) on the **whole card**, never the circle, over its current elevation (a focused card still lifts on hover; a chosen one keeps `shadow-3`).
8. **Disabled:** circle, title and description at 50%, `cursor: not-allowed`, no lift. The meta gives the reason at full strength. The arrow keys skip it.
9. **Group error:** when a required group is submitted empty, `error` replaces the helper (caption, bold, Red), every **enabled, unselected** card takes a 1px Red border and its radio `aria-invalid`, and the page moves focus to the first enabled radio. Clear `error` on the first selection.
10. **Reduced motion:** no transition. **Forced colours:** the selected border is Highlight, focus a 2px CanvasText outline, a disabled card's border GrayText.
11. **2 or 3 cards with the same parts**; pre-select only a real default; no buttons or links inside a card.

### Accessibility
- Real native radios sharing one `name` in a `fieldset` with a `legend`: Tab enters the group once; the arrow keys move and choose; Space chooses when nothing is chosen. Clicking anywhere on a card chooses it.
- The radio's accessible name is the title (`aria-labelledby`); the description, badge, meta and the group's error describe it (`aria-describedby`).
- The circle reads the radio's real `:checked` state, so it can't disagree with the form (the DLS keeps it in sync by script).
- No live region: the radios' states are the announcement; an updated meta is read on the next focus.

### Motion

| Interaction | Motion | Token |
|---|---|---|
| Hover, choose | The shadow and border colour ease, no movement; none under reduced motion | `--duration-base` · `--ease-settle` |

### Example

```tsx
import { RadioCard, RadioCardGroup } from '@collabrium/ui';

<RadioCardGroup legend="Audience" name="audience" defaultValue="mass">
  <RadioCard value="personas" title="Personas" description="Segments from the KULT playbook, built on real viewing behaviour." meta="12 personas available" />
  <RadioCard value="mass" title="Mass" description="The whole Malaysia footprint, no segmentation." meta="16,150,000" />
</RadioCardGroup>
```

### Replaces
- `fieldset.c-radio-card-group` (`.is-error`), `.c-radio-card-legend`, `.c-radio-card-required`, `.c-radio-card-error`, the group's `.c-helper`
- `.c-radio-card-grid` (`.is-3up`)
- `label.c-card.c-radio-card` (`.hover`, `.focus`) and `-head`, `-titles`, `-title`, `-badge`, `-desc`, `-meta`
- The Radio Card sync script (`window.CollabriumRadioCard.sync`)
