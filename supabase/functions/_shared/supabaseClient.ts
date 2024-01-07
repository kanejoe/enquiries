import { createClient } from "@supabase/supabase-js"

import { Database } from "../_lib/database.ts"

const supabaseUrl = Deno.env.get("SUPABASE_URL")
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")
// const supabaseAnonKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

export function createSupabaseClient(req: Request) {
  if (!supabaseUrl || !supabaseAnonKey) {
    // throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be defined")
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

  // Create and return a Supabase client
  const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { Authorization: req.headers.get("Authorization")! },
    },
    auth: {
      persistSession: false,
    },
  })
  return supabaseClient
}
