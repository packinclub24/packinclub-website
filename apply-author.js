#!/usr/bin/env node
/*
  Packin Club: set the author of blog articles to Vikas Jha and link to his author page.

  USE (in the project root, the folder with index.html):
      node apply-author.js                 -> updates every blog article page in the folder
      node apply-author.js my-post.html    -> updates only the pages you name

  What it changes in each article page (safe to run again, it never duplicates anything):
    1. <meta name="author"> becomes "Vikas Jha"
    2. the Article schema author becomes a Person that points to /author/vikas-jha.html
    3. the byline under the title becomes "By Vikas Jha", linked to the author page
    4. an "About the author" card is added at the end of the article
  It also works on pages made by build-article-pages.js (which runs it automatically).
*/
const fs = require('fs'), path = require('path');
const SITE = 'https://packinclub.com/';
const NAME = 'Vikas Jha';
const FULL = 'Vikas Kumar Jha';
const URL_REL = 'author/vikas-jha.html';

const PERSON = {
  '@type': 'Person',
  '@id': SITE + 'author/vikas-jha.html#person',
  name: FULL,
  alternateName: NAME,
  url: SITE + 'author/vikas-jha.html'
};

const BOX = '\n<div class="pc-author-box" style="margin-top:clamp(28px,3.2vw,40px); padding:22px 24px; border:1px solid #14342C18; border-radius:8px; background:#fff; display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap;">\n' +
  '  <a href="' + URL_REL + '" style="flex:none; display:block; width:84px; height:84px; border-radius:50%; overflow:hidden; background:#14342C;" aria-label="' + NAME + ', author page">' +
  '<img src="uploads/vikas-jha-portrait.webp" alt="' + NAME + ', Founder and CEO of Packin Club" width="84" height="84" loading="lazy" style="width:84px; height:84px; object-fit:cover; object-position:50% 12%; display:block;"></a>\n' +
  '  <div style="flex:1 1 260px; min-width:0;">\n' +
  '    <div style="font-family:\'IBM Plex Mono\',monospace; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#3f7a26; margin-bottom:6px;">About the author</div>\n' +
  '    <a href="' + URL_REL + '" rel="author" style="color:#14342C; font-weight:600; font-size:18px; text-decoration:none;">' + NAME + '</a>\n' +
  '    <div style="font-size:13.5px; color:#14342C99; margin:2px 0 8px;">Founder &amp; CEO, Packin Club</div>\n' +
  '    <p style="font-size:14.5px; line-height:1.65; color:#14342Cdd; margin:0 0 10px;">Vikas is the founder of Packin Club, a Delhi-based maker of certified compostable packaging. He leads business strategy, product portfolio, sourcing, pricing and partnerships.</p>\n' +
  '    <a href="' + URL_REL + '" style="font-size:13.5px; font-weight:600; color:#3f7a26; text-decoration:none;">View full profile →</a>\n' +
  '  </div>\n</div>\n';

function apply(html) {
  let s = html;
  // 1. meta author
  s = s.replace(/<meta name="author" content="[^"]*">/, '<meta name="author" content="' + NAME + '">');
  // 2. Article schema
  s = s.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (m, json) => {
    let d; try { d = JSON.parse(json); } catch (e) { return m; }
    if (d['@type'] !== 'Article') return m;
    d.author = PERSON;
    return '<script type="application/ld+json">' + JSON.stringify(d) + '</script>';
  });
  // 3. byline: last <span> of the hero meta row
  const h0 = s.indexOf('<section class="pc-hero-section"');
  const h1 = s.indexOf('</section>', h0);
  if (h0 !== -1 && h1 !== -1) {
    let hero = s.slice(h0, h1);
    const link = '<span>By <a href="' + URL_REL + '" rel="author" style="color:inherit; text-decoration:underline; text-decoration-color:#6FAF45; text-underline-offset:3px;">' + NAME + '</a></span>';
    if (!hero.includes('rel="author"')) {
      hero = hero.replace(/<span>(?:Packin Club(?: Editorial)?|Vikas Jha)<\/span>(\s*<\/div>\s*<\/div>\s*<div class="pc-hero-imgwrap")/, link + '$1');
    }
    s = s.slice(0, h0) + hero + s.slice(h1);
  }
  // 4. author box, right before </article>
  if (!s.includes('class="pc-author-box"')) {
    const a = s.indexOf('</article>');
    if (a !== -1) s = s.slice(0, a) + BOX + s.slice(a);
  }
  return s;
}

module.exports = { apply };

if (require.main === module) {
  const ROOT = process.cwd();
  let files = process.argv.slice(2).filter(a => /\.html$/.test(a));
  if (!files.length) files = fs.readdirSync(ROOT).filter(f => /\.html$/.test(f) && fs.readFileSync(path.join(ROOT, f), 'utf8').includes('<article class="pc-article"') && !/^article\.html$/.test(f));
  let n = 0;
  files.forEach(f => {
    const p = path.join(ROOT, f), before = fs.readFileSync(p, 'utf8'), after = apply(before);
    if (after !== before) { fs.writeFileSync(p, after, 'utf8'); n++; console.log('updated ' + f); } else console.log('already done ' + f);
  });
  console.log('\nDone. ' + n + ' page(s) changed. Author: ' + NAME + ' (' + URL_REL + ')');
}
