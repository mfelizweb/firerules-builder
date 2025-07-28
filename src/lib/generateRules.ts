import { FirestoreSchema } from "../../types/schema";

 

 
export function generateRules(schema: FirestoreSchema): string {
  const lines = [
    `rules_version = '2';`,
    `service cloud.firestore {`,
    `  match /databases/{database}/documents {`,
  ];

  for (const [collection, config] of Object.entries(schema)) {
    lines.push(`    match /${collection}/{docId} {`);

    if (config.rules?.read) {
      lines.push(`      allow read: if ${config.rules.read};`);
    }

    if (config.rules?.write) {
      lines.push(`      allow write: if ${config.rules.write};`);
    }

    lines.push(`    }`);
  }

  lines.push(`  }`);
  lines.push(`}`);

  return lines.join("\n");
}
