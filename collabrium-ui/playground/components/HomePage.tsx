'use client';

// Home: the logo, a short intro and install, then every Foundation
// section in full (as on the DLS site, not behind cards), then the All
// components grid, which is generated from the docs registry.
import { componentDocs, groupDocs } from '../app/_generated/components-docs';
import { Card, CardGrid, CardTitle } from '../../src';
import { DownloadSimple } from '@phosphor-icons/react';
import { assetHref, foundationPages, hrefTo, navItems } from '../lib/site';
import { BackToTop } from './BackToTop';
import { ThumbFit } from './ThumbFit';
import { CodeBlock } from './CodeBlock';
import { foundationSections } from './foundation';

const INSTALL = `npm install @collabrium/ui

// app/layout.tsx
import '@collabrium/ui/styles.css';`;

export function HomePage() {
  return (
    <div className="docs-page">
      <article className="docs-article">
        <div className="hero-logo">
          <iframe src="logo.html" title="Collabrium animated logo" scrolling="no" tabIndex={-1} />
        </div>
        {/* Not shown: the logo above is the visual title. Kept for screen readers and the page outline. */}
        <h1 className="sr-only">Collabrium UI</h1>
        <p className="hero-tagline">
          The Collabrium design system as React components for Next.js. Plain CSS on the Collabrium tokens, typed props
          for every visual choice, and accessibility and motion built in.
        </p>
        <CodeBlock code={INSTALL} label="Install" />

        {/* A real link styled as the library's Button (Button renders a <button> and has no href). */}
        <div className="docs-download">
          <a className="cui-button" data-variant="primary" data-size="md" href={assetHref('', 'collabrium-ui.zip')} download="collabrium-ui.zip">
            <DownloadSimple className="cui-button__icon" weight="regular" aria-hidden="true" focusable="false" />
            <span className="cui-button__label">Download Collabrium UI</span>
          </a>
          <p className="docs-status">
            The whole project as a .zip: the library source, the docs site and the written rules. Unzip it, run{' '}
            <code>npm install</code>, then <code>npm run build</code>.
          </p>
        </div>

        {foundationPages.map(p => {
          const Content = foundationSections[p.slug];
          return <Content key={p.slug} base="" level={2} />;
        })}

        <section id="components" aria-labelledby="components-title" className="docs-section">
          <p className="kicker">Components</p>
          <h2 id="components-title" className="section-title">
            All components
          </h2>
          <CardGrid>
            {navItems.map(c => {
              // A group (AI Native) is one card, with the group's own thumbnail.
              const d = c.kind === 'group' ? groupDocs[c.slug] : componentDocs[c.slug];
              const thumb = d.thumbnail ? d.thumbnail() : 'examples' in d ? d.examples?.[0]?.render() : null;
              return (
                <Card key={c.slug}>
                  <ThumbFit>
                    {thumb ?? <span className="docs-p">Coming soon.</span>}
                  </ThumbFit>
                  <CardTitle href={hrefTo('', `components/${c.slug}`)}>{c.title}</CardTitle>
                </Card>
              );
            })}
          </CardGrid>
        </section>
      </article>
      <BackToTop />
    </div>
  );
}
