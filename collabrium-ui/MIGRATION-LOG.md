# Migration log

Tracks every component in the Collabrium DLS while it is converted from
`collabrium-dls/` (HTML + CSS) to `@collabrium/ui` (React).

**Source, read-only:** `collabrium-dls/` at DLS v0.9.124. The source has three files:
- `tokens.css` (193 lines)
- `components.css` (6801 lines)
- `DESIGN-SYSTEM.md` (14355 lines)

Line numbers below refer to these files. "CSS" means components.css and "DS" means DESIGN-SYSTEM.md.

**Status key:**
- `todo`: not started
- `in progress`: being converted
- `review`: converted, waiting for design review
- `done`: approved

---

## 1. Status

| # | Component | Status | Notes |
|---|---|---|---|
| 1 | Button (incl. CTA beacon) | **review** | Step 3. See Decisions D-1 to D-9 and Open questions Q-BTN-*. |
| 2 | Badge | **review** | Converted 2026-10-23. Tag stays separate (DS: "two separate components"). See BADGE-1 to BADGE-6, Decisions D-13 to D-16 and Open questions Q-BADGE-*. |
| — | everything else | todo | Not started. |

---

## 2. Audit: every component

The audit covers every line of components.css, which was read in five slices, plus the DS section for each component.

Complexity: S = small, M = medium, L = large.

"JS" means the source depends on a script for behaviour. In React that becomes component state.

The "Order" column is the suggested conversion order: simplest and most depended-on first. See section 3.

### 2.1 Foundations and core controls

| Component | CSS lines | Variants | Sizes | States in CSS | DS section | Key DS rules | Depends on | Size / JS | Order |
|---|---|---|---|---|---|---|---|---|---|
| **Button** `.c-btn` | 31–56 (consumers and overrides elsewhere: 1472–1514, 1728, 2014, 2120, 2209–2244, 2506–2595, 2649, 3458, 3568, 5689, 6343, 6665) | primary, secondary, ghost, icon-only | sm 32, md 40, lg 48 | hover (all three), active (primary only), focus-visible, disabled (one rule for all), `[hidden]` | Button 2333–2499 | Weight 700. One Primary per region. Icon-only = Tier 1 icon + `aria-label`. Element colours never fill a button | Phosphor | S, no JS | 1 |
| **CTA beacon** `.c-btn-beacon` (Button state) | 58–126 | Primary only; `.is-static` | sm/md/lg | ring + arrow nod ×3 (4.2s), hover/focus/active mask, reduced-motion steady ring, no forced-colours rule (deliberate) | Button › CTA beacon 2389–2499 | One beacon per page. Never on page load or a timer. Never on Danger, Secondary, Ghost, icon-only or disabled. No focus move, no announcement | Button, `CBeacon` script | M, JS | 1 (with Button) |
| **Badge** `.c-badge` | 1641–1646 (reused 595, 2573, 2713, 5652, 6242) | neutral, success, error, warning, selected | one | none (not interactive) | Badge & Tag 2273–2332 | 22px, caption 700, pill, 1px border. Six variants incl. Info. AA text colours for Success and Warning | — | S | 2 |
| **Tag** `.c-tag` | 1647–1660 (reused 364, 429, 622, 764, 2148) | neutral, fire, wood, earth, water, gold, purple; `.dot` | one | none | Badge & Tag 2273–2332 | 24px, element `-bg` tint, 6px dot; Purple text mixed 80/20 toward Neutral-9 | — | S | 2 |
| **Checkbox / Radio / Switch** `.c-choice`, `.c-checkbox-box`, `.c-radio-circle`, `.c-switch-track` | 3077–3096 (reused across Card, Table, Dropdown, Lists, Tool approval) | checkbox, radio, switch | one | `.on`, `.disabled` (class only); transitions | Checkbox 4345–4363, Radio 7647–7669, Switch 8949–8983 | 18px box, 6px radius, icon-micro glyph. Radio dot 9px. Switch 40×24, Green when on | Phosphor | S, small JS (`.on` sync) | 3 |
| **Input field** `.c-field`, `.c-helper` (+ Password 185–187, Textarea 189–192) | 128–192 (reused by Dropdown 3000–3044, 4099–4289; Radio Card; Tool approval 5772–5788; Quantity selector 5988) | default, success, password, textarea; leading/trailing icon, prefix/suffix, counter | one (40px) | focus, error, disabled, success, counter at-limit | Input field 5707–5837; Password field 7097–7113; Textarea 9349–9367 | Box 40px (sm 32 / lg 48), radius-sm, 1px Neutral-3, Neutral-1 fill. Autofill override required | Phosphor | M (Password needs JS) | 4 |
| **Card (base)** `.c-card`, `.c-cards` | 267–289 | static, interactive, warm, accent, icon-chip | — | interactive hover, focus-visible (shadow-focus) | Card 2500–2529 | radius-lg, shadow-1, padding 16. Seven variants listed | — | S | 5 |
| **Empty state** `.c-empty` | 2613–2650 | default, `.is-error`, `.is-fullpage`, `.is-section`, `.is-inline`; link | — | mobile ≤767 | Empty state 4986–5067 | Icon Neutral-4, Tier 2 fill. Max 2 actions (Primary + Ghost); inline = link only. Error passed explicitly | Button, Phosphor | S | 6 |
| **Tooltip** `.c-tooltip` | 3574–3590 | top only; `.is-portaled` | — | `.is-visible` | Tooltip 9573–9676 | 240px max then wraps. 6px caret. Placements top/bottom/left/right with flip/shift. Portal above modals | JS portal | M, JS | 7 |
| **ElementBadge** `.c-element-badge` | 3592–3601 | fire, earth, water, gold, wood | 32 (doc: size prop) | none | ElementBadge 4957–4985 | radius-sm, 12% tint, glyph 60% of chip, `title` when no label | Phosphor | S | 8 |
| **Progress Bar** `.c-progress-*` | 4558–4631 (used by Card 843/873, Modal 2191–2454; shimmer keyframe reused 688, 1767, 6142, 6307, 6675) | default, tones (success, error, 5 elements), labels, stacked, indeterminate, legend | compact 4, default 8, large 16 | reduced motion, forced colours (4617–4621) | Progress Bar 7114–7310 | Default fill Obsidian. Stacked order = departments, then Purple, Turquoise, Neutral-4 overflow. Width transition duration-base | — | M, little JS | 9 |
| **Modal / dialog (base)** `.c-modal`, `.c-icon-btn` | 1779–1785 | — | — | `.c-icon-btn` hover only | Modal / dialog 6206–6232 | Overlay = shadow-overlay; 1px Neutral-3 border; shadow-4; ~480px; h3 title; spacing-24 body; one decision only | Button | S (no scrim/layer CSS) | 10 |
| **Stepper** `.c-stepper`, `.c-step*` | 4294–4405 (`.c-step-indicator` reused by Task Rows 5579–5705) | horizontal, vertical | — | completed, active, upcoming, error, warning, `.is-disabled`; container query 480 | Stepper 8491–8573 | State from one `currentStep`. Error only on Active, Warning only on Completed. 24px indicator | Phosphor | M, no JS | 11 |
| **PageHeader** `.c-pageheader` | 4419–4429 (+2922) | with actions row | — | none | PageHeader 6893–6921; App Shell › Page header 2023–2085 | h1 (32/38, 40/56 at -lg), body2 subtitle, no chrome | Button | S | 12 |
| **Back button** `.c-back` | 4407–4417 | — | — | hover, active, focus-visible | Back button 2086–2145 | Ghost style, label2, arrow-left icon-sm; label = parent screen, max 40 chars + ellipsis | Phosphor | S | 12 |
| **Tabs** `.c-tabs` | 2975–2997 | with count, scroll fades | — | active, hover, :active, focus-visible, `.is-disabled` | Tabs 9243–9348 | Active = 2px inset Obsidian underline. Disabled Neutral-4 at 40%. Panel cross-fade. URL persistence | Phosphor, JS | S–M, JS | 13 |
| **Segmented Control** `.c-segctl`, `.c-seg-*` | 4431–4468 | text, icon-only (with tooltip) | default, compact | selected (`aria-checked`), hover, active, focus-visible, disabled; reduced motion | Segmented Control 7832–7951 | 2–5 segments. 36 / 28px heights. Pill moves duration-fast / ease-standard | Phosphor, JS | M, JS | 14 |
| **Chip** (Input Chip, Filter Chip) `.c-chip` | 4519–4556 (reused 2193, 3549, 3724; Chat pillars) | input, filter, overflow `+N`, show less | input 24, filter 32 | input: disabled, remove hover/focus; filter: hover, active, `.is-active`, focus-visible, disabled, count | Chip 4364–4566 | Filter active = Obsidian. Input labels truncate. Overflow after 3. radiogroup / group roles | Phosphor, JS | M, JS | 15 |
| **Lists** `.c-list`, `.c-list-item` | 6106–6363 | leading icon/avatar/thumb/logo, rich and 2-line heading, trailing value/chevron/badge/control, timeline line, bleed | S / M / L leading | hover (hover devices), focus-visible, active, selected (`aria-current`), disabled, loading bones, empty, error, footer; reduced motion; forced colours | Lists 5838–6205 | Element decides behaviour (`a` opens, `button` acts, `label` toggles). Chevron only on links. Selected = `aria-current` | Badge, Checkbox, Switch, Button | L, no JS | 16 |

