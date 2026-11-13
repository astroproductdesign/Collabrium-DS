// Every variant of SlideDown. The docs site does not show this file. Not part of the package build.
import { useState } from 'react';
import { SlideDown } from './SlideDown';

export function SlideDownPreview() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'}</button>
      <SlideDown show={show}><p>Default</p></SlideDown>
      <SlideDown show={show} duration="fast" ease="standard"><p>Fast</p></SlideDown>
    </div>
  );
}
