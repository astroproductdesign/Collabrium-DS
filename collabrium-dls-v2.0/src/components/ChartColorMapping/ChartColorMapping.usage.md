# Chart color mapping

## Purpose
Which colour a chart's data takes, by role. A guideline, not a rendered
component: it is given as functions in `@collabrium/ui/charts`
(`src/charts/ChartColorMapping/`), which every chart in both sets already
follows. Call them when you colour data yourself.

⚠️ Designed from scratch in the DLS (no source in the brand deck or a
teammate's build).

## Use when
- You pick series colours, a heatmap scale or a variance scale by hand.
- You draw a chart outside this library and need its chrome colours.

## Don't use when
- A chart in `@collabrium/ui/charts` or `charts-extra` already colours its
  series: leave `color` unset and it walks this order.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `categoricalColors(n)` | `(n) => { color, dashed }[]` | — | Series colour names in order; `dashed` from the 8th. |
| `sequentialColors(element, n)` | `'orange' \| 'salmonPink' \| 'green' \| 'navy' \| 'amber'`, `n` | — | `n` steps of the element's ramp, lightest first. |
| `divergingColor(value, extent, midpoint?)` | numbers | midpoint 0 | Red below, Neutral-3 at the midpoint, Green above. |
| `divergingColors(n)` | `n` | — | `n` even steps, Red to Green. |
| `chartChrome` | `{ grid, text }` | — | Neutral-3 gridlines, Neutral-5 text. |

## Rules
1. **Categorical, up to 5:** walk the department table in order: Fire/Orange,
   Wood/Salmon Pink, Earth/Green, Water/Navy, Gold/Amber, full strength.
2. **6 and 7:** then the reserve accents, Purple and Turquoise.
3. **Past 7:** no new colour. The 8th series on repeats the order, dashed
   (`categoricalColors` sets `dashed`): one dash pattern, no dot, as the DS
   assigns none (decided 2026-11-12). A dashed series' legend marker is a
   short dashed line, not a circle, so it can be told from its solid twin
   (decided 2026-11-12).
4. **Sequential:** one element's ramp, `-bg` tint (lightest) to full colour
   (darkest), through its `-bg-strong` and pastel tokens. One hue only. The
   docs page draws ramps as the steps a chart gets, not a gradient (decided
   2026-11-12).
5. **Diverging:** Green (above) ↔ Neutral-3 (midpoint) ↔ Red (below), the
   Badge success and danger pair. One pair only.
6. **Chrome:** Neutral-3 gridlines, Neutral-5 axis labels, ticks and legend
   text in caption or footnote type. Never Neutral-9.
7. **Area fills:** a 12% wash of the line's colour, never full strength
   (Chart chrome & marks; the DS's `-bg` tint (8%) here is dropped so the two
   sections agree, decided 2026-11-12).
8. A legend never brings in a colour that isn't a token.

## Accessibility
- Colour never identifies a series alone: the legend, tooltip and table view
  name every series.
- ⚠️ Recorded trade-offs (the DS's): a sequential ramp can't clear 3:1 at
  every step (Navy 2.41:1 on Water pastel); past seven series, the dash is
  the only difference between two lines.

## Motion
None.

## Example

```ts
import { categoricalColors, sequentialColors, divergingColor } from '@collabrium/ui/charts';

const looks = categoricalColors(regions.length);
<LineChart series={regions.map((r, i) => ({ key: r.key, name: r.name, ...looks[i] }))} … />

sequentialColors('navy', 5);  // Water: --color-water-bg … --color-navy
divergingColor(-12, 40);      // Neutral-3 toward Red
```

## Replaces
- `.c-chartmap-row`, `.c-chartmap-label`, `.c-chartmap-swatch`,
  `.c-chartmap-ramp` (the gallery's swatches; on the docs page only, as
  `.docs-chartmap-*`)
