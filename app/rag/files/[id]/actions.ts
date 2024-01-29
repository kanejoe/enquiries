"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Document } from "langchain/document"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

import { Database, Tables } from "@/lib/database.types"

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
