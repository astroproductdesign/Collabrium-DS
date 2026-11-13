// Tutorial Modal preview: the docs page's examples, for a check against the DLS gallery's static card
// (preview.html 3855–3866, components.css 1790–2031). Never part of the package build.
import { examples } from './TutorialModal.docs';

export function TutorialModalPreview() {
  return <>{examples.map((e) => <section key={e.id}>{e.render()}</section>)}</>;
}

export default TutorialModalPreview;
