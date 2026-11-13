# SidebarNav

## Purpose
The app's primary navigation, and the canonical one for every Collabrium build:
no top, bottom or tab-bar nav unless documented as an exception. A 240px rail
with the header logo, the Department strip, the menu (sections, items, one
level of children) and the footer with the account menu. It collapses to a
72px icon rail; below 768px it's a content-sized card that collapses to its
logo. App Shell places it, unmodified.

Transcribed from the teammate's `SidebarNav.jsx`; the Department strip, its card and the phone card are ⚠️ designed from scratch in the DLS (a first pass needing design review).

## Use when
- The app needs its main navigation.

## Don't use when
- **Moving between views of one page.** Use Tabs.
- **Stepping back up a level.** Use Back button.
- **A list of a page's own sections.** Use a page-local list (the docs site's "On this page").

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `sections` | `SidebarNavSection[]` | required | `{ id, label?, items }`. Item: `{ id, label, icon, href?, onSelect?, count?, soon?, disabled?, children?, defaultExpanded? }`. Child: `{ id, label, href?, onSelect?, disabled? }`. |
| `activeId`, `defaultActiveId`, `onActiveChange` | string \| null, `(id) => void` | —, `null` | The one active destination, an item or a child. |
| `collapsed`, `defaultCollapsed`, `onCollapsedChange` | boolean, `(collapsed) => void` | —, `false` | The 72px rail. |
| `collapsedStorageKey` | string | — | Remembers collapsed or expanded in the browser. `sidebarNavInitScript(key, id)` in the page head stops a flash on load. Inside App Shell an uncontrolled rail is collapsed below 1024px; pass `{ appShell: true }` to the script there. |
| `logo`, `logoName`, `logoHref`, `logoBadge` | `SidebarNavLogo`, string, string, string | —, `"Collabrium"`, —, — | The header logo without departments: `{ kind: 'live', src, markSrc }` (logo.html, logo-mark.html), `{ kind: 'lockup', src, iconSrc }`, `{ kind: 'icon', iconSrc }`. |
| `departments` | `SidebarNavDepartment[]` | `[]` | `{ id, name, description, icon, logo, element?, href?, soon?, badge? }`. The strip shows with 2 or more; `badge` ("Beta") sits beside its logo. |
| `department`, `defaultDepartment`, `onDepartmentChange` | string, `(id) => void` | —, the first, — | The selected department. In the product it comes from the address. |
| `footerItems` | `SidebarNavItem[]` | `[]` | Items above the account (Help). |
| `user`, `userMenu` | `{ name, role, email?, initials? }`, `SidebarNavMenuItem[]` | — | The account row and its menu: `{ id, label, icon, href?, onSelect?, divider? }`. |
| `linkComponent` | `ElementType` | `'a'` | Renders `href` items and chips: pass Next.js's `Link`. |
| `label` | string | `"Main"` | Names the navigation landmark. |

The ref goes to the outer element (it holds the rail and, outside its clip, the toggle, card, menu and hover label). `style` and `className` are not accepted. These props replace the gallery's scripts.

