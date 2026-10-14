/* Saubere Adresszeile: keine ?Parameter, kein #Anker, kein /index.html */
(function(){
  var target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
  var clean = location.pathname.replace(/index\.html$/, '');
  if (location.search || location.hash || clean !== location.pathname) history.replaceState(null, '', clean);
  if (target) addEventListener('load', function(){ setTimeout(function(){ target.scrollIntoView(); }, 50); });
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var url = new URL(a.getAttribute('href'), location.href);
    var samePage = url.origin === location.origin && url.pathname.replace(/index\.html$/, '') === location.pathname;
    if (samePage && url.hash) {
      var el = document.getElementById(url.hash.slice(1));
      if (el) { e.preventDefault(); el.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); }
    }
  });
})();
