'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { WithoutStyling } from '../../utils/types';

export type ButtonRowAlign = 'end' | 'start' | 'center' | 'split';

export interface ButtonRowProps extends WithoutStyling<HTMLAttributes<HTMLDivElement>> {
  /** The Buttons, in reading order: Secondary or Ghost first, Primary last. */
  children: ReactNode;
  /**
   * Where the row sits. `end` (default): right-aligned, for the end of a
   * form, panel or card. `split`: `leading` on the far left, the rest on the
   * right. `start` and `center` only where a component says so (a CTA under
   * its text, a centred block).
   */
  align?: ButtonRowAlign;
  /** With `align="split"`: the separate action (Delete, Back) on the far left. */
  leading?: ReactNode;
  /**
   * `phone` (default): at 640px and under, one full-width button per row,
   * Primary on top. `never`: the buttons keep their width.
   */
  stack?: 'phone' | 'never';
}

/**
 * Lays out a row of Buttons so a screen never does it by hand: 8px apart
 * (`--element-gap`), right-aligned by default, Primary last. It has no look
 * of its own. On a phone it stacks them full-width with Primary on top;
 * only the visual order flips, the tab order stays as written.
 */
export const ButtonRow = forwardRef<HTMLDivElement, ButtonRowProps>(function ButtonRow(
  { children, align = 'end', leading, stack = 'phone', ...rest },
  ref,
) {
  return (
    <div {...rest} ref={ref} className="cui-button-row" data-align={align} data-stack={stack}>
      {align === 'split' && leading ? <div className="cui-button-row__leading">{leading}</div> : null}
      {children}
    </div>
  );
});
