import { forwardRef, type HTMLAttributes } from 'react';
// Server component: icons come from Phosphor's server-safe entry (its main entry needs a client context).
import { Drop, Fire, Mountains, Plant, Scales } from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';

/** The five elements (departments). ElementBadge has no Purple and no Neutral: it only ever marks an element. */
export type ElementBadgeElement = 'fire' | 'earth' | 'water' | 'gold' | 'wood';

type NativeSpanProps = WithoutStyling<Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'>>;

export interface ElementBadgeProps extends NativeSpanProps {
  /** The element that owns the item. Required: the chip's tint, glyph and name all follow it, and can't be changed. */
  element: ElementBadgeElement;
  /**
   * Shows the element's name and a sublabel beside the chip. Leave it off for the chip alone (a dense row, a
   * table cell); the chip then carries the name as its `title`.
   */
  showLabel?: boolean;
  /** The line under the name, with `showLabel`. Defaults to the element's function ("Visibility & Energy"). */
  sublabel?: string;
}

/** Each element's name, function and glyph. The glyphs are the gallery's interim Phosphor motifs (DS asset gap). */
const elements: Record<ElementBadgeElement, { name: string; fn: string; glyph: Icon }> = {
  fire: { name: 'Fire', fn: 'Visibility & Energy', glyph: Fire },
  earth: { name: 'Earth', fn: 'Support & Stability', glyph: Mountains },
  water: { name: 'Water', fn: 'Depth & Flow', glyph: Drop },
  gold: { name: 'Gold', fn: 'Order & Structure', glyph: Scales },
  wood: { name: 'Wood', fn: 'Growth & Vision', glyph: Plant },
};

/**
 * Collabrium ElementBadge. A 32px chip with the owning element's glyph on a 12% tint of its colour, optionally with
 * the element's name and function beside it. Use it when a department-owned item needs the element's icon, not just
 * Tag's colour dot. Not interactive. One size, 32px (decided 2026-11-05, Q-ELBADGE-3). Ported from components.css `.c-elbadge` (3595–3604).
 */
export const ElementBadge = forwardRef<HTMLSpanElement, ElementBadgeProps>(function ElementBadge(
  { element, showLabel = false, sublabel, title, ...rest },
  ref,
) {
  const { name, fn, glyph: Glyph } = elements[element];
  // Alone, the chip is an image named by the element, for screen readers; the DLS's `title` stays for the mouse
  // (decided 2026-11-05, Q-ELBADGE-1). With the label, the text names it and the chip is decoration.
  const lone = showLabel ? {} : { role: 'img', 'aria-label': title ?? name, title: title ?? name };
  const chip = (
    <span className="cui-element-badge__chip" data-element={element} {...lone}>
      <Glyph weight="fill" aria-hidden="true" focusable="false" />
    </span>
  );
  if (!showLabel) {
    return (
      <span {...rest} ref={ref} className="cui-element-badge" data-element={element}>
        {chip}
      </span>
    );
  }
  return (
    <span {...rest} ref={ref} title={title} className="cui-element-badge" data-element={element}>
      {chip}
      <span className="cui-element-badge__text">
        <span className="cui-element-badge__name">{name}</span>
        <span className="cui-element-badge__sublabel">{sublabel ?? fn}</span>
      </span>
    </span>
  );
});
