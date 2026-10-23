# Catalog

What to use for each need. Only converted components are listed; the full
list of components still to convert is in MIGRATION-LOG.md.

| Need | Use | Don't use |
|---|---|---|
| Start an action on the current page (save, add, open, continue) | `Button`: `variant="primary"` for the one main action in a region, `"secondary"` beside it, `"ghost"` for low-emphasis, toolbar and table-row actions | A link styled as a button; a second Primary in the same region; an element/department colour as the fill |
| A compact action with no visible label | `Button iconOnly icon={…} aria-label="…"` (Tier 1 icon) | An icon with no `aria-label`; a Fill (Tier 2) icon |
| Show that an action is running | `Button loading` | Disabling the button; swapping the label for "Loading…" |
| Point to the single next step after something finishes | `Button variant="primary" beacon="on" trailingArrow="down"` | Beacon on page load or a timer; more than one beacon on a page; beacon on Secondary, Ghost, icon-only or disabled |
| Fade content in and out | `FadeIn` | CSS keyframes per screen |
| Slide content up into place | `SlideUp` | Custom transforms with other distances or springs |
| Expand and collapse a region | `Collapse` | `max-height` hacks |
| Chart.js defaults in brand style | `setupCharts()` from `@collabrium/ui/charts` | Hand-set chart fonts and colours |
