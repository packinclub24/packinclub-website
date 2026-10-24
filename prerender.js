#!/usr/bin/env node
/*
  Packin Club: pre-render the JavaScript-built pages into real HTML.

  WHY: home, about, industries, products, blog and contact are built in the visitor's browser from a template.
  A crawler that does not run JavaScript (many AI crawlers, Ensun, social bots) only sees empty placeholders like {{ p.name }}.
  This tool opens each page in a real (headless) browser, takes a snapshot of the finished page, and saves that snapshot
  inside the page's own HTML. Visitors still get the normal interactive page; bots get real names, text and links.

  USE (run in the project root, the folder with index.html):
    node prerender.js                  -> pre-render all six pages
    node prerender.js index.html       -> pre-render only the pages you name
    node prerender.js --check          -> no browser needed: shows what a bot sees on each page right now

  RUN IT AGAIN whenever you change one of these pages, product-data.js, or blog-data.js.
  One-time setup (needs internet):  npm install playwright   and then   npx playwright install chromium
*/
const fs = require('fs'), path = require('path'), http = require('http');
const ROOT = process.cwd();
const ALL = ['index.html', 'about.html', 'industries.html', 'products.html', 'blog.html', 'contact.html'];
const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const named = args.filter(a => /\.html$/.test(a));
const PAGES = named.length ? named : ALL;

const TPL_OPEN = '<script type="text/x-dc-template" id="dc-template">';
const PRE_START = '<!-- PRERENDER:START (made by prerender.js: do not edit between START and END. Edit the template above, then run: node prerender.js) -->';
const PRE_END = '<!-- PRERENDER:END -->';
// inside <script> a few character sequences confuse the browser's HTML parser, so they are stored with a backslash
const esc = t => t.replace(/<(!--|\/script|script)/gi, '<\\$1').replace(/\{\{/g, '{\\{').replace(/\}\}/g, '}\\}');
const unesc = t => t.replace(/<\\(!--|\/script|script)/gi, '<$1').replace(/\{\\\{/g, '{{').replace(/\}\\\}/g, '}}');

// ---------- split a page into: before | template | after ----------
function split(src) {
  const t0 = src.indexOf('<script type="text/x-dc-template"');
  if (t0 !== -1) {                                          // already pre-rendered once
    const open = src.indexOf('>', t0) + 1, close = src.indexOf('</script>', open);
    const endMark = src.indexOf(PRE_END, close);
    if (endMark === -1) throw new Error('PRERENDER:END marker not found');
    return { before: src.slice(0, t0), template: unesc(src.slice(open, close)), after: src.slice(endMark + PRE_END.length) };
  }
  const m = /<x-dc(?:\s[^>]*)?>/.exec(src);                  // original format: template lives inside <x-dc>
  const close = src.lastIndexOf('</x-dc>');
  if (!m || close === -1) throw new Error('no <x-dc> block found');
  return { before: src.slice(0, m.index), template: src.slice(m.index + m[0].length, close), after: src.slice(close + '</x-dc>'.length) };
}

