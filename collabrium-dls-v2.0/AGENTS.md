# CLAUDE.md — building with the Collabrium design system

This folder is the Collabrium design system, v2.0: a React component library
for Next.js (App Router), published as `@collabrium/ui`, with its tokens,
brand assets and docs. You are building a product **with** it. This file
tells you how.

**This folder is read-only.** Never edit anything in it: not the
components, not the CSS, not the tokens. If the system doesn't have what a
screen needs, stop and say so (see "When something is missing").

## Read before you build

1. **`CATALOG.md`** — what to use for each need, and what not to use. Look
   up every piece of UI here before writing it.
2. **`src/components/<Name>/<Name>.usage.md`** — the rules for the
   component you're about to use: its props, its rules, accessibility and an
   example. Read it before using the component, every time.
3. **The docs site** — every component with live examples, plus the
   foundations (brand, colour, type, icons, illustration, spacing,
   accessibility, tokens, guidelines). After `setup` (below), run
   `npm run playground:dev` in this folder and open http://localhost:3100.
4. **`src/tokens/tokens.css`** — every colour, space, radius, shadow, type
   and motion value.

`AGENTS.md` is a copy of this file for other AI tools.

## Set up

If there's no app yet, create a Next.js app first (App Router,
TypeScript) in its own folder beside this one. If the app isn't set up with
the design system yet, do it yourself. Run these from the app's folder:

```bash
npm run setup --prefix ../collabrium-dls-v2.0          # installs, builds and packs the design system
npm install ../collabrium-dls-v2.0/collabrium-ui-0.1.0.tgz
npm install @phosphor-icons/react
# charts only:  npm install chart.js react-chartjs-2   (or recharts for charts-extra)
```

Install the packed `.tgz`, never the folder itself: the folder has its own
copy of React for its docs site, and the app would load React twice. Run
`setup` again whenever this folder is updated.

Then add the stylesheet and the font to the root layout:

```tsx
// app/layout.tsx
import '@collabrium/ui/styles.css';   // tokens, base styles and every component, once
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

| Import | For |
|---|---|
| `@collabrium/ui` | Every component, the `tokens` object, motion helpers |
| `@collabrium/ui/charts` | Charts on Chart.js (the first choice) |
| `@collabrium/ui/charts-extra` | Charts Chart.js can't draw, on Recharts |
| `@collabrium/ui/motion` | Motion effects |
| `@collabrium/ui/styles.css` | All the CSS, once in the root layout |
| `@collabrium/ui/tokens.css` | Tokens only, for non-React pages |

## Rules for building

### Client components

Start every page or component file that uses `@collabrium/ui` with
`'use client';`. Icons are passed as components (`leadingIcon={Plus}`) and
tables take `render` functions; Next.js can't pass those from a Server
Component, and the build fails with "Functions cannot be passed directly to
Client Components". Client pages are still rendered on the server first.

### Use the system, don't rebuild it

- **Use a component whenever one exists.** Never hand-build a button,
  field, card, table, modal or anything else the catalog lists, and never
  copy a component's markup or classes into your own code.
- **No `style` or `className` on components.** They don't accept them.
  Every visual choice is a typed prop (`variant`, `size`, `tone`…). If the
  prop you need doesn't exist, the design doesn't allow it: see "When
  something is missing".
- **Lay out with the layout components:** `AppShell` with `ContentGrid`,
  `CardGrid`, `StatGrid`, `List`. For your own wrappers, use your own
  elements and the tokens.
- **Your own CSS uses tokens only:** `var(--spacing-16)`,
  `var(--color-neutral-5)`, `var(--radius-lg)`. No raw hex, pixel, shadow,
  duration or easing values.

### Look and feel

- **Obsidian is the only primary-action colour.** One Primary button per
  region. Brand and element colours (Orange, Salmon Pink, Green, Navy,
  Amber, Purple) classify things; they never mean "click me".
- **The page background is Canvas warm** (`--color-canvas-warm`); cards and
  fields keep their own white.
- **Mulish only** in the product, headings included. Source Serif 4 is for
  brand moments (a pull quote, a hero numeral), never in components.
- **Icons are Phosphor**, passed as components (`leadingIcon={Plus}`), not
  strings. Regular for controls and actions, Fill for status and decoration.
- **Errors are bold `--color-red` text; success is `--color-green`**, always
  beside a word, never colour alone.

### Words

Follow the Brand Foundation page. In short: talk to a teammate, not a
system. Second person for the reader ("Nothing waiting on you"), "we" only
for the system's own actions. Sentence case everywhere; UPPERCASE only for
eyebrow labels. No emoji. Money as `RM 100,000`. Empty and error states
stay human. One idea per sentence.

### Accessibility and motion

The components handle their own keyboard support, focus rings, screen
reader names and reduced motion. Don't undo it:

- Give every field a real `label` (`hideLabel` if it mustn't show), and
  every icon-only button an `aria-label`.
- Never move focus yourself, except to a heading or an error message.
- Meet WCAG 2.1 AA in your own content: 4.5:1 contrast for body text, 3:1
  for large text and UI, touch targets of at least 44px.
- Respect `prefers-reduced-motion` in anything you animate: drop the
  movement, keep the information. Use the motion helpers and the motion
  tokens rather than your own timings.

### Brand assets

- **Logos:** use the files in `playground/public/` (`logo.html`,
  `logo-mark.html`, `logo-lockups/`, `SVG/`, `logo-icon-msteams/`). Copy
  the ones you need into the app's `public/` folder (SidebarNav's live logo
  needs `logo.html`, `logo-mark.html` and `SVG/`, then
  `logo={{ kind: 'live', src: '/logo.html', markSrc: '/logo-mark.html' }}`).
  Never redraw, recolour or rebuild a logo.
- **Illustrations:** 51 Audience characters (stills and loops) in
  `playground/public/illustrations/`, listed in `characters.json`. Show them
  only on Canvas warm, as the full 4:3 frame, at least 160px wide.
- **Before generating any new illustration, read
  `playground/public/illustrations/illustration-characters-bible.md` in
  full and follow it exactly**, attaching its reference image. Never draw,
  generate or source an illustration in any other style.
- **Photography:** no direction yet. Don't add stock photos to product
  screens.

## When something is missing

If the system has no component, variant, prop, token or rule for what a
screen needs:

1. Don't invent one, and don't edit this folder.
2. Use the closest thing the catalog allows, if it truly fits.
3. Otherwise leave a clearly marked `TODO(design-system: …)` in your code
   and tell the person you're working with what's missing, so the design
   team can add it.

## Check before calling it done

- Every component came from `@collabrium/ui`, used as its `usage.md` says.
- `npm run build` (or your app's typecheck) passes.
- In a browser: no console errors, the screen holds at 375px wide with no
  sideways scroll, keyboard focus is visible, and it still works with
  reduced motion on.
