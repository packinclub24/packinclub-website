#!/usr/bin/env node
/*
  Packin Club: add a "Compare with similar products" table and a "Buyer guides" block to every product page.

  WHY: product pages were only linked to each other and to their category. Google (and buyers) also want to see
  (1) how a product differs from its closest alternatives and (2) which guides explain it. This adds both,
  using ONLY facts that already exist in product-data.js (specs) and blog-data.js (guide titles and excerpts).

  USE (in the project root, AFTER the generators and add-certification-links.js):
    node generate-products.js
    node generate-categories.js
    node add-certification-links.js
    node add-product-guides.js

  Safe to run many times: the block is wrapped in PC-GUIDES:START / PC-GUIDES:END markers and is replaced each time.

  TO CHANGE ANYTHING: edit the three lists below (BEST_FOR, COMPARE, GUIDES), then run the script again.
  Only write facts you can back up (specs, certificates, what you really offer).
*/
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = __dirname;

// ---------- read the real data ----------
function load(file, globalName) {
  const sb = { window: {}, console }; vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), sb);
  return sb.window[globalName];
}
const PACKIN = load('product-data.js', 'PACKIN');
const BLOG = load('blog-data.js', 'PACKIN_BLOG');
const PRODUCTS = {}; PACKIN.products.forEach(p => { PRODUCTS[p.slug] = p; });
const POSTS = {}; BLOG.posts.forEach(p => { POSTS[p.slug] = p; });

// ---------- 1. "Best for": one short line per product that appears in a comparison ----------
const BEST_FOR = {
  'compostable-carry-bags': 'Everyday counters: apparel, grocery and pharmacy',
  'compostable-d-cut-shopping-bags': 'Boutiques, gifting and events, with a fabric-like feel',
  'compostable-loop-handle-bags': 'Premium retail, hampers and takeaway',
  'compostable-grocery-bags': 'Supermarkets, kirana and organic stores',
  'compostable-carry-bags-on-roll': 'Fast dispensing at supermarket and pharmacy tills',
  'compostable-grocery-bags-on-roll': 'Loose produce, bakery and deli counters',
  'compostable-garbage-bag-on-roll': 'Kitchens, offices and hotels that change liners often',
  'compostable-garbage-bags': 'Facility, municipal and warehouse waste in bulk',
  'compostable-medical-waste-bags': 'Hospitals and clinics, colour-coded to protocol',
  'compostable-stretch-film': 'Pallet wrapping and warehouse bundling',
  'compostable-shrink-film': 'Multipacks, trays and retail-ready bundles',
  'compostable-cling-film': 'Kitchens, delis and catering food wrap',
  'compostable-pouches': 'Grains, snacks and dry goods',
  'compostable-bread-pouch': 'Bakeries: loaves, baguettes and buns',
  'compostable-hot-liquid-pouches': 'Hot soups, curries and chai',
  'compostable-prasadam-pouches': 'Temple prasadam and festival distribution',
  'compostable-aqueous-coated-paper-cups': 'Hot and cold drinks at cafés and food courts'
};

