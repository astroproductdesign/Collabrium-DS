'use client';

import { forwardRef, useRef, type ReactNode } from 'react';
import { useInView } from 'motion/react';

export type MaskShape = 'circle' | 'wipe' | 'capsule';

export interface MaskRevealProps {
  /** The media to reveal: one `img`, `video` or `picture`. It fills the width. */
  children: ReactNode;
  /**
   * The shape it opens through: `circle` grows from the centre, `wipe` opens
   * from one side, `capsule` is a pill in the middle that opens out to the
   * frame. Default `circle`.
   */
  shape?: MaskShape;
  /** Where a `wipe` opens from: `left` (default), `right` or `below`. Other shapes ignore it. */
  from?: 'left' | 'right' | 'below';
}

/**
 * Reveals media through a moving shape, once, when 20% of it has scrolled into
 * view. The shape is a clip on the media, so the layout never moves. Under
 * reduced motion there is no shape: the media fades in.
 */
export const MaskReveal = forwardRef<HTMLDivElement, MaskRevealProps>(function MaskReveal(
  { children, shape = 'circle', from = 'left' },
  ref,
) {
  const box = useRef<HTMLDivElement | null>(null);
  const shown = useInView(box, { once: true, amount: 0.2 });
  const set = (el: HTMLDivElement | null) => {
    box.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };
  return (
    <div
      ref={set}
      className="cui-mask-reveal"
      data-shape={shape}
      data-from={shape === 'wipe' ? from : undefined}
      data-revealed={shown ? '' : undefined}
    >
      {children}
    </div>
  );
});
