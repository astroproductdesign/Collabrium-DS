// Back button preview: the gallery's Back button, with the OLD HTML + CSS (collabrium-dls/components.css) rendered
// beside it for visual comparison. Never part of the package build.
import { BackButton } from './BackButton';

// Copied verbatim from collabrium-dls/components.css lines 4415–4420 (Back button)
// for side-by-side comparison only. Never shipped in the package.
export const legacyBackButtonCss = ".c-back-button-row{margin-bottom:var(--spacing-12);}\n.c-back-button{display:inline-flex; align-items:center; gap:var(--spacing-8); padding:var(--spacing-8) var(--spacing-12); border:none; background:transparent; border-radius:var(--radius-sm); font-family:var(--font-primary); font-size:var(--text-label2-size); font-weight:var(--text-label2-weight); color:var(--color-neutral-9); cursor:pointer; transition:background-color var(--duration-fast) var(--ease-standard);}\n.c-back-button i{font-size:var(--icon-sm);}\n.c-back-button:hover{background:var(--color-neutral-2);}\n.c-back-button:active{background:var(--color-neutral-3);}\n.c-back-button:focus-visible{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}";

// Old markup, exactly as preview.html 2245–2250 writes it.
const old = "<div class=\"c-back-button-row\"><button class=\"c-back-button\" type=\"button\"><i class=\"ph ph-arrow-left\"></i><span>Reports</span></button></div>";

export function BackButtonPreview() {
  return (
    <>
      <style>{legacyBackButtonCss}</style>
      <section className="pg-row" id="default" aria-labelledby="default-h">
        <h3 className="pg-row-title" id="default-h">Default, above a page header (preview.html 2245–2250)</h3>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen"><BackButton label="Reports" onClick={() => {}} /></div>
          </div>
          <div className="pg-col" data-col="old">
            <p className="pg-col-label">Old HTML + CSS · components.css</p>
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: old }} />
          </div>
        </div>
      </section>
    </>
  );
}

export default BackButtonPreview;