### 2.2 Forms, selection and data entry

| Component | CSS lines | Variants | Sizes | States in CSS | DS section | Key DS rules | Depends on | Size / JS | Order |
|---|---|---|---|---|---|---|---|---|---|
| **Search input** `.c-search-input*` | 194–265 (spin keyframe reused 4269, 5454, 5584, 5654) | Default, User Search, Item Search | 40px | focus/active, disabled, error; clear button; dropdown rows hover, empty, loading spinner; collapsed (selected) incl. disabled | Search input 7760–7831 | Clear button 24×24, out of tab order when empty. Dropdown radius-md, shadow-3, 8px offset | Input field, Phosphor, JS | L, JS | 17 |
| **Dropdown — Single select** `.c-dropdown*` | 2999–3075 (+ slots 4201–4254, empty 4263–4266, `.is-searchable` 4279, `.is-above` 4291) | outlined, borderless; searchable; drop-up | 40px | hover, open, has-value, read-only, disabled, error; row hover, selected, disabled | Dropdown 4596–4956 | Reuses Input field container. Panel = trigger width, max-height 320. combobox/listbox with `aria-activedescendant` | Input field, Phosphor, Search spinner, JS | M–L, JS | 18 |
| **Dropdown — Multiple select** `.c-dropdown-multi*` | 4067–4187 (+4279–4292) | outlined, borderless; searchable; group label; divider; footer | 40px | hover, open, filled, read-only, disabled, error; select-all; footer buttons | Dropdown 4596–4956 (option 4747–4859) | Checkbox only, no row fill. Indeterminate for Select All only | Single select, Checkbox, JS | L, JS | 19 |
| **Radio Card** `.c-radio-card*` (Radio variant) | 3098–3212 | 1/2-up, 3-up | — | hover (hover devices), selected (`:has(:checked)`), focus-visible, disabled, group error; reduced motion; forced colours | Radio › Radio Card 7670–7759 | Selected = 2px Obsidian, shadow-3. Focus ring on card. Error on enabled unchecked only | Card, Radio, Badge, `CollabriumRadioCard.sync` | M, small JS | 20 |
| **Quantity selector** `.c-quantity-selector*` | 5975–6104 | default; read-only (lock); type-only | default 40, compact 32 | error, focus-within, disabled, read-only, button pressed/holding, limit `aria-disabled`; coarse-pointer 44px; forced colours | Quantity selector 7484–7646 | Input field recipe. Ghost icon sm buttons with `tabindex=-1`. `role=spinbutton`. Errors shown, never silently clamped | Button, Input field, `CQuantitySelector` | M, JS | 21 |
| **Slider** `.c-slider*` | 4470–4517 | single, range | default, compact | thumb hover, active, focus-visible, disabled; tooltip visible/hiding; reduced motion | Slider 8287–8402 | Track 4px (2 compact), thumb 20px (16), 2px Obsidian, shadow-2/3. Range thumbs never cross | JS | M, JS | 22 |
| **Date picker** `.c-datepicker*` | 3805–3821 | single, range | 40px only | day hover, today, selected, range start/end, disabled | Date picker 4567–4595 | Trigger sm/md/lg. 36×36 days. Range footer (Secondary + Primary). Panel 8px below | Button, Phosphor, JS | M–L, JS | 30 |
| **FileUploader** `.c-uploader*` | 3859–4066 | zone, list, collapsed list, legacy aliases | — | dragover, error, disabled, full, read-only; row uploading, indeterminate, done, failed; coarse 44px; forced colours; reduced motion | FileUploader 5068–5381 | Matches the doc closely. Collapses after 5 rows | Button, Progress, `createUploader()` | L, JS | 31 |
| **Filters** `.c-filter*` | 3647–3726 | search, trigger, panel, nested list, tray | — | search focus, clear; trigger hover, open, active, focus-visible, disabled, count; panel open, right | Filters 5382–5551 | Trigger = Button Secondary. Panel fade + 4px slide. Option row = Multiple select row verbatim | Button, Checkbox, Chip, Search input, JS | L, JS | 32 |

