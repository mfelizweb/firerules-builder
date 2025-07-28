import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  console.log("🔥 Stripe Webhook HIT");

  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
      
    );
  } catch (err: any) {
     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
 
 
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;

 
    if (email) {
      const { data: user, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (fetchError) {
       }

      if (user) {
        const { error: updateError } = await supabase
          .from("users")
          .update({ ispro: true })
          .eq("email", email);

        if (updateError) {
         } else {
         }
      } else {
        const { error: insertError } = await supabase
          .from("users")
          .insert({ email, ispro: true });

        if (insertError) {
         } else {
         }
      }
    } else {
     }
  }

  return NextResponse.json({ received: true });
}
