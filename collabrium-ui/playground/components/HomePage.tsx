'use client';

// General (home): title, intro, install, Foundation shortcuts and the
// All components grid. The grid is generated from the docs registry.
import { componentDocs } from '../app/_generated/components-docs';
import { components, foundationPages, hrefTo } from '../lib/site';
import { CodeBlock } from './CodeBlock';

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
        <h1 className="section-title">Collabrium UI</h1>
        <p className="hero-tagline">
          The Collabrium design system as React components for Next.js. Plain CSS on the Collabrium tokens, typed props
          for every visual choice, and accessibility and motion built in.
        </p>
        <CodeBlock code={INSTALL} label="Install" />

        <section id="foundation" aria-labelledby="foundation-title" className="docs-section">
          <div className="comp-head">
            <h2 id="foundation-title" className="docs-h2">Foundation</h2>
          </div>
          <div className="c-cards">
            {foundationPages.map(p => (
              <a key={p.slug} className="c-card c-card-interactive docs-card-link" href={hrefTo('', `foundation/${p.slug}`)}>
                <div className="docs-card-head">
                  <i className={`ph-fill ph-${p.icon} docs-card-icon`} aria-hidden="true" />
                  <h3 className="docs-card-title">{p.title}</h3>
                </div>
                <p>{p.summary}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="components" aria-labelledby="components-title" className="docs-section">
          <div className="comp-head">
            <h2 id="components-title" className="docs-h2">All components</h2>
          </div>
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
