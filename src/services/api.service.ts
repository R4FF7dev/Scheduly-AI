import { API_ENDPOINTS } from '@/config/api.config';

// Token management
const TOKEN_KEY = 'scheduly_auth_token';
const REFRESH_TOKEN_KEY = 'scheduly_refresh_token';

export const tokenManager = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string) => localStorage.setItem(REFRESH_TOKEN_KEY, token),
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
  isRetry?: boolean;
}

// Base fetch function with error handling
const makeRequest = async (url: string, options: RequestOptions = {}) => {
  const token = tokenManager.getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  
  if (token && !options.skipAuth) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);
    
    // Handle token refresh if unauthorized
    if (response.status === 401 && !options.isRetry) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return makeRequest(url, { ...options, isRetry: true });
      } else {
        tokenManager.clearTokens();
        window.location.href = '/auth';
        throw new Error('Session expired. Please login again.');
      }
    }
    
    // Check if response has content and is JSON
    const contentType = response.headers.get('content-type');
    const hasJsonContent = contentType && contentType.includes('application/json');
    
    // Try to parse JSON if content exists
    let data;
    try {
      const text = await response.text();
      if (text && text.trim().length > 0) {
        data = JSON.parse(text);
      } else {
        data = { success: response.ok };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      throw new Error(`Invalid response from server. Please check your n8n webhook configuration.`);
    }
    
    if (!response.ok) {
      throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network request failed. Please check your connection.');
  }
};

// Refresh token logic
const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = tokenManager.getRefreshToken();
  if (!refreshToken) return false;
  
  try {
    const response = await fetch(API_ENDPOINTS.auth.refreshToken, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (response.ok) {
      const data = await response.json();
      tokenManager.setToken(data.accessToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// API Methods
export const api = {
  get: (url: string, options: RequestOptions = {}) => makeRequest(url, { ...options, method: 'GET' }),
  post: (url: string, data?: any, options: RequestOptions = {}) => makeRequest(url, { 
    ...options, 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  put: (url: string, data?: any, options: RequestOptions = {}) => makeRequest(url, { 
    ...options, 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  delete: (url: string, options: RequestOptions = {}) => makeRequest(url, { ...options, method: 'DELETE' }),
};
