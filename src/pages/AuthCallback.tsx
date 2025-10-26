import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('🔵 OAuth callback started...');
        
        // Get the session from the URL hash
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        console.log('🟢 Session:', session?.user?.id);
        console.log('🔴 Error:', sessionError);
        
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          console.log('✅ User authenticated:', session.user.email);
          
          const { data: integration } = await supabase
            .from('user_integrations')
            .select('onboarding_completed, onboarding_step')
            .eq('user_id', session.user.id)
            .single();

          // Strict check for completion
          if (integration && integration.onboarding_completed === true) {
            navigate('/dashboard');
          } else {
            navigate('/dashboard/onboarding');
          }
        } else {
          console.log('⚠️ No session found');
          navigate('/auth');
        }
      } catch (error: any) {
        console.error('❌ OAuth callback error:', error);
        setError(error.message);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to complete sign in",
          variant: "destructive"
        });
        
        // Redirect to auth after 3 seconds
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-500 mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
