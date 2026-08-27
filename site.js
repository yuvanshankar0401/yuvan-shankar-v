const wa='919962012688';
function waLink(message='Hi Yuvan Digital Marketing, I would like to know more about your services.'){
  return `https://wa.me/${wa}?text=${encodeURIComponent(message)}`;
}
document.querySelectorAll('[data-wa]').forEach(el=>el.href=waLink(el.dataset.wa||undefined));
const form=document.querySelector('#auditForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const fd=new FormData(form);
    const msg=`Hi Yuvan Digital Marketing, I would like a free marketing audit.\n\nBusiness: ${fd.get('business')}\nLocation: ${fd.get('location')}\nServices: ${fd.get('services')}\nWhatsApp: ${fd.get('phone')}\nEmail: ${fd.get('email')}\nPreferred date: ${fd.get('date')}\nPreferred time: ${fd.get('time')}\nChallenge: ${fd.get('challenge')||'Not specified'}`;
    const success=document.querySelector('.success');
    success.style.display='block';
    success.textContent='Your enquiry is ready. WhatsApp will open so you can send it directly to Yuvan Digital Marketing.';
    window.open(waLink(msg),'_blank','noopener');
  });
}
const year=document.querySelectorAll('[data-year]'); year.forEach(x=>x.textContent=new Date().getFullYear());
const menu=document.querySelector('.menu'); const nav=document.querySelector('.nav-links');
if(menu&&nav){menu.addEventListener('click',()=>{nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.position='absolute';nav.style.top='78px';nav.style.left='0';nav.style.right='0';nav.style.padding='18px';nav.style.background='rgba(7,9,13,.97)';nav.style.flexDirection='column';nav.style.alignItems='flex-start';nav.style.borderBottom='1px solid rgba(255,255,255,.08)'})}
