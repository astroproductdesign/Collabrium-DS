// Every variant of TextSweep: each example from its docs file, in turn. The docs site does not show this file. Not part of the package build.
import { examples } from './TextSweep.docs';

export function TextSweepPreview() {
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
