(() => {
  const strings = Array.from(document.querySelectorAll('[data-es]')).map(el => ({el, en:el.textContent, es:el.dataset.es}));
  const buttons = Array.from(document.querySelectorAll('[data-lang]'));
  function setLanguage(lang) {
    const es = lang === 'es';
    document.documentElement.lang = es ? 'es' : 'en';
    strings.forEach(({el,en,es:translation}) => {el.textContent = es ? translation : en;});
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    document.title = es ? 'ACAPURO — Research y dirección digital · Rocket Pine' : 'ACAPURO — Research & Digital Direction · Rocket Pine';
    document.querySelector('meta[name="description"]').content = es ? 'Acapuro — Investigación de conversión y dirección digital por Rocket Pine.' : 'Acapuro — Conversion research and digital direction by Rocket Pine.';
    try {localStorage.setItem('rp-acapuro-language', lang);} catch (_) {}
    updateProgress();
  }
  const progress = document.getElementById('progress');
  function updateProgress(){const total=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(total>0?Math.max(0,Math.min(100,window.scrollY/total*100)):0)+'%';}
  let lang='en';
  try {if(localStorage.getItem('rp-acapuro-language')==='es')lang='es';} catch (_) {}
  buttons.forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
  setLanguage(lang);
  window.addEventListener('scroll',updateProgress,{passive:true});
  window.addEventListener('resize',updateProgress,{passive:true});
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:0,rootMargin:'0px 0px -20px 0px'});
    document.documentElement.classList.add('js-reveal');
    document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add('is-visible');else observer.observe(el);});
  }
})();
