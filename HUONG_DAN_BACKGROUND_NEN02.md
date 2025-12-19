# HƯỚNG DẪN THỰC HIỆN BACKGROUND IMAGE NEN02.AVIF

## 📋 Tổng quan

Tài liệu này mô tả chi tiết các thay đổi đã thực hiện để thêm hình nền `images/NEN02.avif` với hiệu ứng làm mờ (opacity 0.85) cho toàn bộ website.

---

## 🎯 Các yêu cầu đã thực hiện

### 1. **Tăng chiều cao Banner (Hero Section) - Trang chủ**

**Vị trí**: [css/styles.css](css/styles.css)

**Thay đổi**:
```css
section.hero {
  background: linear-gradient(rgba(44, 122, 63, 0.7), rgba(26, 77, 37, 0.7)), url('../assets/img/htx01.JPG');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  padding: 10rem 20px;           /* Tăng từ 5rem lên 10rem */
  min-height: 600px;             /* Thêm chiều cao tối thiểu */
  text-align: center;
  display: flex;                 /* Thêm flexbox */
  align-items: center;           /* Căn giữa nội dung */
  justify-content: center;
}
```

**Kết quả**: Banner giờ có chiều cao ~600px, tăng gấp đôi so với trước.

---

### 2. **Background cho Section "Sản phẩm tương tự" và "Lối vào nhanh sản phẩm"**

**Vị trí**: [css/styles.css](css/styles.css)

#### Section `bg-white` (Sản phẩm tương tự)

```css
section.bg-white {
  position: relative;
  background-image: url('../images/NEN02.avif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

section.bg-white::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.85);  /* Làm mờ 85% */
  z-index: 0;
}

section.bg-white > * {
  position: relative;
  z-index: 1;
}
```

#### Section `bg-light` (Lối vào nhanh sản phẩm)

```css
section.bg-light {
  position: relative;
  background-image: url('../images/NEN02.avif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

section.bg-light::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.85);  /* Làm mờ 85% */
  z-index: 0;
}

section.bg-light > * {
  position: relative;
  z-index: 1;
}
```

**Kỹ thuật sử dụng**:
- `::before` pseudo-element: Tạo lớp overlay màu trắng với độ trong suốt 0.85
- `background-attachment: fixed`: Tạo hiệu ứng parallax khi scroll
- `z-index`: Đảm bảo nội dung luôn hiển thị trên background

---

### 3. **Background cho TẤT CẢ các trang (Body Element)**

**Vị trí**: [css/styles.css](css/styles.css)

```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  background-image: url('../images/NEN02.avif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
}

body::before {
  content: '';
  position: fixed;                              /* Fixed để luôn cố định */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.85);  /* Làm mờ 85% */
  z-index: -1;                                  /* Đặt sau tất cả nội dung */
}
```

**Phạm vi áp dụng**:
- ✅ Trang chủ: [index.html](index.html)
- ✅ Giới thiệu: [pages/gioi-thieu.html](pages/gioi-thieu.html)
- ✅ Thành viên HTX: [pages/thanh-vien.html](pages/thanh-vien.html)
- ✅ Liên hệ: [pages/lien-he.html](pages/lien-he.html)
- ✅ Sản phẩm: [pages/san-pham.html](pages/san-pham.html)
- ✅ Hồ sơ năng lực: [pages/ho-so-nang-luc.html](pages/ho-so-nang-luc.html)
- ✅ Tất cả trang con trong `pages/san-pham/`:
  - [pages/san-pham/box-rau.html](pages/san-pham/box-rau.html)
  - [pages/san-pham/thanh-phan.html](pages/san-pham/thanh-phan.html)
  - [pages/san-pham/thuc-don-tuan.html](pages/san-pham/thuc-don-tuan.html)

---

## 🎨 Chi tiết kỹ thuật

### Overlay Effect (Làm mờ)

Sử dụng CSS pseudo-element `::before` với:
- `rgba(255, 255, 255, 0.85)`: Màu trắng với độ trong suốt 15% (làm mờ 85%)
- Giá trị có thể điều chỉnh từ `0` (hoàn toàn trong suốt) đến `1` (hoàn toàn đục)

### Parallax Effect

```css
background-attachment: fixed;
```
- Tạo hiệu ứng hình nền cố định khi scroll
- Nội dung sẽ scroll qua background

### Z-Index Layering

```
Background Image (z-index: auto)
  └─ Overlay (::before, z-index: 0 hoặc -1)
      └─ Content (z-index: 1 hoặc auto)
```

---

## 📝 Cách tùy chỉnh

### 1. Thay đổi độ mờ

Tìm các dòng có `rgba(255, 255, 255, 0.85)` và điều chỉnh giá trị cuối:

```css
/* Mờ hơn (90%) */
background-color: rgba(255, 255, 255, 0.90);

/* Rõ hơn (70%) */
background-color: rgba(255, 255, 255, 0.70);

/* Hoàn toàn trong suốt (không mờ) */
background-color: rgba(255, 255, 255, 0);
```

