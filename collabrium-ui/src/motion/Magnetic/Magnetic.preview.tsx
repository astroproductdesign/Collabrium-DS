// Every variant of Magnetic. The docs site does not show this file. Not part of the package build.
import { Magnetic } from './Magnetic';
import { Button } from '../../components/Button';

export function MagneticPreview() {
  return (
    <div>
      <Magnetic><Button variant="primary">Start a report</Button></Magnetic>
    </div>
  );
}
