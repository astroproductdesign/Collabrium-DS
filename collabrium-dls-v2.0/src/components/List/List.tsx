import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ChangeEvent,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
// Server component: icons come from Phosphor's server-safe entry (its main entry needs a client context).
import { ArrowClockwise, CaretRight, Check, ClockCounterClockwise, Minus, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';
import { Button } from '../Button';
import type { WithoutStyling } from '../../utils/types';

/* ------------------------------------------------------------------ List */

/** Leading size, one per list (the DS: never mix leading sizes in one list). S 24, M 32, L 48. */
export type ListLeadingSize = 's' | 'm' | 'l';

type NativeListProps = WithoutStyling<Omit<HTMLAttributes<HTMLUListElement>, 'children' | 'role'>>;

interface ListBase extends NativeListProps {
  /** The rows: `ListItem` and `ListItemSkeleton`. */
  children: ReactNode;
  /** Leading size for every row: S 24, M 32 (default), L 48. One size per list; the skeleton and timeline follow it. */
  leadingSize?: ListLeadingSize;
  /** Dividers between rows. On by default; turn them off for a list that reads as one block. The timeline turns them off. */
  dividers?: boolean;
  /** Activity Log only: a line through the leading elements, row to row. Turns the dividers off. */
  timeline?: boolean;
  /** On the page, not in a card: pulls the list out 16px so row content lines up with the page text, and rounds the row fills. */
  bleed?: boolean;
  /**
   * The rows are skeletons while the list loads. Sets `aria-busy` and gives screen readers one hidden line of text
   * (`busyLabel`). Put `ListItemSkeleton` rows in it meanwhile.
   */
  busy?: boolean;
  /** The hidden loading text while `busy`, such as "Loading activity". Default "Loading…". */
  busyLabel?: string;
}

/** Name the list by its visible heading (`aria-labelledby`), or with `aria-label` only when there is no visible heading. */
export type ListProps = ListBase &
  ({ 'aria-labelledby': string; 'aria-label'?: never } | { 'aria-label': string; 'aria-labelledby'?: never } | { 'aria-label'?: undefined; 'aria-labelledby'?: undefined });

/**
 * Collabrium List: a vertical run of same-shaped rows (`ListItem`), with a divider between them. Stat lists,
 * navigation rows and activity logs are presets of the one row. Name it by its visible heading. Ported from
 * components.css `.c-list` (6106–6363).
 */
export const List = forwardRef<HTMLUListElement, ListProps>(function List(
  { children, leadingSize = 'm', dividers = true, timeline = false, bleed = false, busy = false, busyLabel = 'Loading…', ...rest },
  ref,
) {
  return (
    <ul
      {...rest}
      ref={ref}
      role="list"
      className="cui-list"
      data-leading-size={leadingSize === 'm' ? undefined : leadingSize}
      data-dividers={dividers ? undefined : 'off'}
      data-timeline={timeline ? '' : undefined}
      data-bleed={bleed ? '' : undefined}
      aria-busy={busy || undefined}
    >
      {busy && <li className="cui-list__sr">{busyLabel}</li>}
      {children}
    </ul>
  );
});

/* ------------------------------------------------------------------ ListItem */

/** The leading element. Always decorative: the heading names the row. */
export type ListLeading =
  /** A Phosphor icon on a Neutral-2 chip, drawn Fill (Tier 2). */
  | { type: 'icon'; icon: Icon }
  /** A person: initials, or a photo cropped round over them. */
  | { type: 'avatar'; initials: string; src?: string }
  /** An image cropped to fill. */
  | { type: 'thumbnail'; src: string }
  /** A brand: its logo contained on white, or initials. */
  | { type: 'logo'; initials?: string; src?: string };

/** A caption's status dot. It never carries meaning alone: the caption text must say the status. */
export type ListCaptionStatus = 'neutral' | 'success' | 'warning' | 'error' | 'info';

/** A control row's control: the whole row toggles it. */
export interface ListControl {
  /** A checkbox, or a switch (an on/off setting that applies at once). */
  type: 'checkbox' | 'switch';
  /** Checked, when you control it. Pair it with `onCheckedChange`. */
  checked?: boolean;
  /** Checked on first render, when you don't control it. */
  defaultChecked?: boolean;
  /** Called with the new value when the row is toggled. */
  onCheckedChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  /** The row can't be toggled: text goes Neutral-4, the leading and control fade to 40%. */
  disabled?: boolean;
  /** Form field name. */
  name?: string;
  /** Form field value when checked. */
  value?: string;
}

interface ListItemContent {
  /** The main label: names and items. Required. */
  heading: ReactNode;
  /** A sentence heading in regular weight, with names and items wrapped in `<b>` (the Activity Log). */
  headingRich?: boolean;
  /** How many lines the heading may take before "…". Default 1; Activity Log sentences take 2. */
  headingLines?: 1 | 2;
  /** Supporting detail under the heading, Neutral-5. */
  description?: ReactNode;
  /** How many lines the description may take before "…". Default 1. */
  descriptionLines?: 1 | 2;
  /** Meta on one line: a timestamp ("2h ago", or "12 Oct, 3:40pm" past 24h), an author, a status. Never in trailing. */
  caption?: ReactNode;
  /** An icon before the caption (Phosphor, drawn Fill), such as `Clock`. Use this or `captionStatus`, not both. */
  captionIcon?: Icon;
  /** A 6px status dot before the caption. The caption text must also say the status. */
  captionStatus?: ListCaptionStatus;
  /** The leading element. Leave it out for none. */
  leading?: ListLeading;
  /** A number or status, right-aligned in tabular figures. Screen readers hear it right after the heading. */
  value?: string;
  /** `large` is the Stat preset's h4 value. */
  valueSize?: 'default' | 'large';
  /** A status pill: a `Badge`. Can pair with the chevron. */
  badge?: ReactElement;
}

type AnchorRest = WithoutStyling<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'color'>>;
type ButtonRest = WithoutStyling<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type' | 'color' | 'value'>>;
type DivRest = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'onClick'>>;
type LabelRest = WithoutStyling<Omit<HTMLAttributes<HTMLLabelElement>, 'children' | 'color' | 'onClick'>>;
type Current = boolean | 'page' | 'step' | 'location' | 'true';

/** Opens a page: an `<a href>`. The only row that may show a chevron. Never disabled. */
interface LinkRow extends ListItemContent, AnchorRest {
  href: string;
  /** The ›, for a row that opens a new page. Moves 4px on hover and focus. */
  chevron?: boolean;
  /** The open item in a list/detail layout only. Never for a toggle. */
  current?: Current;
  control?: never;
  action?: never;
  disabled?: never;
}
/** Acts in place (opens a panel or a sheet): a `<button>`. No chevron. */
interface ButtonRow extends ListItemContent, ButtonRest {
  onClick: NonNullable<ButtonRest['onClick']>;
  href?: never;
  chevron?: never;
  /** The open item in a list/detail layout only. Never for a toggle. */
  current?: Current;
  /** The row can't be used now. */
  disabled?: boolean;
  control?: never;
  action?: never;
}
/** A control row: a `<label>`; the whole row toggles its checkbox or switch. Never also clickable. */
interface ControlRow extends ListItemContent, LabelRest {
  control: ListControl;
  href?: never;
  chevron?: never;
  current?: never;
  disabled?: never;
  action?: never;
  badge?: never;
  value?: never;
}
/** Static: a `<div>`, no hover, focus or press. A trailing button (Secondary sm, or Ghost sm icon-only "more") is its only target. */
interface StaticRow extends ListItemContent, DivRest {
  /** A `Button`, Secondary sm or a Ghost sm icon-only "more". The row stays static; the button is the only target. */
  action?: ReactElement;
  href?: never;
  chevron?: never;
  current?: never;
  disabled?: never;
  control?: never;
}

/** The row's element follows what it does: `href` opens a page, `onClick` acts in place, `control` toggles, none is static. */
export type ListItemProps = LinkRow | ButtonRow | ControlRow | StaticRow;

const sr = (text: ReactNode) => <span className="cui-list__sr">{text}</span>;

function Leading({ leading }: { leading: ListLeading }) {
  const img = (src: string) => <img src={src} alt="" />;
  let inner: ReactNode;
  if (leading.type === 'icon') {
    const LeadIcon = leading.icon;
    inner = <LeadIcon className="cui-list-item__lead-icon" weight="fill" focusable="false" />;
  } else if (leading.type === 'avatar') {
    inner = leading.src ? img(leading.src) : leading.initials;
  } else if (leading.type === 'thumbnail') {
    inner = img(leading.src);
  } else {
    inner = leading.src ? img(leading.src) : leading.initials;
  }
  return (
    <span className="cui-list-item__lead" data-type={leading.type} aria-hidden="true">
      {inner}
    </span>
  );
}

function Control({ control }: { control: ListControl }) {
  const { type, checked, defaultChecked, onCheckedChange, disabled, name, value } = control;
  const input = (
    <input
      type="checkbox"
      role={type === 'switch' ? 'switch' : undefined}
      className={`cui-list-item__input ${type === 'switch' ? 'cui-switch__input' : 'cui-checkbox__input'}`}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onCheckedChange ? (e) => onCheckedChange(e.target.checked, e) : undefined}
      disabled={disabled}
      name={name}
      value={value}
    />
  );
  if (type === 'switch') {
    return (
      <span className="cui-list-item__control cui-switch">
        {input}
        <span className="cui-switch__track" aria-hidden="true">
          <span className="cui-switch__thumb" />
        </span>
      </span>
    );
  }
  return (
    <span className="cui-list-item__control cui-checkbox">
      {input}
      <span className="cui-checkbox__box" aria-hidden="true">
        <Check className="cui-checkbox__glyph cui-checkbox__check" weight="regular" focusable="false" />
        <Minus className="cui-checkbox__glyph cui-checkbox__minus" weight="regular" focusable="false" />
      </span>
    </span>
  );
}

