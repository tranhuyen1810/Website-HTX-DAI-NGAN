#!/usr/bin/env python3
"""
Script để cập nhật header cho tất cả các trang HTML
"""

import os
import re

# Header template cho các trang trong /pages/
HEADER_TEMPLATE_PAGES = '''  <!-- Header -->
  <header class="site-header">
    <!-- Top Header -->
    <div class="top-header">
      <div class="top-header-container">
        <!-- Logo & Slogan -->
        <div class="logo-section">
          <a href="../" class="logo">
            <img class="logo-icon" src="../assets/img/1.png" alt="HTX Logo" />
            <div class="logo-text">
              <span class="logo-name">LÂM ĐỒNG ĐẠI NGÀN</span>
              <span class="logo-slogan">0767333379</span>
            </div>
          </a>
        </div>

        <!-- Top Right: Hotline, Search, Language, Cart -->
        <div class="top-header-right">

          <!-- Search Box -->
          <div class="header-search">
            <input type="text" placeholder="Tìm kiếm..." class="search-input">
            <button class="search-btn">🔍</button>
          </div>

          <!-- Language Switcher -->
          <div class="language-switcher">
            <button class="lang-btn active" data-lang="vi">🇻🇳</button>
            <button class="lang-btn" data-lang="en">🇬🇧</button>
          </div>

          <!-- Cart Icon -->
          <div class="header-cart">
            <a href="#" class="cart-link">
              <span class="cart-icon">🛒</span>
              <span class="cart-count">0</span>
            </a>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="main-navigation">
      <div class="nav-container">
        <ul class="nav-menu">
          <!-- Trang chủ -->
          <li class="nav-item">
            <a href="../" class="nav-link">
              <span class="nav-icon">🏠</span>
              <span class="nav-text">Trang chủ</span>
            </a>
          </li>

          <!-- Giới thiệu -->
          <li class="nav-item has-dropdown">
            <a href="gioi-thieu.html" class="nav-link">
              <span class="nav-icon">ℹ️</span>
              <span class="nav-text">Giới thiệu</span>
            </a>
            <div class="dropdown-menu">
              <a href="gioi-thieu.html" class="dropdown-link">Về chúng tôi</a>
              <a href="gioi-thieu.html#tam-nhin" class="dropdown-link">Tầm nhìn</a>
              <a href="gioi-thieu.html#su-menh" class="dropdown-link">Sứ mệnh</a>
              <a href="ho-so-nang-luc.html" class="dropdown-link">Hồ sơ năng lực</a>
            </div>
          </li>

          <!-- Sản phẩm -->
          <li class="nav-item has-dropdown">
            <a href="san-pham.html" class="nav-link">
              <span class="nav-icon">🌾</span>
              <span class="nav-text">Sản phẩm</span>
            </a>
            <div class="dropdown-menu mega-menu">
              <div class="mega-menu-section">
                <h4>Sản phẩm</h4>
                <a href="san-pham/box-rau.html" class="dropdown-link">Rau, Củ</a>
                <a href="san-pham/thanh-phan.html" class="dropdown-link">Trà – Nước cốt</a>
              </div>
              <div class="mega-menu-section">
                <h4>Dịch vụ</h4>
                <a href="#dich-vu-say-thang-hoa" class="dropdown-link">Sấy thăng hoa</a>
                <a href="#dich-vu-say" class="dropdown-link">Sấy nóng/lạnh</a>
                <a href="#dich-vu-kho-tru" class="dropdown-link">Cấp/Trữ đông</a>
              </div>
            </div>
          </li>

          <!-- Tin tức & Sự kiện -->
          <li class="nav-item has-dropdown">
            <a href="#tin-tuc" class="nav-link">
              <span class="nav-icon">📰</span>
              <span class="nav-text">Tin tức & Sự kiện</span>
            </a>
            <div class="dropdown-menu">
              <a href="#tin-tuc-chinh" class="dropdown-link">Tin tức</a>
              <a href="#su-kien" class="dropdown-link">Sự kiện</a>
            </div>
          </li>

          <!-- Thành viên HTX -->
          <li class="nav-item has-dropdown">
            <a href="thanh-vien.html" class="nav-link">
              <span class="nav-icon">👥</span>
              <span class="nav-text">Thành viên HTX</span>
            </a>
            <div class="dropdown-menu">
              <a href="thanh-vien.html" class="dropdown-link">Thành viên tiêu biểu</a>
              <a href="thanh-vien.html#quyen-loi" class="dropdown-link">Quyền lợi thành viên</a>
            </div>
          </li>

          <!-- Đối tác -->
          <li class="nav-item has-dropdown">
            <a href="#doi-tac" class="nav-link">
              <span class="nav-icon">🤝</span>
              <span class="nav-text">Hệ thống phân phối</span>
            </a>
            <div class="dropdown-menu">
              <a href="#doi-tac-cua-chung-toi" class="dropdown-link">Đối tác của chúng tôi</a>
              <a href="#goi-dau-tu" class="dropdown-link">Các gói đầu tư</a>
            </div>
          </li>

          <!-- Liên hệ -->
          <li class="nav-item">
            <a href="lien-he.html" class="nav-link">
              <span class="nav-icon">📧</span>
              <span class="nav-text">Liên hệ</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>'''

