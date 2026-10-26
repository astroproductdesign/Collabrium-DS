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
- **Streaming Text** (in review), the third of AI Native's eight parts. The model's prose arriving word by word through a buffer, with a blinking caret and citation chips landing in the sentence. Once the last word settles the action row (Copy, Retry, thumbs), a sources list and follow-ups appear; a stopped answer keeps its text. A message that arrives already finished is shown whole. Failed streams and tables, code and lists are not built (no DLS markup).
- **Tokens, 2026-10-26.** Added to the DLS `tokens.css` (and copied here): focus ring, control sizes, status tints and AA text colours, `--spacing-2` and `--spacing-6`, `--radius-xs`, measures, pulse and blink durations, staggers and prose leading. The components now use them in place of their local values (computed styles were identical before and after), and the Foundation pages show them. New: `--icon-xs` (12px) and `--color-red-text` (#D4001A), now used for red text in Badge Error, Checkbox and Thinking.
- **Review round, 2026-10-26.** Button: icons 16px at every size, `aria-disabled` look, forced-colours edge on Primary and Danger, new `danger` and `link` variants. Badge: 22px, caption type, 14px icons, darker Success and Warning text, new `info` tone. Checkbox: 14px glyph, hover and pressed, `required`, `error` and `CheckboxGroup`. Loading State: grid visible in forced colours, long labels end in an ellipsis. Thinking: running timer (`startedAt`, `{duration}`), announcement outside the button, Obsidian focus ring on rows, spinner keeps turning under reduced motion. Task Rows: `stopped` status; Retrying arrow keeps turning. Streaming Text: `failed` status.
- **Task Rows** (in review), the fourth of AI Native's eight parts. The named tasks of an agent run as rows with a status disc, count, pill and droppable detail steps, in two variants (Capsules, List). One row open at a time: a failure (or the task now in progress) opens itself and the reader's click wins. Retry shows once, on a retryable failure only, and is never disabled. Six rows then "+N more". Failures, a retry and the end of the run are announced politely.
- Docs site: **AI Native is one group.** The sidebar and home grid show a single "AI Native" item. Its overview page explains the family and links to each part (Loading State, Thinking) at `components/ai-native/<part>`; the parts the DLS lists but that are not converted yet show as "Coming soon". Previous and next walk through the overview and its parts.
- Docs site: link clicks inside a preview do nothing, so no demo can navigate away.
- Docs site: every component page now shows all its sections. A section with no content yet says "Coming soon." Only `title` and `description` are required in a docs file.
