#!/usr/bin/env node
/*
  Packin Club: add the WhatsApp button (whatsapp-widget.js) to the website's pages.

  USE (in the project root, the folder with index.html):
      node add-whatsapp.js              -> adds the button to every page that should have it
      node add-whatsapp.js --remove     -> takes it off every page again

  Shown on: home, about, industries, products, product pages, category pages, blog, every blog article, contact, author.
  NOT shown on: privacy, terms, cookies and the 404 page (people read those, they do not shop there).
  Safe to run many times. Run it again after you re-generate product or category pages with the generate-*.js scripts.
  To skip a page, add its file name to SKIP below.
*/
const fs = require('fs'), path = require('path');
const ROOT = process.cwd();
const SKIP = ['privacy.html', 'terms.html', 'cookies.html', '404.html'];
const REMOVE = process.argv.includes('--remove');
const TAG_RE = /\n?[ \t]*<script src="[^"]*whatsapp-widget\.js" defer><\/script>/g;

function pages() {
  const out = [];
  const add = (dir, rel) => fs.readdirSync(dir).forEach(f => { if (/\.html$/.test(f) && !SKIP.includes(f)) out.push(rel + f); });
  add(ROOT, '');
  ['products', 'author'].forEach(d => { const p = path.join(ROOT, d); if (fs.existsSync(p)) add(p, d + '/'); });
  return out;
}

let changed = 0, skipped = 0;
pages().forEach(rel => {
  const file = path.join(ROOT, rel);
  let s = fs.readFileSync(file, 'utf8');
  if (!/<\/body>/i.test(s)) { skipped++; return; }               // not a full page
  const before = s;
  if (REMOVE) {
    s = s.replace(TAG_RE, '');
  } else if (!/whatsapp-widget\.js/.test(s)) {
    const nav = /<script src="([^"]*)nav-dropdown\.js" defer><\/script>/.exec(s);
    const prefix = nav ? nav[1] : (rel.indexOf('/') === -1 ? '' : (rel.startsWith('author/') ? '/' : '../'));
    const tag = '<script src="' + prefix + 'whatsapp-widget.js" defer></script>';
    if (nav) s = s.replace(nav[0], nav[0] + '\n' + tag);
    else s = s.replace(/<\/body>/i, tag + '\n</body>');
  }
  if (s !== before) { fs.writeFileSync(file, s, 'utf8'); changed++; }
});
console.log((REMOVE ? 'Removed from ' : 'Added to ') + changed + ' page(s).' + (skipped ? ' (' + skipped + ' skipped: not full pages)' : ''));
console.log(REMOVE ? '' : 'Pages that should NOT have it (privacy, terms, cookies, 404) were left alone.');
