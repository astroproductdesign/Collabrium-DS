# Card

## Purpose
The base surface for grouping content: dashboard tiles, list items, panels. Neutral-1, a 1px Neutral-3 border, radius-lg, shadow-1 and 16px padding. It comes with a header (an optional icon chip, a title and a subtitle), a footer, an element accent or tint, and a grid (`CardGrid`) that lays cards out. `IconChip` is also exported on its own.

## Use when
- You are grouping related content into a tile or panel.
- A tile should open something: give its title an `href` or an `onClick`.
- A card should say which department owns it: an icon chip in the header, an accent border, or (sparingly) a tint.
- You want a feature tile (title, description, three points, one call to action): `minWidth="functional"`, a `CardList` and a Button.
- A roster of cards has a bulk action (a toolbar, "Delete 3 selected") that acts on the ticked ones: give each card a `selectLabel`.

## Don't use when
- Nothing else on the page acts on ticked cards: leave out `selectLabel`. A checkbox with no bulk action to feed is a dead control.
- You need a running list of line items (Price summary card), or any of the card variants that have their own sections. They extend this card and are separate components.
- You are picking one option from a group of large cards: use Radio Card.

## Props
| Name | Options | Default | Description |
|---|---|---|---|
| `Card` `surface` | `default`, `warm` | `default` | The fill. `warm` is the warm canvas card fill with no border. |
| `Card` `accent` | `fire`, `wood`, `earth`, `water`, `gold` | none | A 3px top border in the element's colour. |
| `Card` `tint` | `fire`, `wood`, `earth`, `water`, `gold` | none | Fills the whole card with the element's `-bg` tint. |
| `Card` `selectLabel` | `string` | none | Makes the card selectable and names its checkbox, e.g. "Select Q3 plan". |
| `Card` `selected`, `defaultSelected`, `onSelectedChange` | `boolean`, `boolean` (false), `(selected) => void` | none | The selected state: control it, or let the card keep its own. Only with `selectLabel`. |
| `Card` `minWidth` | `base`, `functional` | `base` | The narrowest the card gets: 240px, or 280px for a feature tile. |
| `CardList` `items` | `ReactNode[]` | required | The points of a feature tile, one per line. |
| `CardTitle` `children` | `ReactNode` | required | The title text. |
| `CardTitle` `headingLevel` | `2` to `6` | `3` | The heading level. The look is always h5 (16px, 700). |
| `CardTitle` `href` | `string` | none | Makes the title a real link stretched over the whole card. |
| `CardTitle` `onClick` | `() => void` | none | Makes the title a real button stretched over the whole card. |
| `CardHeader` `title`, `subtitle` | `ReactNode` | `title` required | The title, and an optional caption line under it. |
| `CardHeader` `icon` | Phosphor `Icon` | none | The icon in the chip. Leave out for no chip. |
| `CardHeader` `element` | `fire`, `wood`, `earth`, `water`, `gold` | `water` | The chip's element colour. |
| `CardHeader` `headingLevel`, `href`, `onTitleClick` | as `CardTitle` | none | Passed to the title. |
| `IconChip` `icon` | Phosphor `Icon` | required | The icon, drawn Fill. |
| `IconChip` `element` | `fire`, `wood`, `earth`, `water`, `gold` | `water` | The element that owns the content. |
| `CardGrid` `columns` | `base`, `functional` | `base` | The narrowest a column gets: 240px, or 280px for cards that need more room. |

