// The SEO module (route catalog, blog text) is loaded on demand to keep it out of the entry chunk
let seoModule: Promise<typeof import('../data/seo')> | null = null;
const loadSeo = () => (seoModule ??= import('../data/seo'));
let latestRequest = 0;

function upsertMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/** Syncs <head> (title, description, canonical, OG/Twitter, JSON-LD) with the current URL. */
export async function applyRouteMeta(pathname: string = window.location.pathname) {
  const request = ++latestRequest;
  const { getRouteMeta, SITE_URL } = await loadSeo();
  if (request !== latestRequest) return; // a newer navigation already applied
  const meta = getRouteMeta(pathname);
  const url = `${SITE_URL}${meta.path}`;

  document.title = meta.title;
  upsertMeta('name', 'title', meta.title);
  upsertMeta('name', 'description', meta.description);
  upsertMeta('property', 'og:type', meta.ogType);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:title', meta.title);
  upsertMeta('property', 'og:description', meta.description);
  upsertMeta('name', 'twitter:url', url);
  upsertMeta('name', 'twitter:title', meta.title);
  upsertMeta('name', 'twitter:description', meta.description);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  let ld = document.getElementById('route-jsonld') as HTMLScriptElement | null;
  if (!ld) {
    ld = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
  }
  if (!ld) {
    ld = document.createElement('script');
    ld.type = 'application/ld+json';
    document.head.appendChild(ld);
  }
  ld.id = 'route-jsonld';
  ld.textContent = JSON.stringify(meta.jsonLd);
}
