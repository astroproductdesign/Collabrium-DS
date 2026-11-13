'use client';

import { forwardRef, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { transition } from '../motion';

export interface MediaBetweenTextProps {
  /** The text before the media. */
  firstText: string;
  /** The text after the media. */
  secondText: string;
  /** The media's address. */
  src: string;
  /** What the media shows, for people who cannot see it. Leave it empty (`""`) when it only decorates. */
  alt: string;
  /** `image` (default) or `video`. A video plays muted, looping and inline. */
  mediaType?: 'image' | 'video';
  /** What opens the gap: `hover` (default) while the pointer is over the text, or `view` once the text scrolls into view. */
  trigger?: 'hover' | 'view';
}

/**
 * A phrase with a picture that opens between its words: the gap widens to show
 * the media and the two halves of the text slide apart. Under reduced motion
 * the media is always shown and nothing moves.
 */
export const MediaBetweenText = forwardRef<HTMLSpanElement, MediaBetweenTextProps>(function MediaBetweenText(
  { firstText, secondText, src, alt, mediaType = 'image', trigger = 'hover' },
  ref,
) {
  const reduce = useReducedMotion();
  const own = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(own, { once: true, amount: 0.5 });
  const [over, setOver] = useState(false);
  const open = reduce || (trigger === 'view' ? inView : over);
  return (
    <span
      ref={el => {
        own.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className="cui-media-text"
      onPointerEnter={() => trigger === 'hover' && setOver(true)}
      onPointerLeave={() => trigger === 'hover' && setOver(false)}
    >
      <motion.span layout transition={transition('base', 'settle')}>
        {firstText}
      </motion.span>
      <motion.span
        className="cui-media-text__media"
        initial={false}
        animate={open ? { width: 'auto', opacity: 1 } : { width: 0, opacity: 0 }}
        transition={reduce ? { duration: 0 } : transition('base', 'settle')}
      >
        {mediaType === 'image' ? <img src={src} alt={alt} /> : <video src={src} autoPlay loop muted playsInline aria-label={alt || undefined} aria-hidden={alt ? undefined : true} />}
      </motion.span>
      <motion.span layout transition={transition('base', 'settle')}>
        {secondText}
      </motion.span>
    </span>
  );
});
