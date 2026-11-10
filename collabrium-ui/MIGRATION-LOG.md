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
| 3 | Checkbox | **review** | Converted 2026-10-23. Radio and Switch share its CSS block in the DLS but are separate components, left for their own review. See CHK-1 to CHK-6, Decisions D-17 to D-21 and Open questions Q-CHK-*. |
| 4 | Loading State (AI Native, 1 of 8) | **review** | Converted 2026-10-23. AI Native has eight parts; the other seven (Chat window, Permission Prompt, Prompt input bar, Streaming Text, Task Rows, Thinking, Tool approval) are not started. See LOAD-1 to LOAD-5, Decisions D-22 to D-26 and Open questions Q-LOAD-*. |
| 5 | Thinking (AI Native, 2 of 8) | **review** | Converted 2026-10-23. See THINK-1 to THINK-8, Decisions D-27 to D-33 and Open questions Q-THINK-*. Six AI Native parts remain (Chat window, Permission Prompt, Prompt input bar, Streaming Text, Task Rows, Tool approval). |
| 6 | Streaming Text (AI Native, 3 of 8) | **review** | Converted 2026-10-26. See STREAM-1 to STREAM-8, Decisions D-35 to D-42 and Open questions Q-STREAM-*. Five AI Native parts remain (Chat window, Permission Prompt, Prompt input bar, Task Rows, Tool approval). |
| 7 | Task Rows (AI Native, 4 of 8) | **review** | Converted 2026-10-26; Stopped state added the same day. See TASK-1 to TASK-8, Decisions D-43 to D-50 and Open questions Q-TASK-*. Four AI Native parts remain (Chat window, Permission Prompt, Prompt input bar, Tool approval). |
| 8 | Permission Prompt (AI Native, 5 of 8) | **review** | Converted 2026-10-26. See PERM-1 to PERM-8, Decisions D-56 to D-62 and Open questions Q-PERM-*. Three AI Native parts remain (Chat window, Prompt input bar, Tool approval). |
| 9 | Radio | **review** | Converted 2026-10-26. The plain Radio and a RadioGroup; Radio Card (3101–3214) waits for Card. See RADIO-1 to RADIO-5, Decisions D-64 to D-67 and Open questions Q-RADIO-*. Switch is still not converted. |
| 10 | Input field | **review** | Converted 2026-10-26: the plain field with its icon, adornment, success, required and counter parts. Textarea and Search input are separate components; Password field became Input field's `type="password"` (2026-11-06, row 54). See INPUT-1 to INPUT-8, Decisions D-68 to D-72 and Open questions Q-INPUT-*. |
| 11 | Textarea | **review** | Converted 2026-10-26. It extends Input field and takes its decisions (100% width, Neutral-5 placeholder, bold error, `hideLabel`, 1px error border). Password field and Search input still wait. See TEXTAREA-1 to TEXTAREA-5, Decisions D-73 and D-74 and Open questions Q-TEXTAREA-*. |
| 12 | Tool approval (AI Native, 6 of 8) | **review** | Converted 2026-10-26. See TOOL-1 to TOOL-8, Decisions D-75 to D-78 and Open questions Q-TOOL-*. Two AI Native parts remain (Chat window, Prompt input bar). |
| 13 | Prompt input bar (AI Native, 7 of 8) | **review** | Converted 2026-10-26: the floating bar, the inline composer and the model switcher. See PIB-1 to PIB-8, Decisions D-79 to D-83 and Open questions Q-PIB-*. One AI Native part remains (Chat window). |
| 14 | Chip (Filter chip, Input chip) | **review** | Converted 2026-10-27, as Chat window's pillar filter needs it. See CHIP-1 to CHIP-8, Decisions D-84 and D-85 and Open questions Q-CHIP-*. Chat window is next. |
| 15 | Chat window (AI Native, 8 of 8) | **review** | Converted 2026-10-27: `ChatWindow` and `ChatMessage` as one component. See CHAT-1 to CHAT-10, Decisions D-86 to D-90 and Open questions Q-CHAT-*. Needed Chip first (row 14). AI Native is complete. |
| 16 | Switch | **review** | Converted 2026-10-28. See SWITCH-1 to SWITCH-5, Decisions D-92 and D-93 and Open questions Q-SWITCH-*. |
| 17 | Charts (extra), batch 1: Line, Area, Stream, Step, Range | **review** | Built 2026-10-29 on Recharts as `@collabrium/ui/charts-extra`, in the Charts (extra) docs group. See XCH-1 to XCH-14, Decisions D-94 to D-98 and Open questions Q-XCH-*. Source: Amicro Mono charts (MIT). |
| 18 | Charts (extra), batch 2: Bar, Stacked bar, Waterfall, Bullet, Funnel | **review** | Built 2026-10-29. See XCH-15 to XCH-24, Decisions D-99 to D-101 and Open questions Q-XCH-7 to Q-XCH-12. Bullet is HTML and CSS, not Recharts. |
| 19 | Charts (extra), batch 3: Donut, Radial bar group, Radial gauge, Gauge arc, Meter | **review** | Built 2026-10-29. See XCH-25 to XCH-31, Decisions D-102 and D-103 and Open questions Q-XCH-13 to Q-XCH-16. |
| 20 | Charts (extra), batch 4: Scatter, Bubble, Heatmap, Treemap, Activity heatmap | **review** | Built 2026-10-29. See XCH-33 to XCH-37, Decision D-104 and Open questions Q-XCH-17 to Q-XCH-21. Heatmap and Activity heatmap are HTML and CSS, not Recharts. |
| 21 | Charts (extra), batch 5: Radar, Polar area, Pyramid, Sankey, Candlestick | **review** | Built 2026-10-29. See XCH-40 to XCH-46, Decision D-105 and Open questions Q-XCH-22 to Q-XCH-27. Pyramid is HTML and CSS, not Recharts. |
| 22 | Charts (extra), batch 6: Composed, Sparkline | **review** | Built 2026-10-29. See XCH-47, XCH-48, Decision D-106 and Open questions Q-XCH-28 to Q-XCH-32 (all answered 2026-10-29). Dither bar and Dither donut were built and then removed at the user's request; no Dither charts will be added. Amicro's KPI card chart is not built. |
| 23 | Motion, batch 1: Fade in, Slide up, Slide down, Slide left, Slide right, Collapse | **review** | Built 2026-10-29. Fade in, Slide up and Collapse already existed and now have pages; Slide down, left and right are new. See XMO-1 to XMO-4, Decision D-107 and Open questions Q-MOT-1 to Q-MOT-4. |
| 24 | Motion, batch 2: Blur text, Character stagger, Word reveal, Text reveal, Hover cards, Spotlight, Magnetic, Tilt, Cursor trail, Mouse follow | **review** | Built 2026-10-29. See XMO-5 to XMO-11, Decision D-108 and Open questions Q-MOT-5 to Q-MOT-9. |
| 25 | Motion, batch 3: Scroll progress, Scroll reveal, Sticky reveal, Page transition and the hooks useScrollProgress, useMousePosition, useStagger, useWebHaptics, useReducedMotion | **review** | Built 2026-10-29. See XMO-12 to XMO-17, Decision D-109 and Open questions Q-MOT-10 to Q-MOT-14. Amicro's toggle is not built (Switch covers it). |
| 26 | Motion, batch 4: Icon swap, Count up, Scramble hover, Focus blur, Text sweep, Media between text, Play pause morph, Search expand, Expanding tabs, Dock | **review** | Built 2026-10-29. See XMO-18 to XMO-24, Decision D-110 and Open questions Q-MOT-15 to Q-MOT-21. Not built: Add to cart, Dynamic island, Heart and shape morphs, Animated button, Frequency selector, and the physics and ui-interactions experiments (Q-MOT-20, Q-MOT-21). |
| 27 | Motion, batch 5: Card spread (eight layouts), Card carousel, Card cover flow, Card time machine | **review** | Built 2026-10-29. See XMO-25 to XMO-28, Decision D-111 and Open questions Q-MOT-22 to Q-MOT-24. This completes the Amicro animation port apart from what Q-MOT-20 and Q-MOT-21 leave out. |
| 28 | Card (base): Card, CardTitle, CardHeader, CardFooter, CardGrid, IconChip | **review** | Built 2026-10-30. See CARD-1 to CARD-5, Decision D-113 and Open questions Q-CARD-1 to Q-CARD-6. The card variants that have their own sections (Selectable, USP, Price summary, Profile, Campaign, Hero, Pacing, Media Ad, Entry, Ad Placement) are separate components and are not built. The docs site now uses Card and CardGrid for its own cards. |
| 29 | Selectable card (a variant of Card, not a separate component) | **review** | Built 2026-10-30 into Card: a card given a `selectLabel` carries the real Checkbox, now on the left (user, 2026-10-30). See SEL-1 to SEL-3, Decision D-114 and Open questions Q-SEL-1 to Q-SEL-4, all answered (and Q-CHK-6, now answered). Profile card keeps its own always-visible checkbox and is a separate component. USP card is next. |
| 30 | USP card (feature tile), a variant of Card | **review** | Built 2026-10-30 into Card: `minWidth="functional"` (280px), `CardList` (three check-circle points) and a Button as a direct child, full width. See USP-1 to USP-3, Decision D-115 and Open questions Q-USP-1 to Q-USP-3. Price summary card is next among the functional cards (it needs Empty state). |
| 31 | Empty state | **review** | Converted 2026-11-04: `EmptyState` with the Full-page, Section and Inline variants, the Error tone, Primary and Ghost actions (the real Button) and the inline link. Built before Price summary card, which needs it. See EMPTY-1 to EMPTY-5, Decision D-116 and Open questions Q-EMPTY-1 to Q-EMPTY-5. Approved as built by the user 2026-11-04 (Q-EMPTY-1 to Q-EMPTY-5 answered 2026-11-05). The body became optional outside Inline for Price summary card (Q-PRICE-6). |
| 32 | Price summary card (a variant of Card) | **review** | Converted 2026-11-04: `PriceSummaryCard`, built on Card (functional width, title, footer), the real Empty state and Button. Four rows, then "Show X more" with the display rules 1 to 9 from the DS (the gallery has no script for them). See PRICE-1 to PRICE-7, Decision D-117 and Open questions Q-PRICE-1 to Q-PRICE-11 (answered 2026-11-05). |
| 33 | Tag | **review** | Converted 2026-11-04: `Tag` with the five elements, Purple and Neutral, the 6px dot and an optional icon. Built before Profile card, which uses it for its tier badges. See TAG-1 to TAG-4, Decision D-119 and Open questions Q-TAG-1 to Q-TAG-4. Profile card is next. |
| 34 | Profile card (a variant of Card) | **review** | Converted 2026-11-04: `ProfileCard`, built on Card, the real Checkbox and Tag. Controls row (Select checkbox, kebab menu with its five actions), avatar with computed initials, name, Meta and Persona lines, platform rows with an abbreviated follower link and a computed tier. See PROFILE-1 to PROFILE-6, Decision D-120 and Open questions Q-PROFILE-1 to Q-PROFILE-9. |
| 35 | Tooltip | **review** | Converted 2026-11-04: `Tooltip`, wrapping one trigger: instant show and hide on hover and focus, a body portal above modals, top placement with flip and shift, plus the bottom, left and right placements and the 240px wrap from the DS; no caret (decided). Built before Campaign card, which uses it. See TOOLTIP-1 to TOOLTIP-7, Decision D-121 and Open questions Q-TOOLTIP-1 to Q-TOOLTIP-6. Campaign card is next. |
| 36 | Campaign card (a variant of Card) | **review** | Converted 2026-11-04: `CampaignCard`, built on Card (no border, 14px radius, `height: auto`) with the real Tooltip on the owner faces. Opens through the name's stretched link or button, as Card; `movable` and `dragging` for the board. See CAMPAIGN-1 to CAMPAIGN-6, Decision D-122 and Open questions Q-CAMPAIGN-1 to Q-CAMPAIGN-10. |
| 37 | Ad Placement Card (a variant of Card) | **review** | Converted 2026-11-04: `AdPlacementCard`, built on Card, wrapping the slot button. The gallery shows the card statically, so the behaviour (pointer and keyboard positioning, one at a time, sticky Escape, scroll and resize, touch) is built from the DS. See ADPL-1 to ADPL-4, Decision D-123 and Open questions Q-ADPL-1 to Q-ADPL-6. |
| 38 | Progress-to-Goal Bar | **review** | Converted 2026-11-04: `GoalBar` with the Card, Chart and In-table variants and three sizes. The gallery is static markup, so the scale, gap, headroom, re-base, colour walk, tag edge collision and the label row's Gap rule are computed from the DS. Built before Pacing card, which uses it. See GOAL-1 to GOAL-6, Decision D-124 and Open questions Q-GOAL-1 to Q-GOAL-11. Pacing card is next. |
| 39 | Pacing card (a variant of Card) | **review** | Converted 2026-11-04: `PacingCard`, built on Card, GoalBar (In-table, a Total and Target row) and Badge. The gallery hard-codes the badge, the percent and the footer; the card computes them from `value`, `target`, `day`, `days` and `metOnDay`. See PACING-1 to PACING-5, Decision D-125 and Open questions Q-PACING-1 to Q-PACING-12. |
| 40 | Entry Card (Character / Artefact) | **review** | Converted 2026-11-04: `EntryCardSet` and `EntryCard`. The gallery shows one Brief card per variant; the other four drawings, the swap and the playback scheduler (DS reference code) are built from the CSS and the DS. See ENTRY-1 to ENTRY-5, Decision D-126 and Open questions Q-ENTRY-1 to Q-ENTRY-9. |
| 41 | Info Banner | **review** | Converted 2026-11-04: `InfoBanner` with the six tones, dismissible and persistent, up to two actions (one for AI), and the slide-and-fade entrance and exit. Built before Hero Card, which uses it. See BANNER-1 to BANNER-6, Decision D-127 and Open questions Q-BANNER-1 to Q-BANNER-8. |
| 42 | Hero Card + Command brief (a variant of Card) | **review** | Converted 2026-11-05: `HeroCard` (Default, Risk, AI, Selected) and `CommandBrief`. The gallery shows Default and Selected only; Risk, AI, the tilt and the brief are built from the DS. See HERO-1 to HERO-5, Decision D-128 and Open questions Q-HERO-1 to Q-HERO-9 (answered 2026-11-05). |
| 43 | Media Ad Card (a variant of Card) | **review** | Converted 2026-11-05: `MediaAdCard` and `MediaAdCardSkeleton`. The gallery shows one card at rest; the families, missing data, Compared, the badge, touch, the tilt and the skeleton are built from the CSS and the DS. See MEDIA-AD-1 to MEDIA-AD-4, Decision D-129 and Open questions Q-MEDIA-AD-1 to Q-MEDIA-AD-8 (answered 2026-11-05). |
| 44 | Metrics card (a variant of Media Ad Card) | **review** | Converted 2026-11-05: `MetricsCard` and `MetricsCardSkeleton`, on Media Ad Card's shell (now shared internally as `MediaAdShell`). The gallery shows one card; the bar-count states, missing data, Added, the clip and the skeleton are built from the CSS and the DS. See METRICS-1 to METRICS-4, Decision D-130 and Open questions Q-METRICS-1 to Q-METRICS-10 (answered 2026-11-05). |
| 45 | Progress Bar | **review** | Converted 2026-11-05: `ProgressBar` (single, stacked, indeterminate; three sizes; header, trailing and inside labels; legend; entrance on mount). Media Ad Card's skeleton shimmer and Metrics card's bars now use it in place of their copies. See PROGRESS-1 to PROGRESS-5, Decision D-131 and Open questions Q-PROGRESS-1 to Q-PROGRESS-11 (answered 2026-11-05). |
| 46 | ElementBadge | **review** | Converted 2026-11-05: `ElementBadge`, the chip alone (named by `title`) or with the element's name and function (`showLabel`, `sublabel`); the glyph is fixed per element. See ELBADGE-1 to ELBADGE-4, Decision D-132 and Open questions Q-ELBADGE-1 to Q-ELBADGE-8 (answered 2026-11-05). |
| 47 | Modal / dialog (base) | **review** | Converted 2026-11-05: `Modal`, the panel from the CSS (title, close, body, footer) over a scrim, with Command brief's open and close contract (focus to the title, Tab trapped, Escape, scrim click, focus returned). Fades in and out; holds the page still while open. See MODAL-1 to MODAL-5, Decision D-133 and Open questions Q-MODAL-1 to Q-MODAL-10 (answered 2026-11-05). |
| 48 | Stepper | **review** | Converted 2026-11-05: `Stepper`, horizontal and vertical, every step's state from one `currentStep`, Error and Warning as flags whose message takes the description's slot, the 480px container rule. Matches the gallery's three steppers at 600px and 400px. See STEPPER-1 to STEPPER-3, Decision D-134 and Open questions Q-STEPPER-1 to Q-STEPPER-9 (answered 2026-11-05). |
| 49 | Back button | **review** | Converted 2026-11-06: `BackButton`, its own row above the page header, a real link (`href`) or button (`onClick`), Button Ghost's states. Matches the gallery in every state; 34px tall by decision (Q-BACK-4). See BACK-1 to BACK-4, Decision D-137 and Open questions Q-BACK-1 to Q-BACK-8 (answered 2026-11-06). |
| 50 | PageHeader | **review** | Converted 2026-11-06: `PageHeader`, title, subtitle and an actions row, flush in the layout. Matches the gallery's two headers exactly. Back button's docs now use it. See PAGEHEADER-1 to PAGEHEADER-4, Decision D-138 and Open questions Q-PAGEHEADER-1 to Q-PAGEHEADER-5 (answered 2026-11-06). |
| 51 | Tabs | **review** | Converted 2026-11-06: `Tabs`, the tab row with icon, count, active underline, hover, pressed, focus and disabled, the scrolling row and its edge fades, and panels that cross-fade (DS only). Matches the gallery's tab row exactly. The docs site's Preview / Code tabs now use it; its copied `.c-tabs` CSS and `Tabs.tsx` are deleted. See TABS-1 to TABS-5, Decision D-139 and Open questions Q-TABS-1 to Q-TABS-9 (answered 2026-11-06). |
| 52 | Segmented Control | **review** | Converted 2026-11-06: `SegmentedControl`, text or icon-only (with the tooltip), default and compact, the sliding pill, a disabled option or control. Matches the gallery's two controls exactly. See SEG-1 to SEG-5, Decision D-141 and Open questions Q-SEG-1 to Q-SEG-10. |
| 53 | Lists | **review** | Converted 2026-11-06: `List`, `ListItem` (link, button, control and static rows; icon, avatar, thumbnail and logo leading at S/M/L; heading, description, caption with icon or dot; value, badge, control, button and chevron trailing), `ListItemSkeleton`, `ListSection` (the Section header), `ListEmpty`, `ListError`, `ListFooter`; timeline, bleed, selected, disabled, busy. Matches the gallery's three cards exactly (Badge's 24px aside, decided D-142). See LIST-1 to LIST-7, Decision D-143 and Open questions Q-LIST-1 to Q-LIST-9. |
| 54 | Password field | **review** | Converted 2026-11-06 as a type of Input field (`InputField type="password"`; the user moved it there the same day, so there is no `PasswordField` component): the show/hide toggle and the 40px kept clear at the end, on Input field's own label, box, states, sizes and counter. Matches the gallery's field exactly, including the toggle's click behaviour. See PW-1 to PW-4, Decision D-144 and Open questions Q-PW-1 to Q-PW-4 (all answered). |
| 55 | Search input | **review** | Converted 2026-11-06: `SearchInput`, Default (with the gallery's loading and no-results panel), User Search and Item Search (a combobox list to pick one, collapsing to the choice), every state in the gallery. Matches the gallery's box, clear button, panel, rows, avatar, collapsed rows and focused box exactly. Behaviour the DLS doesn't define (the list's keyboard, roles, focus after picking) is built to the standard combobox pattern and flagged. See SEARCH-1 to SEARCH-8, Decision D-145 and Open questions Q-SEARCH-1 to Q-SEARCH-13. Next: a 6-digit OTP code for Input field (the user's request, 2026-11-06). |
| 56 | Input field: one-time code | **review** | Added 2026-11-06 at the user's request, not in the DLS: `InputField type="otp"`, six token-sized boxes over one real input, with Input field's label, helper, error, success, required and disabled. Designed in a draft and decided (Q-OTP-1 to Q-OTP-10, D-146). |
| 57 | Dropdown (Single and Multiple select) | **review** | Converted 2026-11-06: `Dropdown`, on Input field's own box: outlined and borderless, default, hover, open, filled, disabled, read-only, error; searchable; groups; the option row with its icon / avatar, description and meta slots; empty and loading panels; drop-up placement; the DS's keyboard and ARIA contract (combobox, listbox, `aria-activedescendant`, type-ahead, a polite live region for empty and loading). Multiple select (`multiple`, 2026-11-06): Checkbox's box in each row, "N selected", an optional Select all row, the Clear / Done footer, Tab into the footer. Both match the gallery's triggers, panels, rows, groups, dividers and footer box (decided differences aside). See DROP-1 to DROP-7, DROPM-1 to DROPM-8, Decisions D-147 and D-148, Open questions Q-DROP-1 to Q-DROP-8 and Q-DROPM-1 to Q-DROPM-7 (answered 2026-11-06). |
| 58 | Radio card | **review** | Converted 2026-11-06: `RadioCardGroup` and `RadioCard` (in the Radio folder, as the DS files it under Radio), on Card's own surface with Radio's circle and Radio group's legend, helper and error: 2-up and 3-up grids by container query, title, badge, description, meta, hover, selected, focus (on the card), disabled, group error, reduced motion, forced colours. The circle reads the radio's real `:checked` (no sync script). Matches the gallery's pair and every part built from the DLS's classes (the decided 8px dot and 24px Badge aside). See RC-1 to RC-7, Decision D-149 and Open questions Q-RC-1 to Q-RC-5 (answered 2026-11-06). Its docs are a section of Radio's page. |
| 59 | Quantity selector | **review** | Converted 2026-11-06: `QuantitySelector`, Input field's box with Button ghost icon-only sm − / +: default and compact, type-only, prefix and unit, the width reserve (measured, so the box never changes width and "RM" hugs the digits), focus, error, disabled, read-only with its lock, limits, press-and-hold, coarse-pointer 44px, forced colours. The `CQuantitySelector` script rebuilt in React: validation on Enter / blur with the DS's messages (never clamped), comma formatting, off-step snapping, shorthand, the keys. Matches the gallery's five specimens and compact, type-only and disabled built from its classes (the decided 1px error and bold error text aside). See QTY-1 to QTY-8, Decision D-150 and Open questions Q-QTY-1 to Q-QTY-5 (answered 2026-11-06). |
| 60 | Stat / KPI card | **review** | Converted 2026-11-10: `StatCard` and `StatGrid`, on Card's own surface: label, value (h1, hero at display), trend (up, down, flat, with its period), icon chip, footer, description, negative; Secondary (h4 value, unit, goal rail with its achieved line); Interactive (Card's stretched action); a sparkline slot. Matches the gallery's six tiles (Card's decided 40px chip, the 14px trend arrow, the AA text green and the goal bar's decided 2px overhang aside). Group: Cards. See STAT-1 to STAT-7, Decision D-152 and Open questions Q-STAT-1 to Q-STAT-7 (answered 2026-11-10). Everything after the value sits at the bottom of the tile (the user's call, 2026-11-10). |
| 61 | Slider | **review** | Converted 2026-11-10: `Slider`, single and range, on native range inputs: track and Obsidian fill, the 20px thumb (shadow-3 on hover and drag), the value tooltip, min and max labels, a static value, compact and disabled; `format` (number, RM, percent) writes every value the same way, including `aria-valuetext`. Range clamps the moved thumb at its partner, keeps the last-moved on top and moves the nearer thumb on a track click. Matches the gallery's two sliders (the tooltip centred on the thumb and the selector fixes aside). See SLIDER-1 to SLIDER-12, Decision D-153 and Open questions Q-SLD-1 to Q-SLD-12 (answered 2026-11-10): Input field's 14px label, Tooltip's 12px sides and a 44px rail on touch screens. |
| 62 | Toast | **review** | Converted 2026-11-10: `Toast` (the surface), `ToastProvider` (the stack) and `useToast()` (`toast`, `dismiss`): four tones, title and / or message, an action, a close; fixed bottom right, a full-width band on phones; 3 at most with a first-in, first-out queue, 5s timers (Danger stays) paused on hover and focus; enter, exit and reflow on the motion library. Matches the gallery's toasts (the token line heights, the real close Button and the phone band aside). Newest on top (the user's call). See TOAST-1 to TOAST-11, Decision D-154 and Open questions Q-TOAST-1 to Q-TOAST-11 (answered 2026-11-10). |
| 63 | Table | **review** | Converted 2026-11-10: `Table`, standalone and embedded, data-driven (`columns`, `rows`): sorting on every column (a header button, `aria-sort`), checkbox selection with the bulk toolbar, the action column, frozen columns with edge shadows, a delayed loading skeleton, an empty slot, a sticky header, column priority and the 600px phone table. The docs site's props, keyboard and motion tables now use it, and its copied `.c-table` CSS is gone. Matches the gallery's three tables (token line heights, nowrap numbers and dates, and the real Checkbox aside). Added at the user's request: a total row and a "Scrolling left and right" docs example. See TABLE-1 to TABLE-16, Decision D-155 and Open questions Q-TABLE-1 to Q-TABLE-16 (answered 2026-11-10). |
| 64 | Pagination | **review** | Converted 2026-11-10: `Pagination`, Default (count, numbered pages in a 7-slot window with ellipses, Prev / Next, "3 of 6" on phones) and Overflow (Prev, page select, "of N", Next, optional Rows per page), switched at 10 pages and hidden when everything fits on one page; loading's stale count, an unknown total, opt-in page-size memory. Matches the gallery's two demos (the 16px Overflow caret and token line heights aside). Rows per page in both variants and pressed as hover, decided after review; Tool approval's step count now uses its indicator. See PAG-1 to PAG-11, Decision D-156 and Open questions Q-PAG-1 to Q-PAG-10 (answered 2026-11-10). |
| 65 | Back to top | **review** | Converted 2026-11-10: `BackToTop`, fixed bottom-right (stepping in past a scrolling frame's scrollbar, the user's addition), 480 / 240px thresholds read on mount and on scroll of the window and an optional `scrollRef`, smooth scroll (instant under reduced motion), the edge, safe-area, page-offset and Action bar clearance properties on `:root`, and the page flag that lifts Toast's stack (Q-TOAST-8, now built). Matches the gallery's button (box, border, shadow, icon, hover, hit area). The docs page has a live one with a toast to show the lift. See BTT-1 to BTT-6, Decision D-157 and Open questions Q-BTT-1 to Q-BTT-5 (answered 2026-11-10). |
| 66 | Date picker | **review** | Converted 2026-11-10: `DatePicker`, single (pick and close) and range (start, end, Cancel / Apply), on Input field's box, label, helper and error (sm / md / lg), with a leading Calendar Fill; a 280px calendar floating 8px under the trigger (above when there's no room, kept in the window); month arrows (Button ghost sm); a six-week grid table (`role="grid"`) with today, selected, range, unavailable (`min`, `max`, `isDateDisabled`) and outside-month days; the full keyboard (days, weeks, week ends, months, years). Matches the gallery's trigger and calendar (body1 500, the 16px panel, 2px gaps, colours, range corners; the token line heights aside). Day-first dates, Monday first, the range as one band, and month and year grids from the header (the user's addition, for dates years away). See DP-1 to DP-8, Decision D-158 and Open questions Q-DP-1 to Q-DP-12 (answered 2026-11-10). |
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
| **ElementBadge** `.c-elbadge` | 3595–3604 | fire, earth, water, gold, wood | 32 (doc: size prop) | none | ElementBadge 4957–4985 | radius-sm, 12% tint, glyph 60% of chip, `title` when no label | Phosphor | S | 8 |
| **Progress Bar** `.c-progress-*` | 4558–4631 (used by Card 843/873, Modal 2191–2454; shimmer keyframe reused 688, 1767, 6142, 6307, 6675) | default, tones (success, error, 5 elements), labels, stacked, indeterminate, legend | compact 4, default 8, large 16 | reduced motion, forced colours (4617–4621) | Progress Bar 7114–7310 | Default fill Obsidian. Stacked order = departments, then Purple, Turquoise, Neutral-4 overflow. Width transition duration-base | — | M, little JS | 9 |
| **Modal / dialog (base)** `.c-modal`, `.c-icon-btn` | 1782–1788 | — | — | `.c-icon-btn` hover only | Modal / dialog 6206–6232 | Overlay = shadow-overlay; 1px Neutral-3 border; shadow-4; ~480px; h3 title; spacing-24 body; one decision only | Button | S (no scrim/layer CSS) | 10 |
| **Stepper** `.c-stepper`, `.c-step*` | 4297–4408 (`.c-step-indicator` reused by Task Rows 5579–5705) | horizontal, vertical | — | completed, active, upcoming, error, warning, `.is-disabled`; container query 480 | Stepper 8491–8573 | State from one `currentStep`. Error only on Active, Warning only on Completed. 24px indicator | Phosphor | M, no JS | 11 |
| **PageHeader** `.c-pageheader` | 4422–4432 (+2925) | with actions row | — | none | PageHeader 6893–6921; App Shell › Page header 2023–2085 | h1 (32/38, 40/56 at -lg), body2 subtitle, no chrome | Button | S | 12 |
| **Back button** `.c-back-button` | 4409–4420 | — | — | hover, active, focus-visible | Back button 2086–2145 | Ghost style, label2, arrow-left icon-sm; label = parent screen, max 40 chars + ellipsis | Phosphor | S | 12 |
| **Tabs** `.c-tabs` | 2978–3000 | with count, scroll fades | — | active, hover, :active, focus-visible, `.is-disabled` | Tabs 9243–9348 | Active = 2px inset Obsidian underline. Disabled Neutral-4 at 40%. Panel cross-fade. URL persistence | Phosphor, JS | S–M, JS | 13 |
| **Segmented Control** `.c-segctl`, `.c-seg-*` | 4436–4471 | text, icon-only (with tooltip) | default, compact | selected (`aria-checked`), hover, active, focus-visible, disabled; reduced motion | Segmented Control 7832–7951 | 2–5 segments. 36 / 28px heights. Pill moves duration-fast / ease-standard | Phosphor, JS | M, JS | 14 |
| **Chip** (Input Chip, Filter Chip) `.c-chip` | 4519–4556 (reused 2193, 3549, 3724; Chat pillars) | input, filter, overflow `+N`, show less | input 24, filter 32 | input: disabled, remove hover/focus; filter: hover, active, `.is-active`, focus-visible, disabled, count | Chip 4364–4566 | Filter active = Obsidian. Input labels truncate. Overflow after 3. radiogroup / group roles | Phosphor, JS | M, JS | 15 |
| **Lists** `.c-list`, `.c-list-item` | 6106–6363 | leading icon/avatar/thumb/logo, rich and 2-line heading, trailing value/chevron/badge/control, timeline line, bleed | S / M / L leading | hover (hover devices), focus-visible, active, selected (`aria-current`), disabled, loading bones, empty, error, footer; reduced motion; forced colours | Lists 6050–6418 (corrected 2026-11-06; was 5838–6205) | Element decides behaviour (`a` opens, `button` acts, `label` toggles). Chevron only on links. Selected = `aria-current` | Badge, Checkbox, Switch, Button | L, no JS | 16 |

### 2.2 Forms, selection and data entry

| Component | CSS lines | Variants | Sizes | States in CSS | DS section | Key DS rules | Depends on | Size / JS | Order |
|---|---|---|---|---|---|---|---|---|---|
| **Search input** `.c-search-input*` | 194–265 (spin keyframe reused 4269, 5454, 5584, 5654) | Default, User Search, Item Search | 40px | focus/active, disabled, error; clear button; dropdown rows hover, empty, loading spinner; collapsed (selected) incl. disabled | Search input 7760–7831 | Clear button 24×24, out of tab order when empty. Dropdown radius-md, shadow-3, 8px offset | Input field, Phosphor, JS | L, JS | 17 |
| **Dropdown — Single select** `.c-dropdown*` | 2999–3075 (+ slots 4201–4254, empty 4263–4266, `.is-searchable` 4279, `.is-above` 4291) | outlined, borderless; searchable; drop-up | 40px | hover, open, has-value, read-only, disabled, error; row hover, selected, disabled | Dropdown 4808–5169 (corrected 2026-11-06; was 4596–4956) | Reuses Input field container. Panel = trigger width, max-height 320. combobox/listbox with `aria-activedescendant` | Input field, Phosphor, Search spinner, JS | M–L, JS | 18 |
| **Dropdown — Multiple select** `.c-dropdown-multi*` | 4067–4187 (+4279–4292) | outlined, borderless; searchable; group label; divider; footer | 40px | hover, open, filled, read-only, disabled, error; select-all; footer buttons | Dropdown 4596–4956 (option 4747–4859) | Checkbox only, no row fill. Indeterminate for Select All only | Single select, Checkbox, JS | L, JS | 19 |
| **Radio Card** `.c-radio-card*` (Radio variant) | 3098–3212 | 1/2-up, 3-up | — | hover (hover devices), selected (`:has(:checked)`), focus-visible, disabled, group error; reduced motion; forced colours | Radio › Radio Card 7881–7970 | Selected = 2px Obsidian, shadow-3. Focus ring on card. Error on enabled unchecked only | Card, Radio, Badge, `CollabriumRadioCard.sync` | M, small JS | 20 |
| **Quantity selector** `.c-quantity-selector*` | 5975–6104 | default; read-only (lock); type-only | default 40, compact 32 | error, focus-within, disabled, read-only, button pressed/holding, limit `aria-disabled`; coarse-pointer 44px; forced colours | Quantity selector 7695–7857 | Input field recipe. Ghost icon sm buttons with `tabindex=-1`. `role=spinbutton`. Errors shown, never silently clamped | Button, Input field, `CQuantitySelector` | M, JS | 21 |
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

### Checkbox (affects the Checkbox conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| CHK-1 | Glyph size: CSS draws the check and minus at 12px (`font-size:12px` on the box); DS says `icon-micro` (14px) | 3087 | 4358 |
| CHK-2 | No focus-visible rule. The native input is hidden (`opacity:0; width:0; height:0`) and nothing is drawn on the box, so a keyboard user sees no focus. DS lists no focus state either | 3083, 3087 | 4345–4363 |
| CHK-3 | No hover, pressed or error state in CSS or DS. Dropdown rows add their own hover | — | 4345–4363 |
| CHK-4 | Indeterminate has no rule of its own: it is `.on` plus a `ph-minus` glyph in markup (preview.html 2922). The unchecked example keeps a hidden minus (`visibility:hidden`) in the box | 3088 | 4357 |
| CHK-5 | Cards and tables use `span.c-checkbox-box[role="checkbox"][tabindex="0"]` with a hand-written `aria-checked`, not a native input (preview.html 1789, 1890, 1936) | 298, 395, 1713 | — |
| CHK-6 | The 2px top nudge is for a box beside a label. Dropdown (4240, 4253), Lists (6302) and the Table reset it to 0 | 3087 | 4358 |

### Loading State (affects the Loading State conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| LOAD-1 | Most of the thirteen rules cannot be written in CSS: the 400ms hold-back, the timer from a start timestamp, vanish at first token, one per view, the required Stop, the hand-off to Thinking. CSS only owns the grid, the colour cycle, label, timer styles and reduced motion | 5274–5375 | 1208–1223 |
| LOAD-2 | The Orbit centre cell is dimmed by a markup class (`.is-off`), not by the Orbit selector, which only stops its animation. Drive and Dots never use it | 5301, 5326 | 1206 |
| LOAD-3 | The gallery only demos Orbit. Drive and Dots are "fully styled but not demoed", so there is no source markup for them beyond the CSS | — | preview.html 1349 |
| LOAD-4 | The gallery's timer formatter prints "1m 60.0s" for the last 50ms before each whole minute (`(totalSeconds % 60).toFixed(1)` rounds up to 60.0). Seconds under a minute are unaffected | preview.html 22306 | — |
| LOAD-5 | No forced-colours rule, and the DS says nothing about it. Tested in Chrome: the grid is background-colour only, so forced-colours mode paints every cell the page colour and the grid disappears; the label and timer still show | 5274–5375 | — |

### Thinking (affects the Thinking conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| THINK-1 | Rule 14 says a timer shows from the first frame and folds into the past-tense header. The anatomy, the CSS and the gallery have no timer: the header is mark, status, chevron | none | 1765, 1712 |
| THINK-2 | Reduced motion: Rule 20 says "the spinner still turns on the current step". The CSS stops it (`.c-thinking-row-icon.is-spin{animation:none}`) | 5477 | 1771 |
| THINK-3 | The status spans get `grid-area:1/1` "so the header never reflows", but their container is `display:inline-flex`, so it has no effect. The swap is `display:none` / `inline`, so the header can change width when it flips | 5407–5408 | 1716 |
| THINK-4 | Rule 19 puts the live region on "the header only". The gallery puts `role="status" aria-live="polite"` on both status spans, which sit inside the header `<button>`. A button's children are presentational, so announcement support varies by browser and screen reader | gallery 1508 | 1770 |
| THINK-5 | A closed trace is `grid-template-rows:0fr` plus `opacity:0`, so its links and buttons (search and coding rows) stay in the tab order while hidden | 5428–5434 | — |
| THINK-6 | Rows have no focus-visible rule (the header has one). Links and buttons fall back to the browser's default focus ring | 5444–5448 | — |
| THINK-7 | The "+N more" line is only demoed in the Search variant, hidden until the run is done. Rule 11 applies to every variant | gallery 1564 | 1762 |
| THINK-8 | The timeline line's `-1px` is a correction for the web-font sparkle glyph's visual centre. The React glyph is an SVG; its centre was measured separately (see Q-THINK-1) | 5440 | — |

### Streaming Text (affects the Streaming Text conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| STREAM-1 | Rule 19 puts `aria-busy` "on the message". The gallery puts it on the text `<p>` (`.c-streaming-text`). Shipped as the gallery | gallery 1423 | 1505 |
| STREAM-2 | The sources button says "10 sources" while the list under it has 3 rows. The count is now the length of `sources` | gallery 1439 | — |
| STREAM-3 | Rule 21 says "no per-word fade", but no per-word animation exists in the CSS: the gallery appends plain text nodes. Nothing to remove; the cadence is dropped in script | 5556–5560 | 1502 |
| STREAM-4 | The sources list is hidden with `grid-template-rows:0fr` plus `opacity:0`, so its links stay in the tab order while closed (same as THINK-5) | 5532–5534 | — |
| STREAM-5 | Rule 18 (a failed stream keeps its text, shows an error and a retry) has no markup, CSS or gallery state | none | 1504 |
| STREAM-6 | Rules 11 to 13 (tables and code land whole, lists by item) have no markup or CSS. Only prose and citations are built | none | 1480–1481, 1499 |
| STREAM-7 | The action buttons are Chat window's `.c-chat-action`, "reused verbatim", and the caret and entrance animations are keyframes owned by Prompt input bar and Thinking. None of the three is converted, so the rules and keyframes are copied into StreamingText.css | 5181–5195, 4910, 5414, 5449 | 1468 |
| STREAM-8 | The gallery's Copy button only swaps its icon and never writes to the clipboard; the thumbs are a fake toggle. Rule 6 gives one cadence number (55ms) and says it is a fallback | gallery 22570–22600 | 1488 |

### Task Rows (affects the Task Rows conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| TASK-1 | Capsules are meant to be 8px apart (`.c-tasks--capsules{gap:8px}`; the DS says "spacing-8 gap"). The gallery markup puts the rows inside a `role="list"` wrapper, so the root's gap never reaches them: the old capsules touch (measured 0px). The gap is applied to the wrapper | 5599, gallery 22782 | 1291 |
| TASK-2 | The list variant's last row has no bottom border by `.c-tasks-row:last-child`. Every row is the only child of its `role="listitem"` wrapper, so the rule matches every row and the hairlines never show. Applied to the last list item instead. The gallery only demos Capsules | 5610 | 1293 |
| TASK-3 | Rule 6 (a failure opens itself and takes the open slot) is the only auto-open rule. The gallery also opens the task in progress, and closes it when it completes. Both are built | gallery 22825–22835 | 1546 |
| TASK-4 | The gallery adds "No retries left." to the spoken state of any failed row without a Retry, including a task that is blocked on the reader. That would say a retry was spent when none was ever offered. Only "Retry available." is spoken | gallery 22734 | 1552 |
| TASK-5 | A closed row's detail is `grid-template-rows:0fr` plus `opacity:0`, so Retry stays in the tab order while hidden (same as THINK-5) | 5662–5664 | — |
| TASK-6 | The head repeats the label, count and pill in a hidden phrase inside the same button, so a screen reader reads each twice. The visible copies are hidden from assistive tech instead | gallery 22744–22748 | 1552 |
| TASK-7 | The demo never reaches Rule 7's "exactly one in progress": at 3.4s the second task completes while the third is still `pending`, so for 1.2s nothing is in progress. The docs example starts the third task at that point | gallery 22826 | 1556 |
| TASK-8 | (Rule defined in D-51.) Below about 290px wide the label shrinks to nothing and the first row's chevron is clipped: the count, pill and chevron cannot shrink and only the label can. The DS gives 440px for a reason (five slots) but no narrow rule | 5607–5648 | 1555 |
| PERM-1 | `.c-card p` (0,1,1) beats the bare `.c-permission-prompt-scope` and `-resolved-note` (0,1,0), so both render at the body2 size (14px) with no margin, not the caption size and 12px margin their rules say. The label got a prefixed selector for this very reason and these two did not. Measured in Chrome. Built as rendered | 5919, 5942, 287 | 1340–1354 |
| PERM-2 | Deny is Ghost with `color:var(--color-red)` (Table's recipe, written when no Danger variant existed). Red on white at 14px bold is 3.2:1, under AA, and Danger now exists. Built with `--color-red-text` instead (Q-PERM-3, approved) | 5929 | 1353 |
| PERM-3 | The toggle has no focus style (the browser default shows). Added the system's Obsidian focus ring | 5905–5908 | — |
| PERM-4 | Pressing a decision removes the button that has focus, so focus drops to the page. The source does not handle it. Provisional: focus moves to the resolved row when the press came from a focused button (Q-PERM-1) | preview.html 23588–23660 | — |
| PERM-5 | The DLS spec has no live region. The outcome is announced by the focus move (above), not a status region | — | 1356–1380 |
| PERM-6 | Card is not converted, so the `.c-card` shell (and its `p` reset) is copied into the component's CSS | 276, 287 | 1340 |
| PERM-7 | Rule 9 (full column width inside Chat window) is a Chat window rule: `.c-chat-msg.is-ai .c-permission-prompt{max-width:none}`. Nothing to build until Chat window is converted | 5950 | 1374 |
| PERM-8 | The icon box is 25px tall in the DLS (the icon font's line box) and 24px with an SVG, so the card is 1px shorter (296 against 297px) | 5892 | — |
| RADIO-1 | Radio Card (components.css 3101–3214, DESIGN-SYSTEM.md 7770–7860) is a variant built on Card and was left out. The shared `.c-choice` row, `.c-radio-circle` and `.dot` (3084–3094) are ported | 3084–3214 | 7730–7860 |
| RADIO-2 | The source has no hover, pressed or focus state for the circle (the input is hidden). Added the Checkbox ladder (Neutral-2 then Neutral-3 on an empty circle; Obsidian to Neutral-8 then Neutral-7 on a chosen one) and the Obsidian focus ring | 3092–3094 | 7742–7760 |
| RADIO-3 | The dot has no forced-colours rule, so a chosen radio is indistinguishable from an empty one (the DLS says so itself, "the dot likely disappears in forced colours"). The dot is painted in `CanvasText` there | 3094 | 7845 |
| RADIO-4 | The DLS has no plain radio group, required marker or error state. Built from Checkbox group and the Radio card group's fieldset, legend, helper and error anatomy: `required` puts a Red `*` after the legend and the native `required` on every radio; the error replaces the helper, enabled unselected circles take a 1px Red border and `aria-invalid` | — | 7790–7810 |
| RADIO-5 | Raised by the DLS against Radio and not fixed there: the unselected circle's Neutral-3 border is about 1.4:1, below the 3:1 UI minimum. Kept as the DLS has it | 3092 | 7846 |
| INPUT-1 | The label is label1 (14px) at weight 700 in the CSS; DESIGN-SYSTEM.md says "caption token at weight 700". Built as the CSS has it | 130 | 5806 |
| INPUT-2 | `.c-field{width:220px}` is a demo default (Tool approval's own comment says so). The component fills its parent. Q-INPUT-1 | 129 | — |
| INPUT-3 | The error border is 2px with 11px padding in the CSS and 1px in DESIGN-SYSTEM.md. Built 1px (decided 2026-10-26, DLS updates owed row 23). A focused field in error shows the Obsidian focus border, because the focus rule wins on specificity in the source | 135 | 5808 |
| INPUT-4 | DESIGN-SYSTEM.md has sizes sm (32px) and lg (48px); the CSS has only the 40px md. Built all three. Q-INPUT-2 | 133 | 5805 |
| INPUT-5 | DESIGN-SYSTEM.md specifies a Neutral-5 placeholder and an autofill override; the CSS has neither (the browser's default grey placeholder is 117,117,117). Built both. Q-INPUT-3 | — | 5849, 5891 |
| INPUT-6 | The error text is Red at regular weight in the CSS (`.c-field-error .c-helper`), and DESIGN-SYSTEM.md says weight 700. Checkbox, Radio and Radio card group use 700. Built bold (decided 2026-10-26, Q-INPUT-4) | 137 | 5807 |
| INPUT-7 | The counter is its own row under the helper (`.counter-row`); both DESIGN-SYSTEM.md and the CSS comment say it shares the helper's line. Built as the CSS has it. Q-INPUT-5 | 179–185 | 5878 |
| INPUT-8 | The prefix padding is 28px and the suffix 32px in the CSS. Both are 28px (decided 2026-10-26). A one- or two-character adornment fits; `kg` leaves about 2px to the text | 176–177 | 5870 |
| INPUT-9 | `.required-label-icon` (an info icon beside the `*`) has no behaviour without Tooltip, and `.icon-btn` belongs to Password field and Search input. Neither is ported | 132, 166–168 | 5843 |
| TEXTAREA-1 | The CSS box is body2 at regular weight (it sets only a size, so the weight is the inherited 400), and DESIGN-SYSTEM.md says body1 at weight 500 ("shares its type tokens so the two align", although Input field is body2). Built body2 (decided 2026-10-26), so it aligns with Input field | 192 | 9443 |
| TEXTAREA-2 | The CSS draws no error and no disabled look for a textarea: `.c-field-error input` and `.c-field input:disabled` select inputs only. DESIGN-SYSTEM.md says Textarea has Input field's Default, Focus, Error and Disabled. Built from Input field's rules (1px Red border, bold Red text, Neutral-2 fill and Neutral-5 text). Q-TEXTAREA-1 | 135, 138 | 9447 |
| TEXTAREA-3 | `.c-field{width:220px}` is a demo default; the textarea's own `width:100%` fills it. The component fills its container, as Input field does (approved 2026-10-26) | 129, 192 | — |
| TEXTAREA-4 | The Neutral-5 placeholder is carried over from Input field (approved 2026-10-26). The autofill override is not: browsers do not autofill a textarea | — | 5849 |
| TEXTAREA-5 | Input field has a character count; DESIGN-SYSTEM.md gives Textarea none. Built it as an option the user shows or hides (`showCount`, off by default; decided 2026-10-26) | — | 9434–9451 |
| TEXTAREA-6 | The browser's resize grip (two diagonal lines) is drawn in the very corner and the box's 12px curve cuts across it. Redrawn with `::-webkit-resizer` as two thin Neutral-4 strokes pulled in from the corner (Chrome, Edge and Safari; Firefox keeps its own). The DLS has the same overlap | 192 | 9444 |
| TOOL-1 | Card and Pagination are not converted, so the `.c-card` shell (and its `p` reset) and Pagination's `.c-pagination-indicator` (forced visible, as the DLS does) are copied into the component's CSS | 276, 287, 3764, 5746 | 5895–5903 |
| TOOL-2 | The slot rules (5813–5857) and Rules 16, 17 and 19 (pinned above the composer, the composer's width, clamped to the chat window) belong to the Chat window that hosts the card. Not built; the usage doc gives them to the host | 5806–5857 | 5921–5925 |
| TOOL-3 | The options are the library's Radio and Checkbox instead of the old glyph markup, so a row's circle or box also reacts to hover and press (the states approved for those components). The written answer is the library's Input field and Textarea, so its placeholder is Neutral-5 and its error and sizes follow Input field. Everything else matches the DLS card in computed styles | 5766–5790 | 5895–5903 |
| TOOL-4 | Rule 5 says options and the written answer exclude each other on every question. The DLS demo only does it for single-choice questions: a typed answer does not clear a checked box, and ticking a box does not clear the text. Built as the rule says (decided 2026-10-26, Q-TOOL-2) | preview.html 23723–23740 | 5917 |
| TOOL-5 | On the last question, choosing a single-choice option sent after 480ms in the DLS demo (`advance()` sends on the last question). Rule 6 says Send is the one action that submits everything. Built so choosing only enables Send (decided 2026-10-26, Q-TOOL-1) | preview.html 23735–23745 | 5913–5915 |
| TOOL-6 | The DLS has no focus handling: after the options re-render (auto-advance, Continue, Skip) the focused control is gone. The new question takes focus, as the card's heading, with no ring, on every question change. decided 2026-10-26, Q-TOOL-3 | preview.html 23810 | — |
| TOOL-7 | Closing (Send, Skip on the last, dismiss) removes the card and whatever had focus. The component cannot know where focus belongs, so `onSend` and `onDismiss` are where the host moves it to the composer | preview.html 23700 | 5928 |
| TOOL-8 | The DLS measures the content height once per render (and again after fonts load, as its own comment explains). Built with a ResizeObserver on the body, so the height follows the content however it changes (a wrapping question, the Input becoming a Textarea, the font loading) | preview.html 23870–23890 | 5919 |
| PIB-1 | The Chat window rules that follow the model switcher (5021 on) belong to the Chat window. The DLS gallery demos only the collapsed pose (a static stage with the typing line finished); the scroll collapse, geometry sync, placeholder choreography and launch exist in DESIGN-SYSTEM.md as prose with no script, so they were built from that prose | 4784–5020 | 1431–1438 |
| PIB-2 | The AI mark is a `.c-btn` Primary icon-only `div` in the DLS. It must not be a control, so it is a span drawn with that size and fill from tokens (a `button` would be focusable and pressable) | 4883–4894 | 1408 |
| PIB-3 | The model menu is `position:fixed`, placed from the trigger, in the DLS. The floating bar has a `transform`, and a fixed element inside a transformed ancestor is positioned against it, not the viewport, so the menu would land in the wrong place. The DLS gallery works only because its stage sets `transform:none`. Built as a portal to the body, placed from the trigger | 5002–5020 | 1475–1500 |
| PIB-4 | The typing line's speeds are not specified. Typing is 35ms a character (the DLS demo's), the pause 5s (DS), the start 300ms (demo); deleting is 18ms a character and the guard 60s (both mine). Q-PIB-1 | preview.html 22727–22745 | 1432–1437 |
| PIB-5 | "A click anywhere on the bar (card or pill) opens the chat": the toolbar's buttons and the model menu do their own job and do not open it. Q-PIB-2 | — | 1431–1433 |
| PIB-6 | The model switcher's keyboard use is not specified (the DS gives outside press, Escape and choosing). Added: focus moves to the chosen model on open, the arrow keys move, and focus returns to the switcher on close. Q-PIB-3 | — | 1500–1520 |
| PIB-7 | Rule 18 (Tool approval) and Loading State Rule 9 say the composer's Send becomes Stop while the AI works or a decision is pending, "icon and label alike", but give no icon. Built `working`: the Stop icon (Phosphor, Regular) and the name "Stop". Q-PIB-4 | — | 1990 |
| PIB-8 | The DS does not say whether Send is disabled with an empty box, or whether Enter sends in the inline variant. Built: Enter sends when there is text; Send is never disabled (changed 2026-10-27: now disabled when empty, Q-PIB-5). Q-PIB-5 | — | 1440–1474 |

### Chip (affects the Chip conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| CHIP-1 | Single-select keys: the DS says the arrow keys move focus and Space or Enter chooses, and the gallery's single group has no roving tab stop. The DLS's working radio groups (Chat pillars, the SidebarNav layout sample) move **and choose** on the arrow keys, wrap, and keep one tab stop. Built the second: Left, Up, Right, Down move and choose, Home and End jump, one tab stop. Q-CHIP-1 | — | 4619–4623 |
| CHIP-2 | A disabled filter chip is `.is-disabled` (opacity .4, `pointer-events:none`) in the DLS, plus `aria-disabled` in Chat's pillars. Built `aria-disabled` and `data-disabled`, not focusable, skipped by the arrow keys. Q-CHIP-1 | 4551 | 4511 |
| CHIP-3 | The DS says an active filter chip has "no border"; the CSS gives it a 1px Obsidian border (same colour as the fill). CSS followed | 4547 | 4486 |
| CHIP-4 | In forced-colours mode an active chip loses its fill (the Obsidian background is overridden), so on and off look the same. Built `Highlight`/`HighlightText` for the active chip. Q-CHIP-2 | — | 4626–4630 |
| CHIP-5 | The DS asks for Delete or Backspace on a focused chip to remove it, and the DLS has no script for it (only the × is focusable). Built on the ×. After a removal the chip's button leaves the page, and focus is not moved (the focus rule). Q-CHIP-3 | — | 4620 |
| CHIP-6 | Disabled input chip: the DLS dims it (opacity .4) but its × still hovers and clicks. Built the × as a disabled button. Q-CHIP-3 | 4535 | 4496 |
| CHIP-7 | Input chips are `<li>` in a `<ul role="list">` as the DS says; the gallery's overflow demo uses spans in a plain div. The "+N" chip and "Show less" link sit in their own list item | 4531 | 4610 |
| CHIP-8 | The trailing count's on colour is the literal `rgba(255,255,255,.7)`; there is no token for white at 70%. Kept as written. Q-CHIP-4 | 4559 | 4528 |

### Chat window (affects the Chat window conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| CHAT-1 | The open and close choreography is prose only: the DLS has no `showChat` script (the gallery embeds the window in flow with a page-local override). Built from the prose: the fold with measured rectangles, the veil, focus in and out, the Tab trap, Escape, the `animationend` guard timer | 5036–5039 | 1240–1246 |
| CHAT-2 | The shell is `opacity:0` in the CSS and nothing brings it back once the fold class is removed (the `forwards` fill does it only while the class is on), and `.is-shown` is one class for both the veil and the rail and main. The DS says the veil comes in with the fold and the content "once the fold settles". Built: the veil on `[data-veil]`, the shell and the content on `data-phase="shown"`. Q-CHAT-5 | 5035, 5033, 5044 | 1066, 1226 |
| CHAT-3 | The conversation list keeps the DLS's `listbox` and `option` roles with every row a tab stop and no arrow keys, and the action row keeps `role="toolbar"` the same way. Roles dropped (decided). Q-CHAT-1 | — | 1074, 1103 |
| CHAT-4 | At 820px and below the closed rail drawer is only moved off-screen (`translateX(-100%)`), so its controls stay in the tab order. Built `inert` while closed. Q-CHAT-2 | 5249 | 1237 |
| CHAT-5 | The More options menu: the DS gives outside press and Escape only. Built focus on the first row on open, the arrow keys, Escape (returns focus to the trigger) and Tab to leave. Escape closes what is on top: menu, then drawer, then window. Q-CHAT-3 | 5209 | 1124 |
| CHAT-6 | Local values with no token: the veil `rgba(20,20,20,.42)` (the `--shadow-overlay` token is `rgba(8,8,8,.56)`), the title and pillar-label weight 800 (the type tokens say 700), 1200 and 820 (the window), 288 (the rail), 760 (the measure), 78% (the user bubble) and z-index 95. Q-CHAT-4 | 5032, 5051, 5073 | 1062 |
| CHAT-7 | At a window width near 272px (a 320px viewport) the inline composer's toolbar is 23px too wide and Send is clipped. The DLS does the same. Not fixed. Q-CHAT-6 | — | — |
| CHAT-8 | The footer says "Please double-check", which the DS itself flags against the house rule. Shipped as specified. Q-CHAT-7 | 5265 | 1096 |
| CHAT-9 | Forced colours: the DLS has no rule, so the window loses its edge and the selected conversation its only cue. Built a `CanvasText` border on the shell and a `Highlight` outline on the selected row. Q-CHAT-8 | — | — |
| CHAT-10 | Streaming Text carries its own action row (the DS says it reuses `.c-chat-action` verbatim), and `ChatMessage` has its own. Inside a chat, put plain text or Streaming Text without its actions in a `ChatMessage`: the two have not been joined. Q-CHAT-9 | — | 1553 |
| CHAT-11 | A turn that carries a citation is 1px taller than the DLS's (the Badge's icon is an SVG, not a font glyph, so the line box differs). Everything else measured identical | 5163 | — |
| CHAT-13 | The window fills the screen with no margin, radius or shadow at 600px and below, and clears the safe areas. The DLS floats it as a card at every width. Q-CHAT-10 | 5035 | 1062 |
| CHAT-12 | The title is an `h2` as the DS says; the CSS styles an `h5`. Same styles on the `h2` | 5073 | 1082 |

### Switch (affects the Switch conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| SWITCH-1 | The DLS has no hover, pressed or focus state for the Switch, and keyboard focus is invisible (the input is hidden and the track styles nothing). Built: the thumb's shadow deepens on hover (shadow-2) and pressed (shadow-3), with the track's fills unchanged, and the standard focus ring on the track. Q-SWITCH-1 | 3083, 3096 | 9068–9083 |
| SWITCH-2 | In forced-colours mode both tracks go to the page colour and the thumb vanishes, so the states can't be told apart. Built system colours (off: outlined track, dark thumb; on: Highlight track, HighlightText thumb). The DLS has no rule. Reduced motion: the move is instant (the DS has no rule). Q-SWITCH-2 | — | — |
| SWITCH-3 | The track (40×24), thumb (18) and the 3px inset have no tokens. Local custom properties; the thumb's on-position is derived from the three so they can't disagree. Q-SWITCH-3 | 3096, 3098 | 9066–9071 |
| SWITCH-4 | The DS says the label and description are "same as Checkbox", and the gap is 12px (wider than Checkbox and Radio's 8px); the row is centred, not top-aligned. Built as the CSS. No conflict | 3095 | 9066 |
| SWITCH-5 | The DLS markup puts the track before the hidden input; the library puts the input first (as Radio does) so `input:checked + .track` can drive the look. Visually identical | 3096 | — |

### Charts (extra), batch 1 (Line, Area, Stream, Step, Range)

Source: `Charts/Amicro--Micro-transitions--main/src/components/mono-charts/MonoRounded{Line,Area,Stream,Step,Range}Chart.tsx` (Recharts, Tailwind, monochrome). The DLS speaks for chrome and marks ("Chart chrome & marks", DESIGN-SYSTEM.md 4314–4400); Amicro supplies the shapes.

| ID | What |
|---|---|
| XCH-1 | The Amicro charts are demo cards: a dark or light card, a live readout, a toggle (timeframe, curve, tier filter) and sample data inside the component. Built: the chart only, driven by `data`/`series` props. The card, title and toggles belong to the host (Card is not converted yet) |
| XCH-2 | Dropped on purpose: the dark theme (the DLS has no dark chart theme) and the monochrome palette. Series take the DLS Chart color mapping; a single series defaults to Orange. Q-XCH-6 |
| XCH-3 | Chrome follows the DLS, not Amicro: no axis borders, the Neutral-3 hairline gridline on the value axis only (Amicro had a dashed, near-invisible grid), 12px footnote ticks in Neutral-5 (Amicro 9.5–10px), the DLS tooltip (Neutral-1, 1px Neutral-3 border, label2 title, label3 lines, no swatches; Amicro was a blurred dark tooltip with dots) and the DLS legend (bottom-left, 10px circles; Amicro was pill buttons) |
| XCH-4 | Marks follow the DLS Marks table: 2px lines (Amicro 2–3px), 3px points with a 2px Neutral-1 ring and 5px on hover (Amicro 3.5/4), and a flat 12% wash (Amicro a gradient from 22–38% to 0). Area, Stream and Line points are on (the DLS says Area points are the same as Line; Amicro's Area had none). Range has no points. Q-CHART-5, Q-XCH-5 |
| XCH-5 | Round line caps and joins (Amicro) are kept; Chart.js's default is butt and miter, and the DLS says nothing. Q-XCH-1 |
| XCH-6 | Curves: Recharts `monotone` (Line, Area, Range) and `natural` (Stream) as Amicro; Chart.js's `tension: 0.3` is a different spline and can overshoot. Q-XCH-2 |
| XCH-7 | Tooltip: the nearest category, showing every series, with a Neutral-3 cursor line (Recharts' axis tooltip). Chart.js's default shows only the hovered point. The DLS does not specify interaction (Q-CHART-6). Q-XCH-3 |
| XCH-8 | The legend is a row of real buttons that show or hide a series (as Chart.js's legend does, but keyboard-reachable), with `aria-pressed` and a struck-through label when hidden. Q-XCH-4 |
| XCH-9 | Every chart has the DLS's "View as table" (a secondary small Button, swapping the plot for a table of the same data). The DLS table is not converted, so its two rules (`.c-table`, `.c-table-embedded`) are copied into `charts-extra.css`: swap them for Table when it exists. Six rows are taller than the 260px floor, so the height changes a little when toggling: the DLS demo does the same |
| XCH-10 | Animation: Amicro ran 280ms and turned it off on phones; the DLS names no chart animation (Q-CHART-4). Built: `--duration-slow` and `ease-out` as a placeholder, off under reduced motion only (not on phones) |
| XCH-11 | Value axis: Amicro's Line padded the data by ±10 (a literal); built `yAxisStart: 'fit'` (Recharts `auto`) for Line as Chart.js does for lines, and `'zero'` for the others as Amicro did. Each is a prop |
| XCH-12 | Recharts draws an `svg role="application"` with a focus stop for arrow-key reading. It has no name by default; each chart passes the `aria-label` as the SVG `title`. The figure is also a named group |
| XCH-13 | No tokens: the 260px and 300px canvas floors (components.css 3841–3842), the tooltip's 8px radius and 10px padding (Q-CHART-2), the 10px legend swatch. Local custom properties on `.cui-chartx`. Q-CHART-7 |
| XCH-14 | Recharts is an optional peer dependency (`^3.10.0`). `src/charts-extra` never imports `chart.js` and `src/charts` never imports `recharts`; the build output was checked |

### Charts (extra), batch 2 (Bar, Stacked bar, Waterfall, Bullet, Funnel)

Source: `MonoRounded{Bar,StackedBar,Waterfall,Bullet,Funnel}Chart.tsx`. The DLS Marks table and per-chart-type rows speak for bars and stacked bars; waterfall follows its "Diverging" rows; bullet and funnel have no DLS spec.

| ID | What |
|---|---|
| XCH-15 | Bars: the DLS rule (4px radius on the outer end only, 24px thick at most vertically and 20px horizontally, hover 15% toward Neutral-9) replaces Amicro's pill bars (18px, 6px radius on every corner, 22% white second series). The value axis always starts at 0 and is not a prop. A Neutral-2 band marks the hovered category. Q-XCH-12 |
| XCH-16 | `orientation: 'vertical' | 'horizontal'`: Amicro's Bar named the switch but only drew vertical. Horizontal puts the category on the left and the only gridline on the (now horizontal) value axis, by role, as the DLS says |
| XCH-17 | Stacked bar: only the outer end of each stack is rounded, the last visible non-zero part, worked out per bar (DLS); Amicro rounded the bottom of the first part and the top of the last, with a fixed order. `totalKey` draws the rest in Neutral-3 as "Remaining" (DLS: the stack must sum to its label). Amicro had neither |
| XCH-18 | Stacked bar colours: different categories walk the series colours; parts of one measure take a single-hue `ramp` (lightest first): the element's -bg-strong tint, its pastel and its full colour, so three parts at most and five hues. The DLS says a ramp cannot clear 3:1, so the legend, tooltip and table name every part. Amicro used three opacities of white. Q-XCH-10 |
| XCH-19 | Waterfall: Amicro drew every step as a white pill, and its sample data (Yield, Infra, Grants) did not sum. Built from a change per step with running totals worked out: increases Green, decreases Red (the DLS diverging pair), totals Navy (the DLS names none). Steps are rounded on all four corners, totals on the outer end only. A fixed key (not toggles) names the colours. Q-XCH-7, Q-XCH-8 |
| XCH-20 | Waterfall data: a total is drawn from zero, a step from where the last one ended. A running total below zero is not supported (stated in the docs) |
| XCH-21 | Funnel: Amicro hid the value axis and drew 16px bars with an 8px radius; built the DLS horizontal-bar rule (value axis and gridline shown, 4px radius, 20px cap). The tooltip and the table add each stage's share of the first, which Amicro had in its data but never showed. Q-XCH-9 |
| XCH-22 | Bullet is HTML and CSS, not Recharts (as Amicro's was). Track Neutral-3 and pill (the DLS Progress Bar's track), target marker Obsidian, bar the series colour. The track (12px) and marker (4px) are Amicro's and have no token. The scale of each row ends at 115% of its target (Amicro's). The values are written out for assistive technology, and the bar and marker are hidden from it. Q-XCH-11 |
| XCH-23 | The chart frame was split in two: `ChartShell` (figure, legend, table, View as table; used by every chart, Bullet included) and `CartesianFrame` (the Recharts axes, gridline and tooltip). The legend can show fixed keys and the swatch colour is passed in, so ramp rungs and Neutral-3 work |
| XCH-24 | Bar tooltip lines, the stacked-bar remainder and the waterfall's running total are written through a `describe` function on the tooltip, so the lines are not just "name: value" |

### Charts (extra), batch 3 (Donut, Radial bar group, Radial gauge, Gauge arc, Meter)

Source: `MonoRounded{Donut,RadialBarGroup,RadialGauge,GaugeArc,Meter}Chart.tsx`. The DLS speaks for the Doughnut (2px Neutral-1 border, a same-hue ramp, max five segments, Marks table); it has nothing for the radial charts or the gauges.

| ID | What |
|---|---|
| XCH-25 | Donut: the DLS Doughnut row replaces Amicro's look: slices touch, with a 2px Neutral-1 border (Amicro: 5-degree gaps, 7px rounded slices, white at 100/72/42/20%) and walk one hue's ramp, lightest first, as the preview.html Doughnut does (the element's -bg, -bg-strong, pastel, full colour). The ramp has four rungs, so up to four slices; the DLS says five. The hole is 45% of the radius (Chart.js's default cutout is 50% of the outer; the DLS gives none), starting at 12 o'clock. Q-XCH-13 |
| XCH-26 | Donut centre: the total, and the hovered slice's value and name on hover (as Amicro); drawn as SVG text (h5 value, caption caption; first built at h3, which was too big, 2026-10-29) so it moves with the chart. Hiding a slice in the legend takes it out of the total. Chart.js draws no centre text. Q-XCH-14 |
| XCH-27 | Radial bar group and Radial gauge: one component each over a shared `RadialBars`. Amicro put a `RadialBar` inside a loop over the same data, so each ring was drawn once per item; built as one `RadialBar` with a ring per item. The first item is the outermost ring (Recharts draws the first innermost, so the data is reversed). Rings take the series colours (Amicro: mono tones), sit on a Neutral-3 track (Amicro 6% black), have 4px rounded ends (the DLS bar radius; Amicro 6–8px) and are 8px thick (the DLS Progress Bar's default track; Amicro's were thin lines). Start angle (9 o'clock) and the 180°/360° sweeps are Amicro's. Q-XCH-15 |
| XCH-28 | Gauge arc (240°) and Meter (180°): one shared `ArcGauge`, driven by `value` and `max`. Amicro's Meter drew 88 on the arc and printed 98.2 in the centre, and its Gauge arc had a Standard/Enterprise toggle; the centre is now the value, and the toggle is the host's. Track Neutral-3; ends 4px rounded; the white 2px border between value and track is the DLS slice border. No legend and no tooltip (the centre is the reading); the table has the figures. Q-XCH-16 |
| XCH-29 | Recharts 3.10's `<Label position="center">` inside a Pie hands over the whole chart's rectangle, not the Pie's centre, so a gauge's reading would sit in the wrong place. The readout is a child of the chart that reads `usePlotArea()` and uses the same percentages as the Pie's `cx` and `cy` |
| XCH-30 | Recharts overwrites a data row's `value` key with the plotted value, so the radial rows keep the measured value under `amount` (the plot uses a 0–100 `percent`) |
| XCH-31 | The tooltip can write its title from the hovered row (`title`), for charts with no category axis; the frame for round charts is `PolarFrame` |
| XCH-32 | `ChartThumbnail` (requested 2026-10-29): wraps any Charts (extra) chart and draws only its shape (no axes, gridlines, labels, legend, tooltip, centre reading, table button or draw-in), hidden from assistive technology. The Charts (extra) overview cards use it. The readout value was also made smaller (h5, 16px) on the Donut, Gauge arc and Meter |

### Charts (extra), batch 4 (Scatter, Bubble, Heatmap, Treemap, Activity heatmap)

Source: `MonoRounded{Scatter,Bubble,Heatmap,Treemap}Chart.tsx` and `MonoActivityHeatmap.tsx`. The DLS Marks table covers Scatter and Bubble (and the preview.html Scatter build); Chart color mapping's "Sequential" row covers the three shaded charts.

| ID | What |
|---|---|
| XCH-33 | Scatter and Bubble share `XYChart`. Scatter follows the DLS row and the preview.html build: 6px points (8px on hover) with a 1px Neutral-1 border, axis titles in label2 Neutral-5, the gridline on the vertical axis only, both axes fitted to the data. Amicro had sized nodes, a "Leaders" filter and a dark palette. Bubble follows its row: a 30% wash of the series colour, a 2px border in the full colour, radius from the third measure (6px up to 24px, read as area), three series at most. Both leave room at the axes' ends so the outermost points are whole |
| XCH-34 | The DLS exempts Bubble from "View as table" ("structurally no table"). Built with one anyway, since a table of x, y and size is how a screen-reader user reads it. Q-XCH-17 |
| XCH-35 | Heatmap (Amicro: grey squares in white opacities, a header readout, hover scale-up): cells now run continuously from the hue's -bg tint (lowest) to its full colour (highest), as the DLS Sequential row and its Doughnut ramp. They are rectangles that fill the grid (Amicro's were squares), with column labels (Amicro had none), a scale (lowest, ramp, highest) and an Obsidian outline on hover. `min` and `max` fix the scale. Drawn in HTML and CSS. Q-XCH-19 |
| XCH-36 | Treemap: Amicro placed four tiles by hand in a fixed 3 by 3 grid with preset spans and opacities, which is not a treemap. Built on Recharts' squarified layout, with tiles shaded by value on the hue ramp (largest darkest), 4px radius and a 2px Neutral-1 border. A tile too small for text (64 by 40px) shows none; the tooltip and table still give it |
| XCH-37 | Activity heatmap: Amicro made random demo data inside the component and printed fixed month names (Jan to May) whatever the dates. Built from a `data` prop of `{ date, count }`, with months and weekday names derived, five steps (Neutral-2, then the -bg-strong tint, the pastel, a mix of pastel and full, and the full colour; the four busy steps are the quartiles of the non-zero counts), a Less/More scale and a table with a row per week. The streak badge, the 20-week label and the cell scale-up are not part of the chart. The grid scrolls sideways inside its box on a narrow screen. Q-XCH-20 |
| XCH-38 | Heatmap, Treemap and Activity heatmap pictures carry no reliable text, so their table stays in the page, visually hidden, while the chart is showing (`srTable`); View as table shows it to everyone. Their cells are not focusable: the table is the keyboard and screen-reader route. Q-XCH-21 |
| XCH-39 | The cell tooltip for the two HTML heatmaps is a DLS tooltip placed above the hovered cell (`useCellTip`); pointer only |

### Charts (extra), batch 5 (Radar, Polar area, Pyramid, Sankey, Candlestick)

Source: `MonoRounded{Radar,Polar,Pyramid,Sankey,Candlestick}Chart.tsx`. The DLS Marks table covers Radar and Polar area; Candlestick follows the diverging Green and Red pair; Pyramid and Sankey have no DLS source.

| ID | What |
|---|---|
| XCH-40 | Radar follows the DLS row: 2px line, 12% wash, 3px ringed points, Neutral-3 rings and spokes, footnote axis names, ring values on an opaque Neutral-1 backdrop with 4px padding, axes fixed to a rating scale (default 0 to 10; Amicro 0 to 100, hidden values and a fixed 54px radius), up to six axes. The ring values run along the gap between two spokes so they do not sit on an axis name. Series colours, a legend that hides a polygon |
| XCH-41 | Amicro's "Polar" chart was concentric rings (a loop of `RadialBar`s over the same data), the same chart as Radial gauge. Built the DLS **Polar area** instead: equal wedges, radius = value, four Neutral-3 rings labelled on the vertical spoke, a 2px Neutral-1 border and one hue's ramp. Recharts has no polar-area chart, so the wedges are a `Pie` of equal values drawn as `Sector`s with a per-value radius, and the rings are a child drawn in two z-index layers (circles behind, labels above). Q-XCH-22 |
| XCH-42 | Polar area opacity: the Marks table says 30% for saturated rungs and 15% for the two pale tints; taken literally the pale wedges vanish on white. Built every wedge at 75% over the ramp without its faintest tint (-bg-strong, pastel, a mix of the two, full). Q-XCH-25 |
| XCH-43 | Pyramid (Amicro: bands in white opacities with hand-set widths of 34, 54, 74 and 94% that did not match its counts, darkest at the top): widths are now proportional to value, larger is darker on a hue ramp (as the other shaded charts), text is Neutral-9 or Neutral-1 by contrast, bands are 32px tall (Amicro's, no token) with a 4px radius. HTML and CSS; table always in the page. Q-XCH-24 |
| XCH-44 | Sankey: Amicro drew two fixed bezier paths between three boxes at hard-coded pixel positions. Built on Recharts' Sankey (computed layout) from `links` of `{ source, target, value }`: sources take series colours and their bands are a 30% wash, everything downstream is Obsidian, nodes are 12px wide with a 4px radius, first-column labels on the left, last-column labels on the right, middle ones on a Neutral-1 halo. Loops are not supported. Q-XCH-26 |
| XCH-45 | Candlestick: Amicro drew bodies and wicks in CSS (solid black up, grey hollow down, no axes). Built on Recharts with axes: up is a solid Green body, down a hollow Red body with a Neutral-1 fill (so direction never rests on colour alone), 2px wick, body at most 24px wide with a 4px radius, the value axis fits the data, a fixed key names the two. Amicro's timeframe toggle, price readout and volume are not part of the chart. Q-XCH-23 |
| XCH-46 | `inkOn(bg)` picks Neutral-9 or Neutral-1 by contrast for text on a shaded tile; the Treemap used a fixed threshold that put white on mid-Green (2.4:1), so it now uses it too. `PolarFrame` is the frame for every chart with no cartesian axes (Radar, Polar area, Sankey included) |

### Charts (extra), batch 6 (Composed, Sparkline)

Source: `MonoRounded{Composed,Sparkline}Chart.tsx`. The DLS Marks table covers "Mixed (Bar + Line)" and "Sparkline". Not built, by the user's decision (2026-10-29): Amicro's `MonoRoundedKpiCardChart` (Stat / KPI card is its own component) and every Dither chart (the user does not want Dither types in the library; Dither bar and Dither donut were built and removed).

| ID | What |
|---|---|
| XCH-47 | Composed follows the DLS "Mixed (Bar + Line)" row: bars as Bar (4px outer-end radius, 24px cap, hover 15% toward Neutral-9), line as Line (2px, 3px ringed points, no fill). When the measures differ in scale the line has a second axis on the right with the same hidden border and footnote ticks and no gridline (`lineAxis="own"`, the default); `shared` plots it on the bars' axis. Amicro hid its right axis (a fixed 6 to 10 domain), so the line's values could not be read; its toggle (all, rewards, yield) is the legend, and its headline total and APY belong to the host's card. One line only. Q-XCH-32 |
| XCH-48 | Sparkline follows the DLS row: 2px line, a gentle curve, no axes, gridlines, legend, tooltip or table, an optional 12% wash, an optional 3px end point, the owning element's colour. Not in `ChartShell`. It is an image (`role="img"`) named by `aria-label` plus a sentence on the trend ("Rising from 38 to 42.4 over 5 points, low 38, high 44."), so the picture is not the only way to learn it. It is 32px tall (`--cui-spark-height`; Amicro's row chart was 28px; Q-XCH-30). Amicro's three-row panel (name, value, status pill, "Live polling") is a list of Stat items, so only the line is ported |

### Card

| ID | Question | Where |
|---|---|---|
| Q-CARD-1 | A clickable card: the DLS styles a `div`. Built so the title is a real link (`href`) or button (`onClick`) stretched over the whole card (the card raises and shows the halo by `:has()` on that action), so it is keyboard-reachable, announced correctly, and other buttons inside the card still work. The alternative is a link or button around the whole card, which cannot hold other buttons. Keep? My recommendation: keep **Answered 2026-10-30: keep, after a picture of the stretched title action** | `Card`, `CardTitle` |
| Q-CARD-2 | The title is a real heading drawn as h5. The level is a prop (2 to 6), default 3. Is 3 the right default? My recommendation: keep 3 (a card normally sits under a section heading) **Answered 2026-10-30: keep 3 as the default** | `CardTitle` |
| Q-CARD-3 | The element colours: Fire is Orange, Wood Salmon Pink, Earth Green, Water Navy, Gold Amber. The accent, the chip (12% tint) and the full tint use them. The tint keeps the Neutral-3 border (the DS does not say). The chip is Water (Navy) by default, as the only chip in the CSS. Keep? My recommendation: keep **Answered 2026-10-30: keep** | `Card`, `IconChip` |
| Q-CARD-4 | Forced colours: the focus halo is a shadow, which is not drawn, so a focused card takes a 2px Highlight outline. Not in the DLS. Keep? My recommendation: keep **Answered 2026-10-30: keep** | `Card.css` |
| Q-CARD-5 | The header's 16px bottom margin is always there (the CSS); the DS says only when a subtitle or body follows. A header with nothing after it leaves 16px. Follow the DS and drop it when the header is last? My recommendation: yes, drop it when the header is the last child (the Timeline widget already overrides it to 0) **Answered 2026-10-30: follow the DLS text. The header drops its 16px bottom margin when it is the last thing in the card (built)** | `.cui-card__header` |
| Q-CARD-6 | No tokens for the 240px and 280px column floors, the 3px accent border, the 36px chip or its 12% tint. Local custom properties. Keep local, or ask the DLS for tokens? My recommendation: keep local **Answered 2026-10-30: keep local** | `Card.css` |
| Q-CARD-7 | The space between a header and the body under it was 24px (the CSS's 16px header margin plus the card's 8px gap); the DS says 16px. **Answered 2026-10-30 (user): 8px.** Built: no header margin, so the card's 8px gap is all there is. | `.cui-card__header` |

### Selectable card

| ID | Question | Where |
|---|---|---|
| Q-SEL-1 | The checkbox is also shown while the card has keyboard focus (`:focus-within`), and always on a touch screen (`hover: none`). The DLS shows it on hover only. Keep? My recommendation: keep: otherwise a keyboard or touch user cannot see or reach it **Answered 2026-10-30: keep (the recommendation)** | `Card.css` |
| Q-SEL-2 | A focused selected card shows the focus halo (shadow-focus) instead of the Selected shadow-3; in the DLS the Selected shadow hides the halo. The border stays 2px Obsidian. Keep? My recommendation: keep **Answered 2026-10-30: keep (the recommendation)** | `Card.css` |
| Q-SEL-3 | The checkbox is the real Checkbox (a labelled input, named by `selectLabel`) placed first in the card, so Tab reaches it before the title's link or button. The DLS draws a bare `span`. Keep? My recommendation: keep **Answered 2026-10-30: keep (the recommendation)** | `Card.tsx` |
| Q-SEL-4 | The checkbox sits on the left of a selectable card, 16px in, and all of the card's content (title or header, text, footer) sits in one column to its right, 16px clear of the box, so the description lines up with the heading (an icon chip moves along). The DLS puts it top right with 24px of room on the title's right. **Answered 2026-10-30 (user): left, 16px gap, content aligned.** | `Card.css` |

### USP card

| ID | Question | Where |
|---|---|---|
| Q-USP-1 | USP is a variant of Card (`minWidth="functional"` and `CardList`), not a separate component, as the DLS describes it and as Selectable now is. Keep? My recommendation: keep | `Card`, `CardList` |
| Q-USP-2 | The DS says the USP header is h4; the base title is h5, so the USP uses the base title (h5 look, heading level 3 by default). Keep? My recommendation: keep | `CardTitle` |
| Q-USP-3 | The call to action is the real Button as a direct child of the card: the card stretches it to full width and centres its label (`.cui-card > .cui-button`). Keep, or add a `fullWidth` prop to Button? My recommendation: keep (no prop; the card owns the layout) | `Card.css` |

### Empty state

| ID | Question | Where |
|---|---|---|
| Q-EMPTY-1 | The inline link (`.c-empty-link`) has no hover and no focus style in the source, so only the browser's own focus outline shows. Ported as it is. Should it take the DLS focus ring (2px Obsidian, the Button token) and a hover step (Neutral-7, as Button's `link` variant does)? Button's `link` itself is not reused because it is label2 (700) and this link is link2 (500). My recommendation: add the focus ring and the hover, keep link2 **Answered 2026-11-05: add the focus ring and the Neutral-7 hover, keep link2 (the recommendation)** | `EmptyState.css` `.cui-empty-state__link` |
| Q-EMPTY-2 | Inline padding on mobile: the DS says 12px all sides (below 768px); the CSS has no rule, so inline keeps 16px. Followed the CSS. Change to 12px? My recommendation: follow the DS (12px); it is a one-line rule the CSS simply missed **Answered 2026-11-05: follow the DS (12px) (the recommendation)** | `EmptyState.css` mobile block |
| Q-EMPTY-3 | Full-page min-height: the DS says `calc(100vh − nav height)`; the CSS ships 100vh and leaves the subtraction to the host. Followed the CSS (100vh). Because the component takes no `style`, the height is read from an inherited custom property, `--cui-empty-state-fullpage-min-height`, which a container (App Shell, once converted; the docs frame now, at 360px as the DLS gallery does) can set. Keep that, or add a prop? My recommendation: keep the custom property and have App Shell set it when it is converted **Answered 2026-11-05: keep the custom property; App Shell sets it when converted (the recommendation)** | `EmptyState.css` `[data-variant="fullpage"]` |
| Q-EMPTY-4 | The heading is a real heading drawn as h4, with the level a prop (2 to 6), default 3, as Card's title (Q-CARD-2). The DLS styles a bare `h4`. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `EmptyState.tsx` |
| Q-EMPTY-5 | No tokens for the 480px outer cap, the 380px and 320px body caps, the 240px section floor or the link's 3px underline offset. Local custom properties. Keep local? My recommendation: keep local (as Q-CARD-6) **Answered 2026-11-05: keep local (the recommendation)** | `EmptyState.css` |

### Price summary card

| ID | Question | Where |
|---|---|---|
| Q-PRICE-1 | The DS says the header is h4; the gallery draws the base card title (h5). Built with the base title (h5 look, level 3 by default), as Q-USP-2. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `CardTitle` |
| Q-PRICE-2 | The remove × is hidden until its row is hovered or focused (the source). On a touch screen there is no hover, so it is built to always show there (`hover: none`), as Selectable card (Q-SEL-1). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `PriceSummaryCard.css` |
| Q-PRICE-3 | While folded, the hidden rows are `inert`, so their × buttons can't be reached by Tab or read (the source leaves them focusable inside a 0-height box). As Thinking's closed trace (D-29). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `PriceSummaryCard.tsx` |
| Q-PRICE-4 | "Show X more" has no hover and no focus style in the source (the browser's own outline shows), although the Chip recipe it adapts has the focus ring. Ported as it is. Add the DLS focus ring (and a hover step)? My recommendation: add the focus ring, as Chip's show-less has; decide with Q-EMPTY-1 **Answered 2026-11-05: add the focus ring and the Neutral-7 hover (the recommendation)** | `PriceSummaryCard.css` `.cui-price-summary__more` |
| Q-PRICE-5 | After a focused × removes its row, the button is gone and focus would fall to the page. Built: focus moves to the next row's × (or the previous one at the end, or the card title when none is left), only when the press came from a focused button. This needs an exception to "focus moves only to a heading or an error message", like Permission Prompt's. Keep? My recommendation: keep **Answered 2026-11-05: keep, recorded as an approved exception in CLAUDE.md (the recommendation)** | `PriceSummaryCard.tsx` |
| Q-PRICE-6 | Empty: the DS reuses Empty state's icon and heading only ("No items added", a list glyph). Built with the Section variant (48px icon, 240px floor, 40px / 24px padding) and no body, so Empty state's body became optional outside Inline. The DS doesn't say which variant; the CSS reuses `.c-empty` "verbatim". Keep Section, and the optional body? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `PriceSummaryCard.tsx`, `EmptyState.tsx` |
| Q-PRICE-7 | Reduced motion: the source has no rule, and the DS says the list is "never instant". Built: under reduced motion the list opens and closes at once and the × appears at once, as Thinking's trace does. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `PriceSummaryCard.css` |
| Q-PRICE-8 | The DS says an item added while the list is open "animates in at the bottom"; there is no animation for it in the DLS. Not built: a new row appears. Design one (a fade on `--duration-base`), or drop the line from the DS? My recommendation: drop it from the DS **Answered 2026-11-05: drop it from the DS (the recommendation)** | `PriceSummaryCard.tsx` |
| Q-PRICE-9 | No token for the 320px scroll cap (Dropdown's list cap). Local custom property. Keep local? My recommendation: keep local, and share it with Dropdown when that is converted **Answered 2026-11-05: keep local (the recommendation)** | `PriceSummaryCard.css` |
| Q-PRICE-10 | Built as its own component (`PriceSummaryCard`, which renders Card) rather than a prop on Card like USP and Selectable, because it owns its items, the folding and the total. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `PriceSummaryCard.tsx` |
| Q-PRICE-11 | The markup follows the source: the folded rows are a second list inside the last item of the first, so a screen reader announces the first list as five items when it is open. Keep, or one flat list with the fold done another way? My recommendation: keep the source markup **Answered 2026-11-05: keep the source markup (the recommendation)** | `PriceSummaryCard.tsx` |

### Tag

| ID | Question | Where |
|---|---|---|
| Q-TAG-1 | The DS says a tag takes an optional leading 14px icon (an element motif, Fill) but not whether it sits beside the dot or replaces it; the CSS has no icon rule. Built: the icon takes the dot's place. Keep? My recommendation: keep (two leading marks would say the owner twice) **Answered 2026-11-04: keep (the icon takes the dot's place)** | `Tag.tsx` |
| Q-TAG-2 | No tokens for the 10px side padding or the 6px dot. Local custom properties. Keep local? My recommendation: keep local **Answered 2026-11-04: keep local** | `Tag.css` |
| Q-TAG-3 | Contrast: every element's text fails AA on its own tint at caption size: Fire 2.8:1, Wood 2.3:1, Earth 2.2:1, Water 4.0:1, Gold 1.9:1. The DLS fixed Purple by mixing its text 80/20 toward Neutral-9 (5.0:1) and Badge uses darker Green and Amber text tokens. Ported as it is. Mix each element's text the same way as Purple, keeping the dot full strength? My recommendation: yes, the Purple recipe for all five **Answered 2026-11-04: keep the colours as they are (no change)** | `Tag.css` |
| Q-TAG-4 | Forced colours: the tint and the dot are backgrounds, so neither is drawn; the label stays and the pill has no edge (Badge keeps a 1px border). Ported as it is. Add a transparent 1px border so the pill shows, and keep the dot as a system colour? My recommendation: yes **Answered 2026-11-04: yes, in forced colours only (normal mode unchanged). Built: a 1px CanvasText border with the padding 1px less a side, and the dot painted CanvasText** | `Tag.css` |

### Profile card

| ID | Question | Where |
|---|---|---|
| Q-PROFILE-1 | The kebab menu is `role="menu"` but, as in the source, opening it doesn't move focus into it and the arrow keys don't move between items (Tab does, since the menu follows the kebab). A `role="menu"` normally promises arrow keys, Home and End, and focus on the first item when it opens (that focus move would need an exception to the focus rule, like Search expand's). Add the full menu keyboard pattern? My recommendation: yes **Answered 2026-11-04: yes. Built: focus to the first item on open (added to the approved focus exceptions in CLAUDE.md), Arrow Down and Up wrap, Home and End, Tab leaves and closes** | `ProfileCard.tsx` |
| Q-PROFILE-2 | Menu items have no focus style in the source (the browser's own outline shows). Add the DLS focus ring, or the Neutral-2 hover fill on focus? My recommendation: the Neutral-2 fill plus the focus ring, as SidebarNav's menu will need too **Answered 2026-11-04: yes. Built: Neutral-2 fill and the 2px Obsidian ring drawn inside the item** | `ProfileCard.css` |
| Q-PROFILE-3 | Initials: the DS text says that after a naming particle "the last actual name word after the particle" gives the second letter, but its example ("Muhammad Amirul Haqimi bin Abdul Rahman" → MA) and the gallery use the first word after it (Abdul, not Rahman). Built to the example: the word right after the particle. Keep, and correct the DS text? My recommendation: yes **Answered 2026-11-04: yes (the word right after the particle); the DS text is owed a fix** | `profileInitials` |
| Q-PROFILE-4 | The Meta and Persona lines draw at 14px in the DLS gallery (`.c-card p` outranks their own class, so they get body2's size with the caption's 16px line height); the DS says caption (12px). Built as the CSS renders (14px), as Permission Prompt's scope note was decided (Q-PERM-2). Keep what is drawn, or follow the DS's 12px? My recommendation: follow the DS (12px): the text calls these supporting lines, and 14px on a 16px line height is cramped **Answered 2026-11-04: follow the DS, 12px. Built: the two lines are scoped to the identity block so they beat `.cui-card p`** | `ProfileCard.css` |
| Q-PROFILE-5 | The Numbers rule doesn't say how to abbreviate; the follower counts use the browser's compact format (720, 1.3K, 8K, 31K, 220K, 1.2M), which matches every gallery sample. One edge: 99,999 shows "100K" while its tier is Mid (under 100,000). Keep the compact format? My recommendation: keep, and accept the edge **Answered 2026-11-04: show 99K. Built: counts round down (`formatFollowers`), so a count never overstates or crosses a tier: 1,999 is 1.9K, 99,999 is 99K, 1,250,000 is 1.2M** | `ProfileCard.tsx` |
| Q-PROFILE-6 | Forced colours: shadow-focus is not drawn, so the kebab and the follower links take a 2px Highlight outline on focus (Card's Q-CARD-4). Keep? My recommendation: keep **Answered 2026-11-04: keep** | `ProfileCard.css` |
| Q-PROFILE-7 | The source's interactive card is a focusable `div` with no action. Built as Card does it (Q-CARD-1): give the card an `href` or `onOpen` and its name becomes a real link or button stretched over the card, which then raises on hover and takes the focus halo. Without either, the card doesn't raise. The DS says a card carries the hover only when it is selectable. Keep? My recommendation: keep **Answered 2026-11-04: keep. It matches Selectable card: the hover comes from the title's link or button, not from being selectable** | `ProfileCard.tsx` |
| Q-PROFILE-8 | No tokens for the 56px avatar or the 160px menu. Local custom properties. Keep local? My recommendation: keep local **Answered 2026-11-04: keep local** | `ProfileCard.css` |
| Q-PROFILE-9 | The source shows a hovered selected card at shadow-2 (the interactive hover outranks Selected's shadow-3); Selectable card keeps shadow-3 on hover. Built as the source. Keep, or match Selectable card? My recommendation: match Selectable card (shadow-3 holds) **Answered 2026-11-04: match Selectable card. Built: shadow-3 holds on hover; the focus halo still wins** | `ProfileCard.css` |

### Tooltip

| ID | Question | Where |
|---|---|---|
| Q-TOOLTIP-1 | The caret (a 6px triangle in the bubble's fill, centred on the trigger even when the bubble shifts) is in the DS but not in the CSS or the gallery. Built from the DS text. Keep? My recommendation: keep **Answered 2026-11-04: no caret. Removed; the bubble is a plain rounded rectangle, as the CSS** | `Tooltip.css` `::after` |
| Q-TOOLTIP-2 | The CSS never wraps (`white-space: nowrap`); the DS says one line up to 240px, then it wraps, growing taller only. Built from the DS (a 60-character tooltip would otherwise run past 300px). Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `Tooltip.css` |
| Q-TOOLTIP-3 | Bottom, left and right placements, the flip to the opposite side, the shift along it and the bottom fallback are in the DS; the gallery only does top, flipping to bottom. Built from the DS, as a `placement` prop. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `Tooltip.tsx` |
| Q-TOOLTIP-4 | Layer: the CSS gives the bubble `z-index: 2`; the DS says it sits above modals. The portaled bubble uses `--z-tooltip` (500, the token's "above modals" layer). The 10px side padding, the 240px width and the 6px caret have no token and are kept local. Keep both? My recommendation: keep **Answered 2026-11-04: keep (the recommendation). With the caret gone, only the padding and width stay local** | `Tooltip.css` |
| Q-TOOLTIP-5 | Forced colours: the Neutral-7 fill isn't drawn, so the bubble would be bare text with no edge and no caret. Built as Tag was decided (Q-TAG-4): a 1px border and the caret painted in the text colour, in forced colours only. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation). With the caret gone, only the border remains** | `Tooltip.css` |
| Q-TOOLTIP-6 | Page scroll hides the tooltip (DS), but the scroll the browser makes to bring a just-focused trigger into view would hide it the moment it appears. Built: while the trigger holds keyboard focus, a scroll moves the bubble with the trigger instead of hiding it; a tooltip shown by hover or touch still hides on scroll. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `Tooltip.tsx` |

### Campaign card

| ID | Question | Where |
|---|---|---|
| Q-CAMPAIGN-1 | The source tile is a `role="button"` article with the faces' focusable span inside it, which screen readers can't reach inside a button. Built as Card decided (Q-CARD-1) and as Profile card: the name is a real link (`href`) or button (`onOpen`) stretched over the card, so the card opens anywhere it is clicked, and the faces are a separate Tab stop above it. Its name is the campaign name, not "… — open campaign". It lifts on hover only when it opens something. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `CampaignCard.tsx` |
| Q-CAMPAIGN-2 | The faces span is focusable but has no role or name, so a screen reader announces nothing useful on it. Built: `role="img"`, named by the tooltip text ("Sarah K. · overseen by Lina M."). Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `CampaignCard.tsx` |
| Q-CAMPAIGN-3 | The faces have no focus style of their own (only the browser default). Built with the system ring: 2px Obsidian, 2px offset, round. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `CampaignCard.css` |
| Q-CAMPAIGN-4 | Pax and Quote are built as a description list (`<dl>`), so each value is read with its label; it looks the same. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `CampaignCard.tsx` |
| Q-CAMPAIGN-5 | Forced colours: the tile has no border and its shadow isn't drawn, so it would have no edge. Built: a 1px border in forced colours only, as Tag and Tooltip. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `CampaignCard.css` |
| Q-CAMPAIGN-6 | Literals with no token, kept local (the DS keeps them as scoped literals on purpose): the 14px radius, 32px mark and 9px radius, 22px faces with 10px initials, the -7px overlap, `#E6E0F5`, the 20px Lead tag, `.08em` tracking, the 12px calendar (`--icon-xs` is 12px but "never a standalone icon"), `#EDEDED` and the 10px/13px `#777777` label. Keep local? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `CampaignCard.css` top |
| Q-CAMPAIGN-7 | Formats the DS doesn't spell out: dates "12 Mar 2026 – 30 Apr 2026" (months as the DS writes them, "Sept"; both ends required); Quote "RM 72,500", with sen only when there are any ("RM 1,250.50"; Price summary always shows 2 decimals); Pax with comma thousands. Keep? My recommendation: keep **Answered 2026-11-04: the dates are fine; Quote always shows 2 decimals ("RM 72,500.00"), as Price summary card. Built** | `formatCampaignDate`, `formatRinggit` |
| Q-CAMPAIGN-8 | Not built: an unset value is a bare `—`, which screen readers skip or read as "em dash", so "Pax" is followed by nothing. Add hidden text ("Not set") after the dash? My recommendation: yes **Answered 2026-11-04: yes. Built: the dash stays on screen, with "Not set" for screen readers after it** | `CampaignCard.tsx` |
| Q-CAMPAIGN-9 | Moving a tile is drag only in the DS; WCAG 2.5.7 needs a way without dragging. The card leaves dragging to the board and the docs say the board must offer another way (a "Move to" control). Should the DS add that rule to the board? My recommendation: yes, as a board rule; the card stays as built **Answered 2026-11-04: yes. The DLS adds a board rule: a board that lets you drag a tile also offers a "Move to…" control (keyboard and pointer, no dragging). The card stays as built** | `CampaignCard.usage.md` |
| Q-CAMPAIGN-10 | `movable` defaults to true (the source's default is `grab`; `.is-static` is the opt-out). Keep? My recommendation: keep **Answered 2026-11-04: keep: `grab` by default** | `CampaignCard.tsx` |

### Ad Placement Card

| ID | Question | Where |
|---|---|---|
| Q-ADPL-1 | The gallery only draws the card; how it moves and hides is in the DS text alone. Built from the DS: 20px below-right of the pointer (flip, then a 12px gutter), beside a keyboard-focused slot (right, left, above, below), one at a time, Escape that sticks until you leave the slot, hidden on scroll, resize and touch, a 4px rise with the fade. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `AdPlacementCard.tsx` |
| Q-ADPL-2 | "· 5 built for it" appears in every DS example, but nothing says what shows when there is no such figure. Built: `built` is optional and that part is dropped ("14 of 38 units fit here"). Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `AdPlacementCard.tsx` |
| Q-ADPL-3 | The DS says a slot's name is "{title}, {where}". Built: the card names the slot that way when the slot has no `aria-label` of its own. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `AdPlacementCard.tsx` |
| Q-ADPL-4 | An `inline` prop draws the card in the page flow and visible, as the gallery's `.adplacement-demo` override does, so the docs can show it. For documentation only. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `AdPlacementCard.tsx` |
| Q-ADPL-5 | The 268px width and `line-height: 1` on the count have no token (the DS records them as one-offs; `z-index` uses `--z-tooltip`). Kept local. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `AdPlacementCard.css` |
| Q-ADPL-6 | Scrolling hides the card (DS), but tabbing to a slot below the fold makes the browser scroll it into view, which hid the card the moment it appeared. Built as decided for Tooltip (Q-TOOLTIP-6): while a slot holds keyboard focus, a scroll moves the card with the slot; a pointer-shown card still hides. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `AdPlacementCard.tsx` |

### Progress-to-Goal Bar

| ID | Question | Where |
|---|---|---|
| Q-GOAL-1 | The heading: the DS anatomy says 800, its own Typography table and the CSS say h5 at 700. Built at 700 (the CSS). Correct the anatomy row? My recommendation: yes **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.css` |
| Q-GOAL-2 | The In-table label is the target's value (anatomy and gallery), but the Typography table's sample reads "RM 6,000", the total. Built as the target. Correct the sample? My recommendation: yes **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.tsx` |
| Q-GOAL-3 | The gallery's Chart-variant label row leaves Gap out while the bar is short; the DS says Gap is in the row and gives way only to fit one line. Built from the DS (Gap shows). Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.tsx` |
| Q-GOAL-4 | No categories: the DS asks for "a placeholder line" saying there is no data, without the words. Built: "No data yet." when there is no footer. Is that the copy? My recommendation: yes **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.tsx` (TODO) |
| Q-GOAL-5 | Forced colours: the segments, swatches and target line are backgrounds and would vanish. Built: they keep their colours (`forced-color-adjust: none`) and the track takes a 1px outline (no layout change). Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.css` |
| Q-GOAL-6 | Literals with no token, kept local (the DS records them): the 560px cap, 10px swatch with a 2px radius and 1.5px dashed Gap edge, the 6/8/10px radii, the 5/7/9px and 3px overhangs, the 16px In-table band, the tag row's 14px, the 1.4 row line height, the 3px value gap and the 12px In-table line height. Keep local? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.css` top |
| Q-GOAL-7 | Short form: "RM10.2M", no space after RM (as the gallery; the content rule's full form is "RM 100,000"), one decimal rounded, a ".0" dropped ("RM2M"), B from 1 billion. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `formatGoalValue` |
| Q-GOAL-8 | Decimals: full values show as given, up to 2 decimals ("RM 6,000", "RM 1,250.5"). Campaign card's Quote always shows 2 ("RM 72,500.00"). Should a goal bar's money always show 2 decimals too? My recommendation: no, keep whole numbers as the gallery: these are targets and totals, read at a glance **Answered 2026-11-04: money always shows 2 decimal places ("RM 6,000.00"), since real figures are rarely round; a plain count shows as given; the short form ("RM10.2M") is unchanged. Built** | `formatGoalValue` |
| Q-GOAL-9 | The DS's `showLegend` is built as `labels`: `legend` (legend and target tag), `row` (Total · Gap · Target) or `none`, so the In-table variant can carry a row too, as Pacing card does. `compact` is kept. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.tsx` |
| Q-GOAL-10 | The component is named `GoalBar` (after `.c-goal-bar`); its docs page is "Progress-to-Goal Bar". Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.tsx` |
| Q-GOAL-11 | The gallery hand-sets every position; the scale, re-base, colour walk, tag edge collision and the row's Gap rule are built from the DS text and checked against the gallery's numbers. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.tsx` |

### Pacing card

| ID | Question | Where |
|---|---|---|
| Q-PACING-1 | The gallery's rail summary says "RM6.6M booked of a RM10.2M target, 65% to target." "Booked" is one domain's word (spent, delivered…). Built without it: "RM6.6M of a RM10.2M target, 65% to target." Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `PacingCard.tsx` |
| Q-PACING-2 | The footer is worked out, not written: "Day {day} of {days} · {rate} a day to reach target", the rate being (target − total) ÷ (days − day); once met, "· target met on day {metOnDay}". The DS gives the format only. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `PacingCard.tsx` |
| Q-PACING-3 | The rate is short form with "k" below 1M ("RM277k", as the gallery), rounded up so it never understates what is needed; Progress-to-Goal Bar's short form starts at 1M. Keep "k" for the rate? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `formatPacingRate` |
| Q-PACING-4 | The percent is rounded, but never shows 100 while the target is unmet (99.6% shows 99%, Red), so the badge's colour always agrees with its number. Keep? My recommendation: keep **Answered 2026-11-04: the percent is shown to 1 decimal place ("64.7% to target", "116.7%", "100.0%"); never 100.0% while unmet (99.9% at most). Built** | `pacingPercent` |
| Q-PACING-5 | Not specified: the last day with the target unmet (no days left for a rate). Built: "Day 31 of 31" alone (TODO). Suggest: "Day 31 of 31 · RM3.6M short of target". Which? My recommendation: the suggestion **Answered 2026-11-04: "Day 31 of 31 · RM3.6M short of target" (the suggestion). Built** | `PacingCard.tsx` (TODO) |
| Q-PACING-6 | The label row follows Progress-to-Goal Bar's (no space before the bold value), about 3px narrower than the gallery's. Keep one convention? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.tsx` |
| Q-PACING-7 | The rail width is computed (48.53% for TV), not the gallery's 48.75%. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `GoalBar.tsx` |
| Q-PACING-8 | The headline figure uses the short form from 1M ("RM11.4M"); below 1M it is the full value to 2 decimals, as decided for money (Q-GOAL-8). Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `PacingCard.tsx` |
| Q-PACING-9 | The label is a real heading, level 3 by default, drawn at h4 (the gallery uses an `<h5>`). Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `PacingCard.tsx` |
| Q-PACING-10 | Met, but no `metOnDay` given: the footer says "Day 18 of 31 · target met". Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `PacingCard.tsx` |
| Q-PACING-11 | The label: the DS says h4 (20px/800) and "don't correct it back to h5", but in the CSS `.c-card h5` (0,1,1) outranks `.c-card-pacing-label` (0,1,0), so the gallery draws it at 16px/700. Built at h4, as the DS (the selector out-ranks Card's). Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `PacingCard.css` |
| Q-PACING-12 | Should Progress-to-Goal Bar's "60% of target" also show 1 decimal place, to match Pacing card? My recommendation: yes **Answered 2026-11-04: yes. Built: `goalPercent`, shared with Pacing card ("60.0% of target", never 100.0% while short)** | `GoalBar.tsx` |

### Entry Card

| ID | Question | Where |
|---|---|---|
| Q-ENTRY-1 | The DS hands playback to the host with reference code. Built into `EntryCardSet`, as written: hover and keyboard focus loop a clip; an 8s idle tour of one 4s beat per card, once per page view; stops for reduced motion, a hidden tab or a card under half in view. `idleTour={false}` turns the tour off. Keep it in the component? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `EntryCard.tsx` |
| Q-ENTRY-2 | Research, Big idea, Package and Deck have no gallery markup. Built from the CSS and the DS table: Research is the lens beside three dot-and-bar findings (the last short); Big idea the bulb beside a strong bar, a bar and a short bar; Package two label-and-bar items (the second short) over the three-part mix; Deck the two back slides and the front with two bars. Please look at them on the docs page. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `EntryCard.tsx` |
| Q-ENTRY-3 | The set's `variant` applies to all its cards (a card's own `variant` is used only outside a set), so a set can never mix. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `EntryCard.tsx` |
| Q-ENTRY-4 | The look swap runs in the set when its `variant` changes, on the same buttons (focus kept). Under reduced motion it switches at once. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `EntryCard.tsx` |
| Q-ENTRY-5 | Only the five drawings ship. An Artefact entry for any other kind of work has no drawing. Should the DLS add more, or should a host be able to pass its own drawing? My recommendation: keep the five for now; add a drawing when a sixth entry exists **Answered 2026-11-04: keep (the recommendation)** | `EntryCard.tsx` |
| Q-ENTRY-6 | The swap's look switch is a compact Segmented Control (not converted); its labels are parked in the DS's Needs Input. The docs demo uses two Buttons for now. Fine until Segmented Control is converted? My recommendation: yes **Answered 2026-11-04: keep (the recommendation)** | `EntryCard.docs.tsx` |
| Q-ENTRY-7 | The idle tour's "once per page view" restarts if the set unmounts and mounts again (a route change back to the page). Keep? My recommendation: keep: that is a new page view **Answered 2026-11-04: keep (the recommendation)** | `EntryCard.tsx` |
| Q-ENTRY-8 | The base Card's hover shadow-2 isn't gated to `(hover: hover)` in the source (only the motion is), so a tap can leave shadow-2 behind until the next tap. Kept as the source. Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `EntryCard.css` |
| Q-ENTRY-9 | One-off values, kept local as the DS records them: the headroom formula (24px, 0.31, 21px, 112px), the stage and crop clamps, 112% and 4:3, the 6px rise and 2px lift and nudge, the 84px tile, the 6px bar and 4px corner, the deck's 58%, 16:9, 7deg and 12deg, the 80% / 45% bars at 85% / 40%, 55% / 33%, the 50ms stagger, the 0.4 disabled media, and the 280 / 640 / 860px container steps (literals: container queries can't read custom properties). Keep? My recommendation: keep **Answered 2026-11-04: keep (the recommendation)** | `EntryCard.css` |

### Info Banner

| ID | Question | Where |
|---|---|---|
| Q-BANNER-1 | Contrast: the message is the tone colour at 80%, which on its tint measures Info 2.99, Success 3.09, Warning 3.39:1 (AA needs 4.5; Danger is red, decided). Success also differs: the CSS is rgb(0,133,76), the DS `#007d47`. Built as the CSS. Option A: keep. Option B: full strength on the AA text tokens: Success `--color-green-text` (4.67), Warning `--color-amber-text` (4.88), Info Neutral-9, since Navy has no AA text token (Navy at full strength is 3.98). My recommendation: B **Answered 2026-11-05: option A for now: keep the CSS's 80% tone text (and Success's rgb(0,133,76)). Revisit later** | `InfoBanner.css` |
| Q-BANNER-2 | After a dismiss, focus was on the close button, which is gone, so focus drops to the page. The focus rule lets focus move only to a heading or an error. Built: nothing moves; the docs say to use `onDismiss` to send focus to the section's heading. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `InfoBanner.tsx` |
| Q-BANNER-3 | The actions take the system focus ring (the source has none). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `InfoBanner.css` |
| Q-BANNER-4 | "Escape dismisses the active dismissible banner": built as Escape while focus is inside a dismissible banner. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `InfoBanner.tsx` |
| Q-BANNER-5 | The close button is the real Button (ghost, sm, icon-only), as the DS says, in place of the gallery's `.c-icon-btn`: same 32px and hover, plus a focus ring. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `InfoBanner.tsx` |
| Q-BANNER-6 | Forced colours: the tints aren't drawn, so the banner takes a CanvasText border, and the AI wash and ring are hidden. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `InfoBanner.css` |
| Q-BANNER-7 | The entrance plays whenever a banner mounts, including one present when the page first loads. Keep? My recommendation: keep: it is a short, small move **Answered 2026-11-05: keep (the recommendation)** | `InfoBanner.tsx` |
| Q-BANNER-8 | The AI tone's rules are in the types: always dismissible, exactly one action. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `InfoBanner.tsx` |

### Hero Card

| ID | Question | Where |
|---|---|---|
| Q-HERO-1 | The DS notes a known gap: the card that opens the brief is a click-only `<div>`. Built: `onOpen` makes the heading a real button stretched over the card (as Card), so it opens from the keyboard; the CTA stays its own button. A Default or Risk card with `onOpen` raises to shadow-2 on hover, as Card's interactive cards. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `HeroCard.tsx` |
| Q-HERO-2 | The brief's close: the DS draws a bare 20px Neutral-5 X with no focus style. Built with the real Button (ghost, sm, icon-only: a 32px target, a focus ring). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `HeroCard.tsx` |
| Q-HERO-3 | The brief as a dialog: `role="dialog"`, `aria-modal`, named by its heading; opening moves focus to the heading (an approved focus target), Tab stays inside, closing returns focus to the opener. The DS has none of this. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `HeroCard.tsx` |
| Q-HERO-4 | Reduced motion (the DS is silent): no tilt, no arrow nudge, and the brief fades in place without the swing. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `HeroCard.css` |
| Q-HERO-5 | Forced colours (no source): every card and the brief keep a CanvasText edge; the ribbon keeps its colours; an openable card's focus is a Highlight outline. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `HeroCard.css` |
| Q-HERO-6 | One-off values with no token, kept local: the 80px ribbon box, 150px strip and 5px padding, the 112px and 160px media heights, 560px, the tilt's 800px, 4deg and 1.05, the brief's 1000px and -8deg, and the AI card's white-on-dark rgba values (the DS keeps them scoped). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `HeroCard.css` |
| Q-HERO-7 | Risk, AI (Dark), the tilt and the Command brief aren't in the gallery; built from the CSS and the DS. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `HeroCard.tsx` |
| Q-HERO-8 | The AI card shows a pointer cursor even with nothing to open (as the source). Show it only when the card has `onOpen`? My recommendation: yes, only with `onOpen` **Answered 2026-11-05: keep (the recommendation)** | `HeroCard.css` |
| Q-HERO-9 | The recommendation and source lines are `<p>`s with no margin rule, so the browser gives them 12px above and below (the card is 24px taller for it). Built to match. It looks unintended: the body line resets its margin. Drop the margins (the card's 8px or 16px gap would separate them)? My recommendation: drop them **Answered 2026-11-05: keep the 12px margins: the extra spacing is intended** | `HeroCard.css` |

### Media Ad Card

| ID | Question | Where |
|---|---|---|
| Q-MEDIA-AD-1 | A missing size shows an em dash, as the DS says; a screen reader skips a bare dash or reads "em dash". Built as Campaign card (Q-CAMPAIGN-8): the dash hidden from screen readers, "No fixed size" read instead. "Not published" is already words. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MediaAdCard.tsx` |
| Q-MEDIA-AD-2 | The DS's missing-data rule covers Sizes and Benchmark only. Built: `objective`, `tagline` and `funnel` are required, so they can't be missing. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MediaAdCard.tsx` |
| Q-MEDIA-AD-3 | The tilt is "optional" in the DS; the gallery turns it on. Built as a `tilt` prop, off by default. Keep off by default? My recommendation: off by default **Answered 2026-11-05: off by default (the recommendation)** | `MediaAdCard.tsx` |
| Q-MEDIA-AD-4 | Compare is always on the card, as the DS's anatomy has it, even when nothing listens to `onComparedChange`. Keep? My recommendation: keep: a catalogue without compare would want a different card **Answered 2026-11-05: keep (the recommendation)** | `MediaAdCard.tsx` |
| Q-MEDIA-AD-5 | One-off values with no token, kept local (the DS records them as deliberate one-offs): the 2px lift, 16:10, the 1.1 zoom, the 800px / 4deg / 1.015 tilt, the hint's 24px, the Compare hit area's 6px spill, the 72px pill and 60% title bones, the shimmer's 40%. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MediaAdCard.css` |
| Q-MEDIA-AD-6 | `.is-touch` (a hook that forces the tap hint on a non-touch screen) isn't ported: `(hover: none)` shows it on real touch devices. Keep it out? My recommendation: keep it out **Answered 2026-11-05: keep it out (the recommendation)** | `MediaAdCard.css` |
| Q-MEDIA-AD-7 | The Built-for-this-slot badge: the DS says a Neutral-3 border; the CSS sets one, but `.c-badge`'s transparent border comes later in components.css at the same specificity and wins, so the gallery draws none. Built as the gallery (no border). Option A: keep as the gallery. Option B: the Neutral-3 border, as the DS and the CSS intend. My recommendation: B **Answered 2026-11-05: option B: the Neutral-3 border (the recommendation)** | `MediaAdCard.css` |
| Q-MEDIA-AD-8 | The skeleton's shimmer is Progress Bar's keyframe; Progress Bar isn't converted, so it is copied into this component for now, to be shared once Progress Bar is built. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MediaAdCard.css` |

### Metrics card

| ID | Question | Where |
|---|---|---|
| Q-METRICS-1 | The size line names the top bar ("· 66% social"); the gallery lowercases "Social", but lowercasing every label would turn "TV" into "tv". Built: the first letter lowercased mid-sentence, an all-capitals label kept ("· 43% TV"). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MetricsCard.tsx` |
| Q-METRICS-2 | No size: the DS says the size line reads "Size not published" and the total "Not published". Built literally: the rest line is only "Size not published" (no "· top" part), and the Live total is "Not published" without "total audience" after it. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MetricsCard.tsx` |
| Q-METRICS-3 | The name's accessible name follows the gallery: "Foodies, Trendsetter, 16M audience. Open details". With no size, the size part is dropped ("Football fans, Sports. Open details"). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MetricsCard.tsx` |
| Q-METRICS-4 | Host strings: `unit`, `totalLabel` and `addLabel` are required; `moreLabel` defaults to " in details" (the DS's " channels in details" is the audience wording) and `emptyLabel` to "No breakdown on file". Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MetricsCard.tsx` |
| Q-METRICS-5 | The category Tag colour is a prop (`categoryTag`), with the DS's audience mapping exported as `audienceCategoryTags`, so influencers or channels can bring their own. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MetricsCard.tsx` |
| Q-METRICS-6 | One-off values with no token, kept local (the DS records them): the 120px Tag cap, the 4ch value column, and Progress Bar's 4px compact track. The two-line title, three-line tagline, swap height and stagger are built from tokens. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MetricsCard.css` |
| Q-METRICS-7 | The bars use Progress Bar's track, fill and trailing wrap; Progress Bar isn't converted, so those rules (and its forced-colours rule) are copied into this component until it is, then shared. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MetricsCard.css` |
| Q-METRICS-8 | The tilt is off by default, as Media Ad Card (decided Q-MEDIA-AD-3); the gallery card has it on. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MetricsCard.tsx` |
| Q-METRICS-9 | Bar values show as given ("57%"): no rounding, no forced decimal. Pacing and Progress-to-Goal show 1 decimal, but those are progress to a target; these are shares, and the gallery shows whole numbers. Keep as given? My recommendation: keep as given **Answered 2026-11-05: keep as given (the recommendation)** | `MetricsCard.tsx` |
| Q-METRICS-10 | The skeleton: the DS says only that it keeps the reserved title row. Built: Media Ad Card's three line bones, inside the taller swap, so it is exactly as tall as a loaded card. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `MediaAdCard.tsx` |

### Progress Bar

| ID | Question | Where |
|---|---|---|
| Q-PROGRESS-1 | The indeterminate shimmer travels from -100% to 350% in the CSS; the DS says to 200%. Built as the CSS. Keep the CSS (and correct the DS)? My recommendation: keep the CSS **Answered 2026-11-05: keep the CSS (the recommendation)** | `ProgressBar.css` |
| Q-PROGRESS-2 | General-data segments (Purple, then Turquoise) and the Neutral-4 overflow have no CSS; built from the DS. A segment with an `element` takes its department's colour; the others walk Purple, Turquoise, then Neutral-4, in order. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ProgressBar.tsx` |
| Q-PROGRESS-3 | The inside label: the CSS centres it on the whole track (absolute, with no positioned fill); the DS says centred within the fill. On the track, a white label over a fill under about half the track sits partly on grey and can't be read. Option A: keep the CSS. Option B: centre it in the fill, as the DS says. My recommendation: B **Answered 2026-11-05: B, centre it in the fill (the recommendation)** | `ProgressBar.css` |
| Q-PROGRESS-4 | Error: the DS says the status message goes in an `aria-live="polite"` region on the parent. Built: the bar adds none; the docs say it is the host's (the message isn't part of the bar). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ProgressBar.tsx` |
| Q-PROGRESS-5 | One-off values with no token, kept local: the 4/8/16px tracks (the DS records them), the inside label's 40px, the legend's 8px swatch and 2px radius, the shimmer's 40% width and 40% Neutral-5, and the reduced-motion 60%. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ProgressBar.css` |
| Q-PROGRESS-6 | The entrance runs once on mount, as the DS says (the gallery replays it on scroll, a demo choice). A server-rendered page shows the fill at 0 until the page's script runs. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ProgressBar.tsx` |
| Q-PROGRESS-7 | The visible value (header or trailing) is hidden from screen readers, because the progressbar already reads it (`aria-valuenow`, or `aria-valuetext` from `valueText`); otherwise it is read twice. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ProgressBar.tsx` |
| Q-PROGRESS-8 | Forced colours: the DS says every fill and segment is painted CanvasText; in the CSS a toned fill (Complete, Error, a department) keeps its colour, because its tone rule outranks the forced-colours one. Built as the CSS. Option A: keep. Option B: CanvasText for all, as the DS says. My recommendation: B **Answered 2026-11-05: B, CanvasText for all (the recommendation)** | `ProgressBar.css` |
| Q-PROGRESS-9 | Forced colours: the legend's swatches disappear (backgrounds are stripped); each item's text still names its segment. The DS is silent. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ProgressBar.css` |
| Q-PROGRESS-10 | The legend is hidden from screen readers, because each segment already reads "{label} — {value}%". Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ProgressBar.tsx` |
| Q-PROGRESS-11 | The default value text is the value as given ("72%"), with no forced decimal (Pacing and Progress-to-Goal show 1 decimal; this bar takes whatever `valueText` you pass). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ProgressBar.tsx` |

### ElementBadge

| ID | Question | Where |
|---|---|---|
| Q-ELBADGE-1 | A chip on its own is named only by a native `title`, as the DLS does. Screen readers don't reliably read `title` on a plain `<span>`, and touch and keyboard users never see it, so the element can be lost. Built as the DLS. Give the lone chip `role="img"` and `aria-label="{Element}"`, keeping the `title` for the mouse? My recommendation: yes, add the role and label **Answered 2026-11-05: yes, add the role and label (the recommendation)** | `ElementBadge.tsx` |
| Q-ELBADGE-2 | The glyph: the CSS sets 17px; the DS says 60% of the chip (19.2px). Built as the CSS. Keep the CSS (and correct the DS)? My recommendation: keep the CSS **Answered 2026-11-05: neither 17px nor 19.2px: 16px, the `--icon-sm` token (user)** | `ElementBadge.css` |
| Q-ELBADGE-3 | The DS gives the chip a "size prop" (default 32px); the CSS has 32px only, and nothing says what other sizes are or how the glyph and label scale. Not built. Leave it out until a design needs another size? My recommendation: leave it out **Answered 2026-11-05: leave it out (the recommendation)** | `ElementBadge.tsx` |
| Q-ELBADGE-4 | The glyph is fixed per element, from the gallery's interim Phosphor motifs (Fire `Fire`, Earth `Mountains`, Water `Drop`, Gold `Scales`, Wood `Plant`), with no icon prop, since the DS calls the chip a fixed identity marker. When the element artwork arrives it replaces these in one place. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ElementBadge.tsx` |
| Q-ELBADGE-5 | The label's name is always the element's name; the sublabel defaults to its function ("Visibility & Energy") and can be replaced (`sublabel`), as the DS's "defaults to" implies. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ElementBadge.tsx` |
| Q-ELBADGE-6 | The CSS sets no font family, line height or sublabel weight for the label, so they come from the page: in the gallery 15px lines (`normal`) at 400; in a page using this library's `body`, 22px lines at 500. Built with the caption tokens (Mulish, 16px lines, 400), as the DLS's other eyebrows (`.np-eyebrow`). The badge stays 32px tall either way. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `ElementBadge.css` |
| Q-ELBADGE-7 | No tokens for the 32px chip, the 17px glyph or the 12% tint (the DS's documented one-off, as Card's icon chip, Q-CARD-6). Local custom properties. Keep local? My recommendation: keep local **Answered 2026-11-05: keep local (the recommendation); the glyph no longer needs one (Q-ELBADGE-2)** | `ElementBadge.css` |
| Q-ELBADGE-8 | Forced colours: the CSS has no rule, so the tint is dropped and only the glyph remains (system text colour), with no chip shape. Tag takes a 1px border there for the same reason. Add a 1px CanvasText border to the chip? My recommendation: yes, as Tag **Answered 2026-11-05: yes, as Tag (the recommendation)** | `ElementBadge.css` |

### Modal / dialog

| ID | Question | Where |
|---|---|---|
| Q-MODAL-1 | The panel: the CSS and the DS disagree on six values. CSS: up to 400px, 16px padding, an h4 title, no border, a Neutral-3 divider above the footer and 12px between its buttons. DS: about 480px, 24px padding, an h3 title, a 1px Neutral-3 border, no divider and 8px. Built as the CSS (the shadow is the same: `shadow-modal` is `shadow-4`). Tutorial Modal already takes "the `.c-modal` recipe as it ships, 400px". Keep the CSS and correct the DS? My recommendation: keep the CSS **Answered 2026-11-05: keep the CSS (user)** | `Modal.css` |
| Q-MODAL-2 | The base modal has no scrim, opening, closing or focus rules in the DLS (the gallery shows the panel alone). Built with Command brief's contract, which the DS states for Media Ad Modal too: rendered at the end of `<body>` over the `shadow-overlay` scrim on `--z-modal` (300); focus to the title on open; Tab trapped; Escape, the X or a scrim click calls `onClose`; focus back to what opened it. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `Modal.tsx` |
| Q-MODAL-3 | Motion: none in the DLS for the base, so it appears and goes at once. Option A: keep none. Option B: Command brief's swing (rise and tilt, asymmetric exit). Option C: a plain fade of the scrim and panel on `--duration-fast`, which is what every DLS modal does under reduced motion. My recommendation: C **Answered 2026-11-05: C, a simple fade (user)** | `Modal.tsx` |
| Q-MODAL-4 | The page behind isn't held still: it can scroll under the scrim (as Command brief). Media Ad Modal and Compare modal hold the page still while open. Hold it still (`overflow: hidden` on the page while open)? My recommendation: yes **Answered 2026-11-05: yes, hold it still: it cannot scroll (user)** | `Modal.tsx` |
| Q-MODAL-5 | Placement, not in the DLS: the panel is centred with the scrim keeping it 16px off every screen edge, and a panel taller than the screen scrolls inside itself. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `Modal.css` |
| Q-MODAL-6 | No tokens for the 400px panel or the body's 1.5 line height (24px). Local custom properties. The nearest token for the body is body1's 22px. Keep 1.5 local, or use the body1 line height? My recommendation: use the body1 line height (22px), keep 400px local **Answered 2026-11-05: use the body1 line height, keep 400px local (the recommendation)** | `Modal.css` |
| Q-MODAL-7 | Forced colours: the CSS has no rule; the shadow isn't drawn, so the panel has no edge against the scrim. Add a 1px CanvasText border there (as Tag and ElementBadge)? My recommendation: yes **Answered 2026-11-05: yes (the recommendation)** | `Modal.css` |
| Q-MODAL-8 | The close X: in the gallery it is 13.3px, black, by accident (the browser's default button font size, which `.c-icon-btn` doesn't set); the DS says `icon-base` (20px). Built as the real Button (ghost, sm, icon-only): 16px `icon-sm`, Neutral-9, with the focus ring, which matches every other button icon (DLS owed row 3). Keep? My recommendation: keep **Answered 2026-11-05: keep 16px (user)** | `Modal.tsx` |
| Q-MODAL-9 | The DS lists an optional description under the title (body1, Neutral-5); the CSS has no rule for it and nothing sets its spacing. Not built: the body says what the decision means. Leave it out? My recommendation: leave it out **Answered 2026-11-05: leave it out (the recommendation)** | `Modal.tsx` |
| Q-MODAL-10 | The title is a real heading, level 2 by default (a dialog sits above the page outline), drawn as h4. The CSS sets no line height for it, so it comes from the page (in the gallery `normal`, about 25px; under this library's `body`, 22px); the head stays 64px tall either way. Keep level 2, and set the h4 line height token (28px)? My recommendation: yes to both **Answered 2026-11-05: yes to both (the recommendation)** | `Modal.tsx`, `Modal.css` |

### Stepper

| ID | Question | Where |
|---|---|---|
| Q-STEPPER-1 | Semantics, which the gallery doesn't have (divs and spans, no state for screen readers): built as an ordered list, `aria-current="step"` on the Active step, the discs `aria-hidden`, and each step read as "Step 2 of 4: Profile, current step" (or completed, upcoming, "current step, error", "completed, warning"), then its description, as Timeline's `sr-only` pattern. The words are English and built in. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `Stepper.tsx` |
| Q-STEPPER-2 | A list can only hold list items, so each item holds its step and the connector after it, rather than the source's steps and connectors as siblings. The shares are set so every circle, connector and label lands on the same pixel as the source (checked at 600px and 400px). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `Stepper.css` |
| Q-STEPPER-3 | Flags: the DS says the app enforces Error only on the Active step and Warning only on a Completed one. Built: the component enforces it, and a flag anywhere else is ignored (drawn as the step's plain state). Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `Stepper.tsx` |
| Q-STEPPER-4 | `.c-step.is-disabled` (40%, a not-allowed cursor) is in the CSS only: the DS never mentions it, the gallery never uses it, and the stepper can't be clicked, so the cursor promises an interaction that doesn't exist. Built as a `disabled` flag on a step. Keep it, or drop it until a design says what a disabled step means? My recommendation: drop it **Answered 2026-11-05: drop it (the recommendation)** | `Stepper.tsx`, `Stepper.css` |
| Q-STEPPER-5 | Forced colours: the CSS has no rule; the fills are dropped, so Completed, Active, Error and Warning lose their circle (the glyph or number stays; only Upcoming keeps its outline). Give every indicator a 1px CanvasText border there? My recommendation: yes **Answered 2026-11-05: yes (the recommendation)** | `Stepper.css` |
| Q-STEPPER-6 | No tokens for the 24px indicator or the 40% disabled opacity. Local custom properties. Keep local? My recommendation: keep local **Answered 2026-11-05: keep local (the recommendation)** | `Stepper.css` |
| Q-STEPPER-7 | Steps can't be clicked (to go back to a finished step): the DLS has no hover, focus or press state for them, and the DS calls it a progress display. Built read-only. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `Stepper.tsx` |
| Q-STEPPER-8 | Task Rows copied Stepper's three discs (Completed, Upcoming, Error) because Stepper wasn't converted. Share them now (Task Rows uses Stepper's indicator classes), as Progress Bar's shimmer was shared once it existed? My recommendation: yes, in Task Rows' next change **Answered 2026-11-05: yes, in Task Rows' next change (the recommendation)** | `TaskRows.css` |
| Q-STEPPER-9 | `currentStep` counts from 0 (the first step is 0; the number shown is 1), and `steps.length` means all done. Keep? My recommendation: keep **Answered 2026-11-05: keep (the recommendation)** | `Stepper.tsx` |

### Back button

| ID | Question | Where |
|---|---|---|
| Q-BACK-1 | Placement: the Back button section says it sits above the page header, which is unchanged; App Shell's Level 2 paragraph says it replaces the page header's title and subtitle. The CSS comment and the gallery put it above. Built above. Keep, and correct App Shell's line? My recommendation: keep **Answered 2026-11-06: keep (the recommendation)** | `BackButton.tsx` |
| Q-BACK-2 | Length: the DS cuts a label past 40 characters with an ellipsis; the CSS has no rule, so a long parent name runs on. Built as the CSS. Cut at 40 characters ("…"), keeping the full name for screen readers? My recommendation: yes **Answered 2026-11-06: yes (the recommendation)** | `BackButton.tsx` |
| Q-BACK-3 | Its name: a screen reader hears only "Reports" (the gallery's markup), with nothing saying it goes back. Name it "Back to Reports" (the visible word still in the name)? My recommendation: yes **Answered 2026-11-06: yes (the recommendation)** | `BackButton.tsx` |
| Q-BACK-4 | Height: the CSS sets no line height, so the gallery's `<button>` draws `normal` and is 32px tall; the DS says label2 (13/18), 34px. Built with label2's 18px. Keep the token (34px)? My recommendation: keep the token **Answered 2026-11-06: keep the token (the recommendation)** | `BackButton.css` |
| Q-BACK-5 | Link or button: the gallery uses a `<button>`. Going up a level is navigation, so `href` makes a real link (opens in a new tab, shows its address); `onClick` keeps a button for app routing that isn't a link. Both look the same. Keep both, and recommend `href`? My recommendation: keep **Answered 2026-11-06: keep (the recommendation)** | `BackButton.tsx` |
| Q-BACK-6 | No disabled state in the DLS (the audit noted it). Not built: a Level 2+ screen always has a parent. Keep it out? My recommendation: keep it out **Answered 2026-11-06: keep it out (the recommendation)** | `BackButton.tsx` |
| Q-BACK-7 | Touch target: 34px tall (8px padding around 18px), under the 44px minimum. Extend the hit area to 44px with an invisible margin, the look unchanged (as Media Ad Card's Compare)? My recommendation: yes **Answered 2026-11-06: yes (the recommendation)** | `BackButton.css` |
| Q-BACK-8 | The 12px below the row is the component's (the CSS's `.c-back-button-row`), though spacing between components normally comes from layout. Keep it in the component, as the DS states it? My recommendation: keep **Answered 2026-11-06: keep (the recommendation)** | `BackButton.css` |

### PageHeader

| ID | Question | Where |
|---|---|---|
| Q-PAGEHEADER-1 | The large title: the DS gives the title h1's `-lg` size (40/56) for screens 1280px and wider; the CSS never uses it (32/38 everywhere), and no other component uses any `-lg` size yet. Built as the CSS. Use 40/56 from 1280px? My recommendation: yes, from 1280px **Answered 2026-11-06: yes, from 1280px (the recommendation)** | `PageHeader.css` |
| Q-PAGEHEADER-2 | Actions on a narrow screen: the row never wraps, so with actions the title squeezes (about 100px at 320px) and a word that can't break runs under the buttons ("Overview" under Export). The DLS has the same. Let the actions drop below the title when they don't fit beside it (left-aligned there, 12px under the subtitle)? My recommendation: yes **Answered 2026-11-06: yes (the recommendation)** | `PageHeader.css` |
| Q-PAGEHEADER-3 | Actions are a slot on PageHeader (`actions`), though the DS documents them as App Shell's addition to `.c-pageheader` rather than a PageHeader variant: the CSS is PageHeader's, and App Shell will render PageHeader. Keep the slot here? My recommendation: keep **Answered 2026-11-06: keep (the recommendation)** | `PageHeader.tsx` |
| Q-PAGEHEADER-4 | The title is a real `h1` by default, with `headingLevel` 2 or 3 for a header that titles a panel inside a page that has its own h1 (the DS says it can top "a page or panel"). The look is always h1. Keep? My recommendation: keep **Answered 2026-11-06: keep (the recommendation)** | `PageHeader.tsx` |
| Q-PAGEHEADER-5 | The 48px under the header (`.c-shell .c-pageheader`, line 2925) is App Shell's, not PageHeader's, as the DS says spacing below belongs to the page layout. Not built here. Keep it with App Shell? My recommendation: keep **Answered 2026-11-06: keep (the recommendation)** | `PageHeader.css` |

### Tabs

| ID | Question | Where |
|---|---|---|
| Q-TABS-1 | The focus ring is clipped at the top and sides: the tab row scrolls sideways (`overflow-x: auto`), which also clips anything drawn outside it, and the ring sits 2px outside the tab. The DLS has the same. Option A: draw the ring inside the tab (offset −2px, as SidebarNav's nav items do). Option B: give the row 2px of padding so the ring fits (the track moves 2px down). Option C: leave it. My recommendation: A **Answered 2026-11-06: A, the ring inside the tab (the recommendation)** | `Tabs.css` |
| Q-TABS-2 | Pressed never shows on an inactive tab: the hover rule (`:not(.active):not(.is-disabled):hover`, four classes) outranks the pressed rule (three), so a pressed inactive tab stays Neutral-2, not the DS's Neutral-3. The DLS has the same. Built as the source. Make pressed win? My recommendation: yes **Answered 2026-11-06: yes (the recommendation)** | `Tabs.css` |
| Q-TABS-3 | The edge fades are always Neutral-1 (the source); the DS says the parent surface's colour, so on the warm page canvas they show as white bands. Add a `surface` option (`'default'` Neutral-1, `'canvas'` the warm canvas) that sets the fade colour? My recommendation: yes **Answered 2026-11-06: yes, a `surface` option (the recommendation)** | `Tabs.tsx`, `Tabs.css` |
| Q-TABS-4 | Keyboard, not in the DLS: only the active tab is a Tab stop; ← and → move to the previous or next enabled tab (wrapping) and select it; Home and End go to the ends. The same as the docs site's tabs and ExpandingTabs. Keep? My recommendation: keep **Answered 2026-11-06: keep (the recommendation)** | `Tabs.tsx` |
| Q-TABS-5 | Disabled: the source's `.is-disabled` uses `pointer-events: none` on a still-focusable button; built as a real `disabled` button (Neutral-4 at 40%, not focusable, skipped by the arrows). Keep? My recommendation: keep **Answered 2026-11-06: keep (the recommendation)** | `Tabs.tsx`, `Tabs.css` |
| Q-TABS-6 | No tokens for the 32px fade or the 40% disabled opacity. Local custom properties. Keep local? My recommendation: keep local **Answered 2026-11-06: keep local (the recommendation)** | `Tabs.css` |
| Q-TABS-7 | URL persistence: the component doesn't read or write the URL (routing differs per app); the host keeps the tab in `?tab=` and passes it as `value`, and an unknown id falls back to the first tab, as the DS says. Keep? My recommendation: keep **Answered 2026-11-06: keep (the recommendation)** | `Tabs.tsx` |
| Q-TABS-8 | Panels, which have no CSS in the source: 16px under the track, the incoming and outgoing panels cross-fade together on `--duration-fast` (the outgoing one `inert`), an instant swap under reduced motion; `content` is optional, so a host can render the section itself. Keep? My recommendation: keep **Answered 2026-11-06: keep (the recommendation)** | `Tabs.tsx`, `Tabs.css` |
| Q-TABS-9 | A count is read straight after the label with no break ("Campaigns8"). Read it as "Campaigns, 8" (a pause for screen readers only)? My recommendation: yes **Answered 2026-11-06: yes (the recommendation)** | `Tabs.tsx` |

### Segmented Control

| ID | Question | Where |
|---|---|---|
| Q-SEG-1 | Sizes: the CSS gives every segment 8px (compact 5px) padding and a 32px minimum, so segments come out 36px (icon) / 32px (text) at default and 24px / 26px compact, and the two kinds differ; the DS says 36px and 28px, and a 48px minimum for text. Built as the CSS. Follow the DS (fixed 36px / 28px heights for both kinds, 48px minimum for text)? My recommendation: yes **Answered 2026-11-06 (user): follow the DS, fixed heights for both kinds and a 48px text minimum (the recommendation). The exact values wait on the token choice (Q-SEG-7).** | `SegmentedControl.css` |
| Q-SEG-2 | Role: the DS puts `role="radio"` segments in a `role="group"`; radios belong in a `radiogroup`, which is also what tells a screen reader only one can be chosen. Built as `radiogroup`. Keep? My recommendation: keep **Answered 2026-11-06 (user): keep `radiogroup` (the recommendation).** | `SegmentedControl.tsx` |
| Q-SEG-3 | Hover doesn't show: the DS's hover is Neutral-2 (Button Ghost's), which is the track's own colour. Built as the source. Move hover and pressed one step darker for the grey track: hover Neutral-3, pressed Neutral-4? My recommendation: yes **Answered 2026-11-06 (user): hover Neutral-3, pressed Neutral-4 (the recommendation).** | `SegmentedControl.css` |
| Q-SEG-4 | The DS has Escape return focus to whatever had it before the control. Not built: it moves focus somewhere the person didn't ask to go (against the library's focus rule), and nothing else in the system does it. Drop it from the DS? My recommendation: drop it **Answered 2026-11-06 (user): drop Escape (the recommendation).** | `SegmentedControl.tsx` |
| Q-SEG-5 | Keyboard, as the DS says: ← and → (and Home / End) move focus only, Space or Enter selects. (Tabs select as focus moves.) Keep the DS's way? My recommendation: keep **Answered 2026-11-06 (user): keep manual activation (the recommendation).** | `SegmentedControl.tsx` |
| Q-SEG-6 | The icon tooltip is the source's own small bubble (Tooltip's look, 4px / 8px padding, 8px above), not the library's Tooltip component, as the DS explains (the sliding pill underneath). Keep? My recommendation: keep **Answered 2026-11-06 (user): use the library's Tooltip.** The source's bubble was cut off by the docs preview, and would be by any card or scroll area that hides overflow; Tooltip renders above the page and flips. Its padding is Tooltip's 6px / 10px. | `SegmentedControl.tsx`, `SegmentedControl.css` |
| Q-SEG-7 | No tokens for the compact 5px padding, the 32px minimum, the 40% disabled opacity or the tooltip's 8px gap. Local custom properties. Keep local? My recommendation: keep local (and decide the 5px with Q-SEG-1) **Answered 2026-11-06 (user): build from tokens. Default height calc(--icon-base + 2 × --spacing-8) = 36px; compact --control-height-xs (24px, the DS's 28 has no token); minimums --spacing-32 (icon) and --spacing-48 (text); the 5px padding is gone. The 40% fade stays local (no opacity tokens).** | `SegmentedControl.css` |
| Q-SEG-8 | Forced colours: no rule in the source; the pill's white fill and shadow are dropped, so the selected segment shows only by its bold text. Give the pill a 2px CanvasText border there? My recommendation: yes **Answered 2026-11-06 (user): a 2px CanvasText border on the pill (the recommendation).** | `SegmentedControl.css` |
| Q-SEG-9 | A disabled control: the DS says track and segments together at 40%; since its segments are disabled buttons too, they would fade again (to 16%). Built so they don't: one 40% over the whole control, colours otherwise unchanged. Keep? My recommendation: keep **Answered 2026-11-06 (user): keep one 40% fade (the recommendation).** | `SegmentedControl.css` |
| Q-SEG-10 | Before the page's script runs (a server render), the selected segment carries the white fill itself (the source's no-pill fallback) until the pill is measured. Keep? My recommendation: keep **Answered 2026-11-06 (user): keep (the recommendation).** | `SegmentedControl.css` |

### Lists

| ID | Question | Where |
|---|---|---|
| Q-LIST-1 | A control row whose switch or checkbox is disabled still takes the pressed fill, fades its dividers and draws the high-contrast hover outline (only the hover fill skips it). Built as the source. Exclude disabled control rows from all of them, as the hover fill already does? My recommendation: yes **Answered 2026-11-06 (user): yes, exclude them (the recommendation).** | `List.css` |
| Q-LIST-2 | In a card, the DS has the list run edge to edge: the card keeps 8px top and bottom and no side padding, and clips the square row fills. Card has no setting for that. The docs show a stand-in card. Add a Card setting for a list body (8px top and bottom, no sides)? My recommendation: yes, on Card (the card owns its padding) **Answered 2026-11-06 (user): yes, Card `padding="list"` (the recommendation). A CardHeader or CardFooter in it keeps 16px at the sides.** | `Card`, `List.docs.tsx` |
| Q-LIST-3 | Leading corners are a quarter of the box: 6 / 8 / 12px. 6 is `--radius-xs` and 12 `--radius-sm` (built so); 8px (M) has no token. Keep 8px local, or use `--radius-xs` (6) / `--radius-sm` (12)? My recommendation: keep 8px local, so the shape stays the same at every size **Answered 2026-11-06 (user): keep 8px local (the recommendation).** | `List.css` |
| Q-LIST-4 | Pressed never shows with a mouse: the hover rule outranks it, so a press stays Neutral-2 (as Tabs had). Built as the source. Make pressed win, as decided for Tabs? My recommendation: yes **Answered 2026-11-06 (user): yes, pressed wins (the recommendation).** | `List.css` |
| Q-LIST-5 | Skeleton rows are 56px (M leading), the row they stand for 62px, so the list jumps 6px a row when it loads; the DS says they match. Built as the source. Give the skeleton row a minimum height from tokens (heading line 20 + 2 + caption line 16 + 24 padding = 62)? My recommendation: yes **Answered 2026-11-06 (user): yes, a 62px minimum from tokens (the recommendation).** | `List.css` |
| Q-LIST-6 | No tokens for the 40% disabled fade, the 50% trailing cap or the 62% / 38% bone widths: local. The 6px dot and 2px line gap use `--spacing-6` and `--spacing-2`. Keep? My recommendation: keep (the opacity joins the opacity-token request) **Answered 2026-11-06 (user): keep (the recommendation).** | `List.css` |
| Q-LIST-7 | Leading size is set once on the List (`leadingSize`), not per row as the DS's props table has it, so one list can't mix sizes (the DS's own rule). Keep? My recommendation: keep **Answered 2026-11-06 (user): keep (the recommendation).** | `List.tsx` |
| Q-LIST-8 | The hidden "Loading…" text of a busy list sits in its own hidden first `<li>` (the DS doesn't say where). Keep? My recommendation: keep **Answered 2026-11-06 (user): keep (the recommendation).** | `List.tsx` |
| Q-LIST-9 | The sticky Section header's background, a custom property in the DLS (`--c-list-subheader-bg`), is a `surface` setting here: `default` (Neutral-1) or `canvas` (Canvas warm), as Tabs. Keep? My recommendation: keep **Answered 2026-11-06 (user): keep (the recommendation).** | `List.tsx` |

### Password field

| ID | Question | Where |
|---|---|---|
| Q-PW-1 | The toggle is a 16px target, under the 44px minimum. Give it an invisible 44px hit area centred on the icon (nothing drawn changes; it overlaps the box's reserved 40px end)? My recommendation: yes **Answered 2026-11-06 (user): yes, a 44px hit area (the recommendation).** | `InputField.css` |
| Q-PW-2 | Edge adds its own reveal button inside a password box, so Edge would show two eyes. Hide Edge's (`::-ms-reveal`)? My recommendation: yes **Answered 2026-11-06 (user): yes, hide Edge's (the recommendation).** | `InputField.css` |
| Q-PW-3 | On a disabled field the toggle still works and reacts to hover (as the source). Disable it with the field (out of the tab order, no hover)? My recommendation: yes **Answered 2026-11-06 (user): yes, disabled with the field (the recommendation).** | `InputField.tsx`, `InputField.css` |
| Q-PW-4 | A success check, trailing icon, prefix or suffix would collide with the toggle at the end, and the DS doesn't say. Built without them (the props aren't offered); a leading icon is. Keep? My recommendation: keep **Answered 2026-11-06 (user): keep (the recommendation). The types don't offer them with `type="password"`.** | `InputField.tsx` |

### Search input

| ID | Question | Where |
|---|---|---|
| Q-SEARCH-1 | Width: the source caps the field at 320px; Input field fills its container (decided INPUT-2). Fill the container here too? My recommendation: yes **Answered 2026-11-06 (user): yes, fill the container (the recommendation).** | `SearchInput.css` |
| Q-SEARCH-2 | The label sits 8px above the box (its own 4px margin plus the 4px gap); Input field's is 4px. Use 4px? My recommendation: yes, to match Input field **Answered 2026-11-06 (user): yes, 4px (the recommendation).** | `SearchInput.css` |
| Q-SEARCH-3 | The clear (×) is a 24px target and has no focus ring of its own (the browser's default shows). Give it a 44px hit area and the standard 2px Obsidian ring, as decided for the password toggle? My recommendation: yes **Answered 2026-11-06 (user): yes, a 44px hit area and the standard ring (the recommendation).** | `SearchInput.css` |
| Q-SEARCH-4 | The results panel sits in the page's flow, so opening it pushes everything below down. Float it under the box instead (over the content, at the menu layer)? My recommendation: yes **Answered 2026-11-06 (user): yes, float it at the menu layer (the recommendation).** | `SearchInput.css` |
| Q-SEARCH-5 | A focused field in error keeps its 1px Red border (and the text shifts 1px); in Input field focus wins. Let focus win here too? My recommendation: yes **Answered 2026-11-06 (user): yes, focus wins (the recommendation).** | `SearchInput.css` |
| Q-SEARCH-6 | The DS says Default has no dropdown, but the gallery shows Default with No results and Loading panels. Built as the gallery (`loading`, `noResults`). Keep? My recommendation: keep **Answered 2026-11-06 (user): keep (the recommendation).** | `SearchInput.tsx` |
| Q-SEARCH-7 | User/Item list behaviour isn't in the DLS. Built as the standard combobox: ↓ ↑ move (wrapping), Enter picks, Escape closes, typing reopens; the keyboard's row takes the hover fill. Keep? My recommendation: keep **Answered 2026-11-06 (user): keep (the recommendation).** | `SearchInput.tsx`, `SearchInput.css` |
| Q-SEARCH-8 | The spinner keeps turning under reduced motion. Stop it (the icon and the hidden "Searching…" stay)? My recommendation: yes **Answered 2026-11-06 (user): yes, stop it (the recommendation).** | `SearchInput.css` |
| Q-SEARCH-9 | The collapsed row has a pointer cursor, but only its × does anything. Use the normal cursor? My recommendation: yes **Answered 2026-11-06 (user): yes, the normal cursor (the recommendation).** | `SearchInput.css` |
| Q-SEARCH-10 | Focus moves three times, each because the focused thing disappears: the × returns focus to the box (the source does this); picking a result moves it to the collapsed row's ×; clearing the choice moves it back to the box. Add these to the focus-rule exceptions? My recommendation: yes **Answered 2026-11-06 (user): yes, added to CLAUDE.md's exceptions (the recommendation).** | `SearchInput.tsx`, `CLAUDE.md` |
| Q-SEARCH-11 | The gallery's collapsed rows have no label. Built with the label kept above (and naming the row as a group). Keep? My recommendation: keep **Answered 2026-11-06 (user): keep (the recommendation).** | `SearchInput.tsx` |
| Q-SEARCH-12 | The gallery's Error example has text but no ×; the DS says the × shows whenever there is text. Built with the ×. Keep? My recommendation: keep **Answered 2026-11-06 (user): keep (the recommendation).** | `SearchInput.tsx` |
| Q-SEARCH-13 | Disabled text is Neutral-4 (the DS and CSS agree); Input field's disabled text is Neutral-5. Keep Neutral-4? My recommendation: keep **Answered 2026-11-06 (user): keep Neutral-4 (the recommendation).** | `SearchInput.css` |
| Q-SEARCH-14 | The selected (collapsed) row is 40px with no top or bottom padding, so its avatar sits 3px and its two lines 1px from the edges (asked by the user: "looks tight"). Make the whole field 48px, keep 40px with a smaller one-line row, or grow only the selected row? My recommendation: the whole field at 48px **Answered 2026-11-06 (user): the whole field 48px (`--control-height-lg`), the box and the selected row alike; content centred, no vertical padding token.** | `SearchInput.css` |
| Q-SEARCH-15 | Selected — disabled: the name and role fade to Neutral-4, but the avatar's initials stay Neutral-9, and its Neutral-2 circle disappears into the disabled fill. Fade the initials to Neutral-4? My recommendation: yes **Answered 2026-11-06 (user): yes, Neutral-4.** | `SearchInput.css` |

### Input field: 6-digit code (OTP), not in the DLS

Requested by the user 2026-11-06. Designed from scratch in a draft (`review-drafts/otp.html`, deleted once decided); built into Input field the same day.

| ID | Question | Where |
|---|---|---|
| Q-OTP-1 | One real input (`autocomplete="one-time-code"`, numeric keyboard) under six drawn boxes, not six inputs: SMS autofill, password managers, paste and screen readers see one field, and focus never jumps box to box. My recommendation: yes **Answered 2026-11-06 (user): the recommendation, built with tokens only (no local sizes).** | `InputField.tsx`, `InputField.css` |
| Q-OTP-2 | Boxes 48×48 (`--control-height-lg`), 8px apart (`--spacing-8`), shrinking evenly to no less than 40px (`--control-height-md`) so the row fits a 320px phone; or 40px boxes. My recommendation: 48px, shrinking to 40px **Answered 2026-11-06 (user): the recommendation, built with tokens only (no local sizes).** | `InputField.tsx`, `InputField.css` |
| Q-OTP-3 | Six equal boxes, or 3 + 3 with a 16px middle gap. My recommendation: six equal **Answered 2026-11-06 (user): the recommendation, built with tokens only (no local sizes).** | `InputField.tsx`, `InputField.css` |
| Q-OTP-4 | Digits at h4 size, bold (20px / 700), or body1 bold (16px). My recommendation: h4 size **Answered 2026-11-06 (user): the recommendation, built with tokens only (no local sizes).** | `InputField.tsx`, `InputField.css` |
| Q-OTP-5 | States from Input field: the next box takes the 2px Obsidian border and a caret (still under reduced motion); error turns every box Red with the bold Red message; success turns them Green with the check; disabled is Neutral-2 with Neutral-4 digits. My recommendation: as drawn **Answered 2026-11-06 (user): the recommendation, built with tokens only (no local sizes).** | `InputField.tsx`, `InputField.css` |
| Q-OTP-6 | Digits only (others dropped); Backspace deletes the last; paste fills from the start, dropping spaces and dashes; the caret stays at the end (no editing a middle digit). My recommendation: as described **Answered 2026-11-06 (user): the recommendation, built with tokens only (no local sizes).** | `InputField.tsx`, `InputField.css` |
| Q-OTP-7 | Never masked: codes are short-lived and checked against the SMS. My recommendation: not masked **Answered 2026-11-06 (user): the recommendation, built with tokens only (no local sizes).** | `InputField.tsx`, `InputField.css` |
| Q-OTP-8 | On the sixth digit, an `onComplete(code)` callback; the field never submits the form itself. My recommendation: callback only **Answered 2026-11-06 (user): the recommendation, built with tokens only (no local sizes).** | `InputField.tsx`, `InputField.css` |
| Q-OTP-9 | The resend countdown and "Resend code" link are the page's content under the field, not part of it. My recommendation: outside the field **Answered 2026-11-06 (user): the recommendation, built with tokens only (no local sizes).** | `InputField.tsx`, `InputField.css` |
| Q-OTP-10 | `InputField type="otp"`, with Input field's label, helper, error, success, required and disabled, and no size, icons, prefix, suffix or counter. My recommendation: yes **Answered 2026-11-06 (user): the recommendation, built with tokens only (no local sizes).** | `InputField.tsx`, `InputField.css` |

### Dropdown — Single select

| ID | Question | Where |
|---|---|---|
| Q-DROP-1 | Error: built with Input field's decided 1px Red border, not the DS's 2px (inherited from the old Input field error). Keep 1px, so it matches Input field? My recommendation: keep **Answered 2026-11-06 (user): keep 1px, as Input field (the recommendation).** | `Dropdown.css` |
| Q-DROP-2 | The Standard trigger is a focusable element with `role="combobox"` (looking exactly like the box), not a read-only text input, which screen readers would announce as "read only". Keep? My recommendation: keep **Answered 2026-11-06 (user): keep the combobox element (the recommendation).** | `Dropdown.tsx` |
| Q-DROP-3 | A field with a value shows the Obsidian "filled" border even in error (and Borderless hides the error border). Let the error win over filled (focus and open still win over both)? My recommendation: yes **Answered 2026-11-06 (user): yes, the error wins over filled, in both styles (the recommendation).** | `Dropdown.css` |
| Q-DROP-4 | The panel floats 8px under the trigger at the menu layer, as decided for Search input (the source puts it in the page's flow, 12px under). Keep? It can be clipped by a card that hides overflow, as the Tooltip was; a portal would be the fix. My recommendation: keep, and revisit with a portal if a card clips it **Answered 2026-11-06 (user): keep it floating at 8px; a portal if a card clips it (the recommendation).** | `Dropdown.css` |
| Q-DROP-5 | Disabled and read-only fields with a value keep the plain Neutral-3 border, as the gallery draws them (the CSS alone would give them the Obsidian filled border). Keep? My recommendation: keep **Answered 2026-11-06 (user): keep the plain border (the recommendation).** | `Dropdown.css` |
| Q-DROP-6 | The keyboard's current option takes the hover fill (the source has hover only), as Search input. Keep? My recommendation: keep **Answered 2026-11-06 (user): keep the hover fill on the keyboard's row (the recommendation).** | `Dropdown.css` |
| Q-DROP-7 | Option groups (a group label, `role="group"`) are in the DS's ARIA table, but only Multiple select has group rows. Add groups with Multiple select, for both? My recommendation: yes **Answered 2026-11-06 (user): yes, groups added to both variants with Multiple select (the recommendation).** | `Dropdown.tsx` |
| Q-DROP-8 | Local values: the list's 320px cap (nearest: `--measure-sm` 360, about 10 rows; no exact token) and the 1px nudge on two-line rows (the same number as `--border-width-sm`, but not a border). Keep 320px local and use `--border-width-sm` for the 1px? My recommendation: yes **Answered 2026-11-06 (user): yes: 320px stays local, the 1px nudge is `--border-width-sm` (the recommendation).** | `Dropdown.css` |

### Dropdown — Multiple select

| ID | Question | Where |
|---|---|---|
| Q-DROPM-1 | The DS doesn't say what Select all does after a search. Built: it ticks (or clears) only the options the search shows. Keep? My recommendation: yes, it's what the person can see **Answered 2026-11-06 (user): yes, the matches only (the recommendation).** | `Dropdown.tsx` |
| Q-DROPM-2 | A disabled option that is ticked (a locked choice): the source's CSS paints its box Neutral-2, so the white tick disappears. Built: Neutral-4 fill and border, white tick, so it still reads as ticked. Keep? My recommendation: yes **Answered 2026-11-06 (user): yes, Neutral-4 with the white tick (the recommendation).** | `Dropdown.css` |
| Q-DROPM-3 | Select all and Clear never change a disabled option (the DS doesn't say). Keep? My recommendation: yes, disabled means it can't be changed **Answered 2026-11-06 (user): yes, disabled options never change (the recommendation).** | `Dropdown.tsx` |
| Q-DROPM-4 | While loading, the footer's buttons are disabled with Button's own disabled look (Neutral-4 fill, white text), not the source's 50% opacity. Keep? My recommendation: yes, one disabled button look **Answered 2026-11-06 (user): yes, Button's own disabled look (the recommendation).** | `Dropdown.tsx` |
| Q-DROPM-5 | A listbox option has no "partly" state, so a partly ticked Select all is read as "Select all, 2 selected" (the count from `countLabel`). Keep? My recommendation: yes **Answered 2026-11-06 (user): yes, read with its count (the recommendation).** | `Dropdown.tsx` |
| Q-DROPM-6 | The footer is the library's Button (ghost and primary, size sm: 14px text, 61 by 32px), as the DS says; the source's hand-built buttons use label2 (13px), so they are 3px narrower. Keep Button? My recommendation: yes, so a button looks the same everywhere **Answered 2026-11-06 (user): yes, keep Button (the recommendation).** | `Dropdown.tsx` |
| Q-DROPM-7 | A Select all inside each group isn't in the DS. Leave it out? My recommendation: leave it out **Answered 2026-11-06 (user): leave it out (the recommendation).** | — |

### Radio card

| ID | Question | Where |
|---|---|---|
| Q-RC-1 | The DS notes the circle sits about 1px low beside the h5 title (Radio's 2px top nudge is tuned for body1's 22px line; h5's is 20px). Centre it with `calc((var(--text-h5-lh) - var(--choice-size)) / 2)` (1px)? Draft: `review-drafts/radio-card-circle.html`. Built as the DLS (2px). My recommendation: centre it **Answered 2026-11-06 (user): centre it (the recommendation).** | `RadioCard.css` |
| Q-RC-2 | The DS notes the empty circle's Neutral-3 border is about 1.4:1, under the 3:1 UI minimum. Radio and Checkbox draw the same Neutral-3. Keep it here (the whole card, its border and title are the target), and raise it for Radio and Checkbox together if at all? My recommendation: keep **Answered 2026-11-06 (user): keep Neutral-3 (the recommendation).** | `RadioCard.css` |
| Q-RC-3 | The gallery names its group with `aria-label` and no legend; the DS's anatomy has a legend. Built: `legend` is required and `hideLegend` hides it visually (still read out), as Dropdown's `hideLabel`. Keep? My recommendation: keep **Answered 2026-11-06 (user): keep the required legend with hideLegend (the recommendation).** | `RadioCard.tsx` |
| Q-RC-4 | Radio's approved hover (the empty circle fills Neutral-2) isn't applied inside a card: the card lifts to shadow-2 instead, as the source. Keep? My recommendation: keep, one hover signal per card **Answered 2026-11-06 (user): keep, one hover signal per card (the recommendation).** | `RadioCard.css` |
| Q-RC-5 | Docs: its own page, "Radio card", not inside the Cards group (the DS files it under Radio and Card's section points there). Keep? My recommendation: keep **Answered 2026-11-06 (user): no: Radio card goes with Radio, on the Radio docs page (not its own page, not the Cards group).** | `RadioCard.docs.tsx` |

### Quantity selector

| ID | Question | Where |
|---|---|---|
| Q-QTY-1 | Error border: the source's 2px Red (the old Input field CSS; the DS's own Deviation 1); built as Input field's decided 1px, with the bold Red error text every component has. Keep 1px? My recommendation: keep, one error look with Input field and Dropdown **Answered 2026-11-06 (user): keep 1px (the recommendation).** | `QuantitySelector.css` |
| Q-QTY-2 | Pressed: the source's − / + go Neutral-3 while pressed, held for a whole press-and-hold; Button's ghost pressed was decided to look like hover (Neutral-2, Q-BTN-5). Draft: `review-drafts/quantity-selector.html`. Keep Neutral-3 here, so a hold visibly keeps running? My recommendation: keep Neutral-3 **Answered 2026-11-06 (user): keep Neutral-3 (the recommendation).** | `QuantitySelector.css` |
| Q-QTY-3 | Compact buttons' corners: the source's one-off 8px (concentric with the box); no token. Nearest `--radius-xs` 6px (2px tighter) or `--radius-sm` 12px. Draft: `review-drafts/quantity-selector.html`. Built 8px, local. My recommendation: `--radius-xs` **Answered 2026-11-06 (user): `--radius-xs` (6px) is fine (the recommendation).** | `QuantitySelector.css` |
| Q-QTY-4 | Press-and-hold timing: 400ms before repeating, then every 100ms (the source's, in script). Nearest tokens `--duration-morph` 420ms and `--duration-instant` 80ms, but these are behaviour timers in script, not CSS motion. Keep 400 / 100 as local constants? My recommendation: keep **Answered 2026-11-06 (user): keep 400 / 100 (the recommendation).** | `QuantitySelector.tsx` |
| Q-QTY-5 | API in place of the script: `value` / `defaultValue` / `onValueChange(value, { previous, source })` and `onInvalid({ reason, raw })` replace `init`, `get` / `set` and the two events; `reserveDigits` replaces the `--c-quantity-selector-ch` pin; added `error` (the page's own), `messages` (replace a refusal message), `decreaseLabel` / `increaseLabel`, `name`; `readOnlyReason` is required with `readOnly` (the DS: always give the reason). Keep? My recommendation: keep **Answered 2026-11-06 (user): keep (the recommendation).** | `QuantitySelector.tsx` |

### Stat / KPI card

| ID | Question | Where |
|---|---|---|
| Q-STAT-1 | The tile is Card's own surface (`cui-card`), so its border, radius, shadow, padding, gap and the Interactive hover and focus are Card's; in a StatGrid its floor is the grid's 180px, not Card's 240px. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `StatCard.css` |
| Q-STAT-2 | Trend arrow: DESIGN-SYSTEM.md says `icon-micro` (14px); the CSS leaves it at the caption's 12px. Built 14px, as decided for Badge's icon. Keep? My recommendation: 14px **Answered 2026-11-10 (user): 14px (the recommendation).** | `StatCard.css` |
| Q-STAT-3 | The trend's direction is only an arrow and a colour, which aren't spoken. Built: a hidden word before the change ("Up 12.4% vs last month", "Down …"; flat already says "No change"). Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `StatCard.tsx` |
| Q-STAT-4 | Interactive is a DS variant with no CSS or markup. Built as Card's clickable card: the label is a real link (`href`) or button (`onClick`) stretched over the tile, described by the value and trend; shadow-2 on hover, the focus halo. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `StatCard.tsx` |
| Q-STAT-5 | Sparkline: the DS reserves a slot "below the trend row" but has no CSS. Built as a `sparkline` slot under the trend (8px gap), for `SparklineChart`. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `StatCard.tsx` |
| Q-STAT-6 | The achieved line shows one decimal ("53.0% of target achieved"), as every GoalBar and Pacing percentage was decided to; the gallery writes "53%". Keep one decimal? My recommendation: keep **Answered 2026-11-10 (user): keep one decimal (the recommendation).** | `StatCard.tsx` |
| Q-STAT-7 | The DS leaves open whether `.c-stats` (auto-fit at 180px) should move onto App Shell's 4-column content grid. Keep StatGrid as the DS's own grid for now? My recommendation: keep, and decide with App Shell **Answered 2026-11-10 (user): keep, decide with App Shell (the recommendation).** | `StatCard.css` |

### Slider

| ID | Question | Where |
|---|---|---|
| Q-SLD-1 | Five source rules are dropped by every browser (SLIDER-1), so the gallery never shows the hover shadow-3, the compact 16px thumb, the disabled thumb or reduced motion. Built with each engine's rule written separately, so they work as the CSS and DS mean. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Slider.css` |
| Q-SLD-2 | Label: the source's caption (12px) bold; Input field's label is label1 (14px) bold, and the DS says the Slider label follows Input field's. Built 12px, as the CSS. My recommendation: 14px (label1), so every form label looks the same **Answered 2026-11-10 (user): 14px (label1), as Input field (the recommendation).** | `Slider.css` |
| Q-SLD-3 | Hit target: the rail is 24px tall (the DS's own caveat), short of 44. Built 24px. My recommendation: on touch screens (`pointer: coarse`) the rail grows to 44px, the thumb and track unchanged, so a finger can hit it; the mouse keeps 24px **Answered 2026-11-10 (user): 44px rail on touch screens; 24px with a mouse (the recommendation).** | `Slider.css` |
| Q-SLD-4 | `aria-valuetext` (the DS requires it; the gallery sets none) comes from `format`, and the tooltip is hidden from screen readers since the value is already read. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Slider.tsx` |
| Q-SLD-5 | The tooltip is centred on the thumb (the DS's words), not on the value's share of the width as the gallery's script does (up to 10px off near the ends, SLIDER-5). Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Slider.css` |
| Q-SLD-6 | No token, kept local: the rail's 24px (nearest `--icon-md` and `--spacing-24`, same value, other meanings) and the 4px / 2px track (nearest `--spacing-4` / `--spacing-2`; the DS calls them one-offs, as Progress Bar's, kept local there). The thumb uses `--icon-base` 20px and `--icon-sm` 16px (the DS ties compact to `icon-sm`) and `--border-width-md`. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Slider.css` |
| Q-SLD-7 | Range naming: the gallery ties the visible label to the low thumb only and names the thumbs "Minimum value" / "Maximum value". Built: the range is a group named by the label, its thumbs "Minimum" and "Maximum" (changeable with `thumbLabels`), so a screen reader hears "Price range, group … Minimum, RM 200". Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Slider.tsx` |
| Q-SLD-8 | The DS asks for each range thumb's `aria-valuemin` / `aria-valuemax` to follow its partner (SLIDER-7). Not built: a native range input reports its own min and max, and its value already stops at the partner. My recommendation: drop the line from the DS **Answered 2026-11-10 (user): drop the line from the DS (the recommendation).** | `Slider.tsx` |
| Q-SLD-9 | Error state: the DS has none, and a slider can't hold an invalid value. Built none. My recommendation: none **Answered 2026-11-10 (user): none (the recommendation).** | — |
| Q-SLD-10 | Tooltip padding: the source's 6px 8px; the Tooltip component's sides were decided to be 12px (token audit) and the DS says the bubble is Tooltip's. Built 8px, as the CSS. My recommendation: 12px, one bubble look **Answered 2026-11-10 (user): 12px, as Tooltip (the recommendation).** | `Slider.css` |
| Q-SLD-11 | The tooltip also shows on keyboard focus (the gallery's script does; the DS names hover and drag). Keep? My recommendation: keep, so keyboard users see the value **Answered 2026-11-10 (user): keep (the recommendation).** | `Slider.tsx` |
| Q-SLD-12 | API in place of the script: `variant`, `value` / `defaultValue` / `onValueChange` (a number, or `[low, high]`), `format` (`number`, `rm`, `percent`) or `formatValue`, `showLimits`, `showValue`, `size`, `disabled`, `thumbLabels`, `name`. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Slider.tsx` |

### Toast

| ID | Question | Where |
|---|---|---|
| Q-TOAST-1 | Stack order: the newest toast sits at the bottom, nearest the corner, as the gallery draws it; the DS's text says "newest on top" (TOAST-1). Keep the gallery's? My recommendation: keep, and reword the DS (the newest appears where the eye already is, sliding up from the edge) **Answered 2026-11-10 (user): **newest on top** (not the recommendation): the list runs newest first, so the stack grows upward from the corner.** | `Toast.css`, `Toast.tsx` |
| Q-TOAST-2 | Phones (640px and below): the toast fills the band, dropping the 320px floor and 420px cap there, so it never overflows a 320px screen and is truly full width (TOAST-2). Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Toast.css` |
| Q-TOAST-3 | The close is the real Button (ghost, sm, icon-only): the same 32px and Neutral-2 hover as the gallery's `.c-icon-btn`, with a 16px X (the gallery's is an unset 13px) and the focus ring. Keep? My recommendation: keep, as Info Banner (Q-BANNER-5) **Answered 2026-11-10 (user): keep (the recommendation).** | `Toast.tsx` |
| Q-TOAST-4 | Announcements: the host holds one polite live list (`role="status"`) for the page's life and each toast is added to it, so every new toast is read out once; the gallery makes each new toast its own `role="status"`, which screen readers often skip. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Toast.tsx` |
| Q-TOAST-5 | Keyboard focus inside a toast pauses its timer, as hover does (the DS names hover only), so a keyboard user can reach the action before it leaves. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Toast.tsx` |
| Q-TOAST-6 | Escape dismisses the toast that holds focus, as Info Banner (Q-BANNER-4); after a dismiss focus doesn't move (Q-BANNER-2). Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Toast.tsx` |
| Q-TOAST-7 | The action is a link Button (the DS allows a link or a ghost button; a ghost button's 12px padding would push its label off the text's edge), and clicking it also dismisses the toast. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Toast.tsx` |
| Q-TOAST-8 | The lift above Back to top (TOAST-9) needs Back to top, which isn't converted. Build it with Back to top? My recommendation: yes, with Back to top **Answered 2026-11-10 (user): still relevant with newest on top, since the lift moves the whole stack's bottom edge, which would otherwise cover the button; build it with Back to top (the recommendation).** **Built 2026-11-10 with Back to top.** | `Toast.css` |
| Q-TOAST-9 | No token, kept local: the toast's 320px floor and 420px cap, the host's 380px width (nearest: the `--measure-*` tokens, which are text measures) and the DS's 640px breakpoint. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Toast.css` |
| Q-TOAST-10 | API in place of the script: `ToastProvider` once near the root; `useToast()` gives `toast({ tone, title, message, action, dismissible })`, which returns an id, and `dismiss(id)`; `Toast` alone for a static picture. A title, a message or both is required by the types. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Toast.tsx` |
| Q-TOAST-11 | The close shows on every tone by default (as the gallery does; the DS calls it optional); `dismissible: false` hides it, except on Danger, which always has it. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Toast.tsx` |

### Table

| ID | Question | Where |
|---|---|---|
| Q-TABLE-1 | Sorting from the keyboard: each sortable header holds a button (a press anywhere on the cell still sorts) and the sorted header carries `aria-sort`; the gallery's headers can't be reached at all (TABLE-2). Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.tsx` |
| Q-TABLE-2 | The action column's header is visually empty, as the DS says, and named "Actions" for screen readers; the gallery shows "Actions" (TABLE-1). Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.tsx` |
| Q-TABLE-3 | A row's hidden checkbox also shows when it takes keyboard focus (the DS names hover and "any checked"), so a keyboard user can see what they're on. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.css` |
| Q-TABLE-4 | `onRowClick` from the keyboard: the first column's content is a button that looks like the text (Enter opens the row); a press anywhere on the row still opens it. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.tsx` |
| Q-TABLE-5 | Names: `label` is required (the table's name); checkboxes "Select all rows" and "Select <row>"; row actions "<Action>, <row>" ("Edit, Raya promo"); the row's name comes from `getRowLabel` or the first column. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.tsx` |
| Q-TABLE-6 | Past 3 row or bulk actions the DS wants a `dots-three` menu; there's no menu component yet, so the types allow at most 3 (TABLE-10). Build the menu when a Menu component exists? My recommendation: yes, later **Answered 2026-11-10 (user): build the menu later, with a Menu component (the recommendation).** | `Table.tsx` |
| Q-TABLE-7 | Sticky header: the DS has no CSS for it, and a header can't stick to the page inside the clipped standalone box (TABLE-6). Built: with `stickyHeader` the table scrolls inside `maxHeight` (default 480px) and the header stays, with `shadow-1` once a row has scrolled under it. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.tsx`, `Table.css` |
| Q-TABLE-8 | Phones: the DS's 600px minimum table width is built; its "scrollbar hidden until hover" isn't (the browser's own scrollbars; hiding them hides that the table scrolls) (TABLE-8). Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.css` |
| Q-TABLE-9 | No token, kept local: the frozen-edge shadow (shadow-1's colour, pointing sideways; TABLE-5), the 40 / 72 / 104px column widths, the 14px skeleton bar, the 240px empty body, the 600px phone table, and the DS's 1024px and 767px breakpoints. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.css` |
| Q-TABLE-10 | Column widths: the DS calls the checkbox (40px) and action (40 / 72 / 104px) columns fixed, but the content outgrows them, so they render 50px and 100px (two actions), in the gallery and here (TABLE-3). Keep the gallery's widths and reword the DS ("hugs its content")? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.css` |
| Q-TABLE-11 | Column priority reads backwards in the DS: `medium` hides at 1024px and below, `low` only at 768px and below (TABLE-7). Built as written. My recommendation: swap them, so `low` hides first (1024px) and `medium` at 768px **Answered 2026-11-10 (user): swap them: `low` hides first, at 1024px, `medium` at 768px (the recommendation).** | `Table.css` |
| Q-TABLE-12 | Numbers, dates and statuses stay on one line, so a table that doesn't fit scrolls sideways rather than breaking "31 Aug 2026" over three lines (the gallery forces its wide demo to 1180px instead). Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.css` |
| Q-TABLE-13 | The charts' "View as table" still uses Table's two rules copied into `charts-extra.css` (XCH-9). The docs site's tables now use Table. Swap the charts over in a follow-up, once Table is approved? My recommendation: yes, a follow-up **Answered 2026-11-10 (user): switch the charts' "View as table" to Table in a follow-up (the recommendation).** | `src/charts-extra`, `src/charts` |
| Q-TABLE-14 | API in place of the script: one data-driven `Table` (`columns` with `render` / `sortValue` / `type` / `priority`, `rows`, `getRowKey`), with `selectable` + `selectedKeys`, `bulkActions`, `rowActions`, `sort` + `manualSort`, `loading`, `empty`, `stickyHeader` + `maxHeight`, `onRowClick`. Keep? My recommendation: keep **Answered 2026-11-10 (user): keep (the recommendation).** | `Table.tsx` |
| Q-TABLE-15 | Total row (added 2026-11-10 at the user's request; the DLS has none, so it is designed here and needs review): any column with a `total` adds a `<tfoot>` row. The first column reads "Total" (a row header, `totalLabel`); totals are body2 bold Neutral-9 under a 1px Neutral-3 line; standalone fills the row Neutral-2 (as its header), embedded doesn't (as first built). Computed from every row, it stays at the bottom when sorting, follows the frozen columns, stays in view with a sticky header, and hides while loading or empty. A rate shows the overall rate, never a sum of percentages. Keep this look? My recommendation: keep **Answered 2026-11-10 (user): keep, with the Neutral-2 fill in embedded tables too, not only standalone.** | `Table.tsx`, `Table.css` |
| Q-TABLE-16 | The frozen-edge shadow (the DS's `2px 0 4px` at 45% grey) is hard to see, so a column cut off under a frozen one can look like a glitch (seen in the new "Scrolling left and right" docs example). Keep the DS's, or a stronger sideways shadow at about `shadow-2`'s strength (8px blur, same grey)? My recommendation: the stronger one **Answered 2026-11-10 (user): the stronger shadow: 2px 0 8px at shadow-2's grey (the recommendation).** | `Table.css` |

### Pagination

| ID | Question | Where |
|---|---|---|
| Q-PAG-1 | Rows per page can strand the reader (PAG-2): after picking 100, the page count may drop under 10, Default takes over, and there is no Rows per page to switch back. Built as the DS (Overflow only). My recommendation: show Rows per page in both variants whenever the page offers it (`onPageSizeChange`), and hide the whole control only when the results fit in the smallest page size **Answered 2026-11-10: yes, in both variants; hidden only when the results fit the smallest size, and at one page the count and Rows per page stay without page controls (the recommendation)** | `Pagination.tsx` |
| Q-PAG-2 | The page and Rows per page selects are native `<select>`s styled as Input field's box (as the CSS; the DS says reuse Dropdown verbatim) (PAG-5). Native gives the phone's own picker, scrolls 77+ pages and types to jump. Keep native? My recommendation: keep **Answered 2026-11-10: keep native (the recommendation)** **Changed 2026-11-10: switch to the library's Dropdown (the user), now that it exists: the open list matches the system; phones lose the native picker** | `Pagination.tsx`, `Pagination.css` |
| Q-PAG-3 | "No results" can't show: zero results fit on one page, so the control hides (PAG-3). Built: it hides; the table or list's own empty state says there's nothing. My recommendation: keep, and drop "No results" from the DS **Answered 2026-11-10: keep; drop "No results" from the DS (the recommendation)** | `Pagination.tsx` |
| Q-PAG-4 | Page-size memory: the DS saves every table's size under one shared key. Built opt-in and per table: `pageSizeStorageKey="campaigns-page-size"` remembers and restores it; without it, nothing is saved. Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `Pagination.tsx` |
| Q-PAG-5 | The 7-slot window: `1 2 3 4 5 … 9`, `1 … 4 [5] 6 … 9`, `1 … 5 6 7 8 9` (first and last always, the current page's neighbours, "…" for the gaps); only 8- and 9-page tables need it (PAG-4). Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `Pagination.tsx` |
| Q-PAG-6 | Pressed: the source's Neutral-3 (PAG-8), built. Button's ghost pressed was decided to look like hover (Neutral-2). Match Button? My recommendation: match Button (Neutral-2), since the DS says Pagination reuses Button Ghost **Answered 2026-11-10: match Button (Neutral-2) (the recommendation)** | `Pagination.css` |
| Q-PAG-7 | Names: a `<nav>` named "Pagination"; numbers "Page 3" with `aria-current="page"`; Default's icon buttons "Previous page" / "Next page"; Overflow's Prev / Next named by their visible words (so speech input matches); the page select "Current page" described by "of 77". Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `Pagination.tsx` |
| Q-PAG-8 | Tool approval keeps a copy of Pagination's "3 of 6" indicator style (PAG-10). Point it at Pagination's class and delete the copy? My recommendation: yes, now that Pagination exists **Answered 2026-11-10: yes: Tool approval uses `.cui-pagination__indicator`, its copy deleted (the recommendation)** | `ToolApproval.css` |
| Q-PAG-9 | No token, kept local: the selects' 28px end padding for the caret (nearest `--spacing-24` / `--spacing-32`) and the DS's 767px breakpoint. Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `Pagination.css` |
| Q-PAG-10 | API in place of the script: `page` / `defaultPage` / `onPageChange`, `pageSize`, `totalResults` (or `totalPages` when the total is unknown), `onPageSizeChange` + `pageSizeOptions`, `pageSizeStorageKey`, `loading`, `label`; the variant and the hiding are automatic. Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `Pagination.tsx` |
| Q-BTT-1 | Focus after the click (BTT-2): built as the DS, focus isn't moved; the button hides near the top and focus drops, so the next Tab goes on from the bottom of the page. Move focus to the page's first `h1` (made focusable with `tabindex="-1"`, the heading exception) once the scroll ends, so a keyboard user lands where they went? My recommendation: yes **Answered 2026-11-10: yes: focus moves to the page's first `h1` (in `scrollRef` if given, `tabindex="-1"`, `preventScroll`) (the recommendation)** | `BackToTop.tsx` |
| Q-BTT-2 | API: `scrollRef` for a page that scrolls inside a frame (App Shell's content; App Shell isn't converted, and can pass it for you when it is) and `label`; the thresholds (480 / 240) are fixed, not props. Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `BackToTop.tsx` |
| Q-BTT-3 | Action bar isn't converted (BTT-3): the button reads `--cui-action-bar-clearance` on `<html>`, which Action bar will write when it is built. Keep that name? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `BackToTop.css` |
| Q-BTT-4 | Hover text is the native `title`, as the DS says (`title="Back to top"`), not the library's Tooltip: the browser's own small box after a pause. Keep `title`, or use Tooltip so it looks like the rest of the system? My recommendation: keep `title` (the DS's choice; Tooltip would add a layer over a corner button that the toasts also use) **Answered 2026-11-10: keep `title` (the recommendation)** | `BackToTop.tsx` |
| Q-BTT-5 | Names (BTT-4): `data-cui-back-to-top-shown` on `<html>` in place of the class, and `--cui-back-to-top-edge` / `-bottom` / `-y` in place of `--c-…`. Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `BackToTop.css`, `Toast.css` |
| Q-DP-1 | Opening moves focus into the calendar, to the chosen day (or today), so it can be used from the keyboard; Escape or a pick returns it to the trigger. That's a focus move outside the approved exceptions (like opening a menu). Approve? My recommendation: yes **Answered 2026-11-10: approved (the recommendation)** | `DatePicker.tsx` |
| Q-DP-2 | Day size (DP-1): about 34px in the 280px panel (the CSS), or the DS's 36px with a 296px panel? My recommendation: keep 280px / about 34px, and have the DS say so **Answered 2026-11-10: keep 280px / about 34px (the recommendation)** | `DatePicker.css` |
| Q-DP-3 | Date format: built as the gallery, US order ("Jul 12, 2026", "Jul 12 – Jul 24, 2026"). The DS writes dates day first elsewhere ("12 Oct 2026", Timeline), which is also how dates are read in Malaysia. Switch to "12 Jul 2026" and "12 – 24 Jul 2026"? My recommendation: yes, day first **Answered 2026-11-10: day first ("12 Jul 2026", "12 – 24 Jul 2026"), the user** | `DatePicker.tsx` |
| Q-DP-4 | Trigger (DP-2): Input field's box, full width of its container like every field (the gallery's hugs its text), with Dropdown's hover and open looks, Input field's focus, error and disabled, label and helper. Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `DatePicker.css` |
| Q-DP-5 | The range's 2px white lines (DP-4): close them so the range reads as one band, as the DS asks (the ends keep their rounded outer corners)? My recommendation: yes, close them **Answered 2026-11-10: close them: the start and each day between fill the 2px gap to their right, within each week (the recommendation)** | `DatePicker.css` |
| Q-DP-6 | Six weeks always, so the month arrows never move under the pointer as months change length (the panel is about 40px taller for most months). Or only the weeks the month needs? My recommendation: six always **Answered 2026-11-10: six always (the recommendation)** | `DatePicker.tsx` |
| Q-DP-7 | Range picking: first pick the start, second the end (an earlier day starts again); Apply (off until both are picked) commits; Cancel, Escape or a click outside keeps the old range. No hover preview of the range while choosing the end. Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `DatePicker.tsx` |
| Q-DP-8 | First day of the week: Sunday, as the gallery's S M T W T F S; `weekStartsOn={1}` gives Monday. Most calendars and work weeks here start on Monday. Make Monday the default? My recommendation: yes, Monday **Answered 2026-11-10: Monday (the recommendation)** | `DatePicker.tsx` |
| Q-DP-9 | Today shows no hover fill (the source's order: today's transparent fill comes after hover). Keep, so today's outline never looks chosen? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `DatePicker.css` |
| Q-DP-10 | Added: a focus ring on the keyboard's day (the source has none), and forced-colours rules. Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `DatePicker.css` |
| Q-DP-11 | Motion: none, as the DS gives none (the calendar appears and goes at once, months change at once). Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `DatePicker.css` |
| Q-DP-12 | API: `mode`, values as `"YYYY-MM-DD"` (a range `{ start, end }`) so no time zone can shift a day, `min` / `max` / `isDateDisabled`, `weekStartsOn`, Input field's `label` / `helper` / `error` / `required` / `disabled` / `size`, `applyLabel` / `cancelLabel`, `name`. Typing a date isn't offered (the DS's trigger is a button). Keep? My recommendation: keep **Answered 2026-11-10: keep (the recommendation)** | `DatePicker.tsx` |

### Motion, batch 1 (Fade in, Slide up, Slide down, Slide left, Slide right, Collapse)

Source: Amicro `registry/ui/entrance/*` (fade-in, fade-up, fade-down, slide-left, slide-right, scale-in, zoom-in). The DLS sources are Motion (DESIGN-SYSTEM.md 536 to 580) and the entrance and exit rule (1089, 2222, 2233).

| ID | What |
|---|---|
| XMO-1 | Amicro's entrances use hand-set seconds (0.5 to 0.7), travel of 20 or 40px and their own curves (`easeOutExpo`, `easeOutCubic`). Each is built on the token pairing the library already uses: `--duration-base` with `--ease-settle` (Fade in: `--ease-standard`), and 8px of travel (`--spacing-8`, the DLS entrance distance). Props take token names, never numbers. Q-MOT-1 |
| XMO-2 | Amicro's Fade up and Fade down are covered by Slide up and the new Slide down; Slide left and Slide right are new. All four share one drawing (`lib/Slide.tsx`) so they cannot drift. Names follow the direction of travel (Slide left arrives from the right), which is also Amicro's meaning of its Slide left. Q-MOT-2 |
| XMO-3 | The three existing wrappers moved into folders (`src/motion/FadeIn`, `SlideUp`, `Collapse`) with docs, usage and preview files so they appear in the Motion group. Behaviour is unchanged. Slide up is now a thin wrapper over the shared Slide |
| XMO-4 | The root `@collabrium/ui` export lists the tokens and the three original wrappers only; the new pieces are imported from `@collabrium/ui/motion`. Q-MOT-3 |

### Motion, batch 2 (text effects, hover effects, cursor effects)

Source: Amicro `registry/ui/text/*`, `hover/*` and `cursor/*`. The DLS sources are Motion (DESIGN-SYSTEM.md 536 to 580) and the entrance and exit rule (1089, 2222, 2233).

| ID | What |
|---|---|
| XMO-5 | Text effects (Blur text, Character stagger, Word reveal, Text reveal) are one `<span>` each, so they can sit inside a heading. Each plays once as the text scrolls into view. The text is in the page once, visually hidden, and the moving pieces are `aria-hidden`, so a screen reader reads a sentence and not letters (Amicro's pieces were read letter by letter). Durations and easings are token names; Text reveal uses the DLS entrance-reveal pair (`--duration-reveal`, `--ease-reveal`) and `--stagger-md`. Reduced motion drops the travel, blur, scale and stagger and keeps the fade. Q-MOT-5 |
| XMO-6 | Letters and words stagger at 20ms and 40ms. The DLS staggers (80ms, 120ms) are for rows and would make a 20-letter heading take 1.6s. Local values, no token. Q-MOT-5 |
| XMO-7 | Amicro's springs are kept as they are, as the user decided (D-107): Character stagger (300, 18, 0.8), Magnetic (150, 15, 0.6) and Mouse follow (180, 20) overshoot slightly. Tilt (damping 20, stiffness 200, mass 0.5) and Cursor trail (overdamped) settle without overshoot. The DLS says movement never bounces, so the three overshooting pieces need an exception. Q-MOT-6 |
| XMO-8 | Hover cards (Amicro `CardHover`): a grid with one highlight that glides between cards (a shared layout animation), also on focus (Amicro: hover only). The card is plain: Neutral-1, 1px Neutral-3 border, radius-md, 16px padding (Amicro: zinc, dark mode, a 24px outer radius). Under reduced motion the highlight fades in on the card instead of travelling. A card with an `href` is a real link; without one it is a plain block. The grid fills the width with a 220px smallest card (Amicro: three columns from 768px). Q-MOT-7 |
| XMO-9 | Spotlight (Amicro `Spotlight`) and Glow button (Amicro `GlowButton`) are the same effect on a card and a button, so they are one piece: a wrapper whose light follows the pointer, in a colour prop (Obsidian or a series colour) at 18%, over the content, taking no clicks. A Button inside gives Glow button, so the DLS Button keeps its look (Amicro's was a second, dark button). Sizes 120, 180 and 250px have no tokens. Q-MOT-8, Q-MOT-9 |
| XMO-10 | Magnetic (Amicro `MagneticButton`) and Tilt (Amicro `TiltCard`) are wrappers: Amicro drew a dark pill button and a gradient card. The wrapper adds the movement only, so a DLS Button or any card inside keeps its own look. Strength and tilt are three named steps (20, 35, 50%; 6, 10, 15 degrees), not numbers. Only a mouse triggers them. Amicro's 1.03 hover scale and the card's 40px content lift are dropped. Q-MOT-9 |
| XMO-11 | Cursor trail and Mouse follow follow the mouse across the whole window at `--z-float`, take no clicks, are `aria-hidden`, show for a mouse only and not at all under reduced motion. Colours are Obsidian or a series colour (Amicro: a Tailwind class). Six dots, 8px down to 3px. |

### Motion, batch 3 (scroll effects, page transition, hooks)

Source: Amicro `registry/ui/scroll/*`, `transitions/page-transition.tsx`, `toggles` and `registry/hooks/*`.

| ID | What |
|---|---|
| XMO-12 | Scroll progress (Amicro `ProgressIndicator`): a 4px bar (`--spacing-4`) fixed to the top at `--z-float`, in Obsidian or a series colour (Amicro: a Tailwind class and `z-[9999]`), `aria-hidden`, taking no clicks. Its spring settles without overshoot; reduced motion follows the scroll exactly. A `container` ref follows a scrolling pane when the page is not what scrolls (this docs site is one) |
| XMO-13 | Scroll reveal (Amicro `ScrollReveal`): the Slide pieces' fade and 8px travel, played once when 15% is in view, with `--duration-reveal` and `--ease-reveal` (Amicro: 30px travel, 0.95 scale, 0.6s). Q-MOT-1 |
| XMO-14 | Sticky reveal (Amicro `StickyReveal`): the active step is found with an IntersectionObserver on a band through the middle of the window; the steps' text goes Neutral-5 to Neutral-9 (Amicro dimmed to 30% opacity, which fails contrast); visuals crossfade without the 90% scale; inactive visuals are `aria-hidden` and inert; the layout is responsive (the panel sits above the steps below 720px). Heights (60vh, 40vh, 50vh) have no tokens. Q-MOT-11 |
| XMO-15 | Page transition (Amicro `PageTransition`): its type list has 18 names, but the file draws only Double stairs and Liquid wave; the other 16 fall back to a fade. Three are ported: stairs, wave and fade. Colours are Neutral tokens, the layer is `--z-tour`, the stairs use `--duration-reveal` with `--ease-precise` and a 50ms stagger, and the wave keeps Amicro's 1.3s drawing with a fixed spread of delays instead of `Math.random`. Reduced motion makes every type a fade. Q-MOT-10, Q-MOT-13 |
| XMO-16 | Hooks. `useScrollProgress` clamps to 0 to 1. `useMousePosition` reads pointer events and ignores touch and pen. `useStagger` takes `step: 'sm' | 'md'` (the DLS row staggers) instead of a free number. `useWebHaptics` does nothing under reduced motion. `useReducedMotion` is the motion library's hook, re-exported. Q-MOT-14 |
| XMO-17 | Amicro's Classic toggle (a spring-driven pill switch) is not built: Switch is the DLS component for that, with the same job. Q-MOT-12. The docs generator now marks a hook's file (`.ts`) as a client file too |

### Motion, batch 4 (morphs and small effects)

Source: Amicro `src/components/IconSwap.tsx`, `AnimatedStarCounter.tsx`, `DiaTextReveal.tsx`, `css-animations/*` (Dock, FocusBlur, MediaBetweenText, ScrambleHover, TabBar) and `morphing/*` (PlayPauseMorph, SearchExpand).

| ID | What |
|---|---|
| XMO-18 | Icon swap (Amicro `IconSwap` and `IconSwapItem`, two pieces with a spring of bounce 0) is one piece that takes a `swap` key, over `--duration-fast` with `--ease-standard`; reduced motion cross-fades with no shrink or blur. Count up (Amicro `AnimatedStarCounter`) counts from the figure on show to a new value (Amicro restarted from 0), in `--duration-base` with `--ease-reveal`, with tabular digits and the final figure for screen readers. |
| XMO-19 | Scramble hover keeps Amicro's 40ms frame and 10 frames (no token); its `sequential` and `revealDirection` props are one `settle` option, `useOriginalCharsOnly` and `characters` are `alphabet`. The real text is in the page (visually hidden) and the scramble is `aria-hidden` (Amicro's was read as noise). No scramble under reduced motion. Q-MOT-16 |
| XMO-20 | Focus blur is Amicro's `:has()` demo as a wrapper of any items, blurring siblings 4px (`--spacing-4`) and fading to 35% over `--duration-base`, only where there is a real hover, and on keyboard focus too. Text sweep (Amicro `DiaTextReveal`): one hue's ramp replaces its eight blues; the finished text is Neutral-9 (Amicro's `currentColor` inside a transparent-text element left it transparent); its rotating phrases and width animation are not ported; forced colours and reduced motion show plain text. Q-MOT-15 |
| XMO-21 | Media between text: the media is sized in `em` (2em by 1.25em, Amicro 54 to 70px by 32 to 40px), `radius-sm`, `shadow-1`, `--duration-base` with `--ease-settle` in place of a spring; `alt` is required (pass `""` for decoration); the imperative `ref` trigger is dropped; under reduced motion the media is always shown. Q-MOT-17 |
| XMO-22 | Play pause morph is the icon only (Amicro: a black round button, caption and spring): two four-point paths that turn into each other in `--duration-morph` with `--ease-morph`, the DLS pair for pose-to-pose changes. The host puts it in a DLS Button. Search expand: tokens, Phosphor icons, `--duration-morph` with `--ease-morph`, a plain Esc hint, a real search input named by `aria-label`, the toggle has `aria-expanded`. It does not move focus into the field when it opens (Amicro did), because the DLS says focus moves only to a heading or an error message. Q-MOT-18 |
| XMO-23 | Expanding tabs (Amicro `TabBar`): now a keyboard-operable tab list (arrows, Home, End, roving Tab stop), each tab named by its label even when only the icon shows. Per-tab Tailwind colours become a colour (Obsidian or a series colour) used for a 12% tint, a 28% border and the icon; the label stays Neutral-9 because accent text on a tint does not reach AA. `--duration-base` with `--ease-settle` replaces the spring. Q-MOT-19 |
| XMO-24 | Dock (Amicro `Dock`): coloured squares become icon buttons with a label; the swell is 32px to 48px (`--spacing-32`, `--spacing-48`) over a reach of 80px (no token) on Amicro's overdamped spring; mouse only. Drag-to-reorder is not ported: it has no keyboard way. Q-MOT-17 |

### Motion, batch 5 (card layouts)

Source: Amicro `src/components/cards/*` (CardArc5, CardArc7, CardLongArc5, CardLinearSpread, CardCornerFan, CardStampArc, CardCascadeStagger, CardScatterSpread, CardWheelFan, CardCarousel, CardCoverFlow, CardTimeMachine). The DLS has no card-layout source.

| ID | What |
|---|---|
| XMO-25 | Card spread merges Amicro's nine stack pieces (arc of five, arc of seven, long arc, linear, corner fan, stamp, cascade, scatter, wheel) into one with a `layout` option, since only the per-card poses differ. Poses are Amicro's, in px and degrees. Amicro mixed spring configs with durations; every layout now tweens over `--duration-slow` with `--ease-settle` (no overshoot). The stack is a focusable group named by `aria-label` that opens on hover, on a tap, and on focus (Amicro: hover and tap only); each card is a group named by its `label`. Q-MOT-22, Q-MOT-23 |
| XMO-26 | Cards are `items` with a `label` and any `content` (Amicro: placeholder colours or an images array with hard-coded Unsplash URLs). The card surface is Neutral-1, a 1px Neutral-3 border, radius-md and shadow-2 (Amicro: dark mode colours, 24px radius). An `img` in `content` fills the card. |
| XMO-27 | Card carousel and Card cover flow: Previous and Next are DLS icon-only secondary small Buttons (disabled at the ends); the dots are buttons named "Go to label" with `aria-current` (Amicro: clickable divs); the arrow keys work; the group is `aria-roledescription="carousel"` and slides are named "label, n of N"; in the carousel only the card in front is exposed (the others are `aria-hidden` and inert); in the cover flow every card stays in the page as a slide, since clicking a card is a pointer shortcut and the buttons, dots and arrow keys are the keyboard way. Springs become `--duration-slow` with `--ease-settle`. Under reduced motion the cards move at once, with no fan, turn or depth. Amicro's monochrome variants are just a card with other content. Q-MOT-22 |
| XMO-28 | Card time machine: the scrubber's long marks are buttons named by each card's `label` (Amicro: buttons with an index and a date); the short marks between are pointer-only and `aria-hidden`; the current mark is Navy. The SVG goo filter that softened the card corners is not ported. Only the front card is exposed. Q-MOT-24 |

### Card (affects the Card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| CARD-1 | The interactive card is a `div` with a hover and focus style (`.c-card-interactive`) and, in the gallery, a `tabindex` and a click handler: not a link or button. Built as a real link or button in the title, stretched over the card. Q-CARD-1 | 289–290 | 2634–2635, 3316 |
| CARD-2 | The DLS styles a bare `h5` inside the card (`.c-card h5`) and says nothing about the heading level. Built a `CardTitle` that renders a real heading, drawn as h5, with the level a prop (default 3). Q-CARD-2 | 286 | 2621 |
| CARD-3 | Element-accented has one rule, in Wood's Salmon Pink (`.c-card-accent`); the DS says the border takes the owning element's colour. Element-tinted and the chip's element colours have no CSS (the chip is Navy only). Built all five elements for each, from the tokens. Q-CARD-3 | 288, 241 | 2636–2641 |
| CARD-4 | The header's 16px bottom margin is always on in the CSS; the DS says only when a subtitle or body follows. Q-CARD-5 decided 2026-10-30: followed the DS (the margin drops when the header is last) | 278 | 2624 Q-CARD-7 (2026-10-30): the 16px margin plus the card's 8px gap also made the header 24px from the body, not the 16px the DS gives; built 8px (user). |
| CARD-5 | The subtitle (caption, Neutral-5, weight 400) is described in the DS and has no CSS. Built from the DS text. | — | 2625 |

### Selectable card, a variant of Card (affects the Card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| SEL-1 | The checkbox appears on `:hover` only in the source: a keyboard user would tab onto an invisible control, and a touch screen (no hover) could never show it. Built it also shown on `:focus-within` and, under `(hover: none)`, always. Q-SEL-1 | 301 | 2765–2770 |
| SEL-2 | The source's `.is-selected` shadow-3 (declared after the focus rule at equal specificity) hides the focus halo on a selected card. Built the halo to win over Selected. Q-SEL-2 | 290, 303 | 2790–2797 |
| SEL-3 | The source draws the checkbox as a bare `span` with `role="checkbox"`. Built it with the real Checkbox, unlabelled and named by `selectLabel`, placed first in the card so it is the first tab stop. Q-SEL-3 | 299 | 2760–2765 |

### USP card, a variant of Card (affects the Card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| USP-1 | The DS names the header "h4, same as base", but the base card's title is h5. Built it with the base title (an h5 look, level 3 by default). Q-USP-2 | 307 | 2641 |
| USP-2 | The DLS added USP "as a variant of Card, not a new component" (v0.9.43), and the Selectable decision puts variants inside Card. Built it as `minWidth="functional"` and `CardList` on Card, not a separate component. Q-USP-1 | 304–314 | 2641, 13002 |
| USP-3 | The button's full width and centred label are `.c-card-usp .c-btn` in the source. Built as `.cui-card > .cui-button`, so any Button that is a direct child of a card stretches; Button has no width prop. Q-USP-3 | 314 | 2641 |

### Empty state (affects the Empty state conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| EMPTY-1 | The inline link has no hover or focus style. Ported as it is. Q-EMPTY-1 | 2643 | 5205 |
| EMPTY-2 | Inline has no mobile padding rule; the DS says 12px below 768px. Followed the CSS (16px). Q-EMPTY-2 | 2641, 2645–2653 | 5257 |
| EMPTY-3 | Full-page min-height is 100vh; the DS says `calc(100vh − nav height)`. Followed the CSS, settable by a container. Q-EMPTY-3 | 2633 | 5227 |
| EMPTY-4 | Inline is left-aligned here and in the DS Empty state section, but the Table section draws its no-results row centred (Table, "No results from filter/search"). Followed the Empty state CSS; Table decides its own when it is converted | 2641 | 9353 |
| EMPTY-5 | Anatomy: the CSS comment makes the icon and heading optional; the DS Variants table lists both for Full-page and Section. Built both optional, as the CSS says; inline takes neither (the types forbid them) | 2616 | 5220 |

### Price summary card, a variant of Card (affects the Price summary card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| PRICE-1 | The DS says the header is h4; the gallery's card uses the base `h5`. Built with the base title. Q-PRICE-1 | 339 | 2905, 2912 |
| PRICE-2 | Show more, Show less, removal and the count (display rules 1 to 9 and the edge cases) are written in the DS only; the gallery has no script for them. Built from the DS text | 350–353 | 2931–2998 |
| PRICE-3 | The remove × shows on hover and focus only; nothing for touch. Q-PRICE-2 | 346–347 | 2914 |
| PRICE-4 | "Show X more" has no hover or focus style, though the DS says it adapts Chip's show-less recipe, which has a focus ring. Q-PRICE-4 | 353 | 2939 |
| PRICE-5 | The Empty state's variant isn't named (the CSS says `.c-empty` is reused "verbatim"; the DS names the icon and heading only), and there is no gallery demo of it. Q-PRICE-6 | 320 | 2906 |
| PRICE-6 | "Item animates in at the bottom of the list" has no animation in the CSS. Q-PRICE-8 | — | 2992 |
| PRICE-7 | The DS's amounts always carry two decimals (`RM 1,200.00`), against the Numbers rule's own examples, on purpose. Built that way: the card formats every amount | — | 2919 |

### Tag (affects the Tag conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| TAG-1 | The plain `.c-tag` (Neutral-2 fill, Neutral-5 text) has no DS entry; Profile card uses it, with no dot, for KOC and Seeder. Built as `variant="neutral"`, with no dot | 1650 | 2509 |
| TAG-2 | The optional 14px leading icon is in the DS only; the CSS has no icon rule, and the DS doesn't say how it sits with the dot. Q-TAG-1 | — | 2527 |
| TAG-3 | Element text colours are below AA on their tints; only Purple's is corrected. Q-TAG-3 | 1654–1658 | 2509, 2519 |
| TAG-4 | `gap:4px` is a literal in the CSS; built with `spacing-4` (same value) | 1650 | — |

### Profile card, a variant of Card (affects the Profile card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| PROFILE-1 | Meta and Persona lines: the DS says caption (12px); `.c-card p` outranks their class, so the CSS draws 14px. Followed the CSS. Q-PROFILE-4 | 284, 421–422 | 3101–3102 |
| PROFILE-2 | Initials after a naming particle: the DS text says the last word after the particle, its example and the gallery use the first. Followed the example. Q-PROFILE-3 | — | 3108–3113 |
| PROFILE-3 | The interactive card is a focusable `div` with no action; built as Card's stretched title link or button. Q-PROFILE-7 | 389–391 | 3200 |
| PROFILE-4 | The DS names the name an `<h4>`; the gallery draws an `<h5>`. Built with Card's title (h5 look, level 3 by default), as Q-USP-2 | 418 | 3100 |
| PROFILE-5 | The menu, its closing rules, one menu at a time and the Select toggle are in the gallery's script only (preview.html 21152–21190, 21404–21420); ported as React state. Menu items have no focus style. Q-PROFILE-1, Q-PROFILE-2 | 405–410 | 3061–3075 |
| PROFILE-6 | The Selected border, shadow and padding come straight from the CSS; a hovered selected card shows shadow-2, because the interactive hover outranks Selected. Q-PROFILE-9 | 389–392 | 3216–3223 |

### Tooltip (affects the Tooltip conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| TOOLTIP-1 | The caret is in the DS only. Not built, as the CSS (decided Q-TOOLTIP-1) | — | Tooltip, Caret row |
| TOOLTIP-2 | The CSS never wraps; the DS wraps past 240px. Built from the DS. Q-TOOLTIP-2 | 3591 | Tooltip, Bubble row |
| TOOLTIP-3 | Only top placement in the CSS (with a top/bottom flip in the gallery's script); the DS has four placements, flip, shift and a bottom fallback. Built from the DS. Q-TOOLTIP-3 | 3591 | Viewport collision |
| TOOLTIP-4 | `z-index: 2` in the CSS; the DS says above modals. Built with `--z-tooltip` in the portal. Q-TOOLTIP-4 | 3591 | Z-index and stacking |
| TOOLTIP-5 | Escape, page scroll, tap-outside, one-at-a-time and the 500ms long press are in the DS only; the gallery's script shows and hides on hover and focus. Built from the DS | — | Dismiss rules, Touch and mobile |
| TOOLTIP-6 | The `aria-label` alternative (the tooltip as the trigger's only name) is in the DS only. Built as `role="label"` | — | Accessibility |
| TOOLTIP-7 | The DS hides a tooltip on page scroll. Tabbing to a trigger below the fold makes the browser scroll it into view, which would hide the tooltip at once. Built: while the trigger holds keyboard focus, a scroll moves the bubble with it; a hover or touch tooltip still hides. Q-TOOLTIP-6 | — | Dismiss rules |

### Campaign card, a variant of Card (affects the Campaign card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| CAMPAIGN-1 | The tile is an `<article role="button" tabindex="0">` that opens on click, Enter and Space, with the faces' focusable span nested inside it (interactive content inside a button, which screen readers flatten). Built as Card (Q-CARD-1): the name is a real link or button stretched over the card, and the faces sit above it. The hover lift needs `href` or `onOpen`. Q-CAMPAIGN-1 | 450–453 | 3301–3306 |
| CAMPAIGN-2 | The faces are a focusable `<span>` with `aria-describedby` and no role or name, so focusing them announces nothing useful. Built: `role="img"`, named by the tooltip text (Tooltip `role="label"`). Q-CAMPAIGN-2 | 464 | Faces tooltip row |
| CAMPAIGN-3 | The faces have no focus style (the browser's default outline). Built with the focus ring tokens. Q-CAMPAIGN-3 | 464 | — |
| CAMPAIGN-4 | Pax and Quote are bare spans; built as a `<dl>` (`dt` / `dd`), margins reset, so each value is read with its label. Looks the same. Q-CAMPAIGN-4 | 481–487 | Metric rows |
| CAMPAIGN-5 | Forced colours: no border and the shadows aren't drawn, so the tile has no edge. Built: a 1px CanvasText border (padding 1px less a side), in forced colours only, as Tag. Q-CAMPAIGN-5 | — | — |
| CAMPAIGN-6 | "Clamp by character count at content level" is the host's: the component truncates with CSS and the usage doc says to clamp. The DS gives no count | — | Title row |

### Ad Placement Card, a variant of Card (affects the Ad Placement Card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| ADPL-1 | The gallery shows the card statically and has no script. Positioning, one at a time, the sticky Escape, scroll and resize, and the touch rule are built from the DS. Q-ADPL-1 | 1176–1261 | Ad Placement Card, Positioning, Interaction contract |
| ADPL-2 | The fit line's "· N built for it" is in every DS example; nothing says what shows without it. Built: `built` is optional, and the part is dropped when it is left out. Q-ADPL-2 | — | Fit row |
| ADPL-3 | The slot's name "{title}, {where}" is a rule for the host's button. Built: the component sets it when the slot has no `aria-label`. Q-ADPL-3 | — | Interaction contract |
| ADPL-4 | `.c-card-ad-placement-titles` (`display: contents`) is dropped: the title and where are direct children of the head grid, which renders the same | 1225 | — |
| ADPL-5 | The DS hides the card on scroll; the scroll that brings a tabbed-to slot into view would hide it at once. Built as Tooltip (TOOLTIP-7). Q-ADPL-6 | — | Interaction contract |

### Progress-to-Goal Bar (affects the Progress-to-Goal Bar conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| GOAL-1 | Heading weight: the DS anatomy says `weight-extrabold` (800); its Typography table and the CSS say h5 (700). Followed the CSS. Q-GOAL-1 | 4688 | Anatomy, Heading; Typography |
| GOAL-2 | In-table label: the DS anatomy and the gallery show the target's value above the rail; the Typography table's sample is "RM 6,000" (the total). Followed the anatomy and the gallery. Q-GOAL-2 | 4767 | Anatomy; Typography |
| GOAL-3 | The gallery's Chart variant row shows Total and Target but no Gap, though the bar is short; the DS row has Gap, dropped only to fit one line. Built from the DS. Q-GOAL-3 | — | Responsive, Compact label row |
| GOAL-4 | The gallery is static markup with hand-set positions. Everything computed (scale, gap, headroom, re-base, colour walk, short form, tag edge collision, the Gap rule) is built from the DS. Q-GOAL-11 | — | Scale, States, Responsive |
| GOAL-5 | No forced-colours rule: the fills are backgrounds, so in forced colours the segments, swatches and target line vanish. Q-GOAL-5 | — | — |
| GOAL-6 | The DS names `showLegend` and `compact`; built as `labels` (`legend`, `row`, `none`) plus `compact`, since the In-table variant also needs a row (Pacing card) and the Small default is a row. Q-GOAL-9 | — | Small size |

### Pacing card, a variant of Card (affects the Pacing card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| PACING-1 | The gallery hard-codes the percent, badge colour, rail width and footer. Built: computed from the data. The gallery's TV rail is 48.75% (65% × 75%); the computed one is 48.53% (6.6 ÷ 13.6). Q-PACING-2, Q-PACING-7 | — | Badge colour; Footer |
| PACING-2 | The gallery's label row has a space before each bold value ("Total <b>RM6.6M</b>"); Progress-to-Goal Bar's own row has none. Built with the GoalBar row, about 3px narrower. Q-PACING-6 | — | Minibar labels |
| PACING-3 | The label is an `<h5>` drawn at h4 in the gallery. Built as a real heading (`headingLevel`, default 3) drawn at h4. Q-PACING-9 | 505 | Label |
| PACING-4 | The row must name only Total and Target; GoalBar's row adds Gap when short (Q-GOAL-3). GoalBar gains `rowShowsGap`, false here | — | Minibar labels |
| PACING-5 | The label's h4 rule loses to `.c-card h5` in the CSS, so the gallery draws 16px/700; the DS says h4 (20px/800) on purpose. Built at h4. Q-PACING-11 | 505 | Label |

### Entry Card (affects the Entry Card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| ENTRY-1 | The DS says playback is the host's, and gives a reference scheduler (`EntryPlayback`). Built into `EntryCardSet`, ported as written, with `idleTour` to turn the tour off. Q-ENTRY-1 | — | Playback rules; EntryPlayback |
| ENTRY-2 | The gallery draws only Brief. Research, Big idea, Package and Deck have CSS and a DS description but no markup; built from both. Q-ENTRY-2 | 1086–1123 | The five artefact drawings |
| ENTRY-3 | The variant class sits on each card in the source; the set's `variant` is passed to every card here, so a set can't mix. A card outside a set takes its own. Q-ENTRY-3 | 1022, 1060 | One variant per set |
| ENTRY-4 | The swap (`.is-swapping`, `.is-entering`) is the host's in the source; here the set runs it when `variant` changes (fade out on duration-base, change, enter on duration-morph, 50ms apart). Q-ENTRY-4 | 1157–1160 | Switching |
| ENTRY-5 | `.c-card-interactive` (shadow-2 hover, focus halo) has no class here: the card is the button, so its rules are written into EntryCard.css | Card 300–303 | — |

### Info Banner (affects the Info Banner conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| BANNER-1 | Message text is the tone colour at 80% (rgba literals). On the tints that measures Info 2.99, Success 3.09, Warning 3.39:1, under AA's 4.5 (Danger 2.70 is red, decided). Built as the CSS. Q-BANNER-1 | 3283–3299 | Tone table |
| BANNER-2 | Success text: the CSS uses rgb(0,133,76); the DS says `#007d47` (the `--color-green-text` token). Followed the CSS, as a local value. Q-BANNER-1 | 3291 | Tone table |
| BANNER-3 | The close button is `.c-icon-btn` in the gallery (no focus style); the DS says a Ghost icon Button, sm. Built with the real Button. Q-BANNER-5 | 1787 | Close |
| BANNER-4 | The actions have no focus style (browser default). Built with the system ring. Q-BANNER-3 | 3276 | — |
| BANNER-5 | No forced-colours rules: the tints vanish, leaving no edge. Built: a CanvasText border, and the AI layers hidden. Q-BANNER-6 | — | — |
| BANNER-6 | Entrance, exit, stacked reposition and Escape are DS only; the gallery is static. Built from the DS with the `motion` library. Q-BANNER-4, Q-BANNER-7 | — | Animation; Accessibility |

### Hero Card and Command brief (affects the Hero Card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| HERO-1 | The DS's known gap: the card that opens the brief is a `<div>` with a click handler, not reachable by keyboard. Built: `onOpen` makes the heading a real button stretched over the card, as Card (Q-CARD-1). Q-HERO-1 | — | Selected, Known gap |
| HERO-2 | The brief's close is a bare 20px Neutral-5 X with no focus style. Built with the real Button (ghost, sm, icon-only). Q-HERO-2 | 1633 | Selected, Close |
| HERO-3 | The brief has no focus handling, Tab containment or dialog role in the source. Built as a dialog: focus to its heading, Tab kept inside, focus back on close. Q-HERO-3 | 1627–1636 | Selected |
| HERO-4 | No reduced-motion or forced-colours rules for the tilt, the swing or the dark card. Built: no tilt, nudge or swing under reduced motion; a CanvasText edge in forced colours. Q-HERO-4, Q-HERO-5 | — | — |
| HERO-5 | The gallery shows Default (with ribbon) and Selected only, and has no tilt or brief script; Risk, AI, the tilt and the brief are built from the CSS and the DS. Q-HERO-7 | — | Risk, AI (Dark), Selected |

### Media Ad Card (affects the Media Ad Card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| MEDIA-AD-1 | The badge's Neutral-3 border (599) loses to `.c-badge`'s transparent border (1642), so the gallery draws none; the DS says Neutral-3. Q-MEDIA-AD-7 | 599, 1642 | Anatomy, Built for this slot |
| MEDIA-AD-2 | A missing size is a bare em dash, with nothing for a screen reader. Built with hidden "No fixed size". Q-MEDIA-AD-1 | 661 | Missing data |
| MEDIA-AD-3 | The gallery shows one card at rest; the families, missing data, Compared, the badge, touch, the tilt and the skeleton are built from the CSS and the DS (the touch and tilt logic ported from the gallery script, preview.html 25344–25429). Q-MEDIA-AD-3 | 526–712 | States, Interaction contract |
| MEDIA-AD-4 | `.is-touch` is a demo hook; not ported. Q-MEDIA-AD-6 | 593 | States, Touch |

### Metrics card (affects the Metrics card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| METRICS-1 | The gallery shows one card with five bars at rest; more than five, an empty bar, no bars, no size, Added, the clip and the skeleton are built from the CSS and the DS (the clip logic ported from the gallery script, preview.html 25430–25549). Q-METRICS-2, Q-METRICS-10 | 714–878 | Bar count, States and interaction |
| METRICS-2 | The DS writes the size line as "{size} {unit} · {top bar}" without saying how the label is cased; the gallery lowercases "Social". Q-METRICS-1 | — | Anatomy, Rest layer |
| METRICS-3 | "No size" gives the two strings but not whether the "· top" part and the total label stay. Q-METRICS-2 | — | Bar count |
| METRICS-4 | The bars depend on Progress Bar's CSS (4573–4587, 4620–4623), not converted yet. Q-METRICS-7 | 4573–4623 | Progress Bar deviations |

### Progress Bar (affects the Progress Bar conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| PROGRESS-1 | Shimmer travel: the CSS goes to 350%, the DS to 200%. Built as the CSS (decided Q-PROGRESS-1) | 4606–4609 | Transition, Indeterminate shimmer |
| PROGRESS-2 | Inside label: the CSS centres it on the track, the DS in the fill. Built as the CSS, then centred in the fill as the DS says (decided Q-PROGRESS-3) | 4585 | Parts, Label — inside fill |
| PROGRESS-3 | Forced colours: a toned fill keeps its colour in the CSS; the DS paints every fill CanvasText. Built as the CSS, then CanvasText for all as the DS says (decided Q-PROGRESS-8) | 4578–4584, 4620–4624 | Accessibility, Forced colours |
| PROGRESS-4 | The general-data colours and the overflow colour have no CSS; built from the DS. Q-PROGRESS-2 | — | Stacked color rules |
| PROGRESS-5 | The gallery shows default-size bars only (Default, Complete, Error, Stacked, Indeterminate); compact, large, trailing and inside labels, general data and the remainder are built from the CSS and the DS | 4561–4634 | Sizes, Label placement rules |

### ElementBadge (affects the ElementBadge conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| ELBADGE-1 | Glyph size: the CSS sets 17px, the DS 60% of the chip (19.2px). Built at 16px, the `--icon-sm` token (decided Q-ELBADGE-2) | 3597 | ElementBadge, Glyph |
| ELBADGE-2 | The DS names a size prop (default 32px); the CSS has one size. Not built (decided Q-ELBADGE-3) | 3597 | ElementBadge, Chip |
| ELBADGE-3 | The audit row (section 2.1) cites `.c-element-badge` at 3592–3601; the CSS is `.c-elbadge` at 3595–3604, and the gallery markup is preview.html 3598–3615. The audit row is corrected | 3595–3604 | — |
| ELBADGE-4 | Card's icon chip (36px, a 24px glyph, any icon) and ElementBadge (32px, a 17px glyph, a fixed glyph) are the same 12% tint recipe at two sizes. Both kept, each as the DS documents it | 3595–3604 | ElementBadge; Card, Icon chip |

### Modal / dialog (affects the Modal conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| MODAL-1 | The panel: 400px, 16px padding, h4, no border, a footer divider and a 12px gap in the CSS; ~480px, 24px, h3, a Neutral-3 border, no divider and 8px in the DS. Built as the CSS. Q-MODAL-1 | 1782–1786 | Modal / dialog, Panel, Header, Body, Footer |
| MODAL-2 | The DS's overlay (`shadow-overlay`) has no CSS for the base; the gallery shows the panel alone. Built from Command brief's scrim. Q-MODAL-2, Q-MODAL-5 | — | Modal / dialog, Overlay |
| MODAL-3 | No opening, closing, focus, motion or scroll rule for the base modal; the gallery's script only hides the panel and shows a Reopen button. Q-MODAL-2 to Q-MODAL-4 | — | — |
| MODAL-4 | The close X: 13.3px in the gallery (`.c-icon-btn` sets no font size), `icon-base` 20px in the DS. Built 16px with Button. Q-MODAL-8 | 1787 | Modal / dialog, Header |
| MODAL-5 | The audit row (section 2.4/2.1) cites 1779–1785; the CSS is 1782–1788. The audit row is corrected | 1782–1788 | — |

### Stepper (affects the Stepper conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| STEPPER-1 | The gallery's steppers have no list, no current-step marker and no state for screen readers; Timeline, its variant, does (`sr-only` "Step 3 of 5, … current"). Q-STEPPER-1 | 4329–4408 | Stepper (no accessibility section) |
| STEPPER-2 | `.is-disabled` is in the CSS only, with a not-allowed cursor on a stepper that can't be clicked. Q-STEPPER-4, Q-STEPPER-7 | 4334 | — |
| STEPPER-3 | The audit row (section 2.1) cites 4294–4405; the CSS is 4297–4408 (comment from 4297, rules 4329–4408). The audit row is corrected | 4297–4408 | — |

### Back button (affects the Back button conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| BACK-1 | Placement: above the page header (Back button section, CSS comment, gallery) against replacing its title and subtitle (App Shell, Level 2). Built above. Q-BACK-1 | 4409–4413 | Back button; App Shell, Level 2 |
| BACK-2 | The 40-character ellipsis is in the DS only. Q-BACK-2 | 4416 | Back button, Label content |
| BACK-3 | No line height in the CSS (`normal`, 32px tall in the gallery) against label2 13/18 (34px). Q-BACK-4 | 4416 | Back button, Label |
| BACK-4 | The audit row (section 2.1) cites `.c-back` at 4407–4417; the CSS is `.c-back-button` at 4409–4420. The audit row is corrected | 4409–4420 | — |

### PageHeader (affects the PageHeader conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| PAGEHEADER-1 | The `-lg` title (40/56 from 1280px) is in the DS only. Q-PAGEHEADER-1 | 4430 | PageHeader, Title; Typography, `-lg` tier |
| PAGEHEADER-2 | Actions: CSS on `.c-pageheader-row` / `-actions`, documented as App Shell's addition, not a PageHeader variant. Q-PAGEHEADER-3 | 4428, 4432 | PageHeader, Variants; App Shell, Page header |
| PAGEHEADER-3 | The row never wraps: with actions on a phone the title runs under them. Q-PAGEHEADER-2 | 4428 | — |
| PAGEHEADER-4 | The audit row (section 2.1) cites 4419–4429 (+2922); the CSS is 4422–4432 (+2925). The audit row is corrected | 4422–4432, 2925 | — |

### Tabs (affects the Tabs conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| TABS-1 | No panel CSS; built from the DS's table. Q-TABS-8 | — | Tabs, Tab panel / content area |
| TABS-2 | The fades are Neutral-1; the DS says the parent surface. Q-TABS-3 | 2986–2987 | Tabs, Overflow, Right fade |
| TABS-3 | Hover outranks pressed on inactive tabs, so the DS's Neutral-3 press never shows there. Q-TABS-2 | 2997–2998 | Tabs, States, Active/pressed |
| TABS-4 | The focus ring is clipped by the scrolling row. Q-TABS-1 | 2990, 2999 | Tabs, States, Focus-visible |
| TABS-5 | The audit row (section 2.1) cites 2975–2997; the CSS is 2978–3000 (comment from 2978, rules 2984–3000). The audit row is corrected | 2978–3000 | — |

### Segmented Control (affects the Segmented Control conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| SEG-1 | Heights 36/32 (default, icon/text) and 24/26 (compact) in the CSS against 36 and 28; a 32px minimum for every segment against 48px for text. Q-SEG-1 | 4452–4453 | Segmented Control, Sizes, Segment width |
| SEG-2 | `role="group"` around `role="radio"` segments (DS and gallery). Q-SEG-2 | — | Segmented Control, Accessibility |
| SEG-3 | Hover is Neutral-2 on a Neutral-2 track. Q-SEG-3 | 4447, 4456 | Segmented Control, States |
| SEG-4 | Escape returns focus elsewhere (DS only). Q-SEG-4 | — | Segmented Control, Accessibility |
| SEG-5 | The audit row (section 2.1) cites 4431–4468; the CSS is 4436–4471 (comment from 4436, rules 4447–4463 and 4469–4471). The audit row is corrected | 4436–4471 | — |

### Lists (affects the Lists conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| LIST-1 | A control row whose input is disabled (a `<label>`, never `:disabled`) still takes the pressed fill, fades its dividers when pressed or hovered, and draws the forced-colours hover outline; only the fill on hover excludes it. Q-LIST-1 | 6193–6232, 6359 | Lists, States, Disabled |
| LIST-2 | The disabled colour rule lists the chevron, and the forced-colours one doesn't. Moot: the chevron is only on link rows, which are never disabled. No change; the DLS can drop the chevron from the rule | 6232 / 6359 | — |
| LIST-3 | The DS says there is no radius token below radius-sm, so the S (6px) and M (8px) corners are one-offs; `--radius-xs` is 6px. Built with `--radius-xs` for S. Q-LIST-3 | 6155–6158 | Lists, Tokens and one-offs |
| LIST-4 | Hover (0,6,1) outranks pressed (0,4,1), so with a mouse the DS's Neutral-3 press never shows (as TABS-3). Q-LIST-4 | 6203, 6212 | Lists, States, Pressed |
| LIST-5 | The DS says a skeleton row is "the same height as a loaded heading + caption row" (62); with M leading it is 56 (the lead), so loaded rows jump 6px each. Q-LIST-5 | 6299–6305 | Lists, States, Loading |
| LIST-6 | In a card the DS gives the card 8px top and bottom and no side padding; Card has no such setting (in the DLS it's hand-written per card). Q-LIST-2 | — | Lists, Sizing, Surfaces |
| LIST-7 | The audit row (section 2.2) cited the DS section as 5838–6205; it is 6050–6418. Corrected | — | — |

### Password field (affects the Password field conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| PW-1 | The toggle is a 16px target (the icon alone), under the 44px minimum. Q-PW-1 | 166 | Password field |
| PW-2 | Edge (Chromium) draws its own reveal button in a password box; neither file hides it, so Edge shows two eyes. Q-PW-2 | — | — |
| PW-3 | No disabled toggle: on a disabled field the toggle still reveals the password and reacts to hover. Q-PW-3 | 166–168 | Password field |
| PW-4 | The DS says "same anatomy as Input field" but doesn't say what happens to a success check, trailing icon or suffix, which would sit under the toggle. Q-PW-4 | — | Password field |

### Search input (affects the Search input conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| SEARCH-1 | The DS says Default has no dropdown; the gallery shows Default with a No results and a Loading panel. Built as the gallery. Q-SEARCH-6 | 230–241 | Search input, variants |
| SEARCH-2 | No behaviour for the User/Item list: no roles, keyboard, open/close or focus after picking; only the Default clear script exists. Q-SEARCH-7, Q-SEARCH-10 | — | Search input |
| SEARCH-3 | Error wins over focus (both 0,2,1; error later), so a focused field in error keeps a 1px Red border while the focus padding shifts the text 1px; Input field's focus wins. Q-SEARCH-5 | 207–212 | Search input, Active / Error |
| SEARCH-4 | The clear button is a 24px target with no focus-visible rule of its own. Q-SEARCH-3 | 216–219 | Search input, Clear (×) |
| SEARCH-5 | The panel is in the page's flow (margin-top), so opening it pushes content down. Q-SEARCH-4 | 230 | Search input, Dropdown panel |
| SEARCH-6 | No reduced-motion rule for the spinner. Q-SEARCH-8 | 240 | — |
| 241 | Toast: on phones (640px and below) the toast fills the band, with no 320px floor or 420px cap (decided Q-TOAST-2, user; TOAST-2) | components.css 3251–3253; DESIGN-SYSTEM.md Toast Positioning, Mobile | 2026-11-10 |
| 242 | Toast: newest on top, as the DS says; the gallery's script prepends into a `column-reverse` host, which puts the newest at the bottom: append instead (decided Q-TOAST-1, user; TOAST-1) | preview.html toast script (renderToast) | 2026-11-10 |
| 243 | Toast: the close is the real Button ghost sm icon-only (16px X, focus ring), not `.c-icon-btn`; on every tone by default, always on Danger (decided Q-TOAST-3, Q-TOAST-11, user) | preview.html toast script; DESIGN-SYSTEM.md Toast Close | 2026-11-10 |
| 244 | Toast: the host holds one polite live list (`role="status"`) for the page's life and toasts are added to it, rather than each toast being its own `role="status"` (decided Q-TOAST-4, user; TOAST-8) | preview.html Toast demo and script; DESIGN-SYSTEM.md Toast Container | 2026-11-10 |
| 245 | Toast: keyboard focus inside a toast pauses its timer as hover does; Escape dismisses the focused toast; focus doesn't move after a dismiss (decided Q-TOAST-5, Q-TOAST-6, user) | DESIGN-SYSTEM.md Toast Auto-dismiss timing, Accessibility | 2026-11-10 |
| 246 | Toast: the action is a link and clicking it dismisses the toast; the title and message use the body1 and caption line heights; the stack reflow animates (decided Q-TOAST-7, user; TOAST-4, TOAST-5) | components.css 3225–3231; DESIGN-SYSTEM.md Toast Action slot; preview.html toast script | 2026-11-10 |
| 247 | Toast: say "a title, a message or both is required" (the Layout table contradicts itself), and drop "no numeric z-index token scale" now that `--z-toast` exists (TOAST-6, TOAST-7) | DESIGN-SYSTEM.md Toast Layout variants, Positioning | 2026-11-10 |
| 248 | Table: each sortable header holds a button (Enter / Space sorts) and the sorted one carries `aria-sort`; the action column's header is visually empty and named "Actions" for screen readers; a row's hidden checkbox also shows on keyboard focus; with `onRowClick`, the first column's content is a button (decided Q-TABLE-1 to Q-TABLE-4, user) | preview.html Table demo and script; DESIGN-SYSTEM.md Table Sorting, Checkbox selection, Action column, Anatomy | 2026-11-10 |
| 249 | Table: name everything: the table (`aria-label`), "Select all rows", "Select <row>", "<Action>, <row>"; use the real Checkbox, not `span role="checkbox"` (decided Q-TABLE-5, user; TABLE-11) | preview.html Table demo; DESIGN-SYSTEM.md Table Accessibility | 2026-11-10 |
| 250 | Table: specify the sticky header as scrolling inside its own height with the header held (it can't stick to the page inside the clipped standalone box); keep the browser's scrollbar on phones, drop "hidden until hover" (decided Q-TABLE-7, Q-TABLE-8, user) | DESIGN-SYSTEM.md Table Sticky header, Responsive; components.css (add rules) | 2026-11-10 |
| 251 | Table: the checkbox and action columns hug their content (50px; 100px for two actions); reword "fixed" widths (decided Q-TABLE-10, user; TABLE-3) | DESIGN-SYSTEM.md Table Checkbox selection, Action column | 2026-11-10 |
| 252 | Table: swap column priority: `low` hides at 1024px and below, `medium` at 768px and below (decided Q-TABLE-11, user) | DESIGN-SYSTEM.md Table Responsive; components.css (add rules) | 2026-11-10 |
| 253 | Table: numbers, dates and statuses don't wrap (decided Q-TABLE-12, user) | components.css .c-table td; DESIGN-SYSTEM.md Table Column types | 2026-11-10 |
| 254 | Table: add the total row: a `<tfoot>` row under the body, "Total" (a row header) in the first column, totals body2 bold Neutral-9, a 1px Neutral-3 line above, Neutral-2 fill in both variants; from every row, kept at the bottom when sorting, frozen with the columns, pinned with a sticky header; rates as the overall rate (decided Q-TABLE-15, user) | DESIGN-SYSTEM.md Table (new Total row); components.css; preview.html | 2026-11-10 |
| 255 | Table: the frozen-edge shadow is an 8px gradient from shadow-2's grey (.42), not 2px 0 4px at .45, and the DS's "shadow-1" wording changes to match; draw it, the sticky header's shadow and the selected row's 2px line as pseudo-elements on the cells, since Chrome paints no `box-shadow` on collapsed-table cells and the frozen cell covers the row's inset line (decided Q-TABLE-16, user; TABLE-5, TABLE-16) | components.css 1756–1757; DESIGN-SYSTEM.md Table Frozen columns | 2026-11-10 |
| 256 | Pagination: show Rows per page in both variants (after the count in Default), and hide the control only when the results fit the smallest page size; at one page keep the count and Rows per page without page controls (decided Q-PAG-1) | DESIGN-SYSTEM.md Pagination Rows-per-page select, Minimum page rule; components.css 3730–3806; preview.html | 2026-11-10 |
| 257 | Pagination: build the pickers from Dropdown's Single select as the DS says, not native `<select>`s (label beside the box, box as wide as the longest number, caption value, Dropdown's list; the page picker named "Current page, of N"); drop "No results" from the count formats (decided Q-PAG-2, changed by the user; Q-PAG-3) | components.css 3783–3791; DESIGN-SYSTEM.md Pagination Overflow, Result count format; preview.html | 2026-11-10 |
| 258 | Pagination: page-size memory is opt-in and per table (its own key), not one shared `pagination-page-size` key; the ellipsis example uses a 9-page table (`1 … 4 [5] 6 … 9`), since Default only shows under 10 pages (decided Q-PAG-4, Q-PAG-5; PAG-4) | DESIGN-SYSTEM.md Pagination Rows-per-page select, Do | 2026-11-10 |
| 259 | Pagination: pressed is Neutral-2 (as hover, Button ghost), not Neutral-3, on numbers and both Prev / Next (decided Q-PAG-6) | components.css 3742, 3755, 3794; DESIGN-SYSTEM.md Pagination States | 2026-11-10 |
| 260 | Pagination: fix the gallery script so Prev / Next work and `aria-current` and the "3 of 6" indicator follow the page (PAG-1); Overflow's carets at `icon-sm` (PAG-6) | preview.html 21240; components.css 3792 | 2026-11-10 |
| 261 | Dropdown: the panel is fixed to the window at the trigger's place (not absolute inside the field), so a card, table or preview box that hides its overflow never clips it; Tab order and focus unchanged (decided 2026-11-10, the user, found in Pagination's preview) | DESIGN-SYSTEM.md Dropdown Panel; components.css 3002–3078 | 2026-11-10 |
| 262 | Back to top: when the page scrolls in a frame (App Shell's content) whose scrollbar runs down the window's right edge, add that scrollbar's width to the right offset, so the button keeps its 24px from the content and never sits on the scrollbar; the script measures it (decided 2026-11-10, the user, after trying it centred and reverting) | components.css 5124; DESIGN-SYSTEM.md Back to top Placement, Which element scrolls | 2026-11-10 |
| 263 | Back to top: after the click, move focus to the page's first `h1` (in the scrolling region if there is one, with `tabindex="-1"` and `preventScroll`), so a keyboard user carries on from the top (decided Q-BTT-1, user; BTT-2) | DESIGN-SYSTEM.md Back to top Action, Accessibility; preview.html script | 2026-11-10 |
| 264 | Back to top: the page flag is a data attribute, `html[data-cui-back-to-top-shown]`, in the library (the DLS keeps its class; note the mapping) (decided Q-BTT-5, user) | DESIGN-SYSTEM.md Back to top Implementation contract | 2026-11-10 |
| 265 | Date picker: write dates day first ("12 Jul 2026"; ranges "12 – 24 Jul 2026", "28 Jul – 3 Aug 2026"); start weeks on Monday; days about 34px in the 280px panel (not 36); six weeks always; the trigger is Input field's box (sizes, hover, focus, open, error, disabled; full width); a focus ring on days (decided Q-DP-2, Q-DP-3, Q-DP-4, Q-DP-6, Q-DP-8, Q-DP-10, user) | DESIGN-SYSTEM.md Date picker; components.css 3809, 3816; preview.html | 2026-11-10 |
| 266 | Date picker: the range is one band: fill the 2px gap after the start and each day between, within a week (decided Q-DP-5, user; DP-4) | components.css 3819; DESIGN-SYSTEM.md Date picker Day — in-range | 2026-11-10 |
| 267 | Date picker: add the month and year grids (the month and the year are plain pressable text, no caret since they aren't dropdowns, 32px, Neutral-2 hover and while open; a 3 × 4 month grid and a scrolling 4-column year grid, newest first, bounded by max / min or 20 ahead / 100 back; 40px cells with the day's looks; at the days' height; year → months → days; Escape back to the days); the footer, range picking and keyboard as built (decided 2026-11-10, the user; Q-DP-7; DP-3, DP-8) | DESIGN-SYSTEM.md Date picker (new rows); components.css; preview.html | 2026-11-10 |
| SEARCH-7 | The gallery's Error demo has text but no ×; the DS says the × shows whenever there is text. Built with the ×. Q-SEARCH-12 | — | Search input, Clear (×) |
| SEARCH-8 | The gallery's collapsed rows have no label; the DS doesn't say the label goes. Built with the label kept. Q-SEARCH-11 | — | — |

### Dropdown — Single select (affects the Dropdown conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| DROP-1 | The DS and source give the trigger Input field's old 2px Red error; the library's Input field error is 1px (decided INPUT-3). Built 1px. Q-DROP-1 | Input field 135 | Dropdown, Single select — States |
| DROP-2 | The Standard trigger is a `readonly` text input; screen readers announce a readonly input as "read only", which a working dropdown isn't. Q-DROP-2 | 3014 | Dropdown, Behaviour |
| DROP-3 | Filled (`.has-value`, 0,2,1) outranks the error (`.c-field-error input`, 0,1,1), so a field with a value shows Obsidian, not Red; in Borderless the value hides the error border entirely. Q-DROP-3 | 3052, 3061 | Dropdown, States |
| DROP-4 | The panel sits in the page's flow; the DS's own measured note says it lands 12px (not 8px) under the trigger. Q-DROP-4 | 3067 | Dropdown, Panel — placement |
| DROP-5 | The gallery's Disabled and Read-only cards hold a value but no `.has-value`, so they keep the Neutral-3 border; with the class the CSS would draw Obsidian. Built as the gallery. Q-DROP-5 | 3052 | — |
| DROP-6 | The ARIA table asks for `role="group"` with a group label, but Single select has no group rows in the CSS or gallery (Multiple select does). Not built here. Q-DROP-7 | — | Dropdown, ARIA |
| DROP-7 | The audit row (section 2.2) cited the DS section as 4596–4956; it is 4808–5169 | — | — |

### Dropdown — Multiple select (affects the Dropdown conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| DROPM-1 | `.c-dropdown-multi-field` repeats `.c-dropdown-field`'s trigger rules one for one; ported once, shared by both variants | 4110–4151 | Dropdown, Multiple select — Container |
| DROPM-2 | A disabled option's box: the CSS paints Neutral-3 on Neutral-2; the DS says "kept at its own unchecked Neutral-3/Neutral-1 recipe". Built as the CSS | 4171 | Dropdown Option — Disabled |
| DROPM-3 | A disabled and ticked option: `.c-dropdown-option.disabled .c-checkbox-box` ties `.c-checkbox-box.on` and wins by order, so the box turns Neutral-2 and the white tick vanishes. Q-DROPM-2 | 4171 | — |
| DROPM-4 | The DS says the footer "reuses Button's Ghost/Primary variants at sm size"; the CSS builds its own buttons at label2 (13px), not Button sm (14px). Q-DROPM-6 | 4179 | Dropdown, Footer |
| DROPM-5 | The loading footer's buttons are disabled at 50% opacity; Button's disabled look is a Neutral-4 fill. Q-DROPM-4 | 4188 | Panel — Loading state |
| DROPM-6 | The DS doesn't say what Select all does after a search, or to disabled options (nor Clear). Q-DROPM-1, Q-DROPM-3 | — | Select All row |
| DROPM-7 | The ARIA table gives Select all no way to say "partly": an option's `aria-selected` is true or false. Q-DROPM-5 | — | ARIA |
| DROPM-8 | The gallery's tick is the icon font's 9px glyph; the library's Checkbox draws `--icon-micro` (14px), decided 2026-10-26. Followed Checkbox | 3088 | Checkbox |

### Radio card (affects the Radio card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| RC-1 | The circle is kept in sync with the radio by a script (`window.CollabriumRadioCard.sync`); here it reads the radio's `:checked` through `:has()`, so no script or sync hook | — | Radio Card, Interaction contract |
| RC-2 | The 18px text indent is a literal in the CSS; it is `--choice-size` (18px), the circle's own token | 3161, 3163 | Anatomy, Description |
| RC-3 | The 496px / 752px thresholds stay literals: a container query can't read a custom property, and no token is either value (2 × 240 + 16, 3 × 240 + 2 × 16) | 3139, 3142 | Recorded deviations |
| RC-4 | The dot is 8px and the Badge 24px tall, as decided for Radio and Badge in the token audit (the gallery draws 9px and 22px), so a badged card's row is 2px taller | 3094; Badge | — |
| RC-5 | The gallery's demo has no legend (an `aria-label` on the fieldset). Q-RC-3 | preview.html 4243 | Anatomy, Legend |
| RC-6 | The DS raises four Radio issues against itself: the circle 1px low beside an h5 (Q-RC-1), the empty circle's 1.4:1 border (Q-RC-2), Red text at 12px (decided: Red stays `--color-red`), and the dot in forced colours (already fixed in the library's Radio, which paints it CanvasText) | 3092 | Raised against Radio / Input field |
| RC-7 | The audit row cited the DS section as 7670–7759; it is 7881–7970 | — | — |

### Quantity selector (affects the Quantity selector conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| QTY-1 | Error: 2px Red border and regular-weight text in the CSS (and the DS's Deviation 1); the library's Input field decided 1px and every error is bold. Q-QTY-1 | 6020 | Deviations 1 |
| QTY-2 | Pressed Neutral-3 and the `aria-disabled` look are local, as the source; Button decided ghost pressed = hover (Q-BTN-5). Q-QTY-2 | 6083–6085 | Deviations 2 |
| QTY-3 | The compact button's 8px radius is a one-off with no token. Q-QTY-3 | 6081 | One-off values |
| QTY-4 | One-offs with exact tokens: 40 / 32px boxes (`--control-height-md` / `-sm`), the 24px compact button (`--control-height-xs`), the 44px touch lift (`--hit-target-min`), the 2px caret allowance (`--spacing-2`) | 5996–6000, 6020, 6041, 6092 | One-off values |
| QTY-5 | The `CQuantitySelector` script (preview.html 25592–25877) is rebuilt in React with the same rules; its events and `get` / `set` become props and callbacks. Q-QTY-5 | — | Script |
| QTY-6 | The read-only input carries `aria-readonly="true"` as well as `readonly` (the gallery's markup does; the script doesn't add it): a text input with `role="spinbutton"` doesn't reliably pass `readonly` on | — | Accessibility |
| QTY-7 | The gallery shows five specimens (spots, budget, at min, at max, read-only); compact, type-only, error, disabled and the helper were compared against markup built from the CSS's own classes | preview.html 4179–4222 | — |
| QTY-8 | The audit row cited the DS section as 7484–7646; it is 7695–7857 | — | — |

### Stat / KPI card (affects the Stat / KPI card conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| STAT-1 | The icon chip is Card's, 40px (decided for Card, token audit); the gallery's is 36px, so a tile with a chip has its value 4px lower | — | Stat / KPI card, Icon chip |
| STAT-2 | Trend arrow 14px in the DS, 12px in the CSS (inherited). Q-STAT-2 | 3613 | Trend |
| STAT-3 | The trend's Green is `--color-green-text` (AA), as every Green text in the library (decided); the CSS uses `--color-green` | 3614 | Trend color |
| STAT-4 | Interactive and the sparkline slot have no CSS or markup in the DLS. Q-STAT-4, Q-STAT-5 | — | Variants, Sparkline slot |
| STAT-5 | The goal rail's overhang is the library GoalBar's decided 2px (was 3px), and the achieved line uses the caption's 16px line height (the source's label row is 1.4 = 16.8px): the Secondary tile with a rail is 2px shorter | 3647 | — |
| STAT-6 | The gallery's icon chip has no element class (so it is Water) though it holds a fire icon; the preview matches the gallery | preview.html 4587 | Icon chip |
| STAT-7 | `.c-stats` is unreconciled with App Shell's content grid (the DS's own open note). Q-STAT-7 | 3607 | Content region |

### Slider (affects the Slider conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| SLIDER-1 | Five rules list a `::-webkit-` and a `::-moz-` pseudo-element in one selector, which every browser drops whole: the compact 16px thumb, the hover and drag shadow-3, the disabled thumb and cursor, and reduced motion never apply in the gallery (already noted under Other components). Q-SLD-1 | 4503, 4505, 4513, 4514, 4518 | States, Sizes |
| SLIDER-2 | The DS asks for a 44×44 hit target; its own caveat says the reference build gives about 24px (the rail). Built 24px. Q-SLD-3 | 4493 | Thumb, Sizes caveat |
| SLIDER-3 | The label is caption (12px) bold; the DS says "the same label convention as Input field", whose CSS label is label1 (14px, INPUT-1). Q-SLD-2 | 4491 | Placement |
| SLIDER-4 | The tooltip sets no line height, so it takes the page's (`normal` in the gallery, a 27px bubble); built with the caption's 16px (28px bubble) | 4515 | Value tooltip |
| SLIDER-5 | The gallery's script places the tooltip at the value's share of the full width, but a native thumb travels inside the track, so the bubble sits up to half a thumb (10px) off the thumb near the ends. Built centred on the thumb, as the DS says. Q-SLD-5 | preview.html 21706 | Value tooltip |
| SLIDER-6 | The DS says the thumb overhangs the track's ends by half its width at 0% and 100%; a native range thumb stops inside the track (its edge meets the end), in the gallery and here | — | Thumb, v0.9.33 |
| SLIDER-7 | The DS says a range's thumbs get `aria-valuemin` / `aria-valuemax` updated to the partner's value; the gallery doesn't, and its own implementation note forbids changing the inputs' min / max. Q-SLD-8 | — | Accessibility |
| SLIDER-8 | The DS requires `aria-valuetext` when a value has a unit; the gallery's RM sliders set none. Built from `format`. Q-SLD-4 | preview.html 4561 | Accessibility |
| SLIDER-9 | The tooltip's classes clear on a 400ms script timer; its CSS fade ends at 360ms (`--duration-base` delay + `--duration-fast`). Kept 400ms | preview.html 21772 | Transition |
| SLIDER-10 | The gallery shows only Single and Range at default size: no compact, disabled or static value specimen | preview.html 4556–4576 | Sizes, States |
| SLIDER-11 | The audit row cited the CSS as 4470–4517 and the DS as 8287–8402; they are 4473–4520 and 8498–8610 | — | — |
| SLIDER-12 | The tooltip sits 36px above the rail's top, over the label's line: near the start it covers the label while it shows (in the gallery too). Kept | 4515 | Value tooltip |

### Toast (affects the Toast conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| TOAST-1 | The DS says "newest on top"; the gallery's script prepends each toast into a `column-reverse` host, so the newest sits at the bottom, nearest the corner. Built as the gallery. Q-TOAST-1 | 3249; preview.html 21333 | Stacking behaviour |
| TOAST-2 | `min-width: 320px` overflows the phone band on a 320px screen (the band is 296px), and the 420px cap keeps a toast short of "full width" on screens 452–640px wide. Q-TOAST-2 | 3218, 3251 | Positioning, Mobile |
| TOAST-3 | The gallery's close is `.c-icon-btn` (32px, hover Neutral-2) with its X at the button's inherited 13px and no focus ring; the DS says Ghost IconButton sm. Built with the real Button. Q-TOAST-3 | 1787 | Close |
| TOAST-4 | The title and message set sizes only, so they take the page's line height (`normal` in the gallery: a 61px toast); built with the body1 and caption line heights (64px) | 3225–3226 | Title, Message |
| TOAST-5 | The DS says the stack animates to its new places when a toast comes or goes; the gallery's jumps. Built animated (motion `layout`) | — | Animation, Stacking reposition |
| TOAST-6 | The DS lists a "Title only" layout but also says "a message is required at minimum"; read as: a title, a message or both | — | Layout variants |
| TOAST-7 | The DS says there is no numeric z-index scale; tokens.css has `--z-toast` (1000), which the CSS uses | 3249 | Positioning |
| TOAST-8 | Each gallery toast is `role="status"` and is inserted already filled, which screen readers often don't announce. Q-TOAST-4 | preview.html 21329 | Container |
| TOAST-9 | The lift above Back to top keys off `html.c-back-to-top-shown` and `--c-back-to-top-y`, set by Back to top's script; Back to top isn't converted. Q-TOAST-8 | 3261–3264 | Positioning |
| TOAST-10 | The action slot has no gallery specimen; the DS allows "a Link or Ghost button" and doesn't say whether it dismisses. Q-TOAST-7 | 3231 | Action slot |
| TOAST-11 | The audit row cited the CSS as 3214–3262 and the DS as 9368–9461; they are 3217–3265 and 9579–9680 | — | — |

### Table (affects the Table conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| TABLE-1 | The gallery's action column header says "Actions"; the DS says the header is an empty cell. Q-TABLE-2 | preview.html 4835 | Action column |
| TABLE-2 | The gallery's sortable headers can't be reached by keyboard (no tabindex, no button) and carry no `aria-sort`; the DS says Enter or Space sorts. Q-TABLE-1 | 1700; preview.html 21100 | Sorting, Keyboard |
| TABLE-3 | The checkbox column's 40px and the action column's 40 / 72 / 104px act as minimums: the content is wider, so they render 50px and 100px (two actions). The DS calls them fixed. The bulk toolbar starts at 40px, over the checkbox column's last 10px (clear of the box). Q-TABLE-10 | 1715, 1731, 1737 | Checkbox selection, Action column |
| TABLE-4 | Header and body cells set no line height (the page's `normal`); built with the type tokens' (h5 20px, body2 20px, label3). A text row is 45px here | 1678–1679, 1693, 1696 | Anatomy |
| TABLE-5 | The frozen-edge shadow is `2px 0 4px rgba(189,189,189,.45)` (sideways); the DS says `shadow-1` (which points down). Kept as a local value. Q-TABLE-9 | 1756–1757 | Frozen columns |
| TABLE-6 | Sticky header has no CSS, and a header can't stick to the page inside the standalone wrap's `overflow: hidden`. Q-TABLE-7 | — | Sticky header |
| TABLE-7 | Column `priority` has no CSS, and reads backwards: `medium` hides at 1024px, `low` only at 768px, so a low column outlasts a medium one. Q-TABLE-11 | — | Responsive |
| TABLE-8 | The phone table's 600px minimum and "scrollbar hidden until hover" have no CSS; the 600px is built, the scrollbar rule isn't. Q-TABLE-8 | 1775 | Responsive |
| TABLE-9 | Two scroll forms (`.c-table-scroll-x` on the wrap, `-inner` with a bulk toolbar); built always as the inner one | 1764 | — |
| TABLE-10 | Overflow menus (a `dots-three` button opening a context menu past 3 row or bulk actions) have no CSS or markup, and the library has no menu component. Q-TABLE-6 | — | Bulk actions, Action column |
| TABLE-11 | The gallery's checkboxes are `span role="checkbox"` drawings; the DS says reuse Checkbox as-is. Built with the library's Checkbox (a real input) | 1716; preview.html 4873 | Checkbox selection |
| TABLE-12 | The skeleton's shimmer is a raw `rgba(90,90,90,.4)`; built as Neutral-5 at 40% (`color-mix`), the same value, as Media Ad Card's | 1773 | Loading state |
| TABLE-13 | The DS says the skeleton fades out as the data fades in; no CSS. Built: the rows fade in | — | Loading state |
| TABLE-14 | The bulk toolbar's height comes from the script (the header row's height); measured here too | preview.html 21575 | Bulk actions toolbar |
| TABLE-15 | The audit row cited the CSS as 1662–1777 and the DS as 8984–9242; they are 1665–1777 and 9195–9470 | — | — |
| TABLE-16 | Chrome doesn't paint `box-shadow` on cells of a `border-collapse` table, so the frozen-edge shadow (and the DS's sticky-header shadow) never shows, in the gallery too; and the selected row's inset 2px Obsidian line on the `<tr>` is covered by the opaque frozen first cell. Found 2026-11-10 while checking Q-TABLE-16. Built: all three drawn as pseudo-elements on the cells (gradients for the shadows, a 2px bar for the line) | 1689, 1756–1757 | Frozen columns, Sticky header, Row selected |

### Pagination (affects the Pagination conversion)

| ID | What | CSS | DS |
|---|---|---|---|
| PAG-1 | The gallery's script only handles `.c-page-btn`, so its Prev / Next (`.c-page-nav`) do nothing, and it never updates `aria-current` or the "3 of 6" indicator | preview.html 21240 | — |
| PAG-2 | Rows per page exists only in Overflow (10+ pages). A bigger page size can drop the count below 10 pages, switching to Default, which has no Rows per page: the reader can't change it back. Q-PAG-1 | 3783 | Rows-per-page select, Overflow |
| PAG-3 | The DS gives a "No results" count, but its minimum-page rule hides the control whenever the results fit one page, zero included, so "No results" can never show. Q-PAG-3 | — | Result count format, Minimum page rule |
| PAG-4 | The DS's ellipsis example (`1 … 4 5 [6] 7 8 … 24`) has 24 pages, but Default (the variant with an ellipsis) only shows under 10 pages; the window matters for 8 and 9 pages | — | Do |
| PAG-5 | The CSS draws native `<select>`s styled like Dropdown; the DS says Dropdown's Single select "reused verbatim". Built native, as the CSS. Q-PAG-2 | 3786–3791 | Overflow pagination |
| PAG-6 | Overflow's Prev / Next carets are unset (the caption's 12px); the DS says `icon-sm` (16px). Built 16px | 3792 | Overflow pagination |
| PAG-7 | The count, indicator, label and "of N" set no line height (the page's: 15px in the gallery); built with the caption's 16px | 3738, 3764, 3784, 3797 | — |
| PAG-8 | Pressed is Neutral-3 (numbers, Prev / Next); Button's ghost pressed was decided to look like hover (Q-BTN-5), and the DS says Pagination reuses Button Ghost's tokens. Q-PAG-6 | 3742, 3755, 3794 | States |
| PAG-9 | The DS persists every table's page size under one shared `localStorage` key, `pagination-page-size`. Q-PAG-4 | — | Rows-per-page select |
| PAG-10 | Tool approval copied `.c-pagination-indicator` into its own CSS because Pagination wasn't converted. Q-PAG-8 | 5746 | — |
| PAG-11 | The audit row cited the CSS as 3728–3803 and the DS as 6922–7096; they are 3730–3806 and 7133–7300 | — | — |

### Back to top

| ID | What | CSS | DS |
|---|---|---|---|
| BTT-1 | The audit row cited the CSS as 5100–5135 (+3250–3259) and the DS as 2146–2272; they are 5103–5138 (+ Toast's lift 3255–3265) and 2358–2483 | — | — |
| BTT-2 | The DS doesn't say where focus goes after the click: the button hides once the page is near the top, and a keyboard user's focus drops with it (in Chrome, the next Tab carries on from where the button sat, near the end of the page). Q-BTT-1 | — | Accessibility |
| BTT-3 | The Action bar clearance (`--c-action-bar-clearance`) is written by Action bar's script; Action bar isn't converted, so nothing writes `--cui-action-bar-clearance` yet. Q-BTT-3 | 5119 | Placement |
| BTT-4 | The page flag is a class on `<html>` in the source (`c-back-to-top-shown`); here a data attribute (`data-cui-back-to-top-shown`), as the library's states are. Q-BTT-5 | 3262 | Implementation contract |
| BTT-5 | The gallery's demo is a sandbox box that never touches `<html>`; the docs page shows the real thing instead (one per page, the window's corner, the toast lift), since a second button on the page would fight over the page flag | preview.html 2262–2280, 22694 | — |
| BTT-6 | Built centred at the bottom of the window (the user, 2026-11-10); the DS puts it bottom-right on purpose (its "three differences" from Jump to present, the first being bottom-right). Toast's lift now applies only where the stack would cover the button: the phone band and windows under 840px  **Reverted 2026-11-10 (the user): back to the DS's bottom-right, and Toast's lift at every width again; instead, when the page scrolls in a frame whose scrollbar runs down the window's right edge (as the docs site's pane), the button steps in by the scrollbar's width (`--cui-back-to-top-gutter`, measured), so it keeps 24px from the content rather than sitting about 9px off the scrollbar** | 5124 | Back to top, What it borrows; Living with Toast |

### Date picker

| ID | What | CSS | DS |
|---|---|---|---|
| DP-1 | Days are about 33.4px (the 280px panel's 248px of grid, 2px apart); the DS says 36 × 36, which needs a 296px panel. Built as the CSS. Q-DP-2 | 3811, 3816 | Day cell |
| DP-2 | The trigger has one height and no states in the CSS; the DS gives Select's sm / md / lg. Built on Input field's box with its sizes, hover, focus, open, error and disabled. Q-DP-4 | 3809 | Trigger |
| DP-3 | The range footer (Secondary + Primary, line, 16px) is in the DS only; built from Modal's footer and the library's Button. Q-DP-7 | — | Footer |
| DP-4 | The DS wants the range a "flush block"; the CSS's 2px grid gap leaves white lines between the range's days (the gallery shows them). Built as the CSS. Q-DP-5 | 3814, 3819 | Day — in-range |
| DP-5 | The gallery's month arrows and trigger do nothing (on purpose, the DS says), and its day script strips `today` from the grid on any click, so today's outline disappears after a pick | preview.html 21259–21265 | Gallery note (1044) |
| DP-6 | The month (h5) and weekday letters set no line height in the CSS (the page's: 22px and 22px in the gallery); built with the type tokens' 20px and 16px | 3813, 3815 | — |
| DP-7 | The audit row cited the CSS as 3805–3821 and the DS as 4567–4595; they are 3808–3825 and 4779–4805 | — | — |
| DP-8 | The DS's header is a plain month / year label; added at the user's request (2026-11-10): the month and the year are buttons opening a month grid and a scrolling year grid, so a date years away (a birthday) doesn't take decades of paging. Designed here from the day cell's looks and Button ghost | 3812–3813 | Month header |

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
| D-22 | The component owns Rule 2's 400ms hold-back, measured from `startedAt`. The host owns the other host-side rules (see the usage doc) | The rule says to hold "the whole component" back and that the timer still counts from the true start; both need the start timestamp, which the component already takes. Flagged Q-LOAD-3 **Superseded by D-54 (2026-10-26).** |
| D-23 | The root `role="status" aria-live="polite"` is always in the page; only its content waits for the 400ms | A live region that is created together with its text is often not announced. DS Rule 11 puts the live region on `.c-loading`; keeping it mounted makes that work as written |
| D-24 | The timer is built from whole tenths of a second, so it never shows "60.0s" | LOAD-4. Output is identical everywhere else |
| D-25 | `label` is a required string; the timer has no prop to hide it | DS Rule 4 (label is live) and Rule 5 (timer from the first frame, never withheld) |
| D-26 | `startedAt` is optional and defaults to the moment the component mounted | Matches the gallery demo, which starts its clock on load. Hosts whose work started earlier pass the real timestamp |
| D-27 | Rows are data, not children: `steps`, `paragraphs`, `query` + `sources`, `toolCalls`, chosen by `variant` (a union). The icons are derived: the last step spins while working, every other step is a check | Rules 8, 9 and 12 (append only, one spinner, variant follows the data) become impossible to break from the props. The gallery hard-codes each icon class |
| D-28 | The component owns Rule 6: it opens while `working`, closes when `done`, and the first click on the header makes the reader's choice win for that instance. `defaultExpanded` counts as that choice. A new run is a new instance (`key`) | The gallery script resets `manual` on Replay; in React that is a remount |
| D-29 | The closed trace is `inert` | THINK-5. Invisible change: hidden links and buttons must not be reachable. Flagged Q-THINK-5 |
| D-30 | The header gets `aria-controls` pointing at the trace | Correct ARIA for a disclosure; not in the source markup. No visual effect |
| D-31 | `workingLabel` and `doneLabel` are required strings from the host; the duration is folded into `doneLabel` | THINK-1: no timer exists to build. Rule 7 gives the copy ("Thought for 4 seconds") |
| D-32 | Row entrance stagger is position × 120ms through `--cui-thinking-row-index` | The gallery writes `animation-delay` 0, 120, 240, 360ms by hand on each row. Same values for the first four rows |
| D-33 | The spinner keyframe is copied into Thinking.css as `cui-thinking-spin` | Search input (which owns `c-search-input-spin`) is not converted. Share one keyframe when it is |
| D-34 | Docs site only: AI Native's parts are grouped under one sidebar item with an overview page and a page per part (`components/ai-native/<part>`). A docs file opts in with `export const group = 'AI Native'`. The package's exports stay flat (`LoadingState`, `Thinking`) | The DLS lists AI Native as one nav entry and says not to give a part its own nav-child. Keeps pages short as the other six parts arrive, and the sidebar at two levels like the DLS |
| D-35 | Props are `content` (an append-only array of strings and `{ citation }`) and a required `status` (`streaming`, `done`, `stopped`). The component splits prose into words itself | Rules 5, 6, 14: the host hands over whatever its stream delivers, and citations are tokens in position. The gallery's hard-coded token list and `count` become props |
| D-36 | A final word that has nothing after it yet is held back while streaming. The buffer releases one word per tick: 55ms, 35ms when more than 12 words are waiting, 20ms when more than 24 | A word can arrive in two chunks. Only the 55ms is in the DLS (Rule 6 says draining faster is right but gives no numbers). Flagged Q-STREAM-2 |
| D-37 | A message that first renders as `done` or `stopped` is whole and has no entrance animation (`[data-live]` is off). Once settled it stays settled: a later `streaming` is ignored | Rules 2, 4 and 22. The gallery only ever plays from an empty start |
| D-38 | The action row, sources list and follow-ups are not rendered until the message settles (the source toggles `hidden`). On `stopped` the row and the list appear, the follow-ups never do | Rules 15 to 17. Removing them is stronger than `hidden`'s intent and gives the entrance animation for free |
| D-39 | Copy writes the visible text to the clipboard (a citation counts as its domain) and is named "Copied" for 1.6 seconds. Retry and the thumbs exist only when `onRetry` / `onFeedback` is passed. The sources button exists only when `sources` has items | STREAM-8: the gallery's buttons are fakes. A button that does nothing is worse than none. Flagged Q-STREAM-4 |
| D-40 | Settling announces "Response ready." or "Response stopped." through one visually hidden `role="status"`, and only for a message that streamed live | Rule 19 and the gallery. Silent on mount for a saved message |
| D-41 | The icon buttons, the caret keyframe and the fade and rise keyframes are copied into StreamingText.css as `cui-streaming-*` | STREAM-7. Share them when Chat window, Prompt input bar and Thinking can |
| D-42 | Docs site only: the live example feeds text from a timer in uneven pieces, with Stop and Replay | A model is not available to the docs. The page says this is a demo stand-in (Rule 2) |
| D-43 | Props are `tasks` (an array of `{ label, count, status, steps, reason?, retryable? }`) and an optional `onRetry(index)`. `variant` defaults to `capsules` | The five statuses, the steps and the failure block become data, so Rules 7 and 8 (one in progress, append only) are the host's data and cannot be broken by markup. The DS calls Capsules "the default" |
| D-44 | The component caps itself at six rows and counts the rest ("+N more") | Rule 4. Unlike Thinking, the host passes everything and cannot forget the cap |
| D-45 | One row open at a time, opened by the run (the newest failure, else the task now in progress, closed when it completes), and the reader's first click wins for that instance. A list that first renders settled opens its failure, else its task in progress | Rules 5 and 6, and TASK-3 (the gallery's behaviour). Same contract as Thinking's D-28 |
| D-46 | Retry shows only on a `failed` task with `retryable` and an `onRetry`, and after one press the button is gone, whatever the host does next | Rules 10 and 11 as a shape: no counter, never disabled |
| D-47 | The component announces: a new failure ("<task> failed. Retry available." or "…Details are in the conversation."), Retry pressed ("Retrying <task>."), a retried task completing, and the end of the run ("All N tasks completed." or "Run finished. X of N tasks completed."). It does not call a run finished while a failure still waits on its one retry. Silent on mount | Rule 17 and the gallery. The "details are in the conversation" wording is mine (Q-TASK-3) |
| D-48 | The Badge pills are the real Badge, Retry is the real Button (Secondary, small), the status discs are copied from Stepper's `.c-step-indicator` into TaskRows.css | The DS says to reuse Badge and Button verbatim. Stepper is not converted, so its three discs are copied (same as D-41's approach) |
| D-49 | The 6 capsule gap and the list variant's last-row rule follow the CSS's evident intent, not the gallery markup | TASK-1 and TASK-2. Flagged Q-TASK-2. The capsules sit 16px taller in total than the old demo |
| D-50 | Docs site only: the live example moves the tasks along on a timer, with Replay | No agent is available to the docs. Starts the third task when the second completes (TASK-7) |
| D-51 | Narrow rule: a container query on the component's own width. Below 400px the count moves under the name, the name may wrap to two lines, and the pill and chevron keep their slots. Nothing is dropped | TASK-8: the DLS has no narrow rule and the name was shrinking to nothing below about 290px. Chosen over hiding the pill or count because both carry information. Q-TASK-6 answered by defining it; the DLS should adopt or replace it |
| D-52 | Consolidated values (decided 2026-10-26, from the token proposal): row staggers 80ms and 120ms; widths 360 / 420 / 440px; prose line height 1.65. Applied as local custom properties now, ready to become tokens when the DLS adds them. Loading State's cell steps (90ms drive, 110ms orbit) are left alone: they are multiples that fit its 650ms and 950ms loops, so moving them would change the wave | The proposal listed Loading State's 90ms among the staggers; on inspection it is part of the loop geometry, not a row entrance |
| D-53 | Tokens added to the DLS tokens.css, DESIGN-SYSTEM.md, preview.html (gallery tables, the CSS Variables, Tailwind and JSON tabs, and the embedded DESIGN.md) and copied here (2026-10-26). Every local custom property that now has a token uses it (focus ring, control heights, tints, spacing 2/6, radius-xs, staggers, measures, prose leading, pulse and blink, icon-xs); the rest are documented as one-off. Verified by computed-style snapshots of 1,153 elements across all seven components: no difference before and after the swap. `--color-red-text` (#D4001A, 4.8:1 on its tint) is then used for red text (Badge Error, Checkbox required and error, Thinking deletions) | The user asked for tokens to be added and everything impacted updated `--color-red-text` was later removed (D-63). |
| D-54 | Loading State no longer owns Rule 2's 400ms hold-back (Q-LOAD-3, answered 2026-10-26): it renders as soon as it is mounted and the host mounts it once the operation has run 400ms. `startedAt` still sets the timer. To keep the label announced, the label goes into the live region one commit after the region mounts. Replaces D-22 | `LoadingState.tsx`, `.usage.md`, `.docs.tsx` |
| D-55 | Button: the fill is fixed while loading. Hover and pressed rules are `:hover:where(:not([data-loading]))` (specificity unchanged) (Q-BTN-3, answered 2026-10-26) | `Button.css`, `Button.usage.md` |
| D-56 | `status` is controlled: the host sets pending, allowed, denied or expired. The card never resolves itself, and has no "ask again" | The host runs the action; the card is the record. Rule 7 |
| D-57 | The detail rows are a `<dl>` with `<dt>` and `<dd>`; the closed detail is `inert` | Each field is read with its value; hidden content leaves the reading order. Draws the same. Same pattern as Thinking and Task Rows |
| D-58 | The detail opens while pending and folds shut whenever the status changes (open again if it returns to pending) | Rule 3 |
| D-59 | The toggle and the resolved row take the Obsidian focus ring (2px, 2px offset) | The same approval as Thinking's rows (A4, 2026-10-26). PERM-3 |
| D-60 | Focus moves to the resolved row when a decision removes the focused button; no live region | PERM-4, PERM-5. Approved 2026-10-26 (Q-PERM-1) |
| D-61 | The scope and resolved notes are built as the DLS renders them (14px, no margin) | PERM-1. Approved 2026-10-26 (Q-PERM-2) |
| D-62 | Deny is Ghost with the full `--color-red` text, as the source has it (superseded the earlier choice of `--color-red-text`, see D-63) | PERM-2. Q-PERM-3 |
| D-63 | **Red text is `--color-red`, 3.2:1 on its tint and on white. This is a rule. Do not raise it again.** The `--color-red-text` token (`#D4001A`) was removed from the DLS tokens.css, DESIGN-SYSTEM.md and preview.html, and from the React copy and Foundation page. Components: Badge Error, Checkbox required `*` and error text, Input field required `*` and error text, Thinking's removed-line count and Deny all use `--color-red`. Green and Amber text keep their darker tokens | Decided by the user 2026-10-26 ('revert to old red colour for all, and stop asking me about this red') |
| D-64 | Radio is a `<label>` around a real `<input type="radio">`, the circle and dot `aria-hidden`; the look follows `:checked`, not a script-set `.on`. The dot is `display:none` until checked | Same pattern as Checkbox (D-17). The state can't disagree with the form value |
| D-65 | `RadioGroup` owns the shared `name`, the chosen `value` (controlled with `value` and `onValueChange`, or `defaultValue`), `required`, `error` and `disabled`, through a context. Radios inside it need a `value` | A group of radios answers one question; React has no native group state |
| D-66 | Hover, pressed, the focus ring, the forced-colours dot and the group's required and error are built as Checkbox's approved treatment (RADIO-2 to RADIO-4) | Approved 2026-10-26 (Q-RADIO-1) |
| D-67 | The 9px dot is a local custom property (`--cui-radio-dot-size`). Circle size, nudge and radius use `--choice-size`, `--spacing-2` and `--radius-pill` | No token for the dot; Radio only |
| D-68 | The input is a native `<input>` with a real `<label for>`. `required` sets `aria-required` and the Red `*`, not the native `required` | DESIGN-SYSTEM.md's own wiring rule; the native attribute would show the browser's validation bubble over the error |
| D-69 | The padding that clears a leading or trailing icon is `12 + icon-sm + 8`, made of tokens; it is what the source's 36px is made of | Follow tokens |
| D-70 | `error` replaces `helper` in the same element and sets `aria-invalid` and the describing id, as DESIGN-SYSTEM.md says. `success` shows a Green border and a Fill check-circle and is ignored while `error` is set | DESIGN-SYSTEM.md |
| D-71 | Width 100%, sizes sm and lg, the Neutral-5 placeholder, the autofill override and `hideLabel` | INPUT-2, INPUT-4, INPUT-5. Approved 2026-10-26 (Q-INPUT-1 to Q-INPUT-3, Q-INPUT-6) |
| D-72 | Error text is bold (700) in every component; the counter stays its own row; the prefix and suffix each reserve a fixed 28px | INPUT-6 to INPUT-8. Approved 2026-10-26 (Q-INPUT-4, Q-INPUT-5 and the 28px decision) |
| D-73 | Textarea takes Input field's approved rules: label always rendered (`hideLabel`), `aria-required` (not native `required`), the error replacing the helper with `aria-invalid`, a bold Red error, a 1px Red error border, the 2px Obsidian focus border (padding 11px), a Neutral-5 placeholder, a width of 100% | Same field family; one look |
| D-74 | The Textarea's error and disabled looks (TEXTAREA-2), the body2 type (TEXTAREA-1) and an optional character count (TEXTAREA-5). The 96px floor is a local custom property | Approved 2026-10-26 (Q-TEXTAREA-1 to Q-TEXTAREA-3) |
| D-75 | The card is uncontrolled: it keeps the current question, the choices and the typed text itself, reports every answer once through `onSend`, and renders nothing after it closes (Rule 13). It cannot be reopened; a new decision is a new instance | Rules 10 to 13: closing is final |
| D-76 | Options are `role="radiogroup"` or `role="group"` named by the question; the question is a `tabIndex=-1` paragraph that takes focus when the question changes | Accessibility; the question is the card's heading |
| D-77 | Choosing an option on the last single-choice question only enables Send; options and the written answer exclude each other on every question; focus moves to the new question on every change | TOOL-4 to TOOL-6. Approved 2026-10-26 (Q-TOOL-1 to Q-TOOL-3) |
| D-78 | Local custom property: Card's 240px floor (`--cui-tool-approval-min-width`). The 480ms advance delay is a constant in `ToolApproval.tsx`. Everything else is tokens | No token for either |
| D-79 | The geometry hooks keep their DESIGN-SYSTEM.md names (`--prompt-bar-shift`, `--prompt-bar-push`, `--prompt-bar-w`); the component writes the first two from the `parkShift` and `pushShift` props, which the host measures | Documented API; no `style` prop |
| D-80 | The scroll collapse is built into the component, from a `scrollContainer` ref (collapse past 240px, expand within 8px, passive listener, one frame), with `collapsed` to force the pose | DESIGN-SYSTEM.md Behavior |
| D-81 | `onLaunch` (press the card or pill, or Enter in the floating bar) and `launched` (the chat is open) are the only launch API; the bar never opens from focus | DESIGN-SYSTEM.md Behavior |
| D-82 | Decided 2026-10-27 (Q-PIB-1 to 5; Send is disabled when empty, the rest kept as built): typing-line speeds (PIB-4), press behaviour (PIB-5), the model menu's keyboard use (PIB-6), Send to Stop (PIB-7) and Enter and Send gating (PIB-8) | Flagged Q-PIB-1 to Q-PIB-5 |
| D-83 | Local custom properties: the 620px and 406px widths, the pill's 11px and 56px padding, the stacking order, the model trigger's 160px, the menu's 180px, 36px rows and z-index 60. The 480-style constants (35ms, 18ms, 5s) are in `PromptInputBar.tsx` | No tokens for any of them |
| D-84 | Chip is two components: `FilterChipGroup` (single or multi, options as data) and `InputChipGroup` (chips, optional `onRemove`, overflow). No standalone chip, since a lone filter chip has no group semantics and the DS forbids mixing the kinds | DESIGN-SYSTEM.md Chip: Placement, Selection modes |
| D-85 | Decided 2026-10-27 (Q-CHIP-1 to 3 kept as built; Q-CHIP-4 kept as the literal for now): single-select arrows move and choose (CHIP-1), forced-colours fill (CHIP-4), ×-only Delete/Backspace and no focus move after a removal (CHIP-5), disabled × (CHIP-6), the literal count colour (CHIP-8) | Flagged Q-CHIP-1 to Q-CHIP-4 |
| D-86 | `ChatWindow` and `ChatMessage` are one component. The window is drawn from the body (portal) with its own popover layer, which the More options menu and the Prompt input bar's model menu use (`PortalContainerContext`), so they stay above the window | CHAT-1; DESIGN-SYSTEM.md Chat window |
| D-87 | The window folds from an `origin` ref (the floating bar) and has no fold without one: it appears and the veil fades in. Closed is unmounted, not hidden | CHAT-1 |
| D-88 | Message actions show only where the host handles them: Copy always; Read aloud with `onReadAloud`; the thumbs with `onFeedbackChange`; More options with any of `onRetry`, `onShare`, `onReport`. The component never invents what a button does | DS: contents of More options unconfirmed |
| D-89 | The thread detects older turns added at the top by the first child changing, and holds the viewport by measuring how far the turn that was first has moved, so the browser's own scroll anchoring cannot double it | DS edge case 2 |
| D-90 | Decided 2026-10-27 (Q-CHAT-1 to 9): the roles dropped (CHAT-3), the inert drawer (CHAT-4) and the menu keys and Escape order (CHAT-5) kept, the veil and the title and label weights on tokens (CHAT-6), the veil/content split (CHAT-2), the narrow Send fix (CHAT-7), the footer copy (CHAT-8) and the forced-colours edges (CHAT-9) kept, and Streaming Text's `actions` prop (CHAT-10) | Q-CHAT-1 to Q-CHAT-9 |
| D-91 | `--measure-prose` (760px) and the ten `--z-*` layer tokens added to the DLS (v0.9.127, authorised 2026-10-27), written into components.css wherever a page-level layer used a number, and used by Chat window, the Prompt input bar's floating bar and menu. No visual change. The scale is the eight layers the Tutorial Modal survey listed, plus the menu (60) and panel (70) | Q-CHAT-4 |
| D-92 | Switch is a real `<input type="checkbox" role="switch">` in a label, like Checkbox and Radio. The state is the input's `checked`, never a separate class. There is no error state, since a switch always has a value and applies at once | DESIGN-SYSTEM.md Switch |
| D-93 | Provisional: hover and pressed by the thumb's shadow, the focus ring, forced-colour tracks, instant motion under reduced motion, and the local track and thumb sizes | Flagged Q-SWITCH-1 to Q-SWITCH-3 |
| D-94 | Charts (extra) is its own entry point (`@collabrium/ui/charts-extra`) with Recharts as an optional peer dependency; the Chart.js set and this one never import each other | User, 2026-10-29: "keep Chart.js and this file separate so I can call on either" |
| D-95 | The DLS chrome and marks apply to the Recharts charts; Amicro supplies only the shapes. The DLS series colours replace the Amicro and Dither palettes | User, 2026-10-29: "yes DLS colours replace Amicro palettes" |
| D-96 | The charts are chart-only: data comes in through props, and the card, title, readout and toggles are the host's | XCH-1 |
| D-97 | Provisional: round caps and joins, Recharts curves, the axis tooltip, the toggling legend, flat 12% wash, the animation placeholder | Flagged Q-XCH-1 to Q-XCH-6 |
| D-98 | Docs: two groups, Charts (extra) and Motion, each with an overview page and its parts under it | User, 2026-10-29. CLAUDE.md records the exception to "only AI Native is a group" |
| D-99 | Bar, Stacked bar, Waterfall and Funnel take the DLS bar rules (outer-end radius, thickness caps, hover mix, value axis from zero); Amicro supplies only the shapes | XCH-15, XCH-17, XCH-21 |
| D-100 | Bullet is not Recharts: HTML and CSS around the shared frame | XCH-22 |
| D-101 | Provisional: Waterfall's Green, Red and Navy and its four-corner rounding; the stacked ramp; the Funnel's value axis; Bullet's local sizes; the hover band | Flagged Q-XCH-7 to Q-XCH-12 |
| D-102 | The round charts follow the DLS Doughnut row (2px Neutral-1 border, same-hue ramp); gauges and radial charts, which the DLS does not cover, take the same slice border, the Progress Bar's track and the 4px bar radius | XCH-25, XCH-27, XCH-28 |
| D-103 | Provisional: the four-slice cap and 45% hole, the centre readouts, the radial ring thickness and angles, the gauge sweeps | Flagged Q-XCH-13 to Q-XCH-16 |
| D-104 | The shaded charts (Heatmap, Treemap, Activity heatmap) use the DLS Sequential rule: one hue, from the -bg tint to the full colour. Scatter and Bubble use their Marks rows. Heatmap and Activity heatmap are HTML and CSS | XCH-33, XCH-35 to XCH-38. Flagged Q-XCH-17 to Q-XCH-21 |
| D-105 | Radar and Polar area follow the DLS Marks rows; Amicro's "polar" is not built (it duplicates Radial gauge). Candlestick uses the Green and Red diverging pair with solid and hollow bodies. Pyramid is HTML and CSS | XCH-40 to XCH-45. Flagged Q-XCH-22 to Q-XCH-27 |
| D-106 | Composed follows the DLS Mixed row with a visible second axis. Sparkline follows the DLS Sparkline row and is only the line. No Dither charts and no KPI card chart (user, 2026-10-29) | XCH-47, XCH-48. Q-XCH-28 to Q-XCH-32 answered |
| D-107 | Motion (Phase 2): loaders are not ported (Loading State is the DLS component for that); entrances extend the existing Fade in and Slide up rather than adding Amicro's seven as separate pieces; Amicro's bouncing and springy pieces are ported as they are, with the DLS asked for an exception (user, 2026-10-29) | XMO-1 to XMO-4. Flagged Q-MOT-1 to Q-MOT-4 |
| D-108 | Motion batch 2: text, hover and cursor effects follow the DLS motion tokens and drop travel under reduced motion; the springs are kept as Amicro's (D-107); Glow button is Spotlight around a Button; Magnetic and Tilt wrap content rather than draw a button and card | XMO-5 to XMO-11. Flagged Q-MOT-5 to Q-MOT-9 |
| D-109 | Motion batch 3: scroll effects follow the entrance tokens; Page transition ports the three types Amicro actually drew; the hooks take token steps and respect reduced motion; no Toggle (Switch covers it) | XMO-12 to XMO-17. Flagged Q-MOT-10 to Q-MOT-14 |
| D-110 | Motion batch 4: small effects follow tokens and are readable by assistive technology (real text in the page, effects `aria-hidden`); the morphs are icon-level pieces for the DLS Button and fields; Search expand does not move focus; Dock is not reorderable | XMO-18 to XMO-24. Flagged Q-MOT-15 to Q-MOT-21 |
| D-111 | Motion batch 5: nine Amicro stack pieces become one Card spread with a layout option; the three sliders keep their pieces; cards are items with the DLS surface; every layout tweens on `--duration-slow` and `--ease-settle`; controls are DLS Buttons | XMO-25 to XMO-28. Flagged Q-MOT-22 to Q-MOT-24 |
| D-112 | Docs site only (no library or DLS change): every card picture is one 152px box with its content scaled to fit; big AI Native components and the five hooks show CSS outline pictures; docs pages fill the available width; each example sits in a tinted panel (user, 2026-10-30) | `playground/components/ThumbFit.tsx`, `src/components/docs-outline.docs.tsx`, `src/motion/lib/docs-shared.docs.tsx`, `playground/styles/docs.css` |
| D-113 | Card (base): the surface, header, icon chip, footer, accent, tint, warm and grid are ported; a clickable card is a real link or button in the title, stretched over the card; the title is a real heading with a level prop; the five elements each get an accent, a tint and a chip colour; forced-colours focus is an outline | CARD-1 to CARD-5. Flagged Q-CARD-1 to Q-CARD-6 |
| D-114 | Selectable is a variant of Card (a `selectLabel` prop), not a separate component: the real Checkbox on the LEFT (user), hidden at rest, shown on hover, focus-within, while selected and (always) on touch; all content sits in one column 16px right of the checkbox; Selected is a 2px Obsidian border and shadow-3 with an instant border swap; the halo shows over Selected; the 2px checkbox nudge stays | SEL-1 to SEL-3. Flagged Q-SEL-1 to Q-SEL-3; Q-SEL-4 answered |
| D-115 | USP card: a variant of Card, not a component: `minWidth="functional"` (280px), a `CardList` of three check-circle points (Fill, Obsidian) and the real Button (Primary, md) as a direct child, stretched to full width; the list takes the room left, so the button is pinned to the bottom of every card in a row | USP-1 to USP-3. Flagged Q-USP-1 to Q-USP-3 |
| D-116 | Empty state: one component with a `variant` (`fullpage`, `section`, `inline`) and a `tone` (`empty`, `error`) passed explicitly, never inferred; actions are objects (`primaryAction`, `secondaryAction`) drawn as the real Primary and Ghost Buttons, so two is the most and the order is fixed; inline takes only `linkAction` and cannot take an icon, heading or button (TypeScript union); the heading is a real heading with a level prop, drawn as h4; the body beats `.cui-card p` so it keeps body1 inside a Card | EMPTY-1 to EMPTY-5. Flagged Q-EMPTY-1 to Q-EMPTY-5 |
| D-117 | Price summary card: its own component built on Card (`minWidth="functional"`, `CardTitle`, `CardFooter`), the real Empty state (Section, no body) and Button; `items` with number costs, formatted as the currency, a space and two decimals; the total is the sum; four rows, then "Show X more" with the DS display rules; folded rows `inert`; focus moves to the next × after a removal | PRICE-1 to PRICE-7. Flagged Q-PRICE-1 to Q-PRICE-11 |
| D-118 | Docs site only (no library or DLS change): the card types are one **Cards** group, like Motion and Charts (extra): Card, Selectable card, USP card and Price summary card are its parts, and the DLS's other card variants are "Coming soon". Selectable and USP, settings on Card, each have their own docs file in `src/components/Card/` | User, 2026-11-04 |
| D-119 | Tag: one component with a `variant` (five elements, `purple`, `neutral`); the dot is drawn for every variant but `neutral`; an optional icon takes the dot's place; colours exactly as components.css | TAG-1 to TAG-4. Flagged Q-TAG-1 to Q-TAG-4 |
| D-120 | Profile card: its own component built on Card (`data-card="profile"`, gap 0), the real Checkbox and Tag; data in (`name`, Meta parts, `personas`, `platforms` with number followers), everything else computed (initials, sorting, abbreviated counts, tiers, empty parts removed); the kebab menu as React state, one open at a time across the page; the card opens through its name (`href` / `onOpen`), as Card | PROFILE-1 to PROFILE-6. Flagged Q-PROFILE-1 to Q-PROFILE-9 |
| D-121 | Tooltip: a wrapper around one trigger that adds `aria-describedby` (or `aria-label` with `role="label"`); the bubble always in the DOM, in a body portal once mounted; instant show and hide, one at a time, hidden by Escape, scroll and a tap elsewhere; four placements with flip, shift and a bottom fallback; the 240px wrap from the DS; no caret | TOOLTIP-1 to TOOLTIP-7. Flagged Q-TOOLTIP-1 to Q-TOOLTIP-6 |
| D-122 | Campaign card: built on Card with `data-card="campaign"` (no border, 14px radius, `height: auto`); opens through the name's stretched link or button; owner faces are the real Tooltip with `role="label"`; `movable` and `dragging` are props, the drag itself the board's; dates and ringgit formatted by the component | CAMPAIGN-1 to CAMPAIGN-6. Flagged Q-CAMPAIGN-1 to Q-CAMPAIGN-10 |
| D-123 | Ad Placement Card: one component wrapping the slot `<button>` (adds `aria-describedby`, the name and the pointer and focus handlers) and rendering the card, built on Card with `data-card="ad-placement"`, in a body portal once mounted; positioning, dismissal and touch from the DS; `inline` for documentation | ADPL-1 to ADPL-4. Flagged Q-ADPL-1 to Q-ADPL-6 |
| D-124 | Progress-to-Goal Bar: one `GoalBar` with `variant` (card, chart, table) and `size`; `value` (Obsidian) or `categories` (the walk); the scale, gap, headroom and re-base computed; `labels` for legend, row or none; positions inline, colours as `data-color` | GOAL-1 to GOAL-6. Flagged Q-GOAL-1 to Q-GOAL-11 |
| D-125 | Pacing card: built on Card (`data-card="pacing"`), GoalBar (`variant="table" labels="row" rowShowsGap={false}`) and Badge; the percent, badge colour and footer computed from `value`, `target`, `day`, `days`, `metOnDay`; `badge="neutral"` for early in a period | PACING-1 to PACING-5. Flagged Q-PACING-1 to Q-PACING-12 |
| D-126 | Entry Card: `EntryCardSet` (container, list, headroom, swap, playback scheduler) and `EntryCard` (button or link, `.cui-card.cui-entry-card[data-variant]`); variant from the set by context; the five drawings as markup in the component; still and clip props with the clip's sources loaded on first play | ENTRY-1 to ENTRY-5. Flagged Q-ENTRY-1 to Q-ENTRY-9 |
| D-127 | Info Banner: one `InfoBanner` with `tone`, `dismissible`, `actions` and `onDismiss`; role note or status; entrance and exit with `motion` (AnimatePresence, height closing); the AI gradient reuses Prompt input bar's keyframe; the close is the real Button | BANNER-1 to BANNER-6. Flagged Q-BANNER-1 to Q-BANNER-8 |
| D-128 | Hero Card: one `HeroCard` with `variant`, the CTA's Button style set by the variant, the tilt from pointer position; `CommandBrief` renders the Selected content in a body portal, kept mounted through the asymmetric exit; `onOpen` puts a stretched button in the heading | HERO-1 to HERO-5. Flagged Q-HERO-1 to Q-HERO-9 |
| D-129 | Media Ad Card: an `<article>` with the `cui-card` classes (`data-card="media-ad"`) so Card's surface and hover apply; the name is Card's stretched action; Live by touch, Compared and the tilt are data attributes set by the component; the family Tag colour comes from a fixed map; Compare is controlled or not (`compared` / `defaultCompared`); `MediaAdCardSkeleton` is a separate export | MEDIA-AD-1 to MEDIA-AD-4. Flagged Q-MEDIA-AD-1 to Q-MEDIA-AD-8 |
| D-130 | Metrics card: Media Ad Card's article, Live, touch, tilt, toggle key and swap box moved into an internal `MediaAdShell` that both cards render (`data-variant="metrics"`, `data-added` in place of `data-compared`); the clip follows Live through the shell's `onLiveChange`, and `data-playing` follows the video's own events; the bar fills take their width from `--cui-metrics-card-bar-w`; `MetricsCardSkeleton` is the shared skeleton with `variant="metrics"` | METRICS-1 to METRICS-4. Flagged Q-METRICS-1 to Q-METRICS-10 |
| D-131 | Progress Bar: one `ProgressBar` with three prop shapes (single `value`, stacked `segments`, `indeterminate`); `role="progressbar"` on the track (a `role="group"` for stacked, a progressbar per segment); the entrance by drawing the fill at 0 for two frames after mount; the track heights declared on the track so a bare track works; `cui-progress-shimmer` is the one shared keyframe. Media Ad Card's skeleton and Metrics card's bars now use it (Q-MEDIA-AD-8 and Q-METRICS-7, as decided: shared once Progress Bar existed) | PROGRESS-1 to PROGRESS-5. Flagged Q-PROGRESS-1 to Q-PROGRESS-11 |
| D-132 | ElementBadge: one `ElementBadge` whose root `<span>` wraps the chip (and the label with `showLabel`); the element's name, function and glyph come from one table in the component; the chip's colour is a local custom property set by `data-element`, as Card's icon chip; not a client component | ELBADGE-1 to ELBADGE-4. Flagged Q-ELBADGE-1 to Q-ELBADGE-8 |
| D-133 | Modal: one `Modal` that renders nothing while closed and, while open, a portal at the end of `<body>`: the scrim, then the panel (`role="dialog"`, `aria-modal`, named by the title). The close X is the real Button (ghost, sm, icon-only), which matches `.c-icon-btn`'s box and hover. The footer is the caller's Buttons (`actions`). The variant modals (Tutorial, Media Ad, Metrics, Compare) stay their own components | MODAL-1 to MODAL-5. Flagged Q-MODAL-1 to Q-MODAL-10 |
| D-134 | Stepper: one `Stepper` (an `<ol>`, not a client component) that derives each step's state from `currentStep` and draws the five indicator states from `data-state`; each `<li>` holds a step and, horizontally, the connector after it, with flex shares that reproduce the source's sibling layout; the 480px rule is a container query on the list itself. Timeline stays its own component | STEPPER-1 to STEPPER-3. Flagged Q-STEPPER-1 to Q-STEPPER-9 |
| D-135 | Stepper, below 480px: the connector's box turns transparent and an `::after` draws the line `inset-inline: calc((24px − 100%) / 2)`, out past the box by the step's spare width, so the line stops 4px off each circle at every width (user, 2026-11-05). The layout and shares are unchanged | DLS owed row 142 |
| D-136 | Stepper, below 480px: the text block takes `width: 200%` of the step (the circle-to-circle room less 8px), centred; the first and last take `100% + 12px`, pinned to their circle's outer edge. Forced colours: connectors and the narrow `::after` line in CanvasText (user, 2026-11-05) | DLS owed rows 143, 144 |
| D-137 | Back button: one `BackButton` (not a client component) that renders its row and, inside it, a real link (`href`) or button (`onClick`), as Card's title does; the ref goes to the link or button; Phosphor `ArrowLeft` Regular | BACK-1 to BACK-4. Flagged Q-BACK-1 to Q-BACK-8 |
| D-138 | PageHeader: one `PageHeader` (not a client component) rendering the row, the text block (a real heading, h1 by default, and an optional `<p>` subtitle) and an optional actions block; the gap below is left to the layout (App Shell) | PAGEHEADER-1 to PAGEHEADER-4. Flagged Q-PAGEHEADER-1 to Q-PAGEHEADER-5 |
| D-139 | Tabs: one client `Tabs` taking `tabs` (id, label, icon, count, disabled, content), controlled (`value`) or not (`defaultValue`); a roving Tab stop with automatic activation; the edge fades follow the row's scroll and size; the active tab is scrolled into the row (never the page) when it changes; the panels share one grid cell and cross-fade with two CSS animations started in the same render. The docs site's Preview / Code tabs use it | TABS-1 to TABS-5. Flagged Q-TABS-1 to Q-TABS-9 |
| D-140 | Tabs `scrollButtons` (user, 2026-11-06): two `aria-hidden`, `tabIndex=-1` buttons in the scroll area, each `hidden` unless its edge hides tabs, scrolling the list by 80% of its width (`smooth`, or instantly under reduced motion); a media query hides them on touch; with them on, the fades start 32px in | DLS owed row 151 |
| D-141 | Segmented Control: one client `SegmentedControl` (a `radiogroup` track) whose options are typed all-text or all-icon; the pill is measured from the selected segment (offset from the track's padding box) on render and on resize, placed with no transition the first time; icon options are wrapped with the source's tooltip bubble; a roving Tab stop with manual activation | SEG-1 to SEG-5. Flagged Q-SEG-1 to Q-SEG-10 |
| D-142 | Token audit (user, 2026-11-06): one-off values close to an existing token were reviewed side by side (review-drafts) and moved to the token chosen per row: Badge, Button, Chip, CampaignCard, Card, ChatWindow, EmptyState, EntryCard, HeroCard, GoalBar, InputField, LoadingState, Modal (reverses Q-MODAL-6), ProfileCard, PromptInputBar, Radio, StreamingText, Tag, Tooltip, Textarea, Thinking. Card's 3px accent and Switch's 3px inset were kept. Each CSS line says what it was | DLS owed 159–178 |
| D-143 | Lists: one `ListItem` whose element follows its props (`href` → `<a>`, `onClick` → `<button>`, `control` → `<label>` with the library's Checkbox box or Switch track in their own wrappers, none → `<div>`), typed so a chevron is only on links and `disabled` only on button and control rows; leading size on the List; `ListSection` labels its List with its heading; the states are separate components. Server-safe (no client directive). The list mutes the control's own hover, press and focus ring, as the source has none | LIST-1 to LIST-7. Flagged Q-LIST-1 to Q-LIST-9 |
| D-144 | Password field is a type of Input field, not its own component (the user, 2026-11-06): `InputField type="password"` adds the 40px end padding and the toggle (a real button named "Show password" / "Hide password", `aria-controls` the input, 44px hit area, disabled with the field; the shown state is component state, so it never persists across a reload) and hides Edge's reveal. Its props are a separate branch of the type, so `success`, `trailingIcon`, `prefix` and `suffix` can't be set with it. Toggle names are props for other languages | PW-1 to PW-4. Q-PW-1 to Q-PW-4 answered |
| D-145 | Search input: one client `SearchInput` with `variant` default / user / item, typed so Default takes `value` and User/Item take `query`, `results` and `selected`. The box is the source's (border on the `<input>`, real :focus); User/Item are a combobox (`role="combobox"`, `aria-activedescendant`, a `listbox` of `option`s) whose rows keep focus in the box on press; the collapsed choice is a `group` named by the label, with a hidden input carrying the id for forms. The 36px end padding is built from tokens, as Input field's | SEARCH-1 to SEARCH-8. Flagged Q-SEARCH-1 to Q-SEARCH-13 |
| D-146 | One-time code is `InputField type="otp"` (not in the DLS; the user's request and decisions): a branch of Input field's props (`onComplete`; no size, icons, prefix, suffix or count). One real input (`inputMode="numeric"`, `autocomplete="one-time-code"`, `pattern="[0-9]*"`, no `maxLength` so pasted separators are dropped before the six-digit cut) lies invisibly over six `aria-hidden` boxes; the caret is drawn in the next box and the real caret is kept at the end. Every size is an existing token; no local custom properties | Q-OTP-1 to Q-OTP-10 |
| D-147 | Dropdown (single select): one client `Dropdown` that renders Input field's own classes for the trigger (so label, box, focus, error, disabled and helper can't drift) plus `cui-dropdown`; the trigger is a `<div role="combobox">` (an `<input>` when searchable) driving a `listbox` by `aria-activedescendant`, so focus never leaves it; the DS's keyboard contract in full (no wrap, skip disabled, type-ahead with a 1s buffer, Escape twice when searchable, Tab keeps the value); drop-up measured on open and on resize/scroll, never flipping back while open; the DS's polite live region for empty and loading, outside the panel so it is heard; loading reuses Search input's spinner classes | DROP-1 to DROP-7. Flagged Q-DROP-1 to Q-DROP-8 |
| D-148 | Dropdown Multiple select is `<Dropdown multiple>`, not its own component: one trigger and panel (the source's duplicate multi rules ported once), typed so `multiple` takes `string[]`. Rows draw Checkbox's own `.cui-checkbox__box` keyed to a new `data-state="checked" \| "mixed"` hook in Checkbox.css (no input: the row is the option, as the DS's ARIA table asks). The footer is the library's Button (ghost / primary, sm). Picking stays open; Tab moves into the footer and leaving the field closes it (a focusout on the field); a press inside the panel keeps focus on the trigger. Groups (both variants): options carry `group`, bucketed in first-appearance order, each run a `role="group"` named by its heading. Q-DROP-1 to Q-DROP-8 applied as recommended | DROPM-1 to DROPM-8. Q-DROPM-1 to Q-DROPM-7 answered 2026-11-06 as recommended |
| D-149 | Radio card: `RadioCardGroup` + `RadioCard` in the Radio folder, sharing Radio group's context (with a new optional `errorId`, so each radio is described by the group's error, as the DS asks) and its legend, required marker, helper and error classes. The card is a `<label class="cui-card cui-radio-card">`: Card's surface with no copy; the circle is Radio's `.cui-radio__circle` / `__dot`, its checked look from `:has(:checked)`. Selected, hover, focus, disabled and error follow the source's selectors in its order. Validation and moving focus on error stay the page's job, as for Radio group (the docs example uses `noValidate`) | RC-1 to RC-7. Q-RC-1 to Q-RC-5 answered 2026-11-06: the circle centred on the h5 line, docs and usage merged into Radio's |
| D-150 | Quantity selector: one client `QuantitySelector`. The box is the source's (border through two custom properties so error, focus and disabled change one value; `:focus-within`); the label and helper are Input field's classes; − / + are raw `<button>`s wearing Button's ghost icon-only sm classes (so `aria-disabled`, press-and-hold and pointer capture stay in this component), out of the tab order. Width: a hidden measuring span in useLayoutEffect sets the input width and the slack padding (re-measured when fonts load). Value state: the committed number in a ref (so a hold never steps from a stale value) and the shown text separately, formatted only on commit, step or a page-set value | QTY-1 to QTY-8. Q-QTY-1 to Q-QTY-5 answered 2026-11-06 (compact corners `--radius-xs`, the rest as built) |
| D-151 | Fixes from the user's build test (2026-11-10). Card: in `padding="list"` the CardHeader gets 8px top and the CardFooter 8px bottom, so titles line up across a row (Q-LIST-2 had settled only the body). CardHeader: a new `action` slot at the end of the title row (centred with the title) for one control, such as a borderless Dropdown. EmptyState: inline, as a direct child of a Card, drops its padding and the base `margin: 0 auto` (which shrank and centred it in the card's flex column); in a list card it pads 8px 16px. Not changed: Card's equal-height, top-anchored rule (the DLS forbids hug or centre options; the KPI row moves to the Stat / KPI card, converted next); the chart's "View as table" spacing (pending a screenshot); the switch alignment (a fix in the user's page: a 40px-tall centring wrapper) | User test items 1, 2, 8, 10 |
| D-152 | Stat / KPI card: `StatCard` renders `cui-card cui-stat`, so the surface, the Interactive hover and focus (Card's `cui-card__action` on the label) and the icon chip are Card's; `min-width: 0` lets StatGrid's 180px floor decide. One union type (primary: trend, hero, sparkline; secondary: unit, goal). The goal rail is GoalBar `variant="table" labels="none"`, its target label hidden and label band collapsed inside the tile, with the achieved line drawn by StatCard from GoalBar's own `goalPercent`. No hooks but `useId`, so no `'use client'`. Docs in the Cards group | STAT-1 to STAT-7. Q-STAT-1 to Q-STAT-7 answered 2026-11-10 as recommended; and, at the user's request, everything after the value (trend, goal rail, sparkline, description, footer) sits at the bottom of the tile (`.cui-stat__value + * { margin-top: auto }`), so the last lines line up across a row |
| D-153 | Slider: native range inputs (two stacked for a range) over a drawn track and fill; values held as `[low, high]` (a single slider's low is `min`); the fill and tooltip placed by custom properties. Range clamps the moved thumb's value at its partner's (never the inputs' min / max), puts the last-moved thumb on top, and moves the nearer thumb on a bare-track click (a tie broken by the click's side). The tooltip is centred on the thumb, hidden from screen readers, and shown on hover, focus and drag; `aria-valuetext` comes from `format` / `formatValue`. `'use client'` (state and timers). Docs examples sit in `.docs-tip-room` so the tooltip isn't clipped by the example box | SLIDER-1 to SLIDER-12. Q-SLD-1 to Q-SLD-12 answered 2026-11-10 as recommended |
| D-154 | Toast: `ToastProvider` (portalled host, one polite live list for the page's life, the queue and the 3-toast limit, a leaving toast keeping its place until its exit ends), `useToast()` (`toast`, `dismiss`) and the presentational `Toast`. Each toast has its own timer (5s, never before 2s; Danger none) paused on hover and on focus inside; enter, exit and reflow on the motion library (`layout="position"`), off under reduced motion. Newest on top: the list renders newest first. The action is a link Button that also dismisses; the close is Button ghost sm icon-only. The lift above Back to top waits for Back to top | TOAST-1 to TOAST-11. Q-TOAST-1 answered newest on top (the user's call); Q-TOAST-2 to Q-TOAST-11 as recommended (2026-11-10) |
| D-155 | Table: one data-driven, generic `Table` (`columns`, `rows`, `getRowKey`) on `<table>` markup, always with the inner scroll box. Sorting by a button in each header with `aria-sort`; selection with the library's Checkbox; bulk and row actions capped at 3 until a Menu exists; frozen columns always sticky (inert until it scrolls) with edge flags from a scroll listener and ResizeObserver; the bulk toolbar's height measured from the header row; a 300ms-delayed skeleton and a fade-in after it; an empty slot; a sticky header scrolling inside `maxHeight`; and a `<tfoot>` total row (the user's addition, Neutral-2 in both variants). Column priority swapped (low hides first), a stronger sideways edge shadow drawn as gradients on the cells (TABLE-16), the selected line on the first cell, numbers / dates / statuses on one line. The docs site's tables now use it and its copied `.c-table` CSS is deleted | TABLE-1 to TABLE-15. Q-TABLE-1 to Q-TABLE-16 answered 2026-11-10: all as recommended; Q-TABLE-15 with the fill in embedded too (the user) |
| D-156 | Pagination: one `Pagination` choosing its variant from the page count (Overflow from 10) and hiding itself when the results fit one page (the smallest size when Rows per page is offered). The library's Dropdown for the page and Rows per page pickers (the user, changing Q-PAG-2), its label inline and its box fitted to the longest number; Rows per page in both variants, after the count in Default; a 7-slot window; pressed as hover (Button ghost); page-size memory opt-in per table (`pageSizeStorageKey`); no "No results". Tool approval's step count now uses Pagination's indicator class. Dropdown's panel is now fixed to the window so no clipping box cuts it (the user) | PAG-1 to PAG-11. Q-PAG-1 to Q-PAG-10 answered 2026-11-10: all as recommended |
| D-157 | Back to top: one `BackToTop` (`scrollRef`, `label`), fixed bottom-right, stepping in past a scrolling frame's right-edge scrollbar (the user's addition, after trying it centred); the DS's 480 / 240 thresholds, read on mount and on scroll of the window and the frame; the click scrolls both to the top and moves focus to the page's first `h1`; the page flag `data-cui-back-to-top-shown` on `<html>` lifts Toast's stack at every width; `--cui-action-bar-clearance` read for Action bar; icon only (a TOP label was drawn and set aside by the user) | BTT-1 to BTT-6. Q-BTT-1 to Q-BTT-5 answered 2026-11-10: all as recommended. Toast keeps its 24px right edge (the user) |
| D-158 | Date picker: one `DatePicker`, single and range, on Input field's field parts; the calendar fixed to the window (as Dropdown's panel); a six-week `role="grid"` table with roving focus; values as `YYYY-MM-DD`. Day-first dates, Monday first, the range as one band, and month and year grids from the header (the user's addition) | DP-1 to DP-8. Q-DP-1 to Q-DP-12 answered 2026-11-10: Q-DP-3 day first (the user), the rest as recommended; the month and year grids added at the user's request |
| D-16 | Badge `children` accepts any React content, not only text | preview.html puts visually hidden context inside a badge (3407: "Highest" + sr-only text). The 20-character limit is an authoring rule (DS), so it is not enforced in code |
| D-17 | Checkbox renders a native `<input type="checkbox">` (hidden but focusable) inside a `<label>`, not the DLS's `span[role=checkbox]` | CHK-5. A native input gives Space, form value, focus and `indeterminate` for free, and cannot drift from its visual state |
| D-18 | The checked and partly-selected look comes from `input:checked` / `input:indeterminate`, not an `.on` class | Same colours and glyphs as `.c-checkbox-box.on`, driven by the real state, so uncontrolled checkboxes work without React state |
| D-19 | A keyboard focus ring (2px Obsidian, 2px offset, the Button token) is drawn on the box | CHK-2. The component rules require a visible focus ring. It only appears on keyboard focus, so rest, hover and checked looks are unchanged. Flagged Q-CHK-4 |
| D-20 | Props are a union: `label` (with optional `description`), or `aria-label` alone. One of the two is required | DS: "pair every checkbox with a real `<label>`". Cards and tables need a name without a visible label (CHK-5) |
| D-21 | `indeterminate` is a prop that sets the DOM property; the parent clears it in `onChange` | It is a DOM property with no attribute, and browsers clear it on click. Matches the native model |

---

## 6. Open questions

Leave these open until a designer answers. Each one has a TODO in the code that names its ID.

### Button

| ID | Question | Where |
|---|---|---|
| Q-BTN-1 | Should the DLS add tokens for control heights (32/40/48), the 6px icon gap, the 14/16px button type sizes and the 2px focus offset? They are local custom properties until then **Answered 2026-10-26: heights, the icon gap, the focus offset and the beacon cycle are tokens now; the 14px and 16px label sizes stay local.** | `Button.css` top |
| Q-BTN-2 | Danger and Link variants: what are hover, active, focus and disabled? Is white on Red (≈3.6:1) acceptable for Danger? **Answered 2026-10-26: build Danger and Link from the similar states; to be shown for approval.** **Built and approved 2026-10-26: Danger and Link, states designed from the similar variants. See Q-BTN-9.** | not built |
| Q-BTN-3 | Loading: spinner size (icon-sm assumed), whether hover and press still change the fill while loading, and whether the spinner keeps turning under reduced motion (Thinking Rule 20 says spinners keep turning) **Answered 2026-10-26: the spinner keeps turning under reduced motion (built). Answered 2026-10-26: the fill is fixed while loading, no hover or pressed change, because it isn't interactable (built; D-55).** | `Button.css` Loading |
| Q-BTN-4 | Disabled Secondary and Ghost: keep the shipped one-rule look, or adopt the DS table (BTN-2)? **Answered 2026-10-26: keep the shipped one-rule disabled look; the DLS text is to be corrected.** | `Button.css` Disabled |
| Q-BTN-5 | Secondary and Ghost pressed: keep the shipped hover-equals-pressed look, or add the DS's Neutral-3 (BTN-3)? **Answered 2026-10-26: keep hover-equals-pressed; the DLS text is to be corrected.** | `Button.css` variants |
| Q-BTN-6 | Icon size: keep the inherited 14px at sm (shipped), or the DS's icon-sm 16px everywhere (BTN-5)? **Answered 2026-10-26: icon-sm (16px) at every size, following the token (built).** | `Button.css` icons |
| Q-BTN-7 | Should `aria-disabled` get a shared base style (BTN-7)? **Answered 2026-10-26: yes. `aria-disabled="true"` (except while loading) looks disabled (built).** | — |
| Q-BTN-8 | In forced-colours mode, Primary and Ghost buttons show no outline (no border in the source), so they read as plain text. Shipped the same way; should they get a forced-colours border? **Pending: see review-drafts/review-2026-10-26.html, decision A1.** **Answered 2026-10-26: add a forced-colours edge to Primary (built). Ghost stays borderless; the edge only shows in forced colours.** | `Button.css` |
| Q-BTN-9 | Review Danger and Link (designed here): Danger hover and pressed are Red mixed 12% and 22% toward Neutral-9 (no darker-red token); Link hover Neutral-7, pressed Neutral-5, disabled Neutral-4 with underline kept, square focus ring. White on Red is about 3.7:1, below AA for 16px: darker Danger red? **Approved 2026-10-26: Danger and Link as built, including white on Red as the DLS specifies and Link's square focus ring.** | `Button.css` |

### Badge

| ID | Question | Where |
|---|---|---|
| Q-BADGE-1 | Should the DLS add tokens for the 2px vertical padding and the tinted fills and borders (Green 12/32%, Red 10/30%, Amber 14/38%)? Local custom properties until then **Answered 2026-10-26: the tints and text colours are tokens now.** | `Badge.css` top |
| Q-BADGE-2 | Height: keep the shipped 20px (inherited line-height), or set the DS's 22px (BADGE-2)? **Answered 2026-10-26: follow the DLS, 22px (built).** | `Badge.css` header |
| Q-BADGE-3 | Info variant: add the CSS from the DS table (Water at 10% fill, Water text, Water at 28% border)? Not built until then (BADGE-4) **Answered 2026-10-26: build Info from the DLS table (built).** | `Badge.tsx` `BadgeVariant` |
| Q-BADGE-4 | Icon size: keep the inherited 11px (shipped), or the DS's icon-micro 14px (BADGE-5)? **Answered 2026-10-26: follow the DLS, icon-micro 14px (built).** | `Badge.css` icon |
| Q-BADGE-5 | Contrast: adopt the DS's darker Success (and Warning) text colours, and what should Error text be to pass AA (BADGE-1, BADGE-6)? **Partly answered 2026-10-26: Success and Warning now use the DLS's darker text (built). Error text still has no fix; needs a colour.** **Answered 2026-10-26: keep Error text as shipped. Don't ask again.** **Superseded 2026-10-26: Error text now uses the new `--color-red-text` (4.8:1 on its tint).** | `Badge.css` variants |
| Q-BADGE-6 | Type size: label3 11px (shipped) or caption 12px (DS) (BADGE-3)? **Answered 2026-10-26: follow the DLS, caption 12px (built).** | `Badge.css` base |
| Q-BADGE-7 | Neutral text: components.css has Neutral-9, DESIGN-SYSTEM.md says Neutral-5 (BADGE-1). Kept Neutral-9. Which one? **Answered 2026-10-26: keep Neutral-9. Don't ask again.** | `Badge.css` variants |

### Checkbox

| ID | Question | Where |
|---|---|---|
| Q-CHK-1 | Should the DLS add tokens for the 18px box, the 6px radius (DS calls it a one-off), the 2px top nudge and the 2px focus offset? Local custom properties until then **Answered 2026-10-26: the box size, radius, nudge and focus offset are tokens now.** | `Checkbox.css` top |
| Q-CHK-2 | Glyph size: keep the shipped 12px, or the DS's icon-micro 14px (CHK-1)? **Answered 2026-10-26: follow the DLS, icon-micro 14px (built).** | `Checkbox.css` top |
| Q-CHK-3 | Hover and pressed: none in CSS or DS (CHK-3). Keep none, or add Neutral-2 / Neutral-3 like Button Ghost? **Answered 2026-10-26: add hover and pressed states (built and approved 2026-10-26: Neutral-2 / Neutral-3 for an empty box, Neutral-8 / Neutral-7 for a checked one).** | `Checkbox.css` |
| Q-CHK-4 | Focus ring on the box (D-19, CHK-2): confirm the standard 2px Obsidian ring, or specify another | `Checkbox.css` Focus **Answered 2026-10-26: confirmed, the standard 2px Obsidian ring.** |
| Q-CHK-5 | Error / required state and a checkbox group (fieldset + legend, group error): not in the DLS. Needed? **Answered 2026-10-26: build error, required and group; to be shown for approval.** **Built and approved 2026-10-26: `required`, `error` and `CheckboxGroup`. See Q-CHK-7.** | not built |
| Q-CHK-6 | The 2px top nudge is always on. When Dropdown, Lists, Table and Card are converted, how should an embedded Checkbox drop it (CHK-6)? | `Checkbox.css` **Still open, by the user's choice (2026-10-26): flag it when Dropdown, Lists, Table or Card is built, with a picture of the affected components, before asking.** **Update 2026-10-30: A selectable Card is the first place a Checkbox sits in a card. It keeps the 2px nudge (as in the CSS), which lines the box up with the title's first line (1px off centre); without it the box sits 3px high. Answered 2026-10-30: keep the nudge always on, including inside cards (the recommendation).** |
| Q-CHK-7 | Review Checkbox required, error and group (designed here from Input field and Radio card group): Red `*` after the label or legend, bold Red error replacing the helper, 1px Red border on empty boxes (the DLS says 1px in text and 2px in CSS), fieldset with legend, boxes 12px apart **Approved 2026-10-26: required, error and group as built.** | `Checkbox.css`, `CheckboxGroup.tsx` |

### Loading State

| ID | Question | Where |
|---|---|---|
| Q-LOAD-1 | Should the DLS add tokens for the 4px cell, 1.5px gap, 1px cell radius, and the loop cadences (650ms, 950ms, 5s) and cell staggers (90ms, 110ms)? Local custom properties until then. No motion token is a loop **Answered 2026-10-26: none of these gets a token (the component's own pixel geometry and loop timing).** | `LoadingState.css` top |
| Q-LOAD-2 | Forced colours (LOAD-5): the grid vanishes and only the label and timer show. Leave it, or add a rule (for example cell colour from `CanvasText`) so the grid stays visible? **Pending: see review draft, decision A2.** **Answered 2026-10-26: keep the grid visible in forced colours (built).** | `LoadingState.css` |
| Q-LOAD-3 | Should the component own the 400ms hold-back (D-22), or leave it to the host? | `LoadingState.tsx` **Answered 2026-10-26: leave it to the host (built; D-54).** |
| Q-LOAD-4 | A long label never wraps or truncates (`nowrap`). Is there a maximum length or an ellipsis rule? The DS is silent **Pending: see review draft, decision D1.** **Answered 2026-10-26: ellipsis, full label as the tooltip and for screen readers (built).** | `LoadingState.css` label |

### Thinking

| ID | Question | Where |
|---|---|---|
| Q-THINK-1 | Should the DLS add tokens for the 380px width, 176px active height, 6px hit-target padding, 28px / 26px row heights, 6px row radius, 11px diff size and the 1.4s shimmer / 120ms stagger? Local custom properties until then. Also: does the timeline line still centre under the SVG sparkle (the `-1px`, THINK-8)? **Answered 2026-10-26: tokens added where they fit; the rest stay local.** | `Thinking.css` top |
| Q-THINK-2 | Rule 14's timer (THINK-1): should the header show a running timer? It needs anatomy and CSS. Until then the host folds the duration into `doneLabel` **Answered 2026-10-26: build the timer from the rule; to be shown for approval.** **Built and approved 2026-10-26. See Q-THINK-7.** | `Thinking.tsx` |
| Q-THINK-3 | Reduced motion: should the spinner keep turning (Rule 20 text) or stop (the CSS)? Shipped as the CSS (THINK-2) **Answered 2026-10-26: the spinner keeps turning under reduced motion (built).** | `Thinking.css` reduced motion |
| Q-THINK-4 | Live region: keep it on the status spans inside the button as the gallery has it, or move it outside the button (THINK-4)? **Pending: see review draft, decision A3.** **Answered 2026-10-26: the announcement moved outside the button (built).** | `Thinking.tsx` header |
| Q-THINK-5 | Confirm the closed trace is `inert` (D-29), and that rows keep the browser's default focus ring (THINK-6) rather than the Obsidian ring **Pending: see review draft, decisions A4 and A5.** **Answered 2026-10-26: keep inert; rows take the Obsidian focus ring (built).** | `Thinking.tsx`, `Thinking.css` |
| Q-THINK-6 | "+N more" fades in "once every rendered row has settled" (Rule 11 / anatomy). It shows as soon as `moreCount` is given; should the component wait for the rows' entrance to finish (THINK-7)? **Answered 2026-10-26: keep: "+N more" shows as soon as the count is given.** | `Thinking.tsx` |
| Q-THINK-7 | Review the Thinking timer (designed here): caption, Neutral-5, between the label and the chevron; becomes `{duration}` in the done label; ticks under reduced motion **Approved 2026-10-26: the timer as built.** | `Thinking.tsx`, `Thinking.css` |

### Streaming Text

| ID | Question | Where |
|---|---|---|
| Q-STREAM-1 | Should the DLS add tokens for the 420px width, 1.65 line height, caret, chip and avatar sizes, 28px action button and 90ms follow-up stagger? Local custom properties until then **Answered 2026-10-26: tokens added where they fit; the rest stay local.** | `StreamingText.css` top |
| Q-STREAM-2 | Rule 6's cadence: is 55ms the only number, or should the faster steps (35ms over 12 words, 20ms over 24) be specified? Mine for now (D-36) **Answered 2026-10-26: keep the 35ms and 20ms steps as shipped.** | `StreamingText.tsx` |
| Q-STREAM-3 | Failed stream (Rule 18) and structured content (Rules 11 to 13) have no markup or CSS (STREAM-5, STREAM-6). What should an error and its retry look like, and how do a list, a table and a code block render? Not built **Answered 2026-10-26: leave failed streams and structured content out for now; ask the DLS owner for the visuals and add them in a later round.** **Failed stream built and approved 2026-10-26. Tables, code and lists (Rules 11 to 13) are still not built.** | `StreamingText.tsx` |
| Q-STREAM-4 | Copy: confirm it writes to the clipboard, is named "Copied" while its check shows, and copies a citation as its domain. Retry and the thumbs only appear when the host passes a handler (D-39) **Answered 2026-10-26: keep. Copy writes to the clipboard; Retry, the thumbs and the sources button appear only when wired.** | `StreamingText.tsx` |
| Q-STREAM-5 | Rule 7 (under about 12 words, reveal whole) conflicts with Rule 3 (begin at the first token): a short answer cannot be known to be short until it ends. Shipped: words stream as they arrive, and a finished answer under 12 words flushes at once **Answered 2026-10-26: keep. Words stream as they arrive; a finished answer under 12 words fills in at once.** | `StreamingText.tsx` |
| Q-STREAM-6 | Source avatars take a colour from the host (the gallery hard-codes brand hex values inline). The default when none is given is Neutral-7. Should the DLS define one? Also: the reduced-motion cadence is read from the OS setting, so the docs site's Reduce motion toggle (which only mirrors CSS) does not affect it **Answered 2026-10-26: keep the host-supplied avatar colour with a Neutral-7 default (the reduced-motion toggle note stays open).** | `StreamingText.css`, `StreamingText.tsx` |
| Q-STREAM-7 | Review the failed stream (designed here): red WarningCircle glyph, "Couldn't finish this response" in Neutral-5, Retry beside it, actions kept, no follow-ups; announces "Response failed. Retry available." **Approved 2026-10-26: the failed stream as built.** | `StreamingText.tsx`, `StreamingText.css` |

### Task Rows

| ID | Question | Where |
|---|---|---|
| Q-TASK-1 | Should the DLS add tokens for the 440px width, 196px capsules height, 44px head, 24px disc, 28% arc and the 80ms / 100ms staggers? Local custom properties until then **Answered 2026-10-26: tokens added where they fit; the rest stay local.** | `TaskRows.css` top |
| Q-TASK-2 | Confirm the 8px gap between capsules and the list's hairlines, which the gallery's markup does not produce (TASK-1, TASK-2, D-49). Or should the DLS fix its markup instead? **Answered 2026-10-26: keep the 8px gap and the list hairlines (D-49).** | `TaskRows.css` |
| Q-TASK-3 | Rule 17's wording: a needs-input failure announces "that it failed, and that the ask is in the conversation". The component cannot tell that cause from an unresolvable one (both look the same on the row), so both say "Details are in the conversation." Confirm the wording and that the component should announce the end of the run **Answered 2026-10-26: keep the wording and the end-of-run announcement (D-47).** | `TaskRows.tsx` |
| Q-TASK-4 | Should the active task open itself, and close when it completes (TASK-3), or only a failure (the written Rule 6)? Built as the gallery **Answered 2026-10-26: keep the gallery's behaviour (the task in progress opens, then closes when it completes).** | `TaskRows.tsx` |
| Q-TASK-5 | Confirm the closed detail is `inert` (TASK-5), and that the spoken state drops "No retries left." (TASK-4) and hides the visible copies from assistive tech (TASK-6) **Answered 2026-10-26: keep the inert closed detail, the dropped "No retries left." and the hidden duplicate text.** | `TaskRows.tsx` |
| Q-TASK-6 | Narrow screens (TASK-8): should the count or the pill give way before the label does, and what is the minimum width? **Answered 2026-10-26: define a rule. Built: below 400px of the component's own width the count moves under the name and the name may take two lines; the pill and chevron keep their slots (D-51). The DLS should adopt or replace it.** | `TaskRows.css` |
| Q-TASK-7 | The gallery has no Stopped state and no demo of the list variant or of "+N more" (the CSS exists). Should the DLS add them? **Answered 2026-10-26: build the Stopped state; list demo exists in the docs.** **Built and approved 2026-10-26: the `stopped` status. See Q-TASK-8.** | gallery |
| Q-TASK-8 | Review the Stopped state (designed here): neutral "Stopped" pill, plain number disc, no ring, no Retry; every unfinished task stops together; announces "Run stopped. X of N tasks completed." **Approved 2026-10-26: the Stopped state as built.** | `TaskRows.tsx` |
| Q-PERM-1 | After a decision the focused button disappears. (a) Move focus to the resolved row, which reads "Read pipeline-config.ts? Allowed" and has no live region (built, but only when the press came from a focused button), (b) a polite status announces the outcome and focus drops to the page, or (c) focus the toggle. My recommendation: (a). The CLAUDE.md rule says focus moves only to a heading or an error message, so (a) is an exception | `PermissionPrompt.tsx` **Answered 2026-10-26: (a), keep (built; D-60). An approved exception to the CLAUDE.md focus rule.** |
| Q-PERM-2 | The scope note and the resolved note render at 14px with no margin, because Card's `p` rule wins. The rules say caption (12px) with a 12px margin below the scope note. Keep what the DLS draws (built), or follow the written values? My recommendation: keep what is drawn, and have the DLS prefix those two selectors so the CSS says what it renders | `PermissionPrompt.css` **Answered 2026-10-26: keep what the DLS draws (built; D-61); the DLS prefixes those selectors (row 30).** |
| Q-PERM-3 | Deny's colour: (A) Ghost with `--color-red` as the source has it (built; 3.2:1 on white), (B) Ghost with `--color-red-text` (`#D4001A`, 5.5:1), or (C) the Danger variant (white on red, a solid fill that competes with Allow for session and breaks the rising weight left to right). My recommendation: B | `PermissionPrompt.css` **Answered 2026-10-26: B, then reversed the same day: keep `--color-red` (D-63).** |
| Q-PERM-4 | Confirm the Obsidian focus ring on the toggle and on the resolved row (D-59), as approved for Thinking | `PermissionPrompt.css` **Answered 2026-10-26: confirmed.** |
| Q-RADIO-1 | Radio gets what Checkbox was approved for: hover and pressed, the Obsidian focus ring, the required marker and error (RADIO-2, RADIO-4), plus a forced-colours dot (RADIO-3). Confirm for Radio. My recommendation: yes | `Radio.css`, `RadioGroup.tsx` **Answered 2026-10-26: yes, all of them on Radio (built; D-66).** |
| Q-INPUT-1 | Width: the source is 220px (a demo default). Built 100% of the container, so the layout sets the width. Keep 100%, or keep 220px? My recommendation: 100% | `InputField.css` **Answered 2026-10-26: keep 100% (built; D-71).** |
| Q-INPUT-2 | Sizes: DESIGN-SYSTEM.md has sm 32px, md 40px, lg 48px; the CSS has md only. Built all three as a `size` prop, like Button. Keep? My recommendation: yes | `InputField.css` **Answered 2026-10-26: keep the three sizes (built; D-71).** |
| Q-INPUT-3 | DESIGN-SYSTEM.md asks for a Neutral-5 placeholder (the CSS leaves the browser's grey) and an autofill override that keeps the Neutral-1 fill (the CSS has none). Built both. Keep? My recommendation: yes | `InputField.css` **Answered 2026-10-26: keep the Neutral-5 placeholder and the autofill override (built; D-71).** |
| Q-INPUT-4 | Error text weight: the CSS draws it regular, DESIGN-SYSTEM.md says 700, and Checkbox, Radio and Radio card group already use 700. Built regular (the CSS). Which? My recommendation: 700 everywhere, so every error in the library looks the same | `InputField.css` **Answered 2026-10-26: 700. Error states are consistent across all scenarios (built; D-72). Every converted and future error is bold.** |
| Q-INPUT-5 | Counter: both DESIGN-SYSTEM.md and the CSS comment say it shares the helper's line (helper left, `12/60` right); the CSS draws it as its own row. Built the CSS. Which? My recommendation: the same line | `InputField.css` **Answered 2026-10-26: its own row (built as is; D-72).** |
| Q-INPUT-6 | The DS says "always render a label, even if visually hidden" but the CSS has no way to hide it. Added `hideLabel`. Keep? My recommendation: yes | `InputField.tsx` **Answered 2026-10-26: keep `hideLabel` (built; D-71).** |
| Q-TEXTAREA-1 | The CSS draws no error or disabled look for a textarea, though DESIGN-SYSTEM.md says it has Input field's. Built from Input field's rules. Keep? My recommendation: yes | `Textarea.css` **Answered 2026-10-26: keep (built; D-74).** |
| Q-TEXTAREA-2 | Type: the CSS is body2 at regular weight (the same as Input field); DESIGN-SYSTEM.md says body1 at weight 500. Built body2, so a form mixing the two lines up. Which? My recommendation: body2 | `Textarea.css` **Answered 2026-10-26: body2 (built; D-74).** |
| Q-TEXTAREA-3 | Add a character count to Textarea, like Input field's (`showCount` with `maxLength`, `12/280`, Red at the limit, its own row)? Not built, because DESIGN-SYSTEM.md gives Textarea none. My recommendation: yes, as multi-line fields are the ones that usually have a limit | `Textarea.tsx` **Answered 2026-10-26: yes, and the user decides whether it shows: `showCount`, off by default (built; D-74).** |
| Q-TOOL-1 | Choosing an option on the last single-choice question sends right away (after 480ms), as the DLS demo does. Rule 6 says Send is the one action that submits everything, and a mis-click cannot be taken back once the card has closed for good. Keep the auto-send, or choosing on the last question only enables Send? My recommendation: only enable Send | `ToolApproval.tsx` **Answered 2026-10-26: choosing only enables Send (built; D-77).** |
| Q-TOOL-2 | Options and the written answer exclude each other (Rule 5). The DLS demo does it only for single-choice; built for every question, as the rule says. Keep? My recommendation: yes | `ToolApproval.tsx` **Answered 2026-10-26: every question, as Rule 5 says (built; D-77).** |
| Q-TOOL-3 | Focus moves to the new question (the card's heading, no ring) on every question change, so a keyboard or screen-reader user hears it, and there is no live region. The DLS has no focus handling. Keep? My recommendation: yes (it is an exception to nothing: the CLAUDE.md rule allows a heading) | `ToolApproval.tsx` **Answered 2026-10-26: yes, focus moves to the new question (built; D-77).** |
| Q-PIB-1 | The typing line's speeds are not in the DLS. Built: types at 35ms a character and starts after 300ms (both from the DLS demo), pulses 5s (DS), deletes at 18ms a character and lands the resting line after 60s whatever happens (both mine). Keep? My recommendation: yes **Answered 2026-10-27: keep as built.** | `PromptInputBar.tsx` |
| Q-PIB-2 | On the floating bar, a press on a toolbar button or the model menu does that control's job and does not open the chat; a press anywhere else on the card or pill does. Keep? My recommendation: yes **Answered 2026-10-27: keep as built.** | `PromptInputBar.tsx` |
| Q-PIB-3 | The model switcher: focus goes to the chosen model on open, the arrow keys move, Enter chooses, Escape closes, and focus returns to the switcher. The DS gives only outside press, Escape and choosing. Keep? My recommendation: yes **Answered 2026-10-27: keep as built.** | `PromptInputBar.tsx` |
| Q-PIB-4 | While `working`, Send becomes Stop: the Stop icon (Phosphor, Regular) and the name "Stop". The DS says "icon and label alike" with no icon. Keep? My recommendation: yes **Answered 2026-10-27: keep as built.** | `PromptInputBar.tsx` |
| Q-PIB-5 | Enter sends in the inline variant when there is text, and Send is never disabled (the DS says neither). Should Send be disabled when the box is empty (it stays enabled as Stop while `working`)? My recommendation: disable it when empty **Answered 2026-10-27: disable Send when the box is empty (built; rule 8).** | `PromptInputBar.tsx` |

### Chip

| ID | Question | Where |
|---|---|---|
| Q-CHIP-1 | Single-select arrow keys move **and choose** (with Home and End, wrapping, one tab stop), as the DLS's own radio groups do, rather than only moving focus as the Chip text says. A disabled chip is skipped. Keep? My recommendation: yes **Answered 2026-10-27: Keep as built.** | `FilterChipGroup.tsx` |
| Q-CHIP-2 | An active filter chip is drawn with `Highlight`/`HighlightText` in forced-colours mode so on and off still differ (the Obsidian fill is lost there). Keep? My recommendation: yes **Answered 2026-10-27: Keep as built.** | `Chip.css` |
| Q-CHIP-3 | Delete or Backspace on an input chip's × removes it, and a disabled input chip's × is disabled (the DLS only dims it). After a removal focus is not moved. Should focus go to the next chip's × (or the group) instead? That breaks the focus rule, so it needs your approval. My recommendation: leave as built **Answered 2026-10-27: Keep as built (focus is not moved after a removal).** | `InputChipGroup.tsx` |
| Q-CHIP-4 | The on-chip count colour is the literal `rgba(255,255,255,.7)`. Should the DLS add a token for white at 70%? Local until then **Answered 2026-10-27: keep the literal for now; no token yet.** | `Chip.css` |

### Chat window

| ID | Question | Where |
|---|---|---|
| Q-CHAT-1 | The conversation list is a `listbox` of `option` buttons and the action row a `toolbar`, as in the DLS, but neither has the arrow-key movement those roles promise (every row and button is a tab stop). Should the roles go (conversations as plain buttons with `aria-current`, the actions as a plain group), or should the arrow keys be added? My recommendation: drop the roles **Answered 2026-10-27: drop the roles (conversations are plain buttons with `aria-current`, the actions a plain group). Built.** | `ChatWindow.tsx`, `ChatMessage.tsx` |
| Q-CHAT-2 | At 820px and below the closed rail drawer is `inert`, so its rows are not reachable while off-screen (the DLS leaves them in the tab order). Keep? My recommendation: yes **Answered 2026-10-27: keep the inert closed drawer.** | `ChatWindow.tsx` |
| Q-CHAT-3 | More options menu: focus goes to the first row on open, the arrow keys move, Escape closes it and returns focus to the trigger, Tab leaves it. Escape closes the top layer: menu, then drawer, then window. Keep? My recommendation: yes **Answered 2026-10-27: keep the menu keys and the Escape order.** | `ChatMessage.tsx`, `ChatWindow.tsx` |
| Q-CHAT-4 | Values with no token: the veil `rgba(20,20,20,.42)`, 800 for the title and pillar label, 1200, 820, 288, 760, 78% and z-index 95. Keep the CSS's values (the veil and the 800 weights differ from `--shadow-overlay` and the 700 type tokens)? My recommendation: keep, and let the DLS add tokens **Answered 2026-10-27: the veil is now `--shadow-overlay`, and the title and pillar label use the type tokens' weight (700). Built. `--measure-prose` (760px) and the `--z-*` layer tokens were added to the DLS (v0.9.127) and are used. 1200, 820, 288 and 78% stay local.** | `ChatWindow.css` |
| Q-CHAT-5 | The CSS leaves the shell at `opacity:0` after its fold and gives the veil and the content one class. Built: the veil follows the fold, the content follows "settled", the shell is visible once settled, and with no `origin` the window just appears. Keep? My recommendation: yes, and the DLS adds a script for it **Answered 2026-10-27: keep as built.** | `ChatWindow.css`, `ChatWindow.tsx` |
| Q-CHAT-6 | At about 272px of window width (a 320px viewport) Send is clipped by 23px, in the DLS too. Fix by letting the model switcher's name shrink with an ellipsis? My recommendation: yes **Answered 2026-10-27: built: the model switcher's name shrinks with an ellipsis on an inline composer, so Send is never clipped.** | `PromptInputBar.css` |
| Q-CHAT-7 | The footer reads "Please double-check responses.", which the DS flags against the house rule (no "please"). Keep as specified, or "Double-check responses."? My recommendation: keep as specified until you decide the rule **Answered 2026-10-27: keep as specified.** | `ChatWindow.tsx` |
| Q-CHAT-8 | Forced-colours edges: a `CanvasText` border on the window and a `Highlight` outline on the selected conversation. Keep? My recommendation: yes **Answered 2026-10-27: keep.** | `ChatWindow.css` |
| Q-CHAT-9 | Streaming Text has its own action row and so does `ChatMessage`. Should Streaming Text drop its actions when it sits in a chat message, so the one row is the chat's? That edits a reviewed component. My recommendation: yes, as a follow-up **Answered 2026-10-27: Streaming Text gets an `actions` prop (default true); `false` inside a ChatMessage. Built, for your review.** | `StreamingText.tsx` |
| Q-CHAT-10 | On a phone (600px and below) the window fills the screen instead of floating with a 24px margin and rounded corners. **Answered 2026-10-27: yes, built.** | `ChatWindow.css` |

### Switch

| ID | Question | Where |
|---|---|---|
| Q-SWITCH-1 | The DLS has no hover, pressed or focus state. Built: the thumb's shadow deepens on hover and pressed (the track's Neutral-4 and Green fills stay, since they are the signal), and the standard 2px Obsidian focus ring sits on the track. Keep? The alternative is to darken the track (needs a darker green than any token). My recommendation: keep **Answered 2026-10-30: keep (the recommendation)** | `Switch.css` |
| Q-SWITCH-2 | Forced colours: an outlined off track and a Highlight on track, with a dark and a HighlightText thumb. Reduced motion: the move is instant. Neither is in the DLS. Keep? My recommendation: yes **Answered 2026-10-30: keep (the recommendation)** | `Switch.css` |
| Q-SWITCH-3 | No tokens for the track (40×24), the thumb (18) or the 3px inset. Local custom properties until the DLS adds them. Add tokens, or keep them local (nothing else uses them)? My recommendation: keep local **Answered 2026-10-30: keep local (the recommendation)** | `Switch.css` |

### Charts (extra)

| ID | Question | Where |
|---|---|---|
| Q-XCH-1 | Round caps and joins on lines (Amicro) or Chart.js's butt and miter? The DLS says nothing. They differ little at 2px. My recommendation: keep round **Answered 2026-10-29: keep as built.** | Line, Area, Stream, Step charts |
| Q-XCH-2 | Curves are Recharts `monotone` (never overshoots the data) where Chart.js's `tension: 0.3` can. Keep? My recommendation: keep **Answered 2026-10-29: keep as built.** | `LineChart`, `AreaChart`, `RangeChart` |
| Q-XCH-3 | The tooltip shows every series for the nearest category, with a cursor line. Chart.js shows only the hovered point. Keep? My recommendation: keep (easier to read and to use on touch) **Answered 2026-10-29: keep as built.** | `CartesianFrame` |
| Q-XCH-4 | The legend hides and shows a series, from the keyboard too. The DLS legend spec says nothing about interaction. Keep? My recommendation: keep **Answered 2026-10-29: keep as built.** | `ChartLegend` |
| Q-XCH-5 | The fill is a flat 12% wash (the DLS's rule), so the Amicro gradient is gone and the areas look lighter than the originals. Keep? My recommendation: keep, since the DLS says never above 12% **Answered 2026-10-29: keep as built.** | all area charts |
| Q-XCH-6 | A single series, and the Range band, default to Orange (the first in the mapping). Keep, or should a single series take the colour of the element that owns the metric, as Sparkline does? My recommendation: keep Orange as the default and let `color` override **Answered 2026-10-29: keep as built.** | `resolveSeriesColorName` |
| Q-XCH-7 | Waterfall colours: increases Green and decreases Red (the DLS diverging pair) and totals Navy. The DLS gives no colour for a total. Keep Navy? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `WaterfallChart` |
| Q-XCH-8 | Waterfall steps float, so they are rounded on all four corners (4px); totals only on their outer end. The DLS's top-only rule is written for bars from a baseline. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `WaterfallChart` |
| Q-XCH-9 | Funnel shows the value axis and its gridline like every DLS chart (Amicro hid them), with the 4px radius and 20px cap of the horizontal-bar rule (Amicro 8px and 16px). Keep the DLS look? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `FunnelChart` |
| Q-XCH-10 | Stacked bar `ramp`: three rungs (the element's -bg-strong tint, its pastel and its full colour) for five hues; the lightest rung is faint on white (the DLS already warns a ramp cannot clear 3:1). Keep? My recommendation: keep, since every part is also named by the legend, tooltip and table. **Answered 2026-10-30: keep (the recommendation)** | `StackedBarChart` |
| Q-XCH-11 | Bullet chart has no DLS source: Neutral-3 pill track, Obsidian marker, series-colour bar, a 12px track and 4px marker (Amicro's, no token), scale ending 15% past the target (Amicro's). Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `BulletChart` |
| Q-XCH-12 | Bar and Stacked bar also show a Neutral-2 band behind the hovered category, besides the 15% darkening of the bar (Chart.js has only the bar hover). Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `BarChart`, `StackedBarChart` |
| Q-XCH-13 | Donut: slices touch with a 2px white border and walk one hue's four-rung ramp, so up to four slices (the DLS allows five); the hole is 45% of the radius. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `DonutChart` |
| Q-XCH-14 | Donut centre text (the total, or the hovered slice) is Amicro's; Chart.js draws none. The same idea is used for the gauges' reading. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `DonutChart`, `ArcGauge` |
| Q-XCH-15 | Radial bar group and Radial gauge have no DLS source. Built: series colours per ring, a Neutral-3 track, 4px rounded ends, 8px thick rings (no token), first item outermost, starting at 9 o'clock. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `RadialBars` |
| Q-XCH-16 | Gauge arc (240°) and Meter (180°): one series colour (default Orange), the Neutral-3 track, the value in the centre, no legend and no tooltip. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `ArcGauge` |
| Q-XCH-17 | Bubble gets a View as table button although the DLS exempts it. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `BubbleChart` |
| Q-XCH-18 | Scatter and Bubble: gridline on the vertical axis only (as the preview.html Scatter), axis titles, both axes fitted to the data (not from zero), tooltip showing both figures (and the size). Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `XYChart` |
| Q-XCH-19 | Heatmap and Treemap shade continuously between the hue's -bg tint and its full colour. The lightest end (for Navy, #E8F1FD) is very faint on white, as in the DLS Doughnut. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `HeatmapChart`, `TreemapChart` |
| Q-XCH-20 | Activity heatmap: five steps, one of them (pastel to full, 50%) a mix of two tokens, not a token; the 10px smallest cell and the 2px gap and radius have no token. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `ActivityHeatmapChart` |
| Q-XCH-21 | Heatmap, Treemap and Activity heatmap keep their table in the page, visually hidden, for screen readers; their cells are not focusable. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `ChartShell` (`srTable`) |
| Q-XCH-22 | Amicro's "polar" chart is concentric rings, the same as Radial gauge. Built the DLS Polar area (equal wedges that reach out to their value) instead. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `PolarAreaChart` |
| Q-XCH-23 | Candlestick: solid Green when a period closed higher, hollow Red when lower (Amicro: solid black and hollow grey). Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `CandlestickChart` |
| Q-XCH-24 | Pyramid: widths proportional to value (Amicro's were hand-set), larger is darker (Amicro's was the reverse), 32px bands (no token). The shape is less steep when the values are close. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `PyramidChart` |
| Q-XCH-25 | Polar area wedges are 75% opaque over the ramp without its faintest tint; the DLS says 30% and 15%, which makes the pale wedges vanish. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `PolarAreaChart` |
| Q-XCH-26 | Sankey: sources take series colours with 30% bands, everything downstream is Obsidian; no loops. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `SankeyChart` |
| Q-XCH-27 | Radar: axes 0 to 10 by default (pass `max` for another scale), ring values between two spokes on a backdrop, up to six axes. Keep? My recommendation: keep. **Answered 2026-10-30: keep (the recommendation)** | `RadarChart` |
| Q-XCH-28 | Dither charts' texture (fixed SVG patterns). **Withdrawn 2026-10-29:** the user does not want Dither types in the library; Dither bar and Dither donut were removed and none will be added | — |
| Q-XCH-29 | Dither donut: pattern per slice instead of tint. **Withdrawn 2026-10-29** with Q-XCH-28 | — |
| Q-XCH-30 | Sparkline is 32px tall (the DLS gives the slot no height; no token). **Answered 2026-10-29: keep** | `SparklineChart` |
| Q-XCH-31 | Amicro's KPI card chart is not built. **Answered 2026-10-29:** Stat / KPI card is its own component, unrelated to this chart; nothing to do here | — |
| Q-XCH-32 | Composed: the line gets its own axis on the right by default; one line only. **Answered 2026-10-29: keep** | `ComposedChart` |

### Motion

| ID | Question | Where |
|---|---|---|
| Q-MOT-1 | Slide up, down, left and right travel 8px (the DLS entrance distance) over `--duration-base` with `--ease-settle`. Amicro's travel 20 to 40px over 0.6s. Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `lib/Slide.tsx` |
| Q-MOT-2 | The slides are named by the direction of travel: Slide left arrives from the right. Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `SlideLeft`, `SlideRight` |
| Q-MOT-3 | The root `@collabrium/ui` exports the three original wrappers only; Slide down, left and right come from `@collabrium/ui/motion`. Keep? My recommendation: keep, so the root stays the components set **Answered 2026-10-29: keep** (the recommendation). | `src/index.ts` |
| Q-MOT-4 | Amicro's Scale in (an overshoot curve) and Zoom in (a blur) are not built yet. You said to port bouncy pieces as they are, and also to extend the existing entrances; those two pull opposite ways. Build Scale in and Zoom in as they are, with the DLS asked for an exception? My recommendation: skip both, since Slide and Fade cover entrances and the DLS says no overshoot **Answered 2026-10-29: skip Scale in and Zoom in.** | — |
| Q-MOT-5 | Letters stagger at 20ms and words at 40ms (local values): the DLS staggers (80ms and 120ms) are for rows. Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `lib/textFx.tsx` |
| Q-MOT-6 | Character stagger, Magnetic and Mouse follow keep Amicro's springs, which overshoot slightly (you said to port bouncy pieces as they are). The DLS says movement never bounces, so it is owed an exception for these three. Keep? My recommendation: keep, and add the exception to the DLS **Answered 2026-10-29: keep** (the recommendation). | `CharacterStagger`, `Magnetic`, `MouseFollow` |
| Q-MOT-7 | Hover cards draw their own plain card (Neutral-1, 1px Neutral-3 border, radius-md, 16px padding) because Card is not converted yet, in a grid that fills the width (220px smallest card, no token). Keep, and swap in Card when it exists? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `HoverCards` |
| Q-MOT-8 | Lengths with no token: Spotlight's light sizes (120, 180, 250px) and Tilt's 3D depth (800px), declared as local custom properties. Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `motion.css` |
| Q-MOT-9 | Glow button is not its own piece: wrap a Button in Spotlight. Magnetic and Tilt wrap content instead of drawing a button and a card, so the DLS Button and Card keep their looks. Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `Spotlight`, `Magnetic`, `Tilt` |
| Q-MOT-10 | Page transition: the stairs' 50ms column stagger and the wave's 1.3s drawing have no tokens. Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `PageTransition` |
| Q-MOT-11 | Sticky reveal: the panel (60vh, 40vh narrow) and step (50vh) heights have no tokens. Keep as local custom properties? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `motion.css` |
| Q-MOT-12 | Amicro's Classic toggle is not built: Switch is the DLS component for it. Keep it out? My recommendation: keep it out **Answered 2026-10-29: keep** (the recommendation). | — |
| Q-MOT-13 | Page transition ports three types (stairs, wave, fade); Amicro lists 18 but draws two. Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `PageTransition` |
| Q-MOT-14 | useWebHaptics does nothing under reduced motion (Amicro vibrated regardless). Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `useWebHaptics` |
| Q-MOT-15 | Text sweep: one hue's ramp, finished text Neutral-9, no rotating phrases or width animation (Amicro's `DiaTextReveal` had both). Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `TextSweep` |
| Q-MOT-16 | Scramble hover keeps Amicro's 40ms frame and 10 frames (no token) and reads the real text for assistive technology. Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `ScrambleHover` |
| Q-MOT-17 | Lengths with no token: Media between text's 2em by 1.25em media, Search expand's 320px widest field, Dock's 80px reach. Keep as local values? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `motion.css`, `Dock` |
| Q-MOT-18 | Search expand does not move focus into the field when it opens (the DLS says focus moves only to a heading or an error message); the field is the next Tab stop. Amicro focused the input. Keep, or allow the focus move for this? My recommendation: allow the move: opening a search to type in it is the one case where focus should follow **Answered 2026-10-29: allow the focus move** (the recommendation). Search expand now focuses its field when it opens. | `SearchExpand` |
| Q-MOT-19 | Expanding tabs: label in Neutral-9, only the icon takes the tab's colour (accent text on a tint fails AA); roving Tab stop and arrow keys. Keep? My recommendation: keep **Answered 2026-10-29: keep** (the recommendation). | `ExpandingTabs` |
| Q-MOT-20 | Not built: Add to cart morph (a product demo; a Button with Icon swap does the same), Dynamic island (a phone widget), Heart and shape morphs (decorative loaders, which you said not to port), Animated button (a gallery of about 25 button styles; Button is the DLS component), Frequency selector (an expanding segmented picker: wait for Segmented Control). Keep them out? My recommendation: keep them out **Answered 2026-10-29: keep them out.** | — |
| Q-MOT-21 | Amicro also has 16 physics experiments (elastic bars, tissue dispenser, paper folds, cloth drape, curtain reveal and others) and 4 UI-interaction kits (about 4,700 lines): decorative demos with their own looks. Port any of them? My recommendation: skip the physics experiments, and port nothing from the kits that Button, Switch or Tabs already cover **Answered 2026-10-29: skip the physics experiments; port nothing the DLS components cover.** | — |
| Q-MOT-22 | Lengths with no token in the card layouts: the stack's 128px by 176px, the carousel's 160px slide, 110px card and 180px height, the cover flow's 80px card, 140px stage and 1000px perspective, the time machine's 800px perspective, 220px by 135px cards and 24px marks. Keep as local custom properties? My recommendation: keep | `motion.css` **Answered 2026-10-30: keep the lengths as local values, but make the pieces scalable: a `size` option (`sm` 0.75, `md` 1, `lg` 1.25) and shrink-to-fit the space they are in**  |
| Q-MOT-23 | Nine Amicro stack pieces are one Card spread with a `layout` option, and cards are items with the DLS surface instead of Amicro's `cardClassName` and `images`. Keep? My recommendation: keep | `CardSpread` **Answered 2026-10-30: keep, after seeing all nine of Amicro's stack pieces as layouts**  |
| Q-MOT-24 | The time machine's goo filter (a blur and threshold that softened the card corners) is not ported. Keep it out? My recommendation: keep it out: radius-md corners are the DLS | `CardTimeMachine` **Answered 2026-10-30: leave the goo filter out**  |

### Global

| ID | Question |
|---|---|
| Q-GLOB-1 | Body text defaults: should `body` set body1 (16/22/500)? (TOK-8) **Answered 2026-10-30: yes. `body` sets body1 (16/22/500); done in `base.css`** |
| Q-GLOB-2 | Fonts: the package does not load Mulish. Should apps load it with `next/font` (recommended in README) and include weight 800 (TOK-4)? **Answered 2026-10-30: yes. Apps load Mulish with `next/font` including weight 800 (the README already says so)** |
| Q-GLOB-3 | SlideUp travel uses spacing-8 (DS 1089, 2222). Some components use 4px or 12px. Is 8px right as the shared default? **Answered 2026-10-30: start with 8px for all. Every Motion slide uses `slideDistance` (spacing-8); components keep the travel their own DLS section gives** |

### Charts

| ID | Question |
|---|---|
| Q-CHART-1 | Gridline width ("hairline", no px) **Answered 2026-10-30: 1px (the `sm` border width); set on both chart engines** |
| Q-CHART-2 | Tooltip `cornerRadius: 8` and `padding: 10` are literals with no token (TOK-5) **Answered 2026-10-30: the DLS adds tokens for the tooltip radius (8px) and padding (10px). `tokens.css` is a copy and cannot be edited here, so the literals stay until it has them (DLS updates owed row 71)** |
| Q-CHART-3 | Does label3's uppercase apply to the tooltip body? **Answered 2026-10-30: keep label3 in normal case in the tooltip body (no uppercase)** |
| Q-CHART-4 | Chart animation duration and easing (none specified); reduced motion currently turns animation off **Created 2026-10-30, for review: draw-in over `duration-reveal` (550ms) on `ease-reveal`; Chart.js uses `easeOutQuart` and Recharts `ease-out` (named easings only); hover `duration-fast`; resize immediate; reduced motion off (DLS updates owed row 72)** |
| Q-CHART-5 | Area wash: `-bg` tint or 88% transparent mix (TOK-2)? **Answered 2026-10-30: the 12% mix of the line colour (not the -bg tint)** |
| Q-CHART-6 | Not specified: horizontal bar thickness (20) needs the chart's orientation, so it can't be a global default. Doughnut cutout, interaction mode and number formats are also not specified **Answered 2026-10-30: all of the suggestion, after a draft. Bars take 60% of their category (cap 24px, 20px horizontal). Amended 2026-10-30: no 4px floor; instead every category of a vertical bar chart gets a 40px slot (a 24px bar) and the chart scrolls sideways, with the value axis fixed in place (option B of a draft), the axis shortens numbers and the tooltip shows the full value, tooltips are per category for line, area and bar and per point or slice for scatter, bubble, doughnut, polar and radar, the doughnut hole stays at 45%** |
| Q-CHART-7 | The chart canvas floors (260px, 300px tall) and the legend's 10px swatch are literals with no token (components.css 3841–3842) **Answered 2026-10-30: the 260px and 300px heights stay as local values, attached to no token, for now. The legend swatch is 12px (decided after a draft)** |
| Q-CHART-8 | Scrolling vertical bar charts: the 40px category slot (a 24px bar at 60%) and the fixed 56px value axis have no token. Keep as local values for now, as with the chart heights? My recommendation: keep local | `charts-extra/lib/chart-theme.ts` (`scrollSlot`, `scrollAxisWidth`) |

---

## 7. DLS updates owed

Every place where the React library now follows a decision that differs from the DLS. Once the DLS is updated (or retired), tick it off here. Nothing in the DLS has been changed by this repo.

| # | Change the DLS needs | DLS location | Decided |
|---|---|---|---|
| 1 | Reduced motion: let the Thinking row spinner keep turning (remove `animation:none` on `.c-thinking-row-icon.is-spin`) | components.css 5477 | 2026-10-26 |
| 2 | Reduced motion: let the Task Rows "Retrying" arrow keep turning (remove `.c-tasks-head .c-badge i.is-spin{animation:none}`) | components.css 5706 | 2026-10-26 |
| 3 | Button icons are `icon-sm` (16px) at every size: add a rule (`.c-btn i`) | components.css 31–34 | 2026-10-26 |
| 4 | Button `[aria-disabled="true"]` looks disabled (shared base rule, not patched locally) | components.css 46, 2222, 3458 | 2026-10-26 |
| 5 | Button disabled (Secondary, Ghost) and pressed (Secondary, Ghost): correct the DESIGN-SYSTEM.md text to what the CSS does | DESIGN-SYSTEM.md 2364, 2366 | 2026-10-26 |
| 6 | Badge: add `height:22px`, caption (12px) type, `icon-micro` icons, darker Success and Warning text (`#00854c`, `#9a5c00`), and `.c-badge-info` | components.css 1641–1646 | 2026-10-26 (done in the DLS 2026-10-26, v0.9.126) |
| 7 | Checkbox: glyph 14px; add hover and pressed states | components.css 3077–3088 | 2026-10-26 |
| 8 | Task Rows: apply the capsule gap to the `role="list"` wrapper (or drop it from the root); fix the list variant's `:last-child` rule; add the narrow-width rule (below 400px of its own width); `min-width:0` on the root; closed detail `inert`; hide the duplicated head text from assistive tech; drop "No retries left."; capsule floor and gaps (decisions D-45 to D-51) | components.css 5599–5610, preview.html 22725–22790 | 2026-10-26 |
| 9 | Streaming Text: Copy writes the clipboard, buttons only when wired, sources button count from the list (D-35 to D-42) | preview.html 22402–22600 | 2026-10-26 |
| 10 | Button: Primary gets a 1px system-colour edge in forced colours (outline, negative offset) | components.css after 46 | 2026-10-26 |
| 11 | Loading State: cells painted `CanvasText` in forced colours; label ends in an ellipsis with the full text as `title` | components.css 5274–5375 | 2026-10-26 |
| 12 | Thinking: row focus ring (Obsidian, 2px, inside the row); live region moved outside the header button; running timer in the header that becomes `{duration}` in the past-tense label; closed trace `inert` | components.css 5377–5478, preview.html 22627–22680 | 2026-10-26 |
| 13 | Badge: DESIGN-SYSTEM.md's Neutral text (Neutral-5) and Error text colour differ from the shipped Neutral-9 and full Red; the DLS text should say what the CSS does | DESIGN-SYSTEM.md 2286–2290 | 2026-10-26 |
| 14 | Button: add `danger` and `link` variants with their hover, pressed, disabled and focus states (designed here; approved 2026-10-26) | components.css after 41 | 2026-10-26 |
| 15 | Thinking: header timer markup and CSS (Rule 14 has no design); `{duration}` in the done label | components.css 5377–5478 | 2026-10-26 |
| 16 | Task Rows: a Stopped status (neutral pill, plain disc, no ring, no Retry) | components.css 5563–5707 | 2026-10-26 |
| 17 | Streaming Text: a failed-stream state (Rule 18 has no design) | components.css 5480–5561 | 2026-10-26 |
| 18 | Checkbox: required marker, error state and a Checkbox group (fieldset and legend) | components.css 3077–3088 | 2026-10-26 |
| 19 | Input field error border: components.css draws 2px (`.c-field-error input{border:2px…}`), DESIGN-SYSTEM.md says 1px; Radio card group and Checkbox follow 1px. One of them should change | components.css 134, DESIGN-SYSTEM.md 5727 | 2026-10-26 |
| 20 | Consolidate row staggers to 80ms and 120ms: Streaming follow-ups 90ms to 80ms, Task Rows steps 100ms to 80ms. (Loading State's 90ms and 110ms cell steps are tied to its loop length and stay as they are) | preview.html 22402–22600, components.css 5546, 5681 | 2026-10-26 |
| 21 | Consolidate widths to 360 / 420 / 440px: Thinking 380px to 360px | components.css 5377–5478, DESIGN-SYSTEM.md Thinking anatomy | 2026-10-26 |
| 22 | Consolidate prose line height to 1.65: Thinking's prose rows 1.6 to 1.65 | components.css 5461 | 2026-10-26 |
| 23 | Input field error border: 1px (the DESIGN-SYSTEM.md text), not 2px; the CSS rule should change (same as row 19, now decided) | components.css 134 | 2026-10-26 |
| 24 | DESIGN-SYSTEM.md token tables: add the rows for the tokens added to tokens.css on 2026-10-26 (its header says that file is the source of truth and tokens.css is generated from it): focus ring, control sizes, status tints, AA text colours, `--spacing-2` / `--spacing-6`, `--radius-xs`, measures, `--duration-pulse` / `--duration-blink`, staggers, `--leading-prose` | DESIGN-SYSTEM.md token tables | 2026-10-26 (DESIGN-SYSTEM.md tables and changelog v0.9.125 updated 2026-10-26, and preview.html's embedded copies; components.css done in v0.9.126) |
| 25 | Use the new text colours in components.css: Badge Error text `--color-red-text` (and Success / Warning text already `--color-green-text` / `--color-amber-text`); Input field required `*` and error text; Thinking diff counts (`--color-green-text`, `--color-red-text`) | components.css 1642–1646, 134–136, 5472 | 2026-10-26 (done in the DLS 2026-10-26, DLS v0.9.126) **Reversed 2026-10-26 (D-63): red text stays `--color-red`; `--color-red-text` was removed from the DLS.** |
| 26 | Replace literals with the new tokens in components.css (focus ring 34×, control heights, status tints, spacing 2/6, radius 6px, staggers, measures, prose leading) and make Button icons `icon-sm` | components.css throughout | 2026-10-26 (done in the DLS 2026-10-26, DLS v0.9.126) |
| 27 | Green text `#00854c` is 4.2:1 on its own tint, just under the 4.5:1 AA line. DESIGN-SYSTEM.md's Badge table says "darkened for AA". A slightly darker green is needed (`#007d47` chosen) | DESIGN-SYSTEM.md Badge table, tokens.css | 2026-10-26 (done 2026-10-26: `#007d47`, 4.7:1 on its tint and 5.2:1 on white; DLS v0.9.126) |
| 28 | Loading State Rule 2: say that the host mounts the component after 400ms (the rule says to hold it back but not who does), and that the label is announced when it is added to the live region | DESIGN-SYSTEM.md 1295–1310 | 2026-10-26 |
| 29 | Button Loading: say the fill is fixed while loading (no hover or pressed change) | DESIGN-SYSTEM.md Button States | 2026-10-26 |
| 30 | Permission Prompt: prefix the scope and resolved-note selectors (`.c-permission-prompt .c-permission-prompt-scope`) so the CSS says what it renders, or change the values to the intended ones (Q-PERM-2, decided: keep what is drawn, so the CSS should say so) | components.css 5919, 5942 | 2026-10-26 |
| 31 | (Withdrawn 2026-10-26, D-63: Deny stays `--color-red`; nothing owed.) | — | 2026-10-26 |
| 32 | Permission Prompt: a focus ring on the toggle (none today); focus handling when a decision removes the focused button (Q-PERM-1, decided); detail rows as a `<dl>` and a closed detail `inert` | components.css 5905, preview.html 23545–23660 | 2026-10-26 |
| 33 | Radio: add hover and pressed states and a focus-visible ring for the circle; paint the dot in `CanvasText` under `@media (forced-colors:active)`; (approved) | components.css 3092–3094 | 2026-10-26 |
| 34 | Radio: add a plain Radio group (fieldset, legend, helper, required marker, error) to DESIGN-SYSTEM.md and components.css, as Checkbox group is (approved) | DESIGN-SYSTEM.md 7730 | 2026-10-26 |
| 35 | Input field: error border 1px (same as rows 19 and 23); add `sm` and `lg` heights; a Neutral-5 placeholder and the autofill override; the suffix padding 28px, not 32px (all approved) | components.css 129–177 | 2026-10-26 |
| 36 | Input field: error text weight 700 (`.c-field-error .c-helper`); the label size in DESIGN-SYSTEM.md ("caption token") should say label1; the counter's DESIGN-SYSTEM.md and CSS comment say it shares the helper's line but it is its own row (approved: own row, so the text should change) | components.css 130, 137, 179–185; DESIGN-SYSTEM.md 5806, 5878 | 2026-10-26 |
| 37 | Textarea: add the error and disabled looks (`.c-field-error textarea`, `.c-field textarea:disabled`), a Neutral-5 placeholder, an optional character count (as Input field's), and correct DESIGN-SYSTEM.md's type (body2, not body1 weight 500) (all approved) | components.css 135, 138, 192; DESIGN-SYSTEM.md 9443 | 2026-10-26 |
| 38 | Textarea: restyle `.c-field textarea::-webkit-resizer` so the resize grip sits clear of the 12px corner curve | components.css 192 | 2026-10-26 |
| 39 | Tool approval: Rule 5 should say the exclusion holds for multiple-choice too and the demo should do it; the last-question auto-send should go (choosing only enables Send); focus handling when the question changes and when the card closes (all approved) | DESIGN-SYSTEM.md 5913–5917; preview.html 23700–23890 | 2026-10-26 |
| 40 | Prompt input bar: the model menu cannot be `position:fixed` inside the floating bar, because the bar's `transform` becomes the fixed element's containing block (the gallery works only because its stage sets `transform:none`): say it is portalled, or placed another way; add the arrow-key use of the model menu and a Stop icon for Send (approved 2026-10-27, Q-PIB-3, Q-PIB-4); Send is disabled while the box is empty (Q-PIB-5) | DESIGN-SYSTEM.md 1500–1520; components.css 5002 | 2026-10-26 |
| 41 | Chip: say that single-select arrow keys move and choose (Home and End, wrapping, one tab stop) and give the gallery's single group a roving tab stop (pending Q-CHIP-1) | DESIGN-SYSTEM.md 4619–4623; preview.html 21054–21076 | 2026-10-27 |
| 42 | Chip: a forced-colours rule for the active filter chip; say the active border is 1px Obsidian, not "none" (pending Q-CHIP-2) | components.css 4547; DESIGN-SYSTEM.md 4486 | 2026-10-27 |
| 43 | Chip: a disabled input chip's × should be disabled (or the DS should say it is not); say what focus does after a removal; add a script for Delete or Backspace on the × (pending Q-CHIP-3) | components.css 4535–4539; DESIGN-SYSTEM.md 4496, 4620 | 2026-10-27 |
| 44 | Chat window: script the open and close (the fold with measured rectangles, focus in and out, the Tab trap, Escape, the `animationend` guard); give the shell an opacity once settled and split the veil's and the content's class (decided Q-CHAT-5) | components.css 5033–5044; DESIGN-SYSTEM.md 1240–1246 | 2026-10-27 |
| 45 | Chat window: drop the `listbox` and `toolbar` roles (plain buttons, `aria-current`, a plain group); an inert closed rail drawer; the More options menu's keys (decided Q-CHAT-1 to Q-CHAT-3) | DESIGN-SYSTEM.md 1074, 1103, 1124, 1237 | 2026-10-27 |
| 46 | Chat window: Send is clipped by 23px at a 272px window (a 320px viewport); the model switcher's name should shrink with an ellipsis (decided Q-CHAT-6); forced-colours edges for the window and the selected conversation (decided Q-CHAT-8) | components.css (Prompt input bar toolbar); 5035, 5059 | 2026-10-27 |
| 47 | Chat window: the veil is `var(--shadow-overlay)` (the CSS has `rgba(20,20,20,.42)`), and the title and pillar label take `--text-h5-weight` and `--text-label3-weight` (the CSS has 800); the footer copy is kept (decided Q-CHAT-4, Q-CHAT-7) | components.css 5032, 5051, 5073 | 2026-10-27 |
| 48 | Streaming Text: say the action row and sources list are omitted inside a Chat window message (the host's `actions` prop is `false`), since the message brings the chat's row (decided Q-CHAT-9) | DESIGN-SYSTEM.md 1553 | 2026-10-27 |
| 49 | Chat window: full screen at 600px and below (no margin, radius or shadow; safe areas cleared) (decided Q-CHAT-10) | components.css 5035 | 2026-10-27 |
| 50 | (Done 2026-10-27, v0.9.127: `--measure-prose` is used by `.c-chat-thread-inner`, `.c-chat-composer-inner`, `.c-chat-foot` and Tool approval's slot.) | components.css | 2026-10-27 |
| 51 | (Done 2026-10-27, v0.9.127: Chat window's row now says what it sits above and below.) | DESIGN-SYSTEM.md | 2026-10-27 |
| 52 | Layers: ten `--z-*` tokens added (v0.9.127) and used by every page-level layer in components.css; the Tutorial Modal survey and two comments updated. Done in the DLS, with no visual change | tokens.css; components.css; DESIGN-SYSTEM.md | 2026-10-27 |
| 53 | Switch: add hover, pressed and focus-visible states and forced-colours and reduced-motion rules (pending Q-SWITCH-1, Q-SWITCH-2) | components.css 3083, 3096–3099; DESIGN-SYSTEM.md 9068–9083 | 2026-10-28 |
| 54 | Chart chrome & marks: name Recharts as the second chart engine, for shapes Chart.js cannot draw (`@collabrium/ui/charts-extra`), used with the same chrome, marks and colours | DESIGN-SYSTEM.md 4314 | 2026-10-29 |
| 55 | Per-chart-type marks: add Stream (layered Area on natural curves), Step (stepped Line) and Range (a min-max band) rows; say what Area and Line points do (pending Q-XCH-1, Q-XCH-2, Q-XCH-5) | DESIGN-SYSTEM.md 4358–4375 | 2026-10-29 |
| 56 | Chart legend: say each item shows or hides its series and is a button (pending Q-XCH-4); the tooltip shows every series for the nearest category (pending Q-XCH-3) | DESIGN-SYSTEM.md 4336–4344 | 2026-10-29 |
| 57 | Per-chart-type marks: add Waterfall (Green up, Red down, a total colour), Bullet, Funnel and Stacked bar's single-hue ramp (pending Q-XCH-7 to Q-XCH-11) | DESIGN-SYSTEM.md 4358–4376 | 2026-10-29 |
| 58 | Chart chrome: say Bar and Stacked bar also highlight the hovered category with a Neutral-2 band (pending Q-XCH-12); give the chart canvas floors and the legend swatch tokens (Q-CHART-7) | DESIGN-SYSTEM.md 4336–4344; components.css 3841–3842 | 2026-10-29 |
| 59 | Per-chart-type marks: add Radial bar group, Radial gauge, Gauge arc and Meter; say how many Doughnut slices the ramp can carry (it has four rungs, the DLS says five) and the Doughnut cutout (pending Q-XCH-13 to Q-XCH-16) | DESIGN-SYSTEM.md 4358–4376 | 2026-10-29 |
| 60 | Per-chart-type marks: add Heatmap, Treemap and Activity heatmap rows (single-hue ramp, continuous or in steps), Bubble's table, and say that Heatmap and Activity heatmap are drawn in HTML and CSS (pending Q-XCH-17 to Q-XCH-21) | DESIGN-SYSTEM.md 4358–4376; 4408–4414 | 2026-10-29 |
| 61 | Per-chart-type marks: add Polar area's wedge opacity and number of wedges, Pyramid, Sankey and Candlestick (solid and hollow); say Radar's ring values sit between two spokes (pending Q-XCH-22 to Q-XCH-27) | DESIGN-SYSTEM.md 4358–4376 | 2026-10-29 |
| 62 | Per-chart-type marks: say a Sparkline is 32px tall (decided Q-XCH-30); Mixed (Bar + Line) keeps its visible second axis (decided Q-XCH-32) | DESIGN-SYSTEM.md 4358–4376 | 2026-10-29 |
| 63 | Motion: add Slide down, Slide left and Slide right beside Slide up (8px travel, `--duration-base`, `--ease-settle`, fade kept under reduced motion), named by the direction of travel (pending Q-MOT-1, Q-MOT-2) | DESIGN-SYSTEM.md 1089, 2222 | 2026-10-29 |
| 64 | Motion: add the text effects (Blur text, Character stagger, Word reveal, Text reveal), hover effects (Hover cards, Spotlight, Magnetic, Tilt) and cursor effects (Cursor trail, Mouse follow); say letters and words stagger at 20ms and 40ms; add an exception to "movement never bounces" for the three spring pieces (pending Q-MOT-5 to Q-MOT-9) | DESIGN-SYSTEM.md 536–580 | 2026-10-29 |
| 65 | Motion: add Scroll progress, Scroll reveal, Sticky reveal, Page transition and the five hooks; say a scroll reveal uses `--duration-reveal` with `--ease-reveal` and 8px of travel, and a page transition's stairs stagger at 50ms (pending Q-MOT-10, Q-MOT-11, Q-MOT-13, Q-MOT-14) | DESIGN-SYSTEM.md 536–580 | 2026-10-29 |
| 66 | Motion: add Icon swap, Count up, Scramble hover, Focus blur, Text sweep, Media between text, Play pause morph, Search expand, Expanding tabs and Dock; say Search expand moves focus into its field, an exception to the focus rule (decided Q-MOT-18) | DESIGN-SYSTEM.md 536–580 | 2026-10-29 |
| 67 | Motion: add the card layouts (Card spread, Card carousel, Card cover flow, Card time machine) and say how they settle (`--duration-slow` with `--ease-settle`) (pending Q-MOT-22 to Q-MOT-24) | DESIGN-SYSTEM.md 536–580 | 2026-10-29 |
| 68 | Add a base `body` rule: body1 (16px / 22px / 500). Say apps load Mulish with weights 400 to 800 (decided Q-GLOB-1, Q-GLOB-2) | DESIGN-SYSTEM.md 146, 156, 258; Typography | 2026-10-30 |
| 69 | Say the shared slide travel is spacing-8 (8px) (decided Q-GLOB-3) | DESIGN-SYSTEM.md 1089, 2222 | 2026-10-30 |
| 70 | Chart chrome: give the gridline a width of 1px (the `sm` border width) instead of "hairline" (decided Q-CHART-1) | DESIGN-SYSTEM.md 4228–4231 | 2026-10-30 |
| 71 | Chart chrome: add tokens for the tooltip radius (8px) and padding (10px) (decided Q-CHART-2) | DESIGN-SYSTEM.md 4232–4234; tokens.css | 2026-10-30 |
| 72 | Chart chrome: add a chart animation spec: draw-in `duration-reveal` on `ease-reveal`, hover `duration-fast`, resize immediate, off under reduced motion (decided Q-CHART-4, created 2026-10-30) | DESIGN-SYSTEM.md 4202–4320 | 2026-10-30 |
| 73 | Chart chrome: bars take 60% of their category (capped at 24px, or 20px horizontal), so more bars or a narrower chart give thinner bars (decided Q-CHART-6) | DESIGN-SYSTEM.md 4242–4243 | 2026-10-30 |
| 74 | Chart chrome: axis numbers are shortened (500k, 1.2M) unless the host gives a format, and the tooltip shows the full value (decided Q-CHART-6) | DESIGN-SYSTEM.md 4228–4234 | 2026-10-30 |
| 75 | Chart chrome: tooltip interaction: one per category listing every series for line, area and bar; the nearest point or slice for scatter, bubble, doughnut, polar area and radar (decided Q-CHART-6) | DESIGN-SYSTEM.md 4232–4234 | 2026-10-30 |
| 76 | Chart legend: the swatch is a 12px circle, not 10px (decided Q-CHART-7) | DESIGN-SYSTEM.md 4235 | 2026-10-30 |
| 77 | Chart chrome: a vertical bar chart gives every category a 40px slot (a 24px bar) and scrolls sideways when they do not fit, with the value axis fixed in place; replaces the thinning rule (decided Q-CHART-6, option B) | DESIGN-SYSTEM.md 4242–4243 | 2026-10-30 |
| 78 | Motion: say the card layouts take a `size` (0.75, 1 or 1.25 of the designed size) and shrink to fit their space (decided Q-MOT-22) | DESIGN-SYSTEM.md 536–580 | 2026-10-30 |
| 79 | Card: make the interactive card a real link or button in the title (stretched over the card) instead of a click handler on a `div`; document the heading level (decided Q-CARD-1, Q-CARD-2) | DESIGN-SYSTEM.md 2634, 3316; components.css 289–290 | 2026-10-30 |
| 80 | Card: give Element-accented, Element-tinted and the icon chip a rule for each of the five elements, not only Wood and Navy (Q-CARD-3) | components.css 241, 288 | 2026-10-30 |
| 81 | Card: the header's 16px bottom margin only when something follows it (components.css `.c-card-header`, decided Q-CARD-5) | components.css 278 | 2026-10-30 |
| 82 | Selectable card (a variant of Card): show the checkbox on keyboard focus and always on touch, not on hover only; keep the focus halo over the Selected shadow (decided Q-SEL-1, Q-SEL-2) | components.css 289–303 | 2026-10-30 |
| 83 | Selectable card: put the checkbox on the left of the card, 16px in, with all of the card's content in one column 16px to its right so the description lines up with the heading, not top right with room on the title's right (decided Q-SEL-4) | components.css 298–302; DESIGN-SYSTEM.md 2751–2765 | 2026-10-30 |
| 84 | Card: the header-to-body space is 8px (the CSS's 16px margin plus the 8px gap makes 24px; the DS text says 16px) (decided Q-CARD-7) | components.css 278; DESIGN-SYSTEM.md 2624 | 2026-10-30 |
| 85 | Card: record USP as a variant inside Card (a 280px floor, a list of check-circle points and a full-width Button), and say the header is the base title (h5), not h4 (decided Q-USP-1, Q-USP-2, pending review) | DESIGN-SYSTEM.md 2641 | 2026-10-30 |
| 86 | Tag: say in the Badge & Tag section that the optional leading icon takes the dot's place (decided Q-TAG-1), and add the icon rule to `.c-tag` | DESIGN-SYSTEM.md 2527; components.css 1650 | 2026-11-04 |
| 87 | Tag: in forced colours, give `.c-tag` a 1px border in the system text colour (padding 1px less a side) and paint `.dot` CanvasText (decided Q-TAG-4) | components.css after 1663 | 2026-11-04 |
| 88 | Profile card menu: move focus to the first item on open, Arrow Down/Up (wrapping), Home and End, and close on Tab (decided Q-PROFILE-1); give `.c-card-profile-menu-item` a focus-visible style: Neutral-2 fill and the 2px Obsidian ring inside the item (decided Q-PROFILE-2) | components.css 407–410; preview.html 21152–21190 | 2026-11-04 |
| 89 | Profile card initials: correct the DS text to "the word right after the particle", as its own example (MA) (decided Q-PROFILE-3) | DESIGN-SYSTEM.md 3108–3113 | 2026-11-04 |
| 90 | Profile card Meta and Persona lines: make them caption (12px) in the CSS too, by out-ranking `.c-card p` (e.g. `.c-card-profile-identity .c-card-profile-meta`) (decided Q-PROFILE-4) | components.css 421–422 | 2026-11-04 |
| 91 | Profile card follower counts: round down when abbreviating (99,999 is 99K), and say so in the Numbers rule or the Profile card section (decided Q-PROFILE-5) | DESIGN-SYSTEM.md 3125 | 2026-11-04 |
| 92 | Profile card: in forced colours the kebab and follower links take a Highlight outline on focus (decided Q-PROFILE-6) | components.css after 430 | 2026-11-04 |
| 93 | Profile card: a hovered selected card keeps shadow-3 (the `.is-selected` rule must outrank `.is-interactive:hover`) (decided Q-PROFILE-9) | components.css 389–392 | 2026-11-04 |
| 94 | Tooltip: remove the caret from the DS text (the bubble has none, as the CSS) (decided Q-TOOLTIP-1) | DESIGN-SYSTEM.md Tooltip 9573–9676 | 2026-11-04 |
| 95 | Tooltip: wrap past 240px (`max-width: 240px`, no `nowrap`), add the bottom, left and right placements with flip, shift and the bottom fallback, and put the portaled bubble on `--z-tooltip` (decided Q-TOOLTIP-2 to Q-TOOLTIP-4) | components.css 3577–3593; preview.html tooltip script | 2026-11-04 |
| 96 | Tooltip: in forced colours give the bubble a 1px CanvasText border (decided Q-TOOLTIP-5); while the trigger holds keyboard focus, a scroll moves the bubble with it instead of hiding it (decided Q-TOOLTIP-6) | components.css after 3593; DESIGN-SYSTEM.md Tooltip, Dismiss rules | 2026-11-04 |
| 97 | Campaign card: make the tile's name a link or button stretched over the card instead of a `role="button"` article, so the faces inside it stay reachable (decided Q-CAMPAIGN-1); give the faces `role="img"` named by the tooltip text and the system focus ring (decided Q-CAMPAIGN-2, Q-CAMPAIGN-3); mark up Pax and Quote as a `<dl>` (decided Q-CAMPAIGN-4) | preview.html 2561–2656; components.css 464; DESIGN-SYSTEM.md Campaign card, Interaction contract | 2026-11-04 |
| 98 | Campaign card: in forced colours give `.c-card-campaign` a 1px CanvasText border, padding 1px less a side (decided Q-CAMPAIGN-5) | components.css after 488 | 2026-11-04 |
| 99 | Campaign card: Quote always to 2 decimal places ("RM 72,500.00"), as Price summary card; dates "12 Mar 2026 – 30 Apr 2026" (decided Q-CAMPAIGN-7) | preview.html 2592, 2621; DESIGN-SYSTEM.md Campaign card, Metric value | 2026-11-04 |
| 100 | Campaign card: an unset value's dash is `aria-hidden`, followed by "Not set" for screen readers (decided Q-CAMPAIGN-8) | preview.html 2617–2623; DESIGN-SYSTEM.md Campaign card, rule 5 | 2026-11-04 |
| 101 | Boards (Campaign card): add a rule that any board that lets you drag a tile between columns also offers a "Move to…" control listing the stages, usable by keyboard and pointer without dragging (WCAG 2.5.7) (decided Q-CAMPAIGN-9) | DESIGN-SYSTEM.md Campaign card, States (Dragging) | 2026-11-04 |
| 102 | Ad Placement Card: say what the fit line shows when there is no "built for it" figure ("14 of 38 units fit here", the part dropped) (decided Q-ADPL-2) | DESIGN-SYSTEM.md Ad Placement Card, Fit row | 2026-11-04 |
| 103 | Ad Placement Card: while a slot holds keyboard focus, a scroll moves the card with the slot instead of hiding it, as Tooltip (decided Q-ADPL-6) | DESIGN-SYSTEM.md Ad Placement Card, Interaction contract | 2026-11-04 |
| 104 | Ad Placement Card: add a script to the gallery demo (or a live placement map) so the positioning, one-at-a-time and dismissal rules can be seen, not only read (decided Q-ADPL-1) | preview.html 2803–2823 | 2026-11-04 |
| 105 | Progress-to-Goal Bar: the anatomy's Heading row says 800; make it h5 at 700, as the Typography table and the CSS (decided Q-GOAL-1); the Typography table's In-table sample should be the target's value, not "RM 6,000" (decided Q-GOAL-2) | DESIGN-SYSTEM.md Progress-to-Goal Bar, Anatomy and Typography | 2026-11-04 |
| 106 | Progress-to-Goal Bar: the gallery's Chart-variant label row should include Gap while the bar is short (decided Q-GOAL-3); give the no-data placeholder its copy, "No data yet." (decided Q-GOAL-4) | preview.html 2950–2953; DESIGN-SYSTEM.md Progress-to-Goal Bar, States | 2026-11-04 |
| 107 | Progress-to-Goal Bar: in forced colours keep the segments, swatches and target line in their colours (`forced-color-adjust: none`) and outline the track (decided Q-GOAL-5) | components.css after 4781 | 2026-11-04 |
| 108 | Money always to 2 decimal places in Progress-to-Goal Bar ("RM 6,000.00", "/ 10,000.00", "Target RM 10,000.00"), outside the short form ("RM10.2M"); consider making it the system's Numbers rule, since Price summary and Campaign card already do it (decided Q-GOAL-8) | DESIGN-SYSTEM.md Numbers rule (89); Progress-to-Goal Bar; preview.html 2902–3042 | 2026-11-04 |
| 109 | Progress-to-Goal Bar: name `labels` (legend, row, none) in place of `showLegend`, and record the short form's rules (no space, one decimal, ".0" dropped, B from a billion) (decided Q-GOAL-7, Q-GOAL-9) | DESIGN-SYSTEM.md Progress-to-Goal Bar, Small size | 2026-11-04 |
| 110 | Pacing card: the badge's percent to 1 decimal place ("64.7% to target", "116.7% to target"), never 100.0% while the target is unmet (decided Q-PACING-4) | DESIGN-SYSTEM.md Pacing Card, Badge colour; preview.html 2677, 2697 | 2026-11-04 |
| 111 | Pacing card: work the footer out from the data: rate = (target − total) ÷ days left, in short form with "k" and rounded up ("RM277k"); "· target met" when no day is known; on the last day unmet, "Day 31 of 31 · RM3.6M short of target" (decided Q-PACING-2, Q-PACING-3, Q-PACING-5, Q-PACING-10) | DESIGN-SYSTEM.md Pacing Card, Footer | 2026-11-04 |
| 112 | Pacing card: the rail's summary without "booked" ("RM6.6M of a RM10.2M target, 64.7% to target.") (decided Q-PACING-1); the label as a real heading at h4, with a selector that beats `.c-card h5` so the CSS draws 20px/800 as the DS says (decided Q-PACING-9, Q-PACING-11) | preview.html 2663–2668; components.css 505 | 2026-11-04 |
| 113 | Pacing card: compute the rail (48.53% for TV, not the hand-set 48.75%) and drop the space before each bold label value, as Progress-to-Goal Bar's row (decided Q-PACING-6, Q-PACING-7) | preview.html 2666, 2672–2673 | 2026-11-04 |
| 114 | Progress-to-Goal Bar: "60.0% of target" and the summary's percent to 1 decimal place, never 100.0% while short, as Pacing card (decided Q-PACING-12) | DESIGN-SYSTEM.md Progress-to-Goal Bar, Anatomy (Target figures), Accessibility; preview.html 2907, 2910 | 2026-11-04 |
| 115 | Entry Card: draw Research, Big idea, Package and Deck in the gallery (only Brief has markup), as built in the library (decided Q-ENTRY-2) | preview.html 2800–2802; DESIGN-SYSTEM.md Entry Card, The five artefact drawings | 2026-11-04 |
| 116 | Entry Card: say the set owns the variant (every card takes the set's; a lone card takes its own) and runs the swap and the playback scheduler itself, with `idleTour` to turn the tour off (decided Q-ENTRY-1, Q-ENTRY-3, Q-ENTRY-4) | DESIGN-SYSTEM.md Entry Card, Class API, Playback rules | 2026-11-04 |
| 117 | Info Banner: the close is a Ghost icon Button (sm) with a focus ring, not `.c-icon-btn`; the actions take the system focus ring; in forced colours a CanvasText border and the AI layers hidden; Escape dismisses the banner that holds focus; after a dismiss the host moves focus to the section heading (decided Q-BANNER-2 to Q-BANNER-6) | preview.html 3660–3697; components.css 3271–3324; DESIGN-SYSTEM.md Info Banner, Accessibility | 2026-11-05 |
| 118 | Info Banner: reconcile Success's text, rgb(0,133,76) in the CSS against `#007d47` in the DS; the 80% tone text stays for now, below AA on Info, Success and Warning (kept, Q-BANNER-1, to revisit) | components.css 3291; DESIGN-SYSTEM.md Info Banner, tone table | 2026-11-05 |
| 119 | Hero Card: fix the known gap: the card that opens the brief holds a real button in its heading, stretched over the card, so it opens from the keyboard; an openable Default or Risk card raises to shadow-2 on hover; the AI card's pointer cursor only when it opens something (decided Q-HERO-1, Q-HERO-8) | components.css 1597–1625; DESIGN-SYSTEM.md Hero Card, Known gap | 2026-11-05 |
| 120 | Command brief: a dialog (`role="dialog"`, `aria-modal`, named by its heading), focus to the heading on open, Tab kept inside, focus back on close; the close a Ghost icon Button (sm) with a focus ring, not the bare 20px X (decided Q-HERO-2, Q-HERO-3) | components.css 1627–1636; DESIGN-SYSTEM.md Hero Card, Selected | 2026-11-05 |
| 121 | Hero Card: add reduced motion (no tilt, arrow nudge or swing; the brief fades in place) and forced colours (a CanvasText edge on every card and the brief); say the recommendation and source lines keep their 12px margins, as intended (decided Q-HERO-4, Q-HERO-5, Q-HERO-9) | components.css 1597–1636; DESIGN-SYSTEM.md Hero Card | 2026-11-05 |
| 122 | Hero Card: show Risk, AI (Dark) with its tilt, and the Command brief in the gallery (only Default and Selected have markup) (decided Q-HERO-7) | preview.html 2703–2729 | 2026-11-05 |
| 123 | Media Ad Card: give the Built-for-this-slot badge its Neutral-3 border in the CSS (the rule loses to `.c-badge`'s transparent border, later at the same specificity) (decided Q-MEDIA-AD-7) | components.css 599, 1642 | 2026-11-05 |
| 124 | Media Ad Card: a missing size reads "No fixed size" to a screen reader (the dash `aria-hidden`); Objective, tagline and funnel are required; the tilt is off unless asked for; Compare is always shown (decided Q-MEDIA-AD-1 to Q-MEDIA-AD-4) | DESIGN-SYSTEM.md Media Ad Card, Missing data, States; preview.html 2736–2761 | 2026-11-05 |
| 125 | Media Ad Card: drop `.is-touch` (a demo hook; `(hover: none)` covers touch devices); show the families, missing data, Compared, the badge and the skeleton in the gallery (decided Q-MEDIA-AD-6) | components.css 593; preview.html 2736–2761 | 2026-11-05 |
| 126 | Metrics card: the size line's top bar lowercases only the label's first letter, keeping an all-capitals label ("43% TV"); no size gives "Size not published" alone and a Live total of "Not published" alone, and drops the size from the name's accessible name (decided Q-METRICS-1 to Q-METRICS-3) | DESIGN-SYSTEM.md Metrics card, Anatomy (Rest layer), Bar count | 2026-11-05 |
| 127 | Metrics card: name the host strings that have defaults (" in details", "No breakdown on file") and that the category colour is the host's, with the audience mapping as the example; bar values show as given, no forced decimal; the tilt is optional, off unless asked for (decided Q-METRICS-4, Q-METRICS-5, Q-METRICS-8, Q-METRICS-9) | DESIGN-SYSTEM.md Metrics card, Host strings, Category Tag mapping | 2026-11-05 |
| 128 | Metrics card: describe the skeleton's body (three line bones in the taller swap); show more than five bars, an empty bar, no bars, no size, Added and the skeleton in the gallery (decided Q-METRICS-10) | DESIGN-SYSTEM.md Metrics card; preview.html 2768–2798 | 2026-11-05 |
| 129 | Progress Bar: the shimmer travels to 350%, not 200% (decided Q-PROGRESS-1); position the fill so the inside label centres within it, as the DS already says (decided Q-PROGRESS-3); in forced colours paint toned fills and segments CanvasText too, as the DS already says (decided Q-PROGRESS-8) | DESIGN-SYSTEM.md Progress Bar, Transition; components.css 4578–4585, 4606–4609, 4620–4624 | 2026-11-05 |
| 130 | Progress Bar: add CSS for the general-data segments (Purple, Turquoise) and the Neutral-4 overflow, with legend swatches (decided Q-PROGRESS-2); say the Error message's live region is the host's, the entrance runs once on mount, the visible value and the legend are hidden from screen readers, swatches drop out in forced colours, and values show as given (decided Q-PROGRESS-4, 6, 7, 9 to 11) | DESIGN-SYSTEM.md Progress Bar, Stacked color rules, Accessibility; components.css 4561–4634 | 2026-11-05 |
| 131 | Progress Bar: record the one-off values (the inside label's 40px, the 8px swatch and 2px radius, the shimmer's 40% band and 40% Neutral-5, the reduced-motion 60%) beside the track heights (decided Q-PROGRESS-5); show compact, large, trailing and inside labels, general data and the remainder in the gallery (PROGRESS-5) | DESIGN-SYSTEM.md Progress Bar, Sizes; preview.html | 2026-11-05 |
| 132 | Empty state: give `.c-empty-link` a hover (Neutral-7) and the focus ring, keeping link2 (decided Q-EMPTY-1); add the mobile rule for inline's 12px padding (decided Q-EMPTY-2); record the 480/380/320px caps, the 240px floor and the 3px underline offset as one-offs (decided Q-EMPTY-5); note the full-page height comes from the shell (decided Q-EMPTY-3) | components.css `.c-empty-link`, Empty state mobile block; DESIGN-SYSTEM.md Empty state | 2026-11-05 |
| 133 | Price summary card: give "Show X more" a hover (Neutral-7) and the focus ring (decided Q-PRICE-4); drop "animates in at the bottom" for an added item (decided Q-PRICE-8); say the header looks like the card title (h5), the × always shows on touch, folded rows are unreachable, focus after a removal goes to the next ×, the empty state is Empty state's Section with no body, and the list opens at once under reduced motion (decided Q-PRICE-1 to Q-PRICE-3, Q-PRICE-5 to Q-PRICE-7) | components.css `.c-card-price-more`; DESIGN-SYSTEM.md Price summary card | 2026-11-05 |
| 134 | ElementBadge: the glyph at `icon-sm` (16px), in place of the CSS's 17px and the DS's 60% of the chip; drop the DS's size prop (one size, 32px) (decided Q-ELBADGE-2, Q-ELBADGE-3) | components.css 3597 (`.c-elbadge-chip` font-size); DESIGN-SYSTEM.md ElementBadge, Chip and Glyph | 2026-11-05 |
| 135 | ElementBadge: a chip alone is `role="img"` with `aria-label` (the element) beside its `title`; a 1px CanvasText border on the chip in forced colours, as Tag; the label's caption line height and 400 sublabel weight set, not left to the page; say the glyph is fixed per element, the name is always the element's and only the sublabel is replaceable; record the 32px chip and 12% tint as one-offs (decided Q-ELBADGE-1, Q-ELBADGE-4 to Q-ELBADGE-8) | components.css 3595–3604; DESIGN-SYSTEM.md ElementBadge; preview.html 3602–3612 | 2026-11-05 |
| 136 | Modal: correct the DS's panel to the CSS (400px, 16px padding, an h4 title, no border, a divider above the footer, 12px between its buttons); drop the optional description line; the close X at `icon-sm` (16px) as Button's own icon-only ghost, not `icon-base`; give `.c-icon-btn` a font size so the X isn't the browser's 13.3px (decided Q-MODAL-1, Q-MODAL-8, Q-MODAL-9) | DESIGN-SYSTEM.md Modal / dialog; components.css 1787 | 2026-11-05 |
| 137 | Modal: write the base modal's behaviour: the scrim on `--z-modal`, the panel 16px off the screen edges and scrolling inside itself; focus to the title, Tab trapped, Escape, the X or a scrim click closes, focus returns; a fade of the scrim and panel on `--duration-fast` (kept under reduced motion); the page held still the three ways Media Ad Modal does (decided Q-MODAL-2 to Q-MODAL-5) | DESIGN-SYSTEM.md Modal / dialog; components.css after 1788 | 2026-11-05 |
| 138 | Modal: the body's line height to body1's (22px) in place of 1.5; the title's to h4's; a 1px CanvasText border on the panel in forced colours; the title is a level-2 heading by default (decided Q-MODAL-6, Q-MODAL-7, Q-MODAL-10) | components.css 1784–1785; DESIGN-SYSTEM.md Modal / dialog | 2026-11-05 |
| 139 | Stepper: give the markup a list (`ol`/`li`), `aria-current="step"` on the Active step, `aria-hidden` discs and spoken step text ("Step 2 of 4: Profile, current step", then the description), as Timeline does; say the stepper is read-only (decided Q-STEPPER-1, Q-STEPPER-7) | preview.html 4639–4727; DESIGN-SYSTEM.md Stepper | 2026-11-05 |
| 140 | Stepper: remove `.c-step.is-disabled` (CSS only, a not-allowed cursor on something that can't be clicked); add a 1px CanvasText border to every indicator in forced colours; say flags in the wrong place are ignored and `currentStep` counts from 0 (decided Q-STEPPER-3, Q-STEPPER-4, Q-STEPPER-5, Q-STEPPER-9) | components.css 4334 and after 4408; DESIGN-SYSTEM.md Stepper | 2026-11-05 |
| 141 | Stepper: record the 24px indicator as a one-off; note that Task Rows uses Stepper's indicator rather than its own copy (decided Q-STEPPER-6, Q-STEPPER-8) | DESIGN-SYSTEM.md Stepper; Task Rows | 2026-11-05 |
| 142 | Stepper: below 480px the connector should still stop `spacing-4` off each circle, as on desktop. Today the steps widen to an equal share with the circle centred, so the gap grows to ~19px; draw the line past the connector's box by the step's spare width ((share − 24px) / 2) on each side (decided 2026-11-05, user) | components.css 4404–4408 | 2026-11-05 |
| 143 | Stepper, below 480px: the label's ellipsis never takes effect (`.c-step-text` is centred and sizes to its content), so long labels run together. Give each label the room between circles (2 × the share, which leaves 8px to the next), the first starting at its circle's left edge and the last ending at its circle's right edge (share + 12px each), and cap the text so the ellipsis works (decided 2026-11-05, user) | components.css 4404–4408 | 2026-11-05 |
| 144 | Stepper: draw the connectors in CanvasText in forced colours (they are background fills, so they vanish there today, at every width) (decided 2026-11-05, user) | components.css 4392–4394 and after 4408 | 2026-11-05 |
| 145 | Back button: App Shell's Level 2 paragraph should say the Back button row sits above the page header (not that it replaces the title and subtitle); add the 40-character cut to the CSS or markup, with the full name as the accessible name; name the control "Back to {parent}" (decided Q-BACK-1 to Q-BACK-3) | DESIGN-SYSTEM.md App Shell, Level 2; Back button; preview.html 2245–2250 | 2026-11-06 |
| 146 | Back button: set `line-height: var(--text-label2-lh)` (34px; today the `<button>` draws `normal`, 32px); a 44px hit area (`--hit-target-min`) by an `::after` above and below; say there is no disabled state and that a link (`href`) is preferred (decided Q-BACK-4 to Q-BACK-7) | components.css 4416; DESIGN-SYSTEM.md Back button | 2026-11-06 |
| 147 | PageHeader: use h1's `-lg` size (40/56) for the title from 1280px, as the DS already says (decided Q-PAGEHEADER-1) | components.css 4430 | 2026-11-06 |
| 148 | PageHeader: let `.c-pageheader-row` wrap, the text block `flex: 1 1 0` with a 240px minimum (or the row's width), and a 12px row gap, so on a phone the actions move under the title instead of covering it; say the actions are PageHeader's slot that App Shell fills, the title is h1 by default (2 or 3 for a panel), and the 48px below is App Shell's (decided Q-PAGEHEADER-2 to Q-PAGEHEADER-5) | components.css 4428–4429; DESIGN-SYSTEM.md PageHeader, App Shell › Page header | 2026-11-06 |
| 149 | Tabs: draw the focus ring inside the tab (`--focus-ring-offset-inset`), since the scrolling `.c-tabs` clips it outside; make pressed beat hover on inactive tabs (Neutral-3, text unchanged); give the edge fades the surface's colour, with a canvas option (decided Q-TABS-1 to Q-TABS-3) | components.css 2986–2987, 2997–2999 | 2026-11-06 |
| 150 | Tabs: add the panel CSS (16px under the track, a simultaneous cross-fade, instant under reduced motion); a pause before the count for screen readers; write the keyboard model (a roving Tab stop, ←/→ wrap and select, Home/End), disabled as a real `disabled` button, URL persistence as the host's, and the 32px fade and 40% opacity as one-offs (decided Q-TABS-4 to Q-TABS-9) | components.css after 3000; DESIGN-SYSTEM.md Tabs | 2026-11-06 |
| 151 | Tabs: add optional scroll buttons for mouse users (a plain wheel can't scroll the row sideways): a 32px Ghost arrow (Phosphor Caret, Regular, 16px) at each edge that hides tabs, on the surface's colour with the fade just past it, scrolling 80% of the row per click; never on touch (`hover: none` or `pointer: coarse`); `aria-hidden` and out of the Tab order (decided 2026-11-06, user) | components.css after 3000; DESIGN-SYSTEM.md Tabs, Overflow | 2026-11-06 |
| 152 | Segmented Control: replace the icon tooltip (`.c-seg-tt-*`) with Tooltip (`.c-tooltip`, in a body portal): the in-place bubble is clipped by any ancestor that hides overflow. The DS's reason for a separate recipe (the sliding pill) doesn't apply to a portaled bubble (decided Q-SEG-6, user) | components.css 4464–4471; DESIGN-SYSTEM.md Segmented Control, Variants | 2026-11-06 |
| 153 | Segmented Control: fixed segment heights for icon and text alike, 36px default (20px icon + 2 × spacing-8) and 24px compact (`--control-height-xs`; the DS says 28, which has no token); minimum widths `--spacing-32` (icon) and `--spacing-48` (text); no compact 5px padding (decided Q-SEG-1, Q-SEG-7, user) | components.css 4452–4453; DESIGN-SYSTEM.md Segmented Control, Sizes and Segment width | 2026-11-06 |
| 154 | Segmented Control: `role="radiogroup"`, not `group` (decided Q-SEG-2, user) | DESIGN-SYSTEM.md Segmented Control, Accessibility; preview.html | 2026-11-06 |
| 155 | Segmented Control: hover Neutral-3 and pressed Neutral-4 on the unselected segment (decided Q-SEG-3, user) | components.css 4447, 4456; DESIGN-SYSTEM.md Segmented Control, States | 2026-11-06 |
| 156 | Segmented Control: remove the Escape behaviour (decided Q-SEG-4, user) | DESIGN-SYSTEM.md Segmented Control, Accessibility | 2026-11-06 |
| 157 | Segmented Control: a forced-colours rule giving the pill a 2px CanvasText border (decided Q-SEG-8, user) | components.css (Segmented Control) | 2026-11-06 |
| 158 | Segmented Control: a disabled control fades once (40%); its disabled segments don't fade again (decided Q-SEG-9, user) | DESIGN-SYSTEM.md Segmented Control, States | 2026-11-06 |
| 159 | Badge: height 24px (`--control-height-xs`), was 22 (decided D-142, user token audit) | components.css .c-badge; DESIGN-SYSTEM.md Badge | 2026-11-06 |
| 160 | Link underline offset 4px (`--spacing-4`), was 3: Button link, Empty state link, Chip “Show less” (decided D-142, user token audit) | components.css .c-btn-link, .c-empty, .c-chip; DESIGN-SYSTEM.md Button, Empty state, Chip | 2026-11-06 |
| 161 | Button: CTA beacon nod 4px (`--spacing-4`), was 3 (decided D-142, user token audit) | components.css CTA beacon; DESIGN-SYSTEM.md Button | 2026-11-06 |
| 162 | Campaign card: radius `--radius-md` (16, was 14), mark radius `--radius-sm` (12, was 9), faces `--icon-md` (24, was 22), initials and metric label `--text-label3-size` (11, was 10), overlap `--spacing-8` (8, was 7) (decided D-142, user token audit) | components.css Campaign card; DESIGN-SYSTEM.md Campaign card | 2026-11-06 |
| 163 | Card: icon chip 40px (`--control-height-md`), was 36 (decided D-142, user token audit) | components.css .c-icon-chip; DESIGN-SYSTEM.md Card | 2026-11-06 |
| 164 | Chat window: More options menu items 40px (`--control-height-md`), was 36; message action buttons 24px (`--control-height-xs`), was 28 (decided D-142, user token audit) | components.css Chat window; DESIGN-SYSTEM.md Chat window | 2026-11-06 |
| 165 | Empty state: body cap `--measure-sm` (360), was 380 (decided D-142, user token audit) | components.css .c-empty; DESIGN-SYSTEM.md Empty state | 2026-11-06 |
| 166 | Entry card set: headroom `clamp(24px, 0.31c + 20px, 120px)` (`--spacing-20`, `--spacing-120`), was +21 / 112; re-entry stagger `--stagger-sm` (80ms), was 50ms (decided D-142, user token audit) | components.css Entry card; DESIGN-SYSTEM.md Entry card | 2026-11-06 |
| 167 | Hero card: media minimum `--spacing-120` (120), was 112; ribbon padding `--spacing-4` (4), was 5 (decided D-142, user token audit) | components.css Hero card; DESIGN-SYSTEM.md Hero card | 2026-11-06 |
| 168 | Goal bar: legend swatch 8 (`--spacing-8`, was 10), swatch gap edge 1 (`--border-width-sm`, was 1.5), tag row 12 (`--spacing-12`, was 14), row value gap 4 (`--spacing-4`, was 3); overhangs 4/6/8 and in-table 2 (were 5/7/9/3); bar radius 6/6/12 (`--radius-xs`/`-sm`, were 6/8/10) (decided D-142, user token audit) | components.css Goal bar; DESIGN-SYSTEM.md Goal bar | 2026-11-06 |
| 169 | Input field: adornment space 24px (`--spacing-24`), was 28 (decided D-142, user token audit) | components.css .c-input; DESIGN-SYSTEM.md Input field | 2026-11-06 |
| 170 | Loading state: cell gap 2px (`--spacing-2`, was 1.5); Drive/Dots step `--duration-instant` (80ms, was 90); Orbit loop `--duration-ambient` (900ms, was 950) and step `--stagger-md` (120ms, was 110) (decided D-142, user token audit) | components.css Loading state; DESIGN-SYSTEM.md Loading state | 2026-11-06 |
| 171 | Modal: panel width `--measure-md` (420), was 400 (decided D-142, user token audit) | components.css .c-modal; DESIGN-SYSTEM.md Modal | 2026-11-06 |
| 172 | Profile card: avatar 60px (`--spacing-60`), was 56 (decided D-142, user token audit) | components.css Profile card; DESIGN-SYSTEM.md Profile card | 2026-11-06 |
| 173 | Prompt input bar: pill padding 12px / 60px start (`--spacing-12`, `--spacing-60`), were 11 / 56; model menu items 40px (`--control-height-md`), were 36 (decided D-142, user token audit) | components.css Prompt input bar; DESIGN-SYSTEM.md Prompt input bar | 2026-11-06 |
| 174 | Radio: dot 8px (`--spacing-8`), was 9 (decided D-142, user token audit) | components.css .c-radio; DESIGN-SYSTEM.md Radio | 2026-11-06 |
| 175 | Streaming text: citation side padding 4 (was 5), actions 24 (`--control-height-xs`, was 28), source avatar 12 (`--icon-xs`, was 10) with `--radius-xs` (was 8), stack ring 2 (was 1.5), stack letter 6 (was 7) (decided D-142, user token audit) | components.css Streaming text; DESIGN-SYSTEM.md Streaming text | 2026-11-06 |
| 176 | Side padding 12px (`--spacing-12`), was 10: Tag and Tooltip (decided D-142, user token audit) | components.css .c-tag, .c-tooltip; DESIGN-SYSTEM.md Tag, Tooltip | 2026-11-06 |
| 177 | Textarea: resize grip 12px (`--spacing-12`, was 10), 4px inset (`--spacing-4`, was 5) (decided D-142, user token audit) | components.css .c-textarea; DESIGN-SYSTEM.md Textarea | 2026-11-06 |
| 178 | Thinking: row and query minimum height 32px (`--control-height-sm`), were 28 / 26 (decided D-142, user token audit) | components.css Thinking; DESIGN-SYSTEM.md Thinking | 2026-11-06 |
| 179 | Lists: a control row whose input is disabled takes no pressed fill, no divider fade (pressed or hovered) and no forced-colours hover outline, as the hover fill already skips it (decided Q-LIST-1, user) | components.css 6193–6232, 6359; DESIGN-SYSTEM.md Lists, States | 2026-11-06 |
| 180 | Card: a list-body padding setting (8px top and bottom, no sides, overflow hidden; a header or footer keeps 16px at the sides), so Lists' in-card surface is a Card option, not hand-written per card (decided Q-LIST-2, user) | components.css .c-card; DESIGN-SYSTEM.md Card, Lists (Sizing, Surfaces) | 2026-11-06 |
| 181 | Lists: the Tokens section says no radius token sits below radius-sm; `--radius-xs` (6px) exists and is the S corner. The M 8px stays a one-off (decided Q-LIST-3, user) | DESIGN-SYSTEM.md Lists, Leading and Tokens and one-offs; components.css 6157 | 2026-11-06 |
| 182 | Lists: pressed (Neutral-3) wins over hover with a mouse, as Tabs (decided Q-LIST-4, user) | components.css 6203, 6212; DESIGN-SYSTEM.md Lists, States | 2026-11-06 |
| 183 | Lists: a skeleton row is at least the heading + caption row's 62px (heading line + 2px + caption line + 24px padding), not 56 (decided Q-LIST-5, user) | components.css 6299–6305; DESIGN-SYSTEM.md Lists, States (Loading) | 2026-11-06 |
| 184 | Lists: the props table's `leadingSize` is a list-level setting (one size per list), matching the Don't "mix leading sizes in one list" (decided Q-LIST-7, user) | DESIGN-SYSTEM.md Lists, Props → markup | 2026-11-06 |
| 185 | Lists: say where a busy list's hidden "Loading…" text goes: its own hidden first item (decided Q-LIST-8, user) | DESIGN-SYSTEM.md Lists, States (Loading) and Accessibility | 2026-11-06 |
| 186 | Password field is a type of Input field (one Input field section with a Password part, not its own component and index entry) (decided by the user) | DESIGN-SYSTEM.md Password field and component index; preview.html sidebar | 2026-11-06 |
| 187 | Password field: the show/hide toggle gets a 44px hit area around its 16px icon (decided Q-PW-1, user) | components.css 166; DESIGN-SYSTEM.md Password field | 2026-11-06 |
| 188 | Password field: hide Edge's own reveal button (`::-ms-reveal`) so the toggle is the only one (decided Q-PW-2, user) | components.css 187 | 2026-11-06 |
| 189 | Password field: the toggle is disabled with the field (decided Q-PW-3, user) | DESIGN-SYSTEM.md Password field | 2026-11-06 |
| 190 | Password field: no success check, trailing icon, prefix or suffix; the end of the box is the toggle's (decided Q-PW-4, user) | DESIGN-SYSTEM.md Password field | 2026-11-06 |
| 191 | Search input: the box and the selected row are 48px (`--control-height-lg`), not 40px, so the selected row's avatar and name + role aren't pressed to the edges; still the same height in every state (decided Q-SEARCH-14, user) | components.css 206, 250; DESIGN-SYSTEM.md Search input (Box, Selected/collapsed) | 2026-11-06 |
| 192 | Search input: Selected — disabled fades the avatar's initials to Neutral-4 with the name and role (decided Q-SEARCH-15, user) | components.css 253–254; DESIGN-SYSTEM.md Search input (Selected — disabled) | 2026-11-06 |
| 193 | Search input fills its container (no 320px cap) and its label sits 4px above the box, as Input field (decided Q-SEARCH-1, Q-SEARCH-2, user) | components.css 203–204; DESIGN-SYSTEM.md Search input | 2026-11-06 |
| 194 | Search input: the clear (×) gets a 44px hit area and the standard 2px Obsidian focus ring (decided Q-SEARCH-3, user) | components.css 216–222; DESIGN-SYSTEM.md Search input (Clear) | 2026-11-06 |
| 195 | Search input: the results panel floats under the box at the menu layer instead of sitting in the page's flow (decided Q-SEARCH-4, user) | components.css 230; DESIGN-SYSTEM.md Search input (Dropdown panel) | 2026-11-06 |
| 196 | Search input: focus wins over error (2px Obsidian on a focused field in error), as Input field (decided Q-SEARCH-5, user) | components.css 207–212 | 2026-11-06 |
| 197 | Search input: Default may show the loading / no-results panel, as the gallery does; the DS's "no dropdown" line is owed a correction (decided Q-SEARCH-6, user) | DESIGN-SYSTEM.md Search input (variants) | 2026-11-06 |
| 198 | Search input: document the list's keyboard (↓ ↑ wrap, Enter picks, Escape closes, typing reopens), the combobox roles and the keyboard row's Neutral-2 (decided Q-SEARCH-7, user) | DESIGN-SYSTEM.md Search input; components.css 232 | 2026-11-06 |
| 199 | Search input: the spinner stands still under reduced motion (decided Q-SEARCH-8, user) | components.css 240 | 2026-11-06 |
| 200 | Search input: the selected row has the normal cursor (decided Q-SEARCH-9, user) | components.css 250 | 2026-11-06 |
| 201 | Search input: focus moves after clearing text, picking a result and clearing the choice (decided Q-SEARCH-10, user) | DESIGN-SYSTEM.md Search input | 2026-11-06 |
| 202 | Search input: the selected row keeps the label, and the gallery's Error example gains its × (decided Q-SEARCH-11, Q-SEARCH-12, user) | preview.html Search input demos | 2026-11-06 |
| 203 | Add the one-time code to the DLS as an Input field type: six 48px boxes (`--control-height-lg`, shrinking to `--control-height-md`), 8px apart, radius-sm, h4-size bold digits, over one `autocomplete="one-time-code"` numeric input; Input field's states; never masked; no auto-submit; resend outside the field (decided Q-OTP-1 to Q-OTP-10, user; built in the library first) | DESIGN-SYSTEM.md Input field; components.css .c-field; preview.html Input field demo | 2026-11-06 |
| 204 | Dropdown: the error border is 1px Red, as Input field's (decided Q-DROP-1, user) | DESIGN-SYSTEM.md Dropdown States; components.css 3052 | 2026-11-06 |
| 205 | Dropdown: Single select's trigger is a `role="combobox"` element, not a `readonly` input (decided Q-DROP-2, user) | preview.html Dropdown demos; DESIGN-SYSTEM.md Dropdown Behaviour | 2026-11-06 |
| 206 | Dropdown: the error wins over filled in both styles (both variants) (decided Q-DROP-3, user) | components.css 3052, 3061, 4141, 4151 | 2026-11-06 |
| 207 | Dropdown: the panel floats 8px under the trigger at the menu layer (both variants), settling the DS's 12px measured note (decided Q-DROP-4, user) | components.css 3067, 4156; DESIGN-SYSTEM.md Panel — placement | 2026-11-06 |
| 208 | Dropdown: disabled and read-only fields with a value keep the Neutral-3 border, written as a rule (decided Q-DROP-5, user) | DESIGN-SYSTEM.md Dropdown States | 2026-11-06 |
| 209 | Dropdown: the keyboard's current option takes the hover fill (decided Q-DROP-6, user) | components.css 3070; DESIGN-SYSTEM.md Dropdown Option | 2026-11-06 |
| 210 | Dropdown: Single select gets groups (heading and divider, `role="group"`) as Multiple select has (decided Q-DROP-7, user) | components.css 4158–4159; DESIGN-SYSTEM.md Dropdown | 2026-11-06 |
| 211 | Dropdown: the two-line row nudge is `--border-width-sm`; 320px stays a literal (decided Q-DROP-8, user) | components.css 4256 | 2026-11-06 |
| 212 | Dropdown Multiple select: after a search, Select all ticks or clears only the matches (decided Q-DROPM-1, user) | DESIGN-SYSTEM.md Select All row | 2026-11-06 |
| 213 | Dropdown Multiple select: a disabled, ticked option keeps its tick (Neutral-4 box, Neutral-1 tick); a disabled unticked box stays Neutral-3 on Neutral-2, and the DS's "Neutral-1" text is corrected (decided Q-DROPM-2, user; DROPM-2) | components.css 4171; DESIGN-SYSTEM.md Dropdown Option — Disabled | 2026-11-06 |
| 214 | Dropdown Multiple select: Select all and Clear never change a disabled option (decided Q-DROPM-3, user) | DESIGN-SYSTEM.md Select All row, Footer | 2026-11-06 |
| 215 | Dropdown Multiple select: the footer is Button ghost / primary sm, 14px, with Button's disabled look while loading, replacing the hand-built 13px buttons and their 50% opacity (decided Q-DROPM-4, Q-DROPM-6, user) | components.css 4178–4190 | 2026-11-06 |
| 216 | Dropdown Multiple select: a partly ticked Select all is announced with its count ("Select all, 2 selected") in the ARIA table (decided Q-DROPM-5, user) | DESIGN-SYSTEM.md Dropdown ARIA | 2026-11-06 |
| 217 | Dropdown Multiple select: no Select all per group, written as a Don't (decided Q-DROPM-7, user) | DESIGN-SYSTEM.md Dropdown Do / Don't | 2026-11-06 |
| 218 | Radio Card: centre the circle on the h5 title's line (1px top, `calc((--text-h5-lh − --choice-size) / 2)`), and drop the "raised" note (decided Q-RC-1, user) | components.css 3157; DESIGN-SYSTEM.md Radio Card | 2026-11-06 |
| 219 | Radio Card: the empty circle keeps Neutral-3 inside a card; record it as decided rather than raised (decided Q-RC-2, user) | DESIGN-SYSTEM.md Radio Card, Raised against Radio | 2026-11-06 |
| 220 | Radio Card: the 18px indent is `--choice-size`, and the gallery's demo gets a legend (visually hidden if needed) instead of `aria-label` (RC-2, decided Q-RC-3, user) | components.css 3161, 3163; preview.html 4243 | 2026-11-06 |
| 221 | Radio Card: no circle hover inside a card, written as a rule (decided Q-RC-4, user) | DESIGN-SYSTEM.md Radio Card States | 2026-11-06 |
| 222 | Quantity selector: the error border is 1px Red and the error text bold, as Input field's; drop Deviation 1 (decided Q-QTY-1, user) | components.css 6020; DESIGN-SYSTEM.md Quantity selector States, Deviations | 2026-11-06 |
| 223 | Quantity selector: keep the Neutral-3 pressed / holding fill as a recorded exception to Button's ghost pressed = hover (decided Q-QTY-2, user) | DESIGN-SYSTEM.md Quantity selector Deviations 2 | 2026-11-06 |
| 224 | Quantity selector: the compact button's radius is `--radius-xs` (6px), replacing the one-off 8px (decided Q-QTY-3, user) | components.css 6081; DESIGN-SYSTEM.md One-off values | 2026-11-06 |
| 225 | Quantity selector: the one-offs with exact tokens use them: `--control-height-md` / `-sm` / `-xs`, `--hit-target-min`, `--spacing-2` for the caret allowance (QTY-4) | components.css 5996–6000, 6020, 6041, 6092 | 2026-11-06 |
| 226 | Card: in a list card (List body, 8px top and bottom, no sides) the header gets 8px more at the top and the footer 8px more at the bottom, so titles line up across a row of mixed cards (decided 2026-11-10, user) | DESIGN-SYSTEM.md Card and Lists (list in a card) | 2026-11-10 |
| 227 | Card: the header gets a trailing action slot for one control (a borderless Dropdown, a "View all" link, a ⋯ menu), centred with the title; not on a card whose title is its link (decided 2026-11-10, user) | DESIGN-SYSTEM.md Card Anatomy; components.css .c-card-header | 2026-11-10 |
| 228 | Empty state: inline, inside a card, adds no padding of its own (8px 16px in a list card) and isn't centred, so its text sits 16px in (decided 2026-11-10, user) | DESIGN-SYSTEM.md Empty state, Inline; components.css .c-empty.is-inline | 2026-11-10 |
| 229 | Stat / KPI card: label and value stay at the top; everything after the value (trend, goal rail and achieved line, sparkline, description, footer) sits at the bottom of the tile, so the last lines line up across a row (decided 2026-11-10, user; the DS keeps everything at the top, 8px apart) | DESIGN-SYSTEM.md Stat / KPI card, Trend; components.css 3613 | 2026-11-10 |
| 230 | Stat / KPI card: the trend arrow is `icon-micro` (14px) in the CSS too; the trend's Green text is `--color-green-text` (decided Q-STAT-2, user; STAT-3) | components.css 3613–3614 | 2026-11-10 |
| 231 | Stat / KPI card: the trend's direction is spoken as a word ("Up", "Down"), since the arrow and colour aren't (decided Q-STAT-3, user) | DESIGN-SYSTEM.md Stat / KPI card (add Accessibility) | 2026-11-10 |
| 232 | Stat / KPI card: specify the Interactive variant as Card's clickable card (the label is the stretched link or button) and the sparkline slot under the trend (decided Q-STAT-4, Q-STAT-5, user) | DESIGN-SYSTEM.md Stat / KPI card Variants, Sparkline slot; components.css | 2026-11-10 |
| 233 | Stat / KPI card: the achieved percentage shows one decimal ("53.0%"), as GoalBar's (decided Q-STAT-6, user) | preview.html Stat demo; DESIGN-SYSTEM.md Secondary, Achieved label | 2026-11-10 |
| 234 | Slider: write the compact thumb, hover and drag shadow, disabled thumb and reduced-motion rules once per engine (`::-webkit-` and `::-moz-` in separate rules); combined, every browser drops them (decided Q-SLD-1, user; SLIDER-1) | components.css 4503, 4505, 4513, 4514, 4518 | 2026-11-10 |
| 235 | Slider: the label is Input field's, label1 (14px / 700), not caption (decided Q-SLD-2, user) | components.css .c-slider-label; DESIGN-SYSTEM.md Slider Placement | 2026-11-10 |
| 236 | Slider: on touch screens (`pointer: coarse`) the rail is 44px tall, the thumb and track unchanged; replace the Sizes caveat (decided Q-SLD-3, user) | components.css .c-slider-rail; DESIGN-SYSTEM.md Slider Thumb, Sizes | 2026-11-10 |
| 237 | Slider: set `aria-valuetext` from the format in the gallery script; the tooltip is `aria-hidden`; a range is a group named by its label, its thumbs "Minimum" / "Maximum" (decided Q-SLD-4, Q-SLD-7, user) | preview.html Slider demo and script; DESIGN-SYSTEM.md Slider Accessibility | 2026-11-10 |
| 238 | Slider: centre the tooltip on the thumb (offset by half a thumb across the track), not on the value's share of the full width (decided Q-SLD-5, user; SLIDER-5) | preview.html slider script (sliderPositionTooltip) | 2026-11-10 |
| 239 | Slider: drop "aria-valuemin / aria-valuemax updated dynamically" from Range's accessibility; each thumb keeps the scale's bounds and stops at its partner (decided Q-SLD-8, user) | DESIGN-SYSTEM.md Slider Accessibility | 2026-11-10 |
| 240 | Slider: the tooltip's sides are Tooltip's 12px (decided Q-SLD-10, user); it shows on keyboard focus as well as hover and drag (Q-SLD-11); no error state (Q-SLD-9); the thumb stops inside the track rather than overhanging (SLIDER-6) | components.css .c-slider-tooltip; DESIGN-SYSTEM.md Slider Value tooltip, Thumb | 2026-11-10 |
