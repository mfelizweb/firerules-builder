"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserInfo } from "@/components/UserProvider";

export default function AccountPage() {
  const router = useRouter();
  const { user, isPro, loading } = useUserInfo();

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-zinc-950">
      <Button onClick={() => router.push("/builder")} variant="outline">
        ← Back to Builder
      </Button>

      <div className="max-w-2xl mx-auto mt-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          My Account
        </h1>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        ) : user ? (
          <div className="mt-2 text-gray-700 dark:text-gray-300 space-y-2">
            <p className="text-sm">Email: {user.email}</p>

            <div className="text-sm flex items-center gap-2">
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
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Not logged in.</p>
        )}
      </div>
    </main>
  );
}
