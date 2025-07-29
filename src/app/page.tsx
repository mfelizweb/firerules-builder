"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-16 bg-white dark:bg-zinc-950">
       <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Rule Builder
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Generate secure Firestore rules using AI or a visual JSON builder. No more writing rules from scratch.
        </p>
        <a
          href="/builder"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
        >
          Get Started
        </a>
      </div>

       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center space-y-4">
          <Image
            src="/create.png"
            alt="Create collection visually"
            width={900}
            height={400}
            className="rounded-xl shadow-md mx-auto w-full h-auto"
            priority
          />
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            📂 Create collections visually and define fields and rules.
          </p>
        </div>

        <div className="text-center space-y-4">
          <Image
            src="/input.png"
            alt="Generate rules with AI"
            width={900}
            height={400}
            className="rounded-xl shadow-md mx-auto w-full h-auto"
            priority
          />
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            🤖 Use natural language to describe what you need. AI writes the rules for you.
          </p>
        </div>
      </div>
    </main>
  );
}
