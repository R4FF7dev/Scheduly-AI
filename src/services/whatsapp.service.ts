import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';

export const whatsappService = {
  connect: async (phoneNumber: string, userId: string, countryCode?: string) => {
    try {
      console.log('📞 Connecting WhatsApp:', { phoneNumber, userId });
      
      const response = await api.post(API_ENDPOINTS.whatsapp.connect, {
        user_id: userId,
        phone_number: phoneNumber,
        country_code: countryCode || ''
      });
      
      console.log('✅ WhatsApp connect response:', response);
      return response;
    } catch (error: any) {
      console.error('❌ WhatsApp connect error:', error);
      // Return a structured error instead of throwing
      throw new Error(error.response?.data?.message || error.message || 'Failed to send verification code');
    }
  },
  
  verify: async (verificationCode: string, userId: string) => {
    try {
      console.log('🔐 Verifying code:', { userId, codeLength: verificationCode.length });
      
      const response = await api.post(API_ENDPOINTS.whatsapp.verify, {
        user_id: userId,
        verification_code: verificationCode
      });
      
      console.log('✅ Verify response:', response);
      return response;
    } catch (error: any) {
      console.error('❌ Verify error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Verification failed');
    }
  },

  disconnect: async () => {
    return api.post(API_ENDPOINTS.whatsapp.disconnect);
  },
  
  getStatus: async () => {
    try {
      // Get user_id from localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) throw new Error('User not authenticated');
      
      const user = JSON.parse(userStr);
      return api.get(`${API_ENDPOINTS.whatsapp.status}?user_id=${user.id}`);
    } catch (error: any) {
      console.error('❌ Status check error:', error);
      throw error;
    }
  },
  
  sendTestMessage: async () => {
    return api.post(API_ENDPOINTS.whatsapp.sendTest);
  },
};
