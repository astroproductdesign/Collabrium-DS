// Stat / KPI card preview: the gallery's six tiles with the OLD HTML + CSS (collabrium-dls/components.css) beside the
// React ones. Never part of the package build. The old side also needs .icon-chip, the Progress-to-Goal Bar's
// .c-goal-bar rules and Phosphor's Fill font, which the comparison page loads.
import { Fire } from '@phosphor-icons/react';
import { StatCard, StatGrid } from './StatCard';

// Copied verbatim from collabrium-dls/components.css lines 3606–3648, for side-by-side comparison only.
export const legacyStatCardCss = "/* Stat / KPI card \u2014 designed not transcribed */\n.c-stats{display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:var(--spacing-16);}\n.c-stat{background:var(--color-neutral-1); border:1px solid var(--color-neutral-3); border-radius:var(--radius-lg); box-shadow:var(--shadow-1); padding:var(--spacing-16); display:flex; flex-direction:column; gap:var(--spacing-8);}\n.c-stat-top{display:flex; align-items:flex-start; justify-content:space-between; gap:var(--spacing-12);}\n.c-stat-label{font-size:var(--text-caption-size); font-weight:700; letter-spacing:var(--tracking-eyebrow); text-transform:uppercase; color:var(--color-neutral-5);}\n.c-stat-value{font-size:var(--text-h1-size); font-weight:var(--text-h1-weight); color:var(--color-neutral-9);}\n.c-stat-value.hero{font-size:var(--text-display-size);}\n.c-stat-trend{display:inline-flex; align-items:center; gap:4px; font-size:var(--text-caption-size); font-weight:700;}\n.c-stat-trend.up{color:var(--color-green);}\n.c-stat-trend.down{color:var(--color-red);}\n.c-stat-trend.flat{color:var(--color-neutral-5);}\n.c-stat-trend .period{color:var(--color-neutral-5); font-weight:400;}\n.c-stat-footer{margin-top:var(--spacing-8); padding-top:var(--spacing-12); border-top:1px solid var(--color-neutral-3); font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n/* Negative value \u2014 a data-driven state the consumer sets when the metric's\n   value is below zero. Escalates to Card's own emphasized-border recipe\n   (--border-width-md plus padding compensated by 1px, exactly as\n   .c-card-selectable.is-selected does, so the tile doesn't grow and break\n   grid alignment) in Red rather than Obsidian, and turns the value Red.\n   Label, icon chip, trend and footer are deliberately untouched: the trend's\n   own Red/Green reports direction of change, a different signal from the\n   value's sign, and the two can legitimately disagree. */\n.c-stat.is-negative{border:var(--border-width-md) solid var(--color-red); padding:calc(var(--spacing-16) - 1px);}\n.c-stat.is-negative .c-stat-value{color:var(--color-red);}\n/* Secondary \u2014 a lighter tile for a supporting metric, sitting alongside\n   primary Stat cards rather than replacing them. The class goes on the\n   card, not the value, because \"secondary\" is a property of the whole\n   tile. The statistic steps down from h1 (32px) to h4 (20px), which is\n   what earns the name; this is a deliberate, documented override of the\n   component's own \"Value | h1\" rule \u2014 see DESIGN-SYSTEM.md for why.\n   Sub-variant B (no goal bar) needs nothing beyond this type step. */\n.c-stat-secondary .c-stat-value{display:flex; align-items:baseline; gap:4px; font-size:var(--text-h4-size); line-height:var(--text-h4-lh); font-weight:var(--text-h4-weight);}\n.c-stat-secondary .c-stat-value .of{font-size:var(--text-footnote-size); line-height:var(--text-footnote-lh); font-weight:var(--text-footnote-weight); color:var(--color-neutral-5);}\n/* Description line \u2014 introduced by Secondary (sub-variant B), but left\n   unscoped: it's a plain caption sub-part any Stat card can use. Distinct\n   from .c-stat-footer, which adds a divider and a top border. */\n.c-stat-desc{font-size:var(--text-caption-size); line-height:var(--text-caption-lh); font-weight:400; color:var(--color-neutral-5);}\n/* Sub-variant A \u2014 the Progress-to-Goal Bar's In-table variant inside the\n   card. Nothing sits above the rail here, so that variant's reserved 16px\n   label band collapses to the target line's own overhang. The label row\n   used to need a font size here too \u2014 that is gone now that\n   .c-goal-bar-labels names caption itself. */\n.c-stat-secondary .c-goal-bar.variant-table .c-goal-bar-chart{padding:var(--gb-overhang) 0 0;}\n.c-stat-secondary .c-goal-bar-labels b{margin-left:0; margin-right:3px;}";

