// Basic animation helpers: reveal product cards on scroll and smooth scroll for CTAs
document.addEventListener('DOMContentLoaded', function(){
  // IntersectionObserver to reveal elements on scroll
  const obsOptions = {threshold: 0.15};
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.animation = entry.target.dataset.animation || 'none';
        observer.unobserve(entry.target);
      }
    });
  }, obsOptions);

  // Observe info-banner and other elements
  const infoBanner = document.querySelector('.info-banner');
  if(infoBanner) observer.observe(infoBanner);

  // Smooth scroll for CTA buttons
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
  smoothTo('.cta-btn');

  // Hover effect on product items
  const productItems = document.querySelectorAll('.product-item');
  productItems.forEach(item => {
    item.addEventListener('mouseenter', function(){
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    item.addEventListener('mouseleave', function(){
      this.style.transform = 'none';
    });
  });
});

