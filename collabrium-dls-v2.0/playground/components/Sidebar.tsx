'use client';

// The docs site's sidebar, built on the library's own SidebarNav: the live Collabrium logo, Home, then Foundation and
// Components as parents whose children are the pages. Collapsed state is remembered (sidebarNavInitScript stops a
// flash on load). Search: an icon beside the logo while expanded; a row at the top of the collapsed rail.
import { useLayoutEffect, useState } from 'react';
import { Cube, House, MagnifyingGlass, SquaresFour } from '@phosphor-icons/react';
import { SidebarNav, sidebarNavInitScript, type SidebarNavSection } from '../../src';
import { assetHref, foundationPages, hrefTo, navItems, type PageKey } from '../lib/site';
import { openSearch } from './SearchDialog';

const COLLAPSE_KEY = 'collabrium-sidebar-collapsed';
const SHELL_ID = 'siteSidebar';

/** Runs during HTML parsing, before first paint, so a collapsed rail never flashes open. */
export const sidebarInitScript = sidebarNavInitScript(COLLAPSE_KEY, SHELL_ID);

export function Sidebar({ current }: { current: PageKey }) {
  const [collapsed, setCollapsed] = useState(false);
  useLayoutEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSE_KEY) === '1');
    } catch {
      /* storage blocked */
    }
  }, []);
  const onCollapsedChange = (next: boolean) => {
    setCollapsed(next);
    try {
      localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0');
    } catch {
      /* storage blocked: the rail still toggles for this page */
    }
  };

  const link = (to: PageKey) => hrefTo(current, to);
  // A group (AI Native) stays highlighted on its overview and on every part under it.
  const activeComponent = navItems.find(
    (c) => current === `components/${c.slug}` || (c.kind === 'group' && current.startsWith(`components/${c.slug}/`)),
  );
  const activeId = current === '' ? 'home' : current.startsWith('foundation/') ? current : activeComponent ? `components/${activeComponent.slug}` : null;

  const sections: SidebarNavSection[] = [
    {
      id: 'top',
      items: [
        // Collapsed, the header has no room for the search icon, so search becomes the rail's first row.
        ...(collapsed
          ? [{ id: 'search', label: 'Search', icon: MagnifyingGlass, onSelect: () => openSearch(document.activeElement as HTMLElement) }]
          : []),
        { id: 'home', label: 'Home', icon: House, href: link('') },
      ],
    },
    {
      id: 'foundation',
      items: [
        {
          id: 'foundation',
          label: 'Foundation',
          icon: Cube,
          defaultExpanded: true,
          children: foundationPages.map((p) => ({ id: `foundation/${p.slug}`, label: p.title, href: link(`foundation/${p.slug}`) })),
        },
      ],
    },
    {
      id: 'components',
      items: [
        {
          id: 'components',
          label: 'Components',
          icon: SquaresFour,
          defaultExpanded: true,
          children: navItems.map((c) => ({ id: `components/${c.slug}`, label: c.title, href: link(`components/${c.slug}`) })),
        },
      ],
    },
  ];

  return (
    <div className="nav-rail">
      <div className="docs-site-nav">
        <SidebarNav
          id={SHELL_ID}
          label="Site"
          logo={{ kind: 'live', src: assetHref(current, 'logo.html'), markSrc: assetHref(current, 'logo-mark.html') }}
          sections={sections}
          activeId={activeId}
          collapsed={collapsed}
          onCollapsedChange={onCollapsedChange}
          suppressHydrationWarning
        />
        <button
          className="site-search-hdr js-site-search"
          type="button"
          aria-label="Search the design system"
          aria-haspopup="dialog"
          title="Search the design system (⌘K)"
          hidden={collapsed}
          onClick={(e) => openSearch(e.currentTarget)}
        >
          <MagnifyingGlass size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