// ---------- 2. Which products to compare (the page's own product is added automatically) ----------
const COMPARE = {
  'compostable-carry-bags': ['compostable-loop-handle-bags', 'compostable-d-cut-shopping-bags', 'compostable-grocery-bags'],
  'compostable-d-cut-shopping-bags': ['compostable-loop-handle-bags', 'compostable-carry-bags'],
  'compostable-loop-handle-bags': ['compostable-d-cut-shopping-bags', 'compostable-carry-bags'],
  'compostable-grocery-bags': ['compostable-carry-bags', 'compostable-grocery-bags-on-roll'],
  'compostable-carry-bags-on-roll': ['compostable-grocery-bags-on-roll', 'compostable-garbage-bag-on-roll'],
  'compostable-grocery-bags-on-roll': ['compostable-carry-bags-on-roll', 'compostable-garbage-bag-on-roll'],
  'compostable-garbage-bag-on-roll': ['compostable-garbage-bags', 'compostable-carry-bags-on-roll'],
  'compostable-garbage-bags': ['compostable-garbage-bag-on-roll', 'compostable-medical-waste-bags'],
  'compostable-medical-waste-bags': ['compostable-garbage-bags', 'compostable-garbage-bag-on-roll'],
  'compostable-stretch-film': ['compostable-shrink-film', 'compostable-cling-film'],
  'compostable-shrink-film': ['compostable-stretch-film', 'compostable-cling-film'],
  'compostable-cling-film': ['compostable-stretch-film', 'compostable-shrink-film'],
  'compostable-pouches': ['compostable-bread-pouch', 'compostable-hot-liquid-pouches', 'compostable-prasadam-pouches'],
  'compostable-bread-pouch': ['compostable-pouches', 'compostable-hot-liquid-pouches'],
  'compostable-hot-liquid-pouches': ['compostable-pouches', 'compostable-aqueous-coated-paper-cups'],
  'compostable-prasadam-pouches': ['compostable-pouches', 'compostable-bread-pouch'],
  'compostable-aqueous-coated-paper-cups': ['compostable-hot-liquid-pouches']
};

// ---------- 3. Which guides to show on each product page (3 each, most specific first) ----------
const G = {
  vs: 'compostable-vs-biodegradable-packaging-what-s-the-real-difference',
  eco: 'are-compostable-bags-really-eco-friendly-an-honest-look',
  ban: 'india-s-single-use-plastic-ban-a-practical-compliance-guide-for-businesses',
  cups: 'aqueous-coated-paper-cups-are-they-actually-compostable',
  cost: 'the-true-cost-of-switching-to-compostable-packaging',
  home: 'home-composting-vs-industrial-composting-what-you-need-to-know',
  mulch: 'compostable-mulch-film-a-practical-guide-for-indian-farmers',
  green: 'how-to-spot-greenwashing-in-eco-friendly-packaging',
  what: 'what-is-compostable-packaging',
  sizes: 'courier-bag-sizes-chart',
  cpcb: 'what-is-cpcb-certificate-for-compostable-packaging',
  is17088: 'what-is-is-17088-compostable-plastic-certification-explained',
  courier: 'compostable-courier-bags-for-e-commerce-the-complete-guide',
  food: 'compostable-packaging-for-restaurants-and-cloud-kitchens',
  long: 'how-long-does-compostable-packaging-take-to-decompose'
};
const GUIDES = {
  'compostable-agri-mulch-film': [G.mulch, G.long, G.home],
  'compostable-nursery-bags': [G.mulch, G.long, G.home],
  'compostable-carry-bags-on-roll': [G.eco, G.ban, G.cost],
  'compostable-garbage-bag-on-roll': [G.eco, G.home, G.long],
  'compostable-grocery-bags-on-roll': [G.ban, G.eco, G.cost],
  'compostable-medical-waste-bags': [G.is17088, G.cpcb, G.green],
  'compostable-bamboo-tissue': [G.food, G.what, G.vs],
  'compostable-bread-pouch': [G.food, G.what, G.green],
  'compostable-cling-film': [G.food, G.ban, G.vs],
  'compostable-hot-liquid-pouches': [G.food, G.vs, G.long],
  'compostable-aqueous-coated-paper-cups': [G.cups, G.food, G.vs],
  'compostable-pouches': [G.food, G.what, G.vs],
  'compostable-electrical-wire-packaging-wrap': [G.ban, G.cost, G.is17088],
  'compostable-garbage-bags': [G.eco, G.home, G.long],
  'compostable-shrink-film': [G.ban, G.cost, G.is17088],
  'compostable-stretch-film': [G.ban, G.cost, G.is17088],
  'compostable-carry-bags': [G.eco, G.ban, G.cost],
  'compostable-courier-bags-mailers': [G.courier, G.sizes, G.is17088],
  'compostable-d-cut-shopping-bags': [G.ban, G.eco, G.green],
  'compostable-garment-bags': [G.eco, G.ban, G.green],
  'compostable-grocery-bags': [G.ban, G.eco, G.cost],
  'compostable-loop-handle-bags': [G.eco, G.cost, G.green],
  'compostable-pet-poop-bags': [G.eco, G.long, G.vs],
  'compostable-prasadam-pouches': [G.what, G.is17088, G.vs]
};

