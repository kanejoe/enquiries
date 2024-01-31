"use server"

import { cookies } from "next/headers"
import { OpenAIEmbeddings } from "@langchain/openai"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import OpenAI from "openai"

import { Database, Tables } from "@/lib/database.types"
import {
  createServerSupabaseClient,
  getDocumentById,
  getFileByStorageObjectPath,
  getStoragePathByDocumentId,
  getUserDetails,
  upsertDocumentSections,
} from "@/lib/supabase.server"
import { getFileExtension } from "@/lib/utils"

import { parseDocx, ParsePdf } from "./docParser"

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
  const supabaseClient = createServerSupabaseClient()

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
    const embeddingResponse = await embeddings.embedQuery(rows.content)
    const { error } = await supabaseClient
      .from(table)
      .update({
        [embeddingColumn]: embeddingResponse,
      })
      .eq("id", rows.id)
      .single()
      .throwOnError()

    //   const [responseData] = embeddingResponse.data.data
    //   console.log("🚀 ~ responseData:", responseData)
  } catch (error) {
    console.log("🚀 ~ error:", error)
  }
}

export async function summarise(
  document_id: Pick<Tables<"document_sections">, "document_id">
) {
  const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  })
  const supabaseClient = createServerComponentClient<Database>({ cookies })
  const { data: rows, error: selectError } = await supabaseClient
    .from("document_sections")
    .select("*")
    .eq("document_id", document_id)
    .limit(1)
    .maybeSingle()
    .throwOnError()

  if (!rows) {
    console.log("🚀 ~ error:", selectError)
    throw new Error("Failed to find uploaded document")
  }

  const content = rows.content

  //   const chatCompletion = await openai.chat.completions.create({
  //     messages: [{ role: "user", content: "Say this is a test" }],
  //     model: "gpt-3.5-turbo",
  //   })

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0301",
    // model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `Summarise the following content, which is published by the Law Society Conveyancing Committee: ${content} in less than 300 words. It should be a professional summary.  You are a lawyer.  Do not cut off the content.`,
      },
    ],
    max_tokens: 100,
  })
  console.log("🚀 ~ response:", response.choices[0]?.message.content)
}
