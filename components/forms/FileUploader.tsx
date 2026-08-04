// Collabrium DLS — FileUploader. Click-to-browse or drag-and-drop file
// attachment, with attached files listed as rows below the drop zone.
//
// Token choices, spelled out since none of these are literally named
// "FileUploader" anywhere in DESIGN-SYSTEM.md yet (see the Step 3 doc
// entry for the full spec once approved):
// - Drag-over reuses the same Obsidian-border + Neutral-2-fill recipe
//   this system already uses for "currently engaged" states elsewhere
//   (Table row's selected state, SidebarNav's active item) — there's no
//   Obsidian tint token to invent a new background from, so Neutral-2
//   (the standard subtle-surface token) carries the highlight instead.
// - Upload icon is `upload-simple`, Tier 1/Regular per the Iconography
//   tier table's own explicit listing — not treated as a Tier 2
//   decorative/empty-state icon.
// - The kind badge reuses Badge-Neutral's exact box model (22px tall,
//   spacing-8 padding, `radius-pill`, Neutral-2 fill, Neutral-3 border),
//   `--font-primary` like every other piece of text in the component.
// - File rows reuse the Filters/Date picker "panel" recipe (Neutral-1
//   fill, 1px Neutral-3 border) rather than Neutral-2, so the remove
//   button's Neutral-2 hover stays visually distinct against the row.
// - Remove (×) is Tier 1/Regular (`ph-x`) — a remove affordance, same
//   call as Tag's and UserPicker's own remove buttons.
import { useRef, useState } from "react";

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  kind: string;
}

export interface FileUploaderProps {
  label?: string;
  hint?: string;
  files?: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / Math.pow(1024, i);
  return `${i === 0 ? value : value.toFixed(1)} ${units[i]}`;
}

function getKind(fileName: string): string {
  const ext = fileName.split(".").pop();
  return ext && ext !== fileName ? ext.toUpperCase() : "FILE";
}

function makeId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function toUploadedFiles(fileList: FileList): UploadedFile[] {
  return Array.from(fileList).map((file) => ({
    id: makeId(),
    name: file.name,
    size: formatBytes(file.size),
    kind: getKind(file.name),
  }));
}

export function FileUploader({
  label = "Drag files here, or click to browse",
  hint,
  files = [],
  onFilesChange,
  className,
}: FileUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    onFilesChange([...files, ...toUploadedFiles(fileList)]);
  }

  function removeFile(id: string) {
    onFilesChange(files.filter((f) => f.id !== id));
  }

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-12)" }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--spacing-8)",
          padding: "var(--spacing-24)",
          textAlign: "center",
          borderRadius: "var(--radius-lg)",
          border: dragOver ? "2px dashed var(--color-obsidian)" : "1px dashed var(--color-neutral-3)",
          background: dragOver ? "var(--color-neutral-2)" : "var(--color-neutral-1)",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <i
          className="ph ph-upload-simple"
          aria-hidden="true"
          style={{ fontSize: 20, color: "var(--color-neutral-5)" }}
        />
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-body2-size)",
            lineHeight: "var(--text-body2-lh)",
            fontWeight: "var(--text-label1-weight)",
            color: "var(--color-neutral-5)",
          }}
        >
          {label}
        </span>
        {hint && (
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-caption-size)",
              lineHeight: "var(--text-caption-lh)",
              fontWeight: "var(--text-caption-weight)",
              color: "var(--color-neutral-5)",
            }}
          >
            {hint}
          </span>
        )}
      </div>

      {files.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          {files.map((file) => (
            <div
              key={file.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-12)",
                padding: "var(--spacing-8) var(--spacing-12)",
                border: "1px solid var(--color-neutral-3)",
                borderRadius: "var(--radius-sm)",
                background: "var(--color-neutral-1)",
              }}
            >
              <span
                style={{
                  flex: "none",
                  height: 22,
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 var(--spacing-8)",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--color-neutral-2)",
                  border: "1px solid var(--color-neutral-3)",
                  color: "var(--color-neutral-5)",
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-caption-size)",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {file.kind}
              </span>
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-body2-size)",
                  lineHeight: "var(--text-body2-lh)",
                  fontWeight: "var(--text-body2-weight)",
                  color: "var(--color-neutral-9)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {file.name}
              </span>
              <span
                style={{
                  flex: "none",
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-caption-size)",
                  lineHeight: "var(--text-caption-lh)",
                  color: "var(--color-neutral-5)",
                }}
              >
                {file.size}
              </span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(file.id)}
                style={{
                  flex: "none",
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  background: "transparent",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-neutral-5)",
                  cursor: "pointer",
                }}
              >
                <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 16 }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
