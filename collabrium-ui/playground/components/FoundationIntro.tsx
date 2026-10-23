// The header of a Foundation page whose full content arrives in step 2:
// kicker, title and lede, all ported from the DLS site.
import type { FoundationPage } from '../lib/site';

export function FoundationIntro({ page, index }: { page: FoundationPage; index: number }) {
  return (
    <div className="docs-page">
      <article className="docs-article">
        <header className="docs-header">
          <p className="kicker">{String(index + 1).padStart(2, '0')} · Foundations</p>
          <h1 className="section-title">{page.title}</h1>
          <p className="lede">{page.lede}</p>
        </header>
      </article>
    </div>
  );
}
