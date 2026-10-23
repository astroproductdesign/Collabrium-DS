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
- Docs site: every component page now shows all its sections. A section with no content yet says "Coming soon." Only `title` and `description` are required in a docs file.
