import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil", 
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`.trim(),
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/builder`.trim(),

    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
     return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
