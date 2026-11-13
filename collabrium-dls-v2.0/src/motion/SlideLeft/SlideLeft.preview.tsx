// Every variant of SlideLeft. The docs site does not show this file. Not part of the package build.
import { useState } from 'react';
import { SlideLeft } from './SlideLeft';

export function SlideLeftPreview() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'}</button>
      <SlideLeft show={show}><p>Default</p></SlideLeft>
      <SlideLeft show={show} duration="fast" ease="standard"><p>Fast</p></SlideLeft>
    </div>
  );
}
