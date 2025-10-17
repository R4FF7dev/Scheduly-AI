import { loadStripe } from '@stripe/stripe-js';
import { api } from './api.service';
import { API_ENDPOINTS } from '@/config/api.config';
import { STRIPE_PUBLIC_KEY } from '@/config/api.config';

let stripePromise: ReturnType<typeof loadStripe> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export const stripeService = {
  createCheckoutSession: async (priceId: string, planName: string) => {
    const response = await api.post(API_ENDPOINTS.stripe.createCheckout, {
      priceId,
      planName,
      successUrl: `${window.location.origin}/dashboard/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/landing`,
    });
    
    // Redirect to Stripe Checkout URL
    if (response.url) {
      window.location.href = response.url;
    } else {
      throw new Error('No checkout URL received');
    }
  },
  
  createPortalSession: async () => {
    const response = await api.post(API_ENDPOINTS.stripe.createPortal, {
      returnUrl: `${window.location.origin}/dashboard/billing`,
    });
    
    window.location.href = response.url;
  },
};
