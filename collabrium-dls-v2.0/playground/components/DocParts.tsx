'use client';

// Pieces shared by the component pages and the group overview pages.
import { hrefTo, neighbours, parentOf, type PageKey } from '../lib/site';

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


/**
 * `compact="back"` is one arrow left of the title that goes up to the parent
 * (the group overview, or the Components list). `compact="step"` is the
 * Previous and Next arrows together, beside Copy page. Without `compact` it
 * is the Previous and Next cards at the foot of the page.
 */
export function PrevNext({ current, compact }: { current: PageKey; compact?: 'back' | 'step' }) {
  const { prev, next } = neighbours(current);
  if (compact === 'back') {
    const parent = parentOf(current);
    return (
      <a className="c-back-button docs-pn-arrow" href={hrefTo(current, parent.key, parent.hash)} aria-label={`Back to ${parent.title}`} title={`Back to ${parent.title}`}>
        <i className="ph ph-arrow-left" aria-hidden="true" />
      </a>
    );
  }
  if (compact === 'step') {
    if (!prev && !next) return null;
    return (
      <div className="docs-pn-step" role="group" aria-label="Previous and next component">
        {prev && (
          <a className="c-back-button docs-pn-arrow" href={hrefTo(current, prev.key)} aria-label={`Previous: ${prev.title}`} title={`Previous: ${prev.title}`}>
            <i className="ph ph-caret-left" aria-hidden="true" />
          </a>
        )}
        {next && (
          <a className="c-back-button docs-pn-arrow" href={hrefTo(current, next.key)} aria-label={`Next: ${next.title}`} title={`Next: ${next.title}`}>
            <i className="ph ph-caret-right" aria-hidden="true" />
          </a>
        )}
      </div>
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

