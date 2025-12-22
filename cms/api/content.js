const express = require('express');
const { db } = require('../database/db');
const { authenticateToken, authorizeRoles, logActivity } = require('../middleware/auth');
const router = express.Router();

// Helper function để tạo slug
const createSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// GET /api/content/:type - Lấy danh sách nội dung
router.get('/:type', (req, res) => {
  const { type } = req.params;
  const { page = 1, limit = 10, search = '', category_id, is_published } = req.query;
  
  const offset = (page - 1) * limit;
  const allowedTables = ['pages', 'posts', 'products', 'services', 'partners', 'investment_packages'];
  
  if (!allowedTables.includes(type)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Loại nội dung không hợp lệ' 
    });
  }

  let query = `SELECT * FROM ${type} WHERE 1=1`;
  let countQuery = `SELECT COUNT(*) as total FROM ${type} WHERE 1=1`;
  const params = [];
  const countParams = [];

  if (search) {
    query += ` AND (title LIKE ? OR name LIKE ? OR content LIKE ? OR description LIKE ?)`;
    countQuery += ` AND (title LIKE ? OR name LIKE ? OR content LIKE ? OR description LIKE ?)`;
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam, searchParam, searchParam);
    countParams.push(searchParam, searchParam, searchParam, searchParam);
  }

  if (category_id) {
    query += ` AND category_id = ?`;
    countQuery += ` AND category_id = ?`;
    params.push(category_id);
    countParams.push(category_id);
  }

  if (is_published !== undefined) {
    query += ` AND is_published = ?`;
    countQuery += ` AND is_published = ?`;
    params.push(is_published);
    countParams.push(is_published);
  }

  query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  params.push(parseInt(limit), parseInt(offset));

  // Lấy tổng số records
  db.get(countQuery, countParams, (err, countResult) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Lỗi khi đếm số lượng' 
      });
    }

    // Lấy danh sách records
    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Lỗi khi lấy danh sách' 
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

// GET /api/content/:type/:id - Lấy chi tiết một nội dung
router.get('/:type/:id', (req, res) => {
  const { type, id } = req.params;
  const allowedTables = ['pages', 'posts', 'products', 'services', 'partners', 'investment_packages'];
  
  if (!allowedTables.includes(type)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Loại nội dung không hợp lệ' 
    });
  }

  db.get(`SELECT * FROM ${type} WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Lỗi khi lấy chi tiết' 
      });
    }

    if (!row) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy nội dung' 
      });
    }

    res.json({
      success: true,
      data: row
    });
  });
});

// POST /api/content/:type - Tạo nội dung mới
router.post('/:type', authenticateToken, authorizeRoles('admin', 'editor'), logActivity('create'), (req, res) => {
  const { type } = req.params;
  const allowedTables = ['pages', 'posts', 'products', 'services', 'partners', 'investment_packages'];
  
  if (!allowedTables.includes(type)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Loại nội dung không hợp lệ' 
    });
  }

  const data = req.body;
  
  // Tạo slug tự động nếu không có
  if (!data.slug && (data.title || data.name)) {
    data.slug = createSlug(data.title || data.name);
  }

  // Thêm author_id nếu có field
  if (type === 'pages' || type === 'posts') {
    data.author_id = req.user.id;
  }

  const fields = Object.keys(data);
  const values = Object.values(data);
  const placeholders = fields.map(() => '?').join(', ');
  
  const query = `INSERT INTO ${type} (${fields.join(', ')}) VALUES (${placeholders})`;

  db.run(query, values, function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ 
        success: false, 
        message: 'Lỗi khi tạo nội dung: ' + err.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Tạo nội dung thành công',
      data: { id: this.lastID, ...data }
    });
  });
});

// PUT /api/content/:type/:id - Cập nhật nội dung
router.put('/:type/:id', authenticateToken, authorizeRoles('admin', 'editor'), logActivity('update'), (req, res) => {
  const { type, id } = req.params;
  const allowedTables = ['pages', 'posts', 'products', 'services', 'partners', 'investment_packages'];
  
  if (!allowedTables.includes(type)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Loại nội dung không hợp lệ' 
    });
  }

  const data = req.body;
  data.updated_at = new Date().toISOString();

  const fields = Object.keys(data);
  const values = Object.values(data);
  const setClause = fields.map(field => `${field} = ?`).join(', ');
  
  const query = `UPDATE ${type} SET ${setClause} WHERE id = ?`;
  values.push(id);

  db.run(query, values, function(err) {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Lỗi khi cập nhật: ' + err.message
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy nội dung' 
      });
    }

    res.json({
      success: true,
      message: 'Cập nhật thành công',
      data: { id, ...data }
    });
  });
});

// DELETE /api/content/:type/:id - Xóa nội dung
router.delete('/:type/:id', authenticateToken, authorizeRoles('admin'), logActivity('delete'), (req, res) => {
  const { type, id } = req.params;
  const allowedTables = ['pages', 'posts', 'products', 'services', 'partners', 'investment_packages'];
  
  if (!allowedTables.includes(type)) {
    return res.status(400).json({ 
      success: false, 
        message: 'Loại nội dung không hợp lệ' 
    });
  }

  db.run(`DELETE FROM ${type} WHERE id = ?`, [id], function(err) {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Lỗi khi xóa' 
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy nội dung' 
      });
    }

    res.json({
      success: true,
      message: 'Xóa thành công'
    });
  });
});

module.exports = router;
