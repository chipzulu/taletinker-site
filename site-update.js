/* Taletinker static-site cache refresh (v3.10).
 * Checks only on page visit (and when a page is restored from back/forward cache).
 * Requires a matching <meta name="site-version"> in the HTML and site-version.json.
 */
(function () {
  'use strict';

  // The local file:// preview should work without a web server.
  if (window.location.protocol !== 'https:' && window.location.protocol !== 'http:') {
    return;
  }

  const versionElement = document.querySelector('meta[name="site-version"]');
  if (!versionElement) return;
  const currentVersion = versionElement.content.trim();

  // Monotonic dotted numeric versions: 3.3, 3.10, 3.11, 4.0, etc.
  // An older manifest must never roll a visitor back to an earlier page.
  function compareVersions(a, b) {
    const pattern = /^\d+(?:\.\d+)*$/;
    if (typeof a !== 'string' || typeof b !== 'string' ||
        !pattern.test(a) || !pattern.test(b)) return 0;
    const left = a.split('.').map(Number);
    const right = b.split('.').map(Number);
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      const difference = (left[i] || 0) - (right[i] || 0);
      if (difference !== 0) return Math.sign(difference);
    }
    return 0;
  }

  let checking = false;

  async function checkForUpdate() {
    if (checking) return;
    checking = true;
    try {
      // Timestamp makes this a fresh URL; no-store avoids the browser HTTP cache.
      const manifestUrl = new URL('/site-version.json', window.location.origin);
      manifestUrl.searchParams.set('t', String(Date.now()));
      const manifestResponse = await fetch(manifestUrl, { cache: 'no-store' });
      if (!manifestResponse.ok) return;
      const manifest = await manifestResponse.json();
      const nextVersion = manifest.version;
      if (compareVersions(nextVersion, currentVersion) <= 0) return;

      // One automatic reload per tab/page/release; prevents reload loops.
      const reloadKey = 'taletinker:updated:' +
          window.location.pathname + ':' + nextVersion;
      if (sessionStorage.getItem(reloadKey) === '1') return;

      // Preflight the EXACT destination URL, so we do not navigate while the
      // GitHub Pages CDN still serves old HTML after a deployment.
      const freshUrl = new URL(window.location.href);
      freshUrl.searchParams.set('v', nextVersion);
      freshUrl.searchParams.set('_refresh', String(Date.now()));
      const freshResponse = await fetch(freshUrl, { cache: 'no-store' });
      if (!freshResponse.ok) return;
      const freshHtml = await freshResponse.text();
      const freshDocument = new DOMParser().parseFromString(freshHtml, 'text/html');
      const servedVersion = freshDocument.querySelector(
          'meta[name="site-version"]')?.content?.trim();
      if (compareVersions(servedVersion, nextVersion) < 0 || !servedVersion) return;

      sessionStorage.setItem(reloadKey, '1');
      // Keep anchors and navigation history intact, but use a new URL/cache key.
      window.location.replace(freshUrl.href);
    } catch (error) {
      // Offline / blocked request / unavailable sessionStorage: keep the site usable.
      console.debug('Taletinker update check skipped:', error);
    } finally {
      checking = false;
    }
  }

  // pageshow also runs after restoring a tab from the back/forward cache.
  window.addEventListener('pageshow', checkForUpdate);
})();
