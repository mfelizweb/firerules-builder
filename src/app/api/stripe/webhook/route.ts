import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("🔥 Stripe Webhook HIT:", event.type);
  } catch (err: any) {
    console.error("Stripe webhook error:", err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    let customerId = session.customer as string;

 if (email && customerId) {
  const { error } = await supabase
    .from("users")
    .update({ stripe_cust_id2: customerId })
    .eq("email", email);

  if (error) {
    console.error("[Supabase Error] Solo stripe_cust_id2:", error);
  } else {
    console.log("[Supabase] Update SOLO stripe_cust_id2 OK", email, customerId);
  }
}


     if (!customerId && email) {
      const customers = await stripe.customers.list({ email });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        console.log("[Fallback by email]", customerId);
      }
    }

 
     const updateObj: Record<string, any> = { ispro: true };
    if (customerId) updateObj.stripe_customer_id = customerId;

    let upgradeSuccess = false;

     if (email) {
      const { data: user, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (user) {
        const { error: updateError } = await supabase
          .from("users")
          .update(updateObj)
          .eq("email", email);

        if (!updateError) {
          upgradeSuccess = true;
          console.log("[Supabase] ¡Usuario actualizado con:", updateObj);
        } else {
          console.error("[Supabase Error] No se pudo actualizar:", updateError);
        }
      } else {
        const { error: insertError } = await supabase
          .from("users")
          .insert({ email, ...updateObj });

        if (!insertError) {
          upgradeSuccess = true;
          console.log("[Supabase] ¡Usuario creado con:", { email, ...updateObj });
        } else {
          console.error("[Supabase Error] No se pudo crear:", insertError);
        }
      }
    }

     if (upgradeSuccess) {
      try {
        await resend.emails.send({
          from: 'RuleBuilder <noreply@mfelizweb.com>',
          to: email!,
          subject: 'Welcome to RuleBuilder Pro 🎉',
          html: `
            <h1>You're now a Pro user!</h1>
            <p>Thank you for upgrading. Enjoy all the premium features.</p>
            <p><a href="https://firerules-builder.vercel.app/account" target="_blank">View your Pro account</a></p>
          `,
        });
      } catch (emailError: any) {
        console.error("[Resend Error] Error sending welcome email:", emailError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
