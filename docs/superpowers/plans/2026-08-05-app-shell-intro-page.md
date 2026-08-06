# App Shell Intro Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `pages/app-shell-intro.html` — a self-contained static page that opens with a 5-strip Obsidian curtain wipe, then reveals a blank Collabrium DLS App Shell (sidebar nav + empty Page header + empty Content region).

**Architecture:** Single static HTML file (no bundler, no framework — matches the existing `collabrium-dls/preview.html` pattern). It links `collabrium-dls/tokens.css` and `collabrium-dls/components.css` by relative path (read-only — nothing in `collabrium-dls/` is touched). Real DS markup for the shell (not a mockup), a page-local `<style>` block for the one shell-height override and the curtain overlay, and vanilla JS for the sidebar collapse toggle and the wipe-trigger sequencing.

**Tech Stack:** HTML, CSS (custom properties from `tokens.css`), vanilla JS. Fonts via Google Fonts CDN, icons via Phosphor Icons CDN (same `<link>` tags `preview.html` already uses).

**No automated test runner exists in this repo** (it's a pure static-asset project — no `package.json`, no test framework). "Verify" steps in this plan mean: open the file in the browser preview tool and check the described behavior directly (screenshot / read_page / console check), in place of `pytest`/`jest`-style automated tests.

---

### Task 1: Page scaffold + blank App Shell markup

**Files:**
- Create: `pages/app-shell-intro.html`

- [ ] **Step 1: Create the directory and file with the full scaffold + blank shell**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Collabrium — App Shell</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
<link rel="stylesheet" href="../collabrium-dls/tokens.css" />
<link rel="stylesheet" href="../collabrium-dls/components.css" />
<style>
  *{box-sizing:border-box;}
  html,body{margin:0; height:100%;}
  body{font-family:var(--font-primary); color:var(--color-neutral-9);}

  /* .c-shell in components.css is pinned to a 480px demo height for
     the component gallery — this page is a real full-viewport shell,
     so the height is overridden here, not in components.css. */
  .c-shell{height:100dvh;}
</style>
</head>
<body>

  <div class="c-shell">
    <div class="c-sidebar-shell">
      <nav class="c-sidebar" id="shellSidebarNav">
        <div class="c-sidebar-header">
          <div class="c-sidebar-logo">
            <img class="js-sidebar-logo-img"
                 src="../collabrium-dls/logo-lockups/collabrium-default-logo.svg"
                 data-expanded-src="../collabrium-dls/logo-lockups/collabrium-default-logo.svg"
                 data-collapsed-src="../collabrium-dls/SVG/coin.svg"
                 alt="Collabrium" />
          </div>
        </div>
        <div class="c-sidebar-section">Overview</div>
        <button class="c-sidebar-item active" type="button"><i class="ph-fill ph-house"></i><span class="label">Dashboard</span><span class="c-sidebar-hover-text">Dashboard</span></button>
        <button class="c-sidebar-item" type="button"><i class="ph-fill ph-chart-bar"></i><span class="label">Reports</span><span class="c-sidebar-hover-text">Reports</span></button>
        <div class="c-sidebar-footer">
          <button class="c-sidebar-item" type="button"><i class="ph-fill ph-gear"></i><span class="label">Settings</span><span class="c-sidebar-hover-text">Settings</span></button>
        </div>
      </nav>
      <button class="c-sidebar-toggle js-sidebar-toggle" type="button" aria-label="Collapse sidebar" data-sidebar-toggle="shellSidebarNav">
        <svg class="js-sidebar-toggle-icon" viewBox="0 0 20 20" fill="none">
          <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" stroke-width="1.4"/>
          <line x1="9" y1="3.5" x2="9" y2="16.5" stroke="currentColor" stroke-width="1.4"/>
          <path class="js-sidebar-toggle-arrow" d="M13.5 7 11 10l2.5 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="c-shell-main">
      <div class="c-shell-content">
        <div class="c-shell-page-header">
          <div>
            <h1>Overview</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="c-sidebar-hover-label" id="shellSidebarHoverLabel" role="tooltip"></div>

</body>
</html>
```

- [ ] **Step 2: Verify the shell renders**

Open `pages/app-shell-intro.html` in the browser preview tool (`mcp__Claude_Browser__preview_start` with a static file server, or `navigate` to the `file://` path). Confirm:
- Full-viewport layout: sidebar rail on the left (inset 16px top/left/bottom, `radius-lg`, bordered), Canvas warm (`#FCFAF5`) background filling the rest
- "Overview" h1 renders top-left of the content area, no subtitle, nothing else below it
- No console errors (check `mcp__Claude_Browser__read_console_messages`) — a red console error here almost always means a bad relative path to `tokens.css`/`components.css`/the logo SVGs
- Sidebar collapse button is visible but **not yet functional** (JS not added until Task 2) — clicking it does nothing yet, that's expected

- [ ] **Step 3: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: scaffold App Shell intro page with blank shell"
```

---

### Task 2: Sidebar collapse toggle + hover label

**Files:**
- Modify: `pages/app-shell-intro.html` (insert a `<script>` block just before `</body>`)

- [ ] **Step 1: Add the toggle + hover-label script**

Insert before the closing `</body>` tag:

```html
<script>
(function () {
  // SidebarNav — collapse/expand toggle. Swaps the logo asset itself
  // and the toggle icon's arrow direction. Ported from
  // collabrium-dls/preview.html's own implementation, unmodified.
  document.addEventListener('click', (e) => {
    const sidebarToggle = e.target.closest('.js-sidebar-toggle');
    if (!sidebarToggle) return;
    const nav = document.getElementById(sidebarToggle.dataset.sidebarToggle);
    const collapsing = !nav.classList.contains('is-collapsed');
    nav.classList.toggle('is-collapsed');
    sidebarToggle.setAttribute('aria-label', collapsing ? 'Expand sidebar' : 'Collapse sidebar');

    const img = nav.querySelector('.js-sidebar-logo-img');
    img.src = collapsing ? img.dataset.collapsedSrc : img.dataset.expandedSrc;

    const arrow = sidebarToggle.querySelector('.js-sidebar-toggle-arrow');
    arrow.setAttribute('d', collapsing ? 'M11.5 7 14 10l-2.5 3' : 'M13.5 7 11 10l2.5 3');
  });

  // SidebarNav — collapsed hover label. Single shared, fixed-position
  // element; mouseover/mouseout (they bubble) rather than
  // mouseenter/mouseleave so it stays event-delegated. Ported from
  // collabrium-dls/preview.html's own implementation, unmodified.
  const hoverLabel = document.getElementById('shellSidebarHoverLabel');
  function showHoverLabel(item) {
    const nav = item.closest('.c-sidebar');
    const source = item.querySelector('.c-sidebar-hover-text');
    if (!hoverLabel || !nav || !nav.classList.contains('is-collapsed') || !source) return;
    const iconRect = item.querySelector('i').getBoundingClientRect();
    hoverLabel.textContent = source.textContent;
    hoverLabel.style.left = (iconRect.right + 8) + 'px';
    hoverLabel.style.top = (iconRect.top + iconRect.height / 2) + 'px';
    hoverLabel.style.transform = 'translateY(-50%)';
    hoverLabel.classList.add('is-visible');
  }
  function hideHoverLabel() {
    if (hoverLabel) hoverLabel.classList.remove('is-visible');
  }
  document.addEventListener('mouseover', (e) => {
    const item = e.target.closest('.c-sidebar-item');
    if (item && !item.contains(e.relatedTarget)) showHoverLabel(item);
  });
  document.addEventListener('mouseout', (e) => {
    const item = e.target.closest('.c-sidebar-item');
    if (item && !item.contains(e.relatedTarget)) hideHoverLabel();
  });
  document.addEventListener('focusin', (e) => {
    const item = e.target.closest('.c-sidebar-item');
    if (item) showHoverLabel(item);
  });
  document.addEventListener('focusout', (e) => {
    const item = e.target.closest('.c-sidebar-item');
    if (item) hideHoverLabel();
  });
})();
</script>
```

- [ ] **Step 2: Verify the toggle works**

Reload the page in the browser preview tool. Click the sidebar's collapse button (`mcp__Claude_Browser__computer` `left_click`). Confirm:
- Sidebar shrinks to the 72px icon-only rail, labels/section-label/footer text hide, logo swaps to `coin.svg`
- Toggle arrow flips direction
- Clicking again expands it back to 240px with the full logo restored
- Hovering an icon while collapsed shows the floating hover label with the correct text (e.g. "Dashboard")

- [ ] **Step 3: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: wire up sidebar collapse toggle and hover label"
```

---

### Task 3: Curtain overlay (static, no animation yet)

**Files:**
- Modify: `pages/app-shell-intro.html` (add CSS to the existing `<style>` block; add markup right after `<body>`)

- [ ] **Step 1: Add curtain CSS**

Append inside the existing `<style>...</style>` block (after the `.c-shell{height:100dvh;}` rule):

```css
  .curtain-overlay{position:fixed; inset:0; z-index:100; display:flex;}
  .curtain-strip{flex:1 0 20%; background:var(--color-obsidian); transform-origin:bottom; transition:transform 650ms cubic-bezier(.65,0,.35,1);}
```

- [ ] **Step 2: Add curtain markup**

Insert immediately after the opening `<body>` tag (before the `.c-shell` div):

```html
  <div class="curtain-overlay" id="curtainOverlay" aria-hidden="true">
    <div class="curtain-strip"></div>
    <div class="curtain-strip"></div>
    <div class="curtain-strip"></div>
    <div class="curtain-strip"></div>
    <div class="curtain-strip"></div>
  </div>
```

- [ ] **Step 3: Verify the overlay fully covers the shell**

Reload the page. Confirm:
- The entire viewport is solid Obsidian (`#2B2B2C`) — no gaps between the 5 strips, no sliver of the Canvas warm shell visible at any edge
- The shell is present underneath (inspect via `mcp__Claude_Browser__read_page` — the `.c-shell` markup should still be in the accessibility tree even though visually hidden)
- Clicking anywhere does nothing yet (overlay isn't removed until Task 4)

- [ ] **Step 4: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: add static curtain overlay covering the shell"
```

---

### Task 4: Wipe animation + reveal

**Files:**
- Modify: `pages/app-shell-intro.html` (append to the existing `<script>` block)

- [ ] **Step 1: Add the wipe-trigger script**

Append inside the existing `<script>...</script>` block, right before the closing `})();`:

```js
  // Curtain wipe intro. 5 strips, left→right, 70ms stagger, 650ms each,
  // cubic-bezier(.65,0,.35,1) — see docs/superpowers/specs/
  // 2026-08-05-app-shell-intro-page-design.md for the timing rationale.
  // Runs on every load (no sessionStorage skip, by design).
  const overlay = document.getElementById('curtainOverlay');
  const strips = overlay ? Array.from(overlay.querySelectorAll('.curtain-strip')) : [];
  if (overlay && strips.length) {
    const HOLD_MS = 200;
    const STAGGER_MS = 70;
    const last = strips[strips.length - 1];
    last.addEventListener('transitionend', () => {
      overlay.style.display = 'none';
    }, { once: true });
    strips.forEach((strip, i) => {
      setTimeout(() => { strip.style.transform = 'scaleY(0)'; }, HOLD_MS + i * STAGGER_MS);
    });
  }
