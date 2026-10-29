import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllRouteMeta, SITE_URL } from '../src/data/seo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODAY = new Date().toISOString().split('T')[0];

// Routes come from src/data/seo.ts so the sitemap always matches the real catalog
const routes = getAllRouteMeta();

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapXml, 'utf-8');
console.log(`Generated canonical sitemap with ${routes.length} URLs at ${outputPath}`);