### 2.3 Surfaces, feedback and navigation

| Component | CSS lines | Variants | Sizes | States in CSS | DS section | Key DS rules | Depends on | Size / JS | Order |
|---|---|---|---|---|---|---|---|---|---|
| **Toast** `.c-toast*` | 3214–3262 | neutral, success, danger, warning; message-only | — | entering, exiting; host stack; mobile band; lifts above Back to top; reduced motion | Toast 9368–9461 | 320–420px. Danger never auto-dismisses. Max 3 + queue | Button, Phosphor, JS | M, JS | 23 |
| **Info Banner** `.c-banner*` | 3264–3323 (+2170) | neutral, info, success, danger, warning, AI | — | AI gradient; reduced motion (AI) | Info Banner 5552–5706 | body2 in tone colour 80%. Max 2 actions. Dismissible vs persistent. Slide down + fade | Button, Phosphor, prompt-bar glow keyframe | S–M | 24 |
| **Stat / KPI card** `.c-stat*` | 3603–3645 | hero, trend up/down/flat, negative, secondary | — | none | Stat / KPI card 8404–8490 | h1 value (display for hero). 36px icon chip. Variants Static, Interactive, Negative, Secondary | Card, Goal bar | S–M | 25 |
| **Progress-to-Goal Bar** `.c-goal-bar*` | 4633–4778 | card, chart, table | small, default, large | none (read-only) | Progress-to-Goal Bar 7311–7483 | Target at 75%. Gap = 2px dashed Red. Size changes geometry only | Card, Progress Bar, JS | L, JS | 26 |
| **Table** `.c-table*` | 1662–1777 (+1588, 2522–2555) | standalone, embedded; sortable; checkbox column; bulk bar; action column; frozen columns; scroll | — | interactive hover, clickable, selected, sorted, skeleton; reduced motion; mobile | Table 8984–9242 | All columns left-aligned. Hover only on interactive rows. Sortable with Enter/Space. Action column 40/72/104 | Checkbox, Button, Progress shimmer, Empty state, JS | L, JS | 27 |
| **Pagination** `.c-pagination*` | 3728–3803 (+5743) | default, overflow (10+ pages) | 32px | page/nav hover, active, focus-visible, current, disabled; overflow select; mobile | Pagination 6922–7096 | Current = Obsidian, not clickable. Overflow reuses Dropdown Single select | Button tokens, Phosphor, JS | M, JS | 28 |
| **Back to top** `.c-back-to-top` | 5100–5135 (+3250–3259) | — | 32 (44 hit) | hidden, visible, hover, focus-visible; reduced motion keeps fade | Back to top 2146–2272 | Show >480px scroll, hide <240px. Shares `--c-back-to-top-y` with Toast and Action bar | Toast, Action bar, JS | S–M, JS | 29 |
| **SidebarNav** `.c-sidebar*`, `.c-pod-*`, `.c-nav-*`, `.c-user-menu` | 2652–2894 (+2918–2938) | expanded, collapsed rail, department strip, hover card, user menu, second-level nav | 240 / 72 | item hover, focus-visible, active, disabled, `.active`, `.soon`; mobile; reduced motion (partial) | SidebarNav 7952–8286 | No horizontal scroll. Child item 36px. User menu opens upward. `role=menu` keyboard | Badge, Phosphor, logo assets, JS | L, JS | 33 |
| **App Shell** `.c-shell*` | 2896–2973 | content grid with spans 1–4 | — | mobile overlay | App Shell 1866–2085 | Canvas warm. Nav inset 16. <1024 rail, <768 overlay. Grid 4 cols, gaps 24/16 | SidebarNav, PageHeader | M | 34 |
| **Action bar** (Toolbar) `.c-action-bar*` | 3325–3572 | users, picks; AI style | md → sm at ≤640 | open, instant; gated primary (`aria-disabled`); reduced motion; forced colours | Toolbar › Action bar 9462–9572 | z-index 40, 880px cap. Avatars 4 then +N. Names cut at 15 chars | Button, Chip, Toast, JS | L, JS | 35 |
| **Notes** `.npin`, `.npanel`, `.npeek`, `.np-*` | 1252–1588 (unprefixed by design) | single pin, stack, peek, panel, grid, single view, tinted | — | hover, focus-visible, open, opening, resolved; reduced motion | Notes 6785–6892 | Up to 4 per row; colour from position. Popover, no modal. Escape / outside click / scroll closes | Button, `.c-icon-btn`, Tooltip, Table, JS | L, JS | 36 |
| **Charts layout** `.c-chart-*` | 3823–3850 | grid, card, canvas wrap (tall), table view | — | table toggle | Chart chrome & marks 4202–4320 | Marks are set in Chart.js config, not CSS (see `src/charts/chart-setup.ts`) | Card, Button, Table, Chart.js | M | 37 |
| **Chart color mapping** `.c-chartmap-*` | 3852–3857 | swatches | — | — | Chart color mapping 4321–4344 | Guideline only | — | S | 37 |

