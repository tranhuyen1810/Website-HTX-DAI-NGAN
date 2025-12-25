require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');

// Import routes
const authRoutes = require('./api/auth');
const contentRoutes = require('./api/content');
const mediaRoutes = require('./api/media');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(compression()); // Compress responses
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded

// Serve static files
app.use('/cms/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/cms/admin', express.static(path.join(__dirname, 'admin')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'HTX CMS API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Root redirect to admin panel
app.get('/', (req, res) => {
  res.redirect('/cms/admin');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint không tồn tại'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Lỗi server',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║   🚀 HTX LÂM ĐỒNG ĐẠI NGÀN - CMS SERVER         ║
╠═══════════════════════════════════════════════════╣
║   📡 Server đang chạy tại: http://localhost:${PORT}   ║
║   🎛️  Admin Panel: http://localhost:${PORT}/cms/admin ║
║   📚 API Docs: http://localhost:${PORT}/api/health     ║
╚═══════════════════════════════════════════════════╝
  `);
  
  console.log('\n✅ Server khởi động thành công!');
  console.log('⏰ Thời gian:', new Date().toLocaleString('vi-VN'));
  console.log('🌍 Môi trường:', process.env.NODE_ENV || 'development');
  console.log('\n📝 Nhấn Ctrl+C để dừng server\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n👋 SIGINT signal received: closing HTTP server');
  process.exit(0);
});

module.exports = app;
