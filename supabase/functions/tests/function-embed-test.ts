// Import required libraries and modules

// import {
//   createClient,
//   SupabaseClient,
// } from "https://esm.sh/@supabase/supabase-js@2.23.0"

import { createClient } from "@supabase/supabase-js"
import { assert } from "https://deno.land/std@0.192.0/testing/asserts.ts"

import { Database } from "../_lib/database.ts"

// Set up the configuration for the Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "http://127.0.0.1:54321"
const supabaseKey =
  Deno.env.get("SUPABASE_ANON_KEY") ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
}

// Test the creation and functionality of the Supabase client
const testClientCreation = async () => {
  const client = createClient<Database>(supabaseUrl, supabaseKey, options)

  // Verify if the Supabase URL and key are provided
  if (!supabaseUrl) throw new Error("supabaseUrl is required.")
  if (!supabaseKey) throw new Error("supabaseKey is required.")

  // Test a simple query to the database
  const { data: table_data, error: table_error } = await client
    .from("documents")
    .select("*")
  // .limit(1)
  console.log(
    "🚀 ~ file: function-embed-test.ts:39 ~ testClientCreation ~ table_data:",
    table_data
  )
  if (table_error) {
    throw new Error("Invalid Supabase client: " + table_error.message)
  }
  assert(table_data, "Data should be returned from the query.")
}

// Register and run the tests
Deno.test("Client Creation Test", testClientCreation)

// deno test --allow-all supabase/functions/tests/function-embed-test.ts --env .env.local
