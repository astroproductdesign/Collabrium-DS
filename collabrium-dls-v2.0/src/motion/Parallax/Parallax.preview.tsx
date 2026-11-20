// Every variant of Parallax. The docs site does not show this file. Not part of the package build.
import { Parallax, ParallaxLayer } from './Parallax';

export function ParallaxPreview() {
  return (
    <div>
      {(['both', 'scroll', 'pointer'] as const).map(trigger => (
        <Parallax key={trigger} trigger={trigger}>
          <ParallaxLayer depth="back"><span className="docs-parallax-shape" data-shape="1" /></ParallaxLayer>
          <div className="docs-parallax-hero">
            <ParallaxLayer depth="front"><p className="docs-parallax-hero__text">trigger: {trigger}</p></ParallaxLayer>
            <ParallaxLayer depth="mid"><img className="docs-parallax-hero__art" src="/illustrations/stills-web/foodies.jpg" alt="Foodies character" /></ParallaxLayer>
          </div>
        </Parallax>
      ))}
    </div>
  );
}