```

- [ ] **Step 2: Verify the wipe plays and reveals an interactive shell**

Reload the page in the browser preview tool and immediately take a screenshot (`mcp__Claude_Browser__computer` `screenshot`) to catch the mid-wipe state, then another after ~1.5s. Confirm:
- On load, the overlay is fully covering (solid Obsidian, matches Task 3's check)
- Mid-animation screenshot shows strips at different heights (left strips shorter/gone, right strips still tall) — confirms left-to-right stagger
- After the wipe finishes (~1.1s total: 200ms hold + 4×70ms stagger + 650ms last strip's own transition), the overlay is gone and the blank App Shell (sidebar + "Overview" header) is fully visible
- Click the sidebar collapse toggle post-wipe to confirm the overlay isn't silently blocking clicks (it must be `display:none`, not just visually transparent)
- Check `read_console_messages` for errors

- [ ] **Step 3: Verify it replays on reload**

Reload the page again (`mcp__Claude_Browser__navigate` to the same URL, or a hard refresh). Confirm the full curtain-covered → wipe → revealed sequence plays again from the start, not skipped.

- [ ] **Step 4: Commit**

```bash
git add pages/app-shell-intro.html
git commit -m "feat: animate curtain wipe and reveal the shell"
```

---

### Task 5: Final pass

**Files:** none (verification only)

- [ ] **Step 1: Manual collapse-toggle regression check**

With the browser preview tool, resize the viewport narrow (e.g. `mcp__Claude_Browser__resize_window` to ~600px wide). Confirm nothing visibly breaks (no horizontal scrollbar, no overlapping text) even without automatic breakpoint collapse — per the design spec, DESIGN-SYSTEM.md documents 1024px/768px automatic collapse as "provisional, first pass, no source," not yet implemented in `components.css`, so this page intentionally doesn't add it. The manual toggle from Task 2 is the only responsive behavior expected to work.

- [ ] **Step 2: Confirm `collabrium-dls/` is untouched**

```bash
git status collabrium-dls/
```

Expected: no output (clean — nothing modified, nothing new).

- [ ] **Step 3: Full diff review**

```bash
git log --oneline -5
git diff main --stat
```

Expected: only `pages/app-shell-intro.html` plus the two `docs/superpowers/` spec/plan files are new; nothing under `collabrium-dls/` or `components/` appears.
