"""
Script tự động tạo các trang HTML với mobile responsive template
"""

import os

# Template HTML với mobile responsive
HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <meta name="description" content="{description}">
  <meta name="keywords" content="{keywords}">
  <meta property="og:title" content="{title} - HTX Lâm Đồng Đại Ngàn">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="website">
  <title>{title} - HTX Lâm Đồng Đại Ngàn</title>
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="../css/mobile-responsive.css">
</head>
<body>
  <!-- Header -->
  <header class="site-header">
    <div class="top-header">
      <div class="top-header-container">
        <div class="logo-section">
          <a href="../index.html" class="logo">
            <img class="logo-icon" src="../assets/img/1.png" alt="HTX Logo" />
            <div class="logo-text">
              <span class="logo-name">HỢP TÁC XÃ<br>LÂM ĐỒNG ĐẠI NGÀN</span>
            </div>
          </a>
        </div>
        <div class="top-header-right">
          <div class="header-search">
            <input type="text" placeholder="Tìm kiếm..." class="search-input">
            <button class="search-btn">🔍</button>
          </div>
          <div class="language-switcher">
            <button class="lang-btn active" data-lang="vi">🇻🇳</button>
            <button class="lang-btn" data-lang="en">🇬🇧</button>
          </div>
          <div class="header-cart">
            <a href="#" class="cart-link">
              <span class="cart-icon">🛒</span>
              <span class="cart-count">0</span>
            </a>
          </div>
        </div>
        <button class="mobile-menu-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <nav class="main-navigation">
      <div class="nav-container">
        <ul class="nav-menu">
          <li class="nav-item"><a href="../index.html" class="nav-link"><span class="nav-text">Trang chủ</span></a></li>
          <li class="nav-item has-dropdown">
            <a href="gioi-thieu.html" class="nav-link {active_about}"><span class="nav-text">Giới thiệu</span></a>
            <div class="dropdown-menu">
              <a href="gioi-thieu.html" class="dropdown-link">Về chúng tôi</a>
              <a href="gioi-thieu.html#tam-nhin" class="dropdown-link">Tầm nhìn và sứ mệnh</a>
              <a href="ho-so-nang-luc.html" class="dropdown-link">Hồ sơ năng lực</a>
            </div>
          </li>
          <li class="nav-item has-dropdown">
            <a href="san-pham/box-rau.html" class="nav-link {active_products}"><span class="nav-text">Sản phẩm</span></a>
            <div class="dropdown-menu">
              <a href="rau-cu.html" class="dropdown-link">Rau, Củ</a>
              <a href="tra-nuoc-cot.html" class="dropdown-link">Trà – Nước cốt</a>
            </div>
          </li>
          <li class="nav-item has-dropdown">
            <a href="dich-vu-say-thang-hoa.html" class="nav-link {active_services}"><span class="nav-text">Dịch vụ</span></a>
            <div class="dropdown-menu">
              <a href="dich-vu-say-thang-hoa.html" class="dropdown-link">Sấy thăng hoa</a>
              <a href="dich-vu-say-nong-lanh.html" class="dropdown-link">Sấy nóng / lạnh</a>
              <a href="dich-vu-cap-tru-dong.html" class="dropdown-link">Cấp / Trữ đông</a>
            </div>
          </li>
          <li class="nav-item has-dropdown">
            <a href="tin-tuc.html" class="nav-link {active_news}"><span class="nav-text">Tin tức & Sự kiện</span></a>
            <div class="dropdown-menu">
              <a href="tin-tuc.html" class="dropdown-link">Tin tức</a>
              <a href="su-kien.html" class="dropdown-link">Sự kiện</a>
            </div>
          </li>
          <li class="nav-item has-dropdown">
            <a href="thanh-vien.html" class="nav-link {active_members}"><span class="nav-text">Thành viên HTX</span></a>
            <div class="dropdown-menu">
              <a href="thanh-vien-tieu-bieu.html" class="dropdown-link">Thành viên tiêu biểu</a>
              <a href="quyen-loi-thanh-vien.html" class="dropdown-link">Quyền lợi thành viên</a>
            </div>
          </li>
          <li class="nav-item has-dropdown">
            <a href="doi-tac.html" class="nav-link {active_partners}"><span class="nav-text">Hệ thống phân phối</span></a>
            <div class="dropdown-menu">
              <a href="doi-tac.html" class="dropdown-link">Đối tác của chúng tôi</a>
              <a href="goi-dau-tu.html" class="dropdown-link">Các gói đầu tư</a>
            </div>
          </li>
          <li class="nav-item"><a href="lien-he.html" class="nav-link {active_contact}"><span class="nav-text">Liên hệ</span></a></li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- Breadcrumb -->
  <section style="background-color: #f8f9fa; padding: 1rem 20px;">
    <div class="container">
      <ul class="breadcrumb">
        <li><a href="../index.html">Trang chủ</a></li>
        <li>{title}</li>
      </ul>
    </div>
  </section>

  <!-- Hero Section -->
  <section class="hero hero-banner" style="background: linear-gradient(135deg, #2c7a3f 0%, #4a9960 100%); padding: 3rem 20px; color: white;">
    <div class="container" style="text-align: center;">
      <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">{title}</h1>
      <p style="font-size: 1.2rem;">{subtitle}</p>
    </div>
  </section>

  <!-- Main Content -->
  <section class="bg-white" style="padding: 3rem 20px;">
    <div class="container">
      {content}
    </div>
  </section>

  <!-- Mobile Responsive CSS -->
  <style>
    /* ...existing code... */
    @media (max-width: 768px) {{
      body {{
        overflow-x: hidden;
      }}

      .hero h1 {{
        font-size: 1.8rem !important;
      }}

      .hero p {{
        font-size: 1rem !important;
      }}

      .container {{
        padding-left: 15px !important;
        padding-right: 15px !important;
      }}

      .row {{
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }}

      .row.cols-2 > div {{
        width: 100%;
      }}

      .card {{
        margin-bottom: 1.5rem;
      }}

      h2 {{
        font-size: 1.5rem !important;
      }}

      h3 {{
        font-size: 1.3rem !important;
      }}

      /* Mobile menu styles */
      .mobile-menu-toggle {{
        display: flex;
        flex-direction: column;
        gap: 4px;
        background: transparent;
        border: none;
        padding: 5px;
        cursor: pointer;
      }}

      .mobile-menu-toggle span {{
        width: 25px;
        height: 3px;
        background-color: #2c7a3f;
        display: block;
      }}

      .nav-menu {{
        display: none;
        flex-direction: column;
      }}

      .nav-menu.active {{
        display: flex;
      }}

      .nav-item {{
        border-bottom: 1px solid #eee;
      }}

      .nav-link {{
        padding: 1rem 15px;
        display: block;
      }}

      .dropdown-menu {{
        position: static;
        display: none;
        background-color: #f8f9fa;
      }}

      .has-dropdown.active .dropdown-menu {{
        display: block;
      }}

      .dropdown-link {{
        padding: 0.8rem 30px;
        display: block;
      }}
    }}
  </style>

  <!-- Footer -->
  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h4>📍 Thông tin liên hệ</h4>
        <p><strong>Địa chỉ:</strong> Số 1A, Bùi Thị Xuân, Phường Xuân Hương, TP. Đà Lạt, Lâm Đồng</p>
        <p><strong>Hotline:</strong> 0767333379</p>
        <p><strong>Email:</strong> AdminHTXDaiNgan@gmail.com</p>
      </div>
      <div class="footer-section">
        <h4>🔗 Liên kết nhanh</h4>
        <ul>
          <li><a href="gioi-thieu.html">Giới thiệu</a></li>
          <li><a href="thanh-vien.html">Thành viên</a></li>
          <li><a href="san-pham.html">Sản phẩm</a></li>
          <li><a href="lien-he.html">Liên hệ</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>📄 Chính sách</h4>
        <ul>
          <li><a href="#">Điều khoản sử dụng</a></li>
          <li><a href="#">Chính sách bảo mật</a></li>
          <li><a href="#">Chính sách hoàn trả</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>🌐 Kết nối</h4>
        <p>
          <a href="#">Facebook</a> | 
          <a href="#">Instagram</a> | 
          <a href="#">YouTube</a>
        </p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Hợp tác xã - Sản phẩm Nông nghiệp Sạch. All rights reserved.</p>
    </div>
  </footer>

  <script src="../js/main.js"></script>
  <script src="../assets/js/header.js"></script>
  <script>
    // Mobile menu toggle
    document.addEventListener('DOMContentLoaded', function() {{
      const toggle = document.querySelector('.mobile-menu-toggle');
      const menu = document.querySelector('.nav-menu');
      const dropdowns = document.querySelectorAll('.has-dropdown');

      if (toggle) {{
        toggle.addEventListener('click', function() {{
          menu.classList.toggle('active');
        }});
      }}

      dropdowns.forEach(function(dropdown) {{
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', function(e) {{
          if (window.innerWidth <= 768) {{
            e.preventDefault();
            dropdown.classList.toggle('active');
          }}
        }});
      }});
    }});
  </script>
