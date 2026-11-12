'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, Plus, PushPin, Trash } from '@phosphor-icons/react';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import { profileInitials } from '../ProfileCard/ProfileCard';
import type { WithoutStyling } from '../../utils/types';

/** One note on a record. */
export interface Note {
  id: string;
  /** What the note says. Up to 280 characters. */
  text: string;
  /** Who wrote it. */
  author: string;
  /** When, as `YYYY-MM-DD`. Shown as "27 Aug 2026". */
  date: string;
  /** Set when the note is settled: who resolved it and when (`YYYY-MM-DD`). It keeps its slot and colour. */
  resolved?: { by: string; date: string };
}

/** The colour a note takes from its position on the row: 1st orange, 2nd pink, 3rd green, 4th navy. */
export type NoteColour = 'orange' | 'pink' | 'green' | 'navy';
const COLOURS: NoteColour[] = ['orange', 'pink', 'green', 'navy'];

/** A row holds at most four notes. */
export const NOTES_MAX = 4;
/** The note field's limit. */
export const NOTE_MAX_LENGTH = 280;

type NativeSpanProps = WithoutStyling<Omit<HTMLAttributes<HTMLSpanElement>, 'children'>>;

export interface NotesProps extends NativeSpanProps {
  /** The record the notes are on ("Celcom Axiata"): the panel's title and every control's name. */
  record: string;
  /** The notes, in order; their position sets their colour. Only the first four show. */
  notes: Note[];
  /** Who is writing: shown on a new note ("Signing in as"). */
  currentUser: { name: string; initials?: string };
  /** Saves a new note. The page adds it to `notes`. */
  onAdd: (text: string) => void;
  /** Saves an edited note. */
  onEdit: (id: string, text: string) => void;
  /** Deletes a note; the ones after it shift up a colour. */
  onDelete: (id: string) => void;
  /** Marks a note settled (the page sets `resolved`). */
  onResolve: (id: string) => void;
  /** Reopens a resolved note (the page clears `resolved`). */
  onReopen: (id: string) => void;
}

const fmtDate = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};
const fmtMonth = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { month: 'long' });
};
const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const newest = (notes: Note[]) => notes.reduce((a, n) => (n.date > a ? n.date : a), notes[0]?.date ?? todayIso());

/** The panel's views: the 2x2 grid, one note, editing one, or writing a new one. */
/** `fromGrid`: the note was opened from the grid, so it offers a way back (decided 2026-11-12, Q-NOTES-2). */
type View =
  | { kind: 'grid' }
  | { kind: 'note'; id: string; fromGrid?: boolean }
  | { kind: 'edit'; id: string; fromGrid?: boolean }
  | { kind: 'new'; back: 'close' | 'grid' };

/** The cap's plain-English reason, on the disabled add buttons' tooltip (decided 2026-11-12, Q-NOTES-4). */
const CAP_REASON = 'A row holds four notes.';

const EDGE = 12; // the margin a floating surface keeps from the window's edge
const PEEK_GAP = 8;

const FOCUSABLE = 'button:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

/**
 * Collabrium Notes: coloured annotations on one record (a table or list row), up to four. A pin (or a stack of 2–4)
 * with an add button; hovering shows a peek, clicking opens a panel anchored to the row, which reads, edits and
 * writes notes. No modal. The page owns the notes.
 */
