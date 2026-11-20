'use client';

import { createContext, forwardRef, useContext, useEffect, useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react';
import { tokens } from '../../tokens/tokens';

export type ParallaxTrigger = 'scroll' | 'pointer' | 'both';
export type ParallaxDepth = 'back' | 'mid' | 'front';

export interface ParallaxProps {
  /** The scene: `ParallaxLayer`s, and any of your own elements around them. */
  children: ReactNode;
  /**
   * What moves the layers: `scroll` (the page scrolling past), `pointer`
   * (the mouse moving over the scene) or `both`. Default `both`. Touch and pen
   * never lean the layers, so on a phone it is scroll only.
   */
  trigger?: ParallaxTrigger;
}

export interface ParallaxLayerProps {
  /** The layer's content. */
  children: ReactNode;
  /**
   * How far away the layer sits. `back` fills the scene behind everything and
   * takes no clicks: use it for decoration. `mid` and `front` sit in the flow.
   */
  depth: ParallaxDepth;
}

/** Scroll travel each way, in px: back drifts with the page, front against it. */
const travel = { back: tokens.spacing[48], mid: tokens.spacing[20], front: -tokens.spacing[24] } as const;
/** Pointer lean each way, in px: the front layer leans most. */
const lean = { back: tokens.spacing[4], mid: tokens.spacing[8], front: tokens.spacing[16] } as const;
/** Tilt's spring: critically damped, so layers settle without overshoot. */
const spring = { damping: 20, stiffness: 200, mass: 0.5 };

interface Scene {
  progress: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
  trigger: ParallaxTrigger;
  reduce: boolean;
}

const SceneContext = createContext<Scene | null>(null);

/**
 * A scene whose layers move at different speeds, so it reads as having depth.
 * As the page scrolls the back layer drifts with it and the front layer
 * against it; as the mouse moves over it every layer leans away from the
 * pointer, the front one most. Under reduced motion nothing moves.
 */
export const Parallax = forwardRef<HTMLDivElement, ParallaxProps>(function Parallax({ children, trigger = 'both' }, ref) {
  const reduce = useReducedMotion() ?? false;
  const box = useRef<HTMLDivElement | null>(null);
  // 0 as the scene's top enters the bottom of the window, 1 as its bottom
  // leaves the top. Measured from the window, so it works inside any
  // scrolling container (scroll events are caught on the way down).
  const progress = useMotionValue(0.5);
  const scrolls = trigger !== 'pointer';
  useEffect(() => {
    if (reduce || !scrolls) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = box.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = window.innerHeight + r.height;
      progress.set(Math.min(1, Math.max(0, (window.innerHeight - r.top) / span)));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', queue, { capture: true, passive: true });
    window.addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue, { capture: true });
      window.removeEventListener('resize', queue);
    };
  }, [reduce, scrolls, progress]);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const set = (el: HTMLDivElement | null) => {
    box.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };
  const leans = trigger !== 'scroll';
  return (
    <SceneContext.Provider value={{ progress, px, py, trigger, reduce }}>
      <div
        ref={set}
        className="cui-parallax"
        data-trigger={trigger}
        onPointerMove={e => {
          if (reduce || !leans || e.pointerType !== 'mouse' || !box.current) return;
          const r = box.current.getBoundingClientRect();
          px.set(((e.clientX - r.left) / r.width) * 2 - 1);
          py.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        {children}
      </div>
    </SceneContext.Provider>
  );
});

/** One layer of a `Parallax` scene. It can sit anywhere inside the scene, in your own layout. */
export function ParallaxLayer({ children, depth }: ParallaxLayerProps) {
  const scene = useContext(SceneContext);
  if (!scene) throw new Error('ParallaxLayer must be inside a Parallax.');
  const { progress, px, py, trigger, reduce } = scene;
  const scrolls = trigger !== 'pointer';
  const leans = trigger !== 'scroll';
  const x = useSpring(useTransform(px, v => (leans ? -v * lean[depth] : 0)), spring);
  const y = useSpring(
    useTransform([progress, py], ([p, v]: number[]) => (scrolls ? (p * 2 - 1) * travel[depth] : 0) + (leans ? -v * lean[depth] : 0)),
    spring,
  );
  return (
    <motion.div
      className="cui-parallax__layer"
      data-depth={depth}
      aria-hidden={depth === 'back' ? true : undefined}
      style={reduce ? undefined : { x, y }}
    >
      {children}
    </motion.div>
  );
}
