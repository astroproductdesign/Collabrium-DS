# PageHeader

## Purpose
The page-level title block at the top of a view: a title, an optional
subtitle and an optional row of actions on the right. Flush in the layout,
with no fill, border or padding of its own. App Shell uses it as the top of
every screen.

⚠️ Designed from scratch in the DLS: treat it as a first pass needing design review.

## Use when
- A page (or a full panel) needs its one title, with an optional line of context and page-wide actions (Export, a period selector).

## Don't use when
- **It titles a card or a section.** Use Card's title or a section heading.
- **You need a way back to the parent screen.** Put a Back button above it; never inside.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `title` | text | **required** | The page's title. One per view. |
| `subtitle` | text | — | A line under the title: body2, Neutral-5. |
| `actions` | Buttons | — | Right-aligned beside the title, 8px apart. |
| `headingLevel` | `1` \| `2` \| `3` | `1` | 2 or 3 only for a panel inside a page with its own h1. The look is always h1. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<div>`.

## Rules
1. **One PageHeader per view.** It is the page's title, not a card or section header.
2. **Title:** h1 (32/38, 800), Neutral-9; from 1280px h1's large size (40/56). **Subtitle:** body2 (14/20, 400), Neutral-5, 8px under it.
3. **Actions sit right, 8px apart,** from the top of the title, built from real Buttons. The row collapses when there are none. At least 16px always separates them from the title.
4. **When the actions don't fit beside a 240px title block** (a phone), they move to their own line, left-aligned, 12px under the text. (Decided 2026-11-06.)
5. **From 1280px the title is h1's large size (40/56),** the DS's tier for wide screens. (Decided 2026-11-06.)
6. **No border, fill, padding or divider of its own.** A divider under the header belongs to the page layout.
7. **The space below it is the layout's:** App Shell puts 48px (`--section-gap`) between it and the content. (Decided 2026-11-06.)
8. **A Back button sits above it,** 12px from the title, never inside it.
9. **The actions are PageHeader's slot,** though the DS describes them as App Shell's addition: App Shell renders PageHeader. (Decided 2026-11-06.)
10. **The title is `h1` by default;** 2 or 3 only for a panel inside a page with its own h1. (Decided 2026-11-06.)

## Accessibility
- The title is a real heading: `h1` by default, so the page's outline starts with it.
- Actions are real Buttons, in reading order after the title.

## Motion
None. PageHeader doesn't animate.

## Example

```tsx
import { Button, PageHeader } from '@collabrium/ui';
import { DownloadSimple } from '@phosphor-icons/react';

<PageHeader title="Overview" subtitle="Here's what you've used across your projects."
  actions={<Button variant="primary" size="sm" leadingIcon={DownloadSimple}>Export</Button>} />
```

## Replaces
- `.c-pageheader`, `.c-pageheader-row`, `.c-pageheader-text`
- `.c-pageheader h1`, `.c-pageheader .sub`, `.c-pageheader-actions`
