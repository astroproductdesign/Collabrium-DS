# Collabrium Design Language System

<<<<<<< Updated upstream
**v0.9.4-draft** — 2026-08-04 — Sourced from the Collabrium brand deck
=======
**v0.9.10** — 2026-08-05 — Sourced from the Collabrium brand deck
>>>>>>> Stashed changes
(Google Slides). This is a first pass: everything under "Needs Input" below
is a placeholder, not a signed-off value. Build with it, but flag it in
your output.

## Overview

Collabrium renders on a near-black-on-warm-canvas interface (Neutral-9
text on the `Canvas warm` `#FCFAF5` background — see [Color
Palette](#color-palette); ⚠️ rule changed 2026-08-03, was pure white
`Neutral-1`) that reads as calm and product-grade rather than as a
marketing surface — this is a dense, multi-department dashboard, not a
landing page. Mulish carries every functional string *and every
heading* (800 ExtraBold, letter-spacing 0): labels, buttons, tables,
nav, display through h5. Source Serif 4 is a deliberate overlay for
brand-statement moments only — a pitch-deck lede, a pull quote, a hero
numeral — never a heading token, never anything you'd call "UI." Five
saturated accent colors (Orange, Salmon Pink, Green, Navy, Amber) map
one-to-one to a five-element metaphor and a department cluster; they
classify what something belongs to, they never mean "click me" —
Obsidian `#2B2B2C` is the system's only actionable color, and every
screen earns exactly one Primary button. Shapes are **soft and
generous** (20px cards, 16px buttons, 12px inputs — corrected in v0.6.0
from an earlier, much tighter guess), and elevation is a real
Neutral-4-based shadow ladder used routinely, not just on modals —
cards carry `shadow-1` at rest.

---

## Needs Input (read this first)

Items below are either missing from the source brand deck or contradicted
themselves across slides. Each has a placeholder so work isn't blocked —
replace with confirmed values as the brand team signs off, and update the
changelog when you do.

| # | Gap | What's happening | Placeholder in use |
|---|-----|-------------------|---------------------|
| 1 | Pink hex conflict | Deck lists Pink `#FF4BB9` on one slide and Salmon Pink `#FF7A90` (tied to the Wood element + department system) on another, more developed slide; the real logo asset added in v0.4.0 also shipped with a third value (`#FFA6A8`) | **✅ Resolved 2026-07-29** — user confirmed this document is the canonical source; `#FF7A90` is final. The logo asset (`logo.html`) has been corrected to match. |
| 2 | Functional green hex | Deck lists functional Green as `#FD3343`, identical to the Red error color — almost certainly a copy/paste typo; the real logo asset added in v0.4.0 also shipped with a third value (`#00D97B`) for its Earth frame | **✅ Resolved 2026-07-29** — user confirmed this document is the canonical source; `#00C26E` is final. The logo asset (`logo.html`) has been corrected to match. |
| 3 | No numeric type scale | Typescale tokens had use cases but no sourced size/weight/line-height/letter-spacing — v0.1-v0.5 used an invented guess | **✅ Resolved 2026-07-29 (v0.6.0)** — sourced from a teammate's fuller deck extraction; see [Typescale](#typescale--needs-input-3--resolved-v060) and [Reconciliation](#reconciliation--teammates-design-system) |
| 4 | No spacing scale | Only "4px base unit, 16px card padding, 8px gap" mentioned — v0.1-v0.5 used an invented 9-step guess | **✅ Resolved 2026-07-29 (v0.6.0)** — real scale sourced from the teammate's extraction; see [Spacing](#spacing--needs-input-4--resolved-v060) |
| 5 | No border-radius values | No numbers in the deck as originally read — v0.1-v0.5 used an invented flat 4/8/12px guess | **✅ Resolved 2026-07-29 (v0.6.0)** — real per-surface radii (12/16/20px) sourced from the teammate's extraction; see [Radius](#radius--needs-input-5--resolved-v060) |
| 6 | No accessibility targets | Section exists with blank fields (min body text, min contrast, max line length) | WCAG 2.1 AA defaults proposed in [Accessibility](#accessibility) |
| 7 | No component specs | No buttons, inputs, cards, tables, badges, or states (hover/active/disabled/error) defined anywhere in the deck | First full draft (v0.2.0) in [Components](#components)/[Component Rules](#component-rules), now also **live-rendered** in `preview.html`'s Components section (v0.5.0) with a per-component "Copy markup" button — still not reviewed against a real screen or by the brand team |
| 8 | No final logo asset | **Further resolved 2026-07-31** — a real animated wordmark + mark SVG (`logo.html`, rebuilt on a new font, now trimmed to a fixed 5-frame Gold→Water→Wood→Fire→Earth sequence with `coin.svg` as the Gold frame), the full vector source library (`SVG/` — every letter and element icon), and a combined static lockup (`logo-lockups/collabrium-default-logo.svg`, the default — see [Logo](#logo)) now exist. The `#2B2B2C` vs `#2F2F2F` ink-color discrepancy between the static lockup and the animated mark is **resolved** — both now use `#2B2B2C`. Still missing: 4 of 5 department-colored lockup variants (Fire, Wood, Water, Earth), a clear-space rule, minimum size, and monochrome/reverse versions | Use `logo.html` for the live mark, `logo-lockups/collabrium-default-logo.svg` as the default static mark, and `SVG/` for individual pieces; don't extract a still frame or hand-composite the `SVG/` files as a "final" lockup without brand-team sign-off |
| 9 | Photography direction | Deck explicitly marks this "Placeholder. Will be incorporated later when we nail down the logo." | No placeholder proposed — genuinely blocked on logo finalization |
| 10 | No technical implementation values | Section exists with blank fields (loading strategy, font-display value, file formats, token/CSS variable format) | Not proposed — needs eng input, not a design guess |
| 11 | Icon weight policy reversed, propagated | [Iconography](#iconography) moved from "Fill exclusively" to a two-tier Regular/Fill split (2026-07-31), with no cited source (deck or teammate build) | **Resolved 2026-07-31** — [Component Rules](#component-rules) #6, the Guidelines Do/Don't list, the stylesheet `<link>`s (now loading both Regular and Fill), and every icon instance in `preview.html`'s live Components gallery (~40 icons across all 21 components) have all been reclassified per-tier, in both this document and its mirrored copy in `preview.html`. Four judgment calls made where the rule's examples didn't explicitly cover a case, none brand-team-confirmed: (1) the Tabs component's own "Settings" tab icon, treated as Tier 2 like SidebarNav rather than Tier 1 like a generic nav control; (2) the Stat/KPI card's trend indicators (caret-up/down, flat minus), treated as Tier 2 (expressive/informational) despite "arrow up/down" appearing in the Tier 1 example list, since they're not clickable; (3) Date picker's trigger-button calendar icon, kept Tier 2 per the explicit "Card / section header: Calendar... Fill" example despite sitting inside a button; (4) the "Copied" confirmation checkmark shown briefly after a Copy action, treated as a Tier 2 status confirmation rather than inheriting the Copy button's own Tier 1 weight |

---

## Brand Foundation

**Name:** Collabrium — Astro Digital Growth [OS]. From *Collab*oration +
Equi*librium*.

**Essence:** The shared home for Astro's digital teams — where six
functions (Content, Product, Marketing, Sales, Commercial, Editorial) stop
working around each other and start working together, without losing what
makes each one good at its job.

**Positioning statement:** "Collabrium is where Astro's Sales, Media,
Influence, Content, and Studio teams stop working in parallel and start
working together — so no rep, no editor, no strategist is ever the last to
know. Built from the ground up to bring people together, not just tools."

**Tone & personality:** Warm, collaborative, quietly confident.
- **Team-first** — talks like a colleague, not a control panel
- **Easy confidence** — sure of itself without needing to prove it
- **Plainspoken** — says the true thing simply, no jargon
- **Steady** — calm and dependable

**Voice & copywriting:** Write like you're talking to a teammate, not
briefing a system. Favor warm, human verbs (*see, share, meet in the
middle*) over mechanical ones (*sync, deploy, restore*). Keep it short and
plain — confidence doesn't need extra words.

**Content rules ✅ (enriched v0.6.0, sourced from the teammate's
extraction):**
- **Person.** Second person for the reader ("Nothing waiting on you"),
  first-person plural only for the system's own actions ("We'll try
  again in a minute"). Never "the user."
- **Casing.** Sentence case everywhere — headings, buttons, table
  headers, toasts. UPPERCASE is reserved for eyebrow labels and section
  kickers, always at `--tracking-eyebrow` (0.12em) wide tracking.
- **Emoji: never.** Not in UI, not in decks. Status is carried by a
  Phosphor Fill icon and a color.
- **Numbers.** Malaysian ringgit, `RM 100,000` — space after RM, comma
  thousands. Tabular figures in Mulish wherever numbers appear in a
  column.
- **Empty and error states stay human.** "Nothing waiting on you. When a
  brief needs your call, it lands here." — not "No records found."
- **One idea per sentence.** Fragments are fine as a lede.
- **The em-dash aside is a Collabrium house move** in the product's own
  copy, for the second beat of a thought ("Balance restored across
  execution, measurement, and allocation — not just speed for its own
  sake"). This describes Collabrium's brand voice specifically, not a
  general writing instruction for this document.

---

## Color Palette

### Brand accents

| Name | Hex | Usage | Element | Department cluster |
|---|---|---|---|---|
| Orange | `#FF5825` | Visibility & energy — brand/decorative | Fire | Marketing · PR · Sales · Brand & Creative |
| Salmon Pink | `#FF7A90` | Growth & vision — brand/decorative. Canonical value (Needs Input #1, resolved) | Wood | Strategy · R&D · Innovation · Product Design |
| Green | `#00C26E` | Support & stability — brand/decorative. Canonical value (Needs Input #2, resolved) | Earth | HR · People Ops · Customer Success · Admin |
| Navy Blue | `#1473E6` | Depth & flow — brand/decorative | Water | Data Analytics · Logistics · Supply Chain · Exec Strategy |
| Amber | `#FFA425` | Order & structure, warnings, celebratory highlights, chart series 6 | Gold | Finance · Legal · Compliance · QA & Audit |
| Obsidian | `#2B2B2C` | Primary action background, filled CTA buttons, active link borders, selected badge strokes — the dominant CTA color regardless of what brand colors share the screen | — | — |

### Secondary accents (not yet department-mapped)

| Name | Hex | Usage |
|---|---|---|
| Purple | `#9F56FF` | AI and premium feature UI, secondary tags, chart series 5 |
| Turquoise | `#00D9D9` | Additional secondary accent, reserved for future elements |

### Functional colors

| Name | Hex | Usage |
|---|---|---|
| Red | `#FD3343` | Errors, destructive actions, invalid input |
| Green | `#00C26E` | Success icons, valid input. Canonical value (Needs Input #2, resolved — deck's stated hex duplicated Red) |

### Neutrals

| Token | Hex | Usage |
|---|---|---|
| Neutral-9 | `#080808` | Primary text, headings, icon strokes, dark surface fills |
| Neutral-8 | `#171717` | Deepest dark surface — footer bands, full-bleed dark sections |
| Neutral-7 | `#222222` | Dark surface for inverted sections and modal overlays |
| Neutral-6 | `#292929` | Near-black accent surface, layered dark contexts |
| Neutral-5 | `#5a5a5a` | Secondary body text, icon secondary state, muted description, footer copy |
| Neutral-4 | `#bdbdbd` | Subtle shadow base, disabled control fills |
| Neutral-3 | `#d8d8d8` | Hairline borders on cards, dividers, input outlines, button strokes |
| Neutral-2 | `#f0f0f0` | Subtle background tint — alternating sections, card hover, input fills |
| Neutral-1 | `#ffffff` | Card surfaces, button text on dark fills, inverted text — no longer the page canvas (see Warm canvas below) |

### Warm canvas ⚠️ Rule changed 2026-08-03 (added in v0.6.0)

**Now the default page canvas everywhere** — product UI (app/dashboard
screens) and brand/editorial contexts (decks, landing pages, type
specimens, printed collateral) alike. This reverses the original v0.6.0
rule, which restricted this surface to brand/editorial only and kept
product UI on pure white (`Neutral-1`); see the Overview above and
Component Rules/Guidelines below, all updated to match. Component fills
(cards, inputs, and so on) are **not** affected by this change — they
keep their own documented values, mostly `Neutral-1` white, which now
sits as a deliberate figure-ground contrast against this warmer page
background instead of blending into a same-white canvas.

| Token | Hex | Usage |
|---|---|---|
| Canvas warm | `#FCFAF5` | Page canvas — the default background for every screen, product and editorial alike |
| Canvas warm card | `#FAF7F2` | Fill for a surface that's meant to blend into the warm canvas (e.g. a quote block, a featured stat) rather than stand apart from it |

### Elemental background tints ✅ (new in v0.6.0)

**These are the only permitted coloured backgrounds in the system.** A
surface may take a background colour, but only the lightest shade of the
element that *already owns that content* — 8% element on white, or the
`-strong` step (16%) for a nested or hovered layer inside an
already-tinted panel. Never a mid or full-strength element colour as a
fill, and never an element that doesn't own the content.

| Element | `-bg` (8%) | `-bg-strong` (16%) | Owns |
|---|---|---|---|
| Fire | `#FFEEE9` | `#FFDED3` | Marketing · PR · Sales · Brand & Creative |
| Wood | `#FFF2F4` | `#FFE4E9` | Strategy · R&D · Innovation · Product Design |
| Earth | `#E6F9F1` | `#CDF3E2` | HR · People Ops · Customer Success · Admin |
| Water | `#E8F1FD` | `#D0E3FB` | Data · Logistics · Supply Chain · Exec Strategy |
| Gold | `#FFF6E9` | `#FFEDD3` | Finance · Legal · Compliance · QA & Audit |

### Elements — motif & motion (for department-colored surfaces)

| Element | Motif | Motion |
|---|---|---|
| Fire (Orange) | Burst patterns, upward-tapered forms, irregular organic edges | Pulse outward, rise upward, flare briefly; expanding ring, warm radial glow |
| Wood (Salmon Pink) | Branching line structures, cross-section texture, organic curves | Branch outward from a point, growing line, expand from a single point |
| Earth (Green) | Grid structures, horizontal banded layers, concentric squares | Settle downward, gentle weight, anchored transitions |
| Water (Navy) | Sinuous single-line curves, droplet/teardrop forms, flow diagrams | Flow in from the side, liquid-fill chart animation, continuous transitions |
| Gold (Amber) | Hexagonal grid, sharp diagonal cuts, faceted forms, ledger lines | Arrive with sharp precision, clean geometric wipes, brief glint on hover |

---

## Typography

**Primary — Mulish.** Carries **everything functional and every
heading**: display through h5, body copy, navigation, buttons, form
fields, table content, captions, metadata, small UI labels. Keep in the
10–16px range for UI contexts. Headings are weight **800 ExtraBold** at
**letter-spacing 0** — the weight does the work, not tracking. SIL Open
Font License 1.1, free, self-hosting and commercial use permitted, no
attribution required.

**Secondary — Source Serif 4.** ⚠️ **Corrected in v0.6.0** — this is
*not* the display/heading font, as earlier drafts of this document
wrongly implied. Mulish owns the heading tokens. Source Serif 4 is a
deliberate **overlay for brand-statement moments only**: pitch-deck
ledes, brand story copy, pull quotes, and hero display numerals. Rules:
never below ~18–20px; never mix fonts inside a single sentence
(emphasis is a weight change, not a font swap); never in a dense
numeric column or table; at most one serif hero moment per view. Same
license terms as Mulish.

**Fallback stack:**
```css
font-family: 'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
```

**Local install — `fonts/collabrium-fonts.zip`.** A real font pack in
this folder, sourced directly from Google's official font repository
(github.com/google/fonts, not the web-embed CSS API — those are
unicode-range subsets, not proper desktop files): one variable-font
`.ttf` per family/style (covers every weight in a single file — no
separate Light/Regular/Bold downloads needed), plus each family's
`OFL.txt`. `preview.html`'s Fonts tab has a "Download font pack" button
wired to it. A browser cannot install a font into the OS directly (no
website can — that's a hard, universal security boundary, not something
specific to this page), so after downloading, the last step is always
manual: double-click each `.ttf` and confirm "Install Font."

### Typescale ✅ (Needs Input #3 — resolved v0.6.0)

Every token below is Mulish (Primary) at letter-spacing 0 unless noted.
Values are sourced, not guessed: they were corrected in v0.6.0 against a
teammate's independent extraction of the same source deck (see
[Reconciliation](#reconciliation--teammates-design-system)). What changed
from the earlier draft: heading weights went 600 → **800**, negative
letter-spacing was removed entirely, sizes shifted down (display 56 →
40), `display` moved from Secondary to Primary font, and a **responsive
`-lg` tier** was added for ≥1280px viewports.

| Token | Size | Line-height | Size (lg) | Line-height (lg) | Weight | Use case |
|---|---|---|---|---|---|---|
| display | 40px | 56px | 48px | 66px | 800 | Hero headlines, cover slides |
| h1 | 32px | 38px | 40px | 56px | 800 | Page-level heading |
| h2 | 26px | 36px | 32px | 44px | 800 | Section headings |
| h3 | 22px | 30px | 24px | 34px | 800 | Card/subsection titles |
| h4 | 20px | 28px | 22px | 30px | 800 | Minor headers/section label |
| h5 | 16px | 20px | — | — | 700 | Table group headers |
| body1 | 16px | 22px | — | — | 500 | Default body copy |
| body1 strong | 16px | 22px | — | — | 700 | Emphasis in body copy |
| body2 | 14px | 20px | — | 22px | 400 | Secondary supporting text |
| body2 strong | 14px | 20px | — | 22px | 700 | Emphasis in body2 |
| label1 | 14px | 20px | — | — | 700 | Prominent form/field labels |
| label2 | 13px | 18px | — | — | 700 | Buttons, tags, chips |
| label3 | 11px | 16px | — | — | 700 | Metadata tags, dense table headers (uppercase, +0.04em) |
| link1 | 16px | 24px | — | — | 500 | Primary inline links |
| link2 | 13px | 18px | — | — | 500 | Footer links, inline micro-actions |
| footnote | 12px | 16px | — | — | 400 | Legal disclaimers, citations |
| caption | 12px | 16px | — | — | 400 | Timestamps, image captions |

**Eyebrow/kicker tracking:** `+0.12em` (`--tracking-eyebrow`) for small
uppercase labels above a heading. This is the only other place tracking
is applied besides `label3`.

Note: the deck's two usage-matrix slides disagree on the pitch-deck/
marketing row (one says Secondary font for "pitch deck title slides" and
"quote/testimonial callouts," the other broadens this to general marketing
copy and even the logo wordmark). Treated the narrower, first version as
canonical — logo wordmark should be neither font per the deck's own
"Logo wordmark: Neither" row on the first matrix.

---

## Iconography

⚠️ **Weight policy changed 2026-07-31 — see gap notes below before treating
as final.** Collabrium icons are bold, chunky silhouettes with rounded,
organic forms, from a two-library system in **two weights** — the weight is
decided by what the icon *does*, not by taste. This replaces the earlier
"Fill exclusively, no outlines" rule; see [Needs Input #11](#needs-input-read-this-first).

- **Primary — Phosphor** (phosphoricons.com, MIT License, free). Both weight
  stylesheets load together: Regular for Tier 1 icons, Fill for Tier 2 (see
  below).
- **Fallback — Remix Icon** (remixicon.com, Apache 2.0, free). Only when
  Phosphor lacks the glyph, following the same tier split (e.g. `ri-plus-line`
  for Tier 1, `ri-check-circle-fill` for Tier 2).

### The two tiers

**Tier 1 — functional/control icons → Regular (outline).** Icons inside
buttons, toolbars, and as affordances: these are actions the user *performs*,
not concepts being communicated. At `icon-sm` (16px) and `icon-base` (20px),
Regular reads more precisely and feels less heavy than Fill — Fill on a small
`+` or `×` reads as visually heavy. Applies to: add, close, more-horizontal,
more-vertical, chevron up/down/left/right, arrow up/down/left/right, sort,
drag handle, expand, collapse, refresh, search (inside an input field),
filter, check and minus (the Checkbox marks), pencil-simple, trash,
download-simple, upload-simple.

Where a slug legitimately serves both tiers, the status meaning wins the
default and the control call site opts out — e.g. `x-circle` is Tier 2 (the
error status indicator in `Toast`), while a remove affordance uses plain `x`
instead (see `Tag`'s remove button).

**Tier 2 — expressive/status/decorative icons → Fill.** Icons that
communicate meaning, status, or context rather than trigger an action; they
carry visual weight intentionally, and at `icon-md` (24px) and above, Fill
reads naturally. Applies to: status indicators (success, warning, error,
info), sidebar navigation items, card header icons, department indicators,
feature highlights, empty-state illustrations, onboarding icons.

| Icon type | Examples | Weight | Class prefix |
|---|---|---|---|
| Action inside a button | Plus, X, DotsThree | Regular | `ph` |
| Toolbar affordance | Sort, Filter, Refresh | Regular | `ph` |
| Navigation control | ChevronDown, ArrowLeft | Regular | `ph` |
| Search inside input | MagnifyingGlass | Regular | `ph` |
| Sidebar nav item | House, Users, Chart | Fill | `ph-fill` |
| Status indicator | CheckCircle, Warning | Fill | `ph-fill` |
| Card / section header | Calendar, Briefcase | Fill | `ph-fill` |
| Empty state | FolderOpen, CloudSlash | Fill | `ph-fill` |

**Color rule:** icons inherit the text color of their surrounding context.
They don't use elemental/accent colors unless inside a department-specific
surface where that element's color is already established.

**Size scale:**

| Token | Size | Usage |
|---|---|---|
| icon-micro | 14px | Table cells, tag labels, badge indicators |
| icon-sm | 16px | Inline with body text, buttons, form field icons, status indicators |
| icon-base | 20px | Sidebar navigation, card action buttons, standard UI |
| icon-md | 24px | Card headers, section titles, modal headers, featured actions |
| icon-lg | 32px | Department indicators, feature highlights, onboarding steps |
| icon-empty | 48px | Empty state panels, zero-data views, section placeholders |
| icon-hero | 64px | Full-page empty states, first-run onboarding, error pages |

---

## Spacing & Shape

### Spacing ✅ (Needs Input #4 — resolved v0.6.0)

Base unit 4px. Tokens are **value-named** (`spacing-16` = 16px) rather
than step-numbered, matching the source scale exactly. Corrected v0.6.0:
the real scale includes 20px and 40px steps the earlier draft missed, and
tops out at 120px rather than 96px.

| Token | Value | Purpose |
|---|---|---|
| spacing-4 | 4px | Base unit |
| spacing-8 | 8px | Element gap — default gap between elements |
| spacing-12 | 12px | Tight internal padding (button horizontal padding, table cells) |
| spacing-16 | 16px | Card padding — the deck's stated default |
| spacing-20 | 20px | Compact section-internal spacing |
| spacing-24 | 24px | Section-internal spacing (card title block to body), dialog padding |
| spacing-32 | 32px | Page gutter — horizontal page padding |
| spacing-40 | 40px | Large internal spacing (empty-state vertical padding) |
| spacing-48 | 48px | Section gap — between distinct dashboard sections |
| spacing-60 | 60px | Large section gap — between major page regions |
| spacing-120 | 120px | Full-page / hero-level spacing |

**Semantic aliases:** `--card-padding` (16px), `--element-gap` (8px),
`--section-gap` (48px), `--page-gutter` (32px). Prefer these in component
code — they say *why*, not just how much.

**Content max-width:** 1200px for centered, reading-width content
(settings forms, detail panels). Collabrium is a product surface, so most
layouts run full-bleed within the app shell rather than centering.

### Radius ✅ (Needs Input #5 — resolved v0.6.0)

⚠️ **The earlier 4/8/12px scale was wrong** — a guess, and much too
tight. Collabrium is a distinctly **soft-cornered** system: 20px on
cards, 16px on buttons. Radius is specified **per surface**, not as one
abstract ramp.

| Token | Value | Applies to |
|---|---|---|
| radius-sm | 12px | Inputs, small buttons, icon buttons |
| radius-md | 16px | Standard and large buttons |
| radius-lg | 20px | Cards, modals, nav, feature panels, swap widgets |
| radius-pill | 999px | Pills, badges, tags, avatars |
| radius-link | 32px | Link-styled pill CTAs |

**Rule:** one radius token per component type across the whole product —
see [Component Rules](#component-rules), Rule 1. Never go below 12px on
an interactive surface; sharp corners are off-brand here.

### Elevation ✅ (corrected v0.6.0)

⚠️ **The earlier "flat by default" policy was wrong.** Collabrium has a
real shadow ladder and uses it routinely — cards carry `shadow-1` at
rest, not just a border. Every shadow is built on **Neutral-4
(`#bdbdbd`), never black** — that's what keeps them soft and on-brand.

| Token | Value | Use |
|---|---|---|
| shadow-hairline | `0 0 0 1px #d8d8d8` | Hairline ring (border substitute) |
| shadow-1 | `0 1px 2px rgba(189,189,189,.45)` | Cards, secondary buttons — default resting elevation |
| shadow-2 | `0 2px 8px rgba(189,189,189,.42)` | Hover / raised state |
| shadow-3 | `0 8px 24px rgba(189,189,189,.40)` | Popovers, dropdowns |
| shadow-4 | `0 16px 48px rgba(189,189,189,.44)` | Dialogs / modals |
| shadow-inset | `inset 0 1px 0 rgba(255,255,255,.6)` | Optional top-edge highlight |
| shadow-focus | `0 0 0 3px rgba(20,115,230,.28)` | Focus ring (Water-based) |
| shadow-overlay | `rgba(8,8,8,.56)` | Modal scrim (a fill, not a shadow) |

**Focus rings are Water (Navy), not Obsidian** — corrected v0.6.0. This
is the one place an element color legitimately drives an interactive
state.

### Motion ✅ (new in v0.6.0)

Previously undocumented — this section didn't exist before. The
governing principle: **"Movement settles; it never bounces."** No
overshoot, no elastic easing.

| Token | Value | Use |
|---|---|---|
| duration-instant | 80ms | Micro feedback (press, toggle) |
| duration-fast | 140ms | Hover, focus transitions |
| duration-base | 220ms | Default UI transitions |
| duration-slow | 360ms | Panel / section reveals |
| duration-ambient | 900ms | Background / ambient motion |

Each element owns an easing curve, used when the motion is thematically
tied to that element (e.g. a Water-owned panel slides with
`--ease-flow`). `--ease-standard` is the default for everything else —
reach for an elemental curve deliberately, not by default.

| Token | Curve | Character |
|---|---|---|
| ease-standard | `cubic-bezier(.2,.6,.2,1)` | Default UI easing — quick out, soft settle |
| ease-settle | `cubic-bezier(.16,.84,.24,1)` | **Earth** — anchored arrivals |
| ease-flow | `cubic-bezier(.37,0,.29,1)` | **Water** — continuous, uninterrupted |
| ease-flare | `cubic-bezier(.05,.7,.1,1)` | **Fire** — pulse outward, rise |
| ease-precise | `cubic-bezier(.4,0,.2,1)` | **Gold** — sharp, decisive |
| ease-grow | `cubic-bezier(.25,.46,.45,.94)` | **Wood** — branching growth |

---

## Logo

**Concept — "Balance in motion."** Collabrium's mark is built on a
5-elements theory (Gold, Fire, Water, Wood, Earth) representing how
different functions/energies sustain each other in balance — none succeeds
alone, the system depends on collaboration to maintain equilibrium. Each
element maps to a brand color and department cluster (see [Color
Palette](#color-palette)).

> Like the elements themselves, work moves constantly, unpredictably, and
> rarely in sync. What it needs isn't less movement — it's a structure
> grounded enough to hold it and harmonious enough to let each element
> feed the next instead of fighting it. Collabrium is that structure: a
> daily reading of where your elements stand, what's overflowing, what's
> stalled, and where balance needs restoring — so the same forces that
> could create chaos are the ones that create your outcome.

### Default static lockup — `logo-lockups/collabrium-default-logo.svg`

⚠️ **New 2026-07-31 — further resolves Needs Input #8.** A combined,
non-animated wordmark lockup, with the "O" rendered as a solid Gold/Amber
`#FFA425` ring rather than the animated filmstrip. This is the asset for
any context that can't run `logo.html`'s animation (favicons, print,
email, static deck slides, social previews).

**Default-logo rule:** whenever the Collabrium mark is used without a
specific department/element context, **this Gold lockup is the default**
— not a static frame grabbed from the animation, not any other element's
color. Only when the surface is already department-specific (e.g. a
Marketing-owned deck cover, a Finance report header) does the mark switch
to that department's own element-colored lockup instead:

| Element | Department | Lockup file |
|---|---|---|
| Gold | Finance · Legal · Compliance · QA & Audit | `logo-lockups/collabrium-default-logo.svg` ✅ |
| Fire | Marketing · PR · Sales | `logo-lockups/fire.svg` — not yet provided |
| Wood | Strategy · R&D · Product | `logo-lockups/wood.svg` — not yet provided |
| Water | Data · Logistics · Exec | `logo-lockups/water.svg` — not yet provided |
| Earth | HR · CS · Admin | `logo-lockups/earth.svg` — not yet provided |

✅ **Ink-color discrepancy, resolved 2026-07-31:** `logo.html`'s wordmark
was rebuilt on a new font (see below) and now uses `#2B2B2C` (Obsidian),
matching this lockup exactly. The two logo assets no longer disagree on
wordmark black.

**The real asset — `logo.html`.** A working animated wordmark exists in
this folder: the word "COLLABRIUM" with the O rendered as a looping
filmstrip. **Trimmed 2026-07-31** to the 5 documented elements only, in
a fixed sequence — **Gold → Water → Wood → Fire → Earth** — rather than
cycling through all 5 plus 4 extra decorative frames. The previous
9-frame loop (which also included sun, moon, cloud, mountain —
**motion-graphic variety only**, never part of the 5-element/department
classification system) has been replaced; those 4 decorative frames are
no longer in the animation at all. The Gold frame's artwork is now
`coin.svg`, not the `gold.svg` bracket icon used elsewhere in this
system (Color Palette, ElementBadge, sidebar-nav dots, etc.) — see the
Vector source library note below for why. The source asset originally
shipped with a visible element-name label and a play/pause control; both
were removed at the user's request (2026-07-29) so the file embeds as a
clean, always-animating mark with no dev/debug UI. **Rebuilt on a new
font 2026-07-31:** every static letter's path data was replaced, kerning
recalculated from the new letterforms' widths (consistent 8px gaps, same
convention as before), and the wordmark's ink color changed from
`#2F2F2F` to `#2B2B2C` (Obsidian) to match the new font's source files
— see the Default static lockup section above for why that resolves a
previously-flagged discrepancy. As received, two of the five element
frames used off-palette hex values (Wood `#FFA6A8`, Earth `#00D97B`);
both were corrected to the canonical values in this document (`#FF7A90`,
`#00C26E` — see Needs Input #1/#2, resolved) before the frame-trim above.

**Vector source library — `SVG/`.** This folder holds the individual
vector files `logo.html` is assembled from — confirmed by diffing them
against the animation's path data, they match exactly (letters and the
five core-element icons are byte-identical to what's embedded in
`logo.html`). Use these, not a screenshot or a hand-traced copy, for any
new build that needs the mark in pieces (e.g. a static lockup, a
single-element icon on its own, print work).

- **Wordmark letters (8 files):** `a.svg`, `b.svg`, `c.svg`, `i.svg`,
  `l.svg`, `m.svg`, `r.svg`, `u.svg` — every unique letter in
  "C•LLABRIUM" except the O, which is the animated element mark, not a
  static letter. **Replaced 2026-07-31** with a new font — new path data,
  new dimensions per letter, `fill` changed from `#2F2F2F` to `#2B2B2C`.
- **Element icons (10 files):** `fire.svg`, `wood.svg`, `earth.svg`,
  `water.svg` (4 of the 5 documented elements, all used live in
  `logo.html`'s animation) plus `sun.svg`, `moon.svg`, `cloud.svg`,
  `mountain.svg` (decorative-only, **no longer used in `logo.html` as of
  2026-07-31** — the animation was trimmed to 5 frames, see above) and
  `coin.svg`. ✅ **`coin.svg`'s role resolved 2026-07-31** — it's now the
  Gold frame's artwork in `logo.html`'s animation, replacing `gold.svg`
  there. `gold.svg` (the bracket-shaped icon) remains the Gold element
  icon used everywhere *else* in this system (Color Palette, ElementBadge,
  sidebar-nav dots, Chart color mapping) — the two are deliberately
  different assets for different purposes now, not a duplicate to
  reconcile.
- **Motive variants (5 files):** `motive sun.svg` and `motive moon.svg`
  are byte-identical duplicates of `sun.svg`/`moon.svg` (no actual
  difference). `motive water.svg`, `motive cloud.svg`, and
  `motive coin.svg` are genuinely different artwork from their base
  icon — doubled/grounded/alternate compositions that read as
  background-texture motifs rather than a small mark, consistent with
  the "Motif" column in the Elements table above. Their exact intended
  usage (pattern fill vs. standalone icon) isn't documented anywhere —
  flagged as unconfirmed, not guessed.
- **⚠️ Known color drift in the raw exports:** `wood.svg` still carries
  the original off-palette `#FFA6A8` and `earth.svg`/`mountain.svg`
  still carry `#00D97B` — the same conflict already resolved in
  `logo.html` (Needs Input #1/#2). These source files have **not** been
  edited to match, since they may be managed as master exports outside
  this repo (e.g. from Figma/Illustrator) — don't silently "fix" them;
  confirm with whoever owns that source before touching fill colors
  there. `logo.html`'s corrected values remain the canonical reference
  for Wood and Earth either way.

⚠️ **Needs Input #8 — further resolved, not closed.** Individual static
vector assets now exist for every letter and element (see `SVG/` above),
closing most of the original gap. Still missing: a single **combined**
static lockup (all letters + a chosen element frame composed as one
file, for contexts that can't run the animation — favicons, print,
email, a static deck slide), a clear-space rule, a minimum size, and
monochrome/reverse versions. Don't treat a screenshot of `logo.html`, or
an ad-hoc composite of the `SVG/` files, as a final lockup — confirm
with the brand team before using one in a real build.

## Photography & Visual Direction

⚠️ **Needs Input #9 — explicitly blocked.** The source deck states:
"Placeholder. Will be incorporated later when we nail down the logo." No
draft proposed; this depends on the logo work above.

---

## Accessibility

⚠️ **Needs Input #6.** Deck has an Accessibility section with blank
values. Proposed WCAG 2.1 AA defaults below — confirm with brand/eng
before treating as policy.

| Target | Draft value |
|---|---|
| Minimum body text | 14px (matches body2 token) |
| Minimum contrast ratio | 4.5:1 for body text, 3:1 for large text (24px+) and UI components |
| Maximum line length | ~75 characters |

## Technical Implementation

⚠️ **Needs Input #10.** Deck has this section with blank values (loading
strategy, font-display value, file formats served, design tokens/CSS
variable format). This needs engineering input, not a design placeholder —
flagged, not guessed.

## Component Rules

These apply to every component below. They exist so ten different people
(or ten different Claude sessions) building ten different screens produce
one consistent product, not ten dialects.

1. **One radius per component type.** Buttons, inputs, and tags always use
   the same radius token across the whole product — don't let one screen's
   button be `radius-sm` and another's `radius-md`. See the mapping in each
   component below.
2. **Obsidian is the only primary-action color.** Brand/element colors
   (Orange, Salmon Pink, Green, Navy, Amber) classify — they mark which
   department or element something belongs to. They never mean "click me."
   A green badge on an HR record and a green primary button are not the
   same kind of signal; only Obsidian carries the second one.
3. **Only use tokens, never raw values.** Padding, gaps, font sizes, radii,
   and colors all come from the tables in this document. If a screen needs
   a value that isn't a token, that's a sign the token set is incomplete —
   flag it, don't invent a one-off pixel value.
4. **Every interactive component defines its full state set.** Default,
   hover, active/pressed, focus-visible, and disabled at minimum; add error
   for anything that takes input. A component spec that only shows the
   default state isn't finished.
5. **Contrast is checked, not assumed.** Every text/background and
   icon/background pairing in a component must clear the ratios in
   [Accessibility](#accessibility) (draft: 4.5:1 body, 3:1 large
   text/UI). This applies inside brand-colored surfaces too — e.g. white
   text on Amber `#FFA425` fails AA; use Obsidian text on light accent
   fills instead (see each component's notes).
6. **Icon weight follows the Tier 1/Tier 2 split, not taste**, per
   [Iconography](#iconography) — Regular for functional/control icons, Fill
   for expressive/status icons. Never mix in a Remix icon next to a
   Phosphor one within the same component instance.
7. **Secondary font (Source Serif 4) does not appear inside components.**
   Buttons, inputs, tags, table cells, and modal body copy are Primary
   font only, per [Typography](#typography). A modal *title* may use `h3`
   (Primary, per the resolved typescale) — Secondary stays reserved for
   marketing/hero moments outside the component layer.

---

## Components

⚠️ **First full draft (v0.2.0) — see Needs Input #7.** Built from the
token set above since the source deck defined none of this. Treat sizes,
paddings, and state colors as a starting point for review, not a
signed-off spec — nothing here has been checked against a real screen or
by the brand/design team yet.

**Live gallery — `preview.html`, Components tab (v0.8.2).** Every
component below is also rendered live in `preview.html`'s left pane,
right next to this same spec in the DESIGN.md tab on the right — each
with a "Copy markup" button. That page is the reference implementation;
these tables are the reference spec. If they ever disagree, that's a
bug — fix both together (see the doc-sync rule: nothing here ships
without preview.html matching, and nothing in preview.html ships
without this file updated to match).

**It's genuinely interactive, not just styled markup (v0.8.2).**
SidebarNav and Tabs switch on click, Checkbox/Radio/Switch actually
toggle (including via keyboard, not just mouse), Table rows and
DataTable rows select on click, Toast and Modal dismiss and — for
Modal — reopen, Filters' triggers/pills/Clear-all respond, Pagination
advances, and Date picker days select. Two things are deliberately
inert: the Date picker's month-nav arrows and its trigger button don't
do anything, since wiring real calendar math or a real open/close
toggle (which would hide the calendar with no way to reveal it in a
static gallery) is out of scope for a component reference — the panel
just stays permanently visible so you can see it.

**Scope note — corrected 2026-08-04, this count had drifted stale.**
21 components were specced through v0.8.2 — the original 7 basics
(Button, Input field, Card, Badge & Tag, Table row, Modal / dialog,
Empty state), 10 transcribed directly from the teammate's real
component source in v0.7.0 (SidebarNav, Tabs, Select, Checkbox, Radio,
Switch, Toast, Tooltip, DataTable, ElementBadge), 4 more **designed
from scratch in v0.8.0** — Stat/KPI card, Filters, Pagination, Date
picker — plus a Chart color mapping guideline (not a rendered
component). Those last 5 have **no source in either the original brand
deck or the teammate's build**; they're built entirely from this
document's own token system (color, type, spacing, radius, elevation,
motion) and marked ⚠️ **designed, not transcribed** in their own
sections — treat them as a first pass needing real design/brand review
before shipping, more provisional than the transcribed components above
them. **Since then, and never previously reflected in this note:**
Button gained an Icon-only variant, and Input field gained three
sibling components (Textarea, Password field, Search input clear
button) — all four dated 2026-08-03 in their own sections — plus **App
Shell**, added here in this same pass, the page-level composition layer
(Sidebar placement, Top bar, Content region, Page header) that the
gallery never had, **Stepper** (v0.9.1) — a multi-step progress
indicator, also designed from scratch with no source in either system —
**UserPicker** (v0.9.2), a searchable person picker, same status —
**FileUploader** (v0.9.3), click-to-browse/drag-and-drop file
attachment, same status — and **MultiSelect** (v0.9.4), a grouped
checkbox dropdown with removable selection chips, also designed from
scratch with no source in either system.
This note existing-but-undercounting for a full day is itself the
doc-sync failure App Shell was written to prevent
elsewhere — see each section below for source notes and don't let a
new component ship without updating this count too. Don't skip straight
to markup for a new component — write the spec here first (variants,
sizes, states, Do/Don't), the same process every component above went
through.

- [App Shell](#app-shell)
- [Badge & Tag](#badge--tag)
- [Button](#button)
- [Card](#card)
- [Chart color mapping](#chart-color-mapping)
- [Checkbox](#checkbox)
- [DataTable](#datatable)
- [Date picker](#date-picker)
- [ElementBadge](#elementbadge)
- [Empty state](#empty-state)
- [FileUploader](#fileuploader)
- [Filters](#filters)
- [Input field](#input-field)
- [Modal / dialog](#modal--dialog)
- [MultiSelect](#multiselect)
- [Pagination](#pagination)
- [Password field](#password-field)
- [Radio](#radio)
- [Search input clear button](#search-input-clear-button)
- [Select](#select)
- [SidebarNav](#sidebarnav)
- [Stat / KPI card](#stat--kpi-card)
- [Stepper](#stepper)
- [Switch](#switch)
- [Table row](#table-row)
- [Tabs](#tabs)
- [Textarea](#textarea)
- [Toast](#toast)
- [Tooltip](#tooltip)
- [UserPicker](#userpicker)

### App Shell

⚠️ **New — designed from scratch, no source in the brand deck or the
teammate's build**, same status as the v0.8.0 batch (Stat/KPI card,
Filters, Pagination, Date picker). Added after real downstream builds
showed why it was missing: separate teams built dashboards on this spec
and produced different navigation shells (pure sidebar, top-bar-only,
sidebar **and** top-bar) plus a card-chrome deviation and a Badge
semantics miss. The component tables weren't wrong — [SidebarNav](#sidebarnav),
[Card](#card), and [Badge & Tag](#badge--tag) already specify their own
internals correctly. What was missing is the composition layer that
says how those pieces combine into an actual screen. This section is
that layer.

**Canonical pattern: sidebar-only. No separate Top bar chrome — Page
header is the top of every screen.** [SidebarNav](#sidebarnav) already
has its own Header slot (logo/workspace switcher) and Footer slot
(account/profile) — that's a complete app frame without a second nav
surface. ⚠️ **Revised 2026-08-04:** an earlier draft of this section
specced an optional Top bar (notifications, account menu) as a second
piece of persistent chrome above the content. That's been dropped for
now — no persistent bar runs across the top independent of the page's
own content. Instead, **Page header**, below, *is* the top of the
screen: full width, title/subtitle on the
left, CTAs/actions right-aligned. Global-scope controls (notifications,
account) have nowhere defined to live yet as a result — that's an
explicit, acknowledged gap, not a silent omission; revisit this
decision if/when the product actually needs them.

**Page canvas:** `Canvas warm` `#FCFAF5` for the entire viewport
background, per the Color Palette's Warm canvas rule (now default
everywhere as of 2026-08-03). Sidebar and Card keep their own documented
`Neutral-1` white fill — that's the intended figure-ground contrast
against the canvas, not a mismatch to correct. Note the timing: that
"warm everywhere" rule is one day old at the time of writing, so a
build made before 2026-08-03 landing on plain white or grey product UI
isn't a spec violation — it was correct under the rule that existed
when it was built.

#### Sidebar placement (extends SidebarNav)

[SidebarNav](#sidebarnav)'s own spec (240px, `radius-lg`, 1px border on
all four sides) describes a **self-contained floating panel** — correct
for an inset or off-canvas usage, but not for the primary shell rail,
which runs the full viewport height flush against the browser edge. A
100dvh-tall panel with rounded top and bottom corners flush against the
viewport edge would show canvas colour bleeding through those corners,
so the rail is a distinct placement variant, not a re-spec of the
component itself:

| Property | Value |
|---|---|
| Height | 100dvh, fixed to the left edge |
| Width | 240px — unchanged from SidebarNav's own spec |
| Radius | none — flush corners top and bottom, unlike the floating-panel default |
| Border | right edge only, `shadow-hairline` (1px Neutral-3) — the other three edges are flush against the viewport, no border needed there |
| Fill | Neutral-1 — unchanged |
| Internal anatomy | unchanged — Header, Section label, Nav item (active/inactive), icon, trailing count, Footer all per [SidebarNav](#sidebarnav) as written |

**New state — Locked / "Soon":** a third nav-item state, for sections
that exist in the IA but aren't built yet (this has already shown up
organically in a real build). Transparent fill (same as inactive),
Neutral-4 text (one step more muted than inactive's Neutral-5), icon at
40% opacity, `cursor: not-allowed`, no hover/focus feedback. The
trailing slot carries a Badge (Neutral variant, "Soon" label) instead
of the trailing-count slot — the two are mutually exclusive on one item.

**Responsive** ⚠️ provisional, first pass, no source: below 1024px,
collapse to a 72px icon-only rail (labels hidden, tooltip on hover
instead); below 768px, the sidebar becomes an off-canvas drawer — and
*that's* where SidebarNav's original floating-panel spec (`radius-lg`,
border on all sides) actually applies, sliding in over the content with
`shadow-4` beneath it.

#### Content region

| Property | Value |
|---|---|
| Fill | `Canvas warm` `#FCFAF5` — same as the page canvas; this region doesn't get its own background |
| Padding | `--page-gutter` (32px) horizontal, `--section-gap` (48px) top — reusing existing [Spacing & Shape](#spacing--shape) tokens, no new values introduced |
| Max-width | full-bleed by default; 1200px centered only for reading-width content (settings, detail panels) — existing rule, unchanged |
| Section gap | `--section-gap` (48px) between distinct regions (stat-card row → main panels → activity panel) |
| Grid gutter | spacing-16–20 between tiles in a stat-card row — pick one value per product and hold it, don't vary row to row |

#### Page header — the top of every screen

The title/subtitle/actions block every downstream build has been
inventing from scratch — this gives it one shape, and — since the
2026-08-04 revision above — it's also the *only* top-of-screen chrome
the shell has, not a block nested below a separate bar.

| Property | Value |
|---|---|
| Width | 100% of the main column (everything to the right of Sidebar) — full-bleed, matching Content region's own full-bleed rule, not a padded/inset block among the cards below it |
| Title | h1 (32px/800) |
| Subtitle | body2, Neutral-5, directly below the title |
| Actions / CTAs | right-aligned row, `--element-gap` (8px) between items, built from existing [Button](#button) variants — a period selector ("This month ▾") is a [Select](#select) trigger styled as a pill, not a new control. Zero, one, or several CTAs are all valid; the row simply collapses when empty |
| Gap to content below | `--section-gap` (48px) |

**Do:** let Sidebar own primary navigation and its own Header/Footer
slots — there's no second nav surface to reach for. Keep the whole
viewport on `Canvas warm` and let Sidebar/Card read as white surfaces
against it — that contrast is the system now, not an inconsistency to
fix. **Don't:** invent a new sidebar width, radius, or border treatment
per app — 240px flush-rail is the one canonical shell; the
floating-panel treatment (`radius-lg`, 4-sided border) is reserved for
inset/off-canvas contexts only, never the primary rail. **Don't:** add
a persistent global top bar back in without revisiting the 2026-08-04
decision above — if notifications or an account menu become a real
requirement, that's a spec change, not a quiet addition on top of this.

### Badge & Tag

⚠️ **Corrected v0.6.0 — these are two separate components**, previously
merged into one here.

**Badge** — conveys *status or tone*. 22px tall, `spacing-8` horizontal
padding, caption type at weight 700, `radius-pill`, and — new in v0.6.0 —
**a 1px border** in a stronger tint of the same hue, which is what makes
these read as deliberate at small sizes. **`white-space: nowrap`** is
required — added v0.8.1 after a real build wrapped a "Follow-up" label
onto two lines, which broke the fixed 22px height and the pill shape
along with it. A fixed-height pill and wrapping text are incompatible;
if a label risks being that long, shorten the label rather than let the
component reflow.

| Variant | Fill | Text | Border |
|---|---|---|---|
| Neutral | Neutral-2 `#f0f0f0` | Neutral-5 | Neutral-3 |
| Success | Green at 12% | `#00854c` (darkened for AA) | Green at 32% |
| Danger | Red at 10% | Red `#FD3343` | Red at 30% |
| Warning | Amber at 14% | `#9a5c00` (darkened for AA) | Amber at 38% |
| Info | Water at 10% | Water `#1473E6` | Water at 28% |
| Selected | Neutral-1 | Neutral-9 | Obsidian `#2B2B2C` |

Note the darkened Success and Warning text values — full-strength Green
and Amber both fail AA on their own light fills at this size.

**Tag** — labels *which element/department owns* something. 24px tall,
10px horizontal padding, caption type at weight 700, `radius-pill`,
Neutral-2 fill, with a **6px dot** in the element's full-strength color
and matching text color. Distinct from Badge because ownership is not a
status.

Both accept an optional leading `icon-micro` (14px) in the text color —
weight follows the icon's own [Iconography](#iconography) tier (a Tag's
element motif icon, e.g. `flame`/`drop`, is **Tier 2, Fill**, since it's a
department indicator, not a control).

**Do:** use Badge for state (Live, Paused, Blocked), Tag for ownership
(Fire · Marketing). **Don't:** fill either solid with a brand color and
put white text on it — several accents fail contrast that way at this
size.

### Button

All buttons are **weight 700**. Corrected v0.6.0: radius now varies by
size, Secondary carries `shadow-1`, and two variants were added.

| Variant | Fill | Text/icon color | Border | Use for |
|---|---|---|---|---|
| Primary | Obsidian `#2B2B2C` | Neutral-1 `#ffffff` | none | The one main action on a screen or card |
| Secondary | Neutral-1 `#ffffff` | Neutral-9 `#080808` | 1px Neutral-3 + `shadow-1` | Secondary actions alongside a primary button |
| Ghost | transparent | Neutral-9 `#080808` | none | Low-emphasis actions, toolbar/table-row actions |
| Danger | Red `#FD3343` | Neutral-1 `#ffffff` | none | Destructive commit actions (delete, revoke) |
| Link | transparent | Neutral-9 `#080808` | none, underlined (3px offset) | Inline text-level actions; no height or padding |

**Sizes:**

⚠️ **Font sizes corrected 2026-07-29** — re-verified directly against the
teammate's `Button.jsx` (not just their docs) and the earlier v0.6.0 pass
had this wrong: it mapped button type to the `label1/2/3` scale (14/13/11px),
but the real component uses **14px for sm, and 16px for both md and lg**
— md and lg share a type size and differ only in height/padding. That
16px doesn't correspond to any named label token in this document; it's
a component-specific override, not a scale mismatch to "fix" elsewhere.

| Size | Height | Horizontal padding | Type size | Weight | Radius |
|---|---|---|---|---|---|
| sm | 32px | spacing-12 (12px) | 14px | 700 | `radius-sm` (12px) |
| md (default) | 40px | spacing-16 (16px) | 16px | 700 | `radius-md` (16px) |
| lg | 48px | spacing-20 (20px) | 16px | 700 | `radius-md` (16px) |

**States:**

| State | Primary | Secondary | Ghost |
|---|---|---|---|
| Default | Obsidian fill | Neutral-1 fill, Neutral-3 border | transparent |
| Hover | Neutral-8 `#171717` fill | Neutral-2 `#f0f0f0` fill | Neutral-2 fill |
| Active/pressed | Neutral-7 `#222222` fill | Neutral-3 fill | Neutral-3 fill |
| Focus-visible | above + 2px Obsidian outline, 2px offset | same | same |
| Disabled | Neutral-4 `#bdbdbd` fill, Neutral-1 text | Neutral-3 border, Neutral-4 text | Neutral-4 text |
| Loading | Primary fill, centered spinner replaces label, button width unchanged | same pattern | same pattern |

Leading icon optional, `icon-sm` (16px), same color as label — weight
follows the icon's own [Iconography](#iconography) tier, not the button
(e.g. a leading `plus` is **Tier 1, Regular**; a leading `check-circle`
would stay **Tier 2, Fill**).

**Icon-only — added 2026-08-03.** Any color variant except Link (which
has no fixed height to square against) can render icon-only: no visible
label, square hit area matching the button's own height at that size
(32×32 sm, 40×40 md, 48×48 lg), zero horizontal padding, centered icon
at `icon-sm` (16px). The icon must be pulled from **Tier 1 (functional/
control)** of [Iconography](#iconography) — e.g. `dots-three`, `x`,
`pencil-simple`, `trash` — never a Tier 2 icon, since the button itself
is already the control action; a Tier 2 icon there would double up a
status/decorative mark where an action mark belongs. Always requires an
`aria-label` describing the action (e.g. "More options"), since there's
no visible text for assistive tech to read.

**Do:** keep one Primary button per screen/card region. **Don't:** use an
element/department color as a button fill — that's a classification color,
not an action color (Rule 2 above).

### Card

Base surface for grouping content — dashboard tiles, list items, panels.

| Property | Value |
|---|---|
| Fill | Neutral-1 `#ffffff` |
| Border | 1px Neutral-3 `#d8d8d8` |
| Elevation | `shadow-1` at rest — cards carry both border and shadow (corrected v0.6.0) |
| Radius | `radius-lg` (20px) |
| Padding | spacing-16 (16px), per the deck's stated card padding |
| Header gap | spacing-12 (12px) between icon-chip and title block — ⚠️ corrected 2026-07-29, was wrongly generalized to spacing-8 |
| Header-to-body gap | spacing-16 (16px), only when a subtitle or body content follows the header |
| Title | h5 (16px/700). Subtitle: caption, Neutral-5, weight 400 |
| Transition | `box-shadow var(--duration-base) var(--ease-settle)` |

**Footer (optional)** — ⚠️ added 2026-07-29, missing from earlier drafts:
spacing-16 (16px) margin above it, spacing-12 (12px) top padding, 1px
Neutral-3 top border, caption type, Neutral-5. Same visual pattern as
the Modal footer's divider, scaled down.

**Variants:**
- **Static** — default surface above, no interaction.
- **Interactive/clickable** — hover raises to `shadow-2`; cursor pointer; focus-visible gets `shadow-focus`.
- **Element-accented** — a 3px top border in the owning element's color. The rest of the card stays neutral.
- **Icon-chip header** — a 36×36 chip at `radius-sm`, `icon-md` glyph in the element's full-strength color — **Tier 2, Fill** (a department indicator, per [Iconography](#iconography)). ⚠️ **Tint corrected 2026-07-29:** the chip background is the element color at **12% opacity** (a one-off `color-mix`), not the standard 8% `-bg` token used for full-card tinting — these are two different tint strengths for two different purposes, don't conflate them. This is the standard way a card declares which department owns it.
- **Warm** — `canvas-warm-card` fill, border dropped. For a surface that's deliberately blending into the (now default-everywhere) warm page canvas — e.g. a quote block, a featured stat — rather than standing apart from it; not restricted to brand/editorial anymore (see Color Palette's Warm canvas note).
- **Element-tinted** — full card background in the owning element's `-bg` tint (8%). Use sparingly; the icon-chip variant is usually the better signal.

**Do:** let cards carry `shadow-1` — that's the intended resting state.
Use the 12% icon-chip tint and the 8% full-card `-bg` tint deliberately —
they're not interchangeable. **Don't:** tint a card with an element that
doesn't own its content.

### Empty state

| Part | Spec |
|---|---|
| Icon | `icon-empty` (48px) for section-level empty states, `icon-hero` (64px) for full-page ones; **Neutral-4** color (corrected v0.6.0 — was Neutral-5); **Tier 2, Fill** (an empty-state illustration, per [Iconography](#iconography)) |
| Heading | h4 (20px/800), Neutral-9 |
| Body | body1 at weight 500, Neutral-5, max-width ~380px |
| Action | optional Primary button below the body text, `spacing-8` above it |
| Container | `spacing-40` vertical / `spacing-24` horizontal padding, `spacing-8` internal gap, centered |

**Do:** always say what causes the empty state and, where possible, how to
resolve it ("No campaigns yet — create your first one") rather than a bare
"No data." **Don't:** use a generic spinner or blank card as a stand-in
for a real empty state — the deck's icon-empty/icon-hero tokens exist
specifically so this state gets real visual weight.

### FileUploader

⚠️ **Designed 2026-08-04, v0.9.3 — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by reusing Badge-Neutral's box model, Table row's/
SidebarNav's active-state recipe, and the Filters/Date picker popover
pattern — not transcribed. Treat as a first pass needing real
design/brand review.

Click-to-browse or drag-and-drop file attachment; attached files list
as rows below the drop zone.

| Part | Spec |
|---|---|
| Drop zone | `radius-lg` (20px), spacing-24 padding, centered content, 1px dashed Neutral-3 border, Neutral-1 fill |
| Drop zone — drag-over | 2px dashed Obsidian border, Neutral-2 fill — the same Obsidian-border/Neutral-2-fill pairing Table row's selected state and SidebarNav's active item already use for "currently engaged," reused here rather than inventing a new tint |
| Upload icon | `upload-simple`, `icon-md` (20px), Neutral-5, **Tier 1, Regular** per its explicit listing in Iconography |
| Label | body2 (14px/20px), weight 700, Neutral-5 |
| Hint (optional) | caption (12px), Neutral-5 |
| File row | flex row, spacing-12 gap, spacing-8/spacing-12 padding, 1px Neutral-3 border, `radius-sm`, Neutral-1 fill — the same bordered "panel" recipe Filters'/Date picker's popover uses |
| Kind badge | reuses Badge-Neutral's exact box model — 22px tall, spacing-8 padding, `radius-pill`, Neutral-2 fill, Neutral-3 border, `--font-primary` |
| File name | body2, Neutral-9, truncates with ellipsis |
| File size | caption, Neutral-5 |
| Remove (×) | `icon-sm` (16px) `x` glyph, **Tier 1, Regular** (a remove affordance, per Iconography) — 24×24px hit target, Neutral-5, hover fill Neutral-2 |

**Variants:** Default (idle, no files), Drag-over, Has files.

**Do:** keep the drop zone visible even once files are attached, so more
can be added without a separate "add more" affordance. **Don't:** style
the kind badge as a status Badge variant (Success/Danger/Warning) — it's
always Neutral; file type isn't a status.

### Input field

Anatomy, top to bottom: label → input box → helper or error text.

| Part | Spec |
|---|---|
| Label | caption token at weight 700, Neutral-9 text, spacing-4 (4px) below it before the input |
| Input box | 40px height (md; sm 32px, lg 48px), `radius-sm` (12px), 1px Neutral-3 border, Neutral-1 fill, spacing-12 (12px) horizontal padding, body2 type at weight 400 (reverted 2026-08-03 — matches the shipped component; see the Focus behavior note below) |
| Helper text | caption token, Neutral-5, spacing-4 above it |
| Error text | caption token at weight 700, Red `#FD3343`, replaces helper text |

**States:**

| State | Border | Fill | Notes |
|---|---|---|---|
| Default | Neutral-3 | Neutral-1 | — |
| Focus | 2px Obsidian `#2B2B2C` (border swap; padding reduces from spacing-12 to 11px to compensate) | Neutral-1 | ⚠️ Reverted 2026-08-03 — the v0.6.0 "corrected" shadow-focus/Water-ring treatment was never actually implemented in the shipped component (`preview.html`'s Input field has always used a plain 2px Obsidian border swap); this row now documents the real, canonical behavior instead of a rule the code never followed. This makes Input field (and Textarea/Password field/Search input, which all inherit its States table) a deliberate exception to the system-wide "Focus rings are Water, not Obsidian" policy in [Elevation](#elevation--corrected-v060) — that policy still holds for Card, Empty state, and everything else |
| Error | 1px Red `#FD3343` | Neutral-1 | Error text replaces helper text below |
| Disabled | Neutral-3 | Neutral-2 | Neutral-5 text, no cursor |

Optional leading/trailing icon, `icon-sm` (16px), Neutral-5 — sits inside
the input box, spacing-8 from the text. Weight follows the icon's own
[Iconography](#iconography) tier (e.g. a trailing `magnifying-glass` for
in-field search is **Tier 1, Regular**).

**Do:** always render a `<label>`, even if visually hidden. **Don't:** use
placeholder text as a substitute for a label — placeholders disappear the
moment someone types, per the source deck's own accessibility intent.

⚠️ **New 2026-08-03 — designed, not sourced.** The rules below fill gaps
the original deck and the teammate's build never covered (placeholder
styling, a required-field marker, a success state, autofill, adornments,
a counter, and ARIA wiring). Treat as a first pass pending real
design/brand review, same status as the v0.8.0 dashboard components.

**Placeholder text** — Neutral-5, same body2/weight 400 as entered text
(not italic, not a separate lighter weight) so it reads as a hint rather
than disabled content. Still never a substitute for the `<label>` above.

**Required field indicator** — a single Red `#FD3343` asterisk (`*`)
directly after the label text, no gap token needed (`4px`/`margin-left:
spacing-4` from the last character), no parenthetical "(required)"
string. Optional fields get no marker at all — don't add "(optional)"
text either; the absence of `*` is the signal.

**Success / valid state:**

| State | Border | Fill | Notes |
|---|---|---|---|
| Success | 1px Green `#00C26E` | Neutral-1 | Trailing `check-circle`, `icon-sm` (16px), Green, **Tier 2, Fill** (a status confirmation, per [Iconography](#iconography)) — fires after the field passes validation (on blur or submit), not on every valid keystroke |

**Autofill styling** — browser autofill (`:-webkit-autofill` and
`:autofill`) must be overridden so the fill stays Neutral-1, not the
browser's default yellow/blue tint: use a same-color `box-shadow inset`
trick (`box-shadow: 0 0 0 1000px var(--color-neutral-1) inset`) plus
`-webkit-text-fill-color: var(--color-neutral-9)` rather than fighting
`background-color`, which autofill ignores.

**Focus behavior** — plain `:focus`, not `:focus-visible` — a mouse click
into a field shows the same 2px Obsidian border swap a keyboard `Tab`
does; this is a border-color/width change, not an outline or shadow ring,
so the box's overall size is kept constant by dropping the horizontal
padding from spacing-12 (12px) to 11px at the same time the border grows
from 1px to 2px.

**Prefix/suffix text adornments** — a fixed, non-editable string (e.g.
`$`, `kg`, `@`) inside the box, opposite the label side from a leading/
trailing icon if both are present: caption token, Neutral-5, no
background, spacing-8 from the editable text, vertically centered.
Never interactive — if it needs to be clickable, it's a leading/trailing
icon instead, not a text adornment.

**Character/word counter** — caption token, Neutral-5, right-aligned
under the box at the same spacing-4 offset as helper text (shares that
line, doesn't stack a second line unless an error is also showing).
Format `12/280`. Switches to Red `#FD3343` once the limit is reached or
exceeded, replacing the count color only — not the border, unless the
field also fails validation.

**Accessibility wiring** — helper text needs `aria-describedby` pointing
at its `id` from the input; when the field enters the Error state, the
input also needs `aria-invalid="true"` and the `aria-describedby` target
swapped to the error text's `id` (not both helper and error referenced
at once). Draft, pending [Needs Input #6](#needs-input-read-this-first).

**Responsive sizing clarification** — the sm/md/lg sizes are a density
choice picked per context (e.g. a table's inline edit vs. a full form),
not tied to a viewport breakpoint. Don't swap an input's size at a media
query; if a form needs to adapt on a narrow screen, change the layout
(stack fields, go full-width) and keep the chosen size fixed.

### Modal / dialog

| Part | Spec |
|---|---|
| Overlay | `shadow-overlay` — Neutral-9 at 56% opacity, covers viewport |
| Panel | Neutral-1 fill, 1px Neutral-3 border, `radius-lg` (20px), `shadow-4`, max-width ~480px for simple confirmations, wider for forms |
| Header | h3 title (22px/800) + optional description in body1/Neutral-5 + Ghost icon-button close (`x`, `icon-base`, 20px, top-right) — **Tier 1, Regular** (a close affordance, per [Iconography](#iconography)) |
| Body | body1, `spacing-24` padding on all sides |
| Footer | Secondary button + Primary button, right-aligned, `spacing-8` gap, `spacing-24` above |

**Do:** put the Primary (commit) action on the right, Secondary (cancel)
on the left of it, matching the button order convention above. **Don't:**
use a modal for anything that isn't a focused, single decision — long
forms or multi-step flows need a full page or panel, not a modal (this
mirrors the deck's own steady, uncluttered tone).

### MultiSelect

⚠️ **Designed 2026-08-04, v0.9.4 — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by reusing Button Secondary, Filters' trigger/popover
patterns, Badge's box model, and this system's own Checkbox spec — not
transcribed. Treat as a first pass needing real design/brand review.

A trigger button that opens a grouped checkbox list for selecting
multiple options — the trigger reflects the current selection as
individually-removable chips.

| Part | Spec |
|---|---|
| Trigger — default | matches Button Secondary exactly: Neutral-1 fill, 1px Neutral-3 border, `shadow-1`, `radius-md`, md size (40px height, spacing-16 padding, 16px type) |
| Trigger — has selection | border swaps to 1px Obsidian, the same "holds a value" recipe Filters' own Filter trigger — active state uses |
| Trigger — open | 2px Obsidian border, padding reduced 1px/side to compensate — the same swap-and-compensate pattern Input field's focus state uses; chevron rotates 180° via CSS `transform` |
| Selection chips | one Badge-Neutral chip per selected option's label (22px tall, spacing-8 padding, `radius-pill`, caption/700, 1px Neutral-3 border) instead of the placeholder — stay visible whether the menu is open or closed, capped at 2 visible then a "+N" overflow chip |
| Chip remove (×) | 14px `x` glyph, **Tier 1, Regular** (a remove affordance, per Iconography), stops click propagation so it never reopens/toggles the menu; the overflow "+N" chip has no × since it isn't one single removable option |
| Clear-all (×) | 20×20px hit target, Neutral-5, same propagation-stopping behavior, clears every selection at once |
| Dropdown panel | `radius-md` (16px), 1px Neutral-3 border, `shadow-3`, Neutral-1 fill — same popover convention as Filters/Date picker |
| Group label | caption (12px), weight 700, `tracking-eyebrow`, uppercase, Neutral-5 — same recipe as SidebarNav's own Section label |
| Group divider | 1px Neutral-3 line between groups |
| Checkbox row | reuses this system's own Checkbox spec exactly: 18×18px box, 6px radius, 1px Neutral-3 border unchecked, Obsidian border+fill checked, `icon-micro` check glyph in Neutral-1; Neutral-2 fill on hover, same token as Table row's own hover |
| Footer | Ghost "Clear" + Primary "Done", space-between, `spacing-8` gap, 1px Neutral-3 top border, `spacing-12` padding — Modal footer's divider convention at a smaller scale |

**Variants:** Default, Has Selection, Open — nothing selected, Open —
has selection.

**Do:** let the footer's Clear empty the selection while leaving the
menu open (so more options can be picked), and let Done close the menu
without touching the selection — they're deliberately different scopes.
**Don't:** give the overflow "+N" chip its own remove control — it
doesn't correspond to one option, only the clear-all can remove what it
represents.

### Password field

⚠️ **New 2026-08-03 — designed, not sourced.** Same anatomy as Input
field with one fixed trailing control.

| Part | Spec |
|---|---|
| Input box | identical to Input field's spec, but always reserves 40px right padding regardless of size, so masked text never runs under the toggle |
| Masking | native `type="password"` dot masking — no custom mask character |
| Show/hide toggle | `eye` / `eye-slash`, `icon-sm` (16px), Neutral-5, trailing inside the box at spacing-12 from the right edge; **Tier 1, Regular** (a functional control, per [Iconography](#iconography)) |
| Toggle behavior | click swaps the input's type between `password`/`text` and swaps the icon `eye` ↔ `eye-slash`; state doesn't persist across a page reload |

**Do:** give the toggle a real, focusable button with an `aria-label`
that updates between "Show password" and "Hide password" as state
changes. **Don't:** rely on the icon swap alone to communicate state to
assistive tech.

### Search input clear button

⚠️ **New 2026-08-03 — designed, not sourced.** Adds a clear affordance to
the existing search-input pattern (leading `magnifying-glass`, per
[Component Rules](#component-rules) and the Filters bar's own search
field).

| Part | Spec |
|---|---|
| Leading icon | `magnifying-glass`, `icon-sm` (16px), Neutral-5, **Tier 1, Regular** (existing rule, unchanged) |
| Clear ("x") button | appears only once the field has a non-empty value; trailing, `icon-sm` (16px), Neutral-5 default / Neutral-9 hover, spacing-12 from the right edge |
| Trigger | click, or `Enter`/`Space` while focused, clears the value and returns focus to the input (not away from it) |
| Visibility | hidden — not just visually suppressed but removed from tab order — when the field is empty, so an empty search input shows only the leading icon |

**Do:** keep the clear button keyboard-reachable via `Tab` once it's
visible. **Don't:** show both a clear button and a separate trailing
icon at once — the clear button replaces any other trailing icon the
moment text is entered.

### Table row

| Part | Spec |
|---|---|
| Header row | label3, Neutral-5 text, uppercase, 1px Neutral-3 border-bottom only |
| Body row | body2, Neutral-9 text, 1px Neutral-3 border-bottom, spacing-12 (12px) vertical padding |
| Row hover | Neutral-2 fill |
| Row selected | Neutral-2 fill + 2px Obsidian left border |
| Numeric columns | right-aligned, tabular figures if the font supports them |
| Cell icon | `icon-micro` (14px), inherits cell text color — weight follows the icon's own [Iconography](#iconography) tier |

**Do:** apply the border only to `border-bottom`, never both top and
bottom on every row — a table with hairlines on all four sides of every
cell reads as noisy at data-table density. **Don't:** exceed roughly 8-10
visible columns before reaching for horizontal scroll or a
column-priority/collapse pattern; a table that requires zooming out to
read is a layout failure, not a data problem.

### Textarea

⚠️ **New 2026-08-03 — designed, not sourced.** Extends Input field for
multi-line content; shares its label, border, fill, and type tokens so
the two align in a form.

| Part | Spec |
|---|---|
| Label | same as Input field |
| Box | `min-height` 96px (~4 lines at body1's 22px line-height), `radius-sm` (12px), 1px Neutral-3 border, Neutral-1 fill, spacing-12 (12px) padding on all sides, body1 type at weight 500 |
| Resize | `resize: vertical` only, `min-height` above as the floor, no max — never `resize: both` or `resize: horizontal` |
| Helper text / Error text | same as Input field |

**States:** same Default/Focus/Error/Disabled table as Input field above.

**Do:** reuse Input field's border, radius, and type tokens so a form
mixing single- and multi-line fields stays visually consistent. **Don't:**
let the box shrink below its `min-height`, including mid-resize-drag.

### UserPicker

⚠️ **Designed 2026-08-04, v0.9.2 — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by reusing Input field's box anatomy, Filters'/Date
picker's popover convention, and Table row's hover treatment — not
transcribed. Treat as a first pass needing real design/brand review.

Searches and selects a single person (an Account Executive, in this
app) from a list — collapses to a compact summary once a value is set.

| Part | Spec |
|---|---|
| Collapsed row | same box as Input field (40px height, `radius-sm`, 1px Neutral-3 border, Neutral-1 fill, spacing-12 horizontal padding) so collapsing/expanding doesn't change footprint |
| Avatar | 32×32px circle, `radius-pill`, Neutral-2 fill, Neutral-9 text, `--font-primary`, weight 700, caption size — shows initials |
| Name | body2 (14px/20px), weight 700, Neutral-9, truncates with ellipsis |
| Role | caption (12px), Neutral-5, directly below the name |
| Clear (×) | `icon-sm` (16px) `x` glyph, **Tier 1, Regular** (a remove affordance, per Iconography) — 24×24px hit target, Neutral-5, hover fill Neutral-2 |
| Search input | Input field's own anatomy and states, including its 2px Obsidian focus-border swap (not the Water shadow-focus ring) |
| Search icon | leading `magnifying-glass`, `icon-sm`, Neutral-5, **Tier 1, Regular** (search inside an input field, per Iconography) |
| Dropdown panel | `radius-md` (16px), 1px Neutral-3 border, `shadow-3`, spacing-8 below the trigger — same popover convention as Filters/Date picker |
| Dropdown row | avatar + name + role, spacing-12 gap, spacing-8/spacing-12 padding, Neutral-2 fill on hover — same hover token as Table row |
| Empty state | "No matches found", body2, Neutral-5, centered, spacing-16 padding |

**Variants:** Collapsed (value set), Open — searching, Open — no results.

**Do:** keep the collapsed row and the search input at the same 40px
height so selecting/clearing a person doesn't reflow the surrounding
layout. **Don't:** style the dropdown's empty state as a full [Empty
state](#empty-state) (icon + heading + body) — it's an inline "nothing
matched" message inside a compact popover, not a page-level empty
state.

### Checkbox

⚠️ **New in v0.7.0 — transcribed from the teammate's `Checkbox.jsx`.**
Supports multi-select and an indeterminate (partial-selection) state.

| Part | Spec |
|---|---|
| Box | 18×18px, 6px radius (⚠️ a one-off literal value — doesn't map to `radius-sm` or any named token; a compact control gets its own smaller radius), spacing-8 gap to the text, 2px top margin for optical alignment with the first text line |
| Box — unchecked | 1px Neutral-3 border, Neutral-1 fill |
| Box — checked / indeterminate | Obsidian border and fill, `icon-micro` (14px) check or minus glyph in Neutral-1 — **Tier 1, Regular** (the Checkbox marks are explicitly called out in [Iconography](#iconography)) |
| Label text | body1, weight 500, Neutral-9 |
| Description (optional) | caption, Neutral-5, below the label |
| Disabled | 50% opacity, `cursor: not-allowed` |
| Transition | `background-color`, `border-color` — `var(--duration-fast) var(--ease-standard)` |

**Do:** pair every checkbox with a real `<label>`, never an icon alone.
**Don't:** reuse the 6px box radius anywhere else — it belongs to this
control's compact size only, not the shared radius scale.

### DataTable

⚠️ **New in v0.7.0 — transcribed from the teammate's `DataTable.jsx`.**
A composed, bordered table container — distinct from the bare Table row
spec above, which is for inline use inside another surface. Pick one per
data view; don't mix them in the same screen.

| Part | Spec |
|---|---|
| Container | 1px Neutral-3 border, `radius-lg` (20px, matches Card), `overflow: hidden` (clips the header to the radius), Neutral-1 fill |
| Header cell | spacing-12/spacing-16 padding, Neutral-2 fill, **h5 type (16px/700 — heavier than the bare Table row header's label3/uppercase)**, Neutral-9, 1px Neutral-3 border-bottom, align per-column |
| Body cell | spacing-12/spacing-16 padding, **body2 type (14px/20px — this is the source's own "footnote" token, which maps to this doc's body2 scale, not the 12px footnote token)**, weight 500, Neutral-9, tabular figures when numeric, 1px Neutral-3 border-bottom (none on the last row) |
| Row | `cursor: pointer` only when `onRowClick` is set; reuses Table row's Neutral-2 hover fill for consistency (DataTable has no separate hover token of its own yet) |

**Do:** keep header labels short — the heavier h5 weight wraps
awkwardly on long labels. **Don't:** add a fifth border style here; it
inherits Table row's border and hover conventions on purpose.

**Global navigation rule — added 2026-08-04.** SidebarNav is the
canonical navigation pattern for all Collabrium builds. No alternative
navigation orientation (top nav, bottom nav, tab bar) should be used
unless explicitly documented as an exception for a specific context.

⚠️ **New in v0.7.0 — transcribed from the teammate's `SidebarNav.jsx`.**
Primary app-level navigation, not a page-local menu.

| Part | Spec |
|---|---|
| Container | 240px width (expanded) / 72px width (collapsed) — ⚠️ **hard max-width in both states, changed 2026-08-04:** `overflow-x: hidden`, never horizontally scrollable at either width, `radius-lg` (20px), 1px Neutral-3 border, Neutral-1 fill, spacing-12 (12px) padding **on all four sides equally** (⚠️ clarified 2026-08-04 — left and right padding must match; any implementation where the right edge reads as wider than the left is a bug, not a variant), spacing-4 (4px) gap between items (⚠️ reverted 2026-08-04 — the earlier "reads as no gap at all" complaint traced to a missing gap implementation between individual nav items, not the token value itself; now that it's wired correctly, spacing-4 is the intended tight gap) |
| Header (optional) | spacing-8 top/right/left, spacing-16 bottom padding — logo lockup or workspace switcher slot, **horizontal padding equal on both sides**; see Header logo rule below. ⚠️ **Layout changed 2026-08-04, revised twice same day:** expanded stays a flex row, `align-items: center`, logo left-aligned, toggle right-aligned, both in normal flex flow, same row. Collapsed is no longer this same flex row — the logo is independently centered as the header's only in-flow content, and the toggle is a separate floating overlay button anchored to the rail's own right edge (see Collapsible state below for both) — visually still "the same row," just no longer achieved via shared flex layout |
| Section label (optional) | spacing-16 top, spacing-8 sides, spacing-4 bottom padding; caption size, weight 700, `tracking-eyebrow`, uppercase, Neutral-5. ⚠️ **Divider added 2026-08-04:** a 1px Neutral-3 hairline sits above every section label except the first one in the list (e.g. between Overview and Workspace), separating one department/area group from the next — it sits above the label's own spacing-16 top padding, not stacked as extra whitespace |
| Nav item | 40px height minimum (grows to fit a wrapped 2-line label — see the wrapping rule below), full width, 0/spacing-12 padding, `radius-sm` (12px — smaller than the container's own radius, standard for nested interactive rows), spacing-12 gap between icon and label, body1 type (16px) |
| Nav item — active | Neutral-2 fill, Neutral-9 text, weight 700 |
| Nav item — inactive | transparent fill, Neutral-5 text, weight 500 |
| Nav item — hover ⚠️ added 2026-08-04 | Neutral-2 fill, text color unchanged from whatever active/inactive state it already has — reuses Table row's own hover token (`Row hover \| Neutral-2 fill`) and Button Ghost's hover, rather than a nav-specific value |
| Nav item — focus-visible ⚠️ added 2026-08-04 | 2px Obsidian outline, 2px offset, additive on top of the current fill — reuses Button's exact focus-visible token; Nav item is a clickable row control at `radius-sm` like Button, not a Card-like surface, so this is used instead of Card's `shadow-focus`/Water-ring exception |
| Nav item — active-pressed ⚠️ added 2026-08-04 | Neutral-3 fill — direct match to Button Ghost's `Active/pressed \| Neutral-3 fill`, same unfilled-by-default control family |
| Nav item — disabled ⚠️ added 2026-08-04 | Neutral-4 text/icon, fill stays transparent, `cursor: not-allowed` — matches Button Ghost's disabled and Pagination's Ghost icon-button disabled, not Checkbox/Radio/Switch's 50%-opacity convention (that belongs to compact toggle controls, not row-based nav items) |
| Icon | `icon-base` (20px); may take an element color override when the item is department-specific; **Tier 2, Fill** (a sidebar nav item, per [Iconography](#iconography)) |
| Trailing count | optional, caption/700/Neutral-5, right-aligned |
| Footer (optional) | pinned to the bottom (`margin-top: auto`), spacing-16 padding-top — sign-out, account, or help slot |
| Transition | `background-color`, `color` — `var(--duration-fast) var(--ease-standard)` |

⚠️ **Note on "active" vs. "active-pressed"** — these are different axes.
"Active"/"inactive" (above) is the *persistent selection* state (which
page you're on); "active-pressed" is the *momentary* mouse-down state,
and can land on either an active or inactive item. Hover, focus-visible,
active-pressed, and disabled all apply orthogonally on top of whichever
active/inactive state the item already has.

⚠️ **Changed 2026-08-04 — labels wrap, they no longer truncate.** 240px
(expanded) is a hard max-width with no horizontal scroll; a label too
long for one line wraps to a second line instead of truncating with an
ellipsis or overflowing the container. This replaces the earlier
"truncates with ellipsis" rule.

### ElementBadge

⚠️ **New in v0.7.0 — transcribed from the teammate's `ElementBadge.jsx`.**
Distinct from Tag (above): use ElementBadge when the visual specifically
needs the element's icon, not just a color dot.

| Part | Spec |
|---|---|
| Chip | default 32×32px (size prop), `radius-sm` (12px), fill = owning element color at **12% tint** (the same one-off `color-mix` used by the Card icon-chip pattern — not the 8% `-bg` token) |
| Glyph | sized at 60% of the chip box, centered — **Tier 2, Fill** (a department indicator, per [Iconography](#iconography)) |
| Label (optional, `showLabel`) | spacing-12 gap from the chip; element name (caption, weight 700, `tracking-eyebrow`, uppercase, Neutral-9) over a sublabel (caption, Neutral-5 — defaults to the element's function, e.g. "Visibility & Energy") |
| No label | chip renders alone with a native `title` attribute carrying the element name, for accessibility |

**Elements:** Fire (Orange · Visibility & Energy) · Earth (Green ·
Support & Stability) · Water (Navy · Depth & Flow) · Gold (Amber · Order
& Structure) · Wood (Salmon Pink · Growth & Vision).

⚠️ **Asset gap:** the source component renders a raster PNG glyph per
element (`assets/elements/*.png`) rather than a Phosphor icon — this
skill doesn't have those PNGs, only the `SVG/` wordmark/letter library.
Until element glyphs are added here, substitute the closest Phosphor
icon for each element's motif (flame, mountain, drop, etc.) rather than
leaving the chip empty.

**Do:** use ElementBadge whenever a department-owned item needs its
icon, not just Tag's color dot. **Don't:** recolor the chip tint away
from its owning element — this is a fixed identity marker, not a
themeable accent.

### Radio

⚠️ **New in v0.7.0 — transcribed from the teammate's `Radio.jsx`.**
Same text/spacing pattern as Checkbox; visually an outline that never
fills solid.

| Part | Spec |
|---|---|
| Circle | 18×18px, `radius-pill`, spacing-8 gap to the text, 2px top margin for optical alignment |
| Circle — unchecked | 1px Neutral-3 border, Neutral-1 fill |
| Circle — checked | 1px Obsidian border, Neutral-1 fill, inner 9×9 Obsidian dot (`radius-pill`) |
| Label / description | same as Checkbox — body1/weight 500/Neutral-9, caption/Neutral-5 |
| Disabled | 50% opacity, `cursor: not-allowed` |
| Transition | `border-color` — `var(--duration-fast) var(--ease-standard)` |

Grouped via a shared native `name` attribute — only one Radio per group
may be checked.

**Do:** use Radio for a mutually-exclusive choice of ≤4-5 visible
options; reach for Select once it's more than that. **Don't:** mix Radio
and Checkbox visuals within the same choice group — the outline-only vs.
filled-box distinction signals single- vs. multi-select.

### Select

⚠️ **New in v0.7.0 — transcribed from the teammate's `Select.jsx`.**
Same anatomy and sizing as Input field, so the two align in a form row.

| Part | Spec |
|---|---|
| Label (optional) | caption, weight 700, Neutral-9, spacing-4 below it |
| Box | height by size (sm 32 / md 40 / lg 48, same as Button/Input), `radius-sm` (12px), 1px Neutral-3 border (Red on error), Neutral-1 fill (Neutral-2 when disabled) |
| Native `<select>` | fills the box, spacing-12 (12px) left padding, 36px right padding (room for the caret), body1 weight 500, transparent background, no native appearance |
| Caret | `caret-down`, `icon-sm` (16px), absolute right spacing-12, Neutral-5, `pointer-events: none` — **Tier 1, Regular** (a navigation/control chevron, per [Iconography](#iconography)) |
| Hint text | caption, Neutral-5, below the box |
| Error text | caption, weight 700, Red, replaces hint |
| Disabled | Neutral-2 fill, `cursor: not-allowed` |

**Do:** reuse Input field's exact sizing/radius/border so Select and text
inputs align cleanly in the same form row. **Don't:** restyle the native
option list — leave it browser-default; this component only styles the
closed state.

### SidebarNav

⚠️ **New in v0.7.0 — transcribed from the teammate's `SidebarNav.jsx`.**
Primary app-level navigation, not a page-local menu.

⚠️ **Two placement contexts, not a contradiction (added v0.9.0):** the
spec below (`radius-lg`, border on all four sides) describes this as a
self-contained floating panel — correct for an inset or off-canvas/drawer
use. When it's the primary shell rail instead, see [App Shell](#app-shell)
for the flush, full-height variant (no radius, right-edge border only).

| Part | Spec |
|---|---|
| Container | 240px width, `radius-lg` (20px), 1px Neutral-3 border, Neutral-1 fill, spacing-12 (12px) padding, spacing-4 (4px) gap between items |
| Header (optional) | spacing-8 top/right/left, spacing-16 bottom padding — logo lockup or workspace switcher slot |
| Section label (optional) | spacing-16 top, spacing-8 sides, spacing-4 bottom padding; caption size, weight 700, `tracking-eyebrow`, uppercase, Neutral-5 |
| Nav item | 40px height, full width, 0/spacing-12 padding, `radius-sm` (12px — smaller than the container's own radius, standard for nested interactive rows), spacing-12 gap between icon and label, body1 type (16px) |
| Nav item — active | Neutral-2 fill, Neutral-9 text, weight 700 |
| Nav item — inactive | transparent fill, Neutral-5 text, weight 500 |
| Icon | `icon-base` (20px); may take an element color override when the item is department-specific; **Tier 2, Fill** (a sidebar nav item, per [Iconography](#iconography)) |
| Trailing count | optional, caption/700/Neutral-5, right-aligned |
| Footer (optional) | pinned to the bottom (`margin-top: auto`), spacing-16 padding-top — sign-out, account, or help slot |
| Transition | `background-color`, `color` — `var(--duration-fast) var(--ease-standard)` |

Label truncates with ellipsis rather than wrapping.

**Do:** use section labels to group items by department/area, one level
deep. **Don't:** nest a second level of grouping — if the hierarchy needs
more than one level, that's a sign the item belongs in a sub-page's Tabs
instead.

<<<<<<< Updated upstream
=======
**Collapsible state.**

| Part | Spec |
|---|---|
| Collapsed width | 72px — a one-off literal, not a named spacing token (same precedent as Second-level navigation's 36px child-item height and Tooltip's 6px/10px padding): the collapsed rail needs to fit the logo/element icon and the toggle icon side by side on one row |
| Expanded width | 240px |
| Toggle trigger — expanded | same row as the header logo, right-aligned, vertically centered |
| Toggle trigger — collapsed | a separate floating overlay button, `position: absolute`, anchored to the rail's own right edge and vertically centered to the same row as the logo, straddling the rail's own border (half in / half out) rather than sitting fully inside the padding. Sized down from the expanded toggle's 28px button / 18px icon to a **24px button / 16px icon**, since the full expanded size would crowd the independently-centered logo in the 72px rail |
| Toggle trigger — icon | Remix Icon's `ri-sidebar-fold-line` (collapse) / `ri-sidebar-unfold-line` (expand), replacing `chevron-left`/`chevron-right`. Phosphor has no equivalent glyph for this specific affordance, so this correctly invokes the documented Remix **fallback** rule in [Iconography](#iconography) ("only when Phosphor lacks the glyph"), not a by-taste library swap. **Tier 1, Regular** (hence the `-line` suffix) — collapsing/expanding a panel is literally one of Iconography's own listed Tier 1 examples ("expand, collapse") |
| Collapsed — visible elements | icon only; labels, section labels, and trailing count text are all hidden |
| Collapsed — alignment | every nav item's icon is center-aligned horizontally within the 72px rail. The header logo/element icon is **independently** centered the same way (not paired with the toggle icon — the toggle is a floating overlay anchored to the rail's own right edge instead, see Toggle trigger — collapsed, above, and doesn't participate in this centered alignment at all). Expanded stays left-aligned throughout |
| Collapsed — trailing count | converts to an 8px dot badge (matches `spacing-8`) in the item's owning element accent color (same override logic as the Icon row above), overlaid top-right on the icon |
| Collapsed — logo | collapses to the individual department element icon, `SVG/{element}.svg` (`fire.svg`/`wood.svg`/`earth.svg`/`water.svg`); the default (no department context) collapses to `SVG/coin.svg` specifically — not the expanded-state default (`logo.html` live, or a department lockup — see the Header logo rule above) |
| Toggle behavior — logo asset | the logo swaps entirely on toggle, not just resizes or repositions. Expanding restores the live `logo.html` embed (default context) or the static lockup (department context); collapsing (either context) swaps to the static element icon/`coin.svg` (`SVG/`). The implementation needs a conditional for "restore the iframe" vs. "restore an img" rather than a single `img.src` swap, since the default expanded state is no longer an `<img>` |
| Collapsed — hover label | SidebarNav's own sub-pattern, not a reused [Tooltip](#tooltip) instance. Appears on icon hover **or keyboard focus**, shows the full nav item label, positioned to the right of the icon: same bubble visuals as Tooltip (6px/10px padding, `radius-sm`, Neutral-7 fill, Neutral-1 text, caption/500, opacity-only transition, `pointer-events: none`) but built and owned independently, because Tooltip's own spec assumes a plain relatively-positioned trigger wrapper — that model doesn't survive being placed inside SidebarNav's own scrolling item list (a vertically-scrolling container's `overflow-x` is forced to clip too, per the CSS overflow spec, which silently cuts off anything trying to render past its edge). SidebarNav's hover label is implemented as a single element that positions itself against the hovered icon directly, escaping that scroll container rather than living inside it |
| Transition | `width` — `var(--duration-slow) var(--ease-standard)` (`duration-slow`'s stated purpose is "panel / section reveals," an exact match; `ease-standard` since a sidebar collapse isn't owned by a specific brand element — per Motion's own rule, "reach for an elemental curve deliberately, not by default") |
| Persistence | collapsed/expanded state saved to `localStorage`, restored on load |

**Header logo rule.**

| Context | Logo |
|---|---|
| Default (expanded, no department context) | the live animated mark, `logo.html`, embedded via `<iframe>` — SidebarNav's header has plenty of room to run the animation at 240px, per [SKILL.md](SKILL.md)'s own rule ("use `logo.html` wherever the mark can animate") |
| Department-specific (expanded, passed via prop) | still the matching department's element-colored **static** lockup from `logo-lockups/` (see the Logo section's table above — only the Gold/default variant currently exists; the other 4 are flagged not-yet-provided) — unchanged by the animated-default switch above, because `logo.html`'s animation always cycles through all 5 elements in sequence; it can't freeze on one department's color, so a department-specific header still needs the static, single-color lockup |
| Collapsed (any context) | individual department element icon, `SVG/{element}.svg`; default collapses to `SVG/coin.svg` specifically (same as the Collapsible state row above) — unchanged, still static: 72px has no room to run the full wordmark animation, matching [SKILL.md](SKILL.md)'s "where it can't [animate], use a static lockup" half of the same rule |
| Alignment | Expanded: always left-aligned. Collapsed: **independently** center-aligned within the 72px rail (see the Collapsible state's "Collapsed — alignment" row above) — the toggle trigger sits on the same row but doesn't share this centered alignment, since it's a floating overlay anchored to the rail's own right edge instead (see "Toggle trigger — collapsed," above) |

**Do:** always reference the logo library (`logo.html` embedded live for
the expanded default, a department lockup from `logo-lockups/` for an
expanded department-specific header, `SVG/` for collapsed) — never build
or embed a custom one-off logo asset for a header.

**Second-level navigation.**

Distinct from the section-label Do/Don't above, which governs
*section labels* grouping items (still capped at zero extra nesting).
This is a separate structural concept — an individual **nav item**
expanding to show its own **child items** — and is supported up to one
level deep.

| Part | Spec |
|---|---|
| Depth supported | 2 levels maximum (parent + children); a third level isn't supported — content needing 3 levels belongs in page-level Tabs or a sub-page instead |
| Parent item | shows a trailing chevron, `chevron-down`/`chevron-up` — **Tier 1, Regular** ("chevron up/down" and "expand, collapse" are both Iconography's own Tier 1 examples) |
| Expand trigger | clicking anywhere on the parent item toggles it — not just the trailing chevron. The chevron swaps `chevron-down` ↔ `chevron-up` to reflect the parent's own open/closed state |
| Expand behavior | accordion — children render inline below the parent, no separate panel/overlay. Independent, not mutually exclusive: each parent's open/closed state is its own; opening one parent does **not** close any other open parent. There's no single-open-at-a-time grouping in this spec |
| Expand/collapse transition | children reveal/hide via a height transition, `var(--duration-slow) var(--ease-standard)` — reuses the same "panel/section reveals" duration as the Collapsible state's own width transition above, and the same default (non-elemental) easing, since an accordion isn't owned by a specific brand element either |
| Closing preserves state | collapsing a parent doesn't reset which child was active — reopening it shows the same active child again, exactly as it was left |
| Children width/indent | full width, not inset. Children are not a narrower block indented from the icon column; each child item spans the same full width as any other Nav item, with spacing-16 (16px) left padding on the item itself doing the indent instead of an outer margin |
| Child item height | 36px (a one-off literal value, not a named token — same precedent as Tooltip's 6px/10px padding and Checkbox's 6px radius: a smaller nested control gets its own compact size, smaller than the parent Nav item's 40px) |
| Child item type | body2 (14px), weight 500 inactive, weight 700 active |
| Active child | shows Nav item's own active state (Neutral-2 fill, Neutral-9 text, weight 700) |
| Active parent with active child | parent shows weight 700 text, but **no** active fill — the fill signal stays exclusively on the active child, so the two don't both read as "selected" at once. The parent's weight-700 state is only ever a side effect of one of its own children being selected, never of clicking/expanding the parent header itself — expanding or collapsing a parent never changes anyone's active state on its own, it's a pure open/closed toggle. Collapsed exception: this "text-only, no fill" treatment relies on the label, which is hidden entirely at 72px — with nothing else left to signal selection, the collapsed parent icon takes the normal Active fill instead (Neutral-2 background), same as any other active item gets. This doesn't reintroduce the "two things read as selected" problem the fill-less rule exists to avoid, because the active child isn't visible either while collapsed |
| Sidebar-wide exclusivity | exactly one destination is ever the active selection across the whole nav at a time — whether that's a top-level Nav item or a second-level child. Selecting any item (top-level or child) clears every other item's active state **and** any active child in any other (or the same) accordion panel first, so a plain Nav item and a leftover active child, or two different parents' active children, can never both read as "selected" simultaneously |
| Collapsed sidebar | accordion closes, and the parent's own children are never shown while collapsed — the icon-hover label (Collapsible state, above) shows the parent's own label only, not its children. The parent icon stays clickable, it just does something different than expanded: with no room to reveal children at 72px, clicking the parent icon routes straight to the parent's **first child** instead, selecting it as the sidebar's one active destination (same "click a group icon, land on its default sub-page" pattern collapsed rails commonly use) — the parent picks up its own active styling as the usual side effect of that child being selected, per the Active parent with active child row above |

**Overflow behavior.**

- The nav item list scrolls (`overflow-y: auto`) once items exceed the
  container's available height.
- Horizontal scroll is never permitted, in either state — the
  container's `overflow-x: hidden` (see Container row above) applies at
  both the 240px expanded and 72px collapsed widths. Content that would
  overflow horizontally (a long label, an unswapped logo asset) must wrap
  or be resized to fit, never scroll sideways.
- Scrollbar is hidden by default, visible on hover of the container as
  a thin overlay scrollbar (e.g. `scrollbar-gutter` left unreserved, or an
  absolutely-positioned custom thumb) that never reserves layout space.
  Showing it on hover must not shift or shrink the nav items' own width.
- Footer (existing optional sub-part above) is pinned outside the
  scrolling region via its own `margin-top: auto` and never scrolls with
  the item list.

⚠️ **Needs Input — SidebarNav.**
- Mobile/responsive behavior — not yet defined.
- Keyboard navigation (arrow keys, `Enter`, `Escape` on the accordion) —
  to be defined in a future accessibility pass.

>>>>>>> Stashed changes
### Stepper

⚠️ **Designed 2026-08-04, v0.9.1 — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by reusing Checkbox/Radio's on/off treatment, SidebarNav's
active/inactive label weighting, and the caption token for supporting
text — not transcribed. Treat as a first pass needing real design/brand
review.

Tracks progress through a multi-step flow — onboarding, a multi-page
form, a checkout — as an ordered list of steps, each in one of three
states.

| Part | Spec |
|---|---|
| Indicator | 24×24px circle, `radius-pill` |
| Indicator — Completed | Obsidian fill, Neutral-1 text, shows the step number (not an icon — fill vs. outline is what carries the state) |
| Indicator — Active | Neutral-1 fill, 2px Obsidian border, Obsidian text |
| Indicator — Upcoming | Neutral-1 fill, 1px Neutral-3 border, Neutral-5 text |
| Label | body2 (14px/20px); weight 700 + Neutral-9 when Active, weight 400 + Neutral-5 when Completed/Upcoming — same bold-vs-muted pattern as SidebarNav's active/inactive nav items |
| Description (optional) | caption (12px), Neutral-5 — smaller than the label, spacing-4 below it |
| Connector | 1px fill in Neutral-3 (the hairline-border token), not a literal border |
| Connector — horizontal | sits between each pair of indicators, sharing an equal `flex: 1` share of the row so every connector is the same length regardless of neighboring label width |
| Connector — vertical | fixed spacing-16 length, held spacing-8 off the indicator above (the rail's own gap) and spacing-8 off the indicator below (the list's gap) — equal on both sides, never touching either circle |

**Variants:** orientation (Horizontal / Vertical) and per-step description
are independent, giving Horizontal/Vertical × With/No description as
four presentations, not four hard-coded variants.

**Do:** derive each step's state from a single `currentStep` index —
before it is Completed, at it is Active, after it is Upcoming — rather
than tracking state per step. **Don't:** let the connector's length or
spacing depend on label or description length; both orientations keep
it fixed/equal on purpose (see the Connector rows above).

### Switch

⚠️ **New in v0.7.0 — transcribed from the teammate's `Switch.jsx`.**
For an immediately-applied binary setting — no separate Save step. Use
Checkbox instead when the choice is part of a form that gets submitted.

| Part | Spec |
|---|---|
| Track | 40×24px, `radius-pill`, spacing-12 gap to the text (wider than Checkbox/Radio's spacing-8, since the track itself is the primary visual) |
| Track — off | Neutral-4 fill |
| Track — on | Obsidian fill |
| Track transition | `background-color` — `var(--duration-base) var(--ease-standard)` |
| Thumb | 18×18px circle, `radius-pill`, Neutral-1 fill, `shadow-1`, 3px from top |
| Thumb position | left: 3px (off) → 19px (on) |
| Thumb transition | `left` — `var(--duration-base) var(--ease-settle)` (the anchored-arrival easing, matching the toggle's physical drop) |
| Label / description | same as Checkbox — body1/weight 500/Neutral-9, caption/Neutral-5 |
| Disabled | 50% opacity, `cursor: not-allowed` |

**Do:** label a Switch with what it controls ("Email notifications"), not
its state ("On/Off"). **Don't:** use Switch inside a form that requires
an explicit Save — that implies deferred application, which contradicts
what a Switch signals.

### Tabs

⚠️ **New in v0.7.0 — transcribed from the teammate's `Tabs.jsx`.**
In-page section switching, not app-level navigation (use SidebarNav for that).

| Part | Spec |
|---|---|
| Container | flex row, spacing-4 gap, 1px Neutral-3 border-bottom (full-width track) |
| Tab | inline-flex, spacing-8 gap, 40px height, 0/spacing-12 padding, no fill or border, body1 weight 700 |
| Tab — active | Neutral-9 text, 2px Obsidian underline (drawn as an **inset** `box-shadow: inset 0 -2px 0 var(--color-obsidian)`, not a real border — keeps the underline from shifting row height) |
| Tab — inactive | Neutral-5 text, no underline |
| Icon (optional) | `icon-sm` (16px), leading; **Tier 2, Fill** — a judgment call, not explicit in [Iconography](#iconography)'s examples; treated like SidebarNav (a persistent selection control) rather than a generic Tier 1 nav control, see [Needs Input #11](#needs-input-read-this-first) |
| Trailing count (optional) | caption/700/Neutral-5 |
| Transition | `color`, `box-shadow` — `var(--duration-fast) var(--ease-standard)` |

**Do:** keep tabs to a single row — wrap the container or let it scroll
horizontally rather than shrinking labels to fit. **Don't:** use Tabs for
more than ~6 sections; beyond that, use SidebarNav or a Select instead.

### Toast

⚠️ **New in v0.7.0 — transcribed from the teammate's `Toast.jsx`.**
Transient, auto-dismissing system feedback — not a place for a decision
with real consequences.

| Part | Spec |
|---|---|
| Container | 320–420px width, spacing-12/spacing-16 padding, Neutral-1 fill, 1px Neutral-3 border, `radius-md` (16px — a compact transient surface, not the Card's 20px), `shadow-3`, spacing-12 gap, `role="status"` |
| Icon | `icon-base` (20px), 2px top margin for optical alignment with the title; **Tier 2, Fill** (a status indicator, per [Iconography](#iconography) — see the tone table below) |
| Title (optional) | body1, weight 700 |
| Message (optional) | caption, Neutral-5 |
| Action slot (optional) | spacing-8 above it — holds a Link or Ghost button |
| Close (optional) | Ghost IconButton, sm, top-right, `x`, **Tier 1, Regular** (a close affordance), `aria-label="Dismiss"` |

**Tone → icon/color:**

All four are **Tier 2, Fill** status indicators, per [Iconography](#iconography) — none are clickable, so none are Tier 1 despite `x-circle`'s slug overlap with the Tier 1 `x` remove affordance used elsewhere (e.g. Tag/filter-pill removal).

| Tone | Icon | Color |
|---|---|---|
| Neutral | `info` | Neutral-9 |
| Success | `check-circle` | Green |
| Danger | `x-circle` | Red |
| Warning | `warning` | Amber |

**Do:** keep one Toast on screen at a time — stack only if truly
necessary, newest on top. **Don't:** put a destructive action in a
Toast's action slot; a surface that disappears on its own is the wrong
place for an irreversible decision.

### Tooltip

⚠️ **New in v0.7.0 — transcribed from the teammate's `Tooltip.jsx`.**
Supplementary, non-interactive information only.

| Part | Spec |
|---|---|
| Trigger wrapper | relatively-positioned inline-flex around the trigger content |
| Bubble | 6px/10px padding (a one-off compact value, not the spacing scale), `radius-sm` (12px), Neutral-7 fill, Neutral-1 text, caption size, weight 500, `white-space: nowrap` |
| Placement | top (default) / bottom / left / right, centered on the trigger's cross-axis, 8px gap from the trigger |
| Visibility | opacity 0 → 1 on hover **or** keyboard focus; `pointer-events: none` at all times |
| Transition | `opacity` — `var(--duration-fast) var(--ease-standard)` |

**Do:** trigger on focus as well as hover, so keyboard users get the same
information sighted mouse users do. **Don't:** put interactive content
(links, buttons) inside a Tooltip — `pointer-events: none` means nothing
inside is ever clickable by design.

### Date picker

⚠️ **Designed 2026-07-30, v0.8.0 — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by extension from the Select and Modal footer patterns,
not transcribed. Treat as a first pass needing real design/brand
review.

| Part | Spec |
|---|---|
| Trigger | same box as Select (sm/md/lg heights, `radius-sm`, 1px Neutral-3 border, Neutral-1 fill) but with a leading `calendar` icon (`icon-sm`, Neutral-5) instead of a trailing caret; **Tier 2, Fill** — kept Fill per [Iconography](#iconography)'s own "Card / section header: Calendar... Fill" example, despite sitting inside a trigger button; shows the formatted date (body1/weight 500) or placeholder text (Neutral-5) |
| Popover panel | `radius-md` (16px), 1px Neutral-3 border, `shadow-3`, spacing-16 padding, 8px below the trigger — same popover convention as Filters |
| Month header | flex row, `justify-content: space-between`; prev/next month Ghost icon-buttons (32×32, `caret-left`/`caret-right`) — **Tier 1, Regular** (navigation control) — flank a centered month/year label (h5, 16px/700) |
| Weekday row | 7-column grid, caption/700/uppercase/Neutral-5, spacing-4 bottom gap |
| Day cell | 36×36px, `radius-sm` (12px), numeral centered (caption or body2) |
| Day — default | transparent fill, Neutral-9 text |
| Day — hover | Neutral-2 fill |
| Day — today | 1px Obsidian **border only** (never filled) — kept visually distinct from "selected" |
| Day — selected (single) | Obsidian fill, Neutral-1 text |
| Day — in-range (range mode) | Neutral-2 fill, Neutral-9 text, flush block between the two range boundaries (no radius on inner edges) |
| Day — range start/end | Obsidian fill, Neutral-1 text, `radius-sm` only on the outer edge |
| Day — disabled / outside month | Neutral-4 text, no hover, `cursor: not-allowed` |
| Footer (range mode only) | Secondary + Primary button pair, right-aligned, spacing-8 gap, spacing-16 top padding + top border — same footer convention as Modal |

**Do:** always mark "today" with an outline rather than a fill, so it's
never confused with the actively selected date. **Don't:** use a filled
state for hover — full Obsidian fill is reserved for selected/range-
boundary days only.

### Filters

⚠️ **Designed 2026-07-30, v0.8.0 — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by composing existing Button, Input, Select, and Tag
patterns, not transcribed. Treat as a first pass needing real
design/brand review.

A control cluster for narrowing a data view — sits directly above a
Table row list or DataTable.

| Part | Spec |
|---|---|
| Bar | horizontal flex row, spacing-8 gap, wraps on overflow, spacing-16 margin-bottom |
| Search input | Input field, sm (32px), leading `magnifying-glass` (`icon-sm`, Neutral-5), placeholder text — sits first in the bar; **Tier 1, Regular** (search inside an input field, per [Iconography](#iconography)) |
| Filter trigger | Button Secondary, sm or md — leading `sliders`/`funnel` icon + label; **Tier 1, Regular** (filter, per [Iconography](#iconography)); gets a small circular Obsidian count badge (caption/700, Neutral-1 text) trailing the label once ≥1 option is selected inside it |
| Filter trigger — active | 1px Obsidian border + Neutral-9 text (replaces the default Neutral-3/Neutral-9 Secondary styling) whenever it holds a selection, so an applied filter is never visually silent |
| Dropdown panel | `radius-md` (16px — a compact popover, not the full 20px Card radius), 1px Neutral-3 border, `shadow-3`, spacing-16 padding, positioned 8px below the trigger |
| Applied filter pill | reuses Tag's pill shape (`radius-pill`, 24px height, 10px horizontal padding, caption/700) but Neutral-2 fill / Neutral-9 text, with a trailing `x` (`icon-micro`) to remove it individually — **Tier 1, Regular** (a remove affordance uses plain `x`, per [Iconography](#iconography)) |
| Clear all | Link-style button (transparent, Neutral-9, underlined), right-aligned in the bar, **only rendered once ≥1 filter is applied** |

**Do:** surface a live count on the trigger the instant a filter is
applied, and always pair it with a "Clear all" escape hatch. **Don't:**
apply a filter destructively (auto-submitting on every keystroke) —
require an explicit action inside the dropdown, then apply on close.

### Pagination

⚠️ **Designed 2026-07-30, v0.8.0 — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system, not transcribed. Treat as a first pass needing real
design/brand review.

Sits as a table or list footer — same border convention as DataTable.

| Part | Spec |
|---|---|
| Container | flex row, `justify-content: space-between`, spacing-16 padding-top, 1px Neutral-3 top border |
| Result count | caption, Neutral-5 (e.g. "Showing 1–20 of 248"), left-aligned |
| Page number button | 32×32px, `radius-sm` (12px), caption/700 numeral |
| Page number — default | transparent fill, Neutral-5 text |
| Page number — hover | Neutral-2 fill, Neutral-9 text |
| Page number — current | Obsidian fill, Neutral-1 text — the only filled state, kept unambiguous against its neighbors |
| Prev / Next | 32×32px Ghost icon-buttons (`caret-left`/`caret-right`, `icon-sm`); **Tier 1, Regular** (navigation control, per [Iconography](#iconography)); disabled at the first/last page — Neutral-4 icon, `cursor: not-allowed` |
| Ellipsis | static "…" in the same 32×32 box for alignment, caption/Neutral-5, no interactive state |
| Page-size select (optional) | Select, sm, right-aligned, spacing-8 gap from the Next button (e.g. "20 / page") |

**Do:** cap visible page-number slots at roughly 7 and collapse the
rest behind an ellipsis (`1 … 4 5 [6] 7 8 … 24`), keeping the current
page and its immediate neighbors always visible. **Don't:** disable
Prev/Next by hiding them — keep the slot present but visually inactive,
so the control cluster doesn't shift width across pages.

### Stat / KPI card

⚠️ **Designed 2026-07-30, v0.8.0 — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by extension from the existing Card spec, not
transcribed. Treat as a first pass needing real design/brand review.

A dashboard summary tile for a single metric — extends the base Card,
doesn't replace it.

| Part | Spec |
|---|---|
| Container | same as base Card: `radius-lg` (20px), Neutral-1 fill, 1px Neutral-3 border, `shadow-1` at rest, spacing-16 padding |
| Label | caption, weight 700, `tracking-eyebrow`, uppercase, Neutral-5 — the metric name (e.g. "TOTAL SPEND") |
| Value | h1 (32px/800) for a standard tile; the `display` size (40px/800) for a single featured/hero stat card in a row of otherwise-standard tiles — never mix the two sizes within one row |
| Trend | inline row below the value, spacing-8 gap above it: `caret-up`/`caret-down`/`minus` (`icon-micro`, 14px) + delta value + comparison period, all caption/700; **Tier 2, Fill** — a judgment call, not explicit in [Iconography](#iconography)'s examples; treated as expressive/informational (not clickable) despite "arrow up/down" appearing in the Tier 1 example list, see [Needs Input #11](#needs-input-read-this-first) |
| Trend color | Green = positive change, Red = negative change, Neutral-5 = flat/no comparison available — reuses the exact Badge success/danger hues, not new colors |
| Icon chip (optional) | top-right or top-left, same 36×36 `radius-sm` chip at 12% element tint as Card's icon-chip pattern — marks which department the metric belongs to; **Tier 2, Fill** (a department indicator) |
| Footer (optional) | same as Card's Footer sub-part — spacing-16 margin-top, spacing-12 padding-top, 1px Neutral-3 top border, caption/Neutral-5 (e.g. "As of 9:41am") |
| Sparkline slot (optional) | reserved space below the trend row for a mini inline chart — see Chart color mapping below for how its line/fill should be colored; this spec doesn't define chart rendering itself |

**Variants:** Static (default) and Interactive/clickable (same hover →
`shadow-2` + focus-visible → `shadow-focus` pattern as Card).

**Do:** show exactly one primary value per card — that's what makes it
scannable at a glance. **Don't:** stack more than one KPI in a single
card; that's a table row or a multi-column summary bar, not a stat
card. **Don't:** color the trend for decoration — only use Green/Red
when the number is a genuine directional comparison against a stated
period.

### Chart color mapping

⚠️ **Designed 2026-07-30, v0.8.0 — a guideline, not a rendered
component; no source in either the original brand deck or the
teammate's build, and no chart library has been chosen yet.** This maps
existing tokens onto chart roles so that whichever library gets picked
later stays consistent with the rest of the system, rather than
inventing chart-specific colors.

| Chart role | Rule |
|---|---|
| Categorical, department-aligned (≤5 series) | Walk the department table top-to-bottom: Fire/Orange, Wood/Salmon Pink, Earth/Green, Water/Navy, Gold/Amber, at full strength for the mark itself (line/bar/dot). For an area fill under a line, use that series' `-bg` tint (8%), never the full-strength color as a fill. |
| Categorical, 6–7 series | Extend with the two secondary accents (Purple, Turquoise) in that order — they exist specifically as this reserve. |
| Categorical, >7 series | Don't add more brand colors — >7 simultaneous hues aren't reliably distinguishable anyway. Differentiate with line/marker pattern (dash, dot) instead. |
| Sequential (single-metric intensity, e.g. heatmap) | A single-hue ramp from that metric's owning element's `-bg` tint (lightest) to its full-strength color (darkest) — e.g. a Water-owned intensity map ranges `--color-water-bg` → `--color-navy`. Never a rainbow/multi-hue ramp; it breaks the one-element-per-surface rule everywhere else in this system. |
| Diverging (e.g. spend variance around zero) | Green (positive) ↔ Neutral-3 (midpoint) ↔ Red (negative) — reuses the same pairing as Badge success/danger and Toast tones, not a new pair. |
| Gridlines / axes | Neutral-3 for gridlines, Neutral-5 for axis labels/ticks — never Neutral-9, which is too heavy and competes with the data itself. |
| Chart chrome vs. data-ink | Axes, gridlines, and legend text always use caption/footnote type at Neutral-5; only the data marks get full-strength brand color. |

**Do:** assign categorical chart colors by walking the department
table in order, not arbitrarily. **Don't:** use more than one hue
family within a single sequential or diverging scale, or let a legend
introduce a color that isn't already a token in this document.

### PageHeader

⚠️ **Designed 2026-08-04, v0.8.3 — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by reusing the existing Typescale's h1 and body1 tokens,
not transcribed. Treat as a first pass needing real design/brand review.

A page-level title block — sits flush at the top of a page or panel,
no background or border of its own.

| Part | Spec |
|---|---|
| Title | `h1` token (32px/38px, 40px/56px at `-lg`, weight 800), Neutral-9 — the largest heading weight in the system, matching the Typescale's "Page-level heading" use case |
| Subtitle (optional) | `body1` token (16px/22px, weight 500), Neutral-5 — sits directly below the title |
| Gap | `spacing-8` (8px) between title and subtitle |
| Container | no background, no border, no padding — flush in the surrounding page layout |

**Variants:** Default (title only) and With subtitle (title + sub).

**Do:** reserve PageHeader for the single page-level title per view —
it's not for card or section headers, which have their own patterns
(see [Card](#card)). **Don't:** add a border, background fill, or
bottom divider to PageHeader itself; if a page needs a divider under
its header, that belongs to the page layout, not this component.

---

## Guidelines

A condensed, skimmable version of every rule in this document. If you only
read one section before building, read this one.

### Do

- Use Obsidian `#2B2B2C` as the only primary-action fill. Every screen has
  exactly one Primary button doing the main job.
- Use the warm canvas (`#FCFAF5`) as the page background for every
  screen — product/dashboard and brand/editorial alike (⚠️ rule changed
  2026-08-03; see [Color Palette](#color-palette)'s Warm canvas note).
  Component fills (cards, inputs, etc.) keep their own documented values
  — mostly `Neutral-1` white — unaffected by this.
- Use Mulish for 100% of UI text **and every heading** — headings at
  weight 800, letter-spacing 0.
- Reserve Source Serif 4 for genuine brand-statement moments only (deck
  ledes, pull quotes, hero numerals), never as a heading-token swap, and
  never below ~18–20px.
- Use the tinted-fill + bordered pattern for every Badge, and darken
  Success/Warning text (`#00854c`, `#9a5c00`) so it clears AA.
- Map department/element colors 1:1 using the table in
  [Color Palette](#color-palette) — don't invent a color for a department
  that isn't listed there.
- Tint a surface only with the element that already owns its content, and
  only at the `-bg` (8%) or `-bg-strong` (16%) step.
- Use Regular weight for Tier 1 (functional/control) icons and Fill for
  Tier 2 (expressive/status) icons; fall back to Remix only when Phosphor
  has no matching glyph, following the same tier split.
- Pull every spacing, radius, and color value from a token in this
  document — no arbitrary pixel or hex values.
- Let cards carry `shadow-1` at rest, and build every shadow on
  Neutral-4 (soft grey), never black.
- Keep radius soft: 20px cards, 16px buttons, 12px inputs. Never below
  12px on an interactive surface.
- Give every interactive component its full state set — hover, active,
  focus-visible, disabled, plus error for anything that takes input.
- Right-align numeric table columns and use tabular figures where the
  font supports them.
- Always render a real `<label>` on form inputs, even if visually hidden.

### Don't

- Never use a brand/element color (Orange, Salmon Pink, Green, Navy,
  Amber) as a primary button fill — those colors classify, they don't
  mean "click me."
- Never use Source Serif 4 in body copy, buttons, form inputs, table
  data, or dense numeric columns.
- Never mix two fonts inside a single sentence or heading — emphasis is a
  weight change, not a font swap.
- Never apply negative letter-spacing to headings — Collabrium headings
  are weight 800 at tracking 0.
- Never assign icon weight by taste — Regular for Tier 1, Fill for Tier 2 —
  and never mix Phosphor and Remix icon styles within the same component
  instance.
- Never build a shadow on black — every shadow in this system is
  Neutral-4 based.
- Never fill a small badge/tag solid with a brand color and put white
  text on it — several accents (Amber, Salmon Pink) fail contrast at that
  size and weight.
- Never use a radius outside the token set (`radius-sm/md/lg/pill/link`) —
  no one-off corner values.
- Never tint a surface with an element that doesn't own its content, and
  never at full or mid strength — `-bg`/`-bg-strong` only.
- Never add bounce or overshoot easing — movement settles.
- Never use placeholder text as a substitute for a real label.
- Never use a modal for a multi-step flow — modals are for one focused
  decision; multi-step work needs a full page or panel.
- Never let a table exceed roughly 8–10 visible columns without a
  collapse or horizontal-scroll pattern.
- Never introduce a new accent color for a one-off UI need — flag it as a
  gap in [Needs Input](#needs-input) instead of guessing.
- Never treat any value in this document as final while it's still
  marked ⚠️ — call it a draft in your own output too.

---

## Reconciliation — teammate's design system

In v0.6.0 this document was cross-checked against a second, independently
built Collabrium design system at
`~/Desktop/Collabrium Design System/`, derived from the same source deck
(its `uploads/[KULT][EXT] Collabrium DLS.pptx`). That build extracted the
deck far more thoroughly than this one had, so **where the two disagreed
on a sourced value, theirs won** — every correction marked "corrected
v0.6.0" above comes from that reconciliation.

**Confirmed identical (no change needed):** all five element colors and
their department mappings, Obsidian as sole action color, the full 9-step
neutral ramp, the functional Red/Green, the Purple/Turquoise reserves,
both font families, the complete 7-step icon size scale, the Phosphor-fill
icon rule, and the brand voice/tone.

**Corrected here from their values:** radius (was a 4/8/12px guess, is
really 12/16/20px per-surface), elevation (was "flat by default", is
really a 4-step Neutral-4 shadow ladder used routinely), heading weight
(600 → 800), heading letter-spacing (negative → 0), the type scale sizes
and its responsive `-lg` tier, `display` moving from Secondary to Primary
font, body weight (400 → 500), the spacing scale (missing 20/40px steps,
wrong 64/96 top end), focus rings (Obsidian → Water), and Badge/Tag
being two components rather than one.

**Added from their system:** the warm canvas surface, the elemental
background tint system, all motion tokens, semantic spacing aliases, the
Danger and Link button variants, and the card icon-chip pattern.

**What this system still has that theirs doesn't:** the real vector logo
source (`SVG/`, every letter and element as an editable SVG) and the
animated `logo.html` — their `assets/logo/` is PNG-only, which their own
readme flags as a gap. Also the installable desktop font pack
(`fonts/`), where theirs loads from Google Fonts via `@import`.

**What theirs has that this doesn't (deliberately not migrated):** a
production React component library (`components/*.jsx` with `.d.ts`
types and per-component `.prompt.md` files), a full app UI kit
(`ui_kits/collabrium-app`), deck slide templates (`slides/`), an
oxlint-based adherence config, and a `_ds_manifest.json` for tooling.
Those are a genuinely bigger engineering asset than this HTML gallery.
This system stayed documentation-and-tokens-first rather than absorbing
them — if the team wants one canonical thing, **their repo is the better
base to converge on**, with this one's logo/font assets and gap-tracking
folded in.

**v0.7.0 update:** 10 more component specs (SidebarNav, Tabs, Select,
Checkbox, Radio, Switch, Toast, Tooltip, DataTable, ElementBadge) were
transcribed directly from the teammate's real `.jsx` source — same
methodology as the v0.6.0 reconciliation, not a guess. One asset gap
surfaced in the process: ElementBadge relies on raster PNG element
glyphs (`assets/elements/*.png`) that this skill doesn't have — see that
component's spec for the interim substitution. The remaining 5
dashboard components (stat/KPI cards, filters, pagination, date pickers,
chart color mapping) exist in neither system and still need an actual
design pass, not a transcription.

**v0.8.0 update:** those remaining 5 are now specced — Stat/KPI card,
Filters, Pagination, Date picker, and a Chart color mapping guideline.
This batch is explicitly **not** a reconciliation, since there was
nothing to reconcile against: neither this system nor the teammate's
build has these components. They're a first design pass built on this
document's own token system, not transcribed from anything, and are
flagged as more provisional than every component above them —
candidates for real review once a design/brand pass is available, and
also worth checking against the teammate's build if/when they add
these themselves, the same way v0.6.0's reconciliation worked in the
other direction.

---

## Design Tokens

Every value in this document is also available as CSS custom properties
in `tokens.css`, in this same folder — colors (including warm canvas and
elemental tints), the full spacing scale with semantic aliases, radius,
the type scale with responsive tiers, the elevation ladder, motion
durations and easings, and icon sizes. It's a mechanical rendering of the
tables above, not a new source of truth; if a value changes here, update
`tokens.css` to match.

```css
@import url("tokens.css");

.btn-primary {
  background: var(--color-obsidian);
  color: var(--color-neutral-1);
  border-radius: var(--radius-md);
  padding: 0 var(--spacing-16);
}
```

`preview.html` in this folder is a two-pane microsite: the left pane
renders the live visual system (logo, palette, type, spacing) against
`tokens.css`; the right pane is a source viewer with four tabs —
**DESIGN.md** (this file, Compact/Extended toggle, Compact mirrors
`SKILL.md`), **Tailwind v4** (a full `@theme` mapping), **CSS Variables**
(the raw `tokens.css`), and **Design Tokens** (a JSON export) — each with
Copy and a per-tab **Download** button whose label updates dynamically
to match the active tab's extension (`.md`, `.css`, or `.json`).
Everything is embedded inline so the page works opened directly via
`file://`, no server required. A
separate **Download dls (.zip)** button next to the per-tab controls
links out to GitHub's repo archive for the whole `collabrium-dls` folder
(all assets, not just this panel's text) — the one thing on this page
that needs an internet connection, since it isn't embedded.

If your stack is Tailwind v4, map the same values into a `@theme` block
rather than maintaining two token sources by hand:

```css
@import "tailwindcss";
@import url("tokens.css");

@theme {
  --color-obsidian: var(--color-obsidian);
  --color-orange: var(--color-orange);
  --radius-md: var(--radius-md);
  --spacing-16: var(--spacing-16);
  /* ...map the rest of tokens.css as needed — see preview.html's
     Tailwind v4 tab for the full mapping */
}
```

---

## Licensing Attribution

| | Mulish | Source Serif 4 |
|---|---|---|
| Designer | Vernon Adams, with further development by Jacques Le Bailly (Cyreal) | Frank Grießhammer, Adobe |
| Publisher | Google Fonts | Adobe (Source type superfamily) |
| License | SIL Open Font License 1.1 | SIL Open Font License 1.1 |
| Distribution | Google Fonts, GitHub | Google Fonts, GitHub (Adobe Fonts repo) |
| Attribution required | No | No |
| Commercial use | Yes, unrestricted | Yes, unrestricted |
| Self-hosting | Yes | Yes |
| Modification | Yes | Yes |
| Cost | Free | Free |

---

## Changelog

<<<<<<< Updated upstream
- **v0.9.4-draft — 2026-08-04** — Added **MultiSelect**, a trigger
=======
**This is where version and date information lives — not in the spec
sections above.** When you change a component or token, update its spec
section to describe the current state only (no "added on [date]" or
"changed in vX.Y" language inline), then add a new entry here, newest
first, in the same `- **vX.Y — YYYY-MM-DD** — ` format as the
entries below: what changed, why, and what it replaces. Version numbers
are plain `vX.Y` (or `vX.Y.Z`) — no `-draft` suffix. This is also
what powers `preview.html`'s Changelog page (the button next to the
version flag in the top bar) — that page renders this section directly,
so an entry added here is the same pass that makes it show up there,
with nothing else to keep in sync.

- **v0.9.10 — 2026-08-05** — SidebarNav's expanded default header logo
  switched from the static `logo-lockups/collabrium-default-logo.svg`
  lockup to the live animated mark, embedded via `<iframe src="logo.html">`.
  Rationale: [SKILL.md](SKILL.md) already says to use `logo.html`
  "wherever the mark can animate," and a 240px-wide header has plenty
  of room — the static lockup was the un-argued exception, not a
  deliberate choice. Scope is deliberately narrow: an expanded
  department-specific header still uses its static element-colored
  lockup (`logo.html`'s animation cycles through all 5 elements, so it
  can't freeze on one department's color), and the collapsed 72px rail
  still uses the static element icon/`coin.svg` (no room to run the
  animation there either). Implementation: the iframe renders inside
  its own 16px top/bottom padding, so `.c-sidebar-logo-live-wrap` crops
  that out via `overflow: hidden` plus an absolutely-positioned iframe
  offset up by the same 16px, rather than growing the header to fit
  the padded embed at full size. The old single-`<img>` src-swap
  technique (`data-expanded-src`/`data-collapsed-src`) no longer covers
  the default case now that expanding restores an iframe rather than
  an image, so the toggle's JS was simplified instead: the live embed
  and the static collapsed icon are both always present in the markup,
  and CSS alone shows/hides each off `.c-sidebar.is-collapsed`.
  `components.css` and both `preview.html` demos (the standalone
  SidebarNav gallery block and App Shell's own nav instance) updated
  together.

- **v0.9.9 — 2026-08-05** — Reserved "Level 2" as a named,
  documented placeholder for a future drill-down/detail-screen layout
  (Back control + breadcrumb), added to Page header's subsection.
  Explicitly NOT specced yet — deliberately deferred until a real
  detail-view build exists to design against, rather than guessed at
  cold (App Shell's own first-draft flush-rail nav variant is the
  cautionary example for guessing composition rules with nothing real
  to react against). Documents the trigger for actually writing it —
  before the first real drill-down screen ships, not after divergent
  builds show up — and the intended relationship to this section
  (extends App Shell, doesn't replace it, same pattern as Main nav's
  relationship to SidebarNav). No CSS/markup changes — `components.css`
  and `preview.html`'s embedded copies are unaffected, so their own
  version stamps aren't bumped this round (same precedent as
  `tokens.css` lagging behind when its actual content hasn't changed).

- **v0.9.8 — 2026-08-05** — New App Shell / Content region layout
  rule: a formal box grid, requested directly rather than reverse-
  engineered from a build. Three decisions confirmed before writing
  anything (all three went with the recommended option):

  1. **Column model** — 4-column spannable grid, not fixed N-up rows.
     A box's width is always a whole span of 1, 2, 3, or 4 columns, and
     boxes of different spans can share a row (a 1-col box next to a
     3-col box), rather than every box in a row being forced equal
     width.
  2. **Row height** — equal-height stretch (every box in a row grows to
     match the row's tallest box), not a hardcoded max-height cap. Free
     from CSS Grid's own `align-items: stretch` default.
  3. **New 24px spacing** — vertical-only, between stacked rows of
     boxes. The existing horizontal Column gap rule (spacing-16–20,
     product's choice) is unchanged and untouched.

  Implemented as `.c-shell-grid` + `.c-shell-span-1`/`-2`/`-3`/`-4` in
  `components.css`. One real bug caught during live verification, not
  just assumed correct: `grid-template-columns: repeat(4, 1fr)` doesn't
  actually produce 4 equal columns when the boxes inside contain text —
  a plain `1fr` track's implicit `min-width: auto` lets a box's own
  text content inflate its column past its fair 1/4 share (measured
  columns of 37/37/37/124px instead of four equal ~59px tracks before
  the fix). Corrected to `repeat(4, minmax(0, 1fr))`, re-verified via
  computed styles: four genuinely equal columns, a 3-col box measuring
  exactly 3× a 1-col box's width plus its internal gaps, both boxes in
  the row the same height despite very different amounts of text.

  Flagged, not silently fixed: Stat/KPI card's own `.c-stats` predates
  this rule and uses its own `auto-fit` column count rather than a
  fixed 4-column span — that's Stat/KPI card's own component spec, not
  something App Shell overrides, same principle as not touching
  SidebarNav's internals. Left as an open, documented inconsistency.

- **v0.9.7 — 2026-08-05** — "Canvas warm as the default page
  background everywhere" — documented since v0.6.0/the 2026-08-03 rule
  change — was prose only: nothing in `components.css` actually applied
  it, so a screen only got it if whoever built it remembered to set
  `background: var(--color-canvas-warm)` by hand. Same class of gap as
  the icon/pill integration failure v0.9.4 fixed, just for a
  background color instead of a whole stylesheet. Fixed by adding
  `background: var(--color-canvas-warm)` directly to `.c-shell` in
  `components.css` — App Shell's own full-viewport container — so every
  screen built on this pattern gets the canvas automatically, nothing
  to remember. Still references the token, never the hex, so no scope
  violation of App Shell's "structure and layout only" rule. Verified
  live: `.c-shell`'s computed background resolves to `#FCFAF5` with no
  page-level CSS added by the consuming page. Added a property table
  and an explicit "enforced in code, not just documented" note to the
  Page canvas paragraph so this stays checkable going forward.

- **v0.9.6 — 2026-08-05** — App Shell's Main nav re-synced to
  SidebarNav after SidebarNav gained a collapsible rail, logo swap, and
  second-level accordion (a teammate's `component-sidenav` PR, merged
  outside this working session). Two problems, same root cause:

  1. **The portability gap from v0.9.4 regressed.** The new
     SidebarNav CSS (`.c-sidebar-shell`, `.c-sidebar-toggle`,
     `.c-sidebar-logo`, `.c-sidebar-divider`, the second-level
     `.c-nav-parent-toggle`/`.c-nav-children` accordion, the collapsed
     hover-label) had been added only to `preview.html`'s inline
     `<style>`, never ported to `components.css` — the exact class of
     gap v0.9.4 existed to close, reopened by a change that
     didn't go through this file. Ported in full; `components.css` now
     carries every rule `preview.html` does for this component again.
  2. **App Shell's own nav demo had drifted stale**, still showing
     SidebarNav's pre-collapsible markup (plain text header, no
     toggle) — a direct violation of [Main nav](#main-nav--a-direct-instance-of-sidebarnav-not-a-variant)'s
     own "no properties overridden, follows SidebarNav exactly" rule
     from v0.9.2, just via staleness rather than a deliberate
     override. Rebuilt to the current SidebarNav markup (logo header,
     divider, hover-text spans, collapse toggle) with App Shell's own
     content (Astro Growth branding, the Locked/"Soon" Data example).
     Placement CSS also needed a small adjustment: `.c-shell
     .c-sidebar` used to hardcode `flex: 0 0 240px`, which silently
     fought the component's own `.is-collapsed{width:72px}` rule when
     collapsed inside the shell. Changed to target the `.c-sidebar-shell`
     wrapper with `flex: 0 0 auto`, so the nav's own width rules — 240px
     expanded, 72px collapsed — resolve the same way inside App Shell
     as they do in SidebarNav's standalone demo. Verified live: toggling
     collapse inside the App Shell gallery block now matches the
     standalone SidebarNav block pixel-for-pixel, full height
     (`calc(100dvh − 32px)`, still achieved via stretch + margin, no
     literal `calc()`) maintained in both states.

  Also removed, as directly-related cleanup found while fixing the
  above: a duplicate, stale `comp-sidebarnav` gallery block (a merge
  leftover, same invalid duplicate-`id` pattern as a `comp-tabs`
  duplicate that's flagged but *not* fixed here — out of scope for this
  pass) and a code comment in `preview.html` still describing the
  "flush rail" nav variant dropped back in v0.9.2.

  ⚠️ **Not done in this pass:** `DESIGN-SYSTEM.md` and `preview.html`'s
  embedded `src-md-extended`/`src-md-compact` blocks drifted out of
  sync during the same external merge (847/2001 lines changed
  respectively, five new components added, none of it going through
  this file's own doc-sync discipline) — that's a separate, larger
  re-sync this changelog entry doesn't attempt.

- **v0.9.5 — 2026-08-04** — Added **SidebarNav's collapsible
  state, second-level navigation, and overflow behavior** — the
  largest single update to an existing component in this system.
  Collapsible state: the rail toggles between 240px expanded and 72px
  collapsed (icon-only), with a floating overlay toggle button, an
  independently-centered header logo/element icon, an 8px dot badge
  standing in for the trailing count, a logo asset swap (wordmark ↔
  element icon, not just a resize) on toggle, a SidebarNav-owned hover
  label for collapsed icons (not a reused Tooltip instance, since
  Tooltip's plain-wrapper model doesn't survive SidebarNav's scrolling
  item list), and collapsed/expanded persistence to `localStorage`.
  Container gained a hard max-width in both states (`overflow-x:
  hidden`, no horizontal scroll ever), equal padding on all four sides,
  and labels now wrap instead of truncating with an ellipsis. New Nav
  item states: locked/soon (a Badge "Soon" label for un-built IA
  sections), hover, focus-visible, active-pressed, and disabled — all
  reusing existing Table row/Button Ghost tokens rather than inventing
  nav-specific ones. Second-level navigation: a nav item can now expand
  to show child items, one level deep — independent per-parent
  open/closed state, a height-based expand transition, full-width
  (not inset) children, and sidebar-wide exclusivity so only one
  destination is ever the active selection; a collapsed parent routes
  straight to its first child on click, since there's no room to reveal
  children at 72px. Overflow behavior: vertical scroll once items
  exceed the container's height, a thin overlay scrollbar that never
  reserves layout space, and the footer stays pinned outside the
  scrolling region. The collapse-icon and second-level chevron were
  both reclassified **Tier 1, Regular** — "expand, collapse" and
  "chevron up/down" are both listed Tier 1 examples in
  [Iconography](#iconography), not judgment calls. Still open: mobile/
  responsive behavior and full keyboard navigation (arrow keys, `Enter`,
  `Escape` on the accordion). `preview.html`'s gallery and
  `components.css` updated to match.
- **v0.8.4 — 2026-08-04** — Added **PageHeader**, a page-level
  title block (title + optional subtitle), no background/border/padding
  of its own — flush in the surrounding layout. Designed from scratch,
  no source in either the brand deck or the teammate's build, by
  reusing the existing Typescale's h1/body1 tokens. Also live-rendered
  in `preview.html`'s Components gallery.
- **v0.6.2 — 2026-07-31** — Two unrelated fixes shipped this day.
  Reclassified icon weights (resolves [Needs Input #11](#needs-input-read-this-first)):
  moved from "Fill exclusively" to the two-tier Regular/Fill split
  documented in [Iconography](#iconography) — [Component Rules](#component-rules)
  #6, the Guidelines Do/Don't list, the stylesheet `<link>`s (now
  loading both Regular and Fill), and every icon instance in
  `preview.html`'s live gallery were reclassified per-tier. Four
  judgment calls, none brand-team-confirmed: the Tabs "Settings" tab
  icon treated Tier 2 like SidebarNav rather than Tier 1 like a generic
  nav control; the Stat/KPI card's trend indicators (caret-up/down,
  flat minus) treated Tier 2 since they're not clickable, despite
  "arrow up/down" appearing in the Tier 1 example list; Date picker's
  trigger-button calendar icon kept Tier 2 per the explicit "Card /
  section header: Calendar... Fill" example despite sitting inside a
  button; and the "Copied" confirmation checkmark treated as a Tier 2
  status confirmation rather than inheriting the Copy button's own Tier
  1 weight. Also finalized the logo assets (further resolves [Needs
  Input #8](#needs-input-read-this-first)): added the default static
  lockup (`logo-lockups/collabrium-default-logo.svg`, a Gold ring "O",
  for contexts that can't run the animation); trimmed `logo.html` from
  9 frames to the 5 documented elements (Gold → Water → Wood → Fire →
  Earth), dropping the decorative-only sun/moon/cloud/mountain frames;
  rebuilt the wordmark on a new font (new path data per letter, ink
  color `#2F2F2F` → `#2B2B2C` to match the default lockup, resolving a
  prior mismatch between the two assets); corrected the two off-palette
  element frame colors (Wood `#FFA6A8` → `#FF7A90`, Earth `#00D97B` →
  `#00C26E`) before the trim; and moved the Gold frame's artwork to
  `coin.svg`, leaving `gold.svg` as the Gold element icon used
  elsewhere in the system (Color Palette, ElementBadge, sidebar dots,
  Chart color mapping) — deliberately two different assets now.
  Confirmed the `SVG/` vector source library (letters + 5 core-element
  icons) is byte-identical to `logo.html`'s embedded path data. Known
  gap: `wood.svg`/`earth.svg`/`mountain.svg`'s raw exports still carry
  the off-palette colors (left untouched, since they may be externally
  managed master exports) — `logo.html`'s corrected values remain
  canonical. Still open: 4 of 5 department-colored lockup variants, a
  clear-space rule, minimum size, and monochrome/reverse versions.
- **v0.6.1.1 — 2026-08-03** — Filled gaps in Input field that the
  deck and the teammate's build never covered (designed, not sourced):
  placeholder text styling (Neutral-5, same body2/weight 400 as entered
  text — not italic or a separate lighter weight); a required-field
  marker (a single Red asterisk after the label, with no "(optional)"
  text on non-required fields); a Success/valid state (1px Green
  border, trailing check-circle icon, fires after validation on blur or
  submit, not every keystroke); autofill styling so a browser's
  autofill doesn't override the field's fill color; plain `:focus` (not
  `:focus-visible`) so mouse and keyboard users see the same treatment;
  prefix/suffix text adornments; a character/word counter that turns
  Red at/over the limit; and ARIA wiring (`aria-describedby` to helper
  text, swapping to `aria-invalid` plus the error text's `id` on
  Error). Also clarified that the sm/md/lg sizes are a density choice
  per context, not tied to a viewport breakpoint. Treat as a first pass
  needing real design/brand review.
- **v0.9.4 — 2026-08-04** — Added **`components.css`**, the actual
  portable copy of every component's CSS (Button, Input field, Card,
  Badge & Tag, Table row, Modal, Empty state, SidebarNav, App Shell
  layout, Tabs, Select, Checkbox/Radio/Switch, Toast, Tooltip,
  DataTable, ElementBadge, Stat/KPI card, Filters, Pagination, Date
  picker, Chart color mapping) — extracted from `preview.html`'s own
  inline `<style>`, where it had lived with no separate, importable
  copy since v0.5.0. Root cause of a real integration failure: a
  teammate applied this system to an existing project and copying
  markup out of "Copy markup" buttons produced class names with no CSS
  behind them anywhere else, so colors/pills/spacing/icons didn't
  render at all outside `preview.html` itself. `preview.html` now links
  `components.css` (`<link rel="stylesheet">`) instead of duplicating a
  private copy, so the gallery and the shipped file can't drift apart —
  same fix pattern as the `tokens.css`/`src-css-vars` alignment from
  v0.9.1. Verified byte-for-byte: every one of 22 `.c-*` component
  selector groups present in exactly one file, zero duplicated, zero
  dropped, and every demo-page-only rule (`.comp-block`, `.c-modal-stage`,
  `.comp-demo.shell-demo`, etc. — gallery chrome, not real component
  CSS) correctly stayed out of `components.css`.

  Also fixed a real bug caught during the extraction, unrelated to the
  packaging itself: the 36×36 icon-chip pattern — documented as shared
  by Card's header **and** Stat/KPI card's icon slot — was scoped to
  `.c-card .icon-chip` only, so every Stat card's icon in the gallery
  (and App Shell's demo, which reuses Stat card) had rendered completely
  unstyled since v0.8.0. Unscoped to plain `.icon-chip` so it works
  wherever the spec says it should.

  Resolved the file-formats/token-format half of long-open **Needs
  Input #10** with a real answer instead of a placeholder: [Technical
  Implementation](#technical-implementation) now states the 5 files an
  existing project needs and the order to load them in (Google Fonts →
  Phosphor Regular → Phosphor Fill → `tokens.css` → `components.css`),
  and why each one's absence produces exactly the symptom that was
  reported. Loading strategy and `font-display` remain open — genuinely
  need engineering input, not a design guess.
- **v0.9.3 — 2026-08-04** — Added an explicit scope rule to App
  Shell: it governs **structure and layout only** (placement, size,
  spacing, which region a component occupies) and never defines or
  restates a component's own style (fill, border, radius, typography,
  state colors) — that stays the owning component's job. Prompted by a
  direct question about whether this was actually being held to.
  Auditing the section against its own new rule found one real
  violation and two smaller ones. The violation: the Locked/"Soon"
  nav-item state (fill, text color, icon opacity, cursor, a Badge) was
  defined inside App Shell's Main nav subsection — that's a SidebarNav
  component state, not a layout fact, so it moved to
  [SidebarNav](#sidebarnav)'s own table as a third `Nav item` row
  alongside active/inactive. The smaller ones: the "Page canvas"
  paragraph and Content region's table both restated `Canvas warm`'s
  hex value (`#FCFAF5`) redundantly with [Color Palette](#color-palette)
  — reworded to reference the token rather than repeat its value, and
  to state the structural fact (one continuous background region, not
  per-section fills) that's actually App Shell's to own. `preview.html`
  updated to match — the `.c-sidebar-item.soon` CSS rules moved out of
  the App Shell code comment block into the SidebarNav one, no visual
  or behavioral change.
- **v0.9.2 — 2026-08-04** — App Shell's main nav tweak: dropped the
  separate "flush rail" placement variant (no radius, right-edge border
  only) introduced in v0.9.0. That variant existed to solve a real
  problem — SidebarNav's own spec (`radius-lg`, border on all four
  sides) would show canvas colour bleeding through its rounded corners
  if stretched flush against the browser edge — but the fix duplicated
  the component into two specs that could drift apart. Replaced with
  **inset spacing**: the main nav is now SidebarNav, completely
  unmodified (same width/radius/border/fill/anatomy), placed
  `spacing-16` (16px) in from the viewport's top, left, and bottom edges
  instead of flush, with height `calc(100dvh - 32px)`. One component,
  one spec, used in two placement contexts (inset-as-main-nav,
  floating-panel-as-inset-or-drawer) rather than two components pretending
  to be one. SidebarNav's own section now points to App Shell for the
  placement rule instead of describing a second variant inline.
- **v0.9.1 — 2026-08-04** — Cross-checked all 5 places this system's
  content gets duplicated — `SKILL.md`, `DESIGN-SYSTEM.md`, and the three
  embedded copies inside `preview.html` (the DESIGN.md tab's compact/
  extended text, the CSS Variables tab, the Tailwind v4 tab, and the
  Design Tokens JSON tab) — against their real source files, rather than
  assuming the doc-sync rule had been holding. Found: the two markdown
  copies and the CSS Variables copy were exactly in sync (byte-identical);
  `tokens.css` and its embedded copy both carried a stale `v0.6.0`
  header comment despite the system being 3 minor versions ahead (values
  were still correct — only the stamp was stale); the Design Tokens JSON
  export's own metadata carried the same stale `0.6.0` stamp
  (values also still correct); and the Tailwind v4 theme mapping had a
  real, substantial gap — only 59 of tokens.css's 162 actual tokens were
  mapped into `@theme`, missing the entire typography scale (every
  `text-*`/`weight-*`/`tracking-*` token), all 7 icon-size tokens, 4
  shadow variants, the 5 semantic spacing aliases, and the 5
  `-bg-strong` element tint steps. Root cause of the gap: the token count
  used to judge coverage was itself wrong at first pass — a naive,
  line-start-anchored extraction script undercounted tokens.css as 101
  tokens instead of 162, because several lines pack multiple
  `--token: value;` declarations together and a regex anchored to each
  line's start only ever saw the first one. Rebuilt the Tailwind mapping
  from a corrected, exhaustive token extraction; it now covers all 162
  and was verified programmatically (162 tokens.css tokens ↔ 162 mapped,
  zero missing, zero orphaned) rather than by eye. Fixed both stale
  version stamps to `v0.9.1` / 2026-08-04. This was prompted by a
  teammate report that applying the system to an existing project left
  colors, pills, and icons not rendering correctly — a separate,
  larger problem (the component CSS itself has never been extracted
  into anything portable, and icon/font CDN links are undocumented as a
  requirement) that this pass does not fix, only the token-layer piece
  of it.
- **v0.9.4 — 2026-08-04** — Added **MultiSelect**, a trigger
>>>>>>> Stashed changes
  button that opens a grouped checkbox list for selecting multiple
  options — the trigger reflects the current selection as
  individually-removable Badge-Neutral chips (capped at 2, then a "+N"
  overflow chip), visible whether the menu is open or closed. Designed
  from scratch, no source in either the brand deck or the teammate's
  build; reuses Button Secondary for the default trigger, Filters'
  trigger/popover conventions, Badge's real box model for the chips, and
  this system's own Checkbox spec for the rows, rather than inventing
  new patterns. Built per the user's own 3-step process: component first
  (`components/forms/DropdownMenuWithSelection.tsx` — file path kept
  from an earlier single-select draft on the same file, replaced per
  explicit user direction; the exported component/types are
  `MultiSelect`/`MultiSelectOption`/`MultiSelectProps`), then a live
  preview in `preview.html`'s Components gallery for approval — through
  several rounds of review (Badge-based selection display instead of a
  plain count, dynamic "{count} selected" trigger copy, removing the
  count badge from the open states, then individually-removable
  per-item chips that stay visible while open, which superseded the
  count-badge/text approach) — then this spec, added only after that
  preview was explicitly approved. Slotted alphabetically into the
  Basics group (between Modal / dialog and Password field) rather than
  a new category, same call as Stepper's/UserPicker's/FileUploader's own
  placements. Updated the ToC and Scope note to match.
- **v0.9.3-draft — 2026-08-04** — Added **FileUploader**, a
  click-to-browse/drag-and-drop attachment control — attached files list
  as rows below the drop zone with a kind badge, name, size, and a
  remove action. Designed from scratch, no source in either the brand
  deck or the teammate's build; reuses Badge-Neutral's box model for the
  kind badge, Table row's/SidebarNav's Obsidian-border + Neutral-2-fill
  "currently engaged" recipe for the drag-over state, and the
  Filters/Date picker popover convention for file rows, rather than
  inventing new patterns. Built per the user's own 3-step process:
  component first (`components/forms/FileUploader.tsx`), then a live
  preview in `preview.html`'s Components gallery for approval —
  including a mid-review fix (kind badge moved from a literal monospace
  stack to `--font-primary`, same call as UserPicker's avatar-initials
  fix) — then this spec, added only after that preview was explicitly
  approved. Slotted alphabetically into the Basics group (between Empty
  state and Input field) rather than a new category, same call as
  Stepper's and UserPicker's own placements. Updated the ToC and Scope
  note to match.
- **v0.9.2-draft — 2026-08-04** — Added **UserPicker**, a searchable
  input for finding and selecting a single person (an Account Executive,
  in this app) — collapses to an avatar/name/role summary with a clear
  action once a value is set. Designed from scratch, no source in either
  the brand deck or the teammate's build; reuses Input field's box
  anatomy and focus behavior, Filters'/Date picker's popover convention,
  and Table row's hover treatment rather than inventing new patterns.
  Built per the user's own 3-step process: component first
  (`components/forms/UserPicker.tsx`), then a live preview in
  `preview.html`'s Components gallery for approval — including a
  mid-review fix (avatar initials moved from a literal monospace stack,
  since this system has no `--font-mono` token, to `--font-primary` like
  every other piece of text in the component) — then this spec, added
  only after that preview was explicitly approved. Slotted alphabetically
  into the Basics group (after Textarea) rather than a new category, same
  call as Stepper's v0.7.0-batch placement. Updated the ToC and Scope
  note to match.
- **v0.9.1-draft — 2026-08-04** — Added **Stepper**, a multi-step
  progress indicator (Horizontal/Vertical orientation × optional
  per-step description, three states — Completed/Active/Upcoming).
  Designed from scratch, no source in either the brand deck or the
  teammate's build. Built per the user's own 3-step process: component
  first (`components/navigation/Stepper.tsx`), then a live preview in
  `preview.html`'s Components gallery for approval — including two
  rounds of visual fixes caught in that preview (equal-length dividers
  in both orientations, a divider touching its neighboring indicator in
  the vertical layout, and the Completed indicator showing a checkmark
  instead of its step number) — then this spec, added only after that
  preview was explicitly approved. Slotted alphabetically into the
  existing v0.7.0 batch (between SidebarNav and Switch) rather than a
  new Navigation category, per explicit user direction — SidebarNav and
  Tabs stay where they are. Updated the ToC and Scope note to match, and
  fixed `preview.html`'s Components lede, which had drifted stale at
  "21 components" since App Shell/Textarea/Password field/Search input
  clear button were added in v0.9.0 without updating it — folded that
  fix into this same pass rather than leaving it for a third drift.
- **v0.9.0-draft — 2026-08-04** — Added **App Shell**, the page-level
  composition layer this document never had. Prompted by real downstream
  builds: separate teams built dashboards on this system and produced
  three different navigation shells (pure sidebar, top-bar-only, sidebar
  **and** top-bar), plus a Card chrome deviation and a Badge semantics
  miss. The existing component tables weren't wrong — SidebarNav, Card,
  and Badge & Tag already specified their own internals correctly — the
  gap was that nothing said how those pieces combine into an actual
  screen. App Shell defines: a canonical sidebar-only pattern; a flush,
  full-height **placement variant** of SidebarNav for the primary rail
  (240px, no radius, right-edge border only) — SidebarNav's existing
  spec (`radius-lg`, border on all four sides) is now documented as the
  floating-panel/off-canvas variant, not a contradiction; a new Locked/
  "Soon" nav-item state; Content region; and Page header, promoted (in a
  same-day revision, still within this draft) to be the shell's *only*
  top-of-screen chrome, full width, in place of an initially-drafted
  separate Top bar. That first draft's Top bar (notification dot,
  account control depending on the still-unspecced Avatar component) was
  cut before shipping — global-scope controls have nowhere defined to
  live as a result, an acknowledged open gap rather than a silent one.
  Every value reuses existing spacing/radius/elevation/motion tokens —
  no new scale was introduced (sidebar width was already specced at
  240px). Marked ⚠️ **designed, not transcribed**, same provisional
  status as the v0.8.0 batch. Also corrected in this pass: the
  Components section's own scope note had undercounted for a full day
  (see the v0.8.3 entry below) — exactly the kind of drift App Shell
  exists to prevent elsewhere, caught here in the same file that names
  the problem.
- **v0.8.3-draft — 2026-08-03** — Four changes shipped this day without a
  version bump at the time; reconstructed and folded in here
  retroactively so the changelog matches what the file actually says.
  Warm canvas (`#FCFAF5`) became the default page background **everywhere**,
  reversing the v0.6.0 rule that restricted it to brand/editorial
  surfaces — product UI was pure white before this. Button gained an
  Icon-only variant (square hit area, Tier 1 icon required, mandatory
  `aria-label`). Input field's Focus state was corrected to match what
  `preview.html` actually ships — a plain 2px Obsidian border swap, not
  the Water-ring `shadow-focus` treatment the v0.6.0 "Focus rings are
  Water" policy implied; that policy still holds everywhere else (Card,
  Empty state), Input field (and everything that inherits its States
  table) is now documented as a deliberate exception. Three Input field
  sibling components were specced and live-rendered: Textarea, Password
  field, Search input clear button. None of these four were reflected in
  the Components section's scope note or this changelog until the
  v0.9.0 pass above caught it.
- **v0.8.2-draft — 2026-07-30** — The Components gallery in
  `preview.html` was static markup — buttons that looked clickable but
  weren't, checkboxes with a hardcoded `.on` class, tabs that never
  switched. Wired real interactivity into every component with genuine
  click/toggle semantics: SidebarNav and Tabs switch active state on
  click; Checkbox, Radio, and Switch sync their visual layer to the
  real (already-native) hidden input via a `change` listener, so
  keyboard toggling works too, not just mouse clicks; Table row and
  DataTable row select on click (matching the Table row spec's existing
  "Row selected" state, now actually reachable); Toast dismisses; Modal
  dismisses on Close/Cancel/Archive and gets a "Reopen modal" trigger so
  it isn't gone for good; Filters' triggers toggle, pills remove
  individually, and Clear all removes everything; Pagination's numeric
  buttons select directly and Prev/Next step by one; Date picker days
  select on click. Everything scoped via event delegation on
  `#components` so it can't collide with the app chrome (right-pane
  tabs, jumpnav, copy-markup buttons) elsewhere on the page. Two things
  stayed deliberately inert — see the new interactivity note above the
  Components spec for why.
- **v0.8.1-draft — 2026-07-30** — A separate team built a Sales Dashboard
  mockup on top of this system (their own reimplementation, not sourced
  from `preview.html` directly) and it surfaced three real bugs in
  their build: a Switch thumb pinned off-center by a conflicting CSS
  rule, a "Follow-up" Badge that wrapped to two lines and broke its
  pill shape, and a Select with no custom caret (bare native browser
  chrome). Checked all three against this repo's own `preview.html`
  reference implementation before touching anything here — Switch and
  Select were already correct (the mockup's bugs were unique to its own
  from-scratch CSS, nothing to fix). Badge, though, was missing
  `white-space: nowrap` here too — added it, since nothing was actually
  stopping the same wrap from happening in this system's own Badge if a
  label ran long. See the Badge & Tag component section above.
- **v0.8.0-draft — 2026-07-30** — Designed the last 5 dashboard
  components flagged as a gap in v0.7.0 — Stat/KPI card, Filters,
  Pagination, Date picker, and a Chart color mapping guideline. Unlike
  every component before these, **none of the five has source material
  in either the original brand deck or the teammate's build** — they're
  built entirely from this document's own token system (extending
  Card/Select/Button/Tag/Modal patterns already specced), not
  transcribed from anything. Each is marked ⚠️ "designed, not
  transcribed" in its own section and should be treated as more
  provisional than the rest of the Components list — a first pass that
  still needs real design/brand review, same caveat the original 7
  basics carried before any reconciliation. Chart color mapping is a
  token-mapping guideline, not a rendered component, since no chart
  library has been chosen yet. Stat/KPI card, Filters, Pagination, and
  Date picker are all also live-rendered in `preview.html`'s Components
  section with matching markup and "Copy markup" buttons, per the
  doc-sync standing rule. This closes out the full 15-component request
  from v0.7.0 — Components scope note now covers all 21 (17 built +
  built-but-provisional 4, plus the 1 guideline).
- **v0.7.0-draft — 2026-07-30** — Wrote specs for 10 more components —
  SidebarNav, Tabs, Select, Checkbox, Radio, Switch, Toast, Tooltip,
  DataTable, ElementBadge — transcribed directly from the teammate's
  real `.jsx` source, same methodology as every prior component. Scoped
  deliberately: these 10 exist as real components in the teammate's
  build, so they could be transcribed rather than designed from scratch;
  the remaining 5 dashboard components (stat/KPI cards, filters,
  pagination, date pickers, chart color mapping) have no source in
  either system and were left out on purpose, flagged for a separate
  design pass. One asset gap surfaced: **ElementBadge** relies on raster
  PNG element glyphs (`assets/elements/*.png`) that this skill doesn't
  have — documented an interim Phosphor-icon substitution. All 10 also
  live-rendered in `preview.html`'s Components section with matching
  markup and "Copy markup" buttons, per the doc-sync standing rule — the
  Components lede, scope note, and Reconciliation section were all
  updated in the same pass, and the top-bar version flag bumped.
- **v0.6.1-draft — 2026-07-29** — User asked for explicit confirmation
  that components matched the teammate's build and were actually
  projected into `preview.html`. Re-verification against the real
  `.jsx` source (not just the earlier read-through) found two things
  the v0.6.0 pass got wrong: **Button** type size was mapped to the
  `label1/2/3` scale (11/13/14px) when the real component uses 14px
  (sm) and 16px (md/lg, sharing a size) — not a token match at all, a
  component-specific override; live gallery's `lg` padding was also
  `spacing-24` instead of the correct `spacing-20`. **Card**'s icon-chip
  background is a one-off 12% element tint (`color-mix`), not the
  documented 8% `-bg` token used for full-card tinting — conflating the
  two was wrong; the header's icon-to-title gap is `spacing-12`, not
  `spacing-8`; and Card has an optional bordered **Footer** sub-part
  that was missing from the spec entirely. All four fixed in
  `DESIGN-SYSTEM.md`, `tokens.css` usage, and `preview.html`'s live
  Components gallery (icon-chip now sits in a proper header row next to
  the title; added a Footer example card), then re-verified in-browser.
  Everything else cross-checked clean: Badge's tone map, Tag, Input,
  Dialog, and Empty State all match the source exactly.

  Also caught while verifying: `preview.html`'s **Guidelines section had
  its own separate, hardcoded Do/Don't list** (distinct from the
  DESIGN.md tab's copy) that never got updated during the v0.6.0 pass —
  it was still saying "flat by default," 600-weight headings, and a
  4-token radius scale. Rewritten to match. Same for the Typography
  section's lede, which still framed the type scale as an open draft
  gap after Needs Input #3 was resolved. This is exactly the kind of
  drift the doc-sync standing rule exists to catch — a reminder to check
  static prose blocks, not just data-driven tables, when a token value
  changes.
- **v0.6.0-draft — 2026-07-29** — Reconciled against a teammate's
  independent, more thorough design system built from the same source
  deck (`~/Desktop/Collabrium Design System/`) — see
  [Reconciliation](#reconciliation--teammates-design-system) for the
  full diff. Resolves Needs Input #3/#4/#5 with real sourced values.
  Corrected: radius (4/8/12px guess → real 12/16/20px per-surface
  scale), elevation ("flat by default" → a real Neutral-4 shadow ladder
  used routinely), heading weight/tracking (600 → 800, negative →
  zero), the type scale + a new responsive `-lg` tier, body weight (400
  → 500), the spacing scale (added 20/40px, corrected the 64/96 top
  end), and focus rings (Obsidian → Water). Added: warm canvas surface,
  elemental background tints, the full motion token set (durations +
  6 easing curves), Danger/Link button variants, the card icon-chip
  pattern, and split Badge/Tag into two distinct components. All
  changes applied to `tokens.css` and `preview.html`'s live Components
  gallery in the same pass, per the v0.5.0 standing rule.
- **v0.5.0-draft — 2026-07-29** — Added a live Components section to
  `preview.html` (7th nav item, after Guidelines): Button, Input field,
  Card, Badge/Tag, Table row, Modal/dialog, and Empty state, each
  rendered per the existing spec with a "Copy markup" button. Further
  resolves Needs Input #7 — the spec now has a working reference
  implementation alongside it, not just tables. Established a standing
  rule (user request): every future build/update to this skill must be
  reflected back into this file in the same pass, not as a follow-up.
- **v0.4.5-draft — 2026-07-29** — `preview.html`: compacted the Fonts
  tab's install callout — replaced the boxed description + button with
  a single button inline on the section header row, right-aligned next
  to the "Fonts" title.
- **v0.4.4-draft — 2026-07-29** — Added `fonts/collabrium-fonts.zip`,
  a real desktop font pack (variable-font `.ttf` for Mulish and Source
  Serif 4, both weights/styles, plus OFL licenses), sourced from
  Google's official font repository rather than the web-embed CSS
  subsets. Added a "Download font pack" button to `preview.html`'s
  Fonts tab. True one-click OS-level install isn't possible from a
  browser (no website can write into a system Fonts folder — verified
  and explained inline rather than assumed); this delivers the closest
  feasible thing, a one-click *download* of the real files.
- **v0.4.3-draft — 2026-07-29** — `logo.html`: removed the visible
  element-name label and play/pause button (dev/debug UI from the
  source asset), so it embeds as a clean, always-animating mark. All 9
  animation frames, including moon, are unchanged. Also dropped
  `logo.html`'s now-unused Google Fonts/Phosphor/`tokens.css`
  dependencies since no text renders in it anymore. `preview.html`'s
  embedded-logo iframe height reduced (240px → 160px) to match.
- **v0.4.2-draft — 2026-07-29** — Documented `SVG/`, the confirmed true
  vector source library for the logo (8 letter files, 10 element icons
  including an unintegrated `coin.svg`, 5 motive variants — 2 of which
  are duplicates). Further resolves Needs Input #8. Flagged, not fixed:
  `coin.svg`'s role is unconfirmed, and `wood.svg`/`earth.svg`/
  `mountain.svg` still carry the pre-correction off-palette colors in
  their raw form (left untouched, since they may be externally-managed
  master exports).
- **v0.4.1-draft — 2026-07-29** — Rebuilt `preview.html` into a two-pane
  layout matching the reference the user pointed to
  (styles.refero.design): left pane is the live visual system, right
  pane is a tabbed source viewer (DESIGN.md with Compact/Extended,
  Tailwind v4, CSS Variables, Design Tokens JSON) with Copy/Download.
  All four tabs are embedded inline (not fetched) so the page keeps
  working when opened directly via `file://`.
- **v0.4.0-draft — 2026-07-29** — Added the real animated logo asset
  (`logo.html`), corrected to this document's canonical colors; resolved
  Needs Input #1 and #2 (Salmon Pink `#FF7A90` and Green `#00C26E` are
  now final, per explicit user decision that this document is the
  source of truth). Rebuilt `preview.html` from a component-states demo
  into a refero.design-style brand microsite (Collabrium overview + logo,
  Color Palette, Typography, Fonts, Spacing & Shape, Guidelines) per the
  user's request — the component-state demos that used to live there now
  only exist as the tables in this document.
- **v0.3.0-draft — 2026-07-29** — Added an Overview summary paragraph,
  letter-spacing values on the type scale, content max-width and an
  explicit elevation policy in Spacing & Shape, a consolidated top-level
  Guidelines (Do/Don't) section, and `tokens.css` (paste-able CSS custom
  properties, now the single source of values for `preview.html`).
  Brought the doc's comprehensiveness in line with a reference style
  guide the user pointed to. Still unreviewed by brand/design team.
- **v0.2.0-draft — 2026-07-29** — Added Component Rules and full specs for
  Button, Input field, Card, Badge/Tag, Table row, Modal/Dialog, and Empty
  state (resolves Needs Input #7 with a first draft). Still unreviewed by
  brand/design team.
- **v0.1.0-draft — 2026-07-29** — Initial DLS drafted from the Collabrium
  brand deck (Google Slides). 10 gaps flagged under Needs Input; see table
  at top. Not yet reviewed by brand team.
