/** "3.4s", then "1m 5.2s" from a minute up. Built from whole tenths so it never shows "60.0s". */
export function formatElapsed(totalSeconds: number) {
  const tenths = Math.max(0, Math.round(totalSeconds * 10));
  if (tenths < 600) return `${(tenths / 10).toFixed(1)}s`;
  return `${Math.floor(tenths / 600)}m ${((tenths % 600) / 10).toFixed(1)}s`;
}

/** The settled duration in words, for a past-tense label: "4 seconds", "1 second", "1 minute 5 seconds". */
export function formatDuration(totalSeconds: number) {
  const seconds = Math.max(1, Math.round(totalSeconds));
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const part = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'}`;
  if (m === 0) return part(s, 'second');
  return s === 0 ? part(m, 'minute') : `${part(m, 'minute')} ${part(s, 'second')}`;
}
