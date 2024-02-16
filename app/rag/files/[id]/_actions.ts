"use server"

import { OpenAIEmbeddings } from "@langchain/openai"

import { Tables } from "@/lib/database.types"
import {
  createServerSupabaseClient,
  getFileByStorageObjectPath,
  getStoragePathByDocumentId,
  upsertDocumentSections,
} from "@/lib/supabase.server"
import { getFileExtension } from "@/lib/utils"

import { ParsePdf } from "./docParser"

type TDocumentId = Tables<"documents">["id"]

type PDFPage = {
  pageContent: string
  metadata: {
    loc: { pageNumber: number }
  }
}

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
  const fileType = getFileExtension(file.type)

  let parsedDoc
  if (fileType === "pdf") {
    parsedDoc = await ParsePdf(file, doc.id)
  } else if (fileType === "docx" || fileType === "doc") {
    // parsedDoc = await parseDocx(file, doc.id)
  }
  if (!parsedDoc) throw new Error("Failed to parse document")

  await upsertDocumentSections(parsedDoc, doc.id)
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
      console.error("🚀 ~ error:", error)
      throw new Error("Failed to embed document") // Re-throw to indicate failure to caller
    }

    return data // Return data on success
  } catch (error) {
    console.log("🚀 ~ error:", error)
    throw new Error("Failed to embed document due to an exception") // Ensure failure is propagated
  }
}

export async function embedOpenAi(documentId: TDocumentId) {
  const supabaseClient = createServerSupabaseClient()

  const table = "document_sections"
  const embeddingColumn = "openai_embedding"
  const contentColumn = "content"

  const { data: rows, error: selectError } = await supabaseClient
    .from(table)
    .select(`id, ${contentColumn}` as "*")
    .eq("document_id", documentId)
    .is(embeddingColumn, null)

  if (selectError || !rows) {
    console.error("🚀 ~ selectError:", selectError)
    throw new Error("Failed to find document or content")
  }

  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
  })

  const updatedRows = [] // Initialize an array to store the results

  try {
    for (const row of rows) {
      const { id, [contentColumn]: content } = row

      if (!content) {
        console.error(`No content available in column '${contentColumn}'`)
        continue
      }

      const formattedContent = content.replace(/\n/g, " ").trim()
      const embeddingResponse = await embeddings.embedQuery(formattedContent)

      const { data, error } = await supabaseClient
        .from(table)
        .update({
          [embeddingColumn]: embeddingResponse as any,
          isvectorized: true,
        })
        .eq("id", id)

      if (error) {
        console.error(
          `Failed to save embedding on '${table}' table with id ${id}. Error: ${error.message}. Details: ${error.details}`
        )
        continue // Skip to the next iteration on error
      }

      updatedRows.push(data) // Collect successfully updated rows
    }

    return updatedRows // Return all updated rows after processing the loop
  } catch (error) {
    console.log("🚀 ~ embedOpenAi ~ error:", error)
    throw new Error("Failed to embed document")
  }
}
