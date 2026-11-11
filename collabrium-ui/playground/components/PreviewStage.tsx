'use client';

// The live preview frame (DLS .comp-demo) with the Preview toolbar.
// - Mobile width: narrows the frame to a phone width and re-applies, inside
//   the frame only, every `max-width` media rule a phone that wide would
//   match (SidebarNav's card, Empty state's stacked actions…), since those
//   queries otherwise still see the real window. Declarations measured in
//   window units (vw, vh, dvh…) are left out: they'd size to the window,
//   not the frame. Container-sized layouts respond on their own.
// - Reduce motion: re-applies every `prefers-reduced-motion: reduce` rule
//   from the loaded stylesheets inside the frame only, so each component
//   shows its own reduced-motion behaviour without changing the OS
//   setting. Motion-library components read the OS setting directly and
//   are not affected.
// - No Dark toggle: the tokens define no dark values.
import { useEffect, useState, type ReactNode } from 'react';
import { Switch } from './Switch';

const MOTION_ID = 'docs-reduced-motion-mirror';
const MOBILE_ID = 'docs-mobile-width-mirror';
/** The phone width the Mobile width frame stands for (docs.css's --docs-mobile-width). */
const MOBILE_WIDTH = 390;

/** Copies the matching media rules from the loaded stylesheets, scoped under `scope`, into one style element. */
function mirrorMediaRules(id: string, matches: (media: MediaList) => boolean, scope: string, skipValue?: RegExp) {
  if (document.getElementById(id)) return;
  const out: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin (fonts, icons)
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSMediaRule) || !matches(rule.media)) continue;
      for (const inner of Array.from(rule.cssRules)) {
        if (!(inner instanceof CSSStyleRule)) continue;
        const selectors = inner.selectorText
          .split(',')
          .map(s => s.trim())
          .filter(s => !/^(html|:root|body)\b/.test(s))
          .map(s => `${scope} ${s}`);
        const decls = skipValue
          ? Array.from(inner.style)
              .filter(prop => !skipValue.test(inner.style.getPropertyValue(prop)))
              .map(prop => `${prop}:${inner.style.getPropertyValue(prop)}${inner.style.getPropertyPriority(prop) ? ' !important' : ''}`)
              .join(';')
          : inner.style.cssText;
        if (selectors.length && decls) out.push(`${selectors.join(', ')}{${decls}}`);
      }
    }
  }
  const style = document.createElement('style');
  style.id = id;
  style.textContent = out.join('\n');
  document.head.appendChild(style);
}

/** Window-relative lengths: inside the narrowed frame they'd still measure the whole window. */
const WINDOW_UNITS = /\d(?:[sld]?v[hwbi]|vmin|vmax)\b/;

const isReducedMotion = (m: MediaList) => /prefers-reduced-motion:\s*reduce/.test(m.mediaText);

/** A plain `(max-width: Npx)` query (and nothing else) that a phone MOBILE_WIDTH wide would match. */
const isPhoneWidth = (m: MediaList) => {
  const q = /^\(max-width:\s*(\d+(?:\.\d+)?)px\)$/.exec(m.mediaText.trim());
  return !!q && Number(q[1]) >= MOBILE_WIDTH;
};

export function PreviewStage({ children, toolbar = false, label }: { children: ReactNode; toolbar?: boolean; label?: string }) {
  const [mobile, setMobile] = useState(false);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (reduce) mirrorMediaRules(MOTION_ID, isReducedMotion, '[data-reduce-motion]');
  }, [reduce]);
  useEffect(() => {
    // :where() keeps the copies at their source specificity; they sit after every sheet, like a media block at the end.
    if (mobile) mirrorMediaRules(MOBILE_ID, isPhoneWidth, ':where(.docs-stage[data-mobile])', WINDOW_UNITS);
  }, [mobile]);
  return (
    <div className="docs-preview">
      {toolbar && (
        <div className="docs-preview-toolbar" role="group" aria-label={label ? `${label} preview options` : 'Preview options'}>
          <Switch
            label="Mobile width"
            checked={mobile}
            onChange={next => {
              // Copy the rules in before the frame narrows, so a component that reads its own CSS when it resizes
              // (App Shell's size step) already sees them.
              if (next) mirrorMediaRules(MOBILE_ID, isPhoneWidth, ':where(.docs-stage[data-mobile])', WINDOW_UNITS);
              setMobile(next);
            }}
          />
          <Switch label="Reduce motion" checked={reduce} onChange={setReduce} />
        </div>
      )}
      <div className="comp-demo docs-stage" data-mobile={mobile || undefined}>
        <div
          className="docs-stage-inner"
          data-reduce-motion={reduce || undefined}
          // Previews never navigate away: a real link inside a demo does nothing here.
          onClick={e => {
            if ((e.target as HTMLElement).closest('a[href]')) e.preventDefault();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
