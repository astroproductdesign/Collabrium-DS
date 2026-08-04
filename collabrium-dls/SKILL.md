---
name: collabrium-dls
description: Design Language System reference for Collabrium (Astro Digital Growth OS) — brand colors, typography, spacing, iconography, and component tokens. Use whenever designing, mocking up, or building UI screens, dashboards, marketing pages, decks, or any other visual asset for Collabrium, to stay visually consistent with the brand.
---

# Collabrium DLS

Quick-reference cheat sheet for building Collabrium surfaces. Full token
detail, rationale, and open gaps live in `DESIGN-SYSTEM.md` in this same
folder — read it before building anything beyond a trivial mockup.
Paste-able CSS custom properties are in `tokens.css`. `preview.html` is a
browsable brand overview microsite (writeup, real logo, color palette,
typography, fonts, spacing & shape, guidelines) — open it directly, it
links `tokens.css` and embeds `logo.html`. `logo.html` is the real,
corrected animated Collabrium wordmark — the canonical *live* asset, embed
it wherever the mark can animate rather than screenshotting it. Its "O"
cycles through a fixed 5-frame sequence — **Gold → Water → Wood → Fire →
Earth**, no decorative extras — with `SVG/coin.svg` as the Gold frame's
artwork (not `gold.svg`, which is a separate icon used elsewhere in this
system).
`logo-lockups/` holds combined, non-animated wordmark lockups for
contexts that can't run the animation (favicons, print, email, static
deck slides) — `collabrium-default-logo.svg` is the **default** mark
whenever no department/element context applies; the other 4 element-colored variants
(Fire, Wood, Water, Earth) don't exist yet. `SVG/`
holds the confirmed true vector source for every letter and element icon
individually — use those files (not a screenshot, not a hand-traced
copy) if you need a piece of the mark on its own. `fonts/` has real,
installable variable-font files for both typefaces (sourced from
Google's official repo, not the web-embed subsets) — point people there
instead of them hunting Google Fonts themselves. `preview.html` also has
a live **Components** section — the 7 basics (Button, Input, Card,
Badge & Tag, Table row, Modal, Empty state), 10 more added in v0.7.0 and
transcribed from the teammate's real component source (SidebarNav,
Tabs, Select, Checkbox, Radio, Switch, Toast, Tooltip, DataTable,
ElementBadge), 4 more **designed from scratch in v0.8.0** (Stat/KPI
card, Filters, Pagination, Date picker, flagged red in the gallery)
plus a Chart color mapping guideline, 4 more folded into Button/Input
field on 2026-08-03 (Button's Icon-only variant, plus Input field's
Textarea/Password field/Search input clear button siblings), and —
**this pass, v0.9.0** — **App Shell**, the page-level composition layer
(Sidebar placement, Content region, Page header — no separate Top bar,
Page header is the shell's only top-of-screen chrome) covering how
everything else actually gets framed into a real screen. Each has
copy-able markup. Use it as the reference implementation when building
real screens, not just the spec tables. The v0.8.0 batch and App Shell
have no source in either the brand deck or the teammate's build, so
treat them as more provisional than everything transcribed above them —
a first design pass, not yet reviewed.

**Standing rule:** any change to this skill's files (preview.html,
logo.html, logo-lockups/, tokens.css, SVG/, fonts/, new components) must be reflected
back into `DESIGN-SYSTEM.md` — content, version bump, changelog entry —
in the same pass, not as a follow-up.

**Reference point:** `~/Desktop/Collabrium Design System/` is a second,
independently built Collabrium system from the same source deck, with
production React components, an app UI kit, and deck templates this
skill doesn't have. As of v0.6.0 the token values here were reconciled
against it — see DESIGN-SYSTEM.md's Reconciliation section for exactly
what changed and why before treating either system as more current.

## Brand in one line

Warm, collaborative, quietly confident. Talks like a colleague, not a
control panel. Voice favors human verbs (see, share, meet in the middle)
over mechanical ones (sync, deploy, restore).

## Core tokens (cheat sheet)

- **Primary font — Mulish:** all UI text — body, buttons, nav, tables,
  labels, captions — **and every heading**, weight 800, letter-spacing 0.
- **Secondary font — Source Serif 4:** *not* a heading token. A deliberate
  overlay for brand-statement moments only (deck ledes, pull quotes, hero
  numerals), never below ~18–20px, never mixed mid-sentence.
- **Icons — Phosphor** primary, **Remix** fallback when Phosphor lacks the
  icon, in **two weights by tier, not taste**: Regular for functional/control
  icons (buttons, toolbars, chevrons, sort/filter), Fill for expressive/status
  icons (nav, status indicators, card headers, empty states). Never mix
  Phosphor with Remix within the same component instance. Icons inherit
  surrounding text color; don't hardcode elemental colors outside a
  department-specific surface.
