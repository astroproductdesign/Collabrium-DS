'use client';

import { forwardRef, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react';
import type { Icon } from '@phosphor-icons/react';
import { tokens } from '../../tokens/tokens';

export interface DockItem {
  /** Keys the item. Unique within the list. */
  id: string;
  /** The item's name: read by assistive technology and shown as the tooltip. */
  label: string;
  /** The item's icon, as a Phosphor icon component. */
  icon: Icon;
}

export interface DockProps {
  /** Names the dock for assistive technology, e.g. "Apps". */
  'aria-label': string;
  /** The items, in order. */
  items: DockItem[];
  /** Called with the id of the item that was pressed. */
  onSelect?: (id: string) => void;
}

const REST: number = tokens.spacing[32];
const PEAK: number = tokens.spacing[48];
/** How far from an item's centre the mouse still enlarges it, in px. TODO(open-question Q-MOT-17): Amicro's 80px, no token. */
const REACH = 80;

function Tile({ item, mouseX, onSelect }: { item: DockItem; mouseX: MotionValue<number>; onSelect?: (id: string) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const distance = useTransform(mouseX, x => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - r.left - r.width / 2 : Infinity;
  });
  const target = useTransform(distance, [-REACH, 0, REACH], [REST, PEAK, REST]);
  const size = useSpring(target, { mass: 0.1, stiffness: 220, damping: 28 });
  const Glyph = item.icon;
  return (
    <motion.button ref={ref} type="button" className="cui-dock__item" title={item.label} aria-label={item.label} style={reduce ? { width: REST, height: REST } : { width: size, height: size }} onClick={() => onSelect?.(item.id)}>
      <Glyph size={20} aria-hidden="true" />
    </motion.button>
  );
}

/**
 * A row of icon buttons that swell as the mouse passes over them, the nearest
 * most, and settle back when it leaves. The spring is overdamped, so it never
 * overshoots. Touch, keyboard and reduced motion see the plain row: the
 * buttons are the same size and work the same.
 */
export const Dock = forwardRef<HTMLDivElement, DockProps>(function Dock({ 'aria-label': label, items, onSelect }, ref) {
  const mouseX = useMotionValue(Infinity);
  return (
    <div
      ref={ref}
      className="cui-dock"
      role="group"
      aria-label={label}
      onPointerMove={e => e.pointerType === 'mouse' && mouseX.set(e.clientX)}
      onPointerLeave={() => mouseX.set(Infinity)}
    >
      {items.map(item => (
        <Tile key={item.id} item={item} mouseX={mouseX} onSelect={onSelect} />
      ))}
    </div>
  );
});
