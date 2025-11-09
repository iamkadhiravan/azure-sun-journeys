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
    const { email, name } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, Helvetica, \"Apple Color Emoji\", \"Segoe UI Emoji\";">
        <h1 style="margin-bottom: 8px;">Welcome${name ? ", " + name : ""}!</h1>
        <p>Thanks for visiting Unique World Tours. We're excited to help plan your next adventure.</p>
        <p style="margin-top: 16px;">If you didn't request this, you can ignore this email.</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Unique World Tours <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for visiting Unique World Tours!",
      html,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("send-welcome error", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
