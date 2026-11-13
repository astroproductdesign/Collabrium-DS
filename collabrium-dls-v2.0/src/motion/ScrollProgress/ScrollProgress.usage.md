# Scroll progress (Motion)

## Purpose

A thin bar fixed to the top of the window that fills as the page is scrolled. Imported from `@collabrium/ui/motion`.

## Use when

- Long reading pages, such as articles and guides.

## Don't use when

- Short pages.
- Telling anyone where they are: the scroll bar does that.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `color` | `AccentName` | `'navy'` | The bar's colour. |
| `container` | `RefObject<HTMLElement | null>` | the page | The scrolling element to follow, when the page is not what scrolls. |

## Rules

1. A 4px (`--spacing-4`) bar fixed across the top of the window, from the left, at `--z-float`. It takes no clicks.
2. Its width follows the scroll through a spring (stiffness 100, damping 30) that settles without overshoot.
3. The colour is Obsidian or a series colour.
4. It is `aria-hidden`: it is decoration over what the scroll bar says.
5. Under reduced motion it follows the scroll exactly, with no smoothing.

## Accessibility

- Hidden from assistive technology; no focus, no live region.

## Motion

Width follows scroll with a settling spring. Reduced motion: no smoothing.

## Example

```tsx
import { ScrollProgress } from '@collabrium/ui/motion';

<ScrollProgress />
```

## Replaces

Amicro `ProgressIndicator`. Its Tailwind colour class becomes a colour prop, its height is `--spacing-4`, and its `z-[9999]` is `--z-float`.
