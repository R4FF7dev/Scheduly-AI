import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useIntegrationStatus } from "@/hooks/useIntegrationStatus";
import { ConnectedDashboard } from "@/components/dashboard/ConnectedDashboard";
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isFullyConnected, isLoading } = useIntegrationStatus();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <div className="mb-6 md:mb-8 animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {isFullyConnected 
              ? "Here's your dashboard overview" 
              : "Get started by connecting your integrations"}
          </p>
        </div>

        {/* Trial Status Banner */}
        <Card className="mb-6 md:mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg animate-fade-up">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-1">🎉 Free Trial Active</h3>
                <p className="text-sm md:text-base text-blue-700">14 days remaining - Enjoy unlimited features</p>
              </div>
              <Button onClick={() => navigate('/dashboard/billing')} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                Upgrade Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Conditional Dashboard Content */}
        {isFullyConnected ? (
          <ConnectedDashboard />
        ) : (
          <Card className="shadow-lg animate-fade-up">
            <CardContent className="p-6 md:p-12 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Get Started with Scheduly AI</h2>
                <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
                  Connect your Google Calendar and WhatsApp to start managing meetings with AI
                </p>

                <div className="grid gap-4 md:grid-cols-2 md:gap-6 mb-6 md:mb-8">
                  <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
                    <CardContent className="p-6">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                      <h3 className="font-semibold mb-2">Google Calendar</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sync your meetings and let AI manage your schedule
                      </p>
                      <Button onClick={() => navigate('/dashboard/onboarding')} className="w-full" variant="outline">
                        Connect Calendar
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
                    <CardContent className="p-6">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                      <h3 className="font-semibold mb-2">Scheduly AI agent</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Schedule meetings via WhatsApp messages
                      </p>
                      <Button onClick={() => navigate('/dashboard/onboarding?step=whatsapp')} className="w-full" variant="outline">
                        Connect WhatsApp
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-secondary/50 rounded-lg p-4 md:p-6">
                  <h3 className="font-semibold mb-3 text-sm md:text-base">Quick Start Guide</h3>
                  <div className="grid gap-4 md:grid-cols-3 text-left">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <p className="text-sm font-medium">Connect Calendar</p>
                        <p className="text-xs text-muted-foreground">Authorize Google access</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <p className="text-sm font-medium">Link WhatsApp</p>
                        <p className="text-xs text-muted-foreground">Verify your number</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <p className="text-sm font-medium">Start Scheduling</p>
                        <p className="text-xs text-muted-foreground">Message the bot</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
export default Dashboard;