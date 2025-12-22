const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'htx-cms.db');

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Lỗi kết nối database:', err.message);
  } else {
    console.log('✅ Đã kết nối database SQLite');
  }
});

// Initialize database tables
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table - Quản lý người dùng
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          full_name TEXT,
          role TEXT DEFAULT 'viewer' CHECK(role IN ('admin', 'editor', 'viewer')),
          avatar TEXT,
          is_active BOOLEAN DEFAULT 1,
          last_login DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Categories table - Chuyên mục
      db.run(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          parent_id INTEGER,
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE
        )
      `);

      // Pages table - Trang tĩnh (giới thiệu, liên hệ, v.v.)
      db.run(`
        CREATE TABLE IF NOT EXISTS pages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          content TEXT,
          excerpt TEXT,
          meta_title TEXT,
          meta_description TEXT,
          meta_keywords TEXT,
          featured_image TEXT,
          template TEXT DEFAULT 'default',
          is_published BOOLEAN DEFAULT 0,
          sort_order INTEGER DEFAULT 0,
          author_id INTEGER,
          published_at DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
        )
      `);

      // Posts table - Tin tức & Sự kiện
      db.run(`
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          content TEXT,
          excerpt TEXT,
          category_id INTEGER,
          featured_image TEXT,
          post_type TEXT DEFAULT 'news' CHECK(post_type IN ('news', 'event')),
          is_published BOOLEAN DEFAULT 0,
          is_featured BOOLEAN DEFAULT 0,
          view_count INTEGER DEFAULT 0,
          meta_title TEXT,
          meta_description TEXT,
          meta_keywords TEXT,
          author_id INTEGER,
          published_at DATETIME,
          event_date DATETIME,
          event_location TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
          FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
        )
      `);

      // Products table - Sản phẩm
      db.run(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          short_description TEXT,
          category_id INTEGER,
          featured_image TEXT,
          price DECIMAL(10,2),
          unit TEXT,
          weight TEXT,
          origin TEXT,
          is_published BOOLEAN DEFAULT 0,
          is_featured BOOLEAN DEFAULT 0,
          sort_order INTEGER DEFAULT 0,
          view_count INTEGER DEFAULT 0,
          meta_title TEXT,
          meta_description TEXT,
          meta_keywords TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        )
      `);

      // Services table - Dịch vụ
      db.run(`
        CREATE TABLE IF NOT EXISTS services (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          short_description TEXT,
          icon TEXT,
          featured_image TEXT,
          is_published BOOLEAN DEFAULT 0,
          sort_order INTEGER DEFAULT 0,
          meta_title TEXT,
          meta_description TEXT,
          meta_keywords TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Partners table - Đối tác
      db.run(`
        CREATE TABLE IF NOT EXISTS partners (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          logo TEXT,
          website TEXT,
          description TEXT,
          partner_type TEXT DEFAULT 'general' CHECK(partner_type IN ('general', 'strategic', 'supplier', 'distributor')),
          is_published BOOLEAN DEFAULT 0,
          sort_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Investment packages table - Các gói đầu tư
      db.run(`
        CREATE TABLE IF NOT EXISTS investment_packages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          amount DECIMAL(15,2),
          duration_months INTEGER,
          expected_return TEXT,
          features TEXT,
          is_published BOOLEAN DEFAULT 0,
          sort_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Media library table - Thư viện hình ảnh/video
      db.run(`
        CREATE TABLE IF NOT EXISTS media (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          filename TEXT NOT NULL,
          original_name TEXT NOT NULL,
          file_path TEXT NOT NULL,
          file_type TEXT NOT NULL,
          file_size INTEGER,
          mime_type TEXT,
          width INTEGER,
          height INTEGER,
          alt_text TEXT,
          caption TEXT,
          uploaded_by INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
        )
      `);

      // Product images table - Hình ảnh sản phẩm
      db.run(`
        CREATE TABLE IF NOT EXISTS product_images (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER NOT NULL,
          media_id INTEGER NOT NULL,
          is_primary BOOLEAN DEFAULT 0,
          sort_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
          FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE
        )
      `);

      // Settings table - Cấu hình website
      db.run(`
        CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT UNIQUE NOT NULL,
          value TEXT,
          type TEXT DEFAULT 'text',
          group_name TEXT,
          description TEXT,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Activity logs table - Lịch sử hoạt động
      db.run(`
        CREATE TABLE IF NOT EXISTS activity_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          action TEXT NOT NULL,
          entity_type TEXT,
          entity_id INTEGER,
          old_value TEXT,
          new_value TEXT,
          ip_address TEXT,
          user_agent TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        )
      `, (err) => {
        if (err) {
          console.error('❌ Lỗi khởi tạo database:', err.message);
          reject(err);
        } else {
          console.log('✅ Database đã được khởi tạo thành công!');
          resolve();
        }
      });
    });
  });
};

// Close database connection
const closeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error('❌ Lỗi đóng database:', err.message);
        reject(err);
      } else {
        console.log('✅ Đã đóng kết nối database');
        resolve();
      }
    });
  });
};

module.exports = {
  db,
  initDatabase,
  closeDatabase
};
