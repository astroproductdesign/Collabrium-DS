'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { ArrowDown, ArrowUp, ArrowsDownUp, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

/** One column. Every column sorts unless `sortable: false` (only for a column with no meaningful order). */
export interface TableColumn<T> {
  /** A unique key; also the row field read when there is no `render` or `sortValue`. */
  key: string;
  /** The header label. Keep it short. */
  header: string;
  /** `number` adds tabular figures (still left-aligned, as every column). Default `text`. */
  type?: 'text' | 'number' | 'date' | 'status';
  /** What the cell shows. Default: the row's `key` field as text. */
  render?: (row: T) => ReactNode;
  /** What the column sorts by (a number, or text compared naturally). Default: the row's `key` field. */
  sortValue?: (row: T) => string | number;
  /** Default true. Turn off only for a column with no meaningful order (freeform notes). */
  sortable?: boolean;
  /** `low` hides first, at 1024px and below; `medium` at 768px and below; `high` always shows. Default `high`. */
  priority?: 'high' | 'medium' | 'low';
  /** A 14px icon before the cell's content, only where it identifies something (a channel, a file type). */
  icon?: (row: T) => Icon | undefined;
  /**
   * This column's cell in the total row, from every row (not only those on screen): a sum, an average. Any column
   * with a `total` adds the row; the first column shows `totalLabel` there.
   */
  total?: (rows: T[]) => ReactNode;
}

/** A row action: a ghost icon button in the action column. */
export interface TableRowAction<T> {
  /** Names the action; read with the row's name ("Edit, Raya promo"). */
  label: string;
  icon: Icon;
  onClick: (row: T) => void;
}

/** A bulk action in the toolbar that replaces the header while rows are selected. */
export interface TableBulkAction {
  label: string;
  icon?: Icon;
  onClick: (selectedKeys: string[]) => void;
  /** `danger`: Red text, for a destructive action (Delete). */
  tone?: 'default' | 'danger';
}

export interface TableSort {
  key: string;
  direction: 'ascending' | 'descending';
}

type UpToThree<A> = [A] | [A, A] | [A, A, A];

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'aria-label' | 'color'>>;

export interface TableProps<T> extends NativeDivProps {
  /** `standalone` (the default): the table is the surface (border, radius, h5 headers on Neutral-2). `embedded`: inside a Card or panel (no container, small uppercase headers). */
  variant?: 'standalone' | 'embedded';
  /** Names the table for screen readers ("Campaigns"). */
  label: string;
  columns: TableColumn<T>[];
  rows: T[];
  /** A stable, unique key for each row. */
  getRowKey: (row: T) => string;
  /** The row's name, read with its checkbox and actions ("Select Raya promo"). Default: its first column's text. */
  getRowLabel?: (row: T) => string;
  /** Makes each row open something: a press anywhere on it, or Enter on its first column. */
  onRowClick?: (row: T) => void;
  /** Adds the checkbox column (opt-in: only where selecting several rows is a real task). */
  selectable?: boolean;
  /** Selected row keys, controlled. */
  selectedKeys?: string[];
  /** Selected row keys at first, uncontrolled. */
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  /** Standalone only: up to 3 actions in the toolbar shown while rows are selected. */
  bulkActions?: UpToThree<TableBulkAction>;
  /** Up to 3 actions on every row, always visible in the last column. */
  rowActions?: UpToThree<TableRowAction<T>>;
  /** The sort, controlled (`null`: unsorted). */
  sort?: TableSort | null;
  /** The sort at first, uncontrolled. */
  defaultSort?: TableSort | null;
  onSortChange?: (sort: TableSort | null) => void;
  /** Leave the rows in the order given (sort on the server from `onSortChange`). */
  manualSort?: boolean;
  /** Shows 3 skeleton rows after 300ms, so a fast load doesn't flash. */
  loading?: boolean;
  /** Shown in the body when there are no rows: an `EmptyState` (section for no data, inline for no matches). */
  empty?: ReactNode;
  /** Standalone only: the table scrolls inside `maxHeight` and its header stays visible. */
  stickyHeader?: boolean;
  /** The scroll box's height in px, with `stickyHeader`. Default 480. */
  maxHeight?: number;
  /** The total row's label, in the first column. Default "Total". */
  totalLabel?: string;
}

