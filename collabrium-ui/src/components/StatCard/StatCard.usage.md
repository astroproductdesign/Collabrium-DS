# Stat / KPI card

## Purpose
A dashboard tile for one metric: an uppercase label, the value, and
optionally a trend against a period, an icon chip, a sparkline, a
description and a footer. **Secondary** steps the value down for a
supporting figure (where the month is, the run rate needed), with an
optional goal rail. Built on Card's surface; `StatGrid` lays a row of
them out.

⚠️ Designed from scratch in the DLS (no source in the brand deck or the teammate's build): a first pass needing design review.

## Use when
- A row of headline numbers at the top of a dashboard or report.
- A supporting figure that gives a headline its context: `variant="secondary"`.

## Don't use when
- **Two or more numbers belong together.** Use a Table row, or a summary bar.
- **The point is progress against a target.** Use Pacing card or Progress-to-Goal Bar.
- **A list of figures by name.** Use a List with values.

## Props

`StatCard`

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | ReactNode | **required** | The metric's name. |
| `value` | ReactNode | **required** | The one value, formatted. |
| `variant` | `'primary'` \| `'secondary'` | `'primary'` | Secondary: a supporting figure, the value at h4. |
| `trend` | `{ direction: 'up' \| 'down' \| 'flat', value?, period? }` | — | Primary only. Flat with no value says "No change". |
| `hero` | boolean | `false` | Primary only: the one featured tile in a row, display size. |
| `sparkline` | ReactNode | — | Primary only: a small chart under the trend (`SparklineChart`). |
| `unit` | ReactNode | — | Secondary only: a denominator or unit after the value ("of 31", "a day"). |
| `goal` | `{ value, target }` | — | Secondary only: the goal rail and its "N% of target achieved" line. |
| `icon`, `element` | Phosphor `Icon`, `CardElement` | —, `'water'` | The icon chip, top right. |
| `description` | ReactNode | — | A caption line, no divider. |
| `footer` | ReactNode | — | A caption line under a divider ("As of 9:41am"). |
| `negative` | boolean | `false` | The value is below zero. |
| `href`, `onClick` | string, `() => void` | — | The whole tile is a link or a button. |

`StatGrid`: `children` (the tiles). `style` and `className` are not accepted on either.

## Rules
1. **The tile is Card's surface** (decided 2026-11-10): Neutral-1, 1px Neutral-3, `radius-lg`, `shadow-1`, 16px padding, 8px between parts. In a `StatGrid` it is as narrow as 180px (the grid's floor), not Card's 240px.
2. **StatGrid:** as many columns as fit at 180px or wider (`auto-fit`), 16px apart. Every tile in a row is as tall as the tallest; never centre a tile's content to fill the row.
3. **Top and bottom:** the label and value stay at the top; everything after the value (trend, goal rail and its achieved line, sparkline, description, footer) sits at the bottom of the tile. The spare height opens between the value and what follows, so the last lines of a row's tiles line up, whichever kind of line they are. A tile that isn't stretched keeps the 8px gap. (Decided 2026-11-10; the DS keeps everything at the top, 8px apart.)
4. **Give every tile in a row a description, or none**, so a row of peers reads evenly and no tile has a gap at the bottom.
5. **Label:** caption, bold, eyebrow tracking, uppercase, Neutral-5. **Value:** h1 (32px / 800), Neutral-9; display (40px) for **one** hero tile per row, never two.
6. **Trend:** a Fill caret (up, down) or minus at `icon-micro` (14px; decided 2026-11-10), the change and the period, caption bold (16px line, as the description, so last lines line up), 4px apart. Green (the AA text green) up, Red down, Neutral-5 flat; the period Neutral-5 regular. Only for a genuine comparison against a stated period, never for decoration.
7. **Icon chip:** Card's chip, top right, in the colour of the element that owns the metric.
8. **Footer:** caption, Neutral-5, under a 1px Neutral-3 line, 8px above it and 12px of padding. **Description:** caption, Neutral-5, no line.
9. **Negative:** a value below zero gets a 2px Red border (the padding 1px smaller, so the tile never grows) and a Red value; the trend keeps its own colour, since it reports the direction, not the sign. Not for a number that is merely falling. Many negative tiles at once are a lot of Red: check a realistic screen.
10. **Secondary:** the value steps down to h4 (20px / 28px / 800), with an optional unit in footnote type (Neutral-5) 4px after it on the baseline; no trend. Its goal rail is the Progress-to-Goal Bar's in-table rail, with "N% of target achieved" (the percentage bold Neutral-9) 6px under it. Pair it with a primary tile; never mix sizes among peers.
11. **Interactive** (`href` or `onClick`): the whole tile opens what is behind the metric, with Card's shadow-2 on hover and the focus halo: Card's clickable-card pattern, since the DLS has no CSS for it (decided 2026-11-10).
12. **Sparkline:** a slot under the trend for `SparklineChart` (decided 2026-11-10; the DS reserves the space without CSS).
13. **The achieved percentage has one decimal** ("53.0%"), as every GoalBar and Pacing percentage (decided 2026-11-10).
14. **StatGrid stays the DS's own grid** (auto-fit at 180px); how it relates to App Shell's 4-column content grid is decided when App Shell is converted (decided 2026-11-10).

## Accessibility
- Read in order: the label, the value, then the trend.
- The trend's arrow and colour aren't spoken, so its direction is read as a word ("Up 12.4% vs last month") (decided 2026-11-10).
- The goal rail is one image named "53.0% of target achieved."; the visible line under it isn't read twice.
- Interactive: the label is a real link or button stretched over the tile, described by the value and the trend.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Hover (Interactive) | Card's shadow lift | `--duration-base` · `--ease-settle` |

## Example

```tsx
import { StatCard, StatGrid } from '@collabrium/ui';

<StatGrid>
  <StatCard label="Total spend" value="RM 48,200.00" trend={{ direction: 'up', value: '12.4%', period: 'vs last month' }} />
  <StatCard variant="secondary" label="Where the month is" value="Day 6" unit="of 31" goal={{ value: 39.75, target: 75 }} />
</StatGrid>
```

## Replaces
- `.c-stats`, `.c-stat` (`.is-negative`, `.c-stat-secondary`) and `-top`, `-label`, `-value` (`.hero`), `-trend` (`.up`, `.down`, `.flat`, `.period`), `-footer`, `-desc`, `.of`
- `.c-stat-secondary .c-goal-bar` and its achieved label
