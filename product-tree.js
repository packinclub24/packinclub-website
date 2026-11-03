/* Packin Club - interactive product tree. Progressive enhancement: without this file the tree is a plain,
   fully open, crawlable list of links. Safe with the x-dc page: uses a MutationObserver so it re-attaches
   if the page re-renders. */
(function () {
  'use strict';

  function init(root) {
    if (root.getAttribute('data-pt-ready')) return;
    root.setAttribute('data-pt-ready', '1');
    root.classList.add('pt-js');

    var cats = [].slice.call(root.querySelectorAll('[data-pt-cat]'));
    var leaves = [].slice.call(root.querySelectorAll('.pt-leaf'));
    var input = root.querySelector('[data-pt-search]');
    var status = root.querySelector('[data-pt-status]');
    var empty = root.querySelector('.pt-empty');
    var card = root.querySelector('.pt-prev-card');
    var saved = null;

    function setOpen(cat, open) {
      cat.classList.toggle('is-open', open);
      var b = cat.querySelector('.pt-cat-btn');
      if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    /* ---- preview panel ---- */
    /* Positions the card beside the active product and keeps it on screen. (No CSS sticky: it breaks when a
       parent element has overflow set, which is what made the card drift out of view.) */
    function place() {
      if (!card) return;
      var aside = card.parentNode;
      if (!aside || !aside.offsetParent) return;            /* preview is hidden on small screens */
      var a = root.querySelector('.pt-leaf a.is-active');
      if (!a) return;
      var ch = card.offsetHeight;
      aside.style.minHeight = ch + 'px';
      var ar = aside.getBoundingClientRect(), lr = a.getBoundingClientRect();
      var vt = lr.top + lr.height / 2 - ch / 2;              /* centre the card on the product */
      var lo = 110, hi = window.innerHeight - ch - 16;       /* stay inside the screen, below the sticky header */
      if (hi >= lo) vt = Math.max(lo, Math.min(vt, hi));
      var y = Math.max(0, Math.min(vt - ar.top, aside.offsetHeight - ch));
      card.style.transform = 'translateY(' + Math.round(y) + 'px)';
    }
    function show(a) {
      if (!a || !card) return;
      var img = card.querySelector('img');
      var src = a.getAttribute('data-img') || '';
      leaves.forEach(function (l) { l.firstElementChild.classList.remove('is-active'); });
      a.classList.add('is-active');
      card.classList.add('is-swap');
      window.setTimeout(function () {
        if (src) { img.src = src; img.alt = a.textContent.trim(); img.style.display = ''; } else { img.style.display = 'none'; }
        card.querySelector('.pt-prev-name').textContent = a.textContent.trim();
        card.querySelector('.pt-prev-blurb').textContent = a.getAttribute('data-blurb') || '';
        var cat = a.closest('[data-pt-cat]');
        card.querySelector('.pt-prev-cat').textContent = cat ? cat.querySelector('.pt-cat-name').textContent : '';
        card.querySelector('.pt-prev-link').setAttribute('href', a.getAttribute('href'));
        card.querySelector('.pt-prev-link').firstChild.nodeValue = 'View ' + a.textContent.trim() + ' specs ';
        place();
        card.classList.remove('is-swap');
      }, 140);
    }

    /* ---- initial state: every branch starts open (all links visible); visitors can collapse them ---- */
    var biggest = cats[0], max = -1;
    cats.forEach(function (c) {
      var n = c.querySelectorAll('.pt-leaf').length;
      if (n > max) { max = n; biggest = c; }
      setOpen(c, true);
    });
    if (biggest) {
      var first = biggest.querySelector('.pt-leaf a');
      if (card && first) {
        var img = card.querySelector('img');
        first.classList.add('is-active');
        if (first.getAttribute('data-img')) { img.src = first.getAttribute('data-img'); img.alt = first.textContent.trim(); }
        card.querySelector('.pt-prev-name').textContent = first.textContent.trim();
        card.querySelector('.pt-prev-blurb').textContent = first.getAttribute('data-blurb') || '';
        card.querySelector('.pt-prev-cat').textContent = biggest.querySelector('.pt-cat-name').textContent;
        card.querySelector('.pt-prev-link').setAttribute('href', first.getAttribute('href'));
        card.querySelector('.pt-prev-link').firstChild.nodeValue = 'View ' + first.textContent.trim() + ' specs ';
      }
    }

    /* ---- clicks ---- */
    root.addEventListener('click', function (e) {
      var b = e.target.closest('.pt-cat-btn');
      if (b && root.contains(b)) {
        var cat = b.closest('[data-pt-cat]');
        setOpen(cat, !cat.classList.contains('is-open'));
        return;
      }
      if (e.target.closest('[data-pt-expand]')) {
        cats.forEach(function (c) { if (!c.hidden) setOpen(c, true); });
      } else if (e.target.closest('[data-pt-collapse]')) {
        cats.forEach(function (c) { setOpen(c, false); });
      }
    });

    /* ---- preview on hover / keyboard focus ---- */
    root.addEventListener('mouseover', function (e) {
      var a = e.target.closest('.pt-leaf a');
      if (a && !a.classList.contains('is-active')) show(a);
    });
    root.addEventListener('focusin', function (e) {
      var a = e.target.closest('.pt-leaf a');
      if (a && !a.classList.contains('is-active')) show(a);
    });

    /* ---- keyboard: arrows move through the tree, right/left open/close a branch ---- */
    root.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k !== 'ArrowDown' && k !== 'ArrowUp' && k !== 'ArrowRight' && k !== 'ArrowLeft') return;
      var t = e.target;
      if (t === input) { if (k === 'ArrowDown') { var f = root.querySelector('.pt-cat-btn'); if (f) { e.preventDefault(); f.focus(); } } return; }
      var items = [].slice.call(root.querySelectorAll('.pt-cat:not([hidden]) .pt-cat-btn, .pt-cat:not([hidden]) .pt-leaf:not([hidden]) a')).filter(function (el) {
        return window.getComputedStyle(el).visibility !== 'hidden' && !(el.closest('.pt-sub') && !el.closest('.pt-cat').classList.contains('is-open'));
      });
      var i = items.indexOf(t);
      if (i < 0) return;
      if (k === 'ArrowDown' && items[i + 1]) { e.preventDefault(); items[i + 1].focus(); }
      if (k === 'ArrowUp' && items[i - 1]) { e.preventDefault(); items[i - 1].focus(); }
      var cat = t.closest('[data-pt-cat]');
      if (t.classList.contains('pt-cat-btn')) {
        if (k === 'ArrowRight') { e.preventDefault(); setOpen(cat, true); }
        if (k === 'ArrowLeft') { e.preventDefault(); setOpen(cat, false); }
      } else if (k === 'ArrowLeft') { e.preventDefault(); cat.querySelector('.pt-cat-btn').focus(); }
    });

    /* ---- search / filter ---- */
    function applyFilter() {
      var q = (input.value || '').toLowerCase().replace(/\s+/g, ' ').trim();
      var tokens = q ? q.split(' ') : [];
      if (tokens.length && !saved) saved = cats.map(function (c) { return c.classList.contains('is-open'); });
      var total = 0;
      cats.forEach(function (c) {
        var catName = c.querySelector('.pt-cat-name').textContent.toLowerCase();
        var hits = 0;
        [].forEach.call(c.querySelectorAll('.pt-leaf'), function (l) {
          var a = l.firstElementChild;
          var hay = (a.textContent + ' ' + (a.getAttribute('data-kw') || '') + ' ' + catName).toLowerCase();
          var ok = tokens.every(function (t) { return hay.indexOf(t) > -1; });
          l.hidden = !ok;
          if (ok) hits++;
        });
        total += hits;
        c.hidden = tokens.length > 0 && hits === 0;
        if (tokens.length) setOpen(c, hits > 0);
      });
      if (!tokens.length && saved) { cats.forEach(function (c, i) { setOpen(c, saved[i]); }); saved = null; }
      if (status) status.textContent = tokens.length ? total + ' of ' + leaves.length + ' products match' : '';
      if (empty) empty.hidden = !(tokens.length && total === 0);
      var act = root.querySelector('.pt-leaf a.is-active');
      if (!act || act.parentNode.hidden || act.closest('[data-pt-cat]').hidden) {
        var fv = root.querySelector('.pt-cat:not([hidden]) .pt-leaf:not([hidden]) a');
        if (fv) show(fv);
      }
    }
    if (input) {
      input.addEventListener('input', applyFilter);
      input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { input.value = ''; applyFilter(); } });
    }

    /* keep the preview card beside the active product while scrolling / resizing */
    var raf = 0;
    function onMove() {
      if (!document.body.contains(root)) { window.removeEventListener('scroll', onMove); window.removeEventListener('resize', onMove); return; }
      if (raf) return;
      raf = window.requestAnimationFrame(function () { raf = 0; place(); });
    }
    window.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove);
    place();
    window.addEventListener('load', place);
    window.setTimeout(place, 400);
  }

  function scan() { [].forEach.call(document.querySelectorAll('[data-pt]'), init); }
  var timer;
  function later() { window.clearTimeout(timer); timer = window.setTimeout(scan, 80); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
  window.addEventListener('load', scan);
  if ('MutationObserver' in window) new MutationObserver(later).observe(document.documentElement, { childList: true, subtree: true });
})();
