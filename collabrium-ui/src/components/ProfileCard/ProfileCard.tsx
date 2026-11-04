'use client';

import { forwardRef, useEffect, useId, useRef, useState, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Archive, ArrowsClockwise, DotsThree, Eye, PencilSimple, PushPin, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Card, CardTitle, type CardHeadingLevel } from '../Card';
import { Checkbox } from '../Checkbox';
import { Tag, type TagVariant } from '../Tag';

/** The two tiers a person assigns, about what someone does rather than their reach. */
export type ProfileRoleTier = 'koc' | 'seeder';
/** Every tier a platform row can show: the five computed from followers, then the two role tiers. */
export type ProfileTier = 'nano' | 'micro' | 'mid' | 'macro' | 'mega' | ProfileRoleTier;
/** The kebab menu's five actions, in their fixed order. */
export type ProfileMenuAction = 'view' | 'pin' | 'edit' | 'sync' | 'archive';

/** One platform the person has connected. */
export interface ProfilePlatform {
  /** The platform's name, e.g. "Instagram". Rows are sorted by it. */
  platform: string;
  /** The follower count as a number, e.g. `31000`. Shown abbreviated and rounded down ("31K"); the ranked tier is computed from it. */
  followers: number;
  /** The address of this person's profile on the platform. The follower count links to it. */
  href: string;
  /** Set only for a role tier: `koc` (Key Opinion Consumer) or `seeder`. Leave out and the tier follows the followers. */
  role?: ProfileRoleTier;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title'>>;

export interface ProfileCardProps extends NativeDivProps {
  /** The person's full name. The avatar's initials are worked out from it. */
  name: string;
  /** A photo, drawn over the initials. Leave out and the initials show, permanently. */
  photo?: string;
  /** Age, for the Meta line ("20 · Female · Kuala Lumpur"). Any part left out is dropped, with its separator. */
  age?: number;
  /** Gender, for the Meta line. */
  gender?: string;
  /** Location, for the Meta line. */
  location?: string;
  /** Persona categories ("Beauty", "Fashion"). Shown on one line, sorted alphabetically. Leave out or empty and the line is removed. */
  personas?: string[];
  /** The connected platforms. Sorted alphabetically by name. Leave out or empty and the list is removed. */
  platforms?: ProfilePlatform[];
  /** The heading level of the name, 2 to 6. The look is always the card title's (h5). Default 3. */
  headingLevel?: CardHeadingLevel;
  /** Makes the name a link to the person's page, stretched over the card: the card raises on hover and takes the focus halo. */
  href?: string;
  /** Makes the name a button that opens the person, stretched over the card. Use `href` when it navigates. */
  onOpen?: () => void;
  /**
   * Shows the Select checkbox, for a roster that a bulk action acts on. Leave it off for an informational card: the
   * kebab stays either way.
   */
  selectable?: boolean;
  /** Whether the card is selected. Leave out to let the card keep its own state, starting from `defaultSelected`. */
  selected?: boolean;
  /** The starting state when `selected` is left out. Default false. */
  defaultSelected?: boolean;
  /** Called with the new state when the person ticks or unticks the checkbox. */
  onSelectedChange?: (selected: boolean) => void;
  /** Called with the action when the person picks one from the kebab menu. The menu closes and focus returns to the kebab. */
  onMenuAction?: (action: ProfileMenuAction) => void;
}

const MENU: { action: ProfileMenuAction; label: string; icon: Icon }[] = [
  { action: 'view', label: 'View details', icon: Eye },
  { action: 'pin', label: 'Pin to top', icon: PushPin },
  { action: 'edit', label: 'Edit', icon: PencilSimple },
  { action: 'sync', label: 'Sync profile', icon: ArrowsClockwise },
  { action: 'archive', label: 'Archive', icon: Archive },
];

const TIERS: Record<ProfileTier, { label: string; variant: TagVariant }> = {
  nano: { label: 'Nano', variant: 'wood' },
  micro: { label: 'Micro', variant: 'earth' },
  mid: { label: 'Mid', variant: 'water' },
  macro: { label: 'Macro', variant: 'fire' },
  mega: { label: 'Mega', variant: 'gold' },
  koc: { label: 'KOC', variant: 'neutral' },
  seeder: { label: 'Seeder', variant: 'neutral' },
};

/** The ranked tier for a follower count (DESIGN-SYSTEM.md, "Tier badge, all seven tiers"). Computed, never chosen. */
export function profileTier(followers: number): Exclude<ProfileTier, ProfileRoleTier> {
  if (followers >= 500_000) return 'mega';
  if (followers >= 100_000) return 'macro';
  if (followers >= 20_000) return 'mid';
  if (followers >= 5_000) return 'micro';
  return 'nano';
}

// Malay and Indian naming particles ("son of", "daughter of"): never the source of a letter.
const PARTICLES = new Set(['bin', 'binti', 'b.', 'bt.', 'a/l', 'a/p']);

/**
 * The avatar's initials (DESIGN-SYSTEM.md, "Avatar initials logic"): the first letter of the first word and of the
 * last word; after a naming particle, the word that follows it (as the DLS example does; decided 2026-11-04,
 * Q-PROFILE-3); one letter for a one-word name. Uppercase.
 */
export function profileInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  const first = words[0];
  if (words.length === 1) return first.charAt(0).toUpperCase();
  const particle = words.findIndex((w, i) => i > 0 && PARTICLES.has(w.toLowerCase()));
  const rest = particle > 0 ? words.slice(particle + 1) : words.slice(1);
  const second = particle > 0 ? rest[0] : rest[rest.length - 1];
  if (!second) {
    const before = words.slice(1, particle).filter(w => !PARTICLES.has(w.toLowerCase()));
    const fallback = before[before.length - 1];
    return (first.charAt(0) + (fallback ? fallback.charAt(0) : '')).toUpperCase();
  }
  return (first.charAt(0) + second.charAt(0)).toUpperCase();
}

