<!-- 
  HƯỚNG DẪN NHANH SỬ DỤNG WEBSITE HTX
  ======================================
  
  Tài liệu này giúp bạn nhanh chóng hiểu cấu trúc và sử dụng website.
-->

# 🚀 Hướng dẫn Nhanh - Website HTX

## 1️⃣ Mở website

### Cách 1: Mở trực tiếp (đơn giản nhất)
- Tìm file `index.html` trong thư mục dự án
- Double-click để mở bằng trình duyệt
- Hoặc kéo file vào trình duyệt

### Cách 2: Dùng server cục bộ (tốt nhất)
```bash
# Mở Terminal/CMD trong thư mục dự án
cd /đường/dẫn/Website-HTX-

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (nếu cài http-server)
http-server
```

Sau đó truy cập: **http://localhost:8000**

---

## 2️⃣ Cấu trúc thư mục

```
Website-HTX-/
├── index.html          👈 TRANG CHỦ - Bắt đầu từ đây
├── css/
│   └── styles.css      Toàn bộ CSS
├── js/
│   └── main.js         Toàn bộ JavaScript
├── pages/              Các trang nội dung
│   ├── gioi-thieu.html
│   ├── thanh-vien.html
│   ├── ho-so-nang-luc.html
│   ├── san-pham.html
│   ├── lien-he.html
│   └── san-pham/       Trang sản phẩm chi tiết
│       ├── box-rau.html
│       ├── thuc-don-tuan.html
│       └── thanh-phan.html
├── images/            Thư mục ảnh (chưa dùng)
├── assets/            Tài nguyên khác
├── README.md          Hướng dẫn chi tiết
├── FEATURES.md        Danh sách tính năng
└── QUICKSTART.md      File này
```

---

## 3️⃣ Các trang chính

### 📱 Trang chủ (`index.html`)
- ✨ Điểm vào chính của website
- 🎯 Có 3 CTA chính: Đặt Box, Xem Thực đơn, Khám phá Sản phẩm
- 📊 Hiển thị thống kê & đối tác

### 📖 Giới thiệu (`pages/gioi-thieu.html`)
- 🏢 Thông tin chi tiết về HTX
- 💪 Năng lực & thế mạnh
- 🤝 Hệ sinh thái đối tác

### 👥 Thành viên (`pages/thanh-vien.html`)
- 📋 Danh sách 12 thành viên
- 🔍 Tìm kiếm & lọc theo vùng
- 👤 Click vào card xem chi tiết

### 📊 Hồ sơ Năng lực (`pages/ho-so-nang-luc.html`)
- 📈 Thống kê năng lực
- 🌾 Vùng trồng & quy mô
- 🏭 Sơ chế, kho vận
- ✓ Tiêu chuẩn chất lượng
- 📥 Tải file PDF

### 🥬 Sản phẩm (`pages/san-pham.html`)
- 📦 Các danh mục sản phẩm
- 🎁 Dịch vụ thêm
- 🎯 Tại sao chọn chúng tôi

#### Box Rau (`pages/san-pham/box-rau.html`)
- 🖼️ Gallery ảnh sản phẩm
- 💰 Giá & CTA đặt hàng
- 🥬 Loại rau trong box
- 📖 Hướng dẫn bảo quản

#### Thực đơn Tuần (`pages/san-pham/thuc-don-tuan.html`)
- 📅 Thực đơn tuần hiện tại
- 📋 Chi tiết 10 loại rau
- 📜 Lịch sử các tuần trước

#### Thành phần Box (`pages/san-pham/thanh-phan.html`)
- 🔍 Tìm kiếm 50+ sản phẩm
- 🏷️ Lọc theo danh mục
- ⭐ Đánh giá sản phẩm

### 📞 Liên hệ (`pages/lien-he.html`)
- ☎️ Thông tin liên hệ
- 📧 Form gửi thông điệp
- ❓ FAQ 6 câu hỏi
- 📍 Bản đồ vị trí

---

## 4️⃣ Tính năng sử dụng

### 📱 Menu trên Mobile
- Nhấn ☰ (3 gạch ngang) để mở menu
- Danh sách các trang sẽ xuất hiện
- Nhấn lại để đóng

### 🔍 Tìm kiếm
- Trang **Thành viên**: Nhập tên để tìm
- Trang **Thành phần Box**: Nhập tên rau để tìm
- Kết quả lọc tự động

### 🏷️ Lọc
- Trang **Thành phần Box**: Click nút danh mục để lọc
- Rau xanh, Rau quả, Rau căn, Trái cây, etc.

### 📋 Accordion (Mở/Đóng)
- Trang **Liên hệ**: Click câu hỏi để xem đáp án
- Chỉ 1 câu hỏi mở cùng lúc

### 🔗 Breadcrumb
- Hiển thị đường dẫn trang hiện tại
- Ví dụ: Trang chủ > Sản phẩm > Box Rau

---

## 5️⃣ Tùy chỉnh Website

### 🎨 Thay Logo
**File**: `index.html` (và tất cả trang)

