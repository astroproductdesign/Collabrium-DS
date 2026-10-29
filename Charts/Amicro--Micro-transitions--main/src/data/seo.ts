// Single source of truth for route metadata. Used at runtime (document head updates
// on client-side navigation) and at build time (scripts/prerender.ts writes a static
// HTML file per route, scripts/generate-sitemap.ts lists every route).
import { buttonsData } from './buttons';
import { cardsData } from './cards';
import { loaderGroups } from './loaders';
import { ditherChartsData } from './ditherCharts';
import { monoChartsMeta } from './monoCharts';
import { BLOG_POSTS } from './blogsData';
import { KNOWN_COMPONENT_ENTRIES, getComponentEntry } from './componentEntries';
import { REGISTRY_NAMES } from './registryNames.generated';

const registryNames = new Set(REGISTRY_NAMES);
const EXAMPLE_INSTALL = 'npx shadcn@latest add @amicro/pulse-dots';

export const SITE_URL = 'https://amicro.vercel.app';
export const SITE_NAME = 'Amicro';
export const SITE_TAGLINE = 'Small motion. Big difference.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const REPO_URL = 'https://github.com/Subhan-code/Amicro--Micro-transitions-';
export const AUTHOR = { name: 'Syed Subhan', url: 'https://x.com/SubhanHQ' };

export type ChangeFreq = 'daily' | 'weekly' | 'monthly';

export interface RouteLink {
  href: string;
  label: string;
  description?: string;
}

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  h1: string;
  ogType: 'website' | 'article';
  priority: string;
  changefreq: ChangeFreq;
  keywords: string[];
  breadcrumbs: RouteLink[];
  /** Items listed on hub pages (rendered into the static HTML for crawlers). */
  links?: RouteLink[];
  /** Install command shown on component pages. */
  install?: string;
  jsonLd: Record<string, unknown>[];
}

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'What is Amicro?',
    a: 'Amicro is a free, open-source library of 170+ copy-paste React micro-interaction components: animated buttons, 3D card spreads and carousels, canvas loaders, shape morphs, text animations, mono telemetry charts and dither charts. Every component is built with Motion (formerly Framer Motion) and Tailwind CSS.',
  },
  {
    q: 'How do I install an Amicro component?',
    a: 'Use the shadcn CLI: run `npx shadcn@latest add @amicro/<component-name>` and the component source is copied into your project, so you own the code. You can also copy the TSX from any component page.',
  },
  {
    q: 'Is Amicro free to use?',
    a: 'Yes. Amicro is MIT licensed and free for personal and commercial projects.',
  },
  {
    q: 'Which frameworks does Amicro support?',
    a: 'Amicro components are plain React 18/19 + TypeScript files that work in Next.js (App and Pages router), Vite, Remix and any React setup that uses Tailwind CSS v4 and the motion package.',
  },
  {
    q: 'Are Amicro animations accessible and performant?',
    a: 'Animations use GPU-friendly transform and opacity properties, short 200–350ms micro-transition durations with the ease [0.16, 1, 0.3, 1], and respect the prefers-reduced-motion user setting.',
  },
];

