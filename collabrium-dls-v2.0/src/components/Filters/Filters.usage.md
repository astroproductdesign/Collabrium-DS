# Filters

## Purpose
A control cluster that narrows the table or list directly under it. Two rows:
the **bar** (always there: an optional search box, then the triggers) and the
**applied tray** (only while something is applied: the values as removable
chips, and Clear all). Two variants: **Default**, a named trigger per
dimension (with **Tiered exposure** past about 8 dimensions), and **Compact
filter**, one "Filter" trigger listing every dimension.

⚠️ Designed from scratch in the DLS (no source in the brand deck or the teammate's build): a first pass needing design review.

## Use when
- A table or list can be narrowed by a few known dimensions (Department, Status, Owner).

## Don't use when
- **Switching between a handful of views of the same data.** Use Tabs or Segmented control.
- **One quick toggle above a short list.** Use a Filter chip group (Chip).
- **Picking a value for a form.** Use Dropdown (Multiple select).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `dimensions` | `FilterDimension[]` | required | `{ key, label, options: { value, label }[], disabled?, selectAll? }`. `selectAll` pins a Select all row (long lists only). Default: a trigger each (the primary tier with `moreDimensions`). Compact: every dimension. |
| `variant` | `'default'` \| `'compact'` | `'default'` | Compact when space is tight (a sidebar panel, a dense toolbar), whatever the dimension count. |
| `moreDimensions` | `FilterDimension[]` | — | Default only: the secondary tier, behind "More filters". |
| `value`, `defaultValue`, `onValueChange` | `FilterValue`, `(value) => void` | —, `{}` | `{ [key]: optionValues[] }`. Changes on Done, a chip's ×, or Clear all; never on a tick. |
| `search` | boolean | `false` | The search box, first in the bar. |
| `searchValue`, `defaultSearchValue`, `onSearchChange` | string, `(text) => void` | —, `''` | The search text, on every change. Debounce before querying. |
| `searchPlaceholder`, `searchLabel` | string | `"Search…"`, `"Search"` | The placeholder and the box's accessible name. |
| `showApplied` | boolean | `true` | The applied tray. Off only when the page shows the values elsewhere: the bar then carries Clear All. |
| `align` | `'edge'` \| `'table'` | `'edge'` | `table` directly above an embedded Table in the same card: the bar and tray move 16px in, lined up with the column text. |
| `label` | string | `"Filters"` | Names the group. |
| `disabled` | boolean | `false` | Everything greyed out; counts hidden. |

`filtersToSearchParams(value, params?)` and `filtersFromSearchParams(params, dimensions)` turn a value into query
parameters and back (`?department=marketing,finance`), for the page to keep in its URL. The ref goes to the root.
`style` and `className` are not accepted. These props and helpers replace the gallery's script.

## Rules
1. **Choosing a variant.** Default unless space is the constraint, then Compact, whatever the count. Past about 8 dimensions, Tiered exposure: 4–6 primary triggers chosen once per view (never by width or usage), the rest behind "More filters". Never Compact and named triggers in one bar.
2. **Bar:** a row, 8px gaps, wrapping when it runs out of width. No outer margin: the page spaces it from the table (the DS's 16px under the bar is layout). Directly above an embedded Table in the same card, `align="table"` moves the bar and tray 16px in (the table's cell padding), so the search box starts where the column text does (decided 2026-11-10).
3. **Search** (optional, first): Search input at 32px, 240px wide; a Neutral-5 magnifying glass; × (Neutral-5, Neutral-9 on hover) only while it holds text, out of the tab order otherwise; real `:focus` swaps in a 2px Obsidian border. A 1px Neutral-3, 32px divider follows when a trigger does. Phones (640px and under): full width on its own row, no divider.
4. **Trigger:** Button Secondary's recipe at 32px as the source draws it (600 weight, no shadow): the label, the count, a 12px Neutral-5 caret, 6px apart. Hover and open Neutral-2. Only Compact's "Filter" has an icon (sliders); a named trigger never does.
5. **Applied:** the border turns Obsidian and a count pill sits inside the padding (16px, Obsidian, caption bold white). The count is derived from the applied values, never stored apart, so trigger and chips never drift. "More filters" counts its whole tier; "Filter" counts everything.
6. **Disabled:** 40% opacity, not-allowed, and the count is hidden (the DS; the source's CSS still shows it).
7. **Panel:** radius-md, 1px Neutral-3, shadow-3, 16px padding, at least 240px, never wider than the window less 24px, 8px under its trigger. Left-aligned to it; right-aligned when that would cross the window's edge (re-checked on resize and scroll); above when it doesn't fit below and there's more room above. Fixed to the window, so no card or table box clips it.
8. **Panel contents:** the dimension as a title (caption bold uppercase, Neutral-5), the options as Dropdown's Multiple select rows (Checkbox's box, body2 Neutral-9, Neutral-2 hover), at most 320px before the list scrolls, then the footer: Ghost "Clear" and Primary "Done", sm, under a 1px line.
9. **Select all** (`selectAll` on a dimension, off by default; decided 2026-11-10, the DS has none): Dropdown's pinned first row, label bold, a 1px Neutral-3 rule under it. It ticks every value, or clears them when all are ticked, and shows a minus when some are. Only for long lists, about 8 values or more, where "all but a few" is quicker; on a short list, ticking all filters nothing. Pending like any tick: it applies on Done.
10. **Nothing applies until Done.** Ticks are pending; Clear empties them and keeps the panel open; Done applies and closes; clicking away, Escape or Tab out closes and drops them.
11. **Nested list** ("Filter", "More filters"): each dimension a bold row with its applied count in Neutral-5; picking one shows its list under a Back row (arrow and the dimension, a 1px line under it). Compact's list ends with Clear all (a Link) while anything is applied, resetting every dimension.
12. **Applied tray:** 8px under the bar, Neutral-1, 1px Neutral-3, radius-sm, 12px padding. Input chips, 4px apart, labelled with the value alone ("Marketing"), in dimension order. Past 5 the rest fold into "+N", which expands in place and becomes "Show less". Then Clear all, a Link, 16px after the chips. The tray leaves the layout when the last value goes.
13. **Clear All in the bar** (Button ghost, Red text, 16px after the last trigger) shows only with `showApplied={false}` and something applied; it and the tray's Clear all never show together.
14. **The URL keeps the filters** (the DS): the page keeps the value in its query parameters with the two helpers, so a filtered view is a link; a restored view shows at once, with no entrance motion.

## Accessibility
- A group named "Filters" (`label`). The search box has a hidden "Search" label.
- A named trigger is a combobox, as Dropdown: focus stays on it; Enter, Space or ↓ opens; ↑ ↓, Home and End move; Space or Enter ticks; type to jump; Tab goes to Clear and Done; Escape closes without applying. Its name carries the count: "Department, 2 applied".
- "Filter" and "More filters" are buttons (`aria-expanded`); Tab enters their list of dimensions. Picking one moves focus to Back (the picked row has gone); Back returns it to that dimension's row. The option list takes focus (↑ ↓, Space). Select all is the list's first option; partly ticked, it is read with the count ("Select all, 3 selected").
- Done returns focus to the trigger. A chip's × (or Delete) removes it and focus moves to the next ×, the previous one, or, when the tray goes, the trigger that held it. Clear all moves it to the first trigger.
- Each chip's × is named "Remove Department: Marketing".
- Forced colours: an applied trigger's border is Highlight; the count keeps its pill; the keyboard's row is outlined.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Panel opens / closes | Fades, slides 4px | `--duration-fast` · `--ease-standard` |
| Tray appears, a chip is added, a count changes | Fades in (a chip from 95%), not on first paint | `--duration-fast` |
| A chip or the tray leaves | At once | — |
| Reduced motion | Instant | — |

## Example

```tsx
import { Filters } from '@collabrium/ui';

const [value, setValue] = useState({});

<Filters dimensions={dimensions} value={value} onValueChange={setValue} search />
```

## Replaces
- `.c-filterbar`, `.c-filter-search` (`.icon-leading`), `.c-filter-search-clear`, `.c-filter-search-divider`
- `.c-filter-trigger` (`.is-open`, `.active`, `i.leading`, `.chev`, `.count`), `.c-filter-panel` (`.is-right`, `.is-open`), `.c-filter-panel-title`
- `.c-filter-option`, `.c-filter-nested-list`, `.c-filter-nested-item`, `.c-filter-back`, `.c-filter-footer`
- `.c-filter-tray`, `.c-filter-clear-bar`; Clear all's `.c-chip-showless` use
- The gallery's filters script
