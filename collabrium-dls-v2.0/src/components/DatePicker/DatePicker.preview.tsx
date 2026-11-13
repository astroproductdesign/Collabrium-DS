// Date picker preview: the gallery's range example with the OLD HTML + CSS (collabrium-dls/components.css) beside the
// React one, opened on the same month. Never part of the package build. The old side needs Phosphor's font and the old
// .c-icon-btn, which the comparison page loads.
import { DatePicker } from "./DatePicker";

// Copied verbatim from collabrium-dls/components.css lines 3808–3825, for side-by-side comparison only.
export const legacyDatePickerCss = "/* Date picker \u2014 designed not transcribed */\n.c-dp-trigger{display:inline-flex; align-items:center; gap:var(--spacing-8); height:var(--control-height-md); padding:0 var(--spacing-12); border:1px solid var(--color-neutral-3); border-radius:var(--radius-sm); background:var(--color-neutral-1); color:var(--color-neutral-9); font-family:inherit; font-size:var(--text-body1-size); font-weight:500;}\n.c-dp-trigger i{color:var(--color-neutral-5);}\n.c-dp-panel{width:280px; border:1px solid var(--color-neutral-3); border-radius:var(--radius-md); box-shadow:var(--shadow-3); background:var(--color-neutral-1); padding:var(--spacing-16);}\n.c-dp-header{display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--spacing-12);}\n.c-dp-header h5{margin:0; font-size:var(--text-h5-size); font-weight:var(--text-h5-weight);}\n.c-dp-grid{display:grid; grid-template-columns:repeat(7,1fr); gap:var(--spacing-2);}\n.c-dp-weekday{text-align:center; font-size:var(--text-caption-size); font-weight:700; text-transform:uppercase; color:var(--color-neutral-5); padding-bottom:var(--spacing-4);}\n.c-dp-day{width:100%; aspect-ratio:1; display:flex; align-items:center; justify-content:center; border-radius:var(--radius-sm); border:0; background:transparent; color:var(--color-neutral-9); font-family:inherit; font-size:var(--text-body2-size); cursor:pointer;}\n.c-dp-day:hover{background:var(--color-neutral-2);}\n.c-dp-day.today{border:1px solid var(--color-obsidian); background:transparent;}\n.c-dp-day.selected{background:var(--color-obsidian); color:var(--color-neutral-1);}\n.c-dp-day.range{background:var(--color-neutral-2); border-radius:0;}\n.c-dp-day.range-start{background:var(--color-obsidian); color:var(--color-neutral-1); border-radius:var(--radius-sm) 0 0 var(--radius-sm);}\n.c-dp-day.range-end{background:var(--color-obsidian); color:var(--color-neutral-1); border-radius:0 var(--radius-sm) var(--radius-sm) 0;}\n.c-dp-day.disabled{color:var(--color-neutral-4); cursor:not-allowed;}\n.c-dp-day.disabled:hover{background:transparent;}\n";

// preview.html 3131–3148: the trigger and the panel, always open.
export const legacyDatePickerHtml = "            <div class=\"comp-row\" style=\"align-items:flex-start\">\n              <button class=\"c-dp-trigger\" type=\"button\"><i class=\"ph-fill ph-calendar\"></i>Jul 12 &ndash; Jul 24, 2026</button>\n              <div class=\"c-dp-panel\">\n                <div class=\"c-dp-header\">\n                  <button class=\"c-icon-btn\" type=\"button\"><i class=\"ph ph-caret-left\"></i></button>\n                  <h5>July 2026</h5>\n                  <button class=\"c-icon-btn\" type=\"button\"><i class=\"ph ph-caret-right\"></i></button>\n                </div>\n                <div class=\"c-dp-grid\">\n                  <span class=\"c-dp-weekday\">S</span><span class=\"c-dp-weekday\">M</span><span class=\"c-dp-weekday\">T</span><span class=\"c-dp-weekday\">W</span><span class=\"c-dp-weekday\">T</span><span class=\"c-dp-weekday\">F</span><span class=\"c-dp-weekday\">S</span>\n                  <button class=\"c-dp-day disabled\" type=\"button\">28</button><button class=\"c-dp-day disabled\" type=\"button\">29</button><button class=\"c-dp-day disabled\" type=\"button\">30</button>\n                  <button class=\"c-dp-day\" type=\"button\">1</button><button class=\"c-dp-day\" type=\"button\">2</button><button class=\"c-dp-day\" type=\"button\">3</button><button class=\"c-dp-day\" type=\"button\">4</button>\n                  <button class=\"c-dp-day\" type=\"button\">5</button><button class=\"c-dp-day\" type=\"button\">6</button><button class=\"c-dp-day\" type=\"button\">7</button><button class=\"c-dp-day\" type=\"button\">8</button><button class=\"c-dp-day\" type=\"button\">9</button><button class=\"c-dp-day\" type=\"button\">10</button><button class=\"c-dp-day today\" type=\"button\">11</button>\n                  <button class=\"c-dp-day range-start\" type=\"button\">12</button><button class=\"c-dp-day range\" type=\"button\">13</button><button class=\"c-dp-day range\" type=\"button\">14</button><button class=\"c-dp-day range\" type=\"button\">15</button><button class=\"c-dp-day range\" type=\"button\">16</button><button class=\"c-dp-day range\" type=\"button\">17</button><button class=\"c-dp-day range\" type=\"button\">18</button>\n                  <button class=\"c-dp-day range\" type=\"button\">19</button><button class=\"c-dp-day range\" type=\"button\">20</button><button class=\"c-dp-day range\" type=\"button\">21</button><button class=\"c-dp-day range\" type=\"button\">22</button><button class=\"c-dp-day range\" type=\"button\">23</button><button class=\"c-dp-day range-end\" type=\"button\">24</button><button class=\"c-dp-day\" type=\"button\">25</button>\n                </div>\n              </div>\n            </div>";

/** The gallery's range, Jul 12 – Jul 24, 2026. Open it to compare with the old panel. */
export function DatePickerGallery() {
  return <DatePicker mode="range" label="Dates" hideLabel defaultValue={{ start: "2026-07-12", end: "2026-07-24" }} />;
}

export function DatePickerPreview() {
  return (
    <>
      <style>{legacyDatePickerCss}</style>
      <section className="pg-row" id="datepicker" aria-labelledby="datepicker-h">
        <h3 className="pg-row-title" id="datepicker-h">Date picker (preview.html 3128–3150)</h3>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen"><DatePickerGallery /></div>
          </div>
          <div className="pg-col" data-col="old">
            <p className="pg-col-label">Old HTML + CSS</p>
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: legacyDatePickerHtml }} />
          </div>
        </div>
      </section>
    </>
  );
}
