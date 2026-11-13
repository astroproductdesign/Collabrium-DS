'use client';

import { useSyncExternalStore } from 'react';
import { animation } from './chart-theme';
import { useBare } from './bare';

const query = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

/**
 * Animation props for a Recharts mark. Reduced motion draws the final chart
 * at once ("drop the travel, keep the information").
 */
export function useChartMotion() {
  const bare = useBare();
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
  return { isAnimationActive: !reduced && !bare, ...animation };
}