</body>
</html>
'''

# Định nghĩa các trang cần tạo
pages_to_create = [
    {
        'filename': 'rau-cu.html',
        'title': 'Rau củ',
        'subtitle': 'Rau củ tươi sạch từ cao nguyên Đà Lạt',
        'description': 'Cung cấp rau củ tươi sạch, an toàn, đạt tiêu chuẩn VietGAP',
        'keywords': 'rau củ, rau sạch, rau đà lạt, rau hữu cơ',
        'active_products': 'active',
        'content': '''
<h2>🥬 Danh mục Rau củ</h2>
<div class="row">
  <div class="card">
    <img src="../assets/img/product-1.jpg" alt="Rau cải" class="card-img" onerror="this.src='../assets/img/placeholder.jpg'">
    <div class="card-body">
      <h3 class="card-title">Rau cải xanh</h3>
      <p class="card-text">Rau cải tươi ngon, giàu vitamin</p>
      <a href="#" class="btn btn-primary">Xem chi tiết</a>
    </div>
  </div>
  <div class="card">
    <img src="../assets/img/product-2.jpg" alt="Cà chua" class="card-img" onerror="this.src='../assets/img/placeholder.jpg'">
    <div class="card-body">
      <h3 class="card-title">Cà chua</h3>
      <p class="card-text">Cà chua đỏ tươi, giàu Lycopene</p>
      <a href="#" class="btn btn-primary">Xem chi tiết</a>
    </div>
  </div>
  <div class="card">
    <img src="../assets/img/product-3.jpg" alt="Cà rốt" class="card-img" onerror="this.src='../assets/img/placeholder.jpg'">
    <div class="card-body">
      <h3 class="card-title">Cà rốt</h3>
      <p class="card-text">Cà rốt Đà Lạt, giàu beta-caroten</p>
      <a href="#" class="btn btn-primary">Xem chi tiết</a>
    </div>
  </div>
