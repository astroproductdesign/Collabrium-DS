# Hero Card

## Purpose
A promotional or insight tile, not a generic content card: an announcement,
a risk callout, an AI-generated insight. Eyebrow, heading, body, optional
media, an optional next-step line and a CTA, in four states: **Default**,
**Risk**, **AI (Dark)** and **Selected**. `CommandBrief` is the Selected
state as a centred pop-up dialog, opened from a Hero Card.

⚠️ Designed from scratch in the DLS: treat it as a first pass needing design review.

## Use when
- A dashboard or home screen surfaces one thing worth acting on: news, a risk, an insight.
- An insight needs a detail view without leaving the page (`CommandBrief`).

## Don't use when
- **It is ordinary content.** Use Card.
- **It is a starting point in a set.** Use Entry Card.
- **It is a message about the section the reader is in.** Use Info Banner.

## Props

`HeroCard`

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'default'` \| `'risk'` \| `'ai'` \| `'selected'` | `'default'` | The state. |
| `eyebrow`, `heading`, `body` | text | **required** | The heading clamps to two lines. |
| `headingLevel` | `2`–`6` | `3` | The heading's level; the look is always h4. |
| `media` | node \| `'placeholder'` | — | Your media, or the dashed placeholder. |
| `recommendation` | text | — | Default, Risk, AI: a short next-step line. |
| `banner` | node | — | Selected: an AI Recommendation `InfoBanner`. |
| `source` | text | — | Selected: where the content came from. |
| `cta` | `{ label, onClick }` | — | The call to action, with a trailing arrow. |
| `ribbon` | text | — | Default and Risk: a corner ribbon. |
| `onOpen` | `() => void` | — | Makes the heading a button over the card, to open the detail. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the card's `<div>`. `style` and `className` are not accepted. |

`CommandBrief` takes `open`, `onClose` and the same content props as a Selected card (`eyebrow`, `heading`, `body`, `banner`, `media`, `source`, `cta`).

## Rules
1. **Default:** the base Card recipe, with overflow hidden for the ribbon. The eyebrow is h2-sized, Neutral-5 and sentence case, a second headline more than a label.
2. **The heading clamps to two lines,** and keeps 60px clear of a ribbon. Together they guarantee the ribbon never covers it.
3. **The ribbon is Fire orange,** fixed, whatever the department; Default and Risk only.
4. **Risk:** Fire's 8% tint and an orange border; nothing else changes.
5. **AI (Dark):** Neutral-8, a faint white border, white heading, Amber eyebrow, 60% white body, a re-themed media placeholder. Its CTA is Secondary (Ghost has nothing to read against on dark; Primary is the screen's one main action).
6. **AI hover:** a pointer tilt up to 4deg and a 1.05 scale with shadow-2; it snaps in fast and settles out slower. The CTA's arrow nudges 4px.
7. **Selected:** up to 560px in the page flow, 24px padding, 16px gap, the small uppercase eyebrow, an AI Recommendation banner, 160px media, a source line and a Primary CTA. The only Hero Card with a Primary CTA.
8. **Command brief:** the Selected content centred over a scrim. It swings up into place; closing collapses the panel first, then fades the scrim. It closes on its close button, a scrim click or Escape.
9. **The CTA's arrow trails the label** on every state.
10. **The AI card's white-on-dark values are local to this component,** not new tokens.
11. **Opening the detail is `onOpen`:** the heading holds a real button stretched over the card, so it opens from the keyboard, and a Default or Risk card with `onOpen` raises to shadow-2 on hover. The pointer cursor appears only then, on the AI card too. (Decided 2026-11-05.)
12. **The Command brief is a dialog:** focus moves to its heading, Tab stays inside, focus returns on close, and its close is the real Button (ghost, sm, icon-only). (Decided 2026-11-05.)
13. **Reduced motion stops the tilt, the arrow nudge and the swing;** in forced colours every card keeps a CanvasText edge. (Decided 2026-11-05.)
14. **The recommendation and source lines keep 12px above and below,** on top of the card's gap. Intended. (Decided 2026-11-05.)
15. **Risk, AI (Dark), the tilt and the brief are built from the DS,** which the gallery doesn't show. (Decided 2026-11-05.)
16. **The media is at least 120px tall** (`--spacing-120`, was 112; Selected keeps 160px) and the ribbon's padding is 4px (`--spacing-4`, was 5). (Decided 2026-11-06, token audit.)

## Accessibility
- The heading is a real heading. With `onOpen` it holds a real button stretched over the card, so the card can be reached and opened from the keyboard; the CTA stays its own button above it.
- The ribbon is decorative.
- The Command brief is `role="dialog"`, `aria-modal`, named by its heading. Opening it moves focus to the heading; Tab stays inside; Escape, the close button or a scrim click closes it, and focus returns to what opened it.
- In forced colours every card keeps a CanvasText edge.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| AI hover | Tilt to 4deg and scale 1.05, shadow-2; arrow nudges 4px | in `--duration-fast` · `--ease-standard`; out `--duration-base` · `--ease-settle` |
| Brief opens | Scrim fades in; panel swings up from 8deg and 24px | `--duration-fast`; `--duration-base` · `--ease-standard` |
| Brief closes | Panel collapses, then the scrim fades | `--duration-fast`, then a `--duration-fast` delay |
| Reduced motion | No tilt, nudge or swing; the brief fades in place | — |

## Example

```tsx
import { CommandBrief, HeroCard, InfoBanner } from '@collabrium/ui';

<HeroCard variant="ai" eyebrow="AI insight" heading="Demand forecast updated" body="…"
  cta={{ label: 'View brief', onClick: () => setOpen(true) }} onOpen={() => setOpen(true)} />
<CommandBrief open={open} onClose={() => setOpen(false)} eyebrow="AI insight" heading="Demand forecast updated"
  body="…" banner={<InfoBanner tone="ai" actions={[{ label: 'Turn on auto-apply', onClick: autoApply }]}>…</InfoBanner>}
  media="placeholder" source="Source: Order management system · Updated 2 hours ago"
  cta={{ label: 'View full report', onClick: openReport }} />
```

## Replaces
- `.c-herocard`, `.c-herocard-risk`, `.c-herocard-ai`, `.c-herocard-selected`
- `.c-herocard-eyebrow`, `-heading`, `-body`, `-media`, `-recommendation`, `-cta`, `-ribbon`
- `.c-cbrief-scrim`, `.c-cbrief`, `.c-cbrief-close`, `.c-cbrief-source`, `.c-cbrief-cta`
