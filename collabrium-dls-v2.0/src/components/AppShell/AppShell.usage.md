# AppShell

## Purpose
The frame every screen sits in, and the only one: the warm canvas, the main
nav (SidebarNav, unmodified) inset 16px from the window's top, left and
bottom, and beside it the content region, the only part that scrolls, with
the page header at its top. There is no top bar. App Shell governs structure
and placement only; every component inside keeps its own look.

⚠️ Designed from scratch in the DLS (no source in the brand deck or a
teammate's build).

## Use when
- Building any screen of a Collabrium app: dashboards, lists, detail screens,
  settings.

## Don't use when
- **A modal or a panel inside a page.** Use Modal or Card.
- **Laying out cards that aren't a page's main boxes** (a run of equal cards).
  Use CardGrid.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `nav` | `ReactNode` | required | A `SidebarNav`, unmodified. Uncontrolled, it's collapsed below 1024px (and back to its own state above); a controlled one should follow the same rule. |
| `header` | `ReactNode` | — | A `PageHeader`; on Level 2+ screens a `BackButton` above it. 48px above the content. |
| `children` | `ReactNode` | — | The content: regions stacked 48px apart. |
| `width` | `'full' \| 'reading'` | `'full'` | `reading` centres the content at 1200px (`--content-max-width`). |
| `fit` | `'viewport' \| 'container'` | `'viewport'` | The window's height, or the parent's (a shell in a bounded frame). |
| `backToTop` | boolean | `false` | Adds Back to top for the content region. |

`ContentGrid`: `columnGap` (`16 | 20`, default 16). `ContentGridItem`:
`span` (`1 | 2 | 3 | 4`, default 1). All three forward their ref to their
root `<div>` and take native attributes, not `style` or `className`.

In the page head, `sidebarNavInitScript(storageKey | null, navId,
{ appShell: true })` sets the nav collapsed below 1024px before first paint,
so it never flashes open.

## Rules
1. **One frame, sidebar only.** The nav is the only navigation; the page
   header is the top of every screen. No top bar: notifications or a global
   account control would be a spec change.
2. **Canvas:** the whole shell is one `--color-canvas-warm` background. The
   nav and cards read as white against it; the content region has no fill.
3. **Nav placement:** inset 16px from the top, left and bottom, its height the
   shell's less 32px; no right inset (the content's gutter is the gap). Never
   restyle SidebarNav to fit: change placement, not the component.
4. **Content region:** the only part that scrolls. 48px top, 32px sides and
   bottom (`--section-gap`, `--page-gutter`). Regions stack 48px apart.
5. **Header:** the PageHeader, full width, actions right-aligned; a Back
   button sits above it on Level 2+ screens, 12px from its title.
6. **Width:** full width for dashboards; 1200px centred (`width="reading"`)
   for settings and detail panels.
7. **Content grid:** 4 equal columns; every box is a whole span of 1 to 4.
   16px between boxes in a row (or 20px: pick one per product), 24px between
   rows. Boxes in a row stretch to the tallest; never give one a height. At
   768px and under every box takes the full width, one per row, in the same
   order (decided 2026-11-11: the CSS kept 4 columns and boxes overflowed).
   A stat row stays a StatGrid inside a span-4 box, so it fits as many tiles
   as the width allows (decided 2026-11-11).
   A box fills its span exactly: Card's 240px minimum doesn't apply inside the
   grid (it's for CardGrid, where it decides when a column drops), so a
   1-column card never overlaps its neighbour (decided 2026-11-11).
8. **Tablets (1023px and under):** the nav is collapsed to its 72px rail, so
   the content keeps its room; it can still be expanded (decided 2026-11-11,
   the DS's tablet tier, which the CSS lacked). Wider again, it returns to
   its own state.
9. **Phones (768px and under):** the nav floats over the content, 16px from
   the top and left, as SidebarNav's card, with no scrim (absolute in the
   shell, which is the window, on the floating layer `--z-float`; decided
   2026-11-11), and is collapsed so it doesn't cover the title. The content takes the full width and starts
   120px down, clear of the collapsed card. Tapped open, the card covers the
   page until it's collapsed again: accepted.
10. **Full-page Empty state:** fills what's left of the content region instead
   of a whole window's height.

## Accessibility
- The nav is a `<nav>` landmark (SidebarNav's); the content region is the
  page's `<main>`. One App Shell per page.
- The page header's title is the page's `h1`.
- No scrim on phones: the content behind the card stays readable and usable.
- Keyboard: nothing of its own. Tab moves through the nav, then the content.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Collapse / expand the nav | SidebarNav's width change; the content follows | `--duration-slow` · `--ease-standard` |
| Reduced motion | Instant, as SidebarNav | — |

## Example

```tsx
import { AppShell, ContentGrid, ContentGridItem, PageHeader, SidebarNav, Card } from '@collabrium/ui';

<AppShell
  nav={<SidebarNav sections={sections} activeId="overview" user={user} userMenu={userMenu} />}
  header={<PageHeader title="Overview" subtitle="Here's what you've used across your projects." />}
>
  <ContentGrid>
    <ContentGridItem span={3}><Card>…</Card></ContentGridItem>
    <ContentGridItem span={1}><Card>…</Card></ContentGridItem>
  </ContentGrid>
</AppShell>
```

## Replaces
- `.c-shell`, `.c-shell .c-sidebar-shell`, `.c-shell .c-sidebar`,
  `.c-shell-main`, `.c-shell-content`, `.c-shell .c-pageheader`
- `.c-shell-grid`, `.c-shell-span-1` to `-4`
- The gallery's "App Shell starts collapsed on mobile" script
