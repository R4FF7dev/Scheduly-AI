import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api.service';
import { API_ENDPOINTS } from '@/config/api.config';

// Trial/subscription data comes from n8n backend, not Supabase
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
      if (!user?.email) return;

      try {
        // Query n8n backend for subscription/trial data
        const response = await api.get(
          `${API_ENDPOINTS.user.subscription}?email=${encodeURIComponent(user.email)}`
        );

        if (response) {
          const expiresAt = response.trial_expires_at ? new Date(response.trial_expires_at) : null;
          const daysRemaining = expiresAt 
            ? Math.max(0, Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
            : 30;

          setTrialStatus({
            meetingsUsed: response.trial_meetings_used || 0,
            meetingsLimit: response.trial_meetings_limit || 20,
            meetingsRemaining: Math.max(0, 
              (response.trial_meetings_limit || 20) - (response.trial_meetings_used || 0)
            ),
            daysRemaining,
            expiresAt,
            status: response.subscription_status || 'trial',
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Error fetching trial status:', error);
        setTrialStatus(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchTrialStatus();
  }, [user?.email]);

  return trialStatus;
};
