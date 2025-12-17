// Basic animation helpers: reveal product cards on scroll and smooth scroll for CTAs
document.addEventListener('DOMContentLoaded', function(){
  // === DROPDOWN MENU NAVIGATION ===
  const dropdownItems = document.querySelectorAll('.dropdown');
  const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
  
  // Handle mobile click for dropdown
  if (window.innerWidth <= 992) {
    dropdownItems.forEach(item => {
      const link = item.querySelector('a');
      link.addEventListener('click', function(e) {
        if (this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown-menu')) {
          e.preventDefault();
          item.classList.toggle('open');
          const menu = this.nextElementSibling;
          if (menu.style.display === 'block') {
            menu.style.display = 'none';
          } else {
            menu.style.display = 'block';
          }
        }
      });
    });
    
    dropdownSubmenus.forEach(item => {
      const link = item.querySelector('a');
      link.addEventListener('click', function(e) {
        if (this.nextElementSibling && this.nextElementSibling.classList.contains('submenu-level-2')) {
          e.preventDefault();
          item.classList.toggle('open');
          const submenu = this.nextElementSibling;
          if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
          } else {
            submenu.style.display = 'block';
          }
        }
      });
    });
  }
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Close mobile menu if open
          const dropdowns = document.querySelectorAll('.dropdown.open');
          dropdowns.forEach(dd => {
            dd.classList.remove('open');
            const menu = dd.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'none';
          });
          
          // Smooth scroll to target
          const offsetTop = targetElement.offsetTop - 120; // Account for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // === HEADER SHRINK ON SCROLL ===
  const navbar = document.querySelector('.navbar');
  const ticker = document.querySelector('.ticker-wrapper');
  const scrollThreshold = 100;
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
      // Scrolled down - hide navbar and ticker
      navbar.classList.add('scrolled');
      ticker.classList.add('scrolled');
    } else {
      // At the top - show navbar and ticker
      navbar.classList.remove('scrolled');
      ticker.classList.remove('scrolled');
    }
  });
  
  // === HERO IMAGE SLIDER - MANUAL ONLY (FACTORY STYLE) ===
  const slides = document.querySelectorAll('.hero-factory-slide');
  let currentSlide = 0;

  function showSlide(index) {
    // Xóa active class khỏi tất cả slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Thêm active class vào slide hiện tại
    if (slides[index]) {
      slides[index].classList.add('active');
    }
  }

  // Hàm chuyển slide khi click nút (được gọi từ HTML)
  window.changeHeroSlide = function(direction) {
    currentSlide = currentSlide + direction;
    
    // Xử lý vòng lặp
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    } else if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    
    showSlide(currentSlide);
  }

  // === STATS COUNTER ANIMATION ===
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
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

  // Trigger counter animation when stats section is visible
  const statsSection = document.querySelector('.factory-stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = document.querySelectorAll('.stat-number');
          statNumbers.forEach(num => animateCounter(num));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
  }

  // === TESTIMONIALS SLIDER ===
  let currentTestimonial = 0;
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  
  window.changeTestimonial = function(direction) {
    if (testimonialItems.length === 0) return;
    
    testimonialItems[currentTestimonial].classList.remove('active');
    
    currentTestimonial += direction;
    
    if (currentTestimonial >= testimonialItems.length) {
      currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
      currentTestimonial = testimonialItems.length - 1;
    }
    
    testimonialItems[currentTestimonial].classList.add('active');
  }

  // Auto-advance testimonials every 5 seconds
  if (testimonialItems.length > 0) {
    setInterval(() => {
      changeTestimonial(1);
    }, 5000);
  }

  // === SMOOTH SCROLL FOR FACTORY BUTTONS ===
  document.querySelectorAll('.btn-factory').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Typewriter effect for hero section
  const typewriterElements = document.querySelectorAll('.typewriter, .typewriter-subtitle');
  typewriterElements.forEach((element, index) => {
    const text = element.getAttribute('data-text');
    if (text) {
      element.textContent = text;
    }
  });

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .product-item, .info-card, .project-card, .news-card');
    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      if (isVisible && !el.classList.contains('animated')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
          el.style.transition = 'all 0.6s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.classList.add('animated');
        }, index * 100);
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

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
  
  // Smooth scroll for nav menu
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if(target) {
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Hover effect on product items (enhanced)
  const productItems = document.querySelectorAll('.product-item');
  productItems.forEach(item => {
    item.addEventListener('mouseenter', function(){
      this.style.transform = 'translateY(-12px) scale(1.03)';
    });
    item.addEventListener('mouseleave', function(){
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Language switcher functionality - Improved
  const langButtons = document.querySelectorAll('.lang-btn');
  
  const translations = {
    vi: {
      menu: {
        home: 'Trang chủ',
        capacity: 'Hồ sơ năng lực',
        members: 'Thành viên HTX',
        projects: 'Dự án & Hoạt động',
        news: 'Tin tức & Sự kiện',
        contact: 'Liên hệ'
      },
      hero: {
        title: 'Hợp Tác Xã Lâm Đồng Đại Ngàn',
        subtitle: 'Rau Củ Quả Sạch 100% - Giao Hàng Tận Nhà - Giá Hợp Lý',
        cta: 'Khám Phá Sản Phẩm'
      },
      sections: {
        features: ['100% Tươi Ngon', 'Không Hóa Chất', 'Giao Hàng Nhanh', 'Giá Cạnh Tranh'],
        featuresDesc: ['Thu hoạch mỗi ngày, giao hôm đó', 'Nông sản hữu cơ, an toàn', 'Miễn phí cho đơn trên 500k', 'Trực tiếp từ nông trại'],
        capacity: 'Hồ Sơ Năng Lực',
        members: 'Về Các Thành Viên',
        products: 'Sản Phẩm & Dịch Vụ',
        projects: 'Dự Án',
        news: 'Tin Tức & Sự Kiện',
        footer: 'Về HTX',
        search: 'Tìm kiếm sản phẩm...',
        searchBtn: 'Tìm Kiếm',
        promo: 'Khuyến Mãi Tuần Này',
        promoDesc: 'Mua 2 rau xanh tặng 1 - Chỉ áp dụng đến hết tuần!',
        promoBtn: 'Xem Chi Tiết'
      },
      products: {
        vegetableCategory: '🥬 Rau Xanh Tươi',
        tuberCategory: 'Củ Quả Đà Lạt – Tươi Ngon Chuẩn Vị Tự Nhiên',
        otherCategory: '🍅 Nông sản khác',
        items: {
          hanhNgo: {
            name: 'Hành Ngò Đà Lạt',
            desc: 'Hành ngò Đà Lạt tươi xanh, thơm tự nhiên, giàu vitamin và khoáng chất. Lá mềm, mùi thơm dịu, thích hợp cho mọi món canh, xào và trang trí món ăn mỗi ngày'
          },
          bapCai: {
            name: 'Bắp cải Đà Lạt',
            desc: 'Bắp cải Đà Lạt tươi giòn, ngọt thanh tự nhiên, giàu vitamin và chất xơ. Búp chắc, lá xanh mướt, thích hợp cho món xào, salad và hầm canh bổ dưỡng.'
          },
          caiThao: {
            name: 'Cải thảo Đà Lạt',
            desc: 'Cải thảo Đà Lạt tươi giòn, ngọt nhẹ tự nhiên, giàu vitamin và chất xơ. Búp chắc, lá xanh mướt, thích hợp cho món lẩu, xào và salad healthy mỗi ngày.'
          },
          otChuong: {
            name: 'Ớt chuông Đà Lạt',
            desc: 'Rau củ Đà Lạt tươi ngon, giàu dinh dưỡng, cung cấp vitamin và khoáng chất thiết yếu cho cơ thể'
          },
          caRot: {
            name: 'Cà Rốt',
            desc: 'Cà rốt Đà Lạt tươi ngọt, giòn tự nhiên, giàu beta-carotene và vitamin. Màu cam bắt mắt, thích hợp cho món xào, hầm, nước ép và thực đơn eat-clean mỗi ngày'
          },
          khoaiTay: {
            name: 'Khoai Tây',
            desc: 'Khoai tây Đà Lạt vàng mịn, dẻo thơm tự nhiên, giàu tinh bột và vitamin. Vỏ mỏng, chắc củ, thích hợp cho chiên, nướng, hầm và mọi món ăn gia đình'
          },
          cuCai: {
            name: 'Củ cải',
            desc: 'Củ cải Đà Lạt tươi giòn, vị ngọt thanh tự nhiên, giàu vitamin và khoáng chất. Trắng đẹp, mọng nước, thích hợp cho món hầm, soup và các bữa ăn healthy hằng ngày.'
          },
          khoaiLang: {
            name: 'Khoai Lang Đà Lạt',
            desc: 'Khoai lang tím Đà Lạt đặc sản, ngọt tự nhiên, giàu chất xơ và vitamin. Màu tím đẹp mắt, thích hợp cho cả nấu ăn và làm bánh.'
          },
          chanhDay: {
            name: 'Nước cốt chanh dây Đà Lạt',
            desc: 'Nước cốt chanh dây tươi nguyên chất, thơm ngon tự nhiên, giàu vitamin C và chất chống oxy hóa. Vị chua dịu, thích hợp pha nước giải khát, làm bánh và chế biến món ăn healthy mỗi ngày.'
          },
          taoXoan: {
            name: 'Tảo xoăn thăng hoa',
            desc: 'Tảo xoắn thăng hoa nguyên chất, giàu protein, vitamin và khoáng chất thiết yếu. Hỗ trợ tăng cường sức khỏe, thanh lọc cơ thể và bổ sung năng lượng tự nhiên mỗi ngày'
          },
          tinhGung: {
            name: 'Tinh gừng mật ong',
            desc: 'Tinh gừng mật ong nguyên chất, kết hợp vị cay ấm của gừng và ngọt dịu của mật ong. Giàu dưỡng chất, hỗ trợ tiêu hóa, tăng sức đề kháng và giữ ấm cơ thể mỗi ngày.'
          },
          rauTam: {
            name: 'Nước cốt rau tằm',
            desc: 'Nước cốt dâu tằm tươi nguyên chất, ngọt thanh tự nhiên, giàu vitamin và chất chống oxy hóa. Thích hợp pha nước giải khát, làm smoothie, bánh hoặc dùng trong các món healthy mỗi ngày'
          }
        }
      },
      news: {
        item1: {
          title: 'HTX Đạt Chứng Nhận Hữu Cơ Quốc Tế',
          desc: 'Hợp Tác Xã Nông Sản Tươi Ngon nhận được chứng nhận hữu cơ từ tổ chức quốc tế.'
        },
        item2: {
          title: 'Khai Mạc Thị Trường Nông Sản Sạch',
          desc: 'Thị trường nông sản sạch hàng tuần tại Thanh Hóa được khai mạc thành công.'
        },
        item3: {
          title: 'Hội Thảo: Nông Nghiệp Bền Vững',
          desc: 'HTX tổ chức hội thảo về phát triển nông nghiệp bền vững với các chuyên gia.'
        }
      },
      ticker: 'HTX Lâm Đồng Đại Ngàn - Rau Củ Quả Sạch Đà Lạt ⭐ Chất Lượng - Uy Tín - Tận Tâm ⭐ HTX Lâm Đồng Đại Ngàn - Rau Củ Quả Sạch Đà Lạt ⭐ Chất Lượng - Uy Tín - Tận Tâm ⭐'
    },
    en: {
      menu: {
        home: 'Home',
        capacity: 'Our Capabilities',
        members: 'Cooperative Members',
        projects: 'Projects & Activities',
        news: 'News & Events',
        contact: 'Contact'
      },
      hero: {
        title: 'Lam Dong Dai Ngan Cooperative',
        subtitle: '100% Clean Vegetables & Fruits - Home Delivery - Fair Prices',
        cta: 'Explore Products'
      },
      sections: {
        features: ['100% Fresh', 'No Chemicals', 'Fast Delivery', 'Competitive Price'],
        featuresDesc: ['Harvested daily, delivered same day', 'Organic produce, safe', 'Free for orders over 500k', 'Direct from farm'],
        capacity: 'Our Capabilities',
        members: 'About Members',
        products: 'Products & Services',
        projects: 'Projects',
        news: 'News & Events',
        footer: 'About Us',
        search: 'Search products...',
        searchBtn: 'Search',
        promo: 'This Week\'s Promotion',
        promoDesc: 'Buy 2 vegetables get 1 free - Valid until end of week!',
        promoBtn: 'View Details'
      },
      products: {
        vegetableCategory: '🥬 Fresh Vegetables',
        tuberCategory: 'Da Lat Tubers - Fresh & Natural',
        otherCategory: '🍅 Other Agricultural Products',
        items: {
          hanhNgo: {
            name: 'Da Lat Spring Onion',
            desc: 'Fresh green Da Lat spring onion, naturally fragrant, rich in vitamins and minerals. Soft leaves, mild aroma, suitable for soups, stir-fries and garnishing everyday dishes'
          },
          bapCai: {
            name: 'Da Lat Cabbage',
            desc: 'Fresh crispy Da Lat cabbage, naturally sweet, rich in vitamins and fiber. Firm head, bright green leaves, perfect for stir-fry, salad and nutritious soup.'
          },
          caiThao: {
            name: 'Da Lat Napa Cabbage',
            desc: 'Fresh crispy Da Lat napa cabbage, naturally sweet, rich in vitamins and fiber. Firm head, bright green leaves, perfect for hot pot, stir-fry and healthy salad.'
          },
          otChuong: {
            name: 'Da Lat Bell Pepper',
            desc: 'Fresh Da Lat vegetables, rich in nutrients, providing essential vitamins and minerals for the body'
          },
          caRot: {
            name: 'Carrot',
            desc: 'Fresh sweet Da Lat carrot, naturally crispy, rich in beta-carotene and vitamins. Bright orange color, suitable for stir-fry, stew, juice and eat-clean menu everyday'
          },
          khoaiTay: {
            name: 'Potato',
            desc: 'Golden smooth Da Lat potato, naturally soft and fragrant, rich in starch and vitamins. Thin skin, firm tuber, suitable for frying, baking, stewing and all family meals'
          },
          cuCai: {
            name: 'Radish',
            desc: 'Fresh crispy Da Lat radish, naturally sweet taste, rich in vitamins and minerals. Beautiful white, juicy, suitable for stew, soup and healthy meals everyday.'
          },
          khoaiLang: {
            name: 'Da Lat Sweet Potato',
            desc: 'Da Lat purple sweet potato specialty, naturally sweet, rich in fiber and vitamins. Beautiful purple color, suitable for both cooking and baking.'
          },
          chanhDay: {
            name: 'Da Lat Passion Fruit Juice',
            desc: 'Fresh pure passion fruit juice, naturally delicious, rich in vitamin C and antioxidants. Mild sour taste, suitable for making drinks, baking and preparing healthy dishes everyday.'
          },
          taoXoan: {
            name: 'Spirulina Powder',
            desc: 'Pure spirulina powder, rich in protein, vitamins and essential minerals. Supports health enhancement, body detoxification and natural energy supplementation everyday'
          },
          tinhGung: {
            name: 'Ginger Honey Extract',
            desc: 'Pure ginger honey extract, combining warm spicy ginger and sweet honey. Rich in nutrients, supports digestion, boosts immunity and warms the body everyday.'
          },
          rauTam: {
            name: 'Mulberry Juice',
            desc: 'Fresh pure mulberry juice, naturally sweet, rich in vitamins and antioxidants. Suitable for making drinks, smoothies, cakes or using in healthy dishes everyday'
          }
        }
      },
      news: {
        item1: {
          title: 'Cooperative Achieves International Organic Certification',
          desc: 'Fresh Agricultural Cooperative receives organic certification from international organization.'
        },
        item2: {
          title: 'Opening of Clean Agricultural Market',
          desc: 'Weekly clean agricultural market in Thanh Hoa successfully opened.'
        },
        item3: {
          title: 'Seminar: Sustainable Agriculture',
          desc: 'Cooperative organizes seminar on sustainable agricultural development with experts.'
        }
      },
      ticker: 'Lam Dong Dai Ngan Cooperative - Fresh Vegetables Da Lat ⭐ Quality - Trust - Dedication ⭐ Lam Dong Dai Ngan Cooperative - Fresh Vegetables Da Lat ⭐ Quality - Trust - Dedication ⭐'
    }
  };

  function updateLanguage(lang) {
    const t = translations[lang];
    
    // Update menu items
    const menuItems = document.querySelectorAll('.nav-menu a');
    if (menuItems[0]) menuItems[0].textContent = t.menu.home;
    if (menuItems[1]) menuItems[1].textContent = t.menu.capacity;
    if (menuItems[2]) menuItems[2].textContent = t.menu.members;
    if (menuItems[3]) menuItems[3].textContent = t.menu.projects;
    if (menuItems[4]) menuItems[4].textContent = t.menu.news;
    if (menuItems[5]) menuItems[5].textContent = t.menu.contact;
    
    // Update ticker
    const tickerText = document.querySelector('.ticker-text');
    if (tickerText) tickerText.textContent = t.ticker;
    
    // Update hero section
    const heroTitle = document.querySelector('.typewriter');
    const heroSubtitle = document.querySelector('.typewriter-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTitle) {
      heroTitle.setAttribute('data-text', t.hero.title);
      heroTitle.textContent = t.hero.title;
    }
    if (heroSubtitle) {
      heroSubtitle.setAttribute('data-text', t.hero.subtitle);
      heroSubtitle.textContent = t.hero.subtitle;
    }
    if (heroCta) heroCta.textContent = t.hero.cta;
    
    // Update feature cards
    const featureTitles = document.querySelectorAll('.feature-card h3');
    const featureDescs = document.querySelectorAll('.feature-card p');
    featureTitles.forEach((title, idx) => {
      if (t.sections.features[idx]) {
        title.textContent = t.sections.features[idx];
      }
    });
    featureDescs.forEach((desc, idx) => {
      if (t.sections.featuresDesc[idx]) {
        desc.textContent = t.sections.featuresDesc[idx];
      }
    });
    
    // Update section headings
    const sectionHeadings = document.querySelectorAll('.info-section h2, .products-section h2');
    if (sectionHeadings[0]) sectionHeadings[0].innerHTML = '📋 ' + t.sections.capacity;
    if (sectionHeadings[1]) sectionHeadings[1].innerHTML = '👥 ' + t.sections.members;
    if (sectionHeadings[2]) sectionHeadings[2].innerHTML = '🛍️ ' + t.sections.products;
    
    const projectsHeading = document.querySelector('#projects h2');
    if (projectsHeading) projectsHeading.innerHTML = '🏗️ ' + t.sections.projects;
    
    const newsHeading = document.querySelector('#news h2');
    if (newsHeading) newsHeading.innerHTML = '📰 ' + t.sections.news;
    
    // Update search box
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    if (searchInput) searchInput.placeholder = t.sections.search;
    if (searchBtn) searchBtn.textContent = t.sections.searchBtn;
    
    // Update promo banner
    const promoTitle = document.querySelector('.promo-banner h3');
    const promoDesc = document.querySelector('.promo-banner p');
    const promoBtn = document.querySelector('.promo-btn');
    if (promoTitle) promoTitle.textContent = '🎉 ' + t.sections.promo;
    if (promoDesc) promoDesc.textContent = t.sections.promoDesc;
    if (promoBtn) promoBtn.textContent = t.sections.promoBtn;
    
    // Update product categories
    const categories = document.querySelectorAll('.product-category');
    if (categories[0]) categories[0].textContent = t.products.vegetableCategory;
    if (categories[1]) categories[1].textContent = t.products.tuberCategory;
    if (categories[2]) categories[2].textContent = t.products.otherCategory;
    
    // Update product items
    const productItems = document.querySelectorAll('.product-item');
    const productKeys = ['hanhNgo', 'bapCai', 'caiThao', 'otChuong', 'caRot', 'khoaiTay', 'cuCai', 'khoaiLang', 'chanhDay', 'taoXoan', 'tinhGung', 'rauTam'];
    
    productItems.forEach((item, idx) => {
      const key = productKeys[idx];
      if (key && t.products.items[key]) {
        const title = item.querySelector('h4');
        const desc = item.querySelector('p');
        if (title) title.textContent = t.products.items[key].name;
        if (desc && !desc.classList.contains('price')) desc.textContent = t.products.items[key].desc;
      }
    });
    
    // Update news items
    const newsCards = document.querySelectorAll('.news-card');
    const newsKeys = ['item1', 'item2', 'item3'];
    
    newsCards.forEach((card, idx) => {
      const key = newsKeys[idx];
      if (key && t.news[key]) {
        const title = card.querySelector('h4');
        const desc = card.querySelector('.news-desc');
        if (title) title.textContent = t.news[key].title;
        if (desc) desc.textContent = t.news[key].desc;
      }
    });
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      
      // Update active state with animation
      langButtons.forEach(b => {
        b.classList.remove('active');
        b.style.transform = 'scale(1)';
      });
      this.classList.add('active');
      this.style.transform = 'scale(1.1)';
      
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
      
      // Update content
      updateLanguage(lang);
      
      // Store language preference
      localStorage.setItem('language', lang);
      
      // Show notification
      showNotification(lang === 'vi' ? 'Đã chuyển sang Tiếng Việt' : 'Switched to English');
    });
  });

  // Notification function
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--burgundy);
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      animation: slideInRight 0.5s ease;
      font-weight: 600;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, 2000);
  }

  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Load saved language preference
  const savedLang = localStorage.getItem('language') || 'vi';
  const savedLangBtn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
  if (savedLangBtn && savedLang !== 'vi') {
    setTimeout(() => {
      savedLangBtn.click();
    }, 100);
  }

  // === AUTO ADD VIEW DETAIL BUTTONS ===
  addViewDetailButtons();
});