const SKELETON_DELAY_MS = 300;
const SKELETON_ROWS = 3;
// Bar widths (%), varied like the gallery's so the skeleton doesn't read as a solid block.
const skelWidth = (r: number, c: number) => (c === 0 ? [70, 55, 80][r % 3] : [50, 60, 40, 55][c % 4]);

const fieldOf = (row: unknown, key: string) => (row as Record<string, unknown>)[key];

function TableInner<T>(props: TableProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    variant = 'standalone',
    label,
    columns,
    rows,
    getRowKey,
    getRowLabel,
    onRowClick,
    selectable = false,
    selectedKeys: selectedProp,
    defaultSelectedKeys,
    onSelectionChange,
    bulkActions,
    rowActions,
    sort: sortProp,
    defaultSort = null,
    onSortChange,
    manualSort = false,
    loading = false,
    empty,
    stickyHeader = false,
    maxHeight = 480,
    totalLabel = 'Total',
    ...rest
  } = props;
  const standalone = variant === 'standalone';
  const sticky = stickyHeader && standalone;

  /* Sorting: one column at a time, unsorted → ascending → descending → unsorted. */
  const [innerSort, setInnerSort] = useState<TableSort | null>(defaultSort);
  const sort = sortProp !== undefined ? sortProp : innerSort;
  const cycleSort = (key: string) => {
    const next: TableSort | null =
      sort?.key !== key ? { key, direction: 'ascending' } : sort.direction === 'ascending' ? { key, direction: 'descending' } : null;
    if (sortProp === undefined) setInnerSort(next);
    onSortChange?.(next);
  };
  const sortedRows = useMemo(() => {
    if (!sort || manualSort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const value = (row: T) => (col.sortValue ? col.sortValue(row) : (fieldOf(row, col.key) as string | number | undefined));
    const dir = sort.direction === 'ascending' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = value(a);
      const bv = value(b);
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true }) * dir;
    });
  }, [rows, columns, sort, manualSort]);

  /* Selection. */
  const [innerSelected, setInnerSelected] = useState<string[]>(defaultSelectedKeys ?? []);
  const selected = selectedProp ?? innerSelected;
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const setSelected = (keys: string[]) => {
    if (selectedProp === undefined) setInnerSelected(keys);
    onSelectionChange?.(keys);
  };
  const allKeys = rows.map(getRowKey);
  const checkedCount = allKeys.filter((k) => selectedSet.has(k)).length;
  const allChecked = allKeys.length > 0 && checkedCount === allKeys.length;
  const someChecked = checkedCount > 0 && !allChecked;

  const rowLabel = useCallback(
    (row: T) => {
      if (getRowLabel) return getRowLabel(row);
      const first = columns[0];
      const v = first?.sortValue ? first.sortValue(row) : fieldOf(row, first?.key ?? '');
      return v === undefined || v === null ? '' : String(v);
    },
    [getRowLabel, columns],
  );

  /* Loading: the skeleton waits 300ms; real rows fade in after it. */
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [reveal, setReveal] = useState(0);
  const wasSkeleton = useRef(false);
  useEffect(() => {
    if (!loading) {
      setShowSkeleton(false);
      return;
    }
    const t = setTimeout(() => setShowSkeleton(true), SKELETON_DELAY_MS);
    return () => clearTimeout(t);
  }, [loading]);
  useEffect(() => {
    if (wasSkeleton.current && !showSkeleton) setReveal((n) => n + 1);
    wasSkeleton.current = showSkeleton;
  }, [showSkeleton]);

  /* Scroll edges: the frozen columns' shadows, and the sticky header's. */
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const headRowRef = useRef<HTMLTableRowElement | null>(null);
  const firstRowRef = useRef<HTMLTableRowElement | null>(null);
  const [edges, setEdges] = useState({ left: false, right: false, top: false });
  const [headHeight, setHeadHeight] = useState<number | undefined>(undefined);
  const measure = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const rowH = firstRowRef.current?.offsetHeight ?? 0;
    const next = { left: el.scrollLeft > 2, right: el.scrollLeft < max - 2, top: sticky && el.scrollTop > rowH };
    setEdges((e) => (e.left === next.left && e.right === next.right && e.top === next.top ? e : next));
    setHeadHeight(headRowRef.current?.offsetHeight);
  }, [sticky]);
  useLayoutEffect(() => {
    measure();
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [measure, rows.length, columns.length]);

  const showBulk = selectable && standalone && checkedCount > 0 && bulkActions && bulkActions.length > 0;
  const interactive = !!onRowClick || selectable || !!rowActions;
  const actionCount = rowActions?.length ?? 0;
  // The total row: designed here, not in the DLS (decided 2026-11-10, Q-TABLE-15). Hidden while loading or empty.
  const showTotal = columns.some((c) => c.total) && rows.length > 0 && !showSkeleton;
  const colCount = columns.length + (selectable ? 1 : 0) + (actionCount ? 1 : 0);

  const onRowPress = (row: T) => (event: ReactMouseEvent<HTMLTableRowElement>) => {
    if (!onRowClick) return;
    // A press on a control in the row (checkbox, action, the first column's button) is that control's own.
    if ((event.target as HTMLElement).closest('button, a, input, label, [role="button"]')) return;
    onRowClick(row);
  };

  const body = showSkeleton
    ? Array.from({ length: SKELETON_ROWS }, (_, r) => (
        <tr key={`skel-${r}`} className="cui-table__row" aria-hidden="true">
          {selectable && <td className="cui-table__td" data-col="select" data-freeze="left" />}
          {columns.map((col, c) => (
            <td key={col.key} className="cui-table__td" data-priority={col.priority} data-freeze={c === 0 ? 'left' : undefined} data-first={c === 0 || undefined}>
              <div className="cui-table__skel" style={{ width: `${skelWidth(r, c)}%` }} />
            </td>
          ))}
          {actionCount > 0 && <td className="cui-table__td" data-col="actions" data-count={actionCount} data-freeze="right" />}
        </tr>
      ))
    : sortedRows.length === 0
      ? !loading && empty
        ? [
            <tr key="empty" className="cui-table__row">
              <td className="cui-table__td cui-table__empty" colSpan={colCount}>
                {empty}
              </td>
            </tr>,
          ]
        : []
      : sortedRows.map((row, i) => {
          const key = getRowKey(row);
          const isSelected = selectedSet.has(key);
          const name = rowLabel(row);
          return (
            <tr
              key={key}
              ref={i === 0 ? firstRowRef : undefined}
              className="cui-table__row"
              data-interactive={interactive || undefined}
              data-clickable={onRowClick ? '' : undefined}
              data-selected={isSelected || undefined}
              onClick={onRowPress(row)}
            >
              {selectable && (
                <td className="cui-table__td" data-col="select" data-freeze="left">
                  <Checkbox
                    aria-label={`Select ${name}`}
                    checked={isSelected}
                    onChange={() => setSelected(isSelected ? selected.filter((k) => k !== key) : [...selected, key])}
                  />
                </td>
              )}
              {columns.map((col, c) => {
                const CellIcon = col.icon?.(row);
                const raw = col.render ? col.render(row) : (fieldOf(row, col.key) as ReactNode);
                const content = (
                  <>
                    {CellIcon && <CellIcon className="cui-table__cell-icon" aria-hidden="true" focusable="false" />}
                    {raw}
                  </>
                );
                return (
                  <td
                    key={col.key}
                    className="cui-table__td"
                    data-type={col.type && col.type !== 'text' ? col.type : undefined}
                    data-priority={col.priority}
                    data-freeze={c === 0 ? 'left' : undefined}
                    data-first={c === 0 || undefined}
                  >
                    {c === 0 && onRowClick ? (
                      <button type="button" className="cui-table__row-open" onClick={() => onRowClick(row)}>
                        {content}
                      </button>
                    ) : (
                      content
                    )}
                  </td>
                );
              })}
              {rowActions && (
                <td className="cui-table__td" data-col="actions" data-count={actionCount} data-freeze="right">
                  <div className="cui-table__actions">
                    {rowActions.map((a) => (
                      <Button key={a.label} variant="ghost" size="sm" iconOnly icon={a.icon} aria-label={`${a.label}, ${name}`} onClick={() => a.onClick(row)} />
                    ))}
                  </div>
                </td>
              )}
            </tr>
          );
        });

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-table"
      data-variant={variant}
      data-selectable={selectable || undefined}
      data-has-selection={checkedCount > 0 || undefined}
      data-sticky={sticky || undefined}
      data-scroll-left={edges.left || undefined}
      data-scroll-right={edges.right || undefined}
      data-scroll-top={edges.top || undefined}
    >
      {showBulk && (
        <div className="cui-table__bulk" style={{ height: headHeight }}>
          <span className="cui-table__bulk-count">{checkedCount} selected</span>
          <div className="cui-table__bulk-actions">
            {bulkActions!.map((a) => (
              <span key={a.label} className={a.tone === 'danger' ? 'cui-table__bulk-danger' : undefined}>
                <Button variant="ghost" size="sm" leadingIcon={a.icon} onClick={() => a.onClick(allKeys.filter((k) => selectedSet.has(k)))}>
                  {a.label}
                </Button>
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="cui-table__scroll" ref={scrollRef} onScroll={measure} style={sticky ? { maxHeight } : undefined}>
        <table className="cui-table__table" aria-label={label} aria-busy={loading || undefined}>
          <thead>
            <tr ref={headRowRef}>
              {selectable && (
                <th className="cui-table__th" data-col="select" data-freeze="left" scope="col">
                  <Checkbox
                    aria-label="Select all rows"
                    checked={allChecked}
                    indeterminate={someChecked}
                    disabled={showSkeleton || rows.length === 0}
                    // From none or some, it checks every row; from all, it clears (as the gallery).
                    onChange={() => setSelected(allChecked ? [] : allKeys)}
                  />
                </th>
              )}
              {columns.map((col, c) => {
                const sortable = col.sortable !== false;
                const active = sort?.key === col.key ? sort.direction : undefined;
                const SortIcon = active === 'ascending' ? ArrowUp : active === 'descending' ? ArrowDown : ArrowsDownUp;
                return (
                  <th
                    key={col.key}
                    className="cui-table__th"
                    scope="col"
                    data-type={col.type && col.type !== 'text' ? col.type : undefined}
                    data-priority={col.priority}
                    data-sortable={sortable || undefined}
                    data-freeze={c === 0 ? 'left' : undefined}
                    data-first={c === 0 || undefined}
                    aria-sort={active}
                  >
                    {sortable ? (
                      <button type="button" className="cui-table__sort" onClick={() => cycleSort(col.key)}>
                        {col.header}
                        <SortIcon className="cui-table__sort-icon" aria-hidden="true" focusable="false" />
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
              {actionCount > 0 && (
                <th className="cui-table__th" data-col="actions" data-count={actionCount} data-freeze="right" scope="col">
                  {/* Visually empty, as the DS says; named for screen readers (decided 2026-11-10, Q-TABLE-2). */}
                  <span className="cui-table__sr">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody key={reveal} className="cui-table__body" data-reveal={reveal > 0 && !showSkeleton ? '' : undefined}>
            {body}
          </tbody>
          {showTotal && (
            <tfoot>
              <tr className="cui-table__total">
                {selectable && <td className="cui-table__tf" data-col="select" data-freeze="left" />}
                {columns.map((col, c) =>
                  c === 0 ? (
                    <th key={col.key} className="cui-table__tf" scope="row" data-priority={col.priority} data-freeze="left" data-first>
                      {totalLabel}
                    </th>
                  ) : (
                    <td
                      key={col.key}
                      className="cui-table__tf"
                      data-type={col.type && col.type !== 'text' ? col.type : undefined}
                      data-priority={col.priority}
                    >
                      {col.total?.(rows)}
                    </td>
                  ),
                )}
                {actionCount > 0 && <td className="cui-table__tf" data-col="actions" data-count={actionCount} data-freeze="right" />}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

/**
 * Collabrium Table: rows and columns of data, standalone (its own bordered surface) or embedded (inside a Card).
 * Every column sorts by default; checkboxes with a bulk toolbar, an action column, frozen columns when it scrolls
 * sideways, a loading skeleton, an empty state and a sticky header are opt-in. Ported from components.css
 * `.c-table*` (1665–1777) and the gallery's table script.
 */
export const Table = forwardRef(TableInner) as <T>(props: TableProps<T> & { ref?: Ref<HTMLDivElement> }) => ReactElement;
