# Media between text (Motion)

## Purpose

A phrase with a picture that opens between its words: the gap widens to show the image or video and the two halves of the text slide apart. Imported from `@collabrium/ui/motion`.

## Use when

- A headline where a picture can sit inside the sentence.

## Don't use when

- Body text.
- Media that carries information.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `firstText` | `string` | — | The text before the media. |
| `secondText` | `string` | — | The text after the media. |
| `src` | `string` | — | The media's address. |
| `alt` | `string` | — | What the media shows. Pass an empty string when it only decorates. |
| `mediaType` | `'image' | 'video'` | `'image'` | A video plays muted, looping and inline. |
| `trigger` | `'hover' | 'view'` | `'hover'` | What opens the gap. |

## Rules

1. Use it for one phrase in a headline.
2. Pass `alt=""` when the picture only decorates.
3. Keep the media small and simple.

## Accessibility

- The text is in the page as normal. The media needs `alt` (empty when decorative). A video is muted and has no controls, so keep it decorative. Under reduced motion the media is always shown and nothing moves.

## Motion

- The pointer enters, or the phrase scrolls into view: The media grows from 0 wide while fading in, and the two halves of the text slide apart. (--duration-base · --ease-settle)
- The pointer leaves: The gap closes. (--duration-base · --ease-settle)
- Reduced motion: The media is always shown; nothing moves. (—)

## Example

```tsx
import { MediaBetweenText } from '@collabrium/ui/motion';

<MediaBetweenText firstText="Crafting" secondText="delightful" src="/studio.jpg" alt="" />
```

## Replaces

Amicro `MediaBetweenText`. Its `triggerType="ref"` imperative handle, free class names and animation variants are gone; the media is sized in `em` and uses `--duration-base` with `--ease-settle` in place of a spring.
