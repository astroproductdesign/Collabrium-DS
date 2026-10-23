// Site map and links. Server-safe (no docs modules imported here).
import { componentsMeta } from '../app/_generated/components-meta';

export interface FoundationPage {
  slug: string;
  title: string;
}

/** Foundation pages, in sidebar order (the DLS site's order). Content lives in components/foundation. */
export const foundationPages: FoundationPage[] = [
  { slug: 'logo', title: 'Logo' },
  { slug: 'color-palette', title: 'Color Palette' },
  { slug: 'typography', title: 'Typography' },
  { slug: 'fonts', title: 'Fonts' },
  { slug: 'iconography', title: 'Iconography' },
  { slug: 'spacing-shape', title: 'Spacing & Shape' },
  { slug: 'guidelines', title: 'Guidelines' },
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
    { key: '', title: 'Home', group: 'Home' },
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
