// Outline pictures for the cards of the bigger components: boxes and bars in
// neutral tints that show the shape of the component, not a scaled copy of it.
// Docs only. Styles are in playground/styles/docs.css (.docs-sk*).
import type { ReactNode } from 'react';

const Bar = ({ w = 'm' }: { w?: 's' | 'm' | 'l' | 'xl' }) => <span className="docs-sk-bar" data-w={w} />;
const Dot = () => <span className="docs-sk-dot" />;
const Btn = ({ solid }: { solid?: boolean }) => <span className="docs-sk-btn" data-solid={solid || undefined} />;
const Box = ({ children }: { children: ReactNode }) => <div className="docs-sk-box">{children}</div>;
const Row = ({ children, end }: { children: ReactNode; end?: boolean }) => (
  <div className="docs-sk-row" data-end={end || undefined}>
    {children}
  </div>
);

/** A card with a header, a detail box and a row of buttons. */
export const permissionOutline = () => (
  <div className="docs-sk docs-sk-card" aria-hidden="true">
    <Row>
      <Dot />
      <Bar w="l" />
    </Row>
    <Bar w="xl" />
    <Box>
      <Bar w="m" />
      <Bar w="s" />
    </Box>
    <Row end>
      <Btn />
      <Btn />
      <Btn solid />
    </Row>
  </div>
);

/** A question, three options, a written answer and two buttons. */
export const approvalOutline = () => (
  <div className="docs-sk docs-sk-card" aria-hidden="true">
    <Bar w="xl" />
    <Bar w="l" />
    {[0, 1, 2].map(i => (
      <Box key={i}>
        <Row>
          <Dot />
          <Bar w="l" />
        </Row>
      </Box>
    ))}
    <Box>
      <Bar w="s" />
    </Box>
    <Row end>
      <Btn />
      <Btn solid />
    </Row>
  </div>
);

/** One row: a status dot, a title, a status pill and a chevron. */
export const taskRowOutline = () => (
  <div className="docs-sk docs-sk-card" aria-hidden="true">
    <Row>
      <Dot />
      <Bar w="l" />
      <Btn />
    </Row>
  </div>
);

/** The window: a rail of conversations beside a thread with a composer. */
export const chatOutline = () => (
  <div className="docs-sk docs-sk-window" aria-hidden="true">
    <div className="docs-sk-rail">
      <Btn solid />
      <Bar w="l" />
      <Bar w="m" />
      <Bar w="l" />
      <Bar w="s" />
    </div>
    <div className="docs-sk-thread">
      <Row end>
        <Box>
          <Bar w="m" />
        </Box>
      </Row>
      <Bar w="xl" />
      <Bar w="l" />
      <Bar w="m" />
      <div className="docs-sk-composer">
        <Box>
          <Row>
            <Bar w="m" />
            <Dot />
          </Row>
        </Box>
      </div>
    </div>
  </div>
);
