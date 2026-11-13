import { forwardRef, type OlHTMLAttributes, type ReactNode } from 'react';
// Server component: icons come from Phosphor's server-safe entry (its main entry needs a client context).
import { Check, Warning, X } from '@phosphor-icons/react/dist/ssr';
import type { WithoutStyling } from '../../utils/types';

/** A flag layered on a step's derived state: `error` on the current step only, `warning` on a completed step only. */
export type StepperFlag = 'error' | 'warning';
export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperStep {
  /** The step's name: one or two words ("Profile"). */
  label: ReactNode;
  /**
   * A caption under the label. All or nothing: give every step one, or none. On a flagged step it is the flag's
   * message ("Photo upload failed"), in place of the step's usual description.
   */
  description?: ReactNode;
  /** `error` on the current step, or `warning` on a completed one. Anywhere else it is ignored. */
  flag?: StepperFlag;
}

type NativeOlProps = WithoutStyling<Omit<OlHTMLAttributes<HTMLOListElement>, 'children'>>;

export interface StepperProps extends NativeOlProps {
  /** The steps, in order. */
  steps: StepperStep[];
  /**
   * The current step, counted from 0. Every step before it is Completed, it is Active, every step after it is
   * Upcoming. `steps.length` marks every step Completed.
   */
  currentStep: number;
  /** Horizontal (default) for a flow across the top of a page; vertical for a side panel or a narrow column. */
  orientation?: StepperOrientation;
  /** Names the list for screen readers ("Account setup"). */
  'aria-label'?: string;
}

type StepState = 'completed' | 'active' | 'upcoming' | 'error' | 'warning';

const spoken: Record<StepState, string> = {
  completed: 'completed',
  active: 'current step',
  upcoming: 'upcoming',
  error: 'current step, error',
  warning: 'completed, warning',
};

/**
 * Collabrium Stepper. Progress through a multi-step flow (onboarding, a multi-page form, a checkout) as an ordered
 * list of steps, each one's state derived from a single `currentStep`: Completed, Active or Upcoming, with Error and
 * Warning as flags on top. Read-only: nothing in it can be clicked (decided 2026-11-05, Q-STEPPER-7). Ported from components.css `.c-stepper` / `.c-step*` (4297–4408).
 */
export const Stepper = forwardRef<HTMLOListElement, StepperProps>(function Stepper(
  { steps, currentStep, orientation = 'horizontal', ...rest },
  ref,
) {
  const vertical = orientation === 'vertical';
  return (
    <ol {...rest} ref={ref} className="cui-stepper" data-orientation={orientation}>
      {steps.map((step, index) => {
        const base = index < currentStep ? 'completed' : index === currentStep ? 'active' : 'upcoming';
        // A flag only counts where it can be true (DS state model): Error on the Active step, Warning on a Completed one.
        const state: StepState =
          step.flag === 'error' && base === 'active' ? 'error' : step.flag === 'warning' && base === 'completed' ? 'warning' : base;
        const last = index === steps.length - 1;
        const indicator = (
          <span className="cui-stepper__indicator" data-state={state} aria-hidden="true">
            {state === 'completed' ? (
              <Check focusable="false" />
            ) : state === 'error' ? (
              <X focusable="false" />
            ) : state === 'warning' ? (
              <Warning weight="fill" focusable="false" />
            ) : (
              index + 1
            )}
          </span>
        );
        const connector = !last && <span className="cui-stepper__connector" aria-hidden="true" />;
        return (
          <li
            key={index}
            className="cui-stepper__item"
            aria-current={base === 'active' ? 'step' : undefined}
          >
            <div className="cui-stepper__step">
              {vertical ? (
                <div className="cui-stepper__rail">
                  {indicator}
                  {connector}
                </div>
              ) : (
                indicator
              )}
              <div className="cui-stepper__text">
                <span className="cui-stepper__label" data-state={state}>
                  <span className="cui-stepper__spoken">{`Step ${index + 1} of ${steps.length}: `}</span>
                  {step.label}
                  <span className="cui-stepper__spoken">{`, ${spoken[state]}${step.description ? '. ' : ''}`}</span>
                </span>
                {step.description && (
                  <span className="cui-stepper__desc" data-state={state === 'error' || state === 'warning' ? state : undefined}>
                    {step.description}
                  </span>
                )}
              </div>
            </div>
            {!vertical && connector}
          </li>
        );
      })}
    </ol>
  );
});
