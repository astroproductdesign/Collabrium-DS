# Focus blur (Motion)

## Purpose

A row where pointing at one item softens the others: they blur and fade while it stays sharp. Pure CSS, with no script. Imported from `@collabrium/ui/motion`.

## Use when

- A short row of words or cards that you want to focus the eye on one at a time.

## Don't use when

- Long text.
- Items a person must compare side by side.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | The items in the row. Each direct child takes part. |

## Rules

1. Use it on a short row of words or cards.
2. Make each item work on its own: the blur is only a cue.

## Accessibility

- The softening is only a visual cue: all the text stays in the page and is read normally. Keyboard focus softens the others the same way. It applies only where the device has a real hover.

## Motion

- An item is pointed at or focused: The other items blur 4px and fade to 35% opacity. (--duration-base · --ease-reveal)
- The pointer leaves: The items return to sharp. (--duration-base · --ease-reveal)

## Example

```tsx
import { FocusBlur } from '@collabrium/ui/motion';

<FocusBlur>
  <span>Animations</span>
  <span>Transitions</span>
</FocusBlur>
```

## Replaces

Amicro `FocusBlurDemo` (a CSS `:has()` demo with its own card and text). Here it is a wrapper of any items, and it follows keyboard focus as well as the pointer.
