# 📚 HỆ THỐNG QUẢN TRỊ NỘI DUNG (CMS)
## HTX LÂM ĐỒNG ĐẠI NGÀN

---

## 🎯 TỔNG QUAN

Hệ thống CMS được xây dựng đầy đủ với các tính năng:

✅ **Quản lý nội dung đa dạng**: Trang tĩnh, Tin tức, Sự kiện, Sản phẩm, Dịch vụ, Đối tác, Gói đầu tư
✅ **Thư viện Media**: Upload và quản lý hình ảnh, video
✅ **Phân quyền người dùng**: Admin, Editor, Viewer với các quyền khác nhau
✅ **Giao diện responsive**: Hoạt động mượt mà trên Desktop, Tablet, Mobile
✅ **Bảo mật**: JWT authentication, password hashing với bcrypt
✅ **API RESTful**: Đầy đủ CRUD operations
✅ **Sao lưu tự động**: Backup database định kỳ
✅ **SEO-friendly**: Meta tags, slug tự động, structured data

---

## 📁 CẤU TRÚC THƯ MỤC

```
cms/
├── admin/                    # Giao diện quản trị
│   ├── index.html           # Dashboard
│   ├── login.html           # Trang đăng nhập
│   ├── pages.html           # Quản lý trang
│   ├── posts.html           # Quản lý tin tức
│   ├── products.html        # Quản lý sản phẩm
│   ├── services.html        # Quản lý dịch vụ
│   ├── partners.html        # Quản lý đối tác
│   ├── media.html           # Thư viện media
│   ├── css/
│   │   └── admin.css        # Styles cho admin
│   └── js/
│       ├── auth.js          # Authentication
│       └── app.js           # App logic
│
├── api/                      # API Routes
│   ├── auth.js              # Authentication API
│   ├── content.js           # Content management API
│   └── media.js             # Media upload API
│
├── database/                 # Database
│   ├── db.js                # Database connection
│   ├── init.js              # Database initialization
│   ├── backup.js            # Backup utilities
│   └── htx-cms.db           # SQLite database (auto-created)
│
├── middleware/               # Middleware
│   └── auth.js              # JWT authentication middleware
│
├── uploads/                  # Uploaded files
│   └── YYYY/MM/             # Organized by year/month
│
├── config/                   # Configuration files
├── .env.example             # Environment variables template
├── package.json             # Dependencies
└── server.js                # Main server file
```

---

## 🚀 CÀI ĐẶT & KHỞI ĐỘNG

### Bước 1: Cài đặt Dependencies

```bash
cd cms
npm install
```

### Bước 2: Cấu hình môi trường

```bash
# Copy file .env.example thành .env
cp .env.example .env

# Chỉnh sửa .env với thông tin của bạn
nano .env
```

**Các biến môi trường quan trọng:**
```env
PORT=3000
JWT_SECRET=your-super-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourStrongPassword123!
ADMIN_EMAIL=admin@htxdaingan.com
```

### Bước 3: Khởi tạo Database

```bash
npm run init-db
```

**Output:**
```
🚀 Bắt đầu khởi tạo database...
✅ Đã kết nối database SQLite
✅ Database đã được khởi tạo thành công!
✅ Đã tạo dữ liệu mặc định

📋 Thông tin đăng nhập mặc định:
   Username: admin
   Password: Admin@123456
   ⚠️  Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu!
```

### Bước 4: Khởi động Server

**Development mode (auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Server sẽ chạy tại:**
- 🌐 API: http://localhost:3000/api
- 🎛️ Admin Panel: http://localhost:3000/cms/admin
- 📡 Health Check: http://localhost:3000/api/health

---

## 🔐 XÁC THỰC & BẢO MẬT

### Đăng nhập

1. Truy cập: http://localhost:3000/cms/admin/login.html
2. Nhập username và password mặc định (xem output từ `npm run init-db`)
3. Click "Đăng nhập"

### Thay đổi mật khẩu

Sau khi đăng nhập lần đầu, vào **Settings** > **Change Password**

### Phân quyền người dùng

| Vai trò | Quyền hạn |
|---------|-----------|
| **Admin** | Toàn quyền: Tạo, sửa, xóa tất cả nội dung, quản lý users |
| **Editor** | Tạo và sửa nội dung, upload media |
| **Viewer** | Chỉ xem nội dung |

---

## 📖 SỬ DỤNG API

### Authentication

**Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin@123456"
}

Response:
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "role": "admin"
    }
  }
}
```

**Get current user:**
```bash
GET /api/auth/me
Authorization: Bearer <token>
```

### Content Management

**Lấy danh sách trang:**
```bash
GET /api/content/pages?page=1&limit=10

Response:
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

**Tạo trang mới:**
```bash
POST /api/content/pages
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Giới thiệu",
  "slug": "gioi-thieu",
  "content": "Nội dung trang...",
  "is_published": 1
}
```

**Cập nhật trang:**
```bash
PUT /api/content/pages/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Giới thiệu (Updated)",
  "content": "Nội dung mới..."
}
```

**Xóa trang:**
```bash
DELETE /api/content/pages/:id
Authorization: Bearer <token>
```

### Media Upload

**Upload single file:**
```bash
POST /api/media/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: (binary)
alt_text: "Mô tả ảnh"
caption: "Chú thích"

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "filename": "image-1234567890.jpg",
    "url": "/cms/uploads/2025/12/image-1234567890.jpg"
  }
}
```

**Upload multiple files:**
```bash
POST /api/media/upload-multiple
Authorization: Bearer <token>
Content-Type: multipart/form-data

files[]: (binary)
files[]: (binary)
```

