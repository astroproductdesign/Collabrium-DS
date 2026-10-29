import React, { memo, useState } from 'react';
import type { CardConfig } from '../../data/cards';
import { InViewRender } from '../InViewRender';
import { CardArc5 } from './CardArc5';
import { CardArc7 } from './CardArc7';
import { CardLongArc5 } from './CardLongArc5';
import { CardLinearSpread } from './CardLinearSpread';
import { CardCornerFan } from './CardCornerFan';
import { CardStampArc } from './CardStampArc';
import { CardCascadeStagger } from './CardCascadeStagger';
import { CardScatterSpread } from './CardScatterSpread';
import { CardWheelFan } from './CardWheelFan';
import { CardCarousel } from './CardCarousel';
import { CardCoverFlow } from './CardCoverFlow';
import { CardTimeMachine } from './CardTimeMachine';

const isFinePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

interface CardPreviewTileProps {
  card: CardConfig;
  active: boolean;
  onOpen: (card: CardConfig) => void;
  triggerHaptic?: (type: 'light' | 'medium' | 'success' | 'error') => void;
}

/**
 * Catalog preview for a card spread / carousel. Hover state lives here so hovering
 * one tile re-renders only that tile instead of the whole catalog.
 * Fine pointers: hover spreads, click opens the detail page.
 * Touch: a tap toggles the spread (the title row below navigates).
 */
export const CardPreviewTile = memo(function CardPreviewTile({ card, active, onOpen, triggerHaptic }: CardPreviewTileProps) {
  const [hovered, setHovered] = useState(false);

  const preview = (() => {
    const h = hovered;
    switch (card.interactionType) {
      case 'card-arc-5': return <CardArc5 hovered={h} className="scale-[0.6] sm:scale-[0.9] origin-center" />;
      case 'card-arc-7': return <CardArc7 hovered={h} className="scale-[0.55] sm:scale-[0.85] origin-center" />;
      case 'card-long-arc-5': return <CardLongArc5 hovered={h} className="scale-[0.55] sm:scale-[0.85] origin-center" />;
      case 'card-linear-spread': return <CardLinearSpread hovered={h} className="scale-[0.6] sm:scale-[0.9] origin-center" />;
      case 'card-corner-fan': return <CardCornerFan hovered={h} className="scale-[0.6] sm:scale-[0.9] origin-center" />;
      case 'card-stamp-arc': return <CardStampArc hovered={h} className="scale-[0.6] sm:scale-[0.9] origin-center" />;
      case 'card-cascade-stagger': return <CardCascadeStagger hovered={h} className="scale-[0.6] sm:scale-[0.9] origin-center" />;
      case 'card-scatter-spread': return <CardScatterSpread hovered={h} className="scale-[0.6] sm:scale-[0.9] origin-center" />;
      case 'card-wheel-fan': return <CardWheelFan hovered={h} className="scale-[0.6] sm:scale-[0.9] origin-center" />;
      case 'card-carousel': return <CardCarousel hovered={h} className="scale-[0.5] sm:scale-[0.8] origin-center" />;
      case 'card-cover-flow': return <CardCoverFlow hovered={h} className="scale-[0.5] sm:scale-[0.8] origin-center" />;
      case 'card-time-machine': return <CardTimeMachine hovered={h} className="scale-[0.5] sm:scale-[0.8] origin-center" />;
      case 'card-carousel-mono': return <CardCarousel hovered={h} isMonochrome={true} className="scale-[0.5] sm:scale-[0.8] origin-center" />;
      case 'card-cover-flow-mono': return <CardCoverFlow hovered={h} isMonochrome={true} className="scale-[0.5] sm:scale-[0.8] origin-center" />;
      case 'card-time-machine-mono': return <CardTimeMachine hovered={h} isMonochrome={true} className="scale-[0.5] sm:scale-[0.8] origin-center" />;
      default: return null;
    }
  })();

  return (
    <div
      onClick={(e) => {
        triggerHaptic?.('light');
        if (isFinePointer()) {
          onOpen(card);
        } else {
          e.stopPropagation();
          setHovered((prev) => !prev);
        }
      }}
      onMouseEnter={() => {
        if (isFinePointer()) setHovered(true);
      }}
      onMouseLeave={() => {
        if (isFinePointer()) setHovered(false);
      }}
      className={`relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl bg-black border border-white/[0.07] group-hover/card:border-white/[0.18] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex items-center justify-center transition-[border-color,box-shadow] duration-250 cursor-pointer ${hovered ? 'overflow-visible z-20' : 'overflow-hidden z-1'}`}
    >
      <div className="relative h-full w-full flex items-center justify-center pointer-events-none">
        <InViewRender active={active}>{preview}</InViewRender>
      </div>
    </div>
  );
});
