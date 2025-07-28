 "use client";

import { useEffect, useState } from "react";
import UploadSchema from "./UploadSchema";
import CollectionForm from "./CollectionForm";
import RulePreview from "./RulePreview";
import RuleFromPrompt from "./RuleFromPrompt";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FirestoreSchema } from "../../types/schema";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function InputMethodSelector() {
  const [method, setMethod] = useState<"upload" | "visual" | "ai">("upload");
  const [rules, setRules] = useState("");
  const [isPro, setIsPro] = useState(false);

  const handleMethodChange = (val: string) => {
    if (val) {
      setMethod(val as typeof method);
      setRules("");
    }
  };

  const handleSchemaChange = (schema: FirestoreSchema) => {
    const generateRules = require("@/lib/generateRules").generateRules;
    const generated = generateRules(schema);
    setRules(generated);
  };

  useEffect(() => {
    const fetchIsPro = async () => {
      const supabase = createPagesBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("users")
          .select("ispro")
          .eq("id", user.id)
          .single();

        if (data?.ispro === true) {
          setIsPro(true);
        }
      }
    };

    fetchIsPro();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
<ToggleGroup
  type="single"
  value={method}
  onValueChange={handleMethodChange}
  className="flex flex-wrap gap-1 w-full"
>
  <ToggleGroupItem className="flex-1 sm:flex-none" value="upload">
    Upload JSON
  </ToggleGroupItem>
  <ToggleGroupItem className="flex-1 sm:flex-none" value="visual">
    Build Visually
  </ToggleGroupItem>
  <ToggleGroupItem className="flex-1 sm:flex-none" value="ai">
    AI Input
  </ToggleGroupItem>
</ToggleGroup>


      </div>

      {method === "upload" && <UploadSchema onSchemaChange={handleSchemaChange} />}
      {method === "visual" && <CollectionForm onSchemaChange={handleSchemaChange} />}
      {method === "ai" && <RuleFromPrompt onRulesGenerated={setRules} isPro={isPro} />}

      {rules && <RulePreview rules={rules} isPro={isPro} />}
    </div>
  );
}
