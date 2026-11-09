const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = name => fs.readFileSync(path.join(__dirname, name), 'utf8');
const urls = {Kindle:'B0HQ6XC98V', Paperback:'8797617652', Hardcover:'8797617679'};
for (const page of ['index.html', 'books.html', 'the-tingsted-cipher.html']) {
  const html = read(page);
  assert(html.includes('edition-links.js?v=' + JSON.parse(read('site-version.json')).version));
  const tags = [...html.matchAll(/<a [^>]*data-edition="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
  assert.deepEqual(new Set(tags.map(match => match[1])), new Set(Object.keys(urls)));
  const links = tags.map(([tag, edition, textContent]) => {
    const url = 'https://www.amazon.com/dp/' + urls[edition];
    const kindle = edition === 'Kindle';
    assert(tag.includes((kindle ? ' href="' : ' data-href="') + url + '"'));
    assert.equal(tag.includes(' href='), kindle);
    return {dataset:{edition, href:url}, href:kindle ? url : undefined, textContent,
      removeAttribute() {}, classList:{remove() {}}};
  });
  let refresh, delay, now;
  const context = {document:{querySelectorAll:()=>links, addEventListener(){}},
    window:{addEventListener(){}}, clearTimeout(){}, setTimeout(fn, ms){refresh=fn; delay=ms;},
    Date:{parse:Date.parse, now:()=>now}};
  for (const [instant, printed, launched] of [
    ['2026-11-13T22:59:59.999Z',false,false], ['2026-11-13T23:00:00Z',true,false],
    ['2026-11-19T22:59:59.999Z',true,false], ['2026-11-19T23:00:00Z',true,true]
  ]) {
    now = Date.parse(instant);
    if (refresh) refresh(); else vm.runInNewContext(read('edition-links.js'), context);
    if (instant.includes('59.999')) assert.equal(delay, 1);
    for (const link of links) {
      const edition = link.dataset.edition;
      const kindle = edition === 'Kindle';
      assert.equal(link.href, kindle || printed ? link.dataset.href : undefined);
      assert.equal(link.textContent, kindle ? (launched?'Buy Kindle':'Preorder Kindle') :
        (printed?'Buy '+edition:edition+' · Nov 14'));
    }
  }
}
console.log('Passed: all three pages, fallback URLs, versioned script and Copenhagen midnight transitions.');
