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
- **Visual output must match components.css exactly.** Do not improve, tidy or redesign anything. Where components.css and DESIGN-SYSTEM.md disagree, follow components.css and log the conflict in `MIGRATION-LOG.md`.

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
   - `<Name>.usage.md`: usage doc (template below)
   - `<Name>.preview.tsx`: every variant, size and state, with the old HTML + CSS rendered beside it
   - `index.ts`: exports
3. Add the CSS import to `src/styles.css`, the export to `src/index.ts`, the preview to `playground/app/registry.ts`, a row to `CATALOG.md`, and an entry to `CHANGELOG.md`. Update `MIGRATION-LOG.md`: status, decisions, open questions.
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
  - Focus moves only to a heading or an error message, never anywhere else.
  - No live regions unless the DLS spec explicitly calls for one.
- **`"use client"`** only in components that need interaction, state, effects or motion. The build keeps each file's directive and fails if one goes missing.
- **Forward refs** to the main DOM element.
- **CSS:**
  - Prefix every class with `cui-` (`.cui-button`). Name parts BEM-style (`.cui-button__icon`).
  - Variants and states are data attributes: `[data-variant="primary"]`, `[data-size="sm"]`, `[data-loading]`.
  - Values come from token variables only: no raw hex, px or durations in rules.
  - If the source uses a value with no token, declare it once as a component-scoped custom property at the top of the component's CSS (`--cui-button-height-md: 40px;`) with a `TODO(open-question …)`. Never add tokens to `tokens.css`; it is an exact copy of the DLS file.
  - Keep selector specificity in the same order as the source, so the same rule wins in every state. Write the mapping in a comment at the top of the CSS file.
- **Fonts:** primary font (`--font-primary`, Mulish) only. Never monospace. The secondary serif font does not appear inside components.
- **Icons:** `@phosphor-icons/react`. Icon props take the icon component (`leadingIcon={Plus}`), not a string. Weight follows the DLS tier: Regular for functional icons (Tier 1), Fill for status and decorative icons (Tier 2).
- **Motion:**
  - Simple transitions are written in CSS with motion tokens (`--duration-*`, `--ease-*`).
  - Enter/exit animations use the `motion` library (`import { motion } from 'motion/react'`), through `src/motion` where possible.
  - Always respect `prefers-reduced-motion`, following the component's own DLS rule. The shared principle is "drop the travel, keep the information". There is deliberately no global kill switch.
- **Previews never navigate away.** No real links or form submits inside demos.

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
