import { createClient } from "@supabase/supabase-js"
import { env, pipeline } from "@xenova/transformers"

import { Database } from "../_lib/database.ts"

// Configuration for Deno runtime
env.useBrowserCache = false
env.allowLocalModels = false

// Load and validate environment variables early
const supabaseUrl = Deno.env.get("SUPABASE_URL")
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables."
  )
  Deno.exit(1)
}

const generateEmbedding = await pipeline(
  "feature-extraction",
  "Supabase/gte-small"
)

Deno.serve(async (req) => {
  const authorization = req.headers.get("Authorization")
  if (!authorization) {
    return new Response(
      JSON.stringify({ error: `No authorization header passed` }),
      {
        status: 401, // Use 401 for unauthorized access
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: { headers: { authorization } },
    auth: { persistSession: false },
  })

  let requestBody
  try {
    requestBody = await req.json()
  } catch (error) {
    console.log("🚀 ~ Deno.serve ~ error:", error)
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { documentId, table, contentColumn, embeddingColumn } = requestBody
  if (!documentId || !table || !contentColumn || !embeddingColumn) {
    return new Response(
      JSON.stringify({ error: "Missing required fields in the request body." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const { data: rows, error: selectError } = await supabase
    .from(table)
    .select(`id, ${contentColumn}`)
    .eq("document_id", documentId)
    .is(embeddingColumn, null)

  if (selectError) {
    return new Response(JSON.stringify({ error: selectError.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    for (const row of rows) {
      const { id, [contentColumn]: content } = row as unknown as {
        id: string
        [key: string]: string
      }

      if (!content) {
        console.error(
          `No content available in column '${contentColumn}' for row ID: ${id}`
        )
        continue
      }

      const trimmed = content.replace(/\n/g, " ").trim()
      try {
        const output = await generateEmbedding(trimmed, {
          pooling: "mean",
          normalize: true,
        })
        // const embedding = Array.from(output.data)
        const embedding = JSON.stringify(Array.from(output.data))

        const { error } = await supabase
          .from(table)
          .update({ [embeddingColumn]: embedding })
          .eq("id", id)

        if (error) {
          console.error(
            `Failed to save embedding for row ID: ${id} with error: ${error.message}`
          )
        }
      } catch (e) {
        console.error(`Error processing row ID: ${id}, error: ${e.message}`)
      }
    }

    return new Response(null, {
      status: 204,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})

/* To invoke locally:

1. Ensure all environment variables (SUPABASE_URL and SUPABASE_ANON_KEY) are set.
2. Run `npx supabase start` to start your local Supabase instance (see: https://supabase.com/docs/reference/cli/supabase-start).
3. Use the following curl command to make an HTTP request:

curl --request POST 'http://localhost:54321/functions/v1/embed' \
--header 'Authorization: Bearer YOUR_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "documentId": "your_document_id",
  "table": "document_sections",
  "contentColumn": "content",
  "embeddingColumn": "xenova_embedding"
}'
*/
