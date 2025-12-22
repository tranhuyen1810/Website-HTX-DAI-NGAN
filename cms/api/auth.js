const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// POST /api/auth/login - Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng nhập username và password' 
      });
    }

    // Tìm user trong database
    db.get(
      'SELECT * FROM users WHERE username = ? AND is_active = 1',
      [username],
      async (err, user) => {
        if (err) {
          return res.status(500).json({ 
            success: false, 
            message: 'Lỗi server' 
          });
        }

        if (!user) {
          return res.status(401).json({ 
            success: false, 
            message: 'Tên đăng nhập hoặc mật khẩu không đúng' 
          });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
          return res.status(401).json({ 
            success: false, 
            message: 'Tên đăng nhập hoặc mật khẩu không đúng' 
          });
        }

        // Cập nhật thời gian đăng nhập cuối
        db.run(
          'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
          [user.id]
        );

        // Tạo JWT token
        const token = jwt.sign(
          { 
            id: user.id, 
            username: user.username, 
            role: user.role 
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        // Trả về thông tin user (không bao gồm password)
        const { password: _, ...userWithoutPassword } = user;

        res.json({
          success: true,
          message: 'Đăng nhập thành công',
          data: {
            token,
            user: userWithoutPassword
          }
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server' 
    });
  }
});

// GET /api/auth/me - Lấy thông tin user hiện tại
router.get('/me', authenticateToken, (req, res) => {
  db.get(
    'SELECT id, username, email, full_name, role, avatar, last_login, created_at FROM users WHERE id = ?',
    [req.user.id],
    (err, user) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Lỗi server' 
        });
      }

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'Không tìm thấy user' 
        });
      }

      res.json({
        success: true,
        data: user
      });
    }
  );
});

// POST /api/auth/change-password - Đổi mật khẩu
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng nhập mật khẩu cũ và mật khẩu mới' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mật khẩu mới phải có ít nhất 6 ký tự' 
      });
    }

    // Lấy thông tin user
    db.get(
      'SELECT password FROM users WHERE id = ?',
      [req.user.id],
      async (err, user) => {
        if (err || !user) {
          return res.status(500).json({ 
            success: false, 
            message: 'Lỗi server' 
          });
        }

        // Kiểm tra mật khẩu cũ
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        
        if (!isPasswordValid) {
          return res.status(401).json({ 
            success: false, 
            message: 'Mật khẩu cũ không đúng' 
          });
        }

        // Hash mật khẩu mới
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu
        db.run(
          'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [hashedPassword, req.user.id],
          (err) => {
            if (err) {
              return res.status(500).json({ 
                success: false, 
                message: 'Lỗi khi cập nhật mật khẩu' 
              });
            }

            res.json({
              success: true,
              message: 'Đổi mật khẩu thành công'
            });
          }
        );
      }
    );
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi server' 
    });
  }
});

// POST /api/auth/logout - Đăng xuất (client-side xóa token)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Đăng xuất thành công'
  });
});

module.exports = router;