// ====== PRODUCT DETAIL MODAL ======
const productData = {
  1: {
    name: "Hành Ngò Đà Lạt",
    price: "10.000đ/kg",
    image: "assets/img/HanhNgo.jpg",
    description: "Hành ngò Đà Lạt tươi ngon, được trồng tại vùng cao nguyên Đà Lạt với khí hậu mát mẻ, cho hương vị thơm ngon đặc trưng.",
    features: [
      "100% tự nhiên, không hóa chất",
      "Thu hoạch tươi mỗi ngày",
      "Giàu vitamin và khoáng chất",
      "Hương vị thơm đặc trưng của Đà Lạt"
    ]
  },
  2: {
    name: "Bắp Cải Đà Lạt",
    price: "5.000đ/500g",
    image: "assets/img/Bắp cải.jpg",
    description: "Bắp cải Đà Lạt tươi ngon, lá xanh mướt, giòn ngọt tự nhiên. Sản phẩm an toàn vệ sinh thực phẩm.",
    features: [
      "Lá xanh mướt, căng mọng",
      "Giòn ngọt tự nhiên",
      "Giàu chất xơ và vitamin C",
      "Trồng theo tiêu chuẩn VietGAP"
    ]
  },
  3: {
    name: "Cải Thảo Đà Lạt",
    price: "5.000đ",
    image: "assets/img/cai-thao.png",
    description: "Cải thảo Đà Lạt với lá xanh non, mềm mại, thích hợp cho nhiều món ăn từ xào, luộc đến nấu canh.",
    features: [
      "Lá mềm, ngọt thanh",
      "Không dư lượng thuốc trừ sâu",
      "Giàu vitamin A, C và K",
      "Phù hợp nhiều món ăn"
    ]
  },
  4: {
    name: "Ớt Chuông Đà Lạt",
    price: "10.000đ/500g",
    image: "assets/img/ot chuong.png",
    description: "Ớt chuông Đà Lạt nhiều màu sắc, giòn ngọt, giàu dinh dưỡng, thích hợp cho salad và các món xào.",
    features: [
      "Nhiều màu sắc đẹp mắt",
      "Giòn ngọt, không cay",
      "Giàu vitamin C và chất chống oxi hóa",
      "Tươi mới, bảo quản tốt"
    ]
  }
};

