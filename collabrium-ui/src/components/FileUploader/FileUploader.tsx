'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type DragEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import {
  ArrowSquareOut,
  CheckCircle,
  DotsThree,
  DownloadSimple,
  Eye,
  Paperclip,
  WarningCircle,
  X,
  type Icon,
} from '@phosphor-icons/react';
import { Button } from '../Button';
import type { WithoutStyling } from '../../utils/types';

/** One accepted file type: by extension or by MIME type (list MIME aliases, e.g. CSV as the Excel type on Windows). */
export interface FileUploaderType {
  /** The extension, without the dot ("pdf"). */
  ext: string;
  /** Its MIME type or types ("application/pdf"). */
  mime?: string | string[];
  /** A Phosphor file icon for the optional type icons (Fill, Tier 2), e.g. `FilePdf`. */
  icon?: Icon;
}

/** The instance's rules. They must match the real backend: there are no system defaults. */
export interface FileUploaderRules {
  /** What a file is called in the error copy: "brief", "file". */
  noun: string;
  /** `false` (default): one file, and a new pick replaces it. `true`: a list. */
  many?: boolean;
  /** Many only: at this count the uploader is full. */
  maxFiles?: number;
  /** Per file, in bytes. */
  maxBytes?: number;
  /** Many only: the total of all files, in bytes. */
  maxTotalBytes?: number;
  /** Accepted types. Leave out to accept any. */
  types?: FileUploaderType[];
  /** The types in words, for the hint and the errors: "PDF, Word or images". */
  label?: string;
  /** Added to the size error: "Try a smaller copy." */
  sizeTip?: string;
  /** Passed to the file input, so a phone can offer its camera. */
  capture?: 'user' | 'environment';
}

/** A file in the list, and the state the page has given it. */
export interface FileUploaderItem {
  file: File;
  /** Set by the page as it uploads: none (just accepted), `uploading`, `done` or `failed`. */
  status?: 'uploading' | 'done' | 'failed';
  /** 0–1 while uploading; leave out for "Uploading…" with a sliding bar. */
  progress?: number;
  /** A failed upload's message. Default "Upload failed. Please check your connection and try again." */
  message?: string;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'>>;

export interface FileUploaderProps extends NativeDivProps {
  /** Required. The pointer (drag) wording: "Drop the client's brief here", "Drop files here". */
  title: string;
  /** Touch devices have no file drag: "Add the client's brief", "Add files". Falls back to `title`. */
  touchTitle?: string;
  /** Shown only while a file is dragged over: "Let go to add it". Falls back to `title`. */
  dragTitle?: string;
  /** What happens to the file: "Collab AI finds the brand in it." */
  caption?: ReactNode;
  /** The limits sentence. Defaults to `fileUploaderHint(rules)`; it must state the backend's real limits. */
  hint?: string;
  /** The button: "Choose a file" (one) or "Choose files" (many). Say "choose", never "click". */
  buttonLabel: string;
  /** The rules, matching the real backend. */
  rules: FileUploaderRules;
  /** Shows the first three types' icons in the zone (off by default). */
  showTypeIcons?: boolean;
  /** Row actions, inside each row's "More actions" menu. None: no menu. */
  actions?: ('preview' | 'download')[];
  /** Image files get a 32px thumbnail instead of the type chip. */
  thumbnails?: boolean;
  /** The list, when you control it. */
  files?: FileUploaderItem[];
  /** The list on first render, when you don't. */
  defaultFiles?: FileUploaderItem[];
  /** The list changed: files added (pick or drop) or removed (×). */
  onFilesChange?: (files: FileUploaderItem[]) => void;
  /** Called at once for each accepted file: start its upload. */
  onAccept?: (file: File) => void;
  /** × (cancels while uploading). */
  onRemove?: (file: File) => void;
  /** "Try again" on a failed row. Set its status back to `uploading`. */
  onRetry?: (file: File) => void;
  /** Preview: open the file with `window.open(url, '_blank', 'noopener')` in this call, so popup blockers allow it. */
  onPreview?: (file: File) => void;
  onDownload?: (file: File) => void;
  /** Turn on to show the "required" error when no file is there (on submit); focus moves to it. */
  showRequiredError?: boolean;
  /** Nothing can be added or removed; Preview and Download stay. */
  readOnly?: boolean;
  disabled?: boolean;
}

/* ---------- Sizes, names, rules ---------- */

const MB = 1024 * 1024;
/** "5.2 MB", "820 KB", "25 MB". */
export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < MB) return `${Math.round(n / 1024)} KB`;
  const v = n / MB;
  return `${v >= 10 || Number.isInteger(v) ? Math.round(v) : v.toFixed(1)} MB`;
}
/** The limits sentence from the rules: "PDF, Word, images or MP4. Up to 10 files, 100 MB each, 250 MB in total." */
export function fileUploaderHint(rules: FileUploaderRules) {
  const parts: string[] = [];
  if (rules.many && rules.maxFiles) parts.push(`${rules.maxFiles} files`);
  if (rules.maxBytes) parts.push(rules.many ? `${formatBytes(rules.maxBytes)} each` : formatBytes(rules.maxBytes));
  if (rules.many && rules.maxTotalBytes) parts.push(`${formatBytes(rules.maxTotalBytes)} in total`);
  const limits = parts.length ? `Up to ${parts.join(', ')}.` : '';
  return [rules.label ? `${rules.label}.` : '', limits].filter(Boolean).join(' ');
}
const extOf = (name: string) => {
  const i = name.lastIndexOf('.');
  return i > 0 ? name.slice(i + 1) : '';
};
const typeOk = (f: File, types?: FileUploaderType[]) =>
  !types?.length ||
  types.some((t) => {
    const mimes = Array.isArray(t.mime) ? t.mime : t.mime ? [t.mime] : [];
    return t.ext.toLowerCase() === extOf(f.name).toLowerCase() || (f.type !== '' && mimes.includes(f.type));
  });