# Header cho pages/san-pham/
HEADER_TEMPLATE_SANPHAM = HEADER_TEMPLATE_PAGES.replace('../assets/img/1.png', '../../assets/img/1.png').replace('href="../"', 'href="../../"').replace('href="gioi-thieu.html"', 'href="../gioi-thieu.html"').replace('href="ho-so-nang-luc.html"', 'href="../ho-so-nang-luc.html"').replace('href="san-pham.html"', 'href="../san-pham.html"').replace('href="san-pham/', 'href="../san-pham/').replace('href="thanh-vien.html"', 'href="../thanh-vien.html"').replace('href="lien-he.html"', 'href="../lien-he.html"')

def update_header(file_path, is_sanpham=False):
    """Cập nhật header cho một file"""
    print(f"Updating {file_path}...")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Tìm và thay thế header cũ
    # Pattern tìm từ <header> đến </header>
    pattern = r'  <!-- Header -->.*?</header>'
    
    template = HEADER_TEMPLATE_SANPHAM if is_sanpham else HEADER_TEMPLATE_PAGES
    
    new_content = re.sub(pattern, template, content, flags=re.DOTALL)
    
    # Kiểm tra xem có thay đổi không
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  ✅ Updated {file_path}")
        return True
    else:
        print(f"  ⚠️  No changes needed for {file_path}")
        return False

# Main execution
if __name__ == '__main__':
    base_dir = '/workspaces/Website-HTX-DAI-NGAN'
    
    # Danh sách các file cần cập nhật
    pages_files = [
        'pages/lien-he.html',
        'pages/san-pham.html',
        'pages/ho-so-nang-luc.html',
        'pages/thanh-vien.html'
    ]
    
    sanpham_files = [
        'pages/san-pham/box-rau.html',
        'pages/san-pham/thanh-phan.html',
        'pages/san-pham/thuc-don-tuan.html'
    ]
    
    updated_count = 0
    
    # Cập nhật pages/
    for file in pages_files:
        full_path = os.path.join(base_dir, file)
        if os.path.exists(full_path):
            if update_header(full_path, is_sanpham=False):
                updated_count += 1
    
    # Cập nhật pages/san-pham/
    for file in sanpham_files:
        full_path = os.path.join(base_dir, file)
        if os.path.exists(full_path):
            if update_header(full_path, is_sanpham=True):
                updated_count += 1
    
    print(f"\n✅ Hoàn thành! Đã cập nhật {updated_count} file(s)")
