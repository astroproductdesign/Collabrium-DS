// Site map and links. Server-safe (no docs modules imported here).
import { componentsMeta } from '../app/_generated/components-meta';

export interface FoundationPage {
  slug: string;
  title: string;
  /** Phosphor Fill icon name for the shortcut card. */
  icon: string;
  /** Lede, ported from the matching section of the DLS site. */
  lede: string;
  /** One line for the home page shortcut card. */
  summary: string;
}

/** Foundation pages, in sidebar order (the DLS site's order). */
export const foundationPages: FoundationPage[] = [
  { slug: 'logo', title: 'Logo', icon: 'seal', summary: "Collabrium's mark in every form it ships in.", lede: "Collabrium's mark in every form it ships in — the default lockup, each department's own tinted lockup, and the platform app icon sets. Whenever no department context applies, the Gold default is the one to use." },
  { slug: 'color-palette', title: 'Color Palette', icon: 'palette', summary: 'Five brand accents mapped to elements and departments; Obsidian is the only action colour.', lede: 'Five brand accents map one-to-one to a five-element metaphor and a department cluster — they classify what something belongs to, never mean "click me." Obsidian is the system\'s only actionable color.' },
  { slug: 'typography', title: 'Typography', icon: 'text-aa', summary: 'The 17-step type scale: Mulish for everything functional and every heading.', lede: '17-step type scale, Primary (Mulish) for everything functional and every heading (800 ExtraBold), Secondary (Source Serif 4) reserved for deliberate brand-statement moments only.' },
  { slug: 'fonts', title: 'Fonts', icon: 'text-t', summary: 'Mulish for UI, Source Serif 4 for brand-statement moments.', lede: 'Mulish carries everything functional — UI, body, navigation, buttons, tables, captions, data — and every heading. Source Serif 4 is a deliberate overlay for brand-statement moments only.' },
  { slug: 'iconography', title: 'Iconography', icon: 'shapes', summary: 'Phosphor icons in two weights, chosen by what the icon does.', lede: 'Bold, chunky silhouettes with rounded, organic forms, from a two-library system in two weights — the weight is decided by what the icon does, not by taste.' },
  { slug: 'spacing-shape', title: 'Spacing & Shape', icon: 'ruler', summary: 'The 4pt grid, per-surface radius, the shadow ladder and motion.', lede: '4pt base grid. Collabrium is a product surface, not a marketing page — most layouts run full-bleed within the app shell rather than centering. Radius is per-surface, not one flat scale.' },
  { slug: 'guidelines', title: 'Guidelines', icon: 'list-checks', summary: 'Every rule in the system, condensed.', lede: 'The condensed, skimmable version of every rule in this system.' },
];

export const components = componentsMeta;

/** A page key is its path without the leading slash or extension: '', 'foundation/color-palette', 'components/button'. */
export type PageKey = string;

/**
 * The current page, from the router's pathname. Matched against the known
 * page keys by suffix, because a page opened from disk reports its full
 * file path (/Users/…/out/components/button.html), not /components/button.
 */
export function pageKeyFromPathname(pathname: string | null): PageKey {
  const p = (pathname ?? '/').replace(/\.html$/, '').replace(/\/+$/, '');
  const hit = pageOrder()
    .map(page => page.key)
    .filter(Boolean)
    .find(key => p === `/${key}` || p.endsWith(`/${key}`));
  return hit ?? '';
}

const isExport = process.env.NODE_ENV === 'production';

/**
 * A link from one page to another, relative to the current page, so the
 * same HTML works from disk (file://), on Vercel and in the dev server.
 * The static export serves pages as .html files; the dev server serves
 * them without the extension.
 */
export function hrefTo(from: PageKey, to: PageKey, hash?: string): string {
  const depth = from ? from.split('/').length - 1 : 0;
  const up = '../'.repeat(depth);
  const target = to ? `${to}${isExport ? '.html' : ''}` : isExport ? 'index.html' : up ? '' : './';
  return `${up}${target}${hash ? `#${hash}` : ''}` || './';
}

/** Pages in sidebar order, for previous / next links. */
export function pageOrder(): { key: PageKey; title: string; group: string }[] {
  return [
    { key: '', title: 'General', group: 'General' },
    ...foundationPages.map(p => ({ key: `foundation/${p.slug}`, title: p.title, group: 'Foundation' })),
    ...components.map(c => ({ key: `components/${c.slug}`, title: c.title, group: 'Components' })),
  ];
}

export function neighbours(key: PageKey) {
  const order = pageOrder();
  const i = order.findIndex(p => p.key === key);
  return { prev: i > 0 ? order[i - 1] : null, next: i > -1 && i < order.length - 1 ? order[i + 1] : null };
}

/** A file in playground/public (logo.html, logo-mark.html), relative to the current page. */
export function assetHref(from: PageKey, file: string): string {
  const depth = from ? from.split('/').length - 1 : 0;
  return `${'../'.repeat(depth)}${file}`;
}
