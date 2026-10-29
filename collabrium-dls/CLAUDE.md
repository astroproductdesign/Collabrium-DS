# Collabrium design system — rules for Claude

These rules apply in any project that contains a copy of this
`collabrium-dls/` folder. (In the Collabrium-DS source repo itself, where
the system is maintained, the repo's root `CLAUDE.md` applies instead.)

## Setup, once per project

1. So these rules load at the start of every session — not only once Claude
   opens a file in this folder — add this line to your project's root
   `CLAUDE.md` (adjust the path if the folder lives elsewhere):

   ```
   @collabrium-dls/CLAUDE.md
   ```

2. Block edits to this folder in your project's `.claude/settings.json`:

   ```json
   { "permissions": { "deny": ["Edit(./collabrium-dls/**)"] } }
   ```

   That stops Claude's file edits and common shell writes (`sed`, `tee`,
   redirects) inside the folder. It doesn't stop deleting files with `rm`.

## This folder is read-only

- **Never add, edit, rename or delete anything inside `collabrium-dls/`** —
  components, tokens, CSS, docs, logos or illustrations. It's a copy of the
  Collabrium design system and gets replaced when a new version is
  downloaded.
- **Need something that isn't here** — a component, a variant, a token?
  Don't create it in this folder. Build it in your product's own code from
  the existing tokens and components, mark it as product-specific, and tell
  the Collabrium design system team so it can be added to the system.
- **Your version** is the stamp at the top of `DESIGN-SYSTEM.md` (and the
  flag in `preview.html`). Don't mix files from different versions.

## Always build from these files

Build every screen and component from this folder, reading in this order:

1. `SKILL.md` — the cheat sheet.
2. `DESIGN-SYSTEM.md` — the source of truth. Read its Guidelines and
   Component Rules sections, then the sections for the components you use.
   It's long: search it rather than reading it end to end.
3. `tokens.css` — every colour, space, radius, shadow, type and motion
   value.
4. `components.css` — link it and use its classes as they are (`.c-btn`,
   `.c-card`, …).
5. `preview.html` — open it to see each component working and copy its
   markup (each demo has a Copy markup button).

Also load the Phosphor Icons and Google Fonts links listed in
`DESIGN-SYSTEM.md`'s Technical Implementation section.

- Use each component as documented: the same markup, classes and states.
  Don't restyle or override `.c-` classes, and don't copy their values into
  new CSS.
- No raw hex or pixel values — use the tokens.
- No other icon set — Phosphor only.
- Never redraw a logo — use `logo.html`, `logo-mark.html`, `logo-lockups/`
  and `SVG/`.
- If the system doesn't cover something, say so and ask instead of
  inventing a rule.

## Illustrations

**Before generating any illustration, read
[`illustrations/illustration-characters-bible.md`](illustrations/illustration-characters-bible.md)
in full and follow it exactly**, with its reference image
(`illustrations/reference/malay.jpg`) attached, and check every result
against its acceptance checklist. Use the existing characters in
`illustrations/` where they fit. Don't draw, generate or source an
illustration in any other style.
