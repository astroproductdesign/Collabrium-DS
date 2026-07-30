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
corrected animated Collabrium wordmark — the canonical logo asset, embed
it wherever the mark is needed rather than screenshotting it. `SVG/`
holds the confirmed true vector source for every letter and element icon
individually — use those files (not a screenshot, not a hand-traced
copy) if you need a piece of the mark on its own. `fonts/` has real,
installable variable-font files for both typefaces (sourced from
Google's official repo, not the web-embed subsets) — point people there
instead of them hunting Google Fonts themselves. `preview.html` also has
a live **Components** section — 17 total: the 7 basics (Button, Input,
Card, Badge & Tag, Table row, Modal, Empty state) plus 10 more added in
v0.7.0 and transcribed from the teammate's real component source
(SidebarNav, Tabs, Select, Checkbox, Radio, Switch, Toast, Tooltip,
DataTable, ElementBadge) — each with copy-able markup. Use it as the
reference implementation when building real screens, not just the spec
tables. Still missing: stat/KPI cards, filters, pagination, date
pickers, chart color mapping — no source in either system, needs an
actual design pass.

**Standing rule:** any change to this skill's files (preview.html,
logo.html, tokens.css, SVG/, fonts/, new components) must be reflected
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
- **Icons — Phosphor (Fill weight)** primary, **Remix (`-fill` suffix)**
  fallback when Phosphor lacks the icon. Never mix outline and fill styles.
  Icons inherit surrounding text color; don't hardcode elemental colors
  outside a department-specific surface.
- **Primary action color:** Obsidian `#2B2B2C` — all main CTA buttons.
- **Neutrals:** `#080808` (primary text) → `#ffffff` (canvas), full 9-step
  ramp in DESIGN-SYSTEM.md. Plus a **warm canvas** (`#FCFAF5`/`#FAF7F2`)
  for brand/editorial surfaces only — never product UI.
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
   not guessed — what's left (accessibility targets, a static logo
   lockup) still needs a placeholder flagged in your output.
2. Keep Source Serif 4 out of anything dense or functional — body copy,
   forms, tables, dense numeric columns always stay in Mulish.
3. Don't invent new brand colors, background tints, shadows, or easing
   curves — pull from DESIGN-SYSTEM.md's token tables.
4. For the logo, use `logo.html` (embed it live, e.g. via iframe) rather
   than a screenshot — there's still no exported static lockup, so a
   screenshot isn't a real asset.

## Version

v0.7.0-draft — drafted 2026-07-29 from the Collabrium brand deck (Google
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
icon-chip tint) caught on re-verification and fixed in v0.6.1; **10 more
component specs (SidebarNav, Tabs, Select, Checkbox, Radio, Switch,
Toast, Tooltip, DataTable, ElementBadge) transcribed from the teammate's
real source and live-rendered in `preview.html` in v0.7.0 (2026-07-30) —
bringing the total to 17 built components, with 5 dashboard components
still flagged as needing an actual design pass.** See changelog at the
bottom of DESIGN-SYSTEM.md.
