import type { ReactNode } from 'react';

/** One card in a card layout. */
export interface CardItem {
  /** Keys the card. Unique within the list. */
  id: string;
  /** The card's name: read by assistive technology, and shown as the caption where a layout has one. */
  label: string;
  /** What the card shows: an image (it fills the card), text, anything. The card brings the surface: Neutral-1, a 1px Neutral-3 border, radius-md and a shadow. */
  content: ReactNode;
}
