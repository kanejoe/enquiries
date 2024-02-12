import { Tables } from "../database.types"

export type TFolder = Tables<"folders">

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
