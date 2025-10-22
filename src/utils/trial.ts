import { supabase } from "@/integrations/supabase/client";

const TRIAL_DAYS = 14;

export interface TrialStatus {
  isTrialActive: boolean;
  daysRemaining: number;
  hasActiveSubscription: boolean;
  subscriptionStatus?: string;
}

/**
 * Check if user's trial is active and get subscription status
 */
export const checkTrialStatus = async (): Promise<TrialStatus> => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return {
        isTrialActive: false,
        daysRemaining: 0,
        hasActiveSubscription: false,
      };
    }

    // Calculate trial days from user creation date
    let daysRemaining = TRIAL_DAYS;
    let isTrialActive = true;
    
    if (user.created_at) {
      const createdAt = new Date(user.created_at);
      const now = new Date();
      const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
      daysRemaining = Math.max(0, TRIAL_DAYS - daysSinceCreation);
      isTrialActive = daysRemaining > 0;
    } else {
      // If no created_at found, default to full trial period
      console.log('⚠️ No user created_at found - defaulting to 14 days trial');
    }

    // Check subscription status from external API
    let hasActiveSubscription = false;
    let subscriptionStatus: string | undefined;

    try {
      const response = await fetch(
        `https://n8n.schedulyai.com/webhook/user/subscription?email=${encodeURIComponent(user.email || '')}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const subscription = await response.json();
        subscriptionStatus = subscription?.status;
        
        // Active subscription overrides trial
        hasActiveSubscription = subscription?.status === 'active' || subscription?.status === 'trialing';
      }
    } catch (error) {
      console.error('Failed to check subscription:', error);
      // If subscription API fails, rely on trial status
    }

    return {
      isTrialActive: hasActiveSubscription || isTrialActive,
      daysRemaining,
      hasActiveSubscription,
      subscriptionStatus,
    };
  } catch (error) {
    console.error('Error checking trial status:', error);
    return {
      isTrialActive: false,
      daysRemaining: 0,
      hasActiveSubscription: false,
    };
  }
};

/**
 * Check if user can access integrations (trial active OR has subscription)
 */
export const canAccessIntegrations = async (): Promise<boolean> => {
  const status = await checkTrialStatus();
  return status.isTrialActive || status.hasActiveSubscription;
};

/**
 * Check if user needs to upgrade (trial expired AND no active subscription)
 */
export const needsUpgrade = async (): Promise<boolean> => {
  const status = await checkTrialStatus();
  return !status.isTrialActive && !status.hasActiveSubscription;
};
