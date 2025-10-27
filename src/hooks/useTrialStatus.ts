import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Local interface for trial data - bypasses auto-generated types from Lovable Cloud
// Runtime uses hardcoded config pointing to xxvlxrvsennoatbntuhc which has these columns
interface UserIntegrationTrialData {
  trial_meetings_used: number;
  trial_meetings_limit: number;
  trial_expires_at: string;
  subscription_status: 'trial' | 'active' | 'expired';
}

export const useTrialStatus = () => {
  const { user } = useAuth();
  const [trialStatus, setTrialStatus] = useState({
    meetingsUsed: 0,
    meetingsLimit: 20,
    meetingsRemaining: 20,
    daysRemaining: 30,
    expiresAt: null as Date | null,
    status: 'trial' as 'trial' | 'active' | 'expired',
    isLoading: true
  });

  useEffect(() => {
    const fetchTrialStatus = async () => {
      if (!user?.id) {
        setTrialStatus(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        // Type assertion needed: auto-generated types are from Lovable Cloud DB (brwdpahslxwqwbncfpqy)
        // but runtime uses hardcoded config pointing to custom DB (xxvlxrvsennoatbntuhc)
        const { data, error } = await supabase
          .from('user_integrations')
          .select('trial_meetings_used, trial_meetings_limit, trial_expires_at, subscription_status')
          .eq('user_id', user.id)
          .single() as { data: UserIntegrationTrialData | null; error: any };

        if (error) {
          console.error('Error fetching trial status:', error);
          setTrialStatus(prev => ({ ...prev, isLoading: false }));
          return;
        }

        if (data) {
          const expiresAt = new Date(data.trial_expires_at);
          const daysRemaining = Math.max(0, Math.ceil(
            (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          ));

          setTrialStatus({
            meetingsUsed: data.trial_meetings_used || 0,
            meetingsLimit: data.trial_meetings_limit || 20,
            meetingsRemaining: Math.max(0, 
              (data.trial_meetings_limit || 20) - (data.trial_meetings_used || 0)
            ),
            daysRemaining,
            expiresAt,
            status: data.subscription_status || 'trial',
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Unexpected error fetching trial status:', error);
        setTrialStatus(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchTrialStatus();

    // Real-time subscription for updates
    const subscription = supabase
      .channel('trial_status_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_integrations',
          filter: `user_id=eq.${user?.id}`
        },
        () => fetchTrialStatus()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id]);

  return trialStatus;
};
