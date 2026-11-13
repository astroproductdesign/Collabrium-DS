// Hero Card preview: the gallery's two cards, with the OLD HTML + CSS (collabrium-dls/components.css) rendered beside
// them for visual comparison. Never part of the package build.
import { legacyButtonCss } from '../Button/Button.preview';
import { legacyInfoBannerCss } from '../InfoBanner/InfoBanner.preview';
import { InfoBanner } from '../InfoBanner';
import { HeroCard } from './HeroCard';

// Copied verbatim from collabrium-dls/components.css lines 1591–1636 (Hero Card and Command brief)
// for side-by-side comparison only. Never shipped in the package.
export const legacyHeroCardCss = "/* =========================================================\n   Hero Card — a promotional/insight tile, a Card sub-component.\n   Four states: Default, Risk, AI (Dark), Selected. See\n   DESIGN-SYSTEM.md's Card section (\"Hero Card\") for full anatomy,\n   the ribbon-clearance geometry, and the modal timing rationale.\n   ========================================================= */\n.c-herocard{position:relative; background:var(--color-neutral-1); border:1px solid var(--color-neutral-3); border-radius:var(--radius-lg); box-shadow:var(--shadow-1); padding:var(--spacing-16); display:flex; flex-direction:column; gap:var(--spacing-8); overflow:hidden;}\n.c-herocard-eyebrow{font-size:var(--text-h2-size); line-height:var(--text-h2-lh); font-weight:var(--text-h2-weight); letter-spacing:var(--text-h2-tracking); color:var(--color-neutral-5);}\n.c-herocard-heading{margin:0; font-size:var(--text-h4-size); line-height:var(--text-h4-lh); font-weight:var(--text-h4-weight); letter-spacing:var(--text-h4-tracking); color:var(--color-neutral-9); display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; line-clamp:2; overflow:hidden;}\n/* Ribbon clearance, scoped to cards that actually have one. The ribbon's visible triangle still reaches ~56px in from the right edge at the heading's topmost line (16px card padding + 16px eyebrow-height-ish line + 8px gap = 40px down, where the 80x80 band is still wide) — 60px reserves a safety margin above that geometric minimum, paired with the 2-line clamp above so the worst case is bounded, not just likely. */\n.c-herocard:has(.c-herocard-ribbon) .c-herocard-heading{padding-right:var(--spacing-60);}\n.c-herocard-body{margin:0; font-size:var(--text-body2-size); line-height:var(--text-body2-lh); font-weight:var(--text-body2-weight); color:var(--color-neutral-5);}\n.c-herocard-media{border-radius:var(--radius-md); background:var(--color-neutral-2); border:1px dashed var(--color-neutral-3); min-height:112px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; color:var(--color-neutral-4); font-size:var(--text-caption-size);}\n.c-herocard-media i{font-size:var(--icon-md);}\n.c-herocard-recommendation{font-size:var(--text-caption-size); line-height:var(--text-caption-lh); color:var(--color-neutral-5);}\n.c-herocard-cta{align-self:flex-start; margin-top:var(--spacing-2);}\n.c-herocard-cta i{display:inline-block; transition:transform var(--duration-fast) var(--ease-standard);}\n\n/* Ribbon — 80x80 corner box clipped by the card's own overflow:hidden; inner strip rotated 45deg, centered on the box's own center point so the visible triangle's text sits centered regardless of box size. */\n.c-herocard-ribbon{position:absolute; top:0; right:0; width:80px; height:80px; pointer-events:none;}\n.c-herocard-ribbon span{position:absolute; top:50%; left:50%; width:150px; padding:5px 0; background:var(--color-orange); color:var(--color-neutral-1); font-size:var(--text-caption-size); font-weight:700; text-transform:uppercase; letter-spacing:var(--tracking-eyebrow); text-align:center; transform:translate(-50%,-50%) rotate(45deg);}\n\n/* Risk variant */\n.c-herocard-risk{background:var(--color-fire-bg); border-color:var(--color-orange);}\n.c-herocard-risk .c-herocard-heading{color:var(--color-neutral-9);}\n\n/* AI (Dark) variant — this system's first dark-surface card; the white-on-dark overlay values below are literals scoped to this one component, not new tokens, since no other component uses a dark surface yet. */\n.c-herocard-ai{background:var(--color-neutral-8); border-color:rgba(255,255,255,.08); box-shadow:0 1px 2px rgba(0,0,0,.32); cursor:pointer; --mouse-x:0; --mouse-y:0; transition:box-shadow var(--duration-base) var(--ease-settle), transform var(--duration-base) var(--ease-settle);}\n.c-herocard-ai:hover{box-shadow:var(--shadow-2); transform:perspective(800px) rotateX(calc(var(--mouse-y) * -4deg)) rotateY(calc(var(--mouse-x) * 4deg)) scale(1.05); transition:box-shadow var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard);}\n.c-herocard-ai .c-herocard-eyebrow{color:var(--color-amber);}\n.c-herocard-ai .c-herocard-heading{color:var(--color-neutral-1);}\n.c-herocard-ai .c-herocard-body,\n.c-herocard-ai .c-herocard-recommendation{color:rgba(255,255,255,.60);}\n.c-herocard-ai .c-herocard-media{background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.16); color:rgba(255,255,255,.4);}\n.c-herocard-ai:hover .c-herocard-cta i{transform:translateX(var(--spacing-4));}\n\n/* Selected state — same shell, just bigger, sitting in normal page flow. Eyebrow reverts to the pre-H2 caption/uppercase styling here and on .c-cbrief below (the same state's modal form) — the Default/Risk/AI H2 change was never asked for on Selected.\n   Mobile fix: width/max-height used to be copy-pasted from .c-cbrief below (the fixed/centered MODAL form of this same state) — min(560px, calc(100vw - spacing-32)) plus a self-scrolling max-height. That math only holds for something position:fixed and genuinely measured against the true viewport, which .c-cbrief is and this in-flow card isn't; 100vw doesn't know this card's real parent width, so on a phone the card kept requesting close to 560px regardless of how little room its actual container gave it, overflowing every narrow container tested. Fixed by giving it Card's own universal width:100%/max-width recipe instead (see Card's own Do/Don't: \"Do use width:100% on every card — the grid cell decides the card's width\") and dropping the inherited max-height/overflow-y, which never made sense for in-flow content that should just grow and let the page scroll. */\n.c-herocard-selected{width:100%; max-width:560px; padding:var(--spacing-24); gap:var(--spacing-16);}\n.c-herocard-selected .c-herocard-eyebrow,\n.c-cbrief .c-herocard-eyebrow{font-size:var(--text-caption-size); line-height:var(--text-caption-lh); font-weight:700; text-transform:uppercase; letter-spacing:var(--tracking-eyebrow);}\n\n/* Selected state — modal form. Same content as .c-herocard-selected, fixed/centered/animated instead of sitting in flow: opens on click, closes on scrim click / the close button / Escape. translate(-50%,-50%) is the resting centered position; the entrance/exit animation layers on top of it, never replaces it. Exit is asymmetric on purpose — the panel collapses fast (140ms) and the scrim's own fade is delayed by that same 140ms so it only starts once the panel has finished collapsing, matching \"reverse of entrance, panel first, then the scrim fades.\" */\n.c-cbrief-scrim{position:fixed; inset:0; z-index:var(--z-brief); background:var(--shadow-overlay); opacity:0; pointer-events:none; transition:opacity var(--duration-fast) var(--ease-standard) var(--duration-fast);}\n.c-cbrief-scrim.is-open{opacity:1; pointer-events:auto; transition:opacity var(--duration-fast) var(--ease-standard);}\n.c-cbrief{position:fixed; top:50%; left:50%; width:min(560px, calc(100vw - var(--spacing-32))); max-height:calc(100dvh - var(--spacing-60)); overflow-y:auto; background:var(--color-neutral-1); border-radius:var(--radius-lg); box-shadow:var(--shadow-4); padding:var(--spacing-24); display:flex; flex-direction:column; gap:var(--spacing-16); opacity:0; transform:translate(-50%,-50%) perspective(1000px) rotateX(-8deg) translateY(24px); transition:opacity var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard);}";

