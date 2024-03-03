"use server"

import {
  createServerSupabaseClient,
  getFileByStorageObjectPath,
  getStoragePathByDocumentId,
  upsertDocumentSections,
} from "@/lib/supabase-funcs/supabase.server"
import { Tables } from "@/lib/types/database.types"
import { getFileExtension } from "@/lib/utils"
import { LoadAndParsePdf } from "@/lib/utils/parse-load-pdf"

// import { ParsePdf } from "./docParser"

type TDocumentId = Tables<"documents">["id"]

/**
 * Parses a file and performs necessary actions based on the file type.
 * @param document - The document object to be parsed.
 * @returns A Promise that resolves when the parsing and actions are completed.
 * @throws An error if the uploaded document cannot be found or if the document fails to parse.
 */
export async function parseFile(document: Tables<"documents">) {
  const doc = await getStoragePathByDocumentId(document.id)
  if (!doc?.storage_object_path || !doc?.id) {
    throw new Error("Failed to find uploaded document")
  }

  const file = await getFileByStorageObjectPath(doc.storage_object_path)
  // const fileType = getFileExtension(file.type)
  const parsedDoc = await LoadAndParsePdf(file, doc.id)

  // let parsedDoc
  // if (fileType === "pdf") {
  //   parsedDoc = await ParsePdf(file, doc.id)
  // } else if (fileType === "docx" || fileType === "doc") {
  //   // parsedDoc = await extractTextFromFileBlob(file)
  // }
  // if (!parsedDoc) throw new Error("Failed to parse document")

  try {
    await upsertDocumentSections(parsedDoc, doc.id)
  } catch (error) {
    console.error("🚀 ~ error:", error)
    throw new Error("Failed to upsert document sections") // Re-throw to indicate failure to caller
  }
  return
}

export async function embedXenova(documentId: TDocumentId) {
  const supabaseClient = createServerSupabaseClient()

  try {
    const { data, error } = await supabaseClient.functions.invoke(
      "embed_xenova",
      {
        body: {
          documentId: documentId,
          table: "document_sections",
          contentColumn: "content",
          embeddingColumn: "xenova_embedding",
        },
      }
    )

    if (error) {
      console.error("🚀 ~ error:", error.message)
      throw new Error("Failed to embed document") // Re-throw to indicate failure to caller
    }

    return data // Return data on success
  } catch (error) {
    console.log("🚀 ~ error:", error)
    throw new Error("Failed to embed document due to an exception") // Ensure failure is propagated
  }
}
