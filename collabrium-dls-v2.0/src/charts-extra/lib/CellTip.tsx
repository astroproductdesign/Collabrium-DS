'use client';

import { useRef, useState, type PointerEvent, type ReactNode } from 'react';

interface Tip {
  x: number;
  y: number;
  title: string;
  lines: string[];
}

/**
 * A DLS tooltip for charts drawn in HTML (heatmaps): it sits above the cell
 * under the pointer, inside the box `boxProps` is spread onto. Pointer only:
 * these charts' cells are not focusable, and every value is in the table view.
 */
export function useCellTip() {
  const box = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const show = (title: string, lines: string[]) => (e: PointerEvent<HTMLElement>) => {
    const b = box.current?.getBoundingClientRect();
    if (!b) return;
    const c = e.currentTarget.getBoundingClientRect();
    setTip({ x: c.left - b.left + c.width / 2, y: c.top - b.top, title, lines });
  };
  const hide = () => setTip(null);
  const boxProps = { ref: box, 'data-tip-box': '' as const, onPointerLeave: hide };
  const tipEl: ReactNode = tip && (
    <div className="cui-chartx__tooltip cui-chartx__tip" style={{ left: tip.x, top: tip.y }} role="presentation">
      <div className="cui-chartx__tooltip-title">{tip.title}</div>
      {tip.lines.map((l, i) => (
        <div key={i} className="cui-chartx__tooltip-row">
          {l}
        </div>
      ))}
    </div>
  );
  return { boxProps, show, hide, tipEl };
}
