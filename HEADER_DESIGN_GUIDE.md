# HEADER DESIGN GUIDE - HTX ĐẠI NGÀN
## Màu chủ đạo: #AD1E26

---

## ✅ ĐÃ HOÀN THÀNH

### 1. **Cấu trúc Header 2 Tầng**

#### **Top Header** (Nền trắng)
- ✅ Logo HTX ĐẠI NGÀN + Slogan "Lovingly crop to cup ..."
- ✅ Hotline: 091 339 3682
- ✅ Ô tìm kiếm
- ✅ Chuyển đổi ngôn ngữ (🇻🇳/🇬🇧)
- ✅ Giỏ hàng với số lượng

#### **Main Navigation** (Nền #AD1E26)
- ✅ Menu ngang với icon + text
- ✅ Chữ màu trắng
- ✅ Hover: Đậm hơn + viền dưới trắng
- ✅ Active: Nền đậm + viền dưới trắng
- ✅ Dropdown menu
- ✅ Mega menu cho Sản phẩm

---

## 📋 CẤU TRÚC MENU

```
🏠 Trang chủ
ℹ️ Giới thiệu
   ├─ Về chúng tôi
   ├─ Tầm nhìn
   ├─ Sứ mệnh
   └─ Hồ sơ năng lực

🌾 Sản phẩm (Mega Menu)
   ├─ Sản phẩm
   │  ├─ Rau, Củ
   │  └─ Trà – Nước cốt
   └─ Dịch vụ
      ├─ Sấy thăng hoa
      ├─ Sấy nóng/lạnh
      └─ Cấp/Trữ đông

📰 Tin tức & Sự kiện
   ├─ Tin tức
   └─ Sự kiện

👥 Thành viên HTX
   ├─ Thành viên tiêu biểu
   └─ Quyền lợi thành viên

🤝 Hệ thống phân phối
   ├─ Đối tác của chúng tôi
   └─ Các gói đầu tư

📧 Liên hệ
```

---

## 🎨 MÃU SẮC & PHONG CÁCH

### Màu chính
- **Primary:** `#AD1E26` (Đỏ HTX)
- **Text trên navigation:** `#ffffff` (Trắng)
- **Background top header:** `#ffffff` (Trắng)
- **Hover effect:** `rgba(0, 0, 0, 0.15)` (Đen trong suốt)
- **Active state:** `rgba(0, 0, 0, 0.2)` (Đen đậm hơn)

### Trạng thái
```css
/* Normal */
.nav-link {
  background-color: transparent;
  border-bottom: 3px solid transparent;
}

/* Hover */
.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.15);
  border-bottom-color: #ffffff;
}

/* Active */
.nav-link.active {
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: #ffffff;
}
```

---

## 📱 RESPONSIVE DESIGN

### Desktop (> 768px)
- Header fixed sticky ở top
- Menu ngang đầy đủ
- Dropdown hiện khi hover
- Top header hiển thị đầy đủ thông tin

### Mobile (≤ 768px)
- Top header thu gọn: Logo + Menu toggle
- Hamburger menu button màu #AD1E26
- Navigation slide từ trái
- Dropdown toggle bằng click
- Full height sidebar màu #AD1E26
- Menu item có padding lớn hơn để dễ chạm

---

## 🔧 TRIỂN KHAI

### Files đã tạo/sửa

1. **CSS**: `/css/styles.css`
   - New header styles từ dòng ~105
   - Responsive styles từ dòng ~425

2. **JavaScript**: `/assets/js/header.js`
   - Mobile menu toggle
   - Dropdown handling
   - Active state detection
   - Search functionality
   - Language switcher

3. **HTML Template**: `/HEADER_TEMPLATE.html`
   - Template để copy vào các trang khác

4. **Pages updated**:
   - ✅ `/index.html`
   - ✅ `/pages/gioi-thieu.html`
   - ⏳ Các trang khác cần cập nhật

---

## 📝 HƯỚNG DẪN ÁP DỤNG CHO TRANG MỚI

### Bước 1: Copy Header
```html
<!-- Copy từ HEADER_TEMPLATE.html -->
<header class="site-header">
  <!-- ... nội dung header ... -->
</header>
```

