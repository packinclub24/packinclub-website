/*
  Packin Club: WhatsApp button + "Contact us" popup.

  One file, no libraries. It adds a round WhatsApp button at the bottom-right of the page (desktop and mobile).
  Tapping the button opens a WhatsApp chat with Packin Club. A small "Contact us" popup appears next to it once,
  then stays out of the way.

  TO CHANGE THE NUMBER: edit PHONE below (country code + number, digits only, no + or spaces).
  TO CHANGE THE TEXT:   edit the strings in the TEXT block below.
  TO SHOW ON A NEW PAGE: add  <script src="whatsapp-widget.js" defer></script>  before </body>  (or run: node add-whatsapp.js)
*/
(function () {
  'use strict';
  if (window.__pcWhatsApp) return;
  window.__pcWhatsApp = true;

  // ---------------------------------------------------------------- settings
  var PHONE = '918796680936';                 // +91 87966 80936
  var DISPLAY = '+91 87966 80936';
  var TEXT = {
    label: 'Chat with Packin Club team on WhatsApp',
    tip: 'Contact us',
    title: 'Contact us',
    sub: 'Chat with our team on WhatsApp',
    body: 'Hello! Need samples, pricing or help choosing the right bag? Message us and we will get back to you.',
    cta: 'Start chat on WhatsApp',
    note: 'Opens WhatsApp  \u00b7  ' + DISPLAY
  };
  var POPUP_DELAY_MS = 6000;                  // normal pages: popup after 6 seconds
  var ARTICLE_SCROLL = 0.35;                  // blog articles: popup after the reader has scrolled 35%
  var POPUP_VISIBLE_MS = 14000;               // popup closes itself after 14 seconds
  var QUIET_DAYS = 3;                         // after the visitor closes it, stay quiet for 3 days

  // ---------------------------------------------------------------- helpers
  function store(kind) { try { return window[kind]; } catch (e) { return null; } }
  function get(kind, k) { try { return store(kind).getItem(k); } catch (e) { return null; } }
  function set(kind, k, v) { try { store(kind).setItem(k, v); } catch (e) {} }

  function pageTitle() {
    var h = document.querySelector('h1');
    return ((h && h.textContent) || '').replace(/\s+/g, ' ').trim().slice(0, 90);
  }
  function isArticle() { return !!document.querySelector('.pc-article'); }
  function isProduct() { return /\/products\/[^/]+\.html$/.test(location.pathname); }
  function message() {
    var t = pageTitle();
    if (isProduct() && t) return 'Hello Packin Club, I would like a quote for ' + t + '.';
    if (isArticle() && t) return 'Hello Packin Club, I just read \u201c' + t + '\u201d on your website and have a question.';
    return 'Hello Packin Club, I would like to know more about your compostable packaging.';
  }
  function link() { return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message()); }

  // ---------------------------------------------------------------- styles
  var css = '' +
    '.pcwa{--lift:0px;position:fixed;right:22px;bottom:calc(22px + var(--lift) + env(safe-area-inset-bottom,0px));z-index:60;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-tap-highlight-color:transparent;transition:bottom .25s ease}' +
    '.pcwa *{box-sizing:border-box}' +
    '.pcwa-btn{position:relative;display:flex;align-items:center;justify-content:center;width:62px;height:62px;border-radius:50%;background:linear-gradient(145deg,#2EE57A 0%,#1FBE5C 55%,#16A84F 100%);color:#fff;text-decoration:none;box-shadow:0 10px 26px rgba(12,31,25,.30),0 2px 6px rgba(12,31,25,.22),inset 0 1px 0 rgba(255,255,255,.35);transition:transform .2s ease,box-shadow .2s ease;outline:none}' +
    '.pcwa-btn:hover{transform:translateY(-2px) scale(1.06);box-shadow:0 16px 34px rgba(12,31,25,.34),0 3px 8px rgba(12,31,25,.24),inset 0 1px 0 rgba(255,255,255,.4)}' +
    '.pcwa-btn:active{transform:scale(.97)}' +
    '.pcwa-btn:focus-visible{box-shadow:0 0 0 3px #fff,0 0 0 6px #14342C,0 10px 26px rgba(12,31,25,.30)}' +
    '.pcwa-btn svg{width:34px;height:34px;display:block;fill:#fff;filter:drop-shadow(0 1px 1px rgba(0,0,0,.18))}' +
    '.pcwa-btn::before,.pcwa-btn::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #25D366;opacity:0;pointer-events:none;animation:pcwa-ring 3.2s ease-out infinite}' +
    '.pcwa-btn::after{animation-delay:1.1s}' +
    '@keyframes pcwa-ring{0%{transform:scale(1);opacity:.55}70%,100%{transform:scale(1.7);opacity:0}}' +
    '.pcwa-tip{position:absolute;right:76px;top:50%;transform:translate(8px,-50%);background:#14342C;color:#F7F4EC;font-size:13.5px;font-weight:600;letter-spacing:.01em;padding:9px 14px;border-radius:999px;white-space:nowrap;opacity:0;pointer-events:none;box-shadow:0 8px 20px rgba(12,31,25,.25);transition:opacity .18s ease,transform .18s ease}' +
    '.pcwa-tip::after{content:"";position:absolute;right:-5px;top:50%;width:10px;height:10px;background:#14342C;transform:translateY(-50%) rotate(45deg);border-radius:2px}' +
    '.pcwa:not(.pcwa-open) .pcwa-btn:hover~.pcwa-tip,.pcwa:not(.pcwa-open) .pcwa-btn:focus-visible~.pcwa-tip{opacity:1;transform:translate(0,-50%)}' +
    '.pcwa-pop{position:absolute;right:0;bottom:80px;width:318px;max-width:calc(100vw - 28px);background:#fff;border-radius:18px;overflow:visible;box-shadow:0 22px 56px rgba(12,31,25,.32),0 4px 14px rgba(12,31,25,.14);border:1px solid rgba(20,52,44,.10);opacity:0;visibility:hidden;transform:translateY(14px) scale(.96);transform-origin:100% 100%;transition:opacity .25s ease,transform .3s cubic-bezier(.2,.8,.2,1),visibility 0s linear .3s}' +
    '.pcwa-open .pcwa-pop{opacity:1;visibility:visible;transform:none;transition:opacity .25s ease,transform .3s cubic-bezier(.2,.8,.2,1),visibility 0s}' +
    '.pcwa-pop::after{content:"";position:absolute;right:23px;bottom:-7px;width:14px;height:14px;background:#fff;transform:rotate(45deg);border-radius:0 0 4px 0;border-right:1px solid rgba(20,52,44,.10);border-bottom:1px solid rgba(20,52,44,.10)}' +
    '.pcwa-head{display:flex;align-items:center;gap:12px;padding:15px 16px;background:linear-gradient(135deg,#14342C 0%,#1c4a3d 100%);border-radius:17px 17px 0 0;position:relative}' +
    '.pcwa-avatar{flex:none;width:42px;height:42px;border-radius:50%;background:#F7F4EC;display:flex;align-items:center;justify-content:center;position:relative}' +
    '.pcwa-avatar svg{width:24px;height:24px}' +
    '.pcwa-avatar::after{content:"";position:absolute;right:0;bottom:0;width:11px;height:11px;border-radius:50%;background:#25D366;border:2px solid #14342C}' +
    '.pcwa-title{font-family:Fraunces,Georgia,serif;font-size:18px;font-weight:600;line-height:1.15;color:#F7F4EC;margin:0}' +
    '.pcwa-sub{font-size:12.5px;line-height:1.3;color:rgba(247,244,236,.72);margin-top:3px}' +
    '.pcwa-x{position:absolute;top:9px;right:9px;width:28px;height:28px;border:0;border-radius:50%;background:rgba(255,255,255,.10);color:#F7F4EC;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}' +
    '.pcwa-x:hover{background:rgba(255,255,255,.22)}' +
    '.pcwa-x:focus-visible{outline:2px solid #6FAF45;outline-offset:2px}' +
    '.pcwa-x svg{width:12px;height:12px;stroke:currentColor;stroke-width:2.4;fill:none;stroke-linecap:round}' +
    '.pcwa-main{padding:16px 16px 14px;background:#F7F4EC;border-radius:0 0 17px 17px}' +
    '.pcwa-bubble{position:relative;background:#fff;color:#14342C;font-size:14px;line-height:1.55;padding:11px 14px;border-radius:4px 14px 14px 14px;box-shadow:0 1px 2px rgba(12,31,25,.10);margin-bottom:14px}' +
    '.pcwa-cta{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;background:#25D366;color:#0c1f19;font-weight:700;font-size:14.5px;text-decoration:none;padding:13px 16px;border-radius:12px;transition:background .15s,transform .15s;box-shadow:0 6px 14px rgba(37,211,102,.35)}' +
    '.pcwa-cta:hover{background:#2be071;transform:translateY(-1px)}' +
    '.pcwa-cta:focus-visible{outline:3px solid #14342C;outline-offset:2px}' +
    '.pcwa-cta svg{width:20px;height:20px;fill:#0c1f19}' +
    '.pcwa-note{margin-top:10px;text-align:center;font-size:11.5px;color:rgba(20,52,44,.6);letter-spacing:.01em}' +
    '@media (max-width:640px){' +
      '.pcwa{right:14px;bottom:calc(14px + var(--lift) + env(safe-area-inset-bottom,0px))}' +
      '.pcwa-btn{width:56px;height:56px}.pcwa-btn svg{width:31px;height:31px}' +
      '.pcwa-pop{bottom:72px;width:min(318px,calc(100vw - 28px))}' +
      '.pcwa-tip{display:none}' +
    '}' +
    '@media (prefers-reduced-motion:reduce){.pcwa-btn::before,.pcwa-btn::after{animation:none}.pcwa,.pcwa-btn,.pcwa-pop{transition:none}}' +
    '@media print{.pcwa{display:none!important}}';

  // ---------------------------------------------------------------- markup
  // official WhatsApp logo glyph (Simple Icons, CC0)
  var WA = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
  var SPROUT = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 44V22" stroke="#6FAF45" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M24 24C24 14 16 8 7 9c-1 9 5 16 17 15Z" fill="#6FAF45"/><path d="M24 20c0-8 6-13 15-12 1 8-4 14-15 12Z" fill="#8FCB63"/></svg>';
  var CLOSE = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8"/></svg>';

  function build() {
    var style = document.createElement('style');
    style.id = 'pcwa-style';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    var root = document.createElement('div');
    root.className = 'pcwa';
    root.setAttribute('data-pcwa', '');
    root.innerHTML =
      '<div class="pcwa-pop" role="dialog" aria-label="' + TEXT.title + '" aria-hidden="true">' +
        '<div class="pcwa-head">' +
          '<div class="pcwa-avatar">' + SPROUT + '</div>' +
          '<div><div class="pcwa-title">' + TEXT.title + '</div><div class="pcwa-sub">' + TEXT.sub + '</div></div>' +
          '<button type="button" class="pcwa-x" aria-label="Close">' + CLOSE + '</button>' +
        '</div>' +
        '<div class="pcwa-main">' +
          '<div class="pcwa-bubble">' + TEXT.body + '</div>' +
          '<a class="pcwa-cta" data-pcwa-link href="#" target="_blank" rel="noopener">' + WA + '<span>' + TEXT.cta + '</span></a>' +
          '<div class="pcwa-note">' + TEXT.note + '</div>' +
        '</div>' +
      '</div>' +
      '<a class="pcwa-btn" data-pcwa-link href="#" target="_blank" rel="noopener" aria-label="' + TEXT.label + '">' + WA + '</a>' +
      '<span class="pcwa-tip" aria-hidden="true">' + TEXT.tip + '</span>';
    document.body.appendChild(root);

    var pop = root.querySelector('.pcwa-pop');
    var links = root.querySelectorAll('[data-pcwa-link]');
    function refreshLinks() { var h = link(); for (var i = 0; i < links.length; i++) links[i].setAttribute('href', h); }
    refreshLinks();

    // ---- open / close
    var timer = null;
    function open(auto) {
      root.classList.add('pcwa-open'); pop.setAttribute('aria-hidden', 'false');
      clearTimeout(timer);
      if (auto) timer = setTimeout(function () { close(false); }, POPUP_VISIBLE_MS);
    }
    function close(remember) {
      clearTimeout(timer);
      root.classList.remove('pcwa-open'); pop.setAttribute('aria-hidden', 'true');
      if (remember) set('localStorage', 'pcWaQuietUntil', String(Date.now() + QUIET_DAYS * 864e5));
    }
    root.querySelector('.pcwa-x').addEventListener('click', function () { close(true); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('pcwa-open')) close(true); });
    // desktop: hovering the button shows the popup again; moving away lets it fade on its own
    root.addEventListener('mouseenter', function () { if (window.matchMedia && window.matchMedia('(hover:hover)').matches) { clearTimeout(timer); } });
    root.addEventListener('mouseleave', function () { if (root.classList.contains('pcwa-open') && window.matchMedia && window.matchMedia('(hover:hover)').matches) { timer = setTimeout(function () { close(false); }, 2500); } });

    // ---- analytics event (only fires if the visitor accepted analytics cookies, because gtag is only loaded then)
    root.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-pcwa-link]');
      if (a) { refreshLinks(); if (typeof window.gtag === 'function') { try { window.gtag('event', 'whatsapp_click', { page_path: location.pathname }); } catch (x) {} } }
    });

    // ---- keep clear of the cookie banner
    function lift() {
      var b = document.getElementById('pc-cookie-banner');
      var h = (b && b.offsetHeight && getComputedStyle(b).display !== 'none') ? b.offsetHeight : 0;
      root.style.setProperty('--lift', h + 'px');
    }
    lift(); setInterval(lift, 500); window.addEventListener('resize', lift);

    // ---- when to show the popup by itself (once per visit, and not if the visitor closed it recently)
    var quiet = parseInt(get('localStorage', 'pcWaQuietUntil') || '0', 10) > Date.now();
    var seen = get('sessionStorage', 'pcWaShown') === '1';
    if (quiet || seen) return;
    var fired = false;
    function show() { if (fired) return; fired = true; set('sessionStorage', 'pcWaShown', '1'); open(true); }
    if (isArticle()) {
      var onScroll = function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0 && window.scrollY / max >= ARTICLE_SCROLL) { window.removeEventListener('scroll', onScroll); show(); }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      setTimeout(show, 25000);
    } else {
      setTimeout(show, POPUP_DELAY_MS);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
