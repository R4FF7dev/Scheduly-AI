import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Mail, BookOpen, Video } from "lucide-react";

const resources = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides and tutorials",
    action: "Browse Docs",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Learn through step-by-step videos",
    action: "Watch Videos",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageSquare,
    title: "Community Forum",
    description: "Connect with other users",
    action: "Join Forum",
    color: "from-cyan-500 to-green-500",
  },
];

const Support = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Support</h1>
          <p className="text-muted-foreground">Get help and find resources</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {resources.map((resource, index) => (
            <Card 
              key={index}
              className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <resource.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <Button variant="outline" className="w-full">
                  {resource.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-lg animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-6 h-6 text-primary" />
              <CardTitle>Contact Support</CardTitle>
            </div>
            <CardDescription>
              Our team typically responds within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Describe your issue or question..." 
                  className="min-h-[150px]"
                />
              </div>
              <Button size="lg" variant="hero" className="w-full md:w-auto">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-8 shadow-lg animate-fade-up border-2 border-primary/20" style={{ animationDelay: "0.5s" }}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg flex-shrink-0">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-muted-foreground">
                  Chat with our AI assistant for instant answers to common questions
                </p>
              </div>
              <Button size="lg" variant="hero">
                Start Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Support;
