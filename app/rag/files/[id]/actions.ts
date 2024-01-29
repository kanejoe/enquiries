"use server"

import { cookies } from "next/headers"
// import { env, pipeline } from "@xenova/transformers"
import { Document } from "@langchain/core/documents"
import { OpenAIEmbeddings } from "@langchain/openai"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import OpenAI from "openai"

import { Database, Tables } from "@/lib/database.types"

// const generateEmbedding = await pipeline(
//   "feature-extraction",
//   "Supabase/gte-small"
// )

type PDFPage = {
  pageContent: string
  metadata: {
    loc: { pageNumber: number }
  }
}

export async function parseFile(document: Tables<"documents">) {
  const supabaseClient = createServerComponentClient<Database>({ cookies })

  const { data: doc } = await supabaseClient
    .from("documents_with_storage_path_and_created_by_email")
    .select("*")
    .eq("id", document.id)
    .single()

  if (!doc?.storage_object_path) {
    throw new Error("Failed to find uploaded document")
  }

  const { data: file } = await supabaseClient.storage
    .from("files")
    .download(doc.storage_object_path)

  if (!file) {
    throw new Error("Failed to download storage object.")
  }

  const loader = new PDFLoader(file)
  const pages = (await loader.load()) as PDFPage[]
  const documents = await Promise.all(pages.map(prepareDoc))
  const sectionsToInsert = documents.flat().map((doc: Document) => {
    return {
      document_id: document.id,
      //   page_number: doc.metadata.pageNumber,
      metadata: doc.metadata,
      content: doc.pageContent,
    }
  })
  //   console.log("🚀 ~ sectionsToInsert ~ sectionsToInsert:", sectionsToInsert)

  const { data: insertedData, error } = await supabaseClient
    .from("document_sections")
    .insert(sectionsToInsert)
    .throwOnError()
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder()
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes))
}

async function prepareDoc(page: PDFPage) {
  const { metadata, pageContent } = page
  // pageContent = pageContent.replace(/\n/g, "") // remove newlines, but maybe keep a space
  let pg = pageContent.replace(/\n/g, " ") // or else remove completely
  // split the docs
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 36000,
    chunkOverlap: 0,
  })

  const docs = await textSplitter.splitDocuments([
    new Document({
      pageContent: pg,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pg, 36000),
      },
    }),
  ])
  return docs
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
    modelName: "text-embedding-3-large",
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
  const embedding = rows.openai_embedding
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
