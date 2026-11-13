'use client';

import { useMemo } from 'react';
import { tokens } from '../../tokens/tokens';

export interface StaggerOptions {
  /** The gap between neighbours: `sm` (80ms) or `md` (120ms), the DLS row staggers. Default `sm`. */
  step?: 'sm' | 'md';
  /** A delay before the first, in seconds. Default 0. */
  baseDelay?: number;
  /** Where the sequence starts: `first`, `last`, `center`, or the index of an item. Default `first`. */
  from?: 'first' | 'last' | 'center' | number;
}

/**
 * Delays, in seconds, for a row of items that should enter one after another:
 * item `i` waits `delays[i]`. Pass each to a motion transition's `delay`.
 */
export function useStagger(count: number, { step = 'sm', baseDelay = 0, from = 'first' }: StaggerOptions = {}): number[] {
  return useMemo(() => {
    const gap = tokens.stagger[step] / 1000;
    const origin = from === 'first' ? 0 : from === 'last' ? count - 1 : from === 'center' ? (count - 1) / 2 : from;
    return Array.from({ length: count }, (_, i) => baseDelay + Math.abs(i - origin) * gap);
  }, [count, step, baseDelay, from]);
}
