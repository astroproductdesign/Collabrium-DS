# Pacing card

## Purpose
One metric's progress against a target it is racing a deadline to hit: a
channel's booked spend against a monthly budget, a flight's delivered
impressions against its goal. Five bands: the label, a headline figure, a
Progress-to-Goal Bar rail named Total and Target, a status Badge, and a
required footer with the time boundary and the rate needed. A variant of
Card: an arrangement of Card, GoalBar and Badge, with nothing redrawn.

## Use when
- The data has **all three**: a target known in advance, an accumulating actual, and a time boundary (a month, a quarter, a flight).

## Don't use when
- **There is no target, or no time boundary.** Use a Stat / KPI card (not converted yet).
- **You compare categories with each other.** Use a bar chart.
- **The metric has a real trend over time.** Use a line chart.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | text | **required** | The thing being paced ("TV"). |
| `headingLevel` | `2`–`6` | `3` | The label's heading level. The look is always h4. |
| `kpi` | number | **required** | The headline figure, short form from 1M ("RM11.4M"). |
| `kpiQualifier` | text | — | What the figure is ("forecast"). |
| `value` | number | **required** | The accumulating actual: the rail's Total. |
| `target` | number | **required** | The target: the rail's Target. |
| `day`, `days` | number, number | **required** | "Day 18 of 31". |
| `metOnDay` | number | — | The day the target was met. |
| `currency` | text | `'RM'` | The unit before every value. |
| `badge` | `'status'` \| `'neutral'` | `'status'` | Red below 100%, Green at or above; or Neutral early in a period. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the card's `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the card's `<div>`. `formatPacingRate(amount)` and
`pacingPercent(value, target)` are exported.

## Rules
1. **All three conditions or none:** target, actual, time boundary. The footer's rate can't be worked out without them.
2. **The label is h4 (20px/800)**, larger than Card's h5 title, on purpose: in a grid of channels, finding yours comes first.
3. **The rail is the In-table Progress-to-Goal Bar**, with no band above it, and both figures named: Total flush left, Target flush right. Never an unlabelled pair of numbers; no Gap item.
4. **The badge prints percent of target, to 1 decimal place** ("64.7% to target", "116.7% to target", "100.0%"): Red below 100%, Green at or above. Its colour comes from the number it prints, so they never disagree; it never reads 100.0% while the target is unmet (99.96% shows 99.9%). (Decided 2026-11-04.)
5. **Red means "not met yet", not "wrong".** Early in a period, quiet it with `badge="neutral"`; never add a third colour.
6. **The footer is required and worked out:** "Day 18 of 31 · RM277k a day to reach target", the rate being (target − total) ÷ days left. Once met: "· target met on day 15" (or "· target met" with no day given). On the last day, unmet: "Day 31 of 31 · RM3.6M short of target". The rate is conditional; the time boundary never is. (Decided 2026-11-04.)
7. **The rate and shortfall are short form, "k" below a million** ("RM277k", "RM3.6M"), rounded up so they never understate what is needed. (Decided 2026-11-04.)
8. **No trend row.** Real period-over-period movement belongs in a line chart.
9. **Don't rely on rail colours for a breakdown:** the rail has no legend. Use the Progress-to-Goal Bar's Card variant if the split matters.
10. **Width:** the base 240px floor in a `CardGrid`. "Total …" and "Target …" share one line down to 240px for realistic figures, and wrap rather than overflow past that.
11. **The rail's summary has no domain verb:** "RM6.6M of a RM10.2M target, 64.7% to target." (not "booked"). (Decided 2026-11-04.)
12. **The rail is computed and its row follows Progress-to-Goal Bar's** (no space before each value); the headline figure is short form from 1M, the full amount to 2 decimals below it. (Decided 2026-11-04.)
13. **The label is a real heading drawn at h4 (20px/800)**, as the DS, though the old CSS lets `.c-card h5` draw it at 16px. (Decided 2026-11-04.)

## Accessibility
- The label is a real heading (`headingLevel`).
- The rail is `role="img"`, named "RM6.6M of a RM10.2M target, 64.7% to target."
- The badge's word and number carry the status, so colour is never the only signal.
- Read-only: nothing takes focus.

## Motion

None: the card is static.

## Example

```tsx
import { CardGrid, PacingCard } from '@collabrium/ui';

<CardGrid>
  <PacingCard label="TV" kpi={11_400_000} kpiQualifier="forecast" value={6_600_000} target={10_200_000} day={18} days={31} />
  <PacingCard label="Out of home" kpi={5_600_000} kpiQualifier="forecast" value={4_900_000} target={4_200_000} day={18} days={31} metOnDay={15} />
</CardGrid>
```

## Replaces
- `.c-card-pacing`, `.c-card-pacing-label`, `.c-card-pacing-kpi` (`.value`, `.qualifier`), `.c-card-pacing-status`
- `.c-card-pacing .c-goal-bar.variant-table .c-goal-bar-chart`, `.c-card-pacing .c-goal-bar-labels`, `.c-card-pacing .c-card-footer`
