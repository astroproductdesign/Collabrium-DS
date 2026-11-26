# Collabrium-DS — instructions for Claude

This repo is where the Collabrium design system is built and maintained.
Everything that ships lives in `collabrium-dls-v2.0/`: a React component
library for Next.js, published as `@collabrium/ui`, with its tokens, brand
assets and docs site. Other teams download that folder and build their
products from it.

`collabrium-dls-v2.0/CLAUDE.md` (and its copy `AGENTS.md`) is the
**read-only** rulebook for those teams. It does not apply here: in this
repo you maintain the system, under the rules below. When you change what
product teams must do, update that rulebook too.

`collabrium-dls/` is the retired v1 system. Don't read it, edit it or build
from it. Never delete anything (files, folders, branches) unless the user
specifically asks.

## Where to work, what to read

All design system work happens in `collabrium-dls-v2.0/`. Before building
or changing a component, read in this order:

1. `CATALOG.md` — what exists for each need, and what not to use.
2. `src/components/<Name>/<Name>.usage.md` — the rules for the component
   at hand and its closest relatives.
3. `src/tokens/tokens.css` — every colour, space, radius, shadow, type and
   motion value.
4. `src/styles/base.css` and the component's own CSS.
5. `MIGRATION-LOG.md` — the record of the migration from v1: past
   decisions (section 5) and questions (section 6). Search it; don't read
   it end to end, and don't edit it unless the user asks.

