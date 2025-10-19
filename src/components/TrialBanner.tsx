import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useState } from 'react';

export const TrialBanner = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);
  
  // Only show for authenticated users who haven't dismissed it
  if (!isAuthenticated || dismissed) return null;

  // TODO: Calculate actual days remaining from user.trial_end_date
  const daysRemaining = 14;

  if (daysRemaining <= 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm font-medium">
          🎉 <strong>Free Trial:</strong> {daysRemaining} days remaining to explore all features
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/billing')}
            className="text-sm underline hover:text-blue-100 transition-colors font-medium"
          >
            Upgrade Now
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
