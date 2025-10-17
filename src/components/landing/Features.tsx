import { Calendar, Bell, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered calendar management via WhatsApp. Just text your meeting details and let AI handle the rest.",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: Bell,
    title: "Intelligent Notifications",
    description: "Automatic meeting reminders and conflict resolution. Never miss an important meeting again.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Auto Summaries",
    description: "AI-generated meeting notes sent directly to your email. Keep everyone aligned effortlessly.",
    color: "from-cyan-500 to-green-500",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Master Meetings
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to save you time and eliminate scheduling headaches
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-up bg-gradient-to-br from-card to-card/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
