'use client';

import { useEffect, useState, type RefObject } from 'react';

export interface MousePosition {
  /** The pointer's position in the window. */
  x: number;
  y: number;
  /** The pointer's position inside the element given as `ref`; 0 when there is no ref. */
  elementX: number;
  elementY: number;
}

/**
 * Where the mouse is, in the window and, when you pass a ref, inside that
 * element. It updates on every move, so use it in a small component. Touch and
 * pen are ignored.
 */
export function useMousePosition(ref?: RefObject<HTMLElement | null>): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0, elementX: 0, elementY: 0 });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = ref?.current?.getBoundingClientRect();
      setPosition({ x: e.clientX, y: e.clientY, elementX: r ? e.clientX - r.left : 0, elementY: r ? e.clientY - r.top : 0 });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [ref]);
  return position;
}
