#!/usr/bin/env node
/*
  Packin Club: build the full static HTML page for a blog post from its blog-data.js entry.

  USE (in the project root, the folder with index.html):
      node build-article-pages.js <slug> [<slug> ...]

  It copies the layout of what-is-cpcb-certificate-for-compostable-packaging.html (header, hero, quick answer,
  sidebar, FAQ, related products, footer) and fills in the text, links, images and schema of the post.
  Then run:   node check-blog-post.js <slug>.html --fix
*/
const fs = require('fs'), vm = require('vm'), path = require('path');
const { apply: applyAuthor } = require('./apply-author.js');   // sets the author (Vikas Jha) + author card
const ROOT = process.cwd();
const TEMPLATE = 'what-is-cpcb-certificate-for-compostable-packaging.html';
const SITE = 'https://packinclub.com/';

const sb = { window: {}, console }; vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'blog-data.js'), 'utf8'), sb);
const POSTS = sb.window.PACKIN_BLOG.posts;
const bySlug = s => POSTS.find(p => p.slug === s);
const sp = { window: {}, console }; vm.createContext(sp);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'product-data.js'), 'utf8'), sp);
const PRODUCTS = {}; sp.window.PACKIN.products.forEach(p => { PRODUCTS[p.slug] = p; });

const RELATED_PRODUCTS = {
  'plastic-waste-management-rules-2026-packaging-checklist': ['compostable-carry-bags', 'compostable-courier-bags-mailers', 'compostable-garbage-bags', 'compostable-grocery-bags'],
  'compostable-packaging-distributorship-india': ['compostable-carry-bags', 'compostable-garbage-bags', 'compostable-courier-bags-mailers', 'compostable-pouches'],
  'compostable-packaging-for-quick-commerce-and-dark-stores': ['compostable-carry-bags-on-roll', 'compostable-grocery-bags-on-roll', 'compostable-carry-bags', 'compostable-courier-bags-mailers'],
  'compostable-bags-price-in-india': ['compostable-carry-bags', 'compostable-courier-bags-mailers', 'compostable-garbage-bags', 'compostable-grocery-bags']
};
const KEEP_READING = {
  'plastic-waste-management-rules-2026-packaging-checklist': ['what-is-cpcb-certificate-for-compostable-packaging', 'india-s-single-use-plastic-ban-a-practical-compliance-guide-for-businesses', 'compostable-packaging-distributorship-india'],
  'compostable-packaging-distributorship-india': ['what-is-cpcb-certificate-for-compostable-packaging', 'plastic-waste-management-rules-2026-packaging-checklist', 'compostable-bags-price-in-india'],
  'compostable-packaging-for-quick-commerce-and-dark-stores': ['compostable-courier-bags-for-e-commerce-the-complete-guide', 'courier-bag-sizes-chart', 'compostable-bags-price-in-india'],
  'compostable-bags-price-in-india': ['the-true-cost-of-switching-to-compostable-packaging', 'compostable-packaging-for-quick-commerce-and-dark-stores', 'plastic-waste-management-rules-2026-packaging-checklist']
};

