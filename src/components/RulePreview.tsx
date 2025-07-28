"use client";

import { Button } from "@/components/ui/button";

interface RulePreviewProps {
  rules: string;
}

export default function RulePreview({ rules }: RulePreviewProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(rules);
  };

  const handleDownload = () => {
    const blob = new Blob([rules], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "firestore.rules";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="border rounded-xl p-4 bg-gray-100 dark:bg-zinc-900 space-y-4">
      <pre className="overflow-x-auto text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
        {rules}
      </pre>

      <div className="flex gap-3">
        <Button onClick={handleCopy}>Copy</Button>
        <Button variant="outline" onClick={handleDownload}>
          Download .rules
        </Button>
      </div>
    </div>
  );
}
