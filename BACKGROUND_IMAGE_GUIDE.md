# Hướng Dẫn Sử Dụng Hình Ảnh Nền (Background Images Guide)

## Yêu Cầu 1: Thêm Hình Ảnh Nền với Hiệu Ứng Mờ

### Tổng Quan
Tài liệu này hướng dẫn cách sử dụng hình ảnh nền `NEN02.avif` cho các vùng sản phẩm và gói sản phẩm với hiệu ứng làm mờ (blur effect).

### Cấu Trúc Thư Mục
```
Website-HTX-DAI-NGAN/
├── images/
│   ├── NEN02.avif          # Hình nền chính
│   └── 1.png               # Logo HTX (đã có sẵn trong assets/img/)
└── assets/
    ├── css/
    │   └── factory-style.css
    └── img/
        └── (các hình ảnh hiện có)
```

### Các Vùng Áp Dụng Hình Nền

#### 1. Vùng Sản Phẩm (Products Section)
- **Class**: `.products-section`
- **Vị trí**: Trang chủ - Section "🛍️ SẢN PHẨM"
- **Hiệu ứng**: Hình nền mờ, overlay với độ trong suốt

#### 2. Box Rau (Box Packages)
- **Class**: `.box-rau-section`
- **Vị trí**: Phần "🥬 Box Rau Sạch Đà Lạt"
- **Hiệu ứng**: Hình nền mờ backdrop-filter: blur(10px)

#### 3. Gói Đầu Tư (Investment Packages)
- **Class**: `.investment-packages`
- **Vị trí**: Phần "💼 ĐẦU TƯ" - Gói Góp Vốn Đầu Tư
- **Hiệu ứng**: Hình nền mờ với overlay màu trắng

### CSS Implementation

```css
/* Hình nền cho vùng sản phẩm */
.products-section {
    position: relative;
    background-image: url('/images/NEN02.avif');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

/* Overlay làm mờ */
.products-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    z-index: 0;
}

/* Đảm bảo nội dung hiển thị trên overlay */
.products-section > * {
    position: relative;
    z-index: 1;
}
```

### Cách Sử Dụng

#### Bước 1: Chuẩn Bị Hình Ảnh
1. Đặt file `NEN02.avif` vào thư mục `/images/`
2. Đảm bảo hình ảnh có kích thước phù hợp (khuyến nghị: 1920x1080px trở lên)
3. Định dạng AVIF giúp giảm dung lượng file (~50% so với JPEG)

#### Bước 2: Kiểm Tra Hình Ảnh
```bash
# Kiểm tra file tồn tại
ls -la images/NEN02.avif

# Kiểm tra kích thước file
du -h images/NEN02.avif
```

#### Bước 3: Áp Dụng CSS
CSS đã được tự động thêm vào file `assets/css/factory-style.css`. Không cần thêm code.

### Tùy Chỉnh Hiệu Ứng

#### Điều Chỉnh Độ Mờ
```css
/* Tăng độ mờ (blur nhiều hơn) */
backdrop-filter: blur(15px);  /* Mặc định: 10px */

/* Giảm độ mờ (blur ít hơn) */
backdrop-filter: blur(5px);
```

#### Điều Chỉnh Độ Trong Suốt Overlay
```css
/* Overlay đậm hơn (nền tối hơn) */
background: rgba(255, 255, 255, 0.95);  /* Mặc định: 0.9 */

/* Overlay nhạt hơn (nền sáng hơn) */
background: rgba(255, 255, 255, 0.85);
```

#### Thay Đổi Màu Overlay
```css
/* Overlay màu xanh nhạt */
background: rgba(173, 30, 38, 0.1);  /* Màu đỏ HTX nhạt */

/* Overlay màu xanh lá */
background: rgba(74, 206, 136, 0.2);  /* Màu xanh top bar */
```

### Fallback cho Trình Duyệt Cũ

Nếu trình duyệt không hỗ trợ định dạng AVIF, thêm fallback:

```css
.products-section {
    /* Fallback cho trình duyệt cũ */
    background-image: url('/assets/img/htx01.JPG');
    
    /* Sử dụng AVIF nếu có hỗ trợ */
    background-image: image-set(
        url('/images/NEN02.avif') type('image/avif'),
        url('/assets/img/htx01.JPG') type('image/jpeg')
    );
}
```

### Tối Ưu Hiệu Năng

#### 1. Lazy Loading
```html
<!-- Thêm loading="lazy" cho hình ảnh -->
<div class="products-section" style="background-image: url('/images/NEN02.avif')" loading="lazy">
```

#### 2. Responsive Images
```css
/* Hình nhỏ hơn cho mobile */
@media (max-width: 768px) {
    .products-section {
        background-image: url('/images/NEN02-mobile.avif');
        background-size: contain;
    }
}
```

### Kiểm Tra Kết Quả

1. Mở trang chủ trong trình duyệt
2. Cuộn đến vùng "🛍️ SẢN PHẨM"
3. Kiểm tra:
   - ✓ Hình nền hiển thị rõ ràng
   - ✓ Hiệu ứng mờ được áp dụng
   - ✓ Nội dung dễ đọc trên nền
   - ✓ Không ảnh hưởng đến tốc độ tải trang

### Xử Lý Sự Cố

#### Hình nền không hiển thị
- Kiểm tra đường dẫn file: `/images/NEN02.avif`
- Kiểm tra quyền truy cập file: `chmod 644 images/NEN02.avif`
- Xóa cache trình duyệt: Ctrl+F5 (Windows) hoặc Cmd+Shift+R (Mac)

#### Hiệu ứng mờ không hoạt động
- Kiểm tra trình duyệt có hỗ trợ `backdrop-filter`
- Sử dụng alternative: `filter: blur(10px)` trên phần tử cha

#### Tốc độ tải chậm
- Nén hình ảnh: Sử dụng công cụ như Squoosh hoặc TinyPNG
- Giảm kích thước: Resize xuống 1920x1080px
- Sử dụng CDN để phân phối hình ảnh

### Ghi Chú Kỹ Thuật

- **Định dạng AVIF**: Định dạng hình ảnh hiện đại, hỗ trợ từ Chrome 85+, Firefox 93+, Safari 16+
- **backdrop-filter**: Hỗ trợ từ Chrome 76+, Firefox 103+, Safari 9+
- **background-attachment: fixed**: Tạo hiệu ứng parallax khi cuộn trang

### Liên Hệ Hỗ Trợ

Nếu cần hỗ trợ thêm:
- Email: rogger.hoang@gmail.com
- Điện thoại: 0767.333.379

---
**Cập nhật**: Tháng 12/2025  
**Phiên bản**: 1.0
