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
// The webpack runtime loads later chunks from an absolute "/_next/" public
// path, which points at the filesystem root when a page is opened from
// disk. Derive it from the runtime script's own address instead; over
// http that resolves to the same "/_next/" as before.
const chunksDir = join(outDir, '_next', 'static', 'chunks');
const runtime = readdirSync(chunksDir).filter(f => /^webpack-.*\.js$/.test(f));
for (const f of runtime) {
  const file = join(chunksDir, f);
  const src = readFileSync(file, 'utf8');
  const out = src.replace(
    /\.p="\/_next\/"/,
    '.p=(function(){var s=document.currentScript&&document.currentScript.src;var i=s?s.indexOf("/_next/"):-1;return i>-1?s.slice(0,i+7):"/_next/"})()',
  );
  if (out === src && !src.includes('document.currentScript&&document.currentScript.src')) {
    throw new Error(`relative-export: public path not found in ${f}; Next's runtime changed`);
  }
  writeFileSync(file, out);
}

console.log(`Rewrote ${count} HTML files and ${runtime.length} runtime chunk(s) in ${outDir} for file:// use`);
