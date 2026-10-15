#!/usr/bin/env node
/*
  Packin Club blog post checker and helper.

  Usage (run from the project root):
    node check-blog-post.js my-new-post.html          -> checks the post and prints what is missing
    node check-blog-post.js my-new-post.html --fix    -> also adds inline product links and the "Related products" block

  What it checks:  author (Packin Club), quick answer (50-60 words), inline product links,
                   related products block, and that the post is listed in blog-data.js, sitemap.xml and llms.txt.
  What --fix does: links the first mention of each product name in the article text, links product names in the
                   closing paragraph, and adds a "Related products" block. It never edits headings, FAQs or the lead paragraph.
  It cannot write the quick answer for you: that must be written by a person (50-60 words, directly answering the post's question).
*/
const fs = require('fs'), vm = require('vm'), path = require('path');
const file = process.argv[2], FIX = process.argv.includes('--fix');
if (!file) { console.log('Usage: node check-blog-post.js <post.html> [--fix]'); process.exit(1); }
if (!fs.existsSync(file)) { console.log('File not found: ' + file); process.exit(1); }

// ---- products (names and blurbs for the related block)
const sb = { window: {}, console }; vm.createContext(sb);
vm.runInContext(fs.readFileSync('product-data.js', 'utf8'), sb);
const PRODUCTS = {}; sb.window.PACKIN.products.forEach(p => { PRODUCTS[p.slug] = p; });

// ---- phrases that count as a product mention. strict = needs the word "compostable" in front.
const B = '(?<![\\w-])', E = '(?![\\w-])';
const rx = (src, f = 'i') => new RegExp(B + src + E, f);
const RULES = [
  { key: 'courier', slug: 'compostable-courier-bags-mailers', re: rx('(?<!poly )(?<!plastic )(?<!conventional )(?:compostable )?(?:courier bags?|mailer bags?|mailers?)') },
  { key: 'carry',   slug: 'compostable-carry-bags', re: rx('compostable (?:plastic )?carry bags?') },
  { key: 'garment', slug: 'compostable-garment-bags', re: rx('(?<!plastic )garment bags?') },
  { key: 'grocery', slug: 'compostable-grocery-bags', re: rx('compostable grocery bags?') },
  { key: 'mulch',   slug: 'compostable-agri-mulch-film', re: rx('(?<!plastic )(?<!conventional )(?:compostable )?mulch film') },
  { key: 'nursery', slug: 'compostable-nursery-bags', re: rx('(?:compostable )?nursery bags?') },
  { key: 'cups',    slug: 'compostable-aqueous-coated-paper-cups', re: rx('(?:aqueous[- ]coated (?:paper )?cups?|compostable (?:paper )?cups)') },
  { key: 'cling',   slug: 'compostable-cling-film', re: rx('compostable cling (?:film|wrap)') },
  { key: 'pouch',   slug: 'compostable-pouches', re: rx('compostable pouches') },
  { key: 'hot',     slug: 'compostable-hot-liquid-pouches', re: rx('(?:compostable )?hot[- ]liquid pouches') },
  { key: 'bread',   slug: 'compostable-bread-pouch', re: rx('(?:compostable )?bread (?:pouch(?:es)?|bags?)') },
  { key: 'tissue',  slug: 'compostable-bamboo-tissue', re: rx('(?:compostable )?bamboo tissue') },
  { key: 'dcut',    slug: 'compostable-d-cut-shopping-bags', re: rx('(?:compostable )?d-cut (?:shopping )?bags?') },
  { key: 'loop',    slug: 'compostable-loop-handle-bags', re: rx('(?:compostable )?loop[- ]handle bags?') },
  { key: 'pet',     slug: 'compostable-pet-poop-bags', re: rx('(?:compostable )?pet (?:waste|poop) bags?') },
  { key: 'garbage', slug: 'compostable-garbage-bags', re: rx('compostable (?:garbage bags?|bin liners?)') },
  { key: 'medical', slug: 'compostable-medical-waste-bags', re: rx('(?:compostable )?medical waste bags?') },
  { key: 'shrink',  slug: 'compostable-shrink-film', re: rx('compostable shrink film') },
  { key: 'stretch', slug: 'compostable-stretch-film', re: rx('compostable stretch film') }
];
const FOOD = rx('food packaging');                 // closing paragraph only -> HORECA category
const STYLE = 'color:#3f7a26; text-decoration:underline; text-underline-offset:3px; text-decoration-thickness:1px; font-weight:500;';
const aTag = (href, txt) => '<a href="' + href + '" style="' + STYLE + '">' + txt + '</a>';