### 2. Thay đổi hình nền

Thay thế đường dẫn trong `url()`:

```css
/* Thay đổi từ */
background-image: url('../images/NEN02.avif');

/* Sang hình khác */
background-image: url('../images/YOUR_IMAGE.jpg');
```

### 3. Tắt hiệu ứng Parallax

Thay đổi:
```css
background-attachment: fixed;  /* Có parallax */
/* Thành */
background-attachment: scroll;  /* Không có parallax */
```

### 4. Điều chỉnh chiều cao Banner

```css
section.hero {
  padding: 10rem 20px;    /* Tăng/giảm padding */
  min-height: 600px;      /* Tăng/giảm chiều cao tối thiểu */
}
```

---

## ✅ Kiểm tra kết quả

### Trang chủ (index.html)
1. ✅ Hero banner có chiều cao ~600px
2. ✅ Section "Sản phẩm tương tự" có background NEN02.avif với overlay mờ
3. ✅ Section "Tầm nhìn và sứ mệnh" có background NEN02.avif với overlay mờ
4. ✅ Toàn bộ trang có background cố định khi scroll

### Các trang con
1. ✅ Tất cả trang có background NEN02.avif
2. ✅ Overlay màu trắng mờ 85% áp dụng toàn trang
3. ✅ Hiệu ứng parallax hoạt động khi scroll
4. ✅ Nội dung hiển thị rõ ràng trên background

---

## 🔧 Troubleshooting

### Vấn đề: Hình nền không hiển thị

**Nguyên nhân**: Đường dẫn file không đúng

**Giải pháp**: Kiểm tra file `images/NEN02.avif` có tồn tại

### Vấn đề: Background quá tối/sáng

**Giải pháp**: Điều chỉnh giá trị alpha trong `rgba()`:
- Giảm giá trị (VD: 0.75) để background rõ hơn
- Tăng giá trị (VD: 0.95) để background mờ hơn

### Vấn đề: Nội dung bị che khuất

**Giải pháp**: Kiểm tra `z-index`:
```css
/* Đảm bảo overlay ở dưới */
body::before {
  z-index: -1;
}

/* Đảm bảo nội dung ở trên */
section > * {
  position: relative;
  z-index: 1;
}
```

### Vấn đề: Performance kém khi scroll

**Giải pháp**: Tắt `background-attachment: fixed`:
```css
background-attachment: scroll;
```

---

## 📊 Tối ưu hóa

### 1. Tối ưu file hình ảnh

File `NEN02.avif` đã được tối ưu với định dạng AVIF (dung lượng nhẹ, chất lượng cao).

**Lưu ý**: Nếu trình duyệt không hỗ trợ AVIF, chuẩn bị fallback:

```css
background-image: url('../images/NEN02.jpg');        /* Fallback */
background-image: url('../images/NEN02.avif');       /* Modern browsers */
```

### 2. Lazy Loading

Background images được tải ngay, không cần lazy load.

### 3. Responsive

Background tự động scale theo viewport, không cần media queries bổ sung.

---

## 📅 Lịch sử thay đổi

| Ngày | Thay đổi | Người thực hiện |
|------|----------|-----------------|
| 19/12/2025 | Thêm background NEN02.avif cho toàn bộ website với overlay 0.85 | AI Assistant |
| 19/12/2025 | Tăng chiều cao hero banner từ 5rem lên 10rem (600px) | AI Assistant |

---

## 🔗 File liên quan

- [css/styles.css](css/styles.css) - File CSS chính chứa tất cả thay đổi
- [images/NEN02.avif](images/NEN02.avif) - File hình nền
- [index.html](index.html) - Trang chủ
- [pages/gioi-thieu.html](pages/gioi-thieu.html) - Trang giới thiệu
- [pages/thanh-vien.html](pages/thanh-vien.html) - Trang thành viên

---

## 💡 Gợi ý nâng cao

### Sử dụng nhiều background cho các trang khác nhau

Có thể thêm class riêng cho từng trang:

```css
/* Trang giới thiệu */
.page-gioi-thieu {
  background-image: url('../images/BACKGROUND_GIOITHIEU.avif');
}

/* Trang sản phẩm */
.page-san-pham {
  background-image: url('../images/BACKGROUND_SANPHAM.avif');
}
```

Sau đó thêm class vào `<body>` của từng trang.

### Thêm animation cho background

```css
@keyframes backgroundSlide {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

body {
  animation: backgroundSlide 60s ease-in-out infinite alternate;
}
```

---

## 📞 Hỗ trợ

Nếu gặp vấn đề khi thực hiện, vui lòng:
1. Kiểm tra console của trình duyệt (F12)
2. Xác nhận đường dẫn file hình ảnh
3. Kiểm tra CSS có bị ghi đè bởi styles khác

---

**Cập nhật lần cuối**: 19/12/2025
**Phiên bản**: 1.0
