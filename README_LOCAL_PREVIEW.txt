TALETINKER / C.P. HELWEG — LOCAL PREVIEW & DEPLOYMENT (V3.9)

Extract the ZIP. To preview YouTube playback, open a terminal in the extracted folder,
run py -m http.server 8000 --bind 127.0.0.1 and visit http://127.0.0.1:8000/.
The homepage promotion links directly to the book page. The new portrait trailer is embedded on that page and starts when clicked. YouTube playback needs internet access. The Watch on YouTube link is also available.
All page images and CSS work locally. The automatic update checker is deliberately
inactive for file:// previews; it starts working after publishing on GitHub Pages.

EDITION LINKS
Print buttons activate at midnight in Copenhagen on November 14, 2026.
The Kindle preorder link becomes Buy Kindle on November 20 at midnight.
With JavaScript disabled, Kindle on Amazon stays usable and print dates remain visible.
Amazon controls listing availability. Run node check-editions.cjs to check the boundaries.

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

NEXT WEBSITE RELEASE (e.g., 3.10)
- Increase the version in site-version.json (e.g., "3.10").
- Change <meta name="site-version" content="3.9"> to 3.10 in every real HTML page.
- Change ?v=3.9 to ?v=3.10 in CSS, image and site-update.js references.
- If you change site-update.js, also update its ?v= reference accordingly.
- Keep the canonical URLs and book-page filenames unchanged for search engines.
- Test locally, commit and push when ready.

PUBLISHING
Copy/merge these files into your local Git Homepage directory, leaving .git
untouched, then:
  git status
  git add .
  git commit -m "Publish C.P. Helweg identity-only site V3.9"
  git push

Your existing short-read Amazon links and all novel links are preserved.
The contact form uses the existing Formspree endpoint and needs internet access.

