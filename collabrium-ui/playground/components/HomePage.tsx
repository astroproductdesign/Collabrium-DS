'use client';

// Home: the logo, a short intro and install, then every Foundation
// section in full (as on the DLS site, not behind cards), then the All
// components grid, which is generated from the docs registry.
import { componentDocs } from '../app/_generated/components-docs';
import { components, foundationPages, hrefTo } from '../lib/site';
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

        {foundationPages.map(p => {
          const Content = foundationSections[p.slug];
          return <Content key={p.slug} base="" level={2} />;
        })}

        <section id="components" aria-labelledby="components-title" className="docs-section">
          <p className="kicker">Components</p>
          <h2 id="components-title" className="section-title">
            All components
          </h2>
          <div className="c-cards">
            {components.map(c => {
              const d = componentDocs[c.slug];
              const thumb = d.thumbnail ? d.thumbnail() : d.examples[0]?.render();
              return (
                <div key={c.slug} className="c-card c-card-interactive docs-comp-card">
                  {/* inert: the thumbnail is a picture of the component, not a control */}
                  <div className="docs-comp-thumb" inert>
                    {thumb}
                  </div>
                  <h3 className="docs-card-title">
                    <a className="docs-stretched" href={hrefTo('', `components/${c.slug}`)}>
                      {c.title}
                    </a>
                  </h3>
                </div>
              );
            })}
          </div>
        </section>
      </article>
    </div>
  );
}
