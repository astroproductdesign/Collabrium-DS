// Makes the static export open straight from disk (file://).
// Next writes root-absolute paths ("/_next/...", "/components/button");
// this rewrites them, per page, to paths relative to that page, and points
// page links at their .html files.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';

const outDir = process.argv[2];
if (!outDir) throw new Error('Usage: node scripts/relative-export.mjs <out dir>');

const walk = dir => readdirSync(dir).flatMap(n => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));

let count = 0;
for (const file of walk(outDir).filter(f => f.endsWith('.html'))) {
  const up = relative(dirname(file), outDir).split(sep).filter(Boolean).map(() => '..').join('/');
  const prefix = up ? `${up}/` : './';
  let html = readFileSync(file, 'utf8');
  html = html
    .replace(/(["'(])\/_next\//g, `$1${prefix}_next/`)
    .replace(/href="\/"/g, `href="${prefix}index.html"`)
    .replace(/href="\/components\/([a-z0-9-]+)"/g, `href="${prefix}components/$1.html"`);
  writeFileSync(file, html);
  count++;
}
console.log(`Rewrote ${count} HTML files in ${outDir} for file:// use`);
