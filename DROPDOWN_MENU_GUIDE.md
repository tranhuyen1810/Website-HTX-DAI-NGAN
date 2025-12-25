# 📖 Hướng Dẫn Sử Dụng Menu Dropdown

## Tổng Quan
Menu dropdown đã được thiết kế với các tiêu chuẩn chuyên nghiệp, đảm bảo trải nghiệm người dùng tốt nhất trên mọi thiết bị.

## Cấu Trúc HTML

### Menu Dropdown Cơ Bản
```html
<li class="nav-item has-dropdown">
  <a href="#link" class="nav-link">
    <span class="nav-text">TÊN MENU</span>
  </a>
  <div class="dropdown-menu">
    <a href="#link1" class="dropdown-link">Mục 1</a>
    <a href="#link2" class="dropdown-link">Mục 2</a>
  </div>
</li>
```

### Menu Dropdown Dạng Mega Menu
```html
<li class="nav-item has-dropdown">
  <a href="#link" class="nav-link">
    <span class="nav-text">TÊN MENU</span>
  </a>
  <div class="dropdown-menu mega-menu">
    <div class="mega-menu-section">
      <h4>Danh mục 1</h4>
      <a href="#" class="dropdown-link">Mục 1.1</a>
      <a href="#" class="dropdown-link">Mục 1.2</a>
    </div>
    <div class="mega-menu-section">
      <h4>Danh mục 2</h4>
      <a href="#" class="dropdown-link">Mục 2.1</a>
      <a href="#" class="dropdown-link">Mục 2.2</a>
    </div>
  </div>
</li>
```

## CSS Classes

| Class | Mô tả |
|-------|-------|
| `.nav-item` | Container cho mỗi menu item |
| `.has-dropdown` | Thêm vào `.nav-item` nếu có dropdown |
| `.nav-link` | Link chính của menu |
| `.nav-text` | Text bên trong link |
| `.dropdown-menu` | Container của dropdown |
| `.dropdown-link` | Các link bên trong dropdown |
| `.mega-menu` | Thêm vào `.dropdown-menu` để tạo mega menu |
| `.mega-menu-section` | Section bên trong mega menu |
| `.dropdown-active` | Class tự động thêm khi dropdown mở (desktop) |
| `.active` | Class tự động thêm khi dropdown mở (mobile) |

## JavaScript Events

File `assets/js/header.js` xử lý các tương tác:

### Desktop Behavior
- **Hover** → Mở dropdown
- **Mouse Leave** → Đóng dropdown
- Chỉ 1 dropdown mở tại một thời điểm

### Mobile Behavior (≤768px)
- **Click/Tap** → Toggle dropdown
- Accordion style (mở/đóng)
- Chỉ 1 dropdown mở tại một thời điểm

## CSS Variables (Tùy Chỉnh)

Các giá trị có thể tùy chỉnh trong `css/styles.css`:

```css
/* Màu sắc */
--brand-color: #AD1E26;
--text-color: #333333;
--bg-white: #ffffff;

/* Timing */
--dropdown-duration: 0.35s;
--dropdown-timing: cubic-bezier(0.4, 0, 0.2, 1);

/* Spacing */
--dropdown-padding: 14px 20px;
--dropdown-margin-top: 8px;

/* Shadow */
--dropdown-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
```

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| > 768px | Desktop: Hover to open, smooth fade/slide |
| ≤ 768px | Mobile: Click to toggle, accordion style |
| ≤ 480px | Extra small: Logo slogan hidden |

## Animation Details

### Desktop
1. **Initial State**: 
   - `opacity: 0`
   - `visibility: hidden`
   - `transform: translateY(-15px)`

2. **Active State**:
   - `opacity: 1`
   - `visibility: visible`
   - `transform: translateY(0)`

3. **Duration**: 0.35s
4. **Timing**: cubic-bezier(0.4, 0, 0.2, 1)

### Mobile
1. **Initial State**: `max-height: 0`
2. **Active State**: `max-height: 500px`
3. **Duration**: 0.4s

## Accessibility Features

✅ **Keyboard Navigation**: Tab để di chuyển giữa các menu  
✅ **ARIA Labels**: Mobile menu toggle có aria-label  
✅ **Visual Feedback**: Border, background, color changes  
✅ **Focus States**: Tất cả interactive elements có focus state  
✅ **Semantic HTML**: Đúng cấu trúc `<nav>`, `<ul>`, `<li>`

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | Latest | ✅ Full |
| Edge | Latest | ✅ Full |
| IE11 | - | ❌ Not supported |

## Performance Tips

1. **CSS Transform**: Sử dụng `transform` thay vì `top/left` (GPU accelerated)
2. **Will-Change**: Có thể thêm `will-change: transform, opacity` nếu cần
3. **Debounce**: Không cần debounce vì CSS handle animation
4. **Reduce Motion**: Có thể thêm media query `prefers-reduced-motion`

## Troubleshooting

### Dropdown không mở
- ✅ Kiểm tra class `.has-dropdown` đã thêm vào `.nav-item`
- ✅ Kiểm tra file `assets/js/header.js` đã được load
- ✅ Kiểm tra console có error không

### Animation không mượt
- ✅ Kiểm tra CSS transition có đúng không
- ✅ Test trên nhiều browser
- ✅ Kiểm tra GPU acceleration (dùng DevTools)

### Mobile menu không hoạt động
- ✅ Kiểm tra breakpoint (768px)
- ✅ Kiểm tra JavaScript event listeners
- ✅ Test trên thiết bị thật, không chỉ emulator

## Examples

### Thêm Dropdown Mới

```html
<li class="nav-item has-dropdown">
  <a href="#blog" class="nav-link">
    <span class="nav-text">BLOG</span>
  </a>
  <div class="dropdown-menu">
    <a href="#tutorials" class="dropdown-link">Tutorials</a>
    <a href="#news" class="dropdown-link">News</a>
    <a href="#resources" class="dropdown-link">Resources</a>
  </div>
</li>
```

### Thêm Icon vào Menu Item

```html
<li class="nav-item has-dropdown">
  <a href="#products" class="nav-link">
    <span class="nav-icon">🛍️</span>
    <span class="nav-text">SẢN PHẨM</span>
  </a>
  <div class="dropdown-menu">
    <!-- dropdown items -->
  </div>
</li>
```

## Testing Checklist

- [ ] Desktop hover functionality
- [ ] Mobile tap functionality
- [ ] Animation smoothness
- [ ] Multiple dropdowns (only one open)
- [ ] Responsive breakpoints
- [ ] Keyboard navigation
- [ ] Touch gestures
- [ ] Browser compatibility
- [ ] Performance (60fps)
- [ ] Accessibility (screen readers)

## Support

Nếu gặp vấn đề hoặc cần hỗ trợ:
1. Kiểm tra console browser có errors
2. Xem file `DROPDOWN_MENU_UPDATE.md` để biết chi tiết
3. Test với file `test-dropdown-menu.html`
4. Kiểm tra browser DevTools Network tab

---
**Version**: 1.0.0  
**Last Updated**: 22/12/2025  
**Maintained by**: GitHub Copilot
