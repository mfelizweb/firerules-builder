"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UpgradeButton from "@/components/UpgradeButton";

interface RuleFromPromptProps {
  onRulesGenerated: (rules: string) => void;
  isPro: boolean;
}

export default function RuleFromPrompt({ onRulesGenerated, isPro }: RuleFromPromptProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-rule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      onRulesGenerated(data.rules || "");
    } catch (error) {
      alert("Failed to generate rules");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 border rounded-xl p-6 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Generate Rules from Description</h2>
        {!isPro && (
          <span className="text-xs text-yellow-500 font-medium bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-full animate-pulse">
            ✨ PRO Feature
          </span>
        )}
      </div>

      {isPro ? (
        <>
          <Input
            placeholder="e.g. Only the user who created the document can read and write"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Rule"}
          </Button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-lg border border-dashed border-gray-300 dark:border-zinc-700 p-6 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            🚀 This AI-powered feature is available for <strong>Pro users</strong> only.
          </p>
          <UpgradeButton />
        </motion.div>
      )}
    </div>
  );
}
