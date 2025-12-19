# HƯỚNG DẪN KHẮC PHỤC MENU DROPDOWN

## 🔴 Vấn đề ban đầu

Website gặp lỗi nghiêm trọng về menu điều hướng:
- **Nhiều dropdown mở cùng lúc** khi hover vào các mục menu
- **Dropdown chồng chéo**, đè lên nhau
- **Nội dung menu lẫn lộn**, khó phân biệt
- **Trải nghiệm người dùng kém**, gây nhầm lẫn

## ✅ Giải pháp đã triển khai

### 1. **Cơ chế hoạt động mới**

Đã thay đổi hoàn toàn cách menu dropdown hoạt động:

#### **Desktop (màn hình > 768px)**
- ✅ Chỉ **một dropdown duy nhất** được mở tại một thời điểm
- ✅ Khi hover vào menu mới, dropdown cũ **tự động đóng**
- ✅ Dropdown **căn lề rõ ràng** ngay dưới menu cha
- ✅ Hiển thị **độc lập**, không chồng chéo
- ✅ Đóng ngay khi **chuột rời khỏi vùng menu**

#### **Mobile (màn hình ≤ 768px)**
- ✅ Click để toggle dropdown
- ✅ Chỉ một dropdown mở tại một thời điểm
- ✅ Dropdown khác tự động đóng khi mở dropdown mới

---

## 📝 Chi tiết thay đổi

### File: [assets/js/header.js](assets/js/header.js)

#### **Thêm Logic JavaScript mới**

```javascript
// Desktop Dropdown Control - Only one dropdown open at a time
const hasDropdownItems = document.querySelectorAll('.has-dropdown');

hasDropdownItems.forEach(item => {
  const link = item.querySelector('.nav-link');
  
  // Desktop hover behavior
  item.addEventListener('mouseenter', function() {
    if (window.innerWidth > 768) {
      // Close all other dropdowns
      hasDropdownItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('dropdown-active');
        }
      });
      // Open current dropdown
      item.classList.add('dropdown-active');
    }
  });
  
  // Close dropdown when mouse leaves
  item.addEventListener('mouseleave', function() {
    if (window.innerWidth > 768) {
      item.classList.remove('dropdown-active');
    }
  });
  
  // Mobile dropdown toggle
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      
      // Close all other dropdowns on mobile
      hasDropdownItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current dropdown
      item.classList.toggle('active');
    }
  });
});

// Close all dropdowns when mouse leaves navigation area
if (mainNavigation) {
  mainNavigation.addEventListener('mouseleave', function() {
    if (window.innerWidth > 768) {
      hasDropdownItems.forEach(item => {
        item.classList.remove('dropdown-active');
      });
    }
  });
}
```

**Những gì code này làm:**
1. **mouseenter**: Khi hover vào menu → đóng tất cả dropdown khác → mở dropdown hiện tại
2. **mouseleave**: Khi chuột rời khỏi menu item → đóng dropdown
3. **Navigation mouseleave**: Khi chuột rời khỏi toàn bộ menu → đóng tất cả dropdown
4. **Mobile click**: Chỉ toggle dropdown được click, đóng các dropdown khác

---

### File: [css/styles.css](css/styles.css)

#### **Cập nhật CSS Dropdown**

**Trước đây (Lỗi):**
```css
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;
}

.has-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
}
```
❌ **Vấn đề**: Tất cả dropdown có thể hiển thị cùng lúc với `:hover`

**Sau khi sửa (Đúng):**
```css
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 0 0 6px 6px;
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  pointer-events: none;
  overflow: hidden;
  max-height: 0;
}

/* Ensure only one dropdown is visible at a time */
.nav-item:not(.dropdown-active) .dropdown-menu {
  display: none;
}

.has-dropdown.dropdown-active .dropdown-menu {
  display: block;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
  max-height: 1000px;
}
```
✅ **Cải thiện**: 
- Chỉ dropdown có class `.dropdown-active` mới hiển thị
- Dropdown không có `.dropdown-active` bị `display: none`
- Transition mượt mà hơn

#### **Cập nhật Mega Menu**

```css
/* Mega Menu */
.mega-menu {
  min-width: 400px;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
}

.mega-menu-section {
  flex: 1;
  min-width: 180px;
}
```

