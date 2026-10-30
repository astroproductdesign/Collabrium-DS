# Play pause morph (Motion)

## Purpose

An icon that morphs between play and pause: two shapes that turn into each other. Put it in a Button. Imported from `@collabrium/ui/motion`.

## Use when

- A media or timer control that plays and pauses.

## Don't use when

- Any other toggle: use Icon swap.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `playing` | `boolean` | — | True shows the pause bars; false shows the play triangle. |

## Rules

1. Put it inside a Button with an `aria-label` that names the action.
2. Set `aria-pressed` on the button.
3. Size it with the text size.

## Accessibility

- The icon is `aria-hidden`: the Button around it names the action ("Play" or "Pause") and says its state. Reduced motion changes the shape at once.

## Motion

- `playing` changes: The two shapes turn into each other. (--duration-morph · --ease-morph)
- Reduced motion: The shape changes at once. (—)

## Example

```tsx
import { PlayPauseMorph } from '@collabrium/ui/motion';

<Button variant="secondary" aria-label="Play">
  <PlayPauseMorph playing={playing} />
</Button>
```

## Replaces

Amicro `PlayPauseMorph`. It was a black round button with a caption and a spring; here it is only the icon, in `--duration-morph` with `--ease-morph` (the DLS pair for pose-to-pose shape changes), and the DLS Button supplies the button.
