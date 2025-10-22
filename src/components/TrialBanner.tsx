import { useAuth } from "@/contexts/AuthContext";
import { X, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkTrialStatus, TrialStatus } from "@/utils/trial";

export const TrialBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
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
      
      const status = await checkTrialStatus();
      setTrialStatus(status);
      setLoading(false);
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
  if (trialStatus?.hasActiveSubscription) {
    return null;
  }

  const daysRemaining = trialStatus?.daysRemaining ?? 14;
  const isExpired = !trialStatus?.isTrialActive;

  // Don't allow dismissal if trial expired
  if (dismissed && !isExpired) {
    return null;
  }

  // Expired trial banner (persistent, non-dismissible)
  if (isExpired) {
    return (
      <div className="relative w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 border-0">
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
    <div className="relative w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 border-0">
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
            onClick={() => setDismissed(true)}
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
