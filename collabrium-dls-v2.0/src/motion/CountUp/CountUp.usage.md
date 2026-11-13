# Count up (Motion)

## Purpose

A figure that counts up to its value when it appears and counts between values when it changes, in digits of one width so it does not shake. Imported from `@collabrium/ui/motion`.

## Use when

- A headline figure, such as a total or a count of stars.

## Don't use when

- A value people must read at once.
- A live ticker that changes many times a second.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `value` | `number` | — | The number to show. |
| `prefix` | `string` | `''` | Text before the number, such as `$`. |
| `suffix` | `string` | `''` | Text after the number. |
| `format` | `(value: number) => string` | `whole numbers` | Formats the number. |
| `duration` | `DurationToken` | `'base'` | A duration token. |
| `ease` | `EaseToken` | `'reveal'` | An easing token. |

## Rules

1. Use it for a headline figure that arrives or changes.
2. Format the number for its unit with `format`, `prefix` and `suffix`.
3. Keep the counting short.

## Accessibility

- A screen reader is given the final value, not the count, so it reads the figure once. Reduced motion shows the value at once.

## Motion

- The figure appears: Counts from 0 to the value. (--duration-base · --ease-reveal)
- `value` changes: Counts from the figure on show to the new one. (--duration-base · --ease-reveal)
- Reduced motion: The value is shown at once. (—)

## Example

```tsx
import { CountUp } from '@collabrium/ui/motion';

<CountUp value={2492} suffix=" stars" />
```

## Replaces

Amicro `AnimatedStarCounter`. Its 0.25s `easeOutExpo` become `--duration-base` with `--ease-reveal`; it now counts from the figure on show when the value changes (Amicro restarted from 0), and a screen reader gets the final figure.
