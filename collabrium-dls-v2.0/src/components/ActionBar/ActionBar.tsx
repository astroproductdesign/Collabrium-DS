'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { X, type Icon } from '@phosphor-icons/react';
import { Button } from '../Button';
import { profileInitials } from '../ProfileCard/ProfileCard';
import type { WithoutStyling } from '../../utils/types';

type NativeSectionProps = WithoutStyling<Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'>>;

/** One selected person (User select). */
export interface ActionBarPerson {
  id: string;
  /** Full name; the initials come from it unless `initials` is given. */
  name: string;
  initials?: string;
  /** A photo, drawn over the initials. */
  src?: string;
}

/** One pick (Item select). */
export interface ActionBarPick {
  id: string;
  /** The item's full name. Past 15 characters the chip shows the first 15 and "…"; the full name stays readable. */
  name: string;
}

/** A commit action: a real Button. */
export interface ActionBarAction {
  label: string;
  /** Leading Phosphor icon (Regular), shown on desktop only. */
  icon?: Icon;
  onClick: () => void;
  /**
   * Gated: below the variant's minimum. The button stays focusable (`aria-disabled`), ignores clicks and points at
   * the description, which should then give the reason ("Minimum 2 formats.").
   */
  disabled?: boolean;
}

/** The dismiss action (Ghost sm, first in the row). */
export interface ActionBarDismiss {
  /** Visible label: "Cancel" (User select), "Clear" (Item select). */
  label: string;
  /** Extra words for assistive tech only, read after the label: " selection", " all picks". */
  hiddenLabel?: string;
  onClick: () => void;
}

interface ActionBarBaseProps extends NativeSectionProps {
  /** Names the region ("Selected influencers"). Required. */
  'aria-label': string;
  /** Whether the bar shows: true while there's a selection. The host owns the selection. */
  open: boolean;
  /** "{n} {noun} selected", the count first so a cut only ever takes the noun. */
  title: string;
  /** One line under the title; below the minimum, the reason a gated action points at. */
  description: ReactNode;
  /** The title's heading level. Default 2 (the bar is a region of its own). */
  headingLevel?: 2 | 3 | 4;
  dismiss: ActionBarDismiss;
  /** The one Primary, last in the row. */
  primary: ActionBarAction;
  /**
   * Where focus goes when the bar hides (or its last pick is removed) while focus is inside it: the page's
   * heading for the list, as the DS's fallback heading.
   */
  fallbackFocusRef?: RefObject<HTMLElement | null>;
  /**
   * `fixed` (the default): floats at the bottom of the window, rendered at `<body>` level. `inline`: in the page's
   * flow, always shown, for a docs or design-review picture of the bar.
   */
  placement?: 'fixed' | 'inline';
}

export interface ActionBarUsersProps extends ActionBarBaseProps {
  /** User select: people chosen from Profile cards or a roster. Minimum 1. */
  variant: 'users';
  /** The selection, in order. Avatars: 4 then "+N" (2 on a phone); "99+" past 99. */
  people: ActionBarPerson[];
  /** "Save to a list": a Secondary between the dismiss and the Primary. */
  secondary?: ActionBarAction;
  /** The AI shimmer: for a selection the AI made or suggested. Never beside a plain bar on one page. */
  ai?: boolean;
  picks?: never;
  onRemovePick?: never;
}

export interface ActionBarPicksProps extends ActionBarBaseProps {
  /** Item select: items compared or collected by name. Minimum 2, maximum 4. */
  variant: 'picks';
  /** The picks, at most 4. */
  picks: ActionBarPick[];
  /** Called when a pick's × (or Delete / Backspace on it) removes it. Focus then moves to the title. */
  onRemovePick: (id: string) => void;
  people?: never;
  secondary?: never;
  ai?: never;
}

export type ActionBarProps = ActionBarUsersProps | ActionBarPicksProps;

/** Both variants' props at once, for reading them inside the component. */
type AnyActionBarProps = ActionBarBaseProps & {
  variant: 'users' | 'picks';
  people?: ActionBarPerson[];
  secondary?: ActionBarAction;
  ai?: boolean;
  picks?: ActionBarPick[];
  onRemovePick?: (id: string) => void;
};

