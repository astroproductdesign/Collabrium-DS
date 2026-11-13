# useScrollProgress (Motion)

## Purpose

A hook that returns how far the page or an element has scrolled, from 0 to 1. Imported from `@collabrium/ui/motion`.

## Use when

- A reading-progress display, or your own scroll effect.

## Don't use when

- Hiding or showing content people need.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `ref` | `RefObject<HTMLElement | null>` | the page | The scrolling element to follow. |

## Rules

1. Returns a number from 0 to 1; 0 when there is nothing to scroll.
2. It updates on every scroll event, so use it in a small component.
3. With a ref it follows that element, otherwise the page.

## Accessibility

- A hook has no interface; anything you show with it needs its own text.

## Motion

None of its own.

## Example

```tsx
import { useScrollProgress } from '@collabrium/ui/motion';

const progress = useScrollProgress(ref);
```

## Replaces

Amicro `useScrollProgress`. The value is clamped between 0 and 1.
