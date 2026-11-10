// Slider preview: the gallery's two sliders with the OLD HTML + CSS (collabrium-dls/components.css) beside the React
// ones, plus every size and state. Never part of the package build. The old side is static (the gallery's script isn't
// copied), so its fill and tooltip sit where the page's script would put them at load.
import { Slider } from "./Slider";

// Copied verbatim from collabrium-dls/components.css lines 4473–4520, for side-by-side comparison only.
export const legacySliderCss = "/* Slider — designed from scratch, not transcribed. Reuses Button Ghost's\n   hover/pressed recipe (via shadow-2/shadow-3 rung), Switch's thumb\n   anatomy, Tooltip's bubble visuals, and Button's focus-visible token.\n   Built and tested as a standalone reference file first — several rows\n   below exist specifically because that testing surfaced real bugs:\n   - The thumb must be vertically centered on the track's own line, not\n     the top of its own taller hit-target box (margin-top math on the\n     thumb, keyed to the rail's height).\n   - Track and min/max labels run the rail's full width, flush with its\n     edges, with the thumb allowed to overhang the ends by half its own\n     width at 0%/100% — normal for a point value, same as native OS\n     sliders; don't inset the rail to prevent it.\n   - Range's \"thumbs may touch but never cross\" rule is enforced by\n     clamping the moved handle's VALUE against its partner (see the JS),\n     never either handle's live min/max attribute — a native thumb's\n     on-screen position is rendered from that same attribute, so\n     mutating it to enforce the constraint also corrupts native\n     rendering, snapping the thumb to the wrong end of the track. */\n.c-slider-label{display:block; font-family:var(--font-primary); font-size:var(--text-caption-size); line-height:var(--text-caption-lh); font-weight:700; color:var(--color-neutral-9); margin-bottom:var(--spacing-4);}\n.c-slider-group{width:100%;}\n.c-slider-rail{position:relative; height:24px;}\n.c-slider-track{position:absolute; top:50%; left:0; right:0; height:4px; transform:translateY(-50%); border-radius:var(--radius-pill); background:var(--color-neutral-3);}\n.c-slider-compact .c-slider-track{height:2px;}\n.c-slider-fill{position:absolute; top:0; height:100%; background:var(--color-obsidian); border-radius:var(--radius-pill);}\n.c-slider-input{position:absolute; top:0; left:0; right:0; height:100%; margin:0; background:transparent; appearance:none; -webkit-appearance:none;}\n.c-slider-range .c-slider-input{pointer-events:none;}\n.c-slider-input::-webkit-slider-runnable-track{background:transparent; height:100%;}\n.c-slider-input::-moz-range-track{background:transparent; height:100%; border:none;}\n.c-slider-input::-webkit-slider-thumb{appearance:none; -webkit-appearance:none; pointer-events:auto; width:20px; height:20px; border-radius:var(--radius-pill); background:var(--color-neutral-1); border:2px solid var(--color-obsidian); box-shadow:var(--shadow-2); cursor:pointer; margin-top:var(--spacing-2); transition:box-shadow var(--duration-fast) var(--ease-standard); position:relative;}\n.c-slider-input::-moz-range-thumb{pointer-events:auto; width:20px; height:20px; border-radius:var(--radius-pill); background:var(--color-neutral-1); border:2px solid var(--color-obsidian); box-shadow:var(--shadow-2); cursor:pointer; transition:box-shadow var(--duration-fast) var(--ease-standard);}\n.c-slider-compact .c-slider-input::-webkit-slider-thumb, .c-slider-compact .c-slider-input::-moz-range-thumb{width:16px; height:16px;}\n.c-slider-compact .c-slider-input::-webkit-slider-thumb{margin-top:4px;}\n.c-slider-input:hover::-webkit-slider-thumb, .c-slider-input:active::-webkit-slider-thumb, .c-slider-input:hover::-moz-range-thumb, .c-slider-input:active::-moz-range-thumb{box-shadow:var(--shadow-3);}\n.c-slider-input:hover, .c-slider-input:active{cursor:grab;}\n.c-slider-input:active{cursor:grabbing;}\n.c-slider-input:focus{outline:none;}\n.c-slider-input:focus-visible::-webkit-slider-thumb{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n.c-slider-input:focus-visible::-moz-range-thumb{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n.c-slider-disabled{opacity:.4;}\n.c-slider-disabled .c-slider-fill{background:var(--color-neutral-3);}\n.c-slider-disabled .c-slider-input, .c-slider-disabled .c-slider-input::-webkit-slider-thumb, .c-slider-disabled .c-slider-input::-moz-range-thumb{cursor:not-allowed; pointer-events:none;}\n.c-slider-disabled .c-slider-input::-webkit-slider-thumb, .c-slider-disabled .c-slider-input::-moz-range-thumb{border-color:var(--color-neutral-4); box-shadow:none;}\n.c-slider-tooltip{position:absolute; bottom:calc(100% + 8px); left:0; transform:translateX(-50%); padding:var(--spacing-6) var(--spacing-8); border-radius:var(--radius-sm); background:var(--color-neutral-7); color:var(--color-neutral-1); font-family:var(--font-primary); font-size:var(--text-caption-size); font-weight:500; white-space:nowrap; pointer-events:none; opacity:0; transition:opacity var(--duration-fast) var(--ease-standard);}\n.c-slider-tooltip.is-visible{opacity:1; transition-delay:0s;}\n.c-slider-tooltip.is-hiding{opacity:0; transition-delay:var(--duration-base);}\n@media (prefers-reduced-motion: reduce){ .c-slider-input::-webkit-slider-thumb, .c-slider-input::-moz-range-thumb, .c-slider-tooltip{transition:none !important;} }\n.c-slider-minmax{display:flex; justify-content:space-between; margin-top:var(--spacing-4); font-family:var(--font-primary); font-size:var(--text-caption-size); line-height:var(--text-caption-lh); color:var(--color-neutral-5);}\n.c-slider-static-value{display:flex; justify-content:flex-end; font-family:var(--font-primary); font-size:var(--text-caption-size); line-height:var(--text-caption-lh); color:var(--color-neutral-9); margin-bottom:var(--spacing-4);}";