/** The DS's character cut for a pick's name. */
const NAME_MAX = 15;
const cutName = (name: string) => {
  const chars = Array.from(name);
  return chars.length > NAME_MAX ? `${chars.slice(0, NAME_MAX).join('').trimEnd()}…` : name;
};
/** The container width at and under which the row becomes two rows and the commit buttons go sm. */
const NARROW = 640;

function Avatars({ people, max }: { people: ActionBarPerson[]; max: number }) {
  const shown = people.slice(0, max);
  const more = people.length - shown.length;
  return (
    <>
      {shown.map((p) => (
        <span key={p.id} className="cui-action-bar__avatar">
          {p.initials ?? profileInitials(p.name)}
          {p.src && <img src={p.src} alt="" />}
        </span>
      ))}
      {more > 0 && <span className="cui-action-bar__avatar">{more > 99 ? '99+' : `+${more}`}</span>}
    </>
  );
}

/**
 * Collabrium Action bar (Toolbar): floats at the bottom of the page while the reader has a selection, says how much
 * is selected and offers the actions for it. User select (an avatar stack) or Item select (removable chips, 2 to 4).
 * The host owns the selection.
 */
export const ActionBar = forwardRef<HTMLElement, ActionBarProps>(function ActionBar(props, ref) {
  const {
    variant,
    open,
    title,
    description,
    headingLevel = 2,
    dismiss,
    primary,
    fallbackFocusRef,
    placement = 'fixed',
    people: peopleProp,
    secondary,
    ai,
    picks: picksProp,
    onRemovePick,
    ...rest
  } = props as AnyActionBarProps;
  const people = peopleProp ?? [];
  const picks = picksProp ?? [];
  const fixed = placement === 'fixed';
  const shown = fixed ? open : true;
  const uid = useId();
  const descId = `${uid}-desc`;
  const Heading = `h${headingLevel}` as 'h2';

  const rootRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const setRoot = (el: HTMLElement | null) => {
    rootRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  // Rendered at <body> level once mounted (fixed placement), so no ancestor's transform or overflow can move it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Open on first render: a restored selection appears settled, with no entrance.
  const [instant, setInstant] = useState(fixed ? open : true);
  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
    return () => cancelAnimationFrame(id);
  }, [instant]);

  // The row's own width decides the phone layout and the commit buttons' size (a container, not the window).
  const [narrow, setNarrow] = useState(false);
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setNarrow(entry.contentRect.width <= NARROW));
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounted]);

  // ---- focus ----
  // A change made in the bar (a pick removed) moves focus to the title; the last one out, or the bar hiding with
  // focus inside it, moves it to the host's fallback heading. Changes from a card never move focus.
  const removedInBar = useRef(false);
  const count = variant === 'picks' ? picks.length : people.length;
  useLayoutEffect(() => {
    const root = rootRef.current;
    const inside = !!root && root.contains(document.activeElement);
    if (fixed && !open) {
      if (inside) fallbackFocusRef?.current?.focus();
      removedInBar.current = false;
      return;
    }
    if (removedInBar.current) {
      removedInBar.current = false;
      if (count === 0) fallbackFocusRef?.current?.focus();
      else titleRef.current?.focus();
    }
  }, [open, count, fixed, fallbackFocusRef]);

  const removePick = (id: string) => {
    removedInBar.current = true;
    onRemovePick?.(id);
  };
  const removeKey = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      removePick(id);
    }
  };

  // ---- clearance and lift (fixed only) ----
  // --cui-action-bar-clearance on <html>: the panel's height + its bottom offset + spacing-16 while open, 0 when
  // hidden (Back to top, Toast and the spacer read it). --cui-action-bar-lift on the bar: how far it rises to clear
  // a toast that overlaps the panel, plus spacing-12.
  useLayoutEffect(() => {
    if (!fixed || !mounted) return;
    const html = document.documentElement;
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return;
    if (!open) {
      html.style.setProperty('--cui-action-bar-clearance', '0px');
      root.style.setProperty('--cui-action-bar-lift', '0px');
      return;
    }
    const gap = () => parseFloat(getComputedStyle(html).getPropertyValue('--spacing-16')) || 16;
    const liftGap = () => parseFloat(getComputedStyle(html).getPropertyValue('--spacing-12')) || 12;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bottom = parseFloat(getComputedStyle(root).bottom) || 0;
        html.style.setProperty('--cui-action-bar-clearance', `${Math.ceil(panel.offsetHeight + bottom + gap())}px`);
        // The panel's resting place (without the lift), against every toast on screen.
        const lifted = parseFloat(root.style.getPropertyValue('--cui-action-bar-lift')) || 0;
        const r = panel.getBoundingClientRect();
        const restBottom = r.bottom + lifted;
        let lift = 0;
        document.querySelectorAll<HTMLElement>('.cui-toast-host .cui-toast').forEach((t) => {
          const tr = t.getBoundingClientRect();
          const across = tr.left < r.right && tr.right > r.left;
          const down = tr.top < restBottom && tr.bottom > r.top + lifted;
          if (across && down) lift = Math.max(lift, restBottom - tr.top + liftGap());
        });
        root.style.setProperty('--cui-action-bar-lift', `${Math.ceil(lift)}px`);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(panel);
    const mo = new MutationObserver(measure);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', measure);
      html.style.setProperty('--cui-action-bar-clearance', '0px');
    };
  }, [fixed, mounted, open]);

  const commitSize = narrow ? 'sm' : 'md';
  const gate = (a: ActionBarAction) => ({
    'aria-disabled': a.disabled ? true : undefined,
    'aria-describedby': a.disabled ? descId : undefined,
    onClick: () => {
      if (!a.disabled) a.onClick();
    },
  });

  const bar = (
    <section
      {...rest}
      ref={setRoot}
      className="cui-action-bar"
      data-variant={variant}
      data-placement={placement}
      data-open={shown ? '' : undefined}
      data-instant={instant ? '' : undefined}
      data-ai={variant === 'users' && ai ? '' : undefined}
    >
      <div ref={panelRef} className="cui-action-bar__panel">
        <div className="cui-action-bar__main">
          {variant === 'users' ? (
            <div className="cui-action-bar__stack" aria-hidden="true">
              <span className="cui-action-bar__wide">
                <Avatars people={people} max={4} />
              </span>
              <span className="cui-action-bar__narrow">
                <Avatars people={people} max={2} />
              </span>
            </div>
          ) : (
            <ul className="cui-action-bar__list" role="list">
              {picks.map((p) => {
                const cut = cutName(p.name);
                return (
                  <li key={p.id} className="cui-chip cui-action-bar__pick" data-kind="input">
                    <span className="cui-action-bar__name" title={p.name}>
                      {cut === p.name ? (
                        p.name
                      ) : (
                        <>
                          <span aria-hidden="true">{cut}</span>
                          <span className="cui-action-bar__sr">{p.name}</span>
                        </>
                      )}
                    </span>
                    <button
                      type="button"
                      className="cui-chip__remove"
                      aria-label={`Remove ${p.name}`}
                      onClick={() => removePick(p.id)}
                      onKeyDown={(e) => removeKey(e, p.id)}
                    >
                      <X weight="regular" aria-hidden="true" focusable="false" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="cui-action-bar__head">
            <Heading ref={titleRef} className="cui-action-bar__title" tabIndex={-1}>
              {title}
            </Heading>
            <p id={descId} className="cui-action-bar__desc">
              {description}
            </p>
          </div>
          <div className="cui-action-bar__actions">
            <span className="cui-action-bar__clear">
              <Button variant="ghost" size="sm" onClick={dismiss.onClick}>
                {dismiss.label}
                {dismiss.hiddenLabel && <span className="cui-action-bar__sr">{dismiss.hiddenLabel}</span>}
              </Button>
            </span>
            {variant === 'users' && secondary && (
              <Button variant="secondary" size={commitSize} leadingIcon={narrow ? undefined : secondary.icon} {...gate(secondary)}>
                {secondary.label}
              </Button>
            )}
            <Button variant="primary" size={commitSize} leadingIcon={narrow && variant === 'users' ? undefined : primary.icon} {...gate(primary)}>
              {primary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  if (!fixed) return bar;
  return mounted ? createPortal(bar, document.body) : null;
});

export interface ActionBarSpacerProps extends WithoutStyling<HTMLAttributes<HTMLDivElement>> {}

/**
 * Optional, at the end of the page's scrolling content: as tall as the open bar's clearance, so the last row can
 * scroll clear of it (0 when the bar is hidden).
 */
export const ActionBarSpacer = forwardRef<HTMLDivElement, ActionBarSpacerProps>(function ActionBarSpacer(props, ref) {
  return <div {...props} ref={ref} className="cui-action-bar-spacer" aria-hidden="true" />;
});
