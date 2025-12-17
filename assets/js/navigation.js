// ==================== NAVIGATION & DROPDOWN MENU ====================
// Xử lý menu dropdown và active states

document.addEventListener('DOMContentLoaded', function() {
    
    // === ACTIVE STATE DETECTION ===
    // Tự động đánh dấu menu item active dựa trên URL hiện tại
    function setActiveMenuItem() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Xóa tất cả active class cũ
        document.querySelectorAll('.factory-menu li').forEach(item => {
            item.classList.remove('active');
        });
        
        // Map trang con với parent menu
        const pageToParent = {
            // Giới thiệu
            'thong-tin-doanh-nghiep.html': 'nav_about',
            'lich-su-phat-trien.html': 'nav_about',
            'tam-nhin-su-menh.html': 'nav_about',
            
            // Đối tác
            'doi-tac-nong-ho-mo-hinh.html': 'nav_partners',
            'doi-tac-nong-ho-cam-ket.html': 'nav_partners',
            'doi-tac-cho-dau-moi.html': 'nav_partners',
            'doi-tac-sieu-thi.html': 'nav_partners',
            'doi-tac-bep-an.html': 'nav_partners',
            'doi-tac-chuyen-giao.html': 'nav_partners',
            'doi-tac-cong-nghe.html': 'nav_partners',
            'doi-tac-ngan-hang.html': 'nav_partners',
            'doi-tac-quy-ho-tro.html': 'nav_partners',
            'doi-tac-to-chuc.html': 'nav_partners',
            
            // Thành viên HTX
            'danh-sach-thanh-vien.html': 'nav_members',
            'quy-che-tham-gia.html': 'nav_members',
            'quyen-loi-nghia-vu.html': 'nav_members',
            'tai-lieu-bieu-mau.html': 'nav_members',
            
            // Hồ sơ năng lực
            'tong-quan-nang-luc.html': 'nav_capacity',
            'nang-luc-san-xuat.html': 'nav_capacity',
            'nang-luc-so-che.html': 'nav_capacity',
            'nang-luc-kho-van.html': 'nav_capacity',
            
            // Sản phẩm và dịch vụ
            'box-rau.html': 'nav_products',
            'box-7kg-tuan.html': 'nav_products',
            'goi-theo-thang.html': 'nav_products',
            'thuc-don-tuan.html': 'nav_products',
            'thuc-don-hien-tai.html': 'nav_products',
            'lich-su-thuc-don.html': 'nav_products',
            'san-pham-thanh-phan.html': 'nav_products',
            'rau-la.html': 'nav_products',
            'rau-cu-qua.html': 'nav_products',
            'trai-cay.html': 'nav_products',
            'co-hoi-hop-tac.html': 'nav_products',
            'du-an-keu-goi.html': 'nav_products',
            'dang-ky-hop-tac.html': 'nav_products',
            
            // Liên hệ
            'contact.html': 'nav_contact',
            'cskh-phan-hoi.html': 'nav_contact',
            'faq.html': 'nav_contact'
        };
        
        // Tìm và đánh dấu menu item active
        document.querySelectorAll('.factory-menu a').forEach(link => {
            const href = link.getAttribute('href');
            
            // Kiểm tra exact match
            if (href === currentPage || href === `./${currentPage}`) {
                link.closest('li').classList.add('active');
                
                // Đánh dấu parent menu nếu là submenu
                let parentLi = link.closest('.dropdown-menu, .submenu');
                while (parentLi) {
                    const parentItem = parentLi.closest('li.has-dropdown, li.has-submenu');
                    if (parentItem) {
                        parentItem.classList.add('active');
                        parentLi = parentItem.closest('.dropdown-menu, .submenu');
                    } else {
                        break;
                    }
                }
            }
        });
        
        // Đánh dấu parent menu dựa trên mapping
        if (pageToParent[currentPage]) {
            const parentLink = document.querySelector(`[data-translate="${pageToParent[currentPage]}"]`);
            if (parentLink) {
                parentLink.closest('li').classList.add('active');
            }
        }
        
        // Đánh dấu Trang chủ nếu ở index
        if (currentPage === 'index.html' || currentPage === '') {
            const homeLink = document.querySelector('[data-translate="nav_home"]');
            if (homeLink) {
                homeLink.closest('li').classList.add('active');
            }
        }
        
        // Tự động mở dropdown "Đối tác" nếu đang ở trang đối tác
        if (pageToParent[currentPage] === 'nav_partners') {
            const partnersDropdown = document.querySelector('[data-translate="nav_partners"]');
            if (partnersDropdown) {
                const parentLi = partnersDropdown.closest('li.has-dropdown');
                if (parentLi) {
                    parentLi.classList.add('active-page');
                }
            }
        }
        
        // Tự động mở dropdown "Thành viên HTX" nếu đang ở trang thành viên
        if (pageToParent[currentPage] === 'nav_members') {
            const membersDropdown = document.querySelector('[data-translate="nav_members"]');
            if (membersDropdown) {
                const parentLi = membersDropdown.closest('li.has-dropdown');
                if (parentLi) {
                    parentLi.classList.add('active-page');
                }
            }
        }
    }
    
    // === DROPDOWN MENU BEHAVIOR ===
    // Xử lý hiển thị/ẩn dropdown menu
    
    const dropdownItems = document.querySelectorAll('.factory-menu .has-dropdown');
    const submenuItems = document.querySelectorAll('.factory-menu .has-submenu');
    
    // Desktop: Hover behavior (đã xử lý bằng CSS)
    // Mobile: Click behavior
    if (window.innerWidth <= 768) {
        
        // Xử lý click cho dropdown level 1
        dropdownItems.forEach(item => {
            const link = item.querySelector(':scope > a');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle active class
                item.classList.toggle('active');
                
                // Đóng các dropdown khác cùng cấp
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
        
        // Xử lý click cho submenu level 2
        submenuItems.forEach(item => {
            const link = item.querySelector(':scope > a');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle active class
                item.classList.toggle('active');
                
                // Đóng các submenu khác cùng cấp
                const parent = item.closest('.dropdown-menu');
                if (parent) {
                    parent.querySelectorAll('.has-submenu').forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
            });
        });
    }
    
    // === CLOSE DROPDOWN WHEN CLICKING OUTSIDE ===
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.factory-menu')) {
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
            submenuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // === KEYBOARD NAVIGATION ===
    // Hỗ trợ điều hướng bằng phím ESC để đóng dropdown
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
            submenuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // === HANDLE WINDOW RESIZE ===
    // Reset dropdown behavior khi thay đổi kích thước màn hình
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Xóa active classes khi resize
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
            submenuItems.forEach(item => {
                item.classList.remove('active');
            });
        }, 250);
    });
    
    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    // Cuộn mượt khi click vào anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.factory-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // === INITIALIZE ===
    setActiveMenuItem();
    
    // Re-check active state on navigation (for SPAs)
    window.addEventListener('popstate', setActiveMenuItem);
});

// ==================== MOBILE MENU TOGGLE ====================
// Xử lý mở/đóng menu trên mobile (nếu có nút hamburger)

function toggleMobileMenu() {
    const menu = document.querySelector('.factory-menu');
    const menuToggle = document.querySelector('.factory-menu-toggle');
    
    if (menu && menuToggle) {
        menu.classList.toggle('mobile-active');
        menuToggle.classList.toggle('active');
        
        // Prevent body scroll khi menu mở
        if (menu.classList.contains('mobile-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Export function nếu cần sử dụng ở nơi khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { toggleMobileMenu };
}