## Rules
1. A card is 100% of its grid cell and never narrower than 240px. The grid, not the card, decides the number of columns (`repeat(auto-fill, minmax(240px, 1fr))`). In a row that mixes cards with different floors, use the largest. (DESIGN-SYSTEM.md 2670–2700.)
2. Every card in a grid row is as tall as the tallest. Its own content stays at the top; the extra height is absorbed below. A card's call to action sits at the bottom of the card.
3. A clickable card is made by its title: a real link (`href`) or button (`onClick`) stretched over the whole card, not a click handler on a `div`. The card raises to shadow-2 on hover and shows the shadow-focus halo when the title has keyboard focus. Other buttons inside the card stay separate and reachable. (Decided in review: Q-CARD-1.)
4. The title is a real heading. The level is yours to set (3 by default) so the card fits the page's outline; the look is always h5. (Q-CARD-2.)
5. The icon chip is 36×36px, radius-sm, the icon in the element's colour on a 12% tint of it, drawn Fill (Tier 2: it is a department indicator). It is not the 8% `-bg` tint, which is the full-card tint. (Q-CARD-3.)
6. An accent is a 3px top border in the element's colour; the rest of the card stays neutral. A tint fills the whole card with the element's `-bg` tint and keeps the border. Use the tint sparingly, and only for content the element owns. (Q-CARD-3.)
7. The header sits 8px above what follows it: the card's own gap, with no margin of its own, and nothing under it when it is the last thing in the card. (Decided 2026-10-30, Q-CARD-5 and Q-CARD-7: the source's 16px margin plus the 8px gap made 24px, and the DLS text says 16px; the user chose 8px. The Timeline widget already overrides the margin to 0.)
8. The footer has 16px above it, a 1px Neutral-3 line, 12px of padding, caption type and Neutral-5.
9. The sizes the DLS gives as plain numbers (the 240px and 280px column floors, the 3px accent border, the 36px chip and its 12% tint) are local values in the card's CSS, not tokens. (Decided 2026-10-30, Q-CARD-6.)
10. A selectable card carries the real Checkbox box (18×18px, Obsidian when checked), 16px in from the top and **left**, hidden at rest and shown on hover and while selected. All of the card's content (title or header, text, footer) sits in one column to its right, 16px clear of the box, so the description lines up with the heading, and an icon chip moves along with the title. That room is kept at rest too, so nothing jumps when the checkbox appears. (The DLS puts the checkbox top right with 24px of room on the title's right; the left, the 16px gap and the aligned column were decided 2026-10-30, Q-SEL-4.)
11. Selected is a persistent state: a 2px Obsidian border (the padding drops 1px a side so the content does not move) and shadow-3, with the checkbox visible and checked. Nothing else changes: no tint, no recoloured text. The border swap is instant, not animated, because border width and padding cannot be animated together without the content jumping. Hover and the move into or out of Selected animate the shadow and border colour over `--duration-base` with `--ease-settle`.
12. The checkbox also shows while it or anything in the card has keyboard focus, and always on a touch screen (`hover: none`). A focused selected card still shows the focus halo over its Selected shadow. The checkbox keeps Checkbox's 2px top nudge. (Decided 2026-10-30: Q-SEL-1, Q-SEL-2; Q-CHK-6.)
13. A feature tile is a Card with `minWidth="functional"` (280px: three points and a full-width button need the room), a title, a description, a `CardList` of three points and a Button. Each point is a check-circle (Fill, Obsidian, 16px: Tier 2) and body2 Neutral-9 text, centred on one line, 8px apart. The button is the real Button, Primary and md, as a direct child of the card, stretched to its full width with the label centred. The list takes the room left in the card, so the button is at the bottom of every card in a row. Put these cards in a `CardGrid columns="functional"`. (DESIGN-SYSTEM.md 2641; the DLS adds USP as a variant of Card, not a separate component.)
14. In forced-colours mode the focus halo (a shadow) becomes a 2px Highlight outline. (Q-CARD-4.)

## Accessibility
- The title is a heading at the level you give it. A clickable card is a real link or button named by the title text.
- Keyboard: Tab reaches the checkbox (when selectable), then the title's link or button; Enter follows or presses it; Space presses a button or ticks the checkbox.
- The checkbox is a real checkbox named by `selectLabel`; its checked state is the selected state. Selected is shown by border, shadow and a checked box together, not by colour alone.
- The icon chip is `aria-hidden`; the title says the same in words.
- A card with no link or button is not a tab stop.

## Motion
The shadow moves from shadow-1 to shadow-2 on hover over `--duration-base` with `--ease-settle`. On a selectable card the checkbox also fades in over `--duration-fast` with `--ease-standard`, and Selected settles the shadow and border colour. Nothing moves, so there is no reduced-motion variant.

## Example
```tsx
<CardGrid>
  <Card accent="wood">
    <CardHeader icon={Drop} element="water" title="Weekly report" subtitle="Updated 2 hours ago" href="/reports/weekly" />
    <p>Orders are up 12% on last week.</p>
    <CardFooter>Owner: Lina M.</CardFooter>
  </Card>
</CardGrid>
```

## Replaces
`.c-cards`, `.c-cards-functional`, `.c-card`, `.c-card.warm`, `.c-card-header`, `.icon-chip`, `.c-card-footer`, `.c-card-accent`, `.c-card-interactive`, `.c-card-selectable`, `.c-card-select`, `.c-card.is-selected`.
