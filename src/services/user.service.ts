import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';

interface ProfileData {
  name?: string;
  email?: string;
  timezone?: string;
  avatar?: string;
}

export const userService = {
  getProfile: async () => {
    return api.get(API_ENDPOINTS.user.profile);
  },
  
  updateProfile: async (profileData: ProfileData) => {
    return api.put(API_ENDPOINTS.user.updateProfile, profileData);
  },
  
  getSubscription: async () => {
    return api.get(API_ENDPOINTS.user.subscription);
  },
  
  getUsage: async () => {
    return api.get(API_ENDPOINTS.user.usage);
  },
};