function openProductDetail(productId) {
  const product = productData[productId];
  if (!product) return;

  document.getElementById('modalProductImg').src = product.image;
  document.getElementById('modalProductName').textContent = product.name;
  document.getElementById('modalProductPrice').textContent = product.price;
  document.getElementById('modalProductDesc').textContent = product.description;
  
  const featuresList = document.getElementById('modalProductFeatures');
  featuresList.innerHTML = '';
  product.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  document.getElementById('productModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
  document.getElementById('productModal').classList.remove('show');
  document.body.style.overflow = 'auto';
}

// ====== NEWS DETAIL MODAL ======
const newsData = {
  1: {
    title: "HTX Đạt Chứng Nhận Hữu Cơ Quốc Tế",
    date: "02/12/2025",
    image: "assets/img/news1.jpg",
    content: `
      <p>Hợp Tác Xã Lâm Đồng Đại Ngàn vinh dự thông báo đã chính thức nhận được chứng nhận hữu cơ quốc tế từ tổ chức uy tín, đánh dấu bước tiến quan trọng trong hành trình phát triển bền vững.</p>
      
      <p>Chứng nhận này là minh chứng cho nỗ lực không ngừng của HTX trong việc duy trì quy trình sản xuất nghiêm ngặt, đảm bảo sản phẩm hoàn toàn tự nhiên, an toàn cho người tiêu dùng và thân thiện với môi trường.</p>
      
      <p><strong>Những cam kết của HTX:</strong></p>
      <ul>
        <li>100% không sử dụng hóa chất độc hại</li>
        <li>Quy trình canh tác bền vững</li>
        <li>Kiểm soát chất lượng nghiêm ngặt từ gieo trồng đến thu hoạch</li>
        <li>Bảo vệ môi trường và đa dạng sinh học</li>
      </ul>
      
      <p>Với chứng nhận này, HTX tự tin mang đến cho khách hàng những sản phẩm nông sản sạch, chất lượng cao, góp phần nâng cao sức khỏe cộng đồng.</p>
    `
  },
  2: {
    title: "Khai Mạc Thị Trường Nông Sản Sạch",
    date: "25/11/2025",
    image: "assets/img/news2.jpg",
    content: `
      <p>Sáng ngày 25/11/2025, HTX Lâm Đồng Đại Ngàn đã tổ chức lễ khai mạc Thị trường nông sản sạch hàng tuần tại trung tâm thành phố Đà Lạt, thu hút đông đảo người dân và du khách tham gia.</p>
      
      <p>Thị trường là điểm giao lưu trực tiếp giữa người sản xuất và người tiêu dùng, mang đến:</p>
      <ul>
        <li>Rau củ quả tươi ngon, đa dạng chủng loại</li>
        <li>Giá cả hợp lý, trực tiếp từ nông trại</li>
        <li>Tư vấn dinh dưỡng miễn phí</li>
        <li>Các hoạt động trải nghiệm nông nghiệp</li>
      </ul>
      
      <p>Thị trường sẽ hoạt động mỗi tuần vào sáng Chủ nhật, tạo không gian mua sắm xanh - sạch - an toàn cho cộng đồng.</p>
    `
  },
  3: {
    title: "Hội Thảo: Nông Nghiệp Bền Vững",
    date: "15/11/2025",
    image: "assets/img/news3.jpg",
    content: `
      <p>Ngày 15/11/2025, HTX Lâm Đồng Đại Ngàn phối hợp với Sở Nông nghiệp và Phát triển Nông thôn tỉnh Lâm Đồng tổ chức Hội thảo "Nông nghiệp bền vững - Hướng đi cho tương lai".</p>
      
      <p>Hội thảo quy tụ hơn 200 đại biểu là nông dân, chuyên gia, nhà quản lý và doanh nghiệp, cùng thảo luận về:</p>
      
      <p><strong>Các chủ đề chính:</strong></p>
      <ul>
        <li>Ứng dụng công nghệ cao trong nông nghiệp</li>
        <li>Canh tác hữu cơ và bảo vệ môi trường</li>
        <li>Phát triển chuỗi giá trị nông sản bền vững</li>
        <li>Thích ứng với biến đổi khí hậu</li>
      </ul>
      
      <p>Hội thảo đã đưa ra nhiều giải pháp thiết thực, góp phần định hướng phát triển nông nghiệp bền vững cho vùng cao nguyên Đà Lạt.</p>
    `
  }
};

// ====== COMMUNITY DETAIL DATA ======
const communityData = {
  1: {
    title: "📚 Chương Trình Đào Tạo Nông Dân",
    date: "01/12/2025",
    image: "assets/img/community1.jpg",
    content: `
      <p>HTX Lâm Đồng Đại Ngàn tổ chức khóa đào tạo miễn phí về kỹ thuật canh tác hữu cơ và quản lý nông trại bền vững cho hơn 100 nông dân thành viên.</p>
      
      <p><strong>Nội dung đào tạo:</strong></p>
      <ul>
        <li>Kỹ thuật trồng trọt hữu cơ hiện đại</li>
        <li>Quản lý sâu bệnh không sử dụng hóa chất</li>
        <li>Phương pháp làm đất và bón phân tự nhiên</li>
        <li>Kỹ năng thu hoạch và bảo quản sau thu hoạch</li>
        <li>Kiến thức về chứng nhận hữu cơ</li>
      </ul>
      
      <p>Chương trình được tổ chức định kỳ hàng tháng, giúp nông dân nâng cao kiến thức, cải thiện năng suất và chất lượng sản phẩm.</p>
      
      <p><em>"Những kiến thức từ khóa đào tạo giúp tôi canh tác hiệu quả hơn và sản phẩm được giá cao hơn"</em> - Anh Nguyễn Văn A, thành viên HTX</p>
    `
  },
  2: {
    title: "❤️ Trao Tặng Rau Sạch Cho Cộng Đồng",
    date: "20/11/2025",
    image: "assets/img/community2.jpg",
    content: `
      <p>Trong tháng 11 vừa qua, HTX Lâm Đồng Đại Ngàn đã thực hiện chương trình trao tặng 500kg rau củ quả sạch cho các tổ chức và gia đình có hoàn cảnh khó khăn.</p>
      
      <p><strong>Điểm đến của chương trình:</strong></p>
      <ul>
        <li>Trung tâm Bảo trợ Xã hội tỉnh Lâm Đồng</li>
        <li>Bệnh viện Đa khoa Lâm Đồng</li>
        <li>50 hộ gia đình có hoàn cảnh khó khăn</li>
        <li>Trường mầm non vùng cao</li>
      </ul>
      
      <p>Chương trình không chỉ mang đến nguồn thực phẩm sạch, an toàn cho người dân mà còn lan tỏa thông điệp về lối sống lành mạnh và tinh thần tương thân tương ái.</p>
      
      <p>HTX cam kết sẽ duy trì hoạt động này thường xuyên, góp phần chăm lo sức khỏe cộng đồng.</p>
    `
  },
  3: {
    title: "🎉 Ngày Hội Nông Dân Vui Khỏe",
    date: "10/11/2025",
    image: "assets/img/community3.jpg",
    content: `
      <p>Ngày 10/11/2025, HTX Lâm Đồng Đại Ngàn đã tổ chức thành công "Ngày hội Nông dân Vui Khỏe" với sự tham gia của hơn 200 thành viên và gia đình.</p>
      
      <p><strong>Các hoạt động trong ngày hội:</strong></p>
      <ul>
        <li>Thi trồng rau nhanh và thu hoạch khéo léo</li>
        <li>Trưng bày và trao giải sản phẩm nông sản xuất sắc</li>
        <li>Giao lưu chia sẻ kinh nghiệm canh tác</li>
        <li>Các trò chơi dân gian vui nhộn</li>
        <li>Văn nghệ và gala dinner</li>
      </ul>
      
      <p>Đây là dịp để các thành viên HTX gặp gỡ, giao lưu, tăng cường tinh thần đoàn kết và động viên lẫn nhau trong công việc sản xuất.</p>
      
      <p><strong>Kết quả đáng chú ý:</strong> 15 hộ nông dân xuất sắc đã được vinh danh và nhận phần thưởng giá trị. HTX cũng công bố kế hoạch mở rộng quy mô hoạt động trong năm tới.</p>
    `
  }
};

function openNewsDetail(newsId) {
  const news = newsData[newsId];
  if (!news) return;

  document.getElementById('modalNewsTitle').textContent = news.title;
  document.getElementById('modalNewsDate').textContent = news.date;
  document.getElementById('modalNewsImg').src = news.image;
  document.getElementById('modalNewsContent').innerHTML = news.content;

  document.getElementById('newsModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeNewsDetail() {
  document.getElementById('newsModal').classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const productModal = document.getElementById('productModal');
  const newsModal = document.getElementById('newsModal');
  
  if (event.target === productModal) {
    closeProductDetail();
  }
  if (event.target === newsModal) {
    closeNewsDetail();
  }
}

// ====== AUTO ADD VIEW DETAIL BUTTONS ======
function addViewDetailButtons() {
  // Add buttons to all product items
  const productItems = document.querySelectorAll('.product-item');
  productItems.forEach((item, index) => {
    // Skip if button already exists
    if (item.querySelector('.view-detail-btn')) return;
    
    const productId = item.getAttribute('data-product-id') || (index + 1);
    item.setAttribute('data-product-id', productId);
    
    const btn = document.createElement('button');
    btn.className = 'view-detail-btn';
    btn.textContent = 'Xem Chi Tiết';
    btn.onclick = function() {
      openProductDetail(productId);
    };
    
    item.appendChild(btn);
  });

  // Add "Đọc Thêm" buttons to all news cards
  const newsCards = document.querySelectorAll('.news-card');
  newsCards.forEach((card, index) => {
    // Skip if button already exists
    if (card.querySelector('.read-more-btn')) {
      return;
    }
    
    // Check if it's a community card or news card
    const communityId = card.getAttribute('data-community-id');
    const newsId = card.getAttribute('data-news-id');
    
    if (communityId) {
      card.setAttribute('data-community-id', communityId);
      
      const btn = document.createElement('button');
      btn.className = 'read-more-btn';
      btn.textContent = 'Đọc Thêm';
      btn.onclick = function() {
        openCommunityDetail(communityId);
      };
      
      const newsContent = card.querySelector('.news-content');
      if (newsContent) {
        newsContent.appendChild(btn);
      }
    } else {
      const id = newsId || (index + 1);
      card.setAttribute('data-news-id', id);
      
      const btn = document.createElement('button');
      btn.className = 'read-more-btn';
      btn.textContent = 'Đọc Thêm';
      btn.onclick = function() {
        openNewsDetail(id);
      };
      
      const newsContent = card.querySelector('.news-content');
      if (newsContent) {
        newsContent.appendChild(btn);
      }
    }
  });
}

// ====== COMMUNITY DETAIL MODAL ======
function openCommunityDetail(communityId) {
  const community = communityData[communityId];
  if (!community) return;

  document.getElementById('modalNewsTitle').textContent = community.title;
  document.getElementById('modalNewsDate').textContent = community.date;
  document.getElementById('modalNewsImg').src = community.image;
  document.getElementById('modalNewsContent').innerHTML = community.content;

  document.getElementById('newsModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

// ====== CAPACITY BANNER SLIDER ======
document.addEventListener('DOMContentLoaded', function() {
  const capacitySlides = document.querySelectorAll('.capacity-slide');
  const capacityDots = document.querySelectorAll('.capacity-dot');
  const capacityPrev = document.querySelector('.capacity-prev');
  const capacityNext = document.querySelector('.capacity-next');
  let currentCapacitySlide = 0;
  const capacitySlideInterval = 5000; // Auto slide every 5 seconds

  function showCapacitySlide(index) {
    // Remove active class from all slides and dots
    capacitySlides.forEach(slide => slide.classList.remove('active'));
    capacityDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (capacitySlides[index]) {
      capacitySlides[index].classList.add('active');
    }
    if (capacityDots[index]) {
      capacityDots[index].classList.add('active');
    }
  }

  function nextCapacitySlide() {
    currentCapacitySlide = (currentCapacitySlide + 1) % capacitySlides.length;
    showCapacitySlide(currentCapacitySlide);
  }

  function prevCapacitySlide() {
    currentCapacitySlide = (currentCapacitySlide - 1 + capacitySlides.length) % capacitySlides.length;
    showCapacitySlide(currentCapacitySlide);
  }

  // Next button - chỉ chuyển khi click
  if (capacityNext) {
    capacityNext.addEventListener('click', () => {
      nextCapacitySlide();
    });
  }

  // Previous button - chỉ chuyển khi click
  if (capacityPrev) {
    capacityPrev.addEventListener('click', () => {
      prevCapacitySlide();
    });
  }

  // Dots navigation - chỉ chuyển khi click
  capacityDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentCapacitySlide = index;
      showCapacitySlide(currentCapacitySlide);
    });
  });
});

