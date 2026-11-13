// Ink-doodle motifs for Page hero's illustration tile, drawn to the DLS Illustration rules: monoline --ill-ink
// strokes, --ill-paper fills, --ill-accent on 1 to 3 small areas, a --ill-tint disc behind. Ported from Workdesk's
// project tiles (workdesk.html ILL_OBJ); calendar, bell and people are new, drawn the same way.
// Classes inside the SVG: p = paper fill, k = ink fill, a = accent fill, t = tint (no stroke).
import type { ReactNode } from 'react';

export type PageHeroIllustration =
  | 'ball'
  | 'balloon'
  | 'bell'
  | 'blocks'
  | 'calendar'
  | 'card'
  | 'chart'
  | 'envelope'
  | 'film'
  | 'lamp'
  | 'lantern'
  | 'megaphone'
  | 'moon'
  | 'news'
  | 'notes'
  | 'people'
  | 'phone'
  | 'play'
  | 'tag'
  | 'tv';

export const PAGE_HERO_ILLUSTRATIONS: readonly PageHeroIllustration[] = [
  'ball', 'balloon', 'bell', 'blocks', 'calendar', 'card', 'chart', 'envelope', 'film', 'lamp',
  'lantern', 'megaphone', 'moon', 'news', 'notes', 'people', 'phone', 'play', 'tag', 'tv',
];

