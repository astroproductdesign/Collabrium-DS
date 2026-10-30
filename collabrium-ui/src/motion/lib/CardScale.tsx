'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/** The size of a card layout: `md` is the designed size, `sm` and `lg` scale it by 0.75 and 1.25. */
export type CardSize = 'sm' | 'md' | 'lg';

const factor: Record<CardSize, number> = { sm: 0.75, md: 1, lg: 1.25 };

const useLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Draws a card layout at the `size` asked for, and shrinks it to fit the space
 * it is in (never past the size chosen). The layout is built at its designed
 * size, `width` by `height` px, and scaled as one picture, so every offset,
 * turn and depth inside keeps its proportions. The box it takes up is the
 * scaled size, so nothing is left hanging outside it.
 */
export function CardScale({ size = 'md', width, height, children }: { size?: CardSize; width: number; height: number; children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState(width * factor[size]);
  useLayout(() => {
    const el = host.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    // The room is the content width of whatever holds the layout, so a layout that sits beside
    // something (the time machine's scrubber) is measured the same way as one that fills its row.
    const measure = () => {
      const style = getComputedStyle(parent);
      setRoom(parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);
  const scale = Math.min(factor[size], room / width);
  return (
    <div ref={host} className="cui-card-scale" style={{ height: height * scale }}>
      <div className="cui-card-scale__box" style={{ width: width * scale, height: height * scale }}>
        <div className="cui-card-scale__inner" style={{ width, height, transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
