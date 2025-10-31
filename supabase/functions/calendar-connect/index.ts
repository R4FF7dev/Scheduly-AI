import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const body = await req.json();
    console.log('Proxying calendar connect for user:', body.user_id);
    
    if (!body.user_id) {
      throw new Error('user_id is required');
    }
    
    // Call n8n from server-side (no CORS restrictions)
    const response = await fetch('https://n8n.schedulyai.com/webhook/calendar/connect', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    
    const text = await response.text();
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