const sameFile = (a: File, b: File) => a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Rejection = { name: string; code: 'folder' | 'empty' | 'count' | 'type' | 'size' | 'total' | 'duplicate' };

/** The message for a rejection, with its numbers from the rules. */
function messageFor(r: Rejection, rules: FileUploaderRules) {
  switch (r.code) {
    case 'folder':
      return `That's a folder. Drop the ${rules.noun} file itself.`;
    case 'empty':
      return `"${r.name}" is empty. Try another copy.`;
    case 'count':
      return `Only ${rules.maxFiles} files can be added. "${r.name}" wasn't added.`;
    case 'type':
      return rules.label ? `"${r.name}" can't be used. ${cap(rules.noun)}s can be ${rules.label}.` : `"${r.name}" can't be used.`;
    case 'size':
      return `"${r.name}" is over ${formatBytes(rules.maxBytes ?? 0)}.${rules.sizeTip ? ` ${rules.sizeTip}` : ''}`;
    case 'total':
      return `"${r.name}" would take the total over ${formatBytes(rules.maxTotalBytes ?? 0)}. Remove a file first.`;
    case 'duplicate':
      return `"${r.name}" is already added.`;
  }
}
function reasonFor(r: Rejection, rules: FileUploaderRules) {
  return {
    folder: 'a folder',
    empty: 'empty',
    count: `over the ${rules.maxFiles}-file limit`,
    type: 'file type not accepted',
    size: `over ${formatBytes(rules.maxBytes ?? 0)}`,
    total: `over the ${formatBytes(rules.maxTotalBytes ?? 0)} total`,
    duplicate: 'already added',
  }[r.code];
}

/* ---------- One guard per page: a file dropped outside an uploader never opens in the browser ---------- */

let guards = 0;
const guard = (e: globalThis.DragEvent) => {
  if (!e.dataTransfer?.types?.includes('Files')) return;
  const t = e.target as HTMLElement | null;
  if (t?.closest?.('input[type="file"]')) return;
  e.preventDefault();
  if (e.type === 'dragover' && e.dataTransfer) e.dataTransfer.dropEffect = 'none';
};
function useDropGuard() {
  useEffect(() => {
    if (guards++ === 0) {
      window.addEventListener('dragover', guard);
      window.addEventListener('drop', guard);
    }
    return () => {
      if (--guards === 0) {
        window.removeEventListener('dragover', guard);
        window.removeEventListener('drop', guard);
      }
    };
  }, []);
}

