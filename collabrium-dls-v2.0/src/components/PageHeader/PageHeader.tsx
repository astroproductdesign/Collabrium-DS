import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { WithoutStyling } from '../../utils/types';

export type PageHeaderHeadingLevel = 1 | 2 | 3;

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'>>;

export interface PageHeaderProps extends NativeDivProps {
  /** The page's title: one per view ("Campaign Dashboard"). */
  title: ReactNode;
  /** An optional line under the title: body2, Neutral-5. */
  subtitle?: ReactNode;
  /**
   * Optional page actions, right-aligned beside the title, 8px apart: real Buttons (and a period selector). Zero, one
   * or several; the row collapses when there are none.
   */
  actions?: ReactNode;
  /**
   * The title's heading level. Default 1, the page's own title. Use 2 or 3 only where the header titles a panel inside
   * a page that already has its h1. The look is always h1.
   */
  headingLevel?: PageHeaderHeadingLevel;
}

/**
 * Collabrium PageHeader: the page-level title block at the top of a view, flush in the layout with no fill, border or
 * padding of its own. A title, an optional subtitle and an optional row of actions on the right. A Back button, when
 * there is one, sits above it, never inside. Ported from components.css `.c-pageheader` (4427–4432).
 */
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { title, subtitle, actions, headingLevel = 1, ...rest },
  ref,
) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div {...rest} ref={ref} className="cui-page-header">
      <div className="cui-page-header__row">
        <div className="cui-page-header__text">
          <Heading className="cui-page-header__title">{title}</Heading>
          {subtitle && <p className="cui-page-header__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="cui-page-header__actions">{actions}</div>}
      </div>
    </div>
  );
});
