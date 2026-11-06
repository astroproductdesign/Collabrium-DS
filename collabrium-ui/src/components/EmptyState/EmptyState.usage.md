# Empty state

## Purpose
What a page, a section or a search shows when it has nothing to show: an icon,
a heading that names what is absent, a line on how to resolve it, and up to two
actions, centred. With `tone="error"` the same layout says the data failed to
load. It has no fill: it shows whatever surface it sits on (a page, a Card, a
table body).

## Use when
- **Full-page:** the whole page has no content yet (first visit, onboarding, zero state).
- **Section:** one part of a page has no content (a table with no rows, a list with no items, a card with no data).
- **Inline:** a search field, filtered table or dropdown found nothing for this query.
- **Error tone:** the data for a page or section failed to load.

## Don't use when
- **The data is still loading.** Use a skeleton or Loading State: an empty state says there is nothing, not "not yet".
- **The data failed to load and you would show `tone="empty"`.** A creation prompt over a broken fetch tells people nothing exists. Use `tone="error"`.
- **A search found nothing in data that has never existed.** Use Section, not Inline: inline is for query-specific no-results only.
- **You need a sentence of status inside content.** Use Info Banner or Toast (not converted yet).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'fullpage'` \| `'section'` \| `'inline'` | **required** | Where it sits. `fullpage`: the whole page is empty (64px icon, fills the viewport). `section`: one part is empty (48px icon, at least 240px tall). `inline`: a search or filter found nothing (body text and a link only). |
| `children` | React content | **required** on `inline`; optional otherwise | The body. Why it is empty and how to resolve it; for `error`, what happened and what to try. Leave it out only where the DLS draws an icon and heading alone (Price summary card's "No items added", Q-PRICE-6). |
| `tone` | `'empty'` \| `'error'` | `'empty'` | `error` when the data failed to load: the icon turns Red. Pass it explicitly; the component never infers it. Not on `inline`. |
| `icon` | a Phosphor icon component, e.g. `CloudSlash` | — | The picture above the heading, drawn Fill (Tier 2), Neutral-4 (Red for `error`). Not on `inline`. |
| `heading` | React content | — | Names what is absent ("No campaigns yet") or, for `error`, the content that failed to load. Drawn as h4. Not on `inline`. |
| `headingLevel` | `2` \| `3` \| `4` \| `5` \| `6` | `3` | The heading's level in the page outline. The look is always h4. Not on `inline`. |
| `primaryAction` | `{ label, onClick, icon?, loading? }` | — | The main action, a Primary button: a creation action for `empty`, Retry for `error`. Not on `inline`. |
| `secondaryAction` | `{ label, onClick, icon?, loading? }` | — | A lower-commitment action, a Ghost button ("Contact support" for `error`). On its own when the resolution is optional ("Browse templates"). Not on `inline`. |
| `linkAction` | `{ label, onClick }` | — | `inline` only: a text link ("Clear filters"). |
| `id`, `aria-*`, `data-*`, … | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<div>`.

## Rules
1. **Say what is missing and how to fix it.** "No campaigns yet: create your first one", never a bare "No data".
2. **Pass the tone.** `tone="error"` when the data failed to load; never `empty` over a broken fetch. The component does not detect it.
3. **Name the failure.** An error heading names the content that failed ("Campaigns didn't load"), never a generic "Something went wrong".
4. **Two actions at most: Primary, then Ghost.** Never three. A Ghost on its own is fine when the next step is optional or exploratory.
5. **Inline has a text link only.** No icon, no heading, never a Primary or Ghost button. The types enforce this.
6. **Spacing inside is fixed:** icon to heading 12px, heading to body 4px, body to actions 16px. The body always keeps its 16px bottom margin, as in the DLS.
7. **The body is capped at 360px (`--measure-sm`) and the whole state at 480px**, centred. Inline has no outer cap and a 320px body.
8. **Below 768px** the caps go, full-page and section padding drops to 24px / 16px, inline padding to 12px all sides, as the DS says (the DLS CSS has no rule; decided 2026-11-05), the full-page icon drops to 48px, and the actions stack full width, Primary above Ghost, 8px apart.
9. **Full-page is at least the viewport tall (100vh).** The DLS asks for the viewport minus the nav height; a container sets `--cui-empty-state-fullpage-min-height`, and App Shell will when it is converted. (Decided 2026-11-05.)
10. **The heading level follows the page.** Default 3; the look is always h4, as Card's title does. (Decided 2026-11-05.)
11. **The inline link has a hover and a focus ring:** Neutral-7 on hover, as Button's link, and the DLS focus ring; it keeps link2 (500), so Button's link (label2, 700) isn't reused. (Decided 2026-11-05.)
12. **One-off sizes stay local:** the 480px and 320px caps and the 240px floor. (Decided 2026-11-05.) The body cap is `--measure-sm` (360, was 380) and the link's underline offset `--spacing-4` (4, was 3). (Decided 2026-11-06.)

## Accessibility
- The heading is a real heading (`headingLevel`), so the empty state appears in the page's outline.
- The icon is decorative and `aria-hidden`; the heading and body carry the meaning.
- The actions are real Buttons; the inline link is a real `<button>`. It takes the DLS focus ring.
- No live region. If the empty or error state replaces content while the person is on the page, the host tells the person where it happened; the component itself announces nothing.
- Contrast: body Neutral-5 on white and on the warm canvas passes AA; the heading is Neutral-9.

## Motion
None. Empty state doesn't animate; Button's own transitions apply to its actions.

## Example

```tsx
import { EmptyState } from '@collabrium/ui';
import { CloudSlash, Plus } from '@phosphor-icons/react';

<EmptyState
  variant="section"
  icon={CloudSlash}
  heading="Nothing here yet"
  primaryAction={{ label: 'Connect a source', icon: Plus, onClick: connect }}
  secondaryAction={{ label: 'Browse templates', onClick: browse }}
>
  This is where your dashboards will live once you connect your first data source.
</EmptyState>
```

## Replaces
- `.c-empty`
- `.c-empty.is-fullpage`, `.c-empty.is-section`, `.c-empty.is-inline`, `.c-empty.is-error`
- `.c-empty-actions`, `.c-empty-link`
