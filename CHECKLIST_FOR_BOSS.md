# ✅ CHECKLIST KIỂM TRA - DÀNH CHO SẾP

## 🎯 Mục tiêu: Verify Navigation Links THÀNH VIÊN HTX

---

## 📋 HƯỚNG DẪN KIỂM TRA NHANH (5 phút)

### Bước 1: Mở trang test
```
URL: http://localhost:8080/test-navigation-links.html
Hoặc: https://[your-domain]/test-navigation-links.html
```

### Bước 2: Test Menu Dropdown

#### ✅ Test 1: Dropdown hiển thị
- [ ] Di chuột vào "THÀNH VIÊN HTX" ở header
- [ ] Verify: Dropdown xuất hiện mượt mà
- [ ] Verify: Thấy 4 mục với icons (👥📋⚖️📄)

#### ✅ Test 2: Click "Danh sách thành viên"
- [ ] Click vào mục "👥 Danh sách thành viên"
- [ ] Verify: Chuyển sang trang `danh-sach-thanh-vien.html`
- [ ] Verify: Trang load thành công
- [ ] Verify: Menu "THÀNH VIÊN HTX" được highlight đỏ
- [ ] Verify: Mục "Danh sách thành viên" có border trái màu đỏ

#### ✅ Test 3: Click "Quy chế tham gia"
- [ ] Quay lại trang test hoặc index
- [ ] Di chuột vào "THÀNH VIÊN HTX"
- [ ] Click vào mục "📋 Quy chế tham gia"
- [ ] Verify: Chuyển sang trang `quy-che-tham-gia.html`
- [ ] Verify: Trang load thành công

#### ✅ Test 4: Click "Quyền lợi và nghĩa vụ"
- [ ] Quay lại trang test hoặc index
- [ ] Di chuột vào "THÀNH VIÊN HTX"
- [ ] Click vào mục "⚖️ Quyền lợi và nghĩa vụ"
- [ ] Verify: Chuyển sang trang `quyen-loi-nghia-vu.html`
- [ ] Verify: Trang load thành công

#### ✅ Test 5: Click "Tài liệu biểu mẫu"
- [ ] Quay lại trang test hoặc index
- [ ] Di chuột vào "THÀNH VIÊN HTX"
- [ ] Click vào mục "📄 Tài liệu biểu mẫu"
- [ ] Verify: Chuyển sang trang `tai-lieu-bieu-mau.html`
- [ ] Verify: Trang load thành công

---

## 🎯 TIÊU CHÍ NGHIỆM THU (Theo yêu cầu)

### ✅ Requirement 1: Links có thể click
**Yêu cầu:** Mỗi mục con phải là thẻ `<a>` với href hợp lệ

**Cách test:**
1. Mở DevTools (F12)
2. Inspect dropdown menu
3. Verify: Mỗi mục là `<a href="xxx.html">`

**Kết quả:** 
- [ ] PASS - Tất cả là thẻ `<a>` hợp lệ
- [ ] FAIL - Ghi chú lỗi: _______________

---

### ✅ Requirement 2: Dropdown mở khi hover/click
**Yêu cầu:** Dropdown phải mở và không chặn click

**Cách test:**
1. Hover vào "THÀNH VIÊN HTX"
2. Verify: Dropdown hiện ra
3. Move chuột xuống dropdown
4. Verify: Dropdown không biến mất
5. Click vào một mục bất kỳ
6. Verify: Có điều hướng (không bị chặn)

**Kết quả:**
- [ ] PASS - Dropdown mở và links clickable
- [ ] FAIL - Ghi chú lỗi: _______________

---

### ✅ Requirement 3: Điều hướng đúng trang
**Yêu cầu:** Click → đến đúng trang tương ứng

**Test Cases:**

| # | Mục | Trang đích | PASS/FAIL |
|---|-----|-----------|-----------|
| 1 | Danh sách thành viên | danh-sach-thanh-vien.html | [ ] |
| 2 | Quy chế tham gia | quy-che-tham-gia.html | [ ] |
| 3 | Quyền lợi và nghĩa vụ | quyen-loi-nghia-vu.html | [ ] |
| 4 | Tài liệu biểu mẫu | tai-lieu-bieu-mau.html | [ ] |

