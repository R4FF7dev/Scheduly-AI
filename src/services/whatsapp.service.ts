import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';

// Get user_id from localStorage (set by AuthContext)
const getUserId = (): string => {
  const user = localStorage.getItem('user');
  if (!user) throw new Error('User not authenticated');
  return JSON.parse(user).id;
};

export const whatsappService = {
  connect: async (phoneNumber: string, countryCode?: string) => {
    const user_id = getUserId();
    return api.post(API_ENDPOINTS.whatsapp.connect, {
      user_id,
      phone_number: phoneNumber,
      country_code: countryCode || ''
    });
  },
  
  verify: async (verificationCode: string) => {
    const user_id = getUserId();
    return api.post(API_ENDPOINTS.whatsapp.verify, {
      user_id,
      verification_code: verificationCode
    });
  },
  
  disconnect: async () => {
    return api.post(API_ENDPOINTS.whatsapp.disconnect);
  },
  
  getStatus: async () => {
    return api.get(API_ENDPOINTS.whatsapp.status);
  },
  
  sendTestMessage: async () => {
    return api.post(API_ENDPOINTS.whatsapp.sendTest);
  },
};
