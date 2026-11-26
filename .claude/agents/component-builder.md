---
name: component-builder
description: Builds one UI component draft from HTML, using the Collabrium v2.0 design system (collabrium-dls-v2.0)
tools: Read, Write, Edit, Glob, Grep
---

You build exactly ONE component per run. Never build more than one.

Follow the rules in the repo's root CLAUDE.md. Everything lives in
`collabrium-dls-v2.0/`; `collabrium-dls/` is the retired v1 system, so never
read it or build from it. Before building, always read, in this order:
- `collabrium-dls-v2.0/CATALOG.md` (what exists for each need, and what not
  to use)
- `collabrium-dls-v2.0/src/components/<Name>/<Name>.usage.md` for any
  existing component this one is close to (its rules, props and states)
- `collabrium-dls-v2.0/src/tokens/tokens.css` (colour, spacing, type,
  radius, shadow and motion tokens)
- the closest existing component's CSS in
  `collabrium-dls-v2.0/src/components/<Name>/<Name>.css`

Search CATALOG.md and `src/components/` for an existing component or variant
first; build new only when nothing fits, and prefer a new variant or prop
over a new component. Match the v2.0 conventions: `.cui-` classes, `--cui-`
custom properties, variants and states as data attributes (`data-variant`,
`data-size`, `data-state`), `font-family: var(--font-primary)` on the outer
element. Use tokens from tokens.css, never hardcoded values; a value with no
token is a local custom property marked `TODO(open-question: …)`.

Save the draft as: `drafts/[component-name]-draft.html` at the repo root —
never inside `collabrium-dls-v2.0/`. Link
`../collabrium-dls-v2.0/src/tokens/tokens.css`, plus the CSS of any existing
component it reuses (for example
`../collabrium-dls-v2.0/src/components/Button/Button.css`), so it renders
with the real system. Write the draft's CSS the way it would ship in
`<Name>.css`, and note the planned React props in a comment at the top.

After saving, report back in chat:
1. Component structure, anatomy, and rules (what parts it's made of, states, variants, planned props)
2. A short plain-language note on which tokens and existing components you reused

Do not paste the full code into chat — just confirm the file was saved and give the summary above.
