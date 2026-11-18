'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { WithoutStyling } from '../../utils/types';

export interface AiTargetProps extends WithoutStyling<HTMLAttributes<HTMLDivElement>> {
  /** The area CollabAI will change: a field, a paragraph, a card's body. */
  children: ReactNode;
  /**
   * True while CollabAI works on this area: it wears the AI gradient ring
   * and a 7% gradient tint, and is marked `aria-busy`. Set it together with
   * the AI Button's `loading`.
   */
  active?: boolean;
}

/**
 * Marks the area an AI Button will change. Pass its ref to the Button's
 * `aiTarget` so the sparkle flies here on click. At rest it adds nothing but
 * a transparent 2px edge, so lighting it up never shifts the layout.
 */
export const AiTarget = forwardRef<HTMLDivElement, AiTargetProps>(function AiTarget(
  { children, active = false, ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      className="cui-ai-target"
      data-active={active ? '' : undefined}
      aria-busy={active || undefined}
    >
      {children}
    </div>
  );
});