The docs site (`npm run playground:dev`, http://localhost:3100) shows each
component. It is never the source of a rule or a value.

## Building components

- **Reuse before build.** Search `CATALOG.md` and `src/components/` for an
  existing component or variant first; add a variant or prop before adding
  a new component.
- **Tokens only.** No raw hex, pixel, shadow, duration or easing values
  that aren't in `tokens.css`. A value with no token is a local custom
  property marked `TODO(open-question: …)`, and the question goes to the
  user.
- **Naming:** `.cui-` classes, `--cui-` custom properties; variants and
  states as data attributes (`data-variant`, `data-size`, `data-state`),
  matching the existing components. Components take no `style` or
  `className` (`WithoutStyling`): every visual choice is a typed prop.
- **Type from tokens:** every component sets `font-family:
  var(--font-primary)` on its outer element (or sits inside one that does)
  and never inherits the page's font, so changing the font is one token.
- **Full state set:** hover, active, focus-visible and disabled, plus error
  for anything that takes input.
- **Accessibility:** semantic HTML, a visible focus ring, AA contrast, 44px
  touch targets, and reduced motion respected.
- **Icons:** Phosphor (`@phosphor-icons/react`) only — Regular for controls
  (Tier 1), Fill for status and decoration (Tier 2).
- **Brand assets:** never redraw a logo. Use `playground/public/`
  (`logo.html`, `logo-mark.html`, `logo-lockups/`, `SVG/`).
- **Provenance:** anything not sourced from the brand deck or a teammate's
  build is flagged "⚠️ Designed from scratch"; open questions go to the
  user. Don't reopen anything the migration log or the changelog records as
  a decision.

## One change, every place

A new or changed component is one change across:

1. `src/components/<Name>/`: `<Name>.tsx`, `<Name>.css`, `index.ts`,
   `<Name>.usage.md`, `<Name>.docs.tsx` (its docs page) and
   `<Name>.preview.tsx`. Motion pieces live in `src/motion/<Name>/` with
   their CSS in `motion.css`.
2. Exports: `src/index.ts` (or `src/motion/index.ts`), and the stylesheet's
   `@import` in `src/styles.css`.
3. `CATALOG.md`: its row, or the row it changes.
4. `CLAUDE.md` and `AGENTS.md`, when the change alters what product teams
   must do (keep the two identical).
5. `CHANGELOG.md` and `package.json` (below).

Then run `npm run playground:registry` (docs pages, token exports and the
version flag). When tokens change, also run
`node scripts/tokens-ts.mjs --write` and `npm run check:tokens`.

## Version and changelog

**Every change gets a changelog entry, with no exceptions.** That covers
components, tokens, foundations, docs pages, assets, illustrations, removals
and fixes, however small. The entry and its version bump are part of the
same change and the same branch, never a follow-up. A change with no entry
isn't done.

There is one changelog: `collabrium-dls-v2.0/CHANGELOG.md`.

- **Numbering:** check `main` for the newest entry and number yours one
  past it. Set `package.json`'s `"version"` to match.
- **Decisions live in the entry:** say what was decided and why. The
  migration log is closed; don't add to it.
- **The version flag must match the changelog.** Three places carry the
  version and they always agree: the newest `CHANGELOG.md` entry,
  `package.json`'s `"version"`, and the top-bar flag on the docs site
  (`<a class="flag">@collabrium/ui 0.1.100</a>`). The flag is generated
  from the newest entry by `scripts/gen-changelog.mjs`: never type a
  version into `SiteShell.tsx`. The build fails if `package.json` and the
  changelog disagree. After building, open the docs site and confirm the
  flag shows the new entry's version and links to the Changelog page.

Entries are dated, plain paragraphs: say what changed and why, and end with
the files touched. Only `**bold**`, `` `code` `` and `[links](#anchor)`
render. Keep lines to 78 characters.

Write the entry as part of the change; there's no need to show the wording
first. Commit only when the user asks.

## Drafts

Drafts go in `drafts/` at the repo root, **never** in
`collabrium-dls-v2.0/`: everything in that folder ships to other teams. A
draft is a plain HTML page that links `../collabrium-dls-v2.0/src/tokens/
tokens.css` (and any component CSS it reuses). Promoting a draft means the
"One change, every place" list above, then deleting the draft. The
`/build-components` command and the `component-builder` and
`component-reviewer` agents follow this.

## Work from other projects

Only work started in this repo changes `collabrium-dls-v2.0/`. A session
working in another project (a product app, a prototype, Workdesk, a
personal dashboard) never writes into it, even when that project builds
against it.

- **A gap stays in that project.** If it needs a component, variant, prop or
  token the system doesn't have, build it inside that project and say what's
  missing. To add it to the system, bring it here as a draft in `drafts/`,
  through `/build-components` review and the list above.
- **"Skip the review" isn't permission to add.** When someone waives a
  review because the project is personal or a one-off, the waiver covers
  that project's own code, never the design system.
- **Tokens come from this repo.** `collabrium-dls-v2.0/src/tokens/tokens.css`
  is the only source; never copy tokens in from a product app.
- **Check before committing.** If `git status` shows changes in
  `collabrium-dls-v2.0/` that this session didn't make, ask where they came
  from before committing them.

## Check before calling it done

- `npx tsc --noEmit -p .` and `npx tsc --noEmit -p playground` pass, and
  `npm run build` succeeds.
- Open the component's page on the docs site and confirm: it works, there
  are no console errors, it holds at phone width (375px) with no sideways
  scroll, and reduced motion is respected.

## Branches

The design lead manages branches by hand. Work on whatever branch is
checked out; don't create, switch, rename or delete branches unless asked.
Check `main` before bumping the version. Never commit or push to `main`
unless asked.

## Illustrations

**Before generating any illustration, read
[`collabrium-dls-v2.0/playground/public/illustrations/illustration-characters-bible.md`](collabrium-dls-v2.0/playground/public/illustrations/illustration-characters-bible.md)
in full and follow it exactly.** That covers stills and animated loops, for
any use.

- Use its prompt structure word for word, and its models and settings.
- Always attach the reference image it names
  (`playground/public/illustrations/reference/malay.jpg`).
- Check every result against its acceptance checklist before using it.
- Export, name and register new characters the way it says (files in
  `playground/public/illustrations/`, an entry in `characters.json`, a
  changelog entry).
- Stop and ask instead of improvising when the reference image is missing,
  a category has no colour yet, the illustration doesn't fit an existing
  family, or a result fails the checklist twice.

Don't draw, generate or source an illustration in any other style.
