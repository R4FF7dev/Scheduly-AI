// HARDCODED Supabase config - prevents Lovable from changing it
// This takes priority over .env variables

export const SUPABASE_CONFIG = {
  url: 'https://xxvlxrvsennoatbntuhc.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4dmx4cnZzZW5ub2F0Ym50dWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzY3MjMsImV4cCI6MjA3NjExMjcyM30.otwLUwOY6Ohew_2CuL74m3fZxkkCxEC0wcuTFfBuAw4',
  projectId: 'xxvlxrvsennoatbntuhc'
} as const;

// Verify configuration
if (!SUPABASE_CONFIG.url.includes('xxvlxrvsennoatbntuhc')) {
  throw new Error('CRITICAL: Supabase configuration is incorrect!');
}
