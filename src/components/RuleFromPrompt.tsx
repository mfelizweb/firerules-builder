"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UpgradeButton from "@/components/UpgradeButton";
import { useUserInfo } from "./UserProvider";

interface RuleFromPromptProps {
  onRulesGenerated: (rules: string) => void;
  isPro: boolean;
}

export default function RuleFromPrompt({ onRulesGenerated, isPro }: RuleFromPromptProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { aiUsesThisMonth, refreshUser } = useUserInfo();

   const maxAI = isPro ? 500 : 10;
  const reachedLimit = aiUsesThisMonth >= maxAI;
type UpgradeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate-rule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();

      if (res.status === 403 && data.error) {
        setError(data.error);
        return;
      }

      onRulesGenerated(data.rules || "");
      await refreshUser();
    } catch (err) {
      setError("Failed to generate rules.");
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
            disabled={reachedLimit}
          />
          <Button
            onClick={handleGenerate}
            disabled={loading || reachedLimit || !prompt.trim()}
          >
            {loading ? "Generating..." : reachedLimit ? "Limit reached" : "Generate Rule"}
          </Button>

           <div className="mt-2 text-xs text-gray-500">
            AI generations used:{" "}
            <span className={reachedLimit ? "text-red-500 font-bold" : "font-semibold"}>
              {aiUsesThisMonth} / {maxAI}
            </span>
          </div>
          {error && (
            <div className="mt-2 px-3 py-2 rounded-md bg-yellow-100 text-yellow-800 border border-yellow-300 text-xs font-medium">
              {error}
            </div>
          )}
          {reachedLimit && (
            <div className="mt-2 px-3 py-2 rounded-md bg-yellow-100 text-yellow-800 border border-yellow-300 text-xs font-medium">
              You have reached your monthly AI generation limit. Contact us for more!
            </div>
          )}
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
          <UpgradeButton  
 />
        </motion.div>
      )}
    </div>
  );
}
