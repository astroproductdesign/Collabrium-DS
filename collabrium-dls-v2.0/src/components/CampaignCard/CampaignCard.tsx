import { forwardRef, type HTMLAttributes } from 'react';
// Server component: icons come from Phosphor's server-safe entry (its main entry needs a client context).
import { Buildings, CalendarBlank } from '@phosphor-icons/react/dist/ssr';
import type { WithoutStyling } from '../../utils/types';
import { Card, type CardHeadingLevel } from '../Card';
import { profileInitials } from '../ProfileCard';
import { Tooltip } from '../Tooltip';

/** When the campaign runs: both ends, or leave `dates` out for an em dash. */
export interface CampaignDates {
  /** The first day. */
  start: Date;
  /** The last day. */
  end: Date;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title'>>;

export interface CampaignCardProps extends NativeDivProps {
  /** The campaign's name. Truncates to one line; clamp a very long name by character count before passing it. */
  name: string;
  /** The brand the campaign is for. Leave out when unknown and the line shows an em dash. */
  brand?: string;
  /** The brand's logo, a square image. Leave out and the placeholder mark (a buildings glyph on Water) shows. */
  logo?: string;
  /** Marks a lead: a campaign that hasn't entered the pipeline yet. The only tag a Campaign card carries. */
  lead?: boolean;
  /** The person in charge (PIC), as a short name ("Sarah K."). Leave out and the face shows "?". */
  owner?: string;
  /** The person overseeing the PIC, as a short name ("Lina M."). Adds a second, overlapping face. */
  overseer?: string;
  /** When it runs. Leave out and the date row shows an em dash in Neutral-4. */
  dates?: CampaignDates;
  /** The number of people (Pax). Leave out when unset: an em dash in Neutral-4, never 0. */
  pax?: number;
  /** The quote in ringgit, e.g. `72500` ("RM 72,500.00"). Leave out when unset: an em dash in Neutral-4, never 0. */
  quote?: number;
  /** The heading level of the name, 2 to 6. The look is always label2. Default 3. */
  headingLevel?: CardHeadingLevel;
  /** Makes the name a link to the campaign, stretched over the card: the card lifts on hover and takes the focus halo. */
  href?: string;
  /** Makes the name a button that opens the campaign, stretched over the card. Use `href` when it navigates. */
  onOpen?: () => void;
  /**
   * Whether the viewer can move the tile between columns: the cursor is `grab`, then `grabbing` on press. Set false when
   * they can only open it (the cursor is a pointer). The drag itself is the board's. Default true.
   */
  movable?: boolean;
  /** Set while the board is dragging this tile: it fades to 35% and stays in its place. */
  dragging?: boolean;
}

// Months as the DLS writes them ("3 Sept 2026"), so dates read the same in every browser.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

/** A date as the DLS writes it: "12 Mar 2026". */
export function formatCampaignDate(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** Ringgit as the DLS content rule writes it, always to 2 decimal places, as Price summary card: "RM 72,500.00". (Decided 2026-11-04, Q-CAMPAIGN-7.) */
export function formatRinggit(amount: number): string {
  return `RM ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const DASH = '—';

/**
 * An unset value: the em dash for the eye, "Not set" for screen readers, which skip a bare dash or read it as "em
 * dash". (Decided 2026-11-04, Q-CAMPAIGN-8.)
 */
const unset = (
  <>
    <span aria-hidden="true">{DASH}</span>
    <span className="cui-campaign-card__hidden">Not set</span>
  </>
);


/**
 * Collabrium Campaign card: one campaign as a tile on a kanban board, where the column is the stage. An identity row
 * (brand mark, name with an optional Lead tag, brand, owner faces with a tooltip), a full-width divider, the dates and
 * a two-column Pax and Quote grid. No stage tag. A variant of Card, ported from components.css `.c-card-campaign-*`
 * (431–488).
 */
export const CampaignCard = forwardRef<HTMLDivElement, CampaignCardProps>(function CampaignCard(
  { name, brand, logo, lead = false, owner, overseer, dates, pax, quote, headingLevel = 3, href, onOpen, movable = true, dragging = false, ...rest },
  ref,
) {
  const Heading = `h${headingLevel}` as 'h3';
  const ownership = `${owner ?? 'No PIC'} · ${overseer ? `overseen by ${overseer}` : 'no overseer'}`;
  const metrics = [
    { label: 'Pax', value: pax === undefined ? undefined : pax.toLocaleString('en-US') },
    { label: 'Quote', value: quote === undefined ? undefined : formatRinggit(quote) },
  ];

  return (
    <Card
      {...rest}
      ref={ref}
      data-card="campaign"
      data-movable={movable ? '' : undefined}
      data-dragging={dragging ? '' : undefined}
    >
      <div className="cui-campaign-card__id">
        {logo ? (
          <img className="cui-campaign-card__mark" src={logo} alt="" />
        ) : (
          <span className="cui-campaign-card__mark" data-placeholder="" aria-hidden="true">
            <Buildings weight="fill" focusable="false" />
          </span>
        )}
        <div className="cui-campaign-card__name">
          <div className="cui-campaign-card__title-row">
            <Heading className="cui-campaign-card__title">
              {href !== undefined ? (
                <a className="cui-card__action" href={href}>
                  {name}
                </a>
              ) : onOpen ? (
                <button type="button" className="cui-card__action" onClick={onOpen}>
                  {name}
                </button>
              ) : (
                name
              )}
            </Heading>
            {lead && <span className="cui-campaign-card__lead">Lead</span>}
          </div>
          <p className="cui-campaign-card__brand">{brand || DASH}</p>
        </div>
        {/* The pairing of two overlapping initials isn't self-explanatory, so it is reachable on focus as well as hover. */}
        <Tooltip content={ownership} role="label">
          <span className="cui-campaign-card__faces" role="img" tabIndex={0}>
            <span className="cui-campaign-card__face">{owner ? profileInitials(owner) : '?'}</span>
            {overseer && (
              <span className="cui-campaign-card__face" data-overseer="">
                {profileInitials(overseer)}
              </span>
            )}
          </span>
        </Tooltip>
      </div>
      <div className="cui-campaign-card__when" data-empty={dates ? undefined : ''}>
        <CalendarBlank aria-hidden="true" focusable="false" />
        {dates ? `${formatCampaignDate(dates.start)} – ${formatCampaignDate(dates.end)}` : unset}
      </div>
      <dl className="cui-campaign-card__metrics">
        {metrics.map(({ label, value }) => (
          <div key={label}>
            <dt className="cui-campaign-card__label">{label}</dt>
            <dd className="cui-campaign-card__value" data-empty={value === undefined ? '' : undefined}>
              {value ?? unset}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
});
