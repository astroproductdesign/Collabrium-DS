# Text sweep (Motion)

## Purpose

Text that is revealed by a band of colour sweeping across it, once, when it scrolls into view, and settles to Neutral-9. Imported from `@collabrium/ui/motion`.

## Use when

- A hero headline on a marketing page.

## Don't use when

- Anything the person must read immediately or without scripts.
- Body text.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `text` | `string` | — | The text. |
| `hue` | `'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'` | `'navy'` | The hue of the band. |

## Rules

1. Use it for one headline.
2. Keep the text short.

## Accessibility

- The text is in the page as normal, so assistive technology reads it from the start. In forced-colours mode and under reduced motion it is plain text. Without scripts the text stays hidden, so use it on headings that are not critical.

## Motion

- The text scrolls into view: A band of the hue's ramp sweeps left to right over about 0.9s, revealing the text. (Amicro's timing (no DLS token))
- Reduced motion: The text is shown in Neutral-9 at once. (—)

## Example

```tsx
import { TextSweep } from '@collabrium/ui/motion';

<TextSweep text="Work moves in balance" />
```

## Replaces

Amicro `DiaTextReveal`. Its eight blues become one hue's ramp, its text colour is Neutral-9, and its rotating list of phrases and width animation are not ported (Q-MOT-15). Amicro's `currentColor` left the finished text transparent; here it settles to Neutral-9.
