"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserInfo } from "@/components/UserProvider";
import AuthButton from "@/components/AuthButton";
import { supabase } from "@/lib/supabase";

const FEATURES_PRO = [
  "Visual rules builder",
  "AI rule generation (500/mo)",
  "Unlimited collections",
  "Download .rules file",
 
];

const FEATURES_FREE = [
  "Visual rules builder",
  "Max 10 AI rule generations per month",
];

export default function AccountPage() {
  const router = useRouter();
  const { user, isPro, loading } = useUserInfo();

  const handleManageSubscription = async () => {
    if (!user?.email) {
      alert("User email not found");
      return;
    }
    const res = await fetch("/api/create-stripe-portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
    else alert("Unable to open Stripe Portal.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-xl space-y-8">
        <div className="flex items-center justify-between">
          <Button onClick={() => router.push("/builder")} variant="outline">
            ← Back to Builder
          </Button>
          {user && (
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/builder";
              }}
            >
              Log out
            </Button>
          )}
        </div>

        <div className="rounded-xl border bg-white/90 dark:bg-zinc-900 p-8 shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            My Account
          </h1>

          {loading ? (
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          ) : user ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm">
                  Email: <span className="font-medium">{user.email}</span>
                </p>
                <div className="text-sm flex items-center gap-2 mt-1">
                  <span>Status:</span>
                  {isPro ? (
                    <Badge variant="default" className="animate-pulse">
                      🔥 Pro User
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Free</Badge>
                  )}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2">
                  {isPro ? "Your Pro Benefits:" : "Your Free Plan:"}
                </h2>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  {(isPro ? FEATURES_PRO : FEATURES_FREE).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {isPro ? (
                  <Button
                    variant="destructive"
                    onClick={handleManageSubscription}
                    className="cursor-pointer"
                  >
                    Manage Subscription
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push("/pricing")}
                    className="cursor-pointer"
                  >
                    Upgrade to Pro
                  </Button>
                )}
              </div>
                    <div className="mt-8 text-center">
  <a
    href="/terms"
    className="text-xs text-gray-500 dark:text-gray-400 underline hover:text-primary-600 transition"
    target="_blank"
    rel="noopener noreferrer"
  >
    Terms of Service & Fair Use Policy
  </a>
</div>
            </div>
            
          ) : (
            <div className="flex flex-col items-start gap-3">
              <p className="text-gray-600 dark:text-gray-400">
                Not logged in.
              </p>
              <AuthButton />
            </div>
          )}
        </div>
      </div>
 

    </main>
  );
}