const MOTIFS: Record<PageHeroIllustration, ReactNode> = {
  tv: (
    <g transform="rotate(-4 48 30)">
      <path d="M42 13L36 5M54 13L60 5" />
      <circle className="k" cx="36" cy="5" r="1.2" />
      <circle className="k" cx="60" cy="5" r="1.2" />
      <rect className="p" x="23" y="13" width="50" height="31" rx="4" />
      <rect className="a" x="27.5" y="17.5" width="41" height="22" rx="2" />
      <path d="M38 44L35 50M58 44L61 50" />
    </g>
  ),
  news: (
    <g transform="rotate(6 48 28)">
      <rect className="p" x="25" y="10" width="46" height="36" rx="2" />
      <rect className="a" x="29.5" y="14.5" width="37" height="6" rx="1" />
      <path d="M30 26H47M30 30.5H47M30 35H43M30 40.5H66" />
      <rect className="p" x="51" y="25" width="15.5" height="11" rx="1" />
      <path d="M51.5 33.5L56 29.5 59 32 62 29 66 33" />
    </g>
  ),
  play: (
    <g transform="rotate(5 48 30)">
      <rect className="p" x="25" y="13" width="46" height="32" rx="3.5" />
      <path d="M25.5 19.5H70.5" />
      <circle className="k" cx="29.2" cy="16.3" r="1" />
      <circle cx="33.2" cy="16.3" r="1" />
      <path className="a" d="M44 24.5L55 31 44 37.3Z" />
    </g>
  ),
  phone: (
    <g transform="rotate(-6 48 30)">
      <rect className="p" x="36" y="7" width="25" height="42" rx="4.5" />
      <path d="M45 11.2H52" />
      <circle className="k" cx="42.5" cy="19" r="2" />
      <path d="M47 19H55.5" />
      <circle cx="42.5" cy="26.5" r="2" />
      <path d="M47 26.5H54" />
      <circle cx="42.5" cy="34" r="2" />
      <path d="M47 34H52" strokeDasharray="2 2.5" />
      <rect className="a" x="40" y="40" width="17" height="5" rx="2.5" />
    </g>
  ),
  megaphone: (
    <g transform="rotate(-14 46 30)">
      <path className="p" d="M28 26.2L50 16.5 50.5 41 28.5 33.2Z" />
      <ellipse className="a" cx="50.3" cy="28.8" rx="3.6" ry="12.4" />
      <path className="k" d="M24 25.6h4.5v7.8H24q-1.5 0-1.5-1.5v-4.8q0-1.5 1.5-1.5z" />
      <path d="M31 34.2L33 43M58 22l5-3M59.5 29h6M58 36l5 3" />
    </g>
  ),
  blocks: (
    <g transform="rotate(8 48 28)">
      <rect className="p" x="29" y="12" width="15" height="15" rx="2.5" />
      <rect className="k" x="48" y="12.4" width="15" height="15" rx="2.5" />
      <rect className="p" x="29.3" y="31" width="15" height="15" rx="2.5" />
      <circle className="a" cx="55.5" cy="38.5" r="7.5" />
    </g>
  ),
  balloon: (
    <g transform="rotate(-8 48 28)">
      <path className="a" d="M48 8C56 8 61 14.5 60.5 22 60 30 53.5 36 48.5 36.5 43 36 36.5 30 36 22 35.6 14.5 40.5 8 48 8Z" />
      <path className="k" d="M46.2 36.4L48.5 39.5 50.8 36.4Z" />
      <path d="M41 18Q41.8 13.8 45.5 12.5M48.5 39.5q-3 3 0 6t0 6" />
    </g>
  ),
  moon: (
    <g transform="rotate(-6 48 28)">
      <path className="p" d="M52 9C42 10 35.5 18 36 27.5 36.6 37 45 43.5 54.5 42.5 47.5 39.5 43.5 33 44 25.5 44.5 18 48 12 52 9Z" />
      <path className="a" d="M60 19l1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6-3.6-1.4 3.6-1.4z" />
    </g>
  ),
  card: (
    <g transform="rotate(-7 48 30)">
      <rect className="p" x="25" y="15" width="46" height="30" rx="3.5" />
      <rect className="k" x="25" y="21" width="46" height="5.5" />
      <rect className="a" x="30" y="31" width="8" height="6" rx="1.2" />
      <path d="M43 34H52" strokeDasharray="2 2.5" />
    </g>
  ),
  ball: (
    <g transform="rotate(10 48 28)">
      <circle className="p" cx="48" cy="27" r="15" />
      <path className="a" d="M48 21L53.5 25 51.5 31.5H44.5L42.5 25Z" />
      <path d="M48 21V12.5M53.5 25L61.5 22.3M51.5 31.5L56 38.5M44.5 31.5L40 38.5M42.5 25L34.6 22.4" />
    </g>
  ),
  film: (
    <g transform="rotate(-6 48 30)">
      <rect className="p" x="27" y="24" width="42" height="22" rx="2.5" />
      <path d="M27.5 30H68.5" />
      <g transform="rotate(-12 27 23)">
        <rect className="p" x="27" y="16" width="42" height="7" rx="1.5" />
        <path className="k" d="M33 16h5l-4 7h-5zM45 16h5l-4 7h-5zM57 16h5l-4 7h-5z" />
      </g>
      <path className="a" d="M45 33.5L52 37.5 45 41.5Z" />
    </g>
  ),
  tag: (
    <g transform="rotate(14 48 28)">
      <path className="p" d="M34 14H54L64 27 54 40H34Q31 40 31 37V17Q31 14 34 14Z" />
      <circle cx="55" cy="27" r="2.6" />
      <rect className="a" x="37" y="21" width="10" height="4" rx=".8" />
      <path d="M37 31H48" strokeDasharray="2 2.5" />
      <path d="M57.4 26.2q6-2 8-10" />
    </g>
  ),
  lantern: (
    <g transform="rotate(7 48 28)">
      <path d="M48 4V11" />
      <rect className="k" x="42" y="10.5" width="12" height="4" rx="1" />
      <ellipse className="a" cx="48" cy="26" rx="14" ry="11.5" />
      <path d="M48 14.5V37.5M41.5 15.8Q37 26 41.5 36.2M54.5 15.8Q59 26 54.5 36.2" />
      <rect className="k" x="42" y="37" width="12" height="4" rx="1" />
    </g>
  ),
  lamp: (
    <g transform="rotate(-5 48 32)">
      <path className="a" d="M30 33Q48 31 66 33 63 44 48 45 33 44 30 33Z" />
      <path d="M60.5 33Q66 30 69 26.5" />
      <path className="k" d="M48 31C44 27 44.5 22 48 15 51.5 22 52 27 48 31Z" />
      <path d="M41 15l-2.5-3M55 15l2.5-3M48 10V6.5" />
    </g>
  ),
  notes: (
    <>
      <g transform="rotate(-10 38 30)">
        <rect className="p" x="27" y="14" width="22" height="26" rx="1.5" />
        <path d="M41 14L49 22" strokeDasharray="2 2.5" />
      </g>
      <g transform="rotate(9 58 28)">
        <rect className="a" x="46" y="11" width="22" height="28" rx="1.5" />
        <path d="M52.5 28L57 17 61.5 28M54 24.5H60" />
      </g>
    </>
  ),
  chart: (
    <g transform="rotate(6 48 28)">
      <rect className="p" x="27" y="11" width="42" height="34" rx="3" />
      <path d="M32 39H64" />
      <rect className="p" x="35" y="29" width="6" height="10" />
      <rect className="a" x="45" y="19" width="6" height="20" />
      <rect className="p" x="55" y="24" width="6" height="15" />
    </g>
  ),
  envelope: (
    <g transform="rotate(-8 48 28)">
      <rect className="p" x="27" y="15" width="42" height="28" rx="2.5" />
      <path d="M28 17L48 31 68 17" />
      <rect className="a" x="59" y="19.5" width="6" height="5" rx=".8" />
    </g>
  ),
  // New: a wall calendar, blue header band, two rings, a few days and one circled date (leave)
  calendar: (
    <g transform="rotate(-6 48 28)">
      <rect className="p" x="27" y="12" width="42" height="34" rx="3" />
      <path className="a" d="M30 12H66Q69 12 69 15V20.5H27V15Q27 12 30 12Z" />
      <path d="M36 8V15M60 8V15" />
      <circle className="k" cx="35" cy="27.5" r="1.3" />
      <circle className="k" cx="43" cy="27.5" r="1.3" />
      <circle className="k" cx="51" cy="27.5" r="1.3" />
      <circle className="k" cx="59" cy="27.5" r="1.3" />
      <circle className="k" cx="35" cy="35.5" r="1.3" />
      <circle className="k" cx="43" cy="35.5" r="1.3" />
      <circle cx="56" cy="36" r="4.5" />
      <path d="M53.8 36.2L55.4 37.8 58.4 34.4" />
    </g>
  ),
  // New: a bell with its clapper and a blue unread dot (notifications)
  bell: (
    <g transform="rotate(10 48 28)">
      <path d="M48 6V10" />
      <path className="k" d="M44 38Q44 43 48 43 52 43 52 38Z" />
      <path className="p" d="M48 10C40.5 10 36.5 15.5 36.5 23V32L32 38H64L59.5 32V23C59.5 15.5 55.5 10 48 10Z" />
      <path d="M41 20Q41.5 15.5 45 14" />
      <circle className="a" cx="60" cy="12" r="5" />
    </g>
  ),
  // New: two people, the one behind in blue (a team)
  people: (
    <g transform="rotate(-4 48 28)">
      <circle className="a" cx="58" cy="19" r="6" />
      <path className="a" d="M46 44Q46 30 58 30 70 30 70 44Z" />
      <circle className="p" cx="40" cy="19.5" r="7" />
      <path className="p" d="M26 46Q26 31 40 31 54 31 54 46Z" />
      <path d="M36.5 39.5V46" />
    </g>
  ),
};

