import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useIntegrationStatus } from "@/hooks/useIntegrationStatus";
import { ConnectedDashboard } from "@/components/dashboard/ConnectedDashboard";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isFullyConnected, isLoading } = useIntegrationStatus();
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Fetch calendar events when fully connected
  useEffect(() => {
    if (isFullyConnected && user?.id) {
      fetchCalendarEvents();
    }
  }, [isFullyConnected, user?.id]);

  const fetchCalendarEvents = async () => {
    if (!user?.id) return;
    
    setLoadingEvents(true);
    try {
      const response = await fetch('https://n8n.schedulyai.com/webhook/calendar/operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          operation: 'list',
          time_min: new Date().toISOString(),
          time_max: new Date(Date.now() + 7*24*60*60*1000).toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch calendar events');
      }

      const data = await response.json();
      setCalendarEvents(data.items || []);
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
      toast.error('Could not load calendar events');
    } finally {
      setLoadingEvents(false);
    }
  };

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
          <div className="space-y-4 md:space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{calendarEvents.length}</div>
                  <p className="text-xs text-muted-foreground">Next 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {calendarEvents.filter(e => {
                      const eventDate = new Date(e.start?.dateTime || e.start?.date);
                      const today = new Date();
                      return eventDate.toDateString() === today.toDateString();
                    }).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Events scheduled</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">WhatsApp Agent</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Active</div>
                  <p className="text-xs text-muted-foreground">Ready to schedule</p>
                </CardContent>
              </Card>
            </div>

            {/* Calendar Events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg md:text-xl">Upcoming Events</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={fetchCalendarEvents}
                  disabled={loadingEvents}
                >
                  {loadingEvents ? 'Refreshing...' : 'Refresh'}
                </Button>
              </CardHeader>
              <CardContent>
                {loadingEvents ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : calendarEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No upcoming events in the next 7 days</p>
                    <Button 
                      onClick={() => window.open('https://wa.me/14155238886?text=Schedule%20a%20meeting%20tomorrow%20at%202pm', '_blank')}
                      className="mt-4"
                      variant="outline"
                    >
                      Schedule via WhatsApp
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {calendarEvents.slice(0, 5).map((event, index) => {
                      const startDate = new Date(event.start?.dateTime || event.start?.date);
                      const isToday = startDate.toDateString() === new Date().toDateString();
                      
                      return (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 md:p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm md:text-base">{event.summary || 'Untitled Event'}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs md:text-sm text-muted-foreground">
                                {startDate.toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })} at {startDate.toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit' 
                                })}
                              </p>
                              {isToday && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Today</span>
                              )}
                            </div>
                            {event.hangoutLink && (
                              <a 
                                href={event.hangoutLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                              >
                                📹 Join Google Meet
                              </a>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full sm:w-auto"
                            onClick={() => window.open(event.htmlLink, '_blank')}
                          >
                            View
                          </Button>
                        </div>
                      );
                    })}
                    {calendarEvents.length > 5 && (
                      <Button 
                        onClick={() => navigate('/dashboard/calendar')} 
                        className="w-full mt-4" 
                        variant="outline"
                      >
                        View All {calendarEvents.length} Events
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test WhatsApp Button */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Test Your WhatsApp Agent</h3>
                    <p className="text-sm text-muted-foreground">
                      Try: "What's on my calendar today?" or "Schedule a meeting tomorrow at 2pm"
                    </p>
                  </div>
                  <Button 
                    onClick={() => window.open('https://wa.me/14155238886', '_blank')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Open WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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

                {/* Quick Start Guide */}
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-center">Quick Start Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-3">
                          1
                        </div>
                        <h4 className="font-semibold mb-2">Connect Calendar</h4>
                        <p className="text-sm text-muted-foreground">
                          Authorize Google access
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-3">
                          2
                        </div>
                        <h4 className="font-semibold mb-2">Link WhatsApp</h4>
                        <p className="text-sm text-muted-foreground">
                          Verify your number
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-3">
                          3
                        </div>
                        <h4 className="font-semibold mb-2">Start Scheduling</h4>
                        <p className="text-sm text-muted-foreground">
                          Message Scheduly AI agent
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;