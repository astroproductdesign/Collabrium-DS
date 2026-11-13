'use client';

import { forwardRef, useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

export interface TiltProps {
  /** The content that tilts: a card or any block. It brings its own surface. */
  children: ReactNode;
  /** How far it tips toward the pointer: `subtle` (6°), `medium` (10°) or `strong` (15°). Default `medium`. */
  intensity?: 'subtle' | 'medium' | 'strong';
}

const degrees = { subtle: 6, medium: 10, strong: 15 } as const;

/**
 * Tips its content in 3D toward the pointer while the pointer moves over it,
 * and levels it again when the pointer leaves. The spring settles without
 * overshoot. Under reduced motion it does not tilt at all.
 */
export const Tilt = forwardRef<HTMLDivElement, TiltProps>(function Tilt({ children, intensity = 'medium' }, ref) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const deg = degrees[intensity];
  const config = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [deg, -deg]), config);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-deg, deg]), config);
  const set = (el: HTMLDivElement | null) => {
    box.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };
  return (
    <div
      ref={set}
      className="cui-tilt"
      onPointerMove={e => {
        if (reduce || e.pointerType !== 'mouse' || !box.current) return;
        const r = box.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div className="cui-tilt__plane" style={reduce ? undefined : { rotateX, rotateY }}>
        {children}
      </motion.div>
    </div>
  );
});
