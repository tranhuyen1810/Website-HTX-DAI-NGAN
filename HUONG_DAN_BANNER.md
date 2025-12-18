# HƯỚNG DẪN SỬ DỤNG BANNER CHUNG

## 🎯 Mục đích
Tất cả các trang trong website sẽ sử dụng chung một hình ảnh banner: `/assets/img/htx01.JPG`

## ✅ Đã hoàn thành

### 1. Tạo CSS class chung `hero-banner`
File: `css/styles.css`

```css
.hero-banner {
  background: linear-gradient(rgba(44, 122, 63, 0.7), rgba(26, 77, 37, 0.7)), url('../assets/img/htx01.JPG');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  padding: 4rem 20px;
  text-align: center;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**Giải thích:**
- `linear-gradient(rgba(44, 122, 63, 0.7), rgba(26, 77, 37, 0.7))`: Lớp phủ màu xanh trong suốt để văn bản dễ đọc
- `url('../assets/img/htx01.JPG')`: Đường dẫn đến hình ảnh banner
- `background-size: cover`: Hình ảnh sẽ phủ kín toàn bộ section
- `background-position: center`: Căn giữa hình ảnh
- `text-shadow`: Thêm bóng cho chữ để dễ đọc hơn

### 2. Áp dụng cho các trang

Đã thêm class `hero-banner` vào các trang:

✅ `index.html` (Trang chủ)
✅ `pages/gioi-thieu.html` (Giới thiệu)
✅ `pages/lien-he.html` (Liên hệ)
✅ `pages/san-pham.html` (Sản phẩm)
✅ `pages/ho-so-nang-luc.html` (Hồ sơ năng lực)
✅ `pages/thanh-vien.html` (Thành viên)
✅ `pages/san-pham/thanh-phan.html` (Thành phần)
✅ `pages/san-pham/thuc-don-tuan.html` (Thực đơn tuần)

## 📝 Cách áp dụng cho trang mới

Khi tạo trang mới, chỉ cần thêm class `hero-banner` vào section hero:

```html
<!-- TRƯỚC -->
<section class="hero">
  <div class="container">
    <h1>Tiêu đề trang</h1>
    <p>Mô tả trang</p>
  </div>
</section>

<!-- SAU -->
<section class="hero hero-banner">
  <div class="container">
    <h1>Tiêu đề trang</h1>
    <p>Mô tả trang</p>
  </div>
</section>
```

## 🔧 Tùy chỉnh

### Thay đổi độ mờ của lớp phủ
Chỉnh giá trị `0.7` trong `rgba(44, 122, 63, 0.7)`:
- `0.5`: Nhạt hơn (thấy hình rõ hơn)
- `0.8`: Đậm hơn (văn bản dễ đọc hơn)

### Thay đổi hình ảnh banner
Trong file `css/styles.css`, tìm `.hero-banner` và thay đổi:
```css
url('../assets/img/htx01.JPG')  /* Hình cũ */
url('../assets/img/NEW_IMAGE.jpg')  /* Hình mới */
```

### Thay đổi chiều cao banner
```css
.hero-banner {
  min-height: 600px;  /* Thay đổi giá trị này */
}
```

## 🌐 Đường dẫn quan trọng

### Từ file CSS (`css/styles.css`)
```
css/styles.css → ../assets/img/htx01.JPG ✅ ĐÚNG
css/styles.css → ../img/htx01.JPG ❌ SAI
```

### Từ trang con trong `pages/` 
Các trang con load CSS từ: `<link rel="stylesheet" href="../css/styles.css">`

### Từ trang con trong `pages/san-pham/`
Các trang con load CSS từ: `<link rel="stylesheet" href="../../css/styles.css">`

## 🔍 Kiểm tra

1. **Khởi động server:**
   ```bash
   cd /workspaces/Website-HTX-DAI-NGAN
   python3 -m http.server 8000
   ```

2. **Truy cập:**
   - http://localhost:8000 (Trang chủ)
   - http://localhost:8000/pages/gioi-thieu.html
   - http://localhost:8000/pages/san-pham.html

3. **Kiểm tra trong browser:**
   - Nhấn `F12` → Tab "Console" → Không có lỗi
   - Tab "Network" → `htx01.JPG` status: `200 OK`

## ❓ Xử lý lỗi

### Banner không hiển thị
1. ✅ Kiểm tra file tồn tại: `ls -lh assets/img/htx01.JPG`
2. ✅ Kiểm tra đường dẫn CSS đúng: `../assets/img/htx01.JPG`
3. ✅ Hard refresh browser: `Ctrl + F5` hoặc `Cmd + Shift + R`
4. ✅ Kiểm tra console có lỗi 404 không

### Hình bị vỡ hoặc méo
- Điều chỉnh `background-position`: `center`, `top`, `bottom`
- Điều chỉnh `background-size`: `cover`, `contain`

## 📌 Ghi chú

- File banner: `/workspaces/Website-HTX-DAI-NGAN/assets/img/htx01.JPG`
- Kích thước: 5.8MB
- Đã áp dụng cho TẤT CẢ các trang hero section
- Server đang chạy tại: http://localhost:8000
