// Site map and links. Server-safe (no docs modules imported here).
import { componentsMeta, groupsMeta, navMeta, type ComponentMeta } from '../app/_generated/components-meta';

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

/** Every component, the parts of groups included. */
export const components = componentsMeta;
/** Groups (AI Native): one overview page each, with the parts under it. */
export const groups = groupsMeta;
/** What the sidebar and the home grid list: stand-alone components and whole groups, in order. */
export const navItems = navMeta;

/** A page key is its path without the leading slash or extension: '', 'foundation/color-palette', 'components/button'. */
export type PageKey = string;

/** The page key of a component: components/<slug>, or components/<group>/<slug> for a part of a group. */
export function componentKey(c: Pick<ComponentMeta, 'slug' | 'group'>): PageKey {
  return c.group ? `components/${c.group}/${c.slug}` : `components/${c.slug}`;
}

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
    ...componentSequence(),
  ];
}

/** Components in reading order: stand-alone ones, and each group's overview followed by its parts. */
function componentSequence(): { key: PageKey; title: string; group: string }[] {
  return navItems.flatMap(n => {
    if (n.kind === 'component') return [{ key: `components/${n.slug}`, title: n.title, group: 'Components' }];
    const g = groups.find(x => x.slug === n.slug)!;
    return [
      { key: `components/${g.slug}`, title: g.title, group: 'Components' },
      ...g.parts.map(slug => {
        const part = components.find(c => c.slug === slug)!;
        return { key: componentKey(part), title: part.title, group: g.title };
      }),
    ];
  });
}

/**
 * Previous and next component, in sidebar order, for the arrows on a
 * component page. They move between components only and wrap around, so
 * the last component's Next is the first, and every component page can
 * reach another one. A group is one stop for its overview followed by one
 * stop per part, so from AI Native the arrows walk into Loading State and
 * Thinking, and from the first part Previous goes back to the overview.
 * With a single page there is nowhere to go.
 */
export function neighbours(key: PageKey) {
  const list = componentSequence();
  const i = list.findIndex(p => p.key === key);
  if (i < 0 || list.length < 2) return { prev: null, next: null };
  return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}

/**
 * Where "Back" goes from a page: a part of a group goes to its group's
 * overview; anything else goes to the Components list on the home page.
 */
export function parentOf(key: PageKey): { key: PageKey; hash?: string; title: string } {
  const part = components.find(c => c.group && componentKey(c) === key);
  const group = part && groups.find(g => g.slug === part.group);
  return group ? { key: `components/${group.slug}`, title: group.title } : { key: '', hash: 'components', title: 'Components' };
}

/** A file in playground/public (logo.html, logo-mark.html), relative to the current page. */
export function assetHref(from: PageKey, file: string): string {
  const depth = from ? from.split('/').length - 1 : 0;
  return `${'../'.repeat(depth)}${file}`;
}
