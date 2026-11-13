'use client';

import { forwardRef, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { transition } from '../motion';

export interface StickyStep {
  /** The step's heading, in the column that scrolls. */
  title: string;
  /** One or two sentences under the heading. */
  description: string;
  /** What the sticky panel shows while this step is active: an image, a chart, a card. Leave out for a numbered placeholder. */
  visual?: ReactNode;
}

export interface StickyRevealProps {
  /** The steps, in order. Two to five read well. */
  steps: StickyStep[];
}

/**
 * A scroll story: a column of steps scrolls past while a panel stays in view
 * and shows the visual for whichever step is in the middle of the window. The
 * active step's text is Neutral-9 and the others' is Neutral-5; the panel
 * crossfades. On a narrow window the panel sits above the steps. The motion
 * is a fade only, so reduced motion changes nothing.
 */
export const StickyReveal = forwardRef<HTMLDivElement, StickyRevealProps>(function StickyReveal({ steps }, ref) {
  const [active, setActive] = useState(0);
  const els = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    // A step is active while it crosses a thin band through the middle of the window.
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) if (e.isIntersecting) setActive(els.current.indexOf(e.target as HTMLElement));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    els.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);
  return (
    <div ref={ref} className="cui-sticky">
      <ol className="cui-sticky__steps">
        {steps.map((s, i) => (
          <li key={i} className="cui-sticky__step" data-active={active === i ? '' : undefined} ref={el => void (els.current[i] = el)}>
            <h3 className="cui-sticky__title">{s.title}</h3>
            <p className="cui-sticky__desc">{s.description}</p>
          </li>
        ))}
      </ol>
      <div className="cui-sticky__panel">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="cui-sticky__visual"
            initial={false}
            animate={{ opacity: active === i ? 1 : 0 }}
            transition={transition('slow', 'standard')}
            aria-hidden={active === i ? undefined : true}
            inert={active === i ? undefined : true}
          >
            {s.visual ?? <span className="cui-sticky__placeholder">Step {i + 1}</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
});
