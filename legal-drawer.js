(function(){
  const CSS = `
  #ld-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9998;opacity:0;pointer-events:none;transition:opacity .3s}
  #ld-overlay.ld-open{opacity:1;pointer-events:all}
  #ld-panel{position:fixed;top:0;right:0;width:min(620px,100vw);height:100%;background:#0d0d0b;color:rgba(255,255,255,.8);z-index:9999;
    transform:translateX(100%);transition:transform .35s cubic-bezier(.22,1,.36,1);display:flex;flex-direction:column;
    border-left:1px solid rgba(255,255,255,.07)}
  #ld-panel.ld-open{transform:translateX(0)}
  #ld-header{display:flex;align-items:center;justify-content:space-between;padding:20px 28px;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0}
  #ld-tabs{display:flex;gap:4px}
  .ld-tab{background:none;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.45);padding:7px 18px;border-radius:6px;font-size:.78rem;
    letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:all .2s;font-family:inherit}
  .ld-tab.active{background:rgba(212,175,55,.12);border-color:rgba(212,175,55,.4);color:#d4af37}
  .ld-tab:hover:not(.active){border-color:rgba(255,255,255,.25);color:rgba(255,255,255,.7)}
  #ld-close{background:none;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.45);width:36px;height:36px;border-radius:6px;
    font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:inherit}
  #ld-close:hover{border-color:rgba(255,255,255,.3);color:#fff}
  #ld-body{overflow-y:auto;padding:32px 28px 60px;flex:1;scrollbar-width:thin;scrollbar-color:rgba(212,175,55,.3) transparent}
  #ld-body::-webkit-scrollbar{width:4px}
  #ld-body::-webkit-scrollbar-track{background:transparent}
  #ld-body::-webkit-scrollbar-thumb{background:rgba(212,175,55,.3);border-radius:2px}
  .ld-section{display:none}.ld-section.active{display:block}
  .ld-section h1{font-size:1.5rem;font-weight:700;color:#fff;margin-bottom:6px;letter-spacing:-.02em}
  .ld-section .ld-sub{font-size:.8rem;color:rgba(255,255,255,.3);margin-bottom:32px;letter-spacing:.05em}
  .ld-section h2{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(212,175,55,.7);
    margin:28px 0 8px;font-weight:600}
  .ld-section p,.ld-section address,.ld-section li{font-size:.88rem;line-height:1.85;color:rgba(255,255,255,.6);font-style:normal}
  .ld-section ul{padding-left:18px;margin:8px 0}
  .ld-section li{margin-bottom:4px}
  .ld-section a{color:#d4af37;text-decoration:none}
  .ld-section a:hover{text-decoration:underline}
  .ld-divider{border:none;border-top:1px solid rgba(255,255,255,.07);margin:24px 0}
  .ld-infobox{background:rgba(212,175,55,.07);border-left:3px solid rgba(212,175,55,.5);padding:14px 18px;border-radius:0 6px 6px 0;margin:16px 0}
  .ld-infobox p{color:rgba(255,255,255,.7)!important;font-size:.82rem!important}
  .ld-stamp{font-size:.7rem;color:rgba(255,255,255,.2);margin-top:40px;padding-top:20px;border-top:1px solid rgba(255,255,255,.07)}
  @media(max-width:600px){
    #ld-panel{width:100%;top:auto;bottom:0;height:88vh;transform:translateY(100%);border-left:none;border-top:1px solid rgba(255,255,255,.1)}
    #ld-panel.ld-open{transform:translateY(0)}
    #ld-body{padding:24px 20px 60px}
    #ld-header{padding:16px 20px}
  }
  `;

  const HTML = `
  <div id="ld-overlay"></div>
  <div id="ld-panel" role="dialog" aria-modal="true" aria-label="Rechtliches">
    <div id="ld-header">
      <div id="ld-tabs">
        <button class="ld-tab active" data-tab="impressum">Impressum</button>
        <button class="ld-tab" data-tab="datenschutz">Datenschutz</button>
      </div>
      <button id="ld-close" aria-label="Schließen">✕</button>
    </div>
    <div id="ld-body">

      <!-- IMPRESSUM -->
      <div class="ld-section active" id="ld-impressum">
        <h1>Impressum</h1>
        <p class="ld-sub">Angaben gemäß § 5 TMG</p>

        <h2>Anbieter</h2>
        <address>
          Bochmann Dienstleistungen<br>
          Frederic Bochmann<br>
          Karl-Kippenhahn-Straße 17<br>
          08058 Zwickau<br>
          Deutschland
        </address>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href="tel:+4915254190819">0152 54190819</a><br>
          E-Mail: <a href="mailto:frederic@valoris-auftragsstruktur.de">frederic@valoris-auftragsstruktur.de</a>
        </p>

        <h2>Steuer</h2>
        <p>Steuernummer: 227/208/14122<br>
        Gemäß § 19 UStG wird keine Umsatzsteuer erhoben.</p>

        <hr class="ld-divider">

        <h2>Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
        <p>Frederic Bochmann, Karl-Kippenhahn-Straße 17, 08058 Zwickau</p>

        <hr class="ld-divider">

        <h2>Streitschlichtung</h2>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a></p>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

        <hr class="ld-divider">

        <h2>Haftung für Inhalte</h2>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>

        <p class="ld-stamp">© 2026 Bochmann Dienstleistungen · VALORIS Webdesign &amp; SEO · Zwickau</p>
      </div>

      <!-- DATENSCHUTZ -->
      <div class="ld-section" id="ld-datenschutz">
        <h1>Datenschutzerklärung</h1>
        <p class="ld-sub">Gemäß DSGVO (EU) 2016/679 und BDSG</p>

        <div class="ld-infobox">
          <p>Verantwortlicher: Frederic Bochmann · Karl-Kippenhahn-Straße 17 · 08058 Zwickau · frederic@valoris-auftragsstruktur.de · 0152 54190819</p>
        </div>

        <h2>1. Allgemeine Hinweise</h2>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

        <h2>2. Datenerfassung auf dieser Website</h2>
        <p><strong style="color:rgba(255,255,255,.75)">Wer ist verantwortlich?</strong><br>
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Kontaktdaten: siehe Impressum.</p>

        <p><strong style="color:rgba(255,255,255,.75)">Wie erfassen wir Ihre Daten?</strong><br>
        Ihre Daten werden erhoben, wenn Sie uns diese mitteilen (z. B. Kontaktformular) sowie automatisch beim Besuch der Website durch IT-Systeme (technische Daten: Browser, Betriebssystem, Aufrufzeit).</p>

        <p><strong style="color:rgba(255,255,255,.75)">Wofür nutzen wir Ihre Daten?</strong><br>
        Zur fehlerfreien Bereitstellung der Website und zur Bearbeitung Ihrer Anfragen.</p>

        <h2>3. Kontaktformular</h2>
        <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben zwecks Bearbeitung der Anfrage gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.</p>
        <p>Das Formular wird über den Dienstleister <strong style="color:rgba(255,255,255,.75)">Formspree, Inc.</strong> verarbeitet: <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener">formspree.io/legal/privacy-policy</a></p>

        <h2>4. Cookies</h2>
        <p>Diese Website verwendet ausschließlich technisch notwendige Cookies. Optionale Cookies (z. B. Google Maps) werden nur nach Ihrer ausdrücklichen Einwilligung über den Cookie-Banner gesetzt.</p>

        <h2>5. Google Maps</h2>
        <p>Diese Website nutzt Google Maps (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Google Maps wird erst nach Ihrer Einwilligung über den Cookie-Banner aktiviert. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.</p>

        <h2>6. Ihre Rechte</h2>
        <ul>
          <li>Auskunft über gespeicherte Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung oder Löschung (Art. 16, 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Beschwerde bei der Aufsichtsbehörde</li>
        </ul>
        <p>Zuständige Aufsichtsbehörde: Sächsischer Datenschutzbeauftragter, Devrientstraße 5, 01067 Dresden</p>

        <p class="ld-stamp">Stand: April 2026 · Diese Datenschutzerklärung wird regelmäßig aktualisiert.</p>
      </div>

    </div>
  </div>
  `;

  function inject(){
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    const wrap = document.createElement('div');
    wrap.innerHTML = HTML;
    document.body.appendChild(wrap);

    const overlay = document.getElementById('ld-overlay');
    const panel = document.getElementById('ld-panel');
    const closeBtn = document.getElementById('ld-close');

    overlay.addEventListener('click', close);
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });

    document.querySelectorAll('.ld-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ld-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.ld-section').forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('ld-' + btn.dataset.tab).classList.add('active');
      });
    });
  }

  function open(tab){
    if(!document.getElementById('ld-panel')) inject();
    document.querySelectorAll('.ld-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.ld-section').forEach(s => s.classList.remove('active'));
    const targetTab = tab || 'impressum';
    const tabBtn = document.querySelector('.ld-tab[data-tab="'+targetTab+'"]');
    if(tabBtn) tabBtn.classList.add('active');
    const section = document.getElementById('ld-'+targetTab);
    if(section) section.classList.add('active');
    document.getElementById('ld-overlay').classList.add('ld-open');
    document.getElementById('ld-panel').classList.add('ld-open');
    document.body.style.overflow = 'hidden';
    // scroll section to top
    document.getElementById('ld-body').scrollTop = 0;
  }

  function close(){
    const overlay = document.getElementById('ld-overlay');
    const panel = document.getElementById('ld-panel');
    if(overlay) overlay.classList.remove('ld-open');
    if(panel) panel.classList.remove('ld-open');
    document.body.style.overflow = '';
  }

  window.openLegalDrawer = open;
})();
