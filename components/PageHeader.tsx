// Collabrium DLS — PageHeader. Title uses the h1 token ("Page-level heading"
// per DESIGN-SYSTEM.md's Typescale), sub uses body1/Neutral-5. No background,
// no border, no padding — sits flush in the surrounding page layout.
export interface PageHeaderProps {
  title: string;
  sub?: string;
  className?: string;
}

export function PageHeader({ title, sub, className }: PageHeaderProps) {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-primary)",
          fontWeight: "var(--text-h1-weight)",
          fontSize: "var(--text-h1-size)",
          lineHeight: "var(--text-h1-lh)",
          letterSpacing: "var(--text-h1-tracking)",
          color: "var(--color-neutral-9)",
        }}
      >
        {title}
      </h1>
      {sub && (
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--text-body1-weight)",
            fontSize: "var(--text-body1-size)",
            lineHeight: "var(--text-body1-lh)",
            color: "var(--color-neutral-5)",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
