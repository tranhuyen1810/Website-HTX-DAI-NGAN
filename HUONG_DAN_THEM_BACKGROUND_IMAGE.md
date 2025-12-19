# Hướng Dẫn Thêm Hình Ảnh Nền Cho Section

## 📋 Mục Lục
1. [Giới thiệu](#giới-thiệu)
2. [Chuẩn bị hình ảnh](#chuẩn-bị-hình-ảnh)
3. [Cách 1: Background với hiệu ứng mờ (Blur Overlay)](#cách-1-background-với-hiệu-ứng-mờ-blur-overlay)
4. [Cách 2: Background nổi bật với gradient](#cách-2-background-nổi-bật-với-gradient)
5. [Cách 3: Background đơn giản](#cách-3-background-đơn-giản)
6. [Tối ưu hóa hình ảnh](#tối-ưu-hóa-hình-ảnh)
7. [Troubleshooting](#troubleshooting)

---

## Giới thiệu

Tài liệu này hướng dẫn cách thêm hình ảnh nền (background image) cho các section trên website. Bạn có thể áp dụng các phương pháp này cho bất kỳ section nào muốn làm nổi bật.

---

## Chuẩn bị hình ảnh

### 1. Yêu cầu về hình ảnh
- **Định dạng:** .jpg, .png, .avif, .webp (ưu tiên .avif hoặc .webp cho hiệu năng tốt)
- **Kích thước:** Tối thiểu 1920x1080px (Full HD)
- **Dung lượng:** Nên nén xuống dưới 500KB
- **Chất lượng:** Rõ nét, độ tương phản tốt

### 2. Nơi lưu trữ hình ảnh
```
/workspaces/Website-HTX-DAI-NGAN/
  └── images/
      ├── NEN01.avif  ✅ (Hình nền chính)
      ├── NEN02.avif  ✅ (Hình nền phụ)
      └── TEN_HINH_MOI.avif  (Hình mới của bạn)
```

### 3. Đặt tên file
- Sử dụng chữ IN HOA hoặc chữ thường (không trộn lẫn)
- Không dùng dấu tiếng Việt
- Không có khoảng trắng (dùng `-` hoặc `_`)
- Ví dụ: `background-header.avif`, `NEN_GIOITHIEU.avif`

---

## Cách 1: Background với hiệu ứng mờ (Blur Overlay)

### 🎯 Khi nào dùng?
- Khi muốn text dễ đọc trên nền hình
- Tạo cảm giác mềm mại, chuyên nghiệp
- Phù hợp với section giới thiệu, thông tin quan trọng

### Bước 1: Thêm HTML
```html
<section class="intro-section-with-bg">
  <div class="container">
    <h2 class="text-center mb-4">TIÊU ĐỀ SECTION</h2>
    <div class="row cols-2" style="grid-template-columns: 1fr 1fr; align-items: center;">
      <div>
        <p>Nội dung của bạn ở đây...</p>
      </div>
      <div style="text-align: center;">
        <img src="images/1.png" alt="Mô tả hình" class="img-fluid">
      </div>
    </div>
  </div>
</section>
```

### Bước 2: Thêm CSS
Mở file `css/styles.css` và thêm vào cuối file (trước `/* Print Styles */`):

```css
/* Section với background mờ */
.intro-section-with-bg {
  background-image: url('../images/TEN_HINH_CUA_BAN.avif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding: 4rem 20px;
}

/* Lớp phủ mờ */
.intro-section-with-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.88);  /* 0.88 = độ mờ 88% */
  backdrop-filter: blur(2px);
  z-index: 1;
}

/* Đưa nội dung lên trên lớp mờ */
.intro-section-with-bg .container {
  position: relative;
  z-index: 2;
}

/* Responsive cho mobile */
@media (max-width: 768px) {
  .intro-section-with-bg {
    padding: 2rem 20px;
  }
}
```

### Bước 3: Điều chỉnh độ mờ
Thay đổi giá trị `rgba(255, 255, 255, 0.XX)`:
- `0.95` = rất mờ (95% trắng)
- `0.88` = mờ vừa (88% trắng) ✅ Khuyến nghị
- `0.70` = mờ ít (70% trắng)
- `0.50` = mờ rất ít (50% trắng)

Hoặc thay đổi màu overlay:
- `rgba(255, 255, 255, 0.88)` = Trắng mờ
- `rgba(0, 0, 0, 0.5)` = Đen mờ 50%
- `rgba(44, 122, 63, 0.7)` = Xanh lá mờ 70%

---

## Cách 2: Background nổi bật với gradient

### 🎯 Khi nào dùng?
- Muốn làm nổi bật section quan trọng
- Tạo hiệu ứng sang trọng, thu hút
- Phù hợp với sản phẩm chủ lực, banner chính

### Bước 1: Thêm HTML
```html
<section class="featured-product-section-enhanced">
  <div class="container">
    <h2 class="section-title-featured">SẢN PHẨM CHỦ LỰC</h2>
    <div class="featured-product-wrapper">
      <!-- Nội dung sản phẩm -->
      <p>Thông tin sản phẩm của bạn...</p>
    </div>
  </div>
</section>
```

### Bước 2: Thêm CSS
```css
/* Section với background gradient và hiệu ứng */
.featured-product-section-enhanced {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f0e8 100%);
  padding: 4rem 20px;
  position: relative;
}

/* Hiệu ứng chấm tròn gradient */
.featured-product-section-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(44, 122, 63, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(26, 77, 37, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

/* Tiêu đề nổi bật */
.section-title-featured {
  text-align: center;
  font-size: 2.5rem;
  color: #2c7a3f;
  margin-bottom: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  z-index: 2;
}

/* Gạch dưới tiêu đề */
.section-title-featured::after {
  content: '';
  display: block;
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #2c7a3f, #1a4d25);
  margin: 1rem auto 0;
  border-radius: 2px;
}

/* Card nội dung */
.featured-product-section-enhanced .featured-product-wrapper {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(44, 122, 63, 0.15);
  padding: 2rem;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(44, 122, 63, 0.1);
}

/* Hiệu ứng hover */
.featured-product-section-enhanced .featured-product-wrapper:hover {
  box-shadow: 0 12px 40px rgba(44, 122, 63, 0.25);
  transform: translateY(-4px);
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .featured-product-section-enhanced {
    padding: 2rem 20px;
  }
  
  .section-title-featured {
    font-size: 1.8rem;
  }
  
  .featured-product-section-enhanced .featured-product-wrapper {
    padding: 1rem;
  }
}
```

### Bước 3: Tùy chỉnh màu gradient
Thay đổi màu trong `linear-gradient`:
```css
/* Gradient xanh lá nhẹ */
background: linear-gradient(135deg, #f5f7fa 0%, #e8f0e8 100%);

/* Gradient xanh dương */
background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);

/* Gradient cam ấm */
background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);

/* Gradient tím nhẹ */
background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
```

---

## Cách 3: Background đơn giản

### 🎯 Khi nào dùng?
- Cần setup nhanh
- Background không quá phức tạp
- Phù hợp với các section phụ

### Inline Style (Nhanh)
```html
<section style="
  background-image: url('images/TEN_HINH.avif'); 
  background-size: cover; 
  background-position: center; 
  padding: 4rem 20px;
">
  <div class="container">
    <h2>Nội dung</h2>
  </div>
</section>
```

### CSS riêng (Khuyến nghị)
```css
.my-custom-section {
  background-image: url('../images/TEN_HINH.avif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 4rem 20px;
}
```

---

## Tối ưu hóa hình ảnh

### 1. Công cụ nén ảnh online
- **TinyPNG**: https://tinypng.com/ (PNG/JPG)
- **Squoosh**: https://squoosh.app/ (Tất cả định dạng)
- **Compressor.io**: https://compressor.io/

### 2. Chuyển đổi sang AVIF/WebP
```bash
# Cài đặt tools (nếu có)
npm install -g sharp-cli

# Chuyển đổi
sharp -i input.jpg -o output.avif --avif
```

### 3. Responsive images
Sử dụng các kích thước khác nhau cho mobile/desktop:

```css
.intro-section-with-bg {
  background-image: url('../images/NEN01-mobile.avif');
}

@media (min-width: 768px) {
  .intro-section-with-bg {
    background-image: url('../images/NEN01.avif');
  }
}
```

---

## Troubleshooting

### ❌ Hình không hiển thị
**Nguyên nhân & Giải pháp:**

1. **Đường dẫn sai:**
   ```css
   /* ❌ Sai */
   background-image: url('images/NEN01.avif');
   
   /* ✅ Đúng - từ CSS file */
   background-image: url('../images/NEN01.avif');
   ```

2. **File không tồn tại:**
   - Kiểm tra file có trong thư mục `images/` chưa
   - Kiểm tra tên file (phân biệt hoa thường)

3. **Quyền truy cập file:**
   ```bash
   # Kiểm tra file có tồn tại
   ls -la images/
   
   # Cấp quyền nếu cần
   chmod 644 images/NEN01.avif
   ```

### ❌ Text khó đọc trên nền
**Giải pháp:**
1. Tăng độ mờ overlay: `rgba(255, 255, 255, 0.90)`
2. Thêm text shadow:
   ```css
   h2 {
     text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
   }
   ```

### ❌ Hình bị méo/kéo dãn
**Giải pháp:**
```css
/* Giữ tỷ lệ, cover toàn bộ */
background-size: cover;

/* Hoặc giữ nguyên kích thước */
background-size: contain;

/* Điều chỉnh vị trí */
background-position: center center;  /* center */
background-position: top center;     /* trên */
background-position: center left;    /* trái */
```

### ❌ Performance chậm
**Giải pháp:**
1. Nén hình nhỏ hơn (<500KB)
2. Dùng lazy loading:
   ```html
   <section class="intro-section-with-bg" loading="lazy">
   ```
3. Dùng AVIF thay vì JPG (nhẹ hơn 50%)

---

## Ví dụ thực tế

### Ví dụ 1: Banner Hero với overlay tối
```html
<section class="hero-with-dark-overlay">
  <div class="container">
    <h1>Chào mừng đến với HTX</h1>
    <p>Sản phẩm nông nghiệp sạch</p>
  </div>
</section>
```

```css
.hero-with-dark-overlay {
  background-image: url('../images/hero-banner.avif');
  background-size: cover;
  background-position: center;
  padding: 6rem 20px;
  position: relative;
  color: white;
}

.hero-with-dark-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);  /* Đen mờ 50% */
  z-index: 1;
}

.hero-with-dark-overlay .container {
  position: relative;
  z-index: 2;
}
```

### Ví dụ 2: Section với nhiều background
```css
.multi-background-section {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
    url('../images/pattern.png'),
    url('../images/background.avif');
  background-size: cover, 100px 100px, cover;
  background-position: center, center, center;
  background-repeat: no-repeat, repeat, no-repeat;
}
```

---

## Checklist trước khi deploy

- [ ] Hình ảnh đã được nén (<500KB)
- [ ] Đường dẫn file chính xác
- [ ] Responsive trên mobile/tablet
- [ ] Text đọc được rõ ràng
- [ ] Không bị méo/kéo dãn
- [ ] Load nhanh (<3s)
- [ ] Đã test trên nhiều trình duyệt

---

## Tài liệu tham khảo

- [MDN - background-image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
- [CSS Tricks - Perfect Full Page Background](https://css-tricks.com/perfect-full-page-background-image/)
- [Web.dev - Optimize images](https://web.dev/fast/#optimize-your-images)

---

**Cập nhật:** 19/12/2025  
**Tác giả:** HTX Lâm Đồng Đại Ngàn  
**Phiên bản:** 1.0
