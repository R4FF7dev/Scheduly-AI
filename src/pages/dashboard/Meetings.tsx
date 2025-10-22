import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, Filter, Plus, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkTrialStatus, TrialStatus } from "@/utils/trial";

const meetings = [
  {
    id: 1,
    title: "Product Strategy Review",
    date: "2024-01-15",
    time: "2:00 PM",
    attendees: ["Sarah J.", "Mike T.", "Alex K."],
    status: "confirmed",
    type: "internal",
  },
  {
    id: 2,
    title: "Client Presentation",
    date: "2024-01-16",
    time: "10:00 AM",
    attendees: ["John D.", "Emma W."],
    status: "confirmed",
    type: "external",
  },
  {
    id: 3,
    title: "Team Standup",
    date: "2024-01-16",
    time: "3:00 PM",
    attendees: ["Team"],
    status: "pending",
    type: "internal",
  },
  {
    id: 4,
    title: "Q1 Planning Meeting",
    date: "2024-01-17",
    time: "9:00 AM",
    attendees: ["Leadership Team"],
    status: "confirmed",
    type: "internal",
  },
];

const Meetings = () => {
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

  const handleNewMeeting = () => {
    if (!trialStatus?.isTrialActive && !trialStatus?.hasActiveSubscription) {
      navigate('/dashboard/billing');
    } else {
      // TODO: Open new meeting dialog
      console.log('Create new meeting');
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {!checkingTrial && !trialStatus?.isTrialActive && !trialStatus?.hasActiveSubscription && (
          <Alert className="mb-6 border-red-500 bg-red-50 animate-fade-up">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Your free trial has ended. Please upgrade to create new meetings.
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

        <div className="flex items-center justify-between mb-8 animate-fade-up">
          <div>
            <h1 className="text-3xl font-bold mb-2">Meetings</h1>
            <p className="text-muted-foreground">Manage all your meetings in one place</p>
          </div>
          <Button 
            size="lg" 
            variant="hero" 
            className="gap-2"
            onClick={handleNewMeeting}
            disabled={!checkingTrial && !trialStatus?.isTrialActive && !trialStatus?.hasActiveSubscription}
          >
            <Plus className="w-5 h-5" />
            New Meeting
          </Button>
        </div>

        <div className="flex gap-4 mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search meetings..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Calendar View
          </Button>
        </div>

        <div className="space-y-4">
          {meetings.map((meeting, index) => (
            <Card 
              key={meeting.id}
              className="shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${0.2 + index * 0.05}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{meeting.title}</h3>
                      <Badge variant={meeting.type === "external" ? "default" : "secondary"}>
                        {meeting.type}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={meeting.status === "confirmed" ? "border-green-500 text-green-600" : "border-yellow-500 text-yellow-600"}
                      >
                        {meeting.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {meeting.date} at {meeting.time}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Attendees:</span>
                      <div className="flex -space-x-2">
                        {meeting.attendees.slice(0, 3).map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-white" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {meeting.attendees.join(", ")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="ghost" size="sm">Reschedule</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Meetings;
