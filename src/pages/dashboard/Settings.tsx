import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Calendar, MessageSquare, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkTrialStatus, TrialStatus } from "@/utils/trial";

const Settings = () => {
  const navigate = useNavigate();
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
  const [checkingTrial, setCheckingTrial] = useState(true);

  useEffect(() => {
    const checkTrial = async () => {
      const status = await checkTrialStatus();
      setTrialStatus(status);
      setCheckingTrial(false);
    };
    checkTrial();
  }, []);

  const handleIntegrationAction = () => {
    if (!trialStatus?.isTrialActive && !trialStatus?.hasActiveSubscription) {
      navigate('/dashboard/billing');
    }
  };
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and integrations</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Sarah" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Johnson" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="sarah@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="America/New_York" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            {!checkingTrial && !trialStatus?.isTrialActive && !trialStatus?.hasActiveSubscription && (
              <Alert className="border-red-500 bg-red-50 animate-fade-up">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Your free trial has ended. Please upgrade to connect integrations.
                  <Button 
                    onClick={() => navigate('/dashboard/billing')} 
                    className="ml-4"
                    size="sm"
                  >
                    Upgrade Now
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Google Calendar</CardTitle>
                <CardDescription>Connect your Google Calendar to sync meetings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg border border-green-200 bg-green-50">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-semibold flex items-center gap-2">
                        Connected
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </p>
                      <p className="text-sm text-muted-foreground">sarah@example.com</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={handleIntegrationAction}
                    disabled={!trialStatus?.isTrialActive && !trialStatus?.hasActiveSubscription}
                  >
                    Disconnect
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle>WhatsApp Integration</CardTitle>
                <CardDescription>Connect your WhatsApp for AI scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg border border-green-200 bg-green-50">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-semibold flex items-center gap-2">
                        Connected
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={handleIntegrationAction}
                    disabled={!trialStatus?.isTrialActive && !trialStatus?.hasActiveSubscription}
                  >
                    Disconnect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive meeting summaries via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">WhatsApp Reminders</p>
                    <p className="text-sm text-muted-foreground">Get meeting reminders on WhatsApp</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Conflict Alerts</p>
                    <p className="text-sm text-muted-foreground">Alert me about scheduling conflicts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Meeting Defaults</CardTitle>
                <CardDescription>Set your default meeting preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Default Meeting Duration</Label>
                  <Input id="duration" defaultValue="30 minutes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buffer">Buffer Time Between Meetings</Label>
                  <Input id="buffer" defaultValue="15 minutes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminder">Default Reminder Time</Label>
                  <Input id="reminder" defaultValue="15 minutes before" />
                </div>
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
