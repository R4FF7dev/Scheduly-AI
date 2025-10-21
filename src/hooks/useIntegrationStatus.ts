import { useEffect, useState } from 'react';
import { calendarService } from '@/services/calendar.service';
import { whatsappService } from '@/services/whatsapp.service';

export const useIntegrationStatus = () => {
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const [calendarStatus, whatsappStatus] = await Promise.all([
          calendarService.getSyncStatus(),
          whatsappService.getStatus(),
        ]);
        
        setIsCalendarConnected(calendarStatus?.connected || false);
        setIsWhatsAppConnected(whatsappStatus?.connected || false);
      } catch (error) {
        console.error('Error checking integration status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, []);

  return {
    isCalendarConnected,
    isWhatsAppConnected,
    isFullyConnected: isCalendarConnected && isWhatsAppConnected,
    isLoading,
  };
};
