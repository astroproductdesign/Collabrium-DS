# Blur text (Motion)

## Purpose

Text that comes into focus letter by letter as it scrolls into view: each letter fades in from a blur, one after another, once. Imported from `@collabrium/ui/motion`.

## Use when

- A headline or short line that should arrive with some presence.

## Don't use when

- Body text or anything long: the stagger makes people wait to read.
- Text that must be readable at once, such as errors or instructions.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `text` | `string` | — | The text. It is split into letters. |
| `duration` | `DurationToken` | `'slow'` | A duration token for each letter. |
| `ease` | `EaseToken` | `'standard'` | An easing token. |

## Rules

1. Each letter fades from 0% opacity and an 8px blur (`--spacing-8`) to sharp, 20ms after the one before (Q-MOT-5).
2. Defaults are `--duration-slow` and `--ease-standard`; the props take token names.
3. It plays once, when the text is 10% inside the viewport.
4. The text is read as one sentence: the full text is visually hidden and the letters are `aria-hidden`.
5. Under reduced motion the blur and the stagger are dropped and the letters fade in together.
6. Use it for one heading or a short line, not for body text.

## Accessibility

- No controls and no live region.
- The text is read once, as a sentence: the full text is visually hidden and the moving pieces are `aria-hidden`.
- Reduced motion: see Rules.

## Motion

- The text scrolls into view: Each letter fades from 0% and an 8px blur to 100% and sharp, 20ms after the one before. Plays once. (--duration-slow · --ease-standard)
- Reduced motion: The blur and the stagger are dropped: the letters fade in together. (—)

## Example

```tsx
import { BlurText } from '@collabrium/ui/motion';

<BlurText text="Work moves in balance" />
```

## Replaces

Amicro `BlurText`. Its 0.5s duration, `easeOut` and `8px` blur become `--duration-slow`, `--ease-standard` and `--spacing-8`.
