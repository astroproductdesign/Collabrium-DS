# Progress-to-Goal Bar

## Purpose
A horizontal stacked bar of contributions toward a named target. Category
segments stack from the left, a line marks the target at 75% of the track,
the space past it is headroom, and when the total falls short a dashed Red
outline marks the gap. The DLS's "Budget / gap breakdown" chart, built in
HTML and CSS. Card, Chart and In-table variants.

⚠️ Designed from scratch in the DLS: treat it as a first pass needing design review.

## Use when
- There is a named target the reader should see against the total, and how much is missing.
- A table needs one rail per row against each row's own target (`variant="table"`).

## Don't use when
- **There is no named target.** Use Progress Bar (not converted yet).
- **The breakdown is the point and the bar is Small.** Use Medium or Large, which have a legend.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `target` | number | **required** | The named target, at 75% of the track. |
| `value` | number | — | One value toward the target, in Obsidian. Use this or `categories`. |
| `categories` | `{ label, value, color? }[]` | — | A breakdown, stacked in order, coloured by the department walk. Empty: an empty track and "No data yet." |
| `variant` | `'card'` \| `'chart'` \| `'table'` | `'card'` | Its own container; the chart area only; an 8px rail for a table cell. |
| `size` | `'small'` \| `'medium'` \| `'large'` | `'medium'` | The bar only (Card and Chart). |
| `title` | text | — | The Card variant's heading. |
| `headingLevel` | `2`–`6` | `3` | The heading's level. The look is always h5. |
| `showTarget` | boolean | `true` | The Card variant's figures top-right. |
| `labels` | `'legend'` \| `'row'` \| `'none'` | `'legend'`; `'row'` at small; `'none'` in a table | What names the values under the bar. |
| `rowShowsGap` | boolean | `true` | Whether the label row names the Gap while short. `false` for a Total and Target row only (Pacing card). |
| `compact` | boolean | true at small and in a table | Short numbers from 1M up. |
| `currency` | text | `'RM'` | The unit before every value; `''` for a plain count. Money always shows 2 decimals. |
| `footer` | text | — | One footnote line under a rule (Card variant). |
| `summary` | text | "{total} of {target} target, {n}%." | The chart's spoken summary. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<div>`. `formatGoalValue(value, { currency, compact })` is exported.

## Rules
1. **The target sits at 75% of the track.** The track is `target ÷ 0.75`; the last 25% is headroom, so a bar at target doesn't look out of room.
2. **Short of target:** the gap is outlined (2px dashed Red, top, bottom and right) from the total to the target, and Neutral-3 headroom runs from the target to the end.
3. **At or over target:** no gap and no headroom; segments run past the line. Past the end of the track the scale re-bases on the total, the one case the line moves off 75%.
4. **Colours walk the departments:** Orange, Salmon Pink, Green, Navy, Amber, then Purple and Turquoise, then Neutral-4. One value is Obsidian. A category may set its own.
5. **Size changes the bar, never the text.** Bar 16/32/40px, radius 6/8/10px, overhang 5/7/9px; head gap 16/24/24px.
6. **Small:** a label row instead of the legend, short numbers from 1M up, no gap outline and no target tag. With several categories the row shows Total, not each one.
7. **Target is named once:** by the tag under the line with a legend, by the row's Target item, or by the value above the rail in a table. Never in the legend.
8. **The tag stays centred on the line** and slides just far enough inward when it would cross the edge, re-checked on resize.
9. **The label row wraps rather than overflows,** and Gap is the item that gives way, only when dropping it puts the row on one line.
10. **No categories:** an empty track up to the target, headroom past it, no gap, no legend, and the footer (or "No data yet.") says there is no data.
11. **No description inside the bar.** The reason for the target belongs to the surface around it.
12. **Short form:** "RM10.2M" (no space, one decimal, ".0" dropped, B from a billion), from 1M up, at Small and in a table; otherwise the full value. (Decided 2026-11-04.)
13. **Money always shows 2 decimal places:** "RM 6,000.00", "/ 10,000.00", "Target RM 10,000.00". Real figures are rarely round. A plain count (`currency=""`) shows as given. (Decided 2026-11-04.)
14. **The heading is h5 at 700**, as the CSS and the DS's Typography table; the DS anatomy's 800 is owed a correction. (Decided 2026-11-04.)
15. **The In-table label is the target's value**, above the rail at the target line. (Decided 2026-11-04.)
16. **The label row includes Gap** whenever the total is short, and drops it only by rule 9. (Decided 2026-11-04.)
17. **No data reads "No data yet."** when there is no footer. (Decided 2026-11-04.)
18. **`labels` (legend, row, none) replaces the DS's `showLegend`,** so the In-table rail can carry a row; `compact` stays. The component is `GoalBar`. (Decided 2026-11-04.)
19. **In forced colours** the segments, swatches and target line keep their colours and the track takes a 1px outline. The DS's one-off sizes stay local values. (Decided 2026-11-04.)

## Accessibility
- The chart area is `role="img"` with a summary label ("RM 6,000.00 of RM 10,000.00 target, 60%."); override with `summary`.
- The legend pairs each colour with its label and value; the gap is dashed as well as Red.
- Read-only: no focus, no interaction.
- In forced colours the segments, swatches and target line keep their colours and the track takes an outline.

## Motion

None: the bar draws at its values.

## Example

```tsx
import { GoalBar } from '@collabrium/ui';

<GoalBar
  title="Progress to Goal"
  target={10000}
  categories={[
    { label: 'Category A', value: 2000 },
    { label: 'Category B', value: 4000 },
  ]}
  footer="Bar extends past target to show headroom."
/>

<td><GoalBar variant="table" target={10_200_000} value={6_600_000} /></td>
```

## Replaces
- `.c-goal-bar`, `.size-small`, `.size-default`, `.size-large`, `.variant-chart`, `.variant-table`
- `.c-goal-bar-head`, `-title`, `-target`, `-target-value` (`.of`), `-target-pct`
- `.c-goal-bar-chart`, `-barwrap`, `-track`, `-segment`, `-headroom`, `-gap`, `-target-line`, `-tagrow`, `-target-tag`, `-tablelabel`
- `.c-goal-bar-legend`, `-legend-item`, `-legend-swatch` (`.is-gap`), `-labels`, `-divider`, `-footer`
