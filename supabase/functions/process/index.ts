// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "@supabase/supabase-js"
import { env } from "@xenova/transformers"
import { Document } from "npm:langchain/document"
import { PDFLoader } from "npm:langchain/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "npm:langchain/text_splitter"
import * as _pdfjs from "npm:pdf-parse"

import { corsHeaders } from "../_lib/cors.ts"
import { Database } from "../_lib/database.ts"

type PDFPage = {
  pageContent: string
  metadata: {
    loc: { pageNumber: number }
  }
}

const supabaseUrl = Deno.env.get("SUPABASE_URL")
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")
// const supabaseAnonKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

// Configuration for Deno runtime
env.useBrowserCache = false
env.allowLocalModels = false

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return new Response(
      JSON.stringify({
        error: "Missing environment variables.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const authorization = req.headers.get("Authorization")

  if (!authorization) {
    return new Response(
      JSON.stringify({ error: `No authorization header passed` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { Authorization: req.headers.get("Authorization")! },
    },
    auth: {
      persistSession: false,
    },
  })

  const { document_id } = await req.json()

  const { data: document } = await supabaseClient
    .from("documents_with_storage_path_and_created_by_email")
    .select()
    .eq("id", document_id)
    .single()

  if (!document?.storage_object_path) {
    return new Response(
      JSON.stringify({ error: "Failed to find uploaded document" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const { data: file } = await supabaseClient.storage
    .from("files")
    .download(document.storage_object_path)

  if (!file) {
    return new Response(
      JSON.stringify({ error: "Failed to download storage object." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const arrayBuffer = await file.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)
  const blob = new Blob([uint8Array], { type: "application/pdf" })

  const loader = new PDFLoader(blob, arrayBuffer)
  const pages = (await loader.load()) as PDFPage[]

  const documents = await Promise.all(pages.map(prepareDoc))

  const sectionsToInsert = documents.flat().map((doc: Document) => {
    return {
      document_id,
      // page_number: doc.metadata.pageNumber,
      metadata: doc.metadata,
      content: doc.pageContent,
    }
  })

  const { error } = await supabaseClient
    .from("document_sections")
    .insert(sectionsToInsert)

  if (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ error: "Failed to save document sections" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  console.log(`Saved ${documents.length} sections for file '${document.name}'`)

  return new Response(JSON.stringify(document_id), {
    headers: { "Content-Type": "application/json" },
  })
})

/* To invoke locally:

  1. Run `npx supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl --request POST 'http://localhost:54321/functions/v1/process' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{ "document_id": 2 }'

*/

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder()
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes))
}

async function prepareDoc(page: PDFPage) {
  let { metadata, pageContent } = page
  pageContent = pageContent.replace(/\n/g, "")
  // split the docs
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 36000,
    chunkOverlap: 0,
  })

  const docs = await textSplitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ])
  return docs
}