const HUBS: Array<{
  path: string;
  label: string;
  title: string;
  description: string;
  keywords: string[];
  changefreq?: ChangeFreq;
}> = [
  {
    path: '/buttons',
    label: 'Buttons',
    title: 'Animated React Buttons — Spring Physics Micro-Interactions',
    description: 'Copy-paste animated React button components with spring physics, magnetic hover, morphing icons and tactile press feedback. Built with Motion and Tailwind CSS.',
    keywords: ['animated button react', 'framer motion button', 'tailwind button animation', 'magnetic button'],
  },
  {
    path: '/cards',
    label: 'Card Spreads',
    title: 'React Card Spread Animations — Fan, Arc & Stack Layouts',
    description: 'Interactive React card spread components: arc fans, cascades, scatter spreads and wheel fans that animate on hover with Motion spring physics.',
    keywords: ['card fan animation', 'card spread react', 'card stack hover animation'],
  },
  {
    path: '/carousels',
    label: '3D Carousels',
    title: '3D React Carousels — Cover Flow & Time Machine Components',
    description: '3D React carousel components including Cover Flow, rotating card carousels and Time Machine stacks, built with Motion and CSS 3D transforms.',
    keywords: ['3d carousel react', 'cover flow react', 'framer motion carousel'],
  },
  {
    path: '/loaders',
    label: 'Loaders',
    title: 'React Loader & Spinner Animations — 120+ Loading Indicators',
    description: '120+ React loading spinners and loader animations: iOS spinners, physics simulations, morphing shapes and text loaders. Copy-paste TSX with Tailwind CSS.',
    keywords: ['react loader', 'react spinner', 'loading animation react', 'css loader'],
  },
  {
    path: '/morphing',
    label: 'Morphing Shapes',
    title: 'Shape Morphing Animations for React — SVG & Keyframe Morphs',
    description: 'Fluid shape morphing React components: squircles, blobs, stars and wave ripples morphing with keyframes and spring physics.',
    keywords: ['shape morph animation', 'svg morph react', 'blob animation'],
  },
  {
    path: '/animations',
    label: 'CSS Animations',
    title: 'CSS Animations Library — Copy-Paste Keyframes for React',
    description: 'A library of production-ready CSS keyframe animations for entrances, attention and hover states. Copy the CSS or the React component.',
    keywords: ['css animations', 'css keyframes', 'tailwind animations'],
    changefreq: 'weekly',
  },
  {
    path: '/text-animations',
    label: 'Text Animations',
    title: 'React Text Animations — Reveal, Shimmer & Stagger Effects',
    description: 'Animated text components for React: diagonal reveals, blur-in words, character stagger, shimmer and typing effects built with Motion.',
    keywords: ['text animation react', 'text reveal animation', 'typing effect react'],
    changefreq: 'weekly',
  },
  {
    path: '/3d',
    label: '3D',
    title: '3D UI Components for React — Tilt, Depth & Perspective',
    description: '3D React UI components with perspective tilt, depth layers and interactive transforms for modern landing pages.',
    keywords: ['3d ui react', 'tilt card react', 'css 3d transform'],
    changefreq: 'weekly',
  },
  {
    path: '/mono-charts',
    label: 'Mono Charts',
    title: 'Monochrome React Charts — 30 Minimal Telemetry Chart Components',
    description: 'Minimal monochrome React chart components with rounded bars, splines, donuts, gauges, heatmaps and sankey diagrams. Built on Recharts with Tailwind CSS.',
    keywords: ['react charts', 'minimal charts', 'recharts components', 'dashboard charts'],
    changefreq: 'weekly',
  },
  {
    path: '/dither-charts',
    label: 'Dither Charts',
    title: 'Dither Charts for React — Canvas Dithered Data Visualizations',
    description: 'Retro dithered canvas chart components for React: donuts, growth lines, uptime bars, gauges and heatmaps with particle-style dithering.',
    keywords: ['dither chart', 'canvas chart react', 'retro data visualization'],
    changefreq: 'weekly',
  },
];

