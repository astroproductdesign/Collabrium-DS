# App Shell intro page — curtain wipe + blank shell

**Date:** 2026-08-05
**Status:** Approved

## Goal

A new standalone page that opens with a curtain-wipe transition (per
[motion.dev's React Curtains Wipe example](https://motion.dev/examples/react-curtains-wipe))
and then reveals a blank instance of Collabrium DLS's App Shell
(sidebar nav + empty Page header + empty Content region).

## Location

`pages/app-shell-intro.html` — a new top-level `pages/` folder, sibling
to `collabrium-dls/` and `components/`. `collabrium-dls/` is not
modified in any way (it's the pushed/pulled design-system deliverable
with its own standing-rule discipline); the new page only *reads* its
assets via relative paths (`../collabrium-dls/tokens.css`,
`../collabrium-dls/components.css`, Google Fonts, Phosphor Icons —
same load order the DS docs specify).

## Structure

Single self-contained HTML file (matches the existing pattern of
`preview.html` / `sidebar-nav-test.html` — no bundler, no framework,
vanilla JS). Two layers in the body:

1. **App Shell** — real DS markup, not a mockup:
   - `.c-shell` / `.c-sidebar-shell` / `.c-sidebar` — same anatomy as
     the DS's own App Shell demo (Header/logo, one nav section with a
     couple of items, Footer with a Settings item, collapse toggle
     wired up the same way `preview.html` does it)
   - `.c-shell-main` / `.c-shell-content` / `.c-shell-page-header` —
     title only ("Overview"), no subtitle, no actions row
   - Content region left **truly blank** (Canvas warm background
     showing through, no Empty state component, no placeholder boxes)
   - This page's own `<style>` overrides `.c-shell{height:100dvh}` —
     `components.css`'s `.c-shell` is pinned to a 480px demo height for
     the gallery, which doesn't apply to a real full-page shell. This
     override lives in the page, not in `components.css`.

2. **Curtain overlay** — 5 equal-width vertical strips, solid Obsidian
   (`var(--color-obsidian)`), `position:fixed` full-viewport, `z-index`
   above the shell, covering it completely on load.

## Wipe behavior

- On load: overlay fully covers the viewport (no flash of the shell
  underneath — overlay must be visible before first paint, e.g. via
  inline style or a pre-hidden class).
- After a ~200ms hold, each of the 5 strips animates
  `transform: scaleY(0)` (bottom-anchored `transform-origin`), left to
  right, ~70ms stagger between strips, ~650ms duration each,
  `cubic-bezier(0.65,0,0.35,1)` easing.
- Once the last strip's transition ends, the overlay is removed from
  layout (`display:none`) so it can never intercept clicks on the shell
  underneath.
- Replays on every page load/refresh (no sessionStorage skip).
- Implementation: CSS transitions + a small vanilla-JS orchestrator
  (stagger via `animation-delay`/`transition-delay`, completion via
  `transitionend` on the last strip). No external animation library —
  consistent with `preview.html`'s existing vanilla-JS interactions
  (sidebar collapse toggle).

## Non-goals

- No dummy dashboard content (stat cards, grid boxes) — shell is
  intentionally blank per this pass.
- No Level 2 (drill-down/breadcrumb) — out of scope, not yet specced
  in the DS itself.
- No changes to `collabrium-dls/` files.
- No sessionStorage-based "play once" behavior.

## Verification

- Open `pages/app-shell-intro.html` in the browser preview tool.
- Confirm: overlay covers on load with no flash of content, strips
  wipe left-to-right and fully clear, shell underneath is interactive
  immediately after (sidebar collapse toggle works, no dead click
  zone from a lingering overlay).
- Manual collapse toggle check: click the sidebar's collapse button,
  confirm it shrinks to the 72px icon rail and back — this is the only
  responsive behavior actually implemented in `components.css` today.
  (DESIGN-SYSTEM.md documents *automatic* breakpoint collapse at
  1024px/768px as "provisional, first pass, no source" — it isn't
  built into `components.css` yet, so it's out of scope here; adding
  it would be a SidebarNav/App Shell spec change, not this page's to
  make.) Resize the window narrow anyway to confirm nothing visibly
  breaks even without that automatic behavior.
- Reload the page again to confirm the wipe replays each time.
