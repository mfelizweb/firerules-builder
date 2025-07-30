"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/components/UserProvider";
import UpgradeButton from "@/components/UpgradeButton";

const FEATURES_PRO = [
  "Visual rules builder",
  "AI rule generation (500/mo)",
  "Unlimited collections",
  "Download .rules file",
  "Priority support  ",
];

export default function PricingPage() {
  const { isPro, loading } = useUserInfo();

   const cardAnim = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, duration: 0.5 },
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white dark:bg-zinc-950">
      <div className="max-w-3xl w-full space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Pricing</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Start for free. Upgrade for more power.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <motion.div
            {...cardAnim}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <div className="mb-3 text-lg font-semibold">Free</div>
              <div className="mb-6 text-3xl font-bold text-blue-500 dark:text-blue-400">$0 <span className="text-base font-normal text-gray-400">/forever</span></div>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <CheckCircle2 size={18} className="text-green-500" /> Visual rules builder
                </li>
                <li className="flex items-center gap-2 text-gray-400 dark:text-gray-500 line-through">
                  <CheckCircle2 size={18} /> AI rule generation (max 10/mo)
                </li>
                <li className="flex items-center gap-2 text-gray-400 dark:text-gray-500 line-through">
                  <CheckCircle2 size={18} /> Download .rules file
                </li>
              </ul>
            </div>
            <Button disabled variant="outline" className="w-full cursor-pointer">
             Free Plan
            </Button>
          </motion.div>
           <motion.div
            {...cardAnim}
            className="rounded-xl border border-blue-400/60 dark:border-blue-500/80 bg-white dark:bg-zinc-950 p-8 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer relative"
            whileHover={{ scale: 1.03 }}
          >
            <div>
              <div className="mb-3 text-lg font-semibold flex items-center gap-2">
                Pro
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-400">Popular</span>
              </div>
              <div className="mb-6 text-3xl font-bold text-blue-600 dark:text-blue-400">$29 <span className="text-base font-normal text-gray-400">/year</span></div>
              <ul className="mb-8 space-y-2">
                {FEATURES_PRO.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <CheckCircle2 size={18} className="text-green-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            {loading ? (
              <Button disabled className="w-full cursor-pointer">Loading...</Button>
            ) : isPro ? (
              <Button disabled variant="outline" className="w-full cursor-pointer">You are Pro</Button>
            ) : (
              <div className="w-full">
                <UpgradeButton   />
              </div>
            )}
          </motion.div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          Need more? <a href="mailto:info@mfelizweb.com" className="underline">Contact Enterprise</a>
        </div>
      </div>
    </main>
  );
}
