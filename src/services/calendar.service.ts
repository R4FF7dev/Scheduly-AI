import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';
import { supabase } from '@/integrations/supabase/client';

export const calendarService = {
  connect: async () => {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Call Supabase Edge Function instead of n8n directly (avoids CORS)
    const { data, error } = await supabase.functions.invoke('calendar-connect', {
      body: { user_id: user.id },
    });

    if (error) {
      console.error('Calendar connect error:', error);
      throw new Error(error.message || 'Failed to connect calendar');
    }

    return data;
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
    return api.get(API_ENDPOINTS.calendar.syncStatus);
  },
};
