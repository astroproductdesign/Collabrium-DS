# Switch

## Purpose
A real `<input type="checkbox" role="switch">` inside its `<label>`: one setting that is on or off and applies the moment it is flipped. It is a 40×24px track with an 18px thumb that slides from the left (off, Neutral-4) to the right (on, Green), with a label and an optional description.

## Use when
- A setting applies immediately, with no separate Save step ("Auto-publish reports", "Email notifications").

## Don't use when
- **The choice is submitted with a form, or sits in a form that has a Save.** Use Checkbox: a Switch implies the change is already applied, which contradicts a deferred save.
- **The person picks one option from several.** Use Radio.
- **The person picks several options from a list.** Use Checkbox.
- **The control switches a view.** Use Segmented Control (not converted yet).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | text | **required** unless `aria-label` is set | The visible label. Name what the switch controls ("Email notifications"), never its state ("On"/"Off"). |
| `description` | text | — | Optional helper line under the label (caption, Neutral-5). Only with `label`. |
| `aria-label` | text | **required** when there is no `label` | Names the switch when a visible label is impossible. |
| `disabled` | boolean | `false` | 50% opacity, not-allowed cursor, not focusable. |
| `checked`, `defaultChecked`, `onChange`, `name`, `form`, `required`, … | native | — | Exactly as on `<input type="checkbox">`. The state lives in the input, so an uncontrolled switch needs no React state. |
| `id`, `aria-*`, `data-*`, … | native | — | Passed to the `<input>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the `<input>`.

## Rules
1. **Label what it controls, not its state.** "Email notifications", not "On". The track and the thumb already say the state.
2. **It applies at once.** No Save step. If the choice is submitted later, it is a Checkbox.
3. **The state is the thumb's position and the track's colour**: left on Neutral-4 is off, right on Green is on. Never recolour the track for any other meaning.
4. **The contrast is low and recorded.** The Neutral-1 thumb on the Green track measures 2.35:1, and on the off track 1.88:1, under the 3:1 floor. The thumb's travel is what separates the states, and the label always names the control. Do not drop the label.
5. **The whole row is the target**, not only the track.
6. **Hover and pressed deepen the thumb's shadow** (shadow-1, then shadow-2, then shadow-3). The track's fills do not change. The DLS has neither state. (Provisional, Q-SWITCH-1.)
7. **Keyboard focus shows a 2px Obsidian ring** around the track, as on Checkbox and Radio. The DLS has none. (Provisional, Q-SWITCH-1.)
8. **Disabled is 50% opacity** on the whole row, a not-allowed cursor, and not focusable. It does not react to hover or press.
9. **In forced-colours mode the track is outlined (off) or Highlight (on)**, with a CanvasText or HighlightText thumb, so the two states still differ. (Provisional, Q-SWITCH-2.)
10. **Reduced motion makes the move instant.** The travel is the state change, so it is removed, not turned into a fade. (Provisional, Q-SWITCH-2.)
11. **There is no error state.** A switch always has a value, and a setting that applies at once cannot be submitted wrong.

## Accessibility
- A native checkbox with `role="switch"`: Space toggles it, and assistive tech announces "switch", its label and on or off. The state comes from the input's `checked`, never from a separate `aria-checked`.
- The track and the thumb are `aria-hidden`; the input is visually hidden but stays focusable.
- The label names the input (`aria-labelledby`), and the description is attached with `aria-describedby`.
- With no visible label, `aria-label` is required.
- Focus ring: 2px Obsidian, 2px offset, on the track.
- The change is not announced by a live region. Press and the native switch semantics carry it.

## Motion
The track's colour fades over `--duration-base` with `--ease-standard`. The thumb slides on `left` over `--duration-base` with `--ease-settle` (the anchored-arrival easing), and its shadow over `--duration-fast`. Under reduced motion all of it is instant (rule 10).

## Example
```tsx
import { Switch } from '@collabrium/ui';

<Switch label="Auto-publish reports" description="Publish as soon as a report is approved" defaultChecked />
<Switch label="Beta features" checked={beta} onChange={e => setBeta(e.target.checked)} />
```

## Replaces
`.c-choice.switch`, `.c-switch-track` (and `.on`), `.c-switch-thumb` (the shared `.c-choice` row and its `.text`, `.label` and `.desc` are Checkbox's, Radio's and this component's).
