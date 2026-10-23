import { defineConfig } from 'tsup';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap(n => (statSync(join(dir, n)).isDirectory() ? walk(join(dir, n)) : [join(dir, n)]));

// Every source module is its own entry (bundle per file, imports kept as
// imports). That is what keeps each file's own "use client" directive:
// esbuild drops directives from modules it merges into a bundle, so
// components that need no client JavaScript stay server components.
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return sourceFiles(p);
    if (!/\.(ts|tsx)$/.test(name)) return [];
    // Previews, docs and their types are for the docs site only, never shipped.
    if (/\.(preview|docs|test|stories)\.tsx?$/.test(name) || name === 'docs.types.ts' || name.endsWith('.d.ts')) return [];
    return [p];
  });
}

export default defineConfig([
  {
    entry: sourceFiles('src'),
    outDir: 'dist',
    format: ['esm'],
    bundle: false,
    dts: { entry: ['src/index.ts', 'src/charts/index.ts'] },
    sourcemap: true,
    clean: true,
    target: 'es2020',
    outExtension: () => ({ js: '.js' }),
    esbuildOptions(options) {
      options.jsx = 'automatic';
    },
    async onSuccess() {
      // bundle:false keeps imports as written ("./Button"). Next.js treats
      // this package as strict ESM ("type": "module"), which needs full
      // specifiers, so add ".js" / "/index.js" to every relative import.
      for (const file of walk('dist').filter(f => f.endsWith('.js'))) {
        const src = readFileSync(file, 'utf8');
        const out = src.replace(/(from\s*|import\s*\(?\s*)(['"])(\.{1,2}\/[^'"]+)\2/g, (m, pre, q, spec) => {
          if (/\.(js|css|json)$/.test(spec)) return m;
          const base = join(dirname(file), spec);
          if (existsSync(`${base}.js`)) return `${pre}${q}${spec}.js${q}`;
          if (existsSync(join(base, 'index.js'))) return `${pre}${q}${spec}/index.js${q}`;
          throw new Error(`Cannot resolve ${spec} from ${file}`);
        });
        if (out !== src) writeFileSync(file, out);
      }

      // Fail the build if a "use client" directive went missing.
      const missing = sourceFiles('src')
        .filter(f => /^['"]use client['"]/.test(readFileSync(f, 'utf8')))
        .map(f => f.replace(/^src\//, 'dist/').replace(/\.tsx?$/, '.js'))
        .filter(out => !/^['"]use client['"]/.test(readFileSync(out, 'utf8')));
      if (missing.length) throw new Error(`"use client" missing in: ${missing.join(', ')}`);
    },
  },
  {
    entry: { styles: 'src/styles.css', tokens: 'src/tokens/tokens.css' },
    outDir: 'dist',
    clean: false,
  },
]);
