// Basic animation helpers: reveal product cards on scroll and smooth scroll for CTAs
document.addEventListener('DOMContentLoaded', function(){
  // IntersectionObserver to reveal product cards
  const cards = document.querySelectorAll('.product-card');
  const obsOptions = {threshold: 0.12};
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, obsOptions);
  cards.forEach(c=>observer.observe(c));

  // Smooth scroll for hero-cta and promo-cta
  function smoothTo(selector){
    document.querySelectorAll(selector).forEach(el=>{
      el.addEventListener('click', (e)=>{
        e.preventDefault();
        const href = el.getAttribute('href') || '#';
        const target = document.querySelector(href);
        if(target){ target.scrollIntoView({behavior:'smooth',block:'start'}); }
      });
    });
  }
  smoothTo('.hero-cta');
  smoothTo('.promo-cta');

  // small micro-interaction: pulse hero-cta on load
  const hero = document.querySelector('.hero-cta');
  if(hero){
    hero.animate([{transform:'translateY(0)'},{transform:'translateY(-4px)'},{transform:'translateY(0)'}],{duration:900,iterations:1,easing:'ease-out'});
  }
});
