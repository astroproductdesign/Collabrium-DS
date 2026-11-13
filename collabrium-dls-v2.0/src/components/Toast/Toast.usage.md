# Toast

## Purpose
Transient, auto-dismissing system feedback: "Brief saved", "Upload
failed". A small surface in the bottom-right corner with a tone icon, a
title and / or a message, an optional action and a close. Never the place
for a decision with real consequences. `ToastProvider` holds the stack;
`useToast()` shows toasts from anywhere under it.

Transcribed in the DLS from the teammate's `Toast.jsx`.

## Use when
- Confirming something the reader just did ("Brief saved", "Link copied").
- Reporting a background result or failure that isn't tied to one place on the page.

## Don't use when
- **The message belongs to one section or card, or must stay.** Use Info Banner.
- **The reader must decide something.** Use Modal.
- **A field is wrong.** Use the field's own error.

## Props

`useToast()` returns `{ toast, dismiss }`.

| Name | Options | Default | Description |
|---|---|---|---|
| `toast(options)` | `(options) => id` | — | Shows a toast, or queues it while 3 are on screen. |
| `dismiss(id)` | `(id: string) => void` | — | Closes a toast early, or drops it from the queue. |

`toast()` options:

| Name | Options | Default | Description |
|---|---|---|---|
| `tone` | `'neutral'` \| `'success'` \| `'warning'` \| `'danger'` | `'neutral'` | The icon and its colour. Danger never leaves on its own. |
| `title` | ReactNode | — | Body1 bold, 50 characters at most. A title, a message or both is required. |
| `message` | ReactNode | — | Caption under a title, body1 on its own; 100 characters at most. |
| `action` | `{ label, onClick }` | — | One link under the text. Never destructive. Clicking it also dismisses the toast. |
| `dismissible` | boolean | `true` | Shows the close button. Danger always has it. |

`ToastProvider`: `children`, `label` (names the region, default "Notifications"). `Toast` itself takes `tone`, `title`, `message`, `action` and `onDismiss` (which shows the close), for a static picture of one; the ref goes to its `<div>`. `style` and `className` are not accepted.

## Rules
1. **Surface:** 320–420px wide, Neutral-1, 1px Neutral-3, `radius-md` (16px, a compact transient surface, not Card's 20px), `shadow-3`, 12px 16px padding, 12px between parts.
2. **Icon:** `icon-base` (20px), Fill (a status icon), 2px down to sit on the first line. Neutral `info` Neutral-9, Success `check-circle` Green, Warning `warning` Amber, Danger `x-circle` Red.
3. **Title:** body1, bold, Neutral-9. **Message:** caption, Neutral-5 under a title; on its own it is the main content, body1 at 500, Neutral-9. Line heights are the type tokens' (the DS sets sizes only).
4. **Action:** one link, 8px under the text ("Undo", "View"); a ghost button's padding would push its label off the text's edge. Clicking it also dismisses the toast. Never destructive: the toast disappears on its own (decided 2026-11-10).
5. **Close:** Button ghost sm icon-only (32px, a 16px X and the focus ring; the gallery's is an unset 13px with no focus), `X` Regular, "Dismiss", top right. On every tone by default (`dismissible: false` hides it); always on Danger (decided 2026-11-10).
6. **Copy:** title 50 characters, message 100. The toast never cuts or clips text: rewrite longer copy. Never only an icon and a close.
7. **Position:** fixed bottom right, 24px from the edges, 380px wide, above page content (`--z-toast`) and under a Modal's scrim. At 640px and below: a full-width band 12px from the sides and bottom, the toast filling it (no 320px floor or 420px cap there, so it never overflows a phone; decided 2026-11-10). The widths and breakpoint have no token and stay local (decided 2026-11-10).
8. **Stack:** at most 3 on screen, 8px apart, **newest on top** (decided 2026-11-10; the gallery's script put it at the bottom). The stack grows upward from the corner; when one leaves, the rest slide to close the gap. A 4th waits in a first-in, first-out queue and enters when one leaves. Each keeps its own timer. Keep to one at a time where you can.
9. **Timing:** Neutral, Success and Warning leave after 5 seconds (never before 2); Danger stays until closed. Hover or keyboard focus inside pauses the timer, and leaving resumes it (focus decided 2026-11-10, so a keyboard user can reach the action).
10. **Above Back to top:** while `BackToTop` shows, the stack rises to sit 12px above it (on phones too), gliding there and back (instant under reduced motion); near the top of the page, when the button hides, it returns to its corner (decided 2026-11-10).

## Accessibility
- The host is a "Notifications" region holding one polite live list (`role="status"`) for the page's life, so each new toast is read out once (decided 2026-11-10; the gallery's freshly inserted `role="status"` toasts are often skipped).
- The tone icon is decorative; the title and message carry the meaning.
- The stack sits at the end of the page, so Tab reaches a toast's action and close last. Escape dismisses the focused toast; after a dismiss, focus doesn't move (decided 2026-11-10, as Info Banner).
- Focus inside a toast pauses its timer, as hover does.
- Forced colours: a CanvasText border.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Enter | Slides up 16px and fades in | `--duration-base` · `--ease-standard` |
| Exit | Fades out and slides down 8px | `--duration-base` · `--ease-standard` |
| Stack reflow | The other toasts slide to their new places | `--duration-base` · `--ease-standard` |
| Lift above Back to top | The stack glides up 12px clear of the button, and back down when it hides | `--duration-base` · `--ease-standard` |
| Reduced motion | Toasts appear and leave at once; the lift is instant | — |

## Example

```tsx
import { Button, ToastProvider, useToast } from '@collabrium/ui';

<ToastProvider>
  <App />
</ToastProvider>

function SaveButton() {
  const { toast } = useToast();
  return (
    <Button variant="primary" onClick={() => toast({ tone: 'success', title: 'Brief saved', message: 'Your changes are live.' })}>
      Save brief
    </Button>
  );
}
```

## Replaces
- `.c-toast` (`.is-message-only`, `.is-entering`, `.is-exiting`), `.tone` (`.tone-neutral`, `-success`, `-danger`, `-warning`), `.body`, `.title`, `.message`, `.action`
- `.c-toast-host`
- The gallery's toast script (`fireToast`, `renderToast`, `dismissToast`, the queue and timers)
