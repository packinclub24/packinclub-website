#!/usr/bin/env node
/*
  Packin Club: add the inline links to certifications.html on the GENERATED pages.

  WHY: generate-products.js and generate-categories.js build the 24 product pages and the 7 category
  pages from scratch, so any hand-added link inside their text is lost when you re-run them.
  (The menu and footer links are already inside generate-products.js, so those survive.)

  USE (run in the project root, AFTER the generators):
    node generate-products.js
    node generate-categories.js
    node add-certification-links.js

  What it does on each generated page:
    1. Links every "IS 17088 · CPCB certified · EN 13432" specification row to certifications.html
    2. Links ONE natural sentence in the page text (for example "IS 17088 and CPCB certified")
  Safe to run many times: a page that already has the links is left alone.
*/
const fs = require('fs'), path = require('path');
const ROOT = __dirname;
const STYLE = 'color:inherit; text-decoration:underline; text-decoration-color:#6FAF45; text-decoration-thickness:1.5px; text-underline-offset:3px;';
const TOKEN = /(<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<[^>]+>)/;
const SKIP = ['a','h1','h2','h3','h4','h5','h6','button','summary','title','footer','textarea','option','label','head','nav','header','pre','code'];
const PROSE = [/IS 17088 and CPCB certified/, /IS 17088 and CPCB certification/, /IS 17088 (?:and|&amp;|\+) CPCB/, /CPCB[- ]certified/, /IS 17088[- ]certified/, /IS 17088 certification/, /CPCB certification/, /certified compostable/];
const SPEC = /IS 17088 (?:·|&middot;) CPCB certified(?: (?:·|&middot;) EN 13432)?/g;

function link(html, prefix, alreadyHasProse) {
  const parts = html.split(TOKEN);
  const depth = {}; SKIP.forEach(k => depth[k] = 0);
  let inBody = false, proseDone = alreadyHasProse, out = '';
  for (const p of parts) {
    if (p === undefined || p === '') continue;
    if (TOKEN.test(p) && /^(<!--|<script|<style|<)/i.test(p) && p.match(TOKEN)[0] === p) {
      const m = p.match(/^<\s*(\/)?\s*([a-zA-Z0-9]+)/);
      if (m && !p.startsWith('<!--') && !/^<(script|style)/i.test(p)) {
        const tag = m[2].toLowerCase(), closing = !!m[1];
        if (tag === 'body' && !closing) inBody = true;
        if (tag in depth && !/\/>\s*$/.test(p)) depth[tag] = Math.max(0, depth[tag] + (closing ? -1 : 1));
      }
      out += p; continue;
    }
    let txt = p;
    const open = SKIP.some(k => depth[k] > 0);
    if (inBody && !open && !txt.includes('{')) {
      txt = txt.replace(SPEC, s => `<a href="${prefix}certifications.html" style="${STYLE}">${s}</a>`);
      if (!proseDone && !txt.includes('<a ')) {
        for (const pat of PROSE) {
          const m = pat.exec(txt);
          if (m) {
            txt = txt.slice(0, m.index) + `<a href="${prefix}certifications.html" style="${STYLE}">${m[0]}</a>` + txt.slice(m.index + m[0].length);
            proseDone = true; break;
          }
        }
      }
    }
    out += txt;
  }
  return out;
}

const targets = [];
for (const f of fs.readdirSync(path.join(ROOT, 'products'))) if (f.endsWith('.html')) targets.push(['products/' + f, '../']);
for (const f of fs.readdirSync(ROOT)) if (/^compostable-(agriculture|healthcare|horeca|industrial|retail|temple)-packaging\.html$|^compostable-bags-on-roll\.html$/.test(f)) targets.push([f, '']);
let changed = 0;
for (const [rel, prefix] of targets) {
  const file = path.join(ROOT, rel);
  const src = fs.readFileSync(file, 'utf8');
  const hasProse = src.includes('certifications.html" style="' + STYLE.slice(0, 40));
  const next = link(src, prefix, hasProse);
  if (next !== src) { fs.writeFileSync(file, next); changed++; console.log('linked   ', rel); }
}
console.log(changed ? `\nDone: ${changed} page(s) updated.` : 'Nothing to do: all pages already have their certification links.');
