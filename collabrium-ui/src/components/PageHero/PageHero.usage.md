# Page hero

## Purpose
The tinted title block at the top of a page about one subject (a project, a
person, a team): an ink-doodle illustration tile, a status pill with timing,
the h1, a description, actions on the right and an optional progress bar.

⚠️ Not in the DLS. Ported from Workdesk's project hero (`.wd-hero`) at the
user's request (2026-11-12); illustrations follow DESIGN-SYSTEM.md ›
Illustration.

## Use when
- A main page is about one subject and needs its title, its state and how far along it is, at a glance.

## Don't use when
- **The page is a plain list or tool with no subject.** Use PageHeader.
- **It titles a card or a section.** Use Card's title.
- **You want to surface one insight or risk.** Use HeroCard.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `title` | text | **required** | The page title. |
| `illustration` | `'ball'` `'balloon'` `'bell'` `'blocks'` `'calendar'` `'card'` `'chart'` `'envelope'` `'film'` `'lamp'` `'lantern'` `'megaphone'` `'moon'` `'news'` `'notes'` `'people'` `'phone'` `'play'` `'tag'` `'tv'` | — | The motif in the tile; none leaves the tile out. |
| `status` | `{ label, tone? }`, tone `neutral` \| `success` \| `warning` \| `error` \| `info` \| `purple` | — | Pill above the title with a coloured dot. |
| `meta` | text | — | Beside the pill: a date or timing. |
| `description` | text | — | One or two lines under the title. |
| `actions` | Buttons | — | Secondary `sm` Buttons, top right. |
| `progress` | `{ value, label, valueText? }` | — | Bar along the bottom; `value` 0–100. |
| `headingLevel` | `1` \| `2` \| `3` | `1` | 2 or 3 only inside a page with its own h1. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the root `<section>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<section>`.

## Rules
1. **One per main page, at the very top.** Not together with a PageHeader.
2. **Gradient Water-bg → Water-bg-strong, radius md, 24px padding** (16px under 640px).
3. **Tile:** 96px (`--ill-tile`), Ill-paper, 2px Neutral-1 border; 64px under 640px, where the floating accents drop out.
4. **Status pill** names a state, never a count. Tones map to Green, Amber, Red, Navy, Purple and Neutral-4.
5. **Title** h1, 8px under the pill and 4px over the description. **Description** body1, Neutral-5, at most 60 characters a line.
6. **Actions:** Secondary `sm` Buttons, 8px apart, at most three. They wrap under the text when the identity block can't keep 520px.
7. **Progress:** caption label and an h3 percentage over a 4px Neutral-1 track; Water-pastel → Navy fill. Always give a `valueText`.
8. **The space under the hero is the page layout's** (24px in Workdesk).
