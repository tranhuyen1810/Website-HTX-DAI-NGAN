const jwt = require('jsonwebtoken');

// Middleware xác thực JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Không tìm thấy token xác thực' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Token không hợp lệ hoặc đã hết hạn' 
      });
    }

    req.user = user;
    next();
  });
};

// Middleware kiểm tra quyền theo role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Chưa xác thực' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Bạn không có quyền truy cập chức năng này' 
      });
    }

    next();
  };
};

// Middleware ghi log hoạt động
const logActivity = (action, entityType = null) => {
  return (req, res, next) => {
    const { db } = require('../database/db');
    
    const originalJson = res.json;
    res.json = function(data) {
      // Ghi log sau khi response thành công
      if (data.success && req.user) {
        const log = {
          user_id: req.user.id,
          action: action,
          entity_type: entityType,
          entity_id: data.data?.id || null,
          ip_address: req.ip,
          user_agent: req.get('user-agent')
        };

        db.run(`
          INSERT INTO activity_logs (user_id, action, entity_type, entity_id, ip_address, user_agent)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [log.user_id, log.action, log.entity_type, log.entity_id, log.ip_address, log.user_agent]);
      }

      originalJson.call(this, data);
    };

    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  logActivity
};
