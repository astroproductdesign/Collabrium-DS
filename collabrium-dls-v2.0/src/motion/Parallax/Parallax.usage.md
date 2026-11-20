# Parallax (Motion)

## Purpose

A scene whose layers move at different speeds as the page scrolls or the mouse moves over it, so it reads as having depth. Imported from `@collabrium/ui/motion`. ⚠️ Designed from scratch (2026-11-20), from the Parallax principle on motion.zajno.com; no code or visuals copied.

## Use when

- One hero or feature scene on a brand or marketing page.

## Don't use when

- A product screen where people read or work.
- Another Parallax is already in view.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `trigger` | `'scroll' \| 'pointer' \| 'both'` | `'both'` | What moves the layers. Only a mouse leans them. |
| `children` | `ReactNode` | — | The scene: `ParallaxLayer`s, and your own elements around them. |

`ParallaxLayer`:

| Name | Options | Default | Description |
|---|---|---|---|
| `depth` | `'back' \| 'mid' \| 'front'` | — | How far away the layer sits. |
| `children` | `ReactNode` | — | The layer's content. |

## Rules

1. Scroll: from the scene entering the window to it leaving, the back layer travels 48px with the scroll, the mid 20px, the front 24px against it.
2. Pointer: each layer leans away from the mouse, back 4px, mid 8px, front 16px. Touch and pen never lean it.
3. Layers follow on Tilt's spring (damping 20, stiffness 200, mass 0.5), which settles without overshoot.
4. The scene clips its layers, has radius-lg corners and sits on Canvas warm.
5. The back layer fills the scene, takes no clicks and is `aria-hidden`: decoration only.
6. Words and actions go in the front or mid layer, beside the art, never on top of it. An illustration sits only on plain Canvas warm, so keep back-layer shapes away from it.
7. `ParallaxLayer` must be inside a `Parallax`; it can sit anywhere in your own layout there.
8. Under reduced motion nothing moves.

## Accessibility

- No controls and no live region; buttons inside work as normal.
- The back layer is hidden from assistive technology.
- Reduced motion: see Rules.

## Motion

- The page scrolls past: back 48px with the scroll, mid 20px, front 24px against it. (`--spacing-48`, `--spacing-20`, `--spacing-24`)
- The mouse moves over it: back 4px, mid 8px, front 16px away from the pointer. (`--spacing-4`, `--spacing-8`, `--spacing-16`)
- Any movement: Tilt's spring. (no token)
- Reduced motion: nothing moves. (—)

## Example

```tsx
import { Parallax, ParallaxLayer } from '@collabrium/ui/motion';

<Parallax>
  <ParallaxLayer depth="back"><span className="shape" /></ParallaxLayer>
  <div className="hero">
    <ParallaxLayer depth="front"><h2>Meet your audiences</h2></ParallaxLayer>
    <ParallaxLayer depth="mid"><img src="/illustrations/stills-web/foodies.jpg" alt="Foodies character" /></ParallaxLayer>
  </div>
</Parallax>
```

## Replaces

Nothing: new in v2.0.
