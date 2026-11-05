# Stepper

## Purpose
Progress through a multi-step flow (onboarding, a multi-page form, a
checkout) as an ordered list of steps. Every step's state comes from one
`currentStep`: before it Completed, at it Active, after it Upcoming. Error
and Warning are flags on top of that. Read-only: it shows where the person
is, it doesn't move them.

⚠️ Designed from scratch in the DLS: treat it as a first pass needing design review.

## Use when
- A flow has a fixed number of ordered steps and the person should see how far along they are.

## Don't use when
- **It is a plan where each item has its own status** (campaign phases, milestones, approvals). Use Timeline.
- **It is a number field with − and +.** Use Quantity selector (some products call that a "stepper").
- **It is the progress of a task the person isn't stepping through.** Use Progress Bar or Task Rows.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `steps` | `{ label, description?, flag? }[]` | **required** | The steps, in order. |
| `currentStep` | number, from 0 | **required** | The Active step. `steps.length` marks every step Completed. |
| `orientation` | `'horizontal'` \| `'vertical'` | `'horizontal'` | Across the top of a page, or down a side panel. |
| `aria-label` | text | — | Names the list ("Account setup"). |
| `id`, `aria-*`, `data-*` | native | — | Passed to the `<ol>`. `style` and `className` are not accepted. |

A step's `flag` is `'error'` or `'warning'`; its `description` is then the flag's message.

The `ref` is forwarded to the `<ol>`.

## Rules
1. **One `currentStep`, never a state per step.** Before it Completed (a green disc with a check), at it Active (an Obsidian disc with its number), after it Upcoming (an outlined disc with its number).
2. **Error only on the Active step, Warning only on a Completed step.** Anywhere else the flag is ignored: it would assert something that hasn't happened. At most one Error; any number of Warnings.
3. **Resolving an Error doesn't advance the step:** clear the flag, then move `currentStep` yourself.
4. **A flag's message replaces the description** ("Photo upload failed"), bold, Red for Error and Neutral-9 for Warning.
5. **Descriptions are all or nothing:** every step has one, or none does.
6. **Connectors never depend on label length.** Horizontal: an equal share of the row, 4px off each circle. Vertical: a fixed 16px, 8px off the circle on each side.
7. **The Active label is bold Neutral-9;** Completed and Upcoming labels are Neutral-5; Error's is Red, Warning's Neutral-9.
8. **Below 480px of its own width,** a horizontal stepper hides its descriptions and truncates long labels. Vertical needs nothing.
9. **Read-only:** steps can't be clicked, and there is no disabled step (the DLS's `.is-disabled` has no meaning here). (Decided 2026-11-05.)
10. **The component enforces the flags:** an Error off the Active step, or a Warning off a Completed one, is ignored. (Decided 2026-11-05.)
11. **`currentStep` counts from 0;** `steps.length` means all done. (Decided 2026-11-05.)
12. **Each step and its connector share a list item,** laid out so every part lands where the DLS puts it. (Decided 2026-11-05.)
13. **The 24px indicator is a local value.** (Decided 2026-11-05.)

## Accessibility
- An ordered list (`<ol>`); the Active step's item has `aria-current="step"`.
- Each step reads "Step 2 of 4: Profile, current step" (or completed, upcoming, current step, error, or completed, warning), then its description or flag message ("…, current step, error. Photo upload failed"); the discs are decoration.
- Not focusable: there is nothing to operate.
- The list, `aria-current` and the spoken step text are the library's; the DLS gallery has none. (Decided 2026-11-05.)
- In forced colours every indicator keeps a 1px circle in the system text colour, since the fills drop out. (Decided 2026-11-05.)

## Motion
None. Stepper doesn't animate.

## Example

```tsx
import { Stepper } from '@collabrium/ui';

<Stepper aria-label="Account setup" currentStep={1}
  steps={[{ label: 'Account' }, { label: 'Profile' }, { label: 'Preferences' }, { label: 'Review' }]} />
```

## Replaces
- `.c-stepper`, `.vertical`
- `.c-step`, `.c-step-rail` (`.is-disabled` is not ported)
- `.c-step-indicator` (`.completed`, `.active`, `.upcoming`, `.error`, `.warning`)
- `.c-step-connector`, `.c-step-text`, `.c-step-label`, `.c-step-desc`