/**
 * A follower count in short form, rounded down so it never overstates the count or crosses into the next tier:
 * 720, 1.3K, 8K, 31K, 99K (99,999), 220K, 1.2M. One decimal under 10 of a unit, none above. (Decided 2026-11-04,
 * Q-PROFILE-5.)
 */
export function formatFollowers(count: number): string {
  const n = Math.max(0, Math.floor(count));
  const units: [number, string][] = [[1e9, 'B'], [1e6, 'M'], [1e3, 'K']];
  for (const [size, suffix] of units) {
    if (n >= size) {
      const value = n / size;
      const shown = value < 10 ? Math.floor(value * 10) / 10 : Math.floor(value);
      return `${shown}${suffix}`;
    }
  }
  return String(n);
}

// Only one Profile card menu is open at a time across the page: opening one closes the last.
let closeOpenMenu: (() => void) | null = null;

/**
 * Collabrium Profile card: one person across every platform they have connected. A Controls row (Select checkbox
 * and kebab menu), a centred identity block (avatar, name, Meta and Persona lines) and a platform list with each
 * row's follower count and tier. A variant of Card, ported from components.css `.c-card-profile-*` (359–430).
 */
export const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(function ProfileCard(
  {
    name,
    photo,
    age,
    gender,
    location,
    personas = [],
    platforms = [],
    headingLevel = 3,
    href,
    onOpen,
    selectable = false,
    selected,
    defaultSelected = false,
    onSelectedChange,
    onMenuAction,
    ...rest
  },
  ref,
) {
  const [own, setOwn] = useState(defaultSelected);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const controlsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const on = selectable && (selected ?? own);

  const meta = [age, gender, location].filter(part => part !== undefined && part !== '').join(' · ');
  const personaLine = [...personas].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).join(' · ');
  const rows = [...platforms].sort((a, b) => a.platform.localeCompare(b.platform, 'en', { sensitivity: 'base' }));

  const close = (returnFocus: boolean) => {
    setMenuOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;
    const mine = () => setMenuOpen(false);
    if (closeOpenMenu && closeOpenMenu !== mine) closeOpenMenu();
    closeOpenMenu = mine;
    const onPointer = (event: PointerEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) close(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    // Opening moves focus to the first item, as a menu button does (an approved exception to the focus rule, Q-PROFILE-1).
    itemsRef.current[0]?.focus();
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
      if (closeOpenMenu === mine) closeOpenMenu = null;
    };
  }, [menuOpen]);

  // Arrow keys move through the items and wrap; Home and End jump to the ends (Q-PROFILE-1).
  const onMenuKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = itemsRef.current.filter((item): item is HTMLButtonElement => item !== null);
    const at = items.indexOf(document.activeElement as HTMLButtonElement);
    const to = { ArrowDown: (at + 1) % items.length, ArrowUp: (at - 1 + items.length) % items.length, Home: 0, End: items.length - 1 }[event.key];
    if (to === undefined) return;
    event.preventDefault();
    items[to]?.focus();
  };

  const title =
    href !== undefined ? (
      <CardTitle headingLevel={headingLevel} href={href}>
        {name}
      </CardTitle>
    ) : onOpen ? (
      <CardTitle headingLevel={headingLevel} onClick={onOpen}>
        {name}
      </CardTitle>
    ) : (
      <CardTitle headingLevel={headingLevel}>{name}</CardTitle>
    );

  return (
    <Card {...rest} ref={ref} data-card="profile" data-profile-selected={on ? '' : undefined}>
      <div className="cui-profile-card__controls" ref={controlsRef}>
        {selectable ? (
          <span className="cui-profile-card__select">
            <Checkbox
              aria-label={`Select ${name}`}
              checked={on}
              onChange={event => {
                if (selected === undefined) setOwn(event.target.checked);
                onSelectedChange?.(event.target.checked);
              }}
            />
          </span>
        ) : (
          <span />
        )}
        <button
          ref={triggerRef}
          type="button"
          className="cui-profile-card__more"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? menuId : undefined}
          aria-label={`More options for ${name}`}
          onClick={() => setMenuOpen(open => !open)}
        >
          <DotsThree aria-hidden="true" focusable="false" />
        </button>
        {menuOpen && (
          // Tab leaves the menu (items are not Tab stops) and closes it once focus is outside the controls row.
          <div
            className="cui-profile-card__menu"
            id={menuId}
            role="menu"
            aria-label="Profile actions"
            onKeyDown={onMenuKey}
            onBlur={event => {
              if (!controlsRef.current?.contains(event.relatedTarget as Node | null)) setMenuOpen(false);
            }}
          >
            {MENU.map(({ action, label, icon: ItemIcon }, i) => (
              <button
                key={action}
                ref={node => {
                  itemsRef.current[i] = node;
                }}
                type="button"
                role="menuitem"
                tabIndex={-1}
                className="cui-profile-card__menu-item"
                onClick={() => {
                  close(true);
                  onMenuAction?.(action);
                }}
              >
                <ItemIcon aria-hidden="true" focusable="false" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="cui-profile-card__avatar" aria-hidden="true">
        {profileInitials(name)}
        {photo && <img src={photo} alt="" />}
      </div>
      <div className="cui-profile-card__identity">
        {title}
        {meta && <p className="cui-profile-card__meta">{meta}</p>}
        {personaLine && <p className="cui-profile-card__personas">{personaLine}</p>}
      </div>
      {rows.length > 0 && (
        <ul className="cui-profile-card__platforms">
          {rows.map(row => {
            const tier = TIERS[row.role ?? profileTier(row.followers)];
            const count = formatFollowers(row.followers);
            return (
              <li key={row.platform} className="cui-profile-card__row">
                <p className="cui-profile-card__platform">{row.platform}</p>
                <a className="cui-profile-card__followers" href={row.href} aria-label={`${row.platform}, ${count} followers`}>
                  {count}
                </a>
                <Tag variant={tier.variant}>{tier.label}</Tag>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
});
