---
description: Reads an HTML file, scores which sections need to become components, then builds them one by one for review
---

Read the HTML file at: $ARGUMENTS
Also read components.css and design-system.md so you know what already exists.

Read component-backlog.html FIRST. Its table is the running list: one <tr>
per component, with the status in data-status. Anything already listed as
drafted, promoted or skipped is settled — do not offer it again.

Step 1 — Scan the file. For each visually distinct section, decide if it
QUALIFIES as a component using these rules:
- Appears more than once in this file → qualifies
- Is a structural/reusable pattern (button, card, nav, modal, form field,
  badge, etc) rather than a one-off decorative section → qualifies
- Otherwise → does not qualify, skip it

For each qualifying item output a table:
| Component name | Why it qualifies | Matches existing component? | Action |

"Action" is either "Reuse existing" or "Build new draft".

Show new finds and anything already in the backlog as suggested or queued,
so the table is the whole picture and not just this scan.

Then STOP and wait for my reply. I may add, remove, or reclassify items.

Step 2 (once I confirm the list) — write the confirmed list into
component-backlog.html before building anything: add a <tr> for each new
item, set data-status to "queued" for the ones I approved and "skipped"
for the ones I rejected, and update the Status badge text and tone to
match. Getting the list on disk first is what makes it survive a branch
switch or a new session.

Step 3 — take the next row with data-status="queued". Hand it to the
component-builder subagent with the relevant HTML snippet. When it
reports back, set that row to data-status="drafted" and put the draft
filename in the Draft file cell. Once the component-builder subagent
finishes and saves the draft, hand the draft off to the
component-reviewer subagent for a critique.

Step 4 — Show me BOTH together: the draft's summary (from
component-builder) and the critique (from component-reviewer) in one
message. Then STOP and wait for my feedback before the next component.

If the reviewer verdict is NEEDS FIXES, still show it to me as-is —
don't auto-fix. I decide whether to send it back for a fix or accept
it with the flagged issues.

Step 5 — if I later promote a component into components.css and
design-system.md, set its row to data-status="promoted".

Never mark a row drafted before the file exists, and never build a
component that is not queued in the backlog.
