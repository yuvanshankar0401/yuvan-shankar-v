(() => {
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.addEventListener('load', () => {
    const pre = $('.preloader');
    const bar = $('.preloader-line i');
    if (bar) bar.style.width = '100%';
    setTimeout(() => pre?.classList.add('done'), 420);
    setTimeout(() => { if (pre) pre.style.display = 'none'; }, 1050);
  });

  const menu = $('.mobile-menu');
  const menuBtn = $('.menu-toggle');
  const setMenu = (open) => {
    menu?.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
    menu?.setAttribute('aria-hidden', String(!open));
  };
  menuBtn?.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  if (!reduceMotion && window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach((el, i) => {
      gsap.to(el, {opacity:1, y:0, duration:.85, ease:'power3.out', delay:(i % 4) * .035, scrollTrigger:{trigger:el,start:'top 88%',once:true}});
    });

    const hero = $('.hero');
    const portrait = $('.hero-portrait-wrap');
    if (hero && portrait) {
      hero.addEventListener('mousemove', e => {
        const x = (e.clientX / innerWidth - .5) * 2;
        const y = (e.clientY / innerHeight - .5) * 2;
        gsap.to(portrait, {x:x*18,y:y*10,duration:1.1,ease:'power3.out'});
        gsap.to('.hero-orbit', {x:x*12,y:y*8,duration:1.4,stagger:.05,ease:'power3.out'});
      });
      hero.addEventListener('mouseleave', () => gsap.to([portrait,'.hero-orbit'], {x:0,y:0,duration:1.2,ease:'power3.out'}));
    }

    gsap.to('.orbit-one', {rotation:360,duration:28,repeat:-1,ease:'none'});
    gsap.to('.orbit-two', {rotation:-360,duration:38,repeat:-1,ease:'none'});
    gsap.to('.orbit-three', {rotation:360,duration:52,repeat:-1,ease:'none'});
    gsap.to('.hero-glow', {scale:1.15,opacity:.7,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
    gsap.to('.contact-orb', {rotation:360,duration:60,repeat:-1,ease:'none'});

    gsap.utils.toArray('.manifesto h2').forEach(el => {
      gsap.fromTo(el,{x:-60},{x:0,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1}});
    });
    gsap.utils.toArray('.creative-card').forEach((card,i) => {
      gsap.fromTo(card,{y:i%2?35:-15},{y:i%2?-20:20,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:1}});
    });
  } else {
    $$('.reveal').forEach(el => {el.style.opacity=1;el.style.transform='none';});
  }

  if (!reduceMotion) {
    const cursor = $('.cursor');
    let cx=0,cy=0,tx=0,ty=0;
    window.addEventListener('mousemove', e => {tx=e.clientX;ty=e.clientY;});
    const tick=()=>{cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;if(cursor){cursor.style.left=cx+'px';cursor.style.top=cy+'px';}requestAnimationFrame(tick)}; tick();
    $$('a,.magnetic').forEach(el=>{
      el.addEventListener('mouseenter',()=>cursor?.classList.add('view'));
      el.addEventListener('mouseleave',()=>cursor?.classList.remove('view'));
    });
    $$('.magnetic').forEach(el=>el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect(), x=(e.clientX-r.left-r.width/2)*.12, y=(e.clientY-r.top-r.height/2)*.12;
      el.style.transform=`translate(${x}px,${y}px)`;
    }));
    $$('.magnetic').forEach(el=>el.addEventListener('mouseleave',()=>el.style.transform=''));
  }

  const form = $('#contact-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = `Digital Marketing Enquiry — ${data.get('company') || data.get('name')}`;
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Business / Brand: ${data.get('company')}`,
      `Need help with: ${data.get('opportunity')}`,
      '',
      'About the business / project:',
      data.get('message')
    ].join('\n');
    const note = $('#form-note');
    if (note) note.textContent = 'Opening your email app… Please review the enquiry and send it.';
    window.location.href = `mailto:yuvandigitalmarketing@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  const refreshInstagram = () => window.instgrm?.Embeds?.process?.();
  window.addEventListener('load', refreshInstagram);
  setTimeout(refreshInstagram, 1400);
})();
