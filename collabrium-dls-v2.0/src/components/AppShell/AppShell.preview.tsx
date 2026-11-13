// AppShell preview: the gallery's shell (preview.html 2160–2240), with the OLD HTML + CSS
// (collabrium-dls/components.css lines 2910–2976) rendered beside it for visual comparison. The nav is a plain
// 240px stand-in on both sides, so only the shell's placement is compared. Never part of the package build.
import { AppShell, ContentGrid, ContentGridItem } from './AppShell';
import { Card, CardHeader } from '../Card';
import { PageHeader } from '../PageHeader';

// Copied verbatim (comments removed) from collabrium-dls/components.css lines 2910–2976 (App Shell)
// for side-by-side comparison only. Never shipped in the package.
export const legacyAppShellCss = ".c-shell{display:flex; height:480px; background:var(--color-canvas-warm);}\n.c-shell .c-sidebar-shell{flex:0 0 auto; display:flex; margin:var(--spacing-16) 0 var(--spacing-16) var(--spacing-16);}\n.c-shell .c-sidebar{overflow-y:hidden;} \n.c-shell-main{flex:1; display:flex; flex-direction:column; min-width:0;}\n.c-shell-content{flex:1; overflow-y:auto; padding:var(--page-gutter); padding-top:var(--section-gap);}\n.c-shell .c-pageheader{margin-bottom:var(--section-gap);}\n@media (max-width:768px){\n  .c-shell{position:relative;}\n  .c-shell .c-sidebar-shell{position:absolute; top:var(--spacing-16); left:var(--spacing-16); margin:0; z-index:5;}\n  .c-shell .c-sidebar{max-height:calc(100% - 32px);}\n  .c-shell-content{padding-top:var(--spacing-120);}\n}\n.c-shell-grid{display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); column-gap:var(--spacing-16); row-gap:var(--spacing-24);} \n.c-shell-grid > .c-shell-span-1{grid-column:span 1;}\n.c-shell-grid > .c-shell-span-2{grid-column:span 2;}\n.c-shell-grid > .c-shell-span-3{grid-column:span 3;}\n.c-shell-grid > .c-shell-span-4{grid-column:span 4;}";

const legacyMarkup = "<div class=\"c-shell\" style=\"height:480px\"><div class=\"c-sidebar-shell\"><div style=\"width:240px; border:1px solid var(--color-neutral-3); border-radius:var(--radius-lg); background:var(--color-neutral-1)\"></div></div><div class=\"c-shell-main\"><div class=\"c-shell-content\"><div class=\"c-pageheader\"><div class=\"c-pageheader-row\"><div class=\"c-pageheader-text\"><h1>Overview</h1><p class=\"sub\">Here's what you've used across your projects.</p></div></div></div><div class=\"c-shell-grid\"><div class=\"c-card c-shell-span-3\"><h5>Usage by project</h5><p>Spans 3 of the 4 columns.</p></div><div class=\"c-card c-shell-span-1\"><h5>Quick note</h5><p>Stretches to match.</p></div></div></div></div></div>";

function StandIn() {
  return <div style={{ width: 240, border: '1px solid var(--color-neutral-3)', borderRadius: 'var(--radius-lg)', background: 'var(--color-neutral-1)' }} />;
}

export function AppShellPreview() {
  return (
    <section className="pg-row" id="shell" aria-labelledby="shell-h">
      <style>{legacyAppShellCss}</style>
      <h3 className="pg-row-title" id="shell-h">App Shell (preview.html 2160–2240)</h3>
      <div className="pg-cols">
        <div className="pg-col" data-col="new">
          <p className="pg-col-label">React · @collabrium/ui</p>
          <div className="pg-specimen" style={{ height: 480, padding: 0 }}>
            <AppShell fit="container" nav={<StandIn />} header={<PageHeader title="Overview" subtitle="Here's what you've used across your projects." />}>
              <ContentGrid>
                <ContentGridItem span={3}>
                  <Card>
                    <CardHeader title="Usage by project" />
                    <p>Spans 3 of the 4 columns.</p>
                  </Card>
                </ContentGridItem>
                <ContentGridItem span={1}>
                  <Card>
                    <CardHeader title="Quick note" />
                    <p>Stretches to match.</p>
                  </Card>
                </ContentGridItem>
              </ContentGrid>
            </AppShell>
          </div>
        </div>
        <div className="pg-col" data-col="old">
          <p className="pg-col-label">Old · components.css</p>
          <div className="pg-specimen" style={{ padding: 0 }} dangerouslySetInnerHTML={{ __html: legacyMarkup }} />
        </div>
      </div>
    </section>
  );
}

export default AppShellPreview;
