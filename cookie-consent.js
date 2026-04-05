(function () {
  var KEY = 'valoris_cookie_v1';
  if (localStorage.getItem(KEY)) return;

  var css = `
#vcb{position:fixed;bottom:0;left:0;right:0;z-index:9000;background:#0d0d0b;border-top:1px solid rgba(184,135,58,.25);padding:20px 32px;display:flex;align-items:center;justify-content:space-between;gap:24px;font-family:'Inter',sans-serif;font-size:.82rem;color:rgba(255,255,255,.6);line-height:1.6;animation:vcb-in .4s cubic-bezier(.16,1,.3,1)}
@keyframes vcb-in{from{transform:translateY(100%)}to{transform:translateY(0)}}
#vcb p{margin:0;max-width:680px}
#vcb a{color:#ddb15a;text-decoration:underline;text-underline-offset:3px}
#vcb-btns{display:flex;gap:10px;flex-shrink:0}
#vcb-accept,#vcb-decline{padding:10px 20px;border-radius:2px;font-family:'Inter',sans-serif;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;font-weight:500;cursor:pointer;white-space:nowrap;border:none}
#vcb-accept{background:#b8873a;color:#fff}
#vcb-accept:hover{background:#7a5820}
#vcb-decline{background:transparent;color:rgba(255,255,255,.4);border:1px solid rgba(255,255,255,.15)}
#vcb-decline:hover{color:rgba(255,255,255,.7);border-color:rgba(255,255,255,.3)}
@media(max-width:700px){#vcb{flex-direction:column;align-items:flex-start;padding:20px 20px 28px}#vcb-btns{width:100%}#vcb-accept,#vcb-decline{flex:1;text-align:center}}
`;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'vcb';
  banner.innerHTML = '<p>Diese Website verwendet ausschließlich technisch notwendige Cookies. Es werden keine Tracking- oder Analyse-Cookies gesetzt. Weitere Infos in unserer <a href="/datenschutz.html">Datenschutzerklärung</a>.</p><div id="vcb-btns"><button id="vcb-decline">Nur notwendige</button><button id="vcb-accept">Verstanden</button></div>';
  document.body.appendChild(banner);

  function dismiss(val) {
    localStorage.setItem(KEY, val);
    banner.style.animation = 'none';
    banner.style.transform = 'translateY(100%)';
    banner.style.transition = 'transform .35s ease';
    setTimeout(function(){ banner.remove(); }, 380);
  }

  document.getElementById('vcb-accept').addEventListener('click', function(){ dismiss('accepted'); });
  document.getElementById('vcb-decline').addEventListener('click', function(){ dismiss('declined'); });
})();
