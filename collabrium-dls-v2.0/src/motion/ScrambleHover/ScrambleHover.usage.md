# Scramble hover (Motion)

## Purpose

Text that scrambles when the pointer enters it and settles back to itself, all at once or letter by letter from either end or the middle. Imported from `@collabrium/ui/motion`.

## Use when

- A short playful title or label on a marketing page.

## Don't use when

- Anything that must be read at once.
- A control.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `text` | `string` | — | The text. |
| `settle` | `'together' | 'start' | 'end' | 'center'` | `'together'` | How the letters settle. |
| `alphabet` | `'text' | 'symbols'` | `'text'` | What the letters scramble through. |

## Rules

1. Use it on a short title or label.
2. Make sure the real words say everything: the scramble is decoration.
3. Use one per surface.

## Accessibility

- The real text is in the page, visually hidden, so a screen reader reads the words; the scramble is `aria-hidden`. It answers a pointer only. Under reduced motion it does not scramble.

## Motion

- The pointer enters: The letters scramble every 40ms, then settle back: together after 10 frames, or one by one. (Amicro's timing (no DLS token))
- Reduced motion: No scramble. (—)

## Example

```tsx
import { ScrambleHover } from '@collabrium/ui/motion';

<ScrambleHover text="Hover to scramble" />
```

## Replaces

Amicro `ScrambleHover`. Its `sequential` and `revealDirection` props are one `settle` option, `useOriginalCharsOnly` and `characters` are `alphabet`, its speed is fixed, and the real text is read by assistive technology (Q-MOT-16).