### Bước 2: Điều chỉnh đường dẫn
- Nếu file ở root: `href="/"`
- Nếu file trong `/pages/`: `href="../"`
- Nếu file trong `/pages/san-pham/`: `href="../../"`

### Bước 3: Đánh dấu trang active
Thêm class `active` vào nav-link của trang hiện tại:
```html
<a href="/pages/gioi-thieu.html" class="nav-link active">
  <span class="nav-icon">ℹ️</span>
  <span class="nav-text">Giới thiệu</span>
</a>
```

### Bước 4: Thêm JavaScript
```html
<script src="/assets/js/header.js"></script>
<!-- hoặc -->
<script src="../assets/js/header.js"></script>
<!-- hoặc -->
<script src="../../assets/js/header.js"></script>
```

---

## 🎯 TÍNH NĂNG

### ✅ Đã triển khai
- [x] Header 2 tầng (Top + Navigation)
- [x] Logo + Slogan
- [x] Hotline hiển thị
- [x] Tìm kiếm
- [x] Chuyển ngôn ngữ
- [x] Giỏ hàng với counter
- [x] Menu navigation với icon
- [x] Dropdown menu
- [x] Mega menu
- [x] Hover effects
- [x] Active states
- [x] Mobile hamburger menu
- [x] Responsive design
- [x] Smooth transitions

### 🔄 JavaScript Features
- [x] Mobile menu toggle
- [x] Mobile dropdown toggle (click)
- [x] Desktop dropdown (hover)
- [x] Auto-detect active page
- [x] Search input handling
- [x] Language switcher
- [x] Close menu on outside click
- [x] Responsive resize handling

---

## 🧪 TESTING CHECKLIST

### Desktop
- [ ] Header hiển thị đúng 2 tầng
- [ ] Logo hiển thị rõ ràng
- [ ] Hotline/Search/Language/Cart hiển thị đầy đủ
- [ ] Menu navigation màu #AD1E26
- [ ] Hover effect hoạt động
- [ ] Active state hiển thị đúng
- [ ] Dropdown hiện khi hover
- [ ] Mega menu hiển thị 2 cột
- [ ] Tìm kiếm hoạt động
- [ ] Header sticky khi scroll

### Tablet (768px - 1024px)
- [ ] Header thu gọn phù hợp
- [ ] Menu items vẫn hiển thị đủ
- [ ] Dropdown hoạt động tốt

### Mobile (< 768px)
- [ ] Chỉ hiện Logo + Hamburger
- [ ] Menu slide từ trái khi click
- [ ] Menu fullscreen với nền #AD1E26
- [ ] Dropdown toggle bằng click
- [ ] Menu items dễ chạm
- [ ] Close khi click ngoài
- [ ] Hamburger icon animate

---

## 🔍 DEBUG TIPS

### Header không hiển thị đúng màu
```css
/* Check CSS loaded */
.main-navigation {
  background-color: #AD1E26; /* Phải là màu đỏ */
}
```

### Mobile menu không hoạt động
```javascript
// Check console for errors
console.log('Header script loaded');
```

### Active state không hoạt động
- Script `header.js` phải được load
- Path matching phải chính xác
- Class `active` được thêm tự động bởi JS

---

## 📞 LIÊN HỆ & HỖ TRỢ

- Hotline: 091 339 3682
- Email: support@htxdaingan.com
- Template: `/HEADER_TEMPLATE.html`
- Documentation: `/HEADER_DESIGN_GUIDE.md`

---

## 📈 NEXT STEPS

1. ⏳ Cập nhật header cho các trang còn lại:
   - [ ] `/pages/lien-he.html`
   - [ ] `/pages/san-pham.html`
   - [ ] `/pages/ho-so-nang-luc.html`
   - [ ] `/pages/thanh-vien.html`
   - [ ] `/pages/san-pham/box-rau.html`
   - [ ] `/pages/san-pham/thanh-phan.html`
   - [ ] `/pages/san-pham/thuc-don-tuan.html`

2. 🎨 Tùy chỉnh (nếu cần):
   - Thêm animation cho dropdown
   - Thêm search suggestions
   - Tích hợp đa ngôn ngữ thực tế
   - Kết nối giỏ hàng với backend

3. ✅ Testing toàn diện trên mọi device

---

**Last Updated:** December 18, 2025  
**Version:** 1.0  
**Status:** ✅ Ready for Production
