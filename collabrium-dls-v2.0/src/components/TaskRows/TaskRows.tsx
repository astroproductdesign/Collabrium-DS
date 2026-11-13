'use client';

import { forwardRef, useEffect, useId, useRef, useState, type CSSProperties, type HTMLAttributes } from 'react';
import { ArrowClockwise, CaretDown, Check, X } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Badge } from '../Badge';
import { Button } from '../Button';

/**
 * - `capsules`: each row is its own rounded surface, 8px apart. The default,
 *   for a run that floats in an AI response with nothing else boxing it.
 * - `list`: one shared surface divided by hairlines. For a run that sits inside
 *   something that already has a border (a card, a panel, a settled report).
 */
export type TaskRowsVariant = 'capsules' | 'list';

/**
 * Where one task is.
 * - `pending`: not started.
 * - `active`: in progress (the sweeping ring).
 * - `retrying`: an attempt the reader started is in flight. Looks like `active`, with a "Retrying" pill.
 * - `completed`: finished.
 * - `failed`: stopped with a reason.
 * - `stopped`: never finished because the reader stopped the run (the task in progress and every task not yet started).
 *   A neutral "Stopped" pill, no ring, no Retry: continuing is asked for in the conversation.
 */
export type TaskRowsStatus = 'pending' | 'active' | 'retrying' | 'completed' | 'failed' | 'stopped';

/** One detail step inside a task. */
export interface TaskRowsStep {
  /** What the step is, e.g. "Matched tax and contact IDs". */
  label: string;
  /** Its quiet outcome on the right, e.g. "12/12", "sent", "68%". Figures line up. */
  meta: string;
}

