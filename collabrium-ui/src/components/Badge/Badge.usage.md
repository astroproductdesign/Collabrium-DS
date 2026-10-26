# Badge

## Purpose
A small pill that shows the status or tone of something: Active, Pending,
Failed. Six tones (Neutral, Success, Error, Warning, Info, Selected) and an
optional leading icon. Not interactive.

## Use when
- A row, card or header needs to show a state at a glance (Live, Paused, Blocked, Approved).
- A table column holds statuses (Active, Pending, Failed).
- A short system-generated fact needs to stand out next to a title (a count, "Highest").

## Don't use when
- **It says who owns something** (Fire · Marketing). Use Tag (not converted yet): ownership is not a status.
- **It is clickable or removable.** Use Chip (not converted yet) or Button. A badge is never interactive.
- **The message needs a sentence.** Use Info Banner or Toast (not converted yet).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'neutral'` \| `'success'` \| `'error'` \| `'warning'` \| `'info'` \| `'selected'` | **required** | The status or tone. `neutral` = plain state; `success` = done or healthy; `error` = failed or blocked; `warning` = needs attention soon; `info` = neutral information worth noticing; `selected` = the chosen item in a set. |
| `children` | text | **required** | The label. 20 characters at most. May include visually hidden text for screen readers. |
| `icon` | a Phosphor icon component, e.g. `CheckCircle` | — | Icon before the label, same colour as the text, sized to it. |
| `iconWeight` | `'fill'` \| `'regular'` | `'fill'` | `fill` for status icons (Tier 2), as every DLS badge icon is. `regular` only for a functional icon (Tier 1). |
| `id`, `title`, `aria-*`, `data-*`, … | native | — | Passed to the `<span>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the `<span>` element.

## Rules
1. **Badge is for status, Tag is for ownership.** Live, Paused, Blocked are badges; Fire · Marketing is a tag.
2. **20 characters at most.** The badge never wraps and never truncates. If a label is longer, rewrite it.
3. **Never a solid brand fill with white text.** Use the six tones as shipped; several accents fail contrast that way at this size.
4. **The text carries the meaning, not the colour.** "Failed" in red, never a red badge with no word.
5. **Spacing between badges is 4px** (`spacing-4`), set by the layout around them, not by the badge.
6. **Icons follow their own tier.** Status icons such as `CheckCircle` are Fill (the default), 14px.
7. **22px tall, caption type (12px), weight 700.** The height is fixed, so a label never wraps.
8. **Success and Warning text are darker than their fill colour** (`--color-green-text`, `--color-amber-text`), because the full-strength colours fail contrast on their own tints at this size. Error text stays the full Red (`--color-red`, 3.2:1 on its tint): a decision of 2026-10-26, not to be raised again. Neutral text stays Neutral-9.

## Accessibility
- Renders a plain `<span>`. It is not focusable and has no role; screen readers read its text in place.
- The meaning is in the text. The colour only repeats it, so the badge works in forced colours and for colour-blind users (the 1px border stays visible in forced colours).
- The icon is `aria-hidden`.
- Add visually hidden text when the visible label needs context, e.g. `Highest<span className="sr-only"> CTR in this comparison</span>`.
- No live region. If a badge changes while the user is on the page (Pending to Active), announce the change where it happened, not through the badge.
- Contrast: Neutral, Warning, Info and Selected pass AA. Success uses the darker green for this reason. Error text is the full Red, 3.2:1 on its tint (accepted 2026-10-26). Success text uses `--color-green-text` (4.7:1 on its tint).

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
