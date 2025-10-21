import { api } from './api.service';
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
    const response = await api.post(API_ENDPOINTS.auth.register, userData);
    
    if (response.success !== true) {
      throw new Error(response.error || 'Registration failed');
    }
    
    if (response.accessToken) {
      localStorage.setItem('authToken', response.accessToken);
    }
    return response;
  },
  
  login: async (credentials: LoginCredentials) => {
    const response = await api.post(API_ENDPOINTS.auth.login, credentials);
    
    if (response.success !== true) {
      throw new Error(response.error || 'Login failed');
    }
    
    if (response.accessToken) {
      localStorage.setItem('authToken', response.accessToken);
    }
    return response;
  },
  
  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.auth.logout);
    } finally {
      localStorage.removeItem('authToken');
    }
  },
  
  verifyEmail: async (token: string) => {
    return api.post(API_ENDPOINTS.auth.verifyEmail, { token });
  },
  
  resetPassword: async (email: string) => {
    return api.post(API_ENDPOINTS.auth.resetPassword, { email });
  },
  
  isAuthenticated: () => !!localStorage.getItem('authToken'),
};
