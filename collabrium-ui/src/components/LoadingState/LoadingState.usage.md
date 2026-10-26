# Loading State

## Purpose
A pixel-grid loader with a live status label and a real elapsed timer, for
**AI work only**: model generation, tool execution, agent runs. It is the
only component the system uses for a wait on AI before any result has
arrived. Three variants (Drive, Dots, Orbit), one shared shell. It is part
of AI Native, which has eight parts; this is the first one converted.

## Use when
- An AI operation has been running for more than 400ms and nothing has streamed back yet.
- You can name what the AI is doing ("Thinking", "Reading the export", "Drafting") and update it as the phase changes.

## Don't use when
- **It is a data fetch, upload, filter recalculation, page transition or table load.** Use the rotating spinner (sub-second, inside a control) or a skeleton (when the result has a shape). Not converted yet.
- **The AI has started emitting named steps** (two or more, and two seconds have passed). Swap to Thinking in place (not converted yet).
- **Text is already streaming.** That is Streaming Text. Remove the loader at the first token.
- **You would show a second one in the same view.** Show one, for the slowest operation.
- **You would block the page with it.** Never an overlay or a modal.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'drive'` \| `'dots'` \| `'orbit'` | **required** | `drive`: square cells, a wavefront driving right (650ms). `dots`: round cells, same wavefront. `orbit`: one comet lapping the outer ring, centre cell dim (950ms). |
| `label` | text | **required** | What the AI is doing right now. Change it as the phase changes. Announced once per change. |
| `startedAt` | number (`Date.now()`) | the moment it mounted | When the operation really started. The timer counts from here and the 400ms hold-back is measured from here. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. `role` is fixed. |

The `ref` is forwarded to the root `<div>`.

## Rules
The component owns the rules that are local to it:
1. **It appears at 400ms, never before** (Rule 2). Nothing renders until 400ms after `startedAt`; if you unmount it first, it never shows. The timer still counts from the true start, so it appears reading 0.4s.
2. **The timer shows from the first frame and is never accumulated** (Rule 5). It is computed from `startedAt` on every frame.
3. **The label is announced once, the timer never** (Rule 11).
4. **Reduced motion freezes the decoration and keeps the timer** (Rule 12).
5. **It never expands** (Rule 3): no chevron, no click target.
5a. **A label that is too long ends in an ellipsis**, on one line; the full text is the tooltip and is always in the page for screen readers. Still, keep labels short: the label says what the AI is doing right now, in a few words.

The host (your code) owns the rest:
6. **AI operations only** (Rule 1).
7. **Remove it at the first streamed token, not at completion** (Rule 6). It leaves nothing behind.
8. **One per operation, never two in a view** (Rule 7).
9. **It never blocks** (Rule 8): no overlay, no modal.
10. **It never appears without a Stop** (Rule 9). The component has no Stop of its own; the surface that hosts it must.
11. **It occupies the space the result will fill** (Rule 10): not above, beside or over it.
12. **Hand off to Thinking, never the reverse** (Rule 13).
13. **Keep the label live** (Rule 4): "Thinking" → "Reading the export" → "Comparing books" → "Drafting".

## Accessibility
- The root is `role="status"` with `aria-live="polite"`. It is always in the page, so a screen reader is already watching it when the loader appears after the 400ms hold-back and when the label changes. Only a real label change is announced.
- The grid and the timer are `aria-hidden`: the timer changes every 100ms, which is unusable in a live region.
- Not interactive: never focusable, no keyboard behaviour.
- Colour never carries meaning: the label says what is happening.
- Forced colours: the browser removes backgrounds, so the cells are painted in the system text colour (`CanvasText`) to keep the grid visible. The colour cycle is lost in this mode, by design.

## Motion
- **Drive and Dots:** each cell pulses opacity (.15 → 1 → .15) on a 650ms loop with `ease-standard`, staggered 90ms per step, so two fronts are always in flight.
- **Orbit:** the same pulse on a 950ms loop, staggered 110ms around the ring clockwise from top-left. The centre cell never animates.
- **Colour:** every active cell steps through Gold, Water, Wood, Fire, Earth pastel together on a 5s linear loop, one flat colour at a time.
- **Reduced motion:** the grid settles on a flat Gold-pastel frame at .15 opacity. The label was never animated and the timer keeps running.

## Example

```tsx
import { LoadingState } from '@collabrium/ui';

<LoadingState variant="orbit" label="Reading the export" startedAt={runStartedAt} />
```

## Replaces
- `.c-loading`, `.c-loading-grid` (`.drive`, `.dots`, `.orbit`), `.c-loading-cell` (`.is-off`), `.c-loading-label`, `.c-loading-elapsed`
- the gallery's inline timer and label scripts (`loadingStateDemo*`)
