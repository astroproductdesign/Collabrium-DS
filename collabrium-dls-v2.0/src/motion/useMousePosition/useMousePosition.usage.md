# useMousePosition (Motion)

## Purpose

A hook that returns where the mouse is, in the window and inside an element. Imported from `@collabrium/ui/motion`.

## Use when

- Your own pointer effect.

## Don't use when

- Anything touch users need: touch and pen are ignored.
- A pointer effect Spotlight, Tilt or Magnetic already does.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `ref` | `RefObject<HTMLElement | null>` | — | The element `elementX` and `elementY` are measured from. |

## Rules

1. Returns `{ x, y, elementX, elementY }` in pixels; the element values are 0 without a ref.
2. It updates on every mouse move.
3. Only a mouse is read (Amicro read the mouse events, which touch also fire).

## Accessibility

- A hook has no interface; offer a keyboard and touch alternative.

## Motion

None of its own.

## Example

```tsx
import { useMousePosition } from '@collabrium/ui/motion';

const { x, y } = useMousePosition();
```

## Replaces

Amicro `useMousePosition`. It reads pointer events and ignores touch and pen.
