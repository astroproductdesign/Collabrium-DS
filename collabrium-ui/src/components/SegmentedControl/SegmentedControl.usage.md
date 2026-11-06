# Segmented Control

## Purpose
Switches between 2 to 5 views of the same content (List / Grid / Board, MTD /
QTD / YTD). A Neutral-2 track of equal-width segments; the selected one sits
on a white pill that slides to it. The choice takes effect at once, with no
save step.

⚠️ Designed from scratch in the DLS: treat it as a first pass needing design review.

## Use when
- One section can be shown several ways and the person picks how, inline: in a section header, a card header or a toolbar.

## Don't use when
- **Switching shows different content.** Use Tabs.
- **There are more than 5 options.** Use Tabs or a Select.
- **The choice is part of a form, saved later.** Use Radio.
- **It is page navigation.** Use SidebarNav.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `options` | `{ value, label, disabled? }[]` or `{ value, label, icon, disabled? }[]` | **required** | 2 to 5, all text or all icons. An icon option's `label` names it and fills its tooltip. |
| `aria-label` | text | **required** | Names the control ("View mode"). |
| `value` | an option value | — | The selection, when you control it. |
| `defaultValue` | an option value | the first enabled | The selection on first render when you don't. |
| `onValueChange` | `(value) => void` | — | Called with the new selection. |
| `size` | `'default'` \| `'compact'` | `'default'` | Compact for toolbars and tight rows. |
| `disabled` | boolean | `false` | The whole control at 40%. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the track. `style` and `className` are not accepted. |

The `ref` is forwarded to the track.

## Rules
1. **2 to 5 options, all text or all icons, never mixed.** If one option has no clear icon, use text for all of them. The types won't accept a mix.
2. **Text labels:** caption, uppercase, 500 (700 when selected), 6 characters at most. Rewrite a longer label; the component doesn't truncate.
3. **Icons:** Phosphor, Regular, 20px (14px compact), with the library's Tooltip naming the option on hover and keyboard focus. It renders above the page, so nothing clips it, and flips below when there's no room above. (Decided 2026-11-06.)
4. **Segments share the width equally.** The track's width comes from where it sits; it hugs its content by default and is never full page width.
5. **Selected:** the white pill with `shadow-1` behind it, Neutral-9 text. It slides and resizes to the new segment on `--duration-fast`; it is placed without sliding on first render, and jumps under reduced motion. Never an element colour.
6. **Pressed** (unselected): Neutral-3. **Focus:** the 2px Obsidian ring. **Disabled option:** Neutral-4 at 40%. **Disabled control:** everything at 40%.
7. **Placement:** inline, usually right-aligned in its section or card header.

## Accessibility
- A `radiogroup` named by `aria-label`; each segment a `radio` with `aria-checked`. Icon segments are named by their label.
- Only the selected segment is a Tab stop. ← and → move focus between enabled segments (wrapping), Home and End to the ends; Space or Enter selects the focused one.
- An icon segment's tooltip is a label tooltip: its text is the segment's name, and the bubble itself is hidden from screen readers. (Decided 2026-11-06.)

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Select | The pill slides and resizes to the new segment; the text swaps at once | `--duration-fast` · `--ease-standard` |
| First render | The pill is placed without sliding | — |
| Tooltip | Fades in on hover or focus | `--duration-fast` · `--ease-standard` |
| Reduced motion | The pill jumps | — |

## Example

```tsx
import { SegmentedControl } from '@collabrium/ui';
import { Kanban, List, SquaresFour } from '@phosphor-icons/react';

<SegmentedControl aria-label="View mode" size="compact" options={[
  { value: 'list', label: 'List view', icon: List },
  { value: 'grid', label: 'Grid view', icon: SquaresFour },
  { value: 'board', label: 'Board view', icon: Kanban },
]} />
```

## Replaces
- `.c-segctl` (`.c-segctl-default`, `.c-segctl-compact`, `.c-segctl-disabled`, `.has-pill`)
- `.c-seg-pill`, `.c-seg` (`[aria-checked]`, `:disabled`), `.c-seg i`
- `.c-seg-tt-wrap`, `.c-seg-tt-bubble` (by the library's Tooltip)
