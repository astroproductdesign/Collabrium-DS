// Tabs preview: the gallery's overflowing tab row, with the OLD HTML + CSS (collabrium-dls/components.css) rendered
// beside it for visual comparison. Never part of the package build.
import { Gear } from '@phosphor-icons/react';
import { Tabs } from './Tabs';

// Copied verbatim from collabrium-dls/components.css lines 2984–3000 (Tabs)
// for side-by-side comparison only. Never shipped in the package.
export const legacyTabsCss = ".c-tabs-scroll-wrap{position:relative;}\n.c-tabs-scroll-wrap::before, .c-tabs-scroll-wrap::after{content:\"\"; position:absolute; top:0; bottom:1px; width:32px; pointer-events:none; opacity:0; transition:opacity var(--duration-fast) var(--ease-standard); z-index:1;}\n.c-tabs-scroll-wrap::before{left:0; background:linear-gradient(to right, var(--color-neutral-1), transparent);}\n.c-tabs-scroll-wrap::after{right:0; background:linear-gradient(to left, var(--color-neutral-1), transparent);}\n.c-tabs-scroll-wrap.show-left::before{opacity:1;}\n.c-tabs-scroll-wrap.show-right::after{opacity:1;}\n.c-tabs{display:flex; gap:var(--spacing-4); border-bottom:1px solid var(--color-neutral-3); overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none;}\n.c-tabs::-webkit-scrollbar{display:none;}\n.c-tab{display:inline-flex; align-items:center; height:var(--control-height-md); padding:0 var(--spacing-12); border:0; background:transparent; border-radius:var(--radius-sm) var(--radius-sm) 0 0; cursor:pointer; font-family:inherit; font-size:var(--text-body1-size); font-weight:700; color:var(--color-neutral-5); box-shadow:none; white-space:nowrap; flex:none; transition:color var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard);}\n.c-tab i{margin-right:var(--spacing-8); font-size:var(--icon-sm);}\n.c-tab.active{color:var(--color-neutral-9); box-shadow:inset 0 -2px 0 var(--color-obsidian);}\n.c-tab .count{margin-left:var(--spacing-4); font-size:var(--text-caption-size); color:var(--color-neutral-5); font-weight:700;}\n.c-tab.active .count{color:var(--color-neutral-9);}\n.c-tab:not(.active):not(.is-disabled):hover{background:var(--color-neutral-2); color:var(--color-neutral-7);}\n.c-tab:not(.is-disabled):active{background:var(--color-neutral-3);}\n.c-tab:focus-visible{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n.c-tab.is-disabled{color:var(--color-neutral-4); opacity:.4; cursor:not-allowed; pointer-events:none;}";

// Old markup, exactly as preview.html 4979–4988 writes it.
const old = "<div class=\"c-tabs-scroll-wrap show-right\"><div class=\"c-tabs\" role=\"tablist\" style=\"max-width:380px;\"><button class=\"c-tab active\" role=\"tab\" aria-selected=\"true\" type=\"button\">Overview</button><button class=\"c-tab\" role=\"tab\" aria-selected=\"false\" type=\"button\">Campaigns<span class=\"count\">8</span></button><button class=\"c-tab\" role=\"tab\" aria-selected=\"false\" type=\"button\"><i class=\"ph ph-gear\"></i>Settings</button><button class=\"c-tab\" role=\"tab\" aria-selected=\"false\" type=\"button\">Reports</button><button class=\"c-tab\" role=\"tab\" aria-selected=\"false\" type=\"button\">Audience insights</button><button class=\"c-tab\" role=\"tab\" aria-selected=\"false\" type=\"button\">Budget &amp; spend</button></div></div>";

export function TabsPreview() {
  return (
    <>
      <style>{legacyTabsCss}</style>
      <section className="pg-row" id="overflow" aria-labelledby="overflow-h">
        <h3 className="pg-row-title" id="overflow-h">Overflow, count and icon (preview.html 4979–4988)</h3>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen">
              <div style={{ maxWidth: 380 }}>
                <Tabs
                  aria-label="Sections"
                  tabs={[
                    { id: 'overview', label: 'Overview' },
                    { id: 'campaigns', label: 'Campaigns', count: 8 },
                    { id: 'settings', label: 'Settings', icon: Gear },
                    { id: 'reports', label: 'Reports' },
                    { id: 'audience', label: 'Audience insights' },
                    { id: 'budget', label: 'Budget & spend' },
                  ]}
                />
              </div>
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

export default TabsPreview;
