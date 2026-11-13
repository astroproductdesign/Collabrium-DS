'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * How far something has scrolled, from 0 (top) to 1 (bottom). Give it the ref
 * of a scrolling element to follow that element; leave the ref out to follow
 * the page. Returns 0 when there is nothing to scroll.
 */
export function useScrollProgress(ref?: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref?.current ?? null;
    const read = () => {
      const room = el ? el.scrollHeight - el.clientHeight : document.documentElement.scrollHeight - window.innerHeight;
      const at = el ? el.scrollTop : window.scrollY;
      setProgress(room > 0 ? Math.min(1, Math.max(0, at / room)) : 0);
    };
    const target: HTMLElement | Window = el ?? window;
    target.addEventListener('scroll', read, { passive: true });
    read();
    return () => target.removeEventListener('scroll', read);
  }, [ref]);
  return progress;
}