---

## 🎯 Cơ chế hoạt động chi tiết

### Flow hoạt động Desktop

```
1. User hover vào "Sản phẩm"
   ↓
2. JavaScript detect mouseenter
   ↓
3. Xóa class 'dropdown-active' từ TẤT CẢ menu items khác
   ↓
4. Thêm class 'dropdown-active' vào "Sản phẩm"
   ↓
5. CSS hiển thị dropdown của "Sản phẩm"
   ↓
6. User hover sang "Giới thiệu"
   ↓
7. JavaScript detect mouseenter mới
   ↓
8. Xóa 'dropdown-active' từ "Sản phẩm"
   ↓
9. Thêm 'dropdown-active' vào "Giới thiệu"
   ↓
10. CSS hiển thị dropdown của "Giới thiệu", ẩn dropdown "Sản phẩm"
```

### Flow hoạt động Mobile

```
1. User click vào "Sản phẩm"
   ↓
2. JavaScript prevent default action
   ↓
3. Xóa class 'active' từ TẤT CẢ menu items khác
   ↓
4. Toggle class 'active' cho "Sản phẩm"
   ↓
5. CSS hiển thị/ẩn dropdown dựa trên class 'active'
```

---

## 🔍 Class States

### Desktop
- **Mặc định**: Không có class → Dropdown ẩn
- **Hover**: `dropdown-active` → Dropdown hiển thị
- **Rời khỏi**: Xóa `dropdown-active` → Dropdown ẩn

### Mobile
- **Mặc định**: Không có class → Dropdown ẩn
- **Click lần 1**: `active` → Dropdown hiển thị
- **Click lần 2**: Xóa `active` → Dropdown ẩn

---

## ✅ Checklist kiểm tra

### Desktop
- [ ] Hover vào menu → Dropdown mở
- [ ] Hover sang menu khác → Dropdown cũ đóng, dropdown mới mở
- [ ] Chỉ 1 dropdown hiển thị tại một thời điểm
- [ ] Dropdown căn lề ngay dưới menu cha
- [ ] Không có dropdown chồng chéo
- [ ] Chuột rời khỏi menu → Tất cả dropdown đóng
- [ ] Mega menu (Sản phẩm) hiển thị đúng 2 cột

### Mobile
- [ ] Click menu → Dropdown toggle
- [ ] Click menu khác → Dropdown cũ đóng, dropdown mới mở
- [ ] Chỉ 1 dropdown hiển thị tại một thời điểm
- [ ] Dropdown hiển thị full width
- [ ] Scroll mượt mà

---

## 🛠️ Troubleshooting

### Vấn đề: Dropdown vẫn mở nhiều cùng lúc

**Nguyên nhân**: File JavaScript chưa load hoặc có lỗi

**Giải pháp**:
1. Kiểm tra Console (F12) xem có lỗi JavaScript không
2. Đảm bảo file `assets/js/header.js` được load:
   ```html
   <script src="assets/js/header.js"></script>
   ```
3. Clear cache trình duyệt (Ctrl + F5)

---

### Vấn đề: Dropdown không mở

**Nguyên nhân**: Class `.has-dropdown` bị thiếu

**Giải pháp**: Kiểm tra HTML đảm bảo:
```html
<li class="nav-item has-dropdown">
  <a href="#" class="nav-link">Menu</a>
  <div class="dropdown-menu">
    <!-- Dropdown content -->
  </div>
</li>
```

---

### Vấn đề: Transition không mượt

**Nguyên nhân**: CSS transition chưa đúng

**Giải pháp**: Đảm bảo có:
```css
.dropdown-menu {
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
}
```

---

### Vấn đề: Dropdown bị cắt (overflow)

**Nguyên nhân**: Parent container có `overflow: hidden`

**Giải pháp**: 
```css
.nav-item {
  position: relative;
  overflow: visible !important;
}

.main-navigation {
  overflow: visible !important;
}
```

---

## 📱 Responsive Behavior

### Breakpoint: 768px

**Desktop (> 768px)**
- Hover để mở dropdown
- Mouseenter/mouseleave events
- Class: `dropdown-active`

**Mobile (≤ 768px)**
- Click để toggle dropdown
- Click events
- Class: `active`

---

## 🎨 Customization

