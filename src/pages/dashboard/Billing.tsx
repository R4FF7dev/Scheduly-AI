import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/services/api.service";
import { stripeService } from "@/services/stripe.service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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

const Billing = () => {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [managingBilling, setManagingBilling] = useState(false);
  const [navigatingToPricing, setNavigatingToPricing] = useState(false);

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
      // Don't show error if subscription doesn't exist yet (new user)
      if (err?.response?.status !== 404) {
        setError('Failed to load subscription data');
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

  const handleNavigateToPricing = () => {
    setNavigatingToPricing(true);
    navigate('/?scrollTo=pricing');
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
          <h1 className="text-3xl font-bold mb-2">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and billing</p>
        </div>

        {/* Trial Expired Alert */}
        {isTrialExpired && (
          <Alert className="mb-6 border-red-500 bg-red-50 animate-fade-up">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Your free trial has ended. Please choose a plan to continue using Scheduly AI.
              <Button 
                className="ml-4" 
                size="sm"
                onClick={handleNavigateToPricing}
                disabled={navigatingToPricing}
              >
                {navigatingToPricing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Choose Plan'
                )}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Trial Active Banner */}
        {trialDaysRemaining > 0 && !subscription?.stripe_subscription_id && (
          <Alert className="mb-6 border-blue-500 bg-blue-50 animate-fade-up">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              🎉 Free trial: {trialDaysRemaining} days remaining. Upgrade anytime to avoid interruption.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Current Plan */}
          <Card className="lg:col-span-2 shadow-lg animate-fade-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {subscription?.plan_name || 'Free Trial'} Plan
                  </CardTitle>
                  <CardDescription>
                    {subscription?.meetings_limit ? `${subscription.meetings_limit} meetings per month` : 'Getting started'}
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
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-muted-foreground">
                    Current period ends: {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                {subscription?.stripe_subscription_id ? (
                  <>
                    <Button 
                      onClick={handleManageBilling} 
                      className="flex-1"
                      disabled={managingBilling}
                    >
                      {managingBilling ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        'Manage Billing'
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleNavigateToPricing}
                      disabled={navigatingToPricing}
                    >
                      {navigatingToPricing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        'Change Plan'
                      )}
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={handleNavigateToPricing}
                    className="flex-1"
                    disabled={navigatingToPricing}
                  >
                    {navigatingToPricing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Choose a Plan'
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="shadow-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
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

        {/* Payment Method - Only show if subscription exists */}
        {subscription?.stripe_subscription_id && (
          <Card className="shadow-lg animate-fade-up" style={{ animationDelay: "0.3s" }}>
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

        {/* Billing History */}
        <Card className="mt-8 shadow-lg animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Download your past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            {subscription?.stripe_subscription_id ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  View your billing history and download invoices
                </p>
                <Button 
                  onClick={handleManageBilling}
                  disabled={managingBilling}
                >
                  {managingBilling ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'View Billing History'
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No billing history available. Subscribe to a plan to see your invoices here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
