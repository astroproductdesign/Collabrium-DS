# Mouse follow (Motion)

## Purpose

A soft ring (or anything you give it) that trails the mouse across the whole page with a gentle spring. Imported from `@collabrium/ui/motion`.

## Use when

- A playful marketing or portfolio page.

## Don't use when

- Product screens where people work.
- Content that must be read or pressed: it takes no clicks.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | `a soft ring` | What follows the mouse. |
| `color` | `AccentName` | `'navy'` | The colour of the default ring. It does not change `children`. |

## Rules

1. The follower is centred on the mouse and trails it on a spring (stiffness 180, damping 20), which overshoots very slightly. Kept as Amicro's by decision (Q-MOT-6).
2. The default ring is 24px (`--spacing-24`) with a 1px border and a 12% fill in the colour.
3. It is fixed to the window, sits at `--z-float` and takes no clicks.
4. Only a mouse shows it; touch and pen do not.
5. Nothing is shown under reduced motion.
6. It is decoration, and `children` must be too: never put something a person needs to read or press in it.

## Accessibility

- No controls and no live region.
- The effect is decoration: it adds no role or label and takes no focus.
- Reduced motion: see Rules.

## Motion

- The mouse moves: The follower moves toward the mouse on a spring (stiffness 180, damping 20), a little behind it. (Amicro's spring (no DLS token))
- The mouse leaves the page: The follower disappears. (—)
- Reduced motion: Nothing is shown. (—)

## Example

```tsx
import { MouseFollow } from '@collabrium/ui/motion';

<MouseFollow />
```

## Replaces

Amicro `MouseFollow`. Its blue ring becomes a colour prop of the DLS accent colours.
