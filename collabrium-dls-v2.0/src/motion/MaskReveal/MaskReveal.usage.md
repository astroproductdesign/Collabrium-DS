# Mask reveal (Motion)

## Purpose

Reveals an image or video through a moving shape (a circle, a wipe or a capsule), once, as it scrolls into view. Imported from `@collabrium/ui/motion`. ⚠️ Designed from scratch (2026-11-20), from the Masking principle on motion.zajno.com; no code or visuals copied.

## Use when

- A large image or video that arrives as the person scrolls: a feature, a story, a case study.

## Don't use when

- Text, icons or small thumbnails.
- Media the person needs at once, such as the first thing on the page.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `shape` | `'circle' \| 'wipe' \| 'capsule'` | `'circle'` | The shape the media opens through. |
| `from` | `'left' \| 'right' \| 'below'` | `'left'` | Where a `wipe` opens from. Other shapes ignore it. |
| `children` | `ReactNode` | — | One `img`, `video` or `picture`. It fills the width. |

## Rules

1. It reveals once, when 20% of it is in view.
2. `circle` grows from the centre; `wipe` opens from one side; `capsule` is a pill in the middle that opens out to the frame.
3. The shape opens in 1.1s (`--duration-reveal` × 2) on `--ease-reveal`.
4. The shape is a clip on the media, so the layout never moves.
5. The frame has radius-lg corners and sits on Canvas warm.
6. One shape per page, and one or two reveals per screen.
7. Under reduced motion there is no shape: the media fades in on `--duration-base`.

## Accessibility

- No controls, no role and no live region.
- The media is in the page from the start, so its `alt` is read before the reveal.
- Reduced motion: see Rules.

## Motion

- 20% of it scrolls into view: the shape opens to the full frame in 1.1s, once. (`--duration-reveal` × 2, `--ease-reveal`)
- Reduced motion: the media fades in. (`--duration-base`, `--ease-standard`)

## Example

```tsx
import { MaskReveal } from '@collabrium/ui/motion';

<MaskReveal shape="wipe" from="left">
  <img src="/illustrations/stills-web/gen-z.jpg" alt="Gen Z character" />
</MaskReveal>
```

## Replaces

Nothing: new in v2.0.
