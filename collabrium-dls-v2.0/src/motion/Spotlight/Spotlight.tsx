'use client';

import { forwardRef, type ReactNode } from 'react';
import { accentValue, type AccentName } from '../lib/accent';

export interface SpotlightProps {
  /** The content the light moves across: a card, a button, anything. */
  children: ReactNode;
  /** The colour of the light: Obsidian or one of the seven series colours. Default `navy`. */
  glow?: AccentName;
  /** How wide the light is: `sm` (120px) for a button, `md` (180px), `lg` (250px) for a card. Default `md`. */
  size?: 'sm' | 'md' | 'lg';
  /** The corner radius the light is clipped to, so it matches the content: `sm`, `md`, `lg` or `pill`. Default `lg`. */
  radius?: 'sm' | 'md' | 'lg' | 'pill';
}

/**
 * A soft light that follows the pointer across its content and fades in when
 * the pointer enters. It sits over the content and takes no clicks. It has no
 * travel of its own, so reduced motion keeps it as it is.
 */
export const Spotlight = forwardRef<HTMLDivElement, SpotlightProps>(function Spotlight({ children, glow = 'navy', size = 'md', radius = 'lg' }, ref) {
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--cui-spot-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--cui-spot-y', `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      className="cui-spotlight"
      data-size={size}
      data-radius={radius}
      style={{ ['--cui-spot-color' as string]: accentValue(glow) }}
      onPointerMove={move}
      onPointerEnter={e => {
        move(e);
        e.currentTarget.dataset.active = '';
      }}
      onPointerLeave={e => {
        delete e.currentTarget.dataset.active;
      }}
    >
      {children}
      <span className="cui-spotlight__light" aria-hidden="true" />
    </div>
  );
});
