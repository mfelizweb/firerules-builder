 "use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RulePreviewProps {
  rules: string;
  isPro: boolean;
}

export default function RulePreview({ rules, isPro }: RulePreviewProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(rules);
  };

  const handleDownload = () => {
    if (!isPro) return;

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

      <div className="flex flex-col gap-2">
        {!isPro && (
          <div className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-2 rounded-md">
            Upgrade to Pro to enable rule downloads.
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button onClick={handleCopy}>Copy</Button>

          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={!isPro}
          >
            Download .rules
          </Button>
        </div>
      </div>
    </div>
  );
}
