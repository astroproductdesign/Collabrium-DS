# CLAUDE.md — rules for AI working in @collabrium/ui

This repo converts the Collabrium design language system (DLS) into a React
component library for Next.js (App Router). Accuracy to the existing design
matters more than speed. Work slowly; verify before you claim something matches.

## Source of truth

- **Source, read-only:** the DLS folder (`collabrium-dls/` while the two live side by side). Never edit it. It has three files:
  - `tokens.css`: design tokens
  - `components.css`: component styles (`.c-*` classes)
  - `DESIGN-SYSTEM.md`: rules and usage
- **This package is standalone.** Never import from the DLS folder. Copy what you need, and say where it came from (file and line numbers).
- **Visual output must match components.css exactly.** Do not improve, tidy or redesign anything. Where components.css and DESIGN-SYSTEM.md disagree, follow components.css and log the conflict in `MIGRATION-LOG.md`. Any other difference follows the next section.

## Differences from the DLS

The DLS and this library must stay consistent.

- **Flag every difference first.** If you would do anything other than what components.css or DESIGN-SYSTEM.md says or shows (a different value, a missing state, an accessibility fix, a changed behaviour), stop and put it to the user with a recommendation. Don't follow your own version until they decide.
- **After a decision, the DLS is owed an update.** Add a row to "DLS updates owed" (MIGRATION-LOG.md, section 7) in the same step. Never edit the DLS from here.
- **Follow tokens.** Use an existing token wherever its value and meaning match: check `src/tokens/tokens.css` first (focus ring, control heights, status tints and AA text colours, spacing, radius, measures, staggers and the rest). Where none exists, declare a local custom property and list it for the user in the review. `src/tokens/tokens.css` is an exact copy of the DLS file: never edit it here, and sync it (with `node scripts/tokens-ts.mjs --write`) whenever the DLS changes.
- **Approved rules live in the component's `<Name>.usage.md`**, as normal numbered rules with their reason. Don't add a separate "differences" section or a decisions file: once the library is the main repo these rules are the design system. When the user answers an open question, write the answer into `usage.md` (and the CSS comment) in the same step.
- **Error text is bold (700) and Red in every component.** Checkbox, Radio, Input field and every future error: one look. (Decided 2026-10-26.)
- **Red text is `--color-red` (3.2:1), and that is decided.** Never propose a darker red, a red text token, or an AA fix for red text, and don't ask again. (Green and Amber text keep `--color-green-text` and `--color-amber-text`.)
- **Show what can't be pictured.** When a decision is about something visual or about assistive technology, build a draft page with screenshots (`review-drafts/`) before asking. Delete the draft once decided.

## Never guess

If the source is missing something (a state, a value, a rule):
1. Do not invent it.
2. Leave a clearly marked `TODO(open-question <ID>)` in the code.
3. Add the question to "Open questions" in `MIGRATION-LOG.md` with the same ID.

## Workflow for converting a component

1. Read the component's CSS in components.css: every rule, including the scattered ones (grep the class prefix across the whole file). Read its DESIGN-SYSTEM.md section and the audit row in `MIGRATION-LOG.md`.
2. Create the folder `src/components/<Name>/` with exactly these files:
   - `<Name>.tsx`: the component
   - `<Name>.css`: styles ported from components.css
   - `<Name>.usage.md`: usage doc (template below), the written reference for AI and developers
   - `<Name>.docs.tsx`: **every component must have a docs file.** It is the only source the docs site (playground) reads for the component page. It exports `title`, `description`, `usage`, `anatomy`, `examples` (`{ id, title, description, render, code }`), `props`, `rules` (`do` / `dont`), `accessibility` and `motion`, typed by `src/components/docs.types.ts`. Only `title` and `description` are required: the page always shows every section, and a missing one shows its heading with "Coming soon." When there is genuinely nothing to say (no motion, no keyboard interaction), export a sentence that says so instead of leaving it out. Keep it consistent with `<Name>.usage.md`, and keep each example's `code` identical to what its `render` shows.
   - `<Name>.preview.tsx`: every variant, size and state, with the old HTML + CSS rendered beside it, for your own side-by-side check against components.css. The docs site does not show it.
   - `index.ts`: exports
3. Add the CSS import to `src/styles.css`, the export to `src/index.ts`, a row to `CATALOG.md`, and an entry to `CHANGELOG.md`. The docs site picks the component up by itself: `scripts/gen-docs-registry.mjs` finds every `<Name>.docs.tsx` and adds it to the sidebar (alphabetical by title; Charts sits directly above Chart color mapping), the home grid, search and previous/next. Update `MIGRATION-LOG.md`: status, decisions, open questions.
4. Run `npm run check`. It checks tokens, typechecks, builds the package, and builds and exports the playground. Fix every error.
5. Compare the two columns in a real browser:
   - Computed styles of every specimen pair: size, padding, colours, border, radius, type, shadow.
   - Hover, active and focus-visible states.
   - Forced colours and reduced motion.
   - 320px width with no horizontal scroll.
6. Stop after one component and wait for design review. Convert one component at a time.

## Component rules

- **Props:**
  - Visual choices use fixed option lists (TypeScript unions), never free strings.
  - Every prop has a JSDoc comment explaining when to use it.
  - Optional props have sensible defaults.
- **No `style` or `className` props.** Spacing and layout between components come from layout components. Use the `WithoutStyling<>` helper in `src/utils/types.ts` when extending native props.
- **States:** build in every state found in the source: hover, focus-visible, active, disabled, loading, error, and so on.
- **Semantics and accessibility:**
  - Use the correct native element (a real `<button>`, labels for inputs) and correct ARIA.
  - Full keyboard support and a visible focus ring.
  - Focus moves only to a heading or an error message, never anywhere else. One approved exception: when a decision removes the focused button (Permission Prompt), focus moves to the resolved row so the outcome is read.
  - No live regions unless the DLS spec explicitly calls for one.
