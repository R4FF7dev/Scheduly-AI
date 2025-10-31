import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get JWT from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header');
      throw new Error('Missing authorization header');
    }

    // Create Supabase client to verify JWT and get user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Get authenticated user from JWT
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      console.error('Unauthorized - user verification failed:', userError);
      throw new Error('Unauthorized');
    }

    console.log('Proxying calendar connect for authenticated user:', user.id);
    
    // Call n8n with verified user_id from JWT
    const response = await fetch('https://n8n.schedulyai.com/webhook/calendar/connect', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id })
    });
    
    const text = await response.text();
    console.log('n8n response status:', response.status);
    console.log('n8n raw response:', text);
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('JSON parse error:', e);
      throw new Error(`Invalid JSON from n8n: ${text.substring(0, 100)}`);
    }
    
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });
    
  } catch (error: any) {
    console.error('Calendar connect proxy error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to connect to calendar service'
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});
