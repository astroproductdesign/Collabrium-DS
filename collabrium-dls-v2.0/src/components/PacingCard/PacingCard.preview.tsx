// Pacing card preview: the gallery's two cards, with the OLD HTML + CSS (collabrium-dls/components.css) rendered
// beside them for visual comparison. Never part of the package build.
import { legacyCardCss } from '../Card/Card.preview';
import { legacyBadgeCss } from '../Badge/Badge.preview';
import { legacyGoalBarCss } from '../GoalBar/GoalBar.preview';
import { CardGrid } from '../Card';
import { PacingCard } from './PacingCard';

// Copied verbatim from collabrium-dls/components.css lines 490–523 (Pacing card)
// for side-by-side comparison only. Never shipped in the package.
export const legacyPacingCardCss = "\n/* =========================================================\n   Pacing Card — one metric's progress against a target it's racing a\n   deadline to hit. A Card sub-component: container and footer are the\n   base .c-card / .c-card-footer unmodified, the rail is Progress-to-Goal\n   Bar's In-table variant and the status pill is the real Badge, so this\n   block is arrangement only — no new tokens, no re-drawn furniture.\n   Requires all three of target, accumulating actual, and a time\n   boundary; see DESIGN-SYSTEM.md's Card section (\"Pacing Card\") for the\n   usage gate, the badge rule and why the footer is required here.\n   ========================================================= */\n/* The base card's 8px child gap is too tight once an h4 label, an h3\n   KPI, a rail and a badge stack up; 12px separates the bands without\n   materially growing the tile. */\n.c-card-pacing{gap:var(--spacing-12);}\n.c-card-pacing-label{margin:0; font-size:var(--text-h4-size); line-height:var(--text-h4-lh); font-weight:var(--text-h4-weight); letter-spacing:var(--text-h4-tracking); color:var(--color-neutral-9);}\n.c-card-pacing-kpi{display:flex; align-items:baseline; flex-wrap:wrap; gap:var(--spacing-8);}\n.c-card-pacing-kpi .value{font-size:var(--text-h3-size); line-height:var(--text-h3-lh); font-weight:var(--text-h3-weight); letter-spacing:var(--text-h3-tracking); color:var(--color-neutral-9); font-variant-numeric:tabular-nums;}\n.c-card-pacing-kpi .qualifier{font-size:var(--text-caption-size); line-height:var(--text-caption-lh); font-weight:var(--text-caption-weight); color:var(--color-neutral-5);}\n/* Minibar. Nothing sits above the rail here, so the In-table variant's\n   reserved label band collapses to the target line's own overhang — the\n   same override the Secondary stat/KPI card needs. The label row used to\n   need a font size here too, because variant-table never set one, having\n   had no legend of its own — that is gone: .c-goal-bar-labels now names\n   caption itself. Labels are Total flush left / Target flush right,\n   which is .c-goal-bar-labels' own native space-between layout as-is. */\n.c-card-pacing .c-goal-bar.variant-table .c-goal-bar-chart{padding:var(--gb-overhang) 0 0;}\n.c-card-pacing .c-goal-bar-labels{margin-top:var(--spacing-6); line-height:1.4;}\n/* .c-card is a column flexbox with no align-items, so a bare badge\n   stretches to the full card width — the same trap already recorded\n   against the Stat/KPI card's badge. This row contains it. */\n.c-card-pacing-status{display:flex; flex-wrap:wrap; align-items:center; gap:var(--spacing-8);}\n/* Footer is .c-card-footer verbatim; its own 16px margin-top would\n   double-count against this variant's 12px child gap. */";

// preview.html 2658–2701 (the Pacing cards grid).
const oldGrid = "<div class=\"c-cards\">\n<div class=\"c-card c-card-pacing\">\n<h5 class=\"c-card-pacing-label\">TV</h5>\n<div class=\"c-card-pacing-kpi\"><span class=\"value\">RM11.4M</span><span class=\"qualifier\">forecast</span></div>\n<div class=\"c-goal-bar variant-table\">\n<div class=\"c-goal-bar-chart\" role=\"img\" aria-label=\"RM6.6M booked of a RM10.2M target, 65% to target.\">\n<div class=\"c-goal-bar-barwrap\">\n<div class=\"c-goal-bar-track\">\n<div class=\"c-goal-bar-segment\" style=\"left:0%;width:48.75%;background:var(--color-obsidian)\"></div>\n<div class=\"c-goal-bar-headroom\" style=\"left:75%;width:25%\"></div>\n</div>\n<div class=\"c-goal-bar-target-line\" style=\"left:75%\"></div>\n</div>\n<div class=\"c-goal-bar-labels\">\n<span class=\"lbl-total\">Total <b>RM6.6M</b></span>\n<span class=\"lbl-target\">Target <b>RM10.2M</b></span>\n</div>\n</div>\n</div>\n<div class=\"c-card-pacing-status\"><span class=\"c-badge c-badge-error\">65% to target</span></div>\n<div class=\"c-card-footer\">Day 18 of 31 &middot; RM277k a day to reach target</div>\n</div>\n<div class=\"c-card c-card-pacing\">\n<h5 class=\"c-card-pacing-label\">Out of home</h5>\n<div class=\"c-card-pacing-kpi\"><span class=\"value\">RM5.6M</span><span class=\"qualifier\">forecast</span></div>\n<div class=\"c-goal-bar variant-table\">\n<div class=\"c-goal-bar-chart\" role=\"img\" aria-label=\"RM4.9M booked of a RM4.2M target, 117% to target.\">\n<div class=\"c-goal-bar-barwrap\">\n<div class=\"c-goal-bar-track\">\n<div class=\"c-goal-bar-segment\" style=\"left:0%;width:87.5%;background:var(--color-obsidian)\"></div>\n</div>\n<div class=\"c-goal-bar-target-line\" style=\"left:75%\"></div>\n</div>\n<div class=\"c-goal-bar-labels\">\n<span class=\"lbl-total\">Total <b>RM4.9M</b></span>\n<span class=\"lbl-target\">Target <b>RM4.2M</b></span>\n</div>\n</div>\n</div>\n<div class=\"c-card-pacing-status\"><span class=\"c-badge c-badge-success\">117% to target</span></div>\n<div class=\"c-card-footer\">Day 18 of 31 &middot; target met on day 15</div>\n</div>\n</div>";

export function PacingCardPreview() {
  return (
    <>
      <style>{[legacyCardCss, legacyBadgeCss, legacyGoalBarCss, legacyPacingCardCss].join('\n')}</style>
      <section className="pg-row" id="samples" aria-labelledby="samples-h">
        <h3 className="pg-row-title" id="samples-h">Short of target, and target met (preview.html 2658–2701)</h3>
        <p className="pg-row-note">The gallery's TV segment is 48.75% (65% × 75%); the computed rail is 48.53% (6.6 ÷ 13.6).</p>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen">
              <CardGrid>
                <PacingCard label="TV" kpi={11_400_000} kpiQualifier="forecast" value={6_600_000} target={10_200_000} day={18} days={31} />
                <PacingCard label="Out of home" kpi={5_600_000} kpiQualifier="forecast" value={4_900_000} target={4_200_000} day={18} days={31} metOnDay={15} />
              </CardGrid>
            </div>
          </div>
          <div className="pg-col" data-col="old">
            <p className="pg-col-label">Old HTML + CSS · components.css</p>
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: oldGrid }} />
          </div>
        </div>
      </section>
    </>
  );
}

export default PacingCardPreview;
