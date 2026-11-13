# TutorialModal

## Purpose
A numbered walkthrough of a page. One part is spotlighted at a time and
explained in a short card that grows out of it; the reader moves through the
stops with Back and Next. The page is locked while the tour runs. A variant
of Modal: Modal's panel recipe, scrim and footer order, with its own geometry
and lock. It is Modal's one carve-out from "no multi-step flows": its steps
are reads, not decisions.

⚠️ Designed from scratch in the DLS. The gallery shows only a static card;
the behaviour here is built from DESIGN-SYSTEM.md's text.

## Use when
- Showing someone round a page they haven't used before, in a few stops.

## Don't use when
- **One thing to explain.** A single stop isn't a tour: use a Tooltip or an
  Info Banner, which leave the page usable.
- **A task or a form.** A step collects nothing: use a page or a Modal.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `open` | boolean | required | Whether the tour runs. It starts at the first step each time. |
| `steps` | `{ title, body, target? }[]` | required | An intro, at least one stop, a sign-off. `target`: a selector, a ref, or a function returning the element. |
| `onEnd` | `(reason: 'done' \| 'skip' \| 'close') => void` | required | The tour ended. Set `open` to false. |
| `onStepChange` | `(index) => void` | — | The reader moved. |

The ref goes to the card; `style` and `className` aren't accepted. The tour
renders at `<body>` level.

## Rules
1. **Three shapes.** The first step is the intro: Skip the tour (Ghost) and
   Show me (Primary), the whole page dimmed. Middle steps are stops: Back
   (Ghost, as Skip; the DS names no variant, decided 2026-11-12) and Next
   (Primary), the target ringed. The last is the sign-off: Back and Done, the page
   dimmed again. Done commits nothing.
2. **A step is a read, never a task.** No input, no auto-advance, never
   "click this to go on".
3. **Nothing is clipped.** Two lines of title and four of body are authoring
   caps, never clamps. A card that outgrows the window scrolls its body; the
   counter, title, footer and × stay put. A title needing three lines is two
   steps.
4. **Placement by fit, in order:** below the target, above, right, left, else
   centred; 16px from every window edge, 12px from the target.
5. **At 767px and below the card docks** to the bottom, full width inside the
   16px gutter, and the target is scrolled into the band above it. A card
   that would cover its own target docks to the top instead.
6. **A step points only at something rendered and visible**, and on a phone
   at something no taller than the band above the card. A missing or hidden
   target shows the step unanchored (whole page dimmed) and warns in the
   console; the step keeps its number.
7. **The spotlight follows its target** if it moves or resizes mid-step.
8. **Three ways out, all final:** the ×, Escape and a click on the scrim end
   the tour. Escape stops there, so a modal underneath stays open.
9. **The lock:** the layer takes every click; Tab stays in the card; a click
   guard swallows clicks outside it; the page can't be scrolled (the tour
   scrolls it to each target itself).
10. **The title is always an `h4` element** at h4's look, unlike Modal's
    `headingLevel`: the dialog is named by `aria-labelledby`, so the level
    never carries that job and never varies between steps (decided
    2026-11-12).
11. **Measures with no token, kept at the source's values:** the card's
    340px and the body's 1.6 line-height (body2's 20px would set it 2.4px a
    line tighter) (decided 2026-11-12).
12. **One tour at a time.** No screenshots, video, progress dots or "Learn
    more" in the card, and no arrow.

## Accessibility
- The card is `role="dialog"`, `aria-modal="false"`, named by its title and
  described by the counter and body. Focus moves to it on every step, which
  is what reads it out; no live region.
- Nothing is made `inert`: a screen reader can still read what a step
  describes; the click guard stops it being activated.
- Focus moves to the card on every step, not to its title, so the counter
  and body are read with it: an approved exception to focusing only a
  heading (decided 2026-11-12).
- Forced colours: the spotlight keeps a Highlight ring and the card a 1px
  CanvasText edge, as the scrim's shadow and fill drop out (decided
  2026-11-12).
- Ending the tour returns focus to what started it.
- Coarse pointer: footer buttons 44px tall; the × keeps its 32px box with a
  44px hit area.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| A step opens | The card grows out of its target (scale clamped at 1) and fades in | `--duration-morph` · `--ease-morph` |
| Next / Back | The spotlight travels to the new target | `--duration-morph` · `--ease-morph` |
| Docked | The card rises 12px from its edge | `--duration-morph` · `--ease-morph` |
| Reduced motion | The card cross-fades; the spotlight jumps | `--duration-fast` · `--ease-standard` |

## Example

```tsx
import { TutorialModal, type TutorialStep } from '@collabrium/ui';

const steps: TutorialStep[] = [
  { title: 'Welcome to the sales board', body: 'One page that answers where the quarter stands…' },
  { title: 'Where the quarter stands', body: 'Three numbers, each against last quarter.', target: statsRef },
  { title: "You're set", body: 'Reopen this tour any time from Help.' },
];

<TutorialModal open={open} steps={steps} onEnd={() => setOpen(false)} />
```

## Replaces
- `.c-modal-tutorial-layer` (`.is-open`), `html.c-modal-tutorial-locked`,
  `.c-modal-tutorial-spot` (`.is-none`), `.c-modal-tutorial` (`.is-opening`,
  `.is-docked-top`), `.c-modal-tutorial-close`, `-kicker`, `-title`, `-body`,
  `-actions`
