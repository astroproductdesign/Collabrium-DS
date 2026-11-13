# FileUploader

## Purpose
A drop zone with a title, a caption and one **Choose** button, followed by
a row per file. It does **intake only**: pick or drop → check against the
page's rules → add the row → hand the File to the page (`onAccept`) at
once. The page then drives each row (uploading, done, failed) through
`files`. One component, no variants: its own width picks the layout.

⚠️ Designed, not transcribed, in the DLS (from Collab:Sales Home's brief drop zone): needs real design and brand review.

## Use when
- Someone attaches one or more files: a client brief that starts a flow, attachments on a record, documents in a form.

## Don't use when
- **Pasting text or links.** Use Input field or Textarea.
- **Picking from files already in the product.** That's a selection list (List, Dropdown), not an upload.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `title` | string | **required** | The pointer (drag) wording: "Drop the client's brief here". |
| `touchTitle` | string | `title` | Touch devices have no file drag: "Add the client's brief". |
| `dragTitle` | string | `title` | Only during drag-over: "Let go to add it". |
| `caption` | ReactNode | — | What happens to the file. |
| `hint` | string | `fileUploaderHint(rules)` | The limits sentence; must state the backend's real limits. |
| `buttonLabel` | string | **required** | "Choose a file" (one) or "Choose files" (many). Say "choose", never "click". |
| `replaceTitle`, `replaceTouchTitle`, `replaceDragTitle`, `replaceButtonLabel` | string | from `rules.noun` | One file, once it's in: "Drop a new brief to replace it", "Choose a new brief to replace it", "Let go to replace it", "Replace file". |
| `rules` | `{ noun, many, maxFiles, maxBytes, maxTotalBytes, types: [{ ext, mime, icon }], label, sizeTip, capture }` | **required** | Matching the real backend. There are no defaults. |
| `files`, `defaultFiles`, `onFilesChange` | `{ file, status?, progress?, message? }[]` | — | The list. `status`: none (accepted), `uploading` (`progress` 0–1, or none for "Uploading…"), `done`, `failed` (`message`). |
| `onAccept` | `(file) => void` | — | Called at once for each accepted file: start its upload. |
| `onRetry`, `onRemove` | `(file) => void` | — | "Try again"; × (cancels while uploading). |
| `actions`, `onPreview`, `onDownload` | `('preview' \| 'download')[]` | `[]` | Row actions, inside "More actions". Preview calls `window.open(url, '_blank', 'noopener')` in the same call. |
| `showTypeIcons` | boolean | `false` | The first three types' icons in the zone. |
| `thumbnails` | boolean | `false` | Image files get a 32px thumbnail. |
| `showRequiredError` | boolean | `false` | On submit: "Add a file to continue." when empty; focus moves to it. |
| `readOnly`, `disabled` | boolean | `false` | No zone and no ×; or everything off. |

`fileUploaderHint(rules)` and `formatBytes(n)` are exported. The ref goes to the root `<div>`. `style` and `className` are not accepted.

## Rules
1. **Zone:** a drop target, not a button: `radius-lg`, 24px in, 1px dashed Neutral-3, Neutral-1, 16px between its parts. A pointer press anywhere on it opens the picker; it takes no focus. Hover (pointer devices) Neutral-2 with a Neutral-4 dash.
2. **Layout by its own width:** from 480px, one row: icons, title and caption, button. Under 480px (also in narrow panels on desktop), stacked and centred, the button full width.
3. **Title** label1 Neutral-9; **caption and hint** caption Neutral-5. On touch devices the title shows `touchTitle`; during a drag, `dragTitle`.
4. **Button:** Button Secondary sm with a paperclip (Regular), the only control in the zone. On touch screens at least 44px tall.
5. **Drag-over:** 2px dashed Obsidian, Neutral-2, 1px less padding so nothing moves. The same for every file: a wrong one is not shown as an error while dragging; it's checked on drop.
6. **Checking, on drop or pick only,** in order: folder, nothing came through, more than one for a one-file uploader, then per file: type, empty, size, already added, over `maxFiles`, over `maxTotalBytes`. Good files are added; every rejection is in **one** message, with numbers from the rules.
7. **Error:** inline under the zone (never a Toast), caption, bold Red with a Red warning-circle (the library's error text, decided 2026-10-26; the DS says Neutral-9), and a 2px Red dashed zone. It clears on the next pick, drop or drag.
8. **One file:** a new pick replaces it, with no confirmation, and the zone says so before anyone acts: once a file is in, the title reads "Drop a new {noun} to replace it" (touch: "Choose a new {noun} to replace it"; while dragging: "Let go to replace it") and the button "Replace file" (decided 2026-11-10: it warns up front instead of interrupting with a modal; if replacing can't be undone, the page asks itself). **Many:** rows add up; past 5, the rest fold under "Show N more".
9. **Full** (`maxFiles` reached): Neutral-2 zone, icons Neutral-4, the hint "10 of 10 files added. Remove one to add another." The button stays focusable (Button's disabled look); pressing it, or a drop, explains why nothing is added.
10. **Row:** 1px Neutral-3, `radius-sm`, 8px 12px: a type chip (or a 32px thumbnail), the name (the middle truncates, the extension always shows), the size, then "More actions" and ×. **Uploading:** the name Neutral-5, "Uploading 40%", a 2px Obsidian bar along the bottom inside the corners; with no progress, "Uploading…" and a sliding segment. **Done:** a check and "Uploaded", both in the success colour, Green (`--color-green`, #00C26E), so a finished file reads as a success; the word means the state never rests on colour alone (decided 2026-11-10). **Height:** a row never changes height as its status changes; with `thumbnails` on, every row is 50px (a thumbnail row's height), so a list mixing images and other files keeps one rhythm; with it off, rows are 42px (decided 2026-11-10). **Failed:** a Red border, the size hidden, "Try again" (Button ghost sm, 24px) and ×, the message under the row.
11. **Row actions:** Preview and Download only, always inside "More actions" (24px, dots), never inline; hidden while uploading or failed. The menu is the uploader's own until a shared Menu component exists (decided 2026-11-10). The menu floats over the page, flips up near the bottom, and closes on Escape, Tab, an outside press, scroll or resize.
12. **Read-only:** no zone, no error, no ×; "More actions" stays. **Disabled:** Neutral-2 zone, text and icons Neutral-4, every button off; row buttons Neutral-4, not-allowed (decided 2026-11-10).
13. **A file dropped anywhere else on the page never opens in the browser.**

## Accessibility
- One real button in the zone, described by the title, the hint and any error; the hidden file input is out of the tab order.
- Errors are inline, with no live region. Focus moves to the error after a picker error or `showRequiredError`; not after a drop.
- A successful pick moves focus to the new row's first button, so its name is read; after ×, to the next row's × (or the button); after Try again, to that row's ×; "Show N more" moves it to the first revealed row; the menu opens on its first item (decided 2026-11-10).
- Names: "Remove {name}", "Cancel upload, {name}", "Try again, {name}", "More actions, {name}", "Preview {name}, opens in a new tab", "Download {name}". A failed row's buttons are described by its message.
- Drag wording is hidden from screen readers; the hint says the same in words.
- Touch: the button 44px tall; ×, "More actions" and Try again get 44px hit areas that don't overlap.
- Forced colours: drag-over solid, error and failed dotted; disabled and full GrayText.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Progress | The bar grows along the bottom | `--duration-base` · `--ease-standard` |
| Still uploading | A segment slides along the bar, 1.8s a pass | 2 × `--duration-ambient` |
| Reduced motion | Progress jumps; the segment is a still Neutral-3 track | — |

## Example

```tsx
import { FileUploader, type FileUploaderItem } from '@collabrium/ui';

const [files, setFiles] = useState<FileUploaderItem[]>([]);
const upload = (file: File) => {
  setStatus(file, { status: 'uploading', progress: 0 }); // then 'done' or 'failed'
};

<FileUploader
  title="Drop files here"
  touchTitle="Add files"
  buttonLabel="Choose files"
  rules={{ noun: 'file', many: true, maxFiles: 10, maxBytes: 100 * MB, label: 'PDF, Word or images', types }}
  files={files}
  onFilesChange={setFiles}
  onAccept={upload}
  onRetry={upload}
/>
```

## Replaces
- `.c-uploader` (`.is-dragover`, `.is-error`, `.is-full`, `.is-readonly`, `.is-disabled`), `-zone`, `-types`, `-text`, `-title`, `-hint`, `-msg-*`, `-trigger`, `-error`, `-files`, `-row` (states), `-kind`, `-thumb`, `-name` (`-stem`, `-ext`), `-size`, `-done`, `-retry`, `-remove`, `-row-more`, `-row-msg`, `-menu`, `-menu-item`, `-menu-ext`, `-show-all`
- The `createUploader()` controller the DS describes (`setRowState`, `validate`, `take`, `hintFor`)
- Not ported: the legacy `.c-uploader-label` markup and the deprecated `.c-uploader-zone.dragover` / `.c-uploader-zone i` aliases
