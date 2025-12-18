/**
 * Mobile Menu Handler
 * Xử lý menu hamburger cho thiết bị di động
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    function initMobileMenu() {
        const navContent = document.querySelector('.nav-content');
        const factoryMenu = document.querySelector('.factory-menu');
        
        if (!navContent || !factoryMenu) {
            console.warn('Navigation elements not found');
            return;
        }
        
        // Create mobile menu toggle button if it doesn't exist
        let menuToggle = document.querySelector('.factory-menu-toggle');
        
        if (!menuToggle) {
            menuToggle = document.createElement('button');
            menuToggle.className = 'factory-menu-toggle';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<span class="hamburger-icon">☰</span>';
            
            // Insert before the nav element
            const factoryNav = document.querySelector('.factory-nav');
            if (factoryNav) {
                navContent.insertBefore(menuToggle, factoryNav);
            }
        }
        
        // Toggle menu on button click
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = factoryMenu.classList.contains('mobile-active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Handle dropdown toggles on mobile
        const dropdownToggles = document.querySelectorAll('.factory-menu .has-dropdown > a');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    const parentLi = this.parentElement;
                    const isActive = parentLi.classList.contains('active');
                    
                    // Close all other dropdowns at the same level
                    const siblings = Array.from(parentLi.parentElement.children);
                    siblings.forEach(sibling => {
                        if (sibling !== parentLi) {
                            sibling.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    parentLi.classList.toggle('active');
                }
            });
        });
        
        // Handle submenu toggles on mobile
        const submenuToggles = document.querySelectorAll('.factory-menu .has-submenu > a');
        
        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    const parentLi = this.parentElement;
                    parentLi.classList.toggle('active');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (factoryMenu.classList.contains('mobile-active')) {
                if (!e.target.closest('.factory-menu') && !e.target.closest('.factory-menu-toggle')) {
                    closeMenu();
                }
            }
        });
        
        // Close menu on window resize to desktop
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768 && factoryMenu.classList.contains('mobile-active')) {
                    closeMenu();
                }
            }, 250);
        });
        
        // Close menu when ESC key is pressed
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && factoryMenu.classList.contains('mobile-active')) {
                closeMenu();
                menuToggle.focus();
            }
        });
        
        function openMenu() {
            factoryMenu.classList.add('mobile-active');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.querySelector('.hamburger-icon').innerHTML = '✕';
            document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
        }
        
        function closeMenu() {
            factoryMenu.classList.remove('mobile-active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.querySelector('.hamburger-icon').innerHTML = '☰';
            document.body.style.overflow = ''; // Restore body scroll
            
            // Close all dropdowns
            const activeDropdowns = document.querySelectorAll('.factory-menu .active');
            activeDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }
})();
