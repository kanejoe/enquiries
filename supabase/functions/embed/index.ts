// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "@supabase/supabase-js"
import { env, pipeline } from "@xenova/transformers"

import { corsHeaders } from "../_lib/cors.ts"
import { Database } from "../_lib/database.ts"

const supabaseUrl = Deno.env.get("SUPABASE_URL")
console.log("🚀 ~ file: index.ts:12 ~ supabaseUrl:", supabaseUrl)
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")

// Configuration for Deno runtime
env.useBrowserCache = false
env.allowLocalModels = false

const _pipe = await pipeline("feature-extraction", "Supabase/gte-small")

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
    .from("documents")
    .select()
    .eq("id", document_id)
    .single()
  console.log("🚀 ~ file: index.ts:57 ~ Deno.serve ~ document:", document)

  if (!document) {
    return new Response(
      JSON.stringify({ error: "Failed to find uploaded document" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  // Generate the embedding from the user input
  // const output = await pipe(input, {
  //   pooling: "mean",
  //   normalize: true,
  // })

  // // Extract the embedding output
  // const embedding = Array.from(output.data)

  return new Response(JSON.stringify(document), {
    headers: { "Content-Type": "application/json" },
  })
})

/* To invoke locally:

  1. Run `npx supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl --request POST 'http://localhost:54321/functions/v1/embed' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{ "document_id": 28 }'

*/
