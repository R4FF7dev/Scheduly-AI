import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('[calendar-connect] Request received:', req.method);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    console.log('[calendar-connect] CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get user_id from request body
    const body = await req.json();
    const userId = body.user_id;
    
    console.log('[calendar-connect] Request body:', { user_id: userId });
    
    if (!userId) {
      console.error('[calendar-connect] Missing user_id in request body');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'user_id is required in request body' 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Call n8n
    const n8nUrl = 'https://n8n.schedulyai.com/webhook/calendar/connect';
    console.log('[calendar-connect] Calling n8n:', n8nUrl);
    
    const n8nResponse = await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });
    
    console.log('[calendar-connect] n8n response status:', n8nResponse.status);
    
    const responseText = await n8nResponse.text();
    console.log('[calendar-connect] n8n response (first 200 chars):', responseText.substring(0, 200));
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('[calendar-connect] Failed to parse n8n response as JSON:', e);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid response from calendar service',
          details: responseText.substring(0, 100)
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // If n8n returned error status, wrap it
    if (!n8nResponse.ok) {
      console.error('[calendar-connect] n8n returned error status:', n8nResponse.status, data);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: data.error || 'Calendar service returned an error',
          status: n8nResponse.status,
          raw: data
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Success
    console.log('[calendar-connect] Success! Returning data:', data);
    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
    
  } catch (error: any) {
    console.error('[calendar-connect] Unexpected error:', error.message, error.stack);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Internal server error'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