// ---------- sanity check: every slug used above must exist ----------
Object.keys(GUIDES).concat(Object.keys(COMPARE), Object.keys(BEST_FOR)).forEach(s => { if (!PRODUCTS[s]) throw new Error('Unknown product slug: ' + s); });
Object.values(COMPARE).forEach(a => a.forEach(s => { if (!PRODUCTS[s]) throw new Error('Unknown product slug in COMPARE: ' + s); if (!BEST_FOR[s]) throw new Error('Missing BEST_FOR line for: ' + s); }));
Object.keys(COMPARE).forEach(s => { if (!BEST_FOR[s]) throw new Error('Missing BEST_FOR line for: ' + s); });
Object.values(GUIDES).forEach(a => a.forEach(s => { if (!POSTS[s]) throw new Error('Unknown blog slug: ' + s); }));
PACKIN.products.forEach(p => { if (!GUIDES[p.slug]) throw new Error('No guides listed for: ' + p.slug); });

// ---------- helpers ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const spec = (p, k) => { const s = (p.specs || []).find(x => x.k === k); return s ? s.v : ''; };
const first = (p, keys) => { for (const k of keys) { const v = spec(p, k); if (v) return { k, v }; } return null; };
const SIZE_KEYS = ['Sizes', 'Bag size', 'Pouch size', 'Roll width', 'Capacity', 'Sheet size'];
const THICK_KEYS = ['Thickness', 'Wall', 'Heat tolerance', 'Ply', 'GSM'];
const SET_APART = ['Handle', 'Styles', 'Closure', 'Seal', 'Load rating', 'Stretch', 'Shrink ratio', 'Lining', 'Format', 'Finish', 'Bags per roll', 'Gusset', 'Compliance', 'Colours'];
function cells(p) {
  const size = first(p, SIZE_KEYS), thick = first(p, THICK_KEYS);
  const used = new Set([size && size.k, thick && thick.k]);
  const apart = SET_APART.map(k => ({ k, v: spec(p, k) })).find(x => x.v && !used.has(x.k));
  return {
    size: size ? size.v : '–',
    thick: thick ? (thick.k === 'Thickness' ? thick.v : thick.k + ': ' + thick.v) : '–',
    apart: apart ? apart.k + ': ' + apart.v : '–'
  };
}
const H2 = 'font-family:Newsreader,serif; font-weight:500; font-size:clamp(22px,2.4vw,30px); letter-spacing:-0.01em;';
const TH = 'text-align:left; padding:12px 14px; font-family:Inter,sans-serif; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#14342C99; border-bottom:1px solid #14342C22; white-space:nowrap;';
const TD = 'padding:14px; vertical-align:top; line-height:1.5; color:#14342C; border-bottom:1px solid #14342C12;';

function compareHtml(p) {
  const others = COMPARE[p.slug]; if (!others) return '';
  const row = (q, isSelf) => {
    const c = cells(q);
    const name = isSelf
      ? '<strong>' + esc(q.name) + '</strong><div style="font-size:12px; color:#3f7a26; margin-top:2px;">This product</div>'
      : '<a href="' + esc(q.slug) + '.html" style="color:#3f7a26; font-weight:600; text-decoration:none;">' + esc(q.name) + '</a>';
    return '<tr' + (isSelf ? ' style="background:#F7F4EC;"' : '') + '><td style="' + TD + ' min-width:170px;">' + name + '</td><td style="' + TD + ' min-width:190px;">' + esc(BEST_FOR[q.slug]) + '</td><td style="' + TD + '">' + esc(c.size) + '</td><td style="' + TD + '">' + esc(c.thick) + '</td><td style="' + TD + ' min-width:170px;">' + esc(c.apart) + '</td></tr>';
  };
  return `
      <h2 style="${H2} margin:0 0 14px;">Compare ${esc(p.name)} with similar products</h2>
      <p style="font-size:15px; line-height:1.7; color:#14342C; margin:0 0 22px; max-width:760px;">Figures are taken from each product’s own page, so you can see the differences side by side. The minimum order is 100 kg per specification on every product.</p>
      <div style="overflow-x:auto; border:1px solid #14342C14; border-radius:4px; background:#fff;">
        <table style="width:100%; min-width:760px; border-collapse:collapse; font-size:14px;">
          <thead><tr><th style="${TH}">Product</th><th style="${TH}">Best for</th><th style="${TH}">Size / width</th><th style="${TH}">Thickness / build</th><th style="${TH}">What sets it apart</th></tr></thead>
          <tbody>${row(p, true)}${others.map(s => row(PRODUCTS[s], false)).join('')}</tbody>
        </table>
      </div>`;
}

