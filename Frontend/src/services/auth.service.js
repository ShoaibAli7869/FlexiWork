// Authentication Service
// This service handles all authentication-related API calls
// Currently using mock responses - replace with real API calls when backend is ready

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Simulated delay to mimic network requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, user?: object, token?: string, error?: string}>}
 */
export const login = async (email, password) => {
  await delay(800);

  // Mock response - replace with actual API call
  // return fetch(`${API_BASE_URL}/auth/login`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password }),
  // }).then(res => res.json());

  // Demo users for testing
  const demoUsers = [
    {
      id: '1',
      email: 'freelancer@demo.com',
      password: 'demo123',
      name: 'John Freelancer',
      role: 'freelancer',
    },
    {
      id: '2',
      email: 'client@demo.com',
      password: 'demo123',
      name: 'Jane Client',
      role: 'client',
    },
  ];

  const user = demoUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    const { password: _, ...userData } = user;
    return {
      success: true,
      user: userData,
      token: `mock-jwt-token-${Date.now()}`,
    };
  }

  return {
    success: false,
    error: 'Invalid email or password',
  };
};

/**
 * Register a new user
 * @param {object} userData - User registration data
 * @returns {Promise<{success: boolean, user?: object, token?: string, error?: string}>}
 */
export const register = async (userData) => {
  await delay(1000);

  // Mock response - replace with actual API call
  // return fetch(`${API_BASE_URL}/auth/register`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(userData),
  // }).then(res => res.json());

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    return {
      success: false,
      error: 'Invalid email format',
    };
  }

  // Validate password length
  if (userData.password.length < 6) {
    return {
      success: false,
      error: 'Password must be at least 6 characters',
    };
  }

  // Mock successful registration
  const newUser = {
    id: `user-${Date.now()}`,
    email: userData.email,
    name: userData.name,
    role: userData.role || 'freelancer',
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    user: newUser,
    token: `mock-jwt-token-${Date.now()}`,
  };
};

/**
 * Request password reset email
 * @param {string} email - User email
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export const forgotPassword = async (email) => {
  await delay(1000);

  // Mock response - replace with actual API call
  // return fetch(`${API_BASE_URL}/auth/forgot-password`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email }),
  // }).then(res => res.json());

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: 'Invalid email format',
    };
  }

  return {
    success: true,
    message: 'Password reset email sent successfully',
  };
};

/**
 * Reset password with token
 * @param {string} token - Reset token from email
 * @param {string} newPassword - New password
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export const resetPassword = async (token, newPassword) => {
  await delay(1000);

  // Mock response - replace with actual API call
  // return fetch(`${API_BASE_URL}/auth/reset-password`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ token, newPassword }),
  // }).then(res => res.json());

  if (!token) {
    return {
      success: false,
      error: 'Invalid or expired reset token',
    };
  }

  if (newPassword.length < 8) {
    return {
      success: false,
      error: 'Password must be at least 8 characters',
    };
  }

  return {
    success: true,
    message: 'Password reset successfully',
  };
};

/**
 * Verify email with token
 * @param {string} token - Verification token from email
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export const verifyEmail = async (token) => {
  await delay(1500);

  // Mock response - replace with actual API call
  // return fetch(`${API_BASE_URL}/auth/verify-email`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ token }),
  // }).then(res => res.json());

  if (!token) {
    return {
      success: false,
      error: 'Invalid verification token',
    };
  }

  if (token === 'expired') {
    return {
      success: false,
      error: 'Verification link has expired',
    };
  }

  if (token === 'invalid') {
    return {
      success: false,
      error: 'Invalid verification link',
    };
  }

  return {
    success: true,
    message: 'Email verified successfully',
  };
};

/**
 * Resend verification email
 * @param {string} email - User email
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export const resendVerificationEmail = async (email) => {
  await delay(1000);

  // Mock response - replace with actual API call
  // return fetch(`${API_BASE_URL}/auth/resend-verification`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email }),
  // }).then(res => res.json());

  return {
    success: true,
    message: 'Verification email sent successfully',
  };
};

/**
 * Logout user
 * @returns {Promise<{success: boolean}>}
 */
export const logout = async () => {
  await delay(300);

  // Mock response - replace with actual API call
  // return fetch(`${API_BASE_URL}/auth/logout`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${getToken()}`,
  //   },
  // }).then(res => res.json());

  // Clear local storage
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');

  return { success: true };
};

/**
 * Get current user from token
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export const getCurrentUser = async () => {
  await delay(500);

  // Mock response - replace with actual API call
  // return fetch(`${API_BASE_URL}/auth/me`, {
  //   headers: {
  //     'Authorization': `Bearer ${getToken()}`,
  //   },
  // }).then(res => res.json());

  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    return {
      success: true,
      user: JSON.parse(storedUser),
    };
  }

  return {
    success: false,
    error: 'Not authenticated',
  };
};

/**
 * Update user profile
 * @param {object} updates - Profile updates
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export const updateProfile = async (updates) => {
  await delay(800);

  // Mock response - replace with actual API call
  // return fetch(`${API_BASE_URL}/auth/profile`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${getToken()}`,
  //   },
  //   body: JSON.stringify(updates),
  // }).then(res => res.json());

  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  const user = JSON.parse(storedUser);
  const updatedUser = { ...user, ...updates };
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));

  return {
    success: true,
    user: updatedUser,
  };
};

/**
 * Change password
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export const changePassword = async (currentPassword, newPassword) => {
  await delay(1000);

  // Mock response - replace with actual API call
  // return fetch(`${API_BASE_URL}/auth/change-password`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${getToken()}`,
  //   },
  //   body: JSON.stringify({ currentPassword, newPassword }),
  // }).then(res => res.json());

  if (newPassword.length < 8) {
    return {
      success: false,
      error: 'New password must be at least 8 characters',
    };
  }

  return {
    success: true,
    message: 'Password changed successfully',
  };
};

// Export as default object for convenience
export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
  logout,
  getCurrentUser,
  updateProfile,
  changePassword,
};
