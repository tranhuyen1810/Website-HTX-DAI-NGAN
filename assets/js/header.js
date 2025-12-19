/**
 * Header Navigation & Mobile Menu Script
 * Handles mobile menu toggle, dropdown menus, and active states
 */

(function() {
  'use strict';

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNavigation = document.querySelector('.main-navigation');
  const body = document.body;

  if (mobileMenuToggle && mainNavigation) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNavigation.classList.toggle('active');
      this.classList.toggle('active');
      body.style.overflow = mainNavigation.classList.contains('active') ? 'hidden' : '';
      
      // Animate hamburger icon
      const spans = this.querySelectorAll('span');
      if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // Desktop Dropdown Control - Only one dropdown open at a time
  const hasDropdownItems = document.querySelectorAll('.has-dropdown');
  
  hasDropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    // Desktop hover behavior
    item.addEventListener('mouseenter', function() {
      if (window.innerWidth > 768) {
        // Close all other dropdowns
        hasDropdownItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('dropdown-active');
          }
        });
        // Open current dropdown
        item.classList.add('dropdown-active');
      }
    });
    
    // Close dropdown when mouse leaves
    item.addEventListener('mouseleave', function() {
      if (window.innerWidth > 768) {
        item.classList.remove('dropdown-active');
      }
    });
    
    // Mobile dropdown toggle
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        
        // Close all other dropdowns on mobile
        hasDropdownItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        item.classList.toggle('active');
      }
    });
  });
  
  // Close all dropdowns when mouse leaves navigation area
  if (mainNavigation) {
    mainNavigation.addEventListener('mouseleave', function() {
      if (window.innerWidth > 768) {
        hasDropdownItems.forEach(item => {
          item.classList.remove('dropdown-active');
        });
      }
    });
  }

  // Set Active Menu Item based on current page
  function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      // Check if current path matches link href
      if (href && currentPath.includes(href) && href !== '/') {
        link.classList.add('active');
      } else if (href === '/' && (currentPath === '/' || currentPath === '/index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Language Switcher
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      langButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const lang = this.getAttribute('data-lang');
      console.log('Language switched to:', lang);
      // Add your language switching logic here
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function() {
      const query = searchInput.value.trim();
      if (query) {
        console.log('Searching for:', query);
        // Add your search logic here
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
    });
    
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mainNavigation && mainNavigation.classList.contains('active')) {
      if (!mainNavigation.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mainNavigation.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        body.style.overflow = '';
        
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768) {
        mainNavigation.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        body.style.overflow = '';
        
        // Reset dropdown active states
        document.querySelectorAll('.has-dropdown').forEach(item => {
          item.classList.remove('active');
        });
      }
    }, 250);
  });

  // Initialize
  setActiveMenuItem();
  
  // Update active item on page navigation
  window.addEventListener('popstate', setActiveMenuItem);

})();
