/* ========================================
   WEBSITE HTX - Main JavaScript
   ======================================== */

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav?.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active'));
    });

    // Close menu when link is clicked (only for non-dropdown items)
    document.querySelectorAll('.nav-item:not(.has-dropdown) .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav?.classList.remove('active');
        menuToggle?.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mobile: Toggle dropdown on tap for items with dropdown
  if (window.innerWidth <= 768) {
    navItems.forEach(item => {
      const navLink = item.querySelector('.nav-link');
      navLink?.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    });
  }
}

// Dropdown Menu Hover (Desktop)
function initDropdownMenu() {
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');

  navItems.forEach(item => {
    const navLink = item.querySelector('.nav-link');
    const dropdownMenu = item.querySelector('.dropdown-menu');

    // Desktop: hover to show dropdown
    if (window.innerWidth > 768) {
      item.addEventListener('mouseenter', () => {
        if (dropdownMenu) {
          dropdownMenu.style.pointerEvents = 'auto';
        }
      });

      item.addEventListener('mouseleave', () => {
        if (dropdownMenu) {
          dropdownMenu.style.pointerEvents = 'none';
        }
      });

      // Ensure all dropdowns are clickable
      dropdownMenu?.addEventListener('mouseenter', () => {
        dropdownMenu.style.pointerEvents = 'auto';
      });
    }

    // Desktop: click on nav link with dropdown should navigate
    navLink?.addEventListener('click', (e) => {
      if (window.innerWidth > 768) {
        const href = navLink.getAttribute('href');
        if (href && !href.startsWith('#')) {
          window.location.href = href;
        }
      }
    });
  });
}

// Set Active Menu Link
function setActiveMenuLink() {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  
  document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
    const href = link.getAttribute('href');
    let isActive = false;

    if (!href) return;

    // Check if current page matches
    if (href === '/' && currentPath === '/') {
      isActive = true;
    } else if (href.startsWith('pages/') && currentPath.includes(href.split('/')[1])) {
      isActive = true;
    } else if (href.startsWith('#') && href === currentHash) {
      isActive = true;
    } else if (href.startsWith('pages/') && currentPath.includes(href)) {
      isActive = true;
    }

    if (isActive) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Highlight parent nav items if a dropdown link is active
  document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
    const hasActiveChild = item.querySelector('.dropdown-link.active');
    const parentLink = item.querySelector('.nav-link');
    if (hasActiveChild) {
      parentLink?.classList.add('active');
    }
  });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Lazy Load Images
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-img');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// Form Validation
function validateForm(formElement) {
  let isValid = true;
  const inputs = formElement.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    const value = input.value.trim();
    const errorEl = input.parentElement?.querySelector('.form-error');

    // Remove previous error
    if (errorEl) errorEl.remove();

    // Required validation
    if (input.hasAttribute('required') && !value) {
      isValid = false;
      showError(input, 'Trường này là bắt buộc');
      return;
    }

    // Email validation
    if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        showError(input, 'Email không hợp lệ');
        return;
      }
    }

    // Phone validation
    if (input.type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        showError(input, 'Số điện thoại không hợp lệ');
        return;
      }
    }

    // Min length validation
    if (input.hasAttribute('minlength')) {
      const minLength = parseInt(input.getAttribute('minlength'));
      if (value.length < minLength) {
        isValid = false;
        showError(input, `Tối thiểu ${minLength} ký tự`);
        return;
      }
    }
  });

  return isValid;
}

function showError(input, message) {
  const errorEl = document.createElement('div');
  errorEl.className = 'form-error';
  errorEl.textContent = message;
  input.parentElement?.appendChild(errorEl);
  input.classList.add('is-invalid');
}

// Form Submission Handler
function initFormHandlers() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate
      if (!validateForm(form)) {
        return;
      }

      // Honeypot check (anti-spam)
      const honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Spam detected');
        return;
      }

      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading"></span> Đang gửi...';

      try {
        // Simulate API call (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Success
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.textContent = 'Cảm ơn! Chúng tôi sẽ phản hồi sớm nhất có thể.';
        form.insertBefore(successMsg, form.firstChild);

        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Remove success message after 5 seconds
        setTimeout(() => successMsg.remove(), 5000);
      } catch (error) {
        console.error('Form submission error:', error);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'form-error';
        errorMsg.textContent = 'Có lỗi xảy ra. Vui lòng thử lại.';
        form.insertBefore(errorMsg, form.firstChild);

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  });
}

// Accordion Functionality
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = header.nextElementSibling;

      // Close other items
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-body')?.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
      body?.classList.toggle('active');
    });
  });
}

// Pagination
function initPagination() {
  document.querySelectorAll('.pagination a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Implement pagination logic here
      console.log('Navigate to:', link.href);
      // window.location.href = link.href;
    });
  });
}

// Table of Contents Generator
function generateTableOfContents() {
  const headings = document.querySelectorAll('h2, h3');
  if (headings.length === 0) return;

  const toc = document.createElement('nav');
  toc.className = 'table-of-contents';
  const list = document.createElement('ul');

  headings.forEach((heading, index) => {
    heading.id = heading.id || `heading-${index}`;
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    li.appendChild(link);
    list.appendChild(li);
  });

  toc.appendChild(list);
  return toc;
}

// Search Functionality (basic)
function initSearch() {
  const searchInputs = document.querySelectorAll('input[type="search"]');
  
  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      const items = document.querySelectorAll('[data-searchable]');

      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(keyword) ? '' : 'none';
      });
    });
  });
}

// Filter Functionality
function initFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter items
      items.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Breadcrumb Generator
function generateBreadcrumb(links = []) {
  const breadcrumb = document.createElement('ul');
  breadcrumb.className = 'breadcrumb';

  // Add home link
  const homeLi = document.createElement('li');
  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.textContent = 'Trang chủ';
  homeLi.appendChild(homeLink);
  breadcrumb.appendChild(homeLi);

  // Add custom links
  links.forEach(({ text, href }) => {
    const li = document.createElement('li');
    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = text;
      li.appendChild(link);
    } else {
      li.textContent = text;
    }
    breadcrumb.appendChild(li);
  });

  return breadcrumb;
}

// Initialize on document ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDropdownMenu();
  setActiveMenuLink();
  initSmoothScroll();
  initLazyLoad();
  initFormHandlers();
  initAccordion();
  initPagination();
  initSearch();
  initFilter();

  console.log('Website HTX initialized');
});

// Re-initialize on page visibility change (for SPAs)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    setActiveMenuLink();
  }
});

// Handle window resize to reinitialize menu on mobile/desktop switch
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768) {
      // Switch to desktop: close mobile menu
      const nav = document.querySelector('.main-nav');
      const menuToggle = document.querySelector('.menu-toggle');
      nav?.classList.remove('active');
      menuToggle?.classList.remove('active');
      
      // Reset dropdown states
      document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
        item.classList.remove('open');
      });
    }
  }, 250);
});

// Export functions for use in other scripts
window.HTXWebsite = {
  validateForm,
  generateBreadcrumb,
  generateTableOfContents,
  initLazyLoad,
  initAccordion,
  setActiveMenuLink,
  initDropdownMenu,
};
