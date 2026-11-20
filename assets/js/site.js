(function () {
  'use strict';
  var root = document.documentElement;
  root.className += ' js';

  // GA4 events. One delegated listener. Safe if gtag is blocked or missing.
  document.addEventListener('click', function (e) {
    if (typeof gtag !== 'function' || !e.target || !e.target.closest) { return; }
    var a = e.target.closest('a[href]');
    if (!a) { return; }
    var href = (a.getAttribute('href') || '').toLowerCase();
    var params = { page_location: window.location.href, brand: 'lits' };
    if (href.indexOf('tel:') === 0) { gtag('event', 'phone_click', params); }
    if (href.indexOf('mailto:') === 0) { gtag('event', 'email_click', params); }
    if (href.indexOf('#sample') !== -1 || (href.indexOf('mailto:') === 0 && a.closest('#sample'))) {
      gtag('event', 'sample_request_click', params);
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    var small = window.matchMedia('(max-width: 768px)');

    function setOpen(open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.setAttribute('data-open', open ? 'true' : 'false');
    }
    function sync() { setOpen(!small.matches); }

    if (btn && nav) {
      sync();
      if (small.addEventListener) { small.addEventListener('change', sync); }
      btn.addEventListener('click', function () {
        setOpen(btn.getAttribute('aria-expanded') !== 'true');
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && small.matches && btn.getAttribute('aria-expanded') === 'true') {
          setOpen(false);
          btn.focus();
        }
      });
      nav.addEventListener('click', function (e) {
        if (small.matches && e.target.closest && e.target.closest('a')) { setOpen(false); }
      });
    }
  });
})();
