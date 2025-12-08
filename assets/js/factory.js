// FACTORY THEME JAVASCRIPT - HTX ĐẠI NGÀN

document.addEventListener('DOMContentLoaded', function() {
  
  // ========== HEADER SCROLL EFFECT ==========
  const header = document.querySelector('.factory-header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // ========== HERO SLIDESHOW ==========
  const heroSlides = document.querySelectorAll('.factory-hero-slide');
  let currentHeroSlide = 0;
  
  function nextHeroSlide() {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
  }
  
  function prevHeroSlide() {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
  }
  
  // Auto-change slides every 5 seconds
  let heroInterval;
  if (heroSlides.length > 1) {
    heroInterval = setInterval(nextHeroSlide, 5000);
  }
  
  // Stop auto-change when manually navigating
  function resetHeroInterval() {
    clearInterval(heroInterval);
    heroInterval = setInterval(nextHeroSlide, 5000);
  }
  
  // Make changeHeroSlide global for onclick handlers
  window.changeHeroSlide = function(direction) {
    if (direction === 1) {
      nextHeroSlide();
    } else {
      prevHeroSlide();
    }
    resetHeroInterval();
  };
  
  // ========== STATS COUNTER ANIMATION ==========
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
  
  // Trigger counter when stats section is visible
  const statsSection = document.querySelector('.factory-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = document.querySelectorAll('.stat-number');
          statNumbers.forEach(num => {
            if (num.getAttribute('data-target')) {
              animateCounter(num);
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
  }
  
  // ========== SMOOTH SCROLL FOR NAVIGATION ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ========== SCROLL REVEAL ANIMATIONS ==========
  const revealElements = document.querySelectorAll('.service-box, .portfolio-item, .team-member');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          entry.target.style.transition = 'all 0.6s ease';
          
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 50);
        }, index * 100);
        
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  // ========== MOBILE MENU TOGGLE ==========
  const menuToggle = document.querySelector('.factory-menu-toggle');
  const factoryNav = document.querySelector('.factory-nav');
  
  if (menuToggle && factoryNav) {
    menuToggle.addEventListener('click', function() {
      factoryNav.classList.toggle('active');
      this.textContent = factoryNav.classList.contains('active') ? '✕' : '☰';
    });
  }
  
});