let s = fs.readFileSync(file, 'utf8');
const a0 = s.indexOf('<article class="pc-article"'), a1 = s.indexOf('</article>', a0);
if (a0 < 0 || a1 < 0) { console.log('This does not look like a blog post (no <article class="pc-article"> found).'); process.exit(1); }
const slug = path.basename(file, '.html');
const results = []; const ok = (t, pass, extra) => results.push([pass, t, extra || '']);

// ---- helpers over the article HTML
function tokens(article) {
  const f = article.indexOf('id="faqs"');
  const body = f === -1 ? article : article.slice(0, f), tail = f === -1 ? '' : article.slice(f);
  return { toks: body.split(/(<[^>]+>)/), tail };
}
function walk(toks, onText) {            // calls onText(i, text, ctx) only for linkable text
  const st = { a: 0, h: 0, sum: 0, ok: 0, skip: 0, box: 0 };
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (t.startsWith('<')) {
      const m = t.toLowerCase().match(/^<\s*(\/?)\s*([a-z0-9]+)/); if (!m) continue;
      const closing = m[1] === '/', name = m[2];
      if (name === 'a') st.a += closing ? -1 : 1;
      else if (/^h[1-6]$/.test(name)) st.h += closing ? -1 : 1;
      else if (name === 'summary') st.sum += closing ? -1 : 1;
      else if (name === 'p' || name === 'li') { if (closing) { st.ok = Math.max(0, st.ok - 1); st.skip = 0; } else { st.ok++; if (t.includes('pc-dropcap')) st.skip = 1; } }
      else if (name === 'div' && !closing && (t.includes('pc-pullquote') || t.includes('pc-quick-answer') || t.includes('pc-related-products'))) st.box = 1;
      else if (name === 'div' && closing) st.box = 0;
      continue;
    }
    if (!t.trim() || !st.ok || st.a || st.h || st.sum || st.skip || st.box) continue;
    onText(i, t);
  }
}
const plain = h => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

// ---- 1. author
ok('No "Packin Club Editorial" or personal author left', !/Packin Club Editorial/.test(s));
ok('<meta name="author" content="Packin Club"> in <head>', /<meta name="author" content="Packin Club">/.test(s));
let schemaOk = false;
(s.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || []).forEach(b => {
  try { const d = JSON.parse(b.replace(/<\/?script[^>]*>/g, '')); if (d['@type'] === 'Article' && d.author && d.author['@type'] === 'Organization' && d.author.name === 'Packin Club') schemaOk = true; } catch (e) {}
});
ok('Article schema author is the organisation "Packin Club"', schemaOk, 'Set "author" to {"@type":"Organization","name":"Packin Club","url":"https://packinclub.com/"}');
// ---- 2. quick answer
const qa = s.match(/class="pc-quick-answer"[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/);
const qaWords = qa ? plain(qa[1]).split(' ').length : 0;
ok('Quick answer box right under the title', !!qa, 'Copy the <div class="pc-quick-answer"> block from another post and write 50-60 words.');
if (qa) ok('Quick answer is 50-60 words (now ' + qaWords + ')', qaWords >= 50 && qaWords <= 60);

// ---- 3. product links
function productLinks(article) { return (article.match(/<a href="products\/[^"]+\.html"/g) || []).length; }
let article = s.slice(a0, a1);
const mentioned = () => {
  const { toks } = tokens(article.split('class="pc-related-products"')[0]); const found = {};
  walk(toks, (i, t) => { RULES.forEach(r => { if (r.re.test(t)) found[r.key] = (found[r.key] || 0) + 1; }); });
  return found;
};
const linkedBefore = productLinks(article.split('class="pc-related-products"')[0]);

if (FIX) {
  // body: first eligible mention per product (skips anything already linked to that product)
  const already = new Set((article.match(/href="products\/([^".]+)\.html"/g) || []).map(x => x.match(/products\/([^".]+)/)[1]));
  const parts = article.split('class="pc-related-products"'); let main = parts[0];
  const { toks, tail } = tokens(main);
  // find the closing paragraph (last <p>) for the call-to-action pass
  let lastP = null, po = null; toks.forEach((t, i) => { if (/^<p[\s>]/i.test(t)) po = i; if (t === '</p>' && po !== null) { lastP = [po, i]; po = null; } });
  const doneBody = new Set(already), doneCta = new Set(); let added = 0;
  walk(toks, (i, t) => {
    const inCta = lastP && i > lastP[0] && i < lastP[1];
    const cands = [];
    if (inCta) {
      RULES.forEach(r => { if (!doneCta.has(r.key)) { const m = r.re.exec(t); if (m) cands.push([m.index, m.index + m[0].length, '/products/' .slice(1) + r.slug + '.html', r.key + ':cta']); } });
      if (!doneCta.has('food')) { const m = FOOD.exec(t); if (m) cands.push([m.index, m.index + m[0].length, 'products.html?cat=horeca', 'food:cta']); }
    } else {
      RULES.forEach(r => { if (!doneBody.has(r.slug)) { const m = r.re.exec(t); if (m) cands.push([m.index, m.index + m[0].length, 'products/' + r.slug + '.html', r.slug]); } });
    }
    if (!cands.length) return;
    cands.sort((x, y) => x[0] - y[0]); let end = -1, out = '', pos = 0;
    cands.forEach(c => { if (c[0] < end) return; out += t.slice(pos, c[0]) + aTag(c[2], t.slice(c[0], c[1])); pos = c[1]; end = c[1];
      if (inCta) doneCta.add(c[3].split(':')[0]); else doneBody.add(c[3]); added++; });
    toks[i] = out + t.slice(pos);
  });
  main = toks.join('') + tail; article = main + (parts.length > 1 ? 'class="pc-related-products"' + parts.slice(1).join('class="pc-related-products"') : '');
  console.log('Added ' + added + ' inline product link(s).');
}
const linkedAfter = productLinks(article.split('class="pc-related-products"')[0]);
const unlinked = Object.keys(mentioned()).filter(k => { const r = RULES.find(x => x.key === k); return !new RegExp('href="products/' + r.slug + '\\.html"').test(article.split('class="pc-related-products"')[0]); });
ok('At least one inline product link in the article text (now ' + linkedAfter + ')', linkedAfter >= 1, 'Run again with --fix, or link product names by hand (see NEW-BLOG-POST-CHECKLIST.md).');
ok('Every product named in the text is linked at least once', unlinked.length === 0, 'Not linked yet: ' + unlinked.join(', '));

