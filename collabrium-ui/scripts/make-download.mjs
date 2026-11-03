// Writes playground/public/collabrium-ui.zip: the whole @collabrium/ui project
// (the library source, its build setup, the docs site source and the written
// rules), for the Download button on the docs site. Next copies public/ into
// the static export, so the file ships with the site.
//
// Left out: node_modules, dist, build output (.next, out), generated files,
// review drafts, git data, secrets (.env*) and the zip itself. Unzip, run
// `npm install`, then `npm run build` for dist/ or `npm run playground:dev`
// for the docs site.
//
// Pure Node: a small zip writer (deflate + CRC-32), so the Vercel build needs
// no zip tool and no extra dependency.
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { deflateRawSync, crc32 } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outFile = join(root, 'playground', 'public', 'collabrium-ui.zip');
const folder = 'collabrium-ui';

const skipDir = new Set(['node_modules', 'dist', '.next', 'out', '_generated', 'review-drafts', '.git', '.vercel', '.turbo']);
const skipFile = f => f === '.DS_Store' || f.endsWith('.tsbuildinfo') || f.startsWith('.env') || f === 'collabrium-ui.zip';

const files = [];
const walk = dir => {
  for (const name of readdirSync(dir).sort()) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (!skipDir.has(name)) walk(full);
    } else if (st.isFile() && !skipFile(name)) {
      files.push({ full, path: relative(root, full).split(sep).join('/'), mtime: st.mtime });
    }
  }
};
walk(root);

const dosTime = d => ({
  time: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
  date: (Math.max(d.getFullYear() - 1980, 0) << 9) | ((d.getMonth() + 1) << 5) | d.getDate(),
});

const chunks = [];
const central = [];
let offset = 0;
const push = buf => {
  chunks.push(buf);
  offset += buf.length;
};

for (const f of files) {
  const data = readFileSync(f.full);
  const packed = deflateRawSync(data, { level: 9 });
  const useDeflate = packed.length < data.length;
  const body = useDeflate ? packed : data;
  const name = Buffer.from(`${folder}/${f.path}`);
  const crc = crc32(data) >>> 0;
  const { time, date } = dosTime(f.mtime);
  const method = useDeflate ? 8 : 0;

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x0800, 6); // UTF-8 names
  local.writeUInt16LE(method, 8);
  local.writeUInt16LE(time, 10);
  local.writeUInt16LE(date, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(name.length, 26);
  local.writeUInt16LE(0, 28);

  const entry = Buffer.alloc(46);
  entry.writeUInt32LE(0x02014b50, 0);
  entry.writeUInt16LE((3 << 8) | 20, 4);
  entry.writeUInt16LE(20, 6);
  entry.writeUInt16LE(0x0800, 8);
  entry.writeUInt16LE(method, 10);
  entry.writeUInt16LE(time, 12);
  entry.writeUInt16LE(date, 14);
  entry.writeUInt32LE(crc, 16);
  entry.writeUInt32LE(body.length, 20);
  entry.writeUInt32LE(data.length, 24);
  entry.writeUInt16LE(name.length, 28);
  entry.writeUInt32LE(((0o100644 << 16) >>> 0), 38);
  entry.writeUInt32LE(offset, 42);
  central.push(Buffer.concat([entry, name]));

  push(local);
  push(name);
  push(body);
}

const dirStart = offset;
const dir = Buffer.concat(central);
push(dir);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(dir.length, 12);
end.writeUInt32LE(dirStart, 16);
push(end);

mkdirSync(join(root, 'playground', 'public'), { recursive: true });
writeFileSync(outFile, Buffer.concat(chunks));
console.log(`Download: ${files.length} files, ${(offset / 1024 / 1024).toFixed(1)} MB -> playground/public/collabrium-ui.zip`);
