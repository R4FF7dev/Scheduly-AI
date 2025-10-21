import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const TRIAL_DURATION_DAYS = 14;
const TRIAL_START_KEY = 'trial_start_date';

export const TrialBanner = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(TRIAL_DURATION_DAYS);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    // Prefer created_at from backend user if available, else fall back to localStorage per-user
    const maybeCreatedAt = (user as any)?.created_at as string | undefined;
    const trialStartKey = `${TRIAL_START_KEY}_${user.id}`;

    let startISO: string;
    if (maybeCreatedAt) {
      startISO = maybeCreatedAt;
    } else {
      const existing = localStorage.getItem(trialStartKey);
      startISO = existing || new Date().toISOString();
      if (!existing) localStorage.setItem(trialStartKey, startISO);
    }

    const startDate = new Date(startISO);
    const now = new Date();
    const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const remaining = Math.max(0, TRIAL_DURATION_DAYS - daysPassed);
    setDaysRemaining(remaining);
  }, [isAuthenticated, user?.id]);
  
  // Only show for authenticated users who haven't dismissed it
  if (!isAuthenticated || dismissed || daysRemaining <= 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <p className="text-xs sm:text-sm font-medium">
          🎉 <strong>Free Trial:</strong> {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining to explore all features
        </p>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate('/dashboard/billing')}
            className="text-xs sm:text-sm underline hover:text-blue-100 transition-colors font-medium whitespace-nowrap"
          >
            Upgrade Now
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="hover:bg-white/20 p-1 rounded transition-colors ml-auto sm:ml-0"
            aria-label="Dismiss banner"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
