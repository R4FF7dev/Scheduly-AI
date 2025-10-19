import { api, tokenManager } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  register: async (userData: RegisterData) => {
    const response = await api.post(API_ENDPOINTS.auth.register, userData, { skipAuth: true });
    
    // Check if registration was successful
    if (response.success !== true) {
      throw new Error(response.error || 'Registration failed');
    }
    
    if (response.accessToken) {
      tokenManager.setToken(response.accessToken);
      tokenManager.setRefreshToken(response.refreshToken);
    }
    return response;
  },
  
  login: async (credentials: LoginCredentials) => {
    const response = await api.post(API_ENDPOINTS.auth.login, credentials, { skipAuth: true });
    
    // Debug: Log the actual response
    console.log('Login API Response:', response);
    console.log('Response success value:', response.success);
    console.log('Response success type:', typeof response.success);
    
    // Check if login was successful
    if (response.success !== true) {
      console.log('Login failed, throwing error:', response.error);
      throw new Error(response.error || 'Login failed');
    }
    
    console.log('Login successful, setting tokens');
    if (response.accessToken) {
      tokenManager.setToken(response.accessToken);
      tokenManager.setRefreshToken(response.refreshToken);
    }
    return response;
  },
  
  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.auth.logout);
    } finally {
      tokenManager.clearTokens();
    }
  },
  
  verifyEmail: async (token: string) => {
    return api.post(API_ENDPOINTS.auth.verifyEmail, { token }, { skipAuth: true });
  },
  
  resetPassword: async (email: string) => {
    return api.post(API_ENDPOINTS.auth.resetPassword, { email }, { skipAuth: true });
  },
  
  isAuthenticated: () => !!tokenManager.getToken(),
};
