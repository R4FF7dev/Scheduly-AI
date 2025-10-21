import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const TrialBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
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

  // Don't show banner if not authenticated or on auth/landing pages
  if (!isAuthenticated || 
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
    <Alert className="rounded-none border-x-0 border-t-0 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
      <Clock className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-blue-900">
          <strong>Free Trial:</strong> {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
        </span>
        <Button
          size="sm"
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          onClick={() => navigate('/dashboard/billing')}
        >
          Upgrade Now
        </Button>
      </AlertDescription>
    </Alert>
  );
};