// Old markup, exactly as preview.html 4556–4576 writes it.
export const legacySliderHtml = "              <div class=\"c-slider-group\">\n                <label class=\"c-slider-label\" for=\"single-default\">Campaign budget</label>\n                <div class=\"c-slider-rail\">\n                  <span class=\"c-slider-tooltip\" data-tooltip-for=\"single-default\"></span>\n                  <div class=\"c-slider-track\"><div class=\"c-slider-fill\" data-fill-for=\"single-default\"></div></div>\n                  <input class=\"c-slider-input\" type=\"range\" id=\"single-default\" min=\"0\" max=\"100000\" step=\"1000\" value=\"40000\" aria-label=\"Campaign budget\" data-format=\"rm\" />\n                </div>\n                <div class=\"c-slider-minmax\"><span>RM 0</span><span>RM 100,000</span></div>\n              </div>\n              <p style=\"margin:0;font-size:12px;color:var(--color-neutral-5)\">Range &mdash; Default size. Fill renders only between the two thumbs; they may touch but never cross.</p>\n              <div class=\"c-slider-group\">\n                <label class=\"c-slider-label\" for=\"range-min\">Price range</label>\n                <div class=\"c-slider-rail c-slider-range\" data-range-group=\"price\">\n                  <span class=\"c-slider-tooltip\" data-tooltip-for=\"range-min\"></span>\n                  <span class=\"c-slider-tooltip\" data-tooltip-for=\"range-max\"></span>\n                  <div class=\"c-slider-track\"><div class=\"c-slider-fill\" data-fill-for=\"range-min\" data-fill-to=\"range-max\"></div></div>\n                  <input class=\"c-slider-input\" type=\"range\" id=\"range-min\" min=\"0\" max=\"1000\" step=\"10\" value=\"200\" aria-label=\"Minimum value\" data-format=\"rm\" data-range-partner=\"range-max\" />\n                  <input class=\"c-slider-input\" type=\"range\" id=\"range-max\" min=\"0\" max=\"1000\" step=\"10\" value=\"700\" aria-label=\"Maximum value\" data-format=\"rm\" data-range-partner=\"range-min\" />\n                </div>\n                <div class=\"c-slider-minmax\"><span>RM 0</span><span>RM 1,000</span></div>\n              </div>";

/** The gallery's two sliders, in its order. */
export function SliderGallery() {
  return (
    <>
      <Slider label="Campaign budget" min={0} max={100000} step={1000} defaultValue={40000} format="rm" showLimits />
      <Slider variant="range" label="Price range" min={0} max={1000} step={10} defaultValue={[200, 700]} format="rm" showLimits />
    </>
  );
}

/** Every size and state. */
export function SliderStates() {
  return (
    <>
      <Slider label="Compact" size="compact" defaultValue={30} format="percent" showLimits />
      <Slider label="Compact range" variant="range" size="compact" defaultValue={[20, 60]} format="percent" />
      <Slider label="Static value" defaultValue={55} format="percent" showValue />
      <Slider label="Disabled" defaultValue={40} format="percent" disabled showLimits />
      <Slider label="Disabled range" variant="range" defaultValue={[20, 60]} disabled />
    </>
  );
}

export function SliderPreview() {
  return (
    <>
      <style>{legacySliderCss}</style>
      <section className="pg-row" id="slider" aria-labelledby="slider-h">
        <h3 className="pg-row-title" id="slider-h">Slider (preview.html 4556–4576)</h3>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen"><SliderGallery /><SliderStates /></div>
          </div>
          <div className="pg-col" data-col="old">
            <p className="pg-col-label">Old HTML + CSS</p>
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: legacySliderHtml }} />
          </div>
        </div>
      </section>
    </>
  );
}
