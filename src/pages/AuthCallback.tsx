import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase automatically handles the OAuth callback
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          // Check if user needs onboarding
          const { data: integration } = await supabase
            .from('user_integrations')
            .select('onboarding_completed')
            .eq('user_id', session.user.id)
            .single();
          
          if (!integration || !integration.onboarding_completed) {
            navigate('/dashboard/onboarding');
          } else {
            navigate('/dashboard');
          }
        } else {
          navigate('/auth');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/auth');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
