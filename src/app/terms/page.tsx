"use client";

export default function TermsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 py-12">
      <div className="max-w-2xl w-full bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>

        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm">
          <p><strong>Last updated:</strong> July 30, 2025</p>

          <h2 className="font-semibold mt-4 mb-1 text-base">1. Service Description</h2>
          <p>
            FireRules Builder provides a platform for creating, managing, and downloading Firestore security rules, including advanced AI-powered rule generation and other productivity tools.
          </p>

          <h2 className="font-semibold mt-4 mb-1 text-base">2. Accounts & Subscriptions</h2>
          <p>
            You must register with a valid email address. Pro features are available via paid annual subscription. You may cancel your subscription at any time through your Account page.
          </p>

          <h2 className="font-semibold mt-4 mb-1 text-base">3. Fair Use Policy & AI Limits</h2>
          <ul className="list-disc pl-5">
            <li>AI rule generation is limited to <strong>10 generations per month (Free)</strong> and <strong>500 per month (Pro)</strong>.</li>
            <li>AI features are intended for personal or professional use only within your own projects.</li>
            <li>
              <strong>Prohibited:</strong> Automated or scripted mass requests, circumventing usage limits, reselling generated rules, or using the service in ways that overload or abuse the system.
            </li>
            <li>
              Accounts found abusing the AI features or fair use policy may be suspended or terminated without notice.
            </li>
          </ul>

          <h2 className="font-semibold mt-4 mb-1 text-base">4. Ownership & Responsibility</h2>
          <p>
            You are solely responsible for the use of generated rules and their implementation in your own projects. Generated rules are not guaranteed to be production safe and must be reviewed before use in critical environments.
          </p>

          <h2 className="font-semibold mt-4 mb-1 text-base">5. Cancellations & Refunds</h2>
          <p>
            Subscriptions may be cancelled at any time. Payments are final and non-refundable except where required by law. Pro features remain available until the end of the paid term.
          </p>

          <h2 className="font-semibold mt-4 mb-1 text-base">6. Privacy</h2>
          <p>
            We collect only data required to provide the service and process payments. Personal information is never shared with third parties except as required for billing or by law.
          </p>

          <h2 className="font-semibold mt-4 mb-1 text-base">7. Changes</h2>
          <p>
            We reserve the right to update these terms at any time. You will be notified via email or website if important changes occur.
          </p>
     <h2 className="font-semibold mt-4 mb-1 text-base">
      Credit Reset:   </h2>    
      <p>
All AI rule generation credits (free and Pro) automatically reset on the first day of each month (UTC). Unused credits do not carry over to the next month.

      </p>
           <h2 className="font-semibold mt-4 mb-1 text-base">8. Contact</h2>
          <p>
            For support or questions, email us at <a href="mailto:info@mfelizweb.com" className="underline">info@mfelizweb.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
