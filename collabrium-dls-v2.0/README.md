# @collabrium/ui

The Collabrium design language system as React components for Next.js
(App Router). It uses plain CSS with the Collabrium design tokens: no
Tailwind and no CSS-in-JS.

Everything you need to build with it is in this folder: the components,
their rules ([CATALOG.md](CATALOG.md) and each component's `usage.md`), the
tokens, the brand assets and the docs site. **Working with an AI agent?**
Point it at [CLAUDE.md](CLAUDE.md) (or [AGENTS.md](AGENTS.md)) first.

## Install

**With an AI agent:** unzip this folder next to your app, then tell your
agent: "Use the Collabrium design system in ../collabrium-dls-v2.0. Read its
CLAUDE.md first and follow it." It sets everything up.

**By hand:**

```bash
# 1. In this folder, once (and again whenever you take a new version)
npm run setup                # installs, builds and packs: writes collabrium-ui-0.1.0.tgz

# 2. In your app
npm install ../collabrium-dls-v2.0/collabrium-ui-0.1.0.tgz
npm install @phosphor-icons/react
```

Install the packed file, not the folder itself: the folder keeps its own
copy of React for the docs site, and your app would load React twice.

Peer dependencies: `react` and `react-dom` 18 or later. For charts, also
install `chart.js` (4.4+) and `react-chartjs-2` (5.2+), or `recharts` (3.10+)
for `@collabrium/ui/charts-extra`.

## Set up (Next.js App Router)

1. **Import the stylesheet once**, in the root layout. It contains the tokens, the base styles and every component's CSS.

   ```tsx
   // app/layout.tsx
   import '@collabrium/ui/styles.css';
   ```

2. **Load the Mulish font.** The package does not load fonts. With `next/font`, point the token at the loaded font by giving the font the variable name `--font-primary` and putting it on `<body>`:

   ```tsx
   // app/layout.tsx
   import { Mulish } from 'next/font/google';
   const mulish = Mulish({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-primary' });

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body className={mulish.variable}>{children}</body>
       </html>
     );
   }
   ```

   This works because the base styles set `body { font-family: var(--font-primary) }`, and the variable set on `<body>` wins over the token's default. Headings use weight 800, so include it.

3. **Use components:**

   ```tsx
   import { Button } from '@collabrium/ui';
   import { Plus } from '@phosphor-icons/react';

   <Button variant="primary" leadingIcon={Plus}>Add audience</Button>
   ```

   Icons come from `@phosphor-icons/react`. Add it to your app's own dependencies (`npm install @phosphor-icons/react`) so you can import icons, and pass the icon component, not a string.

## What's in the package

| Import | Contents |
|---|---|
| `@collabrium/ui` | Components, `tokens` (JS object), motion helpers (`FadeIn`, `SlideUp`, `Collapse`, `duration`, `ease`, `transition`) |
| `@collabrium/ui/charts` | Charts on Chart.js, `setupCharts()` (Chart.js defaults from the tokens), `seriesColors`, `maxBarThickness` |
| `@collabrium/ui/charts-extra` | Charts Chart.js can't draw, on Recharts |
| `@collabrium/ui/motion` | Motion effects |
| `@collabrium/ui/styles.css` | Tokens, base styles and all component CSS, in one file |
| `@collabrium/ui/tokens.css` | Tokens only, for non-React pages |

### Rules for using components

- **No `style` or `className` props.** Components take typed props for every visual choice. Lay out with `AppShell`, `ContentGrid`, `CardGrid`, `StatGrid` and `List`; for your own wrappers, use your own elements and the tokens.
- **Server Components:** components that need no browser JavaScript have no `"use client"` and render on the server. Interactive ones (Button, the motion helpers) are client components; you can still import them from Server Components.
- **Reduced motion and forced colours** are handled inside each component.

### Charts

```tsx
'use client';
import { setupCharts, seriesColors } from '@collabrium/ui/charts';
import { Bar } from 'react-chartjs-2';

setupCharts(); // once, before the first chart renders

<Bar data={{ labels, datasets: [{ label: 'Bookings', data, backgroundColor: seriesColors[0] }] }} />
```

Values the design system doesn't specify are left at Chart.js's defaults.

## Docs site

Every component with live examples, and the foundations: brand, logo,
colour, type, fonts, icons, illustration, spacing, accessibility, tokens and
guidelines.

```bash
npm install
npm run playground:dev      # http://localhost:3100
npm run playground:build    # static HTML in playground/out/; open index.html from disk
```

## Brand assets

Logos, fonts and the 51 illustration characters are in `playground/public/`.
Read `playground/public/illustrations/illustration-characters-bible.md` before
generating any new illustration.
