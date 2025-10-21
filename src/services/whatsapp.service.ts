import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';

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
    return api.get(API_ENDPOINTS.whatsapp.status);
  },
  
  sendTestMessage: async () => {
    return api.post(API_ENDPOINTS.whatsapp.sendTest);
  },
};
