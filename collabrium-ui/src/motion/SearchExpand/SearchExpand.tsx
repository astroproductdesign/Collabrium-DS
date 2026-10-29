'use client';

import { forwardRef, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { transition } from '../motion';

export interface SearchExpandProps {
  /** Names the field for assistive technology, e.g. "Search components". */
  'aria-label': string;
  /** Whether the field is open. Leave out to let it open and close itself. */
  expanded?: boolean;
  /** Called when it opens or closes. */
  onExpandedChange?: (expanded: boolean) => void;
  /** The text in the field. Leave out to let the field keep it. */
  value?: string;
  /** Called when the text changes. */
  onChange?: (value: string) => void;
  /** Hint inside the field while it is empty. Default "Search". */
  placeholder?: string;
}

/**
 * A search that is a round button until it is pressed, then grows into a field
 * and shrinks back when it loses focus while empty. Escape clears the text,
 * then closes. Focus stays on the button when it opens, and the field is the
 * next Tab stop (Q-MOT-18). Under reduced motion it opens and closes at once.
 */
export const SearchExpand = forwardRef<HTMLDivElement, SearchExpandProps>(function SearchExpand(
  { 'aria-label': label, expanded, onExpandedChange, value, onChange, placeholder = 'Search' },
  ref,
) {
  const [openOwn, setOpenOwn] = useState(false);
  const [textOwn, setTextOwn] = useState('');
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const open = expanded ?? openOwn;
  const text = value ?? textOwn;
  const setOpen = (next: boolean) => {
    if (expanded === undefined) setOpenOwn(next);
    onExpandedChange?.(next);
  };
  const setText = (next: string) => {
    if (value === undefined) setTextOwn(next);
    onChange?.(next);
  };
  const t = reduce ? { duration: 0 } : transition('morph', 'morph');
  return (
    <div
      ref={el => {
        box.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className="cui-search-expand"
      onBlur={e => {
        if (box.current && !box.current.contains(e.relatedTarget as Node) && text.trim() === '') setOpen(false);
      }}
      onKeyDown={e => {
        if (e.key !== 'Escape') return;
        if (text) setText('');
        else setOpen(false);
      }}
    >
      <motion.div className="cui-search-expand__field" data-open={open ? '' : undefined} initial={false} animate={{ width: open ? '100%' : 'var(--control-height-md)' }} transition={t}>
        <button type="button" className="cui-search-expand__toggle" aria-label={open ? 'Search' : `Open ${label.toLowerCase()}`} aria-expanded={open} onClick={() => setOpen(true)}>
          <MagnifyingGlass size={16} aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div className="cui-search-expand__inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t}>
              <input ref={input} type="search" className="cui-search-expand__input" aria-label={label} placeholder={placeholder} value={text} onChange={e => setText(e.target.value)} />
              {text ? (
                <button
                  type="button"
                  className="cui-search-expand__clear"
                  aria-label="Clear search"
                  onClick={() => {
                    setText('');
                    input.current?.focus();
                  }}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              ) : (
                <span className="cui-search-expand__hint" aria-hidden="true">
                  Esc
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});
