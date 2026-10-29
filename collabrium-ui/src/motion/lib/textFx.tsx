'use client';

import type { ReactNode } from 'react';

/**
 * What a split-text effect renders around its pieces: the full text for
 * assistive technology, and the moving pieces hidden from it, so a screen
 * reader reads the sentence once instead of letter by letter.
 */
export function SplitFrame({ text, className, children }: { text: string; className: string; children: ReactNode }) {
  return (
    <span className={className}>
      <span className="cui-motion-sr">{text}</span>
      <span aria-hidden="true" className="cui-motion-pieces">
        {children}
      </span>
    </span>
  );
}

/** Delay between neighbouring letters and words, in seconds. TODO(open-question Q-MOT-5): the DLS staggers (80ms, 120ms) are for rows, too slow for letters. */
export const charStagger = 0.02;
export const wordStagger = 0.04;
