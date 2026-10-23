# Badge

## Purpose
A small pill that shows the status or tone of something: Active, Pending,
Failed. Five tones (Neutral, Success, Error, Warning, Selected) and an
optional leading icon. Not interactive.

## Use when
- A row, card or header needs to show a state at a glance (Live, Paused, Blocked, Approved).
- A table column holds statuses (Active, Pending, Failed).
- A short system-generated fact needs to stand out next to a title (a count, "Highest").

## Don't use when
- **It says who owns something** (Fire · Marketing). Use Tag (not converted yet): ownership is not a status.
- **It is clickable or removable.** Use Chip (not converted yet) or Button. A badge is never interactive.
- **The message needs a sentence.** Use Info Banner or Toast (not converted yet).
- **You need the Info tone.** It has no CSS yet (open question Q-BADGE-3). Use Neutral until it ships.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'neutral'` \| `'success'` \| `'error'` \| `'warning'` \| `'selected'` | **required** | The status or tone. `neutral` = plain state; `success` = done or healthy; `error` = failed or blocked; `warning` = needs attention soon; `selected` = the chosen item in a set. |
| `children` | text | **required** | The label. 20 characters at most. May include visually hidden text for screen readers. |
| `icon` | a Phosphor icon component, e.g. `CheckCircle` | — | Icon before the label, same colour as the text, sized to it. |
| `iconWeight` | `'fill'` \| `'regular'` | `'fill'` | `fill` for status icons (Tier 2), as every DLS badge icon is. `regular` only for a functional icon (Tier 1). |
| `id`, `title`, `aria-*`, `data-*`, … | native | — | Passed to the `<span>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the `<span>` element.

## Rules
1. **Badge is for status, Tag is for ownership.** Live, Paused, Blocked are badges; Fire · Marketing is a tag.
2. **20 characters at most.** The badge never wraps and never truncates. If a label is longer, rewrite it.
3. **Never a solid brand fill with white text.** Use the five tones as shipped; several accents fail contrast that way at this size.
4. **The text carries the meaning, not the colour.** "Failed" in red, never a red badge with no word.
5. **Spacing between badges is 4px** (`spacing-4`), set by the layout around them, not by the badge.
6. **Icons follow their own tier.** Status icons such as `CheckCircle` are Fill (the default).

## Accessibility
- Renders a plain `<span>`. It is not focusable and has no role; screen readers read its text in place.
- The meaning is in the text. The colour only repeats it, so the badge works in forced colours and for colour-blind users (the 1px border stays visible in forced colours).
- The icon is `aria-hidden`.
- Add visually hidden text when the visible label needs context, e.g. `Highest<span className="sr-only"> CTR in this comparison</span>`.
- No live region. If a badge changes while the user is on the page (Pending to Active), announce the change where it happened, not through the badge.
- Contrast, measured on a white page: Neutral, Warning and Selected pass AA easily (17:1 and up). Success (full-strength Green on its tint, about 2.1:1) and Error (Red on its tint, about 3.2:1) are below AA's 4.5:1 for 11px text. DESIGN-SYSTEM.md asks for a darker green for Success; Error has no fix in either source (open question Q-BADGE-5).

## Motion
None. Badge doesn't animate.

## Example

```tsx
import { Badge } from '@collabrium/ui';
import { CheckCircle } from '@phosphor-icons/react';

<Badge variant="success" icon={CheckCircle}>Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
```

## Replaces
- `.c-badge`
- `.c-badge-neutral`, `.c-badge-success`, `.c-badge-error`, `.c-badge-warning`, `.c-badge-selected`
