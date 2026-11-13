'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useSpring } from 'motion/react';
import { accentValue, type AccentName } from '../lib/accent';

export interface MouseFollowProps {
  /** What follows the mouse. Leave out for a soft ring. */
  children?: ReactNode;
  /** The colour of the default ring: Obsidian or one of the seven series colours. Default `navy`. It does not change `children`. */
  color?: AccentName;
}

/**
 * Something that trails the mouse across the whole page with a soft spring,
 * a soft ring by default. Decorative: it takes no clicks and is hidden from
 * assistive technology. It does not appear for touch or pen, or under reduced
 * motion.
 */
export function MouseFollow({ children, color = 'navy' }: MouseFollowProps) {
  const reduce = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const x = useSpring(0, { stiffness: 180, damping: 20 });
  const y = useSpring(0, { stiffness: 180, damping: 20 });
  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setSeen(true);
    };
    const leave = () => setSeen(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [reduce, x, y]);
  if (reduce || !seen) return null;
  return (
    <motion.div className="cui-mouse-follow" aria-hidden="true" style={{ x, y, ['--cui-follow-color' as string]: accentValue(color) }}>
      {children ?? <span className="cui-mouse-follow__ring" />}
    </motion.div>
  );
}
