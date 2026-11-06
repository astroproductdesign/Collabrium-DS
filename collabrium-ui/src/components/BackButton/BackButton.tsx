import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type Ref } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

type LinkProps = WithoutStyling<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'color'>>;
type PressProps = WithoutStyling<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type' | 'color'>>;

interface BackButtonBase {
  /**
   * The immediate parent screen's name, in its own title casing ("Reports"). Never a generic "Back": at every depth it
   * names the one screen above this one. Past 40 characters it is cut with "…"; screen readers still hear all of it.
   */
  label: string;
}

/** The DS's cap on the visible label (decided 2026-11-06, Q-BACK-2). */
const MAX_LABEL = 40;

export type BackButtonProps =
  | (BackButtonBase & LinkProps & { href: string; onClick?: LinkProps['onClick'] })
  | (BackButtonBase & PressProps & { onClick: NonNullable<PressProps['onClick']>; href?: never });

/**
 * Collabrium Back button: the one control above a Level 2+ screen's page header that goes one level up, named for the
 * parent screen. Give it an `href` for a real link, or an `onClick` for a button. It renders its own row, 12px above the
 * page header. Ported from components.css `.c-back-button-row` / `.c-back-button` (4415–4420).
 */
export const BackButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, BackButtonProps>(function BackButton(props, ref) {
  const { label, ...props2 } = props as unknown as BackButtonBase & Record<string, unknown>;
  // Past 40 characters the visible label is cut with "…", counted in characters, not code units (decided Q-BACK-2).
  const chars = Array.from(label);
  const shown = chars.length > MAX_LABEL ? `${chars.slice(0, MAX_LABEL).join('').trimEnd()}…` : label;
  // Named "Back to {parent}", the full name, so a screen reader hears where it goes (decided 2026-11-06, Q-BACK-3).
  const rest = { 'aria-label': `Back to ${label}`, ...props2 };
  const content = (
    <>
      <ArrowLeft className="cui-back-button__icon" aria-hidden="true" focusable="false" />
      <span className="cui-back-button__label">{shown}</span>
    </>
  );
  return (
    <div className="cui-back-button-row">
      {'href' in rest && rest.href !== undefined ? (
        <a {...(rest as LinkProps)} ref={ref as Ref<HTMLAnchorElement>} className="cui-back-button">
          {content}
        </a>
      ) : (
        <button {...(rest as PressProps)} ref={ref as Ref<HTMLButtonElement>} type="button" className="cui-back-button">
          {content}
        </button>
      )}
    </div>
  );
});
