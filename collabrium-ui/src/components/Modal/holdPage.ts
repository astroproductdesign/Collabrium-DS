// The page hold every centred modal uses. Internal: not exported from the package.
/**
 * Holds the page still while a modal is open, the three ways the DS gives for Media Ad Modal (decided 2026-11-05,
 * Q-MODAL-4): `overflow: hidden` on <html> with the scrollbar's width padded back, wheel and touchmove blocked outside
 * `scrollArea` (the panel; default the layer) (iOS ignores overflow alone), and every other child of <body> made `inert`
 * except `keep` (a Toast host). Returns the undo.
 */
export function holdPage(layer: HTMLElement, scrollArea: HTMLElement = layer, keep: HTMLElement[] = []) {
  const html = document.documentElement;
  const gap = window.innerWidth - html.clientWidth;
  const before = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };
  html.style.overflow = 'hidden';
  if (gap > 0) html.style.paddingRight = `${gap}px`;
  const block = (event: Event) => {
    if (!(event.target instanceof Node) || !scrollArea.contains(event.target) || event.target === layer) event.preventDefault();
  };
  document.addEventListener('wheel', block, { passive: false });
  document.addEventListener('touchmove', block, { passive: false });
  const others = [...document.body.children].filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el !== layer && !el.inert && !keep.includes(el),
  );
  others.forEach(el => (el.inert = true));
  return () => {
    html.style.overflow = before.overflow;
    html.style.paddingRight = before.paddingRight;
    document.removeEventListener('wheel', block);
    document.removeEventListener('touchmove', block);
    others.forEach(el => (el.inert = false));
  };
}
