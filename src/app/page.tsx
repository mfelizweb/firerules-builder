export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          FireRules Builder
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Visual tool to generate Firestore Security Rules.
        </p>
        <a
          href="/builder"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}
