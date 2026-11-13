# useReducedMotion (Motion)

## Purpose

A hook that is true when the person has asked their system for reduced motion. Imported from `@collabrium/ui/motion`.

## Use when

- Any piece of your own that moves.

## Don't use when

- Turning a piece off altogether: content must still appear.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `returns` | `boolean | null` | — | True when reduced motion is asked for. |

## Rules

1. Re-exported from the motion library, which updates it if the setting changes.
2. Drop travel, scale and loops; keep fades and information.

## Accessibility

- Reports the person's own setting.

## Motion

None of its own.

## Example

```tsx
import { useReducedMotion } from '@collabrium/ui/motion';

const reduce = useReducedMotion();
```

## Replaces

Amicro `useReducedMotion`. Replaced by the motion library's hook, re-exported.
