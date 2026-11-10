'use client';

import { forwardRef, useEffect, useMemo, useState, type CSSProperties, type HTMLAttributes } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Dropdown, type DropdownOption } from '../Dropdown';
import type { WithoutStyling } from '../../utils/types';

type NativeNavProps = WithoutStyling<Omit<HTMLAttributes<HTMLElement>, 'children' | 'aria-label' | 'color'>>;

export interface PaginationProps extends NativeNavProps {
  /** The current page (1-based), controlled. Update it at once on change, before the data arrives (the DS's optimistic rule). */
  page?: number;
  /** The first page, uncontrolled. Default 1. */
  defaultPage?: number;
  /** A new page was chosen: a number, Prev / Next, or the page picker. */
  onPageChange?: (page: number) => void;
  /** Rows per page. Default 20. */
  pageSize?: number;
  /** How many results there are in all. Leave out when unknown, and give `totalPages`. */
  totalResults?: number;
  /** How many pages there are, when `totalResults` isn't known. Otherwise worked out from it. */
  totalPages?: number;
  /**
   * Shows the Rows per page picker (a Dropdown), in both variants (decided Q-PAG-1, so a bigger size never strands the reader).
   * Choosing a size goes back to page 1.
   */
  onPageSizeChange?: (size: number) => void;
  /** The Rows per page choices. Default 10, 20, 50, 100. */
  pageSizeOptions?: number[];
  /**
   * Remembers the chosen page size in the browser under this key, and restores it on load (by calling
   * `onPageSizeChange`). Off unless given (Q-PAG-4).
   */
  pageSizeStorageKey?: string;
  /** The next page's data is loading: the result count shows the previous one in Neutral-4. Controls stay live. */
  loading?: boolean;
  /** Names the navigation landmark. Default "Pagination". */
  label?: string;
}

const DEFAULT_SIZES = [10, 20, 50, 100];
// Overflow takes over at 10 pages (the DS: chosen by page count, never a flag).
const OVERFLOW_AT = 10;
// The Default variant shows at most 7 slots, numbers and ellipses together.
const SLOTS = 7;

/** The 7-slot window: 1 … 4 [5] 6 … 9, keeping the first, the last and the current page's neighbours. */
function pageSlots(page: number, total: number): (number | 'gap')[] {
  if (total <= SLOTS) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, 'gap', total];
  if (page >= total - 3) return [1, 'gap', total - 4, total - 3, total - 2, total - 1, total];
  return [1, 'gap', page - 1, page, page + 1, 'gap', total];
}

const fmt = (n: number) => n.toLocaleString('en-US');

/** The picker's box fits its longest number, so it never changes width as the value changes. */
const digits = (max: number) => ({ '--cui-pagination-digits': String(max).length }) as CSSProperties;

/** "Showing 41–60 of 116", "Showing 1 of 1", "Showing 1–20" (total unknown). No "No results": the control hides (Q-PAG-3). */
function countText(page: number, size: number, total?: number) {
  const start = (page - 1) * size + 1;
  const end = total === undefined ? page * size : Math.min(page * size, total);
  const range = start === end ? fmt(start) : `${fmt(start)}–${fmt(end)}`;
  return total === undefined ? `Showing ${range}` : `Showing ${range} of ${fmt(total)}`;
}