const PAGES: Array<Omit<RouteMeta, 'breadcrumbs' | 'jsonLd' | 'ogType' | 'keywords'> & { keywords?: string[] }> = [
  {
    path: '/cli',
    title: 'Amicro CLI — Install React Motion Components with shadcn',
    h1: 'Amicro CLI',
    description: 'Install any Amicro component with one command using the shadcn registry: npx shadcn@latest add @amicro/<component>. Zero runtime dependency, you own the code.',
    priority: '0.8',
    changefreq: 'weekly',
    install: EXAMPLE_INSTALL,
  },
  {
    path: '/skills',
    title: 'Amicro Skills — AI Agent Skills for Motion Design',
    h1: 'Amicro Skills',
    description: 'Agent skills and design-system instructions that teach AI coding assistants to build Amicro-quality motion and micro-interactions.',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    path: '/blog',
    title: 'Amicro Blog — Motion Design & React Animation Engineering',
    h1: 'Amicro Blog',
    description: 'Articles on micro-interaction physics, spring animation, shadcn registries and building smooth React UI without layout shifts.',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    path: '/sponsors',
    title: 'Sponsor Amicro — Reach React & Frontend Developers',
    h1: 'Sponsor Amicro',
    description: 'Put your product in front of thousands of React and frontend developers. Diamond, Gold and Silver sponsorship tiers for the Amicro component library.',
    priority: '0.7',
    changefreq: 'weekly',
  },
];

const HOME_DESCRIPTION =
  '170+ free copy-paste React components for micro-interactions, transitions & motion: animated buttons, 3D cards, loaders, text effects and charts. Built with Motion and Tailwind CSS.';

const abs = (p: string) => `${SITE_URL}${p === '/' ? '/' : p}`;

function breadcrumbLd(crumbs: RouteLink[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.href),
    })),
  };
}

function webPageLd(meta: Pick<RouteMeta, 'path' | 'title' | 'description'>, type = 'WebPage') {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${abs(meta.path)}#webpage`,
    url: abs(meta.path),
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en',
  };
}

// ── Component detail routes ────────────────────────────────────────────────

interface ComponentRoute {
  path: string;
  id: string;
  name: string;
  description: string;
  hub: string;
  registry?: string;
}

function componentRoutes(): ComponentRoute[] {
  const out: ComponentRoute[] = [];
  for (const b of buttonsData) {
    const id = `btn-${b.id}`;
    const entry = getComponentEntry(id);
    out.push({
      path: `/buttons/${id}`,
      id,
      name: KNOWN_COMPONENT_ENTRIES[id] ? entry.name : `${b.label} Button`,
      description: KNOWN_COMPONENT_ENTRIES[id]
        ? entry.description
        : `${b.label} animated React button with a ${b.interactionType.replace(/-/g, ' ')} micro-interaction, built with Motion and Tailwind CSS.`,
      hub: '/buttons',
      registry: entry.registry,
    });
  }
  for (const c of cardsData) {
    const id = c.interactionType || c.id;
    const hub = c.category === 'carousels' ? '/carousels' : '/cards';
    out.push({ path: `${hub}/${id}`, id, name: c.label, description: c.description, hub, registry: id });
  }
  const seenLoaders = new Set<string>();
  for (const g of loaderGroups) {
    for (const l of g.loaders) {
      if (seenLoaders.has(l.kebabName)) continue;
      seenLoaders.add(l.kebabName);
      out.push({
        path: `/loaders/${l.kebabName}`,
        id: l.kebabName,
        name: `${l.name} Loader`,
        description: `${l.name} — a ${g.title.toLowerCase()} React loading animation. Copy-paste TSX component built with Motion and Tailwind CSS.`,
        hub: '/loaders',
        registry: l.kebabName,
      });
    }
  }
  for (const m of Object.values(KNOWN_COMPONENT_ENTRIES)) {
    if (m.category !== 'morphing') continue;
    out.push({ path: `/morphing/${m.id}`, id: m.id, name: m.name, description: m.description, hub: '/morphing', registry: m.registry });
  }
  for (const m of monoChartsMeta) {
    out.push({ path: `/mono-charts/${m.id}`, id: m.id, name: m.title, description: m.description, hub: '/mono-charts', registry: m.id });
  }
  for (const d of ditherChartsData) {
    out.push({ path: `/dither-charts/${d.id}`, id: d.id, name: d.label, description: d.description, hub: '/dither-charts', registry: d.kebabName });
  }
  return out;
}

let componentRouteCache: ComponentRoute[] | null = null;
function getComponentRoutes() {
  if (!componentRouteCache) componentRouteCache = componentRoutes();
  return componentRouteCache;
}

