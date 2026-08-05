// Collabrium DLS — SearchInput. Consolidates two previously-separate,
// partially-overlapping components into one: the generic "Search input
// clear button" pattern (Default variant) and UserPicker (now the User
// Search variant), plus a new Item Search variant that shares the same
// dropdown mechanics without an avatar.
//
// Token choices, spelled out since this supersedes UserPicker.tsx and the
// "Search input clear button" doc section (see the Step 3 doc entry for
// the full spec once approved):
// - The box's border/radius/fill live on the <input> itself, with the
//   leading icon and trailing clear button absolutely positioned over it
//   — the same technique Input field's own icon-variant anatomy uses
//   (`.c-field .input-wrap.has-leading-icon.has-icon-btn`). This is the
//   actual mechanism that makes Active a genuine `:focus`, not a
//   JS-toggled class the way the old UserPicker's wrapper-owns-the-border
//   approach required.
// - Active is 2px Obsidian border, padding reduced 1px/side to
//   compensate — Input field's exact focus recipe, triggered by real
//   `:focus`, never `:focus-visible` (Input field's own documented
//   exception to the system-wide Water-focus-ring policy applies here
//   too).
// - Error is a literal 1px Red border per this component's own spec —
//   Input field's *documented* Error row also says 1px, even though
//   Input field's own shipped CSS currently renders 2px; that's a
//   pre-existing discrepancy in Input field itself, not something this
//   component should inherit.
// - Disabled is Neutral-4 text (not Input field's own Neutral-5) per this
//   component's own spec — matches Button Secondary/Ghost's disabled text
//   and Date picker's disabled day, both already Neutral-4 elsewhere in
//   this system.
// - The dropdown panel reuses Filters'/Date picker's popover convention:
//   `radius-md`, 1px Neutral-3 border, `shadow-3`, 8px below the trigger.
// - Dropdown row hover is Neutral-2 fill, the same token Table row uses.
// - The collapsed/selected row's clear-button hover is a color swap to
//   Neutral-9 — Input field's own `.icon-btn:hover` convention — not the
//   Neutral-2 fill-hover the old UserPicker invented for the same button.
// - Avatar (User Search only) is unchanged from UserPicker: 32×32 circle,
//   `radius-pill`, Neutral-2 fill, `--font-primary` initials — there is
//   still no standalone Avatar component in this system to reuse instead.
// - Loading is new: no spinner exists anywhere in this codebase yet
//   (Button's own "Loading" row is spec-text-only). Treated as the same
//   family as Iconography's explicit Tier 1/Regular `refresh` — an
//   ongoing-process icon, not a status/decorative one — using
//   `spinner-gap`, rotated via `linear infinite` at `--duration-ambient`
//   (900ms), the one duration token named for a continuous loop rather
//   than a one-shot "movement settles" transition.
// - Clear (×) is Tier 1/Regular (`ph-x`) throughout, sized via
//   `var(--icon-sm)` — not the old UserPicker's hardcoded 16px / unsized
//   icon.
// - A real <label> is always rendered (optionally visually hidden via
//   `hideLabel`), per Input field's own explicit "always render a label"
//   rule — the old UserPicker's demo relied on `aria-label` alone.
import { useEffect, useId, useRef, useState } from "react";

export type SearchInputVariant = "default" | "user-search" | "item-search";

export interface SearchInputItem {
  id: string;
  title: string;
  subtitle?: string;
  /** User Search only — initials shown in the avatar circle. */
  initials?: string;
}

export interface SearchInputProps {
  variant?: SearchInputVariant;
  label: string;
  hideLabel?: boolean;
  placeholder?: string;
  query: string;
  onQueryChange: (query: string) => void;
  /** User Search / Item Search only — the currently-selected item, if any. */
  value?: SearchInputItem | null;
  onSelect?: (item: SearchInputItem) => void;
  onClearSelection?: () => void;
  /** User Search / Item Search only — results to render in the dropdown. */
  items?: SearchInputItem[];
  loading?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span
      style={{
        flex: "none",
        width: 32,
        height: 32,
        borderRadius: "var(--radius-pill)",
        background: "var(--color-neutral-2)",
        color: "var(--color-neutral-9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-primary)",
        fontSize: "var(--text-caption-size)",
        fontWeight: 700,
      }}
    >
      {initials}
    </span>
  );
}

function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
      {children}
    </span>
  );
}

