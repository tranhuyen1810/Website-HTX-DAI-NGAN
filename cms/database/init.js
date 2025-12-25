require('dotenv').config();
const bcrypt = require('bcrypt');
const { db, initDatabase, closeDatabase } = require('./db');

const createDefaultData = async () => {
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123456', salt);

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Tạo admin user mặc định
      db.run(`
        INSERT OR IGNORE INTO users (username, email, password, full_name, role, is_active)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        process.env.ADMIN_USERNAME || 'admin',
        process.env.ADMIN_EMAIL || 'admin@htxdaingan.com',
        hashedPassword,
        'Quản trị viên',
        'admin',
        1
      ]);

      // Tạo các danh mục mặc định
      const categories = [
        { name: 'Tin tức', slug: 'tin-tuc', description: 'Tin tức về HTX' },
        { name: 'Sự kiện', slug: 'su-kien', description: 'Các sự kiện của HTX' },
        { name: 'Rau củ quả', slug: 'rau-cu-qua', description: 'Sản phẩm rau củ quả' },
        { name: 'Nông sản chế biến', slug: 'nong-san-che-bien', description: 'Nông sản đã qua chế biến' }
      ];

      categories.forEach(cat => {
        db.run(`
          INSERT OR IGNORE INTO categories (name, slug, description, is_active)
          VALUES (?, ?, ?, ?)
        `, [cat.name, cat.slug, cat.description, 1]);
      });

      // Tạo các trang mặc định
      const pages = [
        {
          title: 'Giới thiệu',
          slug: 'gioi-thieu',
          content: 'Nội dung trang giới thiệu',
          is_published: 1
        },
        {
          title: 'Liên hệ',
          slug: 'lien-he',
          content: 'Nội dung trang liên hệ',
          is_published: 1
        }
      ];

      pages.forEach(page => {
        db.run(`
          INSERT OR IGNORE INTO pages (title, slug, content, is_published, author_id)
          VALUES (?, ?, ?, ?, 1)
        `, [page.title, page.slug, page.content, page.is_published]);
      });

      // Tạo dịch vụ mặc định
      const services = [
        { name: 'Sấy thăng hoa', slug: 'say-thang-hoa', description: 'Dịch vụ sấy thăng hoa chuyên nghiệp' },
        { name: 'Sấy nóng/lạnh', slug: 'say-nong-lanh', description: 'Dịch vụ sấy nóng và lạnh' },
        { name: 'Cấp/Trữ đông', slug: 'cap-tru-dong', description: 'Dịch vụ cấp đông và trữ đông' }
      ];

      services.forEach(service => {
        db.run(`
          INSERT OR IGNORE INTO services (name, slug, description, is_published, sort_order)
          VALUES (?, ?, ?, 1, 0)
        `, [service.name, service.slug, service.description]);
      });

      // Tạo cài đặt website mặc định
      const settings = [
        { key: 'site_name', value: 'HTX Lâm Đồng Đại Ngàn', type: 'text', group_name: 'general' },
        { key: 'site_description', value: 'Hợp tác xã Nông nghiệp', type: 'text', group_name: 'general' },
        { key: 'contact_email', value: 'info@htxdaingan.com', type: 'email', group_name: 'contact' },
        { key: 'contact_phone', value: '0123456789', type: 'text', group_name: 'contact' },
        { key: 'contact_address', value: 'Lâm Đồng, Việt Nam', type: 'text', group_name: 'contact' }
      ];

      settings.forEach(setting => {
        db.run(`
          INSERT OR IGNORE INTO settings (key, value, type, group_name)
          VALUES (?, ?, ?, ?)
        `, [setting.key, setting.value, setting.type, setting.group_name]);
      });

      console.log('✅ Đã tạo dữ liệu mặc định');
      resolve();
    });
  });
};

// Main initialization function
const init = async () => {
  try {
    console.log('🚀 Bắt đầu khởi tạo database...');
    
    await initDatabase();
    await createDefaultData();
    
    console.log('\n✅ HOÀN TẤT KHỞI TẠO DATABASE!');
    console.log('\n📋 Thông tin đăng nhập mặc định:');
    console.log(`   Username: ${process.env.ADMIN_USERNAME || 'admin'}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin@123456'}`);
    console.log('   ⚠️  Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu!\n');
    
    await closeDatabase();
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khởi tạo:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  init();
}

module.exports = { init, createDefaultData };
