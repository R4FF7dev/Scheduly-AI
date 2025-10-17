// Environment-based API configuration
const ENV = import.meta.env.MODE || 'development';

interface APIConfig {
  baseUrl: string;
  stripeKey: string;
}

const API_CONFIGS: Record<string, APIConfig> = {
  development: {
    baseUrl: 'http://localhost:5678/webhook', // Local n8n instance
    stripeKey: 'pk_test_your_test_key',
  },
  production: {
    baseUrl: 'https://your-n8n-instance.com/webhook',
    stripeKey: 'pk_live_your_live_key',
  }
};

const config = API_CONFIGS[ENV === 'production' ? 'production' : 'development'];

export const API_BASE_URL = config.baseUrl;
export const STRIPE_PUBLIC_KEY = config.stripeKey;

// Define all API endpoints
export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/api/auth/register`,
    login: `${API_BASE_URL}/api/auth/login`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    refreshToken: `${API_BASE_URL}/api/auth/refresh`,
    verifyEmail: `${API_BASE_URL}/api/auth/verify-email`,
    resetPassword: `${API_BASE_URL}/api/auth/reset-password`,
  },
  user: {
    profile: `${API_BASE_URL}/api/user/profile`,
    updateProfile: `${API_BASE_URL}/api/user/profile`,
    subscription: `${API_BASE_URL}/api/user/subscription`,
    usage: `${API_BASE_URL}/api/user/usage`,
  },
  calendar: {
    connect: `${API_BASE_URL}/api/calendar/connect`,
    disconnect: `${API_BASE_URL}/api/calendar/disconnect`,
    getEvents: `${API_BASE_URL}/api/calendar/events`,
    syncStatus: `${API_BASE_URL}/api/calendar/sync-status`,
  },
  whatsapp: {
    connect: `${API_BASE_URL}/api/whatsapp/connect`,
    verify: `${API_BASE_URL}/api/whatsapp/verify`,
    disconnect: `${API_BASE_URL}/api/whatsapp/disconnect`,
    status: `${API_BASE_URL}/api/whatsapp/status`,
    sendTest: `${API_BASE_URL}/api/whatsapp/test`,
  },
  meetings: {
    list: `${API_BASE_URL}/api/meetings/list`,
    create: `${API_BASE_URL}/api/meetings/create`,
    update: `${API_BASE_URL}/api/meetings/update`,
    delete: `${API_BASE_URL}/api/meetings/delete`,
    summary: `${API_BASE_URL}/api/meetings/summary`,
    upcoming: `${API_BASE_URL}/api/meetings/upcoming`,
    past: `${API_BASE_URL}/api/meetings/past`,
  },
  notifications: {
    preferences: `${API_BASE_URL}/api/notifications/preferences`,
    updatePreferences: `${API_BASE_URL}/api/notifications/preferences`,
  },
  stripe: {
    createCheckout: `${API_BASE_URL}/api/stripe/create-checkout`,
    createPortal: `${API_BASE_URL}/api/stripe/create-portal`,
    webhook: `${API_BASE_URL}/api/stripe/webhook`,
  },
  analytics: {
    dashboard: `${API_BASE_URL}/api/analytics/dashboard`,
    meetings: `${API_BASE_URL}/api/analytics/meetings`,
  },
};