const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escA = t => esc(t).replace(/"/g, '&quot;');
const idOf = h => 'h-' + h.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const P_STYLE = 'font-size:16.5px; line-height:1.78; color:#14342Cdd; margin:0 0 16px;';
const H2_STYLE = 'font-weight:600; font-size:clamp(20px,2vw,25px); line-height:1.28; letter-spacing:-0.005em; margin:0 0 15px; color:#14342C;';
const A_STYLE = 'color:#3f7a26; text-decoration:underline; text-underline-offset:3px; text-decoration-thickness:1px; font-weight:500;';
const UL_STYLE = 'list-style:none; padding:0; margin:8px 0 0; display:flex; flex-direction:column; gap:11px;';
const LI_STYLE = "display:flex; gap:12px; align-items:flex-start; font-family:'Source Serif 4',serif; font-size:16px; line-height:1.6; color:#14342Cdd;";
const DOT = '<span style="flex:none; margin-top:8px; width:6px; height:6px; border-radius:50%; background:#6FAF45;"></span>';

function build(slug) {
  const post = bySlug(slug);
  if (!post) throw new Error('No post with slug ' + slug + ' in blog-data.js');
  const url = SITE + slug + '.html';
  const ogName = slug + '-og.jpg';
  let tpl = fs.readFileSync(path.join(ROOT, TEMPLATE), 'utf8');

  // ---------------- link engine: first occurrence of each anchor, whole article ----------------
  const links = [];
  (post.internalLinks || []).forEach(l => links.push({ anchor: l.anchor, href: l.targetSlug + '.html', ext: false }));
  (post.pageLinks || []).forEach(l => links.push({ anchor: l.anchor, href: l.href, ext: !!l.external }));
  links.sort((a, b) => b.anchor.length - a.anchor.length);
  const used = new Set(), tokens = [];
  function linkify(text) {
    let t = esc(text);
    links.forEach(l => {
      if (used.has(l.anchor)) return;
      const a = esc(l.anchor), i = t.indexOf(a);
      if (i === -1) return;
      used.add(l.anchor);
      const tag = '<a href="' + escA(l.href) + '"' + (l.ext ? ' target="_blank" rel="noopener"' : '') + ' style="' + A_STYLE + '">' + a + '</a>';
      tokens.push(tag);
      t = t.slice(0, i) + '\u0000' + (tokens.length - 1) + '\u0000' + t.slice(i + a.length);
    });
    return t;
  }
  const unToken = t => t.replace(/\u0000(\d+)\u0000/g, (m, n) => tokens[+n]);

  // ---------------- article body ----------------
  const pHtml = t => '<p style="' + P_STYLE + '">' + unToken(linkify(t)) + '</p>';
  const ulHtml = items => '<ul style="' + UL_STYLE + '">' + items.map(t => '<li style="' + LI_STYLE + '">' + DOT + '<span>' + unToken(linkify(t)) + '</span></li>').join('') + '</ul>';
  const tableHtml = tb => '<div class="pc-table-wrap"><table class="pc-table"><thead><tr>' + tb.headers.map(h => '<th>' + esc(h) + '</th>').join('') + '</tr></thead><tbody>' +
    tb.rows.map(r => '<tr>' + r.map(c => '<td>' + esc(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';

  const lead = '<p class="pc-dropcap" style="font-size:clamp(17px,1.5vw,18.5px); line-height:1.75; letter-spacing:-0.005em; color:#14342C; margin:0 0 clamp(32px,3.6vw,44px); padding-bottom:clamp(26px,2.8vw,36px); border-bottom:1px solid #14342C18;">' + esc(post.excerpt) + '</p>';
  const qa = '<div class="pc-quick-answer" style="background:#fff; border:1px solid #14342C18; border-left:4px solid #6FAF45; border-radius:6px; padding:20px 24px; margin:0 0 clamp(28px,3.2vw,40px);"><div style="font-family:\'IBM Plex Mono\',monospace; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#3f7a26; margin-bottom:8px;">Quick answer</div><p style="font-size:clamp(16.5px,1.5vw,18px); line-height:1.7; color:#14342C; margin:0; font-weight:500;">' + esc(post.quickAnswer) + '</p></div>';

  const toc = [];
  let sections = '';
  post.body.forEach((s, i) => {
    let h = '';
    if (s.h) { h = '<h2 id="' + idOf(s.h) + '" style="' + H2_STYLE + '">' + esc(s.h) + '</h2>'; toc.push([idOf(s.h), s.h]); }
    let inner = h + (s.p || []).map(pHtml).join('') + (s.ul ? ulHtml(s.ul) : '') + (s.table ? tableHtml(s.table) : '');
    sections += '\n          <div style="margin-bottom:30px;">' + inner + '</div>';
    if (post.pullQuote && post.pullAfter === i) sections += '\n          <div class="pc-pullquote"><p>' + esc(post.pullQuote) + '</p></div>';
  });
  links.forEach(l => { if (!used.has(l.anchor)) throw new Error(slug + ': link anchor not found in text: "' + l.anchor + '"'); });

  const faq = '\n          <div id="faqs" style="margin-top:clamp(36px,4vw,52px); padding-top:clamp(32px,3vw,44px); border-top:1px solid #14342C18;">\n            <div style="font-family:\'IBM Plex Mono\',monospace; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#3f7a26; margin-bottom:10px;">Common questions</div>\n            <h2 style="font-family:\'Space Grotesk\',sans-serif; font-weight:600; font-size:clamp(20px,2vw,25px); letter-spacing:-0.005em; margin:0 0 20px; color:#14342C;">Frequently asked questions</h2>\n            <div>\n' +
    post.faqs.map(f => '              <details class="pc-faq"><summary>' + esc(f.q) + '<span class="pc-faq-plus"></span></summary><div class="pc-faq-a">' + esc(f.a) + '</div></details>').join('\n') + '\n            </div>\n          </div>\n';

  const prods = (RELATED_PRODUCTS[slug] || []).map(sl => {
    const p = PRODUCTS[sl]; if (!p) throw new Error('product not found ' + sl);
    return '    <li style="margin:0; padding:12px 0; border-top:1px solid #14342C12;">\n      <a href="products/' + sl + '.html" style="color:#14342C; font-weight:600; font-size:15.5px; text-decoration:none;">' + esc(p.name) + '</a>\n      <div style="font-size:13.5px; line-height:1.55; color:#14342C99; margin-top:3px;">' + esc(p.blurb) + '</div>\n    </li>';
  }).join('\n');
  const related = '\n<div class="pc-related-products" style="margin-top:clamp(32px,3.6vw,48px); padding:22px 24px 10px; border:1px solid #14342C18; border-radius:8px; background:#fff;">\n  <div style="font-family:\'IBM Plex Mono\',monospace; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#3f7a26; margin-bottom:6px;">Related products</div>\n  <ul style="list-style:none; margin:0; padding:0;">\n' + prods + '\n  </ul>\n</div>\n';

  const a0 = tpl.indexOf('<article class="pc-article"'), a1 = tpl.indexOf('</article>', a0);
  const artOpen = tpl.slice(a0, tpl.indexOf('>', a0) + 1);
  const MODE = process.env.MODE || '';
  if (MODE === 'related') {            // only swap the Related products block inside an already built page
    let cur = fs.readFileSync(path.join(ROOT, slug + '.html'), 'utf8');
    cur = cur.replace(/\s*<div class="pc-related-products"[\s\S]*?<\/ul>\s*<\/div>\s*(?=\s*(?:<div class="pc-author-box"|<\/article>))/, related);
    cur = applyAuthor(cur);
    fs.writeFileSync(path.join(ROOT, slug + '.html'), cur, 'utf8'); console.log('related block updated: ' + slug); return;
  }
  tpl = tpl.slice(0, a0) + artOpen + '\n        ' + qa + '\n        ' + lead + sections + faq + (MODE === 'norelated' ? '' : related) + tpl.slice(a1);

  // ---------------- sidebar: TOC + takeaways ----------------
  const tocHtml = '\n' + toc.map(t => '              <a href="#' + t[0] + '" class="pc-toc-link">' + esc(t[1]) + '</a>').join('\n') + '\n              <a href="#faqs" class="pc-toc-link">Frequently asked questions</a>\n          ';
  tpl = tpl.replace(/(<nav style="display:flex; flex-direction:column; padding:2px 20px 16px;">)[\s\S]*?(<\/nav>)/, (m, o, c) => o + tocHtml + c);
  const check = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f7a26" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="flex:none; margin-top:1px;"><path d="M20 6L9 17l-5-5"></path></svg>';
  const takeHtml = '\n' + post.takeaways.map(t => '              <li style="display:flex; gap:11px; align-items:flex-start; font-family:\'Source Serif 4\',serif; font-size:14px; line-height:1.55; color:#14342Cdd;">' + check + '<span>' + esc(t) + '</span></li>').join('\n') + '\n          ';
  tpl = tpl.replace(/(Key takeaways<\/div>\s*<ul style="[^"]*">)[\s\S]*?(<\/ul>)/, (m, o, c) => o + takeHtml + c);

  // ---------------- keep reading ----------------
  const cards = (KEEP_READING[slug] || []).map(sl => {
    const q = bySlug(sl); if (!q) throw new Error('keep-reading post not found ' + sl);
    return '              <a href="' + sl + '.html" class="pc-card" style="display:flex; flex-direction:column; text-decoration:none; color:inherit; border:1px solid #14342C18; border-radius:5px; overflow:hidden; background:#fff;">\n                <div style="height:120px; position:relative; background-color:' + q.heroBg + '; background-image:url(\'' + q.thumb + '\'); background-size:cover; background-position:center; display:flex; align-items:flex-end; padding:16px;">\n  <span style="position:relative; font-family:Inter,sans-serif; font-size:10.5px; letter-spacing:0.1em; text-transform:uppercase; color:#F7F4EC; background:#14342C4D; padding:4px 9px; border-radius:2px;">' + esc(q.cat) + '</span>\n</div>\n                <div style="padding:18px 20px;">\n                  <h3 style="font-family:Fraunces,serif; font-weight:500; font-size:17px; line-height:1.22; margin:0 0 8px; color:#14342C;">' + esc(q.title) + '</h3>\n                  <span style="font-size:12.5px; font-weight:600; color:#3f7a26;">Read more <span class="pc-arrow">→</span></span>\n                </div>\n              </a>';
  }).join('\n');
  tpl = tpl.replace(/(<div style="display:grid; grid-template-columns:repeat\(auto-fill,minmax\(280px,1fr\)\); gap:16px;">)[\s\S]*?(\n      <\/div>\n    <\/div>\n  <\/section>)/, (m, o, c) => o + '\n' + cards + c);

  // ---------------- hero ----------------
  const h0 = tpl.indexOf('<section class="pc-hero-section"'), h1 = tpl.indexOf('</section>', h0) + 10;
  let hero = tpl.slice(h0, h1);
  hero = hero.replace(/(<span style="color:#6FAF45;">)[^<]*(<\/span>)/, '$1' + esc(post.cat) + '$2')
    .replace(/(max-width:780px;">)[\s\S]*?(<\/h1>)/, (m, o, c) => o + esc(post.title) + c)
    .replace(/<span>\d{1,2} \w+ \d{4}<\/span>/, '<span>' + post.dateLabel + '</span>')
    .replace(/<span>\d+ min read<\/span>/, '<span>' + post.readMins + ' min read</span>')
    .replace(/aria-label="[^"]*"/, 'aria-label="' + escA(post.imageAlt) + '"')
    .replace(/url\('thumbnail_blog\/[^']*'\)/, "url('" + post.thumb + "')");
  tpl = tpl.slice(0, h0) + hero + tpl.slice(h1);

  // ---------------- head ----------------
  const geo = 'compostable packaging manufacturer India, certified compostable packaging supplier, compostable packaging Delhi, IS 17088 certified, CPCB certified, plastic alternative packaging, compostable packaging Noida, compostable packaging Gurugram, compostable packaging Ludhiana, compostable packaging Mumbai, compostable packaging Pune, compostable packaging Chennai, compostable packaging Coimbatore';
  const kw = [post.keyword].concat(post.secondaryKeywords.slice(0, 3)).join(', ') + ', ' + geo;
  const setMeta = (re, val) => { if (!re.test(tpl)) throw new Error('template meta not found: ' + re); tpl = tpl.replace(re, (m, o, c) => o + val + c); };
  setMeta(/(<title>)[^<]*(<\/title>)/, esc(post.metaTitle) + ' | Packin Club');
  setMeta(/(<meta name="description" content=")[^"]*(">)/, escA(post.metaDescription));
  setMeta(/(<meta name="keywords" content=")[^"]*(">)/, escA(kw));
  setMeta(/(<link rel="canonical" href=")[^"]*(">)/, url);
  setMeta(/(<meta property="og:title" content=")[^"]*(">)/, escA(post.title));
  setMeta(/(<meta property="og:description" content=")[^"]*(">)/, escA(post.metaDescription));
  setMeta(/(<meta property="og:image" content=")[^"]*(">)/, SITE + 'thumbnail_blog/' + ogName);
  setMeta(/(<meta property="og:url" content=")[^"]*(">)/, url);

  // ---------------- JSON-LD ----------------
  const LD = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  tpl = tpl.replace(LD, (m, json) => {
    const d = JSON.parse(json);
    if (d['@type'] === 'Article') {
      d.headline = post.title; d.description = post.metaDescription; d.image = [SITE + 'thumbnail_blog/' + ogName];
      d.datePublished = post.date; d.dateModified = post.date; d.mainEntityOfPage['@id'] = url;
    } else if (d['@type'] === 'FAQPage') {
      d.mainEntity = post.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }));
    } else if (d['@type'] === 'BreadcrumbList') {
      const last = d.itemListElement[d.itemListElement.length - 1]; last.name = post.title; last.item = url;
    }
    return '<script type="application/ld+json">' + JSON.stringify(d) + '</script>';
  });

  if (/CPCB certificate for compostable packaging explained|what-is-cpcb-certificate-for-compostable-packaging/.test(tpl) && slug !== 'what-is-cpcb-certificate-for-compostable-packaging') {
    // only allowed inside generated links (Keep reading or inline links); template-specific leftovers would be in head/hero
    const head = tpl.slice(0, tpl.indexOf('<body>'));
    if (/what-is-cpcb-certificate-for-compostable-packaging/.test(head) && !/\/what-is-cpcb/.test('')) {
      if ((head.match(/what-is-cpcb-certificate-for-compostable-packaging/g) || []).length) throw new Error(slug + ': template leftovers in <head>');
    }
  }
  if (MODE !== 'norelated') tpl = applyAuthor(tpl);
  fs.writeFileSync(path.join(ROOT, slug + '.html'), tpl, 'utf8');
  console.log('built ' + slug + '.html  (' + Math.round(tpl.length / 1024) + ' KB)');
}

const slugs = process.argv.slice(2);
if (!slugs.length) { console.log('Usage: node build-article-pages.js <slug> [<slug> ...]'); process.exit(1); }
slugs.forEach(build);
