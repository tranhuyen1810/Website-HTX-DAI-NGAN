# 🌱 Website Hợp tác xã - Sản phẩm Nông nghiệp Sạch

Website hoàn chỉnh cho Hợp tác xã theo đặc tả yêu cầu chi tiết.

## 📋 Cấu trúc dự án

```
Website-HTX-/
├── index.html                 # Trang chủ
├── css/
│   └── styles.css            # CSS toàn bộ website (responsive)
├── js/
│   └── main.js               # JavaScript chính
├── pages/
│   ├── gioi-thieu.html       # Giới thiệu
│   ├── thanh-vien.html       # Thành viên
│   ├── ho-so-nang-luc.html  # Hồ sơ năng lực
│   ├── san-pham.html         # Sản phẩm
│   ├── lien-he.html          # Liên hệ
│   └── san-pham/
│       ├── box-rau.html
│       ├── thuc-don-tuan.html
│       └── thanh-phan.html
└── README.md
```

## ✨ Tính năng chính

- ✅ Responsive design (mobile-first)
- ✅ Menu điều hướng (hamburger trên mobile)
- ✅ Breadcrumb trên tất cả trang con
- ✅ Form liên hệ (chống spam honeypot)
- ✅ Lazy load images
- ✅ Search & filter sản phẩm
- ✅ Accordion FAQ
- ✅ Smooth scroll

## 🚀 Sử dụng

Mở file `index.html` trực tiếp hoặc dùng server cục bộ:
```bash
python3 -m http.server 8000
```

## 📄 Các trang

1. **Trang chủ** - Hero, giới thiệu nhanh, sản phẩm nổi bật
2. **Giới thiệu** - Thông tin, năng lực, đối tác
3. **Thành viên** - Danh sách 12 thành viên với tìm kiếm
4. **Hồ sơ Năng lực** - Chi tiết năng lực, tiêu chuẩn, tải PDF
5. **Sản phẩm** - Box rau, thực đơn, danh mục (50+ loại)
6. **Liên hệ** - Form liên hệ, info, FAQ, bản đồ

## 🎨 Tùy chỉnh

- Logo: `index.html` → `<div class="logo">`
- Màu: `css/styles.css` → `#2c7a3f` (xanh)
- Info: Footer & `pages/lien-he.html`
- Ảnh: Thay placeholder URL

## 🔧 Công nghệ

- HTML5 semantic
- CSS3 responsive grid
- Vanilla JavaScript (no frameworks)

---

**Phiên bản**: 1.0 | Tạo: 17/12/2024