</div>
<h3>🌱 Quy trình sản xuất</h3>
<p>Tất cả rau củ được sản xuất theo quy trình VietGAP, đảm bảo:</p>
<ul>
  <li>✓ Không sử dụng thuốc trừ sâu độc hại</li>
  <li>✓ Phân bón hữu cơ, tự nhiên</li>
  <li>✓ Kiểm soát chất lượng nghiêm ngặt</li>
  <li>✓ Truy xuất nguồn gốc rõ ràng</li>
</ul>
'''
    },
    {
        'filename': 'tra-nuoc-cot.html',
        'title': 'Trà & Nước cốt',
        'subtitle': 'Trà và nước cốt trái cây thiên nhiên',
        'description': 'Trà và nước cốt trái cây tự nhiên, không chất bảo quản',
        'keywords': 'trà, nước cốt, nước ép trái cây, đồ uống healthy',
        'active_products': 'active',
        'content': '''
<h2>🍵 Trà & Nước cốt Đà Lạt</h2>
<div class="row">
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Trà atiso Đà Lạt</h3>
      <p class="card-text">Trà atiso thơm ngon, mát gan, giải nhiệt</p>
      <p><strong>Giá:</strong> 150.000đ/kg</p>
      <a href="#" class="btn btn-primary">Đặt hàng</a>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Nước cốt dâu tằm</h3>
      <p class="card-text">Nước cốt dâu tằm tươi, giàu vitamin C</p>
      <p><strong>Giá:</strong> 80.000đ/chai 500ml</p>
      <a href="#" class="btn btn-primary">Đặt hàng</a>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Nước cốt bơ</h3>
      <p class="card-text">Nước cốt bơ nguyên chất, béo ngậy</p>
      <p><strong>Giá:</strong> 120.000đ/chai 500ml</p>
      <a href="#" class="btn btn-primary">Đặt hàng</a>
    </div>
  </div>
