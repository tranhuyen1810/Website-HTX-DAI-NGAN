// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-navigation');
    const body = document.body;
    
    // Toggle menu
    menuToggle?.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav?.classList.toggle('active');
        body.style.overflow = mainNav?.classList.contains('active') ? 'hidden' : '';
    });
    
    // Dropdown toggle on mobile
    const dropdownToggles = document.querySelectorAll('.has-dropdown > .nav-link');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                // Close other dropdowns
                document.querySelectorAll('.has-dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-navigation') && 
            !e.target.closest('.mobile-menu-toggle') && 
            mainNav?.classList.contains('active')) {
            menuToggle?.classList.remove('active');
            mainNav?.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Close menu on window resize to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && mainNav?.classList.contains('active')) {
                menuToggle?.classList.remove('active');
                mainNav?.classList.remove('active');
                body.style.overflow = '';
            }
        }, 250);
    });
});