---

## 📊 CÁC BẢNG DATABASE

### 1. **users** - Người dùng
- id, username, email, password, full_name
- role (admin/editor/viewer)
- is_active, last_login, created_at, updated_at

### 2. **pages** - Trang tĩnh
- id, title, slug, content, excerpt
- meta_title, meta_description, meta_keywords
- featured_image, is_published, author_id
- created_at, updated_at, published_at

### 3. **posts** - Tin tức & Sự kiện
- id, title, slug, content, excerpt
- category_id, featured_image
- post_type (news/event)
- is_published, is_featured, view_count
- event_date, event_location
- author_id, created_at, updated_at

### 4. **products** - Sản phẩm
- id, name, slug, description
- category_id, featured_image
- price, unit, weight, origin
- is_published, is_featured, sort_order
- created_at, updated_at

### 5. **services** - Dịch vụ
- id, name, slug, description
- icon, featured_image
- is_published, sort_order
- created_at, updated_at

### 6. **partners** - Đối tác
- id, name, slug, logo, website
- description, partner_type
- is_published, sort_order
- created_at, updated_at

### 7. **investment_packages** - Gói đầu tư
- id, name, slug, description
- amount, duration_months, expected_return
- features, is_published, sort_order
- created_at, updated_at

### 8. **media** - Thư viện Media
- id, filename, original_name, file_path
- file_type, file_size, mime_type
- alt_text, caption, uploaded_by
- created_at

### 9. **categories** - Danh mục
- id, name, slug, description
- parent_id, sort_order, is_active
- created_at, updated_at

### 10. **settings** - Cài đặt website
- id, key, value, type
- group_name, description
- updated_at

### 11. **activity_logs** - Lịch sử hoạt động
- id, user_id, action, entity_type
- entity_id, ip_address, user_agent
- created_at

---

## 🔧 TÍCH HỢP VỚI WEBSITE

### Bước 1: Thêm API client vào website

Tạo file `js/cms-client.js`:

```javascript
const CMS_API = 'http://localhost:3000/api';

const fetchContent = async (type, slug = null) => {
  const endpoint = slug 
    ? `${CMS_API}/content/${type}?slug=${slug}` 
    : `${CMS_API}/content/${type}?is_published=1`;
    
  const response = await fetch(endpoint);
  const data = await response.json();
  
  return data.data;
};

// Lấy danh sách tin tức
const getNews = () => fetchContent('posts');

// Lấy chi tiết tin tức
const getNewsDetail = (slug) => fetchContent('posts', slug);

// Lấy sản phẩm
const getProducts = () => fetchContent('products');

// Lấy dịch vụ
const getServices = () => fetchContent('services');
```

### Bước 2: Render động content

```html
<div id="newsList"></div>

<script>
async function loadNews() {
  const news = await getNews();
  const html = news.map(item => `
    <div class="news-item">
      <img src="${item.featured_image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.excerpt}</p>
      <a href="news-detail.html?slug=${item.slug}">Đọc tiếp →</a>
    </div>
  `).join('');
  
  document.getElementById('newsList').innerHTML = html;
}

loadNews();
</script>
```

---

## 💾 SAO LƯU & PHỤC HỒI

### Sao lưu thủ công

```bash
npm run backup
```

File backup sẽ được lưu tại: `cms/database/backups/htx-cms-YYYYMMDD-HHMMSS.db`

### Phục hồi từ backup

```bash
cp database/backups/htx-cms-20251222-143000.db database/htx-cms.db
```

### Sao lưu tự động

Trong file `.env`, bật auto backup:
```env
AUTO_BACKUP=true
BACKUP_INTERVAL=daily
```

---

## 🛡️ BẢO MẬT

### Khuyến nghị bảo mật

1. **Thay đổi JWT_SECRET** trong `.env`
2. **Sử dụng HTTPS** trong production
3. **Đổi mật khẩu admin** ngay sau khi cài đặt
4. **Giới hạn file upload** (đã config trong .env)
5. **Cập nhật dependencies** thường xuyên
6. **Sao lưu database** định kỳ

### Cấu hình CORS

Trong `server.js`, giới hạn CORS:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

---

## 📱 RESPONSIVE DESIGN

Admin panel tự động responsive cho:
- 📱 Mobile (≤768px)
- 📱 Tablet (769px-1024px)
- 💻 Desktop (>1024px)

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi: "Cannot connect to database"
**Giải pháp:** Chạy `npm run init-db` để khởi tạo database

### Lỗi: "Token không hợp lệ"
**Giải pháp:** Đăng xuất và đăng nhập lại

### Lỗi: "File upload failed"
**Giải pháp:** Kiểm tra quyền ghi folder `uploads/`

### Lỗi: "Port already in use"
**Giải pháp:** Thay đổi PORT trong `.env`

---

## 📞 HỖ TRỢ & LIÊN HỆ

- 📧 Email: support@htxdaingan.com
- 🌐 Website: https://htxdaingan.com
- 📚 Documentation: /docs

---

## 📝 CHANGELOG

### Version 1.0.0 (22/12/2025)
- ✅ Khởi tạo hệ thống CMS
- ✅ Authentication & Authorization
- ✅ CRUD cho tất cả content types
- ✅ Media library với upload
- ✅ Admin dashboard responsive
- ✅ API RESTful hoàn chỉnh
- ✅ Database backup system

---

## 📄 LICENSE

Copyright © 2025 HTX Lâm Đồng Đại Ngàn. All rights reserved.

---

**🎉 Chúc bạn sử dụng CMS hiệu quả!**
