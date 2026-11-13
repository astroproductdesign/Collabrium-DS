// Every variant of FadeIn. The docs site does not show this file. Not part of the package build.
import { useState } from 'react';
import { FadeIn } from './FadeIn';

export function FadeInPreview() {
  const [on, setOn] = useState(true);
  return (
    <div>
      <button type="button" onClick={() => setOn(s => !s)}>{on ? 'Hide' : 'Show'}</button>
      <FadeIn show={on}><p>Default</p></FadeIn>
      <FadeIn show={on} duration="fast"><p>Fast</p></FadeIn>
    </div>
  );
}
