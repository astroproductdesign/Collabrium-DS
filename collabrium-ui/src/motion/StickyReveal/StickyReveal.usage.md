# Sticky reveal (Motion)

## Purpose

A scroll story: steps scroll past while a panel stays in view and shows the visual for the step in the middle of the window. Imported from `@collabrium/ui/motion`.

## Use when

- A short story with an order and a picture for each step.

## Don't use when

- A long list of unrelated things.
- More than about five steps.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `steps` | `StickyStep[]` | — | `title`, `description` and an optional `visual` per step. |

## Rules

1. The step crossing the middle band of the window is active (found with an IntersectionObserver).
2. The active step's text is Neutral-9 and the others' is Neutral-5 (Amicro dimmed to 30% opacity, which fails contrast).
3. The panel crossfades between visuals over `--duration-slow` with `--ease-standard`. A visual is a fade only, with no scale.
4. Visuals that are not active are `aria-hidden` and inert.
5. Two columns from 720px; below, the panel sits above the steps and sticks near the top.
6. The panel height (60vh, 40vh narrow) and the step height (50vh) have no tokens (Q-MOT-11).

## Accessibility

- An ordered list read in order; every step's text stays readable.
- Inactive visuals are hidden from assistive technology.

## Motion

Text colour and panel crossfade, `--duration-slow` with `--ease-standard`. No travel, so reduced motion changes nothing.

## Example

```tsx
import { StickyReveal } from '@collabrium/ui/motion';

<StickyReveal steps={steps} />
```

## Replaces

Amicro `StickyReveal`. Dimming by 30% opacity becomes colour; the visuals no longer scale from 90%; the layout is responsive.
