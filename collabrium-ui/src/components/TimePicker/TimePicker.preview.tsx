// Time picker preview: every example. There is no old HTML + CSS to compare with: the DLS has no Time picker
// (designed from scratch). Never part of the package build.
import { examples } from './TimePicker.docs';

export function TimePickerPreview() {
  return <>{examples.map((e) => <section key={e.id}>{e.render()}</section>)}</>;
}

export default TimePickerPreview;
