'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { duration as seconds } from '../motion';
import { tokens } from '../../tokens/tokens';

export interface PageTransitionProps {
  /** `stairs` slides five columns across the window in turn. `wave` sweeps three layers up like a wave. `fade` covers the window with a fade. Default `stairs`. */
  type?: 'stairs' | 'wave' | 'fade';
  /** Whether the curtain covers the window. Set it to true to cover, then false to uncover. */
  isVisible: boolean;
  /** Called when the curtain has finished covering or uncovering. Swap the page in it while the window is covered. */
  onComplete?: () => void;
}

const COLUMNS = 5;
/** Delay between neighbouring columns, in seconds. TODO(open-question Q-MOT-10): no stagger token is this short. */
const COLUMN_STAGGER = 0.05;
/** The wave's layers, back to front: the colour and how solid each is. */
const LAYERS = [
  { fill: tokens.color.neutral6, opacity: 0.4 },
  { fill: tokens.color.neutral7, opacity: 0.75 },
  { fill: tokens.color.neutral9, opacity: 1 },
] as const;
const POINTS = 12;
/** A fixed spread of delays, so the wave is the same on every run and on the server (Amicro used Math.random). */
const SPREAD = [0.02, 0.11, 0.05, 0.14, 0.08, 0.01, 0.12, 0.06, 0.15, 0.03, 0.1, 0.07];
const WAVE_MS = 1300;
const WAVE_RISE = 0.65;

/**
 * A curtain that covers the whole window while one page is swapped for another,
 * then uncovers it. It is decoration over a change the page makes itself, so
 * it is hidden from assistive technology and takes no clicks. Under reduced
 * motion every type is a plain fade.
 */
export function PageTransition({ type = 'stairs', isVisible, onComplete }: PageTransitionProps) {
  const reduce = useReducedMotion();
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const wave = type === 'wave' && !reduce;
  // The fade is a CSS transition: it needs one frame at 0% before it can run to 100%.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(isVisible));
    return () => cancelAnimationFrame(id);
  }, [isVisible]);
  // The motion library may hold the first callback it was given, so read the latest one from a ref.
  const done = useRef(onComplete);
  done.current = onComplete;

  const wasVisible = useRef(false);
  useEffect(() => {
    if (!wave) return;
    // Uncovering is the same sweep run backwards. Nothing to draw before the first cover.
    if (!isVisible && !wasVisible.current) return;
    wasVisible.current = true;
    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const elapsed = (now - start) / 1000;
      const t = isVisible ? elapsed : WAVE_MS / 1000 - elapsed;
      paths.current.forEach((path, layer) => {
        if (!path) return;
        const step = 100 / (POINTS - 1);
        const ys = SPREAD.map((spread, p) => {
          const raw = Math.max(0, Math.min(1, (t - (layer * 0.08 + spread * ((p + layer) % 2 ? 1 : 0.8))) / WAVE_RISE));
          const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
          return 100 - eased * 110;
        });
        let d = `M 0 100 V ${ys[0]}`;
        for (let j = 0; j < POINTS - 1; j++) {
          const cx = j * step + step / 2;
          d += ` C ${cx} ${ys[j]} ${cx} ${ys[j + 1]} ${(j + 1) * step} ${ys[j + 1]}`;
        }
        path.setAttribute('d', d + ' V 100 H 0 Z');
      });
      if (now - start < WAVE_MS) raf = requestAnimationFrame(frame);
      else done.current?.();
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [wave, isVisible]);

  if (wave) {
    return (
      <svg className="cui-page-transition" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" data-visible={isVisible ? '' : undefined}>
        {LAYERS.map((l, i) => (
          <path key={i} ref={el => void (paths.current[i] = el)} fill={l.fill} style={{ opacity: l.opacity }} />
        ))}
      </svg>
    );
  }

  if (type === 'stairs' && !reduce) {
    const t = { duration: seconds.reveal, ease: [...tokens.ease.precise] as [number, number, number, number] };
    const variants: Variants = {
      initial: (i: number) => ({ y: i % 2 === 0 ? '-100%' : '100%' }),
      enter: (i: number) => ({ y: '0%', transition: { ...t, delay: i * COLUMN_STAGGER } }),
      exit: (i: number) => ({ y: i % 2 === 0 ? '100%' : '-100%', transition: { ...t, delay: i * COLUMN_STAGGER } }),
    };
    return (
      <motion.div className="cui-page-transition cui-page-transition--stairs" aria-hidden="true" initial="initial" animate={isVisible ? 'enter' : 'exit'} onAnimationComplete={() => done.current?.()}>
        {Array.from({ length: COLUMNS }, (_, i) => (
          <motion.span key={i} className="cui-page-transition__column" variants={variants} custom={i} />
        ))}
      </motion.div>
    );
  }

  return (
    <div
      className="cui-page-transition cui-page-transition--fade"
      aria-hidden="true"
      data-visible={shown ? '' : undefined}
      onTransitionEnd={e => {
        if (e.target === e.currentTarget) done.current?.();
      }}
    />
  );
}
