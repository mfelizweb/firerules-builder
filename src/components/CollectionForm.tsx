"use client";

import { useState } from "react";
 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FirestoreSchema } from "../../types/schema";

interface CollectionFormProps {
  onSchemaChange: (schema: FirestoreSchema) => void;
}

export default function CollectionForm({ onSchemaChange }: CollectionFormProps) {
  const [collectionName, setCollectionName] = useState("");
  const [fields, setFields] = useState<{ name: string; type: string }[]>([]);
  const [newField, setNewField] = useState({ name: "", type: "" });
  const [readRule, setReadRule] = useState("");
  const [writeRule, setWriteRule] = useState("");

  const handleAddField = () => {
    if (newField.name && newField.type) {
      setFields((prev) => [...prev, newField]);
      setNewField({ name: "", type: "" });
    }
  };

  const handleGenerateSchema = () => {
    if (!collectionName || fields.length === 0) return;

    const schema: FirestoreSchema = {
      [collectionName]: {
        fields: {},
        rules: {}
      }
    };

    for (const field of fields) {
      schema[collectionName].fields[field.name] = field.type;
    }

    if (readRule) schema[collectionName].rules!.read = readRule;
    if (writeRule) schema[collectionName].rules!.write = writeRule;

    onSchemaChange(schema);
  };

  return (
    <div className="space-y-4 border rounded-xl p-6 bg-white dark:bg-zinc-900 shadow-sm">
      <h2 className="text-lg font-semibold">Create Collection</h2>

      <Input
        placeholder="Collection name"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />

      <div className="space-y-2">
        <h3 className="font-medium">Fields</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Field name"
            value={newField.name}
            onChange={(e) => setNewField((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            placeholder="Type (string, number...)"
            value={newField.type}
            onChange={(e) => setNewField((f) => ({ ...f, type: e.target.value }))}
          />
          <Button type="button" onClick={handleAddField}>
            Add
          </Button>
        </div>

        {fields.length > 0 && (
          <ul className="text-sm list-disc ml-5 text-gray-600 dark:text-gray-300">
            {fields.map((f, i) => (
              <li key={i}>
                {f.name}: {f.type}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Read rule (optional)"
          value={readRule}
          onChange={(e) => setReadRule(e.target.value)}
        />
        <Input
          placeholder="Write rule (optional)"
          value={writeRule}
          onChange={(e) => setWriteRule(e.target.value)}
        />
      </div>

      <Button type="button" onClick={handleGenerateSchema}>
        Generate Rules
      </Button>
    </div>
  );
}
