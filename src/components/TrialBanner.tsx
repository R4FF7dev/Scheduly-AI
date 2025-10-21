import { useAuth } from "@/contexts/AuthContext";
import { X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export const TrialBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dismissed, setDismissed] = useState(false);
  
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

  // Don't show banner if not authenticated or on auth/landing pages or dismissed
  if (!isAuthenticated || 
      dismissed ||
      location.pathname === '/auth' || 
      location.pathname === '/' ||
      location.pathname === '/landing') {
    return null;
  }

  // Calculate trial days remaining (assuming 14-day trial from signup)
  const getTrialDaysRemaining = () => {
    if (!user?.created_at) return 14;
    
    const signupDate = new Date(user.created_at);
    const today = new Date();
    const daysSinceSignup = Math.floor(
      (today.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return Math.max(0, 14 - daysSinceSignup);
  };

  const daysRemaining = getTrialDaysRemaining();

  // Don't show if trial has expired (they should see billing page alert)
  if (daysRemaining === 0) {
    return null;
  }

  return (
    <div className="relative w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 border-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <span className="text-lg">🎉</span>
          <span className="text-sm font-medium">
            Free Trial: {daysRemaining} days remaining to explore all features
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/billing')}
            className="text-white text-sm font-semibold underline hover:no-underline transition-all"
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
