import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  
  // Debug log to check if token exists
  // console.log('Token from localStorage:', token);
  
  if (token) {
    // Make sure to add "Bearer " prefix
    config.headers.Authorization = `Bearer ${token}`;
    // console.log('Authorization header set:', config.headers.Authorization);
  } else {
    console.log('No token found in localStorage');
  }
  
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('Authentication error - clearing token and redirecting to login');
      // Unauthorized/Forbidden - clear auth and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const blockchainService = {
  // Get the entire blockchain
  getChain: async () => {
    try {
      const response = await api.get('/chain');
      return response.data;
    } catch (error) {
      console.error('Error fetching chain:', error);
      return [];
    }
  },

  // Get pending transactions
  getPendingTransactions: async () => {
    try {
      const response = await api.get('/pending');
      return response.data;
    } catch (error) {
      console.error('Error fetching pending transactions:', error);
      return [];
    }
  },

  // Create a new transaction - NO TRANSFORMATION
  createTransaction: async (transaction) => {
    try {
      const response = await api.post('/transactions', transaction);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // Mine a new block - NO TRANSFORMATION
  mineBlock: async (minerAddress) => {
    try {
      const response = await api.post(`/mine?minerAddress=${minerAddress}`);
      return response.data;
    } catch (error) {
      console.error('Error mining block:', error);
      throw error;
    }
  },

  // Validate the blockchain
  validateChain: async () => {
    try {
      const response = await api.get('/validate');
      return response.data;
    } catch (error) {
      console.error('Error validating chain:', error);
      throw error;
    }
  },

  // Get balance for an address
  getBalance: async (address) => {
    try {
      const response = await api.get(`/balance/${address}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  },
};

export default api;