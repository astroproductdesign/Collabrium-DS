'use client';

import { forwardRef, useState, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { CheckCircle, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Checkbox } from '../Checkbox';

/**
 * The five elements that own content in the DLS, each with its colour: Fire
 * (Orange), Wood (Salmon Pink), Earth (Green), Water (Navy) and Gold (Amber).
 */
export type CardElement = 'fire' | 'wood' | 'earth' | 'water' | 'gold';

/** The heading level of a card title. The look is always h5; the level follows the page's outline. */
export type CardHeadingLevel = 2 | 3 | 4 | 5 | 6;

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'color'>>;

interface CardBaseProps extends NativeDivProps {
  /**
   * The fill. `default` is Neutral-1 with a 1px Neutral-3 border; `warm` is the warm canvas card fill with no border,
   * for a surface that blends into the page (a quote block, a featured figure). Default `default`.
   */
  surface?: 'default' | 'warm';
  /** A 3px top border in this element's colour, to say which department owns the card. The rest of the card stays neutral. */
  accent?: CardElement;
  /** Fills the whole card with this element's `-bg` tint. Use sparingly: an icon chip in the header is usually the better signal. */
  tint?: CardElement;
  /** The narrowest the card gets. `base` is 240px; `functional` is 280px, for a card that carries a list and a full-width button (the feature tile). Default `base`. */
  minWidth?: 'base' | 'functional';
  children?: ReactNode;
}

/** A card that cannot be ticked. */
interface PlainCardProps extends CardBaseProps {
  selectLabel?: undefined;
  selected?: never;
  defaultSelected?: never;
  onSelectedChange?: never;
}

/** A selectable card: a checkbox on the left, for a roster that a bulk action acts on. */
interface SelectableCardProps extends CardBaseProps {
  /**
   * Makes the card selectable, and names its checkbox for assistive technology: what ticking it selects, e.g.
   * "Select Q3 plan". Add it only when something else on the page (a bulk toolbar, a "Delete 3 selected" button) acts
   * on the ticked cards; a checkbox with nothing to feed is a dead control.
   */
  selectLabel: string;
  /** Whether the card is selected. Leave out to let the card keep its own state, starting from `defaultSelected`. */
  selected?: boolean;
  /** The starting state when `selected` is left out. Default false. */
  defaultSelected?: boolean;
  /** Called with the new state when the person ticks or unticks the card's checkbox. */
  onSelectedChange?: (selected: boolean) => void;
}

export type CardProps = PlainCardProps | SelectableCardProps;

/**
 * Collabrium Card: the base surface for grouping content: dashboard tiles, list items, panels. Ported from
 * components.css `.c-card`, `.c-card.warm`, `.c-card-accent`, `.c-card-interactive` and `.c-card-selectable`
 * (267–303). It is a plain box. To make the whole card clickable, give its `CardTitle` an `href` or an `onClick`.
 * To let people tick it, give it a `selectLabel`.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
  const { surface = 'default', accent, tint, minWidth = 'base', children, selectLabel, selected, defaultSelected = false, onSelectedChange, ...rest } = props as SelectableCardProps;
  const [own, setOwn] = useState(defaultSelected);
  const selectable = selectLabel !== undefined;
  const on = selected ?? own;
  return (
    <div
      {...rest}
      ref={ref}
      className="cui-card"
      data-surface={surface === 'warm' ? 'warm' : undefined}
      data-accent={accent}
      data-tint={tint}
      data-min-width={minWidth === 'functional' ? 'functional' : undefined}
      data-selectable={selectable ? '' : undefined}
      data-selected={selectable && on ? '' : undefined}
    >
      {selectable && (
        <span className="cui-card__select">
          <Checkbox
            aria-label={selectLabel}
            checked={on}
            onChange={event => {
              if (selected === undefined) setOwn(event.target.checked);
              onSelectedChange?.(event.target.checked);
            }}
          />
        </span>
      )}
      {children}
    </div>
  );
});

type LinkProps = WithoutStyling<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'color'>>;
type PressProps = WithoutStyling<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type' | 'color'>>;

interface TitleBase {
  /** The title text. */
  children: ReactNode;
  /** The heading level, 2 to 6. The look is always h5 (16px, 700). Default 3. */
  headingLevel?: CardHeadingLevel;
}

export type CardTitleProps =
  | (TitleBase & { href?: undefined; onClick?: undefined })
  | (TitleBase & LinkProps & { href: string; onClick?: never })
  | (TitleBase & PressProps & { onClick: NonNullable<PressProps['onClick']>; href?: never });