/** One task in the run. Tasks append: never reorder, replace or remove one. */
export interface TaskRowsTask {
  /** The task's name, e.g. "Verified vendor records". One line; it truncates. */
  label: string;
  /** Its size, e.g. "12 suppliers", "7 SKUs". Never truncates. */
  count: string;
  status: TaskRowsStatus;
  /** The detail steps, shown when the row is open. */
  steps: TaskRowsStep[];
  /**
   * Why it failed, shown under the steps on a `failed` task. Say what is
   * missing and stop. Anything the reader must supply (a file, a decision) is
   * asked for in the conversation, never on the row.
   */
  reason?: string;
  /**
   * `true` only for a transient failure (a timeout, a rate limit) whose one
   * retry is unspent: shows a Retry button. Leave it off for every other
   * failure; the button is absent, never disabled.
   */
  retryable?: boolean;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'>>;

export interface TaskRowsProps extends NativeDivProps {
  /** Capsules (default) or a single shared list surface. */
  variant?: TaskRowsVariant;
  /**
   * The tasks, in order. Two or more, each with an outcome of its own. Only
   * the first six are shown, with "+N more" after them. Exactly one task is
   * `active` at a time.
   */
  tasks: TaskRowsTask[];
  /**
   * Called with the task's index when Retry is pressed. Set that task's
   * status to `retrying` in response. Without it no Retry button shows.
   * Each task can be retried once: after a press the button is gone.
   */
  onRetry?: (index: number) => void;
}

// Rule 4: six rows, then a count.
const MAX_ROWS = 6;

const isRunning = (status: TaskRowsStatus) => status === 'pending' || status === 'active' || status === 'retrying';
const isLive = (status: TaskRowsStatus) => status === 'active' || status === 'retrying';

const SAY: Record<TaskRowsStatus, string> = {
  pending: 'Not started',
  active: 'In progress',
  retrying: 'Retrying',
  completed: 'Completed',
  failed: 'Failed',
  stopped: 'Stopped',
};

/** The row that is open when the component first renders: a failure, else the one in progress. */
function initialOpen(tasks: TaskRowsTask[]) {
  const failed = tasks.map(t => t.status).lastIndexOf('failed');
  if (failed >= 0) return failed;
  const live = tasks.findIndex(t => isLive(t.status));
  return live >= 0 ? live : null;
}

/**
 * Collabrium Task Rows. The named tasks an agent run is working through: a
 * short list where each row has its own status, count and droppable detail
 * steps, and where one task can fail while the others succeed. Thinking's
 * sibling one level up: Thinking traces one operation, Task Rows reports
 * several independent ones. Ported from components.css `.c-tasks*`; the
 * `stopped` status is defined here (approved 2026-10-26).
 *
 * The component owns what is local to it: one row open at a time, a failure
 * (or the task now in progress) opening itself and the reader's choice then
 * winning for good (Rules 5 and 6); six rows then a count (Rule 4); Retry only
 * on a retryable failure, once, never disabled (Rules 10 to 12); and one polite
 * announcement of failures, a retry the reader started and the end of the run
 * (Rule 17). The host owns the rest: AI runs only, two or more tasks, one
 * list per run (Rules 1 to 3 and 16), one task in progress (Rule 7), append
 * only (Rule 8), and asking for anything the reader must supply in the
 * conversation (Rule 9).
 */
export const TaskRows = forwardRef<HTMLDivElement, TaskRowsProps>(function TaskRows(
  { variant = 'capsules', tasks, onRetry, ...rest },
  ref,
) {
  const baseId = useId();
  const visible = tasks.slice(0, MAX_ROWS);
  const moreCount = tasks.length - visible.length;

  // The row the run has opened (null = none), and the reader's own choice, which wins from their first click (Rule 6).
  const [auto, setAuto] = useState<number | null>(() => initialOpen(tasks));
  const [manual, setManual] = useState<{ index: number | null } | null>(null);
  const [retried, setRetried] = useState<number[]>([]);
  const [announcement, setAnnouncement] = useState('');
  const previous = useRef(tasks.map(t => t.status));

  const open = manual ? manual.index : auto;

  // React to what changed in the run: open the new failure or the task now in progress, and announce.
  useEffect(() => {
    const before = previous.current;
    const now = tasks.map(t => t.status);
    previous.current = now;

    const changed = (i: number) => before[i] !== now[i];
    const newlyFailed = now.map((s, i) => (s === 'failed' && changed(i) ? i : -1)).filter(i => i >= 0);
    const newlyLive = now.findIndex((s, i) => isLive(s) && changed(i));

    if (newlyFailed.length) setAuto(newlyFailed[newlyFailed.length - 1]);
    else if (newlyLive >= 0) setAuto(newlyLive);
    else if (auto !== null && (now[auto] === 'completed' || now[auto] === 'stopped')) setAuto(null);

    // Rule 17: failures, a retry the reader started finishing, and the run's end. Nothing else.
    const parts: string[] = [];
    for (const i of newlyFailed) {
      const canRetry = tasks[i].retryable && onRetry && !retried.includes(i);
      parts.push(`${tasks[i].label} failed. ${canRetry ? 'Retry available.' : 'Details are in the conversation.'}`);
    }
    now.forEach((s, i) => {
      if (s === 'completed' && changed(i) && retried.includes(i)) parts.push(`${tasks[i].label} completed.`);
    });
    // A failure still waiting on its one retry is not the end of the run.
    const awaitingRetry = now.some((s, i) => s === 'failed' && tasks[i].retryable && onRetry && !retried.includes(i));
    const done = now.filter(s => s === 'completed').length;
    if (now.some((s, i) => s === 'stopped' && changed(i))) {
      // The reader stopped the run: say so once, instead of "finished".
      parts.push(`Run stopped. ${done} of ${now.length} tasks completed.`);
    } else if (before.some(isRunning) && !now.some(isRunning) && !awaitingRetry) {
      parts.push(done === now.length ? `All ${now.length} tasks completed.` : `Run finished. ${done} of ${now.length} tasks completed.`);
    }
    if (parts.length) setAnnouncement(parts.join(' '));
  }, [tasks, auto, retried, onRetry]);

  const toggle = (index: number) => setManual({ index: open === index ? null : index });

  const retry = (index: number) => {
    setRetried(list => [...list, index]);
    setAnnouncement(`Retrying ${tasks[index].label}.`);
    onRetry?.(index);
  };

  return (
    <div {...rest} ref={ref} className="cui-task-rows" data-variant={variant}>
      <div className="cui-task-rows__list" role="list">
        {visible.map((task, i) => {
          const isOpen = open === i;
          const detailId = `${baseId}-${i}`;
          const live = isLive(task.status);
          const failed = task.status === 'failed';
          const canRetry = failed && task.retryable && onRetry && !retried.includes(i);
          const spoken = [
            `${task.label}.`,
            `${SAY[task.status]}.`,
            `${task.count}.`,
            failed && task.reason ? task.reason : '',
            canRetry ? 'Retry available.' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={i} role="listitem">
              <div
                className="cui-task-rows__row"
                data-open={isOpen || undefined}
                style={{ '--cui-task-rows-row-index': i } as CSSProperties}
              >
                <button
                  type="button"
                  className="cui-task-rows__head"
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  onClick={() => toggle(i)}
                >
                  <span className="cui-task-rows__mark" data-active={live || undefined} aria-hidden="true">
                    {live && <span className="cui-task-rows__ring" />}
                    {/* Keyed by status so the disc is a fresh node on every change and its pop-in restarts. */}
                    <span
                      key={task.status}
                      className="cui-task-rows__disc"
                      data-state={task.status === 'completed' ? 'completed' : failed ? 'error' : 'upcoming'}
                    >
                      {task.status === 'completed' ? (
                        <Check aria-hidden="true" focusable="false" />
                      ) : failed ? (
                        <X aria-hidden="true" focusable="false" />
                      ) : (
                        i + 1
                      )}
                    </span>
                  </span>
                  <span className="cui-task-rows__label" aria-hidden="true">
                    {task.label}
                  </span>
                  {/* One pass reads the whole state; the visible copies above and below are hidden from it. */}
                  <span className="cui-task-rows__spoken">{spoken}</span>
                  <span className="cui-task-rows__count" aria-hidden="true">
                    {task.count}
                  </span>
                  {task.status === 'completed' && (
                    <Badge key="completed" variant="success" aria-hidden="true">
                      Completed
                    </Badge>
                  )}
                  {task.status === 'retrying' && (
                    <Badge key="retrying" variant="neutral" aria-hidden="true">
                      Retrying
                      <ArrowClockwise className="cui-task-rows__spin" aria-hidden="true" focusable="false" />
                    </Badge>
                  )}
                  {failed && (
                    <Badge key="failed" variant="error" aria-hidden="true">
                      Failed
                    </Badge>
                  )}
                  {task.status === 'stopped' && (
                    <Badge key="stopped" variant="neutral" aria-hidden="true">
                      Stopped
                    </Badge>
                  )}
                  <span className="cui-task-rows__chevron" aria-hidden="true">
                    <CaretDown />
                  </span>
                </button>

                {/* inert while closed: Retry lives in here and must not be reachable when hidden. */}
                <div className="cui-task-rows__detail" id={detailId} inert={!isOpen}>
                  <div className="cui-task-rows__detail-inner">
                    <div className="cui-task-rows__steps">
                      <span className="cui-task-rows__line" aria-hidden="true" />
                      <div className="cui-task-rows__step-list">
                        {task.steps.map((step, j) => (
                          <div
                            key={j}
                            className="cui-task-rows__step"
                            style={{ '--cui-task-rows-step-index': j } as CSSProperties}
                          >
                            <span className="cui-task-rows__step-label">{step.label}</span>
                            <span className="cui-task-rows__step-meta">{step.meta}</span>
                          </div>
                        ))}
                        {failed && task.reason && (
                          <div className="cui-task-rows__fail">
                            <p className="cui-task-rows__reason">{task.reason}</p>
                            {canRetry && (
                              <Button
                                variant="secondary"
                                size="sm"
                                leadingIcon={ArrowClockwise}
                                aria-label={`Retry: ${task.label}`}
                                onClick={() => retry(i)}
                              >
                                Retry
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {moreCount > 0 && <p className="cui-task-rows__more">+{moreCount} more</p>}

      <div className="cui-task-rows__live" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </div>
  );
});