// preview.html 2703–2729 and its row style (333), the Phosphor <i> icons removed (no icon font here).
const oldRow = "<div class=\"herocard-demo-row\">\n<div class=\"c-herocard\" style=\"max-width:320px;\">\n<div class=\"c-herocard-ribbon\"><span>New</span></div>\n<span class=\"c-herocard-eyebrow\">Just shipped</span>\n<h4 class=\"c-herocard-heading\">Automated weekly digests</h4>\n<p class=\"c-herocard-body\">A quiet summary of what moved, who touched it, and what's next — every Monday.</p>\n<div class=\"c-herocard-media\">Media placeholder</div>\n<p class=\"c-herocard-recommendation\">Turned on by default for new workspaces.</p>\n<button type=\"button\" class=\"c-btn c-btn-ghost c-btn-md c-herocard-cta\">Learn more </button>\n</div>\n<div class=\"c-herocard c-herocard-selected\">\n<span class=\"c-herocard-eyebrow\">AI insight</span>\n<h4 class=\"c-herocard-heading\">Demand forecast updated</h4>\n<p class=\"c-herocard-body\">Model re-ran overnight against the last 90 days of order volume. Confidence is high enough to act on this week without waiting for the next scheduled run.</p>\n<div class=\"c-banner c-banner-ai\" role=\"status\">\n<div class=\"body\">\n<div class=\"message\">Confidence is high enough to auto-apply this forecast — turn on for future updates?</div>\n<div class=\"actions\"><button class=\"action\" type=\"button\">Turn on auto-apply</button></div>\n</div>\n<button class=\"c-icon-btn close\" type=\"button\" aria-label=\"Dismiss\"></button>\n</div>\n<div class=\"c-herocard-media\" style=\"min-height:160px;\">Media placeholder</div>\n<p class=\"c-cbrief-source\">Source: Order management system · Updated 2 hours ago</p>\n<button type=\"button\" class=\"c-btn c-btn-primary c-btn-md c-cbrief-cta\">View full report </button>\n</div>\n</div>";
const demoCss = ".herocard-demo-row{display:flex; flex-wrap:wrap; align-items:flex-start; gap:var(--spacing-24);}";

