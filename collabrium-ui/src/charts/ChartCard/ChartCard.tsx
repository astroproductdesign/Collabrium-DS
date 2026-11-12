import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Card } from '../../components/Card';
import type { WithoutStyling } from '../../utils/types';

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'title'>>;

export interface ChartCardProps extends NativeDivProps {
  /** The chart's title on the card ("Renewals by month"). */
  title: string;
  /** The title's heading level. Default 3; its look is always h5. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** One chart (BarChart, LineChart…). It fills the card below the title. */
  children: ReactNode;
}

/**
 * The card a chart sits in: the library's Card, unmodified, with an h5-look title 12px above the chart. In a
 * ChartGrid, cards in a row share their height and each chart grows to fill its card.
 */
export const ChartCard = forwardRef<HTMLDivElement, ChartCardProps>(function ChartCard({ title, headingLevel = 3, children, ...rest }, ref) {
  const Heading = `h${headingLevel}` as 'h3';
  return (
    <Card ref={ref} {...rest}>
      <div className="cui-chart-card">
        <Heading className="cui-chart-card__title">{title}</Heading>
        {children}
      </div>
    </Card>
  );
});

export interface ChartGridProps extends WithoutStyling<HTMLAttributes<HTMLDivElement>> {
  /** ChartCards. */
  children?: ReactNode;
}

/** A grid of chart cards: 3 columns, 2 at 1100px and under, 1 at 640px and under, 16px apart; each row as tall as its tallest card. */
export const ChartGrid = forwardRef<HTMLDivElement, ChartGridProps>(function ChartGrid({ children, ...rest }, ref) {
  return (
    <div {...rest} ref={ref} className="cui-chart-grid">
      {children}
    </div>
  );
});
