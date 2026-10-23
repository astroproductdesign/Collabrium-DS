# Button

## Purpose
A real `<button>` that starts an action: save, add, open, continue. Three
levels of emphasis (Primary, Secondary, Ghost), three sizes, an icon-only
form, a loading state and the CTA beacon.

## Use when
- The user starts an action on the current page (submit a form, open a panel, delete a row).
- You need one main action in a region (Primary) with supporting actions beside it (Secondary, Ghost).
- A toolbar or table row needs a compact action (Ghost, often `iconOnly`, `size="sm"`).

## Don't use when
- **It goes to another page or URL.** Use a link, not a button. A Link component isn't converted yet; the DLS "Link" button variant has no CSS (see MIGRATION-LOG Q-BTN-2).
- **It is destructive** (delete, revoke) and needs the DLS Danger style. Danger isn't built yet (Q-BTN-2). Until then, use Secondary and confirm in a dialog.
- **It is a choice between options.** Use Segmented Control, Radio or Chip (not converted yet).
- **It shows status.** Use Badge or Tag (not converted yet).
- **You want an element or department colour as the fill.** Never: Obsidian is the only action colour (DLS Component Rule 2).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'primary'` \| `'secondary'` \| `'ghost'` | **required** | Emphasis. `primary` = the one main action in a region; `secondary` = actions beside a primary; `ghost` = low-emphasis, toolbar and table-row actions. |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | Height 32 / 40 / 48px. `sm` for dense rows and toolbars, `lg` for prominent standalone actions. |
| `children` | text | — | The label. Short verb phrase ("Save brief"). Not used with `iconOnly`. |
| `leadingIcon` | a Phosphor icon component, e.g. `Plus` | — | Icon before the label, same colour, sized to the type. |
| `leadingIconWeight` | `'regular'` \| `'fill'` | `'regular'` | `regular` for actions (Tier 1). `fill` only for status icons such as `CheckCircle` (Tier 2). |
| `trailingArrow` | `'down'` \| `'right'` | — | Arrow after the label pointing to where the next step is. Nods while `beacon` is on. |
| `iconOnly` | `true` | — | Square button, no visible label. Needs `icon` and `aria-label`. |
| `icon` | a Phosphor icon component | — | The icon for `iconOnly`. Functional (Tier 1) icons only, e.g. `DotsThree`, `X`, `PencilSimple`, `Trash`. Always Regular. |
| `aria-label` | text | — | Required with `iconOnly`. Names the action ("More options"). |
| `loading` | boolean | `false` | Centred spinner replaces the content; fill and width stay the same; clicks are ignored; the button keeps focus and its name. |
| `disabled` | boolean | `false` | Neutral-4 fill, not-allowed cursor, not focusable. |
| `beacon` | `'off'` \| `'on'` \| `'static'` | `'off'` | CTA beacon. `on` = three rings (4.2s), then stops by itself. `static` = documentation and tests only. Primary with a label only. |
| `onBeaconChange` | `({ armed, reason }) => void` | — | Called when the beacon starts or stops. `reason` is `host`, `hover`, `touch`, `focus`, `click`, `cap` or `replaced`. |
| `type` | `'button'` \| `'submit'` \| `'reset'` | `'button'` | Set `submit` for a form's submit action. |
| `onClick`, `name`, `value`, `form`, `aria-*`, `data-*`, … | native | — | Passed to the `<button>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the `<button>` element.

## Rules
1. **One Primary per screen or card region.** If two actions feel equally important, one of them is Secondary.
2. **Obsidian is the only action colour.** No element or department colours on buttons.
3. **Icon-only buttons always have an `aria-label`** and use a functional (Tier 1) icon.
4. **Leading icon weight follows the icon's tier**, not the button: `Plus` is Regular, `CheckCircle` stays Fill.
5. **CTA beacon:**
   - Use it on one Primary at a time on the whole page. Turning one on stops any other.
   - Turn it on right after the step that makes it relevant. Never on page load or a timer.
   - Pair it with a trailing arrow.
   - Never use it on Secondary, Ghost, icon-only or disabled buttons; the component ignores it there.
   - Don't move focus to a beaconed button or announce it.
   - Re-arm it only when a new reason arrives: set `beacon` to `'off'`, then back to `'on'`.
   - Light surfaces only (Neutral-1, Neutral-2, canvas-warm, canvas-warm-card).
   - Keep 12px clear around the button so the ring isn't cropped.
