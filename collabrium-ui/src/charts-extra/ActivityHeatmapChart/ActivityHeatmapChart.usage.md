# Activity heatmap (Charts (extra))

## Purpose

One count per day as a calendar, drawn in HTML and CSS. Imported from `@collabrium/ui/charts-extra`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- A habit or workload over weeks (commits, sessions, orders): when it is busy and when it is quiet.

## Don't use when

- Fewer than about eight weeks: use Bar chart.
- Two categories that are not dates: use Heatmap.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `data` | `ActivityDay[]` | — | One entry per day: `date` (`YYYY-MM-DD`) and `count`. |
| `unit` | `string` | `'contributions'` | What is counted, in the plural. |
| `color` | `'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'` | `'green'` | The hue; busier days are darker. |
| `weekStartsOn` | `0 | 1` | `1` | The first day of each week: 1 for Monday, 0 for Sunday. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the tooltip, scale and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |

## Rules

1. One column per week and one row per weekday; month names sit over the first week of each month, and Mon, Wed and Fri are labelled.
2. Five steps: Neutral-2 for no activity, then four steps of one hue (its -bg-strong tint, its pastel, a mix of pastel and full, the full colour). The four busy steps are the quartiles of the non-zero counts.
3. Give every day, including 0.
4. On a narrow screen the grid scrolls sideways inside its box; the page never does.
5. The picture has no text of its own, so its table (a row per week) is always in the page for screen readers.
6. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches).
7. There is no dark theme: the DLS has none for charts.
8. The card, its title and its other controls belong to the host. The chart has none of its own.
9. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data. The DLS exempts Bubble from this; here it has one, because the table is how screen-reader users read the three figures.
10. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`. The picture has no reliable text of its own, so every value is also in a table that screen readers can read at all times; View as table shows it to everyone.
- The hover tooltip is for the pointer: the cells are not focusable, because the table is the keyboard and screen-reader route to every value.
- Value is never carried by colour alone: hover gives the figure, and the table has every figure.

## Motion

The grid does not animate; a cell outlines on hover over `--duration-fast`.

## Example

```tsx
import { ActivityHeatmapChart } from '@collabrium/ui/charts-extra';

// see ActivityHeatmapChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoActivityHeatmap` (its random demo data, accent colours and streak badge are not part of the chart; its opacities become a hue ramp).
