import { Tables } from "@/lib/database.types"

import { createServerSupabaseClient } from "../supabase-funcs/supabase.server"
import { getEmbeddings } from "./embeddings"

type TDocumentId = Tables<"documents">["id"]

/**
 * Embeds OpenAI document content using Supabase.
 * @param documentId - The ID of the document to embed.
 * @returns A Promise that resolves to an array of updated rows.
 * @throws If there is an error finding the document or content, or if there is an error embedding the document.
 */
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

  const updatedRows = [] // Initialize an array to store the results

  try {
    for (const row of rows) {
      const { id, [contentColumn]: content } = row

      if (!content) {
        console.error(`No content available in column '${contentColumn}'`)
        continue
      }

      const embeddingResponse = await getEmbeddings(content)

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
  } catch (error: any) {
    console.log("🚀 ~ embedOpenAi ~ error:", error.message)
    throw new Error("Failed to embed document")
  }
}
