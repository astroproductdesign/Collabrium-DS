/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run playground:build` writes plain HTML to
  // playground/out. scripts/relative-export.mjs then rewrites asset paths so
  // each page also opens straight from disk (file://).
  output: 'export',
  images: { unoptimized: true },
  // The playground imports the library straight from ../src.
  experimental: { externalDir: true },
  // Keep pages as components/button.html (not components/button/index.html)
  // so the static file path is predictable.
  trailingSlash: false,
};

export default nextConfig;
