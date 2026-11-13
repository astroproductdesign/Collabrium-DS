// Every variant of PlayPauseMorph: each example from its docs file, in turn. The docs site does not show this file. Not part of the package build.
import { examples } from './PlayPauseMorph.docs';

export function PlayPauseMorphPreview() {
  return (
    <div>
      {examples.map(example => (
        <section key={example.id}>
          <h3>{example.title}</h3>
          {example.render()}
        </section>
      ))}
    </div>
  );
}