// Old markup, exactly as preview.html 4583–4633 writes it.
const old = "            <div class=\"c-stats\">\n              <div class=\"c-stat\">\n                <div class=\"c-stat-top\">\n                  <span class=\"c-stat-label\">Total spend</span>\n                  <span class=\"icon-chip\"><i class=\"ph-fill ph-fire\"></i></span>\n                </div>\n                <span class=\"c-stat-value\">$48.2k</span>\n                <span class=\"c-stat-trend up\"><i class=\"ph-fill ph-caret-up\"></i>12.4% <span class=\"period\">vs last month</span></span>\n              </div>\n              <div class=\"c-stat\">\n                <div class=\"c-stat-top\"><span class=\"c-stat-label\">Open tickets</span></div>\n                <span class=\"c-stat-value\">86</span>\n                <span class=\"c-stat-trend down\"><i class=\"ph-fill ph-caret-down\"></i>3.1% <span class=\"period\">vs last week</span></span>\n                <div class=\"c-stat-footer\">As of 9:41am</div>\n              </div>\n              <div class=\"c-stat\">\n                <div class=\"c-stat-top\"><span class=\"c-stat-label\">Active campaigns</span></div>\n                <span class=\"c-stat-value\">14</span>\n                <span class=\"c-stat-trend flat\"><i class=\"ph-fill ph-minus\"></i>No change</span>\n              </div>\n              <div class=\"c-stat is-negative\">\n                <div class=\"c-stat-top\"><span class=\"c-stat-label\">Net margin</span></div>\n                <span class=\"c-stat-value\">-RM14.2k</span>\n                <span class=\"c-stat-trend down\"><i class=\"ph-fill ph-caret-down\"></i>8.6% <span class=\"period\">vs last month</span></span>\n              </div>\n              <div class=\"c-stat c-stat-secondary\">\n                <span class=\"c-stat-label\">Where the month is</span>\n                <span class=\"c-stat-value\">Day 6 <span class=\"of\">of 31</span></span>\n                <div class=\"c-goal-bar variant-table\">\n                  <div class=\"c-goal-bar-chart\" role=\"img\" aria-label=\"53% of target achieved, day 6 of 31.\">\n                    <div class=\"c-goal-bar-barwrap\">\n                      <div class=\"c-goal-bar-track\">\n                        <div class=\"c-goal-bar-segment\" style=\"left:0%;width:39.75%;background:var(--color-obsidian)\"></div>\n                        <div class=\"c-goal-bar-headroom\" style=\"left:75%;width:25%\"></div>\n                      </div>\n                      <div class=\"c-goal-bar-target-line\" style=\"left:75%\"></div>\n                    </div>\n                    <div class=\"c-goal-bar-labels\">\n                      <span><b>53%</b>of target achieved</span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"c-stat c-stat-secondary\">\n                <span class=\"c-stat-label\">Daily run rate needed</span>\n                <span class=\"c-stat-value\">RM144k <span class=\"of\">a day</span></span>\n                <span class=\"c-stat-desc\">To reach target by day 31</span>\n              </div>\n            </div>\n          </div>\n        </div>";

/** The gallery's six tiles, in its order. */
export function StatCardGallery() {
  return (
    <StatGrid>
      <StatCard label="Total spend" value="$48.2k" icon={Fire} trend={{ direction: 'up', value: '12.4%', period: 'vs last month' }} />
      <StatCard label="Open tickets" value="86" trend={{ direction: 'down', value: '3.1%', period: 'vs last week' }} footer="As of 9:41am" />
      <StatCard label="Active campaigns" value="14" trend={{ direction: 'flat' }} />
      <StatCard label="Net margin" value="-RM14.2k" negative trend={{ direction: 'down', value: '8.6%', period: 'vs last month' }} />
      <StatCard variant="secondary" label="Where the month is" value="Day 6" unit="of 31" goal={{ value: 39.75, target: 75 }} />
      <StatCard variant="secondary" label="Daily run rate needed" value="RM144k" unit="a day" description="To reach target by day 31" />
    </StatGrid>
  );
}

export function StatCardPreview() {
  return (
    <>
      <style>{legacyStatCardCss}</style>
      <section className="pg-row" id="stat-card" aria-labelledby="stat-card-h">
        <h3 className="pg-row-title" id="stat-card-h">Stat / KPI card (preview.html 4583–4633)</h3>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen">
              <StatCardGallery />
            </div>
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
