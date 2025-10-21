import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ConnectedDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 upcoming, 1 completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WhatsApp Requests</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Pending scheduling</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Team Standup</h4>
                <p className="text-sm text-muted-foreground">Today at 10:00 AM</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Client Meeting</h4>
                <p className="text-sm text-muted-foreground">Today at 2:00 PM</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Project Review</h4>
                <p className="text-sm text-muted-foreground">Tomorrow at 11:00 AM</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/dashboard/meetings')} 
            className="w-full mt-4" 
            variant="outline"
          >
            View All Meetings
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button 
              onClick={() => navigate('/dashboard/meetings')} 
              className="h-auto flex-col items-start p-4"
              variant="outline"
            >
              <Calendar className="h-5 w-5 mb-2" />
              <span className="font-semibold">Schedule a Meeting</span>
              <span className="text-xs text-muted-foreground">Create a new meeting</span>
            </Button>
            <Button 
              onClick={() => navigate('/dashboard/settings')} 
              className="h-auto flex-col items-start p-4"
              variant="outline"
            >
              <MessageCircle className="h-5 w-5 mb-2" />
              <span className="font-semibold">WhatsApp Status</span>
              <span className="text-xs text-muted-foreground">Check your bot connection</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
