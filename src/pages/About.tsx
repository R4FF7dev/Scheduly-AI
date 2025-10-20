import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Target, Users, Zap, Heart } from "lucide-react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We're on a mission to eliminate scheduling chaos and help professionals focus on what truly matters."
    },
    {
      icon: Users,
      title: "Customer-First",
      description: "Every feature we build starts with understanding our users' needs and challenges."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to create solutions that were previously impossible."
    },
    {
      icon: Heart,
      title: "Simplicity",
      description: "Complex technology should result in simple, intuitive experiences for our users."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Scheduly AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're building the future of meeting management, powered by artificial intelligence and designed for modern professionals.
            </p>
          </div>

          <div className="mb-16">
            <Card className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Scheduly AI was born from a simple observation: professionals waste countless hours every week just trying to schedule meetings. The endless back-and-forth messages, the timezone confusion, the double bookings – it was clear that there had to be a better way.
                </p>
                <p>
                  In 2024, our team of AI experts and productivity enthusiasts came together with a vision: to create an intelligent assistant that could handle all the complexity of meeting scheduling, while being as easy to use as sending a WhatsApp message.
                </p>
                <p>
                  Today, Scheduly AI serves thousands of professionals worldwide, from solo entrepreneurs to large sales teams. We've helped save millions of hours in scheduling time and enabled countless business opportunities through better meeting management.
                </p>
                <p>
                  But we're just getting started. Our roadmap includes exciting new features like video meeting integration, advanced analytics, and multi-language support. We're committed to continuously improving and expanding Scheduly AI based on user feedback and emerging technologies.
                </p>
              </div>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5">
              <h2 className="text-3xl font-bold mb-6">Why Choose Scheduly AI?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">🚀 Proven Results</h3>
                  <p className="text-muted-foreground">
                    Our users report 75% reduction in scheduling time and 30% increase in closed deals.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">🔒 Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Enterprise-grade security with GDPR compliance and end-to-end encryption.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">⚡ Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    AI-powered responses in seconds, not minutes. Schedule meetings instantly via WhatsApp.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">💡 Constantly Improving</h3>
                  <p className="text-muted-foreground">
                    Regular updates and new features based on user feedback and latest AI advancements.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Card className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for feedback, partnerships, and talented individuals who share our vision. Whether you're a potential user, partner, or team member, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="inline-block">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Get in Touch
                  </button>
                </a>
                <a href="/#pricing" className="inline-block">
                  <button className="px-6 py-3 border border-border rounded-lg hover:bg-accent/5 transition-colors">
                    Start Free Trial
                  </button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
