import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';

// Get user_id from localStorage
const getUserId = (): string => {
  const user = localStorage.getItem('user');
  if (!user) throw new Error('User not authenticated');
  return JSON.parse(user).id;
};

export const whatsappService = {
  connect: async (phoneNumber: string, userId: string, countryCode?: string) => {
    try {
      const response = await api.post(API_ENDPOINTS.whatsapp.connect, {
        user_id: userId,
        phone_number: phoneNumber,
        country_code: countryCode || ''
      });
      
      // Handle response properly
      return response;
    } catch (error: any) {
      console.error('WhatsApp connect error:', error);
      // Re-throw with clearer message
      throw new Error(error.message || 'Failed to send verification code');
    }
  },
  
  verify: async (verificationCode: string, userId: string) => {
    try {
      const response = await api.post(API_ENDPOINTS.whatsapp.verify, {
        user_id: userId,
        verification_code: verificationCode
      });
      
      return response;
    } catch (error: any) {
      console.error('WhatsApp verify error:', error);
      throw new Error(error.message || 'Verification failed');
    }
  },
  
  disconnect: async () => {
    return api.post(API_ENDPOINTS.whatsapp.disconnect);
  },
  
  getStatus: async () => {
    const userId = getUserId();
    return api.get(`${API_ENDPOINTS.whatsapp.status}?user_id=${userId}`);
  },
  
  sendTestMessage: async () => {
    return api.post(API_ENDPOINTS.whatsapp.sendTest);
  },
};
