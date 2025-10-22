import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CalendarCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const processCallback = async () => {
      console.log('📅 Calendar OAuth callback received');
      console.log('URL params:', Object.fromEntries(searchParams.entries()));

      // Get parameters from URL
      const callbackStatus = searchParams.get('status');
      const userId = searchParams.get('user_id');
      const error = searchParams.get('error_message');

      // Validate user
      if (!user) {
        console.error('❌ No authenticated user found');
        setStatus('error');
        setErrorMessage('Authentication required');
        setTimeout(() => navigate('/auth'), 2000);
        return;
      }

      // Check if there's an error
      if (callbackStatus === 'error' || error) {
        console.error('❌ Calendar connection failed:', error);
        setStatus('error');
        setErrorMessage(error || 'Failed to connect calendar');
        setTimeout(() => navigate('/dashboard/onboarding'), 3000);
        return;
      }

      // Verify user_id matches (if provided)
      if (userId && userId !== user.id) {
        console.error('❌ User ID mismatch');
        setStatus('error');
        setErrorMessage('User verification failed');
        setTimeout(() => navigate('/dashboard/onboarding'), 2000);
        return;
      }

      // Success case - update integration status
      if (callbackStatus === 'success') {
        try {
          console.log('✅ Calendar connected successfully, updating database...');
          
          const { error: updateError } = await supabase
            .from('user_integrations')
            .upsert({
              user_id: user.id,
              calendar_connected: true,
              onboarding_step: 2,
            });

          if (updateError) {
            console.error('❌ Database update error:', updateError);
            throw updateError;
          }

          console.log('✅ Database updated successfully');
          setStatus('success');

          // Redirect to onboarding step 2 (WhatsApp) after 2 seconds
          setTimeout(() => {
            navigate('/dashboard/onboarding?step=2');
          }, 2000);
        } catch (err: any) {
          console.error('❌ Error processing callback:', err);
          setStatus('error');
          setErrorMessage(err.message || 'Failed to save connection');
          setTimeout(() => navigate('/dashboard/onboarding'), 3000);
        }
      } else {
        // Unknown status
        console.warn('⚠️ Unknown callback status:', callbackStatus);
        setStatus('error');
        setErrorMessage('Invalid callback status');
        setTimeout(() => navigate('/dashboard/onboarding'), 3000);
      }
    };

    // Add timeout protection
    const timeout = setTimeout(() => {
      if (status === 'loading') {
        console.error('❌ Callback processing timeout');
        setStatus('error');
        setErrorMessage('Connection timeout');
        setTimeout(() => navigate('/dashboard/onboarding'), 2000);
      }
    }, 10000); // 10 second timeout

    processCallback();

    return () => clearTimeout(timeout);
  }, [searchParams, user, navigate, status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === 'loading' && (
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
            )}
            {status === 'success' && (
              <CheckCircle className="h-16 w-16 text-green-500" />
            )}
            {status === 'error' && (
              <XCircle className="h-16 w-16 text-destructive" />
            )}
          </div>
          <CardTitle>
            {status === 'loading' && 'Completing Calendar Connection...'}
            {status === 'success' && 'Calendar Connected!'}
            {status === 'error' && 'Connection Failed'}
          </CardTitle>
          <CardDescription>
            {status === 'loading' && 'Please wait while we set up your calendar'}
            {status === 'success' && 'Redirecting to next step...'}
            {status === 'error' && errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === 'loading' && (
            <p className="text-sm text-muted-foreground">
              This should only take a moment
            </p>
          )}
          {status === 'success' && (
            <p className="text-sm text-muted-foreground">
              Your Google Calendar is now connected successfully
            </p>
          )}
          {status === 'error' && (
            <Button
              onClick={() => navigate('/dashboard/onboarding')}
              className="mt-4"
            >
              Return to Onboarding
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarCallback;
