// Every variant of SlideRight. The docs site does not show this file. Not part of the package build.
import { useState } from 'react';
import { SlideRight } from './SlideRight';

export function SlideRightPreview() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'}</button>
      <SlideRight show={show}><p>Default</p></SlideRight>
      <SlideRight show={show} duration="fast" ease="standard"><p>Fast</p></SlideRight>
    </div>
  );
}
