import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { stripeService } from "@/services/stripe.service";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "€29",
    priceId: "price_starter", // Replace with actual Stripe price ID
    description: "Perfect for individuals",
    features: [
      "20 meetings/month",
      "WhatsApp bot integration",
      "Basic meeting summaries",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "€49",
    priceId: "price_professional", // Replace with actual Stripe price ID
    description: "Most popular choice",
    features: [
      "100 meetings/month",
      "All Starter features",
      "Advanced AI summaries with action items",
      "Auto-reschedule when running late",
      "Priority support",
      "Custom meeting templates",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "€99",
    priceId: "price_enterprise", // Replace with actual Stripe price ID
    description: "For power users & teams",
    features: [
      "Unlimited meetings",
      "All Professional features",
      "Multi-user support (up to 5 team members)",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced analytics dashboard",
    ],
    popular: false,
  },
];

export const Pricing = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (!isAuthenticated) {
      navigate('/auth?tab=signup');
      return;
    }

    setLoadingPlan(planName);
    try {
      await stripeService.createCheckoutSession(priceId, planName);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Start with 14 days free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-up flex flex-col ${
                plan.popular 
                  ? "border-primary shadow-xl scale-105" 
                  : "border-border hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg"
                  variant={plan.popular ? "hero" : "default"}
                  onClick={() => handleSubscribe(plan.priceId, plan.name)}
                  disabled={loadingPlan !== null}
                >
                  {loadingPlan === plan.name ? 'Processing...' : 'Start Free Trial'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
};