/* ---------- Stable keys per File ---------- */
const keys = new WeakMap<File, string>();
let nextKey = 0;
const keyOf = (f: File) => {
  let k = keys.get(f);
  if (!k) keys.set(f, (k = `f${++nextKey}`));
  return k;
};

const COLLAPSE_AT = 5;

/**
 * Collabrium FileUploader: a drop zone (title, caption, one "Choose" button) and a list of file rows. It does intake:
 * pick or drop, validate, add the row, and hand the File to the page (`onAccept`) at once. The page then drives each
 * row (uploading, done, failed) through `files`. Ported from components.css `.c-uploader*` (3862–4070).
 */
export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(function FileUploader(props, ref) {
  const {
    title,
    touchTitle,
    dragTitle,
    caption,
    hint: hintProp,
    buttonLabel,
    rules,
    showTypeIcons = false,
    actions = [],
    thumbnails = false,
    files: filesProp,
    defaultFiles,
    onFilesChange,
    onAccept,
    onRemove,
    onRetry,
    onPreview,
    onDownload,
    showRequiredError = false,
    readOnly = false,
    disabled = false,
    ...rest
  } = props;
  useDropGuard();
  const uid = useId();
  const titleId = `${uid}-title`;
  const hintId = `${uid}-hint`;
  const errorId = `${uid}-error`;

  const [own, setOwn] = useState<FileUploaderItem[]>(defaultFiles ?? []);
  const items = filesProp ?? own;
  const many = Boolean(rules.many);
  const full = many && rules.maxFiles !== undefined && items.length >= rules.maxFiles;

  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const dragDepth = useRef(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const pendingFocus = useRef<string | null>(null);

  // Image thumbnails: one object URL per File, revoked when its row goes or the uploader unmounts.
  const thumbs = useRef(new Map<File, string>());
  const thumbFor = (f: File) => {
    if (!thumbnails || !f.type.startsWith('image/')) return null;
    let u = thumbs.current.get(f);
    if (!u) thumbs.current.set(f, (u = URL.createObjectURL(f)));
    return u;
  };
  useEffect(() => {
    for (const [f, u] of thumbs.current) {
      if (!items.some((i) => i.file === f)) {
        URL.revokeObjectURL(u);
        thumbs.current.delete(f);
      }
    }
  }, [items]);
  useEffect(() => {
    const map = thumbs.current;
    return () => map.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const commit = (next: FileUploaderItem[]) => {
    if (filesProp === undefined) setOwn(next);
    onFilesChange?.(next);
  };

  const focusError = () => requestAnimationFrame(() => errorRef.current?.focus());

  /** Validate a pick or a drop, in the DS's order, add the good files and report every rejection in one message. */
  const take = (list: File[], from: 'pick' | 'drop', folders = 0) => {
    setError(null);
    const fail = (msg: string) => {
      setError(msg);
      if (from === 'pick') focusError();
    };
    if (folders && !list.length) return fail(messageFor({ name: '', code: 'folder' }, rules));
    if (!list.length) return fail(`Nothing came through. Try dropping the ${rules.noun} again, or choose it.`);
    if (!many && list.length > 1) return fail(`Drop one ${rules.noun} at a time. You dropped ${list.length} files.`);

    const kept = many ? [...items] : [];
    const added: File[] = [];
    const rejected: Rejection[] = [];
    let total = kept.reduce((n, i) => n + i.file.size, 0);
    for (let i = 0; i < folders; i++) rejected.push({ name: 'folder', code: 'folder' });
    for (const f of list) {
      const code: Rejection['code'] | null = !typeOk(f, rules.types)
        ? 'type'
        : f.size === 0
          ? 'empty'
          : rules.maxBytes !== undefined && f.size > rules.maxBytes
            ? 'size'
            : many && kept.some((k) => sameFile(k.file, f))
              ? 'duplicate'
              : many && rules.maxFiles !== undefined && kept.length >= rules.maxFiles
                ? 'count'
                : many && rules.maxTotalBytes !== undefined && total + f.size > rules.maxTotalBytes
                  ? 'total'
                  : null;
      if (code) rejected.push({ name: f.name, code });
      else {
        kept.push({ file: f });
        added.push(f);
        total += f.size;
      }
    }
    if (added.length) {
      if (!many) items.forEach((i) => onRemove?.(i.file)); // one file: the new one replaces it
      commit(kept);
      added.forEach((f) => onAccept?.(f));
    }
    if (rejected.length === 1) fail(messageFor(rejected[0], rules));
    else if (rejected.length > 1)
      fail(`${rejected.length} files weren't added: ${rejected.map((r) => `"${r.name}" (${reasonFor(r, rules)})`).join(', ')}.`);
    else if (from === 'pick' && added.length) pendingFocus.current = keyOf(added[added.length - 1]);
  };

  // A successful pick moves focus to the newest row's first button, so its name is read (Q-FU-2).
  useEffect(() => {
    const k = pendingFocus.current;
    if (!k) return;
    pendingFocus.current = null;
    const row = listRef.current?.querySelector<HTMLElement>(`[data-key="${k}"]`);
    row?.querySelector<HTMLElement>('button')?.focus();
  });

  // The "required" error, on the page's signal (validate on submit); focus moves to it.
  const live = items.filter((i) => i.status !== 'failed');
  useEffect(() => {
    if (showRequiredError && !live.length) {
      setError(many ? 'Add a file to continue.' : `Add the ${rules.noun} to continue.`);
      focusError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRequiredError]);

  const choose = () => {
    if (disabled) return;
    if (full) {
      setError(`Only ${rules.maxFiles} files can be added. Remove one to add another.`);
      focusError();
      return;
    }
    inputRef.current?.click();
  };

  const remove = (f: File) => {
    const i = items.findIndex((x) => x.file === f);
    const next = items.filter((x) => x.file !== f);
    commit(next);
    onRemove?.(f);
    setMenuFor(null);
    // Focus goes to the next row's ×, or the previous one's, or the button (Q-FU-2).
    const target = next[i] ?? next[i - 1];
    requestAnimationFrame(() => {
      const el = target
        ? listRef.current?.querySelector<HTMLElement>(`[data-key="${keyOf(target.file)}"] .cui-file-uploader__remove`)
        : null;
      (el ?? rootRef.current?.querySelector<HTMLElement>('.cui-file-uploader__trigger .cui-button'))?.focus();
    });
  };

  const rootRef = useRef<HTMLDivElement | null>(null);

  const onDragEnter = (e: DragEvent) => {
    if (disabled || readOnly || !e.dataTransfer.types.includes('Files')) return;
    e.preventDefault();
    if (dragDepth.current++ === 0) {
      setDragging(true);
      setError(null); // the message clears on the next drag
    }
  };
  const onDragLeave = () => {
    if (dragDepth.current > 0 && --dragDepth.current === 0) setDragging(false);
  };
  const onDrop = (e: DragEvent) => {
    if (disabled || readOnly) return;
    e.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    const files: File[] = [];
    let folders = 0;
    const dtItems = Array.from(e.dataTransfer.items ?? []);
    if (dtItems.length) {
      dtItems.forEach((it) => {
        if (it.kind !== 'file') return;
        const entry = (it as DataTransferItem & { webkitGetAsEntry?: () => { isDirectory: boolean } | null }).webkitGetAsEntry?.();
        if (entry?.isDirectory) folders++;
        else {
          const f = it.getAsFile();
          if (f) files.push(f);
        }
      });
    } else files.push(...Array.from(e.dataTransfer.files));
    take(files, 'drop', folders);
  };

  const shownHint = full ? `${items.length} of ${rules.maxFiles} files added. Remove one to add another.` : (hintProp ?? fileUploaderHint(rules));
  const accept = rules.types?.flatMap((t) => [`.${t.ext}`, ...(Array.isArray(t.mime) ? t.mime : t.mime ? [t.mime] : [])]).join(',');
  const typeIcons = (rules.types ?? []).map((t) => t.icon).filter(Boolean).slice(0, 3) as Icon[];

  const collapsed = many && !expanded && items.length > COLLAPSE_AT;
  const showAll = () => {
    const first = items[COLLAPSE_AT];
    setExpanded(true);
    // Focus goes to the first revealed row.
    requestAnimationFrame(() => listRef.current?.querySelector<HTMLElement>(`[data-key="${keyOf(first.file)}"] button`)?.focus());
  };

  return (
    <div
      {...rest}
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className="cui-file-uploader"
      data-dragover={dragging || undefined}
      data-error={(error && !dragging) || undefined}
      data-full={(full && !disabled) || undefined}
      data-readonly={readOnly || undefined}
      data-disabled={disabled || undefined}
    >
      {!readOnly && (
        <div
          className="cui-file-uploader__zone"
          // A plain drop target, not a button: a pointer press on it forwards to the button.
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('button')) return;
            choose();
          }}
          onDragEnter={onDragEnter}
          onDragOver={(e) => {
            if (disabled || !e.dataTransfer.types.includes('Files')) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
          }}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {showTypeIcons && typeIcons.length > 0 && (
            <span className="cui-file-uploader__types" aria-hidden="true">
              {typeIcons.map((I, i) => (
                <I key={i} className="cui-file-uploader__type-icon" weight="fill" focusable="false" />
              ))}
            </span>
          )}
          <span className="cui-file-uploader__text">
            <span className="cui-file-uploader__title" id={titleId}>
              <span className="cui-file-uploader__msg" data-when="rest fine">
                {title}
              </span>
              <span className="cui-file-uploader__msg" data-when="rest coarse">
                {touchTitle ?? title}
              </span>
              <span className="cui-file-uploader__msg" data-when="drag" aria-hidden="true">
                {dragTitle ?? title}
              </span>
            </span>
            <span className="cui-file-uploader__hint" id={hintId}>
              {caption}
              {caption ? ' ' : null}
              <span>{shownHint}</span>
            </span>
          </span>
          <span className="cui-file-uploader__trigger">
            <Button
              variant="secondary"
              size="sm"
              leadingIcon={Paperclip}
              disabled={disabled}
              aria-disabled={full || undefined}
              aria-describedby={[titleId, hintId, error ? errorId : ''].filter(Boolean).join(' ')}
              onClick={choose}
            >
              {buttonLabel}
            </Button>
          </span>
        </div>
      )}
      {!readOnly && error && (
        <p className="cui-file-uploader__error" id={errorId} ref={errorRef} tabIndex={-1}>
          <WarningCircle className="cui-file-uploader__error-icon" weight="fill" aria-hidden="true" focusable="false" />
          <span>{error}</span>
        </p>
      )}
      {items.length > 0 && (
        <div className="cui-file-uploader__files" ref={listRef}>
          {items.map((item, i) =>
            collapsed && i >= COLLAPSE_AT ? null : (
              <Row
                key={keyOf(item.file)}
                item={item}
                uid={`${uid}-${keyOf(item.file)}`}
                thumb={thumbFor(item.file)}
                actions={actions}
                readOnly={readOnly}
                disabled={disabled}
                menuOpen={menuFor === keyOf(item.file)}
                onMenu={(open) => setMenuFor(open ? keyOf(item.file) : null)}
                onRemove={() => remove(item.file)}
                onRetry={() => {
                  onRetry?.(item.file);
                  // Focus stays with the row: its ×.
                  requestAnimationFrame(() =>
                    listRef.current?.querySelector<HTMLElement>(`[data-key="${keyOf(item.file)}"] .cui-file-uploader__remove`)?.focus(),
                  );
                }}
                onPreview={() => onPreview?.(item.file)}
                onDownload={() => onDownload?.(item.file)}
              />
            ),
          )}
        </div>
      )}
      {collapsed && (
        <span className="cui-file-uploader__show-all">
          <Button variant="ghost" size="sm" onClick={showAll}>
            {`Show ${items.length - COLLAPSE_AT} more`}
          </Button>
        </span>
      )}
      {!readOnly && (
        <input
          ref={inputRef}
          type="file"
          className="cui-file-uploader__input"
          tabIndex={-1}
          aria-hidden="true"
          accept={accept || undefined}
          multiple={many}
          capture={rules.capture}
          disabled={disabled}
          onChange={(e) => {
            const picked = Array.from(e.currentTarget.files ?? []);
            e.currentTarget.value = '';
            take(picked, 'pick');
          }}
        />
      )}
    </div>
  );
});

/* ---------- A file row ---------- */

interface RowProps {
  item: FileUploaderItem;
  uid: string;
  thumb: string | null;
  actions: ('preview' | 'download')[];
  readOnly: boolean;
  disabled: boolean;
  menuOpen: boolean;
  onMenu: (open: boolean) => void;
  onRemove: () => void;
  onRetry: () => void;
  onPreview: () => void;
  onDownload: () => void;
}

function Row({ item, uid, thumb, actions, readOnly, disabled, menuOpen, onMenu, onRemove, onRetry, onPreview, onDownload }: RowProps) {
  const { file, status, progress, message } = item;
  const name = file.name;
  const ext = extOf(name);
  const stem = ext ? name.slice(0, -(ext.length + 1)) : name;
  const uploading = status === 'uploading';
  const failed = status === 'failed';
  const indeterminate = uploading && progress === undefined;
  const msgId = `${uid}-msg`;
  const menuId = `${uid}-menu`;
  const moreRef = useRef<HTMLButtonElement | null>(null);
  const showMore = actions.length > 0 && !uploading && !failed;

  const size = uploading
    ? indeterminate
      ? 'Uploading…'
      : `Uploading ${Math.round(Math.min(1, Math.max(0, progress ?? 0)) * 100)}%`
    : formatBytes(file.size);

  return (
    <>
      <div
        className="cui-file-uploader__row"
        data-key={keyOf(file)}
        data-status={status}
        data-indeterminate={indeterminate || undefined}
        style={uploading && !indeterminate ? ({ '--cui-file-uploader-progress': Math.min(1, Math.max(0, progress ?? 0)) } as CSSProperties) : undefined}
      >
        {thumb ? (
          <img className="cui-file-uploader__thumb" src={thumb} alt="" />
        ) : (
          <span className="cui-file-uploader__kind">{(ext || 'File').toUpperCase()}</span>
        )}
        <span className="cui-file-uploader__name" title={name}>
          <span className="cui-file-uploader__name-stem">{stem}</span>
          {ext && <span className="cui-file-uploader__name-ext">.{ext}</span>}
        </span>
        {!failed && <span className="cui-file-uploader__size">{size}</span>}
        {status === 'done' && (
          <span className="cui-file-uploader__done">
            <CheckCircle className="cui-file-uploader__done-icon" weight="fill" aria-hidden="true" focusable="false" />
            Uploaded
          </span>
        )}
        {showMore && (
          <>
            <button
              ref={moreRef}
              type="button"
              className="cui-file-uploader__more"
              aria-label={`More actions, ${name}`}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? menuId : undefined}
              onClick={() => onMenu(!menuOpen)}
            >
              <DotsThree className="cui-file-uploader__btn-icon" aria-hidden="true" focusable="false" />
            </button>
            {menuOpen && (
              <RowMenu
                id={menuId}
                name={name}
                anchor={moreRef}
                actions={actions}
                onClose={(returnFocus) => {
                  onMenu(false);
                  if (returnFocus) moreRef.current?.focus();
                }}
                onPreview={onPreview}
                onDownload={onDownload}
              />
            )}
          </>
        )}
        {failed && (
          <span className="cui-file-uploader__retry">
            <Button variant="ghost" size="sm" onClick={onRetry} disabled={disabled} aria-describedby={msgId}>
              Try again<span className="cui-file-uploader__sr">, {name}</span>
            </Button>
          </span>
        )}
        {!readOnly && (
          <button
            type="button"
            className="cui-file-uploader__remove"
            aria-label={uploading ? `Cancel upload, ${name}` : `Remove ${name}`}
            aria-describedby={failed ? msgId : undefined}
            disabled={disabled}
            onClick={onRemove}
          >
            <X className="cui-file-uploader__btn-icon" aria-hidden="true" focusable="false" />
          </button>
        )}
      </div>
      {failed && (
        <p className="cui-file-uploader__row-msg" id={msgId}>
          <WarningCircle className="cui-file-uploader__error-icon" weight="fill" aria-hidden="true" focusable="false" />
          <span>{message ?? 'Upload failed. Please check your connection and try again.'}</span>
        </p>
      )}
    </>
  );
}