export const Notes = forwardRef<HTMLSpanElement, NotesProps>(function Notes(props, ref) {
  const { record, notes: allNotes, currentUser, onAdd, onEdit, onDelete, onResolve, onReopen, ...rest } = props;
  const notes = allNotes.slice(0, NOTES_MAX);
  const count = notes.length;
  const full = count >= NOTES_MAX;
  const uid = useId();
  const fieldId = `${uid}-field`;

  const pinRef = useRef<HTMLButtonElement | null>(null);
  const addRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const peekRef = useRef<HTMLDivElement | null>(null);
  const fieldRef = useRef<HTMLTextAreaElement | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ---- panel state ----
  const [view, setView] = useState<View | null>(null);
  const [from, setFrom] = useState<'pin' | 'add'>('pin');
  const [draft, setDraft] = useState('');
  const open = view !== null;
  const autoView = (n: Note[]): View | null => (n.length >= 2 ? { kind: 'grid' } : n.length === 1 ? { kind: 'note', id: n[0].id } : null);

  // A note the view points at can disappear (deleted elsewhere): fall back to the grid or the one note left.
  useEffect(() => {
    if (!view) return;
    if ((view.kind === 'note' || view.kind === 'edit') && !notes.some((n) => n.id === view.id)) setView(autoView(notes));
    if (view.kind === 'grid' && count < 2) setView(autoView(notes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, count, notes.map((n) => n.id).join('|')]);

  const anchor = () => (from === 'add' ? addRef.current : pinRef.current) ?? addRef.current;
  const close = useCallback(
    (returnFocus: boolean) => {
      setView(null);
      if (returnFocus) requestAnimationFrame(() => (pinRef.current ?? addRef.current)?.focus());
    },
    [],
  );

  const openFromPin = () => {
    setFrom('pin');
    setPeek(false);
    setView(autoView(notes));
  };
  const openNew = (back: 'close' | 'grid') => {
    if (full) return;
    setDraft('');
    setView({ kind: 'new', back });
  };

  // ---- placement: the panel grows out of the control it came from ----
  const [pos, setPos] = useState<CSSProperties>({});
  const [opening, setOpening] = useState(false);
  const place = useCallback(
    (animate: boolean) => {
      const a = anchor();
      const p = panelRef.current;
      if (!a || !p) return;
      const r = a.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = p.offsetWidth;
      const maxH = vh - EDGE * 2;
      const h = Math.min(p.scrollHeight, maxH);
      const left = Math.max(EDGE, Math.min(r.left, vw - EDGE - w));
      const top = Math.max(EDGE, Math.min(r.top, vh - EDGE - h));
      const next: Record<string, string | number> = { left, top, maxHeight: maxH };
      if (animate) {
        next['--nsw-dx'] = `${r.left - left}px`;
        next['--nsw-dy'] = `${r.top - top}px`;
        next['--nsw-sx'] = `${r.width / w}`;
        next['--nsw-sy'] = `${r.height / h}`;
      }
      setPos(next as CSSProperties);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [from],
  );
  const wasOpen = useRef(false);
  useLayoutEffect(() => {
    if (!open) {
      wasOpen.current = false;
      return;
    }
    const first = !wasOpen.current;
    wasOpen.current = true;
    place(first);
    if (first) {
      setOpening(true);
      panelRef.current?.focus();
    }
  }, [open, view, place]);

  // Edit and new put the caret in the field: the person opened them to type.
  useEffect(() => {
    const f = fieldRef.current;
    if ((view?.kind === 'edit' || view?.kind === 'new') && f) {
      f.focus();
      // Editing carries on from the end of what's there.
      f.setSelectionRange(f.value.length, f.value.length);
    }
  }, [view]);

  // ---- closing: Escape (in the panel's keydown), an outside press, or the page scrolling ----
  useEffect(() => {
    if (!open) return;
    const press = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || pinRef.current?.contains(t) || addRef.current?.contains(t)) return;
      close(false);
    };
    const scroll = (e: Event) => {
      if (panelRef.current?.contains(e.target as Node)) return;
      close(false);
    };
    const resize = () => place(false);
    document.addEventListener('pointerdown', press, true);
    window.addEventListener('scroll', scroll, true);
    window.addEventListener('resize', resize);
    return () => {
      document.removeEventListener('pointerdown', press, true);
      window.removeEventListener('scroll', scroll, true);
      window.removeEventListener('resize', resize);
    };
  }, [open, close, place]);

  const panelKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close(true);
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    // Focus stays in the panel while it's open.
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // ---- peek: the notes as a list, on hover or keyboard focus of the pin ----
  const [peek, setPeek] = useState(false);
  const [peekPos, setPeekPos] = useState<CSSProperties>({});
  useLayoutEffect(() => {
    if (!peek || !pinRef.current || !peekRef.current) return;
    const r = pinRef.current.getBoundingClientRect();
    const w = peekRef.current.offsetWidth;
    const h = peekRef.current.offsetHeight;
    const left = Math.max(EDGE, Math.min(r.left, window.innerWidth - EDGE - w));
    const below = r.bottom + PEEK_GAP;
    const top = below + h > window.innerHeight - EDGE ? Math.max(EDGE, r.top - PEEK_GAP - h) : below;
    setPeekPos({ left, top });
  }, [peek, count]);
  useEffect(() => {
    if (!peek) return;
    const hide = () => setPeek(false);
    window.addEventListener('scroll', hide, true);
    return () => window.removeEventListener('scroll', hide, true);
  }, [peek]);
  const showPeek = open ? false : peek;

  // ---- pieces ----
  const colourOf = (id: string) => COLOURS[Math.max(0, notes.findIndex((n) => n.id === id))];
  const glyph = (n: Note) =>
    n.resolved ? (
      <CheckCircle weight="fill" aria-hidden="true" focusable="false" />
    ) : (
      <PushPin weight="fill" aria-hidden="true" focusable="false" />
    );

  const pinLabel =
    count === 1
      ? `Read the ${notes[0].resolved ? 'resolved ' : ''}note on ${record}`
      : `${count} notes on ${record}, open the stack`;
  const peekEvents = {
    onPointerEnter: () => setPeek(true),
    onPointerLeave: () => setPeek(false),
    onFocus: (e: React.FocusEvent<HTMLButtonElement>) => {
      if (e.currentTarget.matches(':focus-visible')) setPeek(true);
    },
    onBlur: () => setPeek(false),
  };

  const addButton = (
    <button
      ref={addRef}
      type="button"
      className="cui-notes__icon-btn cui-notes__add"
      aria-label={`Add a note to ${record}`}
      aria-haspopup="dialog"
      aria-expanded={open && view?.kind === 'new' && from === 'add'}
      aria-disabled={full || undefined}
      onClick={() => {
        if (full) return;
        setFrom('add');
        setPeek(false);
        openNew('close');
      }}
    >
      <Plus weight="regular" aria-hidden="true" focusable="false" />
    </button>
  );

  // ---- the panel's views ----
  let panelLabel = '';
  let tinted: NoteColour | null = null;
  let body: React.ReactNode = null;
  if (view?.kind === 'grid') {
    panelLabel = `${count} notes on ${record}`;
    const addInPanel = (
      <Button
        variant="primary"
        size="sm"
        aria-label={`Add a note to ${record}`}
        aria-disabled={full || undefined}
        onClick={() => openNew('grid')}
      >
        Add a note
      </Button>
    );
    body = (
      <>
        <div className="cui-notes__top">
          <span className="cui-notes__eyebrow">Pinned notes</span>
        </div>
        <div className="cui-notes__body">
          <span className="cui-notes__kick">Notes · {fmtMonth(newest(notes))}</span>
          <span className="cui-notes__title">{record}</span>
          <div className="cui-notes__grid" role="list">
            {notes.map((n, i) => (
              <button
                key={n.id}
                type="button"
                role="listitem"
                className="cui-notes__card"
                data-colour={COLOURS[i]}
                data-resolved={n.resolved ? '' : undefined}
                aria-label={`${n.resolved ? 'Resolved note' : 'Note'} by ${n.author}, ${fmtDate(n.date)}. Open it`}
                onClick={() => setView({ kind: 'note', id: n.id, fromGrid: true })}
              >
                <span className="cui-notes__card-text">{n.text}</span>
                <span className="cui-notes__card-meta">
                  {glyph(n)}
                  {n.resolved ? `Resolved by ${n.resolved.by}` : `${n.author} · ${fmtDate(n.date)}`}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="cui-notes__actions">
          {full ? (
            <Tooltip content={CAP_REASON} role="description">
              {addInPanel}
            </Tooltip>
          ) : (
            addInPanel
          )}
        </div>
      </>
    );
  } else if (view?.kind === 'note' || view?.kind === 'edit') {
    const n = notes.find((x) => x.id === view.id);
    if (n) {
      tinted = colourOf(n.id);
      const editing = view.kind === 'edit';
      const fromGrid = !!view.fromGrid && count >= 2;
      panelLabel = editing ? `Editing the note on ${record}` : `Note on ${record}`;
      body = (
        <>
          <div className="cui-notes__top">
            {/* The DS gives no word for a read note's eyebrow: "Pinned by" (decided 2026-11-12, Q-NOTES-3). */}
            <span className="cui-notes__eyebrow">Pinned by</span>
            <i className="cui-notes__avatar" aria-hidden="true">
              {profileInitials(n.author)}
            </i>
            <b className="cui-notes__name">{n.author}</b>
          </div>
          <div className="cui-notes__body">
            <span className="cui-notes__kick">Note · {fmtMonth(n.date)}</span>
            {editing ? (
              <>
                <label className="cui-notes__title" htmlFor={fieldId}>
                  {record}
                </label>
                <textarea
                  ref={fieldRef}
                  id={fieldId}
                  className="cui-notes__field"
                  rows={6}
                  maxLength={NOTE_MAX_LENGTH}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
              </>
            ) : (
              <>
                <span className="cui-notes__title">{record}</span>
                <p className="cui-notes__text">{n.text}</p>
                <span className="cui-notes__by">{fmtDate(n.date)}</span>
                {n.resolved && (
                  <span className="cui-notes__resolved">
                    <CheckCircle weight="fill" aria-hidden="true" focusable="false" />
                    <span>
                      Resolved by <b>{n.resolved.by}</b> · {fmtDate(n.resolved.date)}
                    </span>
                  </span>
                )}
              </>
            )}
          </div>
          <div className="cui-notes__actions">
            {editing ? (
              <>
                <Button variant="secondary" size="sm" onClick={() => setView({ kind: 'note', id: n.id, fromGrid })}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!draft.trim()}
                  onClick={() => {
                    onEdit(n.id, draft.trim());
                    setView({ kind: 'note', id: n.id, fromGrid });
                  }}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="cui-notes__icon-btn cui-notes__delete"
                  aria-label={`Delete the note by ${n.author}`}
                  onClick={() => {
                    const left = notes.filter((x) => x.id !== n.id);
                    onDelete(n.id);
                    const next = autoView(left);
                    if (next) {
                      setView(next);
                      panelRef.current?.focus();
                    } else {
                      // The pin is gone with its last note: focus goes to the add button that stays.
                      close(false);
                      requestAnimationFrame(() => addRef.current?.focus());
                    }
                  }}
                >
                  <Trash weight="regular" aria-hidden="true" focusable="false" />
                </button>
                {fromGrid && (
                  <span className="cui-notes__back">
                    <Button variant="ghost" size="sm" onClick={() => setView({ kind: 'grid' })}>
                      All notes
                    </Button>
                  </span>
                )}
                <Button variant="secondary" size="sm" onClick={() => (n.resolved ? onReopen(n.id) : onResolve(n.id))}>
                  {n.resolved ? 'Reopen' : 'Resolve'}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setDraft(n.text);
                    setView({ kind: 'edit', id: n.id, fromGrid });
                  }}
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        </>
      );
    }
  } else if (view?.kind === 'new') {
    tinted = COLOURS[Math.min(count, NOTES_MAX - 1)];
    panelLabel = `New note on ${record}`;
    const back = view.back;
    body = (
      <>
        <div className="cui-notes__top">
          <span className="cui-notes__eyebrow">Signing in as</span>
          <i className="cui-notes__avatar" aria-hidden="true">
            {currentUser.initials ?? profileInitials(currentUser.name)}
          </i>
          <b className="cui-notes__name">{currentUser.name}</b>
        </div>
        <div className="cui-notes__body">
          <span className="cui-notes__kick">Note · {fmtMonth(todayIso())}</span>
          <label className="cui-notes__title" htmlFor={fieldId}>
            {record}
          </label>
          <textarea
            ref={fieldRef}
            id={fieldId}
            className="cui-notes__field"
            rows={6}
            maxLength={NOTE_MAX_LENGTH}
            placeholder="Type your note here"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        </div>
        <div className="cui-notes__actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => (back === 'grid' ? setView({ kind: 'grid' }) : close(true))}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={!draft.trim()}
            onClick={() => {
              onAdd(draft.trim());
              // Back to the row's notes, the new one among them: the grid at 2 or more, the note itself at 1.
              setView({ kind: 'grid' });
            }}
          >
            Save
          </Button>
        </div>
      </>
    );
  }

  const panel = open ? (
    <div
      ref={panelRef}
      className="cui-notes__panel"
      role="dialog"
      aria-label={panelLabel}
      tabIndex={-1}
      data-colour={tinted ?? undefined}
      data-tinted={tinted ? '' : undefined}
      data-opening={opening ? '' : undefined}
      style={pos}
      onKeyDown={panelKey}
      onAnimationEnd={() => setOpening(false)}
    >
      {body}
    </div>
  ) : null;

  const peekCard =
    count > 0 ? (
      <div ref={peekRef} className="cui-notes__peek" data-open={showPeek ? '' : undefined} style={peekPos} aria-hidden="true">
        {notes.map((n, i) => (
          <div key={n.id} className="cui-notes__peek-row" data-resolved={n.resolved ? '' : undefined}>
            <span className="cui-notes__swatch" data-colour={COLOURS[i]} data-resolved={n.resolved ? '' : undefined}>
              {glyph(n)}
            </span>
            <span className="cui-notes__peek-body">
              <span className="cui-notes__peek-text">{n.text}</span>
              <span className="cui-notes__peek-meta">
                {n.author} · {fmtDate(n.date)}
                {n.resolved ? ` · Resolved by ${n.resolved.by}` : ''}
              </span>
            </span>
          </div>
        ))}
      </div>
    ) : null;

  return (
    <span {...rest} ref={ref} className="cui-notes">
      {count === 1 && (
        <button
          ref={pinRef}
          type="button"
          className="cui-notes__pin"
          data-colour={COLOURS[0]}
          data-resolved={notes[0].resolved ? '' : undefined}
          data-hidden={open && from === 'pin' ? '' : undefined}
          aria-label={pinLabel}
          aria-haspopup="dialog"
          aria-expanded={open && from === 'pin'}
          onClick={openFromPin}
          {...peekEvents}
        >
          {glyph(notes[0])}
        </button>
      )}
      {count > 1 && (
        <button
          ref={pinRef}
          type="button"
          className="cui-notes__stack"
          style={{ '--n': count } as CSSProperties}
          data-hidden={open && from === 'pin' ? '' : undefined}
          aria-label={pinLabel}
          aria-haspopup="dialog"
          aria-expanded={open && from === 'pin'}
          onClick={openFromPin}
          {...peekEvents}
        >
          {notes.map((n, i) => (
            <span
              key={n.id}
              className="cui-notes__mini"
              data-colour={COLOURS[i]}
              data-resolved={n.resolved ? '' : undefined}
              style={{ '--i': i } as CSSProperties}
            >
              {glyph(n)}
            </span>
          ))}
        </button>
      )}
      {full ? (
        <Tooltip content={CAP_REASON} role="description">
          {addButton}
        </Tooltip>
      ) : (
        addButton
      )}
      {mounted && peekCard && createPortal(peekCard, document.body)}
      {mounted && panel && createPortal(panel, document.body)}
    </span>
  );
});
