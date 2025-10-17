import { MessageSquare, CalendarPlus, Video, Mail } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Connect",
    description: "Link your WhatsApp and Google Calendar in seconds",
    step: "01",
  },
  {
    icon: CalendarPlus,
    title: "Schedule",
    description: "Text your meeting details via WhatsApp",
    step: "02",
  },
  {
    icon: Video,
    title: "Meet",
    description: "Get automatic reminders and join with one tap",
    step: "03",
  },
  {
    icon: Mail,
    title: "Review",
    description: "Receive AI-generated summaries via email",
    step: "04",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How Scheduly AI Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your meeting management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-accent/30" />
              )}
              
              <div className="relative bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg">
                  {step.step}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
