# Progress Bar

## Purpose
A horizontal, read-only bar communicating progress toward a known goal
(**determinate**, single or stacked) or an active, unmeasured process
(**indeterminate**). Not a Slider: Slider is an input the user drags; Progress
Bar displays a value the system provides. It has no thumb, no drag and no focus
of its own.

⚠️ Designed from scratch in the DLS: treat it as a first pass needing design review.

## Use when
- Task completion, upload progress, goal attainment (single).
- A breakdown: budget by department, capacity by team (stacked).
- A background task or load of unknown length (indeterminate).

## Don't use when
- **The user sets the value.** Use Slider.
- **The point is a gap to a target over categories.** Use Progress-to-Goal Bar.
- **A page or section is loading content.** Use Loading State or a skeleton.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `value` | 0–100 | — | A single determinate bar. |
| `segments` | `{ label, value, element? }[]` | — | A stacked bar. |
| `indeterminate` | `true` | — | Unknown length. No value, no label. |
| `title` | text | — | The header row's name, 40 characters at most; names the bar. |
| `aria-label` | text | — | Names the bar when there is no title. |
| `valueText` | text | `"{value}%"` | Shown and read; stacked: the header's value. |
| `labelPlacement` | `'header'` \| `'trailing'` \| `'inside'` \| `'none'` | `'header'` with a title, else `'none'` | Single bars only. |
| `size` | `'compact'` \| `'default'` \| `'large'` | `'default'` | 4, 8 or 16px. |
| `tone` | `'default'` \| `'success'` \| `'error'` \| element | `'default'` | A single bar's fill. |
| `legend` | boolean | `true` | Stacked: the legend under the bar. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. |

## Rules
1. **The default fill is Obsidian:** a committed value, no success or ownership implied.
2. **Success (Green) only when passed;** the bar never changes colour by itself at 100%. **Error** is Red, single bars only.
3. **A department colour** overrides the fill when the bar belongs to that department; never as a default.
4. **Stacked:** contiguous segments, rounded on the outer edges only. Department segments take their element's colour; general data takes Purple, then Turquoise; past that (more than 5 department or 2 general segments) Neutral-4. What's left is the Neutral-3 remainder at the right; at 100% the last segment takes the outer radius. A 0 segment isn't drawn.
5. **Labels:** none, trailing (compact spaces), header row (the common named row) or inside the fill (large only, single only, fill over 40px). A stacked bar uses the header row and the legend, never trailing or inside. An indeterminate bar has no label slot.
6. **Content:** give a unit when the number is ambiguous (`47%`, `RM 25,000`); ringgit as `RM 100,000`; a title of 40 characters at most.
7. **Never animate backward:** progress bars don't decrease.
8. **Width:** always the full width of its parent or column.
9. **Sizes:** compact for tables and card metadata; default for summaries and side panels; large for hero stats, one per section at most.
10. **The shimmer travels from -100% to 350%** of its own width, so it clears the track before looping. (Decided 2026-11-05.)
11. **General data walks Purple, then Turquoise, then Neutral-4,** in segment order; a segment with an `element` takes its department's colour. (Decided 2026-11-05.)
12. **The inside label is centred within the fill,** so the white value always sits on the fill, never on the grey track. (Decided 2026-11-05.)
13. **An Error bar's status message is the host's** `aria-live="polite"` region; the bar adds none, because the message isn't part of it. (Decided 2026-11-05.)
14. **One-off values stay local:** the 4/8/16px tracks, the inside label's 40px, the legend's 8px swatch and 2px radius, the shimmer's 40% band and 40% Neutral-5, the reduced-motion 60%. (Decided 2026-11-05.)
15. **The entrance runs once, on mount;** a server-rendered page shows the fill at 0 until its script runs. (Decided 2026-11-05.)
16. **Forced colours paint every fill and segment CanvasText,** toned ones included; the legend's swatches drop out and its text still names each segment. (Decided 2026-11-05.)
17. **Values show as given** (`"72%"`), with no forced decimal; pass `valueText` for anything else. (Decided 2026-11-05.)

## Accessibility
- Determinate: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, named by the title or `aria-label`; `aria-valuetext` from `valueText`.
- Indeterminate: `role="progressbar"` with no `aria-valuenow`.
- Stacked: `role="group"`, each segment a progressbar named "{label} — {value}%".
- The visible value and the legend are `aria-hidden`: the progressbars already read them, so they would be read twice. (Decided 2026-11-05.)
- Never colour alone: a label or `aria-valuetext` always goes with the bar. An Error bar's status message goes in an `aria-live="polite"` region on the parent (the host's).
- Forced colours: the track is outlined and every fill, segment (toned ones too) and the shimmer drawn in CanvasText; the inside label in Canvas.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Mount | Fill grows from 0 to its value | `--duration-base` · `--ease-standard` |
| Value change | Fill moves to the new value | `--duration-base` · `--ease-standard` |
| Colour change | Fill fades to the new colour | `--duration-fast` · `--ease-standard` |
| Indeterminate | Shimmer travels the track, looping | `--duration-ambient` |
| Reduced motion | Fills jump; the shimmer becomes a still Neutral-4 bar at 60% | — |

## Example

```tsx
import { ProgressBar } from '@collabrium/ui';

<ProgressBar title="Upload progress" value={72} />
<ProgressBar title="Q3 budget by department" valueText="RM 400,000 total"
  segments={[{ label: 'Water', value: 16, element: 'water' }, { label: 'Fire', value: 32, element: 'fire' }]} />
<ProgressBar title="Syncing your workspace…" indeterminate />
```

## Replaces
- `.c-progress`, `.c-progress-header`, `-title`, `-value`
- `.c-progress-track` (`.size-compact`, `.size-default`, `.size-large`, `.stacked`, `.indeterminate`)
- `.c-progress-fill` (`.tone-*`), `-fill-label`, `-trailing-wrap`, `-trailing`
- `.c-progress-stack-segment`, `-stack-remainder`, `-indeterminate-fill`, `@keyframes c-progress-shimmer`
- `.c-progress-legend` (`.is-hidden`), `-legend-item`, `-legend-swatch`
