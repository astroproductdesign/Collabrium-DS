// Motion values for the "motion" library, read from the design tokens.
// The DLS principle (DESIGN-SYSTEM.md, Motion): "Movement settles; it never
// bounces." No springs, no overshoot: only tween transitions with the
// token easings below.
import { tokens, type DurationToken, type EaseToken } from '../tokens/tokens';

/** Token durations in seconds (the unit the motion library expects). */
export const duration = Object.fromEntries(
  Object.entries(tokens.duration).map(([k, ms]) => [k, ms / 1000]),
) as { readonly [K in DurationToken]: number };

/** Token easings as cubic-bezier control points. */
export const ease = tokens.ease as { readonly [K in EaseToken]: readonly [number, number, number, number] };

/** A tween transition built only from tokens. */
export function transition(d: DurationToken = 'base', e: EaseToken = 'standard') {
  return { type: 'tween' as const, duration: duration[d], ease: [...ease[e]] as [number, number, number, number] };
}

/**
 * Distance for "slide up" entrances: spacing-8.
 * Source: DESIGN-SYSTEM.md lines 1089 and 2222 (entrance/exit translateY(8px)
 * at duration-base / ease-settle) and components.css `c-card-entry-in`.
 */
export const slideDistance = tokens.spacing[8];

export type { DurationToken, EaseToken };
