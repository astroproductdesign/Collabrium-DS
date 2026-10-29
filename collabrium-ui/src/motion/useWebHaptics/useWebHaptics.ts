'use client';

import { useCallback } from 'react';

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const patterns: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [15, 60, 15],
  warning: [30, 60, 30],
  error: [60, 60, 60, 60, 60],
};

/**
 * A short vibration for touch devices, as feedback to a press or a result.
 * `trigger(type)` returns true when it vibrated. It does nothing, and returns
 * false, where the browser has no vibration (desktops, iOS Safari) and when
 * the person asked for reduced motion.
 */
export function useWebHaptics() {
  const trigger = useCallback((type: HapticType = 'light'): boolean => {
    if (typeof window === 'undefined' || !window.navigator.vibrate) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return window.navigator.vibrate(patterns[type]);
  }, []);
  return { trigger };
}
