TALETINKER / C.P. HELWEG — WEBSITE PREVIEW (V3.2, NOVEMBER 3, 2026)

Extract the entire ZIP first, then open index.html in your browser.
No build or installation is required. Keep the assets folder alongside the HTML files.

CHANGES
- The Tingsted Cipher is featured on the homepage and in books.html.
- Permanent novel page: https://www.taletinker.com/the-tingsted-cipher.html
- Kindle preorder button links to https://www.amazon.com/dp/B0HQ6XC98V
- Paperback and hardcover editions are planned for November 20, 2026.
- On the novel's dedicated page, the print edition buttons are intentionally disabled
  until you provide genuine Amazon product links. We do not guess print ASINs.
- eBook ISBN: 978-8797617663. This is not necessarily the ISBN of print editions.
- Existing short-read pages, Amazon links, contact form and CNAME are preserved.
- The contact form requires an internet connection and uses the existing Formspree account.

HOW TO ACTIVATE THE PRINT LINKS LATER
1) Open the-tingsted-cipher.html in a text editor.
2) Search for AMAZON_PAPERBACK_LINK or AMAZON_HARDCOVER_LINK.
3) Replace that edition's <button ... disabled>...</button> with a proper
   <a class="button" href="https://www.amazon.com/dp/REAL_ASIN" target="_blank"
      rel="noopener noreferrer">Order paperback</a>
   (or "Order hardcover") using the *real verified* product URL.
4) You may also add those links to index.html and books.html if desired.
5) When the editions are live, update the planned-status text.

DEPLOYMENT
Copy the ZIP contents into your current Homepage Git repository root, replacing
files after review. Then run git status, git add ., git commit, and git push.
Your .git directory stays untouched. This ZIP has not been published.
