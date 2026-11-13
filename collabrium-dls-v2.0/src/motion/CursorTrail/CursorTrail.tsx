'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'motion/react';
import { tokens } from '../../tokens/tokens';
import { accentValue, type AccentName } from '../lib/accent';

export interface CursorTrailProps {
  /** The colour of the dots: Obsidian or one of the seven series colours. Default `navy`. */
  color?: AccentName;
}

const COUNT = 6;
const SIZE = tokens.spacing[8];

function Dot({ index, x, y, color }: { index: number; x: number; y: number; color: string }) {
  const config = { stiffness: 300 - index * 30, damping: 25 + index * 2, mass: 0.2 + index * 0.1 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);
  useEffect(() => {
    sx.set(x);
    sy.set(y);
  }, [x, y, sx, sy]);
  const d = SIZE * (1 - index / COUNT);
  return <motion.span className="cui-cursor-dot" aria-hidden="true" style={{ x: sx, y: sy, width: d, height: d, opacity: 1 - index / COUNT, background: color }} />;
}

/**
 * A short tail of dots that follows the mouse across the whole page, each a
 * little behind the last and a little smaller. Decorative: it takes no clicks
 * and is hidden from assistive technology. It does not appear for touch or
 * pen, or under reduced motion.
 */
export function CursorTrail({ color = 'navy' }: CursorTrailProps) {
  const reduce = useReducedMotion();
  const [at, setAt] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') setAt({ x: e.clientX, y: e.clientY });
    };
    const leave = () => setAt(null);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [reduce]);
  if (reduce || !at) return null;
  const hex = accentValue(color);
  return (
    <>
      {Array.from({ length: COUNT }, (_, i) => (
        <Dot key={i} index={i} x={at.x} y={at.y} color={hex} />
      ))}
    </>
  );
}
