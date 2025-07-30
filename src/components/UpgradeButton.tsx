"use client";

import { useUserInfo } from "@/components/UserProvider"; 
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function UpgradeButton({ className = "" }) {
  const { user, isPro, loading } = useUserInfo();

  const handleUpgrade = async () => {
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
 
    }
  };

  if (loading) {
    return (
      <Button disabled>
        Loading...
      </Button>
    );
  }

  if (isPro) {
    return (
      <Button disabled variant="secondary">
        You are already Pro
      </Button>
    );
  }

  return (
  <Button onClick={handleUpgrade} className={`cursor-pointer ${className}`}>
    Upgrade to Pro
  </Button>
  );
}
