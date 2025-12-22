// Authentication & API Helper Functions
const API_BASE_URL = window.location.origin;

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('cms_token');
};

// Set token to localStorage
const setToken = (token) => {
  localStorage.setItem('cms_token', token);
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('cms_token');
  localStorage.removeItem('cms_user');
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!getToken();
};

// Redirect to login if not authenticated
const requireAuth = () => {
  if (!isAuthenticated()) {
    window.location.href = '/cms/admin/login.html';
    return false;
  }
  return true;
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        removeToken();
        window.location.href = '/cms/admin/login.html';
      }
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Login Form Handler
if (document.getElementById('loginForm')) {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Show loading
    const btnText = loginForm.querySelector('.btn-text');
    const btnLoader = loginForm.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    errorMessage.style.display = 'none';

    try {
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      if (data.success) {
        // Save token
        setToken(data.data.token);
        localStorage.setItem('cms_user', JSON.stringify(data.data.user));

        // Redirect to dashboard
        window.location.href = '/cms/admin/index.html';
      }
    } catch (error) {
      errorMessage.textContent = error.message || 'Đăng nhập thất bại';
      errorMessage.style.display = 'block';
      btnText.style.display = 'inline';
      btnLoader.style.display = 'none';
    }
  });
}

// Logout function
const logout = () => {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    removeToken();
    window.location.href = '/cms/admin/login.html';
  }
};

// Get current user info
const getCurrentUser = () => {
  const userStr = localStorage.getItem('cms_user');
  return userStr ? JSON.parse(userStr) : null;
};

// Export functions
window.CMS = {
  getToken,
  setToken,
  removeToken,
  isAuthenticated,
  requireAuth,
  apiRequest,
  logout,
  getCurrentUser
};
