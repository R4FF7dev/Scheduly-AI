import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, AlertCircle, Loader2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/services/api.service";
import { stripeService } from "@/services/stripe.service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { STRIPE_PRICES } from '@/config/api.config';

interface Subscription {
  plan_name: string;
  status: string;
  meetings_limit: number;
  meetings_used: number;
  current_period_start: string;
  current_period_end: string;
  stripe_subscription_id: string | null;
  created_at?: string;
}

const plans = [
  {
    name: "Starter",
    price: "€29",
    priceId: STRIPE_PRICES.starter,
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
    priceId: STRIPE_PRICES.professional,
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
    priceId: STRIPE_PRICES.enterprise,
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

const Billing = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [managingBilling, setManagingBilling] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  // Calculate trial days from subscription creation date
  const getTrialDaysRemaining = () => {
    if (!subscription?.created_at) return 14;
    const created = new Date(subscription.created_at);
    const now = new Date();
    const daysPassed = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, 14 - daysPassed);
  };

  const trialDaysRemaining = getTrialDaysRemaining();
  const isTrialExpired = trialDaysRemaining === 0 && !subscription?.stripe_subscription_id;

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get user email from Supabase auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        throw new Error('No user email found');
      }
      
      const data = await api.get(`/user/subscription?email=${encodeURIComponent(user.email)}`);
      setSubscription(data);
    } catch (err: any) {
      console.error('Failed to fetch subscription:', err);
      // Treat 404 as trial user (not an error)
      if (err?.response?.status === 404) {
        setSubscription(null); // Free trial user
      } else {
        // Only show error for actual failures (500, network errors)
        setError('Failed to load subscription data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    try {
      setManagingBilling(true);
      
      // Get user email from Supabase auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        throw new Error('No user email found');
      }
      
      await stripeService.createPortalSession(user.email);
    } catch (err) {
      console.error('Failed to open portal:', err);
      alert('Failed to open billing portal. Please try again.');
    } finally {
      setManagingBilling(false);
    }
  };

  const handleSubscribe = async (priceId: string, planName: string) => {
    setCheckoutLoading(planName);
    try {
      await stripeService.createCheckoutSession(priceId, planName);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const getPlanPrice = (planName: string) => {
    const prices: Record<string, string> = {
      Starter: "€29",
      Professional: "€49",
      Enterprise: "€99"
    };
    return prices[planName] || "€0";
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-500">Active</Badge>;
    }
    if (status === 'trialing') {
      return <Badge className="bg-blue-500">Trial</Badge>;
    }
    if (status === 'cancelled') {
      return <Badge variant="destructive">Cancelled</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
          <p className="text-muted-foreground">Manage your subscription, billing, and usage</p>
        </div>

        {/* Trial Expired Alert */}
        {isTrialExpired && (
          <Alert className="mb-6 border-red-500 bg-red-50 animate-fade-up">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Your free trial has ended. Please choose a plan below to continue using Scheduly AI.
            </AlertDescription>
          </Alert>
        )}

        {/* Trial Active Banner */}
        {trialDaysRemaining > 0 && !subscription?.stripe_subscription_id && (
          <Alert className="mb-6 border-blue-500 bg-blue-50 animate-fade-up">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              🎉 Free trial: {trialDaysRemaining} days remaining. Choose a plan below to continue after your trial.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6 animate-fade-up">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Current Plan Status Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <Card className="lg:col-span-2 shadow-lg animate-fade-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {subscription?.plan_name || 'Free Trial'}
                  </CardTitle>
                  <CardDescription>
                    {subscription?.plan_name 
                      ? `${subscription.meetings_limit} meetings per month` 
                      : '14-day trial with limited features'}
                  </CardDescription>
                </div>
                {subscription?.status && getStatusBadge(subscription.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {subscription?.plan_name ? getPlanPrice(subscription.plan_name) : '€0'}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>

              {subscription?.current_period_end && (
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    Current period ends: {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                </div>
              )}

              {subscription?.stripe_subscription_id && (
                <Button 
                  onClick={handleManageBilling} 
                  className="w-full"
                  disabled={managingBilling}
                >
                  {managingBilling ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Manage Billing & Invoices'
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="shadow-lg animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Usage This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Meetings</span>
                    <span className="text-sm font-medium">
                      {subscription?.meetings_used || 0} / {subscription?.meetings_limit || '∞'}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                      style={{
                        width: subscription?.meetings_limit
                          ? `${Math.min((subscription.meetings_used / subscription.meetings_limit) * 100, 100)}%`
                          : '0%'
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Plans Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 animate-fade-up">
            {subscription?.stripe_subscription_id ? 'Change Your Plan' : 'Choose Your Plan'}
          </h2>
          <p className="text-muted-foreground mb-6 animate-fade-up">
            {subscription?.stripe_subscription_id 
              ? 'Upgrade or downgrade your subscription anytime' 
              : 'Start with a 14-day free trial. No credit card required.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => {
              const isCurrentPlan = subscription?.plan_name === plan.name;
              return (
                <Card 
                  key={index}
                  className={`relative border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-up flex flex-col ${
                    plan.popular 
                      ? "border-primary shadow-xl" 
                      : "border-border hover:border-primary/50"
                  } ${isCurrentPlan ? "bg-primary/5" : ""}`}
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 shadow-lg">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-4 right-4">
                      <Badge variant="secondary" className="px-4 py-1 shadow-lg">
                        Current Plan
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
                      disabled={isCurrentPlan || checkoutLoading !== null}
                    >
                      {checkoutLoading === plan.name ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : isCurrentPlan ? (
                        'Current Plan'
                      ) : (
                        subscription?.stripe_subscription_id ? 'Switch to This Plan' : 'Start Free Trial'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Payment Method - Only show if subscription exists */}
        {subscription?.stripe_subscription_id && (
          <Card className="shadow-lg animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Payment details stored securely</p>
                    <p className="text-sm text-muted-foreground">
                      Managed through Stripe
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleManageBilling}
                  disabled={managingBilling}
                >
                  {managingBilling ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Update'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Billing;
