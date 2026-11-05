# Modal / dialog

## Purpose
One focused decision, asked over the page: a 400px panel on a scrim with a
title, a sentence or two of body, and a footer of Secondary (cancel) then
Primary (commit). The page waits until the person answers or closes it.

## Use when
- A single decision has to be made before going on: archive, delete, discard changes, leave without saving.

## Don't use when
- **It is a long form or a multi-step flow.** Use a full page or a panel.
- **It is a passing message.** Use Toast, or Info Banner inside the page.
- **It is a short fact about a control.** Use Tooltip.
- **It walks through a surface, or reads one item in detail.** Use Tutorial Modal, Media Ad Modal or Compare modal (their own components).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `open` | boolean | **required** | Whether it is open. |
| `onClose` | `() => void` | **required** | The close button, a scrim click or Escape. Set `open` to false in it. |
| `title` | text | **required** | The decision, as a question. Names the dialog. |
| `headingLevel` | `2`–`6` | `2` | The title's level; the look is always h4. |
| `children` | text | **required** | The body: what the decision means. |
| `actions` | Buttons | — | The footer: Secondary first, Primary on the right. Left out, there is no footer. |
| `closeLabel` | text | `'Close'` | The close button's accessible name. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the panel. `style` and `className` are not accepted. |

The `ref` is forwarded to the panel (`role="dialog"`).

## Rules
1. **One decision per modal.** The title asks it; the body says what it means; the footer answers it.
2. **The footer is Secondary then Primary,** right-aligned, 12px apart, above a Neutral-3 divider. The Primary commits; the Secondary cancels. Use `md` buttons.
3. **Every way out closes it:** the close button, a scrim click and Escape all call `onClose`; so do your footer buttons, through their own handlers.
4. **The panel** is Neutral-1, radius-lg, `shadow-modal`, up to 400px wide, 16px padding, on the Neutral-9 56% scrim.
5. **The scrim** sits on the modal layer (`--z-modal`), with the panel centred and kept 16px off the screen edges; a panel taller than the screen scrolls inside itself.

## Accessibility
- The panel is `role="dialog"` with `aria-modal`, named by the title.
- Opening moves focus to the title; Tab stays inside the panel; on close, focus returns to what opened it.
- The close button is a real Button with an accessible name ("Close").
- No live region.

## Motion
None. The modal appears and goes at once.

## Example

```tsx
import { Button, Modal } from '@collabrium/ui';

<Modal open={open} onClose={() => setOpen(false)} title="Archive this workspace?"
  actions={<>
    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={archive}>Archive</Button>
  </>}>
  Team members will lose access immediately. You can restore it from Settings within 30 days.
</Modal>
```

## Replaces
- `.c-modal`, `.c-modal-head` (and its `h4`), `.c-modal-body`, `.c-modal-foot`
- `.c-icon-btn` as the close button (the real Button, ghost, sm, icon-only)
