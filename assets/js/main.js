// Basic animation helpers: reveal product cards on scroll and smooth scroll for CTAs
document.addEventListener('DOMContentLoaded', function(){
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
});
