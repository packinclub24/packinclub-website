/* Packin Club: "Products" dropdown in the header (all pages).
   - Desktop: opens on hover, keyboard focus, or a click on the small arrow.
   - Phone: the burger menu has a Products accordion (plain HTML <details>, no JS needed).
   - On products.html the category links change the grid without reloading the page. */
(function () {
  var DD = '.pc-nav-dd';

  function closeAll(except) {
    var open = document.querySelectorAll(DD + '.pc-dd-open');
    for (var i = 0; i < open.length; i++) {
      if (open[i] === except) continue;
      open[i].classList.remove('pc-dd-open');
      var b = open[i].querySelector('.pc-nav-dd-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
  }
  function onProductsPage() { return /\/products(\.html)?\/?$/.test(window.location.pathname); }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var btn = t.closest('.pc-nav-dd-btn');
    if (btn) {
      e.preventDefault();
      var dd = btn.closest(DD);
      var willOpen = !dd.classList.contains('pc-dd-open');
      closeAll(dd);
      dd.classList.toggle('pc-dd-open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      return;
    }
    if (!t.closest(DD)) closeAll();

    var link = t.closest('a[data-pc-cat]');
    if (link && onProductsPage() && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      closeAll();
      var m = document.querySelector('details.pc-m-dd');
      if (m) m.removeAttribute('open');
      try { window.history.pushState({}, '', link.getAttribute('href')); } catch (err) {}
      window.dispatchEvent(new CustomEvent('pc-set-category', { detail: { cat: link.getAttribute('data-pc-cat') } }));
    }
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
})();
