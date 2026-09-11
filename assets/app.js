(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('is-ready');
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => setTimeout(() => preloader?.classList.add('done'), reduce ? 0 : 450));

  // Light editorial paper is the new default; dark remains available as an alternate theme.
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  if (localStorage.getItem('ysv-theme') === 'dark') root.classList.add('dark');
  themeButton?.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('ysv-theme', root.classList.contains('dark') ? 'dark' : 'light');
  });

  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const toggleMenu = open => { mobileMenu?.classList.toggle('open', open); mobileMenu?.setAttribute('aria-hidden', String(!open)); menuButton?.setAttribute('aria-expanded', String(open)); };
  menuButton?.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('open')));
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  if (!reduce && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.reveal').forEach((el, i) => gsap.to(el, {opacity:1,y:0,duration:.9,ease:'power3.out',delay:Math.min(i*.025,.3),scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
    const statement = document.querySelector('.statement');
    if(statement){ gsap.to('.statement-title',{y:-60,ease:'none',scrollTrigger:{trigger:statement,start:'top bottom',end:'bottom top',scrub:true}}); gsap.to('.statement-reveal',{x:80,ease:'none',scrollTrigger:{trigger:statement,start:'top bottom',end:'bottom top',scrub:true}}); }
  } else document.querySelectorAll('.reveal').forEach(el => {el.style.opacity=1;el.style.transform='none'});

  if (!reduce && window.Lenis) {
    const lenis = new Lenis({duration:1.15,smoothWheel:true,syncTouch:false});
    const raf = time => {lenis.raf(time);requestAnimationFrame(raf)}; requestAnimationFrame(raf);
    if(window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  }

  const cursor = document.querySelector('.cursor');
  if(cursor && !reduce && matchMedia('(pointer:fine)').matches){
    let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y; window.addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY});
    const move=()=>{cx+=(x-cx)*.16;cy+=(y-cy)*.16;cursor.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(move)}; move();
    document.querySelectorAll('a,button,.tool-cloud span,.case-card').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))});
  }

  document.querySelectorAll('[data-magnetic]').forEach(el=>{if(reduce||!matchMedia('(pointer:fine)').matches)return;el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.16}px,${(e.clientY-r.top-r.height/2)*.16}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')});
  const stage=document.querySelector('.hero-stage');
  if(stage&&!reduce&&matchMedia('(pointer:fine)').matches){stage.addEventListener('mousemove',e=>{const r=stage.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;stage.querySelectorAll('[data-depth]').forEach(el=>{const d=+el.dataset.depth;el.style.transform=`translate(${px*35*d}px,${py*35*d}px)`})});stage.addEventListener('mouseleave',()=>stage.querySelectorAll('[data-depth]').forEach(el=>el.style.transform=''))}

  const form=document.querySelector('#contact-form');
  form?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const subject=encodeURIComponent(`Freelance enquiry from ${data.get('name')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')||'Not provided'}\nOpportunity: ${data.get('opportunity')}\n\nProject details:\n${data.get('message')}`);window.location.href=`mailto:yuvandigitalmarketing@gmail.com?subject=${subject}&body=${body}`;const note=document.querySelector('#form-note');if(note)note.textContent='Opening your email app…';});
})();
