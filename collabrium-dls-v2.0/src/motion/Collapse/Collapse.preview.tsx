// Every variant of Collapse. The docs site does not show this file. Not part of the package build.
import { useState } from 'react';
import { Collapse } from './Collapse';

export function CollapsePreview() {
  const [on, setOn] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setOn(s => !s)}>{on ? 'Hide' : 'Show'}</button>
      <Collapse open={on}><p>Default</p></Collapse>
      <Collapse open={on} duration="fast"><p>Fast</p></Collapse>
    </div>
  );
}
