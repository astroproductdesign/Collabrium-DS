import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import type { WithoutStyling } from '../../utils/types';
import { PageHeroArt, type PageHeroIllustration } from './illustrations';

export type PageHeroHeadingLevel = 1 | 2 | 3;
export type PageHeroStatusTone = 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'purple';

export interface PageHeroStatus {
  /** What state the page's subject is in ("In progress", "Over capacity"). */
  label: string;
  /** The dot's colour. Default `neutral`. */
  tone?: PageHeroStatusTone;
}

export interface PageHeroProgress {
  /** 0 to 100. Values outside are clamped. */
  value: number;
  /** The line above the bar, left ("Project progress · 12 of 20 tasks done"). */
  label: ReactNode;
  /** What a screen reader hears for the value ("12 of 20 tasks done"). Default: "{value}%". */
  valueText?: string;
}

type NativeSectionProps = WithoutStyling<Omit<HTMLAttributes<HTMLElement>, 'children' | 'title'>>;

export interface PageHeroProps extends NativeSectionProps {
  /** The page's title. One Page hero per view, at the top. */
  title: ReactNode;
  /** One ink-doodle motif in the tile on the left. Leave it out for no tile. */
  illustration?: PageHeroIllustration;
  /** A pill above the title naming the subject's state, with a coloured dot. */
  status?: PageHeroStatus;
  /** Short text beside the status pill: a date or a timing ("Due 12 Dec · 3 weeks left"). */
  meta?: ReactNode;
  /** One or two lines under the title: who owns it, what it is. body1, Neutral-5, at most 60 characters a line. */
  description?: ReactNode;
  /** Page actions, top right: Secondary `sm` Buttons. They move under the text when there is no room. */
  actions?: ReactNode;
  /** A thin bar across the bottom, with its label and the percentage as a figure. */
  progress?: PageHeroProgress;
  /** The title's heading level. Default 1. The look is always h1. */
  headingLevel?: PageHeroHeadingLevel;
}

const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n)));

/**
 * Collabrium Page hero: the tinted title block at the top of a main page, for a page about one subject (a project,
 * a person, a team). An illustration tile, a status pill and meta line, the h1, a description, actions on the right
 * and an optional progress bar. Ported from Workdesk's project hero (`.wd-hero`, workdesk.html), not from the DLS.
 */
export const PageHero = forwardRef<HTMLElement, PageHeroProps>(function PageHero(
  { title, illustration, status, meta, description, actions, progress, headingLevel = 1, ...rest },
  ref,
) {
  const titleId = useId();
  const Heading = `h${headingLevel}` as const;
  const pct = progress ? clamp(progress.value) : 0;
  return (
    <section {...rest} ref={ref} className="cui-page-hero" aria-labelledby={rest['aria-label'] ? undefined : titleId}>
      <div className="cui-page-hero__top">
        <div className="cui-page-hero__id">
          {illustration && (
            <span className="cui-page-hero__tile">
              <PageHeroArt motif={illustration} />
            </span>
          )}
          <div className="cui-page-hero__text">
            {(status || meta) && (
              <div className="cui-page-hero__status">
                {status && (
                  <span className="cui-page-hero__pill" data-tone={status.tone ?? 'neutral'}>
                    <span className="cui-page-hero__dot" aria-hidden="true" />
                    {status.label}
                  </span>
                )}
                {meta && <span className="cui-page-hero__meta">{meta}</span>}
              </div>
            )}
            <Heading id={titleId} className="cui-page-hero__title">
              {title}
            </Heading>
            {description && <p className="cui-page-hero__desc">{description}</p>}
          </div>
        </div>
        {actions && <div className="cui-page-hero__actions">{actions}</div>}
      </div>
      {progress && (
        <div className="cui-page-hero__progress">
          <div className="cui-page-hero__progress-head">
            <span>{progress.label}</span>
            <span className="cui-page-hero__pct" aria-hidden="true">
              {pct}
              <small>%</small>
            </span>
          </div>
          <div
            className="cui-page-hero__track"
            role="progressbar"
            aria-labelledby={titleId}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-valuetext={progress.valueText ?? `${pct}%`}
          >
            <span className="cui-page-hero__fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </section>
  );
});
