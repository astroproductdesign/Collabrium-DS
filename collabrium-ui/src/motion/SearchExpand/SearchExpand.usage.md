# Search expand (Motion)

## Purpose

A search that is a round button until it is pressed, then grows into a field and shrinks back when it loses focus while empty. Imported from `@collabrium/ui/motion`.

## Use when

- A compact search in a header or toolbar.

## Don't use when

- A page whose main job is search.
- A search with filters: use a full field.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `aria-label` | `string` | — | Names the field, e.g. "Search components". |
| `expanded` | `boolean` | — | Whether the field is open. Leave out to let it open and close itself. |
| `onExpandedChange` | `(expanded: boolean) => void` | — | Called when it opens or closes. |
| `value` | `string` | — | The text in the field. Leave out to let the field keep it. |
| `onChange` | `(value: string) => void` | — | Called when the text changes. |
| `placeholder` | `string` | `'Search'` | Hint while the field is empty. |

## Rules

1. Use it where space is tight, such as a header.
2. Name the field with `aria-label`.
3. Handle the search itself with `onChange` and `value`.

## Accessibility

- The toggle is a real button with `aria-expanded`; the field is a real search input named by `aria-label`. Focus stays on the button when it opens, and the field is the next Tab stop. Escape clears the text and then closes it. Reduced motion opens and closes at once.

## Motion

- The field opens: The pill grows from a circle to full width and the field fades in. (--duration-morph · --ease-morph)
- The field closes: The reverse. (--duration-morph · --ease-morph)
- Reduced motion: It opens and closes at once. (—)

## Example

```tsx
import { SearchExpand } from '@collabrium/ui/motion';

<SearchExpand aria-label="Search components" />
```

## Replaces

Amicro `SearchExpand`. Its black pill, mono key hint and spring become DLS tokens, `--duration-morph` with `--ease-morph` and a plain Esc hint; it no longer moves focus into the field when it opens, because the DLS says focus moves only to a heading or an error message (Q-MOT-18).