</div>
<h3>🌿 Đặc điểm sản phẩm</h3>
<ul>
  <li>✓ 100% nguyên liệu tự nhiên</li>
  <li>✓ Không chất bảo quản, không phẩm màu</li>
  <li>✓ Quy trình sản xuất đạt chuẩn ATVSTP</li>
  <li>✓ Bảo quản lạnh, sử dụng trong 7 ngày sau khi mở nắp</li>
</ul>
'''
    },
    {
        'filename': 'thanh-vien-tieu-bieu.html',
        'title': 'Thành viên tiêu biểu',
        'subtitle': 'Những thành viên xuất sắc của HTX',
        'description': 'Giới thiệu các thành viên tiêu biểu, xuất sắc của HTX Lâm Đồng Đại Ngàn',
        'keywords': 'thành viên, nông dân tiêu biểu, htx xuất sắc',
        'active_members': 'active',
        'content': '''
<h2>🏆 Thành viên tiêu biểu HTX</h2>
<div class="row">
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Anh Nguyễn Văn A</h3>
      <p class="card-text"><strong>Vùng:</strong> Đà Lạt</p>
      <p class="card-text"><strong>Chuyên môn:</strong> Trồng rau hữu cơ</p>
      <p class="card-text"><strong>Thành tích:</strong> Giải Nhất "Nông dân sản xuất giỏi" năm 2023</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Chị Trần Thị B</h3>
      <p class="card-text"><strong>Vùng:</strong> Lạc Dương</p>
      <p class="card-text"><strong>Chuyên môn:</strong> Trồng atiso</p>
      <p class="card-text"><strong>Thành tích:</strong> Diện tích canh tác 5 hecta, doanh thu 500 triệu/năm</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Anh Lê Văn C</h3>
      <p class="card-text"><strong>Vùng:</strong> Đơn Dương</p>
      <p class="card-text"><strong>Chuyên môn:</strong> Trồng dâu tằm</p>
      <p class="card-text"><strong>Thành tích:</strong> Tích cực chuyển giao kỹ thuật cho 20+ nông hộ mới</p>
    </div>
  </div>
</div>
<h3>📋 Tiêu chí đánh giá thành viên tiêu biểu</h3>
<ul>
  <li>Sản xuất đạt năng suất, chất lượng cao</li>
  <li>Tuân thủ nghiêm ngặt quy trình VietGAP/GlobalGAP</li>
  <li>Tích cực tham gia hoạt động HTX</li>
  <li>Hỗ trợ, chia sẻ kinh nghiệm cho thành viên khác</li>
  <li>Có ý thức bảo vệ môi trường</li>
</ul>
'''
    },
    {
        'filename': 'quyen-loi-thanh-vien.html',
        'title': 'Quyền lợi thành viên',
        'subtitle': 'Quyền lợi và nghĩa vụ của thành viên HTX',
        'description': 'Quyền lợi và nghĩa vụ của thành viên Hợp tác xã Lâm Đồng Đại Ngàn',
        'keywords': 'quyền lợi, nghĩa vụ, thành viên htx, hợp tác xã',
        'active_members': 'active',
        'content': '''
