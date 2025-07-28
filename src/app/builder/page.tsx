"use client";

import { useEffect } from "react";
import Link from "next/link";
import InputMethodSelector from "@/components/InputMethodSelector";
import { syncUser } from "@/lib/syncUser";

export default function BuilderPage() {
  useEffect(() => {
    syncUser();
  }, []);

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

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Firestore Rules Builder
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