## Rules
1. **Rail:** 240px expanded, 72px collapsed, never scrolling sideways; 12px padding on all four sides, 4px between items, radius-lg, 1px Neutral-3, Neutral-1, shadow-1 (as the live build; decided 2026-11-11). Width changes over `--duration-slow`.
2. **Header:** the logo, 8px top and sides, 16px under, a link to the department's home with a Neutral-2 hover on the logo only. From the DLS logo library, never redrawn: Collabrium expanded is the live `logo.html`, collapsed the animated `logo-mark.html`; a department expanded is its lockup (30px, laid out at 22px so the menu never moves), collapsed its element icon; a department with no lockup shows its icon beside its name. A live department that isn't final can carry a short Neutral Badge beside its logo, 8px after it, expanded only (`badge` / `logoBadge`, "Beta"; decided 2026-11-11); its card shows it too. Names and hover lines follow the DS's Department logos table (CollabStudio, "AI-powered creative production."; decided 2026-11-11). The page passes the files (the library ships no brand assets; decided 2026-11-10).
3. **Department strip** (2 or more departments; expanded only): Collabrium first, live departments, coming-soon ones last; a department the person can't see isn't passed. A Neutral-2 track (4px padding, radius-md) of 32px chips sharing the width; the selected chip sits on a white pill (shadow-1) that slides. Hover Neutral-3 at 60%, pressed Neutral-3, focus ring inset. Coming soon: the icon greyed by a filter, can't be picked, still focusable. Past 6: fixed 33px chips, a 10px fade on any edge with more, sideways scrolling (a mouse wheel too), the selected chip kept in view. A hairline follows, 8px below.
4. **Department card:** on hover or keyboard focus of a chip, never on touch or collapsed: Neutral-7, the name (body2 bold, plus a "Soon" Badge) and its one line (label2, Neutral-4), 12px padding, up to 280px, 8px under the strip with its left on the strip's, a 6px caret at the chip. Hides on leave, blur, Escape or scroll.
5. **Switching department:** the pill slides, the logo rises in, the menu fades out and the new one in, from the top with every parent closed. The page goes to the department's home (`onDepartmentChange`), swaps `sections` and sets its home item active; it also asks about unsaved changes and shows the loading state.
6. **Settings is a page,** so it's a main item, at the end of the list, not in the account menu (decided 2026-11-11, as the live build).
7. **Sections:** an optional label (caption bold uppercase Neutral-5, 16px above, 8px sides, 4px under) with a 1px Neutral-3 hairline above every group but the first. One level of grouping.
8. **Item:** at least 40px (it grows when the label wraps; labels never truncate), 12px in, a 20px Fill icon 12px from the label, body1 500 Neutral-5. Hover Neutral-2, pressed Neutral-3, focus ring inset (decided 2026-11-10), active Neutral-2 with Neutral-9 bold, disabled Neutral-4. A count trails (caption bold Neutral-5). Soon: Neutral-4, the icon at 40%, a "Soon" Badge, no hover; never with a count.
9. **Children** (one level): the parent shows a caret (14px, Neutral-5) and opens its children inline wherever it's clicked; each parent on its own. Children are 36px, full width, indented by their own 16px padding, body2 Neutral-5 (400, as the CSS); active Neutral-2, Neutral-9 bold; disabled Neutral-4. A parent with the active child is bold with no fill. The children grow to their height over `--duration-slow`; a parent never becomes a destination itself.
10. **One active destination** across the whole nav: picking an item or child replaces the last.
11. **Collapsed:** icons centred; the Department strip, labels, section labels, counts and children hidden (expand to switch department; decided 2026-11-11, not the live build's visible strip); a count becomes an 8px dot on the icon's top right in the department's element colour (Neutral-9 without a department), ringed in white (decided 2026-11-10). The parent of the active child takes the active fill. Clicking a parent goes to its first child. The logo is centred; the toggle becomes a 24px floating button straddling the rail's edge. A hover or focus label (Tooltip's bubble, built apart so the scrolling menu can't clip it) names each item, "(soon)" added; the account row reads "Name · Role" and still opens the account menu (decided 2026-11-11, not the live build's expand-the-sidebar).
12. **Menu region:** the only part that scrolls; header, strip and footer stay pinned. Its thin scrollbar shows on hover only and never takes width.
13. **Footer:** pinned to the bottom, 16px above a hairline: any footer items, then the account row, as the live build (decided 2026-11-11): as tall as its text with 8px top and bottom and 4px under it, a 32px Neutral-2 avatar with caption bold initials, the name in body2 bold over the role in caption, both wrapping; the sign-in address (`email`) is the role's hover title. Its menu holds account actions only (Log out): 240px whatever the rail's width, opening upward with left edges flush, 40px items with 20px Fill icons, body2 500, optional hairlines; hover and keyboard focus Neutral-2 with the ring inside; fades and rises 4px.
14. **Toggle:** the gallery's panel glyph (an arrow in a sidebar outline; the DS names Remix's sidebar-fold, the library uses only Phosphor and this drawn glyph; decided 2026-11-10). 28px with an 18px glyph on the logo's row; 24px with 16px collapsed.
15. **Phones (768px and under):** a content-sized card with shadow-3, never wider than the window less 32px nor taller than it less 32px. Collapsed, only the logo row shows. No separate menu button and no scrim; App Shell places it.

## Accessibility
- A `<nav>` named "Main" (`label`). The active item or child carries `aria-current="page"`; a parent carries `aria-expanded` and controls its children (which are inert while closed).
- Department chips: a group named "Departments"; each is named with its line ("CollabSales. Clients, proposals and the pipeline."), plus "Coming soon." where it applies; the selected one carries `aria-current`. Tab moves through them; Enter picks; Escape hides the card. The card is `aria-hidden` (the chip already says it).
- The account row: `aria-haspopup="menu"` and `aria-expanded`; collapsed it's named "Name, Role". The menu is `role="menu"` with `menuitem`s: opening it moves focus to the first item; ↑ ↓ (wrapping), Home and End move; Escape closes and returns focus; Tab closes it.
- The toggle: "Collapse sidebar" or "Expand sidebar", with `aria-expanded`.
- The collapsed hover label is `aria-hidden`: each item keeps its own name.
- Forced colours: the active item, child and department are outlined in Highlight; the pill is Highlight; dots are CanvasText.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Collapse / expand | Width | `--duration-slow` · `--ease-standard` |
| A parent opens or closes | Children grow or shrink to their height | `--duration-slow` · `--ease-standard` |
| Department switch | Pill slides; logo rises in 4px; menu fades out then in | `--duration-base` / `--duration-fast` · `--ease-standard` |
| Hover, press, hover label, department card | Fill; fade | `--duration-fast` · `--ease-standard` |
| Account menu | Fades and rises 4px | `--duration-fast` · `--ease-standard` |
| Reduced motion | Instant: no slide, rise, fade or growth | — |

## Example

```tsx
import { SidebarNav } from '@collabrium/ui';
import { Gear, House, SignOut } from '@phosphor-icons/react';

<SidebarNav
  logo={{ kind: 'live', src: '/logo.html', markSrc: '/logo-mark.html' }}
  sections={[
    {
      id: 'main',
      items: [
        { id: 'home', label: 'Dashboard', icon: House, href: '/' },
        { id: 'settings', label: 'Settings', icon: Gear, href: '/settings' },
      ],
    },
  ]}
  activeId="home"
  user={{ name: 'Bryan Wong', role: 'Head of Revenue', email: 'bryan.wong@example.com' }}
  userMenu={[{ id: 'logout', label: 'Log out', icon: SignOut }]}
  collapsedStorageKey="sidebar-collapsed"
/>
```

## Replaces
- `.c-sidebar-shell`, `.c-sidebar` (`.is-collapsed`), `-header`, `-logo`, `-logo-live-wrap`, `-logo-home`, `-logo-lockup`, `-logo-fallback`, `-logo-collapsed`, `-logo-mark-wrap`, `-logo-swap`, `-section`, `-divider`, `-item` (`.active`, `.soon`, `.parent-active-child`, `span.label`, `span.count`), `-footer`, `-scroll` (`.is-swapping`), `-toggle`, `-hover-label`, `-hover-text`
- `.c-pod-strip` (`.is-overflow`), `-scroller` (`.has-more-start`, `.has-more-end`), `-row`, `-pill`, `-chip` (`.is-current`, `.is-soon`), `-card`, `-card-title`, `-card-desc`
- `.c-sidebar-user`, `-user-avatar`, `-user-text`, `-user-name`, `-user-role`, `.c-user-menu`, `-item`, `-divider`
- `.c-nav-parent-toggle`, `.c-nav-children` (`.is-open`), `-children-inner`, `.c-nav-child` (`.active`)
- The gallery's sidebar, Department strip and account menu scripts
