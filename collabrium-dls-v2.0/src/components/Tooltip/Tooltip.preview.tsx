// Tooltip preview: the gallery's demo, with the OLD HTML + CSS (collabrium-dls/components.css) beside it. The old
// bubble is shown visible (.is-visible) so the two can be compared at rest. Never part of the package build.
import { Info } from '@phosphor-icons/react';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

// Copied verbatim from collabrium-dls/components.css lines 3577–3593 (Tooltip)
// for side-by-side comparison only. Never shipped in the package.
export const legacyTooltipCss = "/* Tooltip \u2014 top placement (default). Visibility: opacity 0 \u2192 1 on\n   hover or keyboard focus, pointer-events:none at all times, instant\n   on both show and hide (no artificial delay) per DESIGN-SYSTEM.md's\n   own Show/hide delay rule \u2014 the fade below is the Transition row's\n   own duration-fast/ease-standard, not a wait before it starts.\n   Rendering: the JS below moves the bubble to a document-<body>-level\n   portal on show (position:fixed, computed from the trigger's own\n   getBoundingClientRect) and back into .c-tooltip-wrap on hide \u2014 per\n   DESIGN-SYSTEM.md's own Z-index and stacking rule, escaping any\n   ancestor's overflow/scroll clipping (this page's own .pane-left is\n   exactly such an ancestor). Visibility toggles via .is-visible rather\n   than a :hover selector, since the portaled bubble is no longer a\n   descendant of .c-tooltip-wrap while shown. */\n.c-tooltip-wrap{position:relative; display:inline-flex;}\n.c-tooltip-bubble{position:absolute; bottom:calc(100% + 8px); left:50%; transform:translateX(-50%); z-index:2; padding:var(--spacing-6) 10px; border-radius:var(--radius-sm); background:var(--color-neutral-7); color:var(--color-neutral-1); font-size:var(--text-caption-size); font-weight:500; white-space:nowrap; opacity:0; pointer-events:none; transition:opacity var(--duration-fast) var(--ease-standard);}\n.c-tooltip-bubble.is-visible{opacity:1;}\n.c-tooltip-bubble.is-portaled{position:fixed; bottom:auto; transform:none;}";

// The gallery's demo, verbatim from preview.html 5057–5062, with .is-visible added to the bubble.
const oldDemo = "<div class=\"c-tooltip-demo\">\n<span class=\"c-tooltip-wrap\">\n<button class=\"c-icon-btn\" type=\"button\" aria-describedby=\"tooltipDemoBubble\"><i class=\"ph-fill ph-info\"></i></button>\n<span class=\"c-tooltip-bubble\" role=\"tooltip\" id=\"tooltipDemoBubble\">Visible to your whole team</span>\n</span>\n</div>".replace('c-tooltip-bubble"', 'c-tooltip-bubble is-visible"');

export function TooltipPreview() {
  return (
    <>
      <style>{legacyTooltipCss}</style>
      <section className="pg-row" id="demo" aria-labelledby="demo-h">
        <h3 className="pg-row-title" id="demo-h">Top (preview.html 5057–5062)</h3>
        <p className="pg-row-note">Hover or focus the new trigger. Neither bubble has a caret (decided Q-TOOLTIP-1).</p>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen">
              <Tooltip content="Visible to your whole team">
                <Button variant="ghost" iconOnly icon={Info} aria-label="Visibility" />
              </Tooltip>
            </div>
          </div>
          <div className="pg-col" data-col="old">
            <p className="pg-col-label">Old HTML + CSS · components.css</p>
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: oldDemo }} />
          </div>
        </div>
      </section>
    </>
  );
}

export default TooltipPreview;
