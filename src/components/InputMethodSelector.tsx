"use client";

import { useState } from "react";
import UploadSchema from "./UploadSchema";
import CollectionForm from "./CollectionForm";
import RulePreview from "./RulePreview";
import RuleFromPrompt from "./RuleFromPrompt";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FirestoreSchema } from "../../types/schema";
 
export default function InputMethodSelector() {
  const [method, setMethod] = useState<"upload" | "visual" | "ai">("upload");
  const [rules, setRules] = useState("");

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

  return (
    <div className="space-y-6">
      <ToggleGroup
        type="single"
        value={method}
        onValueChange={handleMethodChange}
        className="flex gap-4"
      >
        <ToggleGroupItem value="upload">Upload JSON</ToggleGroupItem>
        <ToggleGroupItem value="visual">Build Visually</ToggleGroupItem>
        <ToggleGroupItem value="ai">AI Input</ToggleGroupItem>
      </ToggleGroup>

      {method === "upload" && <UploadSchema onSchemaChange={handleSchemaChange} />}
      {method === "visual" && <CollectionForm onSchemaChange={handleSchemaChange} />}
      {method === "ai" && <RuleFromPrompt onRulesGenerated={setRules} />}

      {rules && <RulePreview rules={rules} />}
    </div>
  );
}
