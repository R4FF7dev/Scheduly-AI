export const API_BASE_URL = 'https://n8n.schedulyai.com/webhook';
export const STRIPE_PUBLIC_KEY = 'pk_live_51SJIgSQzW9yPRMNIZqBVJ9EZIlTUbWOblmbc5dqRQcKFSvZaAq8PN1HOf7jOkBUNboHzZEU6CNt0CpT7PABmzLGp00If2jmpUk';

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    refreshToken: `${API_BASE_URL}/auth/refresh`,
    verifyEmail: `${API_BASE_URL}/auth/verify-email`,
    resetPassword: `${API_BASE_URL}/auth/reset-password`,
  },
  user: {
    profile: `${API_BASE_URL}/user/profile`,
    updateProfile: `${API_BASE_URL}/user/profile`,
    subscription: `${API_BASE_URL}/user/subscription`,
    usage: `${API_BASE_URL}/user/usage`,
  },
  calendar: {
    connect: `${API_BASE_URL}/calendar/connect`,
    disconnect: `${API_BASE_URL}/calendar/disconnect`,
    getEvents: `${API_BASE_URL}/calendar/events`,
    syncStatus: `${API_BASE_URL}/calendar/sync-status`,
  },
  whatsapp: {
    connect: `${API_BASE_URL}/whatsapp/connect`,
    verify: `${API_BASE_URL}/whatsapp/verify`,
    disconnect: `${API_BASE_URL}/whatsapp/disconnect`,
    status: `${API_BASE_URL}/whatsapp/status`,
    sendTest: `${API_BASE_URL}/whatsapp/test`,
  },
  meetings: {
    list: `${API_BASE_URL}/meetings/list`,
    create: `${API_BASE_URL}/meetings/create`,
    update: `${API_BASE_URL}/meetings/update`,
    delete: `${API_BASE_URL}/meetings/delete`,
    summary: `${API_BASE_URL}/meetings/summary`,
    upcoming: `${API_BASE_URL}/meetings/upcoming`,
    past: `${API_BASE_URL}/meetings/past`,
  },
  stripe: {
    createCheckout: `${API_BASE_URL}/stripe/create-checkout`,
    createPortal: `${API_BASE_URL}/stripe/create-portal`,
  },
};

export const STRIPE_PRICES = {
  starter: 'price_1SJWciQzW9yPRMNIU5rSts7f',
  professional: 'price_1SJWdVQzW9yPRMNIGvLgBsQz',
  enterprise: 'price_1SJWe5QzW9yPRMNIA2nkNGPU',
};
