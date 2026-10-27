'use client';

// Pieces shared by the component pages and the group overview pages.
import { hrefTo, neighbours, type PageKey } from '../lib/site';

export const SOON = 'Coming soon.';

export function ComingSoon() {
  return <p className="docs-p">{SOON}</p>;
}

export function SectionHead({ id, title }: { id: string; title: string }) {
  return (
    <div className="comp-head">
      <h2 id={`${id}-title`} className="docs-h2">
        {title}
      </h2>
    </div>
  );
}


/** `compact` shows one arrow beside the title row: "prev" left of the name, "next" right of Copy page. */
export function PrevNext({ current, compact }: { current: PageKey; compact?: 'prev' | 'next' }) {
  const { prev, next } = neighbours(current);
  if (compact) {
    const target = compact === 'prev' ? prev : next;
    if (!target) return null;
    const word = compact === 'prev' ? 'Previous' : 'Next';
    return (
      <a className="c-back-button docs-pn-arrow" href={hrefTo(current, target.key)} aria-label={`${word}: ${target.title}`} title={`${word}: ${target.title}`}>
        <i className={`ph ph-arrow-${compact === 'prev' ? 'left' : 'right'}`} aria-hidden="true" />
      </a>
    );
  }
  return (
    <nav className="docs-pn" aria-label="Previous and next pages">
      {prev ? (
        <a className="c-back-button docs-pn-link" href={hrefTo(current, prev.key)}>
          <i className="ph ph-arrow-left" aria-hidden="true" />
          <span>
            <span className="docs-pn-dir">Previous</span>
            {prev.title}
          </span>
        </a>
      ) : (
        <span />
      )}
      {next && (
        <a className="c-back-button docs-pn-link is-next" href={hrefTo(current, next.key)}>
          <span>
            <span className="docs-pn-dir">Next</span>
            {next.title}
          </span>
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </a>
      )}
    </nav>
  );
}

