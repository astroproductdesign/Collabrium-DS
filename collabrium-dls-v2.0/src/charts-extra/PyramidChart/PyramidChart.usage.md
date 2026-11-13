# Pyramid chart (Charts (extra))

## Purpose

Levels of a hierarchy or stages of a pipeline as centred bands whose widths are the values, drawn in HTML and CSS. Imported from `@collabrium/ui/charts-extra`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- A few levels (four to six) where each is a different size and the shape of the whole matters.

## Don't use when

- Many unrelated categories: use Bar chart.
- Stages where the share kept matters: use Funnel chart.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `data` | `Record<string, string | number>[]` | — | One object per level, top to bottom. |
| `nameKey` | `string` | — | The key of each level's name. |
| `valueKey` | `string` | — | The key of each level's value; it sets the width. |
| `color` | `'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'` | `'orange'` | The hue of the ramp; larger levels are darker. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |

## Rules

1. Widths are proportional to value: a level half the size is half as wide. (Amicro's were set by hand.)
2. Bands are 32px tall with a 4px radius, centred, on a single-hue ramp where larger is darker; text is Neutral-9 or Neutral-1, whichever contrasts more.
3. The picture's text is not reliable, so its table is always in the page for screen readers.
4. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches).
5. There is no dark theme: the DLS has none for charts.
6. The card, its title and its other controls belong to the host. The chart has none of its own.
7. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
8. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`. The picture has no reliable text of its own, so every value is also in a table that screen readers can read at all times; View as table shows it to everyone.
- The hover tooltip is for the pointer: the picture is not focusable, because the table is the keyboard and screen-reader route to every value.

## Motion

The bands do not animate; a band outlines on hover over `--duration-fast`.

## Example

```tsx
import { PyramidChart } from '@collabrium/ui/charts-extra';

// see PyramidChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedPyramidChart` (hand-set widths and white opacities become honest widths and a hue ramp).
