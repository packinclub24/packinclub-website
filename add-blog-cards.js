#!/usr/bin/env node
/*
  Packin Club: put every post from blog-data.js onto blog.html.

  WHY: blog.html lists its posts as plain HTML (so Google can read them). That means a new post does NOT appear on the
  blog page by itself. This tool adds a card for every post that is missing, in date order (newest first), and keeps the
  "Blog" schema (blogPost list) in the page <head> up to date.

  USE (in the project root, the folder with index.html), every time you add a new article:
      node add-blog-cards.js
      node prerender.js blog.html index.html

  Safe to run many times. It never changes cards that are already there.
*/
const fs = require('fs'), vm = require('vm'), path = require('path');
const ROOT = process.cwd();
const SITE = 'https://packinclub.com/';
const file = path.join(ROOT, 'blog.html');

const sb = { window: {}, console }; vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'blog-data.js'), 'utf8'), sb);
const POSTS = sb.window.PACKIN_BLOG.posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
const bySlug = {}; POSTS.forEach(p => { bySlug[p.slug] = p; });
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let src = fs.readFileSync(file, 'utf8');

// ---------- 1. cards, inside the template part of the page ----------
const t0 = src.indexOf('<script type="text/x-dc-template"');
const tOpen = src.indexOf('>', t0) + 1, t1 = src.indexOf('</script>', tOpen);
if (t0 === -1) throw new Error('template block not found in blog.html');
let tpl = src.slice(tOpen, t1);

const cardRe = /<a href="([^"]+)\.html" data-post-cat="[^"]*"(?: data-dup)? data-reveal class="pc-card"[\s\S]*?<\/a>/g;
const existing = []; let m;
while ((m = cardRe.exec(tpl))) existing.push({ slug: m[1], start: m.index, end: m.index + m[0].length, html: m[0] });
if (!existing.length) throw new Error('no existing cards found to copy the layout from');
const model = existing.find(c => !/data-dup/.test(c.html)) || existing[0];
const have = new Set(existing.map(c => c.slug));
const featured = (/data-featured-wrap>\s*<a href="([^"]+)\.html"/.exec(tpl) || [])[1];
if (featured) have.add(featured);

function makeCard(p) {
  let c = model.html;
  c = c.replace(/<a href="[^"]+\.html"/, '<a href="' + p.slug + '.html"')
    .replace(/data-post-cat="[^"]*"/, 'data-post-cat="' + esc(p.cat) + '"')
    .replace(/background-color:#[0-9A-Fa-f]{3,8}; background-image:url\('[^']*'\)/, "background-color:" + p.heroBg + "; background-image:url('" + p.thumb + "')")
    .replace(/(text-transform:uppercase; color:#F7F4EC; background:#14342C4D; padding:4px 9px; border-radius:2px;">)[^<]*(<\/span>)/, '$1' + esc(p.cat) + '$2')
    .replace(/(margin-bottom:11px;">)[^<]*(<\/div>)/, '$1' + p.dateLabel + ' · ' + p.readMins + ' min read$2')
    .replace(/(<h3 [^>]*>)[\s\S]*?(<\/h3>)/, '$1' + esc(p.title).replace(/\$/g, '$$$$') + '$2')
    .replace(/(<p style="font-size:13\.5px[^>]*>)[\s\S]*?(<\/p>)/, '$1' + esc(p.excerpt).replace(/\$/g, '$$$$') + '$2');
  if (/\{\{|<!--/.test(c)) throw new Error('unsafe text in post ' + p.slug);
  return c;
}

const missing = POSTS.filter(p => !have.has(p.slug));
missing.slice().reverse().forEach(p => {            // oldest first, so each lands in the right place
  const list = []; const re = new RegExp(cardRe.source, 'g'); let k;
  while ((k = re.exec(tpl))) list.push({ slug: k[1], start: k.index, end: k.index + k[0].length });
  const next = list.find(c => bySlug[c.slug] && new Date(bySlug[c.slug].date) < new Date(p.date));
  const html = makeCard(p);
  if (next) tpl = tpl.slice(0, next.start) + html + '\n        ' + tpl.slice(next.start);
  else { const last = list[list.length - 1]; tpl = tpl.slice(0, last.end) + '\n        ' + html + tpl.slice(last.end); }
});
src = src.slice(0, tOpen) + tpl + src.slice(t1);

// ---------- 2. "Blog" schema in <head>: list every post ----------
const LD = /<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>/g;
src = src.replace(LD, (all, json) => {
  let d; try { d = JSON.parse(json); } catch (e) { return all; }
  if (d['@type'] !== 'Blog') return all;
  d.blogPost = POSTS.map(p => ({
    '@type': 'BlogPosting', headline: p.title, url: SITE + p.slug + '.html', datePublished: p.date,
    image: SITE + p.thumb,
    author: { '@type': 'Person', '@id': SITE + 'author/vikas-jha.html#person', name: 'Vikas Kumar Jha', alternateName: 'Vikas Jha', url: SITE + 'author/vikas-jha.html' }
  }));
  return '<script type="application/ld+json">\n  ' + JSON.stringify(d, null, 2).replace(/\n/g, '\n  ') + '\n  </script>';
});

fs.writeFileSync(file, src, 'utf8');
console.log(missing.length ? 'Added ' + missing.length + ' card(s) to blog.html: ' + missing.map(p => p.slug).join(', ') : 'blog.html already has every post.');
console.log('Blog schema now lists ' + POSTS.length + ' posts.\nNext: node prerender.js blog.html index.html');
