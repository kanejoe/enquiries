// keys for the query cache
export const keys = {
  all: ["documents", "folders"] as const,
  getChats: ["chat_queries"] as const,
  getDocuments: ["documents"] as const,
  getDocumentsWithTags: ["documentsWithTags"] as const,
  getFiles: ["files"] as const,
  getFolders: ["folders"] as const,
  getTags: ["tags"] as const,
  getStructuredOutput: ["structured_output"] as const,
}