const truncate = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…`);

function buildHome(): RouteMeta {
  const meta = {
    path: '/',
    title: `${SITE_NAME} — ${SITE_TAGLINE} React Micro-Interaction Components`,
    description: HOME_DESCRIPTION,
  };
  return {
    ...meta,
    h1: `${SITE_NAME} — ${SITE_TAGLINE}`,
    ogType: 'website',
    priority: '1.0',
    changefreq: 'daily',
    keywords: ['react components', 'micro-interactions', 'react animation library', 'framer motion components', 'tailwind css components', 'shadcn registry'],
    breadcrumbs: [{ href: '/', label: 'Home' }],
    links: HUBS.map((h) => ({ href: h.path, label: h.label, description: h.description })),
    install: EXAMPLE_INSTALL,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: HOME_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': `${SITE_URL}/#author` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE_URL}/#author`,
        name: AUTHOR.name,
        url: AUTHOR.url,
        sameAs: [AUTHOR.url, 'https://github.com/Subhan-code'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        '@id': `${SITE_URL}/#software`,
        name: 'Amicro UI Library',
        description: HOME_DESCRIPTION,
        codeRepository: REPO_URL,
        programmingLanguage: ['TypeScript', 'React'],
        runtimePlatform: 'Node.js',
        license: 'https://opensource.org/licenses/MIT',
        author: { '@id': `${SITE_URL}/#author` },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

function buildHub(h: (typeof HUBS)[number]): RouteMeta {
  const items = getComponentRoutes().filter((c) => c.hub === h.path);
  const crumbs = [{ href: '/', label: 'Home' }, { href: h.path, label: h.label }];
  const meta = { path: h.path, title: `${h.title} | ${SITE_NAME}`, description: h.description };
  return {
    ...meta,
    h1: h.title.split(' — ')[0],
    ogType: 'website',
    priority: '0.9',
    changefreq: h.changefreq ?? 'daily',
    keywords: h.keywords,
    breadcrumbs: crumbs,
    links: items.map((i) => ({ href: i.path, label: i.name, description: i.description })),
    jsonLd: [
      webPageLd(meta, 'CollectionPage'),
      breadcrumbLd(crumbs),
      ...(items.length
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: h.label,
              numberOfItems: items.length,
              itemListElement: items.map((i, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                url: abs(i.path),
                name: i.name,
              })),
            },
          ]
        : []),
    ],
  };
}

function buildComponent(c: ComponentRoute): RouteMeta {
  const hub = HUBS.find((h) => h.path === c.hub);
  const crumbs = [
    { href: '/', label: 'Home' },
    { href: c.hub, label: hub?.label ?? 'Components' },
    { href: c.path, label: c.name },
  ];
  const install = c.registry && registryNames.has(c.registry) ? `npx shadcn@latest add @amicro/${c.registry}` : undefined;
  const description = truncate(
    `${c.description} Free copy-paste React component${install ? ' — install with the shadcn CLI' : ''}.`,
    165
  );
  const meta = { path: c.path, title: `${c.name} — React ${hub?.label ?? 'Component'} | ${SITE_NAME}`, description };
  return {
    ...meta,
    h1: c.name,
    ogType: 'website',
    priority: '0.8',
    changefreq: 'weekly',
    keywords: [c.name.toLowerCase(), ...(hub?.keywords ?? [])],
    breadcrumbs: crumbs,
    install,
    jsonLd: [
      webPageLd(meta),
      breadcrumbLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: c.name,
        description: c.description,
        url: abs(c.path),
        codeRepository: REPO_URL,
        programmingLanguage: ['TypeScript', 'React'],
        license: 'https://opensource.org/licenses/MIT',
        author: { '@id': `${SITE_URL}/#author` },
        isPartOf: { '@id': `${SITE_URL}/#software` },
      },
      ...(install
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: `How to install ${c.name} in React`,
              step: [
                { '@type': 'HowToStep', name: 'Run the shadcn CLI', text: install },
                { '@type': 'HowToStep', name: 'Import the component', text: `Import ${c.name} from your components/ui folder and render it.` },
              ],
            },
          ]
        : []),
    ],
  };
}

