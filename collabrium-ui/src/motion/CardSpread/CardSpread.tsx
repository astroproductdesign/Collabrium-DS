'use client';

import { forwardRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { transition } from '../motion';
import type { CardItem } from '../lib/cards';

export type CardSpreadLayout = 'arc' | 'long-arc' | 'linear' | 'corner' | 'stamp' | 'cascade' | 'scatter' | 'wheel';

export interface CardSpreadProps {
  /** Names the stack for assistive technology, e.g. "Recent boards". */
  'aria-label': string;
  /** The cards, front to back. Five cards for every layout; `arc` also takes seven. Cards beyond the layout's count stay in the stack. */
  items: CardItem[];
  /** How the stack opens: `arc` fans the cards out along a curve; `long-arc` is a wider, flatter arc; `linear` slides them into a row; `corner` fans them from the bottom left corner; `stamp` throws the outer cards far to each side; `cascade` steps them up and across; `scatter` deals them out loosely; `wheel` turns them about a point below the stack. Default `arc`. */
  layout?: CardSpreadLayout;
  /** Forces the stack open or closed. Leave out to open it while the pointer is over it, or while it has focus. */
  open?: boolean;
}

interface Pose {
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

/** Where each card goes when the stack is open: a pose per card, by layout. Values are Amicro's, in px and degrees. */
function pose(layout: CardSpreadLayout, i: number, n: number): Pose {
  const center = (n - 1) / 2;
  const dist = i - center;
  const abs = Math.abs(dist);
  const lead = dist === 0 ? 1.05 : 1;
  const calm = dist === 0 ? 1.05 : 0.98;
  switch (layout) {
    case 'arc': {
      const seven = n >= 7;
      const yo = seven ? 30 : 10;
      const lift = seven ? [-0.5, -0.17, 0.33, 1][Math.min(abs, 3)] : [-1, -0.2, 1][Math.min(abs, 2)];
      return { x: dist * ((seven ? 110 : 70) / center), y: lift * yo, rotate: dist * ((seven ? 45 : 30) / center), scale: lead };
    }
    case 'long-arc':
      return { x: dist * 70, y: [-0.25, 0.25, 1][Math.min(abs, 2)] * 20, rotate: dist * 7.5, scale: lead };
    case 'linear':
      return { x: dist * 45, y: 0, rotate: 0, scale: lead };
    case 'corner':
      return { x: 0, y: 0, rotate: -10 + (i / Math.max(1, n - 1)) * 40, scale: i === 2 ? 1.03 : 1 };
    case 'stamp': {
      const arc = 25;
      const spread = 180;
      const yo = 40;
      const k = Math.max(-2, Math.min(2, dist));
      return { x: (k / 2) * spread, y: [-0.25, 0.25, 1][Math.min(Math.abs(k), 2)] * yo, rotate: (Math.abs(k) === 1 ? 0.48 : k === 0 ? 0 : 1) * Math.sign(k) * arc, scale: lead };
    }
    case 'cascade':
      return { x: dist * 14, y: dist * -28 - 14, rotate: dist * 6, scale: calm };
    case 'scatter': {
      const table = [
        { x: -75, y: 15, rotate: -14 },
        { x: -35, y: -15, rotate: -6 },
        { x: 0, y: -30, rotate: 2 },
        { x: 35, y: -10, rotate: 8 },
        { x: 75, y: 20, rotate: 15 },
      ];
      return { ...table[Math.min(i, 4)], scale: calm };
    }
    default:
      return { x: 0, y: [-28, -22, -8][Math.min(abs, 2)], rotate: dist * 18, scale: calm };
  }
}

/** The point each layout turns the cards about, as percentages of the card. */
const origin: Record<CardSpreadLayout, string> = {
  arc: '50% 100%',
  'long-arc': '50% 100%',
  linear: '50% 50%',
  corner: '0% 100%',
  stamp: '50% 50%',
  cascade: '50% 50%',
  scatter: '50% 50%',
  wheel: '50% 110%',
};

/**
 * A stack of cards that opens out when the pointer is over it, or it has
 * focus, and closes again when it leaves: eight layouts in one piece. The cards
 * settle with a tween over `--duration-slow` and `--ease-settle`. A tap opens
 * it on touch. Under reduced motion the cards move to their places at once.
 */
export const CardSpread = forwardRef<HTMLDivElement, CardSpreadProps>(function CardSpread(
  { 'aria-label': label, items, layout = 'arc', open },
  ref,
) {
  const [over, setOver] = useState(false);
  const reduce = useReducedMotion();
  const active = open ?? over;
  const count = layout === 'arc' && items.length >= 7 ? 7 : Math.min(items.length, 5);
  return (
    <div
      ref={ref}
      className="cui-card-spread"
      role="group"
      aria-label={label}
      tabIndex={0}
      onPointerEnter={e => e.pointerType === 'mouse' && setOver(true)}
      onPointerLeave={e => e.pointerType === 'mouse' && setOver(false)}
      onPointerDown={e => e.pointerType !== 'mouse' && setOver(o => !o)}
      onFocus={() => setOver(true)}
      onBlur={() => setOver(false)}
    >
      {items.slice(0, count).map((item, i) => {
        const p = active ? pose(layout, i, count) : { x: 0, y: layout === 'cascade' ? (i - (count - 1) / 2) * 2 : 0, rotate: 0, scale: 1 };
        const dist = Math.abs(i - (count - 1) / 2);
        return (
          <motion.div
            key={item.id}
            className="cui-card-spread__card"
            role="group"
            aria-label={item.label}
            initial={false}
            animate={{ x: p.x, y: p.y, rotate: p.rotate, scale: p.scale }}
            transition={reduce ? { duration: 0 } : transition('slow', 'settle')}
            style={{ zIndex: layout === 'corner' ? count - i : Math.ceil(count / 2) + 1 - Math.round(dist), transformOrigin: origin[layout] }}
          >
            {item.content}
          </motion.div>
        );
      })}
    </div>
  );
});
