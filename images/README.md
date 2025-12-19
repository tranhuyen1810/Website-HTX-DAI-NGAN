# Images Directory - Hướng Dẫn Sử Dụng

## Mục Đích
Thư mục này chứa các hình ảnh nền cho website HTX Lâm Đồng Đại Ngàn.

## File Cần Thiết

### NEN02.avif (QUAN TRỌNG)
- **Mục đích**: Hình nền cho các vùng sản phẩm và gói đầu tư
- **Kích thước khuyến nghị**: 1920x1080px hoặc lớn hơn
- **Định dạng**: AVIF (hoặc JPG/PNG nếu trình duyệt không hỗ trợ AVIF)
- **Dung lượng**: < 500KB (sau khi tối ưu)

### Cách Thêm File NEN02.avif

1. **Tải file hình nền lên thư mục này**:
   ```bash
   # Sử dụng FTP/SFTP hoặc Git
   cp your-image.avif /images/NEN02.avif
   ```

2. **Hoặc đổi tên file hiện có**:
   ```bash
   mv your-image.jpg NEN02.avif
   ```

3. **Kiểm tra file**:
   ```bash
   ls -lh images/NEN02.avif
   ```

### Fallback (Nếu không có AVIF)
Nếu bạn không có file AVIF, có thể sử dụng JPG hoặc PNG:

1. Đổi tên file của bạn thành `NEN02.jpg` hoặc `NEN02.png`
2. Cập nhật trong file CSS: `assets/css/factory-style.css`
3. Tìm tất cả dòng có `url('/images/NEN02.avif')`
4. Thay bằng `url('/images/NEN02.jpg')` hoặc `url('/images/NEN02.png')`

## File Hiện Có

### 1.png
- Logo HTX (đã sao chép từ assets/img/)
- Sử dụng làm placeholder nếu cần

## Các Vùng Sử Dụng Hình Nền

1. **Vùng Sản Phẩm** (`.products-section`)
   - Hiển thị trên trang chủ
   - Có hiệu ứng blur 8px
   - Overlay trắng 93%

2. **Box Rau & Menu Tuần** (`.box-rau-section`, `.weekly-menu-section`)
   - Hiệu ứng blur 10px
   - Overlay xám nhạt 95%

3. **Gói Đầu Tư** (`.investment-packages`)
   - Hiệu ứng blur 12px
   - Overlay trắng 92%

## Tối Ưu Hóa Hình Ảnh

### Công Cụ Khuyến Nghị
- **AVIF**: [Squoosh.app](https://squoosh.app) - Chọn AVIF, Quality 75-85
- **JPG**: [TinyJPG](https://tinyjpg.com) - Giảm 50-70% dung lượng
- **PNG**: [TinyPNG](https://tinypng.com) - Giảm dung lượng không mất chất lượng

### Cài Đặt Khuyến Nghị
```
Định dạng: AVIF
Chất lượng: 80
Kích thước: 1920x1080px
Effort: 4 (AVIF)
```

## Xử Lý Sự Cố

### Hình nền không hiển thị
1. Kiểm tra đường dẫn file
2. Kiểm tra quyền truy cập (chmod 644)
3. Xóa cache trình duyệt (Ctrl+F5)

### File quá lớn
1. Sử dụng công cụ nén (Squoosh, TinyJPG)
2. Giảm kích thước xuống 1920x1080px
3. Giảm chất lượng xuống 75-80%

## Liên Hệ
- Email: rogger.hoang@gmail.com
- Điện thoại: 0767.333.379
