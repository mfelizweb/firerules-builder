"use client"


 import InputMethodSelector from "@/components/InputMethodSelector";
import Link from "next/link";
import UpgradeButton from "@/components/UpgradeButton";
import { syncUser } from "@/lib/syncUser";
import { useEffect } from "react";

export default function BuilderPage() {
  useEffect(() => {
  syncUser();
}, []);

  return (
    <>
 
      <main className="min-h-screen p-8 bg-gray-50 dark:bg-zinc-950">
        <div className="p-6">   </div>
            <Link
            href="/"
            className="text-sm text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
          >
            ← Back to Home
          </Link>
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Firestore Rules Builder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose how you want to start generating Firestore rules.
          </p>
          <InputMethodSelector />
        </div>
      </main>
    </>
  );
}
