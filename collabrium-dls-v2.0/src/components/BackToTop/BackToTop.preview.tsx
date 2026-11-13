// Back to top preview: the button at rest and shown, with the OLD HTML + CSS (collabrium-dls/components.css) beside the
// React one. Never part of the package build. Both are pinned inside their specimen box (as the gallery's sandbox
// does), so they can be compared side by side; the old icon needs Phosphor's font, which the comparison page loads.
import { BackToTop } from "./BackToTop";

// Copied verbatim from collabrium-dls/components.css lines 5103–5138, for side-by-side comparison only.
export const legacyBackToTopCss = "/* Back to top \u2014 Jump to present's page-level sibling, kept right after it\n   (and inside Chat window's run) so the shared recipe and the three\n   deliberate differences stay visible side by side: bottom-right, not\n   bottom-centre; position:fixed, not absolute in a wrapper; no\n   new-content dot. Per DESIGN-SYSTEM.md, Back to top. */\n:root{\n  /* Resting gap from the viewport's bottom and right edges. spacing-12 on\n     phones, matching Toast and Action bar. */\n  --c-back-to-top-edge:var(--spacing-24);\n  /* The resolved bottom offset, declared once so the button and Toast's\n     stacked rule (see Toast host) can never disagree. The higher of:\n     the resting gap \u2014 or a page's own --c-back-to-top-bottom, set on\n     <html> above a permanent bottom bar \u2014 plus the phone's safe area; or\n     an open Action bar's --c-action-bar-clearance, which its script\n     writes on <html> (already includes its own gap and safe area, 0 when\n     closed). */\n  --c-back-to-top-y:max(calc(var(--c-back-to-top-bottom, var(--c-back-to-top-edge)) + env(safe-area-inset-bottom, 0px)), var(--c-action-bar-clearance, 0px));\n}\n@media (max-width:640px){\n  :root{--c-back-to-top-edge:var(--spacing-12);}\n}\n.c-back-to-top{--c-back-to-top-move:var(--duration-base); position:fixed; right:calc(var(--c-back-to-top-edge) + env(safe-area-inset-right, 0px)); bottom:var(--c-back-to-top-y); z-index:var(--z-float); width:32px; height:32px; padding:0; border-radius:var(--radius-pill); display:flex; align-items:center; justify-content:center; background:var(--color-neutral-1); border:1px solid var(--color-neutral-3); box-shadow:var(--shadow-2); color:var(--color-neutral-9); cursor:pointer; opacity:0; visibility:hidden; transform:translateY(8px); transition:opacity var(--duration-base) var(--ease-settle), transform var(--duration-base) var(--ease-settle), visibility 0s linear var(--duration-base), background-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard), bottom var(--c-back-to-top-move) var(--ease-standard);}\n.c-back-to-top i{font-size:var(--icon-sm);}\n/* Transparent hit-area lift to 44px \u2014 the 32px box never changes size. */\n.c-back-to-top::after{content:''; position:absolute; inset:-6px;}\n.c-back-to-top:hover{background:var(--color-neutral-2); box-shadow:var(--shadow-3);}\n.c-back-to-top:focus-visible{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n/* Visibility flips at 0s on the way in (focusable at once) and is held\n   for the whole fade on the way out, so a hidden button is never left\n   invisible-but-focusable. */\n.c-back-to-top.is-visible{opacity:1; visibility:visible; transform:translateY(0); transition:opacity var(--duration-base) var(--ease-settle), transform var(--duration-base) var(--ease-settle), visibility 0s linear 0s, background-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard), bottom var(--c-back-to-top-move) var(--ease-standard);}\n/* Reduced motion: no 8px travel and no glide when an Action bar lifts it\n   \u2014 but keep the fade, because the visibility timing still matters. */\n@media (prefers-reduced-motion:reduce){\n  .c-back-to-top, .c-back-to-top.is-visible{transform:none; --c-back-to-top-move:0s;}\n}";

// preview.html 2274, with .is-visible added (the gallery's script adds it past 480px).
export const legacyBackToTopHtml = "<button type=\"button\" class=\"c-back-to-top js-btt is-visible\" aria-label=\"Back to top\" title=\"Back to top\"><i class=\"ph ph-arrow-up\"></i></button>";

const pin = ".pg-btt{position:relative; height:var(--spacing-120);} .pg-btt .c-back-to-top, .pg-btt .cui-back-to-top{position:absolute; right:var(--spacing-24); bottom:var(--spacing-24);} .pg-btt .cui-back-to-top{opacity:1; visibility:visible; transform:none;}";

export function BackToTopPreview() {
  return (
    <>
      <style>{legacyBackToTopCss + pin}</style>
      <section className="pg-row" id="back-to-top" aria-labelledby="back-to-top-h">
        <h3 className="pg-row-title" id="back-to-top-h">Back to top (preview.html 2262–2280), shown</h3>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen pg-btt"><BackToTop /></div>
          </div>
          <div className="pg-col" data-col="old">
            <p className="pg-col-label">Old HTML + CSS</p>
            <div className="pg-specimen pg-btt" dangerouslySetInnerHTML={{ __html: legacyBackToTopHtml }} />
          </div>
        </div>
      </section>
    </>
  );
}
