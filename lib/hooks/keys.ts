// keys for the query cache
export const keys = {
  all: ["documents", "folders"] as const,
  getDocuments: ["documents"] as const,
  getDocumentsWithTags: ["documentsWithTags"] as const,
  getFolders: ["folders"] as const,
  getTags: ["tags"] as const,
}
