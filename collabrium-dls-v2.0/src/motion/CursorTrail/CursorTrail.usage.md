# Cursor trail (Motion)

## Purpose

A short tail of dots that follows the mouse across the whole page, each a little behind the last and a little smaller. Imported from `@collabrium/ui/motion`.

## Use when

- A playful marketing or portfolio page.

## Don't use when

- Product screens where people work: a trail is a distraction.
- Anything the cursor is used to point at precisely.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `color` | `AccentName` | `'navy'` | The colour of the dots: Obsidian or one of the seven series colours. |

## Rules

1. Six dots, from 8px (`--spacing-8`) down to 3px, in the chosen colour, fading from 100% to 14%.
2. Each dot follows the mouse on its own spring; the later dots are slower. The springs are overdamped: they settle without overshoot.
3. The dots are fixed to the window, sit at `--z-float` and take no clicks.
4. Only a mouse shows it; touch and pen do not.
5. Nothing is shown under reduced motion.
6. It is decoration: mount it once, high in the tree, and never rely on it to show anything.

## Accessibility

- No controls and no live region.
- The effect is decoration: it adds no role or label and takes no focus.
- Reduced motion: see Rules.

## Motion

- The mouse moves: Each dot follows the mouse on its own spring, the later dots slower. (Amicro's springs (no DLS token))
- The mouse leaves the page: The dots disappear. (—)
- Reduced motion: Nothing is shown. (—)

## Example

```tsx
import { CursorTrail } from '@collabrium/ui/motion';

<CursorTrail />
```

## Replaces

Amicro `CursorTrail`. Its Tailwind colour class becomes a colour prop of the DLS accent colours; its count and size are fixed.
