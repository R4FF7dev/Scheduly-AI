import { useEffect, useState, useCallback } from 'react';
import { calendarService } from '@/services/calendar.service';
import { whatsappService } from '@/services/whatsapp.service';

export interface WhatsAppStatus {
  connected: boolean;
  verified: boolean;
}

export const useIntegrationStatus = () => {
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsAppStatus>({ connected: false, verified: false });
  const [isLoading, setIsLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    try {
      const [calendarStatus, whatsappStatusResult] = await Promise.all([
        calendarService.getSyncStatus().catch(() => ({ connected: false })),
        whatsappService.getStatus().catch(() => ({ connected: false, verified: false })),
      ]);
      
      console.log('Calendar status:', calendarStatus);
      console.log('WhatsApp status:', whatsappStatusResult);
      
      setIsCalendarConnected(calendarStatus?.connected || false);
      setWhatsappStatus(whatsappStatusResult);
      setIsWhatsAppConnected(whatsappStatusResult?.verified || false);
    } catch (error) {
      console.error('Error checking integration status:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  return {
    isCalendarConnected,
    isWhatsAppConnected,
    whatsappStatus,
    isFullyConnected: isCalendarConnected && isWhatsAppConnected,
    isLoading,
    refetch: checkStatus,
  };
};
