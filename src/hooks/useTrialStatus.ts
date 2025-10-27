import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      if (!user?.email) {
        setTrialStatus(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        // Fetch subscription data from n8n API
        const response = await axios.get(`${API_BASE_URL}/user/subscription`, {
          params: { email: user.email }
        });

        const subscription = response.data;

        if (subscription) {
          // User has active subscription
          setTrialStatus({
            meetingsUsed: 0,
            meetingsLimit: 999,
            meetingsRemaining: 999,
            daysRemaining: 999,
            expiresAt: null,
            status: 'active',
            isLoading: false
          });
        } else {
          // Free trial user (null/404 is normal state)
          setTrialStatus({
            meetingsUsed: 0,
            meetingsLimit: 20,
            meetingsRemaining: 20,
            daysRemaining: 30,
            expiresAt: null,
            status: 'trial',
            isLoading: false
          });
        }
      } catch (error: any) {
        // Only show errors for real API failures (500, network errors)
        if (error.response?.status !== 404 && error.response?.status !== 400) {
          console.error('Error fetching subscription status:', error);
        }
        
        // Default to trial state for 404/null responses
        setTrialStatus({
          meetingsUsed: 0,
          meetingsLimit: 20,
          meetingsRemaining: 20,
          daysRemaining: 30,
          expiresAt: null,
          status: 'trial',
          isLoading: false
        });
      }
    };

    fetchTrialStatus();
  }, [user?.email]);

  return trialStatus;
};
