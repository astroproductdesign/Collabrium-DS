import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

/**
 * Tones that components.css ships. DESIGN-SYSTEM.md also lists Info, which
 * has no CSS yet: TODO(open-question Q-BADGE-3).
 */
export type BadgeVariant = 'neutral' | 'success' | 'error' | 'warning' | 'selected';
/** Phosphor weight for the leading icon. */
export type BadgeIconWeight = 'regular' | 'fill';

type NativeSpanProps = WithoutStyling<Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'>>;

export interface BadgeProps extends NativeSpanProps {
  /**
   * The status or tone. Required, so every badge is a deliberate choice.
   * - `neutral`: a plain state with no tone (Draft, Expired, a count).
   * - `success`: done or healthy (Active, Approved).
   * - `error`: failed or blocked (Failed, Blocked).
   * - `warning`: needs attention soon (Pending, Out of date).
   * - `selected`: marks the chosen item in a set.
   */
  variant: BadgeVariant;
  /**
   * The label. 20 characters at most: the badge never wraps or truncates,
   * so rewrite a longer label. May include visually hidden text for
   * screen readers (e.g. "Highest" + " CTR in this comparison").
   */
  children: ReactNode;
  /** Optional Phosphor icon before the label, e.g. `CheckCircle`. Same colour as the text, sized to it. */
  icon?: Icon;
  /** Weight of the icon. `fill` (default) for status icons (Tier 2); `regular` only for a functional icon (Tier 1). */
  iconWeight?: BadgeIconWeight;
}

/**
 * Collabrium Badge. A small pill that shows the status or tone of
 * something: Live, Paused, Failed. Not interactive. Ported from
 * components.css `.c-badge`.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant, children, icon: LeadingIcon, iconWeight = 'fill', ...rest },
  ref,
) {
  return (
    <span {...rest} ref={ref} className="cui-badge" data-variant={variant}>
      {LeadingIcon && <LeadingIcon className="cui-badge__icon" weight={iconWeight} aria-hidden="true" focusable="false" />}
      {children}
    </span>
  );
});
