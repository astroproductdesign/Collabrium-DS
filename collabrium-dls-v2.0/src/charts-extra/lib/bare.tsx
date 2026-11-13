'use client';

import { createContext, useContext, type ReactNode } from 'react';

const BareContext = createContext(false);

/** True inside a ChartThumbnail: a chart draws only its shape. */
export const useBare = () => useContext(BareContext);

/**
 * Draws any chart inside it as a bare picture of its shape, for cards and
 * galleries: no axes, gridlines, labels, legend, tooltip, centre reading or
 * "View as table" button, and no draw-in. It is hidden from assistive
 * technology, so only use it where the chart's own page or data sits beside it.
 */
export function ChartThumbnail({ children }: { children: ReactNode }) {
  return (
    <BareContext.Provider value>
      <div aria-hidden="true" className="cui-chartx-thumb">
        {children}
      </div>
    </BareContext.Provider>
  );
}
