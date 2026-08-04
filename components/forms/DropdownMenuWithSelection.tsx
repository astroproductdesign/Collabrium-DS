// Collabrium DLS — MultiSelect. A trigger button that opens a grouped
// checkbox list for selecting multiple options.
//
// Supersedes an earlier single-select draft of this same file (a plain
// DropdownMenuWithSelectionProps trigger with no dropdown body) — this
// version replaces it per explicit user direction, keeping the file path
// but renaming everything to match the MultiSelectOption/MultiSelectProps
// interface given for the fuller spec.
//
// Token choices, spelled out since none of these are literally named
// "MultiSelect" anywhere in DESIGN-SYSTEM.md yet (see the Step 3 doc
// entry for the full spec once approved):
// - Trigger default matches Button Secondary exactly: Neutral-1 fill,
//   1px Neutral-3 border, `shadow-1`, `radius-md`, md size (40px height,
//   spacing-16 padding, 16px type — Button's own documented
//   component-specific override, not a label-token size).
// - Trigger Has-Selection border swaps to 1px Obsidian, the same "holds
//   a value" recipe Filters' own Filter trigger — active state uses.
// - Has selection shows one Badge-Neutral chip per selected option's
//   label (capped at 2, then a "+N" overflow chip) instead of the
//   placeholder — and stays shown while open too, so the user can see
//   what's active while browsing the checklist, not just while
//   collapsed. Built on Badge's real box model (22px tall, spacing-8
//   padding, `radius-pill`, caption/700, `white-space: nowrap`, 1px
//   border) rather than an ad-hoc chip. Each visible chip has its own
//   14px × to remove just that option (`ph-x`, Tier 1/Regular, same
//   remove-affordance call as Tag's/UserPicker's/FileUploader's own
//   remove buttons) — the overflow "+N" chip has no × since it doesn't
//   represent one single, removable option.
// - Trigger Open is 2px Obsidian with padding reduced 1px/side to
//   compensate — the same swap-and-compensate pattern Input field's
//   focus state uses. Chevron rotation is a pure CSS `transform`.
// - Dropdown panel reuses Filters'/Date picker's popover convention:
//   `radius-md`, 1px Neutral-3 border, `shadow-3`, Neutral-1 fill.
// - Group labels reuse SidebarNav's own Section label recipe exactly:
//   caption, weight 700, `tracking-eyebrow`, uppercase, Neutral-5,
//   `--font-primary` — same as every other piece of text in the
//   component.
// - Checkbox rows reuse this system's own Checkbox component spec
//   exactly: 18×18px box, 6px radius (Checkbox's own one-off, not
//   `radius-sm`), 1px Neutral-3 border unchecked, Obsidian border+fill
//   checked, `icon-micro` (14px) check glyph in Neutral-1 — "the
//   accent/text token" this task's rule asks for is Obsidian, the only
//   token this system uses for a filled/checked interactive state.
// - Row hover is Neutral-2 fill, the same token Table row/UserPicker's
//   dropdown rows already use for hover.
// - Footer reuses Button's own Ghost ("Clear") and Primary ("Done")
//   variants at sm size, with Modal footer's divider convention (1px
//   Neutral-3 top border, spacing-16 padding-top).
// - Clicking outside or Escape closes the menu, same pattern as
//   UserPicker's own dropdown. Done closes without touching selection;
//   footer Clear empties the selection but leaves the menu open so more
//   options can be picked; the trigger's × stops propagation so it never
//   also reopens/toggles the menu.
import { useEffect, useMemo, useRef, useState } from "react";

export interface MultiSelectOption {
  id: string;
  label: string;
  group?: string;
}

export interface MultiSelectProps {
  placeholder?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  onClear?: () => void;
  className?: string;
}

function groupOptions(options: MultiSelectOption[]): Array<[string | undefined, MultiSelectOption[]]> {
  const order: Array<string | undefined> = [];
  const buckets = new Map<string | undefined, MultiSelectOption[]>();
  for (const option of options) {
    if (!buckets.has(option.group)) {
      buckets.set(option.group, []);
      order.push(option.group);
    }
    buckets.get(option.group)!.push(option);
  }
  return order.map((key) => [key, buckets.get(key)!]);
}

