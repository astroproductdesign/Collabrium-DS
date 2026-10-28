# Chip

## Purpose
Interactive pills for a selection or an input. **Filter chips** (`FilterChipGroup`) are predefined options that toggle on and off, in a toolbar or filter row: single-select (a radio group, one always on) or multi-select (a checkbox group, a tick when on). **Input chips** (`InputChipGroup`) are values the person entered or confirmed, shown under or inside the input they belong to, each with a × to remove it, folding into "+N" past three.

## Use when
- Filter a list or a view by a handful of predefined options (status, department, pillar).
- Show the values a person has added to a field (brands, recipients, industries).

## Don't use when
- **The element only labels a status or an owner.** Use Badge (status) or Tag (owner, not converted yet); they are read-only.
- **The choice is submitted with a form.** Use Checkbox or Radio.
- **A filter row would wrap past two lines.** Use a Dropdown with multiple select (not converted yet).
- **An option switches a view straight away and needs a segmented look.** Use Segmented Control (not converted yet).

## Props

`FilterChipGroup`

| Name | Options | Default | Description |
|---|---|---|---|
| `mode` | `'single'` \| `'multi'` | **required** | Single: one always on (radio group). Multi: independent toggles, a tick when on (checkbox group). One group is one mode. |
| `aria-label` | text | **required** | Names the group ("Status filter"). |
| `options` | `{ value, label, icon?, count?, disabled? }[]` | **required** | The chips. `label` 24 characters at most; `icon` is a Phosphor icon (a category glyph); `count` is a number ("99+" above 99, "0" shown); `disabled` keeps the chip visible but unusable. |
| `value` / `defaultValue` | text (single) or text[] (multi) | single: first enabled option; multi: none | The chosen value (single) or the values that are on (multi): controlled, or the start. |
| `onValueChange` | `(value) => void` | — | Called with the new value (single) or the new list in option order (multi). |
| `id`, `aria-*`, `data-*`, … | native | — | Passed to the group `<div>`. `style` and `className` are not accepted. |

`InputChipGroup`

| Name | Options | Default | Description |
|---|---|---|---|
| `chips` | `{ id, label }[]` | **required** | The values, in order. Write the value alone ("Marketing"). |
| `aria-label` | text | **required** | Names the list ("Selected brands"). |
| `onRemove` | `(id) => void` | — | Called when a chip is removed. Leave it out for a static list with no ×. The host drops the chip from `chips`. |
| `maxVisible` | number | `3` | Chips shown before the rest fold into "+N". |
| `disabled` | boolean | `false` | 40% opacity, not-allowed cursor, the × out of use. |
| `id`, `data-*`, … | native | — | Passed to the `<ul>`. |

## Rules
1. **Chip is always interactive.** If nothing can be pressed, use Badge or Tag.
2. **Never mix Input and Filter chips in one group**, and never mix single-select and multi-select. Their contracts differ (removable-only versus toggleable), so the two kinds are two components.
3. **Single-select always has one on.** Choosing the chip that is already on does nothing, and there is no "none" state. If "none" is a real answer, use multi-select.
4. **Multi-select shows a leading tick when on** (Checkbox's own check). The tick replaces a category icon rather than sitting beside it.
5. **Active is Obsidian with Neutral-1 text, never an accent colour.** The text change signals the state too, so colour is never the only cue.
6. **A trailing count appears on every chip in a group or on none**, as a plain number ("Sales 6", never "Sales (6)"), and updates live. Show "0", never hide it. Above 99 it reads "99+".
7. **Filter labels are 24 characters at most, and never truncated.** Rewrite a longer label. Input chip labels are user content, so they may be truncated by the host's own width.
8. **A filter with nothing behind it is shown disabled** (40% opacity, not-allowed), not removed. The full set stays visible, and it is skipped by the arrow keys.
9. **Input chips: the label is the value alone.** The owning field already says what the value is.
10. **Input chips overflow at three.** "+N" expands the rest in place; once open it becomes an underlined "Show less" link, which is not chip-shaped because collapsing is not a value. Neither is removable.
11. **Remove stops propagation**, so removing a chip never triggers whatever it sits inside. Delete or Backspace on the focused × removes it too.
12. **Single-select arrow keys move and choose.** (Decided 2026-10-27, Q-CHIP-1: Left, Up, Right and Down move and choose, with Home and End to the ends, wrapping. The DLS Chip text says arrows only move focus, but the DLS's own working radio groups choose as they move.)
13. **Chip carries no shadow at any state**, and no `box-shadow` in the transition.

## Accessibility
- **Filter, single:** a `role="radiogroup"` wrapper, each chip a `<button role="radio" aria-checked>`. One tab stop (the chosen chip); arrow keys move and choose; Home and End go to the ends; Tab leaves the group.
- **Filter, multi:** a `role="group"` wrapper, each chip a `<button role="checkbox" aria-checked>`. Tab moves between chips; Space or Enter toggles.
- **Input:** a `<ul role="list">` of `<li>` chips; each × is a `<button aria-label="Remove Marketing">`.
- The tick and the icons are decorative (`aria-hidden`); `aria-checked` carries the state.
- Focus ring: 2px Obsidian, 2px offset, on the chip (filter, +N) or the × (input).
- In forced-colours mode an active filter chip is drawn with the system Highlight colours, so on and off still differ.
- Nothing announces by itself (no live regions). Removing a chip drops its button from the page, so tell the person what happened another way if it matters (an adjacent field's own message).
- The hit target of the × is 24×24px.

## Motion
Hover, press and choose fade the fill, text and border colours over `--duration-fast` with `--ease-standard`. Nothing moves, so there is nothing to remove under reduced motion.

## Example
```tsx
import { FilterChipGroup, InputChipGroup } from '@collabrium/ui';

<FilterChipGroup
  mode="single"
  aria-label="Status filter"
  defaultValue="all"
  options={[
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active', count: 14 },
    { value: 'archived', label: 'Archived', count: 0 },
  ]}
/>

<InputChipGroup aria-label="Brands" chips={brands} onRemove={id => setBrands(brands.filter(b => b.id !== id))} />
```

## Replaces
`.c-chip-group`, `.c-chip`, `.c-chip-input`, `.c-chip-remove`, `.c-chip-overflow`, `.c-chip-showless`, `.c-chip-filter` (and its `.count`).
