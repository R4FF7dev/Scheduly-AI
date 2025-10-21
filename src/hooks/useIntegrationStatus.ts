import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type State = {
  loading: boolean;
  googleConnected: boolean;
  whatsappVerified: boolean;
  whatsappConnected: boolean;
  meetingsToday: number;
};

export function useIntegrationStatus() {
  const [s, setS] = useState<State>({
    loading: true,
    googleConnected: false,
    whatsappVerified: false,
    whatsappConnected: false,
    meetingsToday: 0,
  });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return setS(prev => ({ ...prev, loading: false }));

      // Load from localStorage since database tables aren't set up yet
      const stored = localStorage.getItem(`integration_status_${user.id}`);
      const parsed = stored ? JSON.parse(stored) : {};

      setS({
        loading: false,
        googleConnected: parsed.googleConnected || false,
        whatsappVerified: parsed.whatsappVerified || false,
        whatsappConnected: parsed.whatsappConnected || false,
        meetingsToday: parsed.meetingsToday || 0,
      });
    })();
  }, []);

  return s;
}
