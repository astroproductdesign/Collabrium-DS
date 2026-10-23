'use client';

// The DLS site's sidebar (collabrium-dls/preview.html, "Site SidebarNav"),
// reused as-is: same markup structure, .c-sidebar classes and behaviour
// (accordion, 72px collapsed rail persisted to localStorage, hover labels
// on the rail, collapsed parent opens its first child). The only change:
// items are links to pages instead of buttons that scroll one long page.
import { useEffect, useRef } from 'react';
import { assetHref, foundationPages, hrefTo, navItems, type PageKey } from '../lib/site';
import { openSearch } from './SearchDialog';

const COLLAPSE_KEY = 'collabrium-sidebar-collapsed';
const ARROW_EXPANDED = 'M13.5 7 11 10l2.5 3';
const ARROW_COLLAPSED = 'M9.5 7l2.5 3-2.5 3';

/** Runs during HTML parsing, before first paint, so a collapsed rail never flashes open. */
export const sidebarInitScript = `try{if(localStorage.getItem('${COLLAPSE_KEY}')==='1'){var n=document.getElementById('siteSidebar'),t=document.querySelector('[data-sidebar-toggle="siteSidebar"]');if(n&&t){n.classList.add('is-collapsed');t.setAttribute('aria-label','Expand sidebar');t.querySelector('.js-sidebar-toggle-arrow').setAttribute('d','${ARROW_COLLAPSED}');}}}catch(e){}`;

function Parent({
  id,
  icon,
  label,
  activeChild,
  children,
}: {
  id: string;
  icon: string;
  label: string;
  activeChild: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <button
        className={`c-sidebar-item js-nav-parent-toggle${activeChild ? ' parent-active-child' : ''}`}
        type="button"
        aria-expanded="true"
        data-nav-parent={id}
        suppressHydrationWarning
      >
        <i className={`ph-fill ph-${icon}`} aria-hidden="true" />
        <span className="label">{label}</span>
        <span className="c-sidebar-hover-text">{label}</span>
        <span className="c-nav-parent-toggle">
          <i className="ph ph-caret-up js-nav-parent-chevron" aria-hidden="true" suppressHydrationWarning />
        </span>
      </button>
      <div className="c-nav-children is-open" data-nav-panel={id} suppressHydrationWarning>
        <div className="c-nav-children-inner">{children}</div>
      </div>
    </>
  );
}