- **Primary action color:** Obsidian `#2B2B2C` — all main CTA buttons.
- **Neutrals:** `#080808` (primary text) → `#ffffff` (canvas), full 9-step
  ramp in DESIGN-SYSTEM.md. Plus **warm canvas** (`#FCFAF5`/`#FAF7F2`) —
  ⚠️ **now the default page background everywhere as of 2026-08-03**,
  product UI included, not just brand/editorial. Component fills (cards,
  inputs, sidebar) keep their own documented values, mostly `Neutral-1`
  white, which now reads as a deliberate figure-ground contrast against
  the warmer canvas.
- **Brand accents (all confirmed canonical):** Orange `#FF5825`, Salmon
  Pink `#FF7A90`, Green `#00C26E`, Navy Blue `#1473E6`, Amber `#FFA425`.
  Each has an 8%/16% background-tint pair (`-bg`/`-bg-strong`) — the only
  permitted colored backgrounds, and only for the element that owns the
  content.
- **5-element system:** each brand color maps to an element and a
  department cluster (Fire/Orange = Marketing·PR·Sales, Wood/Salmon Pink =
  Strategy·R&D·Product, Earth/Green = HR·CS·Admin, Water/Navy =
  Data·Logistics, Gold/Amber = Finance·Legal·Compliance). Use this mapping
  when color-coding anything department-specific.
- **Radius is soft and per-surface:** 12px inputs/small buttons, 16px
  standard buttons, 20px cards/modals/nav, pill for badges/tags/avatars.
  Never below 12px on an interactive surface.
- **Elevation is real, not "flat by default":** cards carry `shadow-1` at
  rest. Every shadow is Neutral-4-based (soft grey), never black.
- **Motion settles, never bounces:** one easing curve per element
  (`--ease-flow` for Water, `--ease-flare` for Fire, etc.), `--ease-standard`
  otherwise. Durations 80–900ms.

## Before you build

1. Check the **Needs Input** list at the top of `DESIGN-SYSTEM.md`. Most
   token gaps (type scale, spacing, radius) are now resolved and sourced,
   not guessed — what's left (accessibility targets, a clear-space rule,
   minimum size, monochrome/reverse versions, and 4 of 5 department logo
   lockups) still needs a placeholder flagged in your output.
2. Keep Source Serif 4 out of anything dense or functional — body copy,
   forms, tables, dense numeric columns always stay in Mulish.
3. Don't invent new brand colors, background tints, shadows, or easing
   curves — pull from DESIGN-SYSTEM.md's token tables.
4. For the logo: use `logo.html` (embed it live, e.g. via iframe) wherever
   the mark can animate. Where it can't, use a static lockup from
   `logo-lockups/` instead of a screenshot —
   `collabrium-default-logo.svg` by default, or the matching element's
   variant if the surface is already
   department-specific (see DESIGN-SYSTEM.md's Logo section for the
   full rule). Never extract a still frame from `logo.html` as a
   substitute lockup.

## Version

