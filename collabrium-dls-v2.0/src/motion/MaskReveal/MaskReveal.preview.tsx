// Every variant of MaskReveal. The docs site does not show this file. Not part of the package build.
import { MaskReveal } from './MaskReveal';

export function MaskRevealPreview() {
  return (
    <div>
      <MaskReveal shape="circle"><img src="/illustrations/stills-web/gen-z.jpg" alt="Gen Z character" /></MaskReveal>
      <MaskReveal shape="wipe" from="left"><img src="/illustrations/stills-web/gen-z.jpg" alt="Gen Z character" /></MaskReveal>
      <MaskReveal shape="wipe" from="right"><img src="/illustrations/stills-web/gen-z.jpg" alt="Gen Z character" /></MaskReveal>
      <MaskReveal shape="wipe" from="below"><img src="/illustrations/stills-web/gen-z.jpg" alt="Gen Z character" /></MaskReveal>
      <MaskReveal shape="capsule"><img src="/illustrations/stills-web/gen-z.jpg" alt="Gen Z character" /></MaskReveal>
    </div>
  );
}
