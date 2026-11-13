# Back to top

## Purpose
A small floating button in the bottom-right corner of the window. It
appears once the reader is well down a long page and scrolls them back to
the top in one click. Hidden (not just transparent) near the top.

Transcribed in the DLS from kult-creator's `BackToTop`, built on Chat
window's Jump to present.

## Use when
- A page is long enough that getting back to the top takes real scrolling.

## Don't use when
- **Going up to the parent screen.** Use Back button.
- **Jumping to the newest message in a chat.** Chat window has Jump to present.
- **A short page.** It never shows; don't mount it.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `scrollRef` | `RefObject<HTMLElement>` | — | The region that scrolls, when the page scrolls inside a frame (App Shell's content). The window is always read too. |
| `label` | string | `"Back to top"` | The button's name and hover text. |

The ref goes to the `<button>`. `style` and `className` are not accepted.

Page-level settings are custom properties on `<html>`:

| Property | Set by | What |
|---|---|---|
| `--cui-back-to-top-bottom` | the page, once | Lifts the resting offset above a permanent bottom bar (e.g. `96px`). On `<html>`, never on the button: Toast reads it too. |
| `--cui-action-bar-clearance` | Action bar | Its open height plus gap; the button rises above it. |
| `--cui-back-to-top-y` | this file | The resolved offset. Read it, don't set it. |

## Rules
1. **Mount it once per page,** anywhere in the tree (it is fixed to the window).
2. **Box:** a 32px circle, Neutral-1, 1px Neutral-3, `shadow-2`; ArrowUp (Regular, Tier 1: a movement) 16px Neutral-9. A 44px hit area around it; the box never changes size.
3. **Place:** bottom-right, 24px from the edges (12px at 640px and below), plus the phone's safe area; z-index `--z-float` (20). When the page scrolls in a frame (`scrollRef`) whose scrollbar runs down the window's right edge, it steps in by the scrollbar's width, so it keeps its 24px from the content and never sits on the scrollbar (decided 2026-11-10).
4. **Show and hide:** it appears past 480px of scroll and hides only under 240px; between the two it keeps its state, so it never flickers. It reads the position on mount, so a page reopened part-way down shows it at once.
5. **Which element scrolls:** the larger of the window's scroll and `scrollRef`'s; it listens to both.
6. **Click:** scrolls both the window and `scrollRef` to the top, smooth (instant under reduced motion), and moves focus to the page's main heading (the first `h1`, inside `scrollRef` if given; it takes `tabindex="-1"`), so a keyboard user carries on from the top instead of from where the hidden button sat (decided 2026-11-10). Give every page that has it an `h1`.
7. **States:** hover Neutral-2 with `shadow-3`; focus-visible the 2px Obsidian ring, 2px off.
8. **Higher offsets:** above an open Action bar automatically (the higher of the two), above a permanent bottom bar through `--cui-back-to-top-bottom` on `<html>`. Never move it any other way.
9. **With Toast:** while it shows, it sets `data-cui-back-to-top-shown` on `<html>`, and Toast's stack rises to sit 12px above it; near the top it hides and toasts return to their corner. With an Action bar too, the corner stacks Action bar, Back to top, toasts, from the bottom up.
10. **Settings:** `scrollRef` and `label` only; the 480 / 240px thresholds are fixed (decided 2026-11-10). Hover text is the native `title`, as the DS says, not Tooltip (decided 2026-11-10).

## Accessibility
- A real `<button type="button">`, named "Back to top" (`aria-label`, and `title` for the hover text).
- Hidden is `visibility: hidden`: out of the tab order and the accessibility tree. Arriving, it is focusable at once; leaving, it stays painted until the fade ends.
- Focus ring on `:focus-visible` only.
- After the click, focus moves to the page's `h1` (the heading exception), so the next Tab starts from the top of the page.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Appear / hide | Fades and rises 8px (hides the reverse); visibility flips at once arriving, after the fade leaving | `--duration-base` · `--ease-settle` |
| Hover | Neutral-2 fill, `shadow-3` | `--duration-fast` · `--ease-standard` |
| Above an Action bar | Glides up, and back down when it closes | `--duration-base` · `--ease-standard` |
| Scroll to top | Smooth scroll | — |
| Reduced motion | No 8px travel and no glide; the fade stays; the scroll is instant | — |

## Example

```tsx
import { BackToTop } from '@collabrium/ui';

// Once per long page.
<BackToTop />

// In a frame that scrolls (App Shell's content):
<main ref={contentRef}>…</main>
<BackToTop scrollRef={contentRef} />
```

## Replaces
- `.c-back-to-top` (`.is-visible`), its `:root` properties (`--c-back-to-top-edge`, `-y`, `-bottom`), `html.c-back-to-top-shown`
- The gallery's Back to top script
