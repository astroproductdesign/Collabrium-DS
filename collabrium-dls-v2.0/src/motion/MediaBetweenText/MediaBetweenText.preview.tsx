// Every variant of MediaBetweenText: each example from its docs file, in turn. The docs site does not show this file. Not part of the package build.
import { examples } from './MediaBetweenText.docs';

export function MediaBetweenTextPreview() {
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
