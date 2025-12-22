const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'htx-cms.db');
const BACKUP_PATH = process.env.BACKUP_PATH || path.join(__dirname, 'backups');

// Tạo folder backup nếu chưa tồn tại
if (!fs.existsSync(BACKUP_PATH)) {
  fs.mkdirSync(BACKUP_PATH, { recursive: true });
}

// Backup database
const backupDatabase = () => {
  return new Promise((resolve, reject) => {
    try {
      // Tạo tên file backup với timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const backupFile = path.join(BACKUP_PATH, `htx-cms-${timestamp}.db`);

      // Copy database file
      fs.copyFileSync(DB_PATH, backupFile);

      console.log(`✅ Backup thành công: ${backupFile}`);
      
      // Xóa các file backup cũ hơn 30 ngày
      cleanOldBackups();
      
      resolve(backupFile);
    } catch (error) {
      console.error('❌ Lỗi khi backup:', error.message);
      reject(error);
    }
  });
};

// Xóa backup cũ
const cleanOldBackups = () => {
  try {
    const files = fs.readdirSync(BACKUP_PATH);
    const now = Date.now();
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 ngày

    files.forEach(file => {
      const filePath = path.join(BACKUP_PATH, file);
      const stats = fs.statSync(filePath);
      
      if (now - stats.mtimeMs > maxAge) {
        fs.unlinkSync(filePath);
        console.log(`🗑️  Đã xóa backup cũ: ${file}`);
      }
    });
  } catch (error) {
    console.error('❌ Lỗi khi xóa backup cũ:', error.message);
  }
};

// Liệt kê các file backup
const listBackups = () => {
  try {
    const files = fs.readdirSync(BACKUP_PATH);
    const backups = files
      .filter(file => file.endsWith('.db'))
      .map(file => {
        const filePath = path.join(BACKUP_PATH, file);
        const stats = fs.statSync(filePath);
        return {
          filename: file,
          path: filePath,
          size: stats.size,
          created: stats.mtime
        };
      })
      .sort((a, b) => b.created - a.created);

    return backups;
  } catch (error) {
    console.error('❌ Lỗi khi liệt kê backup:', error.message);
    return [];
  }
};

// Restore từ backup
const restoreDatabase = (backupFilename) => {
  return new Promise((resolve, reject) => {
    try {
      const backupFile = path.join(BACKUP_PATH, backupFilename);
      
      if (!fs.existsSync(backupFile)) {
        throw new Error('File backup không tồn tại');
      }

      // Backup database hiện tại trước khi restore
      const currentBackup = `htx-cms-before-restore-${Date.now()}.db`;
      fs.copyFileSync(DB_PATH, path.join(BACKUP_PATH, currentBackup));

      // Restore từ backup
      fs.copyFileSync(backupFile, DB_PATH);

      console.log(`✅ Restore thành công từ: ${backupFilename}`);
      resolve();
    } catch (error) {
      console.error('❌ Lỗi khi restore:', error.message);
      reject(error);
    }
  });
};

// Schedule auto backup
const scheduleAutoBackup = () => {
  const interval = process.env.BACKUP_INTERVAL || 'daily';
  
  let intervalMs;
  switch (interval) {
    case 'hourly':
      intervalMs = 60 * 60 * 1000; // 1 giờ
      break;
    case 'daily':
      intervalMs = 24 * 60 * 60 * 1000; // 1 ngày
      break;
    case 'weekly':
      intervalMs = 7 * 24 * 60 * 60 * 1000; // 1 tuần
      break;
    default:
      intervalMs = 24 * 60 * 60 * 1000; // Mặc định: 1 ngày
  }

  // Backup ngay lập tức
  backupDatabase();

  // Schedule backup định kỳ
  setInterval(() => {
    backupDatabase();
  }, intervalMs);

  console.log(`⏰ Auto backup được thiết lập: ${interval} (${intervalMs}ms)`);
};

// Run if called directly
if (require.main === module) {
  console.log('🚀 Bắt đầu backup database...\n');
  backupDatabase()
    .then((file) => {
      console.log(`\n✅ Backup hoàn tất: ${file}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`\n❌ Backup thất bại: ${error.message}`);
      process.exit(1);
    });
}

module.exports = {
  backupDatabase,
  cleanOldBackups,
  listBackups,
  restoreDatabase,
  scheduleAutoBackup
};
