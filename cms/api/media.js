const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { db } = require('../database/db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Cấu hình multer để upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = process.env.UPLOAD_PATH || './uploads';
    
    // Tạo folder theo tháng: uploads/2025/12/
    const date = new Date();
    const monthPath = path.join(uploadPath, date.getFullYear().toString(), (date.getMonth() + 1).toString().padStart(2, '0'));
    
    // Tạo folder nếu chưa tồn tại
    fs.mkdirSync(monthPath, { recursive: true });
    
    cb(null, monthPath);
  },
  filename: (req, file, cb) => {
    // Tạo tên file unique: timestamp-random-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    const slug = createSlug(nameWithoutExt);
    
    cb(null, `${slug}-${uniqueSuffix}${ext}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = (process.env.ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/gif,image/webp').split(',');
  const allowedVideoTypes = (process.env.ALLOWED_VIDEO_TYPES || 'video/mp4,video/webm').split(',');
  const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Loại file không được hỗ trợ. Chỉ chấp nhận: ' + allowedTypes.join(', ')), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB default
  },
  fileFilter: fileFilter
});

// Helper function tạo slug
const createSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// POST /api/media/upload - Upload file
router.post('/upload', authenticateToken, authorizeRoles('admin', 'editor'), upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Không có file được upload' 
      });
    }

    const file = req.file;
    const { alt_text, caption } = req.body;

    // Lấy thông tin file
    const mediaData = {
      filename: file.filename,
      original_name: file.originalname,
      file_path: file.path.replace(/\\/g, '/'), // Normalize path
      file_type: file.mimetype.split('/')[0], // image, video
      file_size: file.size,
      mime_type: file.mimetype,
      alt_text: alt_text || '',
      caption: caption || '',
      uploaded_by: req.user.id
    };

    // Lưu vào database
    db.run(`
      INSERT INTO media (filename, original_name, file_path, file_type, file_size, mime_type, alt_text, caption, uploaded_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      mediaData.filename,
      mediaData.original_name,
      mediaData.file_path,
      mediaData.file_type,
      mediaData.file_size,
      mediaData.mime_type,
      mediaData.alt_text,
      mediaData.caption,
      mediaData.uploaded_by
    ], function(err) {
      if (err) {
        console.error(err);
        // Xóa file nếu lưu DB thất bại
        fs.unlinkSync(file.path);
        return res.status(500).json({ 
          success: false, 
          message: 'Lỗi khi lưu thông tin file' 
        });
      }

      res.status(201).json({
        success: true,
        message: 'Upload thành công',
        data: {
          id: this.lastID,
          ...mediaData,
          url: `/cms/uploads/${file.filename}` // Public URL
        }
      });
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi upload file: ' + error.message 
    });
  }
});

// POST /api/media/upload-multiple - Upload nhiều file
router.post('/upload-multiple', authenticateToken, authorizeRoles('admin', 'editor'), upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Không có file được upload' 
      });
    }

    const uploadedFiles = [];
    let completed = 0;

    req.files.forEach((file) => {
      const mediaData = {
        filename: file.filename,
        original_name: file.originalname,
        file_path: file.path.replace(/\\/g, '/'),
        file_type: file.mimetype.split('/')[0],
        file_size: file.size,
        mime_type: file.mimetype,
        uploaded_by: req.user.id
      };

      db.run(`
        INSERT INTO media (filename, original_name, file_path, file_type, file_size, mime_type, uploaded_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        mediaData.filename,
        mediaData.original_name,
        mediaData.file_path,
        mediaData.file_type,
        mediaData.file_size,
        mediaData.mime_type,
        mediaData.uploaded_by
      ], function(err) {
        completed++;

        if (!err) {
          uploadedFiles.push({
            id: this.lastID,
            ...mediaData,
            url: `/cms/uploads/${file.filename}`
          });
        }

        if (completed === req.files.length) {
          res.status(201).json({
            success: true,
            message: `Upload thành công ${uploadedFiles.length}/${req.files.length} file`,
            data: uploadedFiles
          });
        }
      });
    });
  } catch (error) {
    console.error('Multi-upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi upload file' 
    });
  }
});

// GET /api/media - Lấy danh sách media
router.get('/', authenticateToken, (req, res) => {
  const { page = 1, limit = 20, file_type } = req.query;
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM media WHERE 1=1';
  let countQuery = 'SELECT COUNT(*) as total FROM media WHERE 1=1';
  const params = [];
  const countParams = [];

  if (file_type) {
    query += ' AND file_type = ?';
    countQuery += ' AND file_type = ?';
    params.push(file_type);
    countParams.push(file_type);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.get(countQuery, countParams, (err, countResult) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Lỗi khi đếm media' 
      });
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Lỗi khi lấy danh sách media' 
        });
      }

      res.json({
        success: true,
        data: rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult.total,
          totalPages: Math.ceil(countResult.total / limit)
        }
      });
    });
  });
});

// DELETE /api/media/:id - Xóa media
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'editor'), (req, res) => {
  const { id } = req.params;

  // Lấy thông tin file để xóa
  db.get('SELECT * FROM media WHERE id = ?', [id], (err, media) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Lỗi khi tìm media' 
      });
    }

    if (!media) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy media' 
      });
    }

    // Xóa file vật lý
    if (fs.existsSync(media.file_path)) {
      fs.unlinkSync(media.file_path);
    }

    // Xóa record trong database
    db.run('DELETE FROM media WHERE id = ?', [id], (err) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Lỗi khi xóa media' 
        });
      }

      res.json({
        success: true,
        message: 'Xóa media thành công'
      });
    });
  });
});

module.exports = router;