export function MultiSelect({
  placeholder = "Select…",
  options,
  value,
  onChange,
  onClear,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const grouped = useMemo(() => groupOptions(options), [options]);
  const count = value.length;
  const selectedOptions = useMemo(() => options.filter((o) => value.includes(o.id)), [options, value]);

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

  function toggleOption(id: string) {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  }

  function handleClear() {
    if (onClear) onClear();
    else onChange([]);
  }

  const borderWidth = open ? 2 : 1;
  const borderColor = open || count > 0 ? "var(--color-obsidian)" : "var(--color-neutral-3)";
  const horizontalPadding = open ? "15px" : "var(--spacing-16)";

  // Has selection shows one item badge per selected option (capped, with
  // a "+N" overflow badge) instead of the placeholder — and stays shown
  // while open too, so the user can see what's active while browsing the
  // checklist below, not just while collapsed. Each visible chip has its
  // own × to remove just that option; the overflow "+N" chip has no ×
  // since it doesn't represent one single, removable item.
  const MAX_VISIBLE_ITEM_BADGES = 2;
  const showItemBadges = count > 0;
  const visibleSelected = selectedOptions.slice(0, MAX_VISIBLE_ITEM_BADGES);
  const overflowCount = Math.max(0, selectedOptions.length - MAX_VISIBLE_ITEM_BADGES);

  return (
    <div ref={rootRef} className={className} style={{ position: "relative", display: "inline-block" }}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--spacing-8)",
          height: 40,
          padding: `0 ${horizontalPadding}`,
          border: `${borderWidth}px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          background: "var(--color-neutral-1)",
          boxShadow: "var(--shadow-1)",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {!showItemBadges && (
          <span
            style={{
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-primary)",
              fontSize: 16,
              fontWeight: 700,
              color: "var(--color-neutral-9)",
            }}
          >
            {placeholder}
          </span>
        )}

        {showItemBadges &&
          visibleSelected.map((option) => (
            <span
              key={option.id}
              style={{
                flex: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                height: 22,
                padding: "0 4px 0 var(--spacing-8)",
                borderRadius: "var(--radius-pill)",
                background: "var(--color-neutral-2)",
                color: "var(--color-neutral-5)",
                border: "1px solid var(--color-neutral-3)",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-caption-size)",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {option.label}
              <button
                type="button"
                aria-label={`Remove ${option.label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(option.id);
                }}
                style={{
                  flex: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 14,
                  height: 14,
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  color: "var(--color-neutral-5)",
                  cursor: "pointer",
                }}
              >
                <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 10 }} />
              </button>
            </span>
          ))}

        {showItemBadges && overflowCount > 0 && (
          <span
            style={{
              flex: "none",
              height: 22,
              padding: "0 var(--spacing-8)",
              borderRadius: "var(--radius-pill)",
              background: "var(--color-neutral-2)",
              color: "var(--color-neutral-5)",
              border: "1px solid var(--color-neutral-3)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-caption-size)",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            +{overflowCount}
          </span>
        )}

        {count > 0 && (
          <button
            type="button"
            aria-label="Clear selection"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            style={{
              flex: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              border: "none",
              background: "transparent",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-neutral-5)",
              cursor: "pointer",
            }}
          >
            <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 14 }} />
          </button>
        )}

        <i
          className="ph ph-caret-down"
          aria-hidden="true"
          style={{
            flex: "none",
            fontSize: 16,
            color: "var(--color-neutral-5)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform var(--duration-fast) var(--ease-standard)",
          }}
        />
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + var(--spacing-8))",
            left: 0,
            minWidth: 240,
            zIndex: 10,
            background: "var(--color-neutral-1)",
            border: "1px solid var(--color-neutral-3)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-3)",
            overflow: "hidden",
          }}
        >
          <div style={{ maxHeight: 320, overflowY: "auto", padding: "var(--spacing-8) 0" }}>
            {grouped.map(([group, groupOptions], groupIndex) => (
              <div key={group ?? "_ungrouped"}>
                {groupIndex > 0 && (
                  <div style={{ height: 1, background: "var(--color-neutral-3)", margin: "var(--spacing-8) 0" }} />
                )}
                {group && (
                  <div
                    style={{
                      padding: "var(--spacing-4) var(--spacing-12)",
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-caption-size)",
                      fontWeight: 700,
                      letterSpacing: "var(--tracking-eyebrow)",
                      textTransform: "uppercase",
                      color: "var(--color-neutral-5)",
                    }}
                  >
                    {group}
                  </div>
                )}
                {groupOptions.map((option) => {
                  const checked = value.includes(option.id);
                  return (
                    <label
                      key={option.id}
                      onMouseEnter={() => setHoveredId(option.id)}
                      onMouseLeave={() => setHoveredId((id) => (id === option.id ? null : id))}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--spacing-8)",
                        padding: "var(--spacing-8) var(--spacing-12)",
                        cursor: "pointer",
                        background: hoveredId === option.id ? "var(--color-neutral-2)" : "transparent",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOption(option.id)}
                        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}
                      />
                      <span
                        aria-hidden="true"
                        style={{
                          flex: "none",
                          width: 18,
                          height: 18,
                          borderRadius: 6,
                          border: checked ? "none" : "1px solid var(--color-neutral-3)",
                          background: checked ? "var(--color-obsidian)" : "var(--color-neutral-1)",
                          color: "var(--color-neutral-1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {checked && <i className="ph-fill ph-check" style={{ fontSize: 12 }} />}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-primary)",
                          fontSize: "var(--text-body1-size)",
                          fontWeight: "var(--text-body1-weight)",
                          color: "var(--color-neutral-9)",
                        }}
                      >
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "var(--spacing-8)",
              padding: "var(--spacing-12)",
              borderTop: "1px solid var(--color-neutral-3)",
            }}
          >
            <button
              type="button"
              onClick={handleClear}
              style={{
                height: 32,
                padding: "0 var(--spacing-12)",
                border: "none",
                background: "transparent",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-label2-size)",
                fontWeight: "var(--text-label2-weight)",
                color: "var(--color-neutral-9)",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                height: 32,
                padding: "0 var(--spacing-12)",
                border: "none",
                background: "var(--color-obsidian)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-label2-size)",
                fontWeight: "var(--text-label2-weight)",
                color: "var(--color-neutral-1)",
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
