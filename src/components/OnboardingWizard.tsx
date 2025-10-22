import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MessageSquare, CheckCircle, ArrowLeft, Settings, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { whatsappService } from "@/services/whatsapp.service";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export const OnboardingWizard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  // Guard: Redirect if not authenticated
  if (!user) {
    navigate('/auth');
    return null;
  }
  
  const [userName, setUserName] = useState<string>("");
  
  // Determine initial step from query params
  const queryStep = searchParams.get('step');
  const getInitialStep = () => {
    if (queryStep === 'whatsapp') return 2;
    if (queryStep === '2') return 2;
    return 1;
  };
  
  const [step, setStep] = useState(getInitialStep());
  const [loading, setLoading] = useState(false);
  
  // Step 2: WhatsApp
  const [phoneNumber, setPhoneNumber] = useState("");
  
  // Step 3: Verification
  const [verificationCode, setVerificationCode] = useState("");
  const [codeExpiry, setCodeExpiry] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);
  
  // Step 4: Preferences
  const [meetingDuration, setMeetingDuration] = useState("30");
  const [bufferTime, setBufferTime] = useState("15");
  const [timezone, setTimezone] = useState("");

  // Get user info on mount
  useEffect(() => {
    if (user) {
      setUserName(user.name || user.email?.split('@')[0] || "");
    }
    
    // Auto-detect timezone
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, [user]);

  // Code expiry timer
  useEffect(() => {
    if (step === 3 && codeExpiry) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, Math.floor((codeExpiry - Date.now()) / 1000));
        setRemainingTime(remaining);
        
        if (remaining === 0) {
          clearInterval(interval);
          toast({
            title: "Code Expired",
            description: "Please request a new verification code",
            variant: "destructive"
          });
        }
      }, 1000);
      
      // Set initial value immediately
      setRemainingTime(Math.max(0, Math.floor((codeExpiry - Date.now()) / 1000)));
      
      return () => clearInterval(interval);
    }
  }, [step, codeExpiry]);

  const handleConnectCalendar = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://n8n.schedulyai.com/webhook/calendar/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to connect calendar');
      }
      
      if (data.authUrl) {
        // Redirect to Google OAuth
        window.location.href = data.authUrl;
      } else {
        // Already connected
        await updateIntegrationStatus('calendar_connected', true);
        setStep(2);
      }
    } catch (error: any) {
      console.error('Calendar connection error:', error);
      toast({
        title: "Calendar Connection Failed",
        description: error.message || "Unable to connect calendar. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWhatsApp = async () => {
    // Add basic E.164 validation
    if (!phoneNumber || !phoneNumber.startsWith('+')) {
      toast({
        title: "Invalid phone number",
        description: "Phone number must start with + and country code (e.g., +1234567890)",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await whatsappService.connect(phoneNumber, user.id);
      
      if (response.success) {
        toast({
          title: "Code sent!",
          description: `Check your WhatsApp at ${phoneNumber}`,
        });
        
        // Set code expiry to 10 minutes from now
        setCodeExpiry(Date.now() + 10 * 60 * 1000);
        setStep(3);
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyWhatsApp = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await whatsappService.verify(verificationCode, user.id);
      
      if (response.success) {
        await updateIntegrationStatus('whatsapp_connected', true);
        
        toast({
          title: "Verified!",
          description: "WhatsApp connected successfully"
        });
        
        setStep(4);
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    await handleConnectWhatsApp();
  };

  const handleCompleteSetup = async () => {
    setLoading(true);
    try {
      // Save preferences
      const { error: prefsError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          default_meeting_duration: parseInt(meetingDuration),
          buffer_time: parseInt(bufferTime),
          timezone: timezone
        });

      if (prefsError) throw prefsError;

      // Update integrations status
      const { error: integrationsError } = await supabase
        .from('user_integrations')
        .upsert({
          user_id: user.id,
          onboarding_completed: true,
          onboarding_step: 4
        });

      if (integrationsError) throw integrationsError;

      toast({
        title: "Setup Complete! 🎉",
        description: "Welcome to Scheduly AI"
      });

      // Dispatch event to signal onboarding completion
      window.dispatchEvent(new CustomEvent('onboarding-completed'));
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Setup completion error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateIntegrationStatus = async (field: string, value: boolean) => {
    await supabase
      .from('user_integrations')
      .upsert({
        user_id: user.id,
        [field]: value,
        onboarding_step: step
      });
  };

  const progress = (step / 4) * 100;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4 relative">
      <Button
        variant="ghost"
        className="absolute top-6 left-6 gap-2 z-20"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {step > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setStep(step - 1)}
                    disabled={loading}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <CardTitle>Setup Your Account</CardTitle>
              </div>
              <span className="text-sm text-muted-foreground">Step {step} of 4</span>
            </div>
            <Progress value={progress} className="mb-4" />
            
            {/* Progress circles */}
            <div className="flex justify-between items-center mb-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    s < step ? 'bg-primary text-primary-foreground' :
                    s === step ? 'bg-primary/20 text-primary border-2 border-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {s < step ? <CheckCircle className="h-5 w-5" /> : s}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {s === 1 && 'Calendar'}
                    {s === 2 && 'Phone'}
                    {s === 3 && 'Verify'}
                    {s === 4 && 'Preferences'}
                  </span>
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Calendar */}
            {step === 1 && (
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <Calendar className="h-20 w-20 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome{userName && `, ${userName}`}! 👋
                  </h2>
                  <CardDescription className="text-base">
                    Let's connect your Google Calendar to start managing your meetings
                  </CardDescription>
                </div>
                <div className="bg-muted p-4 rounded-lg text-sm text-left">
                  <p className="font-semibold mb-2">Why we need this:</p>
                  <p className="text-muted-foreground">
                    We'll sync your calendar to automatically schedule meetings and avoid conflicts
                  </p>
                </div>
                <Button 
                  onClick={handleConnectCalendar} 
                  size="lg" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Connect Google Calendar
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Step 2: WhatsApp Phone */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <MessageSquare className="h-20 w-20 text-primary" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Connect WhatsApp</h2>
                  <CardDescription className="text-base">
                    Enter your phone number to receive notifications
                  </CardDescription>
                </div>
                <div className="bg-muted p-4 rounded-lg text-sm">
                  <p className="font-semibold mb-2">Why we need this:</p>
                  <p className="text-muted-foreground">
                    Get instant WhatsApp notifications for meeting confirmations and reminders
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={phoneNumber}
                      onChange={(value) => setPhoneNumber(value || "")}
                      className="phone-input"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <Button 
                    onClick={handleConnectWhatsApp} 
                    size="lg" 
                    className="w-full"
                    disabled={loading || !phoneNumber || phoneNumber.length < 10}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Verification Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Verification */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <CheckCircle className="h-20 w-20 text-primary" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Verify Your Number</h2>
                  <CardDescription className="text-base">
                    Enter the 6-digit code sent to {phoneNumber}
                  </CardDescription>
                </div>
                {remainingTime > 0 && (
                  <div className="text-center text-sm text-muted-foreground">
                    Code expires in {minutes}:{seconds.toString().padStart(2, '0')}
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Verification Code</label>
                    <Input
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      className="text-center text-2xl tracking-widest"
                    />
                  </div>
                  <Button 
                    onClick={handleVerifyWhatsApp} 
                    size="lg" 
                    className="w-full"
                    disabled={loading || verificationCode.length !== 6}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Code'
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleResendCode}
                    className="w-full"
                    disabled={loading}
                  >
                    Resend Code
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <Settings className="h-20 w-20 text-primary" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Set Your Preferences</h2>
                  <CardDescription className="text-base">
                    Customize your meeting defaults
                  </CardDescription>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Default Meeting Duration
                    </label>
                    <Select value={meetingDuration} onValueChange={setMeetingDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Buffer Time Between Meetings
                    </label>
                    <Select value={bufferTime} onValueChange={setBufferTime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No buffer</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Timezone
                    </label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        <SelectItem value="America/New_York">America/New_York (EST/EDT)</SelectItem>
                        <SelectItem value="America/Chicago">America/Chicago (CST/CDT)</SelectItem>
                        <SelectItem value="America/Denver">America/Denver (MST/MDT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</SelectItem>
                        <SelectItem value="America/Anchorage">America/Anchorage (AKST/AKDT)</SelectItem>
                        <SelectItem value="Pacific/Honolulu">Pacific/Honolulu (HST)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT/BST)</SelectItem>
                        <SelectItem value="Europe/Paris">Europe/Paris (CET/CEST)</SelectItem>
                        <SelectItem value="Europe/Berlin">Europe/Berlin (CET/CEST)</SelectItem>
                        <SelectItem value="Europe/Rome">Europe/Rome (CET/CEST)</SelectItem>
                        <SelectItem value="Europe/Madrid">Europe/Madrid (CET/CEST)</SelectItem>
                        <SelectItem value="Europe/Amsterdam">Europe/Amsterdam (CET/CEST)</SelectItem>
                        <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="Asia/Singapore">Asia/Singapore (SGT)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                        <SelectItem value="Asia/Shanghai">Asia/Shanghai (CST)</SelectItem>
                        <SelectItem value="Asia/Hong_Kong">Asia/Hong_Kong (HKT)</SelectItem>
                        <SelectItem value="Australia/Sydney">Australia/Sydney (AEDT/AEST)</SelectItem>
                        <SelectItem value="Australia/Melbourne">Australia/Melbourne (AEDT/AEST)</SelectItem>
                        <SelectItem value="Pacific/Auckland">Pacific/Auckland (NZDT/NZST)</SelectItem>
                        <SelectItem value="America/Toronto">America/Toronto (EST/EDT)</SelectItem>
                        <SelectItem value="America/Vancouver">America/Vancouver (PST/PDT)</SelectItem>
                        <SelectItem value="America/Sao_Paulo">America/Sao_Paulo (BRT)</SelectItem>
                        <SelectItem value="America/Mexico_City">America/Mexico_City (CST/CDT)</SelectItem>
                        <SelectItem value="Africa/Cairo">Africa/Cairo (EET)</SelectItem>
                        <SelectItem value="Africa/Johannesburg">Africa/Johannesburg (SAST)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Auto-detected: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleCompleteSetup} 
                    size="lg" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Complete Setup
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
