# Timeline

## Purpose
Stepper's read-only plan variant: a plan as an ordered list of items, each
with its own status, joined by a line whose colour and dash follow the item
above. Same family language as Stepper (one current step, completed /
upcoming, Obsidian for "now"); nothing in a Timeline advances a flow.

⚠️ Designed, not transcribed, in the DLS (from the design team's written
spec, based on MUI Timeline). The gallery shows one horizontal timeline; the
rest is built from DESIGN-SYSTEM.md's text and the CSS.

## Use when
- Campaign phases, project milestones, approval flows, deliverable schedules
  and roadmaps.

## Don't use when
- **Activity history** (what happened, who did it): Lists' Activity Log.
- **A numbered step-by-step flow**: Stepper's default variant.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `items` | `TimelineItem[]` | required | The plan, oldest first (below). |
| `aria-labelledby` / `aria-label` | string | — | Name it by its visible heading. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | S: plain dots only, caption descriptions, no Details. L: body1 headings, 32px dots. |
| `dot` | `'plain' \| 'icon' \| 'avatar'` | `'plain'` | One type per timeline. Icon and avatar at M and L. |
| `position` | `'right' \| 'left' \| 'alternate' \| 'alternate-reverse'` | `'right'` | Alternate from 600px of its own width, right below. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Horizontal from 600px (about six items), vertical below. Ignores `position`. |
| `datePosition` | `'above' \| 'below' \| 'opposite'` | `'above'` | One date place per timeline. |
| `steps` | `false \| { start?, total? }` | `{ start: 1, total: items }` | "Step n of total" before each heading; set both when a plan spans several lists. |
| `loading` | `{ count?, style? }` | — | 3–5 skeleton items, `content` or `block`. |
| `collapsed` | `{ earlier?, later? }` | — | Items folded behind a toggle under the list. |
| `moreLabels` | `{ collapsed, expanded }` | "Show more" / "Show less" | The description toggle. |

`TimelineItem`: `id`, `heading` (required); `status` (`completed`,
`current`, `upcoming`, `overdue`, `at-risk`, `skipped`, `blocked`),
`outlined` (no status: a ring), `date`, `opposite`, `statusLabel` (the
caption's semibold word), `note` (the rest of the caption), `description`,
`icon`, `avatar` (`{ initials, src? }`), `slot`, `details`, `href` /
`onClick`, `selected`, `progress` (current, 0–100), `step` (its number
in the whole plan, for a filtered list).

`TimelineFile` is the static file chip for a slot or details.

The ref goes to the `<ol>`; `style` and `className` aren't accepted.

## Rules
1. **Every item has a status; exactly one is current.** The status word
   appears once: in the caption (`statusLabel`) or a Badge in the slot.
   Plain-dot items always state it.
2. **Statuses:** completed (Green, check, solid line), current (Obsidian,
   ring and a short pulse, dashed or partial), upcoming (Neutral-5 ring,
   dashed Neutral-4, heading Neutral-5), overdue (Red, exclamation, dashed
   Red), at risk (Amber, warning, dashed Amber), skipped (Neutral-4 ring,
   minus, heading Neutral-5, no strikethrough), blocked (Red ring, lock,
   dashed Red).
3. **The line follows the item above** and ends at the last item, or at the
   last one shown when later items are folded.
4. **The "Due" rule:** a single date on an item that isn't done reads "Due 30
   Oct"; overdue reads "Due 15 Oct · Overdue"; completed and skipped show the
   plain date; ranges stay plain.
5. **One date place, one dot type** per timeline. No number dots.
6. **Only the body is clickable**, never the dot or the line; a clickable
   item holds no interactive slot. Selected: Neutral-2 and a 2px Obsidian
   start bar.
7. **Show more** appears only when the description is clipped; **Details**
   holds what isn't the summary (comments, files, history), M and L only.
8. **Partial lists:** collapse past about 20 items.
9. **Long spans** group by month or quarter: one Timeline per group under a
   Lists Section header, with `steps` carrying the count across.
10. **Empty and error** are the host's: an Empty state (section; error with
    Retry) in place of the list (decided 2026-11-12).
11. **Avatar dots** carry a corner badge only for statuses with a glyph
    (completed, overdue, at risk, skipped, blocked); current shows its ring
    (decided 2026-11-12).
12. **Partial-list toggles** take carets pointing where the items go: up for
    earlier, down for later (decided 2026-11-12).
13. **Card widget** (a recipe): an M Timeline in a Card under a compact
    Segmented Control (All, Open, Late, Done), a count that updates in place,
    "View all", 5–6 items. Pass the filtered items with their `step`, so
    "Step 4 of 6" keeps counting; an empty filter shows Lists' empty state
    ("No late phases") (decided 2026-11-12).

## Accessibility
- An `<ol role="list">` named by its heading; `aria-current="step"` on the
  current item.
- Each heading reads "Step n of total" first; current and upcoming add ",
  current" / ", upcoming"; the others say their status in the caption.
- The separator and the opposite column are hidden; the opposite's text is
  repeated in the body.
- Show more, Details and the list toggles carry `aria-expanded` and
  `aria-controls`; focus stays on the toggle. No live regions.
- Clickable bodies: Lists' row states and a 2px Obsidian inset focus ring;
  44px tall on touch, and the toggles' hit areas lift to 44px.
- Forced colours: filled marks are CanvasText discs, outlined marks rings,
  current Highlight; solid vs dashed lines survive.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Current | A pulse grows off the dot three times (about 4s), then rests as the ring | 1.5 × `--duration-ambient` · `--ease-standard` (recorded one-off) |
| Details | The caret turns | `--duration-fast` · `--ease-standard` |
| Loading | The bones shimmer | `--duration-ambient` |
| Reduced motion | No pulse, no shimmer; the caret flips at once | — |

## Example

```tsx
import { Timeline } from '@collabrium/ui';

<h4 id="milo">MILO Raya 2027</h4>
<Timeline
  aria-labelledby="milo"
  dot="icon"
  items={[
    { id: 'brief', heading: 'Brief', status: 'completed', date: '9 Oct', statusLabel: 'Done', icon: FileText },
    { id: 'idea', heading: 'Big idea', status: 'current', date: 'Due 23 Oct', statusLabel: 'In progress', icon: Lightbulb, progress: 60 },
    { id: 'deck', heading: 'Deck', status: 'upcoming', date: 'Due 4 Nov', icon: PresentationChart },
  ]}
/>
```

## Replaces
- `.c-timeline` (`-sm`, `-md`, `-lg`, `-icon`, `-avatar`, `-left`,
  `-alternate`, `-alternate-reverse`, `-horizontal`, `-has-opposite`,
  `-date-above`, `-date-below`, `-interactive`)
- `.c-timeline-item` (`.is-{status}`, `.is-end`, `.is-loading`),
  `-separator`, `-dot`, `-mark` (`.is-outlined`), `-badge`, `-connector`
  (`.is-partial`), `-content`, `-body`, `-title`, `-heading`, `-desc`
  (`.is-expanded`), `-caption`, `-status`, `-date`, `-slot`, `-more`,
  `-details-toggle`, `-details-caret`, `-details`, `-details-label`,
  `-details-files`, `-file`, `-opposite`, `-bone`, `-state`, `-reveal`;
  `window.cTimeline.init`
