import { Tables } from "../database.types"

export type TFolders = Tables<"folders">

export type TFoldersExtended = {
  folder_id: number
  folder_name: string
  parent_folder_id: number | null
  children: TFoldersExtended[]
  documents: TDocumentsExtended[]
}

export type TDocumentsExtended = {
  document_id: number | null
  document_name: string | null
  document_created_at: string | null
  storage_object_path: string | null
}

export type TDocuments = Tables<"documents">

export type TDocumentSections = Tables<"document_sections">

// Define a type that includes the document and its sections
export type TDocumentWithSections = TDocuments & {
  document_sections: Pick<TDocumentSections, "content" | "isvectorized">[]
}

export type TExtendedDocuments = TDocumentWithSections & {
  content: string
  wordCount: number
}
