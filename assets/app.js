(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const root = document.documentElement;
  root.classList.add('js-enabled');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 900px)');
  const small = matchMedia('(max-width: 767px)');
  const saveData = navigator.connection?.saveData || false;
  const themeButton = $('#theme-toggle');
  function themeState() {
    const light = root.dataset.theme === 'light';
    themeButton.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
    themeButton.setAttribute('aria-pressed', String(light));
  }
  themeState();
  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try {localStorage.setItem('portfolio-theme', root.dataset.theme);} catch {}
    themeState();
  });
  const menu = $('#menu-toggle'), nav = $('#navigation');
  function closeMenu(returnFocus = false) {nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');if(returnFocus)menu.focus();}
  menu.addEventListener('click', () => {const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));});
  nav.addEventListener('click', e => {if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown', e => {if(e.key==='Escape' && nav.classList.contains('is-open'))closeMenu(true);});
  document.addEventListener('click', e => {if(!e.target.closest('.site-header'))closeMenu();});
  desktop.addEventListener('change',()=>closeMenu());
  let toastTimer;
  function toast(message) {const el=$('.toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3500);}
  $('#copy-email').addEventListener('click',async()=>{
    try {await navigator.clipboard.writeText('thejuspkwork@gmail.com');toast('Email address copied.');}
    catch {toast('Copy this address: thejuspkwork@gmail.com');}
  });
  $('#current-year').textContent = new Date().getFullYear();
  const layers = [...document.querySelectorAll('.scene')];
  const motionButton = $('#motion-toggle');
  let paused = false, active = '', currentLayer = null, fadeTimer;
  const canMove = () => !reduced.matches && !saveData && !paused;
  function motionLabel() {
    const stopped = !canMove();
    motionButton.textContent = reduced.matches ? 'Reduced motion on' : saveData ? 'Data saver · still images' : stopped ? 'Play motion ▷' : 'Pause motion Ⅱ';
    motionButton.setAttribute('aria-pressed',String(stopped));
    motionButton.disabled = reduced.matches || saveData;
  }
  async function play(layer) {
    const video=layer.querySelector('video');
    if(!canMove() || document.hidden || layer!==currentLayer)return;
    if(!video.getAttribute('src')){video.src=`assets/media/${video.dataset.name}-${small.matches?'mobile':'desktop'}.mp4`;video.load();}
    try {await video.play();if(layer!==currentLayer || document.hidden || !canMove())video.pause();}
    catch {video.classList.remove('is-ready');}
  }
  layers.forEach(layer=>{
    const v=layer.querySelector('video');
    v.addEventListener('playing',()=>v.classList.add('is-ready'));
    v.addEventListener('error',()=>{v.classList.remove('is-ready');v.pause();});
  });
  function setScene(name) {
    if(name===active)return;
    active=name;clearTimeout(fadeTimer);
    currentLayer=layers.find(l=>l.dataset.scene===name)||null;
    if(currentLayer){layers.forEach(l=>l.classList.toggle('is-active',l===currentLayer));play(currentLayer);}
    // The outgoing image remains available while the incoming poster/video fades in.
    fadeTimer=setTimeout(()=>layers.forEach(l=>{if(l!==currentLayer)l.querySelector('video').pause();}),canMove()?1100:0);
    if(!currentLayer)layers.forEach(l=>l.querySelector('video').pause());
    motionButton.hidden=!currentLayer;
  }
  function motionChange() {
    root.classList.toggle('motion-enabled',!reduced.matches && !saveData);
    layers.forEach(l=>{const v=l.querySelector('video');if(!canMove()){v.pause();v.classList.remove('is-ready');}});
    motionLabel();if(currentLayer)play(currentLayer);schedule();
  }
  motionButton.addEventListener('click',()=>{paused=!paused;motionChange();});
  reduced.addEventListener('change',motionChange);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)layers.forEach(l=>l.querySelector('video').pause());
    else if(currentLayer)play(currentLayer);
  });
  const sections=[...document.querySelectorAll('main section[data-background]')];
  const hero=$('#hero'), heroContent=$('.hero-content'), interlude=$('.hero-interlude'), heroBottom=$('.hero-bottom');
  let scheduled=false;
  const clamp = x => Math.min(1,Math.max(0,x));
  function update() {
    scheduled=false;
    $('.site-header').classList.toggle('scrolled',scrollY>40);
    const point=innerHeight*.42;
    let section=sections[0];
    for(const candidate of sections){if(candidate.getBoundingClientRect().top<=point)section=candidate;else break;}
    setScene(section.dataset.background);
    nav.querySelectorAll('a').forEach(a=>{if(a.hash===`#${section.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    // One native-scroll hero timeline: recede, introduce, then reveal the next section.
    const animate=desktop.matches && canMove();
    const distance=hero.offsetHeight-innerHeight;
    const progress=animate && distance>0?clamp(-hero.getBoundingClientRect().top/distance):0;
    layers.forEach(layer => { layer.style.transform = animate && section===hero && layer===currentLayer ? `scale(${1.035+progress*.025})` : ''; });
    heroContent.style.opacity=String(1-clamp(progress*2.1));
    heroContent.style.transform=animate?`translateY(${-progress*65}px) scale(${1-progress*.035})`:'';
    heroBottom.style.opacity=String(1-clamp(progress*3));
    interlude.style.opacity=animate?String(clamp((progress-.28)*3.7)*(1-clamp((progress-.8)*5))):'0';
    interlude.style.transform=animate?`translateY(${(1-progress)*18}px)`:'';
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  motionChange();update();
})();
