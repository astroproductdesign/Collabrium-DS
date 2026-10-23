'use client';

// The live preview frame (DLS .comp-demo) with the Preview toolbar.
// - Mobile width: narrows the frame to a phone width. Viewport media
//   queries still see the real window; container-sized layouts respond.
// - Reduce motion: re-applies every `prefers-reduced-motion: reduce` rule
//   from the loaded stylesheets inside the frame only, so each component
//   shows its own reduced-motion behaviour without changing the OS
//   setting. Motion-library components read the OS setting directly and
//   are not affected.
// - No Dark toggle: the tokens define no dark values.
import { useEffect, useState, type ReactNode } from 'react';
import { Switch } from './Switch';

const MIRROR_ID = 'docs-reduced-motion-mirror';

function ensureReducedMotionMirror() {
  if (document.getElementById(MIRROR_ID)) return;
  const out: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin (fonts, icons)
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSMediaRule) || !/prefers-reduced-motion:\s*reduce/.test(rule.media.mediaText)) continue;
      for (const inner of Array.from(rule.cssRules)) {
        if (!(inner instanceof CSSStyleRule)) continue;
        const selectors = inner.selectorText
          .split(',')
          .map(s => s.trim())
          .filter(s => !/^(html|:root|body)\b/.test(s))
          .map(s => `[data-reduce-motion] ${s}`);
        if (selectors.length) out.push(`${selectors.join(', ')}{${inner.style.cssText}}`);
      }
    }
  }
  const style = document.createElement('style');
  style.id = MIRROR_ID;
  style.textContent = out.join('\n');
  document.head.appendChild(style);
}

export function PreviewStage({ children, toolbar = false, label }: { children: ReactNode; toolbar?: boolean; label?: string }) {
  const [mobile, setMobile] = useState(false);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (reduce) ensureReducedMotionMirror();
  }, [reduce]);
  return (
    <div className="docs-preview">
      {toolbar && (
        <div className="docs-preview-toolbar" role="group" aria-label={label ? `${label} preview options` : 'Preview options'}>
          <Switch label="Mobile width" checked={mobile} onChange={setMobile} />
          <Switch label="Reduce motion" checked={reduce} onChange={setReduce} />
        </div>
      )}
      <div className="comp-demo docs-stage" data-mobile={mobile || undefined}>
        <div className="docs-stage-inner" data-reduce-motion={reduce || undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}
