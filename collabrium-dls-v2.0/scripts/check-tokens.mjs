// Fails when src/tokens/tokens.ts no longer matches src/tokens/tokens.css.
import { readFileSync } from 'node:fs';
import { CSS_PATH, TS_PATH, render } from './tokens-ts.mjs';

const expected = render(readFileSync(CSS_PATH, 'utf8'));
const actual = readFileSync(TS_PATH, 'utf8');
if (expected !== actual) {
  console.error('tokens.ts is out of date with tokens.css. Run: node scripts/tokens-ts.mjs --write');
  process.exit(1);
}
console.log('tokens.ts matches tokens.css');
