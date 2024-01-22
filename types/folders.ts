/**
 * Represents the type of documents.
 */
export interface DocumentsType {
  document_id: number | null
  document_name: string | null
  document_created_at: string | null
  storage_object_path: string | null
}

export interface FoldersType {
  folder_id: number
  folder_name: string
  parent_folder_id: number | null
  children: FoldersType[]
  documents: DocumentsType[]
}
