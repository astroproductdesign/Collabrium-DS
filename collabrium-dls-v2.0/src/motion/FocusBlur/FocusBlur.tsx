'use client';

import { forwardRef, type ReactNode } from 'react';

export interface FocusBlurProps {
  /** The items in the row, such as words or cards. Each direct child takes part. */
  children: ReactNode;
}

/**
 * A row where pointing at one item softens the others: they blur and fade
 * while it stays sharp. It is pure CSS (`:has`), so there is no script and
 * nothing to re-render. The softening is only a visual cue: all the text stays
 * in the page and readable by assistive technology.
 */
export const FocusBlur = forwardRef<HTMLDivElement, FocusBlurProps>(function FocusBlur({ children }, ref) {
  return (
    <div ref={ref} className="cui-focus-blur">
      {children}
    </div>
  );
});