### 2.4 Card variants

| Component | CSS lines | Variants / states | DS section | Depends on | Size / JS | Order |
|---|---|---|---|---|---|---|
| Selectable card | 290–302 | hover reveal, `.is-selected` | Card 2618–2672 | Checkbox | S, JS | 38 |
| USP card | 304–314 | — | Card 2529 | Button | S | 38 |
| Price summary card | 316–356 | row remove (hover/focus-within), overflow 0fr→1fr, show more, total | Card 2674–2785 | Empty state, Button, Chip | M, JS | 39 |
| Profile card | 358–429 | interactive, selected, kebab menu, platform rows | Card 2680–3028 | Checkbox, Tag | M–L, JS | 40 |
| Campaign card | 431–488 | hover lift, active, focus-visible, static, dragging; reduced motion | Card 3029–3115 | Tooltip | M, JS | 41 |
| Pacing card | 490–523 | — | Card 3281–3392 | Goal bar, Badge | S | 42 |
| Hero Card + Command brief modal | 1596–1639 | default, ribbon, risk, AI (tilt), selected; modal form | Card 3112–3277 | Button, Info Banner | M, JS | 43 |
| Media Ad Card | 525–711 | live, touch hint, compare toggle, spec swap, tilting, skeleton; forced colours; reduced motion | Card 3393–3545 | Card, Tag, Badge, Progress shimmer | L, JS | 44 |
| Metrics card (Media Ad variant) | 713–877 | clip playing, swap, bars, added | Card 3546–3628 | Media Ad Card, Progress Bar | L, JS | 45 |
| Entry Card (Character / Artefact) | 879–1173 | set grid, hover, focus-visible, active, disabled, playback, swap; forced colours; reduced motion | Card 3629–4072 | Card, Segmented Control | L, JS | 46 |
| Ad Placement Card | 1175–1261 | on, title-wrapped, facts, empty; hidden on touch | Card 4073–4201 | Card, Tooltip conventions | M, JS | 47 |

### 2.5 Modal variants

| Component | CSS lines | Variants / states | DS section | Depends on | Size / JS | Order |
|---|---|---|---|---|---|---|
| Tutorial Modal | 1787–2031 | spotlight, card, docking ≤767, coarse pointer; reduced motion | Modal 6233–6469 | Modal, `.c-icon-btn`, Button | L, JS | 48 |
| Media Ad Modal | 2033–2259 | layer, swing open/close, crumbs, specs, sizes, benchmark, related, compare toggle; touch; reduced motion; forced colours | Modal 6470–6582 | Modal, Button, Tag, Chip, Progress, Info Banner | L, JS | 49 |
| Metrics modal | 2261–2456 | two columns, clip, bars, places | Modal 6583–6672 | Media Ad Modal, Progress | M, JS | 50 |
| Compare modal | 2458–2609 | 2–4 formats, sticky header, scroll shadows, highest | Modal 6673–6784 | Modal, Table, Badge, Button | L, JS | 51 |

### 2.6 Stepper variant and AI Native

| Component | CSS lines | Variants / states | DS section | Depends on | Size / JS | Order |
|---|---|---|---|---|---|---|
| Timeline (Stepper variant) | 6365–6801 (must load after Lists) | sm/md/lg; 7 statuses; date above/below; opposite; positions; horizontal; details; show more; clickable body; loading; reduced motion; forced colours | Stepper › Timeline 8574–8948 | Lists, Button, Empty state, Badge, Tag, `cTimeline.init` | L, JS | 52 |
| Prompt input bar (floating, inline, model switcher) | 4780–5017 | revealed, collapsed, morphable, launched, typing, ghost line; inline; menu | AI Native 1302–1442 | Button, Chat window, pastel tokens | L, JS | 53 |
| Chat window (+ Jump to present) | 5019–5272 (+1880, 5814–5834, 5947) | open/fold, rail drawer ≤820, messages, actions, menu, jump | AI Native 963–1180 | Chip, Button, Badge, Prompt bar | L, JS | 54 |
| Loading State | 5274–5375 | drive, dots, orbit; reduced motion | AI Native 1182–1240 | pastel tokens | S, JS | 55 |
| Thinking | 5377–5478 | steps/coding, reasoning, search; active, expanded, done | AI Native 1698–1784 | Phosphor, Search spinner | M, JS | 56 |
| Streaming Text | 5480–5561 | text, caret, cite, actions, sources, follow-ups | AI Native 1447–1522 | Chat actions, Thinking keyframes | M, JS | 57 |
| Task Rows | 5563–5707 | capsules, list; 5 states; detail; failure + retry | AI Native 1524–1696 | Stepper indicator, Badge, Button | M–L, JS | 58 |
| Tool approval | 5709–5858 | card, viewport, options, custom field, slot | AI Native 1786–1864 | Card, Radio, Checkbox, Input field, Pagination, Button, Chat | L, JS | 59 |
| Permission Prompt | 5860–5973 | head, toggle, detail, actions, resolved; mobile | AI Native 1238–1300 | Card, Badge, Button | M, JS | 60 |

