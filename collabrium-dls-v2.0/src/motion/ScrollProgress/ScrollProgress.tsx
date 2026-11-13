'use client';

import type { RefObject } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { tokens } from '../../tokens/tokens';
import { accentValue, type AccentName } from '../lib/accent';

export interface ScrollProgressProps {
  /** The bar's colour: Obsidian or one of the seven series colours. Default `navy`. */
  color?: AccentName;
  /** The scrolling element to follow, when the page is not what scrolls (an app with a scrolling pane). Leave out to follow the page. */
  container?: RefObject<HTMLElement | null>;
}

/**
 * A thin bar fixed to the top of the window that fills as the page is
 * scrolled. It is decoration: the browser's scroll bar already says where you
 * are, so the bar is hidden from assistive technology and takes no clicks.
 * Under reduced motion it follows the scroll exactly, with no smoothing.
 */
export function ScrollProgress({ color = 'navy', container }: ScrollProgressProps) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll(container ? { container } : undefined);
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="cui-scroll-progress" aria-hidden="true" style={{ scaleX: reduce ? scrollYProgress : smooth, background: accentValue(color), height: tokens.spacing[4] }} />;
}
