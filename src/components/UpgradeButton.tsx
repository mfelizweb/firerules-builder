"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function UpgradeButton() {
  const user = useUser();

  const handleUpgrade = async () => {
    // Si no está logueado, redirige a login
    if (!user?.email) {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/builder`,
        },
      });
      return;
    }

 
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    } else {
      console.error("Error starting checkout:", data?.error);
    }
  };

  return (
    <Button onClick={handleUpgrade}>
      Upgrade to Pro
    </Button>
  );
}
