import { createClient } from "@supabase/supabase-js"
import { env, pipeline } from "@xenova/transformers"

import { Database } from "../_lib/database.ts"

// Configuration for Deno runtime
env.useBrowserCache = false
env.allowLocalModels = false

const generateEmbedding = await pipeline(
  "feature-extraction",
  "Supabase/gte-small"
)

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

  const { documentId, table, contentColumn, embeddingColumn } = await req.json()

  const { data: rows, error: selectError } = await supabase
    .from(table)
    .select(`id, ${contentColumn}` as "*")
    .eq("document_id", documentId)
    .is(embeddingColumn, null)

  if (selectError) {
    return new Response(JSON.stringify({ error: selectError }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    for (const row of rows) {
      const { id, [contentColumn]: content } = row

      if (!content) {
        console.error(`No content available in column '${contentColumn}'`)
        continue
      }

      const output = await generateEmbedding(content, {
        pooling: "mean",
        normalize: true,
      })

      const embedding = Array.from(output.data)
      // const embedding = JSON.stringify(Array.from(output.data))
      // console.log("🚀 ~ file: index.ts:83 ~ Deno.serve ~ embedding:", embedding)

      const { error } = await supabase
        .from(table)
        .update({
          [embeddingColumn]: embedding,
        })
        .eq("id", id)

      if (error) {
        console.error(
          `Failed to save embedding on '${table}' table with id ${id}`
        )
      }

      // console.log(
      //   `Generated embedding ${JSON.stringify({
      //     table,
      //     id,
      //     contentColumn,
      //     embeddingColumn,
      //   })}`
      // )
    }

    return new Response(null, {
      status: 204,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("🚀 ~ error:", error)
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})

/* To invoke locally:

  1. Run `npx supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl --request POST 'http://localhost:54321/functions/v1/embed' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{ 'ids': `["2"]`, 'table': 'document_sections', 'contentColumn': 'content', 'embeddingColumn': 'xenova_embedding'}'
  

*/
