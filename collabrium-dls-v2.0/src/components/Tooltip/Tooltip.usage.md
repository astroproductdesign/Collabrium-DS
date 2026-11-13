# Tooltip

## Purpose
A short line of supplementary, non-interactive information about a control,
shown instantly on hover or keyboard focus in a dark bubble beside the
control. It renders in a portal at the document body, so no
scrolling or clipped ancestor hides it, and it sits above modals.

## Use when
- An icon button needs its name shown on hover ("Edit brief").
- A control or a compact figure needs one more fact ("Visible to your whole team", "Sarah K. · overseen by Lina M.").

## Don't use when
- **The text is longer than 60 characters.** Use an Info Banner or inline helper text.
- **It holds a link or a button.** Nothing inside a tooltip can be clicked. Use a popover or a menu.
- **The information is essential.** Put it on the page; a tooltip is hidden until someone points at it.
- **The surface is touch-first.** A long press is hard to discover; show the text inline instead.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `content` | text | **required** | The tooltip text, 60 characters at most. |
| `children` | one focusable element | **required** | The trigger: a Button, a link or an element with `tabIndex={0}`. It gets `aria-describedby` (or `aria-label`) added. |
| `placement` | `'top'` \| `'bottom'` \| `'left'` \| `'right'` | `'top'` | The side the bubble prefers. It flips to the opposite side when there isn't room, then shifts along it, and falls back to bottom. |
| `role` | `'description'` \| `'label'` | `'description'` | `label` when the tooltip text is the trigger's only name (an icon button): it becomes the trigger's `aria-label`. |
| `id`, `aria-*`, `data-*`, event handlers | native | — | Passed to the wrapping `<span>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the wrapping `<span>`.

## Rules
1. **Supplementary only, never interactive.** The bubble ignores the pointer (`pointer-events: none`).
2. **60 characters at most.** Rewrite, or use an Info Banner; the tooltip never truncates.
3. **Instant both ways.** It shows on hover or focus and hides on leave or blur with no delay; only the 140ms fade runs.
4. **One at a time.** Showing a tooltip hides any other.
5. **It hides on Escape, page scroll, or a tap elsewhere.** While the trigger holds keyboard focus, a scroll moves the bubble with the trigger instead, so tabbing to a control below the fold (which scrolls it into view) still shows its tooltip; a hover or touch tooltip still hides. (Decided 2026-11-04.)
6. **Placement:** top by default, 8px from the trigger, centred on it. If it doesn't fit, it flips to the opposite side; then it shifts along that side to stay 8px inside the viewport; bottom is the last resort. The DS's bottom, left and right placements are built, as a `placement` prop. (Decided 2026-11-04.)
7. **One line up to 240px, then it wraps**, growing taller, never wider, as the DS says; the old CSS never wrapped, so a 60-character tooltip ran past 300px. (Decided 2026-11-04.)
8. **Bubble:** Neutral-7 fill, Neutral-1 text, caption at 500, 6px / 12px padding, `radius-sm`. The 240px width is a local value (no token). (Decided 2026-11-04.) The side padding is `--spacing-12` (12, was 10). (Decided 2026-11-06.)
9. **No caret.** The bubble is a plain rounded rectangle, as the CSS draws it; the DS's 6px caret is not built. (Decided 2026-11-04.)
10. **It sits above modals** (`--z-tooltip`), as the DS says, not at the CSS's `z-index: 2`. (Decided 2026-11-04.)
11. **On touch, a long press (500ms) shows it.**

## Accessibility
- The bubble is `role="tooltip"` with its own id, and is always in the DOM (opacity 0 when hidden), so screen readers find it through `aria-describedby` whether or not it is showing.
- `role="label"` puts the text on the trigger as its `aria-label` instead (for an icon button), so the name is always announced; the bubble is then hidden from assistive technology so the name isn't read twice.
- It shows on keyboard focus as well as hover, and Escape hides it.
- In forced colours the bubble takes a 1px border, so it keeps an edge (as Tag). (Decided 2026-11-04.)

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Show and hide | Opacity fades; nothing moves. Kept under reduced motion (a fade carries no travel). | `--duration-fast` · `--ease-standard` |

## Example

```tsx
import { Button, Tooltip } from '@collabrium/ui';
import { PencilSimple } from '@phosphor-icons/react';

<Tooltip content="Edit brief" role="label">
  <Button variant="ghost" iconOnly icon={PencilSimple} aria-label="Edit brief" />
</Tooltip>
```

## Replaces
- `.c-tooltip-wrap`
- `.c-tooltip-bubble`, `.c-tooltip-bubble.is-visible`, `.c-tooltip-bubble.is-portaled`
