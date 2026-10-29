'use client';

import { forwardRef, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { duration } from '../motion';

export interface HoverCardItem {
  /** Keys the card. Unique within the list. */
  id: string;
  /** The card's heading. */
  title: string;
  /** One or two sentences under the heading. */
  description: string;
  /** Makes the whole card a link to this address. Leave out for a card that is not a link. */
  href?: string;
}

export interface HoverCardsProps {
  /** The cards, in order. They sit in a grid that fills the width. */
  items: HoverCardItem[];
}

/**
 * A grid of cards where one soft highlight glides from card to card under the
 * pointer (and to the focused card). Under reduced motion the highlight does
 * not travel: it fades in on the card instead.
 */
export const HoverCards = forwardRef<HTMLDivElement, HoverCardsProps>(function HoverCards({ items }, ref) {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const glideId = useId();
  return (
    <div ref={ref} className="cui-hovercards">
      {items.map(item => {
        const body = (
          <>
            <AnimatePresence>
              {active === item.id && (
                <motion.span
                  className="cui-hovercards__glide"
                  aria-hidden="true"
                  layoutId={reduce ? undefined : glideId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: duration.fast } }}
                  exit={{ opacity: 0, transition: { duration: duration.fast, delay: duration.instant } }}
                />
              )}
            </AnimatePresence>
            <span className="cui-hovercards__card">
              <span className="cui-hovercards__title">{item.title}</span>
              <span className="cui-hovercards__desc">{item.description}</span>
            </span>
          </>
        );
        const on = { onPointerEnter: () => setActive(item.id), onPointerLeave: () => setActive(null), onFocus: () => setActive(item.id), onBlur: () => setActive(null) };
        return item.href ? (
          <a key={item.id} className="cui-hovercards__item" href={item.href} {...on}>
            {body}
          </a>
        ) : (
          <div key={item.id} className="cui-hovercards__item" {...on}>
            {body}
          </div>
        );
      })}
    </div>
  );
});