// ====== SCROLL TO TOP ======
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ====== PRODUCT DETAIL MODAL ======
const productData = {
  hanhngo: {
    name: 'Hành Ngò Đà Lạt',
    price: '10.000đ/kg',
    image: 'assets/img/HanhNgo.jpg',
    description: 'Hành ngò Đà Lạt tươi xanh, thơm ngon, được trồng trên cao nguyên Đà Lạt với khí hậu mát mẻ quanh năm. Đây là loại rau gia vị không thể thiếu trong bữa ăn của người Việt.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1kg',
      'Bảo quản: Ngăn mát tủ lạnh 5-7 ngày',
      'Giá trị dinh dưỡng: Giàu vitamin C, K và chất chống oxy hóa',
      'Tiêu chuẩn: VietGAP'
    ]
  },
  bapcai: {
    name: 'Bắp Cải Đà Lạt',
    price: '5.000đ/500g',
    image: 'assets/img/Bắp cải.jpg',
    description: 'Bắp cải Đà Lạt tươi ngon, lá xanh đều, chắc nịch. Giàu chất xơ và vitamin, rất tốt cho sức khỏe.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 500g/bắp',
      'Bảo quản: Ngăn mát tủ lạnh 7-10 ngày',
      'Giá trị dinh dưỡng: Giàu vitamin C, K, chất xơ',
      'Tiêu chuẩn: VietGAP'
    ]
  },
  caithao: {
    name: 'Cải Thảo Đà Lạt',
    price: '5.000đ',
    image: 'assets/img/cai-thao.png',
    description: 'Cải thảo Đà Lạt tươi xanh, giòn ngọt, lá mỏng mềm. Thích hợp cho nhiều món ăn từ xào, nấu canh đến lẩu.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 500g-800g/bắp',
      'Bảo quản: Ngăn mát tủ lạnh 5-7 ngày',
      'Giá trị dinh dưỡng: Giàu vitamin A, C, canxi',
      'Tiêu chuẩn: VietGAP'
    ]
  },
  otchuong: {
    name: 'Ớt Chuông Đà Lạt',
    price: '10.000đ/500g',
    image: 'assets/img/ot chuong.png',
    description: 'Ớt chuông Đà Lạt nhiều màu sắc, giòn ngọt, không cay. Giàu vitamin C gấp nhiều lần cam, rất tốt cho sức khỏe.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 500g',
      'Màu sắc: Đỏ, vàng, xanh',
      'Bảo quản: Ngăn mát tủ lạnh 7-10 ngày',
      'Giá trị dinh dưỡng: Cực giàu vitamin C, A, chất chống oxy hóa',
      'Tiêu chuẩn: VietGAP'
    ]
  },
  carot: {
    name: 'Cà Rốt Đà Lạt',
    price: '5.000đ/kg',
    image: 'assets/img/Ca Rot.jpg',
    description: 'Cà rốt Đà Lạt màu cam đỏ tự nhiên, giòn ngọt. Giàu beta-caroten tốt cho mắt và làn da.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1kg',
      'Bảo quản: Ngăn mát tủ lạnh 2-3 tuần',
      'Giá trị dinh dưỡng: Giàu beta-caroten, vitamin A',
      'Tiêu chuẩn: VietGAP'
    ]
  },
  khoaitay: {
    name: 'Khoai Tây Đà Lạt',
    price: '15.000đ/kg',
    image: 'assets/img/khoai tay.jpg',
    description: 'Khoai tây Đà Lạt chất lượng cao, bùi ngon, thịt vàng đều. Thích hợp cho nhiều món ăn.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1kg',
      'Bảo quản: Nơi khô ráo, thoáng mát 2-3 tuần',
      'Giá trị dinh dưỡng: Giàu tinh bột, kali, vitamin C',
      'Tiêu chuẩn: VietGAP'
    ]
  },
  cucai: {
    name: 'Củ Cải Đà Lạt',
    price: '5.000đ/kg',
    image: 'assets/img/616_cu_cai.png',
    description: 'Củ cải trắng Đà Lạt tươi ngon, giòn ngọt. Thích hợp nấu canh, làm kim chi hoặc ăn sống.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1kg',
      'Bảo quản: Ngăn mát tủ lạnh 1-2 tuần',
      'Giá trị dinh dưỡng: Giàu vitamin C, chất xơ',
      'Tiêu chuẩn: VietGAP'
    ]
  },
  khoailang: {
    name: 'Khoai Lang Đà Lạt',
    price: '5.000đ/kg',
    image: 'assets/img/khoai lang.jpg',
    description: 'Khoai lang Đà Lạt thơm bùi, ngọt tự nhiên. Giàu chất dinh dưỡng, tốt cho sức khỏe.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 1kg',
      'Bảo quản: Nơi khô ráo, thoáng mát 2-3 tuần',
      'Giá trị dinh dưỡng: Giàu beta-caroten, chất xơ, vitamin A',
      'Tiêu chuẩn: VietGAP'
    ]
  },
  chanhday: {
    name: 'Nước Cốt Chanh Dây Đà Lạt',
    price: '15.000đ/lọ',
    image: 'assets/img/chanhday1.jpg',
    description: 'Nước cốt chanh dây 100% tự nhiên, không đường, không chất bảo quản. Giữ nguyên hương vị thơm ngon đặc trưng của chanh dây Đà Lạt.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Dung tích: 500ml/lọ',
      'Thành phần: 100% chanh dây tươi',
      'Bảo quản: Ngăn mát tủ lạnh sau khi mở',
      'Hạn sử dụng: 6 tháng',
      'Tiêu chuẩn: ATTP'
    ]
  },
  taoxoan: {
    name: 'Tảo Xoăn Thăng Hoa',
    price: '25.000đ/500g',
    image: 'assets/img/tao xoan thang hoa.jpg',
    description: 'Tảo xoăn (Spirulina) thăng hoa chất lượng cao, giàu protein thực vật, vitamin và khoáng chất. Sản phẩm dinh dưỡng tuyệt vời cho sức khỏe.',
    specs: [
      'Xuất xứ: Đà Lạt, Lâm Đồng',
      'Trọng lượng: 500g',
      'Công nghệ: Sấy thăng hoa',
      'Bảo quản: Nơi khô ráo, tránh ánh sáng',
      'Hạn sử dụng: 12 tháng',
      'Giá trị dinh dưỡng: Giàu protein (60-70%), vitamin B12, sắt',
      'Tiêu chuẩn: ATTP'
    ]
  }
};

