"use client";

import { useEffect } from "react";
import Link from "next/link";
import InputMethodSelector from "@/components/InputMethodSelector";
import { syncUser } from "@/lib/syncUser";
import { useUserInfo } from "@/components/UserProvider";
import { Badge } from "@/components/ui/badge";


export default function BuilderPage() {
      const { refreshUser } = useUserInfo();

  useEffect(() => {
    syncUser();
      refreshUser(); 
  }, []);

 const { user, isPro, aiUsesThisMonth, loading } = useUserInfo();
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-start">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
          >
            ← Back to Home
          </Link>
        </div>
        
                    <div className="text-sm flex-col items-center gap-1">
                      <span>Status:</span>
                      {isPro ? (
                        <Badge variant="default"  >
                          🔥 Pro User
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Free</Badge>
                      )}
                      <div className="text-sm flex items-center gap-1">
  <span>
    AI generations used:&nbsp;
    <span className="font-semibold">
      {loading ? "—" : (
        <>
          <Badge variant="default"  >
                          
                           {aiUsesThisMonth} / {isPro ? 500 : 10} </Badge>
        </>
      )}
    </span>
  </span>
</div>

                    </div>
                    

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Rules Builder
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Choose how you want to start generating Firestore rules.
        </p>

        <div className="w-full">
          <InputMethodSelector />
        </div>
      </div>
    </main>
  );
}
