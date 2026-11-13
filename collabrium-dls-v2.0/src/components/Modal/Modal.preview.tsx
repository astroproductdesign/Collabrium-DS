// Modal preview: the panel, with the OLD HTML + CSS (collabrium-dls/components.css) rendered beside it for visual
// comparison. The new modal opens over the page (a portal), so this compares it open. Never part of the package build.
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';

// Copied verbatim from collabrium-dls/components.css lines 1782–1788 (Modal / dialog and .c-icon-btn)
// for side-by-side comparison only. Never shipped in the package.
export const legacyModalCss = ".c-modal{background:var(--color-neutral-1); border-radius:var(--radius-lg); width:100%; max-width:400px; box-shadow:var(--shadow-modal);}\n.c-modal-head{display:flex; justify-content:space-between; align-items:center; padding:var(--spacing-16);}\n.c-modal-head h4{margin:0; font-size:var(--text-h4-size); font-weight:var(--text-h4-weight);}\n.c-modal-body{padding:0 var(--spacing-16) var(--spacing-16); font-size:var(--text-body1-size); color:var(--color-neutral-9); line-height:1.5;}\n.c-modal-foot{display:flex; justify-content:flex-end; gap:var(--spacing-12); padding:var(--spacing-16); border-top:1px solid var(--color-neutral-3);}\n.c-icon-btn{width:var(--control-height-sm); height:var(--control-height-sm); display:flex; align-items:center; justify-content:center; border-radius:var(--radius-sm); background:transparent; border:none; cursor:pointer;}\n.c-icon-btn:hover{background:var(--color-neutral-2);}";

// Old markup, exactly as preview.html 3844–3851 writes it.
const old = "<div class=\"c-modal\"><div class=\"c-modal-head\"><h4>Archive this workspace?</h4><button class=\"c-icon-btn\" type=\"button\"><i class=\"ph ph-x\"></i></button></div><div class=\"c-modal-body\">Team members will lose access immediately. You can restore it from Settings within 30 days.</div><div class=\"c-modal-foot\"><button class=\"c-btn c-btn-secondary c-btn-md\" type=\"button\">Cancel</button><button class=\"c-btn c-btn-primary c-btn-md\" type=\"button\">Archive</button></div></div>";

export function ModalPreview() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <style>{legacyModalCss}</style>
      <section className="pg-row" id="confirm" aria-labelledby="confirm-h">
        <h3 className="pg-row-title" id="confirm-h">Confirmation (preview.html 3844–3851)</h3>
        <p className="pg-row-note">The new modal opens over the page; the old panel is static in the gallery, with no scrim.</p>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen">
              <Button variant="secondary" onClick={() => setOpen(true)}>Reopen modal</Button>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Archive this workspace?"
                actions={
                  <>
                    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => setOpen(false)}>Archive</Button>
                  </>
                }
              >
                Team members will lose access immediately. You can restore it from Settings within 30 days.
              </Modal>
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

export default ModalPreview;
