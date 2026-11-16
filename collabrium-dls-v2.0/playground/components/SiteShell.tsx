'use client';

// Page chrome, as on the DLS site: top bar, sidebar rail, the mobile jump
// nav below 900px, the scrolling content pane and the search dialog.
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { assetHref, foundationPages, hrefTo, pageKeyFromPathname } from '../lib/site';
import { currentVersion } from '../app/_generated/changelog';
import { SearchDialog, openSearch } from './SearchDialog';
import { Sidebar } from './Sidebar';

export function SiteShell({ children }: { children: ReactNode }) {
  const current = pageKeyFromPathname(usePathname());
  return (
    <>
      <header className="topbar">
        <span className="mark" aria-hidden="true">C</span>
        <span className="crumb">
          <span className="docs-crumb-prefix">
            Design System <span aria-hidden="true">/</span>
          </span>{' '}
          <b>Collabrium UI</b>
        </span>
        <a className="topbar-download" href={assetHref(current, 'collabrium-dls-v2.0.zip')} download="collabrium-dls-v2.0.zip">
          Download
        </a>
        {/* The version is the newest CHANGELOG.md entry (scripts/gen-changelog.mjs), so it can't fall behind. */}
        <a className="flag" href={hrefTo(current, 'changelog')} title="See what changed">
          @collabrium/ui {currentVersion}
        </a>
      </header>

      <SearchDialog current={current} />

      <div className="app-shell">
        <Sidebar current={current} />
        <main className="docs-pane" id="main">
          <nav className="jumpnav" aria-label="Site">
            <div className="shell">
              <button className="site-search-jump js-site-search" type="button" aria-label="Search the design system" aria-haspopup="dialog" onClick={e => openSearch(e.currentTarget)}>
                <i className="ph ph-magnifying-glass" aria-hidden="true" />
              </button>
              <a href={hrefTo(current, '')}>Home</a>
              {foundationPages.map(p => (
                <a key={p.slug} href={hrefTo(current, `foundation/${p.slug}`)}>
                  {p.title}
                </a>
              ))}
              <a href={hrefTo(current, '', 'components')}>Components</a>
              <a href={hrefTo(current, 'changelog')}>Changelog</a>
            </div>
          </nav>
          <div className="shell">{children}</div>
        </main>
      </div>
    </>
  );
}
