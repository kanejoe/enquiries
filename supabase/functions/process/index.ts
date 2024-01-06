// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "@supabase/supabase-js"

// import PDFLoader from "pdfLoader"

import { Database } from "../_lib/database.ts"

const supabaseUrl = Deno.env.get("SUPABASE_URL")
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")

Deno.serve(async (req) => {
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

  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        authorization,
      },
    },
    auth: {
      persistSession: false,
    },
  })

  const { document_id } = await req.json()

  const { data: document } = await supabase
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

  const { data: file } = await supabase.storage
    .from("files")
    .download(document.storage_object_path)

  if (!file) {
    return new Response(
      JSON.stringify({ error: "Failed to download storage object" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  // const _loader = new PDFLoader(file, {
  //   splitPages: false,
  // })
  // const docs = await loader.load()
  // console.log("🚀 ~ file: index.ts:87 ~ Deno.serve ~ docs:", docs)

  // const _fileContents = await file.text()

  return new Response(null, {
    status: 204,
    headers: { "Content-Type": "application/json" },
  })
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/process' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"document_id":"28"}'

*/
