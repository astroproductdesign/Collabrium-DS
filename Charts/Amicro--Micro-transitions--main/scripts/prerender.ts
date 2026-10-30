// Post-build: writes dist/<route>/index.html for every route with route-specific
// <head> tags (title, description, canonical, Open Graph, JSON-LD) and a static,
// semantic content snapshot inside #root. Crawlers and AI answer engines that do not
// execute JavaScript get real content; React replaces #root on boot.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllRouteMeta, FAQ, RouteMeta, SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../src/data/seo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST = path.resolve(__dirname, '../dist');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const jsonLdScript = (data: Record<string, unknown>[]) =>
  `<script type="application/ld+json" id="route-jsonld">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

function setMeta(html: string, attr: 'name' | 'property', key: string, value: string) {
  const re = new RegExp(`<meta\\s+${attr}="${key.replace(/[:.]/g, '\\$&')}"[^>]*>`, 'i');
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

function renderBody(meta: RouteMeta) {
  const crumbs = meta.breadcrumbs
    .map((c, i) =>
      i === meta.breadcrumbs.length - 1
        ? `<li aria-current="page">${esc(c.label)}</li>`
        : `<li><a href="${c.href}">${esc(c.label)}</a></li>`
    )
    .join('');
  const links = meta.links?.length
    ? `<section><h2>${meta.path === '/' ? 'Component categories' : 'Components'}</h2><ul>${meta.links
        .map(
          (l) =>
            `<li><a href="${l.href}">${esc(l.label)}</a>${l.description ? ` — ${esc(l.description)}` : ''}</li>`
        )
        .join('')}</ul></section>`
    : '';
  const install = meta.install
    ? `<section><h2>Installation</h2><pre><code>${esc(meta.install)}</code></pre></section>`
    : '';
  const faq =
    meta.path === '/'
      ? `<section><h2>Frequently asked questions</h2>${FAQ.map(
          (f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`
        ).join('')}</section>`
      : '';
  return `<div id="root"><div class="prerender-snapshot">
<header><nav aria-label="Primary"><a href="/">${SITE_NAME}</a> · <a href="/buttons">Components</a> · <a href="/animations">Animations</a> · <a href="/cli">CLI</a> · <a href="/blog">Blog</a> · <a href="/sponsors">Sponsors</a></nav></header>
<main>
<nav aria-label="Breadcrumb"><ol>${crumbs}</ol></nav>
<h1>${esc(meta.h1)}</h1>
<p>${esc(meta.description)}</p>
${install}
${links}
${faq}
</main>
<footer><p>${SITE_NAME} is open source under the MIT license. © ${new Date().getFullYear()} Syed Subhan.</p></footer>
</div></div>`;
}

function renderPage(template: string, meta: RouteMeta) {
  const url = `${SITE_URL}${meta.path}`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(meta.title)}</title>`);
  html = setMeta(html, 'name', 'title', meta.title);
  html = setMeta(html, 'name', 'description', meta.description);
  html = setMeta(html, 'name', 'keywords', meta.keywords.join(', '));
  html = setMeta(html, 'property', 'og:type', meta.ogType);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', meta.title);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:image', DEFAULT_OG_IMAGE);
  html = setMeta(html, 'name', 'twitter:url', url);
  html = setMeta(html, 'name', 'twitter:title', meta.title);
  html = setMeta(html, 'name', 'twitter:description', meta.description);
  html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}" />`);
  html = html.replace(/<script type="application\/ld\+json"[\s\S]*?<\/script>/i, jsonLdScript(meta.jsonLd));
  html = html.replace(/<div id="root"><\/div>/, renderBody(meta));
  return html;
}

const templatePath = path.join(DIST, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found — run vite build first.');
  process.exit(1);
}
const template = fs.readFileSync(templatePath, 'utf-8');
const routes = getAllRouteMeta();

for (const meta of routes) {
  const out =
    meta.path === '/' ? templatePath : path.join(DIST, ...meta.path.split('/').filter(Boolean), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, renderPage(template, meta), 'utf-8');
}
console.log(`Prerendered ${routes.length} routes into dist/`);

// llms.txt (https://llmstxt.org): a plain-markdown map of the site for AI answer engines
const home = routes[0];
const section = (title: string, filter: (r: RouteMeta) => boolean) => {
  const items = routes.filter(filter);
  return items.length
    ? `## ${title}\n\n${items.map((r) => `- [${r.h1}](${SITE_URL}${r.path}): ${r.description}`).join('\n')}\n`
    : '';
};
const hubPaths = new Set((home.links ?? []).map((l) => l.href));
const llms = [
  `# ${SITE_NAME}`,
  '',
  `> ${home.description}`,
  '',
  'Amicro is an open-source (MIT) React + TypeScript component library. Components are distributed through a shadcn-compatible registry, so the source is copied into your project:',
  '',
  '```bash',
  'npx shadcn@latest add @amicro/<component-name>',
  '```',
  '',
  'Stack: React 18/19, Motion (motion/react, formerly Framer Motion), Tailwind CSS v4. Default easing `[0.16, 1, 0.3, 1]`, 200–350ms micro-transitions, prefers-reduced-motion respected.',
  '',
  '## FAQ',
  '',
  ...FAQ.map((f) => `- **${f.q}** ${f.a}`),
  '',
  section('Component categories', (r) => hubPaths.has(r.path)),
  section('Docs & pages', (r) => ['/cli', '/skills', '/sponsors', '/blog'].includes(r.path)),
  section('Articles', (r) => r.path.startsWith('/blog/')),
  '## Optional',
  '',
  `- [Full component index](${SITE_URL}/llms-full.txt): every component page with its description and install command`,
  `- [Registry JSON](${SITE_URL}/registry.json): machine-readable shadcn registry`,
  `- [Source code](https://github.com/Subhan-code/Amicro--Micro-transitions-)`,
  '',
].join('\n');
fs.writeFileSync(path.join(DIST, 'llms.txt'), llms, 'utf-8');

const componentRoutes = routes.filter((r) => r.breadcrumbs.length === 3 && !r.path.startsWith('/blog/'));
const llmsFull = [
  `# ${SITE_NAME} — full component index`,
  '',
  `> ${componentRoutes.length} React micro-interaction components with live previews and copy-paste source.`,
  '',
  ...componentRoutes.map(
    (r) =>
      `## ${r.h1}\n\n- URL: ${SITE_URL}${r.path}\n- Category: ${r.breadcrumbs[1]?.label ?? ''}\n` +
      (r.install ? `- Install: \`${r.install}\`\n` : '- Install: copy the TSX source from the component page\n') +
      `\n${r.description}\n`
  ),
].join('\n');
fs.writeFileSync(path.join(DIST, 'llms-full.txt'), llmsFull, 'utf-8');
console.log(`Wrote llms.txt and llms-full.txt (${componentRoutes.length} components)`);
