# Catalog

What to use for each need. Only converted components are listed; the full
list of components still to convert is in MIGRATION-LOG.md.

| Need | Use | Don't use |
|---|---|---|
| Start an action on the current page (save, add, open, continue) | `Button`: `variant="primary"` for the one main action in a region, `"secondary"` beside it, `"ghost"` for low-emphasis, toolbar and table-row actions | A link styled as a button; a second Primary in the same region; an element/department colour as the fill |
| A compact action with no visible label | `Button iconOnly icon={…} aria-label="…"` (Tier 1 icon) | An icon with no `aria-label`; a Fill (Tier 2) icon |
| Show that an action is running | `Button loading` | Disabling the button; swapping the label for "Loading…" |
| Commit a destructive action (delete, revoke), or a text-level action inside a line of content | `Button variant="danger"` for the committing step of a destructive flow; `Button variant="link"` for "Show less" and similar | Danger for anything non-destructive or with the beacon; Link for a real link to another page; the opening "Delete…" step as Danger |
| Point to the single next step after something finishes | `Button variant="primary" beacon="on" trailingArrow="down"` | Beacon on page load or a timer; more than one beacon on a page; beacon on Secondary, Ghost, icon-only or disabled |
| Show the status or tone of something (Active, Pending, Failed) | `Badge variant="success" \| "warning" \| "error" \| "neutral"`; `"selected"` for the chosen item in a set | A Badge for ownership (that is Tag); a clickable or removable Badge (use Chip or Button); a solid brand fill with white text |
| Let the user pick any number of options, or switch one setting on or off and save it with a button | `Checkbox label="…"`; `indeterminate` only on a select-all box; `aria-label` when no visible label fits (a table row) | A Checkbox when only one option can be chosen (Radio) or when the setting applies instantly (Switch); a bare box with no name |
| Ask a question that takes one or more checkboxes, with a helper, a required marker and a group error | `CheckboxGroup legend="…" required error={…}` around `Checkbox`es; `required` and `error` on a single `Checkbox` for a must-tick box | Several checkboxes with no legend; `required` on every box in a group; an error left showing after a selection |
| Show that an AI operation is running before any result has arrived (model generation, tool execution, agent runs) | `LoadingState variant="orbit" label="Thinking" startedAt={…}`; update `label` as the phase changes; unmount it at the first streamed token; give the surface a Stop | A LoadingState for a data fetch, upload or table load (spinner or skeleton); two in one view; one that blocks the page or survives the first token |
| Show the named steps of an AI run as an expandable record (steps, reasoning, sources read, tool calls) once two or more steps exist and two seconds have passed | `Thinking variant="steps" \| "reasoning" \| "search" \| "coding"` with `status`, `workingLabel`, `doneLabel`; give the surface a Stop; hand off from `LoadingState` and never back | A Thinking before the first named step lands, with one step, or for work under two seconds (use `LoadingState`); two in one view; a variant chosen by preference |
| Show an AI answer arriving as it is produced, with citations in the sentence and actions once it settles | `StreamingText content={…} status="streaming" \| "done" \| "stopped"`; append to `content` as text arrives; start it at the first token and remove the Loading State or Thinking there | A StreamingText over text you already hold (cached, replayed, computed); a stream for a table, code or a list; a second one for the same answer; one that scrolls the page |
| Show an AI run of several named tasks, each with its own status, where one can fail while the others succeed | `TaskRows tasks={…} onRetry={…}`; `variant="list"` inside a card or panel; set `retryable` only on a transient failure | A TaskRows for one operation with ordered steps (use `Thinking`), data loading, or a checklist; a disabled Retry; a control on the row for something the reader must supply (ask in the conversation); two lists in one view |
| Fade content in and out | `FadeIn` | CSS keyframes per screen |
| Slide content up into place | `SlideUp` | Custom transforms with other distances or springs |
| Expand and collapse a region | `Collapse` | `max-height` hacks |
| Chart.js defaults in brand style | `setupCharts()` from `@collabrium/ui/charts` | Hand-set chart fonts and colours |
