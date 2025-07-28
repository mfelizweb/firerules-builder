import { FirestoreSchema } from "../../types/schema";

interface UploadSchemaProps {
  onSchemaChange: (schema: FirestoreSchema) => void;
}

export default function UploadSchema({ onSchemaChange }: UploadSchemaProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        onSchemaChange(json);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    
    <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 border rounded-xl p-6 shadow-md space-y-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Upload your Firestore schema (.json)
      </label>

      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="w-full cursor-pointer rounded border border-gray-300 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-100 px-3 py-2 text-sm shadow-sm"
      />
    </div>
  );
}
