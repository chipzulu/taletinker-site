TALETINKER / C.P. HELWEG — LOCAL PREVIEW & DEPLOYMENT (V3.3)

Extract the entire ZIP, then double-click index.html.
All page images and CSS work locally. The automatic update checker is deliberately
inactive for file:// previews; it starts working after publishing on GitHub Pages.

WHAT CHANGED IN V3.3
- Home page distinguishes the featured novel (The Tingsted Cipher) from the
  two published short reads (To Ride a Tempest and Hikers' Refuge).
- Added site-version.json with version 3.3.
- Added shared site-update.js, used by the five real content pages.
- HTML includes <meta name="site-version" content="3.3">.
- CSS and asset-image URLs use ?v=3.3 to avoid retaining old browser assets.
- Kindle preorder URL stays https://www.amazon.com/dp/B0HQ6XC98V.
- Paperback and hardcover buttons remain disabled pending actual retailer links.
- Existing book pages, CNAME, sitemap, contact form, and links remain intact.

HOW AUTOMATIC UPDATING WORKS
1. On a new visit (or browser back/forward restore), site-update.js asks for
   /site-version.json?t=TIMESTAMP using fetch with cache: no-store.
2. If the published version is newer than the HTML's version, it fetches the
   same HTML page under a fresh ?v=VERSION&_refresh=TIMESTAMP URL.
3. It only reloads if the fetched HTML actually contains the new version meta.
   This prevents reloading too early while GitHub Pages is still propagating.
4. sessionStorage prevents the same tab from auto-reloading repeatedly for
   the same page and version. Navigation and existing hash fragments survive.
5. A failed request does nothing; the normal page stays visible.

IMPORTANT LIMITATIONS
- Visitors whose cached pages do not YET contain this checker must load the
  newly published HTML normally once before automatic updating can work.
- GitHub Pages' caching / CDN propagation still determines when new HTML is
  available; this script does not override HTTP response headers.
- The checker runs on page visits; it does not interrupt someone actively
  reading a page or composing a contact message.

NEXT WEBSITE RELEASE (e.g., 3.4)
- Increase the version in site-version.json (e.g., "3.4").
- Change <meta name="site-version" content="3.3"> to 3.4 in every real HTML page.
- Change ?v=3.3 to ?v=3.4 in CSS, image and site-update.js references.
- If you change site-update.js, also update its ?v= reference accordingly.
- Keep the canonical URLs and book-page filenames unchanged for search engines.
- Test locally, commit and push when ready.

PUBLISHING
Copy/merge these files into your local Git Homepage directory, leaving .git
untouched, then:
  git status
  git add .
  git commit -m "Add cache refresh and short read headings"
  git push

Your existing short-read Amazon links and all novel links are preserved.
The contact form uses the existing Formspree endpoint and needs internet access.
