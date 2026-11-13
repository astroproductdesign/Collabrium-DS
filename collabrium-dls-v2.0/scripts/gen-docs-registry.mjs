// Generates the docs site's component registry from what exists in
// src/components: every <Name>.docs.tsx becomes a page. A folder usually has
// one, named after the folder; a variant that lives inside another
// component's folder (Selectable card and USP card, inside Card) has its own
// docs file there, next to the component's, and gets its own page.
// A docs file that exports `group` (a name such as 'AI Native') is a part of
// that group: it drops out of the sidebar and home grid, and its page lives
// under the group's overview page (components/<group-slug>/<part-slug>).
// Two source folders are groups by themselves, whatever their docs files say:
// src/charts-extra (group "Charts (extra)") and src/motion (group "Motion").
// Their pages live under the group's overview page, which exists even before
// the first part does (every part is then a "Coming soon" card).
// Writes two files so server code never imports the docs modules (which
// contain client-only code):
//   playground/app/_generated/components-meta.ts  plain data (server-safe)
//   playground/app/_generated/components-docs.ts  docs modules (client only)
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
// Source folders the docs files are read from. A folder with `group` puts all
// its parts in that group; `components` takes the group from each docs file.
const sources = [
  { dir: 'components', group: null },
  // The Chart.js set: the "Charts" group. Its pages drop "-chart" from their address (components/charts/bar), so
  // they never share a slug with Charts (extra)'s (components/charts-extra/bar-chart).
  { dir: 'charts', group: 'Charts', slugTrim: /-chart$/ },
  { dir: 'charts-extra', group: 'Charts (extra)' },
  { dir: 'motion', group: 'Motion' },
];
const groupDir = `${root}playground/content/groups`;
const outDir = `${root}playground/app/_generated`;

const slugify = s => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
const byTitle = (a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });

