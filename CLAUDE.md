# Collabrium-DS — instructions for Claude

This repo is where the Collabrium design system is built and maintained.
Everything that ships lives in `collabrium-dls/`; other teams download that
folder and build their products from it.

`collabrium-dls/CLAUDE.md` is the **read-only** rulebook for those teams'
copies. It does not apply here: in this repo you maintain the system, under
the rules below.

## Where to work, what to read

All design system work happens in `collabrium-dls/`. Before building or
changing a component, read in this order:

1. `collabrium-dls/SKILL.md` — the cheat sheet.
2. `collabrium-dls/DESIGN-SYSTEM.md` — the source of truth. Read its
   Guidelines and Component Rules sections, plus the section for the
   component at hand and its closest relatives. It's about 10,000 lines:
   search it, don't read it end to end.
3. `collabrium-dls/tokens.css` — every colour, space, radius, shadow, type
   and motion value.
4. `collabrium-dls/components.css` — the existing component CSS.

`preview.html` is the gallery that shows each component. It is never the
source of a rule or a value.

## Building components

- **Reuse before build.** Search `components.css` and `DESIGN-SYSTEM.md`
  for an existing component or variant first; add a variant before adding
  a new component.
- **Tokens only.** No raw hex, pixel, shadow or easing values that aren't in
  `tokens.css`. A new token is added to `DESIGN-SYSTEM.md` first.
- **Naming:** `.c-` classes, `--c-` custom properties, `is-`/`has-` state
  classes, matching `components.css`.
- **Full state set:** hover, active, focus-visible and disabled, plus error
  for anything that takes input.
- **Accessibility:** semantic HTML, a visible focus ring, AA contrast, 44px
  touch targets, and reduced motion respected.
- **Icons:** Phosphor only — Regular for controls (Tier 1), Fill for status
  and decoration (Tier 2).
- **Brand assets:** never redraw a logo. Use `logo.html`, `logo-mark.html`,
  `logo-lockups/` and `SVG/`.
- **Provenance:** anything not sourced from the brand deck or a teammate's
  build is flagged "⚠️ Designed from scratch"; open questions go in Needs
  Input. Don't reopen anything the spec records as a decision.

## One change, three files

A new or changed component is one change across:

1. `DESIGN-SYSTEM.md` — its section, and its entry in the component index.
2. `components.css` — its rules.
3. `preview.html` — its demo block, with a working Copy markup button.

Keep alphabetical order in step across the sidebar nav, the order of demo
blocks, and `DESIGN-SYSTEM.md`'s component sections and index.

Then sync the copies embedded in `preview.html`, each the file's exact
content without its final newline: `DESIGN-SYSTEM.md` → `src-md-extended`,
`SKILL.md` → `src-md-compact`, `tokens.css` → `src-css-vars`. When tokens
change, also update the Tailwind mapping (`src-tailwind`) and the JSON
export (`src-json`), including the JSON's `"version"`.

## Version and changelog

- Follow the **Version rule** at the top of `DESIGN-SYSTEM.md`'s Changelog:
  check `main` for the newest entry, number yours one past it, and update
  the stamp at the top of the file.
- Changelog entries are plain paragraphs; only `**bold**`, `` `code` `` and
  `[links](#anchor)` render. Keep lines to 78 characters.
- Ask before adding a changelog entry — the design lead confirms a change
  first.

## Drafts

Drafts go in `drafts/` at the repo root, **never** in `collabrium-dls/`:
everything in that folder ships to other teams. Promoting a draft means the
three-file change above, then deleting the draft. The `/build-components`
command and the `component-builder` and `component-reviewer` agents follow
this.

## Check before calling it done

Open `preview.html` in a browser and confirm: the component works, there are
no console errors, it holds at phone width (375px), and reduced motion is
respected.

## Branches

One branch per change, named `DDMMYY-topic-name`. Check `main` before
bumping the version. Never commit or push to `main` unless asked.

## Illustrations

**Before generating any illustration, read
[`collabrium-dls/illustrations/illustration-characters-bible.md`](collabrium-dls/illustrations/illustration-characters-bible.md)
in full and follow it exactly.** That covers stills and animated loops, for
any use.

- Use its prompt structure word for word, and its models and settings.
- Always attach the reference image it names
  (`collabrium-dls/illustrations/reference/malay.jpg`).
- Check every result against its acceptance checklist before using it.
- Export, name and register new characters the way it says (files in
  `illustrations/`, an entry in `characters.json`, a Changelog entry).
- Stop and ask instead of improvising when the reference image is missing,
  a category has no colour yet, the illustration doesn't fit an existing
  family, or a result fails the checklist twice.

Don't draw, generate or source an illustration in any other style.
