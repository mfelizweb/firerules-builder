export interface FirestoreSchema {
  [collectionName: string]: {
    fields: {
      [fieldName: string]: string;
    };
    rules?: {
      read?: string;
      write?: string;
    };
  };
}
