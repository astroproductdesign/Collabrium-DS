// Collabrium DLS — Stepper. Progress through a multi-step flow.
//
// Token choices, spelled out since none of these are literally named
// "Stepper" anywhere in DESIGN-SYSTEM.md yet (see the Step 3 doc entry
// for the full spec once approved):
// - Indicator states mirror Checkbox/Radio's own on/off treatment:
//   Completed = Obsidian fill (like a checked Checkbox), Active = Obsidian
//   outline only (like a checked Radio's ring), Upcoming = Neutral-3
//   hairline border (like an unchecked control).
// - Completed shows the step number, same as Active/Upcoming — the
//   Obsidian fill vs. outline vs. hairline-border distinction is what
//   carries the state, not an icon swap.
// - Label reuses body2's size/line-height at two weights: `--text-label1-weight`
//   (700) for Active, `--text-body2-weight` (400) for Completed/Upcoming —
//   the same bold-vs-muted pattern SidebarNav uses for its own active/
//   inactive nav items.
// - Description reuses the caption token (12px), Neutral-5 — smaller than
//   the label per the spec, consistent with Card/SidebarNav's own use of
//   caption for secondary text.
// - The connector is rendered as a 1px fill in `--color-neutral-3` (the
//   same token named for hairline borders elsewhere in the system) rather
//   than a literal `border`, since a filled line is simpler to lay out
//   between flex items than joining two adjacent borders.
// - Horizontal connectors are direct siblings of each step's rail (not
//   nested inside a per-step wrapper) so every connector shares the same
//   `flex: 1` pool independent of neighboring label widths — nesting them
//   per-step made each connector's length depend on how wide that step's
//   own label happened to be, which read as uneven dividers.
// - Vertical connectors are a fixed `--spacing-16` length, held off the
//   circle above by the rail's own `gap` (`--spacing-8`) and off the
//   circle below by the list container's matching `gap` (also
//   `--spacing-8`) — equal on both sides so the divider never touches
//   either neighboring step, independent of how many lines a given
//   description wraps to.
import { Fragment } from "react";
import type { CSSProperties } from "react";

export interface Step {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

type StepState = "completed" | "active" | "upcoming";

function getState(index: number, currentStep: number): StepState {
  if (index < currentStep) return "completed";
  if (index === currentStep) return "active";
  return "upcoming";
}

function Indicator({ index, state }: { index: number; state: StepState }) {
  const base: CSSProperties = {
    flex: "none",
    width: 24,
    height: 24,
    borderRadius: "var(--radius-pill)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-primary)",
    fontSize: "var(--text-caption-size)",
    fontWeight: "var(--text-label1-weight)",
  };

  if (state === "completed") {
    return (
      <span
        style={{
          ...base,
          background: "var(--color-obsidian)",
          color: "var(--color-neutral-1)",
        }}
      >
        {index + 1}
      </span>
    );
  }

  if (state === "active") {
    return (
      <span
        style={{
          ...base,
          background: "var(--color-neutral-1)",
          border: "2px solid var(--color-obsidian)",
          color: "var(--color-obsidian)",
        }}
      >
        {index + 1}
      </span>
    );
  }

  return (
    <span
      style={{
        ...base,
        background: "var(--color-neutral-1)",
        border: "1px solid var(--color-neutral-3)",
        color: "var(--color-neutral-5)",
      }}
    >
      {index + 1}
    </span>
  );
}

function StepText({ step, state }: { step: Step; state: StepState }) {
  return (
    <span style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-body2-size)",
          lineHeight: "var(--text-body2-lh)",
          fontWeight: state === "active" ? "var(--text-label1-weight)" : "var(--text-body2-weight)",
          color: state === "active" ? "var(--color-neutral-9)" : "var(--color-neutral-5)",
        }}
      >
        {step.label}
      </span>
      {step.description && (
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-caption-size)",
            lineHeight: "var(--text-caption-lh)",
            fontWeight: "var(--text-caption-weight)",
            color: "var(--color-neutral-5)",
          }}
        >
          {step.description}
        </span>
      )}
    </span>
  );
}

function HorizontalConnector() {
  return (
    <span
      style={{ flex: 1, height: 1, background: "var(--color-neutral-3)", marginTop: 12 }}
      aria-hidden="true"
    />
  );
}

function VerticalConnector() {
  return (
    <span
      style={{ width: 1, height: "var(--spacing-16)", background: "var(--color-neutral-3)" }}
      aria-hidden="true"
    />
  );
}

export function Stepper({ steps, currentStep, orientation = "horizontal", className }: StepperProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={className}
        style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}
        role="list"
      >
        {steps.map((step, i) => {
          const state = getState(i, currentStep);
          const isLast = i === steps.length - 1;
          return (
            <div key={step.label} style={{ display: "flex", gap: "var(--spacing-12)" }} role="listitem">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--spacing-8)" }}>
                <Indicator index={i} state={state} />
                {!isLast && <VerticalConnector />}
              </div>
              <StepText step={step} state={state} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={className} style={{ display: "flex", alignItems: "flex-start" }} role="list">
      {steps.map((step, i) => {
        const state = getState(i, currentStep);
        const isLast = i === steps.length - 1;
        return (
          <Fragment key={step.label}>
            <div
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--spacing-8)", flex: "none" }}
              role="listitem"
            >
              <Indicator index={i} state={state} />
              <div style={{ textAlign: "center" }}>
                <StepText step={step} state={state} />
              </div>
            </div>
            {!isLast && <HorizontalConnector />}
          </Fragment>
        );
      })}
    </div>
  );
}
