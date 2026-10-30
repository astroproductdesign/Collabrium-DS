# Text reveal (Motion)

## Purpose

Text that rises out from under a mask line by line as it scrolls into view, once. Split lines with a new line in the text. Imported from `@collabrium/ui/motion`.

## Use when

- A short headline set on a few lines.

## Don't use when

- A long paragraph.
- Text that must be readable at once.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `text` | `string` | — | The text. Each line, split on a new line (`\n`), is revealed in turn. |

## Rules

1. Each line rises from under a mask over `--duration-reveal` with `--ease-reveal`, 120ms (`--stagger-md`) after the one before. The pair is the DLS's for entrance reveals.
2. The duration and easing are fixed: they are the point of the effect.
3. It plays once, when the text is 20% inside the viewport.
4. The text is read as one sentence: the full text is visually hidden and the lines are `aria-hidden`.
5. Under reduced motion the rise and the stagger are dropped and the lines fade in together.
6. Lines come from the new lines in `text`; the component does not wrap text for you.

## Accessibility

- No controls and no live region.
- The text is read once, as a sentence: the full text is visually hidden and the moving pieces are `aria-hidden`.
- Reduced motion: see Rules.

## Motion

- The text scrolls into view: Each line rises from under its mask, 120ms after the one before. Plays once. (--duration-reveal · --ease-reveal · --stagger-md)
- Reduced motion: The rise and the stagger are dropped: the lines fade in together. (—)

## Example

```tsx
import { TextReveal } from '@collabrium/ui/motion';

<TextReveal text={'Every team sees\nthe same picture'} />
```

## Replaces

Amicro `TextReveal`. Its 0.8s `easeOutExpo` and 0.15s stagger become `--duration-reveal`, `--ease-reveal` and `--stagger-md`.
