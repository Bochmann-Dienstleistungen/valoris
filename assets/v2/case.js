(function(){
  const st=document.getElementById('stage'); if(!st) return;
  const $=id=>document.getElementById(id), card=$('card'), notes=$('notes'), ut=$('ut'), vid=st.querySelector('video');
  const IG='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></svg>';
  const WA='<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-3-1-5.6-3.6-6.5-6.2-.3-.9.1-2.1.9-2.6.3-.2.8-.2 1 .2l.9 2.1c.1.3 0 .6-.2.8l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.6c.2-.2.5-.3.8-.2l2 1c.3.2.4.5.3.8Z"/></svg>';
  // Kamera: Punkt (x,y in Anteilen der Karte) mit Zoom s in die Kartenmitte holen
  const R='rotateY(-8deg) rotateX(4deg)';
  function focus(x,y,s,rot){return 'translate(-50%,-50%) translate('+(-(x-.5)*100*s).toFixed(1)+'%,'+(-(y-.5)*100*s).toFixed(1)+'%) '+(rot||R)+' scale('+s+')'}
  const CAM={start:'translate(-50%,-50%) rotateY(-20deg) rotateX(6deg) scale(.82)',
             full:'translate(-50%,-50%) rotateY(-10deg) rotateX(4deg) rotateZ(-1.5deg)',
             name:focus(.56,.12,1.45), leist:focus(.42,.24,1.45), trust:focus(.3,.29,1.5),
             kontakt:focus(.73,.50,1.4), grid:focus(.78,.80,1.35,'rotateY(-12deg) rotateX(5deg)'),
             end:'translate(-50%,-50%) rotateY(9deg) rotateX(3deg) rotateZ(1.5deg) scale(.95)'};
  const T=[
    [0,   ()=>{cam('start');day(0);say('LM Services, Werdau:','vorher unsichtbar.')}],
    [.5,  ()=>cam('full')],
    [1.7, ()=>{cam('name');mk(1);say('Name sagt sofort:','was und wo.')}],
    [3.1, ()=>{cam('leist');mk(2);say('Alle Leistungen','auf einen Blick.')}],
    [4.5, ()=>{cam('trust');mk(3);say('5,0 bei Google +','Stellenaufruf.')}],
    [5.1, ()=>mk(4)],
    [6.3, ()=>{cam('kontakt');mk(5);say('Ein Klick zur','Anfrage.')}],
    [7.6, ()=>{cam('grid');mk(6);say('Recruiting-Reel','ganz oben.')}],
    [9.0, ()=>{cam('full');day(2);note('ig','lm._services_','Hey, sucht ihr noch Leute? 👋')}],
    [9.6, ()=>{day(3);say('Tag 3:','erste Bewerbungen.');note('wa','Bewerbung','Hallo, ich würde gern als Umzugshelfer…')}],
    [10.6,()=>{day(6);note('ig','lm._services_','Bewerbung als Fahrer Klasse B')}],
    [11.5,()=>{day(10);say('Tag 10:','7 Bewerber.');hit(1);note('wa','Bewerbung','Wann kann ich mal vorbeikommen?')}],
    [13.0,()=>{day(18);say('Und die Kunden?','20+ Anfragen.');hit(2);note('ig','Neue Anfrage','Umzug 3-Zimmer, Werdau. Geht das im Mai?')}],
    [14.0,()=>{day(24);note('wa','Neue Anfrage','Entrümpelung Keller, wann habt ihr Zeit?')}],
    [15.3,()=>{cam('end');day(30);say('Nach 30 Tagen:','4 neue Leute im Team.');hit(3);note('wa','Lukas','4 Neue eingestellt. Läuft 🔥')}],
  ];
  let timers=[];
  function cam(k){card.style.transform=CAM[k]}
  function day(d){$('sday').textContent='TAG '+d}
  function say(a,b){ut.classList.remove('on');setTimeout(()=>{ut.children[0].textContent=a;ut.children[1].textContent=b;ut.classList.add('on')},120)}
  function mk(n){$('mk'+n).classList.add('on')}
  function hit(n){const k=$('k'+n);if(k)k.classList.add('hit')}
  function note(app,ti,tx){const d=document.createElement('div');d.className='ios';
    d.innerHTML='<i class="ap '+app+'p">'+(app==='ig'?IG:WA)+'</i><div class="tx"><div>'+(app==='ig'?'Instagram':'WhatsApp')+' · '+ti+'<span>jetzt</span></div><p>'+tx+'</p></div>';
    notes.prepend(d);const all=[...notes.children];if(all.length>2){const o=all[all.length-1];o.classList.add('out');setTimeout(()=>o.remove(),380)}}
  function reset(){timers.forEach(clearTimeout);timers=[];notes.innerHTML='';ut.classList.remove('on');for(let n=1;n<=6;n++)$('mk'+n).classList.remove('on');[1,2,3].forEach(n=>{const k=$('k'+n);if(k)k.classList.remove('hit')})}
  function play(){reset();try{vid.currentTime=0;vid.play()}catch(e){}T.forEach(([t,f])=>timers.push(setTimeout(f,t*1000)))}
  function final(){reset();cam('full');for(let n=1;n<=6;n++)mk(n);[1,2,3].forEach(hit);day(30);ut.children[0].textContent='Nach 30 Tagen:';ut.children[1].textContent='4 neue Leute im Team.';ut.classList.add('on')}
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('pReplay').addEventListener('click',()=>{reduce?final():play();st.scrollIntoView({behavior:'smooth',block:'center'})});
  cam('start');
  if(reduce){final();return}
  let done=false;new IntersectionObserver((es,o)=>{es.forEach(x=>{if(x.isIntersecting&&!done){done=true;setTimeout(play,300);o.disconnect()}})},{threshold:.5}).observe(st);
})();