/**
 * Collabrium Pagination: the footer under a table or list. Under 10 pages, numbered buttons (a 7-slot window with
 * ellipses) and the result count; from 10, Prev / a page Dropdown / "of N" / Next and an optional Rows per page.
 * Hidden when everything fits on one page. Ported from components.css `.c-page*` and `.c-pagination*` (3730–3806).
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(props, ref) {
  const {
    page: pageProp,
    defaultPage = 1,
    onPageChange,
    pageSize = 20,
    totalResults,
    totalPages: totalPagesProp,
    onPageSizeChange,
    pageSizeOptions = DEFAULT_SIZES,
    pageSizeStorageKey,
    loading = false,
    label = 'Pagination',
    ...rest
  } = props;
  const [innerPage, setInnerPage] = useState(defaultPage);
  const totalPages = Math.max(1, totalPagesProp ?? (totalResults !== undefined ? Math.ceil(totalResults / pageSize) : 1));
  const page = Math.min(Math.max(1, pageProp ?? innerPage), totalPages);

  const go = (next: number) => {
    const p = Math.min(Math.max(1, next), totalPages);
    if (p === page) return;
    if (pageProp === undefined) setInnerPage(p);
    onPageChange?.(p);
  };

  const changeSize = (size: number) => {
    if (pageSizeStorageKey) {
      try {
        localStorage.setItem(pageSizeStorageKey, String(size));
      } catch {
        /* storage blocked: the choice still applies */
      }
    }
    onPageSizeChange?.(size);
    // A new page size goes back to page 1.
    if (pageProp === undefined) setInnerPage(1);
    if (page !== 1) onPageChange?.(1);
  };

  const pageOptions = useMemo<DropdownOption[]>(
    () => Array.from({ length: totalPages }, (_, i) => ({ value: String(i + 1), label: String(i + 1) })),
    [totalPages],
  );
  const sizeOptions = useMemo<DropdownOption[]>(
    () => pageSizeOptions.map((n) => ({ value: String(n), label: String(n) })),
    [pageSizeOptions],
  );

  // Restore a remembered page size once, on load.
  useEffect(() => {
    if (!pageSizeStorageKey || !onPageSizeChange) return;
    try {
      const stored = Number(localStorage.getItem(pageSizeStorageKey));
      if (stored && stored !== pageSize && pageSizeOptions.includes(stored)) onPageSizeChange(stored);
    } catch {
      /* storage blocked */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSizeStorageKey]);

  // The minimum page rule: never a single-page control. With Rows per page, it hides only when the results fit the
  // smallest size, so a reader who picked a bigger one can still pick a smaller one (Q-PAG-1).
  const fitsAll = onPageSizeChange ? Math.min(pageSize, ...pageSizeOptions) : pageSize;
  if (totalResults !== undefined ? totalResults <= fitsAll : totalPages <= 1 && !onPageSizeChange) return null;

  const overflow = totalPages >= OVERFLOW_AT;

  const rows = onPageSizeChange && (
    <div className="cui-pagination__rows">
      <span className="cui-pagination__picker" style={digits(Math.max(...pageSizeOptions))}>
        <Dropdown
          label="Rows per page"
          options={sizeOptions}
          value={String(pageSize)}
          onValueChange={(v) => changeSize(Number(v))}
        />
      </span>
    </div>
  );

  if (overflow) {
    return (
      <nav {...rest} ref={ref} className="cui-pagination" data-variant="overflow" aria-label={label}>
        {rows}
        <div className="cui-pagination__controls">
          {/* Named by its visible label ("Prev"), so speech input users can say what they see. */}
          <button type="button" className="cui-pagination__text-nav" disabled={page === 1} onClick={() => go(page - 1)}>
            <CaretLeft className="cui-pagination__text-nav-icon" aria-hidden="true" focusable="false" />
            Prev
          </button>
          <span className="cui-pagination__picker" style={digits(totalPages)}>
            {/* Our Dropdown (decided 2026-11-10, Q-PAG-2). Its hidden label carries "of N", so the visible one is hidden from screen readers. */}
            <Dropdown
              label={`Current page, of ${fmt(totalPages)}`}
              hideLabel
              options={pageOptions}
              value={String(page)}
              onValueChange={(v) => go(Number(v))}
            />
          </span>
          <span className="cui-pagination__total" aria-hidden="true">
            of {fmt(totalPages)}
          </span>
          <button type="button" className="cui-pagination__text-nav" disabled={page === totalPages} onClick={() => go(page + 1)}>
            Next
            <CaretRight className="cui-pagination__text-nav-icon" aria-hidden="true" focusable="false" />
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav {...rest} ref={ref} className="cui-pagination" data-variant="default" aria-label={label}>
      <div className="cui-pagination__summary">
        <span className="cui-pagination__count" data-stale={loading || undefined}>
          {countText(page, pageSize, totalResults)}
        </span>
        {rows}
      </div>
      {/* One page left (after a bigger page size): the count and Rows per page stay, the page controls go. */}
      {totalPages > 1 && (
      <div className="cui-pagination__controls">
        <button type="button" className="cui-pagination__nav" disabled={page === 1} onClick={() => go(page - 1)} aria-label="Previous page">
          <CaretLeft className="cui-pagination__nav-icon" aria-hidden="true" focusable="false" />
        </button>
        <span className="cui-pagination__indicator">
          {page} of {totalPages}
        </span>
        {pageSlots(page, totalPages).map((slot, i) =>
          slot === 'gap' ? (
            <span key={`gap-${i}`} className="cui-pagination__ellipsis" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={slot}
              type="button"
              className="cui-pagination__page"
              aria-label={`Page ${slot}`}
              aria-current={slot === page ? 'page' : undefined}
              // The current page stays focusable but does nothing (the DS).
              onClick={() => go(slot)}
            >
              {slot}
            </button>
          ),
        )}
        <button type="button" className="cui-pagination__nav" disabled={page === totalPages} onClick={() => go(page + 1)} aria-label="Next page">
          <CaretRight className="cui-pagination__nav-icon" aria-hidden="true" focusable="false" />
        </button>
      </div>
      )}
    </nav>
  );
});
