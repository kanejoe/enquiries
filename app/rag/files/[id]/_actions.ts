"use server"

import { cookies } from "next/headers"
import { OpenAIEmbeddings } from "@langchain/openai"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database, Tables } from "@/lib/database.types"
import {
  getDocumentSectionsByDocumentId,
  getFileByStorageObjectPath,
  getStoragePathByDocumentId,
  upsertDocumentSections,
} from "@/lib/supabase.server"
import { getFileExtension } from "@/lib/utils"

import { ParsePdf } from "./docParser"

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

type TdocumentId = Tables<"documents">["id"]

export async function embedXenova(documentId: TdocumentId) {
  const supabaseClient = createServerComponentClient<Database>({ cookies })
  const { data, error } = await supabaseClient.functions.invoke("embed", {
    body: {
      ids: ["2"],
      table: "document_sections",
      contentColumn: "content",
      embeddingColumn: "xenova_embedding",
    },
  })
}

export async function embedContent(
  document_id: Pick<Tables<"document_sections">, "document_id">
) {
  const supabaseClient = createServerComponentClient<Database>({ cookies })

  const table = "document_sections"
  const embeddingColumn = "openai_embedding"
  const contentColumn = "content"

  const { data: rows, error: selectError } = await supabaseClient
    .from(table)
    // .select(`id, ${contentColumn}` as "*")
    .select("*")
    .eq("document_id", document_id)
    .is(embeddingColumn, null)
    .limit(1)
    .maybeSingle()
  //   console.log("🚀 ~ rows:", rows.content)

  //   const { data: doc, error } = await supabaseClient
  //     .from("document_sections")
  //     .select("content")
  //     .eq("document_id", document_id)
  //     .single()
  //   console.log("🚀 ~ doc:", doc)

  if (!rows) console.log("🚀 ~ error:", selectError)

  // throw new Error("Failed to find uploaded document")

  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
  })

  try {
    // const embeddingResponse = await embeddings.embedQuery(rows.content)
    // const { error } = await supabaseClient
    //   .from(table)
    //   .update({
    //     [embeddingColumn]: embeddingResponse,
    //   })
    //   .eq("id", rows.id)
    //   .single()
    //   .throwOnError()
    //   const [responseData] = embeddingResponse.data.data
    //   console.log("🚀 ~ responseData:", responseData)
  } catch (error) {
    console.log("🚀 ~ error:", error)
  }
}
