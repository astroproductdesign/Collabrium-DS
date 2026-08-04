// Collabrium DLS — UserPicker. Search and select a person (an Account
// Executive, in this app) from a list.
//
// Token choices, spelled out since none of these are literally named
// "UserPicker" anywhere in DESIGN-SYSTEM.md yet (see the Step 3 doc entry
// for the full spec once approved):
// - The collapsed row and the search input share Input field's exact box
//   anatomy (40px height, `radius-sm`, 1px Neutral-3 border, Neutral-1
//   fill, spacing-12 horizontal padding) so swapping between the two
//   states doesn't change the control's footprint.
// - Search-input focus is a 2px Obsidian border swap, matching Input
//   field's actual documented behavior (corrected 2026-08-03) — not the
//   Water shadow-focus ring, which the doc explicitly flags as never
//   implemented for form fields.
// - The dropdown panel reuses Filters'/Date picker's popover convention:
//   `radius-md` (16px), 1px Neutral-3 border, `shadow-3`, 8px below the
//   trigger.
// - Dropdown row hover is Neutral-2 fill, the same token Table row uses
//   for its own hover state.
// - The clear (×) icon is Tier 1/Regular (`ph-x`) — a remove affordance,
//   per the Iconography tier rule (same call as Tag's own remove button).
// - Avatar initials use `--font-primary` (Mulish), same as every other
//   piece of text in the component — no separate monospace treatment.
import { useEffect, useRef, useState } from "react";

export interface User {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface UserPickerProps {
  value?: User;
  users: User[];
  placeholder?: string;
  onChange: (user: User | null) => void;
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

export function UserPicker({ value, users, placeholder = "Search for a person…", onChange, className }: UserPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputId = "user-picker-search";

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
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

  const showCollapsed = Boolean(value) && !open;

  if (showCollapsed && value) {
    return (
      <div
        ref={rootRef}
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-12)",
          height: 40,
          padding: "0 var(--spacing-12)",
          border: "1px solid var(--color-neutral-3)",
          borderRadius: "var(--radius-sm)",
          background: "var(--color-neutral-1)",
          cursor: "pointer",
        }}
        role="button"
        tabIndex={0}
        onClick={() => {
          setQuery("");
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setQuery("");
            setOpen(true);
          }
        }}
      >
        <Avatar initials={value.initials} />
        <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-body2-size)",
              lineHeight: "var(--text-body2-lh)",
              fontWeight: "var(--text-label1-weight)",
              color: "var(--color-neutral-9)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value.name}
          </span>
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-caption-size)",
              lineHeight: "var(--text-caption-lh)",
              fontWeight: "var(--text-caption-weight)",
              color: "var(--color-neutral-5)",
            }}
          >
            {value.role}
          </span>
        </span>
        <button
          type="button"
          aria-label="Clear selection"
          onClick={(e) => {
            e.stopPropagation();
            onChange(null);
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
        >
          <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 16 }} />
        </button>
      </div>
    );
  }

  const trimmed = query.trim().toLowerCase();
  const matches = trimmed ? users.filter((u) => u.name.toLowerCase().includes(trimmed)) : users;

  return (
    <div ref={rootRef} className={className} style={{ position: "relative" }}>
      <label htmlFor={inputId} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {placeholder}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-8)",
          height: 40,
          padding: focused ? "0 11px" : "0 var(--spacing-12)",
          border: focused ? "2px solid var(--color-obsidian)" : "1px solid var(--color-neutral-3)",
          borderRadius: "var(--radius-sm)",
          background: "var(--color-neutral-1)",
        }}
      >
        <i className="ph ph-magnifying-glass" aria-hidden="true" style={{ fontSize: 16, color: "var(--color-neutral-5)", flex: "none" }} />
        <input
          id={inputId}
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-body2-size)",
            lineHeight: "var(--text-body2-lh)",
            fontWeight: "var(--text-body2-weight)",
            color: "var(--color-neutral-9)",
          }}
        />
      </div>

      {open && (
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
          {matches.length === 0 ? (
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
            matches.map((user) => (
              <div
                key={user.id}
                role="option"
                aria-selected={value?.id === user.id}
                onMouseEnter={() => setHoveredId(user.id)}
                onMouseLeave={() => setHoveredId((id) => (id === user.id ? null : id))}
                onClick={() => {
                  onChange(user);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-12)",
                  padding: "var(--spacing-8) var(--spacing-12)",
                  cursor: "pointer",
                  background: hoveredId === user.id ? "var(--color-neutral-2)" : "transparent",
                }}
              >
                <Avatar initials={user.initials} />
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
                    {user.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-caption-size)",
                      lineHeight: "var(--text-caption-lh)",
                      fontWeight: "var(--text-caption-weight)",
                      color: "var(--color-neutral-5)",
                    }}
                  >
                    {user.role}
                  </span>
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