export function Sidebar({ current }: { current: PageKey }) {
  const navRef = useRef<HTMLElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sidebar = navRef.current!;
    const toggleBtn = toggleRef.current!;
    const hoverLabel = hoverRef.current!;
    const arrow = toggleBtn.querySelector('.js-sidebar-toggle-arrow')!;
    const ctl = new AbortController();
    const o = { signal: ctl.signal };

    function openPanel(parent: Element, opening: boolean) {
      const panel = parent.parentElement!.querySelector(`[data-nav-panel="${(parent as HTMLElement).dataset.navParent}"]`)!;
      panel.classList.toggle('is-open', opening);
      parent.setAttribute('aria-expanded', String(opening));
      const chevron = parent.querySelector('.js-nav-parent-chevron')!;
      chevron.classList.toggle('ph-caret-down', !opening);
      chevron.classList.toggle('ph-caret-up', opening);
    }

    sidebar.addEventListener(
      'click',
      e => {
        const target = e.target as Element;
        const parent = target.closest('.js-nav-parent-toggle');
        if (!parent) return;
        const panel = parent.parentElement!.querySelector(`[data-nav-panel="${(parent as HTMLElement).dataset.navParent}"]`)!;
        // Collapsed rail: the parent icon goes straight to its first child
        // (SidebarNav's collapsed-parent-icon rule).
        if (sidebar.classList.contains('is-collapsed')) {
          const first = panel.querySelector<HTMLAnchorElement>('.c-nav-child');
          if (first) window.location.href = first.href;
          return;
        }
        openPanel(parent, !panel.classList.contains('is-open'));
      },
      o,
    );

    function applyCollapsed(collapsed: boolean) {
      sidebar.classList.toggle('is-collapsed', collapsed);
      toggleBtn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
      arrow.setAttribute('d', collapsed ? ARROW_COLLAPSED : ARROW_EXPANDED);
    }
    toggleBtn.addEventListener(
      'click',
      () => {
        const collapsed = !sidebar.classList.contains('is-collapsed');
        applyCollapsed(collapsed);
        hoverLabel.classList.remove('is-visible');
        try {
          localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0');
        } catch {
          /* storage blocked: the rail still toggles for this page */
        }
      },
      o,
    );

    // Collapsed — hover label (one shared, fixed-position element).
    function showHoverLabel(item: Element) {
      const source = item.querySelector('.c-sidebar-hover-text');
      if (!sidebar.classList.contains('is-collapsed') || !source) return;
      const iconRect = item.querySelector('i')!.getBoundingClientRect();
      hoverLabel.textContent = source.textContent;
      hoverLabel.style.left = `${iconRect.right + 8}px`;
      hoverLabel.style.top = `${iconRect.top + iconRect.height / 2}px`;
      hoverLabel.style.transform = 'translateY(-50%)';
      hoverLabel.classList.add('is-visible');
    }
    const hide = () => hoverLabel.classList.remove('is-visible');
    sidebar.addEventListener('mouseover', e => {
      const item = (e.target as Element).closest('.c-sidebar-item');
      if (item && !item.contains(e.relatedTarget as Node)) showHoverLabel(item);
    }, o);
    sidebar.addEventListener('mouseout', e => {
      const item = (e.target as Element).closest('.c-sidebar-item');
      if (item && !item.contains(e.relatedTarget as Node)) hide();
    }, o);
    sidebar.addEventListener('focusin', e => {
      const item = (e.target as Element).closest('.c-sidebar-item');
      if (item) showHoverLabel(item);
    }, o);
    sidebar.addEventListener('focusout', e => {
      if ((e.target as Element).closest('.c-sidebar-item')) hide();
    }, o);

    return () => ctl.abort();
  }, []);

  const inFoundation = current.startsWith('foundation/');
  const inComponents = current.startsWith('components/');
  const link = (to: PageKey) => hrefTo(current, to);

  return (
    <>
      <div className="nav-rail">
        <div className="c-sidebar-shell">
          <nav className="c-sidebar" id="siteSidebar" ref={navRef} aria-label="Site" suppressHydrationWarning>
            <div className="c-sidebar-header">
              <span className="c-sidebar-logo-live-wrap">
                <iframe src={assetHref(current, 'logo.html')} title="Collabrium" scrolling="no" tabIndex={-1} />
              </span>
              <span className="c-sidebar-logo-collapsed c-sidebar-logo-mark-wrap">
                <iframe src={assetHref(current, 'logo-mark.html')} title="Collabrium" scrolling="no" tabIndex={-1} />
              </span>
            </div>
            <div className="c-sidebar-scroll">
              <button className="c-sidebar-item site-search-row js-site-search" type="button" aria-haspopup="dialog" onClick={e => openSearch(e.currentTarget)}>
                <i className="ph ph-magnifying-glass" aria-hidden="true" />
                <span className="label">Search</span>
                <span className="c-sidebar-hover-text">Search</span>
              </button>

              <a className={`c-sidebar-item${current === '' ? ' active' : ''}`} href={link('')} aria-current={current === '' ? 'page' : undefined}>
                <i className="ph-fill ph-house" aria-hidden="true" />
                <span className="label">Home</span>
                <span className="c-sidebar-hover-text">Home</span>
              </a>

              <hr className="c-sidebar-divider" />

              <Parent id="foundation" icon="cube" label="Foundation" activeChild={inFoundation}>
                {foundationPages.map(p => {
                  const key = `foundation/${p.slug}`;
                  const active = current === key;
                  return (
                    <a key={p.slug} className={`c-nav-child${active ? ' active' : ''}`} href={link(key)} aria-current={active ? 'page' : undefined}>
                      {p.title}
                    </a>
                  );
                })}
              </Parent>

              <hr className="c-sidebar-divider" />

              <Parent id="components" icon="squares-four" label="Components" activeChild={inComponents}>
                {navItems.map(c => {
                  const key = `components/${c.slug}`;
                  // A group (AI Native) stays highlighted on its overview and on every part under it.
                  const active = current === key || (c.kind === 'group' && current.startsWith(`${key}/`));
                  return (
                    <a key={c.slug} className={`c-nav-child${active ? ' active' : ''}`} href={link(key)} aria-current={current === key ? 'page' : active ? 'true' : undefined}>
                      {c.title}
                    </a>
                  );
                })}
              </Parent>
            </div>
          </nav>
          <button
            className="site-search-hdr js-site-search"
            type="button"
            aria-label="Search the design system"
            aria-haspopup="dialog"
            title="Search the design system (⌘K)"
            onClick={e => openSearch(e.currentTarget)}
          >
            <i className="ph ph-magnifying-glass" aria-hidden="true" />
          </button>
          <button
            ref={toggleRef}
            className="c-sidebar-toggle js-sidebar-toggle"
            type="button"
            aria-label="Collapse sidebar"
            data-sidebar-toggle="siteSidebar"
            suppressHydrationWarning
          >
            <svg className="js-sidebar-toggle-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
              <line x1="9" y1="3.5" x2="9" y2="16.5" stroke="currentColor" strokeWidth="1.4" />
              <path className="js-sidebar-toggle-arrow" d={ARROW_EXPANDED} stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" suppressHydrationWarning />
            </svg>
          </button>
        </div>
      </div>
      <div className="c-sidebar-hover-label" ref={hoverRef} role="tooltip" />
    </>
  );
}
