/* Copenhagen is on CET (UTC+01:00) on both November 2026 release dates.
   Fixed instants keep local previews independent of the visitor's time zone. */
(() => {
  const printRelease = Date.parse('2026-11-14T00:00:00+01:00');
  const kindleRelease = Date.parse('2026-11-20T00:00:00+01:00');
  let timer;

  function refresh() {
    clearTimeout(timer);
    const now = Date.now();
    for (const link of document.querySelectorAll('[data-edition]')) {
      const edition = link.dataset.edition;
      if (edition === 'Kindle') {
        link.textContent = now < kindleRelease ? 'Preorder Kindle' : 'Buy Kindle';
      } else if (now >= printRelease) {
        link.href = link.dataset.href;
        link.removeAttribute('aria-disabled');
        link.classList.remove('button-upcoming');
        link.textContent = 'Buy ' + edition;
      }
    }
    const next = [printRelease, kindleRelease].find(date => date > now);
    if (next) timer = setTimeout(refresh, Math.min(next - now, 2147483647));
  }
  refresh();
  window.addEventListener('pageshow', refresh);
  document.addEventListener('visibilitychange', refresh);
})();
