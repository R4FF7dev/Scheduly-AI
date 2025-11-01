import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useIntegrationStatus } from "@/hooks/useIntegrationStatus";
import { calendarService } from "@/services/calendar.service";
import { whatsappService } from "@/services/whatsapp.service";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { SUPABASE_CONFIG } from "@/config/supabase.config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Integrations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isCalendarConnected, whatsappStatus, isLoading, refetch } = useIntegrationStatus();
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [showDisconnectDialog, setShowDisconnectDialog] = useState<string | null>(null);

  const handleConnectCalendar = async () => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      const url = `${SUPABASE_CONFIG.url}/functions/v1/calendar-connect`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        },
        body: JSON.stringify({ user_id: user.id })
      });
      
      const data = await response.json();
      
      if (!data.authUrl) {
        throw new Error('Connection failed');
      }
      
      window.location.replace(data.authUrl);
    } catch (error: any) {
      toast.error("Failed to connect calendar", {
        description: error.message
      });
    }
  };

  const handleConnectWhatsApp = () => {
    navigate('/dashboard/onboarding?step=whatsapp');
  };

  const handleDisconnect = async (integration: string) => {
    setDisconnecting(integration);
    try {
      if (integration === 'calendar') {
        await calendarService.disconnect();
        toast.success("Calendar disconnected successfully");
      } else if (integration === 'whatsapp') {
        await whatsappService.disconnect();
        toast.success("WhatsApp disconnected successfully");
      }
      await refetch();
    } catch (error: any) {
      toast.error(`Failed to disconnect ${integration}`, {
        description: error.message
      });
    } finally {
      setDisconnecting(null);
      setShowDisconnectDialog(null);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const connectedCount = (isCalendarConnected ? 1 : 0) + (whatsappStatus.verified ? 1 : 0);
  const totalCount = 2;

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your calendar and communication tools
          </p>
          <div className="mt-4">
            <Badge variant={connectedCount === totalCount ? "default" : "secondary"}>
              {connectedCount} of {totalCount} integrations connected
            </Badge>
          </div>
        </div>

        {/* Connected Integrations */}
        {(isCalendarConnected || whatsappStatus.verified) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Connected</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {isCalendarConnected && (
                <Card className="animate-fade-up">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Google Calendar</CardTitle>
                          <Badge variant="default" className="mt-1 gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Connected
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription>
                      Your Google Calendar is synced and ready for scheduling
                    </CardDescription>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowDisconnectDialog('calendar')}
                        disabled={disconnecting === 'calendar'}
                      >
                        {disconnecting === 'calendar' ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Disconnecting...</>
                        ) : (
                          'Disconnect'
                        )}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleConnectCalendar}
                      >
                        Reconnect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {whatsappStatus.verified && (
                <Card className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">WhatsApp</CardTitle>
                          <Badge variant="default" className="mt-1 gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Connected & Verified
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription>
                      Receive instant meeting notifications and manage your schedule via WhatsApp
                    </CardDescription>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowDisconnectDialog('whatsapp')}
                      disabled={disconnecting === 'whatsapp'}
                    >
                      {disconnecting === 'whatsapp' ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Disconnecting...</>
                      ) : (
                        'Disconnect'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Available Integrations */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {!isCalendarConnected && (
              <Card className="animate-fade-up border-2 border-dashed">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Google Calendar</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        Not Connected
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>
                    Sync your Google Calendar to manage availability and avoid scheduling conflicts
                  </CardDescription>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Two-way calendar sync
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Automatic conflict detection
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Real-time event updates
                    </li>
                  </ul>
                  <Button className="w-full" onClick={handleConnectCalendar}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Connect Calendar
                  </Button>
                </CardContent>
              </Card>
            )}

            {!whatsappStatus.verified && (
              <Card className="animate-fade-up border-2 border-dashed" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">WhatsApp</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {whatsappStatus.connected ? "Pending Verification" : "Not Connected"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>
                    Connect WhatsApp to receive instant meeting notifications and schedule via chat
                  </CardDescription>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Instant meeting reminders
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      AI-powered scheduling assistant
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Quick meeting confirmations
                    </li>
                  </ul>
                  <Button className="w-full" onClick={handleConnectWhatsApp}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Connect WhatsApp
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Coming Soon Integrations */}
            <Card className="animate-fade-up opacity-60" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Microsoft Calendar</CardTitle>
                    <Badge variant="outline" className="mt-1">Coming Soon</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sync with Outlook and Office 365 calendars
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="animate-fade-up opacity-60" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Apple Calendar</CardTitle>
                    <Badge variant="outline" className="mt-1">Coming Soon</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Integrate with iCloud Calendar
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mt-8 bg-gradient-to-br from-primary/5 to-accent/5 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <CardTitle className="text-lg">Need Help?</CardTitle>
                <CardDescription className="mt-1">
                  Having trouble connecting your integrations? Visit our support page or contact us for assistance.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => navigate('/dashboard/support')}>
              Go to Support
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Disconnect Confirmation Dialog */}
      <AlertDialog open={!!showDisconnectDialog} onOpenChange={(open) => !open && setShowDisconnectDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect {showDisconnectDialog === 'calendar' ? 'Calendar' : 'WhatsApp'}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will stop syncing your {showDisconnectDialog === 'calendar' ? 'calendar events' : 'WhatsApp notifications'}. 
              You can reconnect anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => showDisconnectDialog && handleDisconnect(showDisconnectDialog)}>
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Integrations;
