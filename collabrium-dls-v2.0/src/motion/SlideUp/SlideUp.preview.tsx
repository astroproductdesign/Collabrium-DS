// Every variant of SlideUp. The docs site does not show this file. Not part of the package build.
import { useState } from 'react';
import { SlideUp } from './SlideUp';

export function SlideUpPreview() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'}</button>
      <SlideUp show={show}><p>Default</p></SlideUp>
      <SlideUp show={show} duration="fast" ease="standard"><p>Fast</p></SlideUp>
    </div>
  );
}
