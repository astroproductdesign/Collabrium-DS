import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

/**
 * Who owns the thing being labelled. The five elements each take their own tint, text and dot colour; `purple` is
 * the one tag that isn't an element (a category with no department behind it); `neutral` is a plain label with no
 * dot (Profile card's KOC and Seeder tiers).
 */
export type TagVariant = 'neutral' | 'fire' | 'wood' | 'earth' | 'water' | 'gold' | 'purple';
/** Phosphor weight for the leading icon. */
export type TagIconWeight = 'regular' | 'fill';

type NativeSpanProps = WithoutStyling<Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'>>;

export interface TagProps extends NativeSpanProps {
  /**
   * The owner. Required, so every tag is a deliberate choice.
   * - `fire`, `wood`, `earth`, `water`, `gold`: the element (department) that owns it, e.g. "Fire · Marketing".
   * - `purple`: a category with no department behind it (a Media Ad family such as "Display").
   * - `neutral`: a plain label with no dot and no owner colour.
   */
  variant: TagVariant;
  /**
   * The label. 24 characters at most: the tag never truncates, so rewrite a longer label. May include visually
   * hidden text for screen readers.
   */
  children: ReactNode;
  /**
   * Optional Phosphor icon at the start, e.g. the element's motif (`Flame`, `Drop`). Shown in place of the dot
   * (decided 2026-11-04, Q-TAG-1), in the text colour, 14px.
   */
  icon?: Icon;
  /** Weight of the icon. `fill` (default) for an element motif (Tier 2); `regular` only for a functional icon (Tier 1). */
  iconWeight?: TagIconWeight;
}

/**
 * Collabrium Tag. A small pill that says which element (department) owns something: Fire · Marketing,
 * Water · Data. Not a status (that is Badge) and not interactive. Ported from components.css `.c-tag` (1650–1663).
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { variant, children, icon: LeadingIcon, iconWeight = 'fill', ...rest },
  ref,
) {
  return (
    <span {...rest} ref={ref} className="cui-tag" data-variant={variant}>
      {LeadingIcon ? (
        <LeadingIcon className="cui-tag__icon" weight={iconWeight} aria-hidden="true" focusable="false" />
      ) : (
        variant !== 'neutral' && <span className="cui-tag__dot" aria-hidden="true" />
      )}
      {children}
    </span>
  );
});