<h2>✅ Quyền lợi thành viên HTX</h2>
<div class="row cols-2">
  <div>
    <h3>🎁 Quyền lợi</h3>
    <ul>
      <li><strong>Hỗ trợ kỹ thuật:</strong> Đào tạo miễn phí về kỹ thuật canh tác, chăm sóc cây trồng</li>
      <li><strong>Đầu vào ổn định:</strong> Cung cấp giống, phân bón, vật tư với giá ưu đãi</li>
      <li><strong>Đầu ra đảm bảo:</strong> Cam kết thu mua 100% sản phẩm đạt tiêu chuẩn</li>
      <li><strong>Giá cả hợp lý:</strong> Giá thu mua cao hơn thị trường 15-20%</li>
      <li><strong>Tham gia quản lý:</strong> Quyền biểu quyết, ứng cử vào Ban quản trị</li>
      <li><strong>Chia sẻ lợi nhuận:</strong> Hưởng cổ tức hàng năm theo mức đóng góp</li>
      <li><strong>Vay vốn ưu đãi:</strong> Lãi suất thấp hơn ngân hàng 2-3%</li>
      <li><strong>Bảo hiểm:</strong> Hỗ trợ mua bảo hiểm nông nghiệp, bảo hiểm y tế</li>
    </ul>
  </div>
  <div>
    <h3>📝 Nghĩa vụ</h3>
    <ul>
      <li><strong>Đóng góp vốn:</strong> Tối thiểu 5 triệu đồng khi gia nhập</li>
      <li><strong>Tuân thủ quy định:</strong> Thực hiện đúng quy trình sản xuất VietGAP</li>
      <li><strong>Cam kết sản lượng:</strong> Đảm bảo sản lượng tối thiểu theo hợp đồng</li>
      <li><strong>Tham gia họp:</strong> Tham dự đại hội thành viên hàng năm</li>
      <li><strong>Đóng phí:</strong> Phí quản lý 200.000đ/năm</li>
      <li><strong>Hợp tác:</strong> Không bán sản phẩm cho đối tác cạnh tranh</li>
      <li><strong>Chia sẻ:</strong> Tích cực chia sẻ kinh nghiệm với thành viên mới</li>
    </ul>
  </div>
</div>
<div style="margin-top: 2rem; padding: 1.5rem; background-color: #f0f8f4; border-left: 4px solid #2c7a3f; border-radius: 8px;">
  <h3>📞 Liên hệ gia nhập HTX</h3>
  <p>Để trở thành thành viên chính thức của HTX Lâm Đồng Đại Ngàn, vui lòng liên hệ:</p>
  <p><strong>Hotline:</strong> 0767.333.379</p>
  <p><strong>Email:</strong> info@lamdongdaingan.vn</p>
  <p><strong>Địa chỉ:</strong> Số 1A, Bùi Thị Xuân, Phường Xuân Hương, TP. Đà Lạt</p>
</div>
'''
    }
]

# Tạo các file
output_dir = 'pages'

# Tạo thư mục nếu chưa tồn tại
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
    print(f"📁 Created directory: {output_dir}")

for page in pages_to_create:
    # Set default active states
    active_states = {
        'active_about': '',
        'active_products': '',
        'active_services': '',
        'active_news': '',
        'active_members': '',
        'active_partners': '',
        'active_contact': ''
    }
    
    # Update active state for current page
    if 'active_products' in page:
        active_states['active_products'] = page.get('active_products', '')
    if 'active_members' in page:
        active_states['active_members'] = page.get('active_members', '')
    
    # Generate HTML
    html_content = HTML_TEMPLATE.format(
        title=page['title'],
        subtitle=page['subtitle'],
        description=page['description'],
        keywords=page['keywords'],
        content=page['content'],
        **active_states
    )
    
    # Write to file
    filepath = os.path.join(output_dir, page['filename'])
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✅ Created: {filepath}")

print("\n🎉 Hoàn thành! Đã tạo tất cả các trang với mobile responsive.")
print(f"📂 Các file được tạo trong thư mục: {os.path.abspath(output_dir)}")
