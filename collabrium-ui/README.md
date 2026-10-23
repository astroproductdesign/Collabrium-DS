# @collabrium/ui

The Collabrium design language system as React components for Next.js
(App Router). It uses plain CSS with the Collabrium design tokens: no
Tailwind and no CSS-in-JS.

**Status:**
- Scaffold is ready; Button is waiting for design review.
- Every other component is still to be converted. See [MIGRATION-LOG.md](MIGRATION-LOG.md) for progress and [CATALOG.md](CATALOG.md) for what to use when.

## Install

The package isn't published yet. Until it is, install it from this folder or from its Git repository:

```bash
npm install ../collabrium-ui      # local folder
# later: npm install @collabrium/ui
```

Peer dependencies: `react` and `react-dom` 18 or later. For charts, also install `chart.js` (4.4+) and `react-chartjs-2` (5.2+).

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
| `@collabrium/ui/charts` | `setupCharts()` (Chart.js defaults from the tokens), `seriesColors`, `maxBarThickness` |
| `@collabrium/ui/styles.css` | Tokens, base styles and all component CSS, in one file |
| `@collabrium/ui/tokens.css` | Tokens only, for non-React pages |

### Rules for using components

- **No `style` or `className` props.** Components take typed props for every visual choice. Spacing between components will come from layout components; until those exist, wrap components in your own layout elements.
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

Values the design system doesn't specify are left at Chart.js's defaults; see MIGRATION-LOG.md, Q-CHART-*.

## Develop

```bash
npm install
npm run playground:dev      # http://localhost:3100: every component beside its old HTML + CSS
npm run check               # tokens check, typecheck, package build, playground build + static export
```

- **Static previews:** `npm run playground:build` writes plain HTML to `playground/out/`. Open `playground/out/index.html` or `playground/out/components/<name>.html` straight from disk; no server is needed.
- **Package output:** `dist/` holds one ES module per source file (so each file keeps its `"use client"`), type declarations and `styles.css`.

Contributors and AI assistants should read [CLAUDE.md](CLAUDE.md) first.
