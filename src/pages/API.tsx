import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Key, Book, Shield, Zap, Users } from "lucide-react";

const API = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Code,
      title: "RESTful API",
      description: "Clean, modern REST API with predictable resource-oriented URLs and JSON responses."
    },
    {
      icon: Key,
      title: "API Keys",
      description: "Secure authentication using API keys with customizable permissions and scopes."
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive documentation with code examples in multiple programming languages."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime SLA and automatic backups."
    },
    {
      icon: Zap,
      title: "Rate Limiting",
      description: "Fair usage policies with generous rate limits that scale with your needs."
    },
    {
      icon: Users,
      title: "Webhooks",
      description: "Real-time event notifications to keep your systems in sync automatically."
    }
  ];

  const endpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/meetings",
      description: "Create a new meeting"
    },
    {
      method: "GET",
      endpoint: "/api/v1/meetings",
      description: "List all meetings"
    },
    {
      method: "GET",
      endpoint: "/api/v1/meetings/:id",
      description: "Get meeting details"
    },
    {
      method: "PUT",
      endpoint: "/api/v1/meetings/:id",
      description: "Update a meeting"
    },
    {
      method: "DELETE",
      endpoint: "/api/v1/meetings/:id",
      description: "Cancel a meeting"
    },
    {
      method: "GET",
      endpoint: "/api/v1/availability",
      description: "Check availability"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4">Developer Tools</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Scheduly AI API
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build powerful scheduling solutions with our comprehensive API. Integrate Scheduly AI into your applications, workflows, and services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                  <Badge variant={endpoint.method === "GET" ? "outline" : "default"} className="w-20 justify-center">
                    {endpoint.method}
                  </Badge>
                  <code className="flex-1 font-mono text-sm">{endpoint.endpoint}</code>
                  <span className="text-sm text-muted-foreground hidden md:block">{endpoint.description}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Quick Start Example</h2>
            <p className="text-muted-foreground mb-4">Create a meeting with a simple API call:</p>
            <div className="bg-secondary/20 p-6 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono">
{`curl -X POST https://api.schedulyai.com/v1/meetings \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Product Demo",
    "duration": 30,
    "participant_email": "client@example.com",
    "preferred_times": ["2025-02-01T10:00:00Z", "2025-02-01T14:00:00Z"]
  }'`}
              </pre>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">1.</span>
                  <span>Sign up for a Scheduly AI account</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">2.</span>
                  <span>Generate your API key in settings</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">3.</span>
                  <span>Read the documentation</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">4.</span>
                  <span>Make your first API call</span>
                </li>
              </ol>
              <Button className="w-full mt-6">View Documentation</Button>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4">API Pricing</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Free Tier</span>
                  <span className="font-semibold">1,000 calls/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Starter</span>
                  <span className="font-semibold">10,000 calls/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Professional</span>
                  <span className="font-semibold">100,000 calls/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Enterprise</span>
                  <span className="font-semibold">Unlimited</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">View Pricing Details</Button>
            </Card>
          </div>

          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our developer support team is here to help you integrate Scheduly AI into your applications. Get in touch for technical assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Contact Developer Support</Button>
              <Button size="lg" variant="outline">Join Developer Discord</Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default API;