/**
 * Collabrium List item: one row with three slots, Leading, Content (heading, description, caption) and Trailing
 * (value, badge, chevron, control or a button). Its element follows what it does. Ported from components.css
 * `.c-list-item` (6106–6363).
 */
export const ListItem = forwardRef<HTMLElement, ListItemProps>(function ListItem(props, ref) {
  const {
    heading,
    headingRich,
    headingLines = 1,
    description,
    descriptionLines = 1,
    caption,
    captionIcon: CaptionIcon,
    captionStatus,
    leading,
    value,
    valueSize = 'default',
    badge,
    chevron,
    current,
    control,
    action,
    ...rest
  } = props as ListItemContent & {
    chevron?: boolean;
    current?: Current;
    control?: ListControl;
    action?: ReactElement;
    href?: string;
    onClick?: unknown;
  } & Record<string, unknown>;

  const kind: 'link' | 'button' | 'control' | 'static' =
    rest.href !== undefined ? 'link' : control ? 'control' : rest.onClick ? 'button' : 'static';
  const showChevron = kind === 'link' && chevron;
  const hasTrailing = value !== undefined || badge || showChevron || control || action;

  const body = (
    <>
      {leading && <Leading leading={leading} />}
      <span className="cui-list-item__content">
        <span
          className="cui-list-item__heading"
          data-rich={headingRich ? '' : undefined}
          data-lines={headingLines === 2 ? '2' : undefined}
        >
          {heading}
        </span>
        {value !== undefined && sr(`, ${value}`)}
        {description !== undefined && description !== null && description !== '' && (
          <>
            {sr(', ')}
            <span className="cui-list-item__desc" data-lines={descriptionLines === 2 ? '2' : undefined}>
              {description}
            </span>
          </>
        )}
        {caption !== undefined && caption !== null && caption !== '' && (
          <>
            {sr(', ')}
            <span className="cui-list-item__caption">
              {CaptionIcon ? (
                <CaptionIcon className="cui-list-item__caption-icon" weight="fill" aria-hidden="true" focusable="false" />
              ) : captionStatus ? (
                <span className="cui-list-item__dot" data-status={captionStatus === 'neutral' ? undefined : captionStatus} aria-hidden="true" />
              ) : null}
              <span className="cui-list-item__caption-text">{caption}</span>
            </span>
          </>
        )}
      </span>
      {badge && sr(', ')}
      {hasTrailing && (
        <span className="cui-list-item__trailing">
          {value !== undefined && (
            <span className="cui-list-item__value" data-size={valueSize === 'large' ? 'large' : undefined} aria-hidden="true">
              {value}
            </span>
          )}
          {badge}
          {control && <Control control={control} />}
          {action}
          {showChevron && <CaretRight className="cui-list-item__chevron" aria-hidden="true" focusable="false" />}
        </span>
      )}
    </>
  );

  const currentAttr = current === true ? 'true' : current || undefined;
  if (kind === 'link') {
    return (
      <li>
        <a {...(rest as AnchorRest)} ref={ref as Ref<HTMLAnchorElement>} className="cui-list-item" aria-current={currentAttr}>
          {body}
        </a>
      </li>
    );
  }
  if (kind === 'button') {
    return (
      <li>
        <button {...(rest as ButtonRest)} ref={ref as Ref<HTMLButtonElement>} type="button" className="cui-list-item" aria-current={currentAttr}>
          {body}
        </button>
      </li>
    );
  }
  if (kind === 'control') {
    return (
      <li>
        <label {...(rest as LabelRest)} ref={ref as Ref<HTMLLabelElement>} className="cui-list-item">
          {body}
        </label>
      </li>
    );
  }
  return (
    <li>
      <div {...(rest as DivRest)} ref={ref as Ref<HTMLDivElement>} className="cui-list-item">
        {body}
      </div>
    </li>
  );
});

