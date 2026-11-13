'use client';

import {
  forwardRef,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { CaretDown, CaretUp, type Icon } from '@phosphor-icons/react';
import { Badge } from '../Badge';
import { AppShellNavContext } from '../AppShell/context';
import { profileInitials } from '../ProfileCard/ProfileCard';
import type { WithoutStyling } from '../../utils/types';

// ---------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------

/** The five elements. A department's element colours its collapsed count dots. */
export type SidebarNavElement = 'fire' | 'earth' | 'water' | 'gold' | 'wood';

/** A second-level item, under a parent. */
export interface SidebarNavChild {
  /** Unique across the whole nav: the active destination is one id. */
  id: string;
  label: string;
  /** A link. Leave out for a button that calls `onSelect`. */
  href?: string;
  onSelect?: () => void;
  disabled?: boolean;
}

/** A nav item: a destination, or (with `children`) a parent that opens its children inline. */
export interface SidebarNavItem {
  /** Unique across the whole nav. */
  id: string;
  label: string;
  /** A Phosphor icon component; drawn Fill at 20px (Tier 2, a sidebar nav item). */
  icon: Icon;
  href?: string;
  onSelect?: () => void;
  /** A trailing count (caption bold Neutral-5); collapsed, an 8px dot on the icon. Never with `soon`. */
  count?: number;
  /** In the IA but not built yet: Neutral-4, a "Soon" Badge, can't be picked. */
  soon?: boolean;
  disabled?: boolean;
  /** One level of children (never deeper). The parent then only opens and closes; it is never a destination. */
  children?: SidebarNavChild[];
  /** A parent open on first render. Each parent opens and closes on its own. */
  defaultExpanded?: boolean;
}

/** A group of items with an optional uppercase label; a hairline sits above every group but the first. */
export interface SidebarNavSection {
  id: string;
  label?: string;
  items: SidebarNavItem[];
}

/**
 * The header logo, from the DLS logo library (never redrawn). `live`: Collabrium, the animated `logo.html` expanded
 * and `logo-mark.html` collapsed (iframes). `lockup`: a department's static lockup expanded, its element icon
 * collapsed. `icon`: a department with no lockup yet, its element icon beside its name.
 */
export type SidebarNavLogo =
  | { kind: 'live'; src: string; markSrc: string }
  | { kind: 'lockup'; src: string; iconSrc: string }
  | { kind: 'icon'; iconSrc: string };

/** A department in the strip. */
export interface SidebarNavDepartment {
  id: string;
  /** "Collabrium", "CollabSales". */
  name: string;
  /** Its one-line hover line (about 40 characters), from the DS's Department logos. */
  description: string;
  /** The chip's icon: the element icon `<img src=".../SVG/gold.svg" alt="">` at 18px, or Collabrium's Phosphor RocketLaunch. */
  icon: ReactNode;
  /** The header logo while this department is selected. */
  logo: SidebarNavLogo;
  /** Its element: colours the collapsed count dots. */
  element?: SidebarNavElement;
  /** Its home page: the chip and the header logo link here. */
  href?: string;
  /** Confirmed, still being built: greyed, can't be picked, its card says "Soon". */
  soon?: boolean;
  /** A short Neutral Badge beside its header logo and in its card, for a live department that is not final ("Beta"). */
  badge?: string;
}

/** An action in the account menu. */
export interface SidebarNavMenuItem {
  id: string;
  label: string;
  /** Drawn Fill at 20px, as the nav items. */
  icon: Icon;
  href?: string;
  onSelect?: () => void;
  /** A hairline above it (Log out under Settings). */
  divider?: boolean;
}

/** The signed-in person, in the footer. */
export interface SidebarNavUser {
  name: string;
  role: string;
  /** Shown as the role's hover title (the full sign-in address). */
  email?: string;
  /** Override the initials worked out from the name (Profile card's rule: Malay particles skipped). */
  initials?: string;
}

type NativeShellProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'aria-label'>>;

export interface SidebarNavProps extends NativeShellProps {
  /** The items, in groups. Swap them when the department changes. */
  sections: SidebarNavSection[];
  /** Names the navigation landmark. Default "Main". */
  label?: string;
  /** The active destination (an item or child id), controlled. Exactly one across the whole nav. */
  activeId?: string | null;
  defaultActiveId?: string | null;
  /** An item or child was picked (its own `onSelect` runs too). */
  onActiveChange?: (id: string) => void;
  /** The 72px icon rail, controlled. */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Remembers collapsed or expanded in the browser under this key (the DS's localStorage persistence). */
  collapsedStorageKey?: string;
  /** The header logo when there are no departments (Collabrium's `live` logo). */
  logo?: SidebarNavLogo;
  /** The logo's name, read as "<name> home". Default "Collabrium". */
  logoName?: string;
  /** Where the logo links (the group home). */
  logoHref?: string;
  /** A short Neutral Badge beside the logo without departments ("Beta"). */
  logoBadge?: string;
  /** The Department strip, shown with 2 or more: Collabrium first, live departments, coming-soon ones last. */
  departments?: SidebarNavDepartment[];
  /** The selected department, controlled. In the product it comes from the address. */
  department?: string;
  defaultDepartment?: string;
  /** A department chip was picked (never a coming-soon one). Go to its home and swap `sections`. */
  onDepartmentChange?: (id: string) => void;
  /** Items pinned in the footer above the account (Help). */
  footerItems?: SidebarNavItem[];
  /** The account row, last in the footer. */
  user?: SidebarNavUser;
  /** The account menu's actions (Settings, Log out). */
  userMenu?: SidebarNavMenuItem[];
  /** Renders links: pass Next.js's `Link` for client-side navigation. Default `a`. */
  linkComponent?: ElementType;
}

// ---------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MENU_FADE_MS = 140; // --duration-fast: the menu's fade out before a department's menu replaces it
const EXPAND_MS = 400; // after --duration-slow's width change, bring the selected chip back into view

/** App Shell's tablet step: below 1024px its nav starts collapsed (App Shell's CSS has the same query). */
const SHELL_COLLAPSE_QUERY = '(max-width: 1023px)';

/**
 * Writes the starting state onto the shell before first paint, so a collapsed rail never flashes open: the stored
 * state, or (`appShell`, for a rail inside App Shell) collapsed whenever the window is under 1024px wide. Pass `null`
 * as the key when nothing is stored.
 */
export function sidebarNavInitScript(storageKey: string | null, shellId: string, options: { appShell?: boolean } = {}): string {
  const k = JSON.stringify(storageKey);
  const id = JSON.stringify(shellId);
  const shell = options.appShell ? `matchMedia(${JSON.stringify(SHELL_COLLAPSE_QUERY)}).matches||` : '';
  return `try{if(${shell}(${k}&&localStorage.getItem(${k})==='1')){var s=document.getElementById(${id});if(s)s.setAttribute('data-collapsed','')}}catch(e){}`;
}

/** The gallery's toggle glyph: a panel with its divider and an arrow (the DS names Remix's sidebar-fold / -unfold). */
function ToggleGlyph({ collapsed }: { collapsed: boolean }) {
  return (
    <svg className="cui-sidebar-nav__toggle-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <line x1="9" y1="3.5" x2="9" y2="16.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d={collapsed ? 'M9.5 7l2.5 3-2.5 3' : 'M13.5 7 11 10l2.5 3'}
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoArt({ logo, name }: { logo: SidebarNavLogo; name: string }) {
  if (logo.kind === 'live') {
    return (
      <>
        <span className="cui-sidebar-nav__logo-live">
          <iframe src={logo.src} title={name} scrolling="no" tabIndex={-1} aria-hidden="true" />
        </span>
        <span className="cui-sidebar-nav__logo-collapsed cui-sidebar-nav__logo-mark">
          <iframe src={logo.markSrc} title={name} scrolling="no" tabIndex={-1} aria-hidden="true" />
        </span>
      </>
    );
  }
  return (
    <>
      {logo.kind === 'lockup' ? (
        <img className="cui-sidebar-nav__logo-lockup" src={logo.src} alt="" />
      ) : (
        <span className="cui-sidebar-nav__logo-fallback">
          <img src={logo.iconSrc} alt="" />
          {name}
        </span>
      )}
      <img className="cui-sidebar-nav__logo-collapsed" src={logo.iconSrc} alt="" />
    </>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// SidebarNav
// ---------------------------------------------------------------------------------------------------------------

/**
 * Collabrium SidebarNav: the app's primary navigation (the canonical nav for every Collabrium build). A 240px rail:
 * the header logo, the Department strip, the menu (sections, items, one level of children), the footer with the
 * account menu. Collapses to a 72px icon rail with hover labels; below 768px it's a content-sized card that collapses
 * to its logo. Ported from components.css `.c-sidebar*`, `.c-pod-*`, `.c-nav-*`, `.c-user-menu*` (2652–2894).
 */
export const SidebarNav = forwardRef<HTMLDivElement, SidebarNavProps>(function SidebarNav(props, ref) {
  const {
    sections,
    label = 'Main',
    activeId: activeProp,
    defaultActiveId = null,
    onActiveChange,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapsedChange,
    collapsedStorageKey,
    logo,
    logoName = 'Collabrium',
    logoHref,
    logoBadge,
    departments = [],
    department: departmentProp,
    defaultDepartment,
    onDepartmentChange,
    footerItems = [],
    user,
    userMenu = [],
    linkComponent: LinkC = 'a',
    ...rest
  } = props;
  const uid = useId();
  const railId = `${uid}-rail`;
  const menuId = `${uid}-menu`;

  // ---- state ----
  const [ownActive, setOwnActive] = useState<string | null>(defaultActiveId);
  const activeId = activeProp !== undefined ? activeProp : ownActive;
  const [ownCollapsed, setOwnCollapsed] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? ownCollapsed;
  const [ownDept, setOwnDept] = useState(defaultDepartment ?? departments[0]?.id);
  const deptId = departmentProp ?? ownDept;
  const dept = departments.find((d) => d.id === deptId) ?? null;
  const showStrip = departments.length >= 2;

  const [open, setOpen] = useState<Set<string>>(() => {
    const s = new Set<string>();
    for (const sec of sections) for (const it of sec.items) if (it.children && it.defaultExpanded) s.add(it.id);
    return s;
  });
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const shellRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const setShell = (el: HTMLDivElement | null) => {
    shellRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  // ---- collapsed, persisted; inside App Shell, collapsed on a tablet or phone ----
  const shellTier = useContext(AppShellNavContext);
  useLayoutEffect(() => {
    if (collapsedProp !== undefined) return;
    if (shellTier === 'tablet' || shellTier === 'phone') {
      setOwnCollapsed(true);
      return;
    }
    let next = defaultCollapsed;
    if (collapsedStorageKey) {
      try {
        const v = localStorage.getItem(collapsedStorageKey);
        if (v === '1' || v === '0') next = v === '1';
      } catch {
        /* storage blocked */
      }
    }
    setOwnCollapsed(next);
    // defaultCollapsed is a starting value: a later change doesn't reset the rail.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsedStorageKey, collapsedProp, shellTier]);
  const setCollapsed = (next: boolean) => {
    if (collapsedProp === undefined) setOwnCollapsed(next);
    onCollapsedChange?.(next);
    setHover(null);
    if (collapsedStorageKey) {
      try {
        localStorage.setItem(collapsedStorageKey, next ? '1' : '0');
      } catch {
        /* storage blocked: it still toggles for this page */
      }
    }
  };

  // ---- the menu's department swap: fade the old menu out, then show the new one from the top, accordions closed ----
  const [shown, setShown] = useState(sections);
  const [swapping, setSwapping] = useState(false);
  const lastDept = useRef(deptId);
  useEffect(() => {
    if (lastDept.current === deptId) {
      setShown(sections);
      return;
    }
    lastDept.current = deptId;
    const land = () => {
      setShown(sections);
      setOpen(new Set());
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    };
    if (!ready || prefersReduced()) {
      land();
      return;
    }
    setSwapping(true);
    const t = window.setTimeout(() => {
      land();
      setSwapping(false);
    }, MENU_FADE_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, deptId]);

  // ---- active destination ----
  const select = (id: string, onSelect?: () => void) => {
    if (activeProp === undefined) setOwnActive(id);
    onActiveChange?.(id);
    onSelect?.();
  };
  const toggleParent = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // ---- collapsed hover label: one fixed element, placed against the hovered or focused icon ----
  const [hover, setHover] = useState<{ text: string; left: number; top: number } | null>(null);
  const showHover = (el: Element | null) => {
    if (!collapsed || !el) return;
    const text = el.getAttribute('data-hover');
    const icon = el.querySelector('[data-hover-anchor]') ?? el;
    if (!text) return;
    const r = icon.getBoundingClientRect();
    setHover({ text, left: r.right + 8, top: r.top + r.height / 2 });
  };
  const hoverEvents = {
    onMouseOver: (e: { target: EventTarget; relatedTarget: EventTarget | null }) => {
      const el = (e.target as Element).closest('[data-hover]');
      if (el && !el.contains(e.relatedTarget as Node | null)) showHover(el);
    },
    onMouseOut: (e: { target: EventTarget; relatedTarget: EventTarget | null }) => {
      const el = (e.target as Element).closest('[data-hover]');
      if (el && !el.contains(e.relatedTarget as Node | null)) setHover(null);
    },
    onFocus: (e: { target: EventTarget }) => showHover((e.target as Element).closest('[data-hover]')),
    onBlur: () => setHover(null),
  };
  useEffect(() => {
    if (!collapsed) setHover(null);
  }, [collapsed]);

  // ---- link or button (a plain function, not a component, so items never remount and keep focus) ----
  const target = ({
    key,
    href,
    className,
    children,
    onClick,
    current,
    refEl,
    ...attrs
  }: {
    key?: string;
    href?: string;
    className: string;
    children: ReactNode;
    onClick?: () => void;
    current?: boolean;
    refEl?: (el: HTMLElement | null) => void;
  } & Record<string, unknown>) =>
    href ? (
      <LinkC key={key} ref={refEl} href={href} className={className} aria-current={current ? 'page' : undefined} onClick={onClick} {...attrs}>
        {children}
      </LinkC>
    ) : (
      <button key={key} ref={refEl} type="button" className={className} aria-current={current ? 'page' : undefined} onClick={onClick} {...attrs}>
        {children}
      </button>
    );

  // The collapsed parent icon goes to its first child: the children are still in the DOM (hidden), so a link child is
  // clicked for real, letting a router handle it.
  const childEls = useRef(new Map<string, HTMLElement | null>());

  const dotElement = dept?.element;

  const renderItem = (it: SidebarNavItem) => {
    const IconC = it.icon;
    const icon = <IconC className="cui-sidebar-nav__icon" weight="fill" aria-hidden="true" focusable="false" data-hover-anchor="" />;
    const hoverText = it.soon ? `${it.label} (soon)` : it.label;
    const count =
      it.count !== undefined && !it.soon ? (
        <>
          <span className="cui-sidebar-nav__count">{it.count}</span>
          <span className="cui-sidebar-nav__dot" data-element={dotElement} aria-hidden="true" />
        </>
      ) : null;

    if (it.soon) {
      return (
        <button key={it.id} type="button" className="cui-sidebar-nav__item" data-soon="" disabled aria-disabled="true" data-hover={hoverText}>
          {icon}
          <span className="cui-sidebar-nav__label">{it.label}</span>
          <span className="cui-sidebar-nav__soon">
            <Badge variant="neutral">Soon</Badge>
          </span>
        </button>
      );
    }

    if (it.children?.length) {
      const isOpen = open.has(it.id) && !collapsed;
      const hasActive = it.children.some((c) => c.id === activeId);
      const panelId = `${uid}-${it.id}-children`;
      const firstChild = it.children.find((c) => !c.disabled);
      const Caret = isOpen ? CaretUp : CaretDown;
      return (
        <Fragment key={it.id}>
          <button
            type="button"
            className="cui-sidebar-nav__item"
            data-parent=""
            data-active-child={hasActive || undefined}
            aria-expanded={collapsed ? undefined : isOpen}
            aria-controls={collapsed ? undefined : panelId}
            disabled={it.disabled}
            data-hover={hoverText}
            onClick={() => {
              if (collapsed) {
                if (!firstChild) return;
                const el = childEls.current.get(firstChild.id);
                if (firstChild.href && el) el.click();
                else select(firstChild.id, firstChild.onSelect);
                return;
              }
              toggleParent(it.id);
            }}
          >
            {icon}
            <span className="cui-sidebar-nav__label">{it.label}</span>
            {count}
            <span className="cui-sidebar-nav__caret" aria-hidden="true">
              <Caret className="cui-sidebar-nav__caret-icon" weight="regular" focusable="false" />
            </span>
          </button>
          <div id={panelId} className="cui-sidebar-nav__children" data-open={isOpen || undefined}>
            <div className="cui-sidebar-nav__children-inner" inert={!isOpen || undefined}>
              {it.children.map((c) =>
                target({
                  key: c.id,
                  href: c.disabled ? undefined : c.href,
                  className: 'cui-sidebar-nav__child',
                  current: c.id === activeId,
                  'data-active': c.id === activeId || undefined,
                  disabled: c.disabled,
                  refEl: (el: HTMLElement | null) => void childEls.current.set(c.id, el),
                  onClick: c.disabled ? undefined : () => select(c.id, c.onSelect),
                  children: c.label,
                }),
              )}
            </div>
          </div>
        </Fragment>
      );
    }

    const isActive = it.id === activeId;
    if (it.disabled) {
      return (
        <button key={it.id} type="button" className="cui-sidebar-nav__item" disabled data-hover={hoverText}>
          {icon}
          <span className="cui-sidebar-nav__label">{it.label}</span>
          {count}
        </button>
      );
    }
    return target({
      key: it.id,
      href: it.href,
      className: 'cui-sidebar-nav__item',
      current: isActive,
      'data-active': isActive || undefined,
      'data-hover': hoverText,
      onClick: () => select(it.id, it.onSelect),
      children: (
        <>
          {icon}
          <span className="cui-sidebar-nav__label">{it.label}</span>
          {count}
        </>
      ),
    });
  };

  // ---- header logo ----
  const headLogo = dept?.logo ?? logo;
  const headName = dept?.name ?? logoName;
  const headHref = dept?.href ?? logoHref;
  const headBadge = dept ? dept.badge : logoBadge;
  const [logoKey, setLogoKey] = useState(0);
  const lastLogoDept = useRef(deptId);
  useEffect(() => {
    if (lastLogoDept.current !== deptId) {
      lastLogoDept.current = deptId;
      setLogoKey((k) => k + 1);
    }
  }, [deptId]);

  // ---- department strip ----
  const pickDept = (d: SidebarNavDepartment) => {
    if (d.soon || d.id === deptId) return;
    setCard(null);
    if (departmentProp === undefined) setOwnDept(d.id);
    onDepartmentChange?.(d.id);
  };

  // ---- account menu ----
  const [menuOpen, setMenuOpen] = useState(false);
  const userRef = useRef<HTMLButtonElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; bottom: number } | null>(null);
  useLayoutEffect(() => {
    if (!menuOpen) return;
    const place = () => {
      const r = userRef.current?.getBoundingClientRect();
      if (r) setMenuPos({ left: r.left, bottom: window.innerHeight - r.top + 8 });
    };
    place();
    // Opening a menu moves focus to its first item (approved for menus, as Profile card's).
    userMenuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    const down = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!userMenuRef.current?.contains(t) && !userRef.current?.contains(t)) setMenuOpen(false);
    };
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    document.addEventListener('pointerdown', down, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
      document.removeEventListener('pointerdown', down, true);
    };
  }, [menuOpen]);
  const closeMenu = (refocus: boolean) => {
    setMenuOpen(false);
    if (refocus) userRef.current?.focus();
  };
  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = [...(userMenuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])];
    const i = items.indexOf(document.activeElement as HTMLElement);
    const go = (n: number) => items[(n + items.length) % items.length]?.focus();
    if (e.key === 'ArrowDown') go(i + 1);
    else if (e.key === 'ArrowUp') go(i - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(items.length - 1);
    else if (e.key === 'Escape') closeMenu(true);
    else if (e.key === 'Tab') closeMenu(false);
    else return;
    if (e.key !== 'Tab') e.preventDefault();
  };
  const initials = user ? (user.initials ?? profileInitials(user.name)) : '';

  // ---- department card ----
  const [card, setCard] = useState<{ d: SidebarNavDepartment; left: number; top: number; caret: number } | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const showCard = (chip: HTMLElement, d: SidebarNavDepartment) => {
    if (collapsed || window.matchMedia('(hover: none)').matches) return;
    const s = shellRef.current?.getBoundingClientRect();
    const t = stripRef.current?.getBoundingClientRect();
    if (!s || !t) return;
    const c = chip.getBoundingClientRect();
    setCard({ d, left: t.left - s.left, top: t.bottom - s.top + 8, caret: c.left + c.width / 2 - t.left });
  };
  // The caret sits on the hovered chip, kept 16px inside the card.
  const [caretX, setCaretX] = useState(24);
  useLayoutEffect(() => {
    if (!card || !cardRef.current) return;
    setCaretX(Math.max(16, Math.min(cardRef.current.offsetWidth - 16, card.caret)));
  }, [card]);

  // ---- render ----
  const footer = footerItems.length > 0 || user;

  return (
    <div
      {...rest}
      ref={setShell}
      className="cui-sidebar-nav"
      data-collapsed={collapsed || undefined}
      data-ready={ready || undefined}
    >
      <nav ref={railRef} id={railId} className="cui-sidebar-nav__rail" aria-label={label} {...hoverEvents}>
        {headLogo && (
          <div className="cui-sidebar-nav__header">
            {headHref ? (
              <LinkC
                key={logoKey}
                href={headHref}
                className="cui-sidebar-nav__home"
                data-swap={logoKey > 0 || undefined}
                aria-label={`${headName} home`}
                data-hover={`${headName} home`}
              >
                <LogoArt logo={headLogo} name={headName} />
              </LinkC>
            ) : (
              <span key={logoKey} className="cui-sidebar-nav__home" data-static="" data-swap={logoKey > 0 || undefined} role="img" aria-label={headName}>
                <LogoArt logo={headLogo} name={headName} />
              </span>
            )}
            {headBadge && (
              <span key={`b${logoKey}`} className="cui-sidebar-nav__badge">
                <Badge variant="neutral">{headBadge}</Badge>
              </span>
            )}
          </div>
        )}

        {showStrip && (
          <>
            <DepartmentStrip
              departments={departments}
              current={deptId}
              collapsed={collapsed}
              ready={ready}
              stripRef={stripRef}
              linkComponent={LinkC}
              onPick={pickDept}
              onShowCard={showCard}
              onHideCard={() => setCard(null)}
            />
            <hr className="cui-sidebar-nav__divider" data-strip="" />
          </>
        )}

        <div ref={scrollRef} className="cui-sidebar-nav__scroll" data-swapping={swapping || undefined}>
          {shown.map((sec, i) => (
            <Fragment key={sec.id}>
              {i > 0 && <hr className="cui-sidebar-nav__divider" />}
              {sec.label && <div className="cui-sidebar-nav__section">{sec.label}</div>}
              {sec.items.map(renderItem)}
            </Fragment>
          ))}
        </div>

        {footer && (
          <div className="cui-sidebar-nav__footer">
            {footerItems.map(renderItem)}
            {user && (
              <button
                ref={userRef}
                type="button"
                className="cui-sidebar-nav__user"
                aria-haspopup={userMenu.length ? 'menu' : undefined}
                aria-expanded={userMenu.length ? menuOpen : undefined}
                aria-controls={menuOpen ? menuId : undefined}
                aria-label={collapsed ? `${user.name}, ${user.role}` : undefined}
                data-open={menuOpen || undefined}
                data-hover={`${user.name} · ${user.role}`}
                onClick={() => userMenu.length && setMenuOpen((o) => !o)}
                onKeyDown={(e) => {
                  if (!userMenu.length) return;
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    setMenuOpen(true);
                  }
                }}
              >
                <span className="cui-sidebar-nav__avatar" aria-hidden="true" data-hover-anchor="">
                  {initials}
                </span>
                <span className="cui-sidebar-nav__user-text">
                  <span className="cui-sidebar-nav__user-name">{user.name}</span>
                  <span className="cui-sidebar-nav__user-role" title={user.email}>
                    {user.role}
                  </span>
                </span>
              </button>
            )}
          </div>
        )}
      </nav>

      {/* The toggle sits outside the rail's clip so, collapsed, it can straddle the rail's edge. */}
      <button
        type="button"
        className="cui-sidebar-nav__toggle"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-controls={railId}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed(!collapsed)}
      >
        <ToggleGlyph collapsed={collapsed} />
      </button>

      {showStrip && (
        <div
          ref={cardRef}
          className="cui-sidebar-nav__card"
          role="tooltip"
          aria-hidden="true"
          data-visible={card ? '' : undefined}
          style={card ? ({ left: card.left, top: card.top, '--cui-sidebar-nav-caret-x': `${caretX}px` } as CSSProperties) : undefined}
        >
          {card && (
            <>
              <div className="cui-sidebar-nav__card-title">
                {card.d.name}
                {card.d.soon ? <Badge variant="neutral">Soon</Badge> : card.d.badge && <Badge variant="neutral">{card.d.badge}</Badge>}
              </div>
              <div className="cui-sidebar-nav__card-desc">{card.d.description}</div>
            </>
          )}
        </div>
      )}

      {user && userMenu.length > 0 && (
        <div
          ref={userMenuRef}
          id={menuId}
          className="cui-sidebar-nav__menu"
          role="menu"
          aria-label="Account menu"
          data-open={menuOpen || undefined}
          hidden={!menuOpen}
          style={menuPos ? { left: menuPos.left, bottom: menuPos.bottom } : undefined}
          onKeyDown={onMenuKey}
        >
          {userMenu.map((m) => {
            const MIcon = m.icon;
            return (
              <Fragment key={m.id}>
                {m.divider && <hr className="cui-sidebar-nav__menu-divider" />}
                {target({
                  href: m.href,
                  className: 'cui-sidebar-nav__menu-item',
                  role: 'menuitem',
                  tabIndex: -1,
                  onClick: () => {
                    closeMenu(!m.href);
                    m.onSelect?.();
                  },
                  children: (
                    <>
                      <MIcon className="cui-sidebar-nav__menu-icon" weight="fill" aria-hidden="true" focusable="false" />
                      {m.label}
                    </>
                  ),
                })}
              </Fragment>
            );
          })}
        </div>
      )}

      <div
        className="cui-sidebar-nav__hover"
        role="tooltip"
        aria-hidden="true"
        data-visible={hover ? '' : undefined}
        style={hover ? { left: hover.left, top: hover.top } : undefined}
      >
        {hover?.text}
      </div>
    </div>
  );
});

// ---------------------------------------------------------------------------------------------------------------
// Department strip
// ---------------------------------------------------------------------------------------------------------------

function DepartmentStrip({
  departments,
  current,
  collapsed,
  ready,
  stripRef,
  linkComponent: LinkC,
  onPick,
  onShowCard,
  onHideCard,
}: {
  departments: SidebarNavDepartment[];
  current: string | undefined;
  collapsed: boolean;
  ready: boolean;
  stripRef: { current: HTMLDivElement | null };
  linkComponent: ElementType;
  onPick: (d: SidebarNavDepartment) => void;
  onShowCard: (chip: HTMLElement, d: SidebarNavDepartment) => void;
  onHideCard: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const overflow = departments.length > 6;
  const [pill, setPill] = useState<{ x: number; w: number; animate: boolean } | null>(null);
  const [fades, setFades] = useState({ start: false, end: false });
  const animateNext = useRef(false);

  const currentChip = () => rowRef.current?.querySelector<HTMLElement>('[aria-current="true"]') ?? null;

  const placePill = useCallback((animate: boolean) => {
    const c = currentChip();
    if (!c || !c.offsetWidth) {
      setPill(null);
      return;
    }
    setPill({ x: c.offsetLeft, w: c.offsetWidth, animate: animate && !prefersReduced() });
  }, []);

  const updateFades = useCallback(() => {
    const s = scrollerRef.current;
    if (!s) return;
    const over = s.scrollWidth > s.clientWidth + 1;
    setFades({ start: over && s.scrollLeft > 2, end: over && s.scrollLeft + s.clientWidth < s.scrollWidth - 2 });
  }, []);

  /** Scrolls just enough to show the selected chip whole (more than 6 departments). */
  const keepInView = useCallback(
    (smooth: boolean) => {
      const s = scrollerRef.current;
      const c = currentChip();
      if (!s || !c || !overflow) return;
      const pad = 12;
      const left = c.offsetLeft;
      const right = left + c.offsetWidth;
      let to: number | null = null;
      if (left - pad < s.scrollLeft) to = Math.max(0, left - pad);
      else if (right + pad > s.scrollLeft + s.clientWidth) to = right + pad - s.clientWidth;
      if (to !== null) s.scrollTo({ left: to, behavior: smooth && !prefersReduced() ? 'smooth' : 'auto' });
    },
    [overflow],
  );

  // On load and after every switch: the highlight under the selected chip, and that chip in view.
  useLayoutEffect(() => {
    placePill(animateNext.current);
    keepInView(animateNext.current);
    updateFades();
    animateNext.current = false;
  }, [current, departments, placePill, keepInView, updateFades]);

  // Re-place on resize (and when the strip comes back on expand); after expanding, bring the chip back into view once
  // the rail has finished widening.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const ro = new ResizeObserver(() => {
      placePill(false);
      updateFades();
    });
    ro.observe(row);
    return () => ro.disconnect();
  }, [placePill, updateFades]);
  useEffect(() => {
    if (collapsed) return;
    const t = window.setTimeout(() => {
      keepInView(false);
      updateFades();
    }, EXPAND_MS);
    return () => window.clearTimeout(t);
  }, [collapsed, keepInView, updateFades]);

  // A normal mouse wheel scrolls the strip sideways while over it.
  useEffect(() => {
    const s = scrollerRef.current;
    if (!s) return;
    const wheel = (e: WheelEvent) => {
      if (s.scrollWidth <= s.clientWidth) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        s.scrollLeft += e.deltaY;
      }
    };
    s.addEventListener('wheel', wheel, { passive: false });
    return () => s.removeEventListener('wheel', wheel);
  }, []);

  return (
    <div ref={stripRef} className="cui-sidebar-nav__strip" data-overflow={overflow || undefined}>
      <div
        ref={scrollerRef}
        className="cui-sidebar-nav__scroller"
        data-more-start={fades.start || undefined}
        data-more-end={fades.end || undefined}
        onScroll={() => {
          updateFades();
          onHideCard();
        }}
      >
        <div
          ref={rowRef}
          className="cui-sidebar-nav__row"
          role="group"
          aria-label="Departments"
          onMouseLeave={onHideCard}
          onBlur={onHideCard}
          onKeyDown={(e) => e.key === 'Escape' && onHideCard()}
        >
          <span
            className="cui-sidebar-nav__pill"
            aria-hidden="true"
            data-animate={(pill?.animate && ready) || undefined}
            style={pill ? { width: pill.w, transform: `translateX(${pill.x}px)` } : { width: 0 }}
          />
          {departments.map((d) => {
            const on = d.id === current;
            const name = `${d.name}. ${d.description}${d.soon ? ' Coming soon.' : ''}`;
            const events = {
              className: 'cui-sidebar-nav__chip',
              'aria-label': name,
              'aria-current': on ? ('true' as const) : undefined,
              'data-current': on || undefined,
              'data-soon': d.soon || undefined,
              onMouseOver: (e: { currentTarget: HTMLElement }) => onShowCard(e.currentTarget, d),
              onFocus: (e: { currentTarget: HTMLElement }) => {
                if (e.currentTarget.matches(':focus-visible')) {
                  e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                  onShowCard(e.currentTarget, d);
                }
              },
              onClick: (e: { preventDefault: () => void }) => {
                if (d.soon) {
                  e.preventDefault();
                  return;
                }
                animateNext.current = true;
                onPick(d);
              },
            };
            // A coming-soon department is a button marked aria-disabled: still focusable, so its card can be read.
            return d.href && !d.soon ? (
              <LinkC key={d.id} href={d.href} {...events}>
                {d.icon}
              </LinkC>
            ) : (
              <button key={d.id} type="button" aria-disabled={d.soon || undefined} {...events}>
                {d.icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