/* ---------- The "More actions" menu: fixed to the window from its button, flipping up near the bottom ---------- */

interface RowMenuProps {
  id: string;
  name: string;
  anchor: RefObject<HTMLButtonElement | null>;
  actions: ('preview' | 'download')[];
  onClose: (returnFocus: boolean) => void;
  onPreview: () => void;
  onDownload: () => void;
}

function RowMenu({ id, name, anchor, actions, onClose, onPreview, onDownload }: RowMenuProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<CSSProperties>({ visibility: 'hidden' });
  const items = useMemo(() => (['preview', 'download'] as const).filter((a) => actions.includes(a)), [actions]);

  useLayoutEffect(() => {
    const b = anchor.current?.getBoundingClientRect();
    const m = ref.current;
    if (!b || !m) return;
    const gap = 4;
    const up = b.bottom + gap + m.offsetHeight > window.innerHeight && b.top > m.offsetHeight + gap;
    const left = Math.max(gap, Math.min(b.right - m.offsetWidth, document.documentElement.clientWidth - m.offsetWidth - gap));
    setPos(up ? { left, bottom: window.innerHeight - b.top + gap } : { left, top: b.bottom + gap });
    // Opening focuses the first item.
    m.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }, [anchor]);

  // It closes on an outside press, scroll or resize.
  useEffect(() => {
    const away = (e: Event) => {
      if (e.type === 'pointerdown' && (ref.current?.contains(e.target as Node) || anchor.current?.contains(e.target as Node))) return;
      onClose(false);
    };
    document.addEventListener('pointerdown', away);
    window.addEventListener('resize', away);
    window.addEventListener('scroll', away, true);
    return () => {
      document.removeEventListener('pointerdown', away);
      window.removeEventListener('resize', away);
      window.removeEventListener('scroll', away, true);
    };
  }, [anchor, onClose]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const list = Array.from(ref.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    const i = list.indexOf(document.activeElement as HTMLElement);
    const go: Record<string, number> = { ArrowDown: (i + 1) % list.length, ArrowUp: (i - 1 + list.length) % list.length, Home: 0, End: list.length - 1 };
    if (go[e.key] !== undefined) {
      e.preventDefault();
      list[go[e.key]]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      onClose(true);
    } else if (e.key === 'Tab') onClose(false);
  };

  return (
    <div
      ref={ref}
      id={id}
      className="cui-file-uploader__menu"
      role="menu"
      aria-label={`Actions for ${name}`}
      style={pos}
      onKeyDown={onKey}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null) && e.relatedTarget !== anchor.current) onClose(false);
      }}
    >
      {items.map((a) => (
        <button
          key={a}
          type="button"
          role="menuitem"
          tabIndex={-1}
          className="cui-file-uploader__menu-item"
          onClick={() => {
            if (a === 'preview') onPreview();
            else onDownload();
            onClose(true);
          }}
        >
          {a === 'preview' ? (
            <>
              <Eye className="cui-file-uploader__menu-icon" aria-hidden="true" focusable="false" />
              Preview<span className="cui-file-uploader__sr"> {name}, opens in a new tab</span>
              <ArrowSquareOut className="cui-file-uploader__menu-icon cui-file-uploader__menu-ext" aria-hidden="true" focusable="false" />
            </>
          ) : (
            <>
              <DownloadSimple className="cui-file-uploader__menu-icon" aria-hidden="true" focusable="false" />
              Download<span className="cui-file-uploader__sr"> {name}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
