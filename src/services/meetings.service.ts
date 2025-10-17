import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';

interface MeetingData {
  title: string;
  startTime: string;
  endTime: string;
  participants?: string[];
  description?: string;
}

export const meetingsService = {
  getUpcoming: async (limit = 10) => {
    return api.get(`${API_ENDPOINTS.meetings.upcoming}?limit=${limit}`);
  },
  
  getPast: async (page = 1, limit = 20) => {
    return api.get(`${API_ENDPOINTS.meetings.past}?page=${page}&limit=${limit}`);
  },
  
  create: async (meetingData: MeetingData) => {
    return api.post(API_ENDPOINTS.meetings.create, meetingData);
  },
  
  update: async (meetingId: string, updates: Partial<MeetingData>) => {
    return api.put(`${API_ENDPOINTS.meetings.update}/${meetingId}`, updates);
  },
  
  delete: async (meetingId: string) => {
    return api.delete(`${API_ENDPOINTS.meetings.delete}/${meetingId}`);
  },
  
  getSummary: async (meetingId: string) => {
    return api.get(`${API_ENDPOINTS.meetings.summary}/${meetingId}`);
  },
};