### 2.7 Shared utilities found in components.css

| Utility | Where | Note |
|---|---|---|
| `.sr-only` | CSS 5213, inside Chat window | Used across the system; belongs in `src/utils` or base.css when the first component needs it |
| `c-progress-shimmer` keyframe | CSS 4603 | Skeleton shimmer reused by Table, Lists, Timeline, Media Ad, Card |
| `c-search-input-spin` keyframe | CSS 240 | The system's only spinner; reused by Thinking, Task Rows, Dropdown |

---

## 3. Suggested conversion order

1. **Button.** Every other component's actions depend on it.
2. **Badge & Tag, then Checkbox / Radio / Switch.** Small, with no dependencies, and widely reused.
3. **Input field** (with Password and Textarea). Dropdown, Search, Quantity selector and Tool approval all reuse it.
4. **Card base, Empty state, Tooltip, ElementBadge, Progress Bar.** Each is small, and each is reused by many others.
5. **Modal base, Stepper, PageHeader, Back button, Tabs, Segmented Control, Chip, Lists.**
6. **Search input, Dropdown (Single, then Multiple), Radio Card, Quantity selector, Slider.**
7. **Feedback and data:** Toast, Info Banner, Stat, Goal bar, Table, Pagination, Back to top.
8. **Composite:** Date picker, FileUploader, Filters, SidebarNav, App Shell, Action bar, Notes, Charts.
9. **Card variants, then Modal variants, then Timeline, then AI Native.**

---

## 4. Inconsistencies between the three source files

These are verified by reading. Each item gives the CSS line first, then the DS line.

None of these is "fixed" in the React port. Visuals follow components.css, and anything the CSS does not have is left as a TODO.

### Button (affects Step 3)

| ID | What | CSS | DS |
|---|---|---|---|
| BTN-1 | Danger and Link variants are documented but have no CSS. CSS 5876 says "no .c-btn-danger exists" | none | 2342–2343 |
| BTN-2 | Disabled is one rule for all variants (Neutral-4 fill, white text). DS wants Secondary = Neutral-3 border + Neutral-4 text, Ghost = Neutral-4 text only | 46 | 2366 |
| BTN-3 | Secondary and Ghost have no `:active` state (so pressed looks like hover). DS wants Neutral-3 fill | 41 only | 2364 |
| BTN-4 | Loading is documented (centred spinner, width unchanged) but has no CSS anywhere | none | 2369 |
| BTN-5 | DS says icons are `icon-sm` (16px). CSS doesn't size them, so they inherit the button's font size: 14px at sm, 16px at md/lg | 31–34 | 2373, 2380–2386 |
| BTN-6 | `gap:6px`, the 32/40/48px heights and the 14/16px type sizes have no tokens. DS records the 16px as a deliberate override | 31–34 | 2348–2352 |
| BTN-7 | `[aria-disabled="true"]` has no base styling; Action bar and Media Ad Modal patch it locally | 2222, 3458 | — |
| BTN-8 | `.c-icon-btn` is cited as "Button's own" but the Button section never defines it, and it has no focus-visible, active or disabled state | 1784–1785 | 6240, 6808 |

### Badge (affects the Badge conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| BADGE-1 | Text colours differ. Neutral: CSS Neutral-9, DS Neutral-5. Success: CSS full Green `#00C26E`, DS `#00854c` ("darkened for AA"). Warning: CSS Neutral-9, DS `#9a5c00` | 1642, 1643, 1645 | 2286–2289 |
| BADGE-2 | Height: DS says 22px; CSS sets no height or line-height, so the badge renders 20px in the DLS gallery (line-height normal) | 1641 | 2277 |
| BADGE-3 | Type: CSS uses label3 size (11px); DS says caption (12px) | 1641 | 2278 |
| BADGE-4 | Info variant (Water tint, Water text) is documented but has no CSS | none | 2290 |
| BADGE-5 | Icon size: DS says `icon-micro` (14px); CSS has no icon rule, so icons inherit 11px (measured in the gallery) | 1641 | 2312–2313 |
| BADGE-6 | Contrast: Success text is about 2.1:1 and Error text about 3.2:1 on their tints (white page), both below AA 4.5:1 for 11px. DS fixes Success with a darker green but keeps full Red for Danger. DS also names the variant "Danger"; CSS names it `error` | 1643–1644 | 2287–2288 |

### Tokens and global

