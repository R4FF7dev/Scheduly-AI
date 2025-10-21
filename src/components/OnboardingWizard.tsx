import { useState } from 'react';
import { calendarService } from '@/services/calendar.service';
import { whatsappService } from '@/services/whatsapp.service';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const OnboardingWizard = () => {
  const [step, setStep] = useState(1);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConnectCalendar = async () => {
    setLoading(true);
    try {
      const response = await calendarService.connect();
      if (response.authUrl) {
        window.location.href = response.authUrl;
      } else {
        setCalendarConnected(true);
        setStep(2);
      }
    } catch (error) {
      alert('Failed to connect calendar: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWhatsApp = async () => {
    setLoading(true);
    try {
      const response = await whatsappService.connect(whatsappNumber);
      console.log('WhatsApp connect response:', response);
      
      toast({
        title: "Verification code sent!",
        description: `A verification code has been sent to ${whatsappNumber} via WhatsApp.`,
      });
      
      setStep(3);
    } catch (error) {
      console.error('WhatsApp connection error:', error);
      toast({
        title: "Connection failed",
        description: (error as Error).message || "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyWhatsApp = async () => {
    setLoading(true);
    try {
      const response = await whatsappService.verify(verificationCode, whatsappNumber);
      console.log('WhatsApp verify response:', response);
      
      toast({
        title: "WhatsApp verified!",
        description: "Your WhatsApp number has been successfully verified.",
      });
      
      setStep(4);
    } catch (error) {
      console.error('WhatsApp verification error:', error);
      toast({
        title: "Verification failed",
        description: (error as Error).message || "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex justify-between mb-6">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className={`flex items-center ${step >= num ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= num ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {num}
                </div>
                {num < 4 && <div className={`w-16 h-0.5 mx-2 ${step > num ? 'bg-primary' : 'bg-secondary'}`} />}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="text-center">
          {step === 1 && (
            <div className="animate-fade-up">
              <Calendar className="w-20 h-20 mx-auto mb-6 text-primary" />
              <CardTitle className="text-2xl mb-4">Connect Your Google Calendar</CardTitle>
              <CardDescription className="mb-6">
                Allow Scheduly AI to access your calendar to manage meetings
              </CardDescription>
              <Button
                onClick={handleConnectCalendar}
                disabled={loading}
                size="lg"
                className="w-full max-w-xs"
              >
                {loading ? 'Connecting...' : 'Connect Google Calendar'}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <MessageCircle className="w-20 h-20 mx-auto mb-6 text-primary" />
              <CardTitle className="text-2xl mb-4">Connect Your WhatsApp</CardTitle>
              <CardDescription className="mb-6">
                Enter your WhatsApp number to receive scheduling commands
              </CardDescription>
              <Input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+1234567890"
                className="mb-4 max-w-xs mx-auto"
              />
              <Button
                onClick={handleConnectWhatsApp}
                disabled={loading || !whatsappNumber}
                size="lg"
                className="w-full max-w-xs"
              >
                {loading ? 'Sending Code...' : 'Send Verification Code'}
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up">
              <MessageCircle className="w-20 h-20 mx-auto mb-6 text-primary" />
              <CardTitle className="text-2xl mb-4">Verify Your Number</CardTitle>
              <CardDescription className="mb-6">
                Enter the verification code sent to {whatsappNumber}
              </CardDescription>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="123456"
                className="mb-4 max-w-xs mx-auto"
              />
              <Button
                onClick={handleVerifyWhatsApp}
                disabled={loading || !verificationCode}
                size="lg"
                className="w-full max-w-xs"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-up">
              <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
              <CardTitle className="text-2xl mb-4">All Set!</CardTitle>
              <CardDescription className="mb-6">
                Your Scheduly AI is ready to use. Start scheduling meetings via WhatsApp!
              </CardDescription>
              <Button
                onClick={completeOnboarding}
                size="lg"
                className="w-full max-w-xs"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
