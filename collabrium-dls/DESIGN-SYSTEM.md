# Collabrium Design Language System

**v0.8.2-draft** — 2026-07-30 — Sourced from the Collabrium brand deck
(Google Slides). This is a first pass: everything under "Needs Input" below
is a placeholder, not a signed-off value. Build with it, but flag it in
your output.

## Overview

Collabrium renders on a near-black-on-white interface (Neutral-9 text on
Neutral-1 canvas) that reads as calm and product-grade rather than as a
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
| 8 | No final logo asset | **Further resolved 2026-07-29** — a real animated wordmark + mark SVG (`logo.html`, corrected to this document's palette) plus the full vector source library (`SVG/` — every letter and element icon) now exist. Still missing: a combined static lockup export, clear-space rule, minimum size, and monochrome/reverse versions | Use `logo.html` for the live mark and `SVG/` for individual pieces; don't extract a still frame or hand-composite the `SVG/` files as a "final" lockup without brand-team sign-off |
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
| Neutral-1 | `#ffffff` | Page canvas, card surfaces, button text on dark fills, inverted text |

### Warm canvas ✅ (new in v0.6.0)

A deliberate **second surface** for brand and editorial contexts — decks,
landing pages, type specimens, printed collateral. Product UI stays on
white (`Neutral-1`). This is not a dark-mode-style global theme swap;
it's a context choice.

| Token | Hex | Usage |
|---|---|---|
| Canvas warm | `#FCFAF5` | Page canvas on brand/editorial surfaces |
| Canvas warm card | `#FAF7F2` | Card fill on the warm canvas |

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

**The real asset — `logo.html`.** A working animated wordmark exists in
this folder: the word "COLLABRIUM" with the O rendered as a looping
filmstrip that cycles through the five elements, plus four additional
decorative frames (sun, moon, cloud, mountain) that are **motion-graphic
variety only** — they're not part of the 5-element/department
classification system and don't map to any documented color or
department. All 9 frames, including moon, are in the loop — the source
asset originally shipped with a visible element-name label and a
play/pause control; both were removed at the user's request (2026-07-29)
so the file embeds as a clean, always-animating mark with no dev/debug
UI. The animation content itself is unchanged. As received, two of the five element frames used
off-palette hex values (Wood `#FFA6A8`, Earth `#00D97B`); both have been
corrected to the canonical values in this document (`#FF7A90`,
`#00C26E` — see Needs Input #1/#2, resolved). The wordmark itself uses
its own ink color, `#2F2F2F`, a deliberately softer black than
Neutral-9 — this is a legitimate independent logo choice, not a
conflict with the UI neutral ramp, and hasn't been changed.

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
  static letter.
- **Element icons (10 files):** `fire.svg`, `wood.svg`, `earth.svg`,
  `water.svg`, `gold.svg` (the five documented elements) plus `sun.svg`,
  `moon.svg`, `cloud.svg`, `mountain.svg` (the four decorative-only
  extras already noted above) and **`coin.svg`** — a tenth icon that
  is **not** in `logo.html`'s 9-frame animation and doesn't map to any
  documented element or department. ⚠️ Flagging, not guessing: is `coin`
  meant to extend the animation, replace `gold`, or serve an unrelated
  use (billing/pricing UI)? Confirm with the brand team before building
  on it.
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

**Scope note:** 21 components are specced and built now — the original
7 basics (Button, Input field, Card, Badge & Tag, Table row, Modal /
dialog, Empty state), 10 transcribed directly from the teammate's real
component source in v0.7.0 (SidebarNav, Tabs, Select, Checkbox, Radio,
Switch, Toast, Tooltip, DataTable, ElementBadge), and 4 more **designed
from scratch in v0.8.0** — Stat/KPI card, Filters, Pagination, Date
picker — plus a Chart color mapping guideline (not a rendered
component). Those last 5 have **no source in either the original brand
deck or the teammate's build**; they're built entirely from this
document's own token system (color, type, spacing, radius, elevation,
motion) and marked ⚠️ **designed, not transcribed** in their own
sections — treat them as a first pass needing real design/brand review
before shipping, more provisional than the transcribed components above
them. See each section below for source notes. Don't skip straight to
markup for a new component — write the spec here first (variants,
sizes, states, Do/Don't), the same process every component above went
through.

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
would stay **Tier 2, Fill**). Icon-only buttons use a square hit area
matching the button's height (e.g. 40×40 for md) and require an
`aria-label`.

**Do:** keep one Primary button per screen/card region. **Don't:** use an
element/department color as a button fill — that's a classification color,
not an action color (Rule 2 above).

### Input field

Anatomy, top to bottom: label → input box → helper or error text.

| Part | Spec |
|---|---|
| Label | caption token at weight 700, Neutral-9 text, spacing-4 (4px) below it before the input |
| Input box | 40px height (md; sm 32px, lg 48px), `radius-sm` (12px), 1px Neutral-3 border, Neutral-1 fill, spacing-12 (12px) horizontal padding, body1 type at weight 500 |
| Helper text | caption token, Neutral-5, spacing-4 above it |
| Error text | caption token at weight 700, Red `#FD3343`, replaces helper text |

**States:**

| State | Border | Fill | Notes |
|---|---|---|---|
| Default | Neutral-3 | Neutral-1 | — |
| Focus | Neutral-3 + `shadow-focus` | Neutral-1 | Water-based 3px ring, not an Obsidian border swap (corrected v0.6.0) |
| Error | 1px Red `#FD3343` | Neutral-1 | Error text replaces helper text below |
| Disabled | Neutral-3 | Neutral-2 | Neutral-5 text, no cursor |

Optional leading/trailing icon, `icon-sm` (16px), Neutral-5 — sits inside
the input box, spacing-8 from the text. Weight follows the icon's own
[Iconography](#iconography) tier (e.g. a trailing `magnifying-glass` for
in-field search is **Tier 1, Regular**).

**Do:** always render a `<label>`, even if visually hidden. **Don't:** use
placeholder text as a substitute for a label — placeholders disappear the
moment someone types, per the source deck's own accessibility intent.

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
- **Warm** — `canvas-warm-card` fill, border dropped. Brand/editorial contexts only, never product UI.
- **Element-tinted** — full card background in the owning element's `-bg` tint (8%). Use sparingly; the icon-chip variant is usually the better signal.

**Do:** let cards carry `shadow-1` — that's the intended resting state.
Use the 12% icon-chip tint and the 8% full-card `-bg` tint deliberately —
they're not interchangeable. **Don't:** tint a card with an element that
doesn't own its content.

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

### SidebarNav

⚠️ **New in v0.7.0 — transcribed from the teammate's `SidebarNav.jsx`.**
Primary app-level navigation, not a page-local menu.

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

---

## Guidelines

A condensed, skimmable version of every rule in this document. If you only
read one section before building, read this one.

### Do

- Use Obsidian `#2B2B2C` as the only primary-action fill. Every screen has
  exactly one Primary button doing the main job.
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
- Never use the warm canvas for product UI — it's for brand/editorial
  surfaces only.
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
Copy and Download. Everything is embedded inline so the page works
opened directly via `file://`, no server required.

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
