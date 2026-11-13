# Tilt (Motion)

## Purpose

Tips its content in 3D toward the pointer while the pointer moves over it, and levels it again when the pointer leaves. Imported from `@collabrium/ui/motion`.

## Use when

- A single feature card or image that should feel physical.

## Don't use when

- Text a person has to read while it tips: keep it to cards and images.
- Many cards at once.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | The content that tilts. It brings its own surface. |
| `intensity` | `'subtle' | 'medium' | 'strong'` | `'medium'` | How far it tips: 6, 10 or 15 degrees. |

## Rules

1. The content tips toward the pointer by up to 6, 10 or 15 degrees, only while the pointer is over it.
2. The spring (damping 20, stiffness 200, mass 0.5) is critically damped: it settles without overshoot.
3. Only a mouse triggers it; touch and pen do not.
4. It wraps content and adds no look: the card inside brings its own surface.
5. The 3D depth (800px) has no token (Q-MOT-8).
6. Under reduced motion it does not tilt.

## Accessibility

- No controls and no live region.
- The effect is decoration: it adds no role or label and takes no focus.
- Reduced motion: see Rules.

## Motion

- Pointer moves over it: It tips toward the pointer by up to the intensity, on a spring that settles without overshoot (damping 20, stiffness 200, mass 0.5). (Amicro's spring (settles, no token))
- Pointer leaves: It levels again. (Amicro's spring (settles, no token))
- Reduced motion: It does not tilt. (—)

## Example

```tsx
import { Tilt } from '@collabrium/ui/motion';

<Tilt><div className="docs-motion-sample">Move the pointer over this card.</div></Tilt>
```

## Replaces

Amicro `TiltCard`. It was its own gradient card with a fixed aspect ratio; here it is a wrapper, so the surface is yours. Its 15° maximum is the `strong` intensity; the content no longer lifts 40px off the card.
