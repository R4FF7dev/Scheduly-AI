import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@/config/api.config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Token management
export const tokenManager = {
  getToken: () => localStorage.getItem('auth_token'),
  setToken: (token: string) => localStorage.setItem('auth_token', token),
  getRefreshToken: () => localStorage.getItem('refresh_token'),
  setRefreshToken: (token: string) => localStorage.setItem('refresh_token', token),
  clearToken: () => localStorage.removeItem('auth_token'),
  clearTokens: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  },
};

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config: any) => {
    // Skip adding auth token if skipAuth option is set
    if (config.skipAuth) {
      delete config.skipAuth; // Remove custom option before sending request
      return config;
    }
    
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear token and redirect to auth
      tokenManager.clearToken();
      
      // Only redirect if not already on auth page
      if (!window.location.pathname.includes('/auth')) {
        window.location.href = '/auth';
      }
      
      return Promise.reject(new Error('Session expired. Please login again.'));
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error.message);
      return Promise.reject(new Error('Network error. Please check your connection and try again.'));
    }

    // Handle other HTTP errors
    const responseData = error.response?.data as any;
    const errorMessage = 
      responseData?.message || 
      responseData?.error || 
      `Request failed with status ${error.response?.status}`;

    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export const api = {
  get: async (endpoint: string, options?: any) => {
    try {
      const response = await apiClient.get(endpoint, options);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  post: async (endpoint: string, data?: any, options?: any) => {
    try {
      const response = await apiClient.post(endpoint, data, options);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  put: async (endpoint: string, data?: any, options?: any) => {
    try {
      const response = await apiClient.put(endpoint, data, options);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  delete: async (endpoint: string, options?: any) => {
    try {
      const response = await apiClient.delete(endpoint, options);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  },
};
