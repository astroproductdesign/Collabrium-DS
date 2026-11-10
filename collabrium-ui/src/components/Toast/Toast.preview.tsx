// Toast preview: the gallery's three stacked toasts with the OLD HTML + CSS (collabrium-dls/components.css) beside the
// React ones, at rest. Never part of the package build. The old side needs Phosphor's fonts and .c-icon-btn, which the
// comparison page loads; its markup is what the gallery's script writes (preview.html 21330–21336).
import { Toast } from "./Toast";

// Copied verbatim from collabrium-dls/components.css lines 3217–3265, for side-by-side comparison only.
export const legacyToastCss = "/* Toast */\n.c-toast{display:flex; align-items:flex-start; gap:var(--spacing-12); min-width:320px; max-width:420px; padding:var(--spacing-12) var(--spacing-16); background:var(--color-neutral-1); border:1px solid var(--color-neutral-3); border-radius:var(--radius-md); box-shadow:var(--shadow-3);}\n.c-toast i.tone{margin-top:var(--spacing-2); font-size:var(--icon-base);}\n.c-toast .tone-neutral{color:var(--color-neutral-9);}\n.c-toast .tone-success{color:var(--color-green);}\n.c-toast .tone-danger{color:var(--color-red);}\n.c-toast .tone-warning{color:var(--color-amber);}\n.c-toast .body{flex:1; min-width:0;}\n.c-toast .title{font-size:var(--text-body1-size); font-weight:700;}\n.c-toast .message{font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n/* Message-only layout variant — message becomes the primary content, so it\n   renders at body1 weight 500 rather than the secondary-caption treatment\n   it gets under a title. Per Toast, Layout variants. */\n.c-toast.is-message-only .message{font-size:var(--text-body1-size); line-height:var(--text-body1-lh); font-weight:var(--text-body1-weight); color:var(--color-neutral-9);}\n.c-toast .action{margin-top:var(--spacing-8);}\n\n/* Entrance/exit animation — duration-base + ease-standard (the non-elemental\n   default; Toast isn't owned by a specific brand element). Per Toast,\n   Animation. */\n.c-toast{transition:transform var(--duration-base) var(--ease-standard), opacity var(--duration-base) var(--ease-standard);}\n.c-toast.is-entering{opacity:0; transform:translateY(16px);}\n.c-toast.is-exiting{opacity:0; transform:translateY(8px);}\n@media (prefers-reduced-motion:reduce){\n  .c-toast{transition:none;}\n}\n\n/* Toast host — fixed bottom-right, spacing-24 offset, stacked newest-on-top\n   with a spacing-8 gap; collapses to a full-width bottom band with\n   spacing-12 margins under 640px. Per Toast, Positioning / Stacking\n   behaviour. z-index is var(--z-toast) (1000), above page content and\n   below Tutorial Modal (--z-tour), as the layers scale in tokens.css\n   lays out. */\n.c-toast-host{position:fixed; right:var(--spacing-24); bottom:var(--spacing-24); z-index:var(--z-toast); display:flex; flex-direction:column-reverse; gap:var(--spacing-8); width:380px; max-width:calc(100vw - var(--spacing-24) * 2); pointer-events:none;}\n.c-toast-host .c-toast{pointer-events:auto; position:relative;}\n@media (max-width:640px){\n  .c-toast-host{left:var(--spacing-12); right:var(--spacing-12); bottom:var(--spacing-12); width:auto; max-width:none;}\n}\n/* Stacked above Back to top — while a page's Back to top is showing, its\n   script sets html.c-back-to-top-shown and the stack rises to sit\n   spacing-12 above the 32px button, reading the same --c-back-to-top-y\n   the button itself uses (see Back to top). At the top of the page the\n   button is hidden and the stack keeps its own corner. The glide reuses\n   Toast's own duration-base / ease-standard pairing and is dropped under\n   reduced motion, per Toast's reduced-motion row. */\n.c-toast-host{transition:bottom var(--duration-base) var(--ease-standard);}\nhtml.c-back-to-top-shown .c-toast-host{bottom:calc(var(--c-back-to-top-y) + 32px + var(--spacing-12));}\n@media (prefers-reduced-motion:reduce){\n  .c-toast-host{transition:none;}\n}";

const oldToast = (icon: string, tone: string, title: string, message: string) =>
  `<div class="c-toast" role="status"><i class="ph-fill ${icon} tone ${tone}"></i><div class="body"><div class="title">${title}</div><div class="message">${message}</div></div><button class="c-icon-btn" type="button" aria-label="Dismiss"><i class="ph ph-x"></i></button></div>`;

// The gallery script's three default toasts (preview.html 21309–21314), oldest first as the stack shows them.
export const legacyToastHtml =
  `<div style="display:flex;flex-direction:column;gap:8px;width:380px">` +
  oldToast("ph-x-circle", "tone-danger", "Danger toast", "This is a danger-tone example message — dismiss it yourself.") +
  oldToast("ph-info", "tone-neutral", "Neutral toast", "This is a neutral-tone example message.") +
  oldToast("ph-check-circle", "tone-success", "Success toast", "This is a success-tone example message.") +
  `</div>`;

const noop = () => {};

/** The same three toasts, React, at the host's 380px width. */
export function ToastGallery() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 380 }}>
      <Toast tone="danger" title="Danger toast" message="This is a danger-tone example message — dismiss it yourself." onDismiss={noop} />
      <Toast tone="neutral" title="Neutral toast" message="This is a neutral-tone example message." onDismiss={noop} />
      <Toast tone="success" title="Success toast" message="This is a success-tone example message." onDismiss={noop} />
    </div>
  );
}

/** Layouts and the warning tone. */
export function ToastStates() {
  return (
    <>
      <Toast tone="warning" title="Warning toast" message="This is a warning-tone example message." onDismiss={noop} />
      <Toast tone="success" title="Title only" onDismiss={noop} />
      <Toast tone="neutral" message="Message only, at body1." onDismiss={noop} />
      <Toast tone="neutral" title="With an action" message="Under the message." action={{ label: "Undo", onClick: noop }} onDismiss={noop} />
      <Toast tone="neutral" title="No close" message="dismissible: false" />
    </>
  );
}

export function ToastPreview() {
  return (
    <>
      <style>{legacyToastCss}</style>
      <section className="pg-row" id="toast" aria-labelledby="toast-h">
        <h3 className="pg-row-title" id="toast-h">Toast (preview.html 4991–5006, script 21298–21375)</h3>
        <div className="pg-cols">
          <div className="pg-col" data-col="new">
            <p className="pg-col-label">React · @collabrium/ui</p>
            <div className="pg-specimen"><ToastGallery /><ToastStates /></div>
          </div>
          <div className="pg-col" data-col="old">
            <p className="pg-col-label">Old HTML + CSS</p>
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: legacyToastHtml }} />
          </div>
        </div>
      </section>
    </>
  );
}
