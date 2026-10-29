'use client';

import { forwardRef, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { transition } from '../motion';
import type { CardItem } from '../lib/cards';

export interface CardCoverFlowProps {
  /** Names the cover flow for assistive technology, e.g. "Albums". */
  'aria-label': string;
  /** The cards, in order. */
  items: CardItem[];
  /** The index of the card in front. Leave out to let the cover flow keep it, starting in the middle. */
  index?: number;
  /** Called with the index of the card that was chosen. */
  onIndexChange?: (index: number) => void;
}

/** Spacing between cards, in px. TODO(open-question Q-MOT-22): Amicro's 32px step, 80px card and 1000px perspective, no tokens. */
const STEP = 32;

/**
 * Cards in 3D, the front one flat and enlarged and the others turned away and
 * receding, in the style of a record browser. Choose a card with a click, the
 * Previous and Next buttons, a dot, or the arrow keys. Under reduced motion the
 * cards sit in their places with no turning.
 */
export const CardCoverFlow = forwardRef<HTMLDivElement, CardCoverFlowProps>(function CardCoverFlow(
  { 'aria-label': label, items, index, onIndexChange },
  ref,
) {
  const [own, setOwn] = useState(Math.floor(items.length / 2));
  const reduce = useReducedMotion();
  const current = index ?? own;
  const go = (next: number) => {
    const to = Math.max(0, Math.min(items.length - 1, next));
    if (index === undefined) setOwn(to);
    onIndexChange?.(to);
  };
  const key = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(current - 1);
    else if (e.key === 'ArrowRight') go(current + 1);
    else return;
    e.preventDefault();
  };
  const t = reduce ? { duration: 0 } : transition('slow', 'settle');
  return (
    <div ref={ref} className="cui-cover-flow" role="group" aria-roledescription="carousel" aria-label={label} onKeyDown={key}>
      <div className="cui-cover-flow__stage">
        {items.map((item, i) => {
          const offset = i - current;
          const abs = Math.abs(offset);
          const on = offset === 0;
          return (
            <motion.div
              key={item.id}
              className="cui-cover-flow__card"
              role="group"
              aria-roledescription="slide"
              aria-label={`${item.label}, ${i + 1} of ${items.length}`}
              initial={false}
              animate={{
                x: offset * STEP,
                rotateY: reduce || on ? 0 : offset < 0 ? 38 : -38,
                z: reduce ? 0 : on ? 50 : -abs * 50,
                scale: on ? 1.1 : 1 - abs * 0.08,
                opacity: abs > 2 ? 0 : 1 - abs * 0.25,
              }}
              transition={t}
              style={{ zIndex: 100 - abs }}
              onClick={() => go(i)}
            >
              <span className="cui-card-surface cui-cover-flow__face">{item.content}</span>
              <motion.span className="cui-cover-flow__caption" initial={false} animate={{ opacity: on ? 1 : 0 }} transition={t}>
                {item.label}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
      <div className="cui-card-controls">
        <Button variant="secondary" size="sm" iconOnly icon={CaretLeft} aria-label="Previous card" disabled={current === 0} onClick={() => go(current - 1)} />
        <div className="cui-card-controls__dots">
          {items.map((item, i) => (
            <button key={item.id} type="button" className="cui-card-controls__dot" aria-label={`Go to ${item.label}`} aria-current={i === current ? 'true' : undefined} onClick={() => go(i)} />
          ))}
        </div>
        <Button variant="secondary" size="sm" iconOnly icon={CaretRight} aria-label="Next card" disabled={current === items.length - 1} onClick={() => go(current + 1)} />
      </div>
    </div>
  );
});