**Kết quả:**
- [ ] PASS - Tất cả điều hướng đúng
- [ ] FAIL - Ghi chú lỗi: _______________

---

### ✅ Requirement 4: Dropdown đóng sau click
**Yêu cầu:** Dropdown phải đóng khi click và điều hướng

**Cách test:**
1. Hover vào "THÀNH VIÊN HTX"
2. Click vào một mục
3. Verify: Page navigate → dropdown tự động đóng

**Kết quả:**
- [ ] PASS - Dropdown đóng khi navigate
- [ ] FAIL - Ghi chú lỗi: _______________

---

### ✅ Requirement 5: Active state highlighting
**Yêu cầu:** Mục hiện tại phải được highlight

**Cách test:**
1. Click vào "Danh sách thành viên"
2. Verify: Menu "THÀNH VIÊN HTX" có màu đỏ
3. Hover vào menu để xem dropdown
4. Verify: Mục "Danh sách thành viên" có:
   - Background màu xám nhạt
   - Border trái màu đỏ
   - Font weight đậm hơn

**Kết quả:**
- [ ] PASS - Active state rõ ràng
- [ ] FAIL - Ghi chú lỗi: _______________

---

### ✅ Requirement 6: File download support
**Yêu cầu:** Tài liệu biểu mẫu hỗ trợ tải file

**Cách test:**
1. Vào trang "Tài liệu biểu mẫu"
2. Verify: Có danh sách file
3. Click vào link file PDF/DOCX
4. Verify: File download hoặc mở tab mới

**Kết quả:**
- [ ] PASS - Download/view hoạt động
- [ ] FAIL - Ghi chú lỗi: _______________

---

## 📊 TỔNG KẾT

### Checklist Summary
- [ ] Requirement 1: Links có thể click
- [ ] Requirement 2: Dropdown mở/không chặn
- [ ] Requirement 3: Điều hướng đúng
- [ ] Requirement 4: Dropdown đóng
- [ ] Requirement 5: Active state
- [ ] Requirement 6: File download

### Overall Result
- [ ] **PASS** - Tất cả requirements đạt
- [ ] **FAIL** - Có lỗi cần fix (xem ghi chú trên)

---

## 🐛 NẾU CÓ LỖI

### Lỗi 1: Links không click được
**Triệu chứng:** Click vào mục nhưng không có phản hồi

**Nguyên nhân có thể:**
- CSS `pointer-events: none` trên dropdown
- JavaScript `preventDefault()` chặn click
- Overlay element che lên dropdown

**Fix:** Remove pointer-events, remove preventDefault

---

### Lỗi 2: Điều hướng sai trang
**Triệu chứng:** Click vào A nhưng đi đến trang B

**Nguyên nhân có thể:**
- Href attribute sai
- JavaScript routing lỗi

**Fix:** Check href attribute trong HTML

---

### Lỗi 3: Dropdown không mở
**Triệu chứng:** Hover/click nhưng dropdown không hiện

**Nguyên nhân có thể:**
- CSS visibility/opacity không đổi
- Display none không remove
- JavaScript chặn hover

**Fix:** Check CSS hover selector

---

### Lỗi 4: Active state không hoạt động
**Triệu chứng:** Không highlight mục hiện tại

**Nguyên nhân có thể:**
- JavaScript không detect đúng page
- CSS class không apply
- Path matching lỗi

**Fix:** Check navigation.js logic

---

## 📞 LIÊN HỆ HỖ TRỢ

Nếu có vấn đề khi test:
1. Check console (F12) xem có error
2. Verify file paths tồn tại
3. Clear cache và reload
4. Liên hệ dev team với screenshot/video

---

## ✅ CHỮ KÝ XÁC NHẬN

**Người test:** _______________  
**Ngày test:** _______________  
**Kết quả:** [ ] PASS  [ ] FAIL  
**Ghi chú:** _______________________________________________

---

**Version:** 1.0.0  
**Last Updated:** December 17, 2025