| ID | What | Where |
|---|---|---|
| TOK-1 | Chart series order: the Amber row says "series 6" and the Purple row says "series 5". Chart color mapping puts Amber 5th and Purple 6th. `chart-setup.ts` follows Chart color mapping | DS 113, 120 vs 332–334 |
| TOK-2 | Area fill: Chart color mapping says the `-bg` tint (8%). Chart chrome says `color-mix(..., transparent 88%)` (≈12%) | DS 332 vs 4247, 4258, 4297 |
| TOK-3 | "No chart library has been chosen yet" vs "Chart.js v4 has been adopted" | DS 4325 vs 4205 |
| TOK-4 | Mulish 800 is never loaded (the font link loads 400–700), but every heading uses 800 | DS 728 vs 209, 247 |
| TOK-5 | Bar radius uses a spacing token (`--spacing-4`) as a radius. The tooltip uses literal `cornerRadius: 8` and `padding: 10`; there is no token for either | DS 4241, 4232 |
| TOK-6 | `--shadow-focus` reads as a general focus token, but DS limits it to the Card-family halo; controls use a 2px Obsidian outline. tokens.css doesn't say so | tokens.css 160 vs DS 422–432 |
| TOK-7 | No global reduced-motion rule; each component sets its own. The shared principle is "drop the travel, keep the information" | DS 434–464, 697–707 |
| TOK-8 | No `body` rule anywhere (font size, weight, line-height, canvas) | DS 146, 156, 258 |
| TOK-9 | Tokens that exist but are not in any DS table: purple-bg pair, font names, weight scale, tracking, layout aliases, border-width pair, `--shadow-modal`. Values match | tokens.css 57–162 |

### Other components (for later steps)

Grouped by component. Line numbers are CSS / DS.

- **Input field:**
  - Label is label1 (14px) vs DS caption (12px) (129 / 5716).
  - Error border is 2px vs 1px (134 / 5726).
  - Error text weight is missing (136 / 5719).
  - No hover state.
  - sm and lg sizes are missing (5717).
  - The autofill override is missing (5794).
  - No fill colour set (132).
  - Focus hides the error (134).
  - Hard-coded `width:220px` (128).
  - Textarea is body2 vs body1/500 (191 / 9358), and has no error or disabled state.
- **Search input:**
  - The clear button has no focus-visible (215–221).
  - When focused, the error state loses the focus ring and shifts 1px (207/211).
  - The gallery-only class `.demo-hover` ships in the CSS (218).
- **Card:**
  - The header and footer gaps double to 24px vs the DS's 16 (275–284 / 2512, 2516).
  - The Element-tinted variant has no CSS (2528).
  - Accent and icon-chip are hard-coded to Salmon Pink and Navy (283, 287).
  - Interactive has no active or disabled state.
  - h4 vs h5 title mismatch (301, 285, 414 / 2650, 2866).
  - Selectable reveals on hover only (299).
  - Shadow-only focus rings have no forced-colours fallback (289, 390, 398, 428, 449).
  - Media Ad hover shadow isn't gated to hover devices (288 / 3458).
- **Hero Card:**
  - Selected media min-height of 160 is not implemented (1602 / 3195).
  - AI scale 1.05 vs 1.015 (1618 / 3464).
  - No keyboard focus.
  - No reduced-motion handling.
  - Broken `#command-brief` link (6319).
- **Badge:**
  - Neutral, Success and Warning text colours differ from DS (1642–1645 / 2286–2289). Success fails AA per DS 6763.
  - No height; label3 vs caption (1641 / 2277).
  - No Info variant (2290).
  - Tints are raw rgba.
- **Tag:** gold and fire text contrast likely below AA (1651, 1655), not measured.
- **Modal base:**
  - Differs on border, width (400 vs 480), title (h4 vs h3), body and footer padding, and footer gap (1779–1783 / 6210–6214).
  - No scrim class.
- **Table:**
  - Frozen shadow is a literal (1750 / 9145).
  - Only the 72px action width exists (1734 / 9126).
  - Bulk bar padding (1723 / 9115).
  - Not in CSS: sticky header, mobile min-width, priority hiding, scrollbar behaviour, empty min-height (9178–9206).
  - Sort headers have no focus-visible (1697).
- **Notes:**
  - Colour index naming is reversed vs DS order (1286–1289 / 6823).
  - No `:active` state.
  - No forced colours.
  - Literal values.
- **Empty state:**
  - Inline has no mobile padding (5045).
  - Inline is left-aligned vs centred in Table DS (2638 / 9203).
  - The link has no hover or focus.
- **Metrics modal:** forced colours unverified (6646).
- **SidebarNav:**
  - The collapsed count dot is missing (2700 / 8011).
  - Soon items still hover (2710 / 7973).
  - Child weight 400 vs 500 (2871 / 8164).
  - Child items have no active or disabled state.
  - User menu has no focus or active state and no animation (2829 / 8230–8233).
  - Overflow is clip vs hidden (2654 / 7967).
  - Reduced motion is incomplete (2790).
- **App Shell:**
  - The <1024px rail tier is missing (1957).
  - The grid has no narrow layout (2969).
  - 768 vs 767 breakpoints.
- **Tabs:**
  - No panel CSS (9284).
  - Fade colour hard-coded to Neutral-1 (2983 / 9294).
  - Native `disabled` is not styled (2997).
- **Dropdown:**
  - No visible active-descendant highlight (3068, 4201–4254 / 4721, 4925).
  - Stale min-width comment (3060).
  - Disabled option checkbox fill (4170 / 4758).
  - Footer buttons are bespoke, with no focus or active state (4176–4187 / 4775).
  - Stale chip-trigger comment (4069–4097).
- **Checkbox / Radio / Switch:**
  - No hover, focus-visible or active, and keyboard focus is invisible (3083).
  - Glyph is 12px vs icon-micro 14px (3087 / 4353).
  - Indeterminate and disabled are class-only.
- **Toast:** `min-width:320px` overflows a 320px phone band (3215, 3249).
- **Info Banner:**
  - Actions have no states (3273).
  - No enter or exit animation (5680).
  - Raw rgba tones.
  - Close position contradicts itself in the DS (5566 / 5572).
