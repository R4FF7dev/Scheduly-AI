import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';

export const whatsappService = {
  connect: async (phoneNumber: string) => {
    console.log('WhatsApp connect - sending to:', API_ENDPOINTS.whatsapp.connect);
    console.log('WhatsApp connect - payload:', { phoneNumber });
    try {
      const response = await api.post(API_ENDPOINTS.whatsapp.connect, { phoneNumber }, { skipAuth: true });
      console.log('WhatsApp connect - response:', response);
      return response;
    } catch (error) {
      console.error('WhatsApp connect - error:', error);
      throw error;
    }
  },
  
  verify: async (verificationCode: string, phoneNumber: string) => {
    return api.post(API_ENDPOINTS.whatsapp.verify, { 
      code: verificationCode,
      phoneNumber 
    }, { skipAuth: true });
  },
  
  disconnect: async () => {
    return api.post(API_ENDPOINTS.whatsapp.disconnect);
  },
  
  getStatus: async () => {
    return api.get(API_ENDPOINTS.whatsapp.status, { skipAuth: true });
  },
  
  sendTestMessage: async () => {
    return api.post(API_ENDPOINTS.whatsapp.sendTest);
  },
};
