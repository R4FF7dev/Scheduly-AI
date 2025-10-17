import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';

export const whatsappService = {
  connect: async (phoneNumber: string) => {
    return api.post(API_ENDPOINTS.whatsapp.connect, { phoneNumber });
  },
  
  verify: async (verificationCode: string) => {
    return api.post(API_ENDPOINTS.whatsapp.verify, { code: verificationCode });
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
