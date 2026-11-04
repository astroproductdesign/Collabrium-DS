# Info Banner

## Purpose
An inline, persistent notification embedded at the top of a section or card:
a tone, a Fill icon, one message, up to two actions and, when dismissible, a
close button. Anchored to its container, full width, and it stays until the
condition resolves or the reader closes it. Distinct from Toast, which floats
at the viewport and leaves by itself.

⚠️ Designed from scratch in the DLS: treat it as a first pass needing design review.

## Use when
- A section or card needs to say something about itself that the reader should see while working there: a state, a limit, a tip.
- The system has a real, specific suggestion for the reader (`tone="ai"`).

## Don't use when
- **It is feedback on something the reader just did.** Use Toast (not converted yet).
- **It isn't inside a section or card.** A page-level message belongs in the page header.
- **It needs a destructive action.** Use a Modal (not converted yet) or a Button.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `children` | text | **required** | The message, 120 characters at most. |
| `tone` | `'neutral'` \| `'info'` \| `'success'` \| `'warning'` \| `'danger'` \| `'ai'` | `'info'` | The tone and its icon. |
| `dismissible` | boolean | `false` (always `true` for `ai`) | Shows the close button. |
| `actions` | `{ label, onClick }[]` | `[]` | Up to two; exactly one for `ai`. Labels 3 words at most. |
| `onDismiss` | `() => void` | — | Called once the banner has been dismissed and has left. |
| `icon` | Phosphor `Icon` | the tone's | Replaces the tone's icon. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the banner's `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the banner's `<div>`.

## Rules
1. **One message, no title.** The message is the only text.
2. **Tones:** Neutral (an FYI), Info (the default), Success (a healthy state), Warning (a limit coming), Danger (failing or blocking, usually persistent), AI (a suggestion).
3. **Persistent or dismissible.** Persistent when the banner describes a state the reader can't resolve by closing it; dismissible when it is helpful but not critical.
4. **Actions:** up to two, never destructive, after the message, styled exactly like it (underlined). Clicking one doesn't dismiss the banner.
5. **AI Recommendation:** a real signal behind it, exactly one action, always dismissible, one per section, never shown again in the session once dismissed.
6. **Placement:** at the top of its section or card, full width; at most two per section (one if either is AI), 8px apart.
7. **Content limits are authoring rules:** 120 characters for the message, 3 words for an action. The banner never truncates.
8. **The AI wash and ring reuse Prompt input bar's glow** (its gradient and keyframe), so the two never drift apart.

## Accessibility
- Persistent: `role="note"`; dismissible: `role="status"`; both `aria-live="polite"`.
- The close button is named "Dismiss". Escape dismisses a dismissible banner while focus is inside it.
- Focus never moves to a banner when it appears.
- The icon and the words carry the tone; colour is never the only signal.
- In forced colours the banner keeps a CanvasText edge; the AI wash and ring are hidden.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Appear | Slides down 8px and fades in | `--duration-base` · `--ease-standard` |
| Dismiss | Slides up and fades out; its space closes so banners below shift up | `--duration-base` · `--ease-standard` |
| AI Recommendation | The pastel wash and ring loop every 4s | Prompt input bar's glow |
| Reduced motion | Appears and leaves at once; the AI gradient holds still | — |

## Example

```tsx
import { InfoBanner } from '@collabrium/ui';

<InfoBanner tone="warning" dismissible actions={[{ label: 'Update billing', onClick: openBilling }]}>
  Your card on file expires this month.
</InfoBanner>
```

## Replaces
- `.c-banner`, `.c-banner-neutral`, `.c-banner-info`, `.c-banner-success`, `.c-banner-danger`, `.c-banner-warning`, `.c-banner-ai`
- `.c-banner .icon`, `.body`, `.message`, `.actions`, `.actions .action`, `.close` (with `.c-icon-btn`)