function guidesHtml(p, hasCompare) {
  const short = p.name.replace(/\s*\(.*?\)/g, '').toLowerCase();
  const cards = GUIDES[p.slug].map(s => {
    const g = POSTS[s];
    return `
          <a href="../${esc(g.slug)}.html" class="pc-card" style="text-decoration:none; border:1px solid #14342C18; border-radius:4px; background:#F7F4EC; padding:20px 22px; display:flex; flex-direction:column; gap:10px;">
            <span style="font-family:Inter,sans-serif; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#3f7a26;">${esc(g.cat)}</span>
            <h3 style="font-family:Newsreader,serif; font-weight:500; font-size:19px; line-height:1.25; margin:0; color:#14342C;">${esc(g.title)}</h3>
            <p style="font-size:14px; line-height:1.6; color:#14342C; margin:0; flex:1;">${esc(g.excerpt)}</p>
            <span style="font-size:13.5px; font-weight:600; color:#3f7a26;">Read the guide →</span>
          </a>`;
  }).join('');
  return `
      <h2 style="${H2} margin:${hasCompare ? 'clamp(40px,5vw,60px)' : '0'} 0 14px;">Buyer guides for ${esc(short)}</h2>
      <p style="font-size:15px; line-height:1.7; color:#14342C; margin:0 0 22px; max-width:760px;">Plain-English articles from our blog that help when you choose, order and dispose of ${esc(short)}.</p>
      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px;">${cards}
      </div>`;
}

const START = '<!-- PC-GUIDES:START (made by add-product-guides.js: do not edit by hand. Edit the lists in that file, then run: node add-product-guides.js) -->';
const END = '<!-- PC-GUIDES:END -->';

let changed = 0;
PACKIN.products.forEach(p => {
  const file = path.join(ROOT, 'products', p.slug + '.html');
  if (!fs.existsSync(file)) { console.log('missing page, skipped: ' + file); return; }
  let s = fs.readFileSync(file, 'utf8');
  // remove any block made by an earlier run
  s = s.replace(new RegExp('\\n?[ \\t]*' + START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\n?'), '\n');
  // find where to insert: just before the "What our clients say" section, else before "More in ..."
  let anchor = s.indexOf('What our clients say');
  if (anchor === -1) anchor = s.indexOf('>More in ');
  if (anchor === -1) { console.log('no anchor found, skipped: ' + p.slug); return; }
  const at = s.lastIndexOf('<section', anchor);
  if (at === -1) { console.log('no section start, skipped: ' + p.slug); return; }
  const cmp = compareHtml(p);
  const block = START + `
    <section style="background:#fff; border-top:1px solid #14342C12; padding:clamp(48px,6vw,84px) clamp(20px,4vw,40px);">
      <div style="max-width:1280px; margin:0 auto;">${cmp}${guidesHtml(p, !!cmp)}
      </div>
    </section>
    ` + END + '\n\n    ';
  s = s.slice(0, at) + block + s.slice(at);
  fs.writeFileSync(file, s, 'utf8'); changed++;
});
console.log('Added compare + guides blocks to ' + changed + ' product pages.');