v0.9.3-draft — drafted 2026-07-29 from the Collabrium brand deck (Google
Slides). Component specs and rules added in v0.2.0; letter-spacing,
elevation policy, a consolidated Guidelines list, and tokens.css added in
v0.3.0; the real logo asset (`logo.html`) and a rebuilt brand-overview
`preview.html` added in v0.4.0; `preview.html` rebuilt again in v0.4.1 into
a two-pane layout; the `SVG/` vector source library documented in v0.4.2;
`logo.html`'s label/play-pause UI stripped in v0.4.3; a real installable
`fonts/` pack in v0.4.4; the Fonts tab compacted in v0.4.5; a live
Components section added in v0.5.0; radius, elevation, typography, and
spacing corrected — and warm canvas, elemental tints, and motion added —
in v0.6.0, reconciled against a teammate's independent build of the same
deck; two errors from that reconciliation (Button type size, Card
icon-chip tint) caught on re-verification and fixed in v0.6.1; 10 more
component specs (SidebarNav, Tabs, Select, Checkbox, Radio, Switch,
Toast, Tooltip, DataTable, ElementBadge) transcribed from the teammate's
real source and live-rendered in `preview.html` in v0.7.0, bringing the
total to 17 built components; **the last 5 dashboard components (Stat/KPI
card, Filters, Pagination, Date picker, Chart color mapping) specced and
mostly live-rendered in v0.8.0 (2026-07-30)** — unlike everything before
them, these have no source in either the brand deck or the teammate's
build, so they're designed from this system's own tokens and flagged
provisional until a real design/brand review, bringing the total to 21
components plus 1 guideline; **Badge's missing `white-space: nowrap`
caught in v0.8.1 (2026-07-30)** after it broke in a separate team's
Sales Dashboard build — Switch and Select's equivalent bugs in that
build turned out to be unique to their own reimplementation, not this
system's, so only Badge needed a fix here; **the whole gallery went
from static markup to genuinely interactive in v0.8.2 (2026-07-30)** —
nav items, tabs, checkboxes/radios/switches, table row selection,
toast/modal dismiss, filters, pagination, and date-picker day selection
all actually respond to input now; **a combined static logo lockup
(`logo-lockups/collabrium-default-logo.svg`) added 2026-07-31**, the new default mark for
any context that can't run `logo.html`'s animation — further resolving
Needs Input #8; **`logo.html` rebuilt on a new font and its animation
trimmed from 9 frames to a fixed 5-frame Gold→Water→Wood→Fire→Earth
sequence, also 2026-07-31** — the new font resolved the `#2B2B2C` vs
`#2F2F2F` ink-color discrepancy against the static lockup (both now
`#2B2B2C`), and `coin.svg` is now confirmed as the Gold frame's artwork,
replacing `gold.svg` there (`gold.svg` itself is unchanged and still
used elsewhere in this system). Still open: the other 4
department-colored lockup variants (Fire, Wood, Water, Earth) don't
exist yet; **four more changes landed 2026-08-03 without a version bump
at the time — folded into v0.8.3-draft retroactively**: Warm canvas
became the default page background everywhere (previously
brand/editorial only), Button gained an Icon-only variant, Input field
gained a Focus-state correction (plain Obsidian border, not the
Water-ring the v0.6.0 policy implied — the shipped component never
actually used it), and three Input field siblings (Textarea, Password
field, Search input clear button) were specced and live-rendered; **App
Shell added in v0.9.0 (2026-08-04)** — real downstream builds on this
system had produced three different navigation shells (pure sidebar,
top-bar-only, sidebar-and-top-bar) plus a Card chrome deviation and a
Badge semantics miss, not because the existing component tables were
wrong but because nothing defined how they compose into an actual page.
App Shell is that composition layer: a flush full-height placement
variant of SidebarNav (240px, no radius, right-edge border only — the
existing `radius-lg`/4-sided-border SidebarNav spec is now documented as
the floating-panel/off-canvas variant, not the primary rail), Content
region, and Page header — promoted, in a same-day revision within this
same draft, to be the shell's *only* top-of-screen chrome (full width,
right-aligned CTA capability) after an initially-drafted separate Top
bar was cut before shipping. Global-scope controls (notifications,
account) have nowhere defined to live as a result — an acknowledged
open gap, revisit if the product actually needs them. All built from
already-existing tokens, no new spacing/radius/elevation/motion values
introduced. Also corrected in this pass:
the Components section's own scope note had undercounted for a full day
(missing the four 2026-08-03 additions) — exactly the kind of drift App
Shell exists to prevent, caught here as a reminder to keep it current
going forward; **v0.9.1 (2026-08-04) audited all 5 places this system's
content gets duplicated** (SKILL.md, DESIGN-SYSTEM.md, and preview.html's
3 embedded copies — markdown, CSS Variables, Tailwind v4, Design Tokens
JSON) against their real sources instead of assuming the doc-sync rule
had held. The markdown and CSS Variables copies were exactly in sync;
`tokens.css` and the JSON export both carried a stale `v0.6.0-draft`
stamp despite correct values; the Tailwind v4 mapping had a real gap —
only 59 of 162 actual tokens.css tokens were mapped, missing the entire
typography scale, icon sizes, several shadow variants, and the semantic
spacing aliases — traced to a token-counting script that silently
undercounted tokens.css as 101 instead of 162 (it only saw the first of
several `--token: value;` declarations packed on a single line).
Rebuilt the mapping from a corrected extraction, verified
programmatically at 162/162 with zero missing and zero orphaned. This
doesn't fix the larger, separate problem a teammate hit applying the
system to an existing project — the actual component CSS has never been
extracted into anything portable, and the icon/font CDN links aren't
documented as a requirement — only the token-layer piece of it;
**v0.9.2 (2026-08-04) simplified App Shell's main nav** — the v0.9.0
"flush rail" placement variant (no radius, right-edge border only) is
gone. The main nav is now SidebarNav completely unmodified — same
width/radius/border/fill/anatomy — just inset `spacing-16` (16px) from
the viewport's top/left/bottom edges instead of flush, at height
`calc(100dvh - 32px)`, so its rounded corners render cleanly instead of
clipping against the browser edge. One component, one spec, in two
placement contexts, instead of a second divergent spec to keep in sync;
**v0.9.3 (2026-08-04) added an explicit scope rule to App Shell** — it
governs structure and layout only, never a component's own style — and
fixed the one real violation an audit against that rule turned up: the
Locked/"Soon" nav-item state (fill, text color, icon opacity, cursor, a
Badge) had been defined inside App Shell instead of SidebarNav; it's
now a third `Nav item` row in SidebarNav's own table. Also trimmed two
places that redundantly restated `Canvas warm`'s hex value instead of
referencing the token. See changelog at the bottom of DESIGN-SYSTEM.md.
