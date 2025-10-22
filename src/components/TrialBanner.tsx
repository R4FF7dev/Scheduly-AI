import { useAuth } from "@/contexts/AuthContext";
import { X, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const TrialBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Load dismissal state from localStorage
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem('trialBannerDismissed') === 'true';
    } catch {
      return false;
    }
  });
  
  const [daysRemaining, setDaysRemaining] = useState(14);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Safely get auth - handle case where provider isn't ready
  let user = null;
  let isAuthenticated = false;
  
  try {
    const auth = useAuth();
    user = auth?.user;
    isAuthenticated = auth?.isAuthenticated || false;
  } catch (error) {
    // Auth provider not ready yet, skip rendering
    return null;
  }

  useEffect(() => {
    const fetchTrialStatus = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      try {
        // Get user from Supabase auth
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser?.created_at) {
          console.log('❌ No user created_at found');
          setLoading(false);
          return;
        }

        // Calculate trial days remaining
        const signupDate = new Date(authUser.created_at);
        const now = new Date();
        const daysSinceSignup = Math.floor((now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24));
        const calculatedDaysRemaining = Math.max(0, 14 - daysSinceSignup);
        
        // Debug output
        console.log('🔍 Trial Calculation Debug:');
        console.log('  Signup date:', authUser.created_at);
        console.log('  Days since signup:', daysSinceSignup);
        console.log('  Days remaining:', calculatedDaysRemaining);
        
        setDaysRemaining(calculatedDaysRemaining);

        // Check subscription status
        try {
          const response = await fetch(
            `https://n8n.schedulyai.com/webhook/user/subscription?email=${encodeURIComponent(authUser.email || '')}`
          );
          
          if (response.ok) {
            const subscription = await response.json();
            const isActive = subscription?.status === 'active' || subscription?.status === 'trialing';
            setHasActiveSubscription(isActive);
            console.log('  Subscription status:', subscription?.status, '| Active:', isActive);
          }
        } catch (error) {
          console.log('  Subscription check failed (treating as free trial)');
        }
      } catch (error) {
        console.error('Error fetching trial status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrialStatus();
  }, [isAuthenticated]);

  // Don't show banner if not authenticated or on auth/landing pages
  if (!isAuthenticated || 
      location.pathname === '/auth' || 
      location.pathname === '/' ||
      location.pathname === '/landing' ||
      location.pathname === '/dashboard/billing' ||
      loading) {
    return null;
  }

  // If user has active subscription, don't show trial banner
  if (hasActiveSubscription) {
    return null;
  }

  const isExpired = daysRemaining === 0;

  // If banner was dismissed and trial is still active, don't show it
  if (dismissed && !isExpired) {
    return null;
  }
  
  // Handler to dismiss banner and persist to localStorage
  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem('trialBannerDismissed', 'true');
    } catch (error) {
      console.error('Failed to save banner dismissal state:', error);
    }
  };

  // Expired trial banner (persistent, non-dismissible)
  if (isExpired) {
    return (
      <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 border-0">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-medium">
              <span className="hidden sm:inline">Trial expired - Upgrade to continue using Scheduly AI</span>
              <span className="sm:hidden">Trial expired - Upgrade now</span>
            </span>
          </div>
          <button
            onClick={() => navigate('/dashboard/billing')}
            className="bg-white text-red-600 px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-50 transition-all whitespace-nowrap"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  // Active trial banner (dismissible)
  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 border-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <span className="text-lg">🎉</span>
          <span className="text-sm font-medium">
            <span className="hidden sm:inline">Free Trial: {daysRemaining} days remaining to explore all features</span>
            <span className="sm:hidden">Trial: {daysRemaining} days left</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigate('/dashboard/billing')}
            className="text-white text-sm font-semibold underline hover:no-underline transition-all whitespace-nowrap"
          >
            Upgrade Now
          </button>
          <button
            onClick={handleDismiss}
            className="text-white hover:bg-white/20 rounded p-1 transition-all"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
