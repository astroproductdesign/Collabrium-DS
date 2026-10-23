// Builds src/tokens/tokens.ts from src/tokens/tokens.css, so the two can
// never drift. `node scripts/tokens-ts.mjs --write` regenerates the file;
// `check-tokens.mjs` uses render() to fail when the committed file is stale.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
export const CSS_PATH = `${root}src/tokens/tokens.css`;
export const TS_PATH = `${root}src/tokens/tokens.ts`;

export function parseVars(css) {
  const body = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const vars = new Map();
  for (const m of body.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) vars.set(m[1], m[2].trim());
  return vars;
}

const camel = s => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

function resolve(value, vars, seen = new Set()) {
  return value.replace(/var\((--[a-z0-9-]+)\)/g, (_, name) => {
    if (seen.has(name) || !vars.has(name)) throw new Error(`Cannot resolve ${name}`);
    return resolve(vars.get(name), vars, new Set([...seen, name]));
  });
}

const px = v => {
  const m = /^(-?\d*\.?\d+)px$/.exec(v);
  if (!m) throw new Error(`Expected a px value, got "${v}"`);
  return Number(m[1]);
};
const ms = v => {
  const m = /^(\d+)ms$/.exec(v);
  if (!m) throw new Error(`Expected an ms value, got "${v}"`);
  return Number(m[1]);
};
const bezier = v => {
  const m = /^cubic-bezier\(([^)]+)\)$/.exec(v);
  if (!m) throw new Error(`Expected cubic-bezier(), got "${v}"`);
  return m[1].split(',').map(n => Number(n.trim()));
};

export function build(vars) {
  const out = {
    color: {}, font: {}, weight: {}, text: {}, tracking: {}, spacing: {}, layout: {},
    radius: {}, borderWidth: {}, shadow: {}, duration: {}, ease: {}, icon: {},
  };
  const used = new Set();
  const take = (name, group, key, value) => { out[group][key] = value; used.add(name); };

  for (const [name, raw] of vars) {
    const v = resolve(raw, vars);
    let m;
    if ((m = /^--color-(.+)$/.exec(name))) take(name, 'color', camel(m[1]), v);
    else if ((m = /^--font-(.+)$/.exec(name))) take(name, 'font', camel(m[1]), v);
    else if ((m = /^--weight-(.+)$/.exec(name))) take(name, 'weight', camel(m[1]), Number(v));
    else if ((m = /^--text-([a-z0-9]+)-(size|lh|weight|tracking|strong-weight|size-lg|lh-lg)$/.exec(name))) {
      const style = (out.text[m[1]] ??= {});
      const prop = camel(m[2]);
      style[prop] = prop === 'tracking' ? v : prop.endsWith('eight') ? Number(v) : px(v);
      used.add(name);
    }
    else if ((m = /^--tracking-(.+)$/.exec(name))) take(name, 'tracking', camel(m[1]), v);
    else if ((m = /^--spacing-(\d+)$/.exec(name))) take(name, 'spacing', Number(m[1]), px(v));
    else if (/^--(card-padding|element-gap|section-gap|page-gutter|content-max-width)$/.test(name)) take(name, 'layout', camel(name.slice(2)), px(v));
    else if ((m = /^--radius-(.+)$/.exec(name))) take(name, 'radius', camel(m[1]), px(v));
    else if ((m = /^--border-width-(.+)$/.exec(name))) take(name, 'borderWidth', camel(m[1]), px(v));
    else if ((m = /^--shadow-(.+)$/.exec(name))) take(name, 'shadow', camel(m[1]), v);
    else if ((m = /^--duration-(.+)$/.exec(name))) take(name, 'duration', camel(m[1]), ms(v));
    else if ((m = /^--ease-(.+)$/.exec(name))) take(name, 'ease', camel(m[1]), bezier(v));
    else if ((m = /^--icon-(.+)$/.exec(name))) take(name, 'icon', camel(m[1]), px(v));
  }
  const missed = [...vars.keys()].filter(n => !used.has(n));
  if (missed.length) throw new Error(`tokens.css has variables tokens-ts.mjs does not map: ${missed.join(', ')}`);
  return out;
}

const fmtKey = k => (/^[a-zA-Z_$][\w$]*$/.test(k) || /^\d+$/.test(k) ? k : JSON.stringify(k));
function fmt(value, indent) {
  const pad = '  '.repeat(indent);
  if (Array.isArray(value)) return `[${value.join(', ')}]`;
  if (typeof value === 'object') {
    const rows = Object.entries(value).map(([k, v]) => `${pad}  ${fmtKey(k)}: ${fmt(v, indent + 1)},`);
    return `{\n${rows.join('\n')}\n${pad}}`;
  }
  return typeof value === 'string' ? `'${value.replace(/'/g, "\\'")}'` : String(value);
}

export function render(css) {
  const t = build(parseVars(css));
  return `// GENERATED from tokens.css by scripts/tokens-ts.mjs. Do not edit by hand:
// change tokens.css, then run \`node scripts/tokens-ts.mjs --write\`.
//
// The same values as the CSS custom properties, for code that cannot read
// CSS variables: motion durations/easings (motion library) and Chart.js.
// Units: sizes are px numbers, durations are ms numbers, easings are
// cubic-bezier control points. var() references are resolved.

export const tokens = ${fmt(t, 0)} as const;

export type Tokens = typeof tokens;
export type ColorToken = keyof Tokens['color'];
export type DurationToken = keyof Tokens['duration'];
export type EaseToken = keyof Tokens['ease'];
`;
}

if (process.argv.includes('--write')) {
  writeFileSync(TS_PATH, render(readFileSync(CSS_PATH, 'utf8')));
  console.log(`Wrote ${TS_PATH}`);
}
