'use client';

import { forwardRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { transition } from '../motion';
import type { CardItem } from '../lib/cards';

export interface CardTimeMachineProps {
  /** Names the stack for assistive technology, e.g. "Releases". */
  'aria-label': string;
  /** The cards, front to back. Each card's `label` is also its mark on the scrubber, e.g. a date. */
  items: CardItem[];
  /** The index of the card in front. Leave out to let the stack keep it, starting with the first. */
  index?: number;
  /** Called with the index of the card that was chosen. */
  onIndexChange?: (index: number) => void;
}

/**
 * A deck that recedes into the distance with a scrubber beside it: choosing a
 * mark on the scrubber flies the cards in front of it up and away and brings
 * that card to the front. Each mark is a button; the short marks between them
 * are only for the pointer. Under reduced motion the cards swap at once.
 */
export const CardTimeMachine = forwardRef<HTMLDivElement, CardTimeMachineProps>(function CardTimeMachine(
  { 'aria-label': label, items, index, onIndexChange },
  ref,
) {
  const [own, setOwn] = useState(0);
  const [near, setNear] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const current = index ?? own;
  const go = (next: number) => {
    const to = Math.max(0, Math.min(items.length - 1, Math.round(next)));
    if (index === undefined) setOwn(to);
    onIndexChange?.(to);
  };
  const t = reduce ? { duration: 0 } : transition('slow', 'settle');
  /** The scrubber: a mark per card, and two short marks between each pair. */
  const marks = items.flatMap((item, i) => [
    { main: true, at: i, label: item.label },
    ...(i < items.length - 1 ? [{ main: false, at: i + 1 / 3, label: '' }, { main: false, at: i + 2 / 3, label: '' }] : []),
  ]);
  return (
    <div ref={ref} className="cui-time-machine" role="group" aria-label={label}>
      <div className="cui-time-machine__stage">
        {items.map((item, i) => {
          const offset = i - current;
          const past = offset < 0;
          return (
            <motion.div
              key={item.id}
              className="cui-time-machine__card"
              role="group"
              aria-label={item.label}
              aria-hidden={i === current ? undefined : true}
              inert={i === current ? undefined : true}
              initial={false}
              animate={{
                z: past ? 200 : -offset * 60,
                y: past ? 300 : -offset * 12,
                rotateX: past ? -20 : offset * 2,
                opacity: past ? 0 : 1 - Math.abs(offset) * 0.2,
                scale: past ? 1.3 : 1,
              }}
              transition={t}
              style={{ zIndex: items.length - i }}
            >
              <span className="cui-card-surface cui-time-machine__face">{item.content}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="cui-time-machine__scrubber" onPointerLeave={() => setNear(null)}>
        {marks.map(m =>
          m.main ? (
            <button
              key={`m${m.at}`}
              type="button"
              className="cui-time-machine__mark"
              data-current={current === m.at ? '' : undefined}
              data-near={near !== null && Math.abs(m.at - near) < 0.5 ? '' : undefined}
              aria-label={m.label}
              aria-current={current === m.at ? 'true' : undefined}
              onPointerEnter={() => setNear(m.at)}
              onFocus={() => setNear(m.at)}
              onClick={() => go(m.at)}
            >
              {near === m.at && <span className="cui-time-machine__tip" aria-hidden="true">{m.label}</span>}
              <span className="cui-time-machine__tick" aria-hidden="true" />
            </button>
          ) : (
            <span key={`s${m.at}`} className="cui-time-machine__sub" aria-hidden="true" data-near={near !== null && Math.abs(m.at - near) <= 0.5 ? '' : undefined} onPointerEnter={() => setNear(m.at)} onClick={() => go(m.at)} />
          ),
        )}
      </div>
    </div>
  );
});
