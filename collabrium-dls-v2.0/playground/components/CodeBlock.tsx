// A code sample with a Copy button. Primary font, per the DLS font rule
// (Mulish for UI; no monospace face exists in the system).
import { CopyButton } from './CopyButton';

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="docs-code">
      <div className="docs-code-bar">
        <span className="docs-code-label">{label ?? ''}</span>
        <CopyButton text={code} />
      </div>
      <pre className="codearea docs-code-body" tabIndex={0}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