// ---- 4. related products block
let hasRelated = article.includes('class="pc-related-products"');
if (FIX && !hasRelated) {
  const counts = mentioned(); const linked = (article.match(/products\/([^".]+)\.html/g) || []).map(x => x.replace(/products\/|\.html/g, ''));
  let picks = []; RULES.forEach(r => { if (counts[r.key] || linked.includes(r.slug)) picks.push([counts[r.key] || 0, r.slug]); });
  picks.sort((x, y) => y[0] - x[0]); picks = picks.map(x => x[1]);
  ['compostable-courier-bags-mailers', 'compostable-carry-bags', 'compostable-garment-bags'].forEach(d => { if (picks.length < 3 && !picks.includes(d)) picks.push(d); });
  picks = picks.slice(0, 4);
  const items = picks.map(sl => '<li style="margin:0; padding:12px 0; border-top:1px solid #14342C12;"><a href="products/' + sl + '.html" style="color:#14342C; font-weight:600; font-size:15.5px; text-decoration:none;">' + PRODUCTS[sl].name.replace(/&/g, '&amp;') + '</a><div style="font-size:13.5px; line-height:1.55; color:#14342C99; margin-top:3px;">' + PRODUCTS[sl].blurb.replace(/&/g, '&amp;') + '</div></li>').join('');
  article = article.replace(/\s*$/, '') + '\n          <div class="pc-related-products" style="margin-top:clamp(32px,3.6vw,48px); padding:22px 24px 10px; border:1px solid #14342C18; border-radius:8px; background:#fff;"><div style="font-family:\'IBM Plex Mono\',monospace; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#3f7a26; margin-bottom:6px;">Related products</div><ul style="list-style:none; margin:0; padding:0;">' + items + '</ul></div>\n      ';
  hasRelated = true; console.log('Added a "Related products" block (' + picks.length + ' products).');
}
ok('"Related products" block at the end of the article', hasRelated, 'Run again with --fix.');

// ---- 5. registered elsewhere
const reg = (f, label) => { try { ok('Listed in ' + label, fs.readFileSync(f, 'utf8').includes(slug)); } catch (e) { ok('Listed in ' + label, false, f + ' not found (run from the project root)'); } };
reg('blog-data.js', 'blog-data.js (with author: \'Packin Club\')'); reg('sitemap.xml', 'sitemap.xml'); reg('llms.txt', 'llms.txt');

if (FIX) { s = s.slice(0, a0) + article + s.slice(a1); fs.writeFileSync(file, s, 'utf8'); console.log('Saved ' + file); }
console.log('\nChecks for ' + file + ':');
let bad = 0; results.forEach(([p, t, x]) => { console.log((p ? '  [ok]   ' : '  [FIX]  ') + t + (!p && x ? '\n           -> ' + x : '')); if (!p) bad++; });
console.log(bad ? '\n' + bad + ' item(s) need attention.' : '\nAll checks passed.');
