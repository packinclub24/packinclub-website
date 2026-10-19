#!/usr/bin/env node
/*
  Packin Club: remove an unused script from the blog posts and product pages.

  Those pages are plain HTML, but they still load "support.js", which downloads React from an outside server
  (unpkg.com) on every visit even though these pages never use it. Removing it makes them load faster
  and removes a dependency on a third-party server.

  It only touches pages that do NOT contain an <x-dc> block (so home, about, industries, products, blog and contact
  are never touched), and it also removes the same line from generate-products.js so regenerated product pages stay clean.

    node remove-unused-scripts.js            -> DRY RUN (shows what would change, changes nothing)
    node remove-unused-scripts.js --apply    -> makes the change. Backup goes to _backup_before_scripts/
    node remove-unused-scripts.js --undo     -> restores the backup
*/
const fs = require('fs'), path = require('path');
const ROOT = process.cwd(), BACKUP = '_backup_before_scripts';
const APPLY = process.argv.includes('--apply'), UNDO = process.argv.includes('--undo');

if (UNDO) {
  const b = path.join(ROOT, BACKUP);
  if (!fs.existsSync(b)) { console.log('No backup found. Nothing to undo.'); process.exit(0); }
  let n = 0;
  (function restore(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) restore(p); else { fs.copyFileSync(p, path.join(ROOT, path.relative(b, p))); n++; } } })(b);
  console.log('Restored ' + n + ' file(s).'); process.exit(0);
}

const files = [];
for (const f of fs.readdirSync(ROOT)) if (/\.html$/.test(f)) files.push(f);
const pd = path.join(ROOT, 'products');
if (fs.existsSync(pd)) for (const f of fs.readdirSync(pd)) if (/\.html$/.test(f)) files.push('products/' + f);
if (fs.existsSync(path.join(ROOT, 'generate-products.js'))) files.push('generate-products.js');

const tagRx = /^[ \t]*<script src="(?:\.\.\/|\.\/)?support\.js"><\/script>[ \t]*\r?\n?/gm;
let changed = 0, skipped = 0;
for (const rel of files) {
  const file = path.join(ROOT, rel), src = fs.readFileSync(file, 'utf8');
  if (rel !== 'generate-products.js' && /<x-dc[\s>]/.test(src)) { if (/support\.js/.test(src)) skipped++; continue; }
  if (!tagRx.test(src)) continue;
  tagRx.lastIndex = 0;
  const out = src.replace(tagRx, '');
  changed++;
  console.log('  ' + (APPLY ? 'edited ' : 'would edit ') + rel);
  if (APPLY) { const b = path.join(ROOT, BACKUP, rel); fs.mkdirSync(path.dirname(b), { recursive: true }); if (!fs.existsSync(b)) fs.copyFileSync(file, b); fs.writeFileSync(file, out, 'utf8'); }
}
console.log('\n' + (APPLY ? 'DONE. ' : 'DRY RUN. ') + changed + ' file(s) ' + (APPLY ? 'edited' : 'would be edited') + '. ' + skipped + ' page(s) that really use support.js were left alone.');
if (!APPLY) console.log('Looks right? Run:  node remove-unused-scripts.js --apply');
else console.log('Backup: ' + BACKUP + '/   (undo with: node remove-unused-scripts.js --undo)');