// ---------- what a bot sees (no JavaScript) ----------
function botView(html) {
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  const text = body.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  return {
    placeholders: (text.match(/\{\{[^}]*\}\}/g) || []).length,
    anywhere: (html.match(/\{\{/g) || []).length,
    placeholdersInAttrs: (body.match(/(?:src|href|alt|aria-label)="[^"]*\{\{[^}]*\}\}[^"]*"/g) || []).length,
    words: text.trim().split(' ').length,
    links: (body.match(/<a\s[^>]*href="/g) || []).length,
    images: (body.match(/<img\s/g) || []).length,
    products: (text.match(/Compostable [A-Z][A-Za-z\- \/(),]+/g) || []).length
  };
}
if (CHECK) {
  console.log('What a bot (no JavaScript) sees right now:\n');
  console.log('page            placeholders  words  links  images  "Compostable ..." names  {{ anywhere in file');
  for (const f of PAGES) {
    const v = botView(fs.readFileSync(path.join(ROOT, f), 'utf8'));
    console.log(f.padEnd(16) + String(v.placeholders + v.placeholdersInAttrs).padStart(12) + String(v.words).padStart(8) + String(v.links).padStart(7) + String(v.images).padStart(8) + String(v.products).padStart(12) + String(v.anywhere).padStart(22));
  }
  console.log('\nGoal: 0 placeholders on every page.');
  process.exit(0);
}

// ---------- browser ----------
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  try { ({ chromium } = require('playwright-core')); } catch (e2) {
    console.log('Playwright is not installed yet. Run these two commands once, then try again:\n\n  npm install playwright\n  npx playwright install chromium\n');
    process.exit(1);
  }
}
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain', '.xml': 'application/xml' };
function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
      const f = path.join(ROOT, path.normalize(p));
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('not found'); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(f).pipe(res);
    }).listen(0, '127.0.0.1', () => resolve(srv));
  });
}
// runs inside the browser: take the finished page and clean it up
function capture() {
  const root = document.getElementById('dc-root');
  const clone = root.cloneNode(true);
  clone.querySelectorAll('*').forEach(el => { [...el.attributes].forEach(a => { if (a.name.indexOf('data-dc-') === 0) el.removeAttribute(a.name); }); });
  clone.querySelectorAll('[data-reveal]').forEach(el => { if (el.style.opacity === '0') el.style.opacity = ''; if (/translate/.test(el.style.transform || '')) el.style.transform = ''; });
  clone.querySelectorAll('[style*="z-index:9999"], [style*="z-index: 9999"]').forEach(el => { if (el.style.opacity === '0') el.style.opacity = ''; if (el.style.visibility === 'hidden') el.style.visibility = ''; });
  return clone.innerHTML;
}

(async () => {
  const srv = await serve(), port = srv.address().port;
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  let failed = 0;
  for (const f of PAGES) {
    const file = path.join(ROOT, f);
    if (!fs.existsSync(file)) { console.log('  skipped (not found): ' + f); continue; }
    const src = fs.readFileSync(file, 'utf8');
    let parts; try { parts = split(src); } catch (e) { console.log('  SKIPPED ' + f + ': ' + e.message); failed++; continue; }
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 12000 } });
    await ctx.route('**/*', route => {
      const u = route.request().url();
      if (u.startsWith('http://127.0.0.1:' + port)) return route.continue();
      if (process.env.PRERENDER_LIBS && u.indexOf('unpkg.com') !== -1) {
        const L = process.env.PRERENDER_LIBS, map = { 'react@18.3.1/umd/react.production.min.js': '/react/umd/react.production.min.js', 'react-dom@18.3.1/umd/react-dom.production.min.js': '/react-dom/umd/react-dom.production.min.js', '@babel/standalone@7.26.4/babel.min.js': '/@babel/standalone/babel.min.js' };
        for (const k in map) if (u.endsWith(k)) return route.fulfill({ path: L + map[k], contentType: 'application/javascript' });
      }
      if (/googletagmanager|google-analytics|youtube|google\.com\/maps|doubleclick/.test(u)) return route.abort();
      return route.continue();
    });
    const page = await ctx.newPage();
    const errors = []; page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
    try {
      await page.goto('http://127.0.0.1:' + port + '/' + f, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#dc-root > *', { timeout: 60000 });
      await page.waitForTimeout(900);
      const snap = await page.evaluate(capture);
      if (/\{\{/.test(snap)) throw new Error('snapshot still contains {{ placeholders }}');
      if (snap.length < 2000) throw new Error('snapshot looks empty');
      const helmet = (/<helmet>[\s\S]*?<\/helmet>/.exec(parts.template) || [''])[0];
      const out = parts.before + TPL_OPEN + '\n' + esc(parts.template) + '\n</script>\n' + PRE_START + '\n<x-dc data-prerendered>' + helmet + snap + '</x-dc>\n' + PRE_END + parts.after;
      fs.writeFileSync(file, out, 'utf8');
      const v = botView(out);
      console.log('  done  ' + f.padEnd(15) + ' bot now sees ' + String(v.words).padStart(5) + ' words, ' + v.links + ' links, ' + v.images + ' images, ' + (v.placeholders + v.placeholdersInAttrs) + ' placeholders' + (errors.length ? '   (page warnings: ' + errors.length + ')' : ''));
    } catch (e) { failed++; console.log('  FAILED ' + f + ': ' + e.message + '   (file left unchanged)'); }
    await ctx.close();
  }
  await browser.close(); srv.close();
  console.log(failed ? '\n' + failed + ' page(s) failed. The others were saved.' : '\nAll pages pre-rendered. Open them locally to check, then publish.');
})();
