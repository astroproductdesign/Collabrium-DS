// Renames the file `npm pack` writes (collabrium-ui-<version>.tgz) to
// collabrium-ui.tgz, so the install line in the docs never changes as the
// version moves: npm install ../collabrium-dls-v2.0/collabrium-ui.tgz
import { readdirSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const packed = readdirSync(root).filter(f => /^collabrium-ui-\d.*\.tgz$/.test(f));
if (!packed.length) throw new Error('rename-pack: no collabrium-ui-<version>.tgz found; run npm pack first');
// Newest version wins if old packs are lying around.
packed.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
renameSync(join(root, packed[0]), join(root, 'collabrium-ui.tgz'));
console.log(`rename-pack: ${packed[0]} -> collabrium-ui.tgz`);
