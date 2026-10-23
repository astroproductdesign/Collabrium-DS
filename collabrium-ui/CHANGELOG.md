# Changelog

All notable changes to @collabrium/ui. Dates are YYYY-MM-DD.

## Unreleased

### Added
- Package scaffold:
  - Build: tsup builds one ES module per source file, so each file keeps its `"use client"`, plus type declarations and a single `dist/styles.css`.
  - Two entry points: `@collabrium/ui` and `@collabrium/ui/charts`.
- Tokens:
  - `tokens.css` is copied from DLS v0.9.124, with the same names and values.
  - `tokens.ts` is generated from it, with a drift check.
- Base styles: box-sizing, canvas, font, text colour.
- Motion: `motion.ts` (token durations and easings), plus `FadeIn`, `SlideUp` and `Collapse` on the `motion` library.
- Charts: `setupCharts()` applies Chart.js defaults from DESIGN-SYSTEM.md "Chart chrome & marks".
- Playground: a Next.js App Router app with an index page and one preview page per component. It has a static export that opens from disk.
- **Button** (in review). The props cover:
  - Variants: Primary, Secondary, Ghost.
  - Sizes: sm, md, lg.
  - Icons: leading icon, trailing arrow, icon-only.
  - States: disabled, loading.
  - CTA beacon: on and static.
- **Badge** (in review). Five tones (Neutral, Success, Error, Warning, Selected) and an optional leading icon. Info is not built yet (no CSS in the DLS).
- **Checkbox** (in review). Real native checkbox with a label, an optional description, a partial (indeterminate) state, disabled, and a keyboard focus ring. Radio and Switch (same CSS block in the DLS) come next.
- **Loading State** (in review), the first of AI Native's eight parts. Drive, Dots and Orbit variants, a live label and a real elapsed timer. It holds itself back for 400ms, counts from a start timestamp and keeps a polite live region; reduced motion freezes the grid and keeps the timer.
- **Thinking** (in review), the second of AI Native's eight parts. An expandable agent trace with four variants (Steps, Reasoning, Search, Coding). It opens itself while the run is working, closes when done, and the reader's click wins from then on; exactly one spinner at a time; the closed trace is inert.
- Docs site: **AI Native is one group.** The sidebar and home grid show a single "AI Native" item. Its overview page explains the family and links to each part (Loading State, Thinking) at `components/ai-native/<part>`; the parts the DLS lists but that are not converted yet show as "Coming soon". Previous and next walk through the overview and its parts.
- Docs site: link clicks inside a preview do nothing, so no demo can navigate away.
- Docs site: every component page now shows all its sections. A section with no content yet says "Coming soon." Only `title` and `description` are required in a docs file.
