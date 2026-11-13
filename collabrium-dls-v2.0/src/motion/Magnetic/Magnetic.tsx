'use client';

import { forwardRef, useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useSpring } from 'motion/react';

export interface MagneticProps {
  /** The content that is pulled: usually a Button. */
  children: ReactNode;
  /** How far the content follows the pointer: `subtle` (20%), `medium` (35%) or `strong` (50%) of its distance from the centre. Default `medium`. */
  strength?: 'subtle' | 'medium' | 'strong';
}

const pull = { subtle: 0.2, medium: 0.35, strong: 0.5 } as const;

/**
 * Pulls its content a little toward the pointer while the pointer is over it,
 * and lets it go when the pointer leaves. The spring is Amicro's own and
 * overshoots slightly when it lets go: the DLS has no such motion (Q-MOT-6).
 * Under reduced motion it does not move at all.
 */
export const Magnetic = forwardRef<HTMLDivElement, MagneticProps>(function Magnetic({ children, strength = 'medium' }, ref) {
  const reduce = useReducedMotion();
  const inner = useRef<HTMLDivElement | null>(null);
  const config = { stiffness: 150, damping: 15, mass: 0.6 };
  const x = useSpring(0, config);
  const y = useSpring(0, config);
  const set = (el: HTMLDivElement | null) => {
    inner.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };
  return (
    <motion.div
      ref={set}
      className="cui-magnetic"
      style={reduce ? undefined : { x, y }}
      onPointerMove={e => {
        if (reduce || e.pointerType !== 'mouse' || !inner.current) return;
        const r = inner.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2) + x.get()) * pull[strength]);
        y.set((e.clientY - (r.top + r.height / 2) + y.get()) * pull[strength]);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
});