Tìm dòng:
```html
<div class="logo">🌱 HTX</div>
```

Thay `🌱 HTX` bằng text hoặc ảnh của bạn.

### 🎨 Thay Màu Chính
**File**: `css/styles.css`

Tìm dòng:
```css
color: #2c7a3f;  /* Xanh chính */
```

Thay `#2c7a3f` bằng mã màu khác (dùng Color Picker).

### 📞 Thay Thông Tin Liên hệ
**File**: Tất cả file (footer)

Tìm và thay đổi:
```html
<p>1800-0000</p>
<p>info@htx.vn</p>
<p>123 Đường Nông lâm, Quận 1, TP.HCM</p>
```

### 🖼️ Thay Ảnh
- Tất cả ảnh hiện tại là placeholder: `https://via.placeholder.com/...`
- Thay bằng URL ảnh thực tế hoặc tải lên server

**Cách**: 
1. Tải ảnh vào thư mục `images/`
2. Thay `src="https://via.placeholder.com/..."` 
3. Bằng `src="images/ten-anh.jpg"`

---

## 6️⃣ Cấu hình Form

### Form Liên hệ (`pages/lien-he.html`)
- Hiện tại form chưa kết nối backend
- Phía client: Kiểm tra email, phone, required fields
- Phía server: Cần backend để xử lý

**Để hoạt động hoàn toàn**:
1. Tạo backend (Node.js, Python, PHP)
2. Xử lý POST request từ form
3. Gửi email xác nhận
4. Lưu dữ liệu vào database

---

## 7️⃣ SEO Cơ bản

Mỗi trang có:
- ✅ `<title>` - Tiêu đề trang
- ✅ `<meta name="description">` - Mô tả
- ✅ `<meta property="og:...">` - Share mạng xã hội
- ✅ Semantic HTML (h1, h2, h3)
- ✅ Alt text cho ảnh

**Để cải thiện thêm**:
- Thêm `sitemap.xml` tự động
- Tạo `robots.txt`
- Cài Google Analytics
- Thêm JSON-LD schema

---

## 8️⃣ Hiệu năng

### 🚀 Tối ưu hóa hiện tại
- Lazy load images
- CSS/JS tối thiểu (1 file mỗi loại)
- Responsive mobile-first
- Smooth scroll không plugin

### 📈 Có thể cải thiện
- Minify CSS/JS
- Gzip compression
- CDN cho ảnh
- Service Worker (offline)
- Caching headers

---

## 9️⃣ Troubleshooting

### ❌ Trang không tải được
1. Kiểm tra đường dẫn file có đúng không
2. Dùng server cục bộ thay vì mở file trực tiếp
3. Kiểm tra console (F12) xem có lỗi không

### ❌ CSS/JS không hoạt động
1. Kiểm tra đường dẫn trong `<link>` và `<script>`
2. Xác nhận file tồn tại
3. Refresh trang (Ctrl+Shift+R clear cache)

### ❌ Form không gửi được
1. Kiểm tra console có lỗi không
2. Nhớ là form chưa kết nối backend
3. Cần triển khai backend để hoạt động

### ❌ Menu mobile không mở
1. Kiểm tra JavaScript có loaded không
2. Xem console có lỗi không

---

## 🔟 Tiếp theo

### Để hoàn thiện website
1. ✅ **Trang chủ & nội dung cơ bản** - ĐÃ XONG
2. 🔲 **Backend API** - Cần Node.js/Python/PHP
3. 🔲 **Database** - Cần MongoDB/PostgreSQL
4. 🔲 **Admin CMS** - Quản lý nội dung
5. 🔲 **Thanh toán** - Integrations (Stripe, momo)
6. 🔲 **Deploy** - Lên server (Vercel, Heroku, AWS)

### Tài liệu thêm
- Xem `README.md` - Hướng dẫn chi tiết
- Xem `FEATURES.md` - Danh sách tính năng
- Xem `QUICKSTART.md` - File này

---

## ❓ Câu hỏi thường gặp

**Q: Làm sao để thêm trang mới?**
A: Tạo file `.html` mới trong `pages/`, copy cấu trúc từ trang khác.

**Q: Làm sao để thêm menu?**
A: Thêm `<li><a href="">Text</a></li>` vào `<nav><ul>` trong header.

**Q: Form gửi ở đâu?**
A: Hiện tại chỉ validate phía client. Cần backend để xử lý.

**Q: Làm sao để upload ảnh?**
A: Tải ảnh vào `images/`, thay đường dẫn trong HTML.

**Q: Website có SEO không?**
A: Có cơ bản. Cần thêm sitemap, robots.txt, Google Analytics.

---

## 📞 Liên hệ & Hỗ trợ

Để được hỗ trợ:
- 📧 Email: info@htx.vn
- 📞 Hotline: 1800-0000
- 🌐 Website: htx.vn

---

**Phiên bản**: 1.0  
**Cập nhật**: 17/12/2024  
**Tác giả**: GitHub Copilot
