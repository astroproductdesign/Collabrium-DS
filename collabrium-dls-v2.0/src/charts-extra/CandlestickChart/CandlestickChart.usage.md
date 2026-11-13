# Candlestick chart (Charts (extra))

## Purpose

Four values per period (open, high, low, close) as a body with a line to the extremes, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- Price or any measure with an opening, closing, highest and lowest value per period.

## Don't use when

- One value per period: use Line chart.
- A range with no open or close: use Range chart.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `openKey` | `string` | — | The key of each period's opening value. |
| `highKey` | `string` | — | The key of each period's highest value. |
| `lowKey` | `string` | — | The key of each period's lowest value. |
| `closeKey` | `string` | — | The key of each period's closing value. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `data` | `Record<string, string | number>[]` | — | One object per category. Required. |
| `categoryKey` | `string` | — | The key of the category in each row. Required. |

## Rules

1. A period that closed higher is a solid Green body; one that closed lower is a hollow Red body with a Neutral-1 fill. Direction never rests on colour alone, and the tooltip says up or down.
2. A 2px line runs from the low to the high; the body is at most 24px wide with a 4px radius.
3. The value axis fits the data: a price chart does not start at zero.
4. A fixed key under the chart names the two colours; there is no legend toggle.
5. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches).
6. There is no dark theme: the DLS has none for charts.
7. The card, its title and its other controls belong to the host. The chart has none of its own.
8. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
9. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; the SVG is named by the same text and can be read with the arrow keys.
- The table view carries every value, so the picture, colour and hovering are never required.
- Nothing is told apart by colour alone: the legend, tooltip and table name each series, wedge or direction.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { CandlestickChart } from '@collabrium/ui/charts-extra';

// see CandlestickChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedCandlestickChart` (white solid and hollow bodies become Green and Red solid and hollow; its drawing in CSS becomes a Recharts chart with axes).
