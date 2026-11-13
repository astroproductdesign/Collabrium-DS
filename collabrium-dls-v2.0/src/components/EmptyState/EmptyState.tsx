import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';

/**
 * Where the empty state sits.
 * - `fullpage`: the whole page has nothing yet (first visit, onboarding). 64px icon, fills the viewport.
 * - `section`: one part of a page has nothing (a table with no rows, a card with no data). 48px icon, at least 240px tall.
 * - `inline`: a search or filter found nothing. Body text and a link only, no icon or heading.
 */
export type EmptyStateVariant = 'fullpage' | 'section' | 'inline';

/**
 * What the state means. Passed explicitly: the component never works it out from a failure.
 * - `empty`: no data exists yet. The icon is Neutral-4.
 * - `error`: the data failed to load. Same layout, the icon turns Red.
 */
export type EmptyStateTone = 'empty' | 'error';

/** The heading level. The look is always h4; the level follows the page's outline. */
export type EmptyStateHeadingLevel = 2 | 3 | 4 | 5 | 6;

/** One action button. */
export interface EmptyStateAction {
  /** The button's label: what it does ("Connect a source", "Retry"). */
  label: string;
  /** Called when the person presses it. */
  onClick: () => void;
  /** Optional Phosphor icon before the label, e.g. `Plus` (Tier 1, Regular). */
  icon?: Icon;
  /** Shows the button's spinner while the action runs (a Retry in progress). */
  loading?: boolean;
}

/** The inline variant's text link. */
export interface EmptyStateLinkAction {
  /** The link's label: what it does ("Clear filters"). */
  label: string;
  /** Called when the person presses it. */
  onClick: () => void;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'>>;

interface BlockEmptyStateProps extends NativeDivProps {
  /** `fullpage` when the whole page is empty; `section` when one part of it is. */
  variant: 'fullpage' | 'section';
  /** `error` when the data failed to load; never show `empty` over a broken fetch. Default `empty`. */
  tone?: EmptyStateTone;
  /** The picture above the heading, as a Phosphor component (`icon={CloudSlash}`). Drawn Fill (Tier 2). */
  icon?: Icon;
  /** Names what is absent ("No campaigns yet"), or, for `error`, the content that failed to load. */
  heading?: ReactNode;
  /** The heading level, 2 to 6. The look is always h4. Default 3. */
  headingLevel?: EmptyStateHeadingLevel;
  /**
   * The body: why it is empty and how to resolve it, or for `error`, what happened and what to try. Leave it out only
   * where the DLS draws an icon and heading alone (Price summary card's "No items added").
   */
  children?: ReactNode;
  /** The main action: Primary. A creation action for `empty`, Retry for `error`. */
  primaryAction?: EmptyStateAction;
  /**
   * A second, lower-commitment action: Ghost. "Contact support" for `error`. On its own (no `primaryAction`) when
   * the resolution is optional or exploratory ("Browse templates").
   */
  secondaryAction?: EmptyStateAction;
  linkAction?: never;
}

interface InlineEmptyStateProps extends NativeDivProps {
  /** A search, filter or dropdown found nothing. */
  variant: 'inline';
  /** The body: what found nothing and what to change ("No campaigns match 'Q5'"). */
  children: ReactNode;
  /** An optional text link ("Clear filters"). Never a Primary or Ghost button. */
  linkAction?: EmptyStateLinkAction;
  tone?: never;
  icon?: never;
  heading?: never;
  headingLevel?: never;
  primaryAction?: never;
  secondaryAction?: never;
}

export type EmptyStateProps = BlockEmptyStateProps | InlineEmptyStateProps;

/** Every prop of either shape, for reading them in one place. */
interface AnyEmptyStateProps extends NativeDivProps {
  variant: EmptyStateVariant;
  tone?: EmptyStateTone;
  icon?: Icon;
  heading?: ReactNode;
  headingLevel?: EmptyStateHeadingLevel;
  children?: ReactNode;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  linkAction?: EmptyStateLinkAction;
}

/**
 * Collabrium Empty state: what a page, a section or a search shows when it has nothing to show, and, with
 * `tone="error"`, when its data failed to load. Icon, heading, body and up to two actions, centred. Ported from
 * components.css `.c-empty` (2616–2653).
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(props, ref) {
  const {
    variant,
    tone = 'empty',
    icon: StateIcon,
    heading,
    headingLevel = 3,
    children,
    primaryAction,
    secondaryAction,
    linkAction,
    ...rest
  } = props as AnyEmptyStateProps;
  const Heading = `h${headingLevel}` as 'h3';
  const inline = variant === 'inline';
  return (
    <div {...rest} ref={ref} className="cui-empty-state" data-variant={variant} data-tone={!inline && tone === 'error' ? 'error' : undefined}>
      {!inline && StateIcon && <StateIcon className="cui-empty-state__icon" weight="fill" aria-hidden="true" focusable="false" />}
      {!inline && heading && <Heading className="cui-empty-state__heading">{heading}</Heading>}
      {children != null && <p className="cui-empty-state__body">{children}</p>}
      {!inline && (primaryAction || secondaryAction) && (
        <div className="cui-empty-state__actions">
          {primaryAction && (
            <Button variant="primary" leadingIcon={primaryAction.icon} loading={primaryAction.loading} onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" leadingIcon={secondaryAction.icon} loading={secondaryAction.loading} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
      {inline && linkAction && (
        <button type="button" className="cui-empty-state__link" onClick={linkAction.onClick}>
          {linkAction.label}
        </button>
      )}
    </div>
  );
});