export function SearchInput({
  variant = "default",
  label,
  hideLabel = false,
  placeholder = "Search…",
  query,
  onQueryChange,
  value,
  onSelect,
  onClearSelection,
  items = [],
  loading = false,
  error,
  disabled = false,
  className,
}: SearchInputProps) {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const errorId = useId();
  const hasDropdown = variant !== "default";

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function clearQuery() {
    onQueryChange("");
    inputRef.current?.focus();
  }

  // User Search / Item Search — collapsed once a value is set, matching
  // the default state's exact 40px footprint so selecting doesn't reflow
  // the surrounding layout.
  if (hasDropdown && value && !open) {
    return (
      <div ref={rootRef} className={className}>
        {!hideLabel && <label htmlFor={inputId} style={{ fontSize: "var(--text-label1-size)", fontWeight: "var(--text-label1-weight)" }}>{label}</label>}
        {hideLabel && <VisuallyHidden>{label}</VisuallyHidden>}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-12)",
            height: 40,
            padding: "0 var(--spacing-12)",
            border: "1px solid var(--color-neutral-3)",
            borderRadius: "var(--radius-sm)",
            background: disabled ? "var(--color-neutral-2)" : "var(--color-neutral-1)",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          onClick={() => {
            if (disabled) return;
            onQueryChange("");
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onQueryChange("");
              setOpen(true);
            }
          }}
        >
          {variant === "user-search" && <Avatar initials={value.initials ?? ""} />}
          <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-body2-size)",
                lineHeight: "var(--text-body2-lh)",
                fontWeight: "var(--text-label1-weight)",
                color: disabled ? "var(--color-neutral-4)" : "var(--color-neutral-9)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {value.title}
            </span>
            {value.subtitle && (
              <span
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-caption-size)",
                  lineHeight: "var(--text-caption-lh)",
                  fontWeight: "var(--text-caption-weight)",
                  color: disabled ? "var(--color-neutral-4)" : "var(--color-neutral-5)",
                }}
              >
                {value.subtitle}
              </span>
            )}
          </span>
          {!disabled && (
            <button
              type="button"
              aria-label="Clear selection"
              onClick={(e) => {
                e.stopPropagation();
                onClearSelection?.();
              }}
              style={{
                flex: "none",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                background: "transparent",
                borderRadius: "var(--radius-sm)",
                color: "var(--color-neutral-5)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-neutral-9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-neutral-5)")}
            >
              <i className="ph ph-x" aria-hidden="true" style={{ fontSize: "var(--icon-sm)" }} />
            </button>
          )}
        </div>
      </div>
    );
  }

  const showClear = query.length > 0 && !disabled;

  return (
    <div ref={rootRef} className={className}>
      {!hideLabel && <label htmlFor={inputId} style={{ fontSize: "var(--text-label1-size)", fontWeight: "var(--text-label1-weight)" }}>{label}</label>}
      {hideLabel && <VisuallyHidden>{label}</VisuallyHidden>}

      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <i
          className="ph ph-magnifying-glass"
          aria-hidden="true"
          style={{ position: "absolute", left: "var(--spacing-12)", fontSize: "var(--icon-sm)", color: "var(--color-neutral-5)", pointerEvents: "none" }}
        />
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={query}
          placeholder={placeholder}
          disabled={disabled}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => hasDropdown && setOpen(true)}
          className="c-search-input-native"
          style={{
            width: "100%",
            minWidth: 0,
            height: 40,
            borderRadius: "var(--radius-sm)",
            border: `1px solid ${error ? "var(--color-red)" : "var(--color-neutral-3)"}`,
            background: disabled ? "var(--color-neutral-2)" : "var(--color-neutral-1)",
            padding: "0 36px",
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-body2-size)",
            lineHeight: "var(--text-body2-lh)",
            fontWeight: "var(--text-body2-weight)",
            color: disabled ? "var(--color-neutral-4)" : "var(--color-neutral-9)",
            outline: "none",
            cursor: disabled ? "not-allowed" : "text",
          }}
        />
        {showClear && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clearQuery}
            style={{
              position: "absolute",
              right: "var(--spacing-12)",
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              background: "transparent",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-neutral-5)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-neutral-9)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-neutral-5)")}
          >
            <i className="ph ph-x" aria-hidden="true" style={{ fontSize: "var(--icon-sm)" }} />
          </button>
        )}
      </div>

      {error && (
        <span id={errorId} style={{ fontFamily: "var(--font-primary)", fontSize: "var(--text-caption-size)", fontWeight: 700, color: "var(--color-red)" }}>
          {error}
        </span>
      )}

      {hasDropdown && open && !disabled && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + var(--spacing-8))",
            left: 0,
            right: 0,
            zIndex: 10,
            maxHeight: 280,
            overflowY: "auto",
            background: "var(--color-neutral-1)",
            border: "1px solid var(--color-neutral-3)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-3)",
          }}
        >
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "var(--spacing-16)" }}>
              <i
                className="ph ph-spinner-gap"
                aria-hidden="true"
                style={{ fontSize: "var(--icon-md)", color: "var(--color-neutral-5)", animation: "c-search-input-spin var(--duration-ambient) linear infinite" }}
              />
              <VisuallyHidden>Loading results</VisuallyHidden>
            </div>
          ) : items.length === 0 ? (
            <div
              style={{
                padding: "var(--spacing-16)",
                textAlign: "center",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-body2-size)",
                lineHeight: "var(--text-body2-lh)",
                color: "var(--color-neutral-5)",
              }}
            >
              No matches found
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                role="option"
                aria-selected={value?.id === item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId((id) => (id === item.id ? null : id))}
                onClick={() => {
                  onSelect?.(item);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-12)",
                  padding: "var(--spacing-8) var(--spacing-12)",
                  cursor: "pointer",
                  background: hoveredId === item.id ? "var(--color-neutral-2)" : "transparent",
                }}
              >
                {variant === "user-search" && <Avatar initials={item.initials ?? ""} />}
                <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-body2-size)",
                      lineHeight: "var(--text-body2-lh)",
                      fontWeight: "var(--text-body2-weight)",
                      color: "var(--color-neutral-9)",
                    }}
                  >
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span
                      style={{
                        fontFamily: "var(--font-primary)",
                        fontSize: "var(--text-caption-size)",
                        lineHeight: "var(--text-caption-lh)",
                        fontWeight: "var(--text-caption-weight)",
                        color: "var(--color-neutral-5)",
                      }}
                    >
                      {item.subtitle}
                    </span>
                  )}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