/** A four-point sparkle, drawn as one closed path. */
function spark(x: number, y: number, r: number) {
  return `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`;
}

/** The illustration inside Page hero's tile: tint disc, floating accents (mirrored on odd-length names), the motif. */
export function PageHeroArt({ motif }: { motif: PageHeroIllustration }) {
  const flip = motif.length % 2 === 1;
  return (
    <svg className="cui-page-hero__art" viewBox="0 0 96 96" aria-hidden="true" focusable="false" data-motif={motif}>
      <circle className="t" cx="48" cy="50" r="34" />
      {flip ? (
        <g className="cui-page-hero__accents">
          <path className="p" d={spark(82, 13, 5)} />
          <path d="M13 11v6M10 14h6" />
          <circle className="k" cx="88" cy="40" r="1.3" />
          <path d="M8 52l2 4" />
        </g>
      ) : (
        <g className="cui-page-hero__accents">
          <path className="p" d={spark(14, 14, 4.5)} />
          <path d="M83 9v6M80 12h6" />
          <circle className="k" cx="8" cy="42" r="1.3" />
          <path d="M86 56l3-2.5" />
        </g>
      )}
      <g transform="translate(48 50) scale(1.4) translate(-47.5 -28)">{MOTIFS[motif]}</g>
    </svg>
  );
}
