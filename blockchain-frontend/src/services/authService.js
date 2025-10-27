// src/services/authService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock authentication for development (set to false when backend is ready)
const USE_MOCK_AUTH = false;

export const authService = {
  // Login
  login: async (credentials) => {
    if (USE_MOCK_AUTH) {
      // Mock login - accept any email/password for development
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-jwt-token-' + Date.now(),
            email: credentials.email,
            name: 'Test User'
          });
        }, 1000);
      });
    }

    try {
      console.log('Sending Login request with', credentials);
      const response = await authApi.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      console.log('Login response:', response);
      console.log('Response token:', response.data);
      if (!response.data) {
        throw new Error('No data received from server');
      }

      // Response will have: token, email, name (from JwtResponse)
      const { token, email, name } = response.data;

      // Check if required fields exist
      if (!token) {
        console.error('Token missing in response:', response.data);
        throw new Error('Invalid response from server - no token');
      }
      
      // Store token and user info
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', email || credentials.email);
      localStorage.setItem('userName', name ||'User');
      
      return{
        token: token,
        email: email || credentials.email,
        name: name || 'User'
      };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response);

      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }

      if (error.response?.data?.error){
        throw new Error(error.response.data.error);
      }
      throw new Error(error.message || 'Login failed');
    }
  },

  // Signup
  signup: async (userData) => {
    if (USE_MOCK_AUTH) {
      // Mock signup
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            message: 'User created successfully',
          });
        }, 1000);
      });
    }

    try {
      console.log('Sending signup request with:', userData);

      const response = await authApi.post('/auth/signup', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        contactNo: userData.contactNo
      });
      
      console.log('Signup response:', response.data);

      return response.data; // Will return { message: "User registered successfully" }
    } catch (error) {
      console.error('Signup error:', error);
      console.error('Error response:', error.response);

      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error(error.message || 'Signup failed');
    }
  },

  // Send OTP for password reset
  sendOTP: async (email) => {
    if (USE_MOCK_AUTH) {
      // Mock OTP send
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Mock OTP: 123456'); // For development
          resolve({ message: 'OTP sent successfully' });
        }, 1000);
      });
    }

    try {
      const response = await authApi.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send OTP');
    }
  },

 // Verify OTP
  verifyOTP: async (email, otp) => {
    if (USE_MOCK_AUTH) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (otp === '123456') {
            resolve({ message: 'OTP verified successfully' });
          } else {
            reject(new Error('Invalid OTP'));
          }
        }, 500);
      });
    }

    try {
      const response = await authApi.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Invalid OTP');
    }
  },

  // Reset Password
  resetPassword: async (email, otp, newPassword) => {
    if (USE_MOCK_AUTH) {
      // Mock password reset
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: 'Password reset successfully' });
        }, 1000);
      });
    }

    try {
      const response = await authApi.post('/auth/reset-password', {
        email,
        otp,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  }
};

export default authService;