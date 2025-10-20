import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Smartphone, Zap, Mail, Video } from "lucide-react";

const integrations = [
  {
    name: "WhatsApp",
    icon: MessageSquare,
    description: "Schedule and manage meetings directly through WhatsApp. Our AI assistant handles all communication seamlessly.",
    status: "Available",
    features: ["Instant scheduling", "Meeting reminders", "Auto-responses", "AI-powered chat"]
  },
  {
    name: "Google Calendar",
    icon: Calendar,
    description: "Sync your meetings automatically with Google Calendar. Real-time updates and conflict detection.",
    status: "Available",
    features: ["Two-way sync", "Conflict detection", "Multiple calendars", "Timezone support"]
  },
  {
    name: "iOS & Android",
    icon: Smartphone,
    description: "Access Scheduly AI on the go with our mobile-optimized experience.",
    status: "Available",
    features: ["Push notifications", "Quick actions", "Offline support", "Native experience"]
  },
  {
    name: "Zapier",
    icon: Zap,
    description: "Connect Scheduly AI with 5,000+ apps through Zapier integration.",
    status: "Coming Soon",
    features: ["Custom workflows", "Automated actions", "Data sync", "Trigger events"]
  },
  {
    name: "Outlook",
    icon: Mail,
    description: "Integrate with Microsoft Outlook and Office 365 for seamless calendar management.",
    status: "Coming Soon",
    features: ["Calendar sync", "Email integration", "Teams support", "Enterprise features"]
  },
  {
    name: "Zoom/Teams",
    icon: Video,
    description: "Automatically create and manage video meeting links for your scheduled meetings.",
    status: "Coming Soon",
    features: ["Auto-generate links", "Meeting recordings", "Participant management", "Integration with calendar"]
  }
];

const Integrations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Integrations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect Scheduly AI with your favorite tools and platforms for a seamless workflow experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {integrations.map((integration, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <integration.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant={integration.status === "Available" ? "default" : "secondary"}>
                    {integration.status}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">{integration.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{integration.description}</p>
                <ul className="space-y-2 mb-4">
                  {integration.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {integration.status === "Available" && (
                  <Button variant="outline" className="w-full">Connect</Button>
                )}
              </Card>
            ))}
          </div>

          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Integration?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking to expand our integration ecosystem. If you need a specific integration for your business, let us know!
            </p>
            <Button size="lg">Request Integration</Button>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Integrations;
