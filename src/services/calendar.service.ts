import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';

export const calendarService = {
  connect: async () => {
    return api.post(API_ENDPOINTS.calendar.connect, {}, { skipAuth: true });
  },
  
  disconnect: async () => {
    return api.post(API_ENDPOINTS.calendar.disconnect);
  },
  
  getEvents: async (startDate?: Date, endDate?: Date) => {
    const params = new URLSearchParams({
      startDate: startDate?.toISOString() || new Date().toISOString(),
      endDate: endDate?.toISOString() || new Date(Date.now() + 30*24*60*60*1000).toISOString(),
    });
    return api.get(`${API_ENDPOINTS.calendar.getEvents}?${params}`);
  },
  
  getSyncStatus: async () => {
    return api.get(API_ENDPOINTS.calendar.syncStatus, { skipAuth: true });
  },
};