- **Tooltip:**
  - No caret, no 240px wrap, no other placements (3588 / 9582–9584).
  - z-index 2 vs "above modals" (9628).
- **ElementBadge:** glyph 17px vs 60% of 32 ≈ 19px; no size modifier (3594 / 4966).
- **Stat:**
  - The Interactive variant has no CSS (8433).
  - Literal gaps.
- **Filters:**
  - The trigger differs from Button Secondary (600 weight, no shadow) (3680 / 5420).
  - Disabled shows the count (3685 / 5517).
  - No active state.
  - Missing margins (5416, 5429).
  - Reduced motion is ignored (3694 / 5530).
  - Parallel option recipe (3701 / 5425).
  - Literals.
- **Pagination:**
  - The overflow select is native, not Dropdown (3783 / 7039).
  - No loading count style (6974).
- **Date picker:**
  - Day cells are about 34px vs 36 (3813 / 4583).
  - The trigger has no states and no sizes (3806 / 4577).
  - No footer or offset.
- **FileUploader:**
  - The coarse-pointer query differs (4036 / 5202).
  - Disabled row buttons are not styled (3983).
- **Slider:** five rules mix `::-webkit-` and `::-moz-` pseudo-elements in one selector list, so they are likely ignored in every browser. This affects the compact thumb, hover shadow, disabled thumb and reduced motion (4500–4515).
- **Prompt bar:**
  - Reduced motion doesn't stop the morph (4926 / 1353).
  - The model menu has no focus-visible (5010).
  - The composer has no focus indicator (4881).
  - The 12px caret is a literal (4996).
  - Mobile insets contradict the DS (4938 / 1344).
- **Goal bar:**
  - Geometry variables are undefined without a size class (4666–4668).
  - Heading weight is 700 vs 800 (4697 / 7352 vs 7395).
  - No forced colours.
  - Literals.
- **Progress Bar:**
  - No Purple, Turquoise or overflow tones (4575 / 7189–7202).
  - Shimmer goes to 350% vs 200% (4605 / 7230).
  - Shimmer colour is a literal (4602).
- **Back button:**
  - No truncation (4413 / 2123).
  - No disabled state.
  - Placement contradicts the DS (2055 vs 2098).
- **PageHeader:** `-lg` title not implemented (4427 / 6909).
- **Segmented Control:**
  - Min width is 32 for all segments vs 48 for text (4449 / 7886).
  - Computed heights are 32/26 vs 36/28 (7862).
  - The DS uses `group` with `radio` children (7922).
- **Chip:**
  - The input chip is not focusable and doesn't truncate (4528 / 4404, 4489).
  - Disabled still hovers (4532 / 4405).
  - Literal rgba (4556).
- **Chat window:**
  - Literal 800 weights vs h5/label3 700 tokens (5070, 5048).
  - Pillar selection is `.is-active` vs `aria-checked` (4544 / 1146).
  - Several controls have no `:active`.
- **Stepper:**
  - Stale border-width comment (4322).
  - `.is-disabled` is undocumented (4331).
- **Thinking:**
  - Status spans don't share a grid cell (5406 / 1719).
  - `.is-selected` vs `aria-pressed` (5448 / 1729).
  - Missing focus-visible.
  - Search mark contradicts itself in the DS (1730 / 1741).
- **Streaming Text:**
  - `.is-interrupted` has no CSS (1467).
  - Failed-stream error and retry have no CSS (1504).
  - Missing focus-visible.
- **Task Rows:** chevron duration base vs fast (5657 / 1581).
- **Tool approval:**
  - DS contradicts itself on the sent confirmation (1793 vs 1834).
  - Option row has no focus or selected state (5769).
- **Permission Prompt:**
  - Toggle has no focus-visible (5902).
  - Redundant `max-width` rule (5935).
- **Lists:**
  - Disabled `<label>` rows still get the pressed fill and the divider fade (6193–6232 / 6058).
  - The disabled chevron is not mapped to GrayText in forced colours (6359 / 6171).
- **Literal weight 500** at 406, 4446, 4467, 4512 and 5360, where `--weight-medium` exists.

---

## 5. Decisions

