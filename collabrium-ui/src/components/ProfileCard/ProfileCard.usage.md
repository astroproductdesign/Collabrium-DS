# Profile card

## Purpose
One person across every platform they have connected: a Controls row (Select
checkbox and a kebab menu), a centred identity block (a 56px avatar, the
name, a Meta line and a Persona line) and a platform list where each row
shows the platform, the follower count (a link to the profile) and a tier.
A variant of Card, at the base 240px floor.

⚠️ Designed from scratch in the DLS (no source in the brand deck or a
teammate's build): treat it as a first pass needing design review.

## Use when
- A roster of talent or influencers needs one tile per person, with their reach on each platform.
- People pick several profiles for a bulk action (`selectable`).

## Don't use when
- **You list accounts, not people** (one row per platform account). That is a different grain: don't mix it with Profile cards in one roster.
- **You need a plain tile with a heading and text.** Use Card.
- **You pick one profile from a group.** Use Radio Card (not converted yet).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `name` | text | **required** | The full name. The avatar's initials come from it. |
| `photo` | URL | — | A photo drawn over the initials. Without it the initials show, permanently. |
| `age`, `gender`, `location` | number, text, text | — | The Meta line, "20 · Female · Kuala Lumpur". A missing part is dropped with its separator. |
| `personas` | text[] | `[]` | The Persona line, sorted alphabetically. Empty and the line is removed. |
| `platforms` | `{ platform, followers, href, role? }[]` | `[]` | One row each, sorted by platform name. `followers` is a number; the tier is computed from it. `role: 'koc' \| 'seeder'` for a role tier. Empty and the list is removed. |
| `headingLevel` | `2` \| `3` \| `4` \| `5` \| `6` | `3` | The name's heading level. The look is always the card title's (h5). |
| `href` | URL | — | Makes the name a link stretched over the card: the card raises on hover and takes the focus halo. |
| `onOpen` | `() => void` | — | Makes the name a button stretched over the card. Use `href` when it navigates. |
| `selectable` | boolean | `false` | Shows the Select checkbox, for a roster a bulk action acts on. The kebab is always there. |
| `selected`, `defaultSelected`, `onSelectedChange` | boolean, boolean, `(selected) => void` | —, `false`, — | The selected state: control it with `selected`, or let the card keep its own from `defaultSelected`. |
| `onMenuAction` | `(action: 'view' \| 'pin' \| 'edit' \| 'sync' \| 'archive') => void` | — | Called with the action picked from the kebab menu. |
| `id`, `aria-*`, `data-*`, … | native | — | Passed to the card's `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the card's `<div>`. `profileInitials(name)` and
`profileTier(followers)` are exported for use elsewhere.

## Rules
1. **One card is one person**, across every platform they have connected, never one account.
2. **Tiers are computed, never chosen:** Nano under 5,000 (Wood), Micro 5,000–19,999 (Earth), Mid 20,000–99,999 (Water), Macro 100,000–499,999 (Fire), Mega 500,000 and up (Gold). KOC and Seeder are the only tiers a person assigns: a plain Tag with no dot.
3. **The follower count is the row's link.** It underlines on hover and focus and never changes its text. Its accessible name is "Instagram, 31K followers".
4. **Counts are abbreviated and rounded down:** 720, 1.3K, 31K, 99K, 220K, 1.2M. Rounding down means a count never overstates the followers or reads as the next tier (99,999 is "99K", Mid). (Decided 2026-11-04.)
5. **Rows are sorted by platform name, and personas alphabetically,** whatever order they come in.
6. **Empty parts are removed, not left blank:** a missing Meta part drops with its separator; no personas removes the line; no platforms removes the list.
7. **Initials are two letters from the name:** the first letter of the first and last words; after a Malay or Indian naming particle (bin, binti, b., bt., a/l, a/p) the word that follows it ("Muhammad Amirul Haqimi bin Abdul Rahman" is MA); one letter for a one-word name. Never a per-person colour.
8. **Both controls are always visible.** The kebab is there on every card; the checkbox only on a selectable one.
9. **Selected is a 2px Obsidian border, shadow-3 and the checked box**, no tint and no recoloured text. The border and padding change in the same instant, so nothing moves. Shadow-3 holds on hover, as on Selectable card; the focus halo shows over it. (Decided 2026-11-04.)
10. **Archive is not styled as destructive:** it is reversible.
11. **Put Profile cards in a `CardGrid`**; every card in a row matches the tallest, content at the top.
12. **The Meta and Persona lines are caption, 12px on 16px**, as the DLS text says, not the 14px its CSS draws. (Decided 2026-11-04.)
13. **After a naming particle, the second initial is the word right after it**, as the DLS example shows (MA), not the last word. (Decided 2026-11-04.)
14. **The menu works from the keyboard like a menu:** opening it puts focus on the first item; the arrow keys move through the items and wrap; Home and End jump to the ends; Tab leaves and closes it. (Decided 2026-11-04.)
15. **The avatar is 56px and the menu 160px**, kept as local values (no tokens). (Decided 2026-11-04.)

## Accessibility
- The name is a real heading (`headingLevel`), and with `href` or `onOpen` a real link or button stretched over the card.
- The checkbox is the real Checkbox, named "Select {name}". The kebab is a real button named "More options for {name}", with `aria-haspopup="menu"` and `aria-expanded`.
- The menu is `role="menu"` with five `menuitem` buttons. Opening it moves focus to the first item; Arrow Down and Up move through the items and wrap, Home and End jump to the ends. It closes on an outside click, Escape, Tab or a pick; Escape and a pick return focus to the kebab. Only one Profile card menu is open on the page at a time.
- A focused menu item shows the hover fill and the focus ring, drawn inside the item.
- The avatar is decorative (`aria-hidden`): the name says who it is.
- Each follower count is a link named "{platform}, {count} followers".
- The tier is a Tag; its word carries the meaning.
- In forced colours the kebab and the follower links take an outline on focus.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Hovering a card with `href` or `onOpen`; selecting or deselecting | The shadow and border colour settle. The border width and padding change at once. | `--duration-base` · `--ease-settle` |

Nothing travels, so there is no reduced-motion variant.

## Example

```tsx
import { CardGrid, ProfileCard } from '@collabrium/ui';

<CardGrid>
  <ProfileCard
    name="Amirah Yusof"
    age={20}
    gender="Female"
    location="Kuala Lumpur"
    personas={['Beauty']}
    platforms={[
      { platform: 'Instagram', followers: 31000, href: 'https://instagram.com/amirah' },
      { platform: 'TikTok', followers: 1200000, href: 'https://tiktok.com/@amirah' },
    ]}
    href="/talent/amirah"
    selectable
    onMenuAction={action => handle(action)}
  />
</CardGrid>
```

## Replaces
- `.c-card-profile`, `.c-card-profile.is-interactive`, `.c-card-profile.is-selected`
- `.c-card-profile-controls`, `.c-card-profile-select`, `.c-card-profile-more`, `.c-card-profile-menu`, `.c-card-profile-menu-item`
- `.c-card-profile-avatar`, `.c-card-profile-identity`, `.c-card-profile-meta`, `.c-card-profile-personas`
- `.c-card-profile-platforms`, `.c-card-profile-row`, `.c-card-profile-platform`, `.c-card-profile-followers`
