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
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          console.log('✅ User authenticated:', session.user.email);
          
          // Check onboarding status
          const { data: integration, error: integrationError } = await supabase
            .from('user_integrations')
            .select('onboarding_completed, onboarding_step')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          console.log('📊 Integration:', integration);
          
          // If no integration record, create one
          if (!integration) {
            console.log('📝 Creating user_integrations...');
            await supabase
              .from('user_integrations')
              .insert({
                user_id: session.user.id,
                onboarding_step: 1,
                onboarding_completed: false,
              });
            navigate('/dashboard/onboarding');
            return;
          }
          
          // STRICT CHECK: Only go to dashboard if truly completed
          if (integration.onboarding_completed === true) {
            console.log('🏠 Onboarding complete → Dashboard');
            navigate('/dashboard');
          } else {
            console.log('📋 Onboarding incomplete → Onboarding (step ' + integration.onboarding_step + ')');
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
