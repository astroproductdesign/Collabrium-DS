'use client';

import { forwardRef, useEffect, useId, useRef, useState, type HTMLAttributes, type MouseEvent, type Ref } from 'react';
import { CaretDown, CaretUp, List, X } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';
import { Card, CardFooter, CardTitle, type CardHeadingLevel } from '../Card';
import { EmptyState, type EmptyStateHeadingLevel } from '../EmptyState';

/** How many items show before the rest fold behind "Show X more" (DESIGN-SYSTEM.md, display rules 1 and 2). */
const VISIBLE_COUNT = 4;

/** One line item. */
export interface PriceSummaryItem {
  /** A stable id, passed back to `onRemove`. */
  id: string;
  /** The item's name. One line; it ends in an ellipsis when it runs out of room. */
  name: string;
  /** The unit cost as a number, e.g. `2400`. Shown with the currency and two decimals: `RM 2,400.00`. */
  cost: number;
  /** Set `false` for a read-only or locked line item: its row has no remove button. Default true. */
  removable?: boolean;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title'>>;

export interface PriceSummaryCardProps extends NativeDivProps {
  /** The selected line items, in the order they were added. An empty list shows the Empty state ("No items added"). */
  items: PriceSummaryItem[];
  /**
   * Called with an item's id when the person presses its remove ×. Remove the item from `items` in response. Leave
   * it out for a summary nobody can edit: no row shows a remove button.
   */
  onRemove?: (id: string) => void;
  /** Called when the person presses the call to action ("Build proposal"). */
  onAction: () => void;
  /** The call to action's label. Default "Build proposal", the DLS's own copy for this card. */
  actionLabel?: string;
  /** The card's title. Default "Price summary". */
  title?: string;
  /** The heading level of the title, 2 to 6. The look is always the card title's (h5). Default 3. */
  headingLevel?: CardHeadingLevel;
  /** The Empty state's heading. Default "No items added". */
  emptyHeading?: string;
  /** The currency written before every amount, with a space. Default "RM" (Malaysian ringgit). Change it only when the host context needs another. */
  currency?: string;
}

const amount = new Intl.NumberFormat('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function setRefs<T>(node: T | null, ...refs: (Ref<T> | undefined)[]) {
  for (const ref of refs) {
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as { current: T | null }).current = node;
  }
}

/**
 * Collabrium Price summary card: a running list of selected line items building toward a total, with a full-width
 * call to action. Empty ("No items added") and Filled states; after four items the rest fold behind "Show X more".
 * A variant of Card, ported from components.css `.c-card-price-*` (317–357).
 */
export const PriceSummaryCard = forwardRef<HTMLDivElement, PriceSummaryCardProps>(function PriceSummaryCard(
  {
    items,
    onRemove,
    onAction,
    actionLabel = 'Build proposal',
    title = 'Price summary',
    headingLevel = 3,
    emptyHeading = 'No items added',
    currency = 'RM',
    ...rest
  },
  ref,
) {
  const [expanded, setExpanded] = useState(false);
  const overflowId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // The row whose focused remove button was just pressed, so focus can land somewhere sensible once it is gone (Q-PRICE-5).
  const pendingFocus = useRef<{ id: string; index: number } | null>(null);

  const visible = items.slice(0, VISIBLE_COUNT);
  const hidden = items.slice(VISIBLE_COUNT);
  const open = expanded && hidden.length > 0;
  const format = (value: number) => `${currency} ${amount.format(value)}`;
  const total = items.reduce((sum, item) => sum + item.cost, 0);

  // Rule 8: when removals take the list to four or fewer, the expanded view goes away by itself.
  useEffect(() => {
    if (hidden.length === 0 && expanded) setExpanded(false);
  }, [hidden.length, expanded]);

  useEffect(() => {
    const pending = pendingFocus.current;
    if (!pending) return;
    pendingFocus.current = null;
    if (items.some(item => item.id === pending.id)) return; // The host kept the item: focus never left its button.
    const root = rootRef.current;
    if (!root) return;
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('button[data-index]')).filter(b => !b.closest('[inert]'));
    const next = buttons.find(b => Number(b.dataset.index) >= pending.index) ?? buttons[buttons.length - 1];
    if (next) {
      next.focus();
    } else if (titleRef.current) {
      titleRef.current.tabIndex = -1;
      titleRef.current.focus();
    }
  }, [items]);

  const toggle = () => {
    // Rule 5: collapsing puts the scroll position inside the list back to the top.
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0;
    setExpanded(!open);
  };

  const remove = (item: PriceSummaryItem, index: number) => (event: MouseEvent<HTMLButtonElement>) => {
    if (document.activeElement === event.currentTarget) pendingFocus.current = { id: item.id, index };
    onRemove?.(item.id);
  };

  // DESIGN-SYSTEM.md says an item added while the list is open "animates in at the bottom"; the DLS has no
  // animation for it, so a new row simply appears and the line is owed a removal (decided 2026-11-05, Q-PRICE-8).
  const row = (item: PriceSummaryItem, index: number) => (
    <li key={item.id} className="cui-price-summary__row">
      <span className="cui-price-summary__name">{item.name}</span>
      <span className="cui-price-summary__cost">{format(item.cost)}</span>
      {onRemove && item.removable !== false && (
        <button type="button" className="cui-price-summary__remove" aria-label={`Remove ${item.name}`} data-index={index} onClick={remove(item, index)}>
          <X aria-hidden="true" focusable="false" />
        </button>
      )}
    </li>
  );

  return (
    <Card {...rest} ref={node => setRefs(node, ref, rootRef)} minWidth="functional" data-card="price-summary">
      <CardTitle ref={titleRef} headingLevel={headingLevel}>
        {title}
      </CardTitle>
      {items.length === 0 ? (
        <EmptyState variant="section" icon={List} heading={emptyHeading} headingLevel={Math.min(headingLevel + 1, 6) as EmptyStateHeadingLevel} />
      ) : (
        <>
          <ul className="cui-price-summary__list">
            {visible.map((item, i) => row(item, i))}
            {hidden.length > 0 && (
              // inert while folded: the hidden rows' remove buttons must not be reachable or announced (Q-PRICE-3).
              <li className="cui-price-summary__overflow" id={overflowId} data-expanded={open ? '' : undefined} inert={!open}>
                <div className="cui-price-summary__overflow-inner" ref={scrollRef}>
                  <ul className="cui-price-summary__list">{hidden.map((item, i) => row(item, VISIBLE_COUNT + i))}</ul>
                </div>
              </li>
            )}
          </ul>
          {hidden.length > 0 && (
            <button type="button" className="cui-price-summary__more" aria-expanded={open} aria-controls={overflowId} onClick={toggle}>
              <span>{open ? 'Show less' : `Show ${hidden.length} more`}</span>
              {open ? <CaretUp aria-hidden="true" focusable="false" /> : <CaretDown aria-hidden="true" focusable="false" />}
            </button>
          )}
          <CardFooter>
            <div className="cui-price-summary__total">
              <span>Total</span>
              <span className="cui-price-summary__total-value">{format(total)}</span>
            </div>
            <Button variant="primary" onClick={onAction}>
              {actionLabel}
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
});