- **`"use client"`** only in components that need interaction, state, effects or motion. The build keeps each file's directive and fails if one goes missing.
- **Forward refs** to the main DOM element.
- **CSS:**
  - Prefix every class with `cui-` (`.cui-button`). Name parts BEM-style (`.cui-button__icon`).
  - Variants and states are data attributes: `[data-variant="primary"]`, `[data-size="sm"]`, `[data-loading]`.
  - Values come from token variables only: no raw hex, px or durations in rules.
  - If the source uses a value with no token, declare it once as a component-scoped custom property at the top of the component's CSS (`--cui-button-height-md: 40px;`) with a `TODO(open-question …)`. Never add tokens to `tokens.css`; it is an exact copy of the DLS file.
  - Keep selector specificity in the same order as the source, so the same rule wins in every state. Write the mapping in a comment at the top of the CSS file.
- **Second chart set.** `@collabrium/ui/charts` is Chart.js and stays the first choice; `@collabrium/ui/charts-extra` (Recharts, optional peer dependency) is for shapes Chart.js cannot draw. They never import each other, and `src/charts-extra` never imports `chart.js`. Both take series colours from the DLS Chart color mapping (via the tokens), never from the source library's palette. Pieces ported from Amicro (MIT, `Charts/Amicro--Micro-transitions--main`) are rebuilt on `cui-` classes, tokens, Phosphor icons and Mulish; no Tailwind, no `lucide-react`. The WebGL liquid-metal shader is not ported.
- **Fonts:** primary font (`--font-primary`, Mulish) only. Never monospace. The secondary serif font does not appear inside components.
- **Icons:** `@phosphor-icons/react`. Icon props take the icon component (`leadingIcon={Plus}`), not a string. Weight follows the DLS tier: Regular for functional icons (Tier 1), Fill for status and decorative icons (Tier 2).
- **Motion:**
  - Simple transitions are written in CSS with motion tokens (`--duration-*`, `--ease-*`).
  - Enter/exit animations use the `motion` library (`import { motion } from 'motion/react'`), through `src/motion` where possible.
  - Always respect `prefers-reduced-motion`, following the component's own DLS rule. The shared principle is "drop the travel, keep the information". There is deliberately no global kill switch.
- **Previews never navigate away.** No real links or form submits inside demos.

## Docs site (playground)

- Built with the design system itself: `@collabrium/ui` components imported from `../src` wherever one exists. For DLS components not converted yet, it uses the DLS markup and CSS copied into `playground/styles/` (`dls-components.css`, `dls-site.css`, same class names, source lines in each block's header). New playground CSS goes in `playground/styles/docs.css`, tokens only. When a component is converted, replace its copied markup in the playground with the React component and delete its block from the copied CSS.
- **Groups.** The DLS documents some families as one component with several parts (AI Native). A part's docs file exports `export const group = 'AI Native'`. It then drops out of the sidebar and home grid, which show one "AI Native" item, and its page is `components/ai-native/<part>`, reached from the group's overview page, previous/next and search. The group needs an overview file at `playground/content/groups/<group-slug>.tsx` (shape in `playground/lib/group-types.ts`); the generator fails with a clear message if it is missing. The overview lists parts automatically, and shows the family's other parts as "Coming soon" cards from its `comingSoon` list. Remove a part from that list when its docs file is added. Don't group a component on a hunch: the DLS only does this for AI Native. Two groups are the exception, decided 2026-10-29: **Charts (extra)** (`src/charts-extra/<Name>/<Name>.docs.tsx`, Recharts charts) and **Motion** (`src/motion/<Name>/<Name>.docs.tsx`). Every docs file in those folders belongs to the group automatically (no `group` export), and the group pages exist before their first part.
- **Page navigation (decided 2026-10-29).** The arrow left of a page's title is **Back**: it goes up to the parent (a part of a group goes to its group's overview, anything else to the Components list). Previous and Next are a pair of small arrows (‹ ›) beside Copy page, and the Previous/Next cards stay at the foot of the page. They walk the sidebar order.
- It shows the finished library only: no migration status, no old-versus-new comparison, no open questions.
- Keep the static export working: `npm run playground:build` writes `playground/out`, pages are `index.html`, `foundation/<slug>.html` and `components/<slug>.html`, and every link is relative so the same files work from disk and on Vercel. Build links with `hrefTo()` in `playground/lib/site.ts`, never with absolute paths.

## Usage doc template (`<Name>.usage.md`)

```
# Component
## Purpose
## Use when
## Don't use when        (say what to use instead)
## Props                 (table: name, options, default, description)
## Rules
## Accessibility
## Motion
## Example
## Replaces              (old classes from components.css)
```

## Tokens

- `src/tokens/tokens.css` is a copy of the DLS `tokens.css`: same names and values, with only the header comment rewritten.
- `src/tokens/tokens.ts` is generated from it. Never edit it by hand. Run `node scripts/tokens-ts.mjs --write` after a token change. `npm run check:tokens` fails when the two drift.

## Commands

| Command | What it does |
|---|---|
| `npm run build` | Builds `dist/`: ESM per module, `.d.ts` files and a single `styles.css` |
| `npm run typecheck` | Runs TypeScript with no output |
| `npm run playground:dev` | Starts the dev server at http://localhost:3100 |
| `npm run playground:build` | Writes a static export to `playground/out`, openable from disk |
| `npm run check` | Runs all of the above, in order |

## Don'ts

- Don't convert more than one component per review cycle.
- Don't commit or push unless asked.
- Don't delete or rewrite open questions; mark them answered with the answer and the date.
