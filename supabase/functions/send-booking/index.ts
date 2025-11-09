import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY") || "");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, tourName, tourDuration, tourPrice, tourLocation } = await req.json();

    if (!name || !email || !tourName) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, Helvetica;">
        <h1 style="color: #333; margin-bottom: 16px;">New Booking Request</h1>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
          <h2 style="color: #555; margin-bottom: 12px;">Customer Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        </div>
        <div style="background: #e3f2fd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #555; margin-bottom: 12px;">Tour Package Details</h2>
          <p><strong>Package:</strong> ${tourName}</p>
          <p><strong>Duration:</strong> ${tourDuration}</p>
          <p><strong>Location:</strong> ${tourLocation}</p>
          <p><strong>Price:</strong> ₹${tourPrice.toLocaleString("en-IN")}</p>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Unique World Tours <onboarding@resend.dev>",
      to: ["lekadhir@gmail.com"],
      subject: `New Booking Request: ${tourName}`,
      html,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("send-booking error", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
