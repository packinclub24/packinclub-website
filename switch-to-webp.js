#!/usr/bin/env node
/*
  Packin Club: switch website images from heavy PNG/JPG files to light WebP files.

  Run it in the project root (the folder that has index.html).

    node switch-to-webp.js            -> DRY RUN. Shows what would change. Changes nothing.
    node switch-to-webp.js --apply    -> Makes the changes. A backup of every file it edits goes to _backup_before_webp/
    node switch-to-webp.js --undo     -> Puts all edited files back from the backup.

  How it works (safe by design):
   - It only changes an image name when the matching .webp file really exists in the same folder.
   - It never touches your original PNG/JPG files.
   - It leaves social-share images (og:image, twitter:image), Google structured data, favicons and sitemap.xml alone,
     because some social sites do not read WebP.
*/
const fs = require('fs'), path = require('path');
const ROOT = process.cwd();
const BACKUP = '_backup_before_webp';
const args = process.argv.slice(2);
const APPLY = args.includes('--apply'), UNDO = args.includes('--undo');

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === BACKUP || name.startsWith('.git')) continue;
    const p = path.join(dir, name), st = fs.statSync(p);
    if (st.isDirectory()) { if (['products'].includes(name) || dir !== ROOT) walk(p, out); }
    else out.push(p);
  }
  return out;
}

if (UNDO) {
  const b = path.join(ROOT, BACKUP);
  if (!fs.existsSync(b)) { console.log('No backup folder found (' + BACKUP + '). Nothing to undo.'); process.exit(0); }
  let n = 0;
  (function restore(dir) {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) restore(p);
      else { const rel = path.relative(b, p); fs.copyFileSync(p, path.join(ROOT, rel)); n++; }
    }
  })(b);
  console.log('Restored ' + n + ' file(s) from ' + BACKUP + '. Your pages use the original images again.');
  process.exit(0);
}

// files we are allowed to edit
const candidates = walk(ROOT, []).filter(f => {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  if (/^(support\.js|nav-dropdown\.js|check-blog-post\.js|switch-to-webp\.js)$/.test(rel)) return false;
  return /\.(html|js|css)$/.test(rel) && (!rel.includes('/') || rel.startsWith('products/'));
});

const FOLDERS = 'assets|product_images|thumbnail_blog|uploads';
const refRx = new RegExp('((?:' + FOLDERS + ')/[^"\'()\\s<>?#]+?)\\.(png|jpe?g)(?![A-Za-z0-9])', 'gi');
const keyRx = /(["'])([^"'\/\\]+)\.(png|jpe?g)\1(\s*:)/gi;      // IMG_ALT keys in generate-products.js
const SKIP_LINE = /property=["']og:image|name=["']twitter:image|rel=["'](?:icon|apple-touch-icon|shortcut icon)|application\/ld\+json|"@context"|"image"\s*:|"thumbnailUrl"|"logo"\s*:|<image:loc>|itemprop=["']image/i;

// index of webp files by basename (for the IMG_ALT keys)
const webpBase = new Set();
for (const folder of FOLDERS.split('|')) {
  const d = path.join(ROOT, folder);
  if (fs.existsSync(d)) for (const f of fs.readdirSync(d)) if (/\.webp$/i.test(f)) webpBase.add(f.replace(/\.webp$/i, '').toLowerCase());
}
if (!webpBase.size) { console.log('No .webp files found in assets/, product_images/, thumbnail_blog/ or uploads/. Unzip webp_images.zip into this folder first.'); process.exit(1); }

const webpExists = (rel) => fs.existsSync(path.join(ROOT, decodeURIComponent(rel).replace(/\.(png|jpe?g)$/i, '.webp')));

let totalChanges = 0, filesChanged = 0; const report = [];
for (const file of candidates) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const src = fs.readFileSync(file, 'utf8');
  let count = 0;
  const out = src.split('\n').map(line => {
    if (SKIP_LINE.test(line)) return line;
    let l = line.replace(refRx, (m, p1, ext) => {
      // p1 starts at the folder name; check that webp exists
      if (webpExists(p1 + '.' + ext)) { count++; return p1 + '.webp'; }
      return m;
    });
    if (rel === 'generate-products.js') {
      l = l.replace(keyRx, (m, q, base, ext, tail) => webpBase.has(base.toLowerCase()) ? (count++, q + base + '.webp' + q + tail) : m);
    }
    return l;
  }).join('\n');
  if (count > 0) { filesChanged++; totalChanges += count; report.push([rel, count]); if (APPLY) {
    const b = path.join(ROOT, BACKUP, rel); fs.mkdirSync(path.dirname(b), { recursive: true });
    if (!fs.existsSync(b)) fs.copyFileSync(file, b);
    fs.writeFileSync(file, out, 'utf8'); } }
}
report.sort((a, b) => b[1] - a[1]);
console.log((APPLY ? 'DONE. ' : 'DRY RUN (nothing was changed). ') + totalChanges + ' image reference(s) in ' + filesChanged + ' file(s)' + (APPLY ? ' were switched to WebP.' : ' would be switched to WebP.'));
report.slice(0, 40).forEach(r => console.log('  ' + String(r[1]).padStart(3) + '  ' + r[0]));
if (report.length > 40) console.log('  ... and ' + (report.length - 40) + ' more file(s)');
if (APPLY) console.log('\nBackup of the edited files: ' + BACKUP + '/  (run "node switch-to-webp.js --undo" to restore)\nNext: run "node generate-products.js", then open the site locally and check.');
else console.log('\nLooks right? Run:  node switch-to-webp.js --apply');