function buildPage(p: (typeof PAGES)[number]): RouteMeta {
  const crumbs = [{ href: '/', label: 'Home' }, { href: p.path, label: p.h1 }];
  const links =
    p.path === '/blog'
      ? BLOG_POSTS.map((b) => ({ href: `/blog/${b.slug}`, label: b.title, description: b.excerpt }))
      : undefined;
  return {
    ...p,
    title: p.title.includes(SITE_NAME) ? p.title : `${p.title} | ${SITE_NAME}`,
    ogType: 'website',
    keywords: p.keywords ?? ['amicro', 'react components'],
    breadcrumbs: crumbs,
    links,
    jsonLd: [webPageLd(p), breadcrumbLd(crumbs)],
  };
}

function buildBlogPost(b: (typeof BLOG_POSTS)[number]): RouteMeta {
  const path = `/blog/${b.slug}`;
  const crumbs = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: path, label: b.title },
  ];
  return {
    path,
    title: `${b.title} | ${SITE_NAME} Blog`,
    description: truncate(b.excerpt, 165),
    h1: b.title,
    ogType: 'article',
    priority: '0.7',
    changefreq: 'monthly',
    keywords: ['react animation', 'motion design', 'micro-interactions'],
    breadcrumbs: crumbs,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: b.title,
        description: b.excerpt,
        url: abs(path),
        mainEntityOfPage: abs(path),
        author: { '@id': `${SITE_URL}/#author`, '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
        publisher: { '@id': `${SITE_URL}/#author` },
        image: DEFAULT_OG_IMAGE,
      },
      breadcrumbLd(crumbs),
    ],
  };
}

/** Every indexable route on the site. */
export function getAllRouteMeta(): RouteMeta[] {
  return [
    buildHome(),
    ...HUBS.map(buildHub),
    ...PAGES.map(buildPage),
    ...BLOG_POSTS.map(buildBlogPost),
    ...getComponentRoutes().map(buildComponent),
  ];
}

const ALIASES: Record<string, string> = {
  '/anime': '/animations',
  '/css-animations': '/animations',
  '/blogs': '/blog',
  '/card-spreads': '/cards',
  '/3d-carousels': '/carousels',
  '/shapes': '/morphing',
  '/morph': '/morphing',
  '/monocharts': '/mono-charts',
};

/** Metadata for a pathname; falls back to the closest hub or the home page. */
export function getRouteMeta(pathname: string): RouteMeta {
  let path = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  path = path.replace(/^\/blogs\//, '/blog/');
  path = ALIASES[path] ?? path;
  if (path === '/') return buildHome();

  const hub = HUBS.find((h) => h.path === path);
  if (hub) return buildHub(hub);
  const page = PAGES.find((p) => p.path === path);
  if (page) return buildPage(page);

  if (path.startsWith('/blog/')) {
    const post = BLOG_POSTS.find((b) => `/blog/${b.slug}` === path);
    return post ? buildBlogPost(post) : buildPage(PAGES.find((p) => p.path === '/blog')!);
  }

  const comp = getComponentRoutes().find((c) => c.path === path);
  if (comp) return buildComponent(comp);

  // Unknown component id under a known category: synthesize from the entry resolver
  const [, cat, id] = path.split('/');
  if (cat && id) {
    const entry = getComponentEntry(id);
    const hubPath = `/${cat}`;
    return buildComponent({
      path,
      id,
      name: entry.name,
      description: entry.description,
      hub: HUBS.some((h) => h.path === hubPath) ? hubPath : `/${entry.category}`,
      registry: entry.registry,
    });
  }
  return buildHome();
}

export { abs as absoluteUrl };