| ID | Decision | Why |
|---|---|---|
| D-1 | Visuals follow components.css wherever CSS and DS disagree (BTN-2, BTN-3, BTN-5) | The brief: "Keep the visual output identical to the current component.css" |
| D-2 | Danger and Link are not in Button's `variant` union | No CSS exists (BTN-1); inventing hover, active and disabled values would be a guess. Danger's documented white-on-Red is also about 3.6:1, below AA for 16px text. Logged as Q-BTN-2 |
| D-3 | Raw values with no token are declared once as component-scoped custom properties at the top of the component CSS (`--cui-button-height-md: 40px`), each marked TODO | Satisfies "no raw values in rules" without inventing tokens. tokens.css stays an exact copy |
| D-4 | 1px and 2px borders and outlines use `--border-width-sm` / `--border-width-md` | Tokens exist with those exact values, and DS already uses them for strokes and focus |
| D-5 | Icons use `@phosphor-icons/react` (SVG, 1em) instead of the Phosphor web font | Standalone package with no font CSS for apps to load. Same glyphs at the same 1em box. Icon props take the icon component (`leadingIcon={Plus}`), typed, not a string |
| D-6 | Button `variant` is required; `size` defaults to `md` | The DS marks md as default but names no default variant. Requiring it avoids accidental extra Primaries (one per region) |
| D-7 | Loading is built from the DS text plus the system's only spinner idiom (Search input: `spinner-gap`, duration-ambient, linear) | DS documents the state. Unresolved details are TODO (Q-BTN-3) |
| D-8 | The CTA beacon is a `beacon` prop (`off` / `on` / `static`) with the one-per-page rule enforced in Button.tsx; `onBeaconChange` replaces the `c-btn-beacon-change` DOM event | Same contract as `CBeacon.arm/disarm`, expressed as React state |
| D-9 | Classes use BEM-style parts (`.cui-button__icon`) plus data attributes for variant, size and state | Brief: `cui-` prefix and data attributes for variants |
| D-10 | base.css has no blanket reduced-motion rule | DS requires some fades and the beacon's reduced-motion ring to keep running (TOK-7); each component handles its own |
| D-11 | base.css sets no body font size, weight or line-height | No DS rule (TOK-8). Setting body1 (500) would change the weight components inherit |
| D-12 | `chart-setup.ts` uses Chart color mapping's series order and leaves Chart.js defaults where DS is silent | TOK-1. Unspecified values listed in Q-CHART-* |
| D-13 | Badge follows components.css for colours, type size and height (BADGE-1 to BADGE-3, BADGE-5); the variant is named `error`, as in CSS, not "Danger" | D-1 |
| D-14 | Badge tints keep the source's raw `rgba()` values, declared once as component-scoped custom properties (D-3) | `color-mix()` from the tokens was tried: it renders one RGB step off in Chrome (224,248,238 vs 224,248,237), so it would not match components.css exactly. Relative colour syntax gives the same result |
| D-15 | Badge `variant` is required; `iconWeight` defaults to `fill` | DS names no default tone (same reasoning as D-6). Every badge icon in preview.html is `ph-fill`, and DS says status icons are Tier 2 Fill |
| D-16 | Badge `children` accepts any React content, not only text | preview.html puts visually hidden context inside a badge (3407: "Highest" + sr-only text). The 20-character limit is an authoring rule (DS), so it is not enforced in code |

---

## 6. Open questions

Leave these open until a designer answers. Each one has a TODO in the code that names its ID.

### Button

| ID | Question | Where |
|---|---|---|
| Q-BTN-1 | Should the DLS add tokens for control heights (32/40/48), the 6px icon gap, the 14/16px button type sizes and the 2px focus offset? They are local custom properties until then | `Button.css` top |
| Q-BTN-2 | Danger and Link variants: what are hover, active, focus and disabled? Is white on Red (≈3.6:1) acceptable for Danger? | not built |
| Q-BTN-3 | Loading: spinner size (icon-sm assumed), whether hover and press still change the fill while loading, and whether the spinner keeps turning under reduced motion (Thinking Rule 20 says spinners keep turning) | `Button.css` Loading |
| Q-BTN-4 | Disabled Secondary and Ghost: keep the shipped one-rule look, or adopt the DS table (BTN-2)? | `Button.css` Disabled |
| Q-BTN-5 | Secondary and Ghost pressed: keep the shipped hover-equals-pressed look, or add the DS's Neutral-3 (BTN-3)? | `Button.css` variants |
| Q-BTN-6 | Icon size: keep the inherited 14px at sm (shipped), or the DS's icon-sm 16px everywhere (BTN-5)? | `Button.css` icons |
| Q-BTN-7 | Should `aria-disabled` get a shared base style (BTN-7)? | — |
| Q-BTN-8 | In forced-colours mode, Primary and Ghost buttons show no outline (no border in the source), so they read as plain text. Shipped the same way; should they get a forced-colours border? | `Button.css` |

### Badge

| ID | Question | Where |
|---|---|---|
| Q-BADGE-1 | Should the DLS add tokens for the 2px vertical padding and the tinted fills and borders (Green 12/32%, Red 10/30%, Amber 14/38%)? Local custom properties until then | `Badge.css` top |
| Q-BADGE-2 | Height: keep the shipped 20px (inherited line-height), or set the DS's 22px (BADGE-2)? | `Badge.css` header |
| Q-BADGE-3 | Info variant: add the CSS from the DS table (Water at 10% fill, Water text, Water at 28% border)? Not built until then (BADGE-4) | `Badge.tsx` `BadgeVariant` |
| Q-BADGE-4 | Icon size: keep the inherited 11px (shipped), or the DS's icon-micro 14px (BADGE-5)? | `Badge.css` icon |
| Q-BADGE-5 | Contrast: adopt the DS's darker Success (and Warning) text colours, and what should Error text be to pass AA (BADGE-1, BADGE-6)? | `Badge.css` variants |
| Q-BADGE-6 | Type size: label3 11px (shipped) or caption 12px (DS) (BADGE-3)? | `Badge.css` base |

### Global

| ID | Question |
|---|---|
| Q-GLOB-1 | Body text defaults: should `body` set body1 (16/22/500)? (TOK-8) |
| Q-GLOB-2 | Fonts: the package does not load Mulish. Should apps load it with `next/font` (recommended in README) and include weight 800 (TOK-4)? |
| Q-GLOB-3 | SlideUp travel uses spacing-8 (DS 1089, 2222). Some components use 4px or 12px. Is 8px right as the shared default? |

### Charts

| ID | Question |
|---|---|
| Q-CHART-1 | Gridline width ("hairline", no px) |
| Q-CHART-2 | Tooltip `cornerRadius: 8` and `padding: 10` are literals with no token (TOK-5) |
| Q-CHART-3 | Does label3's uppercase apply to the tooltip body? |
| Q-CHART-4 | Chart animation duration and easing (none specified); reduced motion currently turns animation off |
| Q-CHART-5 | Area wash: `-bg` tint or 88% transparent mix (TOK-2)? |
| Q-CHART-6 | Not specified: horizontal bar thickness (20) needs the chart's orientation, so it can't be a global default. Doughnut cutout, interaction mode and number formats are also not specified |