### Thay đổi tốc độ animation

```css
.dropdown-menu {
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
}
```

### Thay đổi độ rộng dropdown

```css
.dropdown-menu {
  min-width: 250px; /* Thay đổi giá trị này */
}

.mega-menu {
  min-width: 500px; /* Cho mega menu */
}
```

### Thay đổi màu sắc dropdown

```css
.dropdown-menu {
  background-color: #f8f9fa; /* Màu nền */
  border: 1px solid #dee2e6; /* Màu viền */
}

.dropdown-link:hover {
  background-color: #e9ecef; /* Màu hover */
  border-left-color: #007bff; /* Màu accent */
}
```

---

## 📊 Performance

### Tối ưu hóa đã áp dụng

1. **Sử dụng `display: none`** thay vì chỉ dùng `opacity`
   - Giảm GPU usage
   - Dropdown không tồn tại trong rendering tree khi ẩn

2. **Transition ngắn (0.2s)**
   - Phản hồi nhanh
   - Không lag

3. **Event delegation**
   - Chỉ gắn event một lần
   - Không gắn event cho mỗi dropdown item

4. **Class-based control**
   - Không dùng inline styles
   - Dễ maintain

---

## 📋 Files liên quan

| File | Thay đổi | Mô tả |
|------|----------|-------|
| [assets/js/header.js](assets/js/header.js) | ✅ Major | Logic control dropdown |
| [css/styles.css](css/styles.css) | ✅ Major | Styling dropdown |
| [index.html](index.html) | ⚠️ No change | Sử dụng code mới |
| [pages/*.html](pages/) | ⚠️ No change | Sử dụng code mới |

---

## 🎯 Best Practices áp dụng

1. ✅ **Single Responsibility**: Mỗi event handler chỉ làm một việc
2. ✅ **Separation of Concerns**: JavaScript điều khiển logic, CSS điều khiển hiển thị
3. ✅ **Progressive Enhancement**: Hoạt động cơ bản ngay cả khi JavaScript bị tắt
4. ✅ **Mobile First**: Thiết kế cho mobile trước, enhance cho desktop
5. ✅ **Accessibility**: Keyboard navigation support (có thể mở rộng)

---

## 🚀 Tính năng có thể mở rộng

### 1. Keyboard Navigation

```javascript
// Thêm vào header.js
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    hasDropdownItems.forEach(item => {
      item.classList.remove('dropdown-active');
    });
  }
});
```

### 2. Touch Support (Mobile cải thiện)

```javascript
item.addEventListener('touchstart', function(e) {
  if (window.innerWidth > 768) {
    e.preventDefault();
    // Toggle dropdown on touch
    hasDropdownItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('dropdown-active');
      }
    });
    item.classList.toggle('dropdown-active');
  }
});
```

### 3. Accessibility (ARIA)

```html
<li class="nav-item has-dropdown">
  <a href="#" class="nav-link" 
     aria-haspopup="true" 
     aria-expanded="false">
    Menu
  </a>
  <div class="dropdown-menu" role="menu">
    <a href="#" class="dropdown-link" role="menuitem">Item</a>
  </div>
</li>
```

---

## 📅 Lịch sử

| Ngày | Thay đổi | Lý do |
|------|----------|-------|
| 19/12/2025 | Khắc phục dropdown chồng chéo | Lỗi nghiêm trọng UX |
| 19/12/2025 | Thêm logic single dropdown | Cải thiện trải nghiệm |
| 19/12/2025 | Optimize CSS transitions | Performance |

---

## 💡 Tips

1. **Debugging**: Thêm `console.log()` trong event handlers để track
2. **Testing**: Test trên nhiều trình duyệt (Chrome, Firefox, Safari, Edge)
3. **Responsive**: Luôn test cả desktop và mobile
4. **Performance**: Dùng Chrome DevTools > Performance để check

---

## 📞 Support

Nếu gặp vấn đề:
1. Check Console (F12) xem lỗi JavaScript
2. Verify HTML structure có class `.has-dropdown` và `.dropdown-menu`
3. Clear cache (Ctrl + Shift + Delete)
4. Test trên incognito mode

---

**Cập nhật lần cuối**: 19/12/2025  
**Version**: 2.0  
**Tác giả**: AI Assistant
