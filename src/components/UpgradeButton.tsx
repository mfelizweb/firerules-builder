"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";

export default function UpgradeButton() {
  const user = useUser();

  const handleCheckout = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user?.email }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <Button onClick={handleCheckout} disabled={!user}>
      Upgrade to Pro
    </Button>
  );
}
