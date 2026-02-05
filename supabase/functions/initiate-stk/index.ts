 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 serve(async (req) => {
   // Handle CORS preflight requests
   if (req.method === 'OPTIONS') {
     return new Response('ok', { headers: corsHeaders });
   }
 
   try {
     const { amount, msisdn, reference } = await req.json();
 
     console.log("Initiating STK push:", { amount, msisdn, reference });
 
     // Validate required parameters
     if (!amount || !msisdn) {
       console.error("Missing required parameters");
       return new Response(
         JSON.stringify({ success: false, error: "Missing required parameters" }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     const payload = {
       api_key: "MGPYQeo8SNJp",
       email: "loans@kenyanloanschapchap.co.ke",
       amount: amount.toString(),
       msisdn: msisdn,
       reference: reference || `LOAN-${Date.now()}`,
     };
 
     console.log("Sending to MegaPay:", payload);
 
     const response = await fetch("https://megapay.co.ke/backend/v1/initiatestk", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(payload),
     });
 
     console.log("MegaPay response status:", response.status);
 
     const contentType = response.headers.get("content-type");
     if (!contentType || !contentType.includes("application/json")) {
       const errorText = await response.text();
       console.error("Non-JSON response from MegaPay:", errorText.substring(0, 500));
       return new Response(
         JSON.stringify({ success: false, error: "Unexpected response from payment gateway" }),
         { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     const data = await response.json();
     console.log("MegaPay response data:", data);
 
     // Check for success (MegaPay returns success: "200")
     if (data.success === "200" || data.massage) {
       return new Response(
         JSON.stringify({
           success: true,
           transaction_request_id: data.transaction_request_id,
           message: data.massage || "Request sent successfully",
         }),
         { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     } else {
       console.error("MegaPay error:", data);
       return new Response(
         JSON.stringify({
           success: false,
           error: data.message || data.error || "Payment initiation failed",
         }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
   } catch (error) {
     console.error("Edge function error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
     return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 });