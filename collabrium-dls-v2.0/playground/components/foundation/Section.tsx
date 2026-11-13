// One Foundation section, as on the DLS site: kicker, serif title, lede.
// level 1 = its own page (title is the page h1); level 2 = on the home page.
import type { ReactNode } from 'react';

export type Level = 1 | 2;

export interface SectionProps {
  /** Path prefix to playground/public from the current page ('' or '../'). */
  base: string;
  level: Level;
}

export function Section({
  id,
  kicker,
  title,
  lede,
  level,
  aside,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  /** The DLS Fonts section has none. */
  lede?: ReactNode;
  level: Level;
  /** Optional action beside the title (the DLS .section-header row). */
  aside?: ReactNode;
  children: ReactNode;
}) {
  const H = level === 1 ? 'h1' : 'h2';
  const head = (
    <>
      <p className="kicker">{kicker}</p>
      <H className="section-title" id={`${id}-title`}>
        {title}
      </H>
    </>
  );
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="docs-foundation">
      {aside ? (
        <div className="section-header">
          <div>{head}</div>
          {aside}
        </div>
      ) : (
        head
      )}
      {lede && <p className="lede">{lede}</p>}
      {children}
    </section>
  );
}

/** Group label (DLS .swatch-group-label), one heading level below the section title. */
export function GroupLabel({ level, id, children }: { level: Level; id?: string; children: ReactNode }) {
  const H = level === 1 ? 'h2' : 'h3';
  return (
    <H className="swatch-group-label" id={id}>
      {children}
    </H>
  );
}

/** Heading inside a card, two levels below the section title. */
export function cardHeading(level: Level) {
  return level === 1 ? 'h3' : 'h4';
}
