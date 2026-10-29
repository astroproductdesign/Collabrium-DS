'use client';

import { forwardRef, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { transition } from '../motion';
import type { CardItem } from '../lib/cards';

export interface CardCarouselProps {
  /** Names the carousel for assistive technology, e.g. "Trips". */
  'aria-label': string;
  /** The cards, in order. */
  items: CardItem[];
  /** The index of the card in front. Leave out to let the carousel keep it, starting in the middle. */
  index?: number;
  /** Called with the index of the card that was chosen. */
  onIndexChange?: (index: number) => void;
}

/** Width of one slide, in px. TODO(open-question Q-MOT-22): Amicro's 160px slide, 110px card and 180px height, no tokens. */
const SLIDE = 160;

/**
 * A row of cards that slides sideways, one card in front at a time. Pointing
 * at it fans the others: they turn and drop away from the front card. Previous
 * and Next buttons, a dot per card and the arrow keys change the card in front.
 * Under reduced motion the cards move to their places at once and do not fan.
 */
export const CardCarousel = forwardRef<HTMLDivElement, CardCarouselProps>(function CardCarousel(
  { 'aria-label': label, items, index, onIndexChange },
  ref,
) {
  const [own, setOwn] = useState(Math.floor(items.length / 2));
  const [over, setOver] = useState(false);
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
    <div ref={ref} className="cui-card-carousel" role="group" aria-roledescription="carousel" aria-label={label} onKeyDown={key} onPointerEnter={e => e.pointerType === 'mouse' && setOver(true)} onPointerLeave={() => setOver(false)}>
      <div className="cui-card-carousel__window" style={{ width: SLIDE }}>
        <motion.div className="cui-card-carousel__track" initial={false} animate={{ x: -current * SLIDE }} transition={t}>
          {items.map((item, i) => {
            const diff = i - current;
            const on = i === current;
            const fan = over && !reduce;
            return (
              <motion.div
                key={item.id}
                className="cui-card-carousel__slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${item.label}, ${i + 1} of ${items.length}`}
                aria-hidden={on ? undefined : true}
                inert={on ? undefined : true}
                style={{ width: SLIDE }}
                initial={false}
                animate={{ rotate: reduce ? 0 : diff * (fan ? 20 : 5), scale: on ? 1.05 : fan ? 0.65 : 0.8, y: fan ? diff * 24 : 0 }}
                transition={t}
              >
                <span className="cui-card-carousel__caption" data-on={on ? '' : undefined}>
                  {item.label}
                </span>
                <span className="cui-card-surface cui-card-carousel__card">{item.content}</span>
              </motion.div>
            );
          })}
        </motion.div>
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
