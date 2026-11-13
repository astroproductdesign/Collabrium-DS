# useWebHaptics (Motion)

## Purpose

A hook that gives a short vibration on touch devices as feedback. Imported from `@collabrium/ui/motion`.

## Use when

- Confirming a press or a result on touch devices.

## Don't use when

- The only sign of anything.
- Every tap.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `trigger(type)` | `'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'` | `'light'` | Vibrates with that pattern; returns true when it did. |

## Rules

1. Patterns: light 10ms, medium 25ms, heavy 50ms, success 15-60-15, warning 30-60-30, error five 60ms pulses.
2. It does nothing and returns false where the browser has no vibration, and under reduced motion (Amicro vibrated regardless).
3. Vibration is feedback, never information.

## Accessibility

- Never the only sign of anything.

## Motion

None of its own.

## Example

```tsx
import { useWebHaptics } from '@collabrium/ui/motion';

const { trigger } = useWebHaptics();
trigger('success');
```

## Replaces

Amicro `useWebHaptics`. It no longer vibrates under reduced motion, and its free-number fallback is gone.
