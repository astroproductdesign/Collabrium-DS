# Slider

## Purpose
Drag to pick one value, or a range, along a continuous scale: a budget, a
price band, a share. Native range inputs over a drawn track and fill, with
a value tooltip above the moving thumb. Optional min and max labels under
the ends, or a static value above the end in place of the tooltip.

⚠️ Designed from scratch in the DLS (no source in the brand deck or the teammate's build): a first pass needing design review.

## Use when
- A value on a continuous scale where the rough position matters more than an exact figure.
- A band between two values (`variant="range"`).

## Don't use when
- **Fewer than about 10 values are valid.** Use Radio or a Dropdown.
- **People need an exact figure.** Use Input field, or Quantity selector for whole-number counts.
- **Showing progress, not setting it.** Use Progress Bar.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | ReactNode | **required** | The visible label above the slider. |
| `variant` | `'single'` \| `'range'` | `'single'` | One thumb, or two with the fill between them. |
| `value`, `defaultValue` | number; `[low, high]` for range | `min`; `[min, max]` | Controlled or uncontrolled. |
| `onValueChange` | `(value) => void` | — | Every new value while dragging, clicking the track or pressing a key. |
| `min`, `max`, `step` | number | `0`, `100`, `1` | The scale. |
| `format` | `'number'` \| `'rm'` \| `'percent'` | `'number'` | How values are written in the tooltip, static value, min and max and `aria-valuetext`. |
| `formatValue` | `(value: number) => string` | — | Your own formatter; overrides `format`. |
| `showLimits` | boolean | `false` | The min and max under the track's ends. |
| `showValue` | boolean | `false` | The value at rest, right-aligned above the track's end. Replaces the tooltip. |
| `size` | `'default'` \| `'compact'` | `'default'` | Compact: 2px track, 16px thumb. |
| `disabled` | boolean | `false` | 40% throughout; no response. |
| `thumbLabels` | `[string, string]` | `['Minimum', 'Maximum']` | Range only: the thumbs' names. |
| `name` | string; `[string, string]` for range | — | Posts the value with a form. |

The ref goes to the root `<div>`. `style` and `className` are not accepted. These props replace the gallery's script and its `data-format`, `data-range-group`, `data-range-partner` attributes.

## Rules
1. **Track:** 4px (compact 2px), `radius-pill`, Neutral-3, flush with both edges of its column. **Fill:** Obsidian, from the minimum to the thumb, or between the two thumbs. Never an element colour.
2. **Thumb:** 20px (compact 16px), Neutral-1, 2px Obsidian border, `shadow-2`, centred on the track's line; `shadow-3` on hover and drag, with grab and grabbing cursors. It stops at each end of the track (a native thumb; the DS describes an overhang). The compact thumb, hover shadow, disabled thumb and reduced motion are written per browser engine, since the DS's combined rules are dropped by every browser (decided 2026-11-10).
3. **Rail:** the box the pointer hits: 24px in both sizes, **44px on touch screens** (`pointer: coarse`) so a finger can hit it; the thumb and track look the same, and the slider is 20px taller (decided 2026-11-10; the DS's reference build stops at 24px). The rail and track heights have no token and stay local (decided 2026-11-10).
4. **Label:** Input field's label, label1 (14px / 700), Neutral-9, 4px above, so every form label looks the same (decided 2026-11-10; the DS's CSS draws caption, 12px). Every slider has a visible label.
5. **Value tooltip:** Tooltip's bubble (caption 500, Neutral-7, white text, `radius-sm`, 6px 12px padding, Tooltip's sides; decided 2026-11-10), 8px above the rail, **centred on the thumb** (decided 2026-11-10; the gallery's script can sit 10px off near the ends). It shows on hover, keyboard focus (so keyboard users see the value; decided 2026-11-10) and drag, and fades out after `--duration-base`. A range shows each thumb's own. Never turn it off on a range.
6. **Give the tooltip room:** it rises 12px above the slider's top and, near the ends, up to 40px past its sides. A plain Card's 16px padding is enough at the top; in a list card or a scroll area that clips, leave space around the slider. Near the start it covers the label while it shows (as in the gallery).
7. **Static value** (`showValue`): caption, Neutral-9, right-aligned above the track's end; only when the value must stay visible at rest. It replaces the tooltip.
8. **Min and max** (`showLimits`): caption, Neutral-5, at each end, 4px under the rail.
9. **One format everywhere:** the tooltip, static value, min and max and `aria-valuetext` are written the same way. Ringgit is "RM 100,000" (a space after RM, comma thousands); add a unit when it isn't obvious.
10. **Range:** the thumbs may touch but never cross: the moved thumb's value stops at its partner's. The last thumb moved sits on top. A click on the bare track moves the nearer thumb there; when they touch, the click's side decides.
11. **Disabled:** 40% opacity throughout (Button ghost's, not the toggles' 50%), Neutral-3 fill, Neutral-4 thumb border, no shadow, not-allowed.
12. **Full width** of its parent or column, never an inline width.
13. **No error state:** a slider can't hold an invalid value (decided 2026-11-10).

## Accessibility
- Native `<input type="range">`: the browser reports the slider role, minimum, maximum and value. Arrow keys step, Page Up and Page Down jump, Home and End go to the ends.
- The formatted value is read as `aria-valuetext` ("RM 40,000"), as the DS requires (decided 2026-11-10; the gallery sets none).
- A range is a group named by the label; its thumbs are "Minimum" and "Maximum" (decided 2026-11-10). Tab moves between them. Each thumb reports the scale's own min and max: its value already stops at its partner (decided 2026-11-10; the DS asked for the partner's value as the limit).
- The tooltip is hidden from screen readers, since the value is already read.
- The fill never relies on Obsidian alone: the white thumb with its border marks the position.
- Forced colours: the track is GrayText, the fill Highlight, the thumb Canvas with a CanvasText border.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Thumb and fill while dragging | None: they follow the pointer at once | — |
| Thumb hover and drag | `shadow-2` to `shadow-3` | `--duration-fast` · `--ease-standard` |
| Tooltip in | Fades in | `--duration-fast` · `--ease-standard` |
| Tooltip out | Waits, then fades out | `--duration-base` delay, then `--duration-fast` |
| Reduced motion | The tooltip and shadow change at once | — |

## Example

```tsx
import { Slider } from '@collabrium/ui';

<Slider
  label="Campaign budget"
  min={0}
  max={100000}
  step={1000}
  value={budget}
  onValueChange={setBudget}
  format="rm"
  showLimits
/>
```

## Replaces
- `.c-slider-group`, `.c-slider-label`, `.c-slider-rail` (`.c-slider-range`), `.c-slider-track`, `.c-slider-fill`, `.c-slider-input`, `.c-slider-tooltip` (`.is-visible`, `.is-hiding`), `.c-slider-minmax`, `.c-slider-static-value`, `.c-slider-compact`, `.c-slider-disabled`
- The gallery's slider script (`sliderFormatValue`, the fill and tooltip updates, Range's clamp and track click)
