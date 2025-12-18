# 🧪 Hướng Dẫn Kiểm Tra Menu Header

## 🚀 Bắt Đầu Nhanh

### 1. Mở Website
```bash
# Nếu dùng Python
python3 -m http.server 8000

# Rồi truy cập: http://localhost:8000
```

### 2. Xem File Test Report
Mở file: `MENU_TEST_REPORT.html` trong trình duyệt

---

## 📱 Test Trên Desktop (Hover)

### Test 1: Dropdown Menu Hover
**Yêu cầu**: Khi di chuột lên "Giới thiệu", dropdown xuất hiện

**Các bước**:
1. Mở http://localhost:8000 (homepage)
2. Di chuột lên mục "Giới thiệu" trong header
3. **Kỳ vọng**: 
   - Dropdown xuất hiện mượt mà (0.3s transition)
   - Background xanh nhạt (#f0f8f4)
   - Hiển thị 4 mục con: Về chúng tôi, Tầm nhìn, Sứ mệnh, Hồ sơ năng lực

**Xác nhận**:
- ✅ Dropdown xuất hiện
- ✅ Smooth animation
- ✅ Text rõ ràng

### Test 2: Hover Effect Trên Dropdown Items
**Yêu cầu**: Khi di chuột lên mục con, mục con highlight

**Các bước**:
1. Hover over "Giới thiệu" → dropdown xuất hiện
2. Di chuột lên "Về chúng tôi"
3. **Kỳ vọng**:
   - Background thay đổi thành xanh nhạt
   - Text thành xanh đậm (#2c7a3f)
   - Cursor thành pointer (có thể click)

**Xác nhận**:
- ✅ Color change on hover
- ✅ Cursor pointer
- ✅ Visual feedback rõ ràng

### Test 3: Click Dropdown Link
**Yêu cầu**: Click vào mục con → navigate đến trang đúng

**Các bước**:
1. Hover "Giới thiệu" → dropdown xuất hiện
2. Click "Về chúng tôi"
3. **Kỳ vọng**:
   - Page navigate đến `pages/gioi-thieu.html`
   - URL thay đổi
   - Nội dung giới thiệu hiển thị
   - "Giới thiệu" trong menu vẫn highlighted

**Xác nhận**:
- ✅ Navigation working
- ✅ Correct URL
- ✅ Content loaded
- ✅ Active link highlighted

### Test 4: Mega Menu (Sản phẩm & Dịch vụ)
**Yêu cầu**: Mega menu có 2 cột layout

**Các bước**:
1. Di chuột lên "Sản phẩm & Dịch vụ"
2. **Kỳ vọng**:
   - Menu rộng hơn (~400px)
   - Có 2 cột: "Sản phẩm" và "Dịch vụ"
   - Mỗi cột có heading + links

**Cấu trúc**:
```
┌─────────────────────────────────┐
│ Sản phẩm      │ Dịch vụ         │
├─────────────────────────────────┤
│ Rau, Củ       │ Sấy thăng hoa   │
│ Trà – Nước cốt│ Sấy nóng/lạnh   │
│               │ Cấp/Trữ đông    │
└─────────────────────────────────┘
```

**Xác nhận**:
- ✅ 2-column layout
- ✅ Organized grouping
- ✅ All links visible

### Test 5: Active Link Highlighting
**Yêu cầu**: Trang hiện tại trong menu được highlight

**Các bước**:
1. Hiện tại ở homepage
2. Click "Giới thiệu" → navigate đến trang giới thiệu
3. Nhìn vào header
4. **Kỳ vọng**:
   - "Giới thiệu" menu item highlight
   - Dropdown item "Về chúng tôi" cũng highlight (active)
   - Left border xanh 3px
   - Background light green

**Xác nhận**:
- ✅ Parent highlighted
- ✅ Child highlighted
- ✅ Border visible
- ✅ User knows current location

### Test 6: Dropdown Close on Click Away
**Yêu cầu**: Click anywhere outside dropdown → dropdown đóng

**Các bước**:
1. Hover "Giới thiệu" → dropdown xuất hiện
2. Click vào main content area (không phải menu)
3. **Kỳ vọng**:
   - Dropdown mất
   - Menu items bình thường

**Xác nhận**:
- ✅ Dropdown closes
- ✅ Smooth transition
- ✅ No residual styling

---

## 📱 Test Trên Mobile (<768px width)

### Test 7: Hamburger Menu Toggle
**Yêu cầu**: Click hamburger (☰) → menu mở/đóng

**Các bước**:
1. Resize browser đến <768px (mobile view)
2. Nhìn vào top-right corner → hamburger icon (3 gạch ngang)
3. Click hamburger
4. **Kỳ vọng**:
   - Menu items hiển thị dưới header
   - Hamburger icon transform (X shape)
   - Menu items full-width, vertical

**Xác nhận**:
- ✅ Hamburger visible
- ✅ Animation smooth
- ✅ Menu appears/disappears

### Test 8: Mobile Dropdown Tap
**Yêu cầu**: Tap (click) item có dropdown → dropdown mở

**Các bước**:
1. Mobile view (<768px)
2. Click hamburger → menu mở
3. Click "Giới thiệu"
4. **Kỳ vọng**:
   - Dropdown submenu mở
   - Arrow icon rotate 180°
   - Submenu items visible
   - Page không navigate (wait for second tap)

**Xác nhận**:
- ✅ Dropdown opens on tap
- ✅ Arrow rotates
- ✅ Items visible
- ✅ No premature navigation

### Test 9: Mobile Link Navigation
**Yêu cầu**: Tap link → navigate + close menu

**Các bước**:
1. Mobile view, hamburger opened, dropdown opened
2. Click "Về chúng tôi" inside "Giới thiệu" dropdown
3. **Kỳ vọng**:
   - Navigate đến pages/gioi-thieu.html
   - Menu tự động đóng
   - Hamburger icon kembali ke ☰ shape
   - Page content loaded

**Xác nhận**:
- ✅ Navigation works
- ✅ Menu auto-closes
- ✅ Content visible
- ✅ Hamburger reset

### Test 10: Mobile - Dropdown Close
**Yêu cầu**: Tap item lần 2 → dropdown đóng

**Các bước**:
1. Mobile view, menu opened
2. Click "Sản phẩm & Dịch vụ" → dropdown opens
3. Click "Sản phẩm & Dịch vụ" lần 2
4. **Kỳ vọng**:
   - Dropdown closes
   - Arrow rotates lại

**Xác nhận**:
- ✅ Toggle working
- ✅ Arrow animation

---

## 🔄 Responsive Test

### Test 11: Resize Mobile → Desktop
**Yêu cầu**: Resize từ mobile → desktop, menu tự adjust

**Các bước**:
1. Mulai ở mobile view (<768px), menu opened
2. Resize browser → desktop (>768px)
3. **Kỳ vọng**:
   - Menu tự động close
   - Hamburger hidden
   - Navigation items inline
   - Dropdown bisa hover lagi

**Xác nhận**:
- ✅ Hamburger hidden
- ✅ Menu inline
- ✅ Hover works

### Test 12: Resize Desktop → Mobile
**Yêu cầu**: Resize dari desktop → mobile

**Các bước**:
1. Mulai ở desktop (>768px)
2. Resize browser → mobile (<768px)
3. **Kỳ vọng**:
   - Menu hidden
   - Hamburger visible
   - Dapat di-tap

**Xác nhận**:
- ✅ Hamburger appears
- ✅ Menu hidden
- ✅ Tap working

---

## 🌐 Cross-Browser Test

### Test 13: Chrome/Chromium
- [ ] Desktop hover working
- [ ] Mobile tap working
- [ ] Transitions smooth
- [ ] All links navigating

### Test 14: Firefox
- [ ] Dropdown appears/disappears
- [ ] Active states visible
- [ ] Mobile menu functioning
- [ ] Responsive working

### Test 15: Safari
- [ ] Hover effects working
- [ ] Tap events captured
- [ ] CSS transitions smooth
- [ ] No layout issues

### Test 16: Edge
- [ ] All functionality same as Chrome
- [ ] Performance good
- [ ] Mobile smooth

---

## 🎯 Critical Path Testing

### Scenario 1: User Discovers New Product (Desktop)
1. Mulai di homepage
2. Hover "Sản phẩm & Dịch vụ"
3. Click "Rau, Củ"
4. **Kỳ vọng**: Navigate to pages/san-pham/box-rau.html, header updated

### Scenario 2: Mobile User Browse Members
1. Mobile view, homepage
2. Click hamburger → menu opens
3. Click "Thành viên HTX" → dropdown opens
4. Click "Thành viên tiêu biểu"
5. **Kỳ vọng**: Navigate to pages/thanh-vien.html, menu closed

### Scenario 3: User Checks Active Page
1. Navigate to pages/lien-he.html (Liên hệ)
2. Look at header
3. **Kỳ vọng**: "Liên hệ" highlighted in header

### Scenario 4: User Explores Company Info
1. Desktop, click "Giới thiệu"
2. Drop opens, click "Tầm nhìn"
3. **Kỳ vọng**: Navigate to pages/gioi-thieu.html#tam-nhin (smooth scroll to section)

---

## ⚠️ Edge Cases

### Test 17: Multiple Dropdowns Hover
**Bước**:
1. Hover "Giới thiệu" → dropdown opens
2. Quick hover "Sản phẩm & Dịch vụ"
3. **Kỳ vọng**:
   - Previous dropdown closes
   - New dropdown opens
   - No overlap/z-index issues

### Test 18: Mobile - Nested Tap
**Bước**:
1. Mobile menu opened
2. Tap "Sản phẩm & Dịch vụ"
3. Without closing, tap "Trang chủ" (no dropdown)
4. **Kỳ vọng**:
   - Navigate to homepage
   - Menu closes
   - All dropdowns reset

### Test 19: Anchor Links
**Bước**:
1. On pages/lien-he.html
2. Click "Liên hệ" → dropdown opens
3. Desktop: Click FAQ link (if exists)
4. **Kỳ vọng**:
   - Smooth scroll to anchor
   - No page reload

### Test 20: Keyboard Tabbing (Accessibility)
**Bước**:
1. Press TAB repeatedly
2. Navigate through menu items
3. **Kỳ vọng** (future enhancement):
   - Focus ring visible
   - Tab order logical
   - Can trigger with Enter/Space

---

## 🚨 Common Issues to Check

| Issue | Test | Expected |
|-------|------|----------|
| Dropdown không mở | Hover "Giới thiệu" | Dropdown visible |
| Links không work | Click dropdown item | Navigate + URL change |
| Menu không đóng mobile | Tap outside | Menu closes |
| Active state sai | Navigate then check | Correct item highlighted |
| Responsive fail | Resize | Correct layout apply |
| Click blocking | Click dropdown | Always navigates (no stuck) |
| Z-index conflict | Dropdown vs content | Dropdown on top |
| Hamburger stuck | Resize mobile→desktop | Icon hides |

---

## ✅ Final Checklist

- [ ] All 20 menu links working
- [ ] Desktop hover smooth
- [ ] Mobile tap responsive
- [ ] Active state accurate
- [ ] No click blocking
- [ ] Responsive transitions smooth
- [ ] Cross-browser tested
- [ ] Mobile hamburger functional
- [ ] Dropdown items styled
- [ ] Mega menu 2-column
- [ ] Anchor links working
- [ ] Menu consistent across pages
- [ ] Performance good (no lag)
- [ ] Accessibility basics (aria-labels, semantic HTML)

---

## 🎓 Testing Tips

1. **Use DevTools**: F12 → Toggle device toolbar (mobile view)
2. **Clear Cache**: Ctrl+Shift+R (hard refresh)
3. **Test Slowly**: Don't rush, observe each transition
4. **Check Console**: F12 → Console tab (no errors)
5. **Test Different Screen Sizes**: 
   - Mobile: 375px (iPhone SE)
   - Tablet: 768px (iPad)
   - Desktop: 1200px+ (PC)
6. **Network Throttling**: DevTools → Network → throttle (simulate slow connection)

---

## 📞 Troubleshooting

### Dropdown không mở
**Kiểm tra**:
- CSS: `.has-dropdown:hover .dropdown-menu` defined?
- HTML: Có `.dropdown-menu` div?
- Browser: CSS hover support?

### Mobile menu stuck
**Kiểm tra**:
- JavaScript error? (F12 Console)
- Class `.open` not toggling?
- Media query <768px working?

### Active link sai
**Kiểm tra**:
- setActiveMenuLink() function running?
- Current path matching href?
- Browser console errors?

### Responsive glitchy
**Kiểm tra**:
- Resize event handler working?
- Classes toggling correctly?
- CSS media query threshold?

---

## 📊 Test Report Template

```
Date: 17/12/2025
Tester: [Your Name]
Browser: Chrome 120.0
Device: Desktop / Mobile
OS: Windows / Mac / Linux

Results:
✅ Desktop hover: PASS
✅ Mobile tap: PASS
✅ Navigation: PASS
✅ Active state: PASS
✅ Responsive: PASS

Issues Found:
- [Issue 1]
- [Issue 2]

Status: APPROVED ✅
```

---

**Last Updated**: 17/12/2025
**Version**: 1.0
**Status**: ✅ All Tests Ready
