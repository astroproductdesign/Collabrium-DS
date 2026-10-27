# Prompt input bar

## Purpose
Where the person asks the AI. A card with one text box and a toolbar: Add
image, Attach file, More options on the left, and on the right a model
switcher, Voice input and Send. It has two variants. The **floating bar** is
pinned to the bottom of a content region, collapses to a pill when the region
scrolls, and opens the chat when pressed. The **inline composer** sits in flow
as a chat window's composer and never collapses. It is part of AI Native,
which has eight parts; this is the seventh converted.

## Use when
- **Floating:** a screen where the person can ask the AI from anywhere, without leaving the content, and the full conversation opens in a chat window.
- **Inline:** the composer inside a chat window, below the thread.

## Don't use when
- **It is a single-line form field.** Use Input field.
- **It is a long-form field with a label.** Use Textarea.
- **It is a search.** Use Search input (not converted yet).
- **You want a button that opens the chat with no text box.** That is a Button.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'floating'` \| `'inline'` | **required** | Floating bar or inline composer. |
| `models` | text[] | **required** | The models in the switcher. The first is chosen to start with. |
| `model` / `onModelChange` | text · `(model) => void` | first model | The chosen model, for a controlled switcher. |
| `value` / `defaultValue` / `onValueChange` | text · `(value) => void` | `''` | The typed text: controlled, or the starting text, and a handler for every edit. |
| `label` | text | `'Ask anything'` | Names the text box for assistive tech. |
| `placeholder` | text | — | Inline only: the empty box's hint ("Reply to Collabrium…"). |
| `onSend` | `(value) => void` | — | Send pressed, or Enter in the inline variant with text in the box. |
| `working` / `onStop` | boolean · `() => void` | `false` | While `working`, Send becomes Stop and `onStop` runs on press. |
| `onLaunch` | `() => void` | — | Floating only. The card or pill pressed, or Enter pressed in the box. Open the chat. |
| `launched` | boolean | `false` | Floating only. The chat is open: the bar fades out and takes no presses. |
| `scrollContainer` | ref | — | Floating only. The scrolling region it floats over: it collapses past 240px and expands within 8px of the top. |
| `collapsed` | boolean | `false` | Floating only. Forces the pill when there is no `scrollContainer`. |
| `parkShift` / `pushShift` | number (px) | `0` | Floating only. Measured sideways offsets: where the pill parks beside a dock, and how far a side panel pushes the bar. |
| `typingLines` | `[text, text]` | the two DESIGN-SYSTEM.md lines | Floating only. The one-time typing. |
| `staticHint` | text | `'Ask me anything'` | Floating only. The fixed line shown under reduced motion. |
| `onAddImage`, `onAttachFile`, `onMoreOptions`, `onVoiceInput` | `() => void` | — | What the four toolbar buttons do. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the wrapper `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the wrapper `<div>`.

## Rules
The component owns the rules that are local to it:
1. **The floating bar arrives once** (fades and rises in, 1150ms after it mounts) **and then changes pose on the morph timing.**
2. **Scroll collapse is asymmetric** (floating): collapse once the region has scrolled past 240px, expand only within 8px of the top. One threshold would flip-flop. The listener is on the scroll container, passive and throttled to a frame.
3. **Collapsed is a pill.** The bar narrows to 406px, parks at `parkShift`, becomes a pill (the glow too), the toolbar row folds away, and the round AI mark scales in at the start. The 11px and 56px padding are deliberate one-offs.
4. **The typing line runs once and never loops** (floating, expanded): it types the first line, pulses the caret for 5 seconds, deletes it, types the second and stops. Every step waits while the box is focused. If the bar collapses first it jumps to the second line, and a guard lands it regardless. It hides when anyone types, and is left-aligned like typed text.
5. **The inline composer is the floating bar minus the scroll behaviour:** no collapse, no AI mark, a plain hint instead of the typing line, a softer glow and shadow, a round Send.
6. **The toolbar is the real Button.** Add image, Attach file, More options and Voice input are Ghost icon-only; Send is Primary icon-only (a pill in the inline variant). The model switcher is a Ghost button with a label.
7. **The model switcher** shows the chosen model and a small caret. Its menu opens upward, right-aligned to the trigger, and closes on an outside press, Escape or a choice. The chosen row keeps a visibility-toggled check, so every row is the same width.
8. **Send becomes Stop** while `working`: the icon and the name swap. Pressing it runs `onStop`.
9. **Mobile keeps the shrink and drops the parking and the pill:** full width with 16px insets, the toolbar folds away, the radius stays.
10. **Reduced motion** stops the glow, removes the morph (the two poses stay) and shows the short fixed line instead of the typing.

The host (your code) owns the rest:
11. **Measure the geometry.** `parkShift` and `pushShift` come from real layout, re-measured when it changes (a late font moves a dock's edge). Never hard-code them.
12. **Open the chat from `onLaunch`, never from focus.** The chat hands focus back to the bar on close, which would reopen it at once.
13. **While a Tool approval card is open or the AI works,** set `working` and change the placeholder to "Or reply directly"; put both back as soon as it ends.
14. **Give every popover you draw inside the bar `position: fixed`** (the model menu does this itself, from the body): the folded row has `overflow: hidden`.

## Accessibility
- The text box is a real `<input>` named by `label`. The typing line, the static hint, the glow and the AI mark are decorative and `aria-hidden`; the mark is not a control.
- Every icon-only button is named: "Add image", "Attach file", "More options", "Voice input", "Send" or "Stop".
- The model switcher has `aria-haspopup="listbox"` and `aria-expanded`; the menu is a `role="listbox"` of `role="option"`s, the chosen one `aria-selected`. Arrow keys move through it, Enter chooses, Escape closes and returns focus to the switcher.
- Focus ring: 2px Obsidian on every button and menu row.
- No live region.

## Motion
- **Arrival:** fade and a 16px rise on `duration-reveal` with `ease-reveal`, after a 1150ms delay (floating).
- **Pose change:** `transform`, `width` and `bottom`, the surface's rows, radius and padding, the toolbar's fade and the mark's scale all on `duration-morph` with `ease-morph`. Mixing in the entrance timing reads as lag.
- **Glow:** a 4 second linear loop of the gradient's position.
- **Typing line caret:** a 500ms blink (`duration-blink`).
- **Reduced motion:** no glow movement and no morph; the mark only fades.

## Example

```tsx
import { useRef, useState } from 'react';
import { PromptInputBar } from '@collabrium/ui';

function Page() {
  const scroller = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState(false);
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div ref={scroller} style={{ height: '100%', overflowY: 'auto' }}>{/* the page */}</div>
      <PromptInputBar
        variant="floating"
        scrollContainer={scroller}
        models={['Standard', 'Advanced']}
        launched={chat}
        onLaunch={() => setChat(true)}
      />
    </div>
  );
}
```

## Replaces
`.c-prompt-bar` (with `.is-revealed`, `.is-morphable`, `.is-collapsed`, `.is-launched`), `-glow-outer`, `-glow-inner`, `-surface`, `-mark`, `-field`, `-ghost`, `-ghost-text`, `-ghost-static`, `-more`, `-toolbar`, `-group`, `-send`, the inline variant `.c-prompt-bar--inline`, and the model switcher `-model`, `-model-trigger`, `-model-label`, `-model-menu`, `-model-item`.
