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
    return api.post(API_ENDPOINTS.whatsapp.connect, {
      user_id: userId,
      phone_number: phoneNumber,
      country_code: countryCode || ''
    });
  },
  
  verify: async (verificationCode: string, userId: string) => {
    return api.post(API_ENDPOINTS.whatsapp.verify, {
      user_id: userId,
      verification_code: verificationCode
    });
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
