'use client';

// The picture on a component or part card. Every card gets the same box, and
// whatever it shows is scaled down to fit it (never up), so no preview can
// spill out of its card whatever its natural size.
import { useEffect, useRef, type ReactNode } from 'react';

export function ThumbFit({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const b = box.current;
    const i = inner.current;
    if (!b || !i) return;
    // The largest size the picture has been seen at, in its own unscaled pixels. Moving
    // parts (a fanned stack, a growing dock) reach past their layout box, so the
    // box is also sampled while the demo plays.
    let maxW = 1;
    let maxH = 1;
    let scale = 1;
    // Card pictures sit on a canvas built to hold their travel, so they are sized once and never move.
    const fixed = !!i.querySelector('.docs-card-thumb');
    const fit = (sample = false) => {
      const pad = parseFloat(getComputedStyle(b).paddingLeft) || 0;
      const availW = b.clientWidth - pad * 2;
      const availH = b.clientHeight - pad * 2;
      maxW = Math.max(maxW, i.scrollWidth);
      maxH = Math.max(maxH, i.scrollHeight);
      if (sample && !fixed) {
        const host = i.getBoundingClientRect();
        let left = host.left;
        let right = host.right;
        let top = host.top;
        let bottom = host.bottom;
        i.querySelectorAll('*').forEach(e => {
          const r = e.getBoundingClientRect();
          if (!r.width || !r.height) return;
          left = Math.min(left, r.left);
          right = Math.max(right, r.right);
          top = Math.min(top, r.top);
          bottom = Math.max(bottom, r.bottom);
        });
        // Twice the farthest reach on either side keeps the picture centred.
        // Capped, so a piece that flies far away (and is clipped) cannot shrink the picture to nothing.
        const reachW = (2 * Math.max(host.left - left, right - host.right) + host.width) / scale;
        const reachH = (2 * Math.max(host.top - top, bottom - host.bottom) + host.height) / scale;
        maxW = Math.max(maxW, Math.min(reachW, i.scrollWidth * 1.25));
        maxH = Math.max(maxH, Math.min(reachH, i.scrollHeight * 1.25));
      }
      scale = Math.min(1, availW / maxW, availH / maxH);
      const w = Math.max(i.scrollWidth, i.clientWidth);
      const h = i.scrollHeight;
      i.style.transform = `translate(${(availW - w * scale) / 2}px, ${(availH - h * scale) / 2}px) scale(${scale})`;
    };
    fit();
    const ro = new ResizeObserver(() => fit());
    ro.observe(b);
    ro.observe(i);
    // Content that lays itself out after mount (fonts, charts, demos), then the sampling.
    const timers = [200, 800, 2000].map(ms => window.setTimeout(fit, ms));
    const sampler = window.setInterval(() => fit(true), 250);
    const stop = window.setTimeout(() => window.clearInterval(sampler), 10000);
    return () => {
      ro.disconnect();
      window.clearInterval(sampler);
      window.clearTimeout(stop);
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <div className="docs-comp-thumb" ref={box} inert>
      <div className="docs-comp-thumb__inner" ref={inner}>
        {children}
      </div>
    </div>
  );
}
