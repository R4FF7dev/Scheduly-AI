import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    name: "Total Meetings",
    value: "24",
    change: "+12%",
    icon: Calendar,
    color: "from-purple-500 to-blue-500",
  },
  {
    name: "Upcoming",
    value: "8",
    change: "Next 7 days",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Hours Saved",
    value: "15.5",
    change: "+3.2h",
    icon: TrendingUp,
    color: "from-cyan-500 to-green-500",
  },
  {
    name: "Success Rate",
    value: "98%",
    change: "+2%",
    icon: CheckCircle2,
    color: "from-green-500 to-emerald-500",
  },
];

const upcomingMeetings = [
  {
    title: "Product Strategy Review",
    time: "Today, 2:00 PM",
    attendees: 5,
    status: "confirmed",
  },
  {
    title: "Client Presentation",
    time: "Tomorrow, 10:00 AM",
    attendees: 3,
    status: "confirmed",
  },
  {
    title: "Team Standup",
    time: "Tomorrow, 3:00 PM",
    attendees: 8,
    status: "pending",
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">Here's what's happening with your meetings today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-lg animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Upcoming Meetings</span>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMeetings.map((meeting, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{meeting.title}</h4>
                    <p className="text-sm text-muted-foreground">{meeting.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{meeting.attendees} attendees</span>
                    <div className={`w-2 h-2 rounded-full ${
                      meeting.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle>Recent Summaries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                <h4 className="font-semibold mb-2">Weekly Planning Session</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Discussed Q1 goals, assigned action items to team members, scheduled follow-up for next week.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">3 Action Items</span>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                <h4 className="font-semibold mb-2">Client Onboarding Call</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Introduced team, reviewed project timeline, gathered requirements, set up next milestone review.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">5 Action Items</span>
                  <span className="text-xs text-muted-foreground">5 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 shadow-lg animate-fade-up border-2 border-primary/20" style={{ animationDelay: "0.6s" }}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Usage This Month</h3>
                <p className="text-muted-foreground">You've used 24 out of 100 meetings on your Professional plan</p>
              </div>
              <div className="w-full md:w-48 h-48 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">24%</p>
                    <p className="text-sm text-muted-foreground">Used</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
