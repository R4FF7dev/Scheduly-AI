import { supabase } from '@/integrations/supabase/client';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

// Base fetch function with Supabase auth
const makeRequest = async (url: string, options: RequestOptions = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  
  // Add Supabase session token if not skipping auth
  if (!options.skipAuth) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
  }
  
  const config: RequestInit = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API Methods
export const api = {
  get: (url: string, options: RequestOptions = {}) => 
    makeRequest(url, { ...options, method: 'GET' }),
    
  post: (url: string, data?: any, options: RequestOptions = {}) => 
    makeRequest(url, { 
      ...options, 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
    
  put: (url: string, data?: any, options: RequestOptions = {}) => 
    makeRequest(url, { 
      ...options, 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
    
  delete: (url: string, options: RequestOptions = {}) => 
    makeRequest(url, { ...options, method: 'DELETE' }),
};
