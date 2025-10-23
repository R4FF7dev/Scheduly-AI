import axios from 'axios';
import { API_BASE_URL } from '@/config/api.config';
import { supabase } from '@/integrations/supabase/client';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const api = {
  get: async (endpoint: string) => {
    const response = await apiClient.get(endpoint);
    return response.data;
  },
  
  post: async (endpoint: string, data?: any) => {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  },
  
  put: async (endpoint: string, data?: any) => {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  },
  
  delete: async (endpoint: string) => {
    const response = await apiClient.delete(endpoint);
    return response.data;
  },
};
