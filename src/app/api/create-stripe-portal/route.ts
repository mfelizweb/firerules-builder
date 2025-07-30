import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const { email } = JSON.parse(body);

    if (!email) {
      console.error("No email provided");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("email", email)
      .single();

    let customerId = data?.stripe_customer_id;

     if (!customerId) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
    }

    if (!customerId) {
       return NextResponse.json({ error: "Stripe customer not found" }, { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXT_PUBLIC_DOMAIN + "/account",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Error in create-stripe-portal:", err);
    return NextResponse.json({ error: "Unable to create Stripe portal", details: err.message }, { status: 500 });
  }
}