/**
 * The card's title, as a heading. Give it an `href` and it becomes a real link; give it an `onClick` and it becomes
 * a real button. Either way the link or button stretches over the whole card, so the card raises on hover, shows the
 * focus halo and is clickable anywhere, while any other buttons inside it stay separate and reachable.
 */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(props, ref) {
  const { children, headingLevel = 3, ...rest } = props as TitleBase & Record<string, unknown>;
  const Heading = `h${headingLevel}` as 'h3';
  let content: ReactNode = children;
  if ('href' in rest && rest.href !== undefined) {
    content = (
      <a {...(rest as LinkProps)} className="cui-card__action">
        {children}
      </a>
    );
  } else if ('onClick' in rest && rest.onClick !== undefined) {
    content = (
      <button {...(rest as PressProps)} type="button" className="cui-card__action">
        {children}
      </button>
    );
  }
  return (
    <Heading ref={ref} className="cui-card__title">
      {content}
    </Heading>
  );
});

export interface IconChipProps extends WithoutStyling<Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'>> {
  /** The icon, as a Phosphor component (`icon={Drop}`). It is drawn Fill, the DLS's weight for a department indicator. */
  icon: Icon;
  /** The element that owns the content: the chip takes its colour at 12%. Default `water`. */
  element?: CardElement;
}

/**
 * A 36×36 chip with an icon in the owning element's colour on a 12% tint of it: the DLS's one pattern for saying
 * which department owns a card. It is decorative (aria-hidden); the title beside it says the same in words. Ported
 * from components.css `.icon-chip` (it is shared with Stat / KPI card).
 */
export const IconChip = forwardRef<HTMLSpanElement, IconChipProps>(function IconChip({ icon: IconComponent, element = 'water', ...rest }, ref) {
  return (
    <span {...rest} ref={ref} className="cui-icon-chip" data-element={element} aria-hidden="true">
      <IconComponent weight="fill" />
    </span>
  );
});

export interface CardHeaderProps extends WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'>> {
  /** The title text. */
  title: ReactNode;
  /** An optional line under the title: caption, Neutral-5. */
  subtitle?: ReactNode;
  /** An icon for the icon chip, as a Phosphor component. Leave out for a header with no chip. */
  icon?: Icon;
  /** The element that owns the content, for the chip's colour. Default `water`. */
  element?: CardElement;
  /** The heading level of the title, 2 to 6. Default 3. */
  headingLevel?: CardHeadingLevel;
  /** Makes the whole card a link. See `CardTitle`. */
  href?: string;
  /** Makes the whole card a button. See `CardTitle`. */
  onTitleClick?: () => void;
}

/** The top of a card: an optional icon chip, then the title with an optional subtitle. 12px between them. */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { title, subtitle, icon, element, headingLevel, href, onTitleClick, ...rest },
  ref,
) {
  const titleProps = { headingLevel };
  return (
    <div {...rest} ref={ref} className="cui-card__header">
      {icon && <IconChip icon={icon} element={element} />}
      <div className="cui-card__heading">
        {href !== undefined ? (
          <CardTitle {...titleProps} href={href}>
            {title}
          </CardTitle>
        ) : onTitleClick ? (
          <CardTitle {...titleProps} onClick={onTitleClick}>
            {title}
          </CardTitle>
        ) : (
          <CardTitle {...titleProps}>{title}</CardTitle>
        )}
        {subtitle && <p className="cui-card__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
});

/** A distinct, bordered sub-part at the bottom of a card: caption type, Neutral-5. */
export const CardFooter = forwardRef<HTMLDivElement, NativeDivProps>(function CardFooter({ children, ...rest }, ref) {
  return (
    <div {...rest} ref={ref} className="cui-card__footer">
      {children}
    </div>
  );
});

export interface CardListProps extends WithoutStyling<Omit<HTMLAttributes<HTMLUListElement>, 'children' | 'color'>> {
  /** The points, one per line: short phrases of what the card offers. Three is the DLS's number. */
  items: ReactNode[];
}

/**
 * The list of points on a feature card: a check-circle (Fill, Obsidian) and a line of body2 text, centred on one
 * line, 8px apart. It takes the room left in the card, so a button after it sits at the bottom whatever the height
 * of the row. Ported from components.css `.c-card-usp-list`.
 */
export const CardList = forwardRef<HTMLUListElement, CardListProps>(function CardList({ items, ...rest }, ref) {
  return (
    <ul {...rest} ref={ref} className="cui-card__list">
      {items.map((item, i) => (
        <li key={i}>
          <CheckCircle weight="fill" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
});

export interface CardGridProps extends NativeDivProps {
  /**
   * The narrowest a column gets before the grid drops a column. `base` is 240px; `functional` is 280px, for cards
   * that need more room (USP, Price summary). In a row that mixes both, use the larger. Default `base`.
   */
  columns?: 'base' | 'functional';
  children?: ReactNode;
}

/**
 * The grid cards sit in: as many equal columns as fit, equal-height rows, 16px apart. The grid decides how many
 * columns there are, never the card. Ported from components.css `.c-cards` and `.c-cards-functional`.
 */
export const CardGrid = forwardRef<HTMLDivElement, CardGridProps>(function CardGrid({ columns = 'base', children, ...rest }, ref) {
  return (
    <div {...rest} ref={ref} className="cui-card-grid" data-columns={columns === 'functional' ? 'functional' : undefined}>
      {children}
    </div>
  );
});