function openProductDetail(productId) {
  const product = productData[productId];
  if (!product) return;

  document.getElementById('modalProductTitle').textContent = product.name;
  document.getElementById('modalProductPrice').textContent = product.price;
  document.getElementById('modalProductImg').src = product.image;
  document.getElementById('modalProductDescription').textContent = product.description;
  
  const specsList = document.getElementById('modalProductSpecs');
  specsList.innerHTML = '';
  product.specs.forEach(spec => {
    const li = document.createElement('li');
    li.textContent = spec;
    specsList.appendChild(li);
  });

  document.getElementById('productModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
  document.getElementById('productModal').classList.remove('show');
  document.body.style.overflow = 'auto';
}

function increaseQuantity() {
  const input = document.getElementById('productQuantity');
  input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
  const input = document.getElementById('productQuantity');
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

function addToCart() {
  const quantity = document.getElementById('productQuantity').value;
  const productName = document.getElementById('modalProductTitle').textContent;
  alert(`Đã thêm ${quantity} ${productName} vào giỏ hàng!`);
  closeProductDetail();
}

// === ACTIVE STATE DETECTION FOR PARTNER PAGES ===
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-menu .dropdown');
  
  // Check if current page is a partner page
  if (currentPath.includes('partners')) {
    navItems.forEach(item => {
      const link = item.querySelector('a');
      const submenu = item.querySelector('.dropdown-menu');
      
      // Check main menu item
      if (link && link.textContent.includes('ĐỐI TÁC')) {
        item.classList.add('active-trail');
      }
      
      // Check submenu items
      if (submenu) {
        const submenuLinks = submenu.querySelectorAll('a');
        submenuLinks.forEach(subLink => {
          const href = subLink.getAttribute('href');
          if (href && currentPath.includes(href)) {
            subLink.classList.add('active');
            item.classList.add('active-trail');
          }
        });
      }
    });
  }
});