/* ------------------------------------------------------------------ ListItemSkeleton */

export interface ListItemSkeletonProps {
  /** The leading bone's shape: `square` follows the leading corners, `round` for avatars, `none` for no leading. */
  leading?: 'square' | 'round' | 'none';
  /** A bone for a trailing value. */
  value?: boolean;
}

/**
 * A loading row, the same height as a loaded heading + caption row, so nothing jumps. Hidden from screen readers:
 * set the List's `busy` instead. The shimmer stops under reduced motion.
 */
export function ListItemSkeleton({ leading = 'square', value = false }: ListItemSkeletonProps) {
  return (
    <li aria-hidden="true">
      <div className="cui-list-item" data-loading="">
        {leading !== 'none' && <span className="cui-list-item__bone" data-part="lead" data-round={leading === 'round' ? '' : undefined} />}
        <span className="cui-list-item__content">
          <span className="cui-list-item__bone" data-part="heading" />
          <span className="cui-list-item__bone" data-part="line" />
        </span>
        {value && <span className="cui-list-item__bone" data-part="value" />}
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ ListSection */

export interface ListSectionProps {
  /** The section header's text: "Today", "Yesterday" or a date ("12 Oct 2026"). */
  title: ReactNode;
  /** The heading level that fits the page. Default 3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Uppercase with eyebrow tracking. */
  uppercase?: boolean;
  /** The header sticks to the top of its scroller until the next section pushes it off. */
  sticky?: boolean;
  /** What sits behind a sticky header: `default` Neutral-1 (a card), `canvas` Canvas warm (the page). */
  surface?: 'default' | 'canvas';
  /** On the page, not in a card: lines the header's text up with the page text, as the List's `bleed`. */
  bleed?: boolean;
  /** The `List` it heads (and its states, if any). The List is labelled by this header automatically. */
  children: ReactNode;
}

/**
 * A Section header and the list it groups (an Activity Log's day). The header is a real heading, and the list is
 * labelled by it. Wrapping both in one element lets the next day's sticky header push this one off.
 */
export function ListSection({ title, headingLevel = 3, uppercase, sticky, surface = 'default', bleed, children }: ListSectionProps) {
  const id = useId();
  const Heading = `h${headingLevel}` as const;
  return (
    <div className="cui-list-section">
      <Heading
        id={id}
        className="cui-list-subheader"
        data-upper={uppercase ? '' : undefined}
        data-sticky={sticky ? '' : undefined}
        data-surface={sticky && surface === 'canvas' ? 'canvas' : undefined}
        data-bleed={bleed ? '' : undefined}
      >
        {title}
      </Heading>
      {Children.map(children, (child) =>
        isValidElement<ListProps>(child) && child.type === List && !child.props['aria-label'] && !child.props['aria-labelledby']
          ? cloneElement(child, { 'aria-labelledby': id } as Partial<ListProps>)
          : child,
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ List states */

export interface ListEmptyProps {
  /** "No activity yet". */
  title: ReactNode;
  /** One line on what will appear here and when. */
  hint?: ReactNode;
  /** A Phosphor icon, drawn Fill. Default `ClockCounterClockwise` (the Activity Log's). */
  icon?: Icon;
}

/** An empty list (Activity Log): an icon, a title and a hint, centred. Swap it in for the List; focus stays where it was. */
export function ListEmpty({ title, hint, icon: EmptyIcon = ClockCounterClockwise }: ListEmptyProps) {
  return (
    <div className="cui-list-state" data-kind="empty">
      <EmptyIcon className="cui-list-state__icon" weight="fill" aria-hidden="true" focusable="false" />
      <p className="cui-list-state__title">{title}</p>
      {hint && <p className="cui-list-state__hint">{hint}</p>}
    </div>
  );
}

export interface ListErrorProps {
  /** "Couldn't load activity". */
  title: ReactNode;
  /** What to try. */
  hint?: ReactNode;
  /** Retries the load. */
  onRetry: () => void;
  /** The retry button's label. Default "Retry". */
  retryLabel?: string;
}

/** A list that failed to load: a Red icon (never red text), the title, a hint and a Retry button. Swapped in place. */
export function ListError({ title, hint, onRetry, retryLabel = 'Retry' }: ListErrorProps) {
  return (
    <div className="cui-list-state" data-kind="error">
      <WarningCircle className="cui-list-state__icon" weight="fill" aria-hidden="true" focusable="false" />
      <p className="cui-list-state__title">{title}</p>
      {hint && <p className="cui-list-state__hint">{hint}</p>}
      <div className="cui-list-state__action">
        <Button variant="secondary" size="sm" leadingIcon={ArrowClockwise} onClick={onRetry}>
          {retryLabel}
        </Button>
      </div>
    </div>
  );
}

export interface ListFooterProps {
  /** One Button Ghost sm: "Load more", or "View all activity" with a trailing arrow. */
  children: ReactNode;
}

/** The row under a list for "Load more" or "View all", centred. */
export function ListFooter({ children }: ListFooterProps) {
  return <div className="cui-list-footer">{children}</div>;
}