const noop = () => {};

export function HeroCardPreview() {
  return (
    <>
      <style>{[legacyButtonCss, legacyInfoBannerCss, legacyHeroCardCss, demoCss].join('\n')}</style>
      <section className="pg-row" id="samples" aria-labelledby="samples-h">
        <h3 className="pg-row-title" id="samples-h">Default with a ribbon, and Selected (preview.html 2703–2729)</h3>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen herocard-demo-row">
              <div style={{ maxWidth: 320 }}>
                <HeroCard
                  ribbon="New"
                  eyebrow="Just shipped"
                  heading="Automated weekly digests"
                  body="A quiet summary of what moved, who touched it, and what's next — every Monday."
                  media="placeholder"
                  recommendation="Turned on by default for new workspaces."
                  cta={{ label: 'Learn more', onClick: noop }}
                />
              </div>
              <HeroCard
                variant="selected"
                eyebrow="AI insight"
                heading="Demand forecast updated"
                body="Model re-ran overnight against the last 90 days of order volume. Confidence is high enough to act on this week without waiting for the next scheduled run."
                banner={<InfoBanner tone="ai" actions={[{ label: 'Turn on auto-apply', onClick: noop }]}>Confidence is high enough to auto-apply this forecast — turn on for future updates?</InfoBanner>}
                media="placeholder"
                source="Source: Order management system · Updated 2 hours ago"
                cta={{ label: 'View full report', onClick: noop }}
              />
            </div>
          </div>
          <div className="pg-col" data-col="old">
            <p className="pg-col-label">Old HTML + CSS · components.css</p>
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: oldRow }} />
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroCardPreview;