6. **Spacing between buttons** comes from the layout around them, not from the button.

## Accessibility
- Renders a native `<button type="button">`, so Enter and Space work and it is in the tab order.
- Focus-visible: 2px Obsidian outline, 2px offset.
- Icons are `aria-hidden`. The name comes from the label, or from `aria-label` when `iconOnly`.
- Disabled uses the native `disabled` attribute, so the button leaves the tab order.
- Loading sets `aria-busy="true"` and `aria-disabled="true"`. The button stays focusable and keeps its name; the label is hidden visually with opacity, so screen readers still read it. There is no live region; announce the result of the action, not the spinner.
- The beacon is purely visual: no live region, no `aria-describedby`, no change to the name.

## Motion
- **Background colour on hover, press and disabled:** `duration-fast` (140ms), `ease-standard`.
- **CTA beacon:**
  - The ring and the arrow nod run for 1.4s × 3 cycles = 4.2s, with `ease-standard`, then stop without JavaScript.
  - Hover, focus or press hides the beacon at once, and the component then turns it off.
  - Under `prefers-reduced-motion: reduce`, there is no pulse and no nod. A steady 2px ring shows for the same 4.2s instead.
- **Loading spinner:** rotates on `duration-ambient` (900ms), linear, the same spinner as Search input. It keeps turning under reduced motion; this is open question Q-BTN-3.
- **Forced colours:** the browser removes the beacon ring and nothing replaces it, on purpose. An outline would read as focus.

## Example

```tsx
import { Button } from '@collabrium/ui';
import { Plus, DotsThree } from '@phosphor-icons/react';

export function BriefActions({ saving, onSave }: { saving: boolean; onSave: () => void }) {
  return (
    <>
      <Button variant="primary" loading={saving} onClick={onSave}>Save brief</Button>
      <Button variant="secondary" leadingIcon={Plus}>Add audience</Button>
      <Button variant="ghost" size="sm" iconOnly icon={DotsThree} aria-label="More options" />
    </>
  );
}

// CTA beacon: turn it on when the AI has filled the brief.
<Button variant="primary" trailingArrow="down" beacon={briefFilled ? 'on' : 'off'}>
  Next: audience
</Button>
```

## Replaces (old classes from components.css)

| Old | New |
|---|---|
| `.c-btn` | `<Button>` |
| `.c-btn-primary` / `.c-btn-secondary` / `.c-btn-ghost` | `variant="primary" \| "secondary" \| "ghost"` |
| `.c-btn-sm` / `.c-btn-md` / `.c-btn-lg` | `size="sm" \| "md" \| "lg"` |
| `.c-btn-icon` + `<i class="ph ph-…">` | `iconOnly icon={…} aria-label="…"` |
| `<i class="ph ph-plus"></i>` before the label | `leadingIcon={Plus}` |
| `<i class="ph ph-arrow-down" aria-hidden="true"></i>` after the label | `trailingArrow="down"` |
| `.c-btn-beacon` + `CBeacon.arm()` / `CBeacon.disarm()` | `beacon="on"` / `beacon="off"`, `onBeaconChange` |
| `.c-btn-beacon.is-static` | `beacon="static"` |
| `c-btn-beacon-change` DOM event | `onBeaconChange` |
| `disabled` attribute | `disabled` |
| (no old class) | `loading` |
| `.c-btn[hidden]` | native `hidden` prop (still honoured) |

Source: collabrium-dls/components.css lines 31–126 and DESIGN-SYSTEM.md "Button" (lines 2333–2499).