const entries = sources.flatMap(({ dir, group: fixedGroup, slugTrim }) => {
  const base = `${root}src/${dir}`;
  if (!existsSync(base)) return [];
  return readdirSync(base, { withFileTypes: true })
    // A component folder has its own <Folder>.docs.tsx; helper folders (lib) don't, and are skipped.
    .filter(d => d.isDirectory() && existsSync(`${base}/${d.name}/${d.name}.docs.tsx`))
    .flatMap(d =>
      readdirSync(`${base}/${d.name}`)
        .filter(f => /^[A-Z]\w*\.docs\.tsx$/.test(f))
        .map(f => ({ folder: d.name, name: f.slice(0, -'.docs.tsx'.length) })),
    )
    .map(({ folder, name }) => {
      const docsSrc = readFileSync(`${base}/${folder}/${name}.docs.tsx`, 'utf8');
      const m = /export const title\s*=\s*(['"])(.+?)\1/.exec(docsSrc);
      if (!m) throw new Error(`${folder}/${name}.docs.tsx must export a string \`title\``);
      const g = /export const group\s*=\s*(['"])(.+?)\1/.exec(docsSrc);
      // A variant's docs file has no component file of its own: it takes the folder's.
      const compFiles = [name, folder].flatMap(n => [`${base}/${folder}/${n}.tsx`, `${base}/${folder}/${n}.ts`]).filter(existsSync);
      const client = compFiles.length > 0 && /^\s*['"]use client['"]/.test(readFileSync(compFiles[0], 'utf8'));
      return { dir, folder, name, slug: slugTrim ? slugify(name).replace(slugTrim, '') : slugify(name), title: m[2], client, groupTitle: fixedGroup ?? (g ? g[2] : null) };
    });
});

// A part's page address is components/<group>/<part>, and a stand-alone
// component's is components/<slug>: every slug must be unique across both.
const seen = new Map();
for (const e of entries) {
  if (seen.has(e.slug)) throw new Error(`Two components share the slug "${e.slug}": ${seen.get(e.slug)} and ${e.folder}/${e.name}`);
  seen.set(e.slug, `${e.folder}/${e.name}`);
}

// Groups: one per distinct `group` name, each with an overview file.
const groupTitles = [...new Set([...sources.filter(x => x.group).map(x => x.group), ...entries.filter(e => e.groupTitle).map(e => e.groupTitle)])];
const groups = groupTitles.map(title => {
  const slug = slugify(title);
  if (seen.has(slug)) throw new Error(`The group "${title}" has the same slug ("${slug}") as a component`);
  if (!existsSync(`${groupDir}/${slug}.tsx`)) {
    throw new Error(`The group "${title}" needs an overview file at playground/content/groups/${slug}.tsx`);
  }
  const parts = entries.filter(e => e.groupTitle === title).sort(byTitle);
  return { slug, title, parts: parts.map(p => p.slug) };
});
for (const e of entries) e.group = e.groupTitle ? slugify(e.groupTitle) : undefined;

// The sidebar and home grid list stand-alone components and groups together:
// alphabetical by label (the DLS site's rule)...
const nav = [
  ...entries.filter(e => !e.group).map(e => ({ kind: 'component', slug: e.slug, title: e.title })),
  ...groups.map(g => ({ kind: 'group', slug: g.slug, title: g.title })),
].sort(byTitle);
// ...except Charts sits directly above Chart color mapping.
const charts = nav.findIndex(e => e.title === 'Charts');
const chartMap = nav.findIndex(e => e.title === 'Chart color mapping');
if (charts > -1 && chartMap > -1 && charts !== chartMap - 1) {
  const [c] = nav.splice(charts, 1);
  nav.splice(nav.findIndex(e => e.title === 'Chart color mapping'), 0, c);
}

mkdirSync(outDir, { recursive: true });
// A docs module's import name: unique across source folders (Charts and Charts (extra) both have a BarChart).
const alias = e => `${e.dir.replace(/-(.)/g, (_, c) => c.toUpperCase())}_${e.name}Docs`;
const header = '// GENERATED by scripts/gen-docs-registry.mjs. Do not edit.\n';

const allSorted = [...entries].sort(byTitle);
writeFileSync(`${outDir}/components-meta.ts`, `${header}
export interface ComponentMeta {
  slug: string;
  title: string;
  /** True when the component file starts with "use client". */
  client: boolean;
  /** Slug of the group this component is a part of, if any. */
  group?: string;
}

export interface GroupMeta {
  slug: string;
  title: string;
  /** Slugs of the parts, alphabetical. */
  parts: string[];
}

/** A line in the sidebar and the home grid: a stand-alone component or a whole group. */
export interface NavMeta {
  kind: 'component' | 'group';
  slug: string;
  title: string;
}

/** Every component, parts of groups included. */
export const componentsMeta: ComponentMeta[] = ${JSON.stringify(
  allSorted.map(({ slug, title, client, group }) => (group ? { slug, title, client, group } : { slug, title, client })),
  null,
  2,
)};

export const groupsMeta: GroupMeta[] = ${JSON.stringify(groups, null, 2)};

export const navMeta: NavMeta[] = ${JSON.stringify(nav, null, 2)};
`);

writeFileSync(`${outDir}/components-docs.ts`, `${header}
import type { ComponentDocs } from '../../../src/components/docs.types';
import type { GroupOverviewDocs } from '../../lib/group-types';
${entries.map(e => `import * as ${alias(e)} from '../../../src/${e.dir}/${e.folder}/${e.name}.docs';`).join('\n')}
${groups.map(g => `import * as ${g.slug.replace(/-(.)/g, (_, c) => c.toUpperCase())}Group from '../../content/groups/${g.slug}';`).join('\n')}

export const componentDocs: Record<string, ComponentDocs> = {
${entries.map(e => `  ${JSON.stringify(e.slug)}: ${alias(e)},`).join('\n')}
};

/** The overview page of each group. */
export const groupDocs: Record<string, GroupOverviewDocs> = {
${groups.map(g => `  ${JSON.stringify(g.slug)}: ${g.slug.replace(/-(.)/g, (_, c) => c.toUpperCase())}Group,`).join('\n')}
};
`);

console.log(
  `Docs registry: ${nav.map(n => (n.kind === 'group' ? `${n.title} (${groups.find(g => g.slug === n.slug).parts.length} parts)` : n.title)).join(', ') || '(none)'}`,
);
