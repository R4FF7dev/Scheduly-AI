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
          
          // Create user_integrations if doesn't exist
          const { data: integration, error: integrationError } = await supabase
            .from('user_integrations')
            .select('onboarding_completed, onboarding_step')
            .eq('user_id', session.user.id)
            .single();
          
          // If no integration record, create one
          if (!integration) {
            console.log('📝 Creating user_integrations record...');
            const { error: insertError } = await supabase
              .from('user_integrations')
              .insert({
                user_id: session.user.id,
                onboarding_step: 1,
              });
            
            if (insertError) {
              console.error('Integration insert error:', insertError);
            }
            
            // New user -> onboarding
            navigate('/dashboard/onboarding');
            return;
          }
          
          // Existing user -> check onboarding status
          if (!integration.onboarding_completed) {
            console.log('📋 Redirecting to onboarding...');
            navigate('/dashboard/onboarding');
          } else {
            console.log('🏠 Redirecting to dashboard...');
            navigate('/dashboard');
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
