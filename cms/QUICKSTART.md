# 🚀 HƯỚNG DẪN NHANH - HTX CMS

## Cài đặt trong 5 phút ⚡

### 1️⃣ Cài đặt dependencies
```bash
cd cms
npm install
```

### 2️⃣ Tạo file .env
```bash
cp .env.example .env
```

Chỉnh sửa `.env` - **QUAN TRỌNG: Thay đổi JWT_SECRET!**
```env
JWT_SECRET=your-random-secret-key-here-change-this
ADMIN_PASSWORD=YourStrongPassword123!
```

### 3️⃣ Khởi tạo database
```bash
npm run init-db
```

**Ghi nhớ thông tin đăng nhập hiển thị!**

### 4️⃣ Khởi động server
```bash
npm start
```

### 5️⃣ Truy cập Admin Panel
Mở trình duyệt: **http://localhost:3000/cms/admin**

Đăng nhập với:
- Username: `admin` 
- Password: (mật khẩu bạn đã thiết lập trong .env)

---

## ⚡ Các lệnh hay dùng

```bash
# Khởi động server (development)
npm run dev

# Khởi động server (production)
npm start

# Khởi tạo/reset database
npm run init-db

# Backup database
npm run backup
```

---

## 🎯 Các tính năng chính

### 📄 Quản lý Nội dung
- Trang tĩnh (Giới thiệu, Liên hệ, v.v.)
- Tin tức & Sự kiện
- Sản phẩm nông nghiệp
- Dịch vụ
- Đối tác
- Gói đầu tư

### 🖼️ Thư viện Media
- Upload hình ảnh (JPEG, PNG, GIF, WebP)
- Upload video (MP4, WebM)
- Quản lý & tổ chức file
- Tự động resize & optimize

### 👥 Phân quyền
- **Admin**: Toàn quyền
- **Editor**: Tạo & sửa nội dung
- **Viewer**: Chỉ xem

### 🔐 Bảo mật
- JWT Authentication
- Password hashing (bcrypt)
- Role-based access control
- Activity logging

---

## 📱 Responsive Design

Admin panel hoạt động mượt mà trên:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

---

## 🔗 API Endpoints

### Authentication
```
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/change-password
POST /api/auth/logout
```

### Content Management
```
GET    /api/content/:type          # Danh sách
GET    /api/content/:type/:id      # Chi tiết
POST   /api/content/:type          # Tạo mới
PUT    /api/content/:type/:id      # Cập nhật
DELETE /api/content/:type/:id      # Xóa
```

**Content types**: pages, posts, products, services, partners, investment_packages

### Media
```
POST   /api/media/upload           # Upload single
POST   /api/media/upload-multiple  # Upload multiple
GET    /api/media                  # Danh sách
DELETE /api/media/:id              # Xóa
```

---

## 🌐 Tích hợp với Website

### Thêm vào website HTML

```html
<!-- Thêm vào head -->
<script src="js/cms-client.js"></script>

<!-- Render tin tức -->
<div id="newsList"></div>

<script>
async function loadNews() {
  const response = await fetch('http://localhost:3000/api/content/posts?is_published=1');
  const data = await response.json();
  
  const html = data.data.map(post => `
    <article>
      <img src="${post.featured_image}" alt="${post.title}">
      <h2>${post.title}</h2>
      <p>${post.excerpt}</p>
      <a href="news/${post.slug}">Đọc tiếp →</a>
    </article>
  `).join('');
  
  document.getElementById('newsList').innerHTML = html;
}

loadNews();
</script>
```

---

## 💾 Backup & Restore

### Backup thủ công
```bash
npm run backup
```

### Restore từ backup
```bash
# Copy file backup
cp database/backups/htx-cms-2025-12-22.db database/htx-cms.db

# Restart server
npm start
```

### Auto Backup
Trong `.env`:
```env
AUTO_BACKUP=true
BACKUP_INTERVAL=daily
```

---

## 🐛 Xử lý sự cố

### Server không khởi động
```bash
# Kiểm tra port có bị chiếm không
lsof -i :3000

# Kill process đang dùng port
kill -9 <PID>

# Hoặc đổi port trong .env
PORT=3001
```

### Không đăng nhập được
```bash
# Reset database và tạo admin mới
npm run init-db
```

### File upload lỗi
```bash
# Kiểm tra quyền folder uploads
chmod 755 uploads/
```

---

## 📞 Cần trợ giúp?

📚 **Documentation đầy đủ**: Xem file `README.md`
📧 **Email**: support@htxdaingan.com
🌐 **Website**: https://htxdaingan.com

---

## ✅ Checklist sau khi cài đặt

- [ ] Đã chạy `npm install`
- [ ] Đã tạo file `.env` và cấu hình
- [ ] Đã thay đổi `JWT_SECRET`
- [ ] Đã chạy `npm run init-db`
- [ ] Đã đăng nhập được vào admin panel
- [ ] Đã đổi mật khẩu admin mặc định
- [ ] Đã test tạo/sửa/xóa nội dung
- [ ] Đã test upload media

---

**🎉 Chúc mừng! CMS của bạn đã sẵn sàng hoạt động!**
