/** Hand a URL (e.g. mailto:) to the browser. Isolated so tests can mock it. */
export function navigateTo(href: string): void {
  window.location.href = href;
}